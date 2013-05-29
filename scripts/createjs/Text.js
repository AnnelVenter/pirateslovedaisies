(function(e) {
  Text = function(a, b, d) {
    this.initialize(a, b, d)
  };
  var c = Text.prototype = new DisplayObject;
  Text._workingContext = document.createElement("canvas").getContext("2d");
  c.text = "";
  c.font = null;
  c.color = null;
  c.textAlign = null;
  c.textBaseline = null;
  c.maxWidth = null;
  c.outline = false;
  c.lineHeight = null;
  c.lineWidth = null;
  c.DisplayObject_initialize = c.initialize;
  c.initialize = function(a, b, d) {
    this.DisplayObject_initialize();
    this.text = a;
    this.font = b;
    this.color = d ? d : "#000"
  };
  c.isVisible = function() {
    return Boolean(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && this.text != null && this.text != "")
  };
  c.DisplayObject_draw = c.draw;
  c.draw = function(a, b) {
    if (this.DisplayObject_draw(a, b)) {
      return true
    }
    if (this.outline) {
      a.strokeStyle = this.color
    } else {
      a.fillStyle = this.color
    }
    a.font = this.font;
    a.textAlign = this.textAlign ? this.textAlign : "start";
    a.textBaseline = this.textBaseline ? this.textBaseline : "alphabetic";
    for (var d = String(this.text).split(/(?:\r\n|\r|\n)/), g = this.lineHeight == null ? this.getMeasuredLineHeight() : this.lineHeight, m = 0, q = 0, s = d.length; q < s; q++) {
      var y = a.measureText(d[q]).width;
      if (this.lineWidth == null || y < this.lineWidth) {
        this._drawTextLine(a, d[q], m)
      } else {
        y = d[q].split(/(\s)/);
        for (var A = y[0], H = 1, M = y.length; H < M; H += 2) {
          if (a.measureText(A + y[H] + y[H + 1]).width > this.lineWidth) {
            this._drawTextLine(a, A, m);
            m += g;
            A = y[H + 1]
          } else {
            A += y[H] + y[H + 1]
          }
        }
        this._drawTextLine(a, A, m)
      }
      m += g
    }
    return true
  };
  c.getMeasuredWidth = function() {
    return this._getWorkingContext().measureText(this.text).width
  };
  c.getMeasuredLineHeight = function() {
    return this._getWorkingContext().measureText("M").width * 1.2
  };
  c.clone = function() {
    var a = new Text(this.text, this.font, this.color);
    this.cloneProps(a);
    return a
  };
  c.toString = function() {
    return "[Text (text=" + (this.text.length > 20 ? this.text.substr(0, 17) + "..." : this.text) + ")]"
  };
  c.DisplayObject_cloneProps = c.cloneProps;
  c.cloneProps = function(a) {
    this.DisplayObject_cloneProps(a);
    a.textAlign = this.textAlign;
    a.textBaseline = this.textBaseline;
    a.maxWidth = this.maxWidth;
    a.outline = this.outline;
    a.lineHeight = this.lineHeight;
    a.lineWidth = this.lineWidth
  };
  c._getWorkingContext = function() {
    var a = Text._workingContext;
    a.font = this.font;
    a.textAlign = this.textAlign ? this.textAlign : "start";
    a.textBaseline = this.textBaseline ? this.textBaseline : "alphabetic";
    return a
  };
  c._drawTextLine = function(a, b, d) {
    this.outline ? a.strokeText(b, 0, d, this.maxWidth) : a.fillText(b, 0, d, this.maxWidth)
  };
  c._calculateBounds = function() {};
  e.Text = Text
})(window);