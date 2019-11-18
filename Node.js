class Node {
  //Un Node esta format per un element i un punter al següent node.
  constructor(e, node){
    this.elem = e;
    this.seg = node;
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
}
