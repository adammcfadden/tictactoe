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

function Game(){
  this.player1 = new Player("X");
  this.player2 = new Player("O");
  this.board = new Board();
  this.turn = this.player1;
  // this.winXYArrayUp = [];
  // this.winXYArrayDown = [];
  // this.winXArray = [];
  // this.winYArray = [];
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
//META GAME
  var metaGame = new Game();
  var turnCount = 0;

  $("#player-turn").text("It's " + metaGame.turn.mark + "'s turn");

  // metaGame.board.spaces.forEach(function(element, index, array){
  //   $("#grid").append("<div class='space' data-x='" + element.xCoordinate.toString() + "' data-y='" + element.yCoordinate.toString() + "'><span></span></div>");
  // });

  $(".row").click(function(){
    turnCount += 1;
    var player = metaGame.turn;
    // var xCoordinate = parseInt($(this).data("x"));
    // var yCoordinate = parseInt($(this).data("y"));
    // var space = metaGame.board.find(xCoordinate, yCoordinate);
    // space.markBy(player);

    // $(this).find("span").text(player.mark);

    if ( metaGame.board.checkWin(player) ) {
      $("h1#winner").text(player.mark + " wins!");
      $("#player-turn").text("")
      // $(".space").off();
      // $("#grid3").text("X");
    } else if (turnCount < 81){
      metaGame.changeTurn();
      // game.changeTurn();
      // game2.changeTurn();
      // game3.changeTurn();
      $("#player-turn").text("It's " + metaGame.turn.mark + "'s turn");
    }
    else{
      $("h1#winner").text("It's a tie!!!");
      $("#player-turn").text("")
    }
    // $(this).off();
  });

  $("#ai").click(function() {
    var spacesLeft = metaGame.board.spaces.filter(function(value) {
      return value.markedBy === "";
    });
    var randomIndex = Math.floor(Math.random() * (spacesLeft.length - 1) - 0);
    var randomSpace = spacesLeft[randomIndex];
    $(".space[data-x='" + randomSpace.xCoordinate + "'][data-y='" + randomSpace.yCoordinate + "']").click();
  });


//EACH INSTANCE OF GAME

//game1

  var game = new Game();
  var turnCount = 0;

  $("#player-turn").text("It's " + game.turn.mark + "'s turn");

  game.board.spaces.forEach(function(element, index, array){
    $("#grid").append("<div class='space' data-x='" + element.xCoordinate.toString() + "' data-y='" + element.yCoordinate.toString() + "'><span></span></div>");
  });

  $(".space").click(function(){
var player = metaGame.turn;
    var xCoordinate = parseInt($(this).data("x"));
    var yCoordinate = parseInt($(this).data("y"));
    var space = game.board.find(xCoordinate, yCoordinate);
    space.markBy(player);

    $(this).find("span").text(player.mark);

    if ( game.board.checkWin(player) ) {
      $("h1#winner").text(player.mark + " wins!");
      $("#player-turn").text("")
      $(".space").off();
      // $("#grid3").text("X");
    // } else if (turnCount < 9){
    //   game.changeTurn();
    //   $("#player-turn").text("It's " + game.turn.mark + "'s turn");
    }
    else if (turnCount === 81){
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

//game 2

  var game2 = new Game();
  var turnCount2 = 0;

  $("#player-turn").text("It's " + game2.turn.mark + "'s turn");

  game2.board.spaces.forEach(function(element, index, array){
    $("#grid2").append("<div class='space2' data-x='" + element.xCoordinate.toString() + "' data-y='" + element.yCoordinate.toString() + "'><span></span></div>");
  });

  $(".space2").click(function(){
var player2 = metaGame.turn;
    var xCoordinate2 = parseInt($(this).data("x"));
    var yCoordinate2 = parseInt($(this).data("y"));
    var space = game2.board.find(xCoordinate2, yCoordinate2);
    space.markBy(player2);

    $(this).find("span").text(player2.mark);

    if ( game2.board.checkWin(player2) ) {
      $("h1#winner").text(player2.mark + " wins!");
      $("#player-turn").text("")
      $(".space2").off();
      // $("#grid2").text("X");
    // } else if (turnCount2 < 9){
    //   game2.changeTurn();
    //   $("#player-turn").text("It's " + game2.turn.mark + "'s turn");
    }
    else if (turnCount === 81){
      $("h1#winner").text("It's a tie!!!");
      $("#player-turn").text("")
    }
    $(this).off();
  });

  $("#ai").click(function() {
    var spacesLeft = game2.board.spaces.filter(function(value) {
      return value.markedBy === "";
    });
    var randomIndex = Math.floor(Math.random() * (spacesLeft.length - 1) - 0);
    var randomSpace = spacesLeft[randomIndex];
    $(".space2[data-x='" + randomSpace.xCoordinate + "'][data-y='" + randomSpace.yCoordinate + "']").click();
  });

//game3

  var game3 = new Game();
  var turnCount3 = 0;

  $("#player-turn").text("It's " + game3.turn.mark + "'s turn");

  game3.board.spaces.forEach(function(element, index, array){
    $("#grid3").append("<div class='space3' data-x='" + element.xCoordinate.toString() + "' data-y='" + element.yCoordinate.toString() + "'><span></span></div>");
  });

  $(".space3").click(function(){
var player3 = metaGame.turn;
    var xCoordinate3 = parseInt($(this).data("x"));
    var yCoordinate3 = parseInt($(this).data("y"));
    var space = game3.board.find(xCoordinate3, yCoordinate3);
    space.markBy(player3);

    $(this).find("span").text(player3.mark);

    if ( game3.board.checkWin(player3) ) {
      $("h1#winner").text(player3.mark + " wins!");
      $("#player-turn").text("")
      $(".space3").off();
      // $("#grid3").text("X");
    // } else if (turnCount3 < 9){
    //   game3.changeTurn();
    //   $("#player-turn").text("It's " + game3.turn.mark + "'s turn");
    }
    else if (turnCount === 81){
      $("h1#winner").text("It's a tie!!!");
      $("#player-turn").text("")
    }
    $(this).off();
  });

  $("#ai").click(function() {
    var spacesLeft = game3.board.spaces.filter(function(value) {
      return value.markedBy === "";
    });
    var randomIndex = Math.floor(Math.random() * (spacesLeft.length - 1) - 0);
    var randomSpace = spacesLeft[randomIndex];
    $(".space3[data-x='" + randomSpace.xCoordinate + "'][data-y='" + randomSpace.yCoordinate + "']").click();
  });
});
