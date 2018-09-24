class Piece{
	constructor(x,y,isWhite,letter){

	this.matrixPosition = createVector(x,y);
	this.pixelPosition = createVector(x * tileSize + tileSize / 2,y * tileSize + tileSize / 2);

	this.taken = false;
	this.white = isWhite;
	this.letter = letter;
	this.movingThisPiece = false;

	}

	show(){
		if(!this.taken){
		textSize(30);
		strokeWeight(10);
		if(this.white){
			fill(255);
			stroke(0);
		}else{
			fill(30);
			stroke(255);
		}
		textAlign(CENTER,CENTER);
		if(this.movingThisPiece){
		text(this.letter,this.mouseX,this.mouseY);
		}else{
		text(this.letter,this.pixelPosition.x,this.pixelPosition.y);
		}
	}
}

  	move(x,y){

			var attacking=test.getPiece(x,y);
			if(attacking!=null){
				attacking.taken =true;
			}


		this.matrixPosition =createVector(x,y);
		this.pixelPosition= createVector(x* tileSize + tileSize / 2, y * tileSize + tileSize / 2);



	}

	canMove(x,y){return true;}

//This function is for checking if the moving position has a piece on it or not
	attackingAllies(x,y){
		var attacking=test.getPiece(x,y);
		if(attacking!=null){
			if(attacking.white==this.white){
					//if they are of the same colour
				return true;
			}
		}
		return false;
}
//This function is to check if the path of the moving piece is over another piece
		moveThroughPieces(x, y){
	    var stepDirectionX = x - this.matrixPosition.x;
	    if (stepDirectionX > 0) {
	      stepDirectionX = 1;
	    } else if (stepDirectionX < 0) {
	      stepDirectionX = -1;
	    }
	    var stepDirectionY = y - this.matrixPosition.y;
	    if (stepDirectionY > 0) {
	      stepDirectionY = 1;
	    } else if (stepDirectionY < 0) {
	      stepDirectionY = -1;
	    }
	    var tempPos = createVector(this.matrixPosition.x, this.matrixPosition.y);
	    tempPos.x += stepDirectionX;
	    tempPos.y += stepDirectionY;
	    while (tempPos.x != x || tempPos.y != y) {

	      if (test.getPiece(tempPos.x, tempPos.y) != null) {
	        return true;
	      }
	      tempPos.x += stepDirectionX;
	      tempPos.y += stepDirectionY;
	    }

	    return false;
	  }

}


class King extends Piece{
	constructor(x,y,isWhite){
	super(x,y,isWhite);
	this.letter="K";
	}

	canMove(x,y){
			//King is not in need of movethrough function because it can only move one space
		if (this.attackingAllies(x, y)) {
      return false;
    }


		if(abs(x-this.matrixPosition.x)<=1 && abs(y-this.matrixPosition.y)<=1){
			return true;
		}
		return false;
	}
}

class Queen extends Piece{
	constructor(x,y,isWhite){
	super(x,y,isWhite);
	this.letter="Q";
	}
	canMove(x,y){

		if (this.attackingAllies(x, y)) {
      return false;
    }

		if(x==this.matrixPosition.x|| y== this.matrixPosition.y){
			if(this.moveThroughPieces(x,y)){return false;}
		return true;
	}

	if(abs(x-this.matrixPosition.x)==abs(y-this.matrixPosition.y)){
		if(this.moveThroughPieces(x,y)){return false;}
	return true;
	}
	return false;

	}
}


class Bishop extends Piece{
	constructor(x,y,isWhite){
	super(x,y,isWhite);
	this.letter="B";
	}
	canMove(x,y){

		if (this.attackingAllies(x, y)) {
			return false;
		}

		if(abs(x-this.matrixPosition.x)==abs(y-this.matrixPosition.y)){
			if(this.moveThroughPieces(x,y)){return false;}
	return true;}
	}
}



class Knight extends Piece{
	constructor(x,y,isWhite){
	super(x,y,isWhite);
	this.letter="Knt";
	}
	canMove(x,y){

		if (this.attackingAllies(x, y)) {
      return false;
    }


		if ((abs(x - this.matrixPosition.x) == 2 && abs(y - this.matrixPosition.y) == 1) ||
    	(abs(x - this.matrixPosition.x) == 1 && abs(y - this.matrixPosition.y) == 2)) {
      return true;
    	}
    	return false;
	}
}

class Rook extends Piece{
	constructor(x,y,isWhite){
	super(x,y,isWhite);
	this.letter="R";
	}
	//canMove(x,y){}
	canMove(x,y){

		if (this.attackingAllies(x, y)) {
      return false;
    }

		if(x==this.matrixPosition.x|| y== this.matrixPosition.y){if(this.moveThroughPieces(x,y)){return false;}
		return true;
	}}
}


class Pawn extends Piece{
	constructor(x,y,isWhite){
	super(x,y,isWhite);
	this.letter="P";
	this.firstTurn=true;
	}
	canMove(x,y){


		if (this.attackingAllies(x, y)) {
      return false;
    }

		var attack=test.getPiece(x,y);
		//when Attacking
		if(attack){
			if(abs(x - this.matrixPosition.x) == abs(y - this.matrixPosition.y) &&
        ((this.white && (y - this.matrixPosition.y) == -1) || (!this.white &&
          (y - this.matrixPosition.y) == 1))) {
        this.firstTurn = false;
        return true;
      }
      return false;

		}


		if (x != this.matrixPosition.x) {
				return false;
			}
			if (this.firstTurn && ((this.white && y - this.matrixPosition.y == -2) ||
				(!this.white && y - this.matrixPosition.y == 2))) {
					if(this.moveThroughPieces(x,y)){return false;}

				this.firstTurn = false;
				return true;
			}

    if ((this.white && y - this.matrixPosition.y == -1) ||
			 (!this.white && y - this.matrixPosition.y == 1)) {
				 if(this.moveThroughPieces(x,y)){return false;}
      this.firstTurn = false;
      return true;
    }
	//	return false;


    return false;
	}
}
