<?php include "dadescon.php";
  if(empty($_POST['usr']) || empty($_POST['passw'])){
    header("Location: ../login.html");
    die(); //Impedeix executar el codi que segueix
  }
?>

<html>
<body>

<?php
    $user = $_POST['usr'];
    $pass = $_POST['passw'];

    $stmt = $db->prepare("SELECT user,password, tipus FROM usuari WHERE user= ?");
    $stmt->execute(array($user));
    $row = $stmt->fetch(PDO::FETCH_ASSOC); //Retorna un array indexat per la columna
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
