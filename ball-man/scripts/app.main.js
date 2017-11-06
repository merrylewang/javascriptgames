(function ()
{
  "use strict";
  APP.Init();
  APP.timer = setInterval(APP.Show_World, 1000 / APP.GAME_FPS);
  window.addEventListener("keydown", APP.Keydown_Handler, false);
  APP.Reset = function ()
  {
    APP.map.Init();
    APP.player.Init();
    APP.monsters.Init();
    APP.blackout.style.transition = "0s";
    APP.blackout.style.visibility = "hidden";
    setTimeout(function ()
    {
      APP.timer = setInterval(APP.Show_World, 1000 / APP.GAME_FPS);
      APP.blackout.style.opacity = 0;
      APP.blackout.style.transition = "5s ease";
    }, 100);
  };
}());
