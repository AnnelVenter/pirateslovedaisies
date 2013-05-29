(function(e) {
  function c(a, b) {
    this.NextWaveIndicator(a, b)
  }
  c.prototype = {
    NextWaveIndicator: function(a, b) {
      this.div = a;
      this.canvas = this.div.children("canvas").get(0);
      this.canvas.width = 220;
      this.canvas.height = 75;
      this.stage = new Stage(this.canvas);
      this.creepContainer = this.stage.addChild(new Container);
      this.nextWaveButton = new UIButton(this.div.children("#nextWaveButton"), "img/nextWaveBtn.png", ["up", "over", "down", "disabled"]);
      this.wm = b;
      this.nextWaveEvent = new EventProxy(this, "handleNextWave");
      this.wm.addEventListener("nextWave", this.nextWaveEvent);
      this.label = this.div.children("label");
      this.label.text("Waiting...");
      this.div.append(this.label);
      this.div.click($.proxy(this, "handleClick"));
      this.div.mouseenter($.proxy(this, "handleRollOver"));
      this.div.mouseleave($.proxy(this, "handleRollOut"));
      this.sprites = [];
      Tick.addListener(this, false);
      this.handleNextWave(null);
      this.wm.getCurrentWave().totalCreeps == 0 && this.removeLastCreep()
    },
    handleRollOver: function(a) {
      this.nextWaveButton.handleRollOver(a)
    },
    handleRollOut: function(a) {
      this.nextWaveButton.handleRollOut(a)
    },
    handleClick: function(a) {
      if (this.nextWaveButton.enabled) {
        this.demoIndex > -1 && this.demoIndex < 4 || this.triggerNextWave(a)
      }
    },
    sortFunction: function(a, b) {
      return a.x > b.x ? -1 : a.x < b.x ? 1 : 0
    },
    triggerNextWave: function() {
      this.wm.sendNextWave()
    },
    setDemoMode: function(a) {
      this.demoIndex = a;
      switch (a) {
        case 4:
          this.nextWaveButton.setEnabled(true);
          this.div.css("cursor", "pointer");
          this.label.css("cursor", "pointer");
          break;
        case 0:
          this.nextWaveButton.setEnabled(false);
          this.div.css("cursor", "auto");
          this.label.css("cursor", "default");
          break
      }
    },
    handleNextWave: function() {
      this.nextWave = this.wm.getNextWave();
      if (this.nextWave == null) {
        this.showLastWave()
      } else {
        this.updatePreview();
        this.totalTime = this.wm.getTimeTillNextWave();
        this.updateTime();
        this.div.css("cursor", "auto");
        this.label.css("cursor", "default");
        this.nextWaveButton.setEnabled(false)
      }
    },
    updatePreview: function() {
      for (var a = 0, b = this.sprites.length; a < b; a++) {}
      this.creepContainer.children = [];
      b = this.nextWave.getCreepTypes();
      this.sprites = [];
      a = 0;
      for (var d in b) {
        if (b.hasOwnProperty(d)) {
          var g = BitmapModel.getBitmap(d);
          if (g != null) {
            g.gotoAndPlay(Creep.RIGHT);
            g.x = g.regX + 10 + a * 40;
            g.y = 55 - a * 3;
            if (g.name == "gull") {
              g.y += 10
            } else {
              if (g.name == "octopus") {
                g.y -= 10
              }
            }
            this.creepContainer.addChild(g);
            this.sprites.push(g);
            a++
          }
        }
      }
      this.wm.currentWave == 0 ? this.label.text("Next Wave...") : this.label.text("Next Wave (" + this.wm.currentWave + "/" + (this.wm.waves.length - 1) + ")")
    },
    updateTime: function() {
      if (this.nextWave != null) {
        var a = 202 - this.wm.getTimeTillNextWave() / this.totalTime * 202;
        if (this.timebar == null) {
          this.timebar = new Shape;
          this.stage.addChild(this.timebar)
        }
        this.timebar.graphics.clear().beginFill("#96B4B5").drawRect(14, 64, a, 6).endFill()
      }
    },
    showLastWave: function() {
      this.creepContainer.children = [];
      this.label.text("Almost There!");
      this.nextWaveButton.setEnabled(false)
    },
    removeLastCreep: function() {
      this.div.css("cursor", "pointer");
      this.label.css("cursor", "pointer");
      this.nextWave != null && this.nextWaveButton.setEnabled(true)
    },
    tick: function() {
      this.stage.tick();
      this.updateTime()
    },
    cleanUp: function() {
      Tick.removeListener(this);
      this.label = this.nextWaveButton = null;
      this.wm != null && this.wm.removeEventListener("nextWave", this.nextWaveEvent);
      this.wm = null;
      for (var a = 0, b = this.sprites.length; a < b; a++) {
        BitmapModel.saveBitmap(this.sprites[a])
      }
      this.creepContainer.children = [];
      this.stage.children = [];
      this.timebar = this.sprites = null;
      this.div.unbind()
    }
  };
  e.NextWaveIndicator = c
})(window);