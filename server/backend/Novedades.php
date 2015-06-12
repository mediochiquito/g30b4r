<?
  if($_GET['del']=='1'){
    
    mysql_query("DELETE FROM `novedades` WHERE novedades_id = '" . $_GET['id'] . "'");

    echo '
    <script>document.location.href="index.php?s=Novedades.php";</script>
    ';
    exit;
  }
  if($_POST) {

    if($_POST['id']!=''){

        $id = $_POST['id'];
        
        mysql_query("UPDATE `novedades` SET  `novedades_desc` = '".$_POST['desc']."' ,  
                                             `novedades_desc_corta` = '" . $_POST['desc_corta'] . "' ,
                                             `novedades_titulo` = '" . $_POST['titulo'] . "' , 
                                             `novedades_json_galeria` = '" . $_POST['json_galeria'] . "' 

                                              WHERE novedades_id = '" . $_POST['id'] . "'");
                     
    }else{  

        mysql_query("INSERT INTO `novedades` (  
                                              `novedades_desc` ,  
                                              `novedades_desc_corta`,

                                               novedades_titulo,
                                                `novedades_json_galeria`

                                            )

                    VALUES ( '".$_POST['desc']."',  
                            '".$_POST['desc_corta']."',
                             '".$_POST['titulo']."',
                             '".$_POST['json_galeria']."'
                            
                             );

      ");

      $id = mysql_insert_id();
    
    }
    
    if($_FILES["file0"]["tmp_name"] != ''){

      $fileTmpLoc = $_FILES["file0"]["tmp_name"];
     $pathAndName = dirname(dirname(__FILE__)) . "/img/novedades/".$id. '_thumb.png';

       if(!move_uploaded_file($fileTmpLoc, $pathAndName)){
           echo "La imagen item listado no se pudo subir";
           exit;
       }
        
   }


    if($_FILES["file1"]["tmp_name"] != ''){

       $fileTmpLoc = $_FILES["file1"]["tmp_name"];

       $pathAndName = dirname(dirname(__FILE__)) . "/img/novedades/".$id. '.jpg';

       if(!move_uploaded_file($fileTmpLoc, $pathAndName)){
           echo "La imagen banner no se pudo subir";
       }
        
   }





   header('Location: ?s=Novedades.php');

  }

  if($_GET['id']!=''){

    $rs =  mysql_query(" SELECT * FROM `novedades` WHERE `novedades_id` = ".$_GET['id'] . " LIMIT 1; ");
    $row = mysql_fetch_object($rs);

  }


?>

<h1>
  <?
  if($_GET['id']!='') echo 'Editando novedad #' . $_GET['id'];
  else echo 'Nueva novedad';
  ?>
</h1>

<form id='forma' action='<?=$_SERVER['PHP_SELF'] . '?' . $_SERVER['QUERY_STRING']?>' method="post" enctype="multipart/form-data" style='padding:30px;'>

  <input type='hidden' value='<?=$row->novedades_id?>' name='id' />
  <input type='hidden' value='' name='json_galeria' id='json_galeria' />

  <table width="600" border="0" cellpadding="4" cellspacing="0" class="table">

    <tr>
      <td  width='140'>Imagen item listado (solo .png 230x200px)</td>
      <td >
        <? if(file_exists('../img/novedades/'.$row->novedades_id .  '_thumb.png'))
             
               echo "<img class='img_preview' src='../img/show.php?f=/novedades/" . $row->novedades_id . "_thumb.png&an=100&al=100' />";
        ?>
        <input type='file' name='file0' id='file0' /></td>
    </tr>

    <tr>
      <td  width='140'>Imagen Banner (solo .jpg)</td>
      <td >
        <? if(file_exists('../img/novedades/'.$row->novedades_id .  '.jpg'))
              echo "<img class='img_preview'  src='../img/show.php?f=/novedades/" . $row->novedades_id . ".jpg&an=100&al=100' />";
        ?>
        <input type='file' name='file1' id='file1' />
      </td>
    </tr>

   <!--<tr>
      <td >URL</td>
      <td ><?=SERVER?> <input type='text' name='slug' id='slug'value='<?=$row->novedades_slug?>'/></td>
    </tr>
    -->

    <tr>
      <td >Titulo</td>
      <td ><input type='text' name='titulo' id='titulo'  value='<?=$row->novedades_titulo?>'/></td>
    </tr>
    <tr>
      <td >Descripción Corta</td>
      <td ><textarea  name='desc_corta' id='desc_corta'><?=$row->novedades_desc_corta?></textarea></td>
    </tr>
    <tr>
      <td >Descripción</td>
      <td ><textarea   name='desc' id='desc'><?=$row->novedades_desc?></textarea></td>
    </tr>

    <!--<tr>
      <td >En Home</td>
      <td ><input type='checkbox' value='1' name='enhome' <? if($row->novedades_en_home==1) echo "checked='checked'" ;?> /></td>
    </tr> -->

    <tr>
      <td>Galería (*.jpg):</td>
      <td ><?
        include "include.upload_galeria.php";
        ?></td>
    </tr>

    <tr>
      <td> </td>
      <td ><input type='button' id='btn_enviar' value='Guardar' class='btn' /></td>
    </tr>



  </table>

</form>

<h1>Lista novedades  <input type='button' id='btn_nueva' value='Agregar nueva novedad' class='btn btn-success' onclick='nueva()' /></h1>

 <table width="100%" border="0" cellpadding="4" cellspacing="0" class="table">

      <thead>
        <td >Imagen item listado</td>
        <td >Imagen Banner</td>
        <td width='150'>Título</td>
        <td >Descripción corta</td>
        <td >Cantidad imágenes en galería</td>
        <td >Editar</td>
        <td >Borrar</td>
      </thead>
    
    <?

    $rs = mysql_query("SELECT * FROM novedades ORDER BY novedades_id DESC");
    while($row = mysql_fetch_object($rs)){

    ?>
    <tr>

        <td  width='60' ><img src='../img/show.php?f=/novedades/<?=$row->novedades_id?>_thumb.png&an=60&al=60' /></td>
        <td  width='60' ><img src='../img/show.php?f=/novedades/<?=$row->novedades_id?>.jpg&an=60&al=60' /></td>
        <td ><?=$row->novedades_titulo?></td>
        <td ><?=$row->novedades_desc_corta?></td>
        <td ><?
         if($row->novedades_json_galeria!=''){
            $array_imagenes = explode(',', $row->novedades_json_galeria);
            echo count($array_imagenes);
          }else{
            echo '0';
          }
        ?></td>
        <td ><input type='button' onclick='editar(<?=$row->novedades_id?>)' value='Editar' class="btn btn-warning" /></td>
        <td ><input type='button' onclick='borrar(<?=$row->novedades_id?>)'  value='Borrar'  class="btn btn-error"/></td>

      </tr>

      

  <?
}
?>
</tr>
     
    
  </table>

<script>
  
  function editar(id){

    document.location.href="?s=Novedades.php&id="+id

  }
  function borrar(id){
    var conf = confirm('¿Seguro que quieres eliminar esta novedad?')
    if(conf){
       document.location.href="?s=Novedades.php&del=1&id="+id
    }
     
  }
  function nueva(){
     document.location.href="?s=Novedades.php"
  }
  
  $('#btn_enviar').bind('click', function (){

    var bucle = 0;
    var array_str = '';

    $( ".ItemGaleria" ).each(function() {
        if(bucle==0) array_str +=       $(this).attr('media')
        else        array_str += ',' + $(this).attr('media')

        bucle++;
    });

    $('#json_galeria').val(array_str);
    $('#forma')[0].submit();

  })




</script>



<?
if($_GET['id']!=''){

    $rs =  mysql_query(" SELECT novedades_json_galeria FROM `novedades` WHERE `novedades_id` = ".$_GET['id'] . " LIMIT 1; ");
    $row = mysql_fetch_object($rs);
    $array_imagenes = explode(',', $row->novedades_json_galeria);
    echo '<script>';
    if($row->novedades_json_galeria!=''){
       foreach ($array_imagenes as $imagen) {
         echo '
             var item = new ItemGaleria("' . $imagen . '");
             $("#galeria-items-content").append(item.main);

             ';

      }
    }
   

    echo '</script>';
}
   
?>
