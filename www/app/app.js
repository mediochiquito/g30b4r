var geobarApp = angular.module('geobarApp', ['ngAnimate', 'ngTouch'])

 .constant('SERVER', 'http://192.168.0.2/g30b4r/server/')
 .constant('SCREEN_SIZE', {ancho: window.innerWidth, alto: window.innerHeight})






geobarApp.controller("mainController",  function($rootScope, $scope, $http, Loading, SERVER, $location, $window, navigateService, mapaService) {

	$scope.rootScope = $rootScope
	$scope.alto_screen = window.innerHeight;


	console.log(navigator.userAgent)

	if(window.localStorage.getItem('sync') == null) window.localStorage.setItem('sync', 0);	
	var sync = window.localStorage.getItem('sync');
	var d = new Date();
	$http.get(SERVER+'sync.txt?ac=' + d.getTime()).success(function(data_sync, status, headers, config) {


		if(String(data_sync) != String(sync)){

			$http.get(SERVER+'ws.php?method=getListaEvetos').success(function(data, status, headers, config) {
          		

		       window.localStorage.setItem('json_lugares', JSON.stringify(data));
		       window.localStorage.setItem('sync', String(data_sync))
		       $rootScope.json_lugares = data

		       iniciar_app()

		    });

		}else{

			iniciar_app()

		}
		
	}).error(function(){
			
			iniciar_app()

	})

	//mapaService.init()

	function iniciar_app(){

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


geobarApp.controller("seccionLoaderController",  function($scope, $rootScope, navigateService) {
	$scope.navigateService = navigateService;
	$scope.active_page = 'home'
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
		navigateService.go('home')
		//$scope.$apply()
	//}, 100)

	$scope.cliqueando = function (){
		$scope.visible = false;
	}

});