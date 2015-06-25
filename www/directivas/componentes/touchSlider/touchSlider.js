geobarApp.directive('touchSlider', function(Loading, SERVER, $log) {

  return {
    
    restrict: 'E', 
   
    scope: {
    		fotos: '=',
			  urlImgs: '='
	   },

    templateUrl: 'directivas/componentes/touchSlider/touchSlider.html',

    link: function(scope, elem, attrs){

        scope.pagina = 0
        var drgando = false
        var offsetX = 0
        var finX = 0
        var en_x = 0
      
        var cien_porciento = window.innerWidth

       
    	 elem.bind('touchstart', function(e){
            drgando = true
            elem.children('.tiraSlide').css('-webkit-transition', '0s')
            offsetX = ( e.touches[0].clientX)
    	})

      elem.on('touchmove', function(e){
            elem.children('.tiraSlide').css('-webkit-transform', 'translateX('+ (e.touches[0].clientX - offsetX - en_x) +'px)')
      })

    	elem.on('touchend', function(e){
             
          	 finX = e.changedTouches[0].clientX

             if(offsetX>finX){
                 scope.pagina++
             }else{
                 scope.pagina --
             }

            if(scope.pagina < 0) scope.pagina = 0; 
            if(scope.pagina >= scope.fotos.length) scope.pagina = scope.fotos.length-1; 

            en_x = (scope.pagina * cien_porciento)
            elem.children('.tiraSlide').css('-webkit-transition', '.3s')
            elem.children('.tiraSlide').css('-webkit-transform', 'translateX( -' + en_x + 'px)' );
         
    	})

    }
  };
});