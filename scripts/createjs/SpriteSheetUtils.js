(function(e) {
  function c() {
    throw "SpriteSheetUtils cannot be instantiated";
  }
  c.flip = function(a, b, d, g, m) {
    var q = a.width / b | 0,
      s = a.height / d | 0,
      y = q * s,
      A = {};
    for (var H in g) {
      G = g[H];
      if (G instanceof Array) {
        G = G.slice(0)
      }
      A[H] = G
    }
    var M = [],
      S = 0,
      V = 0;
    for (H in m) {
      G = m[H];
      var G = g[G[0]];
      if (G != null) {
        if (G instanceof Array) {
          var k = G[0],
            W = G[1];
          if (W == null) {
            W = k
          }
        } else {
          k = W = G
        }
        M[V] = H;
        M[V + 1] = k;
        M[V + 2] = W;
        S += W - k + 1;
        V += 4
      }
    }
    g = document.createElement("canvas");
    g.width = a.width;
    g.height = Math.ceil(s + S / q) * d;
    S = g.getContext("2d");
    for (H = q * b; H > 0;) {
      try {
        S.drawImage(a, 0, 0, H, s * d, 0, 0, H, s * d);
        break
      } catch (ia) {
        H--
      }
    }
    s = y - 1;
    for (V = 0; V < M.length; V += 4) {
      H = M[V];
      k = M[V + 1];
      W = M[V + 2];
      G = m[H];
      y = G[1] ? -1 : 1;
      var ga = G[2] ? -1 : 1,
        ba = y == -1 ? b : 0,
        ja = ga == -1 ? d : 0;
      for (j = k; j <= W; j++) {
        s++;
        S.save();
        S.translate(s % q * b + ba, (s / q | 0) * d + ja);
        S.scale(y, ga);
        try {
          S.drawImage(a, j % q * b, (j / q | 0) * d, b, d, 0, 0, b, d)
        } catch (pa) {
          DatabaseDelegate.logError("SpriteSheet.flip()", "Image: " + a.src);
          break
        }
        S.restore()
      }
      A[H] = [s - (W - k), s, G[3]]
    }
    a = new Image;
    a.src = g.toDataURL("image/png");
    return {
      image: a,
      frameData: A
    }
  };
  c.frameDataToString = function(a) {
    var b = "",
      d = 0,
      g = 0,
      m = 0;
    for (var q in a) {
      m++;
      data = a[q];
      if (data instanceof Array) {
        var s = data[0],
          y = data[1];
        if (y == null) {
          y = s
        }
        next = data[2];
        if (next == null) {
          next = q
        }
      } else {
        s = y = data;
        next = q
      }
      b += "\n\t" + q + ", start=" + s + ", end=" + y + ", next=" + next;
      if (next == false) {
        b += " (stop)"
      } else {
        if (next == q) {
          b += " (loop)"
        }
      }
      if (y > d) {
        d = y
      }
      if (s < g) {
        g = s
      }
    }
    return b = m + " sequences, min=" + g + ", max=" + d + b
  };
  e.SpriteSheetUtils = c
})(window);
