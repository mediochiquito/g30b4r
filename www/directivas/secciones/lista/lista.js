geobarApp.directive('lista', function($window, $log, $http, SERVER, navigateService) {
  return {
    restrict: 'E',
    templateUrl: 'directivas/secciones/lista/lista.html',
    link:function ($scope, $elem, $attrs){
    	
		$scope.en_pagina = 10
    	


        $scope.keyDownFilter = function() {
           document.querySelector('.listado').scrollTop = 0
           $scope.en_pagina = 10

        }

    	$http.get(SERVER+'ws.php?method=getListaEvetos').success(function(data, status, headers, config) {
			   $scope.array_items = data;
               $scope.total  = $scope.array_items.length;
		}).error(function(data, status, headers, config) {});
    	



    	var holder_scrolleable = angular.element(document.querySelector('.listado'))
  		    holder_scrolleable.on("scroll", function() {
           	
      			var _scrollTop = this.scrollTop; // por donde va el scroll
      			var _offsetHeight = this.offsetHeight; // alto de la mascara
      			var _scrollHeight = this.scrollHeight; // alto del contenido

                $scope.enscroll =	_scrollTop;
                $scope.altoholder =  _offsetHeight;
                if((_offsetHeight +_scrollTop) > _scrollHeight) $scope.en_pagina += 10;

                $scope.$apply()
             

          });		

  		$scope.enscroll =	 0;
	    $scope.altoholder =  1000
	     
	    $scope.select_item = function ($id){

	 		navigateService.go('detalle', {id: $id});

	 	}
    }	
  };
})

.directive('itemLista', function($log) {
  return {
    restrict: 'A',
    scope: {
            item:'=', 
            index:'@', 
            enscroll: '=',
            altoholder: '='
        },

    templateUrl: 'directivas/secciones/lista/itemLista.html',
    link:function ($scope, $elem, $attrs){
        $scope.img_url = 'http://cs11219.vk.me/u105968034/a_8c894c89.jpg?i=' + $scope.index;
    }
  };
});
