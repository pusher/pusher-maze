module.exports = SquareCollection = {

	addSquare: function(user){
		var existingSquares = this.state.squares
		var square = {x: 475, y: 5, dx: 10, dy:10, colour: user.colour, height: this.props.squareSize, width: this.props.squareSize}
		return existingSquares.concat(square)
	},

	removeSquare: function(user){
		var squares = this.state.squares
		var square = _.findWhere(squares, {colour: user.id})
		return _.without(squares, square);
	}

}