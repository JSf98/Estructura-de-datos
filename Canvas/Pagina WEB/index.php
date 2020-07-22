<?php include "php/dadescon.php"; //IMPORT DE LA BASE DE DADES ?>
<?php session_start();?>
<?php
//Comprovació del deslogin
if(isset($_GET["out"])){
  // Destruim les variables de la sessió
  $_SESSION = array();
  //Borram cookies de la sessió
  if (ini_get("session.use_cookies")) {
      $params = session_get_cookie_params();
      setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
      );
    }
    //Destruim la sessió
    session_destroy();
}
?>

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
    <!-- BARRA MENÚ -->
    <header>
      <a class="navbar-brand"></a>
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a class="navbar-brand" >Estructures de dades</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mr-auto">
            <?php
              if(isset($_SESSION['usuariactual'])){ //Si ha iniciat sessió l'administrador
                $cadena = " SELECT opcio.id, opcio.url, opcio.titol from privilegi inner join opcio on privilegi.opcio = opcio.id and privilegi.perfil = $_SESSION[tipus] ";
                $resultat = mysqli_query($con,$cadena);
                //Mostram les seves opcions
                while($row = mysqli_fetch_array($resultat)){
                    echo "<li class=\"nav-item active\"> <a class=\"nav-link\" href=$row[url]> $row[titol] <span class=\"sr-only\"></span></a> </li>";
                }?>
                <li class = "nav-item active">
                  <a class="nav-link" href="index.php?out=true">Desconexió<span class="sr-only"></span></a>
                </li><?php
              }else{ //Donam la opció de fer login
                ?><li class="nav-item active">
                  <a class="nav-link" href="login.html">Login <span class="sr-only"></span></a>
                </li><?php
              }
            ?>
            <li class="nav-item active">
              <a class="nav-link" href="index.php">Inici <span class="sr-only">(current)</span></a>
            </li>
            <?php
                $cadena = "SELECT nom, id from categoria";
                $resultat = mysqli_query($con,$cadena);
                while($row = mysqli_fetch_array($resultat)){ // Printeam totes les categories disponibles
                  echo "<li class=\"nav-item active\"> <a class=\"nav-link\" href=\"index.php?id=$row[id]\"> $row[nom] <span class=\"sr-only\"></span></a> </li>";
                }
            ?>
        </div>
      </nav>
    </header>

    <main role="main">
      <div class="container marketing">
        <hr class="featurette-divider">
        <!-- ESTRUCTURES DINÀMICAMENT -->
        <?php
            //Agafam les estructures disponibles de la plana
            $cadena = "SELECT estructura.url_img as url_img, estructura.nom as nomes, url_estructura as url, estructura.descripcio as destructura, categoria.nom as nomcat, categoria.descripcio as dcategoria FROM estructura INNER JOIN categoria ON categoria.id  = estructura.categoria";
            if (isset($_GET["id"])) {
              $cadena .= " AND estructura.categoria = $_GET[id] ";
            }
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
                if($row['url_img'] == null){
                  echo  " <img class=\"featurette-image img-fluid mx-auto\" src=\"img/noimg.png\" alt=\"No disposa de imatge\"> ";
                }else{
                  echo  " <img class=\"featurette-image img-fluid mx-auto\" src=\" $row[url_img] \" alt=\"No disposa de imatge\"> ";
                }
                echo  "</div>";
                echo "</div>";
              }else{
                echo "<div class=\"row featurette\">";
                echo  "<div class=\"col-md-7 order-md-2\" font-size = \"30\">";
                echo    "<h2 class=\"featurette-heading\"> $row[nomcat] <a href=\" $row[url] \" <span class=\"text-muted\"> - $row[nomes] </span></a></h2>";
                echo    "<p class=\"lead\"> $row[destructura] </p>";
                echo  "</div>";
                echo  "<div class=\"col-md-5 order-md-1\">";
                if($row['url_img'] == null){
                  echo  " <img class=\"featurette-image img-fluid mx-auto\" src=\"img/noimg.png\" alt=\"No disposa de imatge\"> ";
                }else{
                  echo  " <img class=\"featurette-image img-fluid mx-auto\" src=\" $row[url_img] \" alt=\"No disposa de imatge\"> ";
                }
                //echo  " <img class=\"featurette-image img-fluid mx-auto\" src=\"img/200.png\" alt=\"No disposa de imatge\"> ";
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
