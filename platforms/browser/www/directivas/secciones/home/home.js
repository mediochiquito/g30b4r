geobarApp.directive('home', function(navigateService, SERVER) {
  return {
    restrict: 'E',
    templateUrl: 'directivas/secciones/home/home.html', 
    link: function(scope, elem, attrs){

    	scope.navigateService = navigateService
      scope.server = SERVER

    	
    }
  };
});

/*geobarApp.controller('home', function($scope, $log, $routeParams){
	
	$scope.status = $routeParams.id;
	$log.log($routeParams.id)

})*/