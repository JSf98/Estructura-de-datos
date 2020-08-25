<?php
include "php/dadescon.php";
if (isset($_POST['estructura'])){
  //Miram que la estructura no existeixi per quan l'usuari escriu el nom
  $cadena = " SELECT nom FROM estructura WHERE UPPER(nom) = ? ";
  $stmt = $db->prepare($cadena);
  $stmt->execute(array($_POST['estructura']));
  $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
  if (empty($results)) {
      echo "false";
      die();
  }
  echo "true";
  die();
}
?>
<?php
//Penja la imatge que ha seleccionat l'usuari
  if (isset($_FILES['img'])){
    $reply = array();
    if (($_FILES["img"]["type"] == "image/pjpeg")
          || ($_FILES["img"]["type"] == "image/jpeg")
          || ($_FILES["img"]["type"] == "image/png")
          || ($_FILES["img"]["type"] == "image/gif")) {
    			//Penjam la imatge
    			$target = "img/".basename(time().$_FILES["img"]["name"]);
    			if (move_uploaded_file($_FILES["img"]["tmp_name"], $target)) {
              $reply = array(
                "status" => 1,
                "path" => $target
              );
    			} else {
            $reply = array(
              "status" => 0,
              "path" => ""
            );
    			}
      } else {
        $reply = array(
          "status" => 0,
          "path" => ""
        );
      }
      echo json_encode($reply);
      die();
  }
?>

<?php
//Imprimim rutes
  if(isset( $_GET['ruta'])){
    $directori = $_GET['ruta'];
    $arxius  = scandir($directori); //Retorna els arxius en forma de array
    $reply = array(
    );
    for ($i=0; $i < sizeof($arxius); $i++) {
      if($arxius[$i] == "."){
        continue;
      }

      if(is_dir($directori.$arxius[$i])){ //miram si es una carpeta
        $tmp =   $directori.$arxius[$i]."/";
       if($arxius[$i] == ".."){
            for ($j = (strlen($directori)-2) ; $j >= 0; $j--) {
              if ($directori[$j] == '/') {
                $tmp = substr($directori,0,$j+1);
                break;
              }
            }
        }
            array_push($reply,
            array(
              "type" => 1,
              "path" => $tmp
            ));
      }else{
          array_push($reply,
          array(
            "type" => 0,
            "path" => $directori.$arxius[$i]
          ));
        }
    }
    echo json_encode($reply);
    die();
  }
?>

