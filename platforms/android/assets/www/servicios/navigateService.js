geobarApp.service('navigateService', function($log,mapaService){

	var en_seccion = '';
	var historia = new Array();
	var ultima_seccion_eliminada_de_historia = null;


	this.status = 0;
	this.obj_detalle = null; 
 	this.dir_animate  = 'enterSeccion';

 	this.secciones = new Object()


 	this.esPrimerPage = function(){
 		
 		return (historia.length==1);

 	}


 	this.setSecciones = function ($key, $controller){

 		this.secciones[$key] = $controller

 	}

	this.go = function (secc, obj, entra_a_historia, $dir_animate){

		/*ultima_seccion_eliminada_de_historia = null*/
		if(typeof obj == 'undefined') obj = null;
		if(typeof entra_a_historia == 'undefined') entra_a_historia = true;
		if(typeof $dir_animate == 'undefined') $dir_animate  = 'enterSeccion';

		this.dir_animate  = $dir_animate;
		this.active_page = secc;
		mapaService.ocultar()

		switch(secc){
			case 'detalle':
				this.active_detalle = true; 
				this.obj_detalle = obj;
				mapaService.mostrar()
				break;

			case 'mapa':
				this.secciones[secc]._set()
				break;
		}

		if(historia.length>0){
			if(historia[historia.length-1].secc == secc) entra_a_historia = false;
		}

		if(entra_a_historia) historia.push({'secc': secc, 'obj': obj});
		en_seccion = secc;
		this.status++;
	}

	this.back = function (){

		ultima_seccion_eliminada_de_historia = historia[historia.length-1];
		if(historia.length>1) historia.pop();
		
		if(historia.length == 1) {
			setTimeout(function(){
				ultima_seccion_eliminada_de_historia =  null;
			},100)
			
			
		}


		var penultimo_elemento = historia[historia.length-1];	
		this.go(penultimo_elemento.secc, penultimo_elemento.obj, false, 'backSeccion');
	}



	this.habilTranciosinar = function ($secc){
/*
			try{
				console.log('this.dir_animate: ' + this.dir_animate)
				console.log('ultima_seccion_eliminada_de_historia.secc: ' + ultima_seccion_eliminada_de_historia.secc)
			}catch(e){
			
			}*/
			
			if(ultima_seccion_eliminada_de_historia !=  null && ultima_seccion_eliminada_de_historia.secc == $secc) return true;
			

			if(historia.length>0){
				var elem = historia[historia.length-1];
				if(elem.secc == $secc)  return true;
			}
			if(this.dir_animate == 'enterSeccion' && historia.length > 1){
				var elem = historia[historia.length-2];
				if(elem.secc == $secc)  return true;
			}
			return false;
	}

})
