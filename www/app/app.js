var geobarApp = angular.module('geobarApp', ['ngTouch', 'ngAnimate', 'ngMaterial', 'Utils', 'cordovaGeolocationModule', 'plugins.toast'])

 //.constant('SERVER', 'http://192.168.0.2/g30b4r/server/')
//.constant('SERVER', 'http://mateomenestrina.no-ip.org/g30b4r/server/')
  .constant('SERVER', 'http://dev.metamorf.com.uy/geobar/')
 
 .constant('SCREEN_SIZE', {ancho: window.innerWidth, alto: window.innerHeight})

geobarApp.controller("mainController",  function($document, $rootScope, ToastService, cordovaGeolocationService, $timeout, $scope, $http, Loading, SERVER, $location, $window, navigateService, lugaresService, eventosService, arService) {

	$scope.rootScope = $rootScope
	$scope.alto_screen = window.innerHeight;

//	console.log(navigator.userAgent)

	$scope.init = function (){

		$rootScope.position = null;

		cordovaGeolocationService.watchPosition();

		if(window.localStorage.getItem('local_sync_lugares') == null) window.localStorage.setItem('local_sync_lugares', 0);	
		if(window.localStorage.getItem('local_sync_eventos') == null)  window.localStorage.setItem('local_sync_eventos', 0);	

		$http.get(SERVER+'sync.php?ac=' + new Date().getTime()).success(function(json_sync, status, headers, config) {
				
			var local_sync_lugares = window.localStorage.getItem('local_sync_lugares');	
			var local_sync_eventos = window.localStorage.getItem('local_sync_eventos');	

			var debe_sincronzar = '';
			if(json_sync.lugares != local_sync_lugares) debe_sincronzar += 'lugares'
			if(json_sync.eventos != local_sync_eventos) debe_sincronzar += 'eventos'

			if(debe_sincronzar != ''){

				$http.get(SERVER+'ws.php?method=getLista&data=' + debe_sincronzar + '&ac=' + new Date().getTime())
				.success(function(data, status, headers, config) {

					if(typeof data.lugares != 'undefined'){
						window.localStorage.setItem('json_lugares', JSON.stringify(data.lugares));
						window.localStorage.setItem('local_sync_lugares', json_sync.lugares)
					}

					if(typeof data.eventos != 'undefined'){
						window.localStorage.setItem('json_eventos', JSON.stringify(data.eventos));
						window.localStorage.setItem('local_sync_eventos', json_sync.eventos)
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
		arService.set()
		Loading.ocultar()
		$document.on('touchmove', hack)
	}


	function hack(){

		$document.off('touchmove', hack)
	}

	if(window.localStorage.getItem('distancia') == null) window.localStorage.setItem('distancia', 5);
	if(window.localStorage.getItem('bares') == null) window.localStorage.setItem('bares', 1);
	if(window.localStorage.getItem('restaurantes') == null) window.localStorage.setItem('restaurantes', 1);
	if(window.localStorage.getItem('cines') == null) window.localStorage.setItem('cines', 1);
	if(window.localStorage.getItem('teatros') == null) window.localStorage.setItem('teatros', 1);
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