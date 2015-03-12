/** @jsx React.DOM */

var React = require('react');
var ReactKinetic = require('react-kinetic');
var _ = require('underscore');

var Stage = ReactKinetic.Stage;
var Layer = ReactKinetic.Layer;
var KImage = ReactKinetic.Image;
var Rect = ReactKinetic.Rect;

var MazeTravel = require('./MazeTravel');
var SquareCollection = require('./SquareCollection');

var MazeImg = new Image();
MazeImg.src = "assets/mazeone1000.gif"

var Maze = React.createClass({

	getInitialState: function() {
		return {
			squares: []
		};
	},

	componentWillMount: function() {
		this.pusher = new Pusher("77f6df16945f47c63a1f");
		this.tiltChannel = this.pusher.subscribe("presence-tilt-channel");

		_.extend(this, MazeTravel, SquareCollection);
	},

	componentDidMount: function() {

		this.tiltChannel.bind('client-new-player', function(user){
			var updatedSquares = this.addSquare(user);
			this.setState({squares: updatedSquares})
		}, this);

		this.tiltChannel.bind('client-tilt', function(user){
			var updatedSquares = this.moveSquare(user);
			this.setState({squares: updatedSquares});
		}, this);

		this.tiltChannel.bind('pusher:member_removed', function(user){
			var updatedSquares = this.removeSquare(user);
			this.setState({squares: updatedSquares})
		}, this);

	},

	componentWillUnmount: function() {
		this.pusher.disconnect()
	},

	render: function() {

		var squares = this.state.squares.map(function(square){
			return (
				<Rect 	x={square.x}
						y={square.y} 
						fill={square.colour} 
						stroke={square.colour} 
						height={square.height}
						width={square.width} />
			);
		});

		return (
			<Stage
				width={this.props.width} 
				height={this.props.height} 
				left={0} 
				top={0}
			>
				<Layer>
    				  <KImage x="0" y="0"
			              image={MazeImg}
			              width={this.props.width} height={this.props.height}/>

		              {squares}

				</Layer>
			</Stage>

		);

	},

});

$(document).ready(function(){
	MazeImg.onload = function(){
		React.renderComponent(
			<Maze height={1000} width={1000} squareSize={15} />, 
			document.getElementById('maze')) 		
		}

})