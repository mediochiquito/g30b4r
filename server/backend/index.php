<!DOCTYPE html>
<html  ng-app="adminApp" >

  <head>

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">

    <link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/angular_material/0.10.0/angular-material.min.css">
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=RobotoDraft:300,400,500,700,400italic">

  </head>

  <body>

  <div ng-controller='AppCtrl'>
    <md-content>
     
      <md-toolbar class="md-tall md-warn md-hue-3">
        <span flex>CACA</span>
          <span class="md-flex">

            <md-tabs>
              <md-tab label="Tab #1" ></md-tab>
              <md-tab label="Tab #2"></md-tab>
              <md-tab label="Tab #3"></md-tab>  <md-tab label="Tab #1" ></md-tab>
              <md-tab label="Tab #2"></md-tab>
              <md-tab label="Tab #3"></md-tab>  <md-tab label="Tab #1" ></md-tab>
              <md-tab label="Tab #2"></md-tab>
              <md-tab label="Tab #3"></md-tab>
            </md-tabs>

          </span>
      
      </md-toolbar>

       <md-tabs md-dynamic-height md-border-bottom>
            
            <md-tab label="POIS"  >
              
                <md-content  class="md-padding" layout="row" layout-sm="row">
                  
                   <div flex layout-sm="row">

                    <h1 class="md-display-1">CREAR NUEVO 'POI'</h1>

                    <form ng-submit="submitForm()" layout="column" class="md-padding" style="padding-top: 0;">

                        <md-select ng-model="poi.tipo" placeholder="Tipo">
                            <md-option ng-value="1" >Bar</md-option>
                            <md-option ng-value="2" >Restaurante</md-option>
                            <md-option ng-value="3" >Cine</md-option>
                            <md-option ng-value="5" >Teatro</md-option>
                            <md-option ng-value="4" >Evento</md-option>
                        </md-select>

                        <md-input-container flex layout="column"  ng-show=' tipo == 4 '>
                          <label>Inicio de publicación</label>
                          <input type="date" ng-model="poi.iniPub">
                        </md-input-container>

                        <md-input-container flex ng-show=' tipo == 4 '>
                          <label>Fin de publicación</label>
                          <input type="date" ng-model="poi.finPub">
                        </md-input-container>

                        <md-input-container>
                          <label for="label">Nombre</label>
                          <input type="text" id="label" ng-model="poi.nombre">
                        </md-input-container>

                        <md-input-container>
                          <label for="content">Telefono</label>
                          <input type="text" id="content" ng-model="poi.tel">
                        </md-input-container>

                        <md-input-container>
                          <label for="content">Direccion</label>
                          <input type="text" id="content" ng-model="poi.dir">
                        </md-input-container>

                        <md-input-container>
                          <label for="content">Descripcion</label>
                          <input type="text" id="content" ng-model="poi.desc">
                        </md-input-container>

                         <md-input-container>
                          <label for="content">Latitude</label>
                          <input type="text" id="content" ng-model="poi.lat">
                        </md-input-container>

                         <md-input-container>
                          <label for="content">Longitude</label>
                          <input type="text" id="content" ng-model="poi.lon">
                         </md-input-container>

                         <md-input-container>
                          <label for="content">Altitude</label>
                          <input type="text" id="content" ng-model="poi.alt">
                         </md-input-container>

                         <md-button class="add-tab md-primary md-raised" type="submit" style="margin-right: 0;">Agregar POI</md-button>

                    </form>

                  </div>



                  <div flex >

                    <h1 class="md-display-1">LISTA DE 'POIs'</h1>
                    <div></div>
                 
                  </div>




              </md-content>
     
            </md-tab>

            <md-tab label="two">
              <md-content class="md-padding">
                <h1 class="md-display-2">Tab Two</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis ante augue. Phasellus volutpat neque ac dui mattis vulputate. Etiam consequat aliquam cursus. In sodales pretium ultrices. Maecenas lectus est, sollicitudin consectetur felis nec, feugiat ultricies mi. Aliquam erat volutpat. Nam placerat, tortor in ultrices porttitor, orci enim rutrum enim, vel tempor sapien arcu a tellus. Vivamus convallis sodales ante varius gravida. Curabitur a purus vel augue ultrices ultricies id a nisl. Nullam malesuada consequat diam, a facilisis tortor volutpat et. Sed urna dolor, aliquet vitae posuere vulputate, euismod ac lorem. Sed felis risus, pulvinar at interdum quis, vehicula sed odio. Phasellus in enim venenatis, iaculis tortor eu, bibendum ante. Donec ac tellus dictum neque volutpat blandit. Praesent efficitur faucibus risus, ac auctor purus porttitor vitae. Phasellus ornare dui nec orci posuere, nec luctus mauris semper.</p>
                <p>Morbi viverra, ante vel aliquet tincidunt, leo dolor pharetra quam, at semper massa orci nec magna. Donec posuere nec sapien sed laoreet. Etiam cursus nunc in condimentum facilisis. Etiam in tempor tortor. Vivamus faucibus egestas enim, at convallis diam pulvinar vel. Cras ac orci eget nisi maximus cursus. Nunc urna libero, viverra sit amet nisl at, hendrerit tempor turpis. Maecenas facilisis convallis mi vel tempor. Nullam vitae nunc leo. Cras sed nisl consectetur, rhoncus sapien sit amet, tempus sapien.</p>
                <p>Integer turpis erat, porttitor vitae mi faucibus, laoreet interdum tellus. Curabitur posuere molestie dictum. Morbi eget congue risus, quis rhoncus quam. Suspendisse vitae hendrerit erat, at posuere mi. Cras eu fermentum nunc. Sed id ante eu orci commodo volutpat non ac est. Praesent ligula diam, congue eu enim scelerisque, finibus commodo lectus.</p>
              </md-content>
            </md-tab>

            <md-tab label="three">
             
              <md-content class="md-padding">
                <h1 class="md-display-2">Tab Three</h1>
                <p>Integer turpis erat, porttitor vitae mi faucibus, laoreet interdum tellus. Curabitur posuere molestie dictum. Morbi eget congue risus, quis rhoncus quam. Suspendisse vitae hendrerit erat, at posuere mi. Cras eu fermentum nunc. Sed id ante eu orci commodo volutpat non ac est. Praesent ligula diam, congue eu enim scelerisque, finibus commodo lectus.</p>
              </md-content>
            </md-tab>

          </md-tabs>



    </md-content>

  </div>

   
  
    <!-- Angular Material Dependencies -->
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.3/angular.min.js"></script>
    <script src="//code.angularjs.org/1.4.3/angular-animate.min.js"></script>
    <script src="//code.angularjs.org/1.4.3/angular-aria.min.js"></script>
    <script src="//code.angularjs.org/1.4.3/angular-route.min.js"></script>

    <!-- Angular Material Javascript now available via Google CDN; version 0.10 used here -->
    <script src="//ajax.googleapis.com/ajax/libs/angular_material/0.10.0/angular-material.min.js"></script>

    <script src="app/app.js"></script>

  </body>