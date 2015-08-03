geobarApp.directive('checkBox', function($log) {
  return {
    
    restrict: 'E', 
    scope: {
    	checked: '=',
        accion: '&'
	},
    template:'<div class="checkBox-bg"><div class="checkBox-selected" ng-show=" checked==1"></div></div>',

    link: function(scope, elem, attrs){

        elem.addClass('checkBox')   


    	elem.on('touchend', function(){
         
    		 if(scope.checked == 1) scope.checked = 0;
             else scope.checked = 1;
             scope.$apply()
             scope.accion()
    	})

        
    }
  };
});