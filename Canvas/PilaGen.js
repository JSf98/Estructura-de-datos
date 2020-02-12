class PilaGen { //PILA GENÈRICA

  constructor(elementId){
    //Inicialització del canvas
    this.canvas = document.getElementById(elementId);
    this.ctx = this.canvas.getContext("2d");

    //Coordenades inicials
    var offsetx = -50;
    var offsety = 120;
    //Situades al centre amb un petit offset
    this.posx = this.canvas.getAttribute('height') /2 + offsetx;
    this.posy = this.canvas.getAttribute('width') /2 + offsety;
    //Coordenada 'y' que anirem actualitzant a mesura que pintam la pila
    this.posyaux = this.posy;

    //Tamany dels quadrats
    this.qaltura = 50;
    this.qample = 100;

    //Distancia entre quadrats
    this.disSep = -50;

    //Inicialització de la pila
    this.stack = [];
  }

  empilar(elem){
    if (this.estabuida()) {
      this.stack.push(new Node(elem, null, this.posx, this.posyaux));
    }else{
      //Actualitzam la posyaux
      this.posyaux = this.posyaux + this.disSep;
      this.stack.push(new Node(elem, null, this.posx, this.posyaux));
    }
    this.pintaPila();
  }

  desempila(){
    if (this.estabuida()) {
      //ERROR
    }else{
      //Actualitzam la posy
      this.posyaux = this.posyaux - this.disSep;
      this.stack.pop();
    }
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
    this.pintaPila();
  }

  pintaNode(n){
    this.ctx.beginPath();
    this.ctx.fillStyle = "#B1E7BB";
    this.ctx.fillRect(n.getposx(),n.getposy(), this.qample, this.qaltura); //Dibuixa un rectangle ple
    this.ctx.fillStyle = "#000000";
    this.ctx.strokeRect(n.getposx(),n.getposy(),this.qample,this.qaltura);
    //Pintam el texte al centre del rectangle
    this.ctx.fillText(n.getElem(), n.getposx()+this.qample/2 - this.ctx.measureText(n.getElem()).width/2, n.getposy()+this.qaltura/2);
  }

  pintaPila(){
    this.canvas.width = this.canvas.getAttribute('width');
    for (var i = 0; i < this.stack.length; i++) {
      this.pintaNode(this.stack[i]);
    }
  }

}
