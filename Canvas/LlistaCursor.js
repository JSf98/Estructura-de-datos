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
    this.posx = 0;//Ample
    this.posy = this.canvas.getAttribute('height')/2;//Altura

    this.array = [];
    this.pintaBase();
  }

  pintaBase(){
    this.ctx.beginPath();
    this.ctx.fillStyle = "#000000";
    var posaux = this.posx;
    for (var i = 0; i < this.max; i++) {
      this.ctx.strokeRect(posaux,this.posy,this.qample,this.qaltura);
      posaux += this.qample;
    }
  }
}
