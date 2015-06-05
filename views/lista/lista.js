geobarApp.controller('lista', function($scope){
		
	

	$scope.array_items = new Array();
	


	for(var i=0; i <= 100; i++) {

		$scope.array_items.push({value: 'Item '+ i})

	}
	
	


})