geobarApp.directive('home', function(navigateService, SERVER, $http) {
  return {
    restrict: 'E',
    templateUrl: 'directivas/secciones/home/home.html', 
    link: function(scope, elem, attrs){

      var _callback;

    	scope.navigateService = navigateService
      scope.server = SERVER
      scope.url_img = SERVER + 'img/home/';
     
      scope.realidad = function (){


       $http.get(SERVER+'ws.php?method=getListaEvetos').success(function(data, status, headers, config) {
              
           window.localStorage.setItem('json_lugares', JSON.stringify(data));
         //  window.localStorage.setItem('sync', String(data_sync))
         //  $rootScope.json_lugares = data

       //    iniciar_app()

        });


      }

      scope._set = function ($obj, $callback){
        _callback = $callback;
       // Loading.mostrar();

        $http.get(SERVER+'ws.php?method=getHomeImages').

          success(function(data, status, headers, config) {

            scope.fotos = data.fotos;

           // Loading.ocultar();
            _callback()

          }).
          
          error(function(data, status, headers, config) {
              // Loading.ocultar();
              _callback()
          });

      }

      navigateService.setSecciones('home', scope._set)

    
       setTimeout(function (){
        
         navigateService.go('home')
         scope.$apply();
       }, 100)
       
    }
  };
});