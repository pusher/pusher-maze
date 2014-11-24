var app = angular.module('Maze').controller('AppCtrl', ['$scope', '$pusher', function($scope, $pusher){

	var canvas;
	var ctx;
	var dx = 5;
	var dy = 5;
	var x = 200;
	var y = 5;
	var WIDTH = 482;
	var HEIGHT = 482;
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
		img.src = "assets/maze.gif";
		return setInterval(draw, 10);
	}



	function moveSquare(tilt){

		var sortable = [];

		for (var angle in tilt) {
			sortable.push([angle, tilt[angle]])
		}

		var sorted = sortable.sort(function(a, b){ return Math.abs(b[1]) - Math.abs(a[1])})
		console.log(sorted);
		// console.log(sorted);
		var choice = sorted[0];
		console.log(choice);
		var movement;

		if (choice[0] === 'beta' && choice[1] < -10) movement = 'up';
		if (choice[0] === 'beta' && choice[1] > 10) movement = 'down';
		if (choice[0] === 'gamma' && choice[1] > 10) movement = 'right';
		if (choice[0] === 'gamma' && choice[1] < -10 ) movement = 'left';

		console.log(movement);

		switch (movement) {
			case 'up':  /* Up arrow was pressed */
			if (y - dy > 0){
				y -= dy;
				clear();
				checkcollision();
				if (collision == 1){
					y += dy;
					collision = 0;
				}
			}

			break;
			case 'down':  /* Down arrow was pressed */
			if (y + dy < HEIGHT ){
				y += dy;
				clear();
				checkcollision();
				if (collision == 1){
					y -= dy;
					collision = 0;
				}
			}

			break;
			case 'left':  /* Left arrow was pressed */
			if (x - dx > 0){
				x -= dx;
				clear();
				checkcollision();
				if (collision == 1){
					x += dx;
					collision = 0;
				}
			}
			break;
			case 'right':  /* Right arrow was pressed */
			if ((x + dx < WIDTH)){
				x += dx;
				clear();
				checkcollision();
				if (collision == 1){
					x -= dx;
					collision = 0;
				}
			}
			break;
		}
	}

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


	elem = document.getElementById('test');

	tiltChannel.bind('client-tilt', function(tilt){
		moveSquare(tilt);
	});


}]);