angular.module("Maze", ["pusher-angular", "ngSanitize"]).controller "TiltCtrl", ["$scope", "$pusher", "$http", ($scope, $pusher, $http) ->
    
  # --------------- PUSHER ------------- 
  
  # -- Pusher Initialization 

  client = new Pusher("77f6df16945f47c63a1f")
  pusher = $pusher(client)
  tiltChannel = pusher.subscribe("presence-tilt-channel")

  # -- Event listeners and triggers

  # Passing in 'up', 'down', 'left' and 'right', the phone triggers a client event with its own colour (as a kind of ID) and that movement
  
  $scope.triggerTilt = (movement) -> tiltChannel.trigger "client-tilt", {colour: $scope.colour, tilt: movement}

  # When the user successfully subscribes to the channel, the server assigns him a random colour.
  # The phone then triggers a client event saying a new player has joined, and passes over his colour.

  tiltChannel.bind "pusher:subscription_succeeded", (members) ->
    $scope.colour = members.me.id
    tiltChannel.trigger "client-new-player", {colour: $scope.colour}

  # If the maze triggers an event saying that user has collided with the wall, the phone vibrates for 100ms.
  
  tiltChannel.bind "client-collision", (member) -> navigator.vibrate 100  if member.colour is $scope.colour


  #  -----------------------------------

  $scope.directionGroups =  [["up"], ["left", "right"], ["down"]]

  # Try and find the intended movement (up, down, left right) and assign it to $scope.movement

  findMovementFrom = (tilt) ->
    sortable = []
    sortable.push [angle, tilt[angle]] for angle of tilt

    sorted = sortable.sort((a, b) -> Math.abs(b[1]) - Math.abs(a[1]))
    [axis, value] = [sorted[0][0], sorted[0][1]]

    movement = "up"  if axis is "beta" and value < -10
    movement = "down"  if axis is "beta" and value > 10
    movement = "right"  if axis is "gamma" and value > 10
    movement = "left"  if axis is "gamma" and value < -10
    
    $scope.$apply -> $scope.movement = movement

  $scope.debugMode = true # this is for my debugging - so that I'm able to trigger on click/touch


  # ---- GYROSCOPE CODE ----- 

  gyro.frequency = 200 # frequency set to 200ms

  gyro.startTracking (angles) ->
    angles = {beta: angles.beta, gamma: angles.gamma}
    findMovementFrom angles
    if $scope.movement then $scope.triggerTilt($scope.movement)

]