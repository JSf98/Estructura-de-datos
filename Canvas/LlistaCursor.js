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
    this.posyf = this.canvas.getAttribute('height')/5;

    //Les posicions de memoria
    this.array = [];
    //Contindrà els diferents punters de les disintes estructures inserides
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
      //Pintam el segon rectangle
      this.ctx.strokeRect(posaux,this.posy+this.qaltura,this.qample,this.qaltura);
      posaux += this.qample;
    }
    this.nFree = new Punter("Free", this.array[0], this.posx, this.posy-this.qaltura*4, "#000000");
    //Inserim dins la llista de nodes el Free.
    this.nodes.push(this.nFree);
    for (var i = 0; i < this.max-1; i++) {
      this.array[i].setSeg(this.array[i+1]);

      this.drawArroyCurve(this.array[i].getposx()+this.qample/2, this.array[i].getposy()+this.qaltura*2- this.qaltura/2,
      this.array[i].getSeg().getposx()+this.qample/3, this.array[i].getSeg().getposy()+this.qaltura*2,
      this.array[i].getposx()+this.qample,this.array[i].getposy()+this.qaltura*5,"#000000");
    }
    //El darrer node de l'array, ja apunta a null
    this.pintaPunter(this.nFree);
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
    if(this.nodes.indexOf(nom) != -1){
      alert("Ja existeix una llista amb aquest nom. Perfavor torna-ho a intentar");
    }else{
      var idx = this.nodes.length;
      this.nodes.push(new Punter(nom, null, this.posxf, this.posyf, this.getRandomColor()));
      //Actualitzam el posxf per a la següent llista
      this.posxf += this.qample;
    }
    this.actualitzarSelector()
    this.pintaEstructura();
  }

  eliminarLlista(nom){
    //Hem de tenir en compte que mai hem de borrar el node Free!
    //També hem de mirar si hi ha alguna llista
    var idx = this.nodes.indexOf(nom);
    if(idx == -1){
      alert("No existeix aquesta llista");
    }else{
      /*if(this.nodes[idx].getSeg() == null){ //No tenia cap element
        //Actualitzam les posicions de les llistes
        this.posxf -= this.qample;
      }*/
      this.nodes.splice(idx,idx); //Eliminam el node
    }
    this.pintaEstructura();
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
  }

  inserirElemDinsLlista(elem){
    //PENSAR EN DESINCREMENTAR EL this.posxf -= this.qample
    //Hem faltara tenir en compte si Free te almenys una posicio liure.
    //en el cas de que només en tengui una, cal tenir-ho en compte al actualitzar
    //El Free
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
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  buida(){
    //Alfinal sera com una inicialitzacio
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
