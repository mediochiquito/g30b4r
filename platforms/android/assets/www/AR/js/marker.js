function Marker(obj) {

    this.obj = obj;

    var markerLocation = new AR.GeoLocation(obj.lat, obj.lon, obj.alt);

    var imagen;
    if(obj.tipo == 0) imagen = World.markerDrawable_bar
    if(obj.tipo == 1) imagen = World.markerDrawable_restaurant;
    if(obj.tipo == 2) imagen = World.markerDrawable_cine;
    if(obj.tipo == 3) imagen = World.markerDrawable_evento;

    this.markerDrawable_idle = new AR.ImageDrawable(imagen, 2.5, {
        zOrder: 0,
        opacity: 1.0,
        onClick: Marker.prototype.getOnClickTrigger(this)
    });


  
    this.markerObject = new AR.GeoObject(markerLocation, {
        drawables: {
            cam: [this.markerDrawable_idle]
        }
    });

    return this;
}

Marker.prototype.getOnClickTrigger = function(marker) {

    return function() {

            try {
                World.onMarkerSelected(marker);
            } catch (err) {
                alert(err);
            }

     
    };

};

