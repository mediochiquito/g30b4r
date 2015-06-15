geobarApp.directive('lista', function($window, $log, $http, SERVER, navigateService, SCREEN_SIZE,$filter) {
  return {
    restrict: 'E',
    templateUrl: 'directivas/secciones/lista/lista.html',
    link:function ($scope, $elem, $attrs){
    	
		    $scope.screen_alto = window.innerHeight
        $scope.en_pagina = 10

        $scope.cargarMas = function (){
            // revisar que hago despues con el delay   
            setTimeout(function (){
                $scope.en_pagina += 10;
                $scope.$apply()
            }, 300)                
        }
        



        $scope.keyDownFilter = function() {
            document.querySelector('.listado').scrollTop = 0
            $scope.en_pagina = 10
        }

    	$http.get(SERVER+'ws.php?method=getListaEvetos').success(function(data, status, headers, config) {
			   $scope.array_items = data;
         $scope.total  = $scope.array_items.length;
         $scope.$watch('filtro', function (){
              $scope.total =  $filter('filter')($scope.array_items, $scope.filtro).length
         })
       
		  }).error(function(data, status, headers, config) {});


    	var holder_scrolleable = angular.element(document.querySelector('.listado'));

  		holder_scrolleable.on("scroll", function() {

          	var _scrollTop = this.scrollTop; // por donde va el scroll
          	var _offsetHeight = this.offsetHeight; // alto de la mascara
          	var _scrollHeight = this.scrollHeight; // alto del contenido
            $scope.enscroll =	_scrollTop;
            $scope.altoholder =  _offsetHeight;
            if((_offsetHeight +_scrollTop) > _scrollHeight) {
                $scope.en_pagina += 10;
            }
            $scope.$apply();

        });		

        
  		$scope.enscroll =	 0;
	    $scope.altoholder =  1000;
	     
	    $scope.select_item = function ($id){

	 		  navigateService.go('detalle', {id: $id});

	   	}
    }	
  };
})

.directive('itemLista', function(SERVER) {
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
      
        $scope.img_url = SERVER + 'img/lugares/' + $scope.item.id + '/thumb.jpg';
       /* if($scope.item.tipo==1) $scope.tipo = 'Bar'
        if($scope.item.tipo==2) $scope.tipo = 'Restaurante'
        if($scope.item.tipo==3) $scope.tipo = 'Cine'*/
    }

  };

});
