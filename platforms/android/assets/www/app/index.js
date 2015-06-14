window.onerror = function(message, file, line) {
  var error = [];
  error.push('---[error]');
  if (typeof message == "object") {
    var keys = Object.keys(message);
    keys.forEach(function(key) {
      error.push('[' + key + '] ' + message[key]);
    });
  } else {
    error.push(line + ' at ' + file);
    error.push(message);
  }
  alert(error.join("\n"));
};
var app = {
   
    initialize: function() {
        this.bindEvents();
       
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    
    onDeviceReady: function() {
      
        try{
            StatusBar.hide()
        }catch(e){}


        
        var map = plugin.google.maps.Map.getMap(document.getElementById('map_canvas'));
        map.on(plugin.google.maps.event.MAP_READY, function () {
            angular.bootstrap(document, ["geobarApp"]);
        });
       

        


       
    }
};
