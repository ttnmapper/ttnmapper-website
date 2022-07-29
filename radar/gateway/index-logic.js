var canvasRenderer;

setUp().then(r => {});

async function setUp() {

  $("#legend").load("/legend.html");
  $("#legend").css({visibility: "visible"});

  await initMap();

  // Canvas for radar layers
  map.createPane('semitransparent');
  map.getPane('semitransparent').style.opacity = '0.7';
  canvasRenderer = L.canvas({pane: 'semitransparent'});

  addBackgroundLayers();
  addForegroundLayers();
}

// Callback to refresh layers when the map was panned or zoomed
function boundsChangedCallback() {
}

function addForegroundLayers() {
  var network_id = findGetParameter("network");
  var gateway_id = findGetParameter("gateway");

  if(gateway_id === null) {
      return;
  }

    AddGateway(network_id, gateway_id);
    getRadar(network_id, gateway_id);
}

function showOrHideLayers() {
  // This function is called after we know which gateways are in view: gatewaysInView
  // Download the necessary layers, hide them, or display them.
}

function AddGateway(network_id, gateway_id) {
    // /{network_id}/{gateway_id}/details
    const res = fetch("https://api.ttnmapper.org/gateway/"+encodeURIComponent(network_id)+"/"+encodeURIComponent(gateway_id)+"/details")
        .then(response => response.json())
        .then(gateway => {
            // single gateway: center map at gateway
            map.panTo(new L.LatLng(gateway.latitude, gateway.longitude));

            let lastHeardDate = Date.parse(gateway.last_heard);

            // Only add gateways last heard in past 5 days
            if(lastHeardDate > (Date.now() - (5*24*60*60*1000))) {
                let marker = L.marker(
                    [ gateway.latitude, gateway.longitude ],
                    {
                        icon: iconByNetworkId(gateway.network_id, lastHeardDate)
                    });
                const gwDescriptionHead = popUpHeader(gateway);
                const gwDescription = popUpDescription(gateway);
                marker.bindPopup(`${gwDescriptionHead}<br>${gwDescription}`);
                marker.addTo(map);
            }
        });
}

function getRadar(network_id, gateway_id) {
  fetch("https://api.ttnmapper.org/gateway/"+encodeURIComponent(network_id)+"/"+encodeURIComponent(gateway_id)+"/radar/multi")
      .then(response => response.json())
      .then(data => {

          if(data['success'] === false) {
              console.log("could not generate radar plot for", gateway_id);
              return;
          }

        let geojsonBlue = L.geoJSON(data,
            {
              stroke: false,
              fillOpacity: 0.9,
              fillColor: "#0000FF",
              zIndex: 25,
              renderer: canvasRenderer,
              filter: function (feature) {
                if(feature.properties['fill']==="blue") return true;
                else return false;

              }
            }
        );

        let geojsonCyan = L.geoJSON(data,
            {
              stroke: false,
              fillOpacity: 0.9,
              fillColor: "#00FFFF",
              zIndex: 30,
              renderer: canvasRenderer,
              filter: function (feature) {
                if(feature.properties['fill']==="cyan") return true;
                else return false;

              }
            }
        );

        let geojsonGreen = L.geoJSON(data,
            {
              stroke: false,
              fillOpacity: 0.9,
              fillColor: "#00FF00",
              zIndex: 35,
              renderer: canvasRenderer,
              filter: function (feature) {
                if(feature.properties['fill']==="green") return true;
                else return false;

              }
            }
        );

        let geojsonYellow = L.geoJSON(data,
            {
              stroke: false,
              fillOpacity: 0.9,
              fillColor: "#FFFF00",
              zIndex: 40,
              renderer: canvasRenderer,
              filter: function (feature) {
                if(feature.properties['fill']==="yellow") return true;
                else return false;

              }
            }
        );

        let geojsonOrange = L.geoJSON(data,
            {
              stroke: false,
              fillOpacity: 0.9,
              fillColor: "#FF7F00",
              zIndex: 45,
              renderer: canvasRenderer,
              filter: function (feature) {
                if(feature.properties['fill']==="orange") return true;
                else return false;

              }
            }
        );

        let geojsonRed = L.geoJSON(data,
            {
              stroke: false,
              fillOpacity: 0.9,
              fillColor: "#FF0000",
              zIndex: 50,
              renderer: canvasRenderer,
              filter: function (feature) {
                if(feature.properties['fill']==="red") return true;
                else return false;

              }
            }
        );

        var polygon = L.featureGroup([
          geojsonBlue,
          geojsonCyan,
          geojsonGreen,
          geojsonYellow,
          geojsonOrange,
          geojsonRed
        ]);

        polygon.addTo(map);
          map.fitBounds(polygon.getBounds());
      })
      .catch((error) => {
        console.error('Error:', error);
      });

}