<?php session_start();
if (empty($_SESSION['usuariactual'])){
  header("Location: login.html");
  die();
}
?>

<html>
<head><link rel="stylesheet" type="text/css" href="div.css"></head>
<body>

<?php
    include "dadescon.php";

    $user = $_SESSION['usuariactual'];

    $cadena = "SELECT titol, url FROM opcio INNER JOIN privilegi ON privilegi.opcio = opcio.id AND privilegi.perfil = $_SESSION[tipus]";
    $resultat=mysqli_query($con,$cadena);

    ?><font face="Arial" size="5" color="blue">Benvingut <?php echo " ".$user?> </font> <p> <?php
    while ($row = mysqli_fetch_array($resultat)){
        ?><a class = "opcio" href="<?php echo $row['url']?>"><p><?php echo $row['titol']?></a><?php
    }
  ?>
</body>
</html>
