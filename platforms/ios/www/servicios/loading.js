geobarApp.service('Loading',function(){
				
				var element = null;

				this.ocultar = function (){
					element.css('display','none');
				}

				this.mostrar = function(){
					element.css('display','block');
				}

				this.setInstancia = function ($elem){
					element = $elem;
				}
		
});


		

