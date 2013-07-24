
var directionDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

  function initializemap() {
	  		var mapOptions;
	  		var start = new google.maps.LatLng(_lat, _lng);
			var end = new google.maps.LatLng(_promo_lat, _promo_lng);
	  		if(_searchOrigin == "GPS"){
				mapOptions= {
							mapTypeId: google.maps.MapTypeId.ROADMAP,
				 }
	  		}
			else{
				mapOptions= {
						center: end,
						zoom: 16,
						mapTypeId: google.maps.MapTypeId.ROADMAP,
			 }
				
			}
			map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
			
			/* var rendererOptions = {
					  map: map,
					  suppressMarkers : true
			}*/
			
			var marker = new google.maps.Marker({
				icon: "http://dev.promosalpaso.com/images/pap_location.png",
		        position: end,
		        map: map,
		    });
			
			//directionDisplay = new google.maps.DirectionsRenderer(rendererOptions);
			//directionDisplay.setMap(map);
			
			//calcRoute();
  }

  function calcRoute() {
	  		var request;
	  		var start = new google.maps.LatLng(_lat, _lng);
			var end = new google.maps.LatLng(_promo_lat, _promo_lng);
			if(_searchOrigin == "GPS"){
				request = {
				    origin:start,
				    destination:end,
				    travelMode: google.maps.TravelMode.WALKING
				};
				
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
			google.maps.event.trigger(map, "resize");
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
  
