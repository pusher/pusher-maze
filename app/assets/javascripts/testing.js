/** @jsx React.DOM */


var React = require('react');

var ReactKinetic = require('react-kinetic');

var Stage = ReactKinetic.Stage;
var Layer = ReactKinetic.Layer;
var KImage = ReactKinetic.Image;

var MazeImg = new Image();
MazeImg.src = "assets/mazeone1000.gif"

var Maze = React.createClass({

	getInitialState: function() {
		return {
			squares: [],
			ctx: {} 

		};
	},

	componentWillMount: function() {

	},

	componentDidMount: function() {
	},

	render: function() {

		this.WIDTH = this.HEIGHT = 1000

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
				</Layer>
			</Stage>

		);

	},

});

$(document).ready(function(){
	MazeImg.onload = function(){
		console.log('img lded')
		React.renderComponent(
			<Maze />, 
			document.getElementById('maze')) 		
		}

})