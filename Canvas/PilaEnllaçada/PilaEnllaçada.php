<?php
  $prefixe = "../Pagina_WEB/";
  include "../include/barra_menu.php"
?> <!-- INCLUDE BARRA MENÚ-->

<html>
<head>
  <link href="Pila.css" rel="stylesheet">
  <title> Pila Enllaçada </title>
  <meta charset="utf-8">
</head>
<body>

  <div class ="caja">
    <header>
      <h2>PILA ENLLAÇADA (LIFO)</h2>
    </header>
    <nav>
      <ul>
      <p> Quantitat d'elements no definits. Aprofita l'ús de la memòria dinàmica.</p>
        <button class="button" onclick="empilar()">Empila</button>
        <button class="button" onclick="desempila()">Desempila</button>
        <button class="button" onclick="pila.cima()">Cima</button>
        <button class="button" onclick="buida()">Buida</button>
      </ul>
      </nav>
    <article style="display: flex; flex-direction: row; justify-content: center;">
      <div id="divisio">
        <!--style="border:1px solid #d3d3d3;"-->
        <canvas id="mycanvas" width="700" height="200" style="border:1px solid #d3d3d3;">
          El teu navegador no soporta el HTML5 canvas.</canvas>
      </div>

      <div id="divisio2">
        <canvas id="mycanvas2" width="400" height="400" float= "right" style="border:1px solid #d3d3d3;">
          El teu navegador no soporta el HTML5 canvas.</canvas>
      </div>
    </article>

  </div>
  <!-- IMPORTS -->
  <script src = "PilaPunters.js "> </script>
  <script src = "PilaGen.js "> </script>
  <script src = "Node.js "> </script>
  <script>
    //Passam per paràmetre el canvas
    var limitCaselles = 7;
    var comptador = 0;
    let pila = new PilaPunter("mycanvas");
    let pilagen = new PilaGen("mycanvas2", this.limitCaselles);

    function empilar() {
      if(this.comptador == this.limitCaselles){
          alert("Limit casselles: " + this.limitCaselles);
      }else{
        let elem = prompt("Insereix element");
        this.comptador++;
        if(elem == null) return;
        //Si la paraula es massa llarga, la tallam
        if (elem.length > 10) {
          elem = elem.substring(0,9);
        }
        pilagen.empilar(elem);
  			pila.empilar(elem);
      }
		}

    function desempila(){
      this.comptador--;
      pila.desempila();
      pilagen.desempila();
    }

    function buida(){
      this.comptador = 0;
      pila.buida();
      pilagen.buida();
    }

  </script>

</body>
</html>
