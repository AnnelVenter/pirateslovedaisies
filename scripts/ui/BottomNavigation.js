(function(e) {
  function c(a, b) {
    this.BottomNavigation(a, b)
  }
  c.SELECTED_DROPSHADOW = {
    color: "#000",
    offsetX: 0,
    offsetY: 0,
    blur: 10
  };
  c.prototype = {
    BottomNavigation: function(a, b) {
      EventDispatcher.create(this);
      this.div = a;
      this.game = b;
      this.gameInfo = b.gameInfo;
      this.handleGameChangeEvent = new EventProxy(this, "handleMoneyChange");
      this.gameInfo.addEventListener("change", this.handleGameChangeEvent);
      this.currentMoney = 0;
      this.hireButtons = [];
      var d = [Pirate.SHOOTER, Pirate.SABRE, Pirate.CANNON, Pirate.CABIN_BOY, Pirate.CAPTAIN];
      this.handleHireProxy = new EventProxy(this, "handleHire");
      this.handleRollOverProxy = new EventProxy(this, "handleButtonOver");
      this.handleRollOutProxy = new EventProxy(this, "handleButtonOut");
      for (var g = a.children(".hireButton"), m = 0, q = g.length; m < q; m++) {
        var s = PirateManager.getPirate(d[m], 1),
          y = $(g.get(m));
        s = new MenuButton(y, s, "{1}");
        s.addEventListener("click", this.handleHireProxy);
        s.addEventListener("rollOver", this.handleRollOverProxy);
        s.addEventListener("rollOut", this.handleRollOutProxy);
        this.hireButtons.push(s);
        y.css("left", 10 + m * 140)
      }
      y = this.div.children("#upgradeButton");
      y.css("left", 10);
      this.upgradeButton = new MenuButton(y.get(0), PirateManager.getPirate(Pirate.CANNON, 1), "Upgrade {1}", "editOptions", "upgrade");
      this.upgradeButton.labelWidth = 270;
      this.upgradeButton.addEventListener("click", new EventProxy(this, "handleUpgrade"));
      this.upgradeButton.addEventListener("rollOver", new EventProxy(this, "handleButtonOver"));
      this.upgradeButton.addEventListener("rollOut", new EventProxy(this, "handleButtonOut"));
      y = this.div.children("#retireButton");
      y.css("left", 270);
      this.retireButton = new MenuButton(y.get(0), PirateManager.getPirate(Pirate.CANNON, 1), "Retire {1}", "editOptions", "retire");
      this.retireButton.labelWidth = 250;
      this.retireButton.costField = "resale";
      this.retireButton.addEventListener("click", new EventProxy(this, "handleRetire"));
      this.retireButton.addEventListener("rollOver", new EventProxy(this, "handleButtonOver"));
      this.retireButton.addEventListener("rollOut", new EventProxy(this, "handleButtonOut"));
      this.waveContainer = this.div.children("#nextWaveIndicator");
      this.waveContainer.mouseenter($.proxy(this, "handleWaveOver"));
      this.waveContainer.mouseleave($.proxy(this, "handleWaveOut"));
      this.waveContainer.css("display", "none");
      this.demoIndex = -1;
      this.setMode("hire")
    },
    setWaveManager: function(a) {
      this.waveManager = a;
      this.nextWave = new NextWaveIndicator(this.waveContainer, a);
      this.waveContainer.css("display", "block");
      this.waveContainer.css("left", 740)
    },
    setCaptain: function(a) {
      this.captain = a;
      var b = this.hireButtons[4];
      b.setEnabled(a == null && b.data.cost <= this.currentMoney)
    },
    setSelected: function(a) {
      for (var b = 0; b < this.hireButtons.length; b++) {
        var d = this.hireButtons[b];
        a != null && d.data.pirateType == a.pirateType ? d.setSelected(true) : d.setSelected(false)
      }
    },
    simulateHire: function(a) {
      a = this.hireButtons[a];
      a.enabled && this.handleHire({
        target: a
      })
    },
    handleHire: function(a) {
      if (!(this.demoIndex > 0)) {
        if (!(this.demoIndex == 0 && this.hireButtons.indexOf(a.target) != 0)) {
          this.demoIndex < 0 && TooltipManager.hide(0);
          AudioManager.playSound(AudioManager.CLICK);
          this.dispatchEvent("hire", {
            pirateData: this.currentHire = a.target.data
          })
        }
      }
    },
    handleButtonOver: function(a) {
      if (!(this.demoIndex > -1)) {
        var b = a.target.data,
          d = this.mode == "edit",
          g = new Rectangle(10, 550, 650, 60);
        a = a.target.iconState;
        var m, q;
        if (d && a == "retire") {
          m = TooltipManager.RETIRE;
          q = 218;
          g.width += 20
        } else {
          switch (b.pirateType) {
            case Pirate.SHOOTER:
              m = d ? TooltipManager.SHOOTER_UPGRADE : TooltipManager.SHOOTER;
              q = 5;
              break;
            case Pirate.SABRE:
              m = d ? TooltipManager.SABRE_UPGRADE : TooltipManager.SABRE;
              q = d ? 5 : 144;
              break;
            case Pirate.CANNON:
              m = d ? TooltipManager.CANNON_UPGRADE : TooltipManager.CANNON;
              q = d ? 5 : 288;
              break;
            case Pirate.CABIN_BOY:
              m = d ? TooltipManager.CABIN_BOY_UPGRADE : TooltipManager.CABIN_BOY;
              q = d ? 5 : 432;
              break;
            case Pirate.CAPTAIN:
              m = d ? TooltipManager.CAPTAIN_UPGRADE : TooltipManager.CAPTAIN;
              q = d ? 5 : 576;
              break
          }
          if (d) {
            g.width += 210
          }
        }
        TooltipManager.show(m, g, q)
      }
    },
    handleButtonOut: function() {
      this.demoIndex > -1 || TooltipManager.hide()
    },
    handleWaveOver: function() {
      if (!(this.demoIndex > -1)) {
        var a = new Rectangle(220, 565, 750, 45);
        TooltipManager.show(TooltipManager.NEXT_WAVE, a, 550)
      }
    },
    handleWaveOut: function() {
      this.demoIndex > -1 || TooltipManager.hide()
    },
    simulateUpgrade: function() {
      var a = this.upgradeButton;
      a.enabled && this.handleUpgrade({
        target: a
      })
    },
    handleUpgrade: function(a) {
      this.demoIndex < 0 && TooltipManager.hide(0);
      AudioManager.playSound(AudioManager.CLICK);
      this.dispatchEvent("upgrade", a.target.data)
    },
    handleRetire: function(a) {
      if (!(this.demoIndex > -1)) {
        TooltipManager.hide(0);
        AudioManager.playSound(AudioManager.CLICK);
        this.dispatchEvent("retire", a.target.data)
      }
    },
    setMode: function(a) {
      if (this.mode != a) {
        this.mode = a;
        if (a == "hire") {
          this.div.children(".hireButton").css("display", "block");
          this.div.children(".editButton").css("display", "none")
        } else {
          if (a == "edit") {
            this.div.children(".hireButton").css("display", "none");
            this.div.children(".editButton").css("display", "block")
          }
        }
      }
    },
    setEditMode: function(a) {
      this.pirateData = a;
      if (PirateManager.getUpgradeTotal(a.pirateType) == a.level) {
        this.upgradeButton.setData(a, "Fully Upgraded");
        this.upgradeButton.setEnabled(false);
        this.upgradeButton.costLabel.css("visibility", "hidden")
      } else {
        var b = this.gameInfo.money;
        this.upgradeButton.setData(PirateManager.getPirate(a.pirateType, a.level + 1), "Upgrade {1}");
        this.upgradeButton.setEnabled(this.upgradeButton.data.cost <= b);
        this.upgradeButton.costLabel.css("visibility", "visible")
      }
      this.retireButton.setData(a);
      this.setMode("edit")
    },
    setDemoMode: function(a) {
      this.demoIndex = a;
      this.handleMoneyChange(null);
      this.nextWave.setDemoMode(a);
      if (a != -1) {
        a = 0;
        for (var b = this.hireButtons.length; a < b; a++) {
          a != 0 && this.hireButtons[a].setEnabled(false)
        }
      }
    },
    handleMoneyChange: function() {
      var a = this.gameInfo.money;
      this.currentMoney = a;
      for (var b = 0, d = this.hireButtons.length; b < d; b++) {
        var g = this.hireButtons[b];
        b == 4 ? g.setEnabled(g.data.cost <= a && this.captain == null) : g.setEnabled(g.data.cost <= a)
      }
      this.mode == "edit" && this.upgradeButton.setEnabled(this.upgradeButton.data.cost <= a && this.pirateData.level < PirateManager.getUpgradeTotal(this.pirateData.pirateType))
    },
    cleanUp: function() {
      for (var a = 0, b = this.hireButtons.length; a < b; a++) {
        this.hireButtons[a].cleanUp()
      }
      this.hireButtons = null;
      this.upgradeButton.cleanUp();
      this.retireButton.cleanUp();
      this.upgradeButton = this.retireButton = null;
      this.nextWave != null && this.nextWave.cleanUp();
      this.waveContainer = this.nextWave = this.waveManager = null
    },
    toString: function() {
      return "[BottomNavigation]"
    }
  };
  e.BottomNavigation = c
})(window);