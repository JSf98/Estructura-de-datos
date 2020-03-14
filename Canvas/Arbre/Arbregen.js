//import Node from "Node.js";

class Arbregen{

  constructor(){
    this.arrel;
  }

  inserirNouNode(nouNum){
    if (isNaN(nouNum) || nouNum == "") {
      alert("No és un número, torna-ho a intentar");
      return;
    }
    if(this.estaBuid()){
      //Significa que no tenim arrel encara
      this.arrel = new Node(nouNum, null);
      return;
    }
    var aux = this.arrel;
    while(aux){
      if(aux.getNum() == nouNum){ //Ja existeix
        alert("Ja existeix aquest node");
        aux = null
      }else if(aux.getNum() < nouNum){ //Dreta
        if(aux.getFillDreta() == null){
          aux.setFillDreta(new Node(nouNum, aux));
          return;
        }else{
          aux = aux.getFillDreta();
        }
      }else{ // arrel.getNum() > nouNum // Esquerra
        if(aux.getFillEsquerra() == null){
          aux.setFillEsquerra(new Node(nouNum, aux));
          return;
        }else{
          aux = aux.getFillEsquerra();
        }
      }
    }
  }

  estaBuid(){
    if(this.arrel == null){
      return true
    }
    return false;
  }

  //RECORREGUTS RECURSIUS
  inOrdre (node = this.arrel) {
    if (!node) {
      return
    }
    if(node.getFillEsquerra()){
        this.inOrdre(node.getFillEsquerra())
    }
    console.log(node.getNum())
    if (node.getFillDreta()) {
        this.inOrdre(node.getFillDreta())
    }
  }

  preOrdre (node) {
    if (!node) {
      return
    }
    console.log(node.getNum())
    if (node.getFillEsquerra()) {
      this.preOrdre(node.getFillEsquerra(), llista)
    }
    if (node.getFillDreta()) {
      this.preOrdre(node.getFillDreta(), llista)
    }
  }

  preOrdre (node, llista) {
    if (!node) {
      return
    }
    llista.push(node.getNum())
    if (node.getFillEsquerra()) {
      this.preOrdre(node.getFillEsquerra(), llista)
    }
    if (node.getFillDreta()) {
      this.preOrdre(node.getFillDreta(), llista)
    }
  }

  postOrdre (node = this.root) {
    if (!node) {
      return
    }
    if (node.getFillEsquerra()) {
      this.postOrdre(node.getFillEsquerra())
    }
    if (node.getFillDreta()) {
      this.postOrdre(node.getFillDreta())
    }
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
    while(aux != null){
      if(aux.getNum() == num){ //L'hem trobat
        return aux
      }else if(aux.getNum() < num){ //Dreta
        if(aux.getFillDreta() != null) {
          aux = aux.getFillDreta();
        }else{
          aux = null
        }
      }else{ // Esquerra
        if(aux.getFillEsquerra() != null){
          aux = aux.getFillEsquerra();
        }else{
          aux = null
        }
      }
    }
    //No l'hem trobat
    return null
}

  eliminarNode(num){
    if (this.estaBuid()) {
      alert("L'arbre esta buid")
      return
    }
    var node = this.trobarNode(num)
    if(node == null){
      alert("Node no trobat")
      return
    }
    // Si no te fills
    if(node.getFillDreta()== null && node.getFillEsquerra() == null){
      var pare = node.getPare()
      if (pare == null) {
        //És la arrel
          this.arrel = null
      }else{
        if(pare.getNum() > node.getNum()){
          pare.setFillEsquerra(null)
        }else{
          pare.setFillDreta(null)
        }
      }
    }else if(node.getFillDreta()!= null && node.getFillEsquerra() == null){
      //Te subarbre dret
      var substitut = node.getFillDreta()
      node.setNum(substitut.getNum())
      node.setFillDreta(substitut.getFillDreta())
      node.setFillEsquerra(substitut.getFillEsquerra())
    }else if(node.getFillDreta()== null && node.getFillEsquerra() != null){
      //Te subarbre esquerra
      var substitut = node.getFillEsquerra()
      node.setNum(substitut.getNum())
      node.setFillDreta(substitut.getFillDreta())
      node.setFillEsquerra(substitut.getFillEsquerra())
    }else{//Te els dos fills.
      //Conveni
      var substitut = node //'node' és el node que volem eliminar
      substitut = substitut.getFillDreta()
      while(substitut.getFillEsquerra() != null){
        substitut = substitut.getFillEsquerra()
      }

      //Els fills esquerra del 'node' es mantenen
      node.setNum(substitut.getNum());

      if (node.getFillDreta().getNum() == substitut.getNum()) {
        //Cas en que el substitut és directament el fill dret
        node.setFillDreta(substitut.getFillDreta())
      }else{
        //Actualitzarà un node anterior al substitut, eliminant el substitut del
        //seu lloc
        substitut.getPare().setFillEsquerra(substitut.getFillDreta())
      }
    }
  }
}
