class Node {
  constructor (n, pare, i){
      this.num = n;
      this.esquerra;
      this.dreta;
      this.pare = pare;
      this.coordenada;
      this.index = i;
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

  setCoordenada(c){
    this.coordenada = c
  }

  getCoordenada(){
    return this.coordenada
  }

  setIndex(i){
    this.index = i
  }

  getIndex(){
    return this.index
  }
}
