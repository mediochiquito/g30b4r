
var app = angular.module('adminApp', ['ngAnimate', 'ngMaterial', 'ngRoute', 'ngFileUpload'])



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
        redirectTo: '/pois'
      });
 }])





.controller('AppCtrl', function($scope, $document, $rootScope, $mdSidenav) {

    $scope.rootScope=$rootScope;
    $scope.cargando = false
    $rootScope.cargando = false;
    $rootScope.$watch('cargando', function (){
      $scope.cargando = $rootScope.cargando
     
    })
    
    $scope.openMenu = function (){
   
       $mdSidenav('left').open()
    } 
    $scope.closeMenu = function (){
   
       $mdSidenav('left').close()
    }

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