(function(e) {
  DisplayObject = function() {
    this.initialize()
  };
  var c = DisplayObject.prototype;
  DisplayObject.suppressCrossDomainErrors = false;
  DisplayObject._hitTestCanvas = document.createElement("canvas");
  DisplayObject._hitTestCanvas.width = DisplayObject._hitTestCanvas.height = 1;
  DisplayObject._hitTestContext = DisplayObject._hitTestCanvas.getContext("2d");
  DisplayObject._workingMatrix = new Matrix2D;
  c.alpha = 1;
  c.cacheCanvas = null;
  c.id = -1;
  c.mouseEnabled = true;
  c.name = null;
  c.parent = null;
  c.regX = 0;
  c.regY = 0;
  c.rotation = 0;
  c.scaleX = 1;
  c.scaleY = 1;
  c.skewX = 0;
  c.skewY = 0;
  c.shadow = null;
  c.visible = true;
  c.x = 0;
  c.y = 0;
  c.compositeOperation = null;
  c.snapToPixel = false;
  c.onPress = null;
  c.onClick = null;
  c.onDoubleClick = null;
  c.onMouseOver = null;
  c.onMouseOut = null;
  c.filters = null;
  c._cacheOffsetX = 0;
  c._cacheOffsetY = 0;
  c._cacheDraw = false;
  c._activeContext = null;
  c._restoreContext = false;
  c._revertShadow = false;
  c._revertX = 0;
  c._revertY = 0;
  c._revertAlpha = 1;
  c._minX = NaN;
  c._minY = NaN;
  c._maxX = NaN;
  c._maxY = NaN;
  c.initialize = function() {
    this.id = UID.get();
    this.children = []
  };
  c.isVisible = function() {
    return this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0
  };
  c.draw = function(a, b) {
    if (b || !this.cacheCanvas) {
      return false
    }
    a.drawImage(this.cacheCanvas, this._cacheOffsetX, this._cacheOffsetY);
    return true
  };
  c.cache = function(a, b, d, g) {
    if (this.cacheCanvas == null) {
      this.cacheCanvas = document.createElement("canvas")
    }
    var m = this.cacheCanvas.getContext("2d");
    this.cacheCanvas.width = d;
    this.cacheCanvas.height = g;
    m.setTransform(1, 0, 0, 1, -a, -b);
    m.clearRect(0, 0, d + 1, g + 1);
    this.draw(m, true, new Matrix2D(1, 0, 0, 1, -a, -b));
    this._cacheOffsetX = a;
    this._cacheOffsetY = b;
    this._applyFilters()
  };
  c.updateCache = function(a) {
    if (this.cacheCanvas == null) {
      throw "cache() must be called before updateCache()";
    }
    var b = this.cacheCanvas.getContext("2d");
    b.setTransform(1, 0, 0, 1, -this._cacheOffsetX, -this._cacheOffsetY);
    if (a) {
      b.globalCompositeOperation = a
    } else {
      b.clearRect(0, 0, this.cacheCanvas.width + 1, this.cacheCanvas.height + 1)
    }
    this.draw(b, true);
    if (a) {
      b.globalCompositeOperation = "source-over"
    }
    this._applyFilters()
  };
  c.uncache = function() {
    this.cacheCanvas = null;
    this._cacheOffsetX = this._cacheOffsetY = 0
  };
  c.getStage = function() {
    for (var a = this; a.parent;) {
      a = a.parent
    }
    if (a instanceof Stage) {
      return a
    }
    return null
  };
  c.localToGlobal = function(a, b) {
    var d = this.getConcatenatedMatrix();
    if (d == null) {
      return null
    }
    d.append(1, 0, 0, 1, a, b);
    return new Point(d.tx, d.ty)
  };
  c.globalToLocal = function(a, b) {
    var d = this.getConcatenatedMatrix();
    if (d == null) {
      return null
    }
    d.invert();
    d.append(1, 0, 0, 1, a, b);
    return new Point(d.tx, d.ty)
  };
  c.localToLocal = function(a, b, d) {
    a = this.localToGlobal(a, b);
    return d.globalToLocal(a.x, a.y)
  };
  c.setTransform = function(a, b, d, g, m, q, s, y, A) {
    this.x = a || 0;
    this.y = b || 0;
    this.scaleX = d == null ? 1 : d;
    this.scaleY = g == null ? 1 : g;
    this.rotation = m || 0;
    this.skewX = q || 0;
    this.skewY = s || 0;
    this.regX = y || 0;
    this.regY = A || 0
  };
  c.getConcatenatedMatrix = function(a) {
    if (a) {
      a.identity()
    } else {
      a = new Matrix2D
    }
    for (var b = this; b != null;) {
      a.prependTransform(b.x, b.y, b.scaleX, b.scaleY, b.rotation, b.skewX, b.skewY, b.regX, b.regY);
      a.prependProperties(b.alpha, b.shadow, b.compositeOperation);
      b = b.parent
    }
    return a
  };
  c.hitTest = function(a, b) {
    var d = DisplayObject._hitTestContext,
      g = DisplayObject._hitTestCanvas;
    d.setTransform(1, 0, 0, 1, -a, -b);
    this.draw(d);
    d = this._testHit(d);
    g.width = 0;
    g.width = 1;
    return d
  };
  c.getBounds = function() {
    return this._cacheCanvas ? new Rectangle(-this._cacheOffsetX, -this._cacheOffsetY, this.cacheCanvas.width, this.cacheCanvas.height) : this._calculateBounds()
  };
  c.clone = function() {
    var a = new DisplayObject;
    this.cloneProps(a);
    return a
  };
  c.toString = function() {
    return "[DisplayObject (name=" + this.name + ")]"
  };
  c.cloneProps = function(a) {
    a.alpha = this.alpha;
    a.name = this.name;
    a.regX = this.regX;
    a.regY = this.regY;
    a.rotation = this.rotation;
    a.scaleX = this.scaleX;
    a.scaleY = this.scaleY;
    a.shadow = this.shadow;
    a.skewX = this.skewX;
    a.skewY = this.skewY;
    a.visible = this.visible;
    a.x = this.x;
    a.y = this.y;
    a.mouseEnabled = this.mouseEnabled;
    a.compositeOperation = this.compositeOperation
  };
  c.applyShadow = function(a, b) {
    b = b || Shadow.identity;
    a.shadowColor = b.color;
    a.shadowOffsetX = b.offsetX;
    a.shadowOffsetY = b.offsetY;
    a.shadowBlur = b.blur
  };
  c._testHit = function(a) {
    try {
      var b = a.getImageData(0, 0, 1, 1).data[3] > 1
    } catch (d) {
      if (!DisplayObject.suppressCrossDomainErrors) {
        throw "An error has occured. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images.";
      }
    }
    return b
  };
  c._applyFilters = function() {
    if (!(!this.filters || this.filters.length == 0 || !this.cacheCanvas)) {
      for (var a = this.filters.length, b = this.cacheCanvas.getContext("2d"), d = this.cacheCanvas.width, g = this.cacheCanvas.height, m = 0; m < a; m++) {
        this.filters[m].applyFilter(b, 0, 0, d, g)
      }
    }
  };
  c._calculateBounds = function() {
    return new Rectangle(0, 0, 0, 0)
  };
  e.DisplayObject = DisplayObject
})(window);
(function(e) {
  Container = function() {
    this.initialize()
  };
  var c = Container.prototype = new DisplayObject;
  c.children = null;
  c.DisplayObject_initialize = c.initialize;
  c.initialize = function() {
    this.DisplayObject_initialize();
    this.children = []
  };
  c.isVisible = function() {
    return this.visible && this.alpha > 0 && this.children.length && this.scaleX != 0 && this.scaleY != 0
  };
  c.DisplayObject_draw = c.draw;
  c.draw = function(a, b, d) {
    var g = Stage._snapToPixelEnabled;
    if (!d) {
      d = new Matrix2D;
      d.appendProperties(this.alpha, this.shadow, this.compositeOperation)
    }
    if (this.DisplayObject_draw(a, b)) {
      return true
    }
    b = this.children.length;
    for (var m = this.children.slice(0), q = 0; q < b; q++) {
      var s = m[q];
      s.tick && s.tick();
      if (s.isVisible()) {
        var y = false,
          A = d.clone();
        A.appendTransform(s.x, s.y, s.scaleX, s.scaleY, s.rotation, s.skewX, s.skewY, s.regX, s.regY);
        A.appendProperties(s.alpha, s.shadow, s.compositeOperation);
        if (!(s instanceof Container && s.cacheCanvas == null)) {
          g && s.snapToPixel && A.a == 1 && A.b == 0 && A.c == 0 && A.d == 1 ? a.setTransform(A.a, A.b, A.c, A.d, A.tx + 0.5 | 0, A.ty + 0.5 | 0) : a.setTransform(A.a, A.b, A.c, A.d, A.tx, A.ty);
          a.globalAlpha = A.alpha;
          a.globalCompositeOperation = A.compositeOperation || "source-over";
          if (y = A.shadow) {
            this.applyShadow(a, y)
          }
        }
        s.draw(a, false, A);
        y && this.applyShadow(a)
      }
    }
    return true
  };
  c.addChild = function(a) {
    var b = arguments.length;
    if (b > 1) {
      for (var d = 0; d < b; d++) {
        this.addChild(arguments[d])
      }
      return arguments[b - 1]
    }
    a.parent && a.parent.removeChild(a);
    a.parent = this;
    this.children.push(a);
    return a
  };
  c.addChildAt = function(a, b) {
    var d = arguments.length;
    if (d > 2) {
      b = arguments[g - 1];
      for (var g = 0; g < d - 1; g++) {
        this.addChildAt(arguments[g], b + g)
      }
      return arguments[d - 2]
    }
    a.parent && a.parent.removeChild(a);
    a.parent = this;
    this.children.splice(b, 0, a);
    return a
  };
  c.removeChild = function(a) {
    var b = arguments.length;
    if (b > 1) {
      for (var d = true, g = 0; g < b; g++) {
        d = d && this.removeChild(arguments[g])
      }
      return d
    }
    return this.removeChildAt(this.children.indexOf(a))
  };
  c.removeChildAt = function(a) {
    var b = arguments.length;
    if (b > 1) {
      for (var d = [], g = 0; g < b; g++) {
        d[g] = arguments[g]
      }
      d.sort(function(q, s) {
        return s - q
      });
      var m = true;
      for (g = 0; g < b; g++) {
        m = m && this.removeChildAt(d[g])
      }
      return m
    }
    if (a < 0 || a > this.children.length - 1) {
      return false
    }
    b = this.children[a];
    if (b != null) {
      b.parent = null
    }
    this.children.splice(a, 1);
    return true
  };
  c.removeAllChildren = function() {
    for (; this.children.length;) {
      this.removeChildAt(0)
    }
  };
  c.getChildAt = function(a) {
    return this.children[a]
  };
  c.sortChildren = function(a) {
    this.children.sort(a)
  };
  c.getChildIndex = function(a) {
    return this.children.indexOf(a)
  };
  c.getNumChildren = function() {
    return this.children.length
  };
  c.contains = function(a) {
    for (; a;) {
      if (a == this) {
        return true
      }
      a = a.parent
    }
    return false
  };
  c.hitTest = function(a, b) {
    return this.getObjectUnderPoint(a, b) != null
  };
  c.getObjectsUnderPoint = function(a, b) {
    var d = [],
      g = this.localToGlobal(a, b);
    this._getObjectsUnderPoint(g.x, g.y, d);
    return d
  };
  c.getObjectUnderPoint = function(a, b) {
    var d = this.localToGlobal(a, b);
    return this._getObjectsUnderPoint(d.x, d.y)
  };
  c.clone = function(a) {
    var b = new Container;
    this.cloneProps(b);
    if (a) {
      for (var d = b.children = [], g = 0, m = this.children.length; g < m; g++) {
        d.push(this.children[g].clone(a))
      }
    }
    return b
  };
  c.toString = function() {
    return "[Container (name=" + this.name + ")]"
  };
  c._getObjectsUnderPoint = function(a, b, d, g) {
    var m = DisplayObject._hitTestContext,
      q = DisplayObject._hitTestCanvas,
      s = DisplayObject._workingMatrix,
      y = g & 1 && (this.onPress || this.onClick || this.onDoubleClick) || g & 2 && (this.onMouseOver || this.onMouseOut);
    if (this.cacheCanvas) {
      this.getConcatenatedMatrix(s);
      m.setTransform(s.a, s.b, s.c, s.d, s.tx - a, s.ty - b);
      m.globalAlpha = s.alpha;
      this.draw(m);
      if (this._testHit(m)) {
        q.width = 0;
        q.width = 1;
        if (y) {
          return this
        }
      } else {
        return null
      }
    }
    for (var A = this.children.length - 1; A >= 0; A--) {
      var H = this.children[A];
      if (H.isVisible() && H.mouseEnabled) {
        if (H instanceof Container) {
          if (y) {
            if (H = H._getObjectsUnderPoint(a, b)) {
              return this
            }
          } else {
            H = H._getObjectsUnderPoint(a, b, d, g);
            if (!d && H) {
              return H
            }
          }
        } else {
          if (!g || y || g & 1 && (H.onPress || H.onClick || H.onDoubleClick) || g & 2 && (H.onMouseOver || H.onMouseOut)) {
            H.getConcatenatedMatrix(s);
            m.setTransform(s.a, s.b, s.c, s.d, s.tx - a, s.ty - b);
            m.globalAlpha = s.alpha;
            H.draw(m);
            if (this._testHit(m)) {
              q.width = 0;
              q.width = 1;
              if (y) {
                return this
              } else {
                if (d) {
                  d.push(H)
                } else {
                  return H
                }
              }
            }
          }
        }
      }
    }
    return null
  };
  c._calculateBounds = function() {};
  e.Container = Container
})(window);
