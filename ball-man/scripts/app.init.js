APP.map = {};
APP.player = {};
APP.monsters = [{}, {}, {}, {}];
APP.portals = [{}, {}];
APP.images = [];
APP.timer = {};
APP.canvas = {};
APP.context = {};
APP.blackout = document.getElementById("blackout");

APP.Init = function ()
{
  APP.map.Init();
  APP.player.Init();
  APP.portals.Init();
  APP.monsters.Init();
  APP.images.Init();
  APP.canvas.Init();
};

APP.map.Init = function ()
{
  //initializing few random variables
  var i, j, map_in_strings = [
                "5000000000000250000000000002",
                "1777777777777117777777777771",
                "1750027500027117500027500271",
                "1716617166617117166617166171",
                "1740037400037437400037400371",
                "1777777777777777777777777771",
                "1750027527500000027527500271",
                "1740037117400250037117400371",
                "1777777117777117777117777771",
                "4000027140026116500317500003",
                "0000217150036436400217150000",
                "6666117116666666666117116666",
                "0000317116502665026117140000",
                "0000037436153664216437400000",
                "6666667666116666116667666666",
                "0000027526140000316527500000",
                "0000217116400000036117150000",
                "6666117116666666666117116666",
                "0000317116500000026117140000",
                "5000037436400250036437400002",
                "1777777777777117777777777771",
                "1750027500027117500027500271",
                "1740217400037437400037150371",
                "1777117777777777777777117771",
                "4027117527500000027527117503",
                "5037437117400250037117437402",
                "1777777117777117777117777771",
                "1750000340027117500340000271",
                "1740000000037437400000000371",
                "1777777777777777777777777771",
                "4000000000000000000000000003"
            ];
  APP.map.cells = [];
  for (i = 0; i < APP.MAP_HEIGHT; i++)
  {
    APP.map.cells[i] = [];
    for (j = 0; j < APP.MAP_WIDTH; j++)
    {
      APP.map.cells[i][j] = +map_in_strings[i].charAt(j);
    }
  }
  APP.map.marks = [];
  /* This loop will determine the map's size */
  for (i = 0; i < APP.MAP_HEIGHT; i++)
  {
    APP.map.marks[i] = [];
    for (j = 0; j < APP.MAP_WIDTH; j++)
    {
      if (APP.map.cells[i][j] <= APP.WALL_CELL_DIGIT)
      {
        APP.map.marks[i][j] = APP.WALL_MARK;
      }
      else if (APP.map.cells[i][j] === APP.BLANK_CELL_DIGIT)
      {
        APP.map.marks[i][j] = APP.BLANK_MARK;
      }
      else if (APP.map.cells[i][j] === APP.DOT_CELL_DIGIT)
      {
        APP.map.marks[i][j] = APP.DOT_MARK;
      }
    }
  }
};

APP.player.Init = function ()
{
    APP.player.up_images = [];

    APP.player.up_images[0] = new Image();
    APP.player.up_images[0].src = "img/player/up/1.png";
    APP.player.up_images[1] = new Image();
    APP.player.up_images[1].src = "img/player/up/1.png";
    APP.player.up_images[2] = new Image();
    APP.player.up_images[2].src = "img/player/2.png";

    APP.player.right_images = [];

    APP.player.right_images[0] = new Image();
    APP.player.right_images[0].src = "img/player/right/0.png";
    APP.player.right_images[1] = new Image();
    APP.player.right_images[1].src = "img/player/right/0.png";
    APP.player.right_images[2] = new Image();
    APP.player.right_images[2].src = "img/player/2.png";

    APP.player.down_images = [];

    APP.player.down_images[0] = new Image();
    APP.player.down_images[0].src = "img/player/down/1.png";
    APP.player.down_images[1] = new Image();
    APP.player.down_images[1].src = "img/player/down/1.png";
    APP.player.down_images[2] = new Image();
    APP.player.down_images[2].src = "img/player/2.png";

    APP.player.left_images = [];

    APP.player.left_images[0] = new Image();
    APP.player.left_images[0].src = "img/player/left/0.png";
    APP.player.left_images[1] = new Image();
    APP.player.left_images[1].src = "img/player/left/0.png";
    APP.player.left_images[2] = new Image();
    APP.player.left_images[2].src = "img/player/2.png";

    APP.player.x = APP.INITIAL_PLAYER_X;
    APP.player.y = APP.INITIAL_PLAYER_Y;
    APP.player.speed = APP.PLAYER_SPEED;
    APP.player.frame = APP.INITIAL_PLAYER_FRAME;

    APP.player.bonuses = 0;

    APP.player.up = false;
    APP.player.down = false;
    APP.player.left = true;
    APP.player.right = false;
    APP.player.direction = APP.Direction.STOP;

    APP.player.Check_Direction = APP.Check_Direction;
    APP.player.Check_Wall = APP.Check_Wall;
    APP.player.Move_Up = APP.Move_Up;
    APP.player.Move_Right = APP.Move_Right;
    APP.player.Move_Down = APP.Move_Down;
    APP.player.Move_Left = APP.Move_Left;

};

