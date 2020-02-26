class Punter extends Node{

  constructor(e, node, posx, posy, color){
    super(e,node,posx,posy);
    this.color = color;
  }

  getColor(){
    return this.color;
  }

  setColor(color){
    this.color = color;
  }

}
