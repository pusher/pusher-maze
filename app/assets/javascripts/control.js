angular.module('Maze' ,['pusher-angular']).controller('TiltCtrl', ['$scope', '$pusher', '$http', function($scope, $pusher, $http){
	
	var client = new Pusher('77f6df16945f47c63a1f');
	var pusher = $pusher(client);
	var tiltChannel = pusher.subscribe('presence-tilt-channel');
	var myColour;

	tiltChannel.bind('pusher:subscription_succeeded', function(members){
		myColour = $scope.colour = members.me.id;
		tiltChannel.trigger('client-new-player', {colour: myColour});
	});

	tiltChannel.bind('client-collision', function(member){
		if (member.colour === myColour) navigator.vibrate(500);
	})



	var movement;
	$scope.movement = null;

	$scope.debugMode = true;

	function findMovementFrom(tilt){
		var sortable = [];

		for (var angle in tilt) { sortable.push([angle, tilt[angle]]) }

		var sorted = sortable.sort(function(a, b){ return Math.abs(b[1]) - Math.abs(a[1])})
		var choice = sorted[0];

		if (choice[0] === 'beta' && choice[1] < -10) movement = 'up';
		if (choice[0] === 'beta' && choice[1] > 10) movement = 'down';
		if (choice[0] === 'gamma' && choice[1] > 10) movement = 'right';
		if (choice[0] === 'gamma' && choice[1] < -10 ) movement = 'left';

		$scope.$apply(function(){$scope.movement = movement})
	}

	$scope.debugTrigger = function(direction){
		tiltChannel.trigger('client-tilt', {colour: myColour, tilt: direction});
	}

	gyro.startTracking(function(o) {
		// if ($scope.debugMode) return;
		var o = {beta: o.beta, gamma: o.gamma}
		findMovementFrom(o);
		if ($scope.movement) tiltChannel.trigger('client-tilt', {colour: myColour, tilt: $scope.movement});
	});


}]);