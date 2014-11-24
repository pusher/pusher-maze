angular.module('Maze', ['pusher-angular']).controller('TiltCtrl', ['$scope', '$pusher', '$http', function($scope, $pusher, $http){
	
	var client = new Pusher('77f6df16945f47c63a1f');
	var pusher = $pusher(client);
	var tiltChannel = pusher.subscribe('private-tilt-channel');


	var movement;
	$scope.movement = null;

	function findMovementFrom(tilt){
		var sortable = [];

		for (var angle in tilt) {
			sortable.push([angle, tilt[angle]])
		}

		var sorted = sortable.sort(function(a, b){ return Math.abs(b[1]) - Math.abs(a[1])})
		var choice = sorted[0];

		if (choice[0] === 'beta' && choice[1] < -10) movement = 'up';
		if (choice[0] === 'beta' && choice[1] > 10) movement = 'down';
		if (choice[0] === 'gamma' && choice[1] > 10) movement = 'right';
		if (choice[0] === 'gamma' && choice[1] < -10 ) movement = 'left';

		// $scope.movement = movement
		$scope.$apply(function(){$scope.movement = movement})
	}

	gyro.startTracking(function(o) {
		var o = {beta: o.beta, gamma: o.gamma}
		findMovementFrom(o);
		if ($scope.movement) tiltChannel.trigger('client-tilt', $scope.movement);

	});

}]);