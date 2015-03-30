`
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();
  this.moveTo(x+r, y);
  this.arcTo(x+w, y,   x+w, y+h, r);
  this.arcTo(x+w, y+h, x,   y+h, r);
  this.arcTo(x,   y+h, x,   y,   r);
  this.arcTo(x,   y,   x+w, y,   r);
  this.closePath();
  return this;
}
`

angular.module("Maze").controller("AppCtrl", ["$scope", "$pusher", ($scope, $pusher) ->
  
  # --------------- PUSHER ------------- 

  # -- Pusher Initialization

  client = new Pusher("77f6df16945f47c63a1f")
  pusher = $pusher(client)
  tiltChannel = pusher.subscribe("presence-tilt-channel")

  # -- Event listeners

  # Whenever there is a new player, create a new square

  tiltChannel.bind "client-new-player", (user) -> new Square(390, 0, user.colour)

  # Whenever a member is removed, delete a square from the array of squares

  tiltChannel.bind 'pusher:member_removed', (user) -> Square.all = _.without(Square.all, Square.colour(user.id))

  # Whenver somebody has tilt their phone, move the square whose colour is assigned to that user

  tiltChannel.bind "client-tilt", (user) -> 
    square = Square.colour(user.colour)
    lastMove = square.lastMove
    square.move user.tilt
    if user.tilt isnt lastMove
      console.log "Change in direction! #{square.colour} is moving #{user.tilt}"



  # --------- SETTING UP AND DRAWING ON THE CANVAS ------- 

  WIDTH = HEIGHT = 1000
  img = new Image()
  img.src = "assets/plewmaze.png"
  canvas = document.getElementById("canvas")
  ctx = canvas.getContext("2d")

  rect = (x, y, w, h) ->
    ctx.roundRect(x, y, w, h, 3).fill()

  drawMaze = -> ctx.drawImage img, 0, 50

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
        else
          @lastMove = direction

    collision: ->
      imgd = ctx.getImageData(@x, @y, 15, 15)
      pix = imgd.data
      # console.log pix
      for i in [3..pix.length - 1 ] by 4  
        # console.log pix[i]
        # console.log(pix[i] < 200)
        return true if (pix[i] isnt 0)

])