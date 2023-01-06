var canvasRenderer;

var gateways = [];

setUp().then(r => {});

async function setUp() {

  $("#legend").load("/legend.html");
  // $("#legend").css({visibility: "hidden"});
    document.getElementById('legend').style.display= 'none' ;

  await initMap();

  // Canvas for circle layers
  map.createPane('semitransparent');
  map.getPane('semitransparent').style.opacity = '0.5';
  canvasRenderer = L.canvas({pane: 'semitransparent'});

  addBackgroundLayers();
  addForegroundLayers();
}

function addForegroundLayers() {
  var network_id = settings.network.network_id;

  // Need to add radar plots for only visible gateways

  AddGateways(network_id);
}

function AddGateways(network_id) {
  const res = fetch("https://api.ttnmapper.org/network/"+encodeURIComponent(network_id)+"/gateways")
  .then(response => response.json())
  .then(data => {
    for(gateway of data) {
        let lastHeardDate = Date.parse(gateway.last_heard);

        if (Math.abs(gateway.latitude) < 1 && Math.abs(gateway.longitude) < 1) {
            // console.log("Gateway " + gateway.gateway_id + " on NULL island");
        } else {
            // Only add gateways last heard in past 5 days
            if (lastHeardDate > (Date.now() - (5 * 24 * 60 * 60 * 1000))) {
                gateways.push(gateway);

                let marker = L.marker(
                    [gateway.latitude, gateway.longitude],
                    {
                        icon: iconByNetworkId(gateway.network_id, lastHeardDate)
                    });
                const gwDescriptionHead = popUpHeader(gateway);
                const gwDescription = popUpDescription(gateway);
                marker.bindPopup(`${gwDescriptionHead}<br>${gwDescription}`);
                gatewayMarkersCluster.addLayer(marker);
                gatewayMarkersNoCluster.addLayer(marker);

                // getRadar(gateway.network_id, gateway.gateway_id);
            }
        }
    }

    if(settings.theming.cluster_gateways) {
      layerControl.addOverlay(gatewayMarkersCluster, "Gateways");
      gatewayMarkersCluster.addTo(map);
    } else {
      layerControl.addOverlay(gatewayMarkersNoCluster, "Gateways");
      gatewayMarkersNoCluster.addTo(map);
    }

    // Add radars
    boundsChangedCallback().then(r => {});
  });
}

var gatewaysInView = [];

var loadedRadarLayers = {};
var visibleRadarLayers = {};

var loadedCircleLayers = {};
var visibleCircleLayers = {};

var previousZoom = 0;


// When less than this number of gateways are in view we display the full resolution coverage
var layerSwapGwCount = 600;
// If les than this number is shown we display a lower resolution coverage, ie. circles
var layerHideGwCount = 4000;
// Above this number we only display the gateway markers.


// Callback to refresh layers when the map was panned or zoomed
async function boundsChangedCallback() {
    getGatewaysInView();
    console.log(gatewaysInView);
    showOrHideLayers();
}

function getGatewaysInView() {
    var west = map.getBounds().getWest();
    var east = map.getBounds().getEast();
    var north = map.getBounds().getNorth();
    var south = map.getBounds().getSouth();

    gatewaysInView = [];

    gateways.forEach(function (gateway) {
        if(gateway.north > south && gateway.south < north && gateway.east > west && gateway.west < east) {
            gatewaysInView.push(gateway);
        }
    })

}

let prevState = "none";

function showOrHideLayers() {
    if(map)
    {
        console.log("Gateways in view", gatewaysInView.length)
        if(gatewaysInView.length<layerSwapGwCount){
            //View radars
            console.log("Should show radars");
            if(prevState !== "radar") {
                hideAllLayers();
            }
            previousZoom = map.getZoom();
            prevState = "radar";
            loadRadarsInView();
            hideAllCircleViews();
        }
        else if(gatewaysInView.length<layerHideGwCount){
            //View circles
            console.log("Should show circles");
            if (prevState!=="circle") {
                hideAllLayers();
            }
            previousZoom = map.getZoom();
            prevState = "circle";
            loadCircleViews();
            hideAllRadarViews();
        }
        else {
            //Hide all and only show markers
            hideAllLayers();
            hideAllCircleViews();
            hideAllRadarViews();
            previousZoom = map.getZoom();
            prevState = "none";
        }
    }
}


