// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
    id: 'mapbox/streets-v11',
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
    id: 'mapbox/satellite-streets-v11',
});

// Create a base layer that holds both maps.
let baseMaps = {
    Street: streets,
    Satellite: satelliteStreets
};

let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

// Pass our map layers into our layer control and add the layer control to the map
L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto neighborhoods data
let torontoHoods = "static/js/torontoNeighborhoods.json"
// // Accessing the Toronto airline routes GeoJSON URL.
// let torontoData = "static/js/torontoRoutes.json";
// // Accessing the airport GeoJSON URL
// let airportData = "static/js/majorAirports.json"

// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data).addTo(map);
});