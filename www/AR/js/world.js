var World = {

	initiallyLoadedData: false,
	array_lugares:null, 
	markerDrawable_idle: null,
	markerDrawable_selected: null,
	markerList: [],
	currentMarker: null,



	requestDataFromLocal: function requestDataFromLocalFn(centerPointLatitude, centerPointLongitude) {
	



		var poiData = [];
		var cantidad_lugares = World.array_lugares.length
		
		for (var i = 0; i < cantidad_lugares; i++) {
			
			poiData.push({ 
				"item":  World.array_lugares[i]
			});

		}
		
		World.loadPoisFromJsonData(poiData);
		
	},

	loadPoisFromJsonData: function loadPoisFromJsonDataFn(poiData) {

		World.markerDrawable_bar = new AR.ImageResource("../img/markers/bar.png");
		World.markerDrawable_restaurant = new AR.ImageResource("../img/markers/restaurant.png");
		World.markerDrawable_cine = new AR.ImageResource("../img/markers/cine.png");
		World.markerDrawable_evento = new AR.ImageResource("../img/markers/evento.png");

		World.markerList = [];

		// loop through POI-information and create an AR.GeoObject (=Marker) per POI
		for (var i = 0; i < poiData.length; i++) {
			
			var obj = poiData[i].item;
			World.markerList.push(new Marker(obj));

		}

		
	},



	// location updates, fired every time you call architectView.setLocation() in native environment
	locationChanged: function locationChangedFn(lat, lon, alt, acc) {

		if (!World.initiallyLoadedData) {
			World.requestDataFromLocal(lat, lon);
			World.initiallyLoadedData = true;
		}

	},


	onMarkerSelected: function onMarkerSelectedFn(marker) {

		alert(marker.obj)

	}
};


AR.context.onLocationChanged = World.locationChanged;


//AR.context.onScreenClick = World.onScreenClick;


function setLugares($json){
	
	 World.array_lugares = (JSON.parse( $json))

}