geobarApp.directive('botonBase', function($log) {
  return {
    
    restrict: 'AE', 
    scope: {
    		habil: '@',
    		accion: '&'
	},
    link: function(scope, elem, attrs){

    	if(typeof scope.habil == 'undefined') scope.habil = true;
    	elem.bind('touchstart', function(){
            if(!elem.hasClass('botonDisabled')){
                elem.addClass('botonOver')
                scope.accion()
                scope.$apply()
            }
    	})

    	elem.on('touchend', function(){
    		elem.removeClass('botonOver')
    	})

        
    }
  };
});