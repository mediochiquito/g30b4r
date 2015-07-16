geobarApp.factory('arService', function($window, ToastService, lugaresService, eventosService, Loading){

    var wikitudePlugin;
	var arExperienceUrl =  "www/AR/index.html";
    var requiredFeatures = [  "geo" ];
    var isDeviceSupported ;
    var startupConfiguration = { "camera_position": "back"  };
    var ya_iniciado = false;
	return {

        set: function(){
            try{
                wikitudePlugin = cordova.require("com.wikitude.phonegap.WikitudePlugin.WikitudePlugin");
                wikitudePlugin.isDeviceSupported(this.onDeviceSupported, this.onDeviceNotSupported, requiredFeatures);
                wikitudePlugin.setOnUrlInvokeCallback(this.onURLInvoked);

            }catch(e){

               console.log('No se puede cargar el AR')
                
            }
        }, 


        onURLInvoked: function(url){
          var _url = decodeURIComponent(url);
          if(_url == 'architectsdk://action=closeWikitudePlugin') wikitudePlugin.hide();
          else {

                var split_url = _url.split('architectsdk://action=')
                var method_parms_array = split_url[1].split(':');
                var item;

                if(method_parms_array[1] == 'lugar')  item = lugaresService.get()[method_parms_array[2]];
                if(method_parms_array[1] == 'evento') item = eventosService.get()[method_parms_array[2]];

                switch(method_parms_array[0]){

                    case 'dir':   navigateService.go('mapa', {type:'dir', item: item}); break;
                    case 'fav':   alert('FPO add favoritos'); break;
                    case 'info': navigateService.go('detalle',  item); break;

                }


          }

          Loading.ocultar();

        },  


        cerrar: function (){
              
        },

		mostrar: function() {

			if(isDeviceSupported){

                Loading.mostrar();

                var self = this;

                setTimeout(function (){
                      
                    navigator.geolocation.getCurrentPosition( self.onLocationUpdated,  self.onLocationError);
                    
                    if(!ya_iniciado){

                        wikitudePlugin.loadARchitectWorld(
                                                    self.onARExperienceLoadedSuccessful, 
                                                    self.onARExperienceLoadError,
                                                    arExperienceUrl,
                                                    requiredFeatures,
                                                    startupConfiguration
                                                 );
                        ya_iniciado = true;

                    }  else wikitudePlugin.show()


                     Loading.ocultar();

                }, 666);
              
            }
            
            return;       
        },  

        onLocationUpdated: function(e) {
          
            wikitudePlugin.callJavaScript('setWorld(\'' + angular.toJson(lugaresService.get()) + '\', \'' + angular.toJson(eventosService.get()) + '\');');

        },
       
        onLocationError: function(e) {
        
            ToastService.show('No hemos enctroado tu ubicación global. Revisa tu configuración del GPS.', 'long', 'center');
        },

        onARExperienceLoadedSuccessful: function(loadedURL) {
          


        },
        
        onARExperienceLoadError: function(errorMessage) {
      
            ToastService.show('Ocurrio un error al cargar la realidad aumentada: ' + errorMessage, 'long', 'center');
        },

        onDeviceSupported:function(){
            isDeviceSupported = true
        },  

        onDeviceNotSupported:function(errorMessage){
            isDeviceSupported = false
            alert(errorMessage);
        }


    };

})