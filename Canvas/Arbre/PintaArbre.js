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
    //FALTA PINTAR LES DUES FLETXES EN EL CAS DE TENIR FILLS
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
      console.log(c)
      this.pintaNode(llista[i])
    }
  }

  createPosition(profunditatMax, profunditat, index,  canvasWidth, canvasHeight){
    if (profunditat == 0) {
      return new Coordenada(400,26)
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

}
