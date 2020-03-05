import Node from "Node.js";

class Arbregen{

  constructor(){
    this.arrel;
  }

  inserirNouNode(nouNum){
    if (isNaN(nouNum)) {
      alert("No és un número, torna-ho a intentar");
      return;
    }
    if(this.estaBuid()){
      //Significa que no tenim arrel encara
      this.arrel = new Node(nouNum);
      return;
    }

    var aux = this.arrel;
    while(aux){
      if(aux.getNum() == nouNum){ //Ja existeix
        alert("Ja existeix aquest node");
      }else if(aux.getNum() < nouNum){ //Dreta
        if(aux.getFillDreta() == null){
          aux.setFillDreta(new Node(nouNum));
          return;
        }else{
          aux = aux.getFillDreta();
        }
      }else{ // arrel.getNum() > nouNum // Esquerra
        if(aux.getFillEsquerra() == null){
          aux.setFillEsquerra(new Node(nouNum));
          return;
        }else{
          aux = aux.getFillEsquerra();
        }
      }
    }
  }

  estaBuid(){
    return this.arrel == undefined;
  }

  //RECORREGUTS
  inOrdre (node = this.arrel) {
    if (!node) {
      return
    }
    this.inOrder(node.getFillEsquerra())
    console.log(node.getNum())
    this.inOrder(node.getFillDreta())
  }

  preOrdre (node = this.arrel) {
    if (!node) {
      return
    }
    console.log(node.getNum())
    this.preOrder(node.getFillEsquerra())
    this.preOrder(node.getFillDreta())
  }

  postOrdre (node = this.root) {
    if (!node) {
      return
    }
    this.postOrder(node.getFillEsquerra())
    this.postOrder(node.getFillDreta())
    console.log(node.getNum())
  }

  getValorMin(){
    if(!this.estaBuid()){
      var node = this.arrel
      while(node.getFillEsquerra() != null){
        node = node.getFillEsquerra()
      }
      return node
    }
  }

  getValorMax(){
    if(!this.estaBuid()){
      var node = this.arrel
      while(node.getFillDreta() != null){
        node = node.getFillDreta()
      }
      return node
    }
  }

  trobarNode(num){
    if(this.estaBuid()){
      alert("L'arbre esta buid")
      return null
    }
    var aux = this.arrel
    while(aux){
      if(aux.getNum() == num){ //L'hem trobat
        return aux
      }else if(aux.getNum() < num){ //Dreta
        if(aux.getFillDreta() != null) {
          aux = aux.getFillDreta();
        }else{
          return null
        }
      }else{ // Esquerra
        if(aux.getFillEsquerra() != null){
          aux = aux.getFillEsquerra();
        }else{
          return null
        }
    }
    //No l'hem trobat
    return null
  }

  eliminarNode(num){
    if (!this.estaBuid()) {
      alert("L'arbre esta buid")
      return
    }
    var node = trobarNode(num)
    // Si no te fills
    if(node.getFillDreta()== null && node.getFillEsquerra() == null){
      node = null
    }else if(node.getFillDreta()!= null && node.getFillEsquerra() == null){
      //Te subarbre dret
      node = node.getFillDreta()
    }else if(node.getFillDreta()== null && node.getFillEsquerra() != null){
      //Te subarbre esquerra
      node = node.getFillEsquerra()
    }else{//Te els dos fills.
      //Conveni
      var aux = node //'node' és el node que volem eliminar
      aux = aux.getFillDreta()
      while(aux.getFillEsquerra() != null){
        aux = aux.getFillEsquerra()
      }
      //aux és el que ha de substituir el pare
      node.setNum(aux.getNum());
      //Els fills esquerra es mantenen, per tant, no fa falta canviar-los
      node.setFillDreta()
    }
  }











}
