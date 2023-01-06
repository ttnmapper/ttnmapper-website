<!DOCTYPE html>
<html lang="en">
<?php require $_SERVER['DOCUMENT_ROOT'] . '/head.php'; ?>
<body>


<div class="container-fullwidth" style="display: flex; flex-flow: column; height: 100%;">

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
                <li class="nav-item active">
                    <a class="nav-link" href="/advanced-maps/">Advanced maps</a>
                </li>
                <li class="nav-item">
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

    <div id="map">
        <div id="rightcontainer">
            <div id="legend" class="dropSheet"></div>
        </div>
    </div>

    <div class="overlay"></div>
    <div class="spanner">
        <div class="loader"></div>
        <p>Fetching data, please be patient.</p>
    </div>
</div>

<!-- Include required libraries -->
<?php require $_SERVER['DOCUMENT_ROOT'] . '/foot.php'; ?>

<!-- The actual main logic for this page -->
<script src="index-logic.js"></script>

</body>
</html>
