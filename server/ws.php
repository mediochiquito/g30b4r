<?php
header('Access-Control-Allow-Origin: *');
include 'init.php';
//sleep(2);


$cat = array('Bar', 'Restaurante', 'Cine');
switch($_GET['method']){

	case 'getDetalleEvento':
		
		$rs = mysql_query('SELECT * FROM lugares WHERE lugares_id=' .  $_GET['id']);
		$row = mysql_fetch_object($rs);
		$obj = new stdClass();
		$obj->mini_desc = $row->lugares_mini_desc;
		$obj->long_desc = $row->lugares_long_desc;
		$handle = opendir(dirname(realpath(__FILE__)).'/img/lugares/' .  $_GET['id']);
        while($file = readdir($handle)){
            if($file !== '.' && $file !== '..' && $file !== 'thumb.jpg'){
               $obj->fotos[] = $file;
            }
        }
		echo json_encode($obj);

		break;

	case 'getListaEvetos':
		
		$rs = mysql_query('SELECT * FROM lugares');
		$bucle = 0;
		while($row = mysql_fetch_object($rs)){
			
			for($i =0; $i<76; $i++){
				
				$o = new stdClass();
				$o->id = $row->lugares_id;
				$o->tipo = $row->lugares_tipo;
				$o->cat = $cat[$row->lugares_tipo-1];
				$o->name = $row->lugares_nombre . ' ' . $bucle++;
				$o->tel = $row->lugares_tel;
				$o->dir = $row->lugares_dir;
				$o->lat = $row->lugares_lat;
				$o->lon = $row->lugares_lng;

				$array[] = $o;
			}
		}

		/*
		for($i =0; $i<4; $i++){
			
			foreach ($array as $value) {
				
				$array[] = $value;
			}

		}
		$bucle = 0;
		foreach ($array as $value) {
			$value->name =  $bucle;
			$array[] = $value;

		}*/
	//	shuffle($array);
		echo json_encode($array);
		break;
	
}

