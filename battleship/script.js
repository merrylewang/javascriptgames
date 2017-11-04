var game = new Array(9);
var board = document.createElement("PRE");
var button = document.createElement("BUTTON");

function initialize()
{
  for (i = 0; i < 9; i++)
  {
    game[i] = new Array(9);
    for (j = 0; j < 9; j++)
    {
      game[i][j] = ".";
    }
  }

  document.body.appendChild(board);
  button.onclick = fire;

  var t = document.createTextNode("Fire!");
  document.body.appendChild(button);
  button.appendChild(t);

  board.innerHTML = drawBoard();

  var x = prompt("Where do you want to put your ship? Enter X coord: (0-8)");
  var y = prompt("Where do you want to put your ship? Enter Y coord: (0-8)");
  var direction = prompt("Place (h)orizontally or (v)ertically");
  x = Number(x);
  y = Number(y);

  if (direction[0] == "h")
  {
    var c;
    for (c = x; c < (x + 4); c++)
    {
      game[y][c] = '$';
    }
  }

  if (direction[0] == "v")
  {
    var c;
    for (c = y; c < (y + 4); c++)
    {
      game[c][y] = '$';
    }
  }

  board.innerHTML = drawBoard();
}

function drawBoard()
{
  var boardContents = "";
  var i;
  var j;
  for (i = 0; i < 9; i++)
  {
    for (j = 0; j < 9; j++)
    {
      boardContents = boardContents + game[i][j] + " ";
    }
    boardContents += "<br>";
  }
  return boardContents;
}

function fire()
{
  var x = prompt("Where do you want to fire? Enter X coord: (0-8)");
  var y = prompt("Where do you want to fire? Enter Y coord: (0-8)");
  fireX = Number(x);
  fireY = Number(y);

  if (game[fireY][fireX] == '.')
  {
    alert("You missed!");
  }
  else if (game[fireY][fireX] == "*")
  {
    alert("You already hit that ship there!");
  }
  else
  {
    alert("Boomshakalaka! You hit it!");
    game[fireY][fireX] = "*";
    board.innerHTML = drawBoard();
  }
  var shipfound;
  var i;
  var j;
  for (i = 0; i < 9; i++)
  {
    for (j = 0; j < 9; j++)
    {
      if (game[i][j] != "." && game[i][j] != "*")
      {
        shipfound = true;
      }
    }
  }

  if (!shipfound)
  {
    alert("All ships have been sunk. Game over");
    document.body.removeChild(button);
  }
}
