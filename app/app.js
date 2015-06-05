var geobarApp = angular.module('geobarApp', ['ngRoute', 'ngAnimate'])

/*.run(function($rootScope) {  $rootScope.color = 'yellow';  })
.value('debug', true) 
.constant('VERSION', '0.0.1')*/

.config(function ($routeProvider, $compileProvider, $locationProvider) {

  /*  $routeProvider
	   

	    .when('/terms', {
	        controller: 'terms',
	        templateUrl: 'views/terms/terms.html'       

	    })
	    .when('/home', {
	        controller: 'home',
	        templateUrl: 'views/home/home.html'        
	    })
	    .when('/lista', {
	        controller: 'lista',
	        templateUrl: 'views/lista/lista.html'        
	    })

	    .otherwise({ reditrectTo : "/" });
		
	    console.log($compileProvider)
    */
   	// $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
});


geobarApp.controller("mainController",  function($scope, $location, $window, navigateService) {



	$scope.navigateService = navigateService;

	$scope.atras = function (){
		//$location.
		// $window.history.back();
		navigateService.go('atras')
	}
	$scope.lista = function (){

		//navigateService.go('lista')
		//$location.path('lista')
		//$window.history.back();
	}
	
});


geobarApp.controller("seccionLoaderController",  function($scope, navigateService) {


	$scope.visible = true;


	$scope.cliqueando = function (){

		$scope.visible = false;

	}








	
});

