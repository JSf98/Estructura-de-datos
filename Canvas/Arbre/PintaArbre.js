//import Arbregen from "Arbregen.js";

class PintaArbre{

  constructor(elementId, selector){

    this.canvas = document.getElementById(elementId);
    this.ctx = this.canvas.getContext("2d");

    //Tamany del radi
    this.radi = 5;

    //El nom del selector que anirem actualitzant amb els nodes de l'arbre
    this.selector = selector;

    //Coordenades inicials
    this.posx = this.canvas.getAttribute('width')/2;
    this.posy = this.canvas.getAttribute('height')/2;

    this.arbre = new Arbregen();
  }

  inserirNouNode(){
    let elem = prompt("Número: ");
    if(elem == null) return;
    this.arbre.inserirNouNode(elem);
    this.actualitzarSelector();
  }

  eliminarNode(){
    let s = document.getElementById(this.selector);
    this.arbre.eliminarLlista(s.value);
    this.actualitzarSelector();
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
    /*for (var i = 1; i < llista.length; i++) {
			let option = document.createElement("option");
      let n = llista[i].getNum();
			option.text = n;
			option.value = n;
			s.add(option);
    }*/
  }

}
