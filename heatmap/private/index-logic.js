setUp().then(r => {});

async function setUp() {
  $("#legend").load("/legend.html");
  $("#legend").css({ visibility: "visible"});

  await initMap();

  addBackgroundLayers();
  addForegroundLayers();

  if(settings.theming.cluster_gateways) {
    gatewayMarkersCluster.addTo(map);
  } else {
    gatewayMarkersNoCluster.addTo(map);
  }
}

// Callback to refresh layers when the map was panned or zoomed
function boundsChangedCallback() {

}

function addForegroundLayers() {
  var network = findGetParameter("network");
  var gateway = findGetParameter("gateway");

  if(network === "thethingsnetwork.org" || network === "NS_TTS_V3://ttn@000013" || network === "NS_HELIUM://000024") {
    $("#private-network-warning").remove();
  }

  var tms_url = 'https://tms.ttnmapper.org/circles/network/{networkid}/{z}/{x}/{y}.png';
  if(gateway !== null) {
    tms_url = 'https://tms.ttnmapper.org/circles/gateway/{networkid}/{gatewayid}/{z}/{x}/{y}.png';
  }
  
  var coveragetiles = L.tileLayer(tms_url, {
    networkid: encodeURIComponent(network),
    gatewayid: encodeURIComponent(gateway),
    maxNativeZoom: 19,
    maxZoom: 20,
    zIndex: 10,
    opacity: 0.5
  });
  coveragetiles.addTo(map);

  if(gateway !== null) {
    AddGateway(network, gateway);
  } else {
    AddGateways(network);
  }
}

function showOrHideLayers() {
  // This function is called after we know which gateways are in view: gatewaysInView
  // Download the necessary layers, hide them, or display them.
}

function AddGateways(network) {
  const res = fetch("https://api.ttnmapper.org/network/"+encodeURIComponent(network)+"/gateways")
  .then(response => response.json())
  .then(data => {

    for(gateway of data) {
      let lastHeardDate = Date.parse(gateway.last_heard);

      // Only add gateways last heard in past 5 days
      if(lastHeardDate > (Date.now() - (5*24*60*60*1000)) ) {
        let marker = L.marker(
        [ gateway.latitude, gateway.longitude ], 
        {
            icon: iconByNetworkId(gateway.network_id, lastHeardDate)
        });
        const gwDescriptionHead = popUpHeader(gateway);
        const gwDescription = popUpDescription(gateway);
        marker.bindPopup(`${gwDescriptionHead}<br>${gwDescription}`);
        gatewayMarkersCluster.addLayer(marker);
        gatewayMarkersNoCluster.addLayer(marker);
      }
    }

  });
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