APP.portals.Init = function ()
{
    APP.portals[0].image = new Image();
    APP.portals[0].image.src = "img/portal/0.png";
    APP.portals[1].image = new Image();
    APP.portals[1].image.src = "img/portal/1.png";

    APP.portals.frame_counter = 0;
    APP.portals.raise = false;
    APP.portals.width = APP.PORTAL_WIDTH;
    APP.portals.speed = APP.PORTAL_BLINKING_SPEED;
    APP.portals[0].x = APP.FIRST_PORTAL_X;
    APP.portals[0].y = APP.FIRST_PORTAL_Y;
    APP.portals[1].x = APP.SECOND_PORTAL_X;
    APP.portals[1].y = APP.SECOND_PORTAL_Y;

};

APP.monsters.Init = function ()
{
    var i;

    for (i = 0; i < APP.MONSTERS_QUANTITY; i++)
    {

        APP.monsters[i].Init();

        APP.monsters[i].direction = APP.Direction.UP;
        APP.monsters[i].previus_direction = APP.Direction.UP;
        APP.monsters[i].Show = APP.Show_Monster;
        APP.monsters[i].Select_Direction = APP.Select_Direction;
        APP.monsters[i].Check_Direction = APP.Check_Direction;
        APP.monsters[i].Check_Wall = APP.Check_Wall;
        APP.monsters[i].Move_Up = APP.Move_Up;
        APP.monsters[i].Move_Right = APP.Move_Right;
        APP.monsters[i].Move_Down = APP.Move_Down;
        APP.monsters[i].Move_Left = APP.Move_Left;
    }
};



APP.monsters[0].Init = function ()
{
  APP.monsters[0].up_images = [];
  APP.monsters[0].right_images = [];
  APP.monsters[0].down_images = [];
  APP.monsters[0].left_images = [];
  APP.monsters[0].up_images[0] = new Image();
  APP.monsters[0].up_images[0].src = "img/monsters/blinky/up/0.png";
  APP.monsters[0].right_images[0] = new Image();
  APP.monsters[0].right_images[0].src = "img/monsters/blinky/right/0.png";
  APP.monsters[0].down_images[0] = new Image();
  APP.monsters[0].down_images[0].src = "img/monsters/blinky/down/0.png";
  APP.monsters[0].left_images[0] = new Image();
  APP.monsters[0].left_images[0].src = "img/monsters/blinky/left/0.png";
  APP.monsters[0].up = false;
  APP.monsters[0].right = true;
  APP.monsters[0].down = false;
  APP.monsters[0].left = false;
  APP.monsters[0].x = APP.INITIAL_BLINKY_X;
  APP.monsters[0].y = APP.INITIAL_BLINKY_Y;
  APP.monsters[0].frame = APP.INITIAL_BLINKY_FRAME;
  APP.monsters[0].speed = APP.BLINKY_SPEED;
};

