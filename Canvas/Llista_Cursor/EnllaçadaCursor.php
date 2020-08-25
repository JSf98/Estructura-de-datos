<?php
include "../Pagina_WEB/php/dadescon.php"; 
  $prefixe = "../Pagina_WEB/";
  include "../include/barra_menu.php"
?> <!-- INCLUDE BARRA MENÚ-->
<html>
<head>
  <link href="Cursor.css" rel="stylesheet">
  <title> Enllaçada amb cursor </title>
  <meta charset="utf-8">
</head>
<body>
  <div class="caja">
    <header>
      <h2 id="font">LLISTA AMB CURSORS</h2>
      <nav>
        <ul>
        <p> </p>
          Seleccioni una llista: <select id="selector" onchange="llistaCursor.actualitzarSelectorNodes()"></select>
          Seleccioni un Node: <select id="selector2"></select>
          <button class="button" onclick="novaLlista()">Inserir Llista</button>
          <button class="button" onclick="eliminarLlista()">Eliminar Llista</button>
          <button class="button" onclick="inserirElem()">Inserir element</button>
          <button class="button" onclick="llistaCursor.eliminarElemDinsLlista()">Eliminar element</button>
          <button class="button" onclick="llistaCursor.buida()">Reinicia</button>
        </ul>
      </nav>
    </header>
    <article >
    <div>
      <canvas id="canvas" width="800" height="500">
        El teu navegador no soporta el HTML5 canvas.</canvas>
    </div>
  </article>
  </div>

  <!--IMPORTS-->
  <script src = "LlistaCursor.js"> </script>
  <script src = "Node.js"> </script>
  <script src = "Punter.js"> </script>

  <script>
      var maxCaselles = 30;
      let llistaCursor = new LlistaCursor("canvas",this.maxCaselles);

      function novaLlista() {
        let elem = prompt("Insereix el nom de la nova llista: ");
        if(elem == null) return;
        //Si la paraula es massa llarga, la tallam
        if (elem.length > 4) {
          elem = elem.substring(0,4);
        }
        llistaCursor.inserirNovaLlista(elem);
  		}

      function inserirElem(){
        let elem = prompt("Element: ");
        if(elem == null) return;
        if (elem.length > 1) {
          elem = elem.substring(0,1);
        }
        llistaCursor.inserirElemDinsLlista(elem);
      }

      function eliminarLlista(){
        let s = document.getElementById("selector");
        llistaCursor.eliminarLlista(s.value);
      }
  </script>

</body>
</html>
