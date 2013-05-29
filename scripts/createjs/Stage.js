(function(e) {
  Stage = function(a, b) {
    this.initialize(a, b)
  };
  var c = Stage.prototype = new Container;
  Stage._snapToPixelEnabled = false;
  c.autoClear = true;
  c.canvas = null;
  c.mouseX = null;
  c.mouseY = null;
  c.onMouseMove = null;
  c.onMouseUp = null;
  c.onMouseDown = null;
  c.snapToPixelEnabled = false;
  c.mouseInBounds = false;
  c._tmpCanvas = null;
  c._activeMouseEvent = null;
  c._activeMouseTarget = null;
  c._mouseOverIntervalID = null;
  c._mouseOverX = 0;
  c._mouseOverY = 0;
  c._mouseOverTarget = null;
  c.Container_initialize = c.initialize;
  c.initialize = function(a, b) {
    this.Container_initialize();
    this.canvas = a;
    this.mouseChildren = true;
    var d = this;
    if (b) {
      a.addEventListener("touchstart", function(g) {
        d._handleTouchStart(g)
      }, false);
      document.addEventListener("touchend", function(g) {
        d._handleTouchEnd(g)
      }, false)
    } else {
      if (e.addEventListener) {
        e.addEventListener("mouseup", function(g) {
          d._handleMouseUp(g)
        }, false);
        e.addEventListener("mousemove", function(g) {
          d._handleMouseMove(g)
        }, false);
        e.addEventListener("dblclick", function(g) {
          d._handleDoubleClick(g)
        }, false)
      } else {
        if (document.addEventListener) {
          document.addEventListener("mouseup", function(g) {
            d._handleMouseUp(g)
          }, false);
          document.addEventListener("mousemove", function(g) {
            d._handleMouseMove(g)
          }, false);
          document.addEventListener("dblclick", function(g) {
            d._handleDoubleClick(g)
          }, false)
        }
      }
      a.addEventListener("mousedown", function(g) {
        d._handleMouseDown(g)
      }, false)
    }
  };
  c.update = function() {
    if (this.canvas) {
      this.autoClear && this.clear();
      Stage._snapToPixelEnabled = this.snapToPixelEnabled;
      this.draw(this.canvas.getContext("2d"), false, this.getConcatenatedMatrix(DisplayObject._workingMatrix))
    }
  };
  c.tick = c.update;
  c.clear = function() {
    if (this.canvas) {
      var a = this.canvas.getContext("2d");
      a.setTransform(1, 0, 0, 1, 0, 0);
      a.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
  };
  c.toDataURL = function(a, b) {
    b || (b = "image/png");
    var d = this.canvas.getContext("2d"),
      g = this.canvas.width,
      m = this.canvas.height,
      q;
    if (a) {
      q = d.getImageData(0, 0, g, m);
      var s = d.globalCompositeOperation;
      d.globalCompositeOperation = "destination-over";
      d.fillStyle = a;
      d.fillRect(0, 0, g, m)
    }
    var y = this.canvas.toDataURL(b);
    if (a) {
      d.clearRect(0, 0, g, m);
      d.putImageData(q, 0, 0);
      d.globalCompositeOperation = s
    }
    return y
  };
  c.enableMouseOver = function(a) {
    if (this._mouseOverIntervalID) {
      clearInterval(this._mouseOverIntervalID);
      this._mouseOverIntervalID = null
    }
    if (!(a <= 0)) {
      var b = this;
      this._mouseOverIntervalID = setInterval(function() {
        b._testMouseOver()
      }, 1E3 / Math.min(50, a));
      this._mouseOverX = NaN;
      this._mouseOverTarget = null
    }
  };
  c.clone = function() {
    var a = new Stage(null);
    this.cloneProps(a);
    return a
  };
  c.toString = function() {
    return "[Stage (name=" + this.name + ")]"
  };
  c._primaryTouchId = -1;
  c._handleTouchMoveListener = null;
  c._handleTouchStart = function(a) {
    a.preventDefault();
    a = a.changedTouches;
    if (this._primaryTouchId == -1) {
      if (!this._handleTouchMoveListener) {
        var b = this;
        this._handleTouchMoveListener = function(d) {
          b._handleTouchMove(d)
        }
      }
      document.addEventListener("touchmove", this._handleTouchMoveListener, false);
      a = a[0];
      this._primaryTouchId = a.identifier;
      this._updateMousePosition(a.pageX, a.pageY);
      this._handleMouseDown(a)
    }
  };
  c._handleTouchMove = function(a) {
    (a = this._findPrimaryTouch(a.changedTouches)) && this._handleMouseMove(a)
  };
  c._handleTouchEnd = function(a) {
    if (a = this._findPrimaryTouch(a.changedTouches)) {
      this._handleMouseUp(a);
      this._primaryTouchId = -1;
      document.removeEventListener("touchmove", this._handleTouchMoveListener)
    }
  };
  c._findPrimaryTouch = function(a) {
    for (var b = a.length, d, g = 0; g < b; g++) {
      d = a[g];
      if (d.identifier == this._primaryTouchId) {
        return d
      }
    }
    return null
  };
  c._handleMouseMove = function(a) {
    if (this.canvas) {
      if (!a) {
        a = e.event
      }
      var b = this.mouseInBounds;
      this._updateMousePosition(a.pageX, a.pageY);
      if (b || this.mouseInBounds) {
        b = new MouseEvent("onMouseMove", this.mouseX, this.mouseY);
        b.nativeEvent = a;
        this.onMouseMove && this.onMouseMove(b);
        this._activeMouseEvent && this._activeMouseEvent.onMouseMove && this._activeMouseEvent.onMouseMove(b)
      }
    } else {
      this.mouseX = this.mouseY = null
    }
  };
  c._updateMousePosition = function(a, b) {
    var d = this.canvas;
    do {
      a -= d.offsetLeft;
      b -= d.offsetTop
    } while (d = d.offsetParent);
    if (this.mouseInBounds = a >= 0 && b >= 0 && a < this.canvas.width && b < this.canvas.height) {
      this.mouseX = a;
      this.mouseY = b
    }
  };
  c._handleMouseUp = function(a) {
    var b = new MouseEvent("onMouseUp", this.mouseX, this.mouseY);
    b.nativeEvent = a;
    this.onMouseUp && this.onMouseUp(b);
    this._activeMouseEvent && this._activeMouseEvent.onMouseUp && this._activeMouseEvent.onMouseUp(b);
    if (this._activeMouseTarget && this._activeMouseTarget.onClick && this._getObjectsUnderPoint(this.mouseX, this.mouseY, null, true, this._mouseOverIntervalID ? 3 : 1) == this._activeMouseTarget) {
      b = new MouseEvent("onClick", this.mouseX, this.mouseY);
      b.nativeEvent = a;
      this._activeMouseTarget.onClick(b)
    }
    this._activeMouseEvent = this.activeMouseTarget = null
  };
  c._handleMouseDown = function(a) {
    var b;
    if (this.onMouseDown) {
      b = new MouseEvent("onMouseDown", this.mouseX, this.mouseY);
      b.nativeEvent = a;
      this.onMouseDown(b)
    }
    var d = this._getObjectsUnderPoint(this.mouseX, this.mouseY, null, this._mouseOverIntervalID ? 3 : 1);
    if (d) {
      if (d.onPress instanceof Function) {
        b = new MouseEvent("onPress", this.mouseX, this.mouseY);
        b.nativeEvent = a;
        d.onPress(b);
        if (b.onMouseMove || b.onMouseUp) {
          this._activeMouseEvent = b
        }
      }
      this._activeMouseTarget = d
    }
  };
  c._testMouseOver = function() {
    if (!(this.mouseX == this._mouseOverX && this.mouseY == this._mouseOverY && this.mouseInBounds)) {
      var a = null;
      if (this.mouseInBounds) {
        a = this._getObjectsUnderPoint(this.mouseX, this.mouseY, null, 3);
        this._mouseOverX = this.mouseX;
        this._mouseOverY = this.mouseY
      }
      if (this._mouseOverTarget != a) {
        this._mouseOverTarget && this._mouseOverTarget.onMouseOut && this._mouseOverTarget.onMouseOut(new MouseEvent("onMouseOver", this.mouseX, this.mouseY));
        a && a.onMouseOver && a.onMouseOver(new MouseEvent("onMouseOut", this.mouseX, this.mouseY));
        this._mouseOverTarget = a
      }
    }
  };
  c._handleDoubleClick = function(a) {
    var b;
    if (this.onDoubleClick) {
      b = new MouseEvent("onDoubleClick", this.mouseX, this.mouseY);
      b.nativeEvent = a;
      this.onDoubleClick(b)
    }
    var d = this._getObjectsUnderPoint(this.mouseX, this.mouseY, null, this._mouseOverIntervalID ? 3 : 1);
    if (d) {
      if (d.onDoubleClick instanceof Function) {
        b = new MouseEvent("onPress", this.mouseX, this.mouseY);
        b.nativeEvent = a;
        d.onDoubleClick(b)
      }
    }
  };
  e.Stage = Stage
})(window);
