class PilaPunter { //PILA FIFO

  constructor(elementId){
    //Coordenades inicials
     this.posx =10;
     this.posy =70;
     this.disSep = 70; //Distancia de separació
     //Serà un Node on elem es TOP (simbòlic)
     this.top = new Node("TOP", null, this.posx, this.posy);
     //Inicialització del canvas
     this.canvas = document.getElementById(elementId);
     this.ctx = this.canvas.getContext("2d");
     this.pintaTop(this.top);
  }

  pintaTop(n){
    if(n.getSeg() != null){ //Si té següent
      this.drawArrow(n.getposx()+11,n.getposy(),n.getSeg().getposx()+13,n.getSeg().getposy()+26, "first", 15, 6);
    }
    this.ctx.beginPath();
    this.ctx.fillStyle = "#000000";
    this.ctx.fillText(n.getElem(), n.getposx()+3, n.getposy()+20); //Pintam el texte
    this.ctx.arc(n.getposx()+13,n.getposy(), 5, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  pintaNode(n){
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#000000";
    this.ctx.fillStyle = "#000000";
    this.ctx.fillText(n.getElem(), n.getposx()+6, n.getposy()-5); //Pintam el texte
    this.ctx.strokeRect(n.getposx(),n.getposy(),25,25); //Dibuixa el contorn d'un rectangle
    //this.ctx.fillRect(n.getposx(),n.getposy(),25,25); //Dibuixa un rectangle ple

    if(n.getSeg() != null){ //Si té següent
      var num = 12;
      this.drawArrow(n.getposx()+num,n.getposy()+num,n.getSeg().getposx()+26,n.getSeg().getposy()+num, "next",0,-2);
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
    this.pintaTop(this.top);
  }

  empilar(elem){
    this.posx = this.posx + this.disSep;
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
        this.pintaTop(this.top);
      }else{
        this.top.setSeg(aux);
        this.top.setposx(aux.getposx());
        //Actualitzam el posx per poder seguir pintant correctament
        this.posx = this.posx - this.disSep;
        this.printPila();
      }
    }
  }

  //Retorna l'element que esta a la cima de la pila, sense borrar-lo
  cima(){
    if (this.estabuida()){
      alert("LA PILA ÉS BUIDA!");
    }else{
      this.printPila();
      this.ctx.strokeStyle = "#32a852";
      this.ctx.lineWidth = 3;
      this.ctx.strokeRect(this.top.getSeg().getposx(),this.top.getSeg().getposy(),25,25);
      return this.top.getSeg().getElem();
    }
  }

  printPila(){
    this.canvas.width=this.canvas.width; // Borram contingut donant el mateix width al nostre canvas
    if(this.estabuida()){
      alert("LA PILA ÉS BUIDA!");
    }else{
      let node = this.top;
      this.pintaTop(node); //Pintam el TOP
      while(node.getSeg() != null) {
        node = node.getSeg();
        this.pintaNode(node);
      }
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
    this.ctx.arc(fromx, fromy, 2, 0, 2 * Math.PI);
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
