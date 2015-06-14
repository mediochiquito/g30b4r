geobarApp.directive('botonSistema', function($log) {
  return {
    
    restrict: 'AE', 
    scope: {
    		habil: '@',
    		accion: '&',
    		imagen: '@',
    		txt:  '@'
			
	},

    template: "<img src='{{imagen}}'><div class='botonSistemaLabel' ng-if=' txt!=undefined '>{{txt}}</div>", 

    link: function(scope, elem, attrs){

    	if(typeof scope.habil == 'undefined') scope.habil = true;

    	elem.bind('touchstart', function(){

            if(!elem.hasClass('botonDisabled')){
                elem.addClass('botonOver')
                scope.accion()
                scope.$apply()

                 map.on()
            }
    	})

    	elem.on('touchend', function(){
           
    		elem.removeClass('botonOver')
    	})

    }
  };
});