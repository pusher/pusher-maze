var app = angular.module('Maze').controller('AppCtrl', ['$scope', '$pusher', function($scope, $pusher){

	var canvas;
	var ctx;
	var dx = 15;
	var dy = 15;
	var x = 425;
	var y = 5;
	var WIDTH = 1000;
	var HEIGHT = 1000;
	var img = new Image();
	var collision = 0;


	function rect(x,y,w,h) {
		ctx.beginPath();
		ctx.rect(x,y,w,h);
		ctx.closePath();
		ctx.fill();
	}

	function clear() {
		ctx.clearRect(0, 0, WIDTH, HEIGHT);
		ctx.drawImage(img, 0, 0);
	}

	function init() {
		canvas = document.getElementById("canvas");
		ctx = canvas.getContext("2d");
		img.src = "assets/mazeone1000.gif";
		return setInterval(draw, 10);
	}


	function controlSquare(direction){
		var startValue = (direction === "up" || direction === "down") ? "y" : "x"
		var operator = (direction === "up" || direction === "left") ? "-" : "+"
		var inverseOperator = (operator === "-") ? "+" : "-"
		var boundLimit = (direction === "down") ? HEIGHT : (direction === "right") ? WIDTH : 0 
		var boundMovement = (operator === "-") ? ">" : "<"
		var withinBounds = eval(startValue + " " + operator + " " + "d" + startValue + " " + boundMovement + " " + boundLimit)
		
		if (withinBounds) {
			eval(startValue + " " + operator + "=" + " " + "d" + startValue);
			clear();
			checkcollision();
			if (collision == 1){
				eval(startValue + " " + inverseOperator + "=" + " " + "d" + startValue);
				collision = 0
			}
		}

	};

	function checkcollision() {
		var imgd = ctx.getImageData(x, y, 15, 15);
		var pix = imgd.data;
		for (var i = 0; n = pix.length, i < n; i += 4) {
			if (pix[i] == 0) {
				collision = 1;
			}
		}
	}

	function draw() {
		clear();
		ctx.fillStyle = "purple";
		rect(x, y, 15,15);
	}


	init();


	var client = new Pusher('77f6df16945f47c63a1f');
	var pusher = $pusher(client);
	var tiltChannel = pusher.subscribe('private-tilt-channel');

	tiltChannel.bind('client-tilt', function(tilt){
		controlSquare(tilt);
	});


}]);