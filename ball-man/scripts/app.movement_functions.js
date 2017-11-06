APP.Check_Direction = function ()
{
    switch (this.direction)
    {
      case APP.Direction.UP:
        if (APP.map.marks[this.y - 1][this.x] !== APP.WALL_MARK)
        {
          this.up = true;
          this.down = false;
          this.right = false;
          this.left = false;
          return true;
        }
        break;
      case APP.Direction.DOWN:
        if (APP.map.marks[this.y + 1][this.x] !== APP.WALL_MARK)
        {
          this.up = false;
          this.down = true;
          this.right = false;
          this.left = false;
          return true;
        }
        break;
      case APP.Direction.RIGHT:
        if (APP.map.marks[this.y][this.x + 1] !== APP.WALL_MARK)
        {
          this.up = false;
          this.down = false;
          this.right = true;
          this.left = false;
          return true;
        }
        break;
      case APP.Direction.LEFT:
        if (APP.map.marks[this.y][this.x - 1] !== APP.WALL_MARK)
        {
          this.up = false;
          this.down = false;
          this.right = false;
          this.left = true;
          return true;
        }
        break;
    }
    return false;
  };

APP.Select_Direction = function ()
{
    var possible_directions = [],
    direction_quantity = 9,
    rnd;
    switch (this.previus_direction)
    {
      case APP.Direction.UP:
        possible_directions[0] = APP.Direction.UP;
        possible_directions[1] = APP.Direction.UP;
        possible_directions[2] = APP.Direction.UP;
        possible_directions[3] = APP.Direction.UP;
        possible_directions[4] = APP.Direction.UP;
        possible_directions[5] = APP.Direction.UP;
        possible_directions[6] = APP.Direction.RIGHT;
        possible_directions[7] = APP.Direction.DOWN;
        possible_directions[8] = APP.Direction.LEFT;
        break;
      case APP.Direction.RIGHT:
        possible_directions[0] = APP.Direction.RIGHT;
        possible_directions[1] = APP.Direction.RIGHT;
        possible_directions[2] = APP.Direction.RIGHT;
        possible_directions[3] = APP.Direction.RIGHT;
        possible_directions[4] = APP.Direction.RIGHT;
        possible_directions[5] = APP.Direction.RIGHT;
        possible_directions[6] = APP.Direction.UP;
        possible_directions[7] = APP.Direction.DOWN;
        possible_directions[8] = APP.Direction.LEFT;
        break;
      case APP.Direction.DOWN:
        possible_directions[0] = APP.Direction.DOWN;
        possible_directions[1] = APP.Direction.DOWN;
        possible_directions[2] = APP.Direction.DOWN;
        possible_directions[3] = APP.Direction.DOWN;
        possible_directions[4] = APP.Direction.DOWN;
        possible_directions[5] = APP.Direction.DOWN;
        possible_directions[6] = APP.Direction.UP;
        possible_directions[7] = APP.Direction.RIGHT;
        possible_directions[8] = APP.Direction.LEFT;
        break;
      case APP.Direction.LEFT:
        possible_directions[0] = APP.Direction.LEFT;
        possible_directions[1] = APP.Direction.LEFT;
        possible_directions[2] = APP.Direction.LEFT;
        possible_directions[3] = APP.Direction.LEFT;
        possible_directions[4] = APP.Direction.LEFT;
        possible_directions[5] = APP.Direction.LEFT;
        possible_directions[6] = APP.Direction.UP;
        possible_directions[7] = APP.Direction.RIGHT;
        possible_directions[8] = APP.Direction.DOWN;
        break;
      }
      rnd = Math.floor(Math.random() * direction_quantity);
      this.direction = possible_directions[rnd];
};

APP.Check_Wall = function ()
{
   if (this.up)
   {
     if (APP.map.marks[this.y - 1][this.x] !== APP.WALL_MARK)
     {
       this.up = true;
       this.down = false;
       this.right = false;
       this.left = false;
     }
     else
     {
       this.direction = APP.Direction.STOP;
     }
   }

   if (this.right)
   {
     if (APP.map.marks[this.y][this.x + 1] !== APP.WALL_MARK)
     {
       this.up = false;
       this.down = false;
       this.right = true;
       this.left = false;
     }
     else
     {
       this.direction = APP.Direction.STOP;
     }
   }

   if (this.down)
   {
     if (APP.map.marks[this.y + 1][this.x] !== APP.WALL_MARK)
     {
       this.up = false;
       this.down = true;
       this.right = false;
       this.left = false;
     }
     else
     {
       this.direction = APP.Direction.STOP;
     }
   }

   if (this.left)
   {
     if (APP.map.marks[this.y][this.x - 1] !== APP.WALL_MARK)
     {
       this.up = false;
       this.down = false;
       this.right = false;
       this.left = true;
     }
     else
     {
       this.direction = APP.Direction.STOP;
     }
   }
 };

APP.Move_Up = function ()
{
  if (this.frame === 0)
  {
    this.frame = this.speed;
    this.y--;
  }
  else
  {
    this.frame--;
  }
  if (this.y < 0)
  {
    this.y = APP.MAP_HEIGHT - 1;
  }
};

APP.Move_Right = function ()
{
  if (this.frame === 0)
  {
    this.frame = this.speed;
    this.x++;
  }
  else
  {
    this.frame--;
  }
  if (this.x >= APP.MAP_WIDTH)
  {
    this.x = 0;
  }
};

APP.Move_Down = function ()
{
  if (this.frame === 0)
  {
    this.frame = this.speed;
    this.y++;
  } else
  {
    this.frame--;
  }
  if (this.y >= APP.MAP_HEIGHT)
  {
    this.y = 0;
  }
};

APP.Move_Left = function ()
{
  if (this.frame === 0)
  {
    this.frame = this.speed;
    this.x--;
  } else
  {
    this.frame--;
  }
  if (this.x < 0)
  {
    this.x = APP.MAP_WIDTH - 1;
  }
};
