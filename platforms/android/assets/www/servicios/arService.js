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

          if(url == 'architectsdk://action=closeWikitudePlugin') wikitudePlugin.close();
          else alert(url)
          Loading.ocultar();
        },  


        cerrar: function (){
              
        },


		mostrar: function() {

			if(isDeviceSupported){
                Loading.mostrar();

                setTimeout(function (){

                      wikitudePlugin.loadARchitectWorld(
                                                    this.onARExperienceLoadedSuccessful, 
                                                    this.onARExperienceLoadError,
                                                    arExperienceUrl,
                                                    requiredFeatures,
                                                    startupConfiguration
                                                 );   

                    
                }, 666)
              
            }
            
            return;       
        },
       
        
        onARExperienceLoadedSuccessful: function(loadedURL) {
           // alert('onARExperienceLoadedSuccessful')
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