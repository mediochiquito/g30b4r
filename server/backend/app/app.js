
var app = angular.module('adminApp', ['ngMaterial', 'ngRoute', 'flow'])



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





.controller('AppCtrl', function($scope, $document) {

    $scope.go = function ($ruta){
     
        document.location.hash = '#' + $ruta

    }

})

.controller('HomeCtrl', function($scope) {

     alert('HOME')
    
}) 