<?php
include "../include/barra_menu.php"; //Barra de menú
$prefixe = "";
?>
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
    <script>
    //Variables globals
      var path_img = "";
      var path_index = "";
    </script>
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
          <form name="f"  onsubmit="inserirEstructura(event)" >
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="firstName">Nom de la estructura</label>
                <input name = "namestruct" type="text" onkeyup="comprovaEstructura()" class="form-control" id="namestructura" placeholder="" required>
                <div class="invalid-feedback">
                  La estructura ja existeix
                </div>
              </div>
            </div>

            <!-- Seleccionador de imatges -->
            <div id="div_file" class="btn btn-primary btn-lg">
                <p id="texto" >Inserir imatge</p>
                <input type="file" id="filechooser" class="filechooser" onchange="uploadFile()" accept = "image/*">
            </div>
            <div  style="width: 15%; height: auto; ">
                <img id="img_user"/ style = "max-width:100%">
            </div>

            <button type="button" class="btn btn-primary btn-lg"  onclick = "exploreFolder('../')" data-toggle="modal" data-target="#modalIndex">
                Tria arxiu
            </button>
            <div id="path_de_estructura"></div>

            <!-- Modal -->
            <div class="modal fade" id="modalIndex" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Seleccioni l'índex de la estructura</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body" id = "modal-body">
                    <script>
                      function exploreFolder(ruta){
                        var path = "estructura.php?ruta=" + ruta;
                        //console.log(path);
                        $.get( path, function(data) {
                            data = JSON.parse(data);
                            var string = "";
                            for(var i = 0; i < data.length; i++){
                              if(data[i].type == 1){ //Es un directori
                                var aux = "<a href=\"#\" onclick=\"exploreFolder('"+ data[i].path+"');\"><div> "+ data[i].path + "</div></a>";
                                string += aux;
                                string += "\n<hr class=\"mb-4\">\n";
                              }else{
                                var aux = "<a style = \" color:grey\" href=\"#\" onclick=\"savePath('"+ data[i].path+"');\"><div> "+ data[i].path + "</div></a>";
                                string += aux;
                                string += "\n<hr class=\"mb-4\">\n";
                              }
                            }
                            $("#modal-body").html(string);
                        });
                      }

                      //Guarda la ruta de l'índex
                      function savePath(ruta){
                        //console.log(ruta);
                        path_index = ruta;
                        $('#modalIndex').modal('hide');
                        $('#path_de_estructura').append(ruta);
                      }

                    </script>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>

            <script>
              function uploadFile() {
                var img_usr = document.getElementById("filechooser").files[0]; //Agafam la imatge
                var reader = new FileReader();
                if (filechooser) {
                  reader.readAsDataURL(img_usr);
                  //Mostra la imatge per pantalla
                  reader.onloadend = function () {
                      document.getElementById("img_user").src = reader.result; //Inserim imatge
                  }
                }
                var formData = new FormData();
                formData.append('img',img_usr);

                $.ajax({
                    url: 'estructura.php',
                    type: 'post',
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function(response) {
                        response = JSON.parse(response);
                        if(response.status == 1){
                              //Guardam path de la imatge
                              path_img = response.path;
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
                  $stmt = $db->query($cadena);
                  $results = $stmt->fetchAll(PDO::FETCH_ASSOC); //Ho passam a array
                  foreach ($results as $reg) {
                      echo "<option value='".$reg['id']."'>".$reg['nom']."</option>";
                  }
                  ?>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="descripcio">Despcripció</label>
              <textarea name= "textArea" class="form-control" id="textArea" style= "resize:none" rows="4" maxlength="255"></textarea>
            </div>

            <script>
              /*Comprova si el nom de la estructura existeix*/
              function comprovaEstructura(){
                estruc = document.f.namestructura.value.toUpperCase(); //Ho passam a mayuscula
                $.post( "estructura.php", { estructura : estruc }).done(function(data) {
                  if(estruc.length == 0){
                    $("#btn").attr("disabled","disabled"); //Desactivam el botó
                  }else{
                    //console.log(data);
                    if(data == "true"){
                      //Significa que existeix la categoria
                      $("#namestructura").addClass("is-invalid");
                      $("#btn").attr("disabled","disabled");
                    }else{
                      $("#namestructura").removeClass("is-invalid");
                      $("#btn").removeAttr("disabled");
                    }
                }
                });
              }

              function inserirEstructura(e){
                e.preventDefault();
                nomestructura = document.f.namestructura.value;
                desc = document.f.textArea.value;
                cat = document.f.categoria.value;
                //Passar path_img
                $.post( "estructura.php", {nom_estructura : nomestructura, descp : desc,  path_img, path_index, categoria:cat}).done(function(data) {
                    $("#succes").removeClass("d-none");
                    document.f.namestructura.value = "";
                    document.f.textArea.value = "";
                });
              }
            </script>

            <hr class="mb-4">
            <center>
            <button id = "btn" class="btn btn-primary btn-lg" type="submit" disabled>Insereix estructura</button>
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
if (isset($_POST['nom_estructura'])){ // Basta mirar-ne un que no sigui null

  $nom = $_POST['nom_estructura'];
  $txtarea = $_POST['descp'];
  $img = $_POST['path_img'];
  $index = $_POST['path_index'];
  $categoria = $_POST['categoria'];

  //include "php/dadescon.php";
  $cadena = " SELECT nom FROM estructura WHERE UPPER(nom) = ? ";
  $stmt = $db->prepare($cadena);
  $stmt->execute(array($nom));
  $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
  if (empty($results)) { //Tornam a comprovar que la estructura no existeix
    $cadena = "INSERT INTO estructura (nom, url_img, url_estructura, categoria, descripcio) VALUES (?,?,?,?,?)";
    $stmt = $db->prepare($cadena);
    $stmt->execute(array($nom,$img,$index,$categoria,$txtarea));
    die();
  }
}
?>
