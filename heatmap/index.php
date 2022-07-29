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
    
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="/heatmap/">Heatmap</a>
        </li>
          <li class="nav-item">
              <a class="nav-link" href="/radar/">Beams</a>
          </li>
        <li class="nav-item">
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
              <a href="https://docs.ttnmapper.org/support-project.html" target="_blank"><button class="btn btn-primary">Support the project</button></a>
          </div>
      </div>

  </nav>

  <!-- <div class="alert alert-warning alert-dismissible fade show" role="alert" id="private-network-warning">
    Warning: You are viewing the coverage for a private network. This will require a subscription in the future.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div> -->

  <div id="map"></div>
  <div id="rightcontainer">
    <div id="legend" class="dropSheet"></div>
  </div>
</div>

  <!-- Bootstrap -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

  <!-- Leaflet -->
  <script src="/libs/leaflet/leaflet.js"></script>
  <script src="/libs/leaflet.measure/leaflet.measure.js"></script>
  <script src="/libs/Leaflet.markercluster/dist/leaflet.markercluster.js"></script>

  <!-- HTML entity escaping -->
  <script src="/libs/he/he.js"></script>

<!-- Moment for datetime manipulation -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js" integrity="sha512-qTXRIMyZIFb8iQcfjXWCO8+M5Tbc38Qi5WzdPOYZHIlZpzBHG3L3by84BBBOiRGiEb7KKtAOAs5qYdUiZiQNNQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.34/moment-timezone-with-data.min.js" integrity="sha512-fFkDTD3GpiLXZBIrfRu0etHZkCdWPkcNy4TjDqI3gQFVfbbDRFG5vV7w3mIeeOCvUY5cEKTUFiTetIsFtWjF1Q==" crossorigin="anonymous"></script>

<script>
    $(function(){
      $("#legend").load("/legend.html"); 
    });
  </script>

  <!-- The map style -->
  <script type="text/javascript" src="/common.js"></script>
  <!-- The actual main logic for this page -->
  <script src="index-logic.js"></script>

</body>
</html>
