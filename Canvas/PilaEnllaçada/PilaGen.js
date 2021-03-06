class PilaGen { //PILA GENÈRICA

  constructor(elementId, limit){
    //Inicialització del canvas
    this.canvas = document.getElementById(elementId);
    this.ctx = this.canvas.getContext("2d");

    this.limitCaselles = limit;

    //Tamany dels quadrats
    this.qaltura = 50;
    this.qample = 100;

    //Coordenades inicials
    var offsetx = -this.qample/2;
    var offsety = this.canvas.getAttribute('height')/3;
    //Situades al centre amb un petit offset
    this.posx = this.canvas.getAttribute('width') /2 + offsetx;
    this.posy = this.canvas.getAttribute('height') /2 + offsety;
    //Coordenada 'y' que anirem actualitzant a mesura que pintam la pila
    this.posyaux = this.posy;

    //Distancia entre quadrats
    this.disSep = -this.qaltura;

    this.nelements = 0;

    //Inicialització de la pila
    this.stack = [];
    this.pintaBase();
  }

  empilar(elem){
    if (this.estabuida()) {
      this.stack.push(new Node(elem, null, this.posx, this.posyaux));
    }else{
      //Actualitzam la posyaux
      this.posyaux = this.posyaux + this.disSep;
      this.stack.push(new Node(elem, null, this.posx, this.posyaux));
    }
    this.nelements++;
    this.pintaPila();
  }

  desempila(){
    if(this.stack.length == 0){
      //ERROR
    }else if (this.stack.length == 1){
      this.posyaux = this.posy;
      this.stack.pop();
    }else{
      //Actualitzam la posy
      this.posyaux = this.posyaux - this.disSep;
      this.stack.pop();
    }
    this.nelements--;
    this.pintaPila();
  }

  estabuida(){
    if (this.stack.length == 0){
      return true;
    }
    return false;
  }

  buida(){
    this.stack = [];
    this.posyaux = this.posy;
    this.nelements=0;
    this.pintaPila();
  }

  pintaNode(n){
    this.ctx.beginPath();
    this.ctx.fillStyle = "#6FD0F1";
    this.ctx.fillRect(n.getposx(),n.getposy(), this.qample, this.qaltura); //Dibuixa un rectangle ple
    this.ctx.fillStyle = "#000000";
    this.ctx.strokeRect(n.getposx(),n.getposy(),this.qample,this.qaltura);
    //Pintam el texte al centre del rectangle
    this.ctx.fillText(n.getElem(), n.getposx()+this.qample/2 - this.ctx.measureText(n.getElem()).width/2, n.getposy()+this.qaltura/2);
  }

  pintaPila(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //if(this.canvas.height< 100*this.nelements){
    //    this.canvas.height = 100*this.nelements;
    //}
    console.log(this.canvas);
    for (var i = 0; i < this.stack.length; i++) {
      this.pintaNode(this.stack[i]);
    }
    this.pintaBase();
  }

  pintaBase(){
    this.ctx.beginPath();
    this.ctx.fillStyle = "#000000";
    var posaux = this.posy;
    for (var i = 0; i < this.limitCaselles; i++){
        this.ctx.strokeRect(this.posx,posaux,this.qample+1,this.qaltura+1);
        posaux -= this.qaltura;
    }
  }

}
