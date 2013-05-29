(function(e) {
  Rectangle = function(a, b, d, g) {
    this.initialize(a, b, d, g)
  };
  var c = Rectangle.prototype;
  c.x = 0;
  c.y = 0;
  c.width = 0;
  c.height = 0;
  c.initialize = function(a, b, d, g) {
    this.x = a == null ? 0 : a;
    this.y = b == null ? 0 : b;
    this.width = d == null ? 0 : d;
    this.height = g == null ? 0 : g
  };
  c.clone = function() {
    return new Rectangle(this.x, this.y, this.width, this.height)
  };
  c.toString = function() {
    return "[Rectangle (x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + ")]"
  };
  e.Rectangle = Rectangle
})(window);
