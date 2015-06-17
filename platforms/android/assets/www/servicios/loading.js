

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


		geobarApp.directive('elLoading', function(Loading){
				return {
					restrict:'E',
					template:'<div><img src="img/loader.png" /></div>',
					
					link:function($scope, $elem, $attrs){
						
						Loading.setInstancia($elem);

					}
				}
			})

