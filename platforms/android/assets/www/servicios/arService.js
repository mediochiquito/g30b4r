geobarApp.factory('arService', function($window, ToastService, lugaresService){

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
                wikitudePlugin.setOnUrlInvokeCallback(app.onURLInvoked);
            }catch(e){
               console.log('No se puede cargar el AR')
             
            }
        }, 

		mostrar: function() {

			if(isDeviceSupported){

                 wikitudePlugin.loadARchitectWorld(
                    this.onARExperienceLoadedSuccessful, 
                    this.onARExperienceLoadError,
                    arExperienceUrl,
                    requiredFeatures,
                    startupConfiguration
                 );   

            }
            
            return;       
        },
       
        
        onARExperienceLoadedSuccessful: function(loadedURL) {
            /* Respond to successful augmented reality experience loading if you need to */ 
            wikitudePlugin.callJavaScript('setLugares(\'' + angular.toJson(lugaresService.get()) + '\');');
        },
        
        onARExperienceLoadError: function(errorMessage) {
            alert('Loading AR web view failed: ' + errorMessage);
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