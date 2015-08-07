<?php
header('Access-Control-Allow-Origin: *');
include 'init.php';


function random() {
 return mt_rand() / (mt_getrandmax() + 1);
}

$cat = array('Bar', 'Restaurante', 'Cine', 'Evento', 'Teatro');
switch($_GET['method']){


	case 'uploadImg':

		$hash_file = md5(date('Ymdhis').$_SERVER['REMOTE_ADDR'].rand(0,9999999999));
		$name = $_FILES["file"]["name"];		
		$extension = end(explode('.', $name));	
		$destino =dirname(__FILE__). "/img/pois/$hash_file.$extension";

  		if(move_uploaded_file( $_FILES['file']['tmp_name'] , $destino )){
			die($hash_file.'.'.$extension);
  		}
  		
  	break;

  	case 'savePoi':

  		$params = json_decode(file_get_contents('php://input'));
  
	    $array_iniPub = explode('T', $params->siniPub);
	    $array_finPub = explode('T', $params->finPub);

		if(isset($params->id)){

				mysql_query ('UPDATE lugares SET 	

								lugares_pub_ini   = "' . mysql_real_escape_string($array_iniPub[0]) . '",  
								lugares_pub_fin   = "' . mysql_real_escape_string($array_finPub[0]) . '", 
								lugares_tipo  	  = "' . mysql_real_escape_string($params->tipo) . '",
								lugares_nombre 	  = "' . mysql_real_escape_string($params->name) . '",
								lugares_tel		  = "' . mysql_real_escape_string($params->tel) . '",
								lugares_dir 	  = "' . mysql_real_escape_string($params->dir) . '",
								lugares_long_desc = "' . mysql_real_escape_string($params->desc) . '",
								lugares_lat 	  = "' . mysql_real_escape_string($params->lat) . '",
								lugares_lng 	  = "' . mysql_real_escape_string($params->lon) . '",
								lugares_alt 	  = "' . mysql_real_escape_string($params->alt)  . '" ,
								lugares_imgs 	  = "' . mysql_real_escape_string(json_encode($params->imgs))  . '"   ,
								lugares_thumb 	  = "' . mysql_real_escape_string($params->thumb)  . '"   

								WHERE lugares_id = "'. $params->id .'" 
									
								');

		}else{

					mysql_query ('INSERT INTO  lugares SET 	

								lugares_pub_ini   = "' . mysql_real_escape_string($array_iniPub[0]) . '",  
								lugares_pub_fin   = "' . mysql_real_escape_string($array_finPub[0]) . '", 
								lugares_tipo  	  = "' . mysql_real_escape_string($params->tipo) . '",
								lugares_nombre 	  = "' . mysql_real_escape_string($params->name) . '",
								lugares_tel		  = "' . mysql_real_escape_string($params->tel) . '",
								lugares_dir 	  = "' . mysql_real_escape_string($params->dir) . '",
								lugares_long_desc = "' . mysql_real_escape_string($params->desc) . '",
								lugares_lat 	  = "' . mysql_real_escape_string($params->lat) . '",
								lugares_lng 	  = "' . mysql_real_escape_string($params->lon) . '",
								lugares_alt 	  = "' . mysql_real_escape_string($params->alt)  . '" ,
								lugares_imgs 	  = "' . mysql_real_escape_string(json_encode($params->imgs))  . '"  ,
								lugares_thumb 	  = "' . mysql_real_escape_string($params->thumb)  . '"   


								');


					echo mysql_insert_id();



		}
		
		$sync = json_decode(file_get_contents('sync.txt'));
		
		$sync_eventos = $sync->eventos*1;
		$sync_lugares = $sync->lugares*1;

		if($params->tipo == 4){
			$sync_eventos++;
		}else{
			$sync_lugares++;
		}

		$s = new stdClass();
		$s->eventos = $sync_eventos;
		$s->lugares = $sync_lugares;
		
		file_put_contents('sync.txt', json_encode($s));

  	break;

	case 'getHomeImages':

		$handle = opendir(dirname(realpath(__FILE__)).'/img/home/');
        while($file = readdir($handle)){
            if($file !== '.' && $file !== '..'){
               $obj->fotos[] = $file;
            }
        }
        echo json_encode($obj);
		break;

	case 'getListaAllPois':

		$sql = 'SELECT * FROM lugares  ORDER BY lugares_nombre ASC';		
		$rs = mysql_query($sql);
		$bucle = 0;
	
		while($row = mysql_fetch_object($rs)){
			
			$o = new stdClass();
			$o->id = $row->lugares_id;
			$o->tipo = $row->lugares_tipo;
			$o->cat = $cat[$row->lugares_tipo-1];
			$o->name = $row->lugares_nombre ;
			$o->tel = $row->lugares_tel;
			$o->dir = $row->lugares_dir;
			$o->lat = $row->lugares_lat;
			$o->lon = $row->lugares_lng;
			$o->alt = $row->lugares_alt;
			$o->desc = $row->lugares_long_desc;
			$o->pub_ini = $row->lugares_pub_ini;
			$o->pub_fin = $row->lugares_pub_fin;
			$o->thumb = $row->lugares_thumb;
			$o->imgs = json_decode($row->lugares_imgs);
			
			$array[] = $o;
			
		}

		echo json_encode($array);
		
		
	break;


	case 'getLista':
		
		switch($_GET['data']){

			case 'lugares':
				$sql = 'SELECT * FROM lugares WHERE lugares_tipo != 4 ORDER BY lugares_nombre ASC';
				break;
			case 'eventos':
				$sql = 'SELECT * FROM lugares WHERE lugares_tipo = 4 and lugares_pub_fin>=NOW()  ORDER BY lugares_nombre ASC';
				break;
			case 'lugareseventos':
				$sql = 'SELECT * FROM lugares  ORDER BY lugares_nombre ASC';
				break;
		}
		
		$rs = mysql_query($sql);
		$bucle = 0;

		$array = new stdClass();


		while($row = mysql_fetch_object($rs)){
			

			if($row->lugares_tipo == 4){

				//for($i =0; $i<50; $i++){
					$o = new stdClass();
					$o->id = $row->lugares_id;
					$o->tipo = $row->lugares_tipo;
					$o->cat = $cat[$row->lugares_tipo-1];
					$o->name = $row->lugares_nombre;
					$o->tel = $row->lugares_tel;
					$o->dir = $row->lugares_dir;
					$o->lat = $row->lugares_lat;
					$o->lon = $row->lugares_lng;
					$o->alt = $row->lugares_alt;
					$o->pub_ini = $row->lugares_pub_ini;
					$o->pub_fin = $row->lugares_pub_fin;
					$o->thumb = $row->lugares_thumb;
			
			
					$array->eventos[] = $o;
				//}
				//shuffle($array->eventos);
		
			}else{

				//for($i =0; $i<50; $i++){
					
					$o = new stdClass();
					$o->id = $row->lugares_id;
					$o->tipo = $row->lugares_tipo;
					$o->cat = $cat[$row->lugares_tipo-1];
					$o->name = $row->lugares_nombre;
					$o->tel = $row->lugares_tel;
					$o->dir = $row->lugares_dir;
					/*$o->lat = (float)$row->lugares_lat + (random()*0.098);
					$o->lon = (float)$row->lugares_lng - (random()*0.098);*/
					$o->lat = $row->lugares_lat;
					$o->lon = $row->lugares_lng;
					$o->alt = $row->lugares_alt;
					$o->thumb = $row->lugares_thumb;
					
			
					$array->lugares[] = $o;
				//}

				
			}
			

		}

	
		
		echo json_encode($array);
		break;


		
	case 'getDetalle':
		
		$rs = mysql_query('SELECT lugares_long_desc,lugares_imgs FROM lugares WHERE lugares_id=' .  $_GET['id']);
		$row = mysql_fetch_object($rs);
		$obj = new stdClass();
		$obj->long_desc = $row->lugares_long_desc;
		$obj->fotos = json_decode($row->lugares_imgs);

		/*$handle = @opendir(dirname(realpath(__FILE__)).'/img/lugares/' .  $_GET['id']);
        while($file = @readdir($handle)){
            if($file !== '.' && $file !== '..' && $file !== 'thumb.jpg'){
               $obj->fotos[] = $file;
            }
        }
		*/
		echo json_encode($obj);
		break;



	
}

