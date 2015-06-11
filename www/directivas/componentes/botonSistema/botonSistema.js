geobarApp.directive('botonSistema', function(navigateService) {
  return {
    
    restrict: 'E', 
    scope: {imagen: '@'}, 
    template: "<img src='{{imagen}}'>", 
    
    link: function(scope, elem, attrs){

    	scope.navigateService = navigateService

    }
  };
});