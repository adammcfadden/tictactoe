describe('Player', function(){
  it("returns the players mark", function(){
    var testPlayer = new Player("X");
    expect(testPlayer.mark).to.equal("X");
  });
})

describe('Space', function(){
  it("returns its coordinates", function(){
    var testSpace = new Space(1,2);
    expect(testSpace.xCoordinate).to.equal(1);
    expect(testSpace.yCoordinate).to.equal(2);
  });

  it("lets a player mark a space", function(){
    var testPlayer = new Player("X");
    var testSpace = new Space(1,2);
    testSpace.markBy(testPlayer);
    expect(testSpace.markedBy).to.equal(testPlayer);
    expect(testPlayer.spaces).to.eql([testSpace]);
  });
});

describe("Board", function(){
  it("creates 9 spaces when it is initialized", function(){
    var newBoard = new Board();
    expect(newBoard.spaces.length).to.equal(9);
  });

  it("finds a space on a board with given coordinates", function() {
    var newBoard = new Board();
    var foundSpace = newBoard.find(2,3);
    expect(foundSpace.xCoordinate).to.equal(2);
    expect(foundSpace.yCoordinate).to.equal(3);
  });

  it("will check if a player has won vertically", function() {
    var newBoard = new Board();
    var testPlayer = new Player("X");
    newBoard.find(1,1).markBy(testPlayer);
    newBoard.find(1,2).markBy(testPlayer);
    newBoard.find(1,3).markBy(testPlayer);
    expect(newBoard.checkWin(testPlayer)).to.eq(true);
  });

  it("will check if a player has won horizontally", function() {
    var newBoard = new Board();
    var testPlayer = new Player("X");
    newBoard.find(1,2).markBy(testPlayer);
    newBoard.find(2,2).markBy(testPlayer);
    newBoard.find(3,2).markBy(testPlayer);
    expect(newBoard.checkWin(testPlayer)).to.eq(true);
  });

  it("will check if a player has won diagonally down", function() {
    var newBoard = new Board();
    var testPlayer = new Player("X");
    newBoard.find(1,1).markBy(testPlayer);
    newBoard.find(2,2).markBy(testPlayer);
    newBoard.find(3,3).markBy(testPlayer);
    expect(newBoard.checkWin(testPlayer)).to.eq(true);
  });

  it("will check if a player has won diagonally up", function() {
    var newBoard = new Board();
    var testPlayer = new Player("X");
    newBoard.find(3,1).markBy(testPlayer);
    newBoard.find(2,2).markBy(testPlayer);
    newBoard.find(1,3).markBy(testPlayer);
    newBoard.find(1,1).markBy(testPlayer);
    expect(newBoard.checkWin(testPlayer)).to.eq(true);
  });

  it("will return false if a player does not have winning moves", function(){
    var newBoard = new Board();
    var testPlayer = new Player("X");
    newBoard.find(1,1).markBy(testPlayer);
    newBoard.find(2,2).markBy(testPlayer);
    newBoard.find(3,2).markBy(testPlayer);
    expect(newBoard.checkWin(testPlayer)).to.eq(false);
  })
});

describe("Game", function(){
  it("creates a new board, two players and initializes turn", function(){
    var newGame = new Game();
    expect(newGame.player1.mark).to.equal('X');
    expect(newGame.player2.mark).to.equal('O');
    expect(newGame.board.spaces.length).to.equal(9);
    expect(newGame.turn).to.equal(newGame.player1);
  });

  it("switches player's turn", function() {
    var newGame = new Game();
    newGame.changeTurn();
    expect(newGame.turn).to.equal(newGame.player2);
  });
});
