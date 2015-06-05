
geobarApp.directive('home', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/home/home.html'
  };
});

/*geobarApp.controller('home', function($scope, $log, $routeParams){
	
	$scope.status = $routeParams.id;
	$log.log($routeParams.id)

})*/