// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}


function Ball(x,y,velX,velY,color,size){
	this.x = x;
	this.y = y;
	this.velX = velX;
	this.velY = velY;
	this.color = color;
	this.size = size;
}
Ball.prototype.draw = function (){
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
	ctx.fill();

};

Ball.prototype.update = function() {

	if((this.x + this.size) >= width) {
		this.velX = -(this.velX);
	}

	if((this.x - this.size) <= 0) {
		this.velX = -(this.velX);
	}

	if((this.y + this.size) >= height) {
		this.velY = -(this.velY);
	}

	if((this.y - this.size) <= 0) {
		this.velY = -(this.velY);
	}

	this.x += this.velX;
	this.y += this.velY;

};

var balls = [];

function loop() {
  	ctx.fillStyle = 'rgba(0,0,0,0.5)';
  	ctx.fillRect(0,0,width,height);

	while(balls.length<25){
		var size = random(10,20);
		var ball = new Ball(
			random(0+size, width - size),
			random(0+size, height - size),
			random(-7,7),
			random(-7,7),
			'rgb('+random(0,255)+','+random(0,255)+','+random(0,255)+')',
			size
			);
			
		balls.push(ball);
	}

	Ball.prototype.collisionDetector = function(){
		for (var a = 0; a < balls.length; a++) {
			if (!this == balls[a]) {
				var dx = this.x - balls[a].x;
				var dy = this.y - balls[a].y;
				var dist = Math.sqrt(dx*dx + dy*dy);

				if (dist < (this.size + balls[a].size)) {
				balls[a].color = this.color = 'rgb('+random(0,255)+','+random(0,255)+','+random(0,255)+')';
				}
			}
		}

	}


	for (var i = 0; i < balls.length; i++) {
		balls[i].draw();
		balls[i].update();
		balls[i].collisionDetector();
	}

	requestAnimationFrame(loop);

}





loop();




