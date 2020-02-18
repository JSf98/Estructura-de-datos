class PilaPunter { //PILA FIFO

  constructor(elementId){
    //Inicialització del canvas
     this.canvas = document.getElementById(elementId);
     this.ctx = this.canvas.getContext("2d");

     this.cwidth = this.canvas.getAttribute('width');
     this.cheight = this.canvas.getAttribute('height');

     //Coordenades inicials
     var offsetx = -this.canvas.getAttribute('width')/2.2;
     var offsety = 0;
     //Situades al centre amb un petit offset
     this.posx = this.cwidth/2 + offsetx;
     this.posy = this.cheight/2 + offsety;
     //Coordenada 'x' que anirem actualitzant a mesura que pintam la pila
     this.posxaux = this.posx;
     this.posyaux = this.posy;

     //Distancia de separació entre nodes
     this.disSep = 70;

     //Tamany dels quadrats
     this.qaltura = 25;
     this.qample = 25;

     //Serà un Node on elem es TOP (simbòlic)
     this.top = new Node("TOP", null, this.posx, this.posy);

     this.nelements = 0;

     this.pintaTop(this.top);
  }

  pintaTop(n){
    var radi = 5;
    if(n.getSeg() != null){ //Si té següent, pintam una fletxa
      this.drawArrow(n.getposx()+this.qample/2,n.getposy(),n.getSeg().getposx()+this.qample/2,n.getSeg().getposy()+this.qaltura, "first", 15, 6);
    }
    this.ctx.beginPath();
    this.ctx.fillStyle = "#000000";
    this.ctx.fillText(n.getElem(), n.getposx()+this.qample/2 - this.ctx.measureText(n.getElem()).width/2, n.getposy()+ radi*3); //Pintam el texte
    this.ctx.arc(n.getposx()+this.qample/2,n.getposy(), radi, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  pintaNode(n){
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#000000";
    this.ctx.fillStyle = "#000000";
    this.ctx.fillText(n.getElem(), n.getposx()+this.qample/2-this.ctx.measureText(n.getElem()).width/2, n.getposy()-this.qaltura/3); //Pintam el texte
    this.ctx.strokeRect(n.getposx(),n.getposy(),this.qample,this.qaltura); //Dibuixa el contorn d'un rectangle

    if(n.getSeg() != null){ //Si té següent
      this.drawArrow(n.getposx()+this.qample/2,n.getposy()+this.qaltura/2, n.getSeg().getposx()+this.qample,n.getSeg().getposy()+this.qaltura/2, "next",0,-2);
    }
  }

  buida(){
    this.top.setSeg(null);
    //Reseteja valors inicials
    this.posxaux = this.posx;
    this.posyaux = this.posy;
    this.top.setposx(this.posxaux);
    this.top.setposy(this.posyaux);
    this.nelements = 0;
    this.canvas.width=this.canvas.width;
    this.pintaTop(this.top);
  }

  empilar(elem){
    this.posxaux = this.posxaux + this.disSep;
    //Quan cream el nou node, ja li deim que el seu next, es el next del TOP
    let n = new Node(elem, this.top.getSeg(), this.posxaux, this.posyaux);
    this.top.setSeg(n);
    this.top.setposx(this.posxaux);
    this.top.setposy(this.posy+this.disSep);
    this.nelements++;
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
        this.posxaux = this.posx;
        this.posyaux = this.posy;
        this.top.setposx(this.posx);
        this.top.setposy(this.posy);
        this.canvas.width=this.canvas.width;
        this.pintaTop(this.top);
      }else{
        this.top.setSeg(aux);
        this.top.setposx(aux.getposx());
        //Actualitzam el posx per poder seguir pintant correctament
        this.posxaux = this.posxaux - this.disSep;
        this.printPila();
      }
      this.nelements--;
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
      this.ctx.strokeRect(this.top.getSeg().getposx(),this.top.getSeg().getposy(),this.qample, this.qaltura);
      return this.top.getSeg().getElem();
    }
  }

  printPila(){
    // Borram contingut donant el mateix width al nostre canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if(this.cwidth< 100*this.nelements){
        this.canvas.width = 100*this.nelements;
    }

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
