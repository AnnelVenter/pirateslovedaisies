(function(e) {
  BitmapSequence = function(a) {
    this.initialize(a)
  };
  var c = BitmapSequence.prototype = new DisplayObject;
  c.callback = null;
  c.currentFrame = -1;
  c.currentSequence = null;
  c.currentEndFrame = null;
  c.currentStartFrame = null;
  c.nextSequence = null;
  c.paused = false;
  c.spriteSheet = null;
  c.snapToPixel = true;
  c.DisplayObject_initialize = c.initialize;
  c.initialize = function(a) {
    this.DisplayObject_initialize();
    this.spriteSheet = a
  };
  c.isVisible = function() {
    var a = this.spriteSheet ? this.spriteSheet.image : null;
    return this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && a && this.currentFrame >= 0 && (a.complete || a.getContext)
  };
  c.DisplayObject_draw = c.draw;
  c.draw = function(a, b) {
    if (this.DisplayObject_draw(a, b)) {
      return true
    }
    var d = this.spriteSheet.image,
      g = this.spriteSheet.frameWidth,
      m = this.spriteSheet.frameHeight,
      q = d.width / g | 0,
      s = d.height / m | 0;
    if (this.currentEndFrame != null) {
      if (this.currentFrame > this.currentEndFrame) {
        if (this.nextSequence) {
          this._goto(this.nextSequence)
        } else {
          this.paused = true;
          this.currentFrame = this.currentEndFrame
        }
        this.callback && this.callback(this)
      }
    } else {
      s = this.spriteSheet.totalFrames || q * s;
      if (this.currentFrame >= s) {
        if (this.spriteSheet.loop) {
          this.currentFrame = 0
        } else {
          this.currentFrame = s - 1;
          this.paused = true
        }
        this.callback && this.callback(this)
      }
    }
    this.currentFrame >= 0 && a.drawImage(d, g * (this.currentFrame % q), m * (this.currentFrame / q | 0), g, m, 0, 0, g, m);
    return true
  };
  c.tick = function() {
    if (this.currentFrame == -1 && this.spriteSheet.frameData) {
      this.paused = true
    }
    this.paused || this.currentFrame++
  };
  c.gotoAndPlay = function(a) {
    this.paused = false;
    this._goto(a)
  };
  c.gotoAndStop = function(a) {
    this.paused = true;
    this._goto(a)
  };
  c.clone = function() {
    var a = new BitmapSequence(this.spriteSheet);
    this.cloneProps(a);
    return a
  };
  c.toString = function() {
    return "[BitmapSequence (name=" + this.name + ")]"
  };
  c.DisplayObject_cloneProps = c.cloneProps;
  c.cloneProps = function(a) {
    this.DisplayObject_cloneProps(a);
    a.callback = this.callback;
    a.currentFrame = this.currentFrame;
    a.currentStartFrame = this.currentStartFrame;
    a.currentEndFrame = this.currentEndFrame;
    a.currentSequence = this.currentSequence;
    a.nextSequence = this.nextSequence;
    a.paused = this.paused;
    a.frameData = this.frameData
  };
  c._goto = function(a) {
    if (isNaN(a)) {
      if (a == this.currentSequence) {
        this.currentFrame = this.currentStartFrame
      } else {
        var b = this.spriteSheet.frameData[a];
        if (b instanceof Array) {
          this.currentFrame = this.currentStartFrame = b[0];
          this.currentSequence = a;
          this.currentEndFrame = b[1];
          if (this.currentEndFrame == null) {
            this.currentEndFrame = this.currentStartFrame
          }
          if (this.currentEndFrame == null) {
            this.currentEndFrame = this.currentFrame
          }
          this.nextSequence = b[2];
          if (this.nextSequence == null) {
            this.nextSequence = this.currentSequence
          } else {
            if (this.nextSequence == false) {
              this.nextSequence = null
            }
          }
        } else {
          this.currentSequence = this.nextSequence = null;
          this.currentEndFrame = this.currentFrame = this.currentStartFrame = b
        }
      }
    } else {
      this.currentSequence = this.nextSequence = this.currentEndFrame = null;
      this.currentStartFrame = 0;
      this.currentFrame = a
    }
  };
  c._calculateBounds = function() {
    return this.spriteSheet ? new Rectangle(0, 0, this.spriteSheet.frameWidth, this.spriteSheet.frameHeight) : new Rectangle(0, 0, 0, 0)
  };
  e.BitmapSequence = BitmapSequence
})(window);
