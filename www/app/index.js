var app = {
   
    initialize: function() {
        this.bindEvents();
        this.onDeviceReady()
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    
    onDeviceReady: function() {
      	//angular.bootstrap(document, ["geobarApp"]);
    }
};