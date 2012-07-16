(function() {

	window.ardaMap = {
	
		map: {},
		
		options: {
			tileUrlTemplate: "./%z/tile-%x-%y.jpg",
			scrollZoomEnabled: true,
			mapCenter: new YMaps.GeoPoint(-178.851, 85.020),
			backgroundMapType: YMaps.MapType.NONE,
			mapZoom: 10,
			isTransparent: true,
			smoothZooming: false,
			layerKey: "arda#layer",
			mapType: {
				name: "Арда",
				textColor: "#000000"
			},
			copyright: "nerevar"
		},
		
		init: function() {
		
			var myData = new YMaps.TileDataSource(this.options.tileUrlTemplate, this.options.isTransparent, this.options.smoothZooming);
			
			this.map = new YMaps.Map(document.getElementById("YMaps")),

			myData.getTileUrl = function (tile, zoom) {
				return this.getTileUrlTemplate().replace(/%x/i, tile.x).replace(/%y/i, tile.y).replace(/%z/i, zoom);
			}

			var MyLayer = function () {
				return new YMaps.Layer(myData);
			}
			YMaps.Layers.add(this.options.layerKey, MyLayer);

			var mapLayers = this.options.backgroundMapType ? this.options.backgroundMapType.getLayers() : [],
				myMapType = new YMaps.MapType(YMaps.jQuery.merge(mapLayers, [ this.options.layerKey ]), this.options.mapType.name, { textColor: this.options.mapType.textColor });

			this.map.setCenter(this.options.mapCenter, this.options.mapZoom, myMapType);
			if (this.options.copyright) {
				this.map.addCopyright(this.options.copyright);
			}
		 
			this.map.setMinZoom(9);
			this.map.setMaxZoom(10);
		},
		
		addLocation: function(point, name, description) {
			if (point && point.length) {
				// point is array
				point = new YMaps.GeoPoint(point[0], point[1])
			}
			
            var placemark = new YMaps.Placemark(point);
            placemark.name = name;
			placemark.setIconContent(placemark.name);
            placemark.description = (description && description.length)
										? description.join("<br />")
										: description;
            this.map.addOverlay(placemark);
		}
	};
})();
