angular.module('Maze', ['pusher-angular']).controller('ColorCtrl', ['$scope', '$http', function($scope, $http){

	$scope.colors = [
		"red",
		"orange",
		"yellow",
		"green",
		"blue",
		"indigo",
		"violet"

	]

}]);