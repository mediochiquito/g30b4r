geobarApp.directive('touchSlider', function($document,Loading, SERVER, $log) {

  return {
    
    restrict: 'E', 
   
    scope: {
    		fotos: '=',
        urlImgs: '=',
			  imgDefault: '@'
	   },

    templateUrl: 'directivas/componentes/touchSlider/touchSlider.html',

    link: function(scope, elem, attrs){

        scope.t = 0;
        scope.pagina = 0;
        scope.enx = 0;

        var offsetX = 0;
        var finX = 0;
        var ultimo_x = 0;
        var cien_porciento = window.innerWidth;



      scope.$watch('fotos', function($oldV, $newV){
          scope.t = 0;
          scope.pagina = 0;  
          scope.enx = 0;

      })

    	elem.bind('touchstart', function(e){
          
            scope.t = '0s'
            offsetX = (e.touches[0].clientX)
            ultimo_x = scope.enx;
            scope.$apply()

            addListener()

     	})

       function doMove(e){
          scope.enx =  Math.round(e.touches[0].clientX - offsetX + ultimo_x);
      
          scope.$apply();
             
       } 
        function doEnd(e){
              
               finX = e.changedTouches[0].clientX

               if(offsetX>finX){
                   scope.pagina++
               }else{
                   scope.pagina --
               }

              if(scope.pagina < 0) scope.pagina = 0; 
              if(scope.pagina >= scope.fotos.length) scope.pagina = scope.fotos.length-1; 

              scope.t = '.2s';
              scope.enx = -(scope.pagina * cien_porciento)
              ultimo_x = scope.enx;
            
              scope.$apply();
              removeListener()
       } 

      function addListener(){

              $document.on('touchmove', doMove)

              $document.on('touchend', doEnd);
      }
     
      function removeListener(){
    	 $document.off('touchmove', doMove)
         $document.off('touchend', doEnd)
      }

    }
  };
});