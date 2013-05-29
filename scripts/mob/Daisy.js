(function(e) {
  function c(a, b, d, g) {
    this.Daisy(a, b, d, g)
  }
  c.PLANTED = 1;
  c.PICKED = 2;
  c.DROPPED = 3;
  c.RETURNED = 4;
  c.prototype = {Daisy:function(a, b, d, g) {
    this.daisyContainer = b;
    this.sprite = a;
    this.tile = this.originalTile = d;
    this.state = g;
    this.previousState = this.owner = null;
    this.startPosition = new Point(this.sprite.x, this.sprite.y);
    this.picked = null
  }, setState:function(a) {
    this.previousState = this.state;
    this.state = a;
    this.update()
  }, getState:function() {
    return this.state
  }, handleDaisyReturned:function() {
    if(this.poof != null) {
      this.daisyContainer.removeChild(this.poof);
      BitmapModel.saveBitmap(this.poof)
    }
  }, update:function() {
    switch(this.state) {
      case c.PLANTED:
        if(this.picked) {
          this.daisyContainer.removeChild(this.picked);
          BitmapModel.saveBitmap(this.picked);
          this.picked = null
        }
        this.sprite.x = this.startPosition.x;
        this.sprite.y = this.startPosition.y;
        this.sprite.gotoAndStop("up" + ((Math.random() * 4 | 0) + 1));
        this.daisyContainer.addChild(this.sprite);
        break;
      case c.PICKED:
        this.daisyContainer.removeChild(this.sprite);
        if(this.previousState != c.DROPPED) {
          this.picked = BitmapModel.getBitmap("daisy");
          this.picked.x = this.sprite.x;
          this.picked.y = this.sprite.y;
          this.picked.gotoAndStop("hole");
          this.daisyContainer.addChild(this.picked)
        }
        this.sprite.x = 0;
        this.sprite.y = 0;
        break;
      case c.RETURNED:
        var a = this.poof = BitmapModel.getBitmap("deathAnimation");
        a.callback = $.proxy(this, "handleDaisyReturned");
        a.x = this.startPosition.x;
        a.y = this.startPosition.y;
        a.gotoAndPlay("death");
        this.sprite.x = this.startPosition.x;
        this.sprite.y = this.startPosition.y;
        this.sprite.gotoAndStop("dropped" + ((Math.random() * 6 | 0) + 1));
        this.daisyContainer.addChild(this.sprite);
        this.daisyContainer.addChild(this.poof);
        this.state = c.DROPPED;
        break;
      case c.DROPPED:
        this.sprite.gotoAndStop("dropped" + ((Math.random() * 6 | 0) + 1));
        this.daisyContainer.addChild(this.sprite);
        break
    }
  }, dispose:function() {
    if(this.picked != null) {
      BitmapModel.saveBitmap(this.picked);
      this.picked = null
    }
    BitmapModel.saveBitmap(this.sprite);
    this.sprite = null
  }, toString:function() {
    return"[Daisy " + this.sprite.id + " (" + this.state + ")]"
  }};
  e.Daisy = c
})(window);