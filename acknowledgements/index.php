<!DOCTYPE html>
<html lang="en">
<?php require $_SERVER['DOCUMENT_ROOT'] . '/head.php'; ?>
<body>


<!-- Image and text -->
<nav class="navbar navbar-fixed-top navbar-expand-lg navbar-light bg-light">

    <a class="navbar-brand" href="/">
        <img src="<?php echo $brandIcon; ?>" width="auto" height="32" class="d-inline-block align-top" alt="">
        <?php echo $brandName; ?>
    </a>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <a class="nav-link" href="/heatmap/">Heatmap</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/radar/">Beams</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/advanced-maps/">Advanced maps</a>
            </li>
            <li class="nav-item active">
                <a class="nav-link" href="/acknowledgements/">Acknowledgements</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="https://coveragemap.net">Helium</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="https://docs.ttnmapper.org">Docs</a>
            </li>
        </ul>
    </div>

    <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <div class="navbar-nav ml-auto">
            <a href="https://docs.ttnmapper.org/support-project.html" target="_blank">
                <button class="btn btn-primary">Support the project</button>
            </a>
        </div>
    </div>

</nav>


<div class="container ">
    <h1 class="mt-4">Acknowledgements</h1>

    <div class="card mt-4">
        <h5 class="card-header">Initial data set</h5>
        <div class="card-body">

            <dl>
                <dt><a href="http://www.decentlab.com/news/2016/2/2/the-things-network-zurich-coverage">Decentlab</a>
                    and <a href="https://github.com/ttn-zh">TTN Zurich</a></dt>
                <dd>For coverage data around the area of Zurich</dd>

                <dt><a href="http://pade.nl/lora/">pade.nl</a></dt>
                <dd>For coverage data of the major cities in The Netherlands</dd>
            </dl>

        </div>
    </div>

    <div class="card mt-4">
        <h5 class="card-header">Shuttleworth Foundation</h5>
        <div class="card-body">
            For a <a href="https://www.shuttleworthfoundation.org/fellows/flash-grants/">flash grant during 2018</a> to
            support with opensourcing TTN Mapper, server hosting costs, and getting me to attend The Things Conference.
        </div>
    </div>

    <div class="card mt-4">
        <h5 class="card-header">Patreon supporters</h5>
        <div class="card-body">
            A number of patrons make a monthly contribution to cover the running cost of TTN Mapper. Some of their names
            are listed below.
            <ul>
                <li>22 anonymous patrons</li>
                <li>Bruce Fitzsimons</li>
                <li>Giovanni Bertozzi</li>
                <li>@Ryanteck</li>
                <li>Adam Roberts</li>
                <li><a href="https://meshed.com.au/"><img src="Meshed-240x150-2.png" style="height: 40px;"/>&nbsp;Meshed</a>
                </li>
                <li>Keptenkurk</li>
                <li>Howard Phillips</li>
                <li>EmielN Heemskerk</li>
                <li>Richard Wenner</li>
            </ul>
        </div>
    </div>

    <div class="card mt-4">
        <h5 class="card-header">Other donations received from</h5>
        <div class="card-body">
            <ul>
                <li><a href="https://www.boatofficer.com/">BoatOfficer</a></li>
            </ul>
        </div>
    </div>

    <div class="card mt-4">
        <h5 class="card-header">Core Contributors</h5>
        <div class="card-body">
            <dl>
                <dt><a href="https://github.com/jpmeijers">JP Meijers</a></dt>
                <dd>Project initiator, Android app, frontend, backend</dd>

                <dt><a href="https://github.com/TimothySealy">Timothy Sealy</a></dt>
                <dd>iOS mapping app, branding, architecture</dd>

                <dt><a href="https://github.com/KolijnWolfaardt">Kolijn Wolfaardt</a></dt>
                <dd>Backend development, hardware design</dd>
            </dl>

        </div>
    </div>

    <p>&nbsp;</p>
</div>

<!-- Bootstrap -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"
        integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
        crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
        crossorigin="anonymous"></script>

<!-- Leaflet -->
<script src="/libs/leaflet/leaflet.js"></script>
<script src="/libs/leaflet.measure/leaflet.measure.js"></script>
<script src="/libs/Leaflet.markercluster/dist/leaflet.markercluster.js"></script>

<!-- HTML entity escaping -->
<script src="/libs/he/he.js"></script>

<!-- Moment for datetime manipulation -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"
        integrity="sha512-qTXRIMyZIFb8iQcfjXWCO8+M5Tbc38Qi5WzdPOYZHIlZpzBHG3L3by84BBBOiRGiEb7KKtAOAs5qYdUiZiQNNQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.34/moment-timezone-with-data.min.js"
        integrity="sha512-fFkDTD3GpiLXZBIrfRu0etHZkCdWPkcNy4TjDqI3gQFVfbbDRFG5vV7w3mIeeOCvUY5cEKTUFiTetIsFtWjF1Q=="
        crossorigin="anonymous"></script>


<!-- The map style -->
<script type="text/javascript" src="/common.js"></script>
<!-- The actual main logic for this page -->
<!-- <script src="index-logic.js"></script> -->
</body>
</html>
