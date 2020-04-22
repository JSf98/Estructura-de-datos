//import Node from "Node.js";

class Arbregen{

  /* @max és el màxim de nodes que permetem inserir */
  constructor(max){
    this.arrel;
  }

  inserirNouNode(nouNum){
    if (isNaN(nouNum) || nouNum == "") {
      alert("No és un número, torna-ho a intentar");
      return;
    }
    var profunditat = 0
    if(this.estaBuid()){
      //Significa que no tenim arrel encara
      this.arrel = new Node(nouNum, null, new Index(profunditat,1));
      return;
    }
    var aux = this.arrel;
    nouNum = Number.parseFloat(nouNum)
    while(aux){
      //Cada iteració és un nivell més
      profunditat++
      if(aux.getNum() == nouNum){ //Ja existeix
        alert("Ja existeix aquest node");
        aux = null
      }else if(aux.getNum() < nouNum){ //Dreta
        if(aux.getFillDreta() == null){
          var newNode = new Node(nouNum, aux, new Index(profunditat,null))
          aux.setFillDreta(newNode);
          return;
        }else{
          aux = aux.getFillDreta();
        }
      }else { //if(aux.getNum() > Number.parseInt(nouNum)) // Esquerra
        if(aux.getFillEsquerra() == null){
          var newNode = new Node(nouNum, aux, new Index(profunditat,null))
          aux.setFillEsquerra(newNode);
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

  buidaArbre(){
    this.arrel = null
  }

  //RECORREGUTS RECURSIUS
  inOrdre (node ) {
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
    llista.push(node)
    if (node.getFillEsquerra()) {
      this.preOrdre(node.getFillEsquerra(), llista)
    }
    if (node.getFillDreta()) {
      this.preOrdre(node.getFillDreta(), llista)
    }
  }

  postOrdre (node) {
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

  //Es farà utilitzant una amplada damunt l'arbre
  actualitzaIndexos(coa, visitats, llista){
    if (coa.length == 0){ // La coa ja esta buida
      return;
    }

	  var n = coa.pop();
    llista.push(n)

    //Ho feim per cada fill del node
    //En aquest cas sabem que al ser un arbre binari, com a màxim tendrà dos fills
    var filld = n.getFillDreta();
    var fille = n.getFillEsquerra();

    if(filld != null){
      filld.setIndex(new Index(filld.getIndex().profunditat, n.getIndex().index*2))
        if(visitats.indexOf(filld) == -1){
            coa.unshift(filld)
        }
    }
    if(fille != null){
      fille.setIndex(new Index(fille.getIndex().profunditat , n.getIndex().index * 2 - 1))
        if(visitats.indexOf(fille) == -1){
            coa.unshift(fille)
        }
    }

		this.actualitzaIndexos(coa, visitats, llista);
  }

  /* El problema es que es binari, per tant ens pot sortir un arbre molt desordenat, per aixo
  cal fer un recorregut damunt tots els nodes */
 trobatProfunditat(){
   if (this.estaBuid()) {
     return 0
   }
   var llista = []
   this.preOrdre(this.arrel, llista)
   var profunditatMax = 0
   for (var i = 0; i < llista.length; i++) {
     if (profunditatMax < llista[i].getIndex().profunditat) {
       profunditatMax = llista[i].getIndex().profunditat
     }
   }
   return profunditatMax
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
