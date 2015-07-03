geobarApp.directive('imgLoader', function(Loading) {
  return {
    
    restrict: 'E', 
    transclude: true,
    scope:{

      server: '@',
      default: '@', 

    },

    template : '<img class="item-lista-img" ng-src="{{ imagen }}" />', 
    link: function(scope, elem, attrs){

        scope.imagen = scope.server
      
        elem.children('img')[0].onerror = function () {
            scope.imagen = scope.default
            scope.$apply()
        };
      

    }
  };
});