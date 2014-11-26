function Square(){
	this.dx = 15;
	this.dy = 15;
	this.x = 425;
	this.y = 5;

	return setInterval(function(){draw(this.x, this.y)}, 10);
}

Square.prototype.move = function(){
	var startValue = (direction === "up" || direction === "down") ? "this.y" : "this.x"
	var operator = (direction === "up" || direction === "left") ? "-" : "+"
	var inverseOperator = (operator === "-") ? "+" : "-"
	var boundLimit = (direction === "down") ? HEIGHT : (direction === "right") ? WIDTH : 0 
	var boundMovement = (operator === "-") ? ">" : "<"

	var withinBounds = eval(startValue + " " + operator + " " + "d" + startValue + " " + boundMovement + " " + boundLimit);
	var move = startValue + " " + operator + "=" + " " + "d" + startValue;
	var moveBack = startValue + " " + inverseOperator + "=" + " " + "d" + startValue;

	if (withinBounds) {
		eval(move);
		clearSquare();
		if (checkcollision(this.x, this.y)){ eval(moveBack); }
	}
};