(function(e) {
  Shadow = function(a, b, d, g) {
    this.initialize(a, b, d, g)
  };
  var c = Shadow.prototype;
  Shadow.identity = null;
  c.color = null;
  c.offsetX = 0;
  c.offsetY = 0;
  c.blur = 0;
  c.initialize = function(a, b, d, g) {
    this.color = a;
    this.offsetX = b;
    this.offsetY = d;
    this.blur = g
  };
  c.toString = function() {
    return "[Shadow]"
  };
  c.clone = function() {
    return new Shadow(this.color, this.offsetX, this.offsetY, this.blur)
  };
  Shadow.identity = new Shadow(null, 0, 0, 0);
  e.Shadow = Shadow
})(window);