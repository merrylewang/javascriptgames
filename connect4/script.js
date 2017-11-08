var game = new Array(6);

var board = document.createElement("PRE");
var player = "X"


//have computer player or two player
function initialize()
{
  for (i = 0; i < 6; i++)
  {
    game[i] = new Array(7);
    for (j = 0; j < 7; j ++)
    {
      game[i][j] = "_";
    }
  }

document.body.appendChild(board)
board.innerHTML = drawBoard();
}

function drawBoard()
{
  var boardContents = "";
  var i;
  var j;
  for (i = 0; i < 6; i++)
  {
    for (j = 0; j < 7; j++)
    {
        boardContents = boardContents + game[i][j] + " ";
    }
    boardContents += "<br>";
  }
  return boardContents;
}

function drop(n)
{
  for (i = 5; i >= 0; i--)
  {
    if (game[i][n - 1] == "_")
    {
      if (player == "O")
      {
        game[i][n - 1] = "O";
        checkWin(player,i,n-1)
        player = "X"
        break;
      }
      else
      {
        game[i][n - 1] = "X";
        checkWin(player,i,n-1)
        player = "O"
        break;
      }

    }
  }
  board.innerHTML = drawBoard();
}

function checkWin(player,row,col)
{
  var win = false
  win = check_win_row(player,row) || check_win_col(player,col) || check_win_diag(player,row,col)
  if (win)
  {
    document.getElementById("demo").innerHTML = "Player " + player + " wins!";
    document.getElementById("restart").innerHTML = '<button onclick="restart()" style="width:100px;height:100px;">Restart</button>';
  }
}

function restart()
{
  initialize()
  board.innerHTML = drawBoard()
  document.getElementById("demo").innerHTML = "";
  document.getElementById("restart").innerHTML = "";
}

function check_win_row(player,row)
{
  count = 0

  for(j = 0; j < 7; j++)
  {
    if (game[row][j] == player)
    {
      count += 1;
    }
    else
    {
      count = 0
    }
    if (count == 4)
    {
      return true
    }
  }
  count = 0

  return false
}

function check_win_col(player,col)
{
  count = 0

  for(i = 0; i < 6; i++)
  {
    if (game[i][col] == player)
    {
      count += 1;
    }
    else
    {
      count = 0
    }
    if (count == 4)
    {
      return true
    }
  }
  count = 0

  return false
}

function check_win_diag(player,row,col)
{
  adjacent = 0;
  row_top_left = row;
  col_top_left = col;
  while (row_top_left > 0 && col_top_left > 0)
  {
      row_top_left -= 1;
      col_top_left -= 1;
  }
  while (row_top_left < 6 && col_top_left < 7)
  {
    if (game[row_top_left][col_top_left] == player)
    {
      adjacent += 1;
    }
    else
    {
      adjacent = 0;
    }
    if (adjacent >= 4)
    {
      return true
    }
    row_top_left += 1;
    col_top_left += 1;
  }

  adjacent = 0
  row_top_right = row
  col_top_right = col
  while (row_top_right > 0 && col_top_right < 6)
  {
      row_top_right -= 1;
      col_top_right += 1;
  }
  while (row_top_right < 6 && col_top_right >= 0)
  {
    if (game[row_top_right][col_top_right] == player)
    {
      adjacent += 1;
    }
    else
    {
      adjacent = 0;
    }
    if (adjacent >= 4)
    {
      return true;
    }
    row_top_right += 1
    col_top_right -= 1
  }


  return false;

}
