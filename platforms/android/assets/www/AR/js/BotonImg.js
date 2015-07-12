function BotonImg($element, $callback){
	
	var self = this
	this.main = $($element);
	
	$(this.main).bind("touchend", do_mouseout);
	$(this.main).bind("touchstart", do_mouseover);
	$(this.main).bind("touchend", do_click);

	function do_click(evt){
		$callback(evt);
	}
	
	function do_mouseover(evt){
		$(self.main).addClass('botonOver')
	}
	
	function do_mouseout(evt){
		$(self.main).removeClass('botonOver')
	}

}