<?php include "php/dadescon.php";
$prefixe = "";
include "../include/barra_menu.php"?>
<?php //Comprovam que hi ha una sessió enmarxa
  if(!isset($_SESSION['usuariactual'])){
    ?><meta http-equiv="refresh" content="0; url=login.html"><?php
  }else{
      $url = basename($_SERVER['PHP_SELF']); // A on estem actualment
      $cadena = " SELECT * FROM privilegi join opcio on opcio.id = privilegi.opcio and privilegi.perfil = ? where opcio.url = '$url' ";
      $stmt = $db->prepare($cadena);
      $stmt->execute(array($_SESSION['tipus']));
      $row = $stmt->fetch(PDO::FETCH_ASSOC);
      if(empty($row)){
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

    <title>Crea nou usuari</title>

    <link rel="canonical" href="https://getbootstrap.com/docs/4.0/examples/checkout/">

    <!-- Bootstrap core CSS -->
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/nouUser.css" rel="stylesheet">
  </head>

  <body class="bg-light">

    <div class="container">
      <div class="py-5 text-center">
        <h2>Crea nou usuari</h2>
        <p class="lead">Aquesta pàgina està pensada per a crear un nou usuari. Només pot accedir l'administrador.
        Aquest pot triar entre els diferents nivells que pot tenir un usuari</p>
      </div>

        <div class="col-md-12 order-md-1">
          <h4 class="mb-3">Dades necessàries</h4>
          <form name="f" onsubmit="succes(event)">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="firstName">Usuari</label>
                <input name = "usr" type="text" class="form-control" id="user" placeholder="" required>
                <div class="invalid-feedback">
                  El nom d'usuari és un camp obligatori
                </div>
              </div>
            </div>

            <div class="mb-3">
              <label for="address">Contrasenya</label>
              <input name = "pass" type="password" class="form-control" id="password" placeholder="" required>
              <div class="invalid-feedback">
                La contrasenya no coincideix. Per favor torna-ho a intentar.
              </div>
            </div>

            <div class="mb-3">
              <label for="address2">Contrasenya <span class="text-muted">(Un altra cop)</span></label>
              <input name = "pass2" type="password" class="form-control" id="password2" placeholder="">
            </div>

            <script>

              function comprovarClaus(){
                pass1 = document.f.pass.value;
                pass2 = document.f.pass2.value;

                if (pass1 != pass2){
                  document.f.pass.value = "";
                  document.f.pass2.value = "";
                  $("#password").addClass("is-invalid");
                  //alert("La contrasenya no coincideix. Per favor torna-ho a intentar");
                }
              }

              function succes(e){
                e.preventDefault();
                usuari = document.f.usr.value;
                password = document.f.pass.value;
                type = document.f.prioritat.value;
                $.post( "nouUser.php", { usr : usuari, pass: password, tipus: type}).done(function(data) {
                    $("#succes").removeClass("d-none");
                    document.f.usr.value= "";
                    document.f.pass.value = "";
                    document.f.pass2.value = "";
                });
              }
            </script>

            <hr class="mb-4">
            <div class="row">
              <div class="col-md-5 mb-3">
                <label for="country">Prioritat</label>
                <select name = "prioritat" class="custom-select d-block w-100" id="prioritat" required>
                  <?php
                  $cadena = "SELECT * FROM tipusperfil where 1";
                  $stmt = $db->query($cadena);
                  $results = $stmt->fetchAll(PDO::FETCH_ASSOC); //Ho passam a array
                  foreach ($results as $reg) {
                      echo "<option value='".$reg['id']."'>".$reg['tipus']."</option>";
                  }
                  ?>
                </select>
              </div>
            </div>

            <hr class="mb-4">
            <center>
            <button class="btn btn-primary btn-lg " onclick="comprovarClaus()" type="submit">Crea usuari</button>
          </center>
          <br><br>
          <div class="alert alert-success d-none" id ="succes" >
              <strong>Perfecte!</strong> S'ha inserit correctament.
          </div>
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
if (isset($_POST['usr'])){ // Basta mirar-ne un que no sigui null
  $usr = $_POST['usr'];
  $pass = $_POST['pass'];
  //$pass2 = $_POST['pass2'];
  $tipus = $_POST['tipus'];
  //include "php/dadescon.php";

  $pass = password_hash($pass , PASSWORD_DEFAULT);
  $cadena = "INSERT INTO usuari (user, password, tipus) VALUES (?,?,?)";
  $stmt = $db->prepare($cadena);
  $stmt->execute(array($usr, $pass, $tipus));
  die();
}
?>
