geobarApp.service('navigateService', function($log,mapaService){

	var en_seccion = '';
	var historia = new Array();
	var ultima_seccion_eliminada_de_historia = null;
	var self = this;

	this.status = 0;
 	this.dir_animate  = 'enterSeccion';
 	this.secciones = new Object()

 	this.esPrimerPage = function(){	
 		return (historia.length==1);
 	}

 	this.setSecciones = function ($key, $init){
 		console.log(this.secciones)
 		this.secciones[$key] = $init;
 		
 	}

	this.go = function (secc, obj, entra_a_historia, $dir_animate, $recargar){

		if(typeof obj == 'undefined') obj = null;
		if(typeof $recargar == 'undefined') $recargar = true;
		


		switch(secc){
			
			case 'home':
				
				if(!$recargar) go_execute(secc, obj, entra_a_historia, $dir_animate);
				else{
					this.secciones['home'](obj, function(){
						go_execute(secc, obj, entra_a_historia, $dir_animate)
					})
				}
				break;

			case 'detalle':
				
				if(!$recargar) go_execute(secc, obj, entra_a_historia, $dir_animate);
				else{
					this.secciones['detalle'](obj, function(){
						go_execute(secc, obj, entra_a_historia, $dir_animate)
					})
				}
				break;

			case 'mapa':
				this.secciones['mapa']()
				go_execute(secc, obj, entra_a_historia, $dir_animate)
				break;

			case 'lista':
				this.secciones['lista'](obj)
				go_execute(secc, obj, entra_a_historia, $dir_animate)
				break;

			default:
				go_execute(secc, obj, entra_a_historia, $dir_animate)
				break;
		}

	}

	function go_execute(secc, obj, entra_a_historia, $dir_animate){

		if(typeof entra_a_historia == 'undefined') entra_a_historia = true;
		if(typeof $dir_animate == 'undefined') $dir_animate  = 'enterSeccion';

		self.dir_animate  = $dir_animate;
		self.active_page = secc;
		
		if(historia.length>0){
			if(historia[historia.length-1].secc == secc) entra_a_historia = false;
		}

		if(entra_a_historia) historia.push({'secc': secc, 'obj': obj});
		en_seccion = secc;
		
		self.status++;
	}



	this.back = function (){

		ultima_seccion_eliminada_de_historia = historia[historia.length-1];
		if(historia.length>1) historia.pop();
		
			setTimeout(function(){
				ultima_seccion_eliminada_de_historia =  null;
			},100)

		var penultimo_elemento = historia[historia.length-1];	
		this.go(penultimo_elemento.secc, penultimo_elemento.obj, false, 'backSeccion', false);
	}



	this.habilTranciosinar = function ($secc){
			
			
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
