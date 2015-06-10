<?php


switch($_GET['method']){


	case 'getDetalleEvento':
		$obj = new stdClass();
		$obj->nombre = 'Coso '.  $_GET['id'];
		$obj->desc = 'sakldjhlkasj dhlka jshdlkashdlkj ahsldkjhqwliuyeqwuyelqwuye lkqwj e,mbs ,mcb,mhc g,dhjg fkg sdkfgasjhdgkajshdg kjashdg k,jsahg dkjsahg dkjasg dkjhags kj';
		echo json_encode($obj);
		break;

	case 'getListaEvetos':
		
		for($i =0; $i<1300; $i++){

			$obj = new stdClass();
			$obj->id = $i;
			$obj->nombre = 'Evento  '.  $i;
			$obj->desc = "evento $i evento $i evento $i evento $i evento $i evento $i evento $i evento $i evento $i evento $i evento $i evento $i evento $i evento $i evento $i evento $i evento $i evento $i evento $i evento $i evento $i evento $i evento $i  ";
		
			$a[] = $obj;

		}

		echo json_encode($a);
		break;
	
}

