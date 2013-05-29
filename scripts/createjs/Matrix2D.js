(function(e) {
  Matrix2D = function(a, b, d, g, m, q) {
    this.initialize(a, b, d, g, m, q)
  };
  var c = Matrix2D.prototype;
  Matrix2D.identity = null;
  Matrix2D.DEG_TO_RAD = Math.PI / 180;
  c.a = 1;
  c.b = 0;
  c.c = 0;
  c.d = 1;
  c.tx = 0;
  c.ty = 0;
  c.alpha = 1;
  c.shadow = null;
  c.compositeOperation = null;
  c.initialize = function(a, b, d, g, m, q) {
    if (a != null) {
      this.a = a
    }
    if (b != null) {
      this.b = b
    }
    if (d != null) {
      this.c = d
    }
    if (g != null) {
      this.d = g
    }
    if (m != null) {
      this.tx = m
    }
    if (q != null) {
      this.ty = q
    }
  };
  c.prepend = function(a, b, d, g, m, q) {
    var s = this.tx;
    if (a != 1 || b != 0 || d != 0 || g != 1) {
      var y = this.a,
        A = this.c;
      this.a = y * a + this.b * d;
      this.b = y * b + this.b * g;
      this.c = A * a + this.d * d;
      this.d = A * b + this.d * g
    }
    this.tx = s * a + this.ty * d + m;
    this.ty = s * b + this.ty * g + q
  };
  c.append = function(a, b, d, g, m, q) {
    var s = this.a,
      y = this.b,
      A = this.c,
      H = this.d;
    this.a = a * s + b * A;
    this.b = a * y + b * H;
    this.c = d * s + g * A;
    this.d = d * y + g * H;
    this.tx = m * s + q * A + this.tx;
    this.ty = m * y + q * H + this.ty
  };
  c.prependMatrix = function(a) {
    this.prepend(a.a, a.b, a.c, a.d, a.tx, a.ty);
    this.prependProperties(a.alpha, a.shadow, a.compositeOperation)
  };
  c.appendMatrix = function(a) {
    this.append(a.a, a.b, a.c, a.d, a.tx, a.ty);
    this.appendProperties(a.alpha, a.shadow, a.compositeOperation)
  };
  c.prependTransform = function(a, b, d, g, m, q, s, y, A) {
    if (m % 360) {
      var H = m * Matrix2D.DEG_TO_RAD;
      m = Math.cos(H);
      H = Math.sin(H)
    } else {
      m = 1;
      H = 0
    }
    if (y || A) {
      this.tx -= y;
      this.ty -= A
    }
    if (q || s) {
      q *= Matrix2D.DEG_TO_RAD;
      s *= Matrix2D.DEG_TO_RAD;
      this.prepend(m * d, H * d, -H * g, m * g, 0, 0);
      this.prepend(Math.cos(s), Math.sin(s), -Math.sin(q), Math.cos(q), a, b)
    } else {
      this.prepend(m * d, H * d, -H * g, m * g, a, b)
    }
  };
  c.appendTransform = function(a, b, d, g, m, q, s, y, A) {
    if (m % 360) {
      var H = m * Matrix2D.DEG_TO_RAD;
      m = Math.cos(H);
      H = Math.sin(H)
    } else {
      m = 1;
      H = 0
    }
    if (q || s) {
      q *= Matrix2D.DEG_TO_RAD;
      s *= Matrix2D.DEG_TO_RAD;
      this.append(Math.cos(s), Math.sin(s), -Math.sin(q), Math.cos(q), a, b);
      this.append(m * d, H * d, -H * g, m * g, 0, 0)
    } else {
      this.append(m * d, H * d, -H * g, m * g, a, b)
    }
    if (y || A) {
      this.tx -= y * this.a + A * this.c;
      this.ty -= y * this.b + A * this.d
    }
  };
  c.rotate = function(a) {
    var b = Math.cos(a);
    a = Math.sin(a);
    var d = this.a,
      g = this.c,
      m = this.tx;
    this.a = d * b - this.b * a;
    this.b = d * a + this.b * b;
    this.c = g * b - this.d * a;
    this.d = g * a + this.d * b;
    this.tx = m * b - this.ty * a;
    this.ty = m * a + this.ty * b
  };
  c.skew = function(a, b) {
    a *= Matrix2D.DEG_TO_RAD;
    b *= Matrix2D.DEG_TO_RAD;
    this.append(Math.cos(b), Math.sin(b), -Math.sin(a), Math.cos(a), 0, 0)
  };
  c.scale = function(a, b) {
    this.a *= a;
    this.d *= b;
    this.tx *= a;
    this.ty *= b
  };
  c.translate = function(a, b) {
    this.tx += a;
    this.ty += b
  };
  c.identity = function() {
    this.alpha = this.a = this.d = 1;
    this.b = this.c = this.tx = this.ty = 0;
    this.shadow = this.compositeOperation = null
  };
  c.invert = function() {
    var a = this.a,
      b = this.b,
      d = this.c,
      g = this.d,
      m = this.tx,
      q = a * g - b * d;
    this.a = g / q;
    this.b = -b / q;
    this.c = -d / q;
    this.d = a / q;
    this.tx = (d * this.ty - g * m) / q;
    this.ty = -(a * this.ty - b * m) / q
  };
  c.decompose = function(a) {
    if (a == null) {
      a = {}
    }
    a.x = this.tx;
    a.y = this.ty;
    a.scaleX = Math.sqrt(this.a * this.a + this.b * this.b);
    a.scaleY = Math.sqrt(this.c * this.c + this.d * this.d);
    var b = Math.atan2(-this.c, this.d),
      d = Math.atan2(this.b, this.a);
    if (b == d) {
      a.rotation = d / Matrix2D.DEG_TO_RAD;
      if (this.a < 0 && this.d >= 0) {
        a.rotation += a.rotation <= 0 ? 180 : -180
      }
      a.skewX = a.skewY = 0
    } else {
      a.skewX = b / Matrix2D.DEG_TO_RAD;
      a.skewY = d / Matrix2D.DEG_TO_RAD
    }
    return a
  };
  c.appendProperties = function(a, b, d) {
    this.alpha *= a;
    this.shadow = b || this.shadow;
    this.compositeOperation = d || this.compositeOperation
  };
  c.prependProperties = function(a, b, d) {
    this.alpha *= a;
    this.shadow = this.shadow || b;
    this.compositeOperation = this.compositeOperation || d
  };
  c.clone = function() {
    var a = new Matrix2D(this.a, this.b, this.c, this.d, this.tx, this.ty);
    a.shadow = this.shadow;
    a.alpha = this.alpha;
    a.compositeOperation = this.compositeOperation;
    return a
  };
  c.toString = function() {
    return "[Matrix2D (a=" + this.a + " b=" + this.b + " c=" + this.c + " d=" + this.d + " tx=" + this.tx + " ty=" + this.ty + ")]"
  };
  Matrix2D.identity = new Matrix2D(1, 0, 0, 1, 0, 0);
  e.Matrix2D = Matrix2D
})(window);
