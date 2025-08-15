
var google;

function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    // var myLatlng = new google.maps.LatLng(40.71751, -73.990922);
    var salLatlng = new google.maps.LatLng(38.40117819291426, -75.57305886011977);
    var ocLatlng = new google.maps.LatLng(38.33552066998888, -75.10007584427875);
    var willLatlng = new google.maps.LatLng(38.38967276842191, -75.35150611662726);
    // 39.399872
    // -8.224454
    
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 14,

        // The latitude and longitude to center the map (always required)
        center: ocLatlng,

        // How you would like to style the map. 
        scrollwheel: false,
        styles: [
            {
                "featureType": "administrative.country",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "hue": "#ff0000"
                    }
                ]
            }
        ]
    };

    

    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    // Create the Google Map using out element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);


//    var marker = new google.maps.Marker({
//       position: salLatlng,
//       map: map,
//       icon: 'images/meta_yoga_loc.png'
//    });

   var ocmarker = new google.maps.Marker({
       position: ocLatlng,
       map: map,
       icon: 'images/meta_yoga_loc.png'
    });
    
}
google.maps.event.addDomListener(window, 'load', init);
