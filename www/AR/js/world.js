var World = {


	array_lugares: new Array(), 
	array_eventos: new Array(), 

	/*array_lugares : [{"id":"4","tipo":"4","cat":"Evento","name":"Sheraton 3","tel":"23123123","dir":"dir dir dirsdad asd asd ","lat":"-34.924265","lon":"-56.158033","alt":"24.6","pub_ini":null,"pub_fin":null},{"id":"5","tipo":"4","cat":"Evento","name":"Rodelu 4","tel":"324234","dir":"324weleñfjs{dlkjfñlsdk ñas","lat":"-34.915748","lon":"-56.167437","alt":"14.1","pub_ini":null,"pub_fin":null},{"id":"6","tipo":"4","cat":"Evento","name":"Skate park 5","tel":"324234","dir":"324weleñfjs{dlkjfñlsdk ñas","lat":"-34.910883","lon":"-56.133464","alt":"2.8","pub_ini":null,"pub_fin":null}], 
	array_eventos : [{"id":"1","tipo":"1","cat":"Bar","name":"Yatay 0","tel":"23059020","dir":"Luis Alberto Herrera 941","lat":"-34.864598","lon":" -56.213087","alt":"8.7"},{"id":"2","tipo":"2","cat":"Restaurante","name":"Rosedal 1","tel":"23059020","dir":"Luis Alberto Herrera 213","lat":"-34.859702","lon":"-56.205906","alt":"15.8"},{"id":"3","tipo":"3","cat":"Cine","name":"P. Legislativo 2","tel":"23059020","dir":"Luis Alberto Herrera 213","lat":"-34.891497","lon":"-56.187308","alt":"22.8"}], 
	*/
	
	markerList: [],
	currentMarker: null,
	markerDrawable_bar: null,
	markerDrawable_restaurant: null,
	markerDrawable_cine: null,
	markerDrawable_evento: null,

	cargar_todos_los_markers: function loadPoisFromJsonDataFn() {

		World.markerDrawable_bar = new AR.ImageResource("img/markers/bar.png");
		World.markerDrawable_restaurant = new AR.ImageResource("img/markers/restaurant.png");
		World.markerDrawable_cine = new AR.ImageResource("img/markers/cine.png");
		World.markerDrawable_evento = new AR.ImageResource("img/markers/evento.png");

		World.markerList = [];
		

		var cantidad_lugares = World.array_lugares.length;
		for (var i = 0; i < cantidad_lugares; i++) {
		
			var obj = World.array_lugares[i];
				obj.arrayNum = i;
				obj.type = 'lugar';
				World.markerList.push(new Marker(obj));
		}


		var cantidad_eventos = World.array_eventos.length;
		for (var i = 0; i < cantidad_eventos; i++) {
		
			var obj = World.array_eventos[i];
				obj.arrayNum = i
				obj.type = 'evento'
				World.markerList.push(new Marker(obj));
		}


	},


	locationChanged: function locationChangedFn(lat, lon, alt, acc) {

	//	alert('wikitude locationChanged: ' + lat + ',' + lon + ',' + alt + ',' + acc)
		
	},


	onMarkerSelected: function onMarkerSelectedFn(marker) {

		info(marker.obj)

	}
};

AR.context.onLocationChanged = World.locationChanged

//World.cargar_todos_los_markers()
//AR.context.scene.cullingDistance = 5000

//AR.context.onScreenClick = World.onScreenClick;

function setWorld($json_lugares, $json_eventos){


	$('#info').hide()

	// destruyo todos los markers
	for(var i = 0; i < World.markerList.length; i++){      
	    World.markerList[i].markerObject.destroy(); 
	}
	
	World.array_lugares = (JSON.parse($json_lugares));
	World.array_eventos = (JSON.parse($json_eventos));
	World.cargar_todos_los_markers();


}


var obj_selected;


function info(obj){

	obj_selected = obj

	$('.name').html(obj_selected.name)
    $('.tipo').html(obj_selected.cat)
    $('.tel').html('T. ' + obj_selected.tel)
    $('.dir').html(obj_selected.dir)

    $('#pic').empty();	

    var img = new Image()
    
    $('#pic').append($(img));

    setTimeout(function(){
    	$('#pic img').attr('src', 'http://dev.metamorf.com.uy/geobar/img/pois/' + obj_selected.thumb);
    }, 0);
	
	if(obj_selected.tipo == 1)	$('#info-data').css( 'background-color','#ff99ff');
	if(obj_selected.tipo == 2)	$('#info-data').css( 'background-color','#EFE923');
	if(obj_selected.tipo == 3)	$('#info-data').css( 'background-color','#28eaa4');
	if(obj_selected.tipo == 4)	$('#info-data').css( 'background-color','#00ccff');
	if(obj_selected.tipo == 5)	$('#info-data').css( 'background-color','#9282A8');

	$('#info').show()

}

$(document).ready(function(){

	new BotonImg($('#btn-close'), function (){
		
		var func = encodeURIComponent("action=closeWikitudePlugin");
		document.location = "architectsdk://" + func;
		return false;
	})
	
	new BotonImg($('#btn_tel'), function (){
		document.location = 'tel://' + obj_selected.tel
	})
	new BotonImg($('#btn_dir'), function (){
		var func = encodeURIComponent("action=dir:" + obj_selected.type + ':' + obj_selected.arrayNum);
		document.location = "architectsdk://" + func;
		return false;
	
	})
	new BotonImg($('#btn_star'), function (){
		var func = encodeURIComponent("action=fav:" + obj_selected.type + ':' + obj_selected.arrayNum);
		document.location = "architectsdk://" + func;
		return false;
	})
	new BotonImg($('#btn_info'), function (){
		var func = encodeURIComponent("action=info:" + obj_selected.type + ':' + obj_selected.arrayNum);
		document.location = "architectsdk://" + func;
		return false;
	})

})