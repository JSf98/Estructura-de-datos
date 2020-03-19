//import Arbregen from "Arbregen.js";

class PintaArbre{

  constructor(elementId, selector){
    this.canvas = document.getElementById(elementId);
    this.ctx = this.canvas.getContext("2d");

    //Tamany del radi
    this.radi = 15;

    //El nom del selector que anirem actualitzant amb els nodes de l'arbre
    this.selector = selector;

    //Coordenades inicials
    this.posx = this.canvas.getAttribute('width')/2;
    this.posy = this.canvas.getAttribute('height')/2;

    this.arbre = new Arbregen(30);
  }

  pintaNode(n){
    this.ctx.beginPath();
    this.ctx.fillStyle = "#000000";
    var coordenada = n.getCoordenada()
    this.ctx.fillText(n.getNum(), coordenada.getPosX() - this.ctx.measureText(n.getNum()).width/2, coordenada.getPosY());
    this.ctx.arc(coordenada.getPosX(),coordenada.getPosY(), this.radi, 0, 2 * Math.PI);
    this.ctx.stroke();
/*
    if(n.getFillDreta() != null){
      var coordenadaFilld = n.getFillDreta().getCoordenada()
      this.drawArrow(coordenada.getPosX(), coordenada.getPosY(), coordenadaFilld.getPosX(), coordenadaFilld.getPosY(), "", 0, 0)
    }
    if (n.getFillEsquerra() != null) {
      var coordenadaFille = n.getFillEsquerra().getCoordenada()
      this.drawArrow(coordenada.getPosX(), coordenada.getPosY(), coordenadaFille.getPosX(), coordenadaFille.getPosY(), "", 0, 0)
    }*/
  }

  pintaArbre(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    var prmax = this.arbre.trobatProfunditat()
    var llista = []
    var coa = []
    coa.push(this.arbre.arrel)
    this.arbre.actualitzaIndexos(coa,[], llista)
    /*for (var i = 0; i < llista.length; i++) {
      console.log(llista[i].getNum())
      console.log(llista[i].getIndex())
    }
    console.log("========================================")*/
    for (var i = 0; i < llista.length; i++) {
      var c = this.createPosition(prmax, llista[i].getIndex().profunditat, llista[i].getIndex().index, this.canvas.getAttribute('width'), this.canvas.getAttribute('height'))
      llista[i].setCoordenada(c)
      //console.log(c)
      this.pintaNode(llista[i])
    }
  }

  createPosition(profunditatMax, profunditat, index,  canvasWidth, canvasHeight){
    if (profunditat == 0) {
      return new Coordenada(400,30)
    }
    var x = index * canvasWidth / (Math.pow(2,profunditat) + 1)
    var y = profunditat * canvasHeight / (profunditatMax+1)
    //return new Coordenada(canvasHeight/profunditatMax*y,canvasWidth*x)
    return new Coordenada(x,y)
  }

  inserirNouNode(){
    let elem = prompt("Número: ");
    if(elem == null) return;
    this.arbre.inserirNouNode(elem);
    this.actualitzarSelector();
    this.pintaArbre()
  }

  eliminarNode(){
    let s = document.getElementById(this.selector);
    this.arbre.eliminarNode(s.value);
    this.actualitzarSelector();
    this.pintaArbre()
  }

  reiniciaArbre(){
    this.arbre.buidaArbre()
    this.actualitzarSelector()
  }

  actualitzarSelector(){
    let s = document.getElementById(this.selector);
    //Eliminam les opcions antigues
    for(var i = s.options.length; i >= 0; i--){
			s.remove(i);
		}
    //Cream la llista dels nodes amb un preordre
    var llista = [];
    this.arbre.preOrdre(this.arbre.arrel,llista);
    //Cream les noves opcions
    for (var i = 0; i < llista.length; i++) {
			let option = document.createElement("option");
      let n = llista[i].getNum();
			option.text = n;
			option.value = n;
			s.add(option);
    }
  }

  drawArrow(fromx, fromy, tox, toy, txt, offsetx, offsety){
    //variables to be used when creating the arrow
    var headlen = 10;
    var angle = Math.atan2(toy-fromy,tox-fromx);
    var puntcentrex = (fromx+tox)/2 - this.ctx.measureText(txt).width/2 + offsetx;
    var puntcentrey = (fromy+toy)/2 + offsety;

    //starting path of the arrow from the start square to the end square and drawing the stroke
    this.ctx.beginPath();
    this.ctx.moveTo(fromx, fromy);
    //Si es vol dibuixar un cercle, es aquí
    this.ctx.stroke();
    this.ctx.lineTo(tox, toy);
    this.ctx.strokeStyle = "#cc0000";
    this.ctx.lineWidth = 1;
    this.ctx.stroke();
    this.ctx.fillStyle = "#cc0000";
    this.ctx.fillText(txt, puntcentrex, puntcentrey);

    //starting a new path from the head of the arrow to one of the sides of the point
    this.ctx.beginPath();
    this.ctx.moveTo(tox, toy);
    this.ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));

    //path from the side point of the arrow, to the other side point
    this.ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/7),toy-headlen*Math.sin(angle+Math.PI/7));

    //path from the side point back to the tip of the arrow, and then again to the opposite side point
    this.ctx.lineTo(tox, toy);
    this.ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));

    //draws the paths created above
    this.ctx.strokeStyle = "#cc0000";
    this.ctx.lineWidth = 1;
    this.ctx.stroke();
    this.ctx.fillStyle = "#cc0000";
    this.ctx.fill();
  }

}