function hideAllLayers() {
    console.log("Hiding all layers");
    hideAllCircleViews();
    hideAllRadarViews();
}

function hideAllRadarViews()
{
    // console.log("Hiding radar views: "+Object.keys(visibleRadarLayers));
    Object.keys(visibleRadarLayers).forEach(function(key) {
        map.removeLayer(visibleRadarLayers[key]);
        delete visibleRadarLayers[key];
        // console.log("Removing radar "+key);
    });

    // Object.keys(loadedRadarLayers).forEach(function(key) {
    //   map.removeLayer(loadedRadarLayers[key]);
    // });
}

function hideAllCircleViews()
{
    // console.log("Hiding circle views: "+Object.keys(visibleCircleLayers));
    Object.keys(visibleCircleLayers).forEach(function(key) {
        map.removeLayer(visibleCircleLayers[key]);
        delete visibleCircleLayers[key];
        // console.log("Removing circle "+key);
    });

    // Object.keys(loadedCircleLayers).forEach(function(key) {
    //   map.removeLayer(loadedCircleLayers[key]);
    // });
}

function loadCircleViews()
{
    console.log("loadCircleViews");
    let gwids = [];
    gatewaysInView.forEach(function (gateway) {
        gwids.push(gateway.gateway_id);
    })

    // First hide layers that are not visible anymore
    Object.keys(visibleCircleLayers).forEach(function(key) {
        if($.inArray(key, gwids)!=-1) {
            // Keep showing the layer, or download a new one
        }
        else {
            map.removeLayer(visibleCircleLayers[key]);
            delete visibleCircleLayers[key];
        }
    });

    var newCirclesToDownload = [];

    for(var i=0; i<gwids.length; i++) {
        let gwid = gwids[i];

        // Add a marker on the map for the gateway
        // addGateway(gwid);

        // Layer download
        if(gwid in loadedCircleLayers) {
            //already downloaded this layer and drew it
            // Layer show/hide
            if(gwid in visibleCircleLayers) {
                // Layer already shown
            }
            else {
                loadedCircleLayers[gwid].addTo(map);
                visibleCircleLayers[gwid] = loadedCircleLayers[gwid];
            }
        }
        else {
            newCirclesToDownload.push(gwid);
        }
    }

    // $.ajax({
    //     type: "POST",
    //     url: "/webapi/gwcirclelist.php",
    //     // The key needs to match your method's input parameter (case-sensitive).
    //     data: JSON.stringify({ "gateways": newRadarsToDownload }),
    //     contentType: "application/json; charset=utf-8",
    //     dataType: "json",
    //     success: function(data){
    //         for(gwid in data) {
    //             let geojsonLayerCircles = L.geoJSON(data[gwid], {
    //                 pointToLayer: function (feature, latlng) {
    //                     return L.circle(latlng, feature.properties.radius, {
    //                         stroke: false,
    //                         fillOpacity: 0.8,
    //                         fillColor: "#0000FF",
    //                         renderer: canvasRenderer,
    //                     });
    //                 }
    //             });
    //             if(gwid in visibleCircleLayers) {
    //             } else {
    //                 geojsonLayerCircles.addTo(map);
    //                 visibleCircleLayers[gwid] = geojsonLayerCircles;
    //             }
    //             if(gwid in loadedCircleLayers) {
    //             } else {
    //                 loadedCircleLayers[gwid] = geojsonLayerCircles;
    //             }
    //         }
    //     },
    //     failure: function(errMsg) {
    //         console.log(errMsg);
    //     }
    // });

}

