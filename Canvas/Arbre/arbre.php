<?php
include "../Pagina_WEB/php/dadescon.php"; 
$prefixe = "../Pagina_WEB/";
include "../include/barra_menu.php"
?> <!-- INCLUDE BARRA MENÚ-->

<html>
  <head>
   <link href="arbrebinari.css" rel="stylesheet">
    <title> Arbre binari </title>
    <meta charset="utf-8">
  </head>

<body>
  <header>
    <h2>ARBRE BINARI</h2>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <select id="selector"></select>
    <button class="button" onclick="arbre.inserirNouNode()">Inserir nou Node</button>
    <button class="button" onclick="arbre.eliminarNode()">Eliminar Node</button>
    <button class="button" onclick="arbre.reiniciaArbre()">Reinicia arbre</button>
  </header>

  <article>
    <canvas id="canvas" class="estil" width="800" height="800"> El teu navegador no soporta el HTML5 canvas. </canvas>
  </article>

  <!-- IMPORTS -->
  <script src = "PintaArbre.js"> </script>
  <script src = "Arbregen.js"> </script>
  <script src = "Node.js"> </script>
  <script src = "Coordenada.js"> </script>

  <script>
    var arbre = new PintaArbre("canvas","selector");
  </script>

</body>
</html>
