var game = new Array(9);
var gameToReveal = new Array(9)
var board = document.createElement("PRE");

var button = document.createElement("BUTTON");
var turn = 1

function initialize()
{
  for (i = 0; i < 9; i++)
  {
    game[i] = new Array(19);
    gameToReveal[i] = new Array(19)
    for (j = 0; j < 19; j++)
    {
      if (j == 9)
      {
        game[i][j] = "|";
        gameToReveal[i][j] = "|";
      }
      else
      {
        game[i][j] = ".";
        gameToReveal[i][j] = ".";
      }
    }
  }
  //creates board
  document.body.appendChild(board);
  button.onclick = fire;

  //Creates Fire button
  var t = document.createTextNode("Fire!");
  document.body.appendChild(button);
  button.appendChild(t);

  board.innerHTML = drawBoard();

  placeShips()
  placeShips()

  board.innerHTML = drawBoard();
}

function placeShips()
{
  var constant = 0
  if (turn == 2)
  {
    constant += 10;
  }
  var x = prompt("Where do you want to put your ship? Enter X coord: (0-8)");
  var y = prompt("Where do you want to put your ship? Enter Y coord: (0-8)");
  var direction = prompt("Place (h)orizontally or (v)ertically");
  x = Number(x) + constant;
  y = Number(y);

  if (direction[0] == "h")
  {
    var c;
    for (c = x; c < (x + 4); c++)
    {
      if (turn == 1 && c >= 9)
      {

      }
      else
      {
        game[y][c] = '$';
      }
    }
  }

  if (direction[0] == "v")
  {
    var c;
    for (c = y; c < (y + 4); c++)
    {
      game[c][x] = '$';
    }
  }
  turn = 3 - turn
}

function drawBoard()
{
  var boardContents = "";
  var i;
  var j;
  for (i = 0; i < 10; i++)
  {
    boardContents = boardContents + (i - 1) + " ";
    for (j = 0; j < 19; j++)
    {
      if (i == 0)
      {
        boardContents = "  0 1 2 3 4 5 6 7 8   0 1 2 3 4 5 6 7 8";
        break;
      }
      else
      {
        boardContents = boardContents + gameToReveal[i - 1][j] + " ";
      }
    }

    boardContents += "<br>";
  }
  return boardContents;
}

function fire()
{
  var constant = 0
  if (turn == 1)
  {
    constant += 10;
  }
  var x = prompt("Where do you want to fire? Enter X coord: (0-8)");
  var y = prompt("Where do you want to fire? Enter Y coord: (0-8)");
  fireX = Number(x) + constant;
  fireY = Number(y);

  if (game[fireY][fireX] == '.')
  {
    alert("You missed!");
    gameToReveal[fireY][fireX] = "#";
    board.innerHTML = drawBoard();
  }
  else if (gameToReveal[fireY][fireX] == "*")
  {
    alert("You already hit that ship there!");
  }
  else if (game[fireY][fireX] == '$')
  {
    alert("Boomshakalaka! You hit it!");
    gameToReveal[fireY][fireX] = "*";
    board.innerHTML = drawBoard();
  }
  var hitcounts = 0;
  var i;
  var j;
  for (i = 0; i < 9; i++)
  {
    for (j = 0; j < 9; j++)
    {
      if (gameToReveal[i][j + constant] == "*")
      {
        hitcounts += 1;

      }
    }
  }
  if (hitcounts == 4)
  {
    alert("All ships have been sunk. Game over. Player " + String(turn) + " wins");
    document.body.removeChild(button);
  }

  turn = 3 - turn
}
