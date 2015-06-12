<script type="text/javascript">
	
	var obj_glaeria = new Object();

</script>

<div id='galeria-items-content'>

</div>


<div id="filelist">Your browser doesn't have Flash or HTML5 support.</div>
<br />
<div id="container" style='clear:both;'>
	<input type='button' id='pickfiles' value='Agregar fotos a la galeria' class='btn' />
</div>
<br />
<pre id="console" style='display:none'></pre>



<script type="text/javascript">
// Custom example logic




var uploader = new plupload.Uploader({
	runtimes : 'html5,flash',
	browse_button : 'pickfiles', // you can pass in id...
	container: document.getElementById('container'), // ... or DOM Element itself
	url : 'upload.php',
	flash_swf_url : '_js/plupload-2.1.2/js/Moxie.swf',
	
	filters : {
		max_file_size : '3mb',
		mime_types: [
			{title : "Image files", extensions : "jpg,gif,png"}
		]
	},

	init: {

		PostInit: function() {
			
			document.getElementById('filelist').innerHTML = '';

		/*	document.getElementById('uploadfiles').onclick = function() {
				uploader.start();
				return false;
			};*/

		},
		
		FileUploaded: function (a,b,c){
		
			var item = new ItemGaleria($.parseJSON(c.response).id)
			$('#galeria-items-content').append(item.main)

		}, 

		FilesAdded: function(up, files) {
			plupload.each(files, function(file) {
				document.getElementById('filelist').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>';
			});
			uploader.start();

		},

		UploadProgress: function(up, file) {

			if(file.percent == 100){

				$(document.getElementById(file.id)).remove()

			}else{
				document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
			}

		},

		Error: function(up, err) {
			document.getElementById('console').innerHTML += "\nError #" + err.code + ": " + err.message;
		}
	}
});

uploader.init();

</script>