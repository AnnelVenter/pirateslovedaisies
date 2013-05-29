(function(e) {
  Point = function(a, b) {
    this.initialize(a, b)
  };
  var c = Point.prototype;
  c.x = 0;
  c.y = 0;
  c.initialize = function(a, b) {
    this.x = a == null ? 0 : a;
    this.y = b == null ? 0 : b
  };
  c.clone = function() {
    return new Point(this.x, this.y)
  };
  c.toString = function() {
    return "[Point (x=" + this.x + " y=" + this.y + ")]"
  };
  e.Point = Point
})(window);
