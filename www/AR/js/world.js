var World = {


	array_lugares: new Array(), 
	//array_lugares : [{"id":"1","tipo":"1","cat":"Bar","name":"Yatay 0","tel":"23059020","dir":"Luis Alberto Herrera 941","lat":"-34.864598","lon":" -56.213087","alt":"8.7"},{"id":"2","tipo":"2","cat":"Restaurante","name":"Rosedal 1","tel":"23059020","dir":"Luis Alberto Herrera 213","lat":"-34.859702","lon":"-56.205906","alt":"15.8"},{"id":"3","tipo":"3","cat":"Cine","name":"P. Legislativo 2","tel":"23059020","dir":"Luis Alberto Herrera 213","lat":"-34.891497","lon":"-56.187308","alt":"22.8"}], 
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
				obj.arrayNum = i
				World.markerList.push(new Marker(obj, i));

		}


		alert('cargar_todos_los_markers: ' + cantidad_lugares)

	},



	// location updates, fired every time you call architectView.setLocation() in native environment
	locationChanged: function locationChangedFn(lat, lon, alt, acc) {


	},


	onMarkerSelected: function onMarkerSelectedFn(marker) {

		info(marker.obj)

	}
};


AR.context.onLocationChanged = World.locationChanged;
//AR.context.scene.cullingDistance = 5000

//AR.context.onScreenClick = World.onScreenClick;

function setWorld($json){

	 World.array_lugares = (JSON.parse($json))

	 World.cargar_todos_los_markers()

}


var obj_selected;


function info(obj){

	obj_selected = obj

	$('.name').html(obj_selected.name)
    $('.tipo').html(obj_selected.cat)
    $('.tel').html('T. ' + obj_selected.tel)
    $('.dir').html(obj_selected.dir)
	
	if(obj_selected.tipo == 1)	$('#info-data').css( 'background-color','#ff99ff')
	if(obj_selected.tipo == 2)	$('#info-data').css( 'background-color','#EFE923')
	if(obj_selected.tipo == 3)	$('#info-data').css( 'background-color','#28eaa4')
	if(obj_selected.tipo == 4)	$('#info-data').css( 'background-color','#00ccff')

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
		var func = encodeURIComponent("action=dir" + obj_selected.arrayNum);
		document.location = "architectsdk://" + func;
		return false;
	
	})
	new BotonImg($('#btn_star'), function (){
		var func = encodeURIComponent("action=fav" + obj_selected.arrayNum);
		document.location = "architectsdk://" + func;
		return false;
	})
	new BotonImg($('#btn_info'), function (){
		var func = encodeURIComponent("action=info" + obj_selected.arrayNum);
		document.location = "architectsdk://" + func;
		return false;
	})

})