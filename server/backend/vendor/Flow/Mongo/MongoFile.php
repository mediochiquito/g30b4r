<?php

namespace Flow\Mongo;

use Flow\File;
use Flow\Request;
use Flow\RequestInterface;


/**
 * Notes:
 *
 * - One should ensure indices on the gridfs collection on the property 'flowIdentifier'.
 * - Chunk preprocessor not supported (must not modify chunks size)!
 * - Must use 'forceChunkSize=true' on client side.
 *
 * @package Flow
 */
class MongoFile extends File
{
    private $uploadGridFsFile;

    /**
     * @var MongoConfigInterface
     */
    private $config;

    function __construct(MongoConfigInterface $config, RequestInterface $request = null)
    {
        if ($request === null) {
            $request = new Request();
        }
        parent::__construct($config, $request);
        $this->config = $config;
    }

    /**
     * return array
     */
    protected function getGridFsFile()
    {
        if (!$this->uploadGridFsFile) {
            $gridFsFileQuery = $this->getGridFsFileQuery();
            $changed = $gridFsFileQuery;
            $changed['flowUpdated'] = new \MongoDate();
            $this->uploadGridFsFile = $this->config->getGridFs()->findAndModify($gridFsFileQuery, $changed, null,
                ['upsert' => true]);
        }

        return $this->uploadGridFsFile;
    }

    /**
     * @param $index int|string 1-based
     * @return bool
     */
    public function chunkExists($index)
    {
        return $this->config->getGridFs()->chunks->find([
            'files_id' => $this->getGridFsFile()['_id'],
            'n' => (intval($index) - 1)
        ])->limit(1)->hasNext();
    }

    public function checkChunk()
    {
        return $this->chunkExists($this->request->getCurrentChunkNumber());
    }

    /**
     * Save chunk
     *
     * @return bool
     */
    public function saveChunk()
    {
        try {
            $file = $this->request->getFile();

            $chunkQuery = [
                'files_id' => $this->getGridFsFile()['_id'],
                'n' => intval($this->request->getCurrentChunkNumber()) - 1,
            ];
            $chunk = $chunkQuery;
            $data = file_get_contents($file['tmp_name']);
            $actualChunkSize = strlen($data);
            if ($actualChunkSize > $this->request->getDefaultChunkSize() ||
                ($actualChunkSize < $this->request->getDefaultChunkSize() &&
                    $this->request->getCurrentChunkNumber() != $this->request->getTotalChunks())
            ) {
                throw new \Exception("Invalid upload! (size: {$actualChunkSize})");
            }
            $chunk['data'] = new \MongoBinData($data);
            $this->config->getGridFs()->chunks->findAndModify($chunkQuery, $chunk, [], ['upsert' => true]);
            unlink($file['tmp_name']);

            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * @return bool
     */
    public function validateFile()
    {
        $totalChunks = $this->request->getTotalChunks();

        for ($i = 1; $i <= $totalChunks; $i++) {
            if (!$this->chunkExists($i)) {
                return false;
            }
        }

        return true;
    }


    /**
     * Merge all chunks to single file
     * @param $metadata array additional metadata for final file
     * @return \MongoId|bool of saved file or false if file was already saved
     * @throws \Exception
     */
    public function saveToGridFs($metadata = null)
    {
        $file = $this->getGridFsFile();
        $file['flowStatus'] = 'finished';
        $file['metadata'] = $metadata;
        $result = $this->config->getGridFs()->findAndModify($this->getGridFsFileQuery(), $file);
        // on second invocation no more file can be found, as the flowStatus changed:
        if (is_null($result)) {
            return false;
        } else {
            return $file['_id'];
        }
    }

    public function save($destination)
    {
        throw new \Exception("Must not use 'save' on MongoFile - use 'saveToGridFs'!");
    }

    public function deleteChunks()
    {
        // nothing to do, as chunks are directly part of the final file
    }

    /**
     * @return array
     */
    protected function getGridFsFileQuery()
    {
        return [
            'flowIdentifier' => $this->request->getIdentifier(),
            'flowStatus' => 'uploading',
            'filename' => $this->request->getFileName(),
            'chunkSize' => intval($this->request->getDefaultChunkSize()),
            'length' => intval($this->request->getTotalSize())
        ];
    }
}