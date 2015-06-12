<?php
include dirname( dirname(__FILE__))."/init.php"; 

if(query("

	UPDATE `usuarios` SET `usuarios_activa` = '".$_POST["v"]."' WHERE 
	usuarios_id = '".$_POST["i"]."'

")) echo "1";
else echo "0";