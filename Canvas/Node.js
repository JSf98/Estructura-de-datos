class Node {

  /*
   * @elem: Element
   * @seg:  El següent node
   * @posx: Posició 'x' relativa al canvas
   * @posy: Posició 'y' relativa al canvas
   */
  constructor(e, node, posx, posy){
    this.elem = e;
    this.seg = node;
    this.posx = posx;
    this.posy = posy;
  }

  getElem(){
    return this.elem;
  }

  setElem(e){
    this.seg = e;
  }

  getSeg(){
    return this.seg;
  }

  setSeg(node){
    this.seg = node;
  }

  getposx(){
    return this.posx;
  }

  getposy(){
    return this.posy;
  }

  setposx(x){
    this.posx = x;
  }

  setposy(y){
    this.posy = y;
  }

}
