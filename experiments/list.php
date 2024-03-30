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
            <li class="nav-item active">
                <a class="nav-link" href="/advanced-maps/">Advanced maps</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="https://coveragemap.net">CoverageMap.net</a>
            </li>
        </ul>
    </div>

</nav>


<div class="container ">
    <h1 class="mt-4">Experiments</h1>

    <form class="needs-validation form-inline" novalidate>
        <div class="form-group">
            <input class="form-control"
                   type="text"
                   id="experiment-name"
                   name="experiment"
                   placeholder=""
                   required
                   autocomplete="on"
                   autocorrect="off"
                   autocapitalize="off"
                   spellcheck="false">
            <div class="invalid-feedback">
                Experiment name can't be empty.
            </div>
        </div>
        <button type="submit" class="btn btn-primary" id="search">Search</button>
        <div id="experiments-loading" class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </form>

    <table id="dataTable" class="table table-striped table-bordered" style="width:100%">
        <thead>
        <tr>
            <th>Name</th>
            <th></th>
            <th></th>
        </tr>
        </thead>
        <tbody>

        </tbody>
    </table>
    <p>&nbsp;</p>
</div>

<!-- Include required libraries -->
<?php require $_SERVER['DOCUMENT_ROOT'] . '/foot.php'; ?>

<!-- The actual main logic for this page -->
<script src="list-logic.js"></script>
</body>
</html>
