angular.module('Maze', ['pusher-angular']).controller('TiltCtrl', ['$scope', '$pusher', '$http', function($scope, $pusher, $http){
	
	var client = new Pusher('77f6df16945f47c63a1f');
	var pusher = $pusher(client);

	var tiltChannel = pusher.subscribe('private-tilt-channel');


	gyro.startTracking(function(o) {
		var o = {beta: o.beta, gamma: o.gamma}
		$scope.$apply(function(){$scope.gyro = o})

		tiltChannel.trigger('client-tilt', o)

		// $http.post('/control', o).success(function(data){console.log('Posted')});
	});

}]);