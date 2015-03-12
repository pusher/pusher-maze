/** @jsx React.DOM */

var React = require('react');
var ReactKinetic = require('react-kinetic');
var _ = require('underscore');

var Stage = ReactKinetic.Stage;
var Layer = ReactKinetic.Layer;
var KImage = ReactKinetic.Image;
var Rect = ReactKinetic.Rect;

var Square = require('./square');

var MazeImg = new Image();
MazeImg.src = "assets/mazeone1000.gif"

var Maze = React.createClass({

	getInitialState: function() {
		return {
			squares: []
		};
	},

	componentWillMount: function() {
		this.pusher = new Pusher("77f6df16945f47c63a1f")
		this.tiltChannel = this.pusher.subscribe("presence-tilt-channel")	
	},

	componentDidMount: function() {

		this.tiltChannel.bind('client-new-player', function(user){
			this.setState({squares: this.state.squares.concat({x: 0, y: 0, dx: 15, dy:15, colour: user.colour})})
		}, this);

		this.tiltChannel.bind('client-tilt', function(user){
			this.moveSquare(user.colour, user.tilt)
		}, this);

		this.tiltChannel.bind('pusher:member_removed', function(user){
			this.removeSquare(user.id)
		}, this);

	},

	componentWillUnmount: function(nextProps, nextState) {
		this.pusher.disconnect()
	},

	removeSquare: function(colour){
		var squares = this.state.squares
		var square = _.findWhere(squares, {colour: colour})
		var modSquares = _.without(squares, square);
		this.setState({squares: modSquares})
	},

	moveSquare: function(colour, direction){
		var squares = this.state.squares;
		var square = _.findWhere(squares, {colour: colour})
		var modSquares = _.without(squares, square);
		var previousX = square.x
		var previousY = square.y

		switch (direction){
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

		if (this.checkCollision(square.x, square.y)){square.x = previousX ; square.y = previousY}
		this.setState({squares: modSquares.concat(square)})
	},

	checkCollision: function(x, y){
		var ctx = this.getDOMNode().firstChild.firstChild.firstChild.getContext('2d')
		var imgd = ctx.getImageData(x, y, 15, 15);
		var pix = imgd.data;
		for (var i = 0; n = pix.length, i < n; i += 4) {
			if (pix[i] == 0) return true
		}
	},

	render: function() {

		this.HEIGHT 	= 1000
		this.WIDTH 		= 1000

		var squares = this.state.squares.map(function(square){
			return (
				<Rect 	x={square.x}
						y={square.y} 
						fill={square.colour} 
						stroke={square.colour} 
						height="15"
						width="15" />
			);
		});



		return (
			<Stage
				width={this.WIDTH} 
				height={this.HEIGHT} 
				left={0} 
				top={0}
			>
				<Layer>
    				  <KImage x="0" y="0"
			              image={MazeImg}
			              width="1000" height="1000"/>
		              {squares}
				</Layer>
			</Stage>

		);

	},

});

$(document).ready(function(){
	MazeImg.onload = function(){
		React.renderComponent(
			<Maze />, 
			document.getElementById('maze')) 		
		}

})