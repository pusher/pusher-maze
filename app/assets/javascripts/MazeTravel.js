module.exports = MazeTravel = {

	moveSquare: function(user){
		var squares = this.state.squares;
		var square = _.findWhere(squares, {colour: user.colour})
		var modSquares = _.without(squares, square);

		var previousX = square.x
		var previousY = square.y

		switch (user.tilt){
			case 'up':
				if (square.y - square.dy > 0 ){ 
					square.y -= square.dy
				}
				break;
			case 'down':
				if (square.y + square.dy < this.HEIGHT){
					square.y += square.dy
				}
				break;
			case 'left':
				if (square.x - square.dx > 0 ) {
					square.x -= square.dx
				}
				break;
			case 'right':
				if (square.x + square.dx < this.WIDTH) {
					square.x += square.dx
				}
				break;
		}

		if (this.checkCollision(square)){
			square.x = previousX;
			square.y = previousY;
		}

		return modSquares.concat(square)
	},

	checkCollision: function(square){
		var ctx = this.getDOMNode().firstChild.firstChild.firstChild.getContext('2d');
		var imgd = ctx.getImageData(square.x, square.y, square.width, square.height);
		var pix = imgd.data;
		for (var i = 0; n = pix.length, i < n; i += 4) {
			if (pix[i] == 0) return true
		}
	}

}