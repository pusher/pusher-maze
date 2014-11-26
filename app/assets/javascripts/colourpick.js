angular.module('Maze', ['pusher-angular']).controller('ColorCtrl', ['$scope', '$http', '$pusher', function($scope, $http, $pusher){

	$scope.colors = [
		"red",
		"orange",
		"yellow",
		"green",
		"blue",
		"indigo",
		"violet"
	]

	var client = new Pusher('77f6df16945f47c63a1f');
	var pusher = $pusher(client);
	var colourChannel = pusher.subscribe('colour-channel');

	colourChannel.bind('colour_taken', function(choice){
		$scope.colors = _.without($scope.colors, choice.colour)
	});


}]);