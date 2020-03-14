class Node {
  constructor (n, pare){
      this.num = n;
      this.esquerra;
      this.dreta;
      this.pare = pare;
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

  getPare(){
    return this.pare;
  }

  setPare(p){
    this.pare = p;
  }
}
