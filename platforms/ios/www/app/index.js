var app = {
   
    initialize: function() {
        this.bindEvents();
       
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    
    onDeviceReady: function() {
      
        try{
        // alert(device.uuid)
            StatusBar.hide()
        }catch(e){}


        angular.bootstrap(document, ["geobarApp"]);
    }
};
