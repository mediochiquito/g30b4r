
geobarApp.directive('config', function() {
  
	

  return {
    restrict: 'E',
    templateUrl: 'directivas/secciones/config/config.html',
	  scope:{caca:'@'},
    
    link:function (scope, elem, attrs){

	   	scope.visible = true;

		

    }, 
   /* scope:function ($scope, $elem, $attrs){
    	$scope.cliqueando = function (){

			alert('cliqueando')
		}
    }
*/


  };
});