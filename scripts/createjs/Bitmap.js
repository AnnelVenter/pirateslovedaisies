(function(e) {
  Bitmap = function(a) {
    this.initialize(a)
  };
  var c = Bitmap.prototype = new DisplayObject;
  c.image = null;
  c.snapToPixel = true;
  c.DisplayObject_initialize = c.initialize;
  c.initialize = function(a) {
    this.DisplayObject_initialize();
    this.image = a
  };
  c.isVisible = function() {
    return this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && this.image && (this.image.complete || this.image.getContext)
  };
  c.DisplayObject_draw = c.draw;
  c.draw = function(a, b) {
    if (this.DisplayObject_draw(a, b)) {
      return true
    }
    a.drawImage(this.image, 0, 0);
    return true
  };
  c.clone = function() {
    var a = new Bitmap(this.image);
    this.cloneProps(a);
    return a
  };
  c.toString = function() {
    return "[Bitmap (name=" + this.name + ")]"
  };
  c._calculateBounds = function() {
    return this.image && (this.image.complete || this.image.getContext) ? new Rectangle(0, 0, this.image.width, this.image.height) : new Rectangle(0, 0, 0, 0)
  };
  e.Bitmap = Bitmap
})(window);
