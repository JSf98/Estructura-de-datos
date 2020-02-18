<?php session_start();
  if(empty($_POST['usr']) || empty($_POST['passw'])){
    header("Location: login.html");
    die();
  }
?>

<html>
<body>

<?php
    include "dadescon.php";

    $user = $_POST['usr'];
    $pass = $_POST['passw'];

    $cadena = "SELECT user,password, tipus FROM usuari WHERE user='$user'";
    $resultat=mysqli_query($con,$cadena);
    //Comprovam que l'usuari existeix
    $row=mysqli_fetch_array($resultat);

    if (empty($row)){
        echo("Usuari incorrecta");
        ?><meta http-equiv="refresh" content="2; url=login.html"><?php
    }else if ($row['password'] !== $pass){
        echo("Contraseña incorrecta");
        ?><meta http-equiv="refresh" content="2; url=login.html"><?php
    }else{
        $_SESSION['usuariactual'] = $user;
        $_SESSION['tipus']= $row['tipus'];
        ?><meta http-equiv="refresh" content="0; url=menu.php"><?php
    }
?>
</body>
</html>
