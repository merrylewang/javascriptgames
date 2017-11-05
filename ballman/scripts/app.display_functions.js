APP.Show_World = function ()
{
  var i,
  dots = 0; //initialized cheese number
  dots = APP.map.Draw(); //put our cheese on the canvas
  if (!dots)
  {
    APP.Game_Over("YOU WIN!"); //if all cheese are ate by the rat, then the screen should display this.
  }
  
  for (i = 0; i < APP.MONSTERS_QUANTITY; i++)
  {
    if (APP.monsters[i].x === APP.player.x)
    {
      if (APP.monsters[i].y === APP.player.y)
      {
        APP.Game_Over("YOU LOSE!");
      }
    }
  }
  APP.monsters.Move(); //cats' movement function
  APP.player.Move();  // rat's movement function
  APP.player.Check_For_Dots(); //This function will check number of chees.
  APP.portals.Show(); //This will display two portals by using these the rat can escape.
  APP.player.Show(); //This will show the rat on the canvas.
    /* this function will show the monster on the canvas */
  for (i = 0; i < APP.MONSTERS_QUANTITY; i++)
  {
    APP.monsters[i].Show();
  }
};

APP.map.Draw = function ()
{
  var i, j, image, x, y, dot_counter = 0; //initialized variables.
  /*this loop will create our game map/maze */
  for (i = 0; i < APP.MAP_WIDTH; i++)
  {
    for (j = 0; j < APP.MAP_HEIGHT; j++)
    {
      image = APP.images[APP.map.cells[j][i]];
      x = i * APP.CELL_WIDTH;
      y = j * APP.CELL_HEIGHT;
      APP.context.drawImage(image, x, y);
      if (APP.map.cells[j][i] === APP.DOT_CELL_DIGIT)
      {
        dot_counter++;
      }
    }
  }
  return dot_counter;
};

APP.monsters.Move = function ()
{
  var i;
  /*This loop will define the cats' quantity */
  for (i = 0; i < APP.MONSTERS_QUANTITY; i++)
  {
    if (APP.monsters[i].frame === APP.monsters[i].speed)
    {
      if (APP.monsters[i].direction !== APP.Direction.STOP)
      {
        APP.monsters[i].previus_direction =
        APP.monsters[i].direction;
      }
      APP.monsters[i].Select_Direction(); //Will select the cats' direction.
      APP.monsters[i].Check_Direction(); //Will check the cats' direction.
      APP.monsters[i].Check_Wall();//Will check the surroundings of the canvas or any block.
    }
    /* These conditions will check the boundaries of the canvas and make the cats move. */
    if (APP.monsters[i].direction !== APP.Direction.STOP)
    {
      if (APP.monsters[i].up)
      {
        APP.monsters[i].Move_Up();
      }
      if (APP.monsters[i].down)
      {
        APP.monsters[i].Move_Down();
      }
      if (APP.monsters[i].left)
      {
        APP.monsters[i].Move_Left();
      }
      if (APP.monsters[i].right)
      {
        APP.monsters[i].Move_Right();
      }
    }
  }
};

APP.player.Move = function () {
      if (APP.player.frame === APP.player.speed) {
        APP.player.Check_Direction();
        APP.player.Check_Wall(); //This will check wall
      }
      /* these conditions will check our rat's valid movements */
      if (APP.player.direction !== APP.Direction.STOP) {
        if (APP.player.up) {
          APP.player.Move_Up();
        }
        if (APP.player.down) {
          APP.player.Move_Down();
        }
        if (APP.player.left) {
          APP.player.Move_Left();
        }
        if (APP.player.right) {
          APP.player.Move_Right();
        }
      }
    };


    /*this function will feed our rat the chees */
    APP.player.Check_For_Dots = function () {
      if (APP.map.marks[APP.player.y][APP.player.x] === APP.DOT_MARK) {
        APP.player.bonuses++;
        APP.map.marks[APP.player.y][APP.player.x] = APP.BLANK_MARK;
        APP.map.cells[APP.player.y][APP.player.x] = APP.BLANK_CELL_DIGIT;
      }
    };

    APP.player.Show = function () {
      //initializing our needed variables.
      var figure_offset = 5,
      frame_number = 2 - Math.floor(this.frame / 3),
      frame_offset = 1 - this.frame / this.speed,
      image, x, y;
      /* conditions for the rat's direction for up, down, left, right*/
      if (this.up) {
        image = this.up_images[frame_number];
        x = (this.x * APP.CELL_WIDTH) - figure_offset;
        y = ((this.y - frame_offset) * APP.CELL_HEIGHT) - figure_offset;

      } else if (this.down) {
        image = this.down_images[frame_number];
        x = (this.x * APP.CELL_WIDTH) - figure_offset;
        y = ((this.y + frame_offset) * APP.CELL_HEIGHT) - figure_offset;

      } else if (this.right) {
        image = this.right_images[frame_number];
        x = ((this.x + frame_offset) * APP.CELL_WIDTH) - figure_offset;
        y = (this.y * APP.CELL_HEIGHT) - figure_offset;

      } else {
        image = this.left_images[frame_number];
        x = ((this.x - frame_offset) * APP.CELL_WIDTH) - figure_offset;
        y = (this.y * APP.CELL_HEIGHT) - figure_offset;

      }
      APP.context.drawImage(image, x, y);
    };

    APP.Show_Monster = function () {
      //initializing needed variables.
      var figure_offset = 15,
      frame_offset = 1 - this.frame / this.speed,
      image, x, y;
      /* binding the cats' directions for 4 directions*/
      if (this.up) {
        image = this.up_images[0];
        x = (this.x * APP.CELL_WIDTH) - figure_offset;
        y = ((this.y - frame_offset) * APP.CELL_HEIGHT) - figure_offset;

      } else if (this.down) {

        image = this.down_images[0];
        x = (this.x * APP.CELL_WIDTH) - figure_offset;
        y = ((this.y + frame_offset) * APP.CELL_HEIGHT) - figure_offset;

      } else if (this.right) {

        image = this.right_images[0];
        x = ((this.x + frame_offset) * APP.CELL_WIDTH) - figure_offset;
        y = (this.y * APP.CELL_HEIGHT) - figure_offset;

      } else {

        image = this.left_images[0];
        x = ((this.x - frame_offset) * APP.CELL_WIDTH) - figure_offset;
        y = (this.y * APP.CELL_HEIGHT) - figure_offset;

      }

      APP.context.drawImage(image, x, y);
    };

    APP.portals.Show = function () {
       //initialized variables and incremented.
       var offset, frame_offset, sw = +!this.raise;
       frame_offset = sw - this.frame_counter / (this.speed * APP.GAME_FPS);
       /*controlled frame of the game */
       offset = Math.abs(this.width * frame_offset);
       APP.context.drawImage(this[0].image, this[0].x - offset, this[0].y);
       APP.context.drawImage(this[1].image, this[1].x + offset, this[1].y);
       this.frame_counter++;
       if (this.frame_counter === this.speed * APP.GAME_FPS) {
         this.frame_counter = 0;
         this.raise = !this.raise;
       }
     };


     APP.Game_Over = function (condition) {
           clearInterval(APP.timer);
           APP.blackout = document.getElementById("blackout");
           APP.blackout.textContent = condition;
           APP.blackout.style.visibility = "visible";
           APP.blackout.style.opacity = 0.7;
         };
