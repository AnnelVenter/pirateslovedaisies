(function(e) {
  function c(a) {
    this.DemoController(a)
  }
  c.steps = [{rect:new Rectangle(10, 507, 740, 105), arrowOffset:30}, {rect:new Rectangle(298, 145, 600, 105), arrowOffset:30}, {rect:new Rectangle(298, 145, 600, 80), arrowOffset:30}, {rect:new Rectangle(10, 507, 740, 105), arrowOffset:30}, {rect:new Rectangle(235, 507, 740, 105), arrowOffset:660}];
  c.HIRE = "hire";
  c.PLACE = "place";
  c.SELECT = "select";
  c.UPGRADE = "upgrade";
  c.BEGIN = "begin";
  c.STEP_NAMES = [c.HIRE, c.PLACE, c.SELECT, c.UPGRADE, c.BEGIN];
  c.prototype = {DemoController:function(a) {
    EventDispatcher.create(this);
    this.game = a;
    this.totalSteps = c.steps.length;
    this.step = -1;
    this.stepName = null;
    this.active = false
  }, start:function() {
    this.active = true;
    this.next()
  }, next:function() {
    this.step += 1;
    this.showNextStep()
  }, showNextStep:function() {
    if(this.step == this.totalSteps) {
      this.active = false;
      this.step = -1;
      this.stepName = null;
      this.dispatchEvent("complete");
      TooltipManager.hide()
    }else {
      this.stepName = c.STEP_NAMES[this.step];
      this.dispatchEvent("change");
      this.showTooltip()
    }
  }, showTooltip:function() {
    var a = this.getCurrentStep();
    TooltipManager.show(TooltipManager.DEMO_STEP, a.rect, a.arrowOffset || 0, false, this.step, 100)
  }, getCurrentStep:function() {
    return this.getStep(this.step)
  }, getStep:function(a) {
    return c.steps[a]
  }, toString:function() {
    return"[DemoController " + this.stepName + " (" + (this.active ? "active" : "inactive") + " " + this.step + "/" + this.totalSteps + ")]"
  }};
  e.DemoController = c
})(window);(function(e) {
  function c(a) {
    this.KrakenController(a)
  }
  c.prototype = {KrakenController:function(a) {
    this.game = a;
    this.active = false;
    this.volumeSpeed = 0.02;
    this.rain = new RainEffect(a.gameCanvas, ["img/rainDrop.png"], 0.2, 1, 0.5);
    this.rain.setEnabled(Game.effectsEnabled);
    this.storm = new StormEffect(a.gameCanvas, true);
    this.count = 0;
    this.transition = null
  }, addKraken:function() {
    this.count == 0 && this.start();
    this.count++
  }, removeKraken:function() {
    this.count--;
    this.count <= 0 && this.stop()
  }, tick:function() {
    switch(this.transition) {
      case "in":
        if(this.game.music) {
          this.game.music.volume = Math.max(0, this.game.music.volume - this.volumeSpeed);
          if(this.game.music.volume <= 0) {
            Tick.removeListener(this);
            try {
              this.game.music.pause()
            }catch(a) {
            }
            this.game.music.volume = 1;
            this.transition = null
          }
        }
        break;
      case "out":
        if(this.game.music && this.music) {
          this.game.music.volume = Math.min(1, this.game.music.volume + this.volumeSpeed);
          this.music.volume = 1 - this.game.music.volume;
          if(this.game.music.volume >= 1) {
            Tick.removeListener(this);
            try {
              this.music.pause()
            }catch(b) {
            }
            this.music.volume = 1;
            this.transition = null
          }
        }
        break;
      default:
    }
  }, start:function() {
    this.active = true;
    this.game.effectsList.push(this.rain);
    this.rain.start();
    this.game.effectsList.push(this.storm);
    this.storm.start();
    if(AudioManager.muted) {
      this.game.music.pause()
    }else {
      this.transition = "in";
      Tick.addListener(this)
    }
    this.music = AudioManager.playSound(AudioManager.KRAKEN_MUSIC, true)
  }, resume:function() {
    this.game.music.pause();
    this.music = AudioManager.playSound(AudioManager.KRAKEN_MUSIC, true)
  }, stop:function() {
    this.active = false;
    this.rain.stop();
    this.storm.stop();
    this.game.music.volume = 0;
    this.game.music.play();
    if(AudioManager.muted) {
      this.music.pause()
    }else {
      this.transition = "out";
      Tick.addListener(this)
    }
  }, cleanUp:function() {
    this.stop();
    this.game = this.storm = this.music = null
  }, toString:function() {
    return"[KrakenController]"
  }};
  e.KrakenController = c
})(window);(function(e) {
  function c(a, b, d) {
    this.HexTile(a, b, d)
  }
  c.CREEP = 2;
  c.TOWER = 4;
  c.IMPASSABLE = 6;
  c.prototype = {HexTile:function(a, b, d) {
    this.index = a;
    this.column = b;
    this.row = d;
    this.y = this.x = 0;
    this.mapData = {};
    this.neighbors = []
  }, toString:function() {
    return this.formatToString("index", "x", "y")
  }};
  e.HexTile = c
})(window);