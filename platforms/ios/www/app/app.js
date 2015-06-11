var geobarApp = angular.module('geobarApp', ['ngAnimate'])

//.constant('SERVER', 'http://192.168.0.2/g30b4r/server/')
 .constant('SERVER', 'http://192.168.235.140/g30b4r/server/')
//.constant('SERVER', 'http://localhost/g30b4r/server/')


geobarApp.controller("menuCtrl", function($scope){

})	


geobarApp.controller("mainController",  function($scope, $location, $window, navigateService) {

	$scope.navigateService = navigateService;

	if(window.localStorage.getItem('distancia') == null) window.localStorage.setItem('distancia', 5);
	if(window.localStorage.getItem('bares') == null) window.localStorage.setItem('bares', 1);
	if(window.localStorage.getItem('restaurantes') == null) window.localStorage.setItem('restaurantes', 1);
	if(window.localStorage.getItem('cines') == null) window.localStorage.setItem('cines', 1);
	if(window.localStorage.getItem('eventos') == null) window.localStorage.setItem('eventos', 1);
	if(window.localStorage.getItem('favoritos') == null) window.localStorage.setItem('favoritos', 1);
	if(window.localStorage.getItem('push') == null) window.localStorage.setItem('push', 1);


});	


geobarApp.controller("seccionLoaderController",  function($scope, $rootScope, navigateService) {
	 
	$scope.navigateService = navigateService;

	$scope.active_page = 'home'

	$scope.getAnimationClass = function ($secc){
		
		if(!navigateService.habilTranciosinar($secc)) return;
		var r = $scope.dir_animate + 'Hide'
		if($scope.active_page == $secc) r = $scope.dir_animate + 'Show'
		return r
	}


	$scope.$watch('navigateService.status', function(oldVal, newVal, scope) {
	    
	    $scope.dir_animate = navigateService.dir_animate
	    $scope.active_page = navigateService.active_page;
	     
	});

 	navigateService.go('lista')

	$scope.cliqueando = function (){
		$scope.visible = false;
	}

});


geobarApp.filter('rango',function(){
		return function(array,desde,hasta){
			desde = parseInt(desde,10);
			hasta = parseInt(hasta,10);

			try{
				return array.slice(desde,hasta);
			}catch(e){

				return array
			}

			
		}
	});