var geobarApp = angular.module('geobarApp', ['ngAnimate', 'ngTouch', 'Utils', 'cordovaGeolocationModule'])

 .constant('SERVER', 'http://192.168.0.2/g30b4r/server/')
 .constant('SCREEN_SIZE', {ancho: window.innerWidth, alto: window.innerHeight})

geobarApp.controller("mainController",  function($rootScope, cordovaGeolocationService, $timeout, $scope, $http, Loading, SERVER, $location, $window, navigateService, lugaresService, eventosService ) {

	$scope.rootScope = $rootScope
	$scope.alto_screen = window.innerHeight;

	console.log(navigator.userAgent)

	$scope.init = function (){

		$rootScope.position = null;

		cordovaGeolocationService.watchPosition();

		if(window.localStorage.getItem('locala_sync_lugares') == null) window.localStorage.setItem('locala_sync_lugares', 0);	
		if(window.localStorage.getItem('local_sync_eventos') == null)  window.localStorage.setItem('local_sync_eventos', 0);	

		$http.get(SERVER+'sync.json?ac=' + new Date().getTime()).success(function(json_sync, status, headers, config) {
				
			var locala_sync_lugares = window.localStorage.getItem('locala_sync_lugares');	
			var locala_sync_eventos = window.localStorage.getItem('locala_sync_eventos');	

			var debe_sincronzar = '';
			if(json_sync.lugares != locala_sync_lugares) debe_sincronzar += 'lugares'
			if(json_sync.eventos != locala_sync_eventos) debe_sincronzar += 'eventos'

			if(debe_sincronzar != ''){

				$http.get(SERVER+'ws.php?method=getLista&data=' + debe_sincronzar + '&ac=' + new Date().getTime())
				.success(function(data, status, headers, config) {

					if(typeof data.lugares != 'undefined'){
						window.localStorage.setItem('json_lugares', JSON.stringify(data.lugares));
						window.localStorage.setItem('locala_sync_lugares', json_sync.lugares)
					}

					if(typeof data.eventos != 'undefined'){
						window.localStorage.setItem('json_eventos', JSON.stringify(data.eventos));
						window.localStorage.setItem('locala_sync_eventos', json_sync.eventos)
					}

					// actualizo ok
				    iniciar_app();

				})
				.error(function(){
					iniciar_app()
				});

			} else  iniciar_app();
				
		}).error(function(){
			iniciar_app()
		})

	}




	function iniciar_app(){	
		lugaresService.setAll()
		eventosService.setAll()
		
		Loading.ocultar()
	}





	if(window.localStorage.getItem('distancia') == null) window.localStorage.setItem('distancia', 5);
	if(window.localStorage.getItem('bares') == null) window.localStorage.setItem('bares', 1);
	if(window.localStorage.getItem('restaurantes') == null) window.localStorage.setItem('restaurantes', 1);
	if(window.localStorage.getItem('cines') == null) window.localStorage.setItem('cines', 1);
	if(window.localStorage.getItem('eventos') == null) window.localStorage.setItem('eventos', 1);
	if(window.localStorage.getItem('favoritos') == null) window.localStorage.setItem('favoritos', 1);
	if(window.localStorage.getItem('push') == null) window.localStorage.setItem('push', 1);
});	


geobarApp.controller("menuCtrl", function($scope, navigateService){
	$scope.navigateService = navigateService;
})	








geobarApp.controller("seccionLoaderController",  function($scope, $rootScope, navigateService, $timeout) {
	
	$scope.navigateService = navigateService;
	$scope.active_page = 'home';

	$scope.getAnimationClass = function ($secc){
		
		var habil_trans = navigateService.habilTranciosinar($secc)
		
		if(!habil_trans) return;

		var r = $scope.dir_animate + 'Hide'
		if($scope.active_page == $secc) r = $scope.dir_animate + 'Show'
		return r
	}

	$scope.$watch('navigateService.status', function(oldVal, newVal, scope) {
	   	
	    $scope.dir_animate = navigateService.dir_animate
	    $scope.active_page = navigateService.active_page;
	   
	});

	//setTimeout(function(){
		 //navigateService.go('home')
		// navigateService.go('detalle', {item: {'id': 2}});
	//	$scope.$apply()
	//}, 2000)

	$scope.cliqueando = function (){
		$scope.visible = false;
	}

});