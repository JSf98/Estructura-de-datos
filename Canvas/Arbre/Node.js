class Node {
  constructor (n){
      this.num = n;
      this.esquerra;
      this.dreta;
  }

  setNum(n){
    this.num = n
  }

  getNum(){
    return this.num;
  }

  getFillEsquerra(){
    return this.esquerra;
  }

  getFillDreta(){
    return this.dreta;
  }

  setFillEsquerra(n){
    this.esquerra = n;
  }

  setFillDreta(n){
    this.dreta = n;
  }
}
