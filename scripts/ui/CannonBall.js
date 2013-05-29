(function(e) {
  function c(a, b, d, g, m) {
    this.CannonBall(a, b, d, g, m)
  }
  c.prototype = {CannonBall:function(a, b, d, g, m) {
    EventDispatcher.create(this);
    this.creep = b;
    this.creepHash = a.creepHash;
    this.level = a.data.level;
    this.damage = a.data.damage * a.damageMultiplier;
    this.splash = a.data.splashRange * a.splashMultiplier;
    this.hitsAir = a.sprite.data.hitsAir;
    this.creepHash = a.creepHash;
    this.slowAmount = a.data.slowAmount;
    this.slowDuration = a.data.slowDuration;
    this.projectileType = d;
    b = this.sprite = BitmapModel.getBitmap(d + "Projectile");
    b.gotoAndPlay("l" + this.level);
    b.x = a.sprite.x;
    b.y = a.sprite.y;
    d = a.data.projectileOffset;
    if(d != null) {
      switch(a.direction) {
        case 0:
          b.x -= d[4];
          b.y -= d[5];
          break;
        case 3:
          b.x += d[4];
          b.y -= d[5];
          break;
        case 1:
          b.x -= d[2];
          b.y -= d[3];
          break;
        case 2:
          b.x += d[2];
          b.y -= d[3];
          break;
        case 5:
          b.x -= d[0];
          b.y -= d[1];
          break;
        case 4:
          b.x += d[0];
          b.y -= d[1];
          break
      }
    }
    this.startPosition = new Point(b.x, b.y);
    this.speed = m;
    this.endPosition = g;
    this.xDelta = this.endPosition.x - b.x;
    this.yDelta = this.endPosition.y - b.y;
    this.apex = this.yDelta / 2 + b.y - 72 - Math.abs(this.yDelta * 0.2);
    this.mode = "projectile";
    this.increment = 0;
    Tick.addListener(this)
  }, shotComplete:function() {
    var a = BitmapModel.getBitmap(this.projectileType + "Explosion");
    if(a != null) {
      a.callback = $.proxy(this, "handleExplosionComplete");
      a.x = this.sprite.x;
      a.y = this.sprite.y;
      a.gotoAndPlay("l" + this.level);
      this.mode = "explosion"
    }
    var b = this.splash;
    if(b == 0 || b == null) {
      this.creep.applyDamage(this.damage, this.slowAmount, this.slowDuration)
    }else {
      for(var d in this.creepHash) {
        if(this.creepHash.hasOwnProperty(d)) {
          creep = this.creepHash[d];
          if(!(creep.data.isAir == true && this.hitsAir == false)) {
            var g = this.findCreepDistance(creep);
            if(g < b) {
              g = (b - g) / b;
              creep.applyDamage(this.damage * g, this.slowAmount * g, this.slowDuration)
            }
          }
        }
      }
    }
    this.dispatchEvent("projectileComplete", {explosion:a});
    this.sprite = a;
    switch(this.projectileType) {
      case "sponge":
        AudioManager.playSound(AudioManager.CABIN_BOY_FIRE);
        break;
      case "cannon":
        AudioManager.playSound(AudioManager.CANNON_IMPACT);
        break
    }
  }, handleExplosionComplete:function() {
    this.dispatchEvent("explosionComplete")
  }, dispose:function() {
    BitmapModel.saveBitmap(this.sprite);
    this.creep = this.sprite = null;
    this.removeAllListeners()
  }, findCreepDistance:function(a) {
    if(a == null || a.sprite == null) {
      return Number.POSITIVE_INFINITY
    }
    return Math.sqrt(Math.pow(a.sprite.x - this.sprite.x, 2) + Math.pow(a.sprite.y - this.sprite.y, 2))
  }, tick:function() {
    var a = ++this.increment / this.speed;
    this.sprite.x = a * this.xDelta + this.startPosition.x;
    this.sprite.y = Math.pow(1 - a, 2) * this.startPosition.y + 2 * (1 - a) * a * this.apex + Math.pow(a, 2) * this.endPosition.y;
    if(this.increment >= this.speed) {
      Tick.removeListener(this);
      this.shotComplete()
    }
  }, toString:function() {
    return"[CannonBall " + this.pirate + ", " + this.creep + "]"
  }};
  e.CannonBall = c
})(window);