class PilaPunter { //PILA FIFO

  constructor(elementId){
    //Coordenades inicials
     this.posx =10;
     this.posy =50;
     //Serà un Node on elem es TOP (simbòlic)
     this.top = new Node("TOP", null, this.posx, this.posy);
     //Inicialització del canvas
     this.canvas = document.getElementById(elementId);
     this.ctx = this.canvas.getContext("2d");
     this.ctx.font = "12px Arial";
     this.pintaNode(this.top);
  }


  pintaNode(n){
    this.ctx.beginPath();
    this.ctx.fillText(n.getElem(), n.getposx(), n.getposy()-5); //Pintam el texte
    this.ctx.strokeRect(n.getposx(),n.getposy(),25,25); //Dibuixa el contorn d'un rectangle
    //this.ctx.fillRect(25,25,40,40); //Dibuixa un rectangle ple
    //this.ctx.clearRect(45,45,20,20); //Borra un àrea rectangular
    if(n.getSeg() != null){ //Si té següent
      //Pintam la recta
      this.ctx.beginPath();
      var num = 12;
      this.ctx.moveTo(n.getposx()+num,n.getposy()+num);
      this.ctx.lineTo(n.getSeg().getposx()+num,n.getSeg().getposy()+num);
      this.ctx.stroke();

      //Cercle
      this.ctx.arc(n.getSeg().getposx()+num, n.getSeg().getposy()+num, 2, 0, 2 * Math.PI);
      this.ctx.fill();
    }
  }

  buida(){
    this.top.setSeg(null);
    //Reseteja valors inicials
    this.posx =10;
    this.posy =50;
    this.top.setposx(10);
    this.top.setposy(50);
    this.canvas.width=this.canvas.width;
    this.pintaNode(this.top);
  }

  empilar(elem){
    this.posx = this.posx + 50
    //Quan cream el nou node, ja li deim que el seu next, es el next del TOP
    let n = new Node(elem, this.top.getSeg(), this.posx, this.posy);
    this.top.setSeg(n);
    this.top.setposx(this.posx);
    this.top.setposy(this.posy+60);
    this.printPila();
  }

  // Retorna 'true' en el cas de que la pila esta buida. 'False' en el cas contrari.
  estabuida(){
    if (this.top.getSeg() == null) {
      return true;
    }
    return false;
  }

  /* Elimina l'element que esta a la cima de la pila. I actualitza les posicions
   * dels distints nodes*/
  desempila(){
    if (this.estabuida()){
      alert("LA PILA ÉS BUIDA!");
    }else{
      let aux = this.top.getSeg().getSeg();
      if(aux == null){
        //Significa que només hi ha un fill per eliminar
        this.top.setSeg(null);
        this.posx =10;
        this.posy =50;
        this.top.setposx(10);
        this.top.setposy(50);
        this.canvas.width=this.canvas.width;
        this.pintaNode(this.top);
      }else{
        this.top.setSeg(aux);
        this.top.setposx(aux.getposx());
        //Actualitzam el posx per poder seguir pintant correctament
        this.posx = this.posx - 50;
        this.printPila();
      }
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
    this.canvas.width=this.canvas.width; // Borram contingut donant el mateix width al nostre canvas
    if(this.estabuida()){
      alert("LA PILA ÉS BUIDA!");
    }else{
      let node = this.top;
      this.pintaNode(node); //Pintam el TOP
      while(node.getSeg() != null) {
        node = node.getSeg();
        this.pintaNode(node);
      }
    }
  }
}
