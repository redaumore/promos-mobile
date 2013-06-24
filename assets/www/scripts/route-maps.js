
var directionDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

  function initialize() {
	directionDisplay = new google.maps.DirectionsRenderer();
    var myLocation = new google.maps.LatLng(_lat, _lng);
    var mapOptions = {
      //zoom:7,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      //center: myLocation
    }
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    directionDisplay.setMap(map);
  }

  function calcRoute() {
    var start = new google.maps.LatLng(_lat, _lng);
    var end = new google.maps.LatLng(_promo_lat, _promo_lng);
    var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.DirectionsTravelMode.WALKING
    };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionDisplay.setDirections(response);
      }
    });
    
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
    map.fitBounds(bounds);
  }
