(function(e) {
  SpriteSheet = function(a, b, d, g) {
    this.initialize(a, b, d, g)
  };
  var c = SpriteSheet.prototype;
  c.image = null;
  c.frameWidth = 0;
  c.frameHeight = 0;
  c.frameData = null;
  c.loop = true;
  c.totalFrames = 0;
  c.initialize = function(a, b, d, g) {
    this.image = a;
    this.frameWidth = b;
    this.frameHeight = d;
    this.frameData = g
  };
  c.toString = function() {
    return "[SpriteSheet]"
  };
  c.clone = function() {
    var a = new SpriteSheet(this.image, this.frameWidth, this.frameHeight, this.frameData);
    a.loop = this.loop;
    a.totalFrames = this.totalFrames;
    return a
  };
  e.SpriteSheet = SpriteSheet
})(window);