<?php include "../Pagina_WEB/php/dadescon.php"; //IMPORT DE LA BASE DE DADES ?>

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

  <!-- INCLUDES boostrap-->
  <link rel="canonical" href= "https://getbootstrap.com/docs/4.0/examples/carousel/">
  <!-- Bootstrap core CSS -->
  <link href="../Pagina_WEB/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <!-- IMPORT CSS-->
  <link href="../Pagina_WEB/css/index.css" rel="stylesheet">

</head>
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
            //Mostram les opcions del usuari
            while($row = mysqli_fetch_array($resultat)){
                echo "<li class=\"nav-item active\"> <a class=\"nav-link\" href=$row[url]> $row[titol] <span class=\"sr-only\"></span></a> </li>";
            }?>
            <li class = "nav-item active">
              <a class="nav-link" href="index.php?out=true">Desconexió<span class="sr-only"></span></a>
            </li><?php
          }else{ //Donam la opció de fer login
            ?><li class="nav-item active">
              <a class="nav-link" href="../Pagina_WEB/login.html">Login <span class="sr-only"></span></a>
            </li><?php
          }
        ?>
        <li class="nav-item active">
          <a class="nav-link" href="../Pagina_WEB/index.php">Inici <span class="sr-only">(current)</span></a>
        </li>
        <?php
            $cadena = "SELECT nom, id from categoria";
            $resultat = mysqli_query($con,$cadena);
            while($row = mysqli_fetch_array($resultat)){ // Printeam totes les categories disponibles
              echo "<li class=\"nav-item active\"> <a class=\"nav-link\" href=\"$prefixe"."index.php?id=$row[id]\"> $row[nom] <span class=\"sr-only\"></span></a> </li>";
            }
        ?>
    </div>
  </nav>
</header>
</html>
