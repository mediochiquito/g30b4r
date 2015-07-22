
var app = angular.module('adminApp', ['ngMaterial', 'ngRoute', 'ngFileUpload'])



.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      }).
      when('/pois', {
        templateUrl: 'views/pois.html',
        controller: 'PoisCtrl'
      }).
      when('/pois/:poiID', {
        templateUrl: 'views/pois.html',
        controller: 'PoisCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
 }])





.controller('AppCtrl', function($scope, $document, $rootScope) {

    $scope.cargando = false
    $rootScope.cargando = false;
    $rootScope.$watch('cargando', function (){
      $scope.cargando = $rootScope.cargando
     
    })

    

    console.log($rootScope)
    $scope.go = function ($ruta){
     
        document.location.hash = '#' + $ruta

    }

})

.controller('HomeCtrl', function($scope) {

    
    
}) 



window.addEventListener("dragover",function(e){
  e = e || event;
  e.preventDefault();
},false);
window.addEventListener("drop",function(e){
  e = e || event;
  e.preventDefault();
},false);