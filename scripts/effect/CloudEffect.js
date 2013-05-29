function CloudEffect(e, c) {
  this.CloudEffect(e, c)
}
CloudEffect.cloudSrc = ["img/Cloud1.png", "img/Cloud2.png", "img/Cloud3.png", "img/Cloud4.png", "img/Cloud5.png"];
CloudEffect.preloaded = false;
CloudEffect.preloadCount = 0;
CloudEffect.cloudImgs = [];
CloudEffect.preload = function() {
  if (!(CloudEffect.preloaded || CloudEffect.preloadCount != 0)) {
    CloudEffect.preloadCount = CloudEffect.cloudSrc.length;
    for (var e = 0; e < CloudEffect.preloadCount; e++) {
      var c = new Image;
      c.onload = CloudEffect.imageLoaded;
      c.src = CloudEffect.cloudSrc[e]
    }
  }
};
CloudEffect.imageLoaded = function(e) {
  var c = CloudEffect.generateShadow(e.target);
  CloudEffect.cloudImgs.push({
    img: e.target,
    shadow: c
  });
  if (--CloudEffect.preloadCount == 0) {
    CloudEffect.preloaded = true
  }
};
CloudEffect.generateShadow = function(e) {
  var c = document.createElement("canvas"),
    a = e.width,
    b = e.height;
  c.width = a;
  c.height = b;
  var d = c.getContext("2d");
  d.drawImage(e, 0, 0);
  e = d.getImageData(0, 0, a, b);
  for (var g = e.data, m = a * b * 4, q = 0; q < m; q += 4) {
    g[q] = g[q + 1] = g[q + 2] = 0;
    g[q + 3] *= 0.15
  }
  d.clearRect(0, 0, a, b);
  d.putImageData(e, 0, 0);
  return c
};
CloudEffect.prototype = {
  CloudEffect: function(e, c) {
    this.name = "cloudEffect";
    this.clouds = [];
    this.darkClouds = c;
    this.nextCloud = 0;
    this.enabled = e;
    this.nextY = Math.random() * 200
  },
  toString: function() {
    return "[CloudEffect]"
  },
  setEnabled: function(e) {
    this.enabled = e
  },
  setVisible: function(e) {
    this.visible = e
  },
  update: function(e, c, a, b) {
    if (CloudEffect.preloaded) {
      if (!b && this.clouds.length < 10) {
        if (this.nextCloud <= 0) {
          var d = Math.random() * CloudEffect.cloudImgs.length | 0,
            g = CloudEffect.cloudImgs[d].img,
            m = Math.random() * 2 + 2;
          d = {
            n: d,
            h: Math.random() * 60 + 30,
            sx: m,
            sy: Math.random() * 2 + 1,
            x: -g.width * m,
            y: this.nextY - g.height / 2,
            vx: Math.random() + 1,
            vy: Math.random() * 0.2 - 0.1
          };
          this.clouds.push(d);
          this.nextCloud = Math.random() * 200 + 150 | 0;
          this.nextY = (this.nextY + (0.2 + Math.random() * 0.3) * a) % a
        }
        this.nextCloud--
      }
      m = this.clouds.length;
      for (var q = m - 1; q >= 0; q--) {
        d = this.clouds[q];
        if (!b) {
          d.x += d.vx;
          d.y += d.vy;
          if (d.x > c) {
            this.clouds.splice(q, 1);
            m--;
            continue
          }
        }
        g = CloudEffect.cloudImgs[d.n].shadow;
        this.visible && e.drawImage(g, d.x + d.h * 0.6, d.y + d.h, g.width * d.sx, g.height * d.sy)
      }
      if (this.darkClouds) {
        e.fillStyle = "rgba(25, 30, 40, 0.15)";
        e.fillRect(0, 0, c, a)
      }
      if (this.visible) {
        for (q = 0; q < m; q++) {
          d = this.clouds[q];
          g = CloudEffect.cloudImgs[d.n].img;
          e.drawImage(g, d.x, d.y, g.width * d.sx, g.height * d.sy)
        }
      }
    }
  }
};