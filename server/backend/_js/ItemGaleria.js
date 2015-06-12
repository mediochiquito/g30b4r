function ItemGaleria($media){

	var self = this;
	this.main = document.createElement('div');
	this.main.className = 'ItemGaleria'

	$(this.main).attr('media', $media)

	var img = new Image()
	img.src = '../img/show.php?f=/medias/' + $media + '&an=100&al=100';
	$(this.main).append(img)

	var cerrar = new Image()
	cerrar.src = 'borrar.gif';
	cerrar.className = 'BotonCerrar'
	$(this.main).append(cerrar)
	$(cerrar).bind('click', doCerrar)

	function doCerrar(){

		$(self.main).remove()

	}

}