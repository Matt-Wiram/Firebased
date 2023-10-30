"use strict";

mapboxgl.accessToken = "pk.eyJ1IjoibWF0dGhld3dpcmFtIiwiYSI6ImNsOWx2YmJwODFtMnEzdXAyMDFvdHRxcHcifQ.20mYzJo1wfnNRyCTEJMtyw";

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 20,
    center: [-80.175652, 33.018505]

});
// const geocoder = new MapboxGeocoder({
//     // Initialize the geocoder
//     accessToken: mapboxgl.accessToken, // Set the access token
//     mapboxgl: mapboxgl, // Set the mapbox-gl instance
//     marker: true // Do not use the default marker style
// });
// geocoder.on('result', function(e) {
//     //
//     // let word = e.result.place_name
//     // findLoc(e.result.center, word)
// })
// map.addControl(geocoder);
//
// //    start of click marker
//
// let marker = new mapboxgl.Marker({
//     draggable: true
// })
// // Drag Marker
// marker.on('dragend',function(e){
//     var lngLat = e.target.getLngLat();
//     addMarker(lngLat)
// })
// // .setLngLat(feature.geometry.coordinates)
// map.on('click', function (e) {
//
//     getLocation()
//     addMarker(e.lngLat)
// })
//
// // Add Marker Here
// function addMarker(event) {
//
//
//     marker.setLngLat(event).addTo(map);
// }
//
// // Add automatic geolocation finder
//
// function getLocation() {
//     if (navigator.geolocation) {
//
//         navigator.geolocation.getCurrentPosition(showPosition)
//     } else {
//         console.log("Geolocation is not supported by this browser.");
//     }
// }
//
// function showPosition(position) {
//     console.log(position.coords);
//     let lat = position.coords.latitude;
//     let lon = position.coords.longitude;
//     let mapObj = {}
//     mapObj.lng = lon
//     mapObj.lat = lat
//     map.flyTo({center: [lon, lat]})
//     console.log(directions());
//
//     // directions(mapObj,)
//
//
//     addMarker(mapObj)
//     // x.innerHTML = "Latitude: " + position.coords.latitude +
//     //     "<br>Longitude: " + position.coords.longitude;
// }

//
//
//
//     /***
//  * geocode is a method to search for coordinates based on a physical address and return
//  * @param {string} search is the address to search for the geocoded coordinates
//  * @param {string} token is your API token for MapBox
//  * @returns {Promise} a promise containing the latitude and longitude as a two element array
//  *
//  * EXAMPLE:
//  *
//  *  geocode("San Antonio", API_TOKEN_HERE).then(function(results) {
//  *      // do something with results
//  *  })
//  *
//  */
// function geocode(search, token) {
//     var baseUrl = 'https://api.mapbox.com';
//     var endPoint = '/geocoding/v5/mapbox.places/';
//     return fetch(baseUrl + endPoint + encodeURIComponent(search) + '.json' + "?" + 'access_token=' + token)
//         .then(function(res) {
//             return res.json();
//             // to get all the data from the request, comment out the following three lines...
//         }).then(function(data) {
//             return data.features[0].center;
//         });
// }
//
//
// /***
//  * reverseGeocode is a method to search for a physical address based on inputted coordinates
//  * @param {object} coordinates is an object with properties "lat" and "lng" for latitude and longitude
//  * @param {string} token is your API token for MapBox
//  * @returns {Promise} a promise containing the string of the closest matching location to the coordinates provided
//  *
//  * EXAMPLE:
//  *
//  *  reverseGeocode({lat: 32.77, lng: -96.79}, API_TOKEN_HERE).then(function(results) {
//  *      // do something with results
//  *  })
//  *
//  */
// function reverseGeocode(coordinates, token) {
//     var baseUrl = 'https://api.mapbox.com';
//     var endPoint = '/geocoding/v5/mapbox.places/';
//     return fetch(baseUrl + endPoint + coordinates.lng + "," + coordinates.lat + '.json' + "?" + 'access_token=' + token)
//         .then(function(res) {
//             return res.json();
//         })
//         // to get all the data from the request, comment out the following three lines...
//         .then(function(data) {
//             return data.features[0].place_name;
//         });
// }
//
//
// function directions() {
//     let token = "pk.eyJ1IjoibWF0dGhld3dpcmFtIiwiYSI6ImNsOWx2YmJwODFtMnEzdXAyMDFvdHRxcHcifQ.20mYzJo1wfnNRyCTEJMtyw";
//     let address = "https://api.mapbox.com/directions/v5/mapbox/walking/"
//     let coordinates = "-80.175652,33.018505" + ";" + "-80.175652,33.028505?geometries=geojson&"
//     let end =      'access_token=' + token
//
//     console.log(coordinates);
//     return fetch(address + coordinates + end).then(function (res) {
//         return res.json();
//     })
//         .then(function (data) {
//             return console.log(data)
//         });
//
//
//
// }



let coords = [80, 33]

getLocation()

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function error() {
    console.log("Geolocation is not supported by this browser.");
}

async function getLocation() {
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(showPosition, error, options)
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {

    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let mapArr = []
    mapArr.push(lon);
    mapArr.push(lat)

    map.flyTo({center: [lon, lat]})

    coords = mapArr;
    getRoute(coords)

    // directions(mapObj,)


    // addMarker(mapObj)
    // x.innerHTML = "Latitude: " + position.coords.latitude +
    //     "<br>Longitude: " + position.coords.longitude;
}

let start = [-80.175652, 33.018505]
// Start of directions testing
// create a function to make a directions request
async function getRoute(end) {
    // make a directions request using cycling profile
    // an arbitrary start will always be the same

    // only the end or destination will change
    const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/walking/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
        { method: 'GET' }
    );
    const json = await query.json();
    const data = json.routes[0];
    const route = data.geometry.coordinates;
    const geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
            type: 'LineString',
            coordinates: route
        }
    };
    // if the route already exists on the map, we'll reset it using setData
    if (map.getSource('route')) {
        map.getSource('route').setData(geojson);
    }
    // otherwise, we'll make a new request
    else {
        map.addLayer({
            id: 'route',
            type: 'line',
            source: {
                type: 'geojson',
                data: geojson
            },
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': '#3887be',
                'line-width': 5,
                'line-opacity': 0.75
            }
        });
    }
    // add turn instructions here at the end
}

map.on('load', () => {
    // make an initial directions request that
    // starts and ends at the same location
    getRoute(start);

    // Add starting point to the map
    map.addLayer({
        id: 'point',
        type: 'circle',
        source: {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'Point',
                            coordinates: start
                        }
                    }
                ]
            }
        },
        paint: {
            'circle-radius': 10,
            'circle-color': '#3887be'
        }
    });
    // this is where the code from the next step will go
});

map.on('click', (event) => {
    // const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);



    const end = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'Point',
                    coordinates: coords
                }
            }
        ]
    };
    if (map.getLayer('end')) {
        map.getSource('end').setData(end);
    } else {
        map.addLayer({
            id: 'end',
            type: 'circle',
            source: {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [
                        {
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'Point',
                                coordinates: coords
                            }
                        }
                    ]
                }
            },
            paint: {
                'circle-radius': 10,
                'circle-color': '#f30'
            }
        });
    }
    getRoute(coords);
});


