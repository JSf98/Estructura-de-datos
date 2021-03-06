class PilaPunter { //PILA FIFO

  constructor(){
     this.top = new Node("TOP", null); //Serà un Node on elem es TOP (simbòlic)
  }

  buida(){
    this.top.setSeg(null);
  }

  empilar(elem){
    let n = new Node(elem, this.top.getSeg());
    this.top.setSeg(n);
  }

  // Retorna 'true' en el cas de que la pila esta buida. 'False' en el cas contrari.
  estabuida(){
    if (this.top.getSeg() == null) {
      return true;
    }
    return false;
  }

  //Elimina l'element que esta a la cima de la pila.
  desempila(){
    if (this.estabuida()){
      alert("LA PILA ÉS BUIDA!");
    }else{
      this.top.setSeg(this.top.getSeg().getSeg());
    }
  }

  //Retorna l'element que esta a la cima de la pila, sense borrar-lo
  cima(){
    if (this.estabuida()){
      alert("LA PILA ÉS BUIDA!");
    }else{
      return this.top.getSeg().getElem();
    }
  }

  printPila(){
    let node = this.top;
    let s = "[ ";
    while(node.getSeg() != null) {
      node = node.getSeg();
      s += node.getElem();
      s += " ";
    }
    s += "]";
    return s;
  }
}
