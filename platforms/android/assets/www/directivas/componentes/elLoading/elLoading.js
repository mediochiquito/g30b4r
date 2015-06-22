geobarApp.directive('elLoading', function(Loading){
				return {
					restrict:'E',
					template:'<div><img src="img/loader.png" /></div>',
					
					link:function($scope, $elem, $attrs){
						console.log('setInstancia')
						Loading.setInstancia($elem);

					}
				}
})