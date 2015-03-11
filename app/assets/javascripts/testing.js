var React = require('react');
var ReactCanvas = require('react-canvas');

var Surface = ReactCanvas.Surface;
var Image = ReactCanvas.Image;

var Square = require('./square');


var Maze = React.createClass({

	getInitialState: function() {
		return {
			squares: [],
			ctx: {} 

		};
	},

	componentWillMount: function() {
		// this.surface = this.refs.surface
		// this.ctx = this.surface.getContext();
	},

	componentDidMount: function() {
		// this.surface = this.refs.surface;
		// console.log(this.surface)
		this.setState({ctx: this.refs.surface.getContext()})
		console.log(this.state)
		// console.log(this.state.ctx)
	},

	render: function() {

		this.WIDTH = this.HEIGHT = 1000
		var SRC = "assets/mazeone1000.gif"
		var imageStyle = this.getImageStyle()

		return (
			<div>
				<Surface ref='surface' 
					width={this.WIDTH} 
					height={this.HEIGHT} 
					left={0} 
					top={0}
				>
			 		<Image src={SRC} style={imageStyle} />
			 		<Square />
				</Surface>
			</div>

		);
	},

	  getImageStyle: function () {
	    return {
	      top: 0,
	      left: 0,
	      width: this.WIDTH,
	      height: this.HEIGHT
	    };
	  }


});

$(document).ready(function(){
	React.render(<Maze/>, document.getElementById('maze')) 
})