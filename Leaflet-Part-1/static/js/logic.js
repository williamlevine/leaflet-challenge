// Initialize the map and set the view to a starting point
let map = L.map("map").setView([39.8283, -98.5795],5);

// Initialize tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Function to determine the marker color based on earthquake depth
function getColor(depth) {
  return depth > 90 ? '#ff5f64' :
         depth > 70 ? '#fda25e' :
         depth > 50 ? '#fcb72a' :
         depth > 30 ? '#f6db10' :
         depth > 10 ? '#dcf401' :
                      '#a4f500';
}

// Function to determine the marker size based on earthquake magnitude
function getRadius(magnitude) {
  return magnitude * 4;
}

// Function to visualize the data by adding markers to the map
function visualizeData(data) {
  L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {
        
        // magnitude determines size
        radius: getRadius(feature.properties.mag),
        
        // depth determines color
        fillColor: getColor(feature.geometry.coordinates[2]),
        color: "#000",
        weight: 0.5,
        opacity: 1,
        fillOpacity: 0.8
      });
    },
    // Add popup with metadata when clicked
    onEachFeature: function (feature, layer) {
      layer.bindPopup(`<h3>${feature.properties.place}</h3>
                       <hr>
                       <p><strong>Magnitude:</strong> ${feature.properties.mag}</p>
                       <p><strong>Depth:</strong> ${feature.geometry.coordinates[2]} km</p>
                       <p><strong>Time:</strong> ${new Date(feature.properties.time)}</p>`);
    }
  }).addTo(map);
}

// Fetch the earthquake data from USGS using D3 and call visualizeData to display it
d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson')
  .then(data => {
    visualizeData(data);
  })
  // If there is an error getting the data, log it to the console
  .catch(error => {
    console.error("Error fetching the GeoJSON data:", error);
  });

// Add a legend to explain the depth color coding
let legend = L.control({ position: "bottomright" });

legend.onAdd = function () {
  let div = L.DomUtil.create("div", "info legend"),
      depths = [-10, 10, 30, 50, 70, 90];

  // Add title to legend
  div.innerHTML = "<strong>Earthquake Depth (km)<br><br><strong>"

  // Loop through depth intervals and generate a label with a colored square for each
  for (let i = 0; i < depths.length; i++) {
    div.innerHTML +=
      '<i style="background:' + getColor(depths[i] + 1) + '"></i> ' +
      depths[i] + (depths[i + 1] ? "&ndash;" + depths[i + 1] + "<br>" : "+");
  }

  return div;
};

// Add the legend to the map
legend.addTo(map);
