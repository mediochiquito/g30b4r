geobarApp.directive('botonSistema', function($log) {
  return {
    
    restrict: 'E', 
    scope: {
    		habil: '@',
    		accion: '&',
    		imagen: '@',
    		txt:  '@'
			
	}, 
    template: "<img src='{{imagen}}'><div class='botonSistemaLabel' ng-if=' txt!=undefined '>{{txt}}</div>", 
    
    link: function(scope, elem, attrs){

    	

    	if(typeof scope.habil == 'undefined') scope.habil = true;

    	elem.on('touchend', function(){

    		

    		if(!elem.hasClass('botonDisabled')){
    			scope.accion()
    			scope.$apply()
    		}
    		
    	})
    	elem.on('touchstart', function(){
    		if(!elem.hasClass('botonDisabled')) elem.addClass('botonOver')
    	})

    	elem.on('touchend', function(){
    		if(!elem.hasClass('botonDisabled')) elem.removeClass('botonOver')
    	})

	/*
    	elem.on('click', function(){
    		scope.accion()
    		scope.$apply()
    	})
*/

    }
  };
});