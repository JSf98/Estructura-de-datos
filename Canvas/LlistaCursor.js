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
    this.posx = 23; //Ample
    this.posy = this.canvas.getAttribute('height')/2;//Altura

    //Coordenades inicials per a les llistes fora elements
    this.posxf = this.posx;
    this.auxposxf = this.posxf;
    this.posyf = this.canvas.getAttribute('height')/5;

    //Les posicions de memoria
    this.array = [];
    //Contindrà els diferents punters de les disintes estructures inserides
    this.nodes = [];

    this.nFree;
    this.inicialitzacio();
  }

  inicialitzacio(){
    var posaux = this.posx;
    for (var i = 0; i < this.max; i++) {
      this.array[i] = new Node(-1,null, posaux,this.posy);
      posaux += this.qample;
    }
    this.nFree = new Punter("Free", this.array[0], this.posx, this.posy-this.qaltura*4, "#000000");
    //Inserim dins la llista de nodes el Free.
    this.nodes.push(this.nFree);
    for (var i = 0; i < this.max-1; i++) {
      this.array[i].setSeg(this.array[i+1]);
    }
    //El darrer node de l'array, ja apunta a null
    this.pintaEstructura();
  }

  pintaEstructura(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //Pintam els Nodes
    this.ctx.strokeStyle = "#000000";
    this.ctx.fillStyle = "#000000";
    for (var i = 0; i < this.array.length; i++) {
      this.ctx.fillText(this.array[i].getElem(), this.array[i].getposx()+this.qample/2-this.ctx.measureText(this.array[i].getElem()).width/2, this.array[i].getposy()+this.qaltura/2); //Pintam el texte
      this.ctx.strokeRect(this.array[i].getposx(), this.array[i].getposy(),this.qample, this.qaltura);
      this.ctx.strokeRect(this.array[i].getposx(), this.array[i].getposy()+this.qaltura,this.qample, this.qaltura);
    }
    //Pintam els Punters
    for (var i = 0; i < this.nodes.length; i++) {
      this.pintaPunter(this.nodes[i]);
      var aux = this.nodes[i].getSeg();
      if (aux != null){//És un node que no apunta a null, almenys té un element
        if(aux.getSeg() != null){ //Té més d'un node
          while(aux != null){
            if(aux.getSeg() != null){ //Si no és el darrer Node de la llista enllaçada
              this.drawArroyCurve(aux.getposx()+this.qample/2, aux.getposy()+this.qaltura*2- this.qaltura/2,
              aux.getSeg().getposx()+this.qample/3, aux.getSeg().getposy()+this.qaltura*2,
              aux.getposx()+this.qample,aux.getposy()+this.qaltura*5,this.nodes[i].getColor());
            }
            //Actualitzam l'auxiliar
            aux = aux.getSeg();
          }
        }
      }
    }
  }

  inserirNovaLlista(nom){
    //FALTA COMPROVACIÓ DE SI EL NOM JA EXISTEIX
    if(this.nodes.length == this.max){
      alert("Has superat el límit de llistes");
    }else{
      var idx = this.nodes.length;
      this.nodes.push(new Punter(nom, null, this.auxposxf, this.posyf, this.getRandomColor()));
      //Actualitzam el posxf per a la següent llista
      this.auxposxf += this.qample;
      this.actualitzarSelector();
      this.pintaEstructura();
    }
  }

  actualitzarSelector(){
    let s = document.getElementById("selector");
    //Eliminam les opcions antigues
    for(var i = s.options.length; i >= 0; i--){
			s.remove(i);
		}
    //Cream les noves opcions
    for (var i = 1; i < this.nodes.length; i++) {
			let option = document.createElement("option");
      let nom = this.nodes[i].getElem();
			option.text = nom;
			option.value = nom;
			s.add(option);
    }

    this.actualitzarSelectorNodes();
  }

  actualitzarSelectorNodes(){
    let s1 = document.getElementById("selector");
    let s = document.getElementById("selector2");
    var idx;
    for (var i = 0; i < this.nodes.length; i++) {
      if(this.nodes[i].getElem() == s1.value){
        idx = i;
        break;
      }
    }
    //Eliminam les opcions antigues
    for(var i = s.options.length; i >= 0; i--){
			s.remove(i);
		}
    //Cream les noves opcions
    if(idx != undefined){
      let n = this.nodes[idx].getSeg();
      let aux = n;
      while(aux != null){
        let option = document.createElement("option");
        let nom = aux.getElem();
        option.text = nom;
        option.value = nom;
        s.add(option);
        aux = aux.getSeg();
      }
    }
  }

  actualitzaNodesNull(){
    this.auxposxf = this.posxf;
    for (var i = 0; i < this.nodes.length; i++) {
      if(this.nodes[i].getSeg()==null){ //si no té Nodes enganxats
        this.nodes[i].setposx(this.auxposxf);
        this.nodes[i].setposy(this.posyf);
        this.auxposxf  += this.qample;
      }
    }
  }

  eliminarLlista(nom){
    //Hem de tenir en compte que mai hem de borrar el node Free!
    if(this.nodes.length == 1){
      alert("No hi ha cap llista");
    }else{
      //Primer agafam el selector i l'index del seu valor
      let s = document.getElementById("selector");
      var idx;
      for (var i = 0; i < this.nodes.length; i++) {
        if(this.nodes[i].getElem() == s.value){
          idx = i;
          break;
        }
      }
      if(this.nodes[idx].getSeg() == null){
        //No té nodes enganxats
        this.nodes.splice(idx,1); //Eliminam el node
        this.actualitzaNodesNull();
      }else{
        //Actualitzam el node Free
        if(this.nodes[0].getSeg() != null){
          let aux = this.nodes[idx].getSeg();
          //Ens colocam al darrer bloc de la llista
          while(aux.getSeg() != null){
            aux = aux.getSeg();
          }
          aux.setSeg(this.nodes[0].getSeg());
        }
        this.nodes[0].setSeg(this.nodes[idx].getSeg());
        this.nodes[0].setposx(this.nodes[idx].getposx());
        this.nodes[0].setposy(this.nodes[idx].getposy());
        this.nodes.splice(idx,idx); //Eliminam el node
      }
      this.actualitzarSelector();
      this.pintaEstructura();
    }
    this.actualitzarSelectorNodes();
  }

  eliminarElemDinsLlista(){
    if (this.nodes.length == 1) {
      alert("No hi ha cap llista");
    }else{
      let s = document.getElementById("selector");
      let s2 = document.getElementById("selector2");
      var idx; // idx de la llista
      for (var i = 0; i < this.nodes.length; i++) {
        if(this.nodes[i].getElem() == s.value){
          idx = i;
          break;
        }
      }
      if(this.nodes[idx].getSeg() != null){
        let aux = this.nodes[idx];
        while(aux.getSeg() != null){
          if(aux.getSeg().getElem() == s2.value){
            break;
          }else{
            aux = aux.getSeg();
          }
        }

        let aux2 = aux.getSeg(); //És el node que volem eliminar
        if(aux2.getSeg() != null){// La llista té més d'un node
          if(this.nodes[idx].getSeg() == aux2){ //Si és el node que volem eliminar
            this.nodes[idx].setposx(aux2.getSeg().getposx());
            this.nodes[idx].setposy(aux2.getSeg().getposy()-this.qaltura*4);
          }
        }else{//només té un Node
          this.nodes[idx].setSeg(null);
          this.actualitzaNodesNull();
        }
        if(aux2 != null){ //No es el darrer node de la llista
          //Enllaçam el seu anterior al fill del node que volem borrar
          aux.setSeg(aux2.getSeg());
        }
        aux2.setSeg(this.nFree.getSeg());
        this.nFree.setSeg(aux2);
        this.nodes[0].setposx(aux2.getposx());
        this.nodes[0].setposy(aux2.getposy()-this.qaltura*4);
        this.actualitzarSelectorNodes();
        this.pintaEstructura();
      }else{
        alert("La llista esta buida");
      }
    }
  }

  inserirElemDinsLlista(elem){
    if(this.nodes.length == 1){
      alert("No hi ha cap llista");
    }else{
      if(this.nodes[0].getSeg()!=null){ //Almenys té una posicó lliure
        //Primer agafam el selector i l'index del seu valor
        let s = document.getElementById("selector");
        var idx;
        for (var i = 0; i < this.nodes.length; i++) {
          if(this.nodes[i].getElem() == s.value){
            idx = i;
            break;
          }
        }
        if (this.nodes[0].getSeg().getSeg()==null) { //Només li queda una posició lliure
          if (this.nodes[idx].getSeg()==null) {//Si és el primer element que inserim
            this.nodes[idx].setSeg(this.nodes[0].getSeg());
            this.nodes[idx].setposx(this.nodes[0].getposx());
            this.nodes[idx].setposy(this.nodes[0].getposy());
            //Inserim l'element
            this.nodes[idx].getSeg();
            this.nodes[idx].getSeg().setElem(elem);

            //Actualitzam el punter Free
            this.nodes[0].setSeg(null);
            this.nodes[0].setposx(5);
            this.nodes[0].setposy(5);
            //Aïllam la nova llista dels punters Free
            this.nodes[idx].getSeg().setSeg(null);
            this.actualitzaNodesNull();
          }else{
            var aux = this.nodes[idx].getSeg();
            //Ens colocam al final de la llista
            while(aux.getSeg() != null){
              aux = aux.getSeg();
            }
            aux.setSeg(this.nodes[0].getSeg());
            //Inserim l'element
            aux.getSeg().setElem(elem);
            //Actualitzam el punter Free
            this.nodes[0].setSeg(null);
            this.nodes[0].setposx(5);
            this.nodes[0].setposy(5);
            //Aïllam el nou Node dels punters Free
            aux.getSeg().setSeg(null);
          }
          this.pintaEstructura();
        }else{//Free té més d'una posició lliure
          if (this.nodes[idx].getSeg()==null) {//Si és el primer element que inserim
            this.nodes[idx].setSeg(this.nodes[0].getSeg());
            this.nodes[idx].setposx(this.nodes[0].getposx());
            this.nodes[idx].setposy(this.nodes[0].getposy());
            //Inserim l'element
            this.nodes[idx].getSeg();
            this.nodes[idx].getSeg().setElem(elem);

            //Actualitzam el punter Free
            this.nodes[0].setSeg(this.nodes[0].getSeg().getSeg());
            this.nodes[0].setposx(this.nodes[0].getSeg().getposx());
            this.nodes[0].setposy(this.nodes[0].getSeg().getposy()-this.qaltura*4);
            //Aïllam la nova llista dels punters Free
            this.nodes[idx].getSeg().setSeg(null);
            this.actualitzaNodesNull();
          }else{
            var aux = this.nodes[idx].getSeg();
            //Ens colocam al final de la llista
            while(aux.getSeg() != null){
              aux = aux.getSeg();
            }
            aux.setSeg(this.nodes[0].getSeg());
            //Inserim l'element
            aux.getSeg().setElem(elem);
            //Actualitzam el punter Free
            this.nodes[0].setSeg(this.nodes[0].getSeg().getSeg());
            this.nodes[0].setposx(this.nodes[0].getSeg().getposx());
            this.nodes[0].setposy(this.nodes[0].getSeg().getposy()-this.qaltura*4);
            //Aïllam el nou Node dels punters Free
            aux.getSeg().setSeg(null);
          }
          this.pintaEstructura();
        }
      }else{
        alert("No hi ha memoria disponible");
      }
    }
    this.actualitzarSelectorNodes();
  }

  /*getRandomColor(hex, lum) {
    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
      hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i*2,2), 16);
      c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
      rgb += ("00"+c).substr(c.length);
    }

    return rgb;
  }*/

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  buida(){
    this.nodes = [];
    this.actualitzarSelector();
    this.auxposxf = this.posxf;
    this.inicialitzacio();
  }

  pintaPunter(n){
    var radi = 5;
    this.ctx.beginPath();
    this.ctx.fillStyle = n.getColor();
    this.ctx.fillText(n.getElem(), n.getposx()+this.qample/2 - this.ctx.measureText(n.getElem()).width/2, n.getposy() - radi*3);
    this.ctx.arc(n.getposx()+this.qample/2,n.getposy(), radi, 0, 2 * Math.PI);
    this.ctx.fill();
    if(n.getSeg() != null){
        this.drawArrow(n.getposx()+this.qample/2, n.getposy(),n.getSeg().getposx()+this.qample/2,n.getSeg().getposy(), n.getColor(), "", 0, 0);
    }
  }

  drawArroyCurve(fromx, fromy, tox, toy, cpx, cpy, color){
    this.ctx.beginPath();
    this.ctx.moveTo(fromx, fromy);
    this.ctx.strokeStyle = color;
    this.ctx.quadraticCurveTo(cpx, cpy, tox, toy);
    this.ctx.stroke();

    var x_center = tox;
    var y_center = toy;

    var angle;
    var x;
    var y;
    var r=4;

    this.ctx.beginPath();
    //angle = Math.atan2(toy-fromy,tox-fromx);
    angle = this.getQuadraticAngle(1, fromx,fromy, cpx, cpy, tox, toy);
    x = r*Math.cos(angle) + x_center;
    y = r*Math.sin(angle) + y_center;
    this.ctx.moveTo(x, y);
    angle += (1/3)*(2*Math.PI);
    x = r*Math.cos(angle) + x_center;
    y = r*Math.sin(angle) + y_center;
    this.ctx.lineTo(x, y);
    angle += (1/3)*(2*Math.PI);
    x = r*Math.cos(angle) + x_center;
    y = r*Math.sin(angle) + y_center;
    this.ctx.lineTo(x, y);
    this.ctx.closePath();
    this.ctx.fill();
  }

  getQuadraticAngle(t, sx, sy, cp1x, cp1y, ex, ey) {
    var dx = 2*(1-t)*(cp1x-sx) + 2*t*(ex-cp1x);
    var dy = 2*(1-t)*(cp1y-sy) + 2*t*(ey-cp1y);
    return -Math.atan2(dx, dy) + 0.5*Math.PI;
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
