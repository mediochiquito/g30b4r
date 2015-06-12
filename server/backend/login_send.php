<?
include dirname(dirname(__FILE__)) . "/init.php";
if($_POST["txt_user"] == "admin" && $_POST["txt_pass"] == "itau13579"){
	$_SESSION["txt_user"] = $_POST["txt_user"];
	header("Location: index.php?s=Novedades.php");
}else{
	header("Location: index.php?s=Login.php&error=1");
}