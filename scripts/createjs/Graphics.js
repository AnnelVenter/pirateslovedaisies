(function(e) {
  function c(b, d) {
    this.f = b;
    this.params = d
  }
  c.prototype.exec = function(b) {
    this.f.apply(b, this.params)
  };
  Graphics = function(b) {
    this.initialize(b)
  };
  var a = Graphics.prototype;
  Graphics.getRGB = function(b, d, g, m) {
    if (b != null && g == null) {
      m = d;
      g = b & 255;
      d = b >> 8 & 255;
      b = b >> 16 & 255
    }
    return m == null ? "rgb(" + b + "," + d + "," + g + ")" : "rgba(" + b + "," + d + "," + g + "," + m + ")"
  };
  Graphics.getHSL = function(b, d, g, m) {
    return m == null ? "hsl(" + b % 360 + "," + d + "%," + g + "%)" : "hsla(" + b % 360 + "," + d + "%," + g + "%," + m + ")"
  };
  Graphics.STROKE_CAPS_MAP = ["butt", "round", "square"];
  Graphics.STROKE_JOINTS_MAP = ["miter", "round", "bevel"];
  Graphics._ctx = document.createElement("canvas").getContext("2d");
  Graphics.beginCmd = new c(Graphics._ctx.beginPath, []);
  Graphics.fillCmd = new c(Graphics._ctx.fill, []);
  Graphics.strokeCmd = new c(Graphics._ctx.stroke, []);
  a._strokeInstructions = null;
  a._strokeStyleInstructions = null;
  a._fillInstructions = null;
  a._instructions = null;
  a._oldInstructions = null;
  a._activeInstructions = null;
  a._active = false;
  a._dirty = false;
  a._minX = NaN;
  a._minY = NaN;
  a._maxX = NaN;
  a._maxY = NaN;
  a._boundsQueue = null;
  a._x = 0;
  a._y = 0;
  a.initialize = function(b) {
    this.clear();
    this._ctx = Graphics._ctx;
    with(this) {
      eval(b)
    }
  };
  a.draw = function(b) {
    this._dirty && this._updateInstructions();
    for (var d = this._instructions, g = 0, m = d.length; g < m; g++) {
      d[g].exec(b)
    }
  };
  a.getBounds = function() {
    this._boundsQueue.length && this._updateBounds();
    return isNaN(this._minX) ? null : new Rectangle(this._minX, this._minY, this._maxX - this._minX, this._maxY - this._minY)
  };
  a.moveTo = function(b, d) {
    this._activeInstructions.push(new c(this._ctx.moveTo, [b, d]));
    this._x = b;
    this._y = d;
    return this
  };
  a.lineTo = function(b, d) {
    this._dirty = this._active = true;
    this._activeInstructions.push(new c(this._ctx.lineTo, [b, d]));
    this._extendBounds(this._x, this._y);
    this._extendBounds(b, d);
    this._x = b;
    this._y = d;
    return this
  };
  a.arcTo = function(b, d, g, m, q) {
    this._dirty = this._active = true;
    this._activeInstructions.push(new c(this._ctx.arcTo, [b, d, g, m, q]));
    return this
  };
  a.arc = function(b, d, g, m, q, s) {
    this._dirty = this._active = true;
    if (s == null) {
      s = false
    }
    this._activeInstructions.push(new c(this._ctx.arc, [b, d, g, m, q, s]));
    return this
  };
  a.quadraticCurveTo = function(b, d, g, m) {
    this._dirty = this._active = true;
    this._activeInstructions.push(new c(this._ctx.quadraticCurveTo, [b, d, g, m]));
    return this
  };
  a.bezierCurveTo = function(b, d, g, m, q, s) {
    this._dirty = this._active = true;
    this._activeInstructions.push(new c(this._ctx.bezierCurveTo, [b, d, g, m, q, s]));
    this._x = q;
    thix._y = s;
    this._boundsQueue.push(new c(this._bezierCurveToBounds, [this._x, this._y, b, d, g, m, q, s]));
    return this
  };
  a.rect = function(b, d, g, m) {
    this._dirty = this._active = true;
    this._activeInstructions.push(new c(this._ctx.rect, [b, d, g - 1, m]));
    this._extendBounds(b, d);
    this._extendBounds(b + g, d + m);
    return this
  };
  a.closePath = function() {
    if (this._active) {
      this._dirty = true;
      this._activeInstructions.push(new c(this._ctx.closePath, []))
    }
    return this
  };
  a.clear = function() {
    this._instructions = [];
    this._oldInstructions = [];
    this._activeInstructions = [];
    this._strokeStyleInstructions = this._strokeInstructions = this._fillInstructions = null;
    this._active = this._dirty = false;
    this._boundsQueue = [];
    this._minX = this._minY = this._maxX = this._maxY = NaN;
    return this
  };
  a.beginFill = function(b) {
    this._active && this._newPath();
    this._fillInstructions = b ? [new c(this._setProp, ["fillStyle", b])] : null;
    return this
  };
  a.beginLinearGradientFill = function(b, d, g, m, q, s) {
    this._active && this._newPath();
    g = this._ctx.createLinearGradient(g, m, q, s);
    m = 0;
    for (q = b.length; m < q; m++) {
      g.addColorStop(d[m], b[m])
    }
    this._fillInstructions = [new c(this._setProp, ["fillStyle", g])];
    return this
  };
  a.beginRadialGradientFill = function(b, d, g, m, q, s, y, A) {
    this._active && this._newPath();
    g = this._ctx.createRadialGradient(g, m, q, s, y, A);
    m = 0;
    for (q = b.length; m < q; m++) {
      g.addColorStop(d[m], b[m])
    }
    this._fillInstructions = [new c(this._setProp, ["fillStyle", g])];
    return this
  };
  a.beginBitmapFill = function(b, d) {
    this._active && this._newPath();
    d = d || "";
    var g = this._ctx.createPattern(b, d);
    this._fillInstructions = [new c(this._setProp, ["fillStyle", g])];
    return this
  };
  a.endFill = function() {
    this.beginFill(null);
    return this
  };
  a.setStrokeStyle = function(b, d, g, m) {
    this._active && this._newPath();
    this._strokeStyleInstructions = [new c(this._setProp, ["lineWidth", b == null ? "1" : b]), new c(this._setProp, ["lineCap", d == null ? "butt" : isNaN(d) ? d : Graphics.STROKE_CAPS_MAP[d]]), new c(this._setProp, ["lineJoin", g == null ? "miter" : isNaN(g) ? g : Graphics.STROKE_JOINTS_MAP[g]]), new c(this._setProp, ["miterLimit", m == null ? "10" : m])];
    return this
  };
  a.beginStroke = function(b) {
    this._active && this._newPath();
    this._strokeInstructions = b ? [new c(this._setProp, ["strokeStyle", b])] : null;
    return this
  };
  a.beginLinearGradientStroke = function(b, d, g, m, q, s) {
    this._active && this._newPath();
    g = this._ctx.createLinearGradient(g, m, q, s);
    m = 0;
    for (q = b.length; m < q; m++) {
      g.addColorStop(d[m], b[m])
    }
    this._strokeInstructions = [new c(this._setProp, ["strokeStyle", g])];
    return this
  };
  a.beginRadialGradientStroke = function(b, d, g, m, q, s, y, A) {
    this._active && this._newPath();
    g = this._ctx.createRadialGradient(g, m, q, s, y, A);
    m = 0;
    for (q = b.length; m < q; m++) {
      g.addColorStop(d[m], b[m])
    }
    this._strokeInstructions = [new c(this._setProp, ["strokeStyle", g])];
    return this
  };
  a.beginBitmapStroke = function(b, d) {
    this._active && this._newPath();
    d = d || "";
    var g = this._ctx.createPattern(b, d);
    this._strokeInstructions = [new c(this._setProp, ["strokeStyle", g])];
    return this
  };
  a.endStroke = function() {
    this.beginStroke(null);
    return this
  };
  a.curveTo = a.quadraticCurveTo;
  a.drawRect = a.rect;
  a.drawRoundRect = function(b, d, g, m, q) {
    this.drawRoundRectComplex(b, d, g, m, q, q, q, q);
    return this
  };
  a.drawRoundRectComplex = function(b, d, g, m, q, s, y, A) {
    this._dirty = this._active = true;
    this._activeInstructions.push(new c(this._ctx.moveTo, [b + q, d]), new c(this._ctx.lineTo, [b + g - s, d]), new c(this._ctx.arc, [b + g - s, d + s, s, -Math.PI / 2, 0, false]), new c(this._ctx.lineTo, [b + g, d + m - y]), new c(this._ctx.arc, [b + g - y, d + m - y, y, 0, Math.PI / 2, false]), new c(this._ctx.lineTo, [b + A, d + m]), new c(this._ctx.arc, [b + A, d + m - A, A, Math.PI / 2, Math.PI, false]), new c(this._ctx.lineTo, [b, d + q]), new c(this._ctx.arc, [b + q, d + q, q, Math.PI, Math.PI *
        3 / 2, false
    ]));
    return this
  };
  a.drawCircle = function(b, d, g) {
    this.arc(b, d, g, 0, Math.PI * 2);
    return this
  };
  a.drawEllipse = function(b, d, g, m) {
    this._dirty = this._active = true;
    var q = g / 2 * 0.5522848,
      s = m / 2 * 0.5522848,
      y = b + g,
      A = d + m;
    g = b + g / 2;
    m = d + m / 2;
    this._activeInstructions.push(new c(this._ctx.moveTo, [b, m]), new c(this._ctx.bezierCurveTo, [b, m - s, g - q, d, g, d]), new c(this._ctx.bezierCurveTo, [g + q, d, y, m - s, y, m]), new c(this._ctx.bezierCurveTo, [y, m + s, g + q, A, g, A]), new c(this._ctx.bezierCurveTo, [g - q, A, b, m + s, b, m]));
    return this
  };
  a.drawPolyStar = function(b, d, g, m, q, s) {
    this._dirty = this._active = true;
    if (q == null) {
      q = 0
    }
    q = 1 - q;
    if (s == null) {
      s = 0
    } else {
      s /= 180 / Math.PI
    }
    var y = Math.PI / m;
    this._activeInstructions.push(new c(this._ctx.moveTo, [b + Math.cos(s) * g, d + Math.sin(s) * g]));
    for (var A = 0; A < m; A++) {
      s += y;
      q != 1 && this._activeInstructions.push(new c(this._ctx.lineTo, [b + Math.cos(s) * g * q, d + Math.sin(s) * g * q]));
      s += y;
      this._activeInstructions.push(new c(this._ctx.lineTo, [b + Math.cos(s) * g, d + Math.sin(s) * g]))
    }
    return this
  };
  a.clone = function() {
    var b = new Graphics;
    b._instructions = this._instructions.slice();
    b._activeInstructions = this._activeInstructions.slice();
    b._oldInstructions = this._oldInstructions.slice();
    if (this._fillInstructions) {
      b._fillInstructions = this._fillInstructions.slice()
    }
    if (this._strokeInstructions) {
      b._strokeInstructions = this._strokeInstructions.slice()
    }
    if (this._strokeStyleInstructions) {
      b._strokeStyleInstructions = this._strokeStyleInstructions.slice()
    }
    b._active = this._active;
    b._dirty = this._dirty;
    return b
  };
  a.toString = function() {
    return "[Graphics]"
  };
  a.mt = a.moveTo;
  a.lt = a.lineTo;
  a.at = a.arcTo;
  a.bt = a.bezierCurveTo;
  a.qt = a.quadraticCurveTo;
  a.a = a.arc;
  a.r = a.rect;
  a.cp = a.closePath;
  a.c = a.clear;
  a.f = a.beginFill;
  a.lf = a.beginLinearGradientFill;
  a.rf = a.beginRadialGradientFill;
  a.bf = a.beginBitmapFill;
  a.ef = a.endFill;
  a.ss = a.setStrokeStyle;
  a.s = a.beginStroke;
  a.ls = a.beginLinearGradientStroke;
  a.rs = a.beginRadialGradientStroke;
  a.bs = a.beginBitmapStroke;
  a.es = a.endStroke;
  a.dr = a.drawRect;
  a.rr = a.drawRoundRect;
  a.rc = a.drawRoundRectComplex;
  a.dc = a.drawCircle;
  a.de = a.drawEllipse;
  a.dp = a.drawPolyStar;
  a._updateInstructions = function() {
    this._instructions = this._oldInstructions.slice();
    this._instructions.push(Graphics.beginCmd);
    this._fillInstructions && this._instructions.push.apply(this._instructions, this._fillInstructions);
    if (this._strokeInstructions) {
      this._instructions.push.apply(this._instructions, this._strokeInstructions);
      this._strokeStyleInstructions && this._instructions.push.apply(this._instructions, this._strokeStyleInstructions)
    }
    this._instructions.push.apply(this._instructions, this._activeInstructions);
    this._fillInstructions && this._instructions.push(Graphics.fillCmd);
    this._strokeInstructions && this._instructions.push(Graphics.strokeCmd)
  };
  a._newPath = function() {
    this._dirty && this._updateInstructions();
    this._oldInstructions = this._instructions;
    this._activeInstructions = [];
    this._active = this._dirty = false
  };
  a._setProp = function(b, d) {
    this[b] = d
  };
  a._extendBounds = function(b, d) {
    if (isNaN(this._minX)) {
      this._minX = this._maxX = b;
      this._minY = this._maxY = d
    } else {
      if (b < this._minX) {
        this._minX = b
      } else {
        if (b > this._maxX) {
          this._maxX = b
        }
      }
      if (d < this._minY) {
        this._minY = d
      } else {
        if (d > this._maxY) {
          this._maxY = d
        }
      }
    }
  };
  a._updateBounds = function() {
    for (; boundsQueue.length;) {
      boundsQueue.pop().exec(this)
    }
  };
  a._bezierCurveToBounds = function(b, d, g, m, q, s, y, A) {
    this._extendBounds(b, d);
    this._extendBounds(y, A)
  };
  e.Graphics = Graphics
})(window);