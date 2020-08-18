<?php
if (isset($_POST['estructura'])){
  //Miram que la estructura no existeixi per quan l'usuari escriu el nom
  include "php/dadescon.php";
  $cadena = " SELECT nom FROM estructura WHERE UPPER(nom) = '$_POST[estructura]' ";
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
//Penja la imatge que ha seleccionat l'usuari
if (isset($_POST['img'])){
  include "php/dadescon.php";
    if (($_FILES["file"]["type"] == "image/pjpeg")
        || ($_FILES["file"]["type"] == "image/jpeg")
        || ($_FILES["file"]["type"] == "image/png")
        || ($_FILES["file"]["type"] == "image/gif")) {
        if (move_uploaded_file($_FILES["file"]["tmp_name"], "img/".$_FILES['file']['name'])) {
            echo "true";
        } else {
            echo "false";
        }
    } else {
        echo "false";
    }
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
    <meta name="DCTERMS.title" content="Nova estructura">
    <link rel="icon" href="img/indice.ico">

    <title>Nova estructura</title>

    <link rel="canonical" href="https://getbootstrap.com/docs/4.0/examples/checkout/">

    <!-- Bootstrap core CSS -->
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/nouUser.css" rel="stylesheet">
    <link href="css/customFile.css" rel="stylesheet">
  </head>

  <body class="bg-light">

    <div class="container">
      <div class="py-5 text-center">
        <h2>Nova estructura</h2>
        <p class="lead">Aquesta pàgina està pensada per indicar que hi ha una nova estructura disponible. Només pot accedir l'administrador.</p>
      </div>

        <div class="col-md-12 order-md-1">
          <h4 class="mb-3">Dades necessàries</h4>
          <form name="f"  onsubmit="inserirCat(event)" >
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="firstName">Nom de la estructura</label>
                <input name = "namestruct" type="text" onkeyup="comprovaEstructura()" class="form-control" id="namestruct" placeholder="" required>
                <div class="invalid-feedback">
                  La estructura ja existeix
                </div>
              </div>
            </div>

            <!-- Seleccionador de imatges -->
            <div id="div_file" class="btn btn-primary btn-lg">
                <p id="texto" >Inserir imatge</p>
                <input type="file" id="filechooser" onchange="uploadFile()" accept = "image/*">
            </div>
            <div  style="width: 15%; height: auto; ">
                <img id="img_user"/ style = "max-width:100%">
            </div>
            <script>
              function uploadFile() {
                //https://api.jquery.com/jquery.post/
                //https://es.stackoverflow.com/questions/164359/cargar-una-imagen-en-html-y-javascript
                img_usr = document.getElementById("filechooser").files[0]; //Agafam la imatge
                var reader = new FileReader();
                if (filechooser) {
                  reader.readAsDataURL(img_usr);
                  reader.onloadend = function () {
                      document.getElementById("img_user").src = reader.result; //Inserim imatge
                  }
                }
                var formData = new FormData();
                formData.append('file',img_usr);

                /*$.post( "estructura.php", { img: formData}).done(function( data ) {
                    console.log(data);
                });*/
                $.ajax({
                    url: 'estructura.php',
                    type: 'post',
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function(response) {
                       console.log(response);
                        if (response == "true") {
                          console.log("Ok");
                        } else if(response == "false") {
                          console.log("No");
                        }
                    }
                });
              }
            </script>

            <div class="row">
              <div class="col-md-5 mb-3">
                <label for="country">Categoria</label>
                <select name = "prioritat" class="custom-select d-block w-100" id="categoria" required>
                  <?php
                  $cadena = "SELECT * FROM categoria where 1";
                  $res = mysqli_query($con,$cadena);
                  while ($reg=mysqli_fetch_array($res)) {
                      echo "<option value='".$reg['id']."'>".$reg['nom']."</option>";
                  }
                  mysqli_close($con);
                  ?>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="descripcio">Despcripció</label>
              <textarea name= "textArea" class="form-control" id="textArea" style= "resize:none" rows="4" maxlength="255"></textarea>
            </div>

            <script>
              /*Comprova si el nom de la categoria */
              function comprovaEstructura(){
                estruc = document.f.namestruct.value.toUpperCase(); //Ho passam a mayuscula
                $.post( "estructura.php", { estructura : estruc }).done(function(data) {
                  if(estruc.length == 0){
                    $("#btn").attr("disabled","disabled"); //Desactivam el botó
                  }else{
                    if(data == "true"){
                      //Significa que existeix la categoria
                      $("#namestruct").addClass("is-invalid");
                      $("#btn").attr("disabled","disabled");
                    }else{
                      $("#namestruct").removeClass("is-invalid");
                      $("#btn").removeAttr("disabled");
                    }
                }
                });
              }

              function inserirCat(e){
                e.preventDefault();
                nomcat = document.f.namecat.value;
                desc = document.f.textArea.value;
                $.post( "categoria.php", { catt : nomcat, descp: desc}).done(function(data) {
                    $("#succes").removeClass("d-none");
                });
              }
            </script>

            <hr class="mb-4">
            <center>
            <button id = "btn" class="btn btn-primary btn-lg" type="submit" disabled>Crea categoria</button>
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
if (isset($_POST['catt'])){ // Basta mirar-ne un que no sigui null
  $categoria = $_POST['catt'];
  $txtarea = $_POST['descp'];

  include "php/dadescon.php";
  $cadena = " SELECT nom FROM categoria WHERE UPPER(nom) = '$categoria' ";
  $res = mysqli_query($con,$cadena);
  $reg = mysqli_fetch_array($res);
  if (empty($reg)) { //Tornam a comprovar que la categoria no existeix
    $cadena = "INSERT INTO categoria (nom, descripcio) VALUES ('$categoria', '$txtarea')";
    mysqli_query($con,$cadena);
    die();
  }
}
?>
