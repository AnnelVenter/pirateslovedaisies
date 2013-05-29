(function(e) {
  function c(a, b, d, g) {
    this.HexMapModel(a, b, d, g)
  }
  c.prototype = {HexMapModel:function(a, b, d, g) {
    if(b * a != d.length) {
      throw Error("The mapData count does not match the specified dimensions");
    }
    this._metrics = new HexMapMetrics(g);
    this._cols = a;
    this._rows = b;
    this.generateTileList(d)
  }, getRows:function() {
    return this._rows
  }, getColumns:function() {
    return this._cols
  }, getMetrics:function() {
    return this._metrics
  }, getTiles:function() {
    return this._tiles
  }, calculateDistance:function(a, b) {
    if(a == null || b == null) {
      return null
    }
    return Math.abs(a.column - b.column) + Math.abs(a.row - b.row)
  }, findPath:function(a, b, d, g, m) {
    if(a == null || b == null) {
      return null
    }
    if(m == null) {
      m = false
    }
    if((a.mapData.impassable || b.mapData.impassable) && !g) {
      return null
    }
    if(a == b) {
      return[]
    }
    d = this.calculatePath(a, b, d, g);
    if(m) {
      a = this.calculatePath(b, a, null, g);
      if(a != null && (d == null || d.length > a.length)) {
        d = a;
        d.reverse()
      }
    }
    return d
  }, calculatePath:function(a, b, d, g) {
    var m = [], q = {};
    for(q[a.index] = true;;) {
      var s = this.moveTowards(a, b, d, g);
      if(s == null || q[s.index]) {
        break
      }
      if(s == b) {
        return m
      }
      q[s.index] = true;
      m.push(s);
      d = a;
      a = s
    }
    return null
  }, moveTowards:function(a, b, d, g) {
    if(a == null || b == null || a == b) {
      return null
    }
    var m = Math.atan2(b.y - a.y, b.x - a.x) / (Math.PI / 3);
    b = Math.round(m);
    m = m - b > 0 ? 1 : -1;
    a = a.neighbors;
    for(var q = 0;q < 6;q++) {
      var s = a[(b + (q / 2 + 0.51 | 0) * m * (q % 2 * 2 - 1) + 6) % 6];
      if(!(s == null || s == d || s.mapData.impassable && !g)) {
        return s
      }
    }
    return null
  }, getTilePoints:function(a) {
    return this.getMetrics().getTilePoints(a.column, a.row)
  }, getPositionOfTile:function(a) {
    return this.getMetrics().getPositionOfTile(a.column, a.row)
  }, getTileAtPosition:function(a, b) {
    var d = this._cols, g = this._rows, m = this.getMetrics().getTileAtPosition(a, b);
    return m.x < 0 || m.y < 0 || m.x >= d || m.y >= g ? null : this._tiles[(m.y * d + m.x).floor()]
  }, getTileAt:function(a, b) {
    return this._tiles[a + b * void 0]
  }, getTileAtIndex:function(a) {
    return this._tiles[a]
  }, generateTileList:function(a) {
    for(var b = this._cols, d = this._rows, g = b * d, m = this._tiles = [], q = 0;q < g;q++) {
      var s = new HexTile(q, q % b, (q / b).floor());
      s.mapData = a[q];
      m.push(s)
    }
    for(q = 0;q < g;q++) {
      s = m[q];
      a = s.column;
      var y = s.row, A = this.getPositionOfTile(s);
      s.x = A.x;
      s.y = A.y;
      A = [];
      A.push(a + 1 < b ? m[q + 1] : null);
      A.push(a + 1 < b && y + 1 < d ? m[q + b] : null);
      A.push(a > 0 && y + 1 < d ? m[q + b - 1] : null);
      A.push(a > 0 ? m[q - 1] : null);
      A.push(a > 0 && y > 0 ? m[q - b] : null);
      A.push(a + 1 < b && y > 0 ? m[q - b + 1] : null);
      s.neighbors = A
    }
  }};
  e.HexMapModel = c
})(window);(function(e) {
  function c(a) {
    if(isNaN(a)) {
      a = 25
    }
    this.HexMapMetrics(a)
  }
  c.prototype = {HexMapMetrics:function(a) {
    this.sinVal = Math.sin(Math.PI / 6);
    this.cosVal = Math.cos(Math.PI / 6);
    this._rowH = this._colW = this._triH = this._triW = this._size = null;
    this.setSize(a)
  }, getSize:function() {
    return this._size
  }, setSize:function(a) {
    this._size = a;
    this.calculateMetrics()
  }, getColumnWidth:function() {
    return this._colW
  }, setColumnWidth:function(a) {
    this._colW = a / (this.cosVal * 2);
    this.calculateMetrics()
  }, getRowHeight:function() {
    return this._rowH
  }, setRowHeight:function(a) {
    this._rowH = a / (this.cosVal * 2);
    this.calculateMetrics()
  }, getTileAtPosition:function(a, b) {
    var d = this._rowH, g = this._colW, m = this._triH, q = this._triW, s = (b / d).floor(), y = ((a - s * g * 0.5) / g).floor();
    if(b % d < m) {
      g = y * g + g * 0.5 * s + q;
      if(Math.abs(g - a) * this.sinVal > b % d) {
        s--;
        a > g && y++
      }
    }
    return new Point(y, s)
  }, getPositionOfTile:function(a, b) {
    return new Point(a * this._colW + this._triW + b * this._colW * 0.5, b * this._rowH + this._triH + this._size / 2)
  }, getTilePoints:function(a, b) {
    var d = this._colW, g = this._rowH, m = this._triW, q = this._triH, s = d * a + b * d * 0.5, y = g * b;
    return[new Point(s, y + q), new Point(s + m, y), new Point(s + d, y + q), new Point(s + d, y + g), new Point(s + m, y + g + q), new Point(s, y + g)]
  }, calculateMetrics:function() {
    var a = this._size;
    this._triW = a * this.cosVal;
    this._triH = a * this.sinVal;
    this._rowH = a + this._triH;
    this._colW = this._triW * 2
  }};
  e.HexMapMetrics = c
})(window);