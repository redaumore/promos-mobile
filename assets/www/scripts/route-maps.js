
var directionDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var zoom;

  function initializemap() {
	  		var mapOptions;
	  		var start = new google.maps.LatLng(_lat, _lng);
			var end = new google.maps.LatLng(_promo_lat, _promo_lng);
	  		mapOptions= {
						center: end,
						zoom: 16,
						mapTypeId: google.maps.MapTypeId.ROADMAP,
						streetViewControl: false,
						mapTypeControl: false,
			 }
				
			map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
			
			var marker = new google.maps.Marker({
				icon: "http://dev.promosalpaso.com/images/pap_location.png",
		        position: end,
		        map: map,
		    });
  }
  
  function initializemapgps() {
		var mapOptions;
		var start = new google.maps.LatLng(_lat, _lng);
		var end = new google.maps.LatLng(_promo_lat, _promo_lng);
		mapOptions= {
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				streetViewControl: false,
				mapTypeControl: false,
		}
		
		map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);	
		
		 var rendererOptions = {
				  map: map,
				  suppressMarkers : true
		}
		 
		directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);// also, constructor can get "DirectionsRendererOptions" object
		directionsDisplay.setMap(map); // map should be already initialized.
		
		request = {
			    origin:start,
			    destination:end,
			    travelMode: google.maps.TravelMode.WALKING
		};
		
		directionsService.route(request, function(response, status) {
	        if (status == google.maps.DirectionsStatus.OK) {
	            directionsDisplay.setDirections(response);
	        }
	    });
		
		var marker_end = new google.maps.Marker({
			icon: "http://dev.promosalpaso.com/images/pap_location.png",
	        position: end,
	        map: map,
	    });
		
		var marker_start = new google.maps.Marker({
			position: start,
			icon: "http://dev.promosalpaso.com/images/pap_smile.png",
	        map: map,
	    });
}

  jQuery(document).delegate( "#page-map", "pagebeforeshow", function(event){
		event.preventDefault();
		var _width = jQuery(window).width();
	    var _height = jQuery(window).height() - jQuery("#page-map").find('[data-role="header"]').outerHeight();
	    jQuery("#map_canvas").css({height:_height});
	    jQuery("#map_canvas").css({width:_width});
	    if(_searchOrigin == "GPS")
	    	initializemapgps();
	    else
	    	initializemap();
	    //calcRoute();
	});

	jQuery(document).delegate( "#page-map", "pageshow", function(event){
		var lastCenter=map.getCenter();
		google.maps.event.trigger(map, "resize");
		map.setCenter(lastCenter);
		
		if(_searchOrigin == "GPS"){
			var start = new google.maps.LatLng(_lat, _lng);
			var end = new google.maps.LatLng(_promo_lat, _promo_lng);
			var bounds = new google.maps.LatLngBounds();
			bounds.extend(start);
			bounds.extend(end);
			map.fitBounds(bounds);
		}
		
	});

  
  
  function calcRoute() {
	  		var request;
	  		var start = new google.maps.LatLng(_lat, _lng);
			var end = new google.maps.LatLng(_promo_lat, _promo_lng);
			if(_searchOrigin == "GPS"){
				
				
				var marker = new google.maps.Marker({
					position: start,
					icon: "http://dev.promosalpaso.com/images/pap_smile.png",
			        map: map,
			    });
			}
			
			var marker = new google.maps.Marker({
				icon: "http://dev.promosalpaso.com/images/pap_location.png",
		        center: end,
		        map: map,
		    });
			
			directionsService.route(request, function(response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					directionDisplay.setDirections(response);
				}
	       });
			
  }  
	/*ESTO NUNCA SIRVIO. MIRAR    
	//  Make an array of the LatLng's of the markers you want to show
    var LatLngList = new Array (start, end);
    //  Create a new viewpoint bound
    var bounds = new google.maps.LatLngBounds ();
    //  Go through each...
    for (var i = 0, LtLgLen = LatLngList.length; i < LtLgLen; i++) {
      //  And increase the bounds to take this point
      bounds.extend (LatLngList[i]);
    }
    //  Fit these bounds to the map
    map.setCenter(bounds.getCenter());
    map.fitBounds(bounds);*/
  