function loadRadarsInView()
{
    console.log("Loading radars in view");
    let gwids = [];
    gatewaysInView.forEach(function (gateway) {
        gwids.push(gateway.gateway_id);
    })

    // First hide layers that are not visible anymore
    Object.keys(visibleRadarLayers).forEach(function(key) {
        if($.inArray(key, gwids)!=-1) {
            // Keep showing the layer, or download a new one
            // console.log("Keeping or showing layer for "+key);
        }
        else {
            // console.log("Removing layer for "+key);
            map.removeLayer(visibleRadarLayers[key]);
            delete visibleRadarLayers[key];
        }
    });

    var newRadarsToDownload = [];

    gatewaysInView.forEach(function (gateway) {
        const cacheIndex = gateway.network_id+"/"+gateway.gateway_id;

        // Layer download
        if(cacheIndex in loadedRadarLayers) {
            //already downloaded this layer and drew it
            // Layer show/hide
            if(cacheIndex in visibleRadarLayers) {
                // Layer already shown
                // console.log("Radar already shown for "+cacheIndex);
            }
            else {
                // Showing previously downloaded radar (which came back into view)
                loadedRadarLayers[cacheIndex].addTo(map);
                visibleRadarLayers[cacheIndex] = loadedRadarLayers[cacheIndex];
            }
        }
        else {
            // console.log("Need to download radar for "+cacheIndex);
            newRadarsToDownload.push(gateway);
        }
    });

    if(newRadarsToDownload.length > 0) {

        newRadarsToDownload.forEach(function (gateway) {
            const cacheIndex = gateway.network_id+"/"+gateway.gateway_id;
            console.log("Need to fetch ", cacheIndex);

            fetch("https://api.ttnmapper.org/gateway/"+encodeURIComponent(gateway.network_id)+"/"+encodeURIComponent(gateway.gateway_id)+"/radar/single")
            .then(response => response.json())
            .then(data => {

                if(data['success'] === false) {
                    console.log("could not generate radar plot for", cacheIndex);
                    return;
                }

                let polygon = L.geoJSON(data,
                    {
                        stroke: false,
                        // weight: 2,
                        // color: "#000000",
                        fillOpacity: 0.8,
                        fillColor: "#0000FF",
                        // zIndex: 25,
                        renderer: canvasRenderer
                    }
                );
                if(cacheIndex in visibleRadarLayers) {
                } else {
                    visibleRadarLayers[cacheIndex] = polygon; // should add the layer to the map here and store the pointer to the layer
                    polygon.addTo(map);
                }
                if(cacheIndex in loadedRadarLayers) {
                } else {
                    loadedRadarLayers[cacheIndex] = polygon; // should add the geojson data to the dictionary here
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        })
        /*
        $.ajax({
            type: "POST",
            url: "/webapi/gwradarlist.php",
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify({ "gateways": newRadarsToDownload }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
                for(gwid in data) {
                    // let polygon = L.polygon(latlngs,
                    let polygon = L.geoJSON(data[gwid],
                        {
                            stroke: false,
                            // weight: 2,
                            // color: "#000000",
                            fillOpacity: 0.8,
                            fillColor: "#0000FF",
                            // zIndex: 25,
                            renderer: canvasRenderer
                        }
                    );
                    if(gwid in visibleRadarLayers) {
                    } else {
                        visibleRadarLayers[gwid] = polygon; // should add the layer to the map here and store the pointer to the layer
                        polygon.addTo(map);
                        //radarLayersGroup.addLayer(polygon).addTo(map);
                    }
                    if(gwid in loadedRadarLayers) {
                    } else {
                        loadedRadarLayers[gwid] = polygon; // should add the geojson data to the dictionary here

                        // When only a subset of gateways are displayed, zoom to fit them into view.
                        // And only do this when there is a layer displayed and if the start location is not set by url params
                        if("gateway" in getParameters && Object.keys(loadedRadarLayers).length > 0
                            && findGetParameter("lat")==null && findGetParameter("lon")==null
                            && findGetParameter("zoom")==null) {
                            var group = L.featureGroup(Object.values(loadedRadarLayers));
                            map.fitBounds(group.getBounds());
                        }
                    }
                }
            },
            failure: function(errMsg) {
                console.log(errMsg);
            }
        });
         */
    }

}