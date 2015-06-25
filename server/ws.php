<?php
header('Access-Control-Allow-Origin: *');
include 'init.php';


$cat = array('Bar', 'Restaurante', 'Cine', 'Evento');
switch($_GET['method']){

	case 'getHomeImages':

		$handle = opendir(dirname(realpath(__FILE__)).'/img/home/');
        while($file = readdir($handle)){
            if($file !== '.' && $file !== '..'){
               $obj->fotos[] = $file;
            }
        }
        echo json_encode($obj);
		break;


	case 'getLista':
		
		switch($_GET['data']){

			case 'lugares':
				$sql = 'SELECT * FROM lugares WHERE lugares_tipo != 4';
				break;
			case 'eventos':
				$sql = 'SELECT * FROM lugares WHERE lugares_tipo = 4';
				break;
			case 'lugareseventos':
				$sql = 'SELECT * FROM lugares';
				break;
		}
		
		$rs = mysql_query($sql);
		$bucle = 0;

		$array = new stdClass();


		while($row = mysql_fetch_object($rs)){
			
				$o = new stdClass();
				$o->id = $row->lugares_id;
				$o->tipo = $row->lugares_tipo;
				$o->cat = $cat[$row->lugares_tipo-1];
				$o->name = $row->lugares_nombre . ' ' . $bucle++;
				$o->tel = $row->lugares_tel;
				$o->dir = $row->lugares_dir;
				$o->lat = $row->lugares_lat;
				$o->lon = $row->lugares_lng;

			if($row->lugares_tipo == 4){

				$o->pub_ini = $row->lugares_pub_ini;
				$o->pub_fin = $row->lugares_pub_fin;
				for($i =0; $i<100; $i++){
					$array->eventos[] = $o;
				}
		
			}else{
				for($i =0; $i<100; $i++){
					$array->lugares[] = $o;
				}
			}
			

		}

		shuffle($array->eventos);
		shuffle($array->lugares);
		echo json_encode($array);
		break;


		
	case 'getDetalle':
		
		$rs = mysql_query('SELECT lugares_long_desc FROM lugares WHERE lugares_id=' .  $_GET['id']);
		$row = mysql_fetch_object($rs);
		$obj = new stdClass();
		$obj->long_desc = $row->lugares_long_desc;
		
		$handle = @opendir(dirname(realpath(__FILE__)).'/img/lugares/' .  $_GET['id']);
        while($file = @readdir($handle)){
            if($file !== '.' && $file !== '..' && $file !== 'thumb.jpg'){
               $obj->fotos[] = $file;
            }
        }

		echo json_encode($obj);
		break;



	
}

