<?php
//Penja la imatge que ha seleccionat l'usuari
if (isset($_POST['img'])){
  include "php/dadescon.php";
  if (($_FILES["file"]["type"] == "image/pjpeg")
      || ($_FILES["file"]["type"] == "image/jpeg")
      || ($_FILES["file"]["type"] == "image/png")
      || ($_FILES["file"]["type"] == "image/gif")) {
      if (move_uploaded_file($_FILES["file"]["tmp_name"], "../img/".$_FILES['file']['name'])) {
          echo 1;
      } else {
          echo 0;
      }
  } else {
      echo 0;
  }
  die();
}
?>
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
