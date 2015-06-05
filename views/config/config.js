
geobarApp.directive('config', function() {
  
	

  return {
    restrict: 'E',
    templateUrl: 'views/config/config.html',
	scope:{caca:'@'},
    
    link:function (scope, elem, attrs){
		
		scope.status = 'pepepepe --- ';
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