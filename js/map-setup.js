// This example requires the Visualization library. Include the libraries=visualization
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization">

// 41.999218, 21.429010
// {lat: 37.775, lng: -122.434}

function getSkPoints() 
{
    return [
        { location: new google.maps.LatLng(42.006667, 21.386944), weight : 50 },
        { location: new google.maps.LatLng(41.9925, 21.423611), weight : 100 }
    ];
}

function toggleRectangle() {
  googleVariables.rectangle.setMap(googleVariables.rectangle.getMap() ? null : googleVariables.map);
}

function toggleHeatmap() {
  googleVariables.heatmap.setMap(googleVariables.heatmap.getMap() ? null : googleVariables.map);
}

function changeGradient() {
  var gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ];
  googleVariables.heatmap.set('gradient', googleVariables.heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
  googleVariables.heatmap.set('radius', googleVariables.heatmap.get('radius') ? null : 50);
}

function changeOpacity() {
  googleVariables.heatmap.set('opacity', googleVariables.heatmap.get('opacity') ? null : 0.2);
}



