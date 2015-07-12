var World = {

	initiallyLoadedData: false,
	//array_lugares:null, 
	array_lugares : [{"id":"1","tipo":"1","cat":"Bar","name":"Yatay 0","tel":"23059020","dir":"Luis Alberto Herrera 941","lat":"-34.864598","lon":" -56.213087","alt":"8.7"},{"id":"2","tipo":"2","cat":"Restaurante","name":"Rosedal 1","tel":"23059020","dir":"Luis Alberto Herrera 213","lat":"-34.859702","lon":"-56.205906","alt":"15.8"},{"id":"3","tipo":"3","cat":"Cine","name":"P. Legislativo 2","tel":"23059020","dir":"Luis Alberto Herrera 213","lat":"-34.891497","lon":"-56.187308","alt":"22.8"}], 
	markerDrawable_idle: null,
	markerDrawable_selected: null,
	markerList: [],
	currentMarker: null,
	markerDrawable_bar: null,
	markerDrawable_restaurant: null,
	markerDrawable_cine: null,
	markerDrawable_evento: null,


	requestDataFromLocal: function requestDataFromLocalFn(centerPointLatitude, centerPointLongitude) {
	
		var poiData = [];
		var cantidad_lugares = World.array_lugares.length
		


		for (var i = 0; i < cantidad_lugares; i++) {
			
			poiData.push(World.array_lugares[i]);

		}
		
		World.loadPoisFromJsonData(poiData);
		
	},
 
	loadPoisFromJsonData: function loadPoisFromJsonDataFn(poiData) {

		World.markerDrawable_bar = new AR.ImageResource("img/markers/bar.png");
		World.markerDrawable_restaurant = new AR.ImageResource("img/markers/restaurant.png");
		World.markerDrawable_cine = new AR.ImageResource("img/markers/cine.png");
		World.markerDrawable_evento = new AR.ImageResource("img/markers/evento.png");

		World.markerList = [];
		
		// loop through POI-information and create an AR.GeoObject (=Marker) per POI
		for (var i = 0; i < poiData.length; i++) {
		
			var obj = poiData[i];
				obj.arrayNum = i
			World.markerList.push(new Marker(obj, i));

		}

		
	},



	// location updates, fired every time you call architectView.setLocation() in native environment
	locationChanged: function locationChangedFn(lat, lon, alt, acc) {

		if (!World.initiallyLoadedData) {
			World.initiallyLoadedData = true;
			World.requestDataFromLocal(lat, lon);
			
		}

	},


	onMarkerSelected: function onMarkerSelectedFn(marker) {

		info(marker.obj)

	}
};


AR.context.onLocationChanged = World.locationChanged;
AR.context.scene.cullingDistance = 5000

//AR.context.onScreenClick = World.onScreenClick;

function setLugares($json){

	 World.array_lugares = (JSON.parse( $json))

}


var obj_selected;

//alert(window.localStorage.getItem('local_sync_lugares'));

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
		document.location = 'architectsdk://action=closeWikitudePlugin'
	})
	
	new BotonImg($('#btn_tel'), function (){
		document.location = 'tel://' + obj_selected.tel
	})
	new BotonImg($('#btn_dir'), function (){

		document.location = 'architectsdk://action=dir:' + obj_selected.arrayNum
	})
	new BotonImg($('#btn_star'), function (){
		document.location = 'architectsdk://action=dir:' + obj_selected.arrayNum
	})
	new BotonImg($('#btn_info'), function (){
		document.location = 'architectsdk://action=dir:' + obj_selected.arrayNum
	})



})