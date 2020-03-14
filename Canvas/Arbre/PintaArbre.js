//import Arbregen from "Arbregen.js";

class PintaArbre{

  constructor(elementId, selector){
    this.canvas = document.getElementById(elementId);
    this.ctx = this.canvas.getContext("2d");

    //Tamany del radi
    this.radi = 15;

    //El nom del selector que anirem actualitzant amb els nodes de l'arbre
    this.selector = selector;

    //Coordenades inicials
    this.posx = this.canvas.getAttribute('width')/2;
    this.posy = this.canvas.getAttribute('height')/2;

    this.arbre = new Arbregen(30);
  }

  pintaNode(n){
    this.ctx.beginPath();
    this.ctx.fillStyle = "#000000";
    var coordenada = n.getCoordenada()
    this.ctx.fillText(n.getNum(), coordenada.getPosX() - this.ctx.measureText(n.getNum()).width/2, coordenada.getPosY());
    this.ctx.arc(coordenada.getPosX(),coordenada.getPosY(), this.radi, 0, 2 * Math.PI);
    this.ctx.stroke();
    //FALTA PINTAR LES DUES FLETXES EN EL CAS DE TENIR FILLS
  }

  pintaArbre(){
    var prmax = this.arbre.trobatProfunditat()
    var llista = [];
    this.arbre.preOrdre(this.arbre.arrel,llista);
    for (var i = 0; i < llista.length; i++) {
      var c = this.createPosition(prmax, llista[i].getIndex().profunditat, llista[i].getIndex().index, this.canvas.getAttribute('width'), this.canvas.getAttribute('height'))
      llista[i].setCoordenada(c)
      console.log(c)
      this.pintaNode(llista[i])
    }
  }

  createPosition(profunditatMax, profunditat, index,  canvasWidth, canvasHeight){
    var x = index * canvasWidth / (2^profunditat + 1)
    var y = profunditat * canvasHeight / profunditatMax
    if ( isNaN(x) || x == Infinity ) {
      x = 0
    }
    if (isNaN(y) || y == Infinity) {
      y = 0
    }
    return new Coordenada(y,x)
  }

  inserirNouNode(){
    let elem = prompt("Número: ");
    if(elem == null) return;
    this.arbre.inserirNouNode(elem);
    this.actualitzarSelector();
    this.pintaArbre()
  }

  eliminarNode(){
    let s = document.getElementById(this.selector);
    this.arbre.eliminarNode(s.value);
    this.actualitzarSelector();
  }

  reiniciaArbre(){
    this.arbre.buidaArbre()
    this.actualitzarSelector()
  }

  actualitzarSelector(){
    let s = document.getElementById(this.selector);
    //Eliminam les opcions antigues
    for(var i = s.options.length; i >= 0; i--){
			s.remove(i);
		}
    //Cream la llista dels nodes amb un preordre
    var llista = [];
    this.arbre.preOrdre(this.arbre.arrel,llista);
    /*for (var i = 0; i < llista.length; i++) {
      console.log(llista[i].getIndex())
    }
    console.log("========================================")*/
    //Cream les noves opcions
    for (var i = 0; i < llista.length; i++) {
			let option = document.createElement("option");
      let n = llista[i].getNum();
			option.text = n;
			option.value = n;
			s.add(option);
    }
  }

  /**
	 * This method moves left branches as far right as they can legally go..
	 * @param {Number|Array} lastUsedPositionAtDepthArray An array to track what is the last right position used.
	 * @param {Number} depth The current depth in the tree
	 * @returns {Number|Array} An array of how much each level can be safely shifted to the right
	 */
	TreeNode.prototype._shiftLeftNodesRight = function(lastUsedPositionAtDepthArray, depth) {
		var result;
		if (!this.IsLeaf()) {
			// Go through the right nodes and get information of how far it could be shifted to the right. This
			// will not be used and is to be returned to the caller.
			var rightInfo = this.right._shiftLeftNodesRight(lastUsedPositionAtDepthArray, depth+1);

			// Go through the left nodes and get information of how far those nodes can be shifted to the right.
			var leftInfo = this.left._shiftLeftNodesRight(lastUsedPositionAtDepthArray, depth+1);

			// How far can the current node be shifted to the right, assuming it doesn't conflict with an existing node and
			// is still to the left of the right node.
			var currRightLimit = Math.min(lastUsedPositionAtDepthArray[depth] - 2, this.right.xPos - 1);
			var currLeftLimit = this.xPos;    // The current node is already at its furthest left limit

			// Get the minimum distance the left nodes can be shifted.
			var leftMin = Math.min.apply(null, leftInfo);

			// How far can the left nodes be shifted, while still being to the left of the current node's rightmost limit
			var leftDeltaPossible = Math.min(leftMin, currRightLimit - 1 - this.left.xPos);

			// If there is space, shift the left nodes as much as possible.
			if (leftDeltaPossible > 0) {
				this.left._shiftTree(leftDeltaPossible, lastUsedPositionAtDepthArray, depth+1);
			}

			// Determine the ideal position for the current node, in between its two branches. This is where
			// we may get non-integer value, but since we will be done calculating positions after this, it
			// is acceptable.
			var idealCurrPosition = (this.left.xPos + this.right.xPos) / 2.0;
			this.xPos = _clamp(currLeftLimit, idealCurrPosition, currRightLimit);

			// Replace the leftInfo with the rightInfo, up to the depth of the right info.
			// Subtract slide from leftInfo
			var i;
			for (i = 0 ; i < rightInfo.length; i+=1) {
				leftInfo[i] = rightInfo[i];
			}
			for (i=i ; i < leftInfo.length; i+=1) {
				leftInfo[i] -= leftDeltaPossible;
			}
			result = leftInfo;
		}
		else {
			result = [];
		}
		// Add current level to the result
		result.unshift(lastUsedPositionAtDepthArray[depth] - 2 - this.xPos);

		// Update lastUsedPositionAtDepthArray with this level's information
		lastUsedPositionAtDepthArray[depth] = this.xPos;

		return result;
	};

	function _clamp(min, num, max) { return Math.max(min, Math.min(num, max));}
}
