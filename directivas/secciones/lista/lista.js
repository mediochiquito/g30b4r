geobarApp.directive('lista', function($window, $log, $http, SERVER, navigateService) {
 

  return {
    restrict: 'E',
    templateUrl: 'directivas/secciones/lista/lista.html',
    link:function ($scope, $elem, $attrs){
		

    	$http.get(SERVER+'ws.php?method=getListaEvetos').success(function(data, status, headers, config) {

			  $scope.array_items = data;

			  }). error(function(data, status, headers, config) {
			  		
			  });

  		 $elem.bind("scroll", function() {
             
                 console.log(this.pageYOffset);
            
        });		
 		

 		document.querySelector('.litado').addEventListener('scroll', $scope.onScroll);
        
        $scope.onScroll = function (evt) {
          $elem.scrollTop = $elem.prop('scrollTop');
          console.log($elem.scrollTop);

          $scope.$apply();
        };
			// $elem.on("scroll", function(e) {
			// 	       console.log('scroll')
			// 	       console.log(e.pageYOffset)
			// 	       $scope.visible = false;
			// })
		



      	//   var windowEl = angular.element($window);
	      // var handler = function() {
	      //   // $scope.scroll = windowEl.scrollTop();
	      //   $log.log($window.scrollTop)


	      // }
	      // windowEl.on('scroll', $scope.$apply.bind($scope, handler));
    	  // handler();
    


	 	$scope.select_item = function ($id){

	 		
	 		navigateService.go('detalle', {id: $id});	


	 	}

    },
     controller:function ($scope){
			

			// angular.element($window).bind("scroll", function(e) {
			// 	       console.log('scroll')
			// 	       console.log(e.pageYOffset)
			// 	       $scope.visible = false;
			// 	})
		

    }

    


  };
});

// geobarApp.controller('lista', function($scope){
		
	


	
	


// })