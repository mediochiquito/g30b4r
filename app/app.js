var geobarApp = angular.module('geobarApp', ['ngRoute', 'ngAnimate'])

.constant('SERVER', 'http://192.168.0.2/g30b4r/server/')

geobarApp.controller("menuCtrl", function($scope){



})	

geobarApp.controller("mainController",  function($scope, $location, $window, navigateService) {
	
	$scope.navigateService = navigateService;

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