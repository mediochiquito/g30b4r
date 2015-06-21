geobarApp.directive('lista', function($window, $log, navigateService, SCREEN_SIZE,$filter) {
 
 return {
    restrict: 'E',
    templateUrl: 'directivas/secciones/lista/lista.html',

    link:function ($scope, $elem, $attrs){

		    $scope.screen_alto = window.innerHeight
        $scope.en_pagina = 10

        $scope._set = function ($obj){

          $scope.en_pagina = 10;
          $scope.array_items = JSON.parse( window.localStorage.getItem('json_lugares'));
          $scope.total  = $scope.array_items.length;
          
        } 
        navigateService.setSecciones('lista', $scope._set);


        $scope.cargarMas = function (){
            // revisar que hago despues con el delay   
            setTimeout(function (){
                $scope.en_pagina += 10;
                $scope.$apply()
            }, 300);
            
        }

        $scope.keyDownFilter = function() {
            document.querySelector('.listado').scrollTop = 0;
            $scope.en_pagina = 10;
        }

        // porque no puedo obtener el total con el filtro solo son el limit
        $scope.$watch('filtro', function (){

            try{
               $scope.total =  $filter('filter')($scope.array_items, $scope.filtro).length
            }catch(e){}
           
        })



      	var holder_scrolleable = angular.element(document.querySelector('.listado'));
  		  holder_scrolleable.on("scroll", function() {

          	var _scrollTop = this.scrollTop; // por donde va el scroll
          	var _offsetHeight = this.offsetHeight; // alto de la mascara
          	var _scrollHeight = this.scrollHeight; // alto del contenido
            $scope.enscroll =	_scrollTop;
            $scope.altoholder =  _offsetHeight;
            if((_offsetHeight +_scrollTop) > _scrollHeight-100) {
                $scope.en_pagina += 10;
            }
            $scope.$apply();

        });		

        
  		$scope.enscroll =	 0;
	    $scope.altoholder =  1000;
	     
	    $scope.select_item = function ($item){

	 		    navigateService.go('detalle', {item: $item});

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

    }

  };

});
