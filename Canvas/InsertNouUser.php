<html>
<head>
  <meta charset="utf-8">
  <title>Inserir nou admin</title>
</head>
<body>
  <form name="captura" method="post" action="InsertNouUser.php" face="Arial">
    Usuari: <input name = "usr" required><br>
    Contraseña: <input type = "password" name = "pass" required><br>
    Privilegi:
    <select name="opcions" required>
        <?php
        include "dadescon.php";
        $cadena = "SELECT * FROM tipusperfil";
        $res = mysqli_query($con,$cadena);
        while ($reg=mysqli_fetch_array($res)) {
            echo "<OPTION VALUE='".$reg['id']."'>".$reg['tipus']."</OPTION>";
        }
        ?>
      </select><br>
    <input value="Login" type="submit">
  </form>
</body>
</html>

<?php
if (isset($_POST['usr'])){ // Basta mirar-ne un
  $usr = $_POST['usr'];
  $pass = $_POST['pass'];
  $tipus = $_POST['opcions'];

  include "dadescon.php";

  $pass = password_hash($pass , PASSWORD_DEFAULT);
  $cadena = "INSERT INTO usuari (user, password, tipus) VALUES ('$usr', '$pass', $tipus)";
  mysqli_query($con,$cadena);
}
?>
