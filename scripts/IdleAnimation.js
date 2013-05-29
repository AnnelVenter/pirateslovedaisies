(function(e) {
  function c(b, d) {
    this.IdleManager(b, d)
  }
  function a(b, d, g, m, q) {
    this.IdleAnimation(b, d, g, m, q)
  }
  c.prototype = {IdleManager:function(b, d) {
    this.effectsContainer = b;
    this.idles = [];
    for(var g = 0, m = d.length;g < m;g++) {
      this.idles.push(new a(this.effectsContainer, d[g].sprites, Game.effectsEnabled, d[g].frequency * Tick.fps, d[g].count))
    }
  }, setEnabled:function(b) {
    for(var d = 0, g = this.idles.length;d < g;d++) {
      this.idles[d].setEnabled(b)
    }
  }, cleanUp:function() {
    for(var b = 0, d = this.idles.length;b < d;b++) {
      this.idles[b].cleanUp()
    }
    this.idles = null
  }};
  e.IdleManager = c;
  a.prototype = {IdleAnimation:function(b, d, g, m, q) {
    this.effectsContainer = b;
    this.activeSprites = [];
    this.sprites = [];
    this.handleAnimationCompleteProxy = new EventProxy(this, "handleAnimationComplete");
    b = 0;
    for(var s = d.length;b < s;b += 3) {
      var y = BitmapModel.getBitmap(d[b]);
      if(y != null) {
        y.x = d[b + 1];
        y.y = d[b + 2];
        y.callback = $.proxy(this, "handleAnimationComplete");
        this.sprites.push(y);
        if(y.data.persist == true) {
          this.effectsContainer.addChild(y);
          y.currentFrame = 0
        }
      }
    }
    this.repeatCount = this.freqCount = 0;
    this.frequency = m;
    this.count = q;
    this.setEnabled(g)
  }, setEnabled:function(b) {
    if(b) {
      Tick.addListener(this, true);
      b = 0;
      for(var d = this.activeSprites.length;b < d;b++) {
        this.activeSprites[b].gotoAndPlay("loop")
      }
    }else {
      Tick.removeListener(this);
      b = 0;
      for(d = this.activeSprites.length;b < d;b++) {
        this.activeSprites[b].gotoAndStop("stopped")
      }
    }
  }, tick:function() {
    l = this.sprites.length;
    if(this.repeatCount > 0 && Math.random() <= 0.4 && l > 0) {
      this.repeatCount--;
      i = Math.random() * l | 0;
      sprite = this.sprites[i];
      this.activeSprites.push(sprite);
      this.sprites.splice(i, 1);
      sprite.data.persist || this.effectsContainer.addChild(sprite);
      sprite.gotoAndPlay("loop");
      if(sprite.data.loop != true) {
        sprite.nextSequence = null
      }
    }
    if(this.freqCount <= 0) {
      this.repeatCount = 1 + Math.random() * this.count | 0;
      this.freqCount = this.frequency + Math.random() * this.frequency | 0
    }
    this.freqCount--
  }, handleAnimationComplete:function(b) {
    this.activeSprites.removeItem(b);
    this.sprites.push(b);
    b.data.persist != true && this.effectsContainer.removeChild(b);
    b.gotoAndStop("loop")
  }, cleanUp:function() {
    Tick.removeListener(this);
    this.sprites.concat(this.activeSprites);
    for(var b = 0, d = this.sprites.length;b < d;b++) {
      var g = this.sprites[b];
      this.effectsContainer.removeChild(g);
      BitmapModel.saveBitmap(g)
    }
    this.sprites = this.activeSprites = null
  }, toString:function() {
    return"[IdleAnimation " + this.sprites.length + "]"
  }};
  e.IdleAnimation = a
})(window);