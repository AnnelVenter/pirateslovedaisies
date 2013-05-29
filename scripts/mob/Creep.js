(function(e) {
  function c(a, b, d, g, m, q, s) {
    this.Creep(a, b, d, g, m, q, s)
  }
  c.DOWN_LEFT = "downLeft";
  c.LEFT = "forwardLeft";
  c.UP_LEFT = "upLeft";
  c.UP_RIGHT = "up";
  c.RIGHT = "forward";
  c.DOWN_RIGHT = "down";
  c.SLOW_DROPSHADOW = {color:"#0066ff", offsetX:0, offsetY:0, blur:6};
  c.prototype = {Creep:function(a, b, d, g, m, q) {
    EventDispatcher.create(this);
    this.id = a.id;
    this.type = a.name;
    this.bitmapSequence = this.sprite = a;
    this.stage = d;
    this.stage.addChild(a);
    this.sprite.alpha = 0;
    this.shadowBitmap = b;
    this.shadowBitmap.alpha = this.sprite.alpha;
    this.shadowOffset = new Point(this.sprite.data.shadowOffset[0], this.sprite.data.shadowOffset[1]);
    this.shadowBitmap.x = this.sprite.x + this.shadowOffset.x;
    this.shadowBitmap.y = this.sprite.y + this.shadowOffset.y;
    this.daisy = this.deathAnimation = null;
    if(this.type == "kraken") {
      this.healthMeter = BitmapModel.getBitmap("HealthMeter");
      this.addChild(this.healthMeter)
    }
    this.baseValues = this.bitmapSequence.data;
    this.waveValues = q;
    this.hexRadius = currentGame.hexMapModel.getMetrics().getColumnWidth() / 2;
    this.hexDiameter = this.hexRadius * 2;
    this.nextTile = this.targetTile = this.currentTile = null;
    this.remainingDistance = 0;
    this.ratioX = 1;
    this.ratioY = 0;
    this.alive = true;
    this.leaving = false;
    this.isAir = a.data.ignoresImpassible;
    this.goingHome = this.gettingDroppedDaisy = false;
    this.xOffset = m;
    this.directions = [c.RIGHT, c.DOWN_RIGHT, c.DOWN_LEFT, c.LEFT, c.UP_LEFT, c.UP_RIGHT];
    this.lastDirection = -1;
    this.slowAmount = 0;
    a = q.level;
    if(currentGame && currentGame.mode == GameInfo.EPIC_MODE) {
      a *= Math.round(GameInfo.EPIC_CREEP_LEVEL_MULTIPLIER)
    }
    this.data = {type:null, minHP:null, maxHP:null, minSpeedMultiplier:null, isAir:null, armor:null, minSpeed:null, maxSpeed:null, moneyValue:null, scoreValue:null, ignoresImpassible:null, waveID:null, exits:null};
    for(var s in this.data) {
      if(this.data.hasOwnProperty(s)) {
        this.data[s] = this.waveValues[s] == null ? this.baseValues[s] : this.waveValues[s]
      }
    }
    this.speed = this.lerp(this.data.maxSpeed, this.data.minSpeed, a);
    this.armor = this.lerp(this.data.minArmor, this.data.maxArmor, a) | 0;
    this.hitPoints = this.totalHitPoints = this.lerp(this.data.minHP, this.data.maxHP, a);
    this.setPath(g);
    this.startTick = Tick.ticks;
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
        this.stage.addChildAt(this.sprite, 0)
      }
    }
  }, addDaisy:function(a) {
    this.daisy = a;
    this.addChild(a.sprite)
  }, removeDaisy:function() {
    if(this.daisy == null) {
      return null
    }
    var a = this.daisy;
    this.removeChild(a.sprite);
    this.daisy = null;
    return a
  }, lerp:function(a, b, d) {
    return(b - a) * 0.01 * d + a
  }, dispose:function() {
    this.alive = this.leaving = false;
    this.removeAllListeners();
    Tick.removeListener(this);
    this.stage.removeChild(this.sprite);
    BitmapModel.saveBitmap(this.bitmapSequence);
    this.shadowBitmap = this.slowSprite = this.bitmapSequence = this.sprite = null
  }, resetChildren:function() {
    this.stage.removeChild(this.sprite);
    this.addChild(this.bitmapSequence);
    this.sprite = this.bitmapSequence;
    this.data.type == "kraken" && this.addChild(this.healthMeter)
  }, applyDamage:function(a, b, d) {
    a -= this.armor;
    if(!(a <= 0)) {
      this.hitPoints -= a;
      a = this.hitPoints;
      if(this.type == "kraken" && a > 0) {
        var g = this.healthMeter.data.totalFrames;
        g = Math.max(0, g - (a / this.totalHitPoints * g + 0.5 | 0));
        this.healthMeter.gotoAndStop(g);
        if(g != this.lastHealthFrame && g % 2 != 0) {
          AudioManager.playSound(AudioManager.KRAKEN_HURT);
          this.lastHealthFrame = g
        }
      }
      if(a <= 0 && this.deathAnimation == null) {
        this.deathAnimation = BitmapModel.getBitmap("deathAnimation");
        this.deathAnimation.callback = $.proxy(this, "handleDeathAnimationComplete");
        this.deathAnimation.x = this.sprite.x;
        this.deathAnimation.y = this.sprite.y;
        this.deathAnimation.gotoAndPlay("death");
        this.stage.addChild(this.deathAnimation);
        this.deathAnimation.data = this;
        this.mode = "dead";
        switch(this.data.type) {
          case "rat":
            AudioManager.playSound(AudioManager.RAT_HURT);
            break;
          case "crab":
            AudioManager.playSound(AudioManager.CRAB_HURT);
            break;
          case "gull":
            AudioManager.playSound(AudioManager.GULL_HURT);
            break;
          case "octopus":
            AudioManager.playSound(AudioManager.OCTOPUS_HURT);
            break;
          case "kraken":
            AudioManager.playSound(AudioManager.KRAKEN_DEATH);
            break
        }
        this.dispatchEvent("death")
      }
      if(this.sprite != null) {
        if(b >= this.slowAmount) {
          this.slowAmount = b;
          this.slowDuration = d;
          if(this.slowSprite == null) {
            this.slowSprite = BitmapModel.getBitmap("slowStars")
          }
          this.slowSprite.gotoAndPlay("slow");
          this.slowSprite.currentFrame += Math.random() * 6 + 0.5 | 0;
          this.slowSprite.parent == null && this.addChild(this.slowSprite)
        }
      }
    }
  }, handleDeathAnimationComplete:function() {
    this.stage.removeChild(this.deathAnimation);
    BitmapModel.saveBitmap(this.deathAnimation)
  }, setPath:function(a) {
    this.path = a;
    this.path[0] == this.currentTile && this.path.shift();
    if(this.path[0] == this.nextTile) {
      this.path.shift()
    }else {
      this.nextTile = null;
      this.remainingDistance = 0
    }
    this.pathLength = this.path.length
  }, leaveGame:function() {
    this.leaving = true
  }, extrapolate:function(a) {
    return new Point(this.sprite.x + this.ratioX * this.speed * a, this.sprite.y + this.ratioY * this.speed * a)
  }, sendHomeEarly:function() {
    this.path = null;
    this.pathLength = 0
  }, tick:function() {
    if(this.leaving) {
      this.sprite.alpha -= 0.2;
      this.shadowBitmap.alpha = this.sprite.alpha;
      this.sprite.alpha <= 0.2 && this.dispatchEvent("removeComplete")
    }else {
      var a = this.distancePerTick = this.speed * (1 - this.slowAmount * (1 - this.data.minSpeedMultiplier));
      if(this.slowAmount > 0) {
        this.slowDuration -= 1;
        if(this.slowDuration < 0) {
          this.slowDuration = this.slowAmount = 0;
          this.removeChild(this.slowSprite)
        }
      }
      if(this.sprite.alpha < 1) {
        this.sprite.alpha += 0.2;
        if(this.shadowBitmap != null) {
          this.shadowBitmap.alpha = this.sprite.alpha
        }
      }
      if(a >= this.remainingDistance) {
        if(this.nextTile != null) {
          this.sprite.x += this.remainingDistance * this.ratioX;
          this.sprite.y += this.remainingDistance * this.ratioY;
          a -= this.remainingDistance
        }
        if(this.path == null || this.path.length == 0) {
          this.remainingDistance = 0;
          this.dispatchEvent("end");
          return
        }
        this.nextTile = this.path.shift();
        this.pathLength = this.path.length;
        var b = this.nextTile.x - this.xOffset - this.sprite.x, d = this.nextTile.y - this.sprite.y;
        this.remainingDistance = Math.sqrt(b * b + d * d);
        b = Math.atan2(d, b);
        this.ratioX = Math.cos(b);
        this.ratioY = Math.sin(b);
        this.rotateTo(b * Number.RADIANS + 30 | 0)
      }
      this.sprite.x += a * this.ratioX;
      this.sprite.y += a * this.ratioY;
      this.remainingDistance -= a;
      this.shadowBitmap.x = this.sprite.x + this.shadowOffset.x;
      this.shadowBitmap.y = this.sprite.y + this.shadowOffset.y;
      if(this.remainingDistance < this.hexRadius && this.currentTile != this.nextTile) {
        this.currentTile = this.nextTile;
        this.dispatchEvent("changeTile")
      }
    }
  }, rotateTo:function(a) {
    if(a > 360) {
      a -= 360
    }else {
      if(a < 0) {
        a += 360
      }
    }
    a = a / 60 | 0;
    if(this.lastDirection != a) {
      this.bitmapSequence.gotoAndPlay(this.directions[a]);
      this.bitmapSequence.currentFrame += Math.random() * 6 | 0;
      this.lastDirection = a
    }
  }, lookAhead:function(a) {
    var b = this.distancePerTick;
    b = a * b - this.remainingDistance - this.hexRadius;
    a = b + this.hexDiameter < 0 ? this.currentTile : this.nextTile;
    if(a == null) {
      return new Point(this.sprite.x, this.sprite.y)
    }
    if(b > 0) {
      b = b / this.hexDiameter | 0;
      var d = this.path ? this.pathLength : 0;
      if(d > 0) {
        a = b < d ? this.path[b] : this.path[d - 1]
      }
    }
    return new Point(a.x - this.xOffset, a.y)
  }, lookAheadTile:function() {
    var a = this.speed * (1 - this.slowAmount * (1 - this.data.minSpeedMultiplier));
    a = this.speed * (1 - this.slowAmount * (1 - this.data.minSpeedMultiplier));
    var b = a + this.hexRadius * 2 < 0 ? this.currentTile : this.nextTile;
    if(a > 0) {
      a = a / (this.hexRadius * 2) | 0;
      var d = this.path ? this.pathLength : 0;
      if(d > 0) {
        b = a < d ? this.path[a] : this.path[d - 1]
      }
    }
    return b
  }, lookAhead2:function(a) {
    var b = this.speed * (1 - this.slowAmount * (1 - this.data.minSpeedMultiplier));
    b = a * b;
    if(b < this.remainingDistance) {
      return new Point(this.x + this.ratioX * b, this.y + this.ratioY * this.d)
    }
    b -= this.remainingDistance;
    var d;
    if(this.path == null || (d = this.pathLength) == 0) {
      return new Point(this.nextTile.x, this.nextTile.y)
    }
    var g = b / this.hexRadius / 2 | 0;
    if(g >= d) {
      a = this.path[d - 1];
      return new Point(a.x, a.y)
    }
    b -= g * this.hexRadius * 2;
    a = g == 0 ? this.nextTile : this.path[g - 1];
    var m = this.path[g];
    d = a.x;
    a = a.y;
    g = m.x - d;
    m = m.y - a;
    b = b / Math.sqrt(g * g + m * m);
    return new Point(d + g * b - this.xOffset, a + m * b)
  }, toString:function() {
    return"[Creep " + this.id + "]"
  }};
  e.Creep = c
})(window);