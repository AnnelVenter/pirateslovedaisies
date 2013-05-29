(function(e) {
  function c(a, b, d, g, m) {
    this.MenuButton(a, b, d, g, m)
  }
  c.prototype = {
    MenuButton: function(a, b, d, g, m) {
      EventDispatcher.create(this);
      this.div = $(a);
      this.canvas = $("<canvas></canvas>");
      this.div.append(this.canvas);
      this.canvas.get(0).width = 100;
      this.canvas.get(0).height = 80;
      this.isSelected = false;
      this.label = $("<label class='title'></label>");
      this.div.append(this.label);
      this.labelWidth = 75;
      this.costLabel = $("<label class='money'></label>");
      this.div.append(this.costLabel);
      this.costField = "cost";
      this.stage = new Stage(this.canvas.get(0));
      a = BitmapModel.getBitmap("MenuButton_background");
      a.currentFrame = 0;
      this.stage.addChild(a);
      if (g != null) {
        this.iconState = m;
        this.iconSprite = BitmapModel.getBitmap(g);
        this.iconSprite.gotoAndStop(this.iconState + "Up");
        this.iconSprite.y = 5
      }
      this.enabled = true;
      this.div.click($.proxy(this, "handleClick"));
      this.div.mouseenter($.proxy(this, "handleRollOver"));
      this.div.mouseleave($.proxy(this, "handleRollOut"));
      this.setData(b, d);
      this.setEnabled(this.enabled, true);
      this.tick()
    },
    getCost: function() {
      return this.data[this.costField]
    },
    handleClick: function() {
      this.enabled && this.dispatchEvent("click")
    },
    handleRollOver: function() {
      this.dispatchEvent("rollOver");
      if (this.enabled) {
        this.sprite.gotoAndPlay("l" + this.data.level + "Attack" + Pirate.DOWN_LEFT);
        this.setHighlight(true);
        Tick.addListener(this, false)
      }
    },
    handleRollOut: function() {
      if (this.stage != null) {
        this.dispatchEvent("rollOut");
        if (this.enabled) {
          this.sprite.gotoAndStop("l" + this.data.level + "Static" + Pirate.DOWN_LEFT);
          this.isSelected != true && this.setHighlight(false);
          Tick.removeListener(this);
          this.stage.tick()
        }
      }
    },
    setSelected: function(a) {
      this.isSelected = a;
      this.setHighlight(a);
      this.tick()
    },
    setHighlight: function(a) {
      if (a == true) {
        this.label.css("color", "#006699");
        this.iconSprite != null && this.iconSprite.gotoAndStop(this.iconState + "Over")
      } else {
        this.label.css("color", "#000000");
        this.iconSprite != null && this.iconSprite.gotoAndStop(this.iconState + "Up")
      }
      this.sprite.shadow = a && this.enabled ? BottomNavigation.SELECTED_DROPSHADOW : null
    },
    setData: function(a, b) {
      if (this.data == null || this.data.pirateType != a.pirateType) {
        if (this.sprite != null) {
          this.stage.removeChild(this.sprite);
          BitmapModel.saveBitmap(this.sprite)
        }
        this.sprite = BitmapModel.getBitmap(a.pirateType);
        this.sprite.y = 50;
        switch (a.pirateType) {
          case Pirate.CAPTAIN:
            this.sprite.x = 30;
            break;
          case Pirate.CABIN_BOY:
            ;
          case Pirate.SABRE:
            this.sprite.x = 20;
            break;
          case Pirate.SHOOTER:
            this.sprite.x = 10;
            break;
          case Pirate.CANNON:
            this.sprite.y -= 2;
            this.sprite.x = 30;
            break
        }
        this.stage.addChild(this.sprite);
        this.iconSprite != null && this.stage.addChild(this.iconSprite)
      }
      this.data = a;
      if (b != null) {
        this.labelFormat = b
      }
      this.sprite.gotoAndStop("l" + this.data.level + "Static" + Pirate.DOWN_LEFT);
      var d = 0;
      this.canvas.css("left", d);
      d += 58;
      this.label.css("left", d);
      this.label.html(this.labelFormat.supplant([this.data.level, this.sprite.label]));
      this.costLabel.css("left", d);
      this.costLabel.css("top", 35);
      this.costLabel.html(this.getCost());
      d += 2;
      this.width = d + this.labelWidth;
      this.height = 80;
      this.div.css("width", this.width);
      this.div.css("height", this.height);
      this.setEnabled(this.enabled, true)
    },
    tick: function() {
      this.stage.tick()
    },
    setEnabled: function(a, b) {
      if (!(this.enabled == a && b != true)) {
        (this.enabled = a) || this.setHighlight(false);
        this.sprite.alpha = this.enabled ? 1 : 0.3;
        var d = this.enabled ? "#000000" : "#C5DADB";
        this.label.css("color", d);
        this.costLabel.css("color", d);
        if (this.iconSprite != null) {
          this.iconSprite.alpha = this.enabled ? 1 : 0.3
        }
        this.div.css("cursor", a ? "pointer" : "auto");
        this.label.css("cursor", a ? "pointer" : "default");
        this.costLabel.css("cursor", a ? "pointer" : "default");
        Tick.removeListener(this);
        this.tick()
      }
    },
    cleanUp: function() {
      BitmapModel.saveBitmap(this.sprite);
      BitmapModel.saveBitmap(this.iconSprite);
      this.stage = this.stage.canvas = null;
      this.label.remove();
      this.canvas.remove();
      this.costLabel.remove();
      $(this.div).unbind();
      Tick.removeListener(this)
    },
    toString: function() {
      return "[MenuButton]"
    }
  };
  e.MenuButton = c
})(window);