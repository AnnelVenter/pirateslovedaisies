(function(e) {
  Shape = function(a) {
    this.initialize(a)
  };
  var c = Shape.prototype = new DisplayObject;
  c.graphics = null;
  c.DisplayObject_initialize = c.initialize;
  c.initialize = function(a) {
    this.DisplayObject_initialize();
    this.graphics = a ? a : new Graphics
  };
  c.isVisible = function() {
    return this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && this.graphics
  };
  c.DisplayObject_draw = c.draw;
  c.draw = function(a, b) {
    if (this.DisplayObject_draw(a, b)) {
      return true
    }
    this.graphics.draw(a);
    return true
  };
  c.clone = function(a) {
    a = new Shape(a && this.graphics ? this.graphics.clone() : this.graphics);
    this.cloneProps(a);
    return a
  };
  c.toString = function() {
    return "[Shape (name=" + this.name + ")]"
  };
  c._calculateBounds = function() {
    return this.graphics ? this.graphics.getBounds() : new Rectangle(0, 0, 0, 0)
  };
  e.Shape = Shape
})(window);
