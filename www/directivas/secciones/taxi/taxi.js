
geobarApp.directive('taxi', function() {
  
	

  return {
    restrict: 'E',
    templateUrl: 'directivas/secciones/taxi/taxi.html',
	
    
    link:function (scope, elem, attrs){

	   	scope.visible = true;

      scope.voyentaxi = function(){
          alert('FPO voyentaxi')
      }

      scope.easytaxi = function(){
         alert('FPO easytaxi')
      }

    }, 
   

  };
});