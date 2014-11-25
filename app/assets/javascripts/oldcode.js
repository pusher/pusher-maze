	// var canvas;
	// var ctx;
	// var dx = 15;
	// var dy = 15;
	// var x = 425;
	// var y = 5;
	// var WIDTH = 1000;
	// var HEIGHT = 1000;
	// var img = new Image();
	// var collision = 0;


	// function rect(x,y,w,h) {
	// 	ctx.beginPath();
	// 	ctx.rect(x,y,w,h);
	// 	ctx.closePath();
	// 	ctx.fill();
	// }

	// function clear() {
	// 	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	// 	ctx.drawImage(img, 0, 0);
	// }

	// function init() {
	// 	canvas = document.getElementById("canvas");
	// 	ctx = canvas.getContext("2d");
	// 	img.src = "assets/mazeone1000.gif";
	// 	return setInterval(draw, 10);
	// }

	// function moveSquare(tilt){

	// 	switch (tilt) {
	// 		case 'up':  /* Up arrow was pressed */
	// 		if (y - dy > 0){
	// 			y -= dy;
	// 			clear();
	// 			checkcollision();
	// 			if (collision == 1){
	// 				y += dy;
	// 				collision = 0;
	// 			}
	// 		}

	// 		break;
	// 		case 'down':  /* Down arrow was pressed */
	// 		if (y + dy < HEIGHT ){
	// 			y += dy;
	// 			clear();
	// 			checkcollision();
	// 			if (collision == 1){
	// 				y -= dy;
	// 				collision = 0;
	// 			}
	// 		}

	// 		break;
	// 		case 'left':  /* Left arrow was pressed */
	// 		if (x - dx > 0){
	// 			x -= dx;
	// 			clear();
	// 			checkcollision();
	// 			if (collision == 1){
	// 				x += dx;
	// 				collision = 0;
	// 			}
	// 		}
	// 		break;
	// 		case 'right':  /* Right arrow was pressed */
	// 		if ((x + dx < WIDTH)){
	// 			x += dx;
	// 			clear();
	// 			checkcollision();
	// 			if (collision == 1){
	// 				x -= dx;
	// 				collision = 0;
	// 			}
	// 		}
	// 		break;
	// 	}
	// }

	// function checkcollision() {
	// 	var imgd = ctx.getImageData(x, y, 15, 15);
	// 	var pix = imgd.data;
	// 	for (var i = 0; n = pix.length, i < n; i += 4) {
	// 		if (pix[i] == 0) {
	// 			collision = 1;
	// 		}
	// 	}
	// }

	// function draw() {
	// 	clear();
	// 	ctx.fillStyle = "purple";
	// 	rect(x, y, 15,15);
	// }


	// init();