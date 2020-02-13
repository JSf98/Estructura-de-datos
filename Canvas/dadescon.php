<?php
    $con=mysqli_connect("localhost","root","")
    or die ("Problemes a localhost");
    $db=mysqli_select_db($con,"estructures") //Nom de la base de dades
    or die("Problemes a selecció de bd");
?>
