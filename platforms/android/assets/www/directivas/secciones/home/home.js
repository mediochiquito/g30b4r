geobarApp.directive('home', function(navigateService, SERVER, $http, arService) {
  return {
    restrict: 'E',
    templateUrl: 'directivas/secciones/home/home.html', 
    scope:{},
    link: function(scope, elem, attrs){

      var _callback;
      var ya_cargo = false;
    	scope.navigateService = navigateService;
      scope.arService = arService;
      scope.server = SERVER;
      scope.url_img_home = SERVER + 'img/home/';
      
      scope.realidad = function  (){

        arService.mostrar()
      }

      scope._set = function ($obj, $callback){
        _callback = $callback;
       
        // Loading.mostrar();
        if(ya_cargo) {
          _callback(); return;
        }

        $http.get(SERVER+'ws.php?method=getHomeImages').

          success(function(data, status, headers, config) {

            scope.fotos_home = data.fotos;
            ya_cargo = true;
            if(scope.fotos_home.length == 0)  sin_fotos();
            _callback()

          }).
          
          error(function(data, status, headers, config) {
              sin_fotos();
              _callback();
          });

        }


        function sin_fotos(){

             scope.url_img_home = 'img/default/';
               scope.fotos_home = ['home.png'];
        }

       navigateService.setSecciones('home', scope._set)

        // me cargo a mi misma
      setTimeout(function (){
         navigateService.go('home')
         scope.$apply();
       
       }, 100)
       
    }
  };
});