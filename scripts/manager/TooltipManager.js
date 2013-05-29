function TooltipManager() {
}
EventDispatcher.create(TooltipManager);
TooltipManager.EFFECTS = "effects";
TooltipManager.RETIRE_UNIT = "retireUnit";
TooltipManager.NEXT_WAVE = "nextWave";
TooltipManager.SHOOTER = "shooter";
TooltipManager.SHOOTER_UPGRADE = "shooterUpgrade";
TooltipManager.CANNON = "cannon";
TooltipManager.CANNON_UPGRADE = "cannonUpgrade";
TooltipManager.SABRE = "sabre";
TooltipManager.SABRE_UPGRADE = "sabreUpgrade";
TooltipManager.CABIN_BOY = "cabinBoy";
TooltipManager.CABIN_BOY_UPGRADE = "cabinBoyUpgrade";
TooltipManager.CAPTAIN = "captainBoy";
TooltipManager.CAPTAIN_UPGRADE = "captainUpgrade";
TooltipManager.DEMO_STEP = "demoStep";
TooltipManager.locked = false;
TooltipManager.getContent = function(e, c) {
  switch(e) {
    case TooltipManager.EFFECTS:
      return'<p class="tooltipArial"><strong>Internet Explorer 9</strong> unlocks the processing power of your PC by tapping into both the CPU and GPU, enabling rich experiences online that feels like a native application on your computer. In Pirates Love Daisies, this allows us to display animated background scenery and environmental effects without slowing down the game. For more examples of content enhanced with IE9, please visit <a href="http://www.beautyoftheweb.com" target="_blank">www.beautyoftheweb.com</a>.</p>';
    case TooltipManager.RETIRE:
      return'Send em away on shore leave, but ye not be gettin all your coin back. (shortcut key: "x")';
    case TooltipManager.NEXT_WAVE:
      return'Bring the next wave of scurvy dogs callin, ye get bonus points for bein eager. (shortcut key: "w")';
    case TooltipManager.SHOOTER:
      return'She\'s got half the eyes but twice the aim, ye pistol toting pirate be the best shot at takin down the winged demons of Davy Jones. (shortcut key: "1")';
    case TooltipManager.SHOOTER_UPGRADE:
      return'Scarlett knows a port where ye can get ye better pistols with a little gold, yarr, she be hearin word o\' good hair salons too. Eventually she may get a matchin pair and some better powder. (shortcut key: "space")';
    case TooltipManager.SABRE:
      return"Inigo be mostly deadly of all ye crew, just get the lad up close to the land lubbers and swab the decks when he's done with 'em. (shortcut key: \"2\")";
    case TooltipManager.SABRE_UPGRADE:
      return'Inigo with a finer blade will be a terror to all land lubbers, the finest blade in all the land allows a thrust that is inconceivable. Be tryin to stop the lad from giving Scarlett fashion advice. (shortcut key: "space")';
    case TooltipManager.CANNON:
      return"Aye, he be a bit slow but Lenny's cannon hits all the landlubbers nearby when it lands. Nothin be clearin a deck like Lenny's cannon or Lenny's smell. (shortcut key: \"3\")";
    case TooltipManager.CANNON_UPGRADE:
      return"If ye can spare Lenny some gold he'll be finding ye a ship or two he'll be convincin to split with their large cannons. Enough time around Lenny and he may get ye the best just to make him leave. (shortcut key: \"space\")";
    case TooltipManager.CABIN_BOY:
      return"Soapy Bill's sponges don't hurt much, but they be slowing both landlubbers & the winged demons, gives ye pirates more time to damage them. (shortcut key: \"4\")";
    case TooltipManager.CABIN_BOY_UPGRADE:
      return'Spare ye lad some coin for a better bucket and some real soap and ye be convinced he be a real man one day. When ye get the lad enough supplies ye get it all over the place when the sponge be landin. (shortcut key: "space")';
    case TooltipManager.CAPTAIN:
      return'Ye Captain boosts the morale of units around him, raisin their stats. Ye can only hire one captain at a time so be using him wisely. (shortcut key: "5")';
    case TooltipManager.CAPTAIN_UPGRADE:
      return'Ye captain in a new fancy hat be striking more fear into ye men than ye enemies, yarr, pirates always be workin best with a little fear. With an imposing hat it be harder to escape the influence. (shortcut key: "space")';
    case TooltipManager.DEMO_STEP:
      switch(c) {
        case 0:
          return"Hire an available unit by clicking one of the hire buttons, or using the shortcut keys 1-5. They will only be available if you have enough coins.<br/><br/>Click to hire Scarlett (or press '1') to continue.";
        case 1:
          return"Place a unit anywhere an anchor symbol is displayed on a map. Move your mouse over the anchors to show the range for the selected pirate.<br/><br/>Click this anchor to add Scarlett to the map.";
        case 2:
          return"Click a unit on the map to select it. This will allow you to modify your pirates.<br/><br/>Select this pirate to continue.";
        case 3:
          return"Upgrade or retire the pirate by clicking the appropriate button or clicking 'space' or 'x' respectively. You can also click anywhere else on the map (or hit 'escape') to deselect the pirate.<br/><br/>Upgrade Scarlett to level 2 to continue.";
        case 4:
          return"If there are no more creeps left in the current wave, you can click the 'Next Wave' button here to trigger the next wave immediately, and get some bonus points.<br/><br/>Click 'Next Wave' to begin playing!"
      }
      return"Demo Step Tooltip not set for " + c;
    default:
      return"Tooltip not set for " + e
  }
};
TooltipManager.SCALE9GRID = {top:10, bottom:10, left:10, right:10};
TooltipManager.show = function(e, c, a, b, d, g) {
  if(g == null) {
    g = 1E3
  }
  clearTimeout(TooltipManager.activeTimeout);
  TooltipManager.container != null && TooltipManager.container.remove();
  TooltipManager.activeTimeout = setTimeout(function() {
    TooltipManager.showOnDelay(e, c, a, b, d)
  }, g);
  return true
};
TooltipManager.showOnDelay = function(e, c, a, b, d) {
  var g = TooltipManager.container = $('<div class="tooltipContainer"><div id="tooltipText" ></div><div id="tooltipArrow"><img src="img/ui/tooltipArrow.png"></div></div>').appendTo($("#piratesLoveDaisies").get(0));
  if(b != false) {
    g.mouseenter(function() {
      clearTimeout(TooltipManager.activeTimeout)
    });
    g.mouseleave(function() {
      TooltipManager.hide()
    });
    g.onselectstart = g.onmousedown = function() {
      return false
    }
  }else {
    TooltipManager.locked = true
  }
  TooltipManager.text = TooltipManager.getContent(e, d || 0);
  g.css({width:c.width, height:c.height, top:c.y, left:c.x});
  g.scale9Grid(TooltipManager.SCALE9GRID);
  g.fadeIn(100);
  $("#tooltipText").html(TooltipManager.text);
  $("#tooltipArrow").css("top", c.height - 5);
  $("#tooltipArrow").css("left", a)
};
TooltipManager.hide = function(e) {
  clearTimeout(TooltipManager.activeTimeout);
  TooltipManager.locked = false;
  if(TooltipManager.container != null) {
    if(e == null) {
      e = 350
    }
    TooltipManager.activeTimeout = setTimeout(TooltipManager.fadeOut, e)
  }
};
TooltipManager.fadeOut = function() {
  TooltipManager.container.fadeOut(350);
  TooltipManager.activeTimeout = null
};