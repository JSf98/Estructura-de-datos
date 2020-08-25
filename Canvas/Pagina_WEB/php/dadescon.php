<?php
    session_start();
    try {
      $usuario = "root";
      $contraseña = "";
      //Conexió a la BD
      $db = new PDO('mysql:host=localhost;dbname=estructures', $usuario, $contraseña);
    } catch (PDOException $e) {
      print "¡Error!: " . $e->getMessage() . "<br/>";
      die();
    }
?>
