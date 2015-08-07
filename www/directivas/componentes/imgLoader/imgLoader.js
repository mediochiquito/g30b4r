geobarApp.directive('imgLoader', function(Loading) {
  return {
    
    restrict: 'E', 
   
    scope:{

    /*  server: '=',
      default: '=', */
      imgurl: '=',
      hashfile: '=',
      itemid: '=',
      itemtipo: '='

    },

    template : '<img class="item-lista-img" ng-src="{{ imagen }}" />', 
    link: function(scope, elem, attrs){

       
        
        scope.$watch('hashfile', function(n, v){     
           scope.imagen = scope.imgurl + scope.hashfile
        })

        elem.children('img')[0].onerror = function () {
            scope.imagen = 'img/default/thumb_' + scope.itemtipo + '.png';
            scope.$apply()
        };
      

    }
  };
});


//server="{{}}" default=''