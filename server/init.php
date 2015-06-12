<?php
	session_start();
	session_cache_expire(360);
	ob_start("ob_gzhandler");
	ignore_user_abort ( true );
	error_reporting( E_ALL ^ E_NOTICE);

	if($_SERVER['HTTP_HOST'] == '127.0.0.1' || $_SERVER['HTTP_HOST'] == '192.168.0.2' || $_SERVER['HTTP_HOST'] == 'localhost' || $_SERVER['HTTP_HOST'] == 'mateomenestrina.no-ip.org' || $_SERVER['HTTP_HOST'] == '192.168.235.153') 	
	{

		define("SERVER", "http://".$_SERVER['HTTP_HOST']."http://192.168.0.2/g30b4r/server/", false);  
	
		define("DB_HOST", "localhost");
		define("DB_USER", "root");
		define("DB_PASS", "");
		define("DB_NAME", "geobar");
    
    }else if($_SERVER['HTTP_HOST'] == '192.168.235.140'){
		define("DB_HOST", "localhost");
		define("DB_USER", "root");
		define("DB_PASS", "root");
		define("DB_NAME", "geobar");
	}else{

		define("SERVER", "http://".$_SERVER['HTTP_HOST']."/", false);  
	
		define("DB_HOST", "localhost");
		define("DB_USER", "itauverano");
		define("DB_PASS", "Onc79%6d");
		define("DB_NAME", "metamorf_verano");

	}

	date_default_timezone_set('America/Argentina/Buenos_Aires');

	$conexion_mysql = mysql_connect( DB_HOST, DB_USER, DB_PASS) or die('Could not connect to mysql server. ' . mysql_error() );
	mysql_select_db(DB_NAME) or die('Could not select database.' . DB_NAME);
	mysql_query("SET NAMES utf8");