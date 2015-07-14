geobarApp.factory('arService', function($window, ToastService, lugaresService, Loading){

    var wikitudePlugin;
	var arExperienceUrl =  "www/AR/index.html";
    var requiredFeatures = [  "geo" ];
    var isDeviceSupported ;
    var startupConfiguration = { "camera_position": "back"  };

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
          if(_url == 'architectsdk://action=closeWikitudePlugin') wikitudePlugin.close();
          else alert(_url)
          Loading.ocultar();
        },  


        cerrar: function (){
              
        },

		mostrar: function() {

			if(isDeviceSupported){

                Loading.mostrar();

                var self = this;

                setTimeout(function (){
                      
                      navigator.geolocation.getCurrentPosition( self.onLocationUpdated,  self.onLocationError, {enableHighAccuracy: true });
                      wikitudePlugin.loadARchitectWorld(
                                                    self.onARExperienceLoadedSuccessful, 
                                                    self.onARExperienceLoadError,
                                                    arExperienceUrl,
                                                    requiredFeatures,
                                                    startupConfiguration
                                                 );
                }, 666)
              
            }
            
            return;       
        },  

        onLocationUpdated: function(e) {
          
            wikitudePlugin.callJavaScript('setWorld(\'' + angular.toJson(lugaresService.get()) + '\');');

        },
       
        onLocationError: function(e) {
        
            ToastService.show('No hemos enctroado tu ubicación global. Revisa tu configuración del GPS.', 'long', 'center');
        },

        onARExperienceLoadedSuccessful: function(loadedURL) {
          
            /* Respond to successful augmented reality experience loading if you need to */ 
            
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