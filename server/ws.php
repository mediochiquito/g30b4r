<?php
header('Access-Control-Allow-Origin: *');
include 'init.php';

switch($_GET['method']){

	case 'getDetalleEvento':
		$obj = new stdClass();
		$obj->nombre = 'Coso '.  $_GET['id'];
		$obj->desc = 'sakldjhlkasj dhlka jshdlkashdlkj ahsldkjhqwliuyeqwuyelqwuye lkqwj e,mbs ,mcb,mhc g,dhjg fkg sdkfgasjhdgkajshdg kjashdg k,jsahg dkjsahg dkjasg dkjhags kj';
		echo json_encode($obj);
		break;

	case 'getListaEvetos':
		
		$rs = mysql_query('SELECT * FROM lugares');
		
		$cat = array('Bar', 'Restaurante', 'Cine');

		while($row = mysql_fetch_object($rs)){
			
			
				$o = new stdClass();
				$o->id = $row->lugares_id;
				$o->tipo = $row->lugares_tipo;
				$o->cat = $cat[$row->lugares_tipo-1];
				$o->name = $row->lugares_nombre;
				$o->tel = $row->lugares_tel;
				$o->dir = $row->lugares_dir;
				$o->lat = $row->lugares_lat;
				$o->lon = $row->lugares_lng;


				$array[] = $o;
			
		}


		for($i =0; $i<4; $i++){
				
			foreach ($array as $value) {
				$array[] = $value;
			}

		}
		

		echo json_encode($array);
		break;
	
}

