<?
include dirname(dirname(__FILE__)) . "/init.php";
if($_SESSION["txt_user"] == "" && $_GET["s"] != "Login.php")
header("Location: ?s=Login.php");
?>
<!DOCTYPE html>
<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<script type="text/javascript" src="../js/libs/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="_js/plupload-2.1.2/js/plupload.full.min.js"></script>
<script type="text/javascript" src="_js/ItemGaleria.js"></script>


<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">

<link href="_css/backend.css" rel="stylesheet" type="text/css" />
</head>

<body>
<table width="100%" border="0" cellspacing="0" cellpadding="4">
  <tr>
    <td align="right" id="contendor_header"> Administrador</td>
  </tr>
  
  <tr>
    <td bgcolor="#FFFFFF" id="contenedor_menu">
    <?
  if($_SESSION["txt_user"] != ""){
  ?>
  
    <div class='btn_menu'><a href="?s=Novedades.php">Novedades</a></div>
    <div class='btn_menu'><a href="?s=Locales.php">Locales</a></div>
     </td>
      <?
  }
  ?>
  </tr>
  

  <tr>
    <td><table width="100%" border="0" cellspacing="0" cellpadding="5">
      <tr>
        <td width="100" valign="top"><div id="contenedor_logo"><img src="../img/logo_itau.png" width="106" height="105" /></div></td>
        <td valign="top">
        <div id="contendor_container"><?
        
		if($_GET["s"] == "")
			include "Novedades.php";
		else
			include $_GET["s"];

		
		?></div>
        </td>
      </tr>
    </table></td>
  </tr>
</table>
</body>
</html>