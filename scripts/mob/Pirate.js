(function(e) {
  function c(a, b, d, g, m, q, s) {
    this.Pirate(a, b, d, g, m, q, s)
  }
  c.DOWN_LEFT = "DL";
  c.LEFT = "L";
  c.UP_LEFT = "UL";
  c.UP_RIGHT = "UR";
  c.RIGHT = "R";
  c.DOWN_RIGHT = "DR";
  c.DIRECTIONS = [c.LEFT, c.UP_LEFT, c.UP_RIGHT, c.RIGHT, c.DOWN_RIGHT, c.DOWN_LEFT];
  c.ROLL_OVER_DROPSHADOW = {color:"#000", offsetX:0, offsetY:0, blur:2};
  c.SELECTED_DROPSHADOW = {color:"#000", offsetX:0, offsetY:0, blur:15};
  c.CABIN_BOY = "cabinBoy";
  c.SHOOTER = "shooter";
  c.CANNON = "cannon";
  c.SABRE = "sabre";
  c.CAPTAIN = "captain";
  c.prototype = {Pirate:function(a, b, d, g, m, q, s) {
    EventDispatcher.create(this);
    this.bitmapSequence = this.sprite = a;
    this.stage = d;
    this.stage.addChild(a);
    this.shadowBitmap = b;
    this.regX = a.regX;
    this.tickOffset = 4;
    this.tickCount = 0;
    this.isCaptain = m.pirateType == c.CAPTAIN;
    this.currentLevel = 1;
    this.offset = g;
    this.data = m;
    this.costSoFar = m.cost;
    this.tileIndex = q;
    this.creepHash = s;
    this.data = m;
    this.projectileDelay = m.projectileDelay || 0;
    this.directions = c.DIRECTIONS;
    this.direction = 0;
    a = this.getState("Static");
    this.fixOffset();
    this.bitmapSequence.gotoAndStop(a);
    this.targetDirection = 0;
    this.attacking = false;
    this.firing = -1;
    this.targetCreep = null;
    this.waiting = this.waitDelay = 0;
    this.motivating = false;
    this.blink = 0;
    this.blinkDelay = ((Math.random() * 50 | 0) + 25) * Tick.fps;
    this.tick();
    if(gMode == true) {
      this.addHead();
      this.updateHead()
    }
    Tick.addListener(this, true)
  }, addChild:function(a) {
    if(this.sprite instanceof BitmapSequence) {
      this.sprite = new Container;
      this.sprite.name = this.bitmapSequence.name;
      this.sprite.data = this.bitmapSequence.data;
      this.sprite.id = this.bitmapSequence.id;
      this.sprite.x = this.bitmapSequence.x;
      this.sprite.y = this.bitmapSequence.y;
      this.bitmapSequence.x = this.bitmapSequence.y = 0;
      this.bitmapSequence.alpha = 1;
      this.stage.removeChild(this.bitmapSequence);
      this.stage.addChildAt(this.sprite, 0);
      this.sprite.addChildAt(this.bitmapSequence, 0)
    }
    this.sprite.addChild(a)
  }, removeChild:function(a) {
    if(!(this.sprite instanceof BitmapSequence)) {
      this.sprite.removeChild(a);
      if(this.sprite.getNumChildren() == 1) {
        this.bitmapSequence.x = this.sprite.x;
        this.bitmapSequence.y = this.sprite.y;
        this.bitmapSequence.alpha = this.sprite.alpha;
        this.stage.removeChild(this.sprite);
        this.sprite = this.bitmapSequence;
        this.stage.addChild(this.sprite)
      }
    }
  }, fixOffset:function() {
    if(this.bitmapSequence.usesSpriteFlip) {
      this.bitmapSequence.regX = this.direction >= 2 && this.direction <= 4 ? this.regX : this.bitmapSequence.spriteSheet.frameWidth - this.regX
    }
  }, setMotivation:function(a, b) {
    this.motivated = a;
    var d = this.data.motivate;
    this.rangeMultiplier = (d & PirateManager.RANGE) > 0 ? a : 1;
    this.damageMultiplier = (d & PirateManager.DAMAGE) > 0 ? a : 1;
    this.rateOfFireMultiplier = (d & PirateManager.RATE_OF_FIRE) > 0 ? a : 1;
    this.splashMultiplier = (d & PirateManager.SPLASH) > 0 ? a : 1;
    if(this.motivated > 1) {
      if(this.motivateIcon == null) {
        this.motivateIcon = BitmapModel.getBitmap("motivationStar");
        this.addChild(this.motivateIcon);
        this.motivateIcon.x = 20;
        this.motivateIcon.y = -21
      }
      this.motivateIcon.gotoAndStop("level" + b)
    }else {
      if(this.motivateIcon != null) {
        this.removeChild(this.motivateIcon);
        BitmapModel.saveBitmap(this.motivateIcon);
        this.motivateIcon = null
      }
    }
  }, getState:function(a) {
    return"l" + this.data.level + a + (this.isCaptain ? c.DOWN_LEFT : this.directions[this.direction])
  }, tick:function() {
    if(this.attacking) {
      this.firing > 0 && --this.firing == 0 && this.fire()
    }else {
      if(!this.isCaptain) {
        if(this.waiting < this.waitDelay) {
          this.waiting += 1
        }else {
          this.attack()
        }
      }
    }
  }, upgrade:function() {
    if(this.currentLevel != 3) {
      this.currentLevel++;
      this.data = PirateManager.getPirate(this.data.pirateType, this.currentLevel);
      this.costSoFar += this.data.cost;
      this.data.resale = this.costSoFar * 0.75 | 0;
      this.attacking = false;
      this.bitmapSequence.gotoAndStop(this.getState(this.blink ? "Blink" : "Static"))
    }
  }, retire:function() {
    this.dispose()
  }, dispose:function() {
    this.data = this.creeps = this.creepHash = this.targetCreep = null;
    Tick.removeListener(this);
    this.removeAllListeners();
    if(this.motivateIcon != null) {
      BitmapModel.saveBitmap(this.motivateIcon);
      this.motivateIcon = null
    }
    this.bitmapSequence.regX = this.regX;
    BitmapModel.saveBitmap(this.bitmapSequence);
    this.stage.removeChild(this.sprite);
    this.sprite = this.shadowBitmap = null
  }, findCreepDistance:function(a) {
    if(a == null || a.sprite == null) {
      return Number.POSITIVE_INFINITY
    }
    return Math.sqrt(Math.pow(a.sprite.x - this.sprite.x, 2) + Math.pow(a.sprite.y - this.sprite.y, 2))
  }, attack:function(a) {
    this.tickCount++;
    if(!(this.tickCount % this.tickOffset > 0)) {
      a = this.targetCreep;
      if(a != null) {
        if(a.alive) {
          if(this.findCreepDistance(a) > this.data.range * this.rangeMultiplier) {
            this.targetCreep = null
          }
        }else {
          this.targetCreep = null
        }
      }else {
        var b = this.data.range * this.rangeMultiplier + 1;
        for(var d in this.creepHash) {
          if(this.creepHash.hasOwnProperty(d)) {
            a = this.creepHash[d];
            if(!(a.data.isAir == true && this.sprite.data.hitsAir == false)) {
              var g = this.findCreepDistance(a);
              if(g < b && a.currentTile != null) {
                b = g;
                this.targetCreep = a;
                if(a.daisy != null) {
                  break
                }
              }
            }
          }
        }
      }
      a = this.targetCreep;
      if(a == null) {
        this.moveToDirection(this.targetDirection)
      }else {
        if(b != null) {
          this.projectileSpeed = Math.max(10, Math.min(24, b / 12))
        }
        b = this.creepPosition = this.data.projectile == null ? new Point(a.sprite.x, a.sprite.y) : a.lookAhead(this.projectileSpeed + this.projectileDelay);
        b = Math.atan2(this.sprite.y - b.y, this.sprite.x - b.x) * Number.RADIANS + 30;
        if(b < 0) {
          b += 360
        }else {
          if(b > 360) {
            b -= 360
          }
        }
        this.targetDirection = b / 60 | 0;
        if(this.targetDirection == 6) {
          this.targetDirection = 0
        }
        a = this.targetDirection;
        b = this.direction;
        if(a != b) {
          this.moveToDirection(a)
        }else {
          if(a == b) {
            this.attacking = true;
            b = this.data.projectileDelay;
            if(b == null || b == 0) {
              this.fire()
            }else {
              this.firing = b
            }
            this.bitmapSequence.callback = $.proxy(this, "handleAttackComplete");
            b = this.bitmapSequence.gotoAndPlay(this.getState("Attack"));
            this.waitDelay = Math.max(0, this.data.rateOfFire / this.rateOfFireMultiplier * Tick.fps - b)
          }
          this.updateHead()
        }
      }
    }
  }, moveToDirection:function(a) {
    var b = this.direction;
    if(a != b) {
      var d = this.directions.length, g, m;
      if(a > b) {
        g = a - b;
        m = b + (d - a)
      }else {
        m = b - a;
        g = a + (d - b)
      }
      if(g < m) {
        b += 1;
        if(b >= d) {
          b = 0
        }
      }else {
        b -= 1;
        if(b < 0) {
          b = d - 1
        }
      }
      this.direction = b;
      this.fixOffset();
      this.bitmapSequence.gotoAndStop(this.getState("Static"));
      this.tickCount += 2
    }
  }, fire:function() {
    var a = this.targetCreep;
    switch(this.data.pirateType) {
      case c.SABRE:
        AudioManager.playSound(AudioManager.SABRE_FIRE);
        AudioManager.playSoundDelayed(AudioManager.SABRE_FIRE, this.currentLevel == 1 ? 350 : 500);
        break;
      case c.SHOOTER:
        AudioManager.playSound(AudioManager.SHOOTER_FIRE);
        this.currentLevel > 2 && AudioManager.playSoundDelayed(AudioManager.SHOOTER_FIRE, 400);
        break;
      case c.CANNON:
        AudioManager.playSound(AudioManager.CANNON_FIRE);
        break
    }
    if(this.data.projectile == null) {
      a.alive && a.applyDamage(this.data.damage * this.damageMultiplier, this.data.slowAmount, this.data.slowDuration)
    }else {
      this.dispatchEvent("fire", {projectile:new CannonBall(this, a, this.data.projectile, this.creepPosition, this.projectileSpeed)});
      this.firing = -1;
      if(!a.alive) {
        this.targetCreep = null
      }
    }
  }, handleAttackComplete:function() {
    this.data.pirateType == c.CAPTAIN && this.dispatchEvent("faceShore");
    this.bitmapSequence.callback = null;
    this.bitmapSequence.gotoAndStop(this.getState("Static"));
    this.attacking = this.motivating = false;
    this.waiting = 0
  }, motivate:function() {
    if(this.isCaptain) {
      if(!this.motivating) {
        this.motivating = true;
        this.bitmapSequence.callback = $.proxy(this, "handleAttackComplete");
        this.bitmapSequence.gotoAndPlay(this.getState("Attack"));
        AudioManager.playSound(AudioManager.CAPTAIN_AHOY)
      }
    }
  }, addHead:function() {
    switch(this.data.pirateType) {
      case c.SABRE:
        this.headIcon = BitmapModel.getBitmap("gHead");
        break;
      case c.CANNON:
        this.headIcon = BitmapModel.getBitmap("lHead");
        break;
      case c.CABIN_BOY:
        this.headIcon = BitmapModel.getBitmap("eHead");
        break;
      case c.SHOOTER:
        this.headIcon = BitmapModel.getBitmap("sHead");
        break
    }
    this.headIcon != null && this.addChild(this.headIcon)
  }, updateHead:function() {
    if(this.headIcon != null) {
      if(this.direction >= 2 && this.direction <= 4) {
        switch(this.data.pirateType) {
          case c.SABRE:
            break
        }
        this.headIcon.scaleX = -1
      }else {
        this.headIcon.scaleX = 1
      }
    }
  }, toString:function() {
    return"[Pirate " + this.sprite.id + "]"
  }};
  e.Pirate = c
})(window);