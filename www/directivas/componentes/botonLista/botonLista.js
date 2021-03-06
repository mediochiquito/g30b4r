geobarApp.directive('botonLista', function(Loading) {
  return {
    
    restrict: 'A', 
  
    link: function(scope, elem, attrs){

        function touch_move(){

             elem.removeClass('botonListaOver')
             elem.unbind('touchmove', touch_move)
        }
    	elem.bind('touchstart', function(){
            try{
                 elem.unbind('touchmove', touch_move)
                  elem.removeClass('botonListaOver')
            }catch(e){}
            elem.bind('touchmove', touch_move)
            elem.addClass('botonListaOver')

             try{
                if(device.platform == 'Android')  navigator.vibrate(1)    
            }catch(e){}
    	})

    	elem.on('touchend', function(){
          
    		  elem.removeClass('botonListaOver')
              elem.unbind('touchmove', touch_move)  
    	})

    }
  };
});