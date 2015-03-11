angular.module("Maze").controller("AppCtrl", ["$scope", "$pusher", ($scope, $pusher) ->
  
  # --------------- PUSHER ------------- 

  # -- Pusher Initialization

  client = new Pusher("77f6df16945f47c63a1f")
  pusher = $pusher(client)
  tiltChannel = pusher.subscribe("presence-tilt-channel")

  # -- Event listeners

  # Whenever there is a new player, create a new square

  tiltChannel.bind "client-new-player", (user) -> new Square(475, 5, user.colour)

  # Whenever a member is removed, delete a square from the array of squares

  tiltChannel.bind 'pusher:member_removed', (user) -> Square.all = _.without(Square.all, Square.colour(user.id))

  # Whenver somebody has tilt their phone, move the square whose colour is assigned to that user

  tiltChannel.bind "client-tilt", (user) -> Square.colour(user.colour).move user.tilt


  # --------- SETTING UP AND DRAWING ON THE CANVAS ------- 

  WIDTH = HEIGHT = 1000
  img = new Image()
  img.src = "assets/mazeone1000.gif"
  canvas = document.getElementById("canvas")
  ctx = canvas.getContext("2d")

  rect = (x, y, w, h) ->
    ctx.beginPath()
    ctx.rect x, y, w, h
    ctx.closePath() 
    ctx.fill()

  drawMaze = -> ctx.drawImage img, 0, 0

  clearCanvas = -> ctx.clearRect 0, 0, WIDTH, HEIGHT

  drawSquares = ->
    clearCanvas()
    drawMaze()
    drawOne(square) for square in Square.all;

  drawOne = (square) ->
    ctx.fillStyle = square.colour
    rect square.x, square.y, 15, 15 

  setInterval drawSquares, 100 # redraws canvas every 100ms

  # -------- THE SQUARE CLASS -------

  class Square

    # class methods

    @all: []

    @colour: (colour) -> _.findWhere(@all, {colour: colour})

    # instance methods

    constructor: (@x, @y, @colour) ->
      @dx = @dy = 15
      @constructor.all.push(@)

    move: (direction) ->
      startValue = (if (direction is "up" or direction is "down") then "y" else "x")
      operator = (if (direction is "up" or direction is "left") then "-" else "+")
      inverseOperator = (if (operator is "-") then "+" else "-")
      boundLimit = (if (direction is "down") then HEIGHT else (if (direction is "right") then WIDTH else 0))
      boundMovement = (if (operator is "-") then ">" else "<")
      
      withinBounds = eval("this." + startValue + " " + operator + " " + "this." + "d" + startValue + " " + boundMovement + " " + boundLimit)
      move = "this." + startValue + " " + operator + "=" + " " + "this." + "d" + startValue
      moveBack = "this." + startValue + " " + inverseOperator + "=" + " " + "this." + "d" + startValue
      
      if withinBounds
        eval move
        if @collision()
          eval moveBack
          tiltChannel.trigger "client-collision", {colour: @colour}

    collision: ->
      imgd = ctx.getImageData(@x, @y, 15, 15)
      pix = imgd.data
      console.log pix
      for i in [1...pix.length] by 4  
        return true if pix[i] is 0

])