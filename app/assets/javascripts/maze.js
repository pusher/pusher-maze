var app = angular.module('Maze').controller('AppCtrl', ['$scope', '$pusher', function($scope, $pusher){

	var canvas;
	var ctx;
	var WIDTH = 1000;
	var HEIGHT = 1000;
	var img = new Image();
	var collision = 0;


	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	img.src = "assets/mazeone1000.gif";

	function rect(x,y,w,h) {
		ctx.beginPath();
		ctx.rect(x,y,w,h);
		ctx.closePath();
		ctx.fill();
	}

	function drawMaze() { 
		ctx.drawImage(img, 0, 0) 
	}

	function clearCanvas(){	ctx.clearRect(0, 0, WIDTH, HEIGHT) }

	Square.prototype.move = function(direction){
		var startValue = (direction === "up" || direction === "down") ? "y" : "x"
		var operator = (direction === "up" || direction === "left") ? "-" : "+"
		var inverseOperator = (operator === "-") ? "+" : "-"
		var boundLimit = (direction === "down") ? HEIGHT : (direction === "right") ? WIDTH : 0 
		var boundMovement = (operator === "-") ? ">" : "<"

		var withinBounds = eval("this." + startValue + " " + operator + " " + "this." +  "d" + startValue + " " + boundMovement + " " + boundLimit);
		var move = "this." +  startValue + " " + operator + "=" + " " + "this." + "d" + startValue;
		var moveBack = "this." +  startValue + " " + inverseOperator + "=" + " " + "this." +  "d" + startValue;

		if (withinBounds) {
			eval(move);
			if (checkcollision(this.x, this.y)){ eval(moveBack); }
		}
	};


	function checkcollision(x, y) {
		var imgd = ctx.getImageData(x, y, 15, 15);
		var pix = imgd.data;
		for (var i = 0; n = pix.length, i < n; i += 4) {
			if (pix[i] == 0) { return true }
		}
	}

	function draw(x, y) {
		clearCanvas();
		drawMaze();
		ctx.fillStyle = "purple";
		rect(x, y, 15,15);
	}

	function Square(){
		this.dx = 15;
		this.dy = 15;
		this.x = 425;
		this.y = 5;
	}

	Square.prototype.draw = function(){
		var self = this;
		setInterval(function(){draw(self.x, self.y)}, 1000);
}

	var square = new Square();
	square.draw();


	var client = new Pusher('77f6df16945f47c63a1f');
	var pusher = $pusher(client);
	var tiltChannel = pusher.subscribe('presence-tilt-channel');

	tiltChannel.bind('client-tilt', function(tilt){
		// controlSquare(tilt);
		square.move(tilt);
	});

}]);