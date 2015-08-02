<!DOCTYPE html>
<html  ng-app="adminApp" >

  <head>

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">

    <link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/angular_material/0.10.0/angular-material.min.css">
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=RobotoDraft:300,400,500,700,400italic">
    <link rel="stylesheet" href="css/app.css">
   

  </head>

  <body flow-prevent-drop >

  <div ng-controller='AppCtrl'>

    <md-content>
     
      <md-toolbar>
           <span flex></span>
         
            <md-tabs>
              <md-tab label="Pois" md-on-select='go("pois")'></md-tab>
              <md-tab label="Home" md-on-select='go("home")'></md-tab>
            </md-tabs>
      

      </md-toolbar>

    </md-content>


    <div id='cargando' ng-show=' cargando '>

      cargando
      
    </div>

  </div>





 <div ng-view></div>




  
    <!-- Angular Material Dependencies -->
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.3/angular.min.js"></script>
    <script src="//code.angularjs.org/1.4.3/angular-animate.min.js"></script>
    <script src="//code.angularjs.org/1.4.3/angular-aria.min.js"></script>
    <script src="//code.angularjs.org/1.4.3/angular-route.min.js"></script>

    <!-- Angular Material Javascript now available via Google CDN; version 0.10 used here -->
    <script src="//ajax.googleapis.com/ajax/libs/angular_material/0.10.0/angular-material.min.js"></script>

    <script src="app/app.js"></script>
    <script src="app/ng-flow-standalone.min.js"></script>
    <script src="app/ng-file-upload.min.js"></script>

    <script src="views/pois.js"></script>

  </body>