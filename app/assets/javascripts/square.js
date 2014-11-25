angular.module('MazeApp').service('Square', function(){
	
	function Square (x, y){
		this.dx = 15;
		this.dy = 15;
		this.x = x;
		this.y = y;
		this.collision = 0;
	}

	Square.prototype.enter = function(maze){
		this.maze = maze;
		maze.square = this;
		console.log(this.maze);
	};

	Square.prototype.move = function(tilt){
		
		switch (tilt) {
			case 'up':  /* Up arrow was pressed */
			if (this.y - this.dy > 0){
				this.y -= this.dy;
				this.maze.clear();
				this.checkCollision();
				if (this.collision == 1){
					this.y += this.dy;
					this.collision = 0;
				}
			}

			break;
			case 'down':  /* Down arrow was pressed */
			if (this.y + this.dy < this.maze.HEIGHT ){
				this.y += this.dy;
				this.maze.clear();
				this.checkCollision();
				if (this.collision == 1){
					this.y -= this.dy;
					this.collision = 0;
				}
			}

			break;
			case 'left':  /* Left arrow was pressed */
			if (this.x - this.dx > 0){
				this.x -= this.dx;
				clear();
				this.checkCollision();
				if (this.collision == 1){
					this.x += this.dx;
					this.collision = 0;
				}
			}
			break;
			case 'right':  /* Right arrow was pressed */
			if ((this.x + this.dx < this.maze.WIDTH)){
				this.x += this.dx;
				this.maze.clear();
				this.checkCollision();
				if (this.collision == 1){
					this.x -= this.dx;
					this.collision = 0;
				}
			}
			break;
		}


	};

	Square.prototype.checkCollision = function(){
		var imgd = this.maze.ctx.getImageData(x, y, 15, 15);
		var pix = imgd.data;
		for (var i = 0; n = pix.length, i < n; i += 4) {
			if (pix[i] == 0) {
				this.collision = 1;
			}
		}	
	};



	return Square

}); 