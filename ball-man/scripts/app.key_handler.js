APP.Keydown_Handler = function (event)
{
  "use strict";
  var KEYS =
  {
    /* We will initialize the arrow keys first. 37 = left key, 38
      = up key, 39 = right key and 40 = down key. */
    LEFT    : 37,
    UP      : 38,
    RIGHT   : 39,
    DOWN    : 40
  };
  /* This switch-case will handle the key pressing and the player's
    movement. */
  switch (event.keyCode)
  {
    case KEYS.UP:
      APP.player.direction = APP.Direction.UP;
      break;
    case KEYS.RIGHT:
      APP.player.direction = APP.Direction.RIGHT;
      break;
    case KEYS.DOWN:
      APP.player.direction = APP.Direction.DOWN;
      break;
    case KEYS.LEFT:
      APP.player.direction = APP.Direction.LEFT;
      break;
  }
};
