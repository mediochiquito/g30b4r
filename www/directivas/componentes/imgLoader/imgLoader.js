geobarApp.directive('imgLoader', function(Loading) {
  return {
    
    restrict: 'E', 
   
    scope:{

    /*  server: '=',
      default: '=', */
      imgurl: '=',
      itemid: '=',
      itemtipo: '='

    },

    template : '<img class="item-lista-img" ng-src="{{ imagen }}" />', 
    link: function(scope, elem, attrs){

       
        
        scope.$watch('itemid', function(n, v){

       
           scope.imagen = scope.imgurl + scope.itemid + '/thumb.jpg'
        })

        elem.children('img')[0].onerror = function () {
            scope.imagen = 'img/default/thumb_' + scope.itemtipo + '.png';
            scope.$apply()
        };
      

    }
  };
});


//server="{{}}" default=''