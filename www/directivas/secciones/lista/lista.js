geobarApp.directive('lista', function($window, $log, navigateService, SCREEN_SIZE,$filter, $timeout, lugaresService, eventosService) {
 
 return {
    restrict: 'E',
    templateUrl: 'directivas/secciones/lista/lista.html',

    link:function ($scope, $elem, $attrs){

        $scope.filtro = ''
		    $scope.screen_alto = window.innerHeight
        $scope.en_pagina = 10
       // $scope.type = $obj
        var timer;

        $scope._set = function ($obj){
          $scope.filtro = ''
          $scope.txtfiltro = '';
          document.querySelector('.listado').scrollTop = 0;   
          $scope.en_pagina = 10;
          if($obj == 'lugares') $scope.array_items = lugaresService.get();
          if($obj == 'eventos') $scope.array_items = eventosService.get();
          $scope.total  = $scope.array_items.length;
        } 

        navigateService.setSecciones('lista', $scope._set);
 

        $scope.cargarMas = function (){
        
            setTimeout(function (){
                $scope.en_pagina += 10;
                $scope.$apply()
            }, 300);
            
        }

        $scope.keyDownFilter = function() {
            $timeout.cancel(timer)
            timer = $timeout(function(){
                $scope.filtro =  $scope.txtfiltro
                document.querySelector('.listado').scrollTop = 0;
                $scope.en_pagina = 10;
            }, 300);            
        }
        
      
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

	 		    navigateService.go('detalle',  $item);

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
            altoholder: '=',
            siempreVisible: '@'
     },

    templateUrl: 'directivas/secciones/lista/itemLista.html',
    link:function ($scope, $elem, $attrs){
      
        $scope.img_url = SERVER + 'img/lugares/';

      

    }

  };

});
