app = angular.module("Maze").controller("AppCtrl", ["$scope", "$pusher", ($scope, $pusher) ->
    
  canvas = undefined
  ctx = undefined
  WIDTH = 1000
  HEIGHT = 1000
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

  checkCollision = (x, y) ->
    imgd = ctx.getImageData(x, y, 15, 15)
    pix = imgd.data
    for i in [1...pix.length] by 4  
      return true if pix[i] is 0


  class Square

    @all: []

    @colour: (colour) -> _.findWhere(@all, {colour: colour})

    constructor: (@x, @y, @colour) ->
      @dx = 15
      @dy = 15
      @constructor.all.push(@);

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
        if checkCollision(@x, @y)
          eval moveBack
          tiltChannel.trigger "client-collision", {colour: @colour}

  drawSquares = ->
    clearCanvas()
    drawMaze()
    drawOne(square) for square in Square.all;

  drawOne = (square) ->
    ctx.fillStyle = square.colour
    rect square.x, square.y, 15, 15 

  setInterval drawSquares, 1000

  client = new Pusher("77f6df16945f47c63a1f")
  pusher = $pusher(client)
  tiltChannel = pusher.subscribe("presence-tilt-channel")

  tiltChannel.bind "client-new-player", (member) ->
    new Square(475, 5, member.colour)

  tiltChannel.bind 'pusher:member_removed', (member) -> Square.all = _.without(Square.all, Square.colour(member.id));

  tiltChannel.bind "client-tilt", (member) ->
    square = Square.colour(member.colour)
    square.move member.tilt

])