<?php session_start();?>
<html>
<head></head>
<body>

<?php
    include "dadescon.php";

    if(empty($_GET['usr'])){
      ?><meta http-equiv="refresh" content="0; url=login.html"><?php
    }else if(empty($_GET['passw'])){
      ?><meta http-equiv="refresh" content="0; url=login.html"><?php
    }else{
      $user = $_GET['usr'];
      $pass = $_GET['passw'];
      $_SESSION['usuariactual']=$user;

      $cadena = "SELECT usuari.user as user, usuari.password as password, usuari.tipus as tipus, opcio.url as url, opcio.titol as titol FROM usuari INNER JOIN (tipusperfil INNER JOIN (privilegi INNER JOIN opcio ON privilegi.opcio = opcio.id) ON tipusperfil.id = privilegi.perfil) ON usuari.tipus = tipusperfil.id WHERE user='".$user."' AND password = '".$pass."'";
      $resultat=mysqli_query($con,$cadena);

      //Comprovam que l'usuari existeix
      $row=mysqli_fetch_array($resultat);
      if (empty($row)){
          echo("Usuari o contraseña incorrecta");
          ?><meta http-equiv="refresh" content="5; url=login.html"><?php
      }else{
          ?><h2>Benvingut<?php echo " ".$row['user']?></h2><?php
          $_SESSION['admin']=$row['tipus'];
          //Imprimim la primera trama llegida
          ?><a href="<?php echo $row['url']?>"><?php echo $row['titol']?></a><?php
          //Bucle de les opcions restants
          while ($row = mysqli_fetch_array($resultat)){
              ?><a href="<?php echo $row['url']?>"><p><?php echo $row['titol']?></a><?php
          }
      }
  }?>
</body>
</html>
