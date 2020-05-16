<?php include "php/dadescon.php"; //IMPORT DE LA BASE DE DADES ?> 

<html lang="ca">
  <head>
    <meta charset="utf-8">
    <meta name="DC.language" content="ca">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="author" content="Jaume Sansó">
    <meta name="DCTERMS.title" content="Pàgina principal">
    <link rel="icon" href="img/indice.ico">


    <title>Estructures de dades</title>

    <link rel="canonical" href= "https://getbootstrap.com/docs/4.0/examples/carousel/">
    <!-- Bootstrap core CSS -->
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <!-- IMPORT CSS-->
    <link href="css/index.css" rel="stylesheet">

  </head>
  <body>
    <header>
      <a class="navbar-brand"></a>
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a class="navbar-brand" >Estructures de dades</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">Inici <span class="sr-only">(current)</span></a>
            </li>
        </div>
      </nav>
    </header>

    <main role="main">
      <div class="container marketing">
        <hr class="featurette-divider">
        <!-- ESTRUCTURES DINÀMICAMENT -->
        <?php
            //Agafam les estructures disponibles de la plana
            $cadena = "SELECT estructura.nom as nomes, url_estructura as url, estructura.descripcio as destructura, categoria.nom as nomcat, categoria.descripcio as dcategoria FROM estructura INNER JOIN categoria ON categoria.id  = estructura.categoria WHERE 1";
            $resultat=mysqli_query($con,$cadena);
            $var = 0;
            while ($row = mysqli_fetch_array($resultat)){
              if(($var % 2) == 0){
                echo "<div class=\"row featurette\">";
                echo  "<div class=\"col-md-7\" font-size = \"30\">";
                echo    "<h2 class=\"featurette-heading\"> $row[nomcat] <a href=\" $row[url] \" <span class=\"text-muted\"> - $row[nomes] </span></a></h2>";
                echo    "<p class=\"lead\"> $row[destructura] </p>";
                echo  "</div>";
                echo  "<div class=\"col-md-5\">";
                echo  " <img class=\"featurette-image img-fluid mx-auto\" src=\"img/200.png\" alt=\"No disposa de imatge\"> ";
                echo  "</div>";
                echo "</div>";
              }else{
                echo "<div class=\"row featurette\">";
                echo  "<div class=\"col-md-7 order-md-2\" font-size = \"30\">";
                echo    "<h2 class=\"featurette-heading\"> $row[nomcat] <a href=\" $row[url] \" <span class=\"text-muted\"> - $row[nomes] </span></a></h2>";
                echo    "<p class=\"lead\"> $row[destructura] </p>";
                echo  "</div>";
                echo  "<div class=\"col-md-5 order-md-1\">";
                echo  " <img class=\"featurette-image img-fluid mx-auto\" src=\"img/200.png\" alt=\"No disposa de imatge\"> ";
                echo  "</div>";
                echo "</div>";
             }?>
              <hr class="featurette-divider">
              <?php $var++;
            }
            mysqli_close($con);
            ?>
      </div><!-- /.container -->


      <!-- FOOTER -->
      <footer class="container">
        <!--<p class="float-right"><a href="#">Back to top</a></p>-->
        <a href="#" class="back-to-top"><i class="icofont-simple-up"></i></a>
        <p>®</p>
      </footer>
    </main>
  </body>
</html>
