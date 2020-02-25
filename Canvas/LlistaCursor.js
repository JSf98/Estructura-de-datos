class LlistaCursor {

  constructor(elementId, limit){
    this.canvas = document.getElementById(elementId);
    this.ctx = this.canvas.getContext("2d");

    //Màxim de caselles que mostrarà
    this.max = limit;

    //Tamany dels quadrats
    this.qaltura = 25;
    this.qample = 25;

    //Coordenades inicials
    this.posx = 23;//Ample
    this.posy = this.canvas.getAttribute('height')/2;//Altura

    this.array = [];
    //Contindrà els diferents puntes de les disintes estructures inserides
    this.nodes = [];

    this.nFree;

    this.inicialitzacio();
  }

  inicialitzacio(){
    this.ctx.beginPath();
    this.ctx.fillStyle = "#000000";
    var posaux = this.posx;
    for (var i = 0; i < this.max; i++) {
      this.ctx.strokeRect(posaux,this.posy,this.qample,this.qaltura);
      this.array[i] = new Node(-1,null, posaux,this.posy);
      //Segon rectangle
      this.ctx.strokeRect(posaux,this.posy+this.qaltura,this.qample,this.qaltura);
      posaux += this.qample;
    }
    this.nFree = new Node("Free", this.array[0], this.posx, this.posy-this.qaltura*4);
    this.nodes[0] = this.nFree;
    for (var i = 0; i < this.max-1; i++) {
      this.array[i].setSeg(this.array[i+1]);

      this.drawArroyCurve(this.array[i].getposx()+this.qample/2, this.array[i].getposy()+this.qaltura*2- this.qaltura/2,
      this.array[i].getSeg().getposx()+this.qample/3, this.array[i].getSeg().getposy()+this.qaltura*2,
      this.array[i].getposx()+this.qample,this.array[i].getposy()+this.qaltura*5,"#000000");
    }
    //El darrer node, ja apunta a null
    this.pintaPunter(this.nFree, "#000000");
  }

  pintaPunter(n,color){
    var radi = 5;
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.fillText(n.getElem(), n.getposx()+this.qample/2 - this.ctx.measureText(n.getElem()).width/2, n.getposy() - radi*3);
    this.ctx.arc(n.getposx()+this.qample/2,n.getposy(), radi, 0, 2 * Math.PI);
    this.ctx.fill();
    this.drawArrow(n.getposx()+this.qample/2, n.getposy(),n.getSeg().getposx()+this.qample/2,n.getSeg().getposy(),color, "", 0, 0);
  }

  drawArroyCurve(fromx, fromy, tox, toy, cpx, cpy, color){
    this.ctx.beginPath();
    this.ctx.moveTo(fromx, fromy);
    this.ctx.strokeStyle = color;
    this.ctx.quadraticCurveTo(cpx, cpy, tox, toy);
    this.ctx.stroke();
  }

  drawArrow(fromx, fromy, tox, toy, color, txt, offsetx, offsety){
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
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 1;
    this.ctx.stroke();
    this.ctx.fillStyle = color;
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
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 1;
    this.ctx.stroke();
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }
}
