function Player(mark){
  this.mark = mark;
  this.spaces = [];
}

function Space(xCoordinate, yCoordinate) {
  this.xCoordinate = xCoordinate;
  this.yCoordinate = yCoordinate;
  this.markedBy = "";
}

Space.prototype.markBy = function(player){
  this.markedBy = player;
  player.spaces.push(this);
}

function Board() {
  this.spaces = [];
  for (var y = 1; y <= 3; y++) {
    for (var x = 1; x <= 3; x++) {
      this.spaces.push(new Space(x, y));
    }
  }
}

Board.prototype.find = function(xCoordinate, yCoordinate){
  for (var i = 0; i <= 8; i++){
    if (this.spaces[i].xCoordinate === xCoordinate && this.spaces[i].yCoordinate === yCoordinate){
      return this.spaces[i];
    }
  }
}

Board.prototype.checkWin = function(player) {
  var playerSpaces = player.spaces;
  for (var i = 1; i <= 3; i ++) {
    var winXYArrayDown = playerSpaces.filter(function(value) {
      return value.xCoordinate === value.yCoordinate;
    })
    var winXYArrayUp = playerSpaces.filter(function(value) {
      return (value.xCoordinate === 1 && value.yCoordinate === 3) || (value.xCoordinate === 2 && value.yCoordinate === 2) || (value.xCoordinate === 3 && value.yCoordinate === 1);
    })
    var winXArray = playerSpaces.filter(function(value) {
      return value.xCoordinate === i;
    });
    var winYArray = playerSpaces.filter(function(value) {
      return value.yCoordinate === i;
    })
    if (winXYArrayUp.length === 3 || winXYArrayDown.length === 3 || winXArray.length === 3 || winYArray.length === 3) {
      return true;
    }
  }
  return false;
}

function isThisNumber(value, compare) {
  return value === compare;
}

function Game(){
  this.player1 = new Player("X");
  this.player2 = new Player("O");
  this.board = new Board();
  this.turn = this.player1;
}

Game.prototype.changeTurn = function(){
  if (this.turn === this.player1){
    this.turn = this.player2;
  }
  else {
    this.turn = this.player1;
  }
}

$(function(){
  var game = new Game();
  var turnCount = 0;

  $("#player-turn").text("It's " + game.turn.mark + "'s turn");

  game.board.spaces.forEach(function(element, index, array){
    $("#grid").append("<div class='space' data-x='" + element.xCoordinate.toString() + "' data-y='" + element.yCoordinate.toString() + "'><span></span></div>");
  });
  game.board.spaces.forEach(function(element, index, array){
    $("#grid2").append("<div class='space' data-x='" + element.xCoordinate.toString() + "' data-y='" + element.yCoordinate.toString() + "'><span></span></div>");
  });
  game.board.spaces.forEach(function(element, index, array){
    $("#grid3").append("<div class='space' data-x='" + element.xCoordinate.toString() + "' data-y='" + element.yCoordinate.toString() + "'><span></span></div>");
  });
  game.board.spaces.forEach(function(element, index, array){
    $("#grid4").append("<div class='space' data-x='" + element.xCoordinate.toString() + "' data-y='" + element.yCoordinate.toString() + "'><span></span></div>");
  });
  game.board.spaces.forEach(function(element, index, array){
    $("#grid5").append("<div class='space' data-x='" + element.xCoordinate.toString() + "' data-y='" + element.yCoordinate.toString() + "'><span></span></div>");
  });
  game.board.spaces.forEach(function(element, index, array){
    $("#grid6").append("<div class='space' data-x='" + element.xCoordinate.toString() + "' data-y='" + element.yCoordinate.toString() + "'><span></span></div>");
  });
  game.board.spaces.forEach(function(element, index, array){
    $("#grid7").append("<div class='space' data-x='" + element.xCoordinate.toString() + "' data-y='" + element.yCoordinate.toString() + "'><span></span></div>");
  });
  game.board.spaces.forEach(function(element, index, array){
    $("#grid8").append("<div class='space' data-x='" + element.xCoordinate.toString() + "' data-y='" + element.yCoordinate.toString() + "'><span></span></div>");
  });
  game.board.spaces.forEach(function(element, index, array){
    $("#grid9").append("<div class='space' data-x='" + element.xCoordinate.toString() + "' data-y='" + element.yCoordinate.toString() + "'><span></span></div>");
  });

  $(".space").click(function(){
    turnCount += 1;
    var player = game.turn;
    var xCoordinate = parseInt($(this).data("x"));
    var yCoordinate = parseInt($(this).data("y"));
    var space = game.board.find(xCoordinate, yCoordinate);
    space.markBy(player);

    $(this).find("span").text(player.mark);

    if ( game.board.checkWin(player) ) {
      $("h1#winner").text(player.mark + " wins!");
      $("#player-turn").text("")
      $(".space").off();
    } else if (turnCount < 9){
      game.changeTurn();
      $("#player-turn").text("It's " + game.turn.mark + "'s turn");
    }
    else{
      $("h1#winner").text("It's a tie!!!");
      $("#player-turn").text("")
    }
    $(this).off();
  });

  $("#ai").click(function() {
    var spacesLeft = game.board.spaces.filter(function(value) {
      return value.markedBy === "";
    });
    var randomIndex = Math.floor(Math.random() * (spacesLeft.length - 1) - 0);
    var randomSpace = spacesLeft[randomIndex];
    $(".space[data-x='" + randomSpace.xCoordinate + "'][data-y='" + randomSpace.yCoordinate + "']").click();
  });
});
