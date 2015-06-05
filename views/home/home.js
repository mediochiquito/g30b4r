geobarApp.controller('home', function($scope, $log, $routeParams){
	
	$scope.status = $routeParams.id;
	$log.log($routeParams.id)

})