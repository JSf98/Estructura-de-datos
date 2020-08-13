<?php session_start();
  if(empty($_POST['usr']) || empty($_POST['passw'])){
    header("Location: ../login.html");
    die(); //Impedeix executar el codi que segueix
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
        ?><meta http-equiv="refresh" content="2; url=../login.html"><?php
    }else if (!password_verify($pass, $row['password'])){
        echo("Contrasenya incorrecta");
        ?><meta http-equiv="refresh" content="2; url=../login.html"><?php
    }else{
        $_SESSION['usuariactual'] = $user;
        $_SESSION['tipus']= $row['tipus'];
        ?><meta http-equiv="refresh" content="0; url=../index.php"><?php
    }
?>
</body>
</html>
