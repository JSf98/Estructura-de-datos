<?php session_start(); ?>
<html>
<head><link rel="stylesheet" type="text/css" href="div.css"></head>
<style>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
th, td {
  padding: 15px;
  font-family: Arial;
  text-align: left;
}

table#t01 {
  width: 100%;
  background-color: #f1f1f1;
}
</style>
<Table id="t01">
<tr>
    <th>Nom</th>
    <th>Descripcio</th>
    <th>Categoria </th>
</tr>
<body>
  <!--MENU-->
  <ul id="menu">
  <li><a href="menu.php">Inici</a></li>
  </ul>
<?php
      include "dadescon.php";
      if (empty($_SESSION['usuariactual'])){
        ?><meta http-equiv="refresh" content="0; url=login.html"><?php
      }

      $cadena = "SELECT estructura.nom as nomes, url_estructura as url, estructura.descripcio as destructura, categoria.nom as nomcat, categoria.descripcio as dcategoria FROM estructura INNER JOIN categoria ON categoria.id  = estructura.categoria WHERE 1";
      $resultat=mysqli_query($con,$cadena);
      while ($row = mysqli_fetch_array($resultat)){
          ?><TR>
          <TD><a class="opcio" href="<?php echo $row['url']?>"><p><?php echo $row['nomes']?></a></TD>
          <TD> <?php echo $row['destructura']?> </TD>
          <TD> <?php echo $row['nomcat']?></TD><?php
      }
?>
</TABLE>
</body>
</html>
