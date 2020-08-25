<?php
include "php/dadescon.php"; 
$prefixe = "";
include "../include/barra_menu.php"
?> <!-- INCLUDE BARRA MENÚ-->

<html lang="ca">
    <main role="main">
      <div class="container marketing">
        <hr class="featurette-divider">
        <!-- ESTRUCTURES DINÀMICAMENT -->
        <?php
            //Mostram totes les estructures que disposa la BD
            $cadena = "SELECT estructura.url_img as url_img, estructura.nom as nomes, url_estructura as url, estructura.descripcio as destructura, categoria.nom as nomcat, categoria.descripcio as dcategoria FROM estructura INNER JOIN categoria ON categoria.id  = estructura.categoria";
            if (isset($_GET["id"])) {
              //Per mostrar les coses d'una única categoria
              $cadena .= " AND estructura.categoria = ? ";
              $stmt = $db->prepare($cadena);
              $stmt->execute(array($_GET["id"]));
            }else{
              $stmt = $db->query($cadena);
            }
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC); //Ho passam a array
            $var = 0;
            foreach ($results as $row) {
              if(($var % 2) == 0){
                echo "<div class=\"row featurette\">";
                echo  "<div class=\"col-md-7\" font-size = \"30\">";
                echo    "<h2 class=\"featurette-heading\"> $row[nomcat] <a href=\" $row[url] \" <span class=\"text-muted\"> - $row[nomes] </span></a></h2>";
                echo    "<p class=\"lead\"> $row[destructura] </p>";
                echo  "</div>";
                echo  "<div class=\"col-md-5\">";
                if($row['url_img'] == null){
                  echo  " <img class=\"featurette-image img-fluid mx-auto\" src=\"img/noimg.png\" alt=\"No disposa de imatge\"> ";
                }else{
                  echo  " <img class=\"featurette-image img-fluid mx-auto\" src=\" $row[url_img] \" alt=\"No disposa de imatge\"> ";
                }
                echo  "</div>";
                echo "</div>";
              }else{
                echo "<div class=\"row featurette\">";
                echo  "<div class=\"col-md-7 order-md-2\" font-size = \"30\">";
                echo    "<h2 class=\"featurette-heading\"> $row[nomcat] <a href=\" $row[url] \" <span class=\"text-muted\"> - $row[nomes] </span></a></h2>";
                echo    "<p class=\"lead\"> $row[destructura] </p>";
                echo  "</div>";
                echo  "<div class=\"col-md-5 order-md-1\">";
                if($row['url_img'] == null){
                  echo  " <img class=\"featurette-image img-fluid mx-auto\" src=\"img/noimg.png\" alt=\"No disposa de imatge\"> ";
                }else{
                  echo  " <img class=\"featurette-image img-fluid mx-auto\" src=\" $row[url_img] \" alt=\"No disposa de imatge\"> ";
                }
                //echo  " <img class=\"featurette-image img-fluid mx-auto\" src=\"img/200.png\" alt=\"No disposa de imatge\"> ";
                echo  "</div>";
                echo "</div>";
             }?>
              <hr class="featurette-divider">
              <?php $var++;
            }
            $db = null; //Tancam conexió
            ?>
      </div><!-- /.container -->


      <!-- FOOTER -->
      <footer class="container">
        <!--<p class="float-right"><a href="#">Back to top</a></p>-->
        <a href="#" class="back-to-top"><i class="icofont-simple-up"></i></a>
        <p>®</p>
      </footer>
    </main>
  </body>
</html>
