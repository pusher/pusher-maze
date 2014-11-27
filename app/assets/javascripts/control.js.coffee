angular.module("Maze", ["pusher-angular"]).controller "TiltCtrl", ["$scope", "$pusher", "$http", ($scope, $pusher, $http) ->
    
  findMovementFrom = (tilt) ->
    sortable = []
    sortable.push [angle, tilt[angle]] for angle of tilt

    sorted = sortable.sort((a, b) -> Math.abs(b[1]) - Math.abs(a[1]))
    choice = sorted[0]

    movement = "up"  if choice[0] is "beta" and choice[1] < -10
    movement = "down"  if choice[0] is "beta" and choice[1] > 10
    movement = "right"  if choice[0] is "gamma" and choice[1] > 10
    movement = "left"  if choice[0] is "gamma" and choice[1] < -10
    
    $scope.$apply -> $scope.movement = movement

  client = new Pusher("77f6df16945f47c63a1f")
  pusher = $pusher(client)
  tiltChannel = pusher.subscribe("presence-tilt-channel")

  myColour = undefined

  tiltChannel.bind "pusher:subscription_succeeded", (members) ->
    myColour = $scope.colour = members.me.id
    tiltChannel.trigger "client-new-player", {colour: myColour}

  tiltChannel.bind "client-collision", (member) -> navigator.vibrate 100  if member.colour is myColour

  movement = undefined
  $scope.movement = null
  $scope.debugMode = true

  $scope.debugTrigger = (direction) ->
    tiltChannel.trigger "client-tilt", {colour: myColour, tilt: direction}

  gyro.startTracking (o) ->
    o = {beta: o.beta, gamma: o.gamma}
    findMovementFrom o
    if $scope.movement then tiltChannel.trigger "client-tilt", {colour: myColour, tilt: $scope.movement}

]