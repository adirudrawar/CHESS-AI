var tileSize=100;
var movingPiece;
var moving= false;
var test;
var whiteMoves=true;

function setup() {
	createCanvas(800, 800);
	test = new Board();
}

function draw() {

background(100);
showGrid();
test.show();
}


//Shows the black and white grid
function showGrid(){
	for(var i=0;i<8;i++){
		for(var j=0;j<8;j++){
			if ((i + j) % 2 != 0) {
        		fill(255,153,0);   //0 is for black
      		} else {
        		fill(255,255,255); //255 is for white
		      }
      		noStroke();
		    rect(i * tileSize, j * tileSize, tileSize, tileSize);
		}
	}
}


function keyPressed(){}

function mousePressed(){
	var x = floor(mouseX/tileSize);
	var y = floor(mouseY/tileSize);

		//movingPiece = test.getPiece(x,y);
	if(!moving){
			movingPiece = test.getPiece(x,y);
		if(movingPiece!=null && movingPiece.white==whiteMoves ){
			//  print("True");
		//movingPiece = test.getPiece(x,y);
		movingPiece.movingThisPiece = true;
		}else{return;}
	}else{
		if(movingPiece.canMove(x,y)){
		movingPiece.move(x,y);
		movingPiece.movingThisPiece = false	;
		whiteMoves=!whiteMoves;
	}
		else{
			movingPiece.movingThisPiece=false;
		}
	}
	moving = !moving;
}
