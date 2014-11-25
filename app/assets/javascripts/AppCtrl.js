angular.module('MazeApp', ['pusher-angular']).controller('AppCtrl', ['$scope', '$pusher', 'Maze', 'Square', function($scope, $pusher, Maze, Square){

	var maze = new Maze();
	var square = new Square(425, 5);


	maze.bla();
	// console.log(maze.ctx);

	// maze.assignSquare(square);
	square.enter(maze);

	// setInterval(maze.draw, 100);

	var client = new Pusher('77f6df16945f47c63a1f');
	var pusher = $pusher(client);
	var tiltChannel = pusher.subscribe('private-tilt-channel');

	tiltChannel.bind('client-tilt', function(tilt){
		// moveSquare(tilt);
	});


}]);