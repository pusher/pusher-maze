var app = angular.module('Maze').controller('AppCtrl', ['$scope', '$pusher', function($scope, $pusher){

	var canvas;
	var ctx;
	var WIDTH = 1000;
	var HEIGHT = 1000;
	var img = new Image();

	var squares = [];

	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	img.src = "assets/mazeone1000.gif";

	function rect(x,y,w,h) {
		ctx.beginPath();
		ctx.rect(x,y,w,h);
		ctx.closePath();
		ctx.fill();
	}

	function drawMaze() { ctx.drawImage(img, 0, 0) }

	function clearCanvas(){	ctx.clearRect(0, 0, WIDTH, HEIGHT) }

	function checkCollision(x, y) {
		var imgd = ctx.getImageData(x, y, 15, 15);
		var pix = imgd.data;
		for (var i = 0; n = pix.length, i < n; i += 4) {
			if (pix[i] == 0) { return true }
		}
	}

	// Defining the Square object

	function Square(x, y, colour){
		this.dx = 15;
		this.dy = 15;
		this.x = x;
		this.y = y;
		this.colour = colour;
		squares.push(this);
	}

	function draw (){
		clearCanvas();
		drawMaze();

		_.each(squares, function(square){
			ctx.fillStyle = square.colour;
			rect(square.x, square.y, 15,15);
		});

	}

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
			if (checkCollision(this.x, this.y)){ eval(moveBack); }
		}
	};

	var squareOne = new Square(425, 5, "blue");

	var squareTwo = new Square(450, 5, "red");

	setInterval(draw, 1000)

	var client = new Pusher('77f6df16945f47c63a1f');
	var pusher = $pusher(client);
	var tiltChannel = pusher.subscribe('presence-tilt-channel');

	tiltChannel.bind('client-tilt', function(tilt){
		squareTwo.move(tilt);
	});

}]);