APP.monsters[1].Init = function ()
{
  APP.monsters[1].up_images = [];
  APP.monsters[1].right_images = [];
  APP.monsters[1].down_images = [];
  APP.monsters[1].left_images = [];
  APP.monsters[1].up_images[0] = new Image();
  APP.monsters[1].up_images[0].src = "img/monsters/clyde/up/0.png";
  APP.monsters[1].right_images[0] = new Image();
  APP.monsters[1].right_images[0].src = "img/monsters/clyde/right/0.png";
  APP.monsters[1].down_images[0] = new Image();
  APP.monsters[1].down_images[0].src = "img/monsters/clyde/down/0.png";
  APP.monsters[1].left_images[0] = new Image();
  APP.monsters[1].left_images[0].src = "img/monsters/clyde/left/0.png";
  APP.monsters[1].up = false;
  APP.monsters[1].right = true;
  APP.monsters[1].down = false;
  APP.monsters[1].left = false;
  APP.monsters[1].x = APP.INITIAL_CLYDE_X;
  APP.monsters[1].y = APP.INITIAL_CLYDE_Y;
  APP.monsters[1].frame = APP.INITIAL_CLYDE_FRAME;
  APP.monsters[1].speed = APP.CLYDE_SPEED;
};

APP.monsters[2].Init = function ()
{
  APP.monsters[2].up_images = [];
  APP.monsters[2].right_images = [];
  APP.monsters[2].down_images = [];
  APP.monsters[2].left_images = [];
  APP.monsters[2].up_images[0] = new Image();
  APP.monsters[2].up_images[0].src = "img/monsters/inky/up/0.png";
  APP.monsters[2].right_images[0] = new Image();
  APP.monsters[2].right_images[0].src = "img/monsters/inky/right/0.png";
  APP.monsters[2].down_images[0] = new Image();
  APP.monsters[2].down_images[0].src = "img/monsters/inky/down/0.png";
  APP.monsters[2].left_images[0] = new Image();
  APP.monsters[2].left_images[0].src = "img/monsters/inky/left/0.png";
  APP.monsters[2].up = false;
  APP.monsters[2].right = true;
  APP.monsters[2].down = false;
  APP.monsters[2].left = false;
  APP.monsters[2].x = APP.INITIAL_INKY_X;
  APP.monsters[2].y = APP.INITIAL_INKY_Y;
  APP.monsters[2].frame = APP.INITIAL_INKY_FRAME;
  APP.monsters[2].speed = APP.INKY_SPEED;
};

APP.monsters[3].Init = function ()
{
  APP.monsters[3].up_images = [];
  APP.monsters[3].right_images = [];
  APP.monsters[3].down_images = [];
  APP.monsters[3].left_images = [];
  APP.monsters[3].up_images[0] = new Image();
  APP.monsters[3].up_images[0].src = "img/monsters/pinky/up/0.png";
  APP.monsters[3].right_images[0] = new Image();
  APP.monsters[3].right_images[0].src = "img/monsters/pinky/right/0.png";
  APP.monsters[3].down_images[0] = new Image();
  APP.monsters[3].down_images[0].src = "img/monsters/pinky/down/0.png";
  APP.monsters[3].left_images[0] = new Image();
  APP.monsters[3].left_images[0].src = "img/monsters/pinky/left/0.png";
  APP.monsters[3].up = false;
  APP.monsters[3].right = true;
  APP.monsters[3].down = false;
  APP.monsters[3].left = false;
  APP.monsters[3].x = APP.INITIAL_PINKY_X;
  APP.monsters[3].y = APP.INITIAL_PINKY_Y;
  APP.monsters[3].frame = APP.INITIAL_PINKY_FRAME;
  APP.monsters[3].speed = APP.PINKY_SPEED;
};

APP.images.Init = function ()
{
  var i;
  for (i = 0; i <= APP.DOT_CELL_DIGIT; i++)
  {
    APP.images[i] = new Image();
  }
  APP.images[0].src = "img/walls/0.png";
  APP.images[1].src = "img/walls/1.png";
  APP.images[2].src = "img/walls/2.png";
  APP.images[3].src = "img/walls/3.png";
  APP.images[4].src = "img/walls/4.png";
  APP.images[5].src = "img/walls/5.png";
  APP.images[6].src = "img/blank.png";
  APP.images[7].src = "img/dot.png";
}

APP.canvas.Init = function ()
{
  APP.canvas = document.getElementById("main_canvas");
  APP.canvas.width = APP.MAP_WIDTH * APP.CELL_WIDTH;
  APP.canvas.height = APP.MAP_HEIGHT * APP.CELL_HEIGHT;
  APP.context = APP.canvas.getContext("2d");
  APP.context.fillStyle = APP.BG_COLOR;
  APP.context.fillRect(0, 0, APP.canvas.width, APP.canvas.height);
};
