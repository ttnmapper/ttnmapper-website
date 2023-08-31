<?php
?>

<!-- Bootstrap -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"
        integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
        crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
        crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js"
        integrity="sha256-bqVeqGdJ7h/lYPq6xrPv/YGzMEb6dNxlfiTUHSgRCp8=" crossorigin="anonymous"></script>

<!-- Leaflet -->
<script src="/libs/leaflet-1.9.3/leaflet.js"></script>
<script src="/libs/leaflet.measure/leaflet.measure.js"></script>
<script src="/libs/Leaflet.markercluster/dist/leaflet.markercluster.js"></script>

<!-- HTML entity escaping -->
<script src="/libs/he/he.js"></script>

<!-- Moment for datetime manipulation -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js"
        integrity="sha512-CryKbMe7sjSCDPl18jtJI5DR5jtkUWxPXWaLCst6QjH8wxDexfRJic2WRmRXmstr2Y8SxDDWuBO6CQC6IE4KTA=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.43/moment-timezone-with-data.js"
        integrity="sha512-lWuI1XloUBHbHQzrGW+f/uAuFA9rvHF5GsAU8Yo1mRevjkG2uChlWTueootXyWRCVtVjpxe85x18CZEt7o62Iw=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<script>
    $(function () {
        $("#legend").load("/legend.html");
    });
</script>

<!-- The map style -->
<script type="text/javascript" src="/common.js"></script>