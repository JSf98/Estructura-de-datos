<?php
if (isset($_POST['cat'])){ //Miram que la categoria no existeixi

  include "php/dadescon.php";
  $cadena = " SELECT nom FROM categoria WHERE UPPER(nom) = '$_POST[cat]' ";
  $res = mysqli_query($con,$cadena);
  $reg = mysqli_fetch_array($res);
  if (empty($reg)) {
      echo "false";
      mysqli_close($con);
      die();
  }
  echo "true";
  mysqli_close($con);
  die();
}
?>

<?php
$prefixe = "";
include "../include/barra_menu.php"?>
<?php
  if(!isset($_SESSION['usuariactual'])){
    ?><meta http-equiv="refresh" content="0; url=login.html"><?php
  }else{
      $url = basename($_SERVER['PHP_SELF']); // A on estem actualment
      $cadena = " SELECT * FROM privilegi join opcio on opcio.id = privilegi.opcio and privilegi.perfil = $_SESSION[tipus] where opcio.url = '$url' ";
      $resultat = mysqli_query($con,$cadena);

      if(empty(mysqli_fetch_array($resultat))){
          //Significa que l'usuari que ha entrat no te permisos necessaris
          header("Location: login.html");
          die(); //Impedeix executar el codi que segueix
      }
    }
?>
<html lang="ca">
  <head>
    <meta charset="utf-8">
    <meta name="DC.language" content="ca">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="author" content="Jaume Sansó">
    <meta name="DCTERMS.title" content="Crea un nou usuari">
    <link rel="icon" href="img/indice.ico">

    <title>Crear nova categoria</title>

    <link rel="canonical" href="https://getbootstrap.com/docs/4.0/examples/checkout/">

    <!-- Bootstrap core CSS -->
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/nouUser.css" rel="stylesheet">
  </head>

  <body class="bg-light">

    <div class="container">
      <div class="py-5 text-center">
        <h2>Crear nova categoria</h2>
        <p class="lead">Aquesta pàgina està pensada per a crear una nova categoria. Només pot accedir l'administrador.</p>
      </div>

        <div class="col-md-12 order-md-1">
          <h4 class="mb-3">Dades necessàries</h4>
          <form name="f" method="post" onsubmit="inserirCat()" action="categoria.php">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="firstName">Nom de la categoria</label>
                <input name = "namecat" type="text" onkeyup="comprovaCategoria()" class="form-control" id="namecat" placeholder="" required>
                <div class="invalid-feedback">
                  La categoria ja existeix
                </div>
              </div>
            </div

            <div class="form-group">
              <label for="descripcio">Despcripció</label>
              <textarea name= "textArea" class="form-control" id="textArea" rows="3" maxlength="255"></textarea>
            </div>

            <script>
              /*Comprova si el nom de la categoria */
              function comprovaCategoria(){
                nomcat = document.f.namecat.value.toUpperCase(); //Ho passam a mayuscula
                $.post( "categoria.php", { cat : nomcat }).done(function(data) {
                    if(data == "true"){
                      //Significa que existeix la categoria
                      $("#namecat").addClass("is-invalid");
                      $("#btn").addClass("disabled");
                    }else{
                      $("#namecat").removeClass("is-invalid");
                      $("#btn").addClass("enabled");
                    }
                });
              }

              function inserirCat(){
                nomcat = document.f.namecat.value;
                desc = document.f.textArea.value;
                $.post( "categoria.php", { catt : nomcat, descp: desc}).done(function(data) {

                });
              }
            </script>

            <hr class="mb-4">
            <button id = "btn" class="btn btn-primary btn-lg btn-block" type="submit">Crea categoria</button>
          </form>
        </div>
      </div>

      <footer class="my-5 pt-5 text-muted text-center text-small">
        <p class="mb-1">®</p>
        <ul class="list-inline">
          <!--<li class="list-inline-item"><a href="#">Privacy</a></li>-->
        </ul>
      </footer>
    </div>
  </body>
</html>

<?php
if (isset($_POST['catt'])){ // Basta mirar-ne un que no sigui null
  $categoria = $_POST['catt'];
  $txtarea = $_POST['descp'];

  include "php/dadescon.php";
  $cadena = " SELECT nom FROM categoria WHERE UPPER(nom) = '$_POST[catt]' ";
  $res = mysqli_query($con,$cadena);
  $reg = mysqli_fetch_array($res);
  if (empty($reg)) {
    $cadena = "INSERT INTO categoria (nom, descripcio) VALUES ('$categoria', '$txtarea')";
    mysqli_query($con,$cadena);
    die();
  }
}
?>
