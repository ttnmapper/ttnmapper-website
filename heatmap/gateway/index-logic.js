setUp().then(r => {});

async function setUp() {
  await initMap();

  addBackgroundLayers();
  addForegroundLayers();
  // getGatewaysInView();

  // gatewayMarkers.addTo(map);
  //gatewayMarkersNoCluster.addTo(map);
}

// Callback to refresh layers when the maps was panned or zoomed
function boundsChangedCallback() {
  // Refresh the visible gateways, which will also trigger a layer refresh
  // getGatewaysInView();
}

function addForegroundLayers() {
  var network = findGetParameter("network");
  var gateway = findGetParameter("gateway");

    if(gateway === null) {
        return;
    }

  var tms_url = 'https://tms.ttnmapper.org/circles/gateway/{networkid}/{gatewayid}/{z}/{x}/{y}.png';
  
  var coveragetiles = L.tileLayer(tms_url, {
    networkid: encodeURIComponent(network),
    gatewayid: encodeURIComponent(gateway),
    maxNativeZoom: 19,
    maxZoom: 20,
    maxNativeZoom: 20,
    zIndex: 10,
    opacity: 0.5
  });
  coveragetiles.addTo(map);

  AddGateway(network, gateway);
}

function showOrHideLayers() {
  // This function is called after we know which gateways are in view: gatewaysInView
  // Download the neccesary layers, hide them, or display them.
}

function AddGateway(network, gateway) {
  // /{network_id}/{gateway_id}/details
  const res = fetch("https://api.ttnmapper.org/gateway/"+encodeURIComponent(network)+"/"+encodeURIComponent(gateway)+"/details")
      .then(response => response.json())
      .then(gateway => {
        console.log(gateway);

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