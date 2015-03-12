/** @jsx React.DOM */

var React = require('react');
var ReactKinetic = require('react-kinetic');

var Rect = ReactKinetic.Rect;

var Square = React.createClass({

	getInitialState: function() {
		return {
			x: 0,
			y: 0
		};
	},

	getDefaultProps: function() {
		return {
			width: "15",
			height: "15"
		};
	},

	render: function() {
		return (
			<Rect 	x={this.state.x} 
					y={this.state.y} 
					fill={this.props.colour} 
					stroke={this.props.colour} 
					height={this.props.height}
					width={this.props.width} />
		);
	}

});

module.exports = Square;