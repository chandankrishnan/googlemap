/**
 * Calling the locateme function when the document finishes loading
 */
$(document).ready(function() {
    locateMe();
});
/**
 * Function to locate the user
 */
var locateMe = function() {
    var map_element = $('#map');
    if (navigator.geolocation) {
        var position = navigator.geolocation.getCurrentPosition(loadMap);
    } else {
        map_element.innerHTML = "Geolocation is not supported by this browser.";
    }
};

/**
 * Lets load the map using the current position
 * @param {position}
 */
var loadMap = function(position) {
    /**
     * current location
     */
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    alert(latitude+ " and " +longitude);
    var myLatlng = new google.maps.LatLng(latitude, longitude);
    /**
     * Initializing the options for the map
     */
    var myOptions = {
        center: myLatlng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    /**
     * Creating the map in teh DOM
     */
    var map_element = document.getElementById("map");
    var map = new google.maps.Map(map_element, myOptions);
    /**
     * Adding markers to it
     */
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'You are here'
    });
    /**
     * Adding infowindow
     */
    var infowindow = new google.maps.InfoWindow({
        content: "<h2>You are here</h2>",
        maxWidth: 300
    });
    /**
     * Event listener to trigger the marker content
     */
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
    });
};

/**
 * this function show the nearest theater what we enter location
 */
function codeAddress() {
    /**
     * find latitude and logitude of location
     */
    geocoder = new google.maps.Geocoder();
    var address = document.getElementById("address").value;
    geocoder.geocode({
        'address': address
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            alert(results[0].geometry.location.lat()+" and "+ results[0].geometry.location.lng())
            var coords = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
            /**
             * Initializing the options for the map
             */
            var mapOptions = {
                zoom: 15,
                center: coords,
                mapTypeControl: true,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.SMALL
                },
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            /**
             * Create the map, and place it in map div with mapOptions
             */
            map = new google.maps.Map(document.getElementById("map"), mapOptions);
            /**
             * call placeRequest() functons
             */
            placesRequest(coords, map);
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
    document.getElementById("address").value = '';
}

function placesRequest(latlng, map) {
    /**
     * Parameters for our places request
     */
    var request = {
        location: latlng,
        radius: 1500,
        types: ['cinema', 'movie_theater', 'theatre', 'cinemas', 'metro cinemas', 'theater', 'movie']
    };
    /**
     * Make the service call to google
     */
    var callPlaces = new google.maps.places.PlacesService(map);

    callPlaces.search(request, function(results, status) {
        /** 
         * trace what Google gives us back
         */
        $.each(results, function(i, place) {
            var placeLoc = place.geometry.location;
            var thisplace = new google.maps.Marker({
                map: map,
                position: place.geometry.location,
                title: place.name
            });
            /** 
             * full address of location by using InfoWindow()
             */
            var infowindow = new google.maps.InfoWindow({})
            google.maps.event.addListener(thisplace, 'click', function() {
                infowindow.setContent(thisplace.title+"<br/>" + place.vicinity);
                infowindow.open(map, this);
            });
        })
    });
}