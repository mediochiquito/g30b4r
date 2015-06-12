<?
  if($_GET['del']=='1'){
    
    mysql_query("DELETE FROM `locales` WHERE locales_id = '" . $_GET['id'] . "'");

    echo '
    <script>document.location.href="index.php?s=Locales.php";</script>
    ';
    exit;
  }


  if($_POST) {

    if($_POST['id']!=''){

        $id = $_POST['id'];


        mysql_query("UPDATE `locales` SET  `locales_frase` = '".$_POST['frase']."' ,  
                                             `locales_slug` = '" . $_POST['slug'] . "' ,
                                             `locales_tipo` = '" . $_POST['tipo'] . "' ,
                                             `locales_desc` = '" . $_POST['desc'] . "' ,
                                             `locales_titulo_galeria` = '" . $_POST['titulo_galeria'] . "' , 
                                             `locales_json_galeria` = '" . $_POST['json_galeria'] . "' 

                                              WHERE locales_id = '" . $_POST['id'] . "'");
                     
    }else{  

        mysql_query("INSERT INTO `locales` (  
                                              `locales_frase` ,  
                                              `locales_slug`,
                                              `locales_tipo`,
                                              `locales_desc`,
                                              `locales_titulo_galeria`,
                                               locales_json_galeria
                                            )

                    VALUES ( '".$_POST['frase']."',  
                            '".$_POST['slug']."',
                            '".$_POST['tipo']."',
                            '".$_POST['desc']."',
                             '".$_POST['titulo_galeria']."',
                             '".$_POST['json_galeria']."'
                            
                             );

      ");

      $id = mysql_insert_id();
    
    }
    
    if($_FILES["file0"]["tmp_name"] != ''){

      $fileTmpLoc = $_FILES["file0"]["tmp_name"];
      $pathAndName = dirname(dirname(__FILE__)) . "/img/locales/".$id. '.jpg';

       if(!move_uploaded_file($fileTmpLoc, $pathAndName)){
           echo "La imagen 'header banner' no se pudo subir";
           exit;
       }
    }

    if($_FILES["file1"]["tmp_name"] != ''){

      $fileTmpLoc = $_FILES["file1"]["tmp_name"];
      $pathAndName = dirname(dirname(__FILE__)) . "/img/locales/".$id. '_logo.png';

       if(!move_uploaded_file($fileTmpLoc, $pathAndName)){
           echo "La imagen 'logo' no se pudo subir";
           exit;
       }
    }

   header('Location: ?s=Locales.php');

  }

  if($_GET['id']!=''){

    $rs =  mysql_query(" SELECT * FROM `locales` WHERE `locales_id` = ".$_GET['id'] . " LIMIT 1; ");
    $row = mysql_fetch_object($rs);

  }


?>

<h1>
  <?
  if($_GET['id']!='') echo 'Editando local #' . $_GET['id'];
  else echo 'Nuevo local';
  ?>
</h1>

<form id='forma' action='<?=$_SERVER['PHP_SELF'] . '?' . $_SERVER['QUERY_STRING']?>' method="post" enctype="multipart/form-data" style='padding:30px;'>

  <input type='hidden' value='<?=$row->locales_id?>' name='id' />
  <input type='hidden' value='' name='json_galeria' id='json_galeria' />

  <table width="600" border="0" cellpadding="4" cellspacing="0" class="table">
   
     <tr>
      <td >URL</td>
      <td ><?=SERVER?> &nbsp;&nbsp;&nbsp;<input type='text' name='slug' id='slug' value='<?=$row->locales_slug?>'/></td>
    </tr>

    <tr>
      <td  width='140'>Imagen Header Banner (solo .jpg)</td>
      <td >
        <? if(file_exists('../img/locales/'.$row->locales_id .  '.jpg'))
              echo "<img class='img_preview'  src='../img/show.php?f=/locales/" . $row->locales_id . ".jpg&an=100&al=100' />";
        ?>
        <input type='file' name='file0' id='file0' />
      </td>
    </tr>

    <tr>
      <td >Frase</td>
      <td ><textarea  name='frase' id='frase'><?=$row->locales_frase?></textarea></td>
    </tr>
  
     <tr>
      <td  width='140'>Imagen Logo Beneficio (solo .png 260x200px)</td>
      <td >
        <? if(file_exists('../img/locales/'.$row->locales_id .  '_logo.png'))
              echo "<img class='img_preview'  src='../img/show.php?f=/locales/" . $row->locales_id . "_logo.png&an=100&al=100' />";
        ?>
        <input type='file' name='file1' id='file1' />
      </td>
    </tr>   
    <tr>
      <td >Tipo de beneficio:</td>
      <td > 
          <select id='tipo' name='tipo'>

            <?
            $array_tipos = array('restaurantes','te','librerias','helados','golf');
            foreach ($array_tipos as $tipo) {
           
              if($row->locales_tipo == $tipo) $sel = "selected='selected'";
              else $sel = "";
            ?>

            <option value="<?=$tipo?>" <?=$sel?>><?=$tipo?></option>
            <?
            }
            ?>
          </select>
      </td>
    </tr>
    
    <tr>
      <td >Descripción</td>
      <td ><textarea  name='desc' id='desc'><?=$row->locales_desc?></textarea></td>
    </tr>

    <tr>
      <td >Tiutlo galeria</td>
      <td ><input type='text' name='titulo_galeria' id='titulo_galeria' value='<?=$row->locales_titulo_galeria?>'/></td>
    </tr>

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

<h1>Lista locales  <input type='button' id='btn_nueva' value='Agregar nuevo local' class='btn btn-success' onclick='nueva()' /></h1>

 <table width="100%" border="0" cellpadding="4" cellspacing="0" class="table">

      <thead>
       
        <td >Imagen Header Banner</td>
        <td width='150'>Frase</td>
        <td >URL</td>
        <td >Titulo galeria</td>
        <td >Cantidad imágenes en galería</td>
        <td >Editar</td>
        <td >Borrar</td>
      </thead>
    
    <?

    $rs = mysql_query("SELECT * FROM locales ORDER BY locales_id DESC");
    while($row = mysql_fetch_object($rs)){

    ?>
    <tr>
      
        <td  width='60' ><img src='../img/show.php?f=/locales/<?=$row->locales_id?>.jpg&an=60&al=60' /></td>
        <td ><?=$row->locales_frase?></td>
        <td ><a href='<?=SERVER . $row->locales_slug?>' target='_blank'><?=SERVER . $row->locales_slug?></a></td>
        <td ><?=$row->locales_titulo_galeria?></td>
        <td>
        <?
        if($row->locales_json_galeria!=''){
            
            $array_imagenes = explode(',', $row->locales_json_galeria);
            echo count($array_imagenes);

        }else{

            echo '0';

        }

        ?>
        </td>
        <td ><input type='button' onclick='editar(<?=$row->locales_id?>)' value='Editar' class="btn btn-warning" /></td>
        <td ><input type='button' onclick='borrar(<?=$row->locales_id?>)'  value='Borrar'  class="btn btn-error"/></td>

      </tr>

      

  <?
}
?>
</tr>
     
    
  </table>

<script>
  
  function editar(id){

    document.location.href="?s=Locales.php&id="+id

  }
  function borrar(id){
    var conf = confirm('¿Seguro que quieres eliminar este local?')
    if(conf){
       document.location.href="?s=Locales.php&del=1&id="+id
    }
     
  }
  function nueva(){
     document.location.href="?s=locales.php"
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

    $rs =  mysql_query(" SELECT locales_json_galeria FROM `locales` WHERE `locales_id` = ".$_GET['id'] . " LIMIT 1; ");
    $row = mysql_fetch_object($rs);
    $array_imagenes = explode(',', $row->locales_json_galeria);
    echo '<script>';
    if($row->locales_json_galeria!=''){
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
