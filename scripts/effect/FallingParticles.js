(function(e) {
  function c(a, b, d, g, m) {
    this.FallingParticles(a, b, d, g, m)
  }
  c.prototype = {
    FallingParticles: function(a, b, d, g, m) {
      this.particleImages = [];
      this.particleList = [];
      this.particleSrc = b;
      this.scaleDown = false;
      this.globalAlpha = m || 1;
      this.radius = 250;
      this.scaleMin = d || 0.25;
      this.scaleMax = g || 1;
      this.minVelocityY = 1.5;
      this.maxVelocityY = 5;
      this.minVelocityX = -3;
      this.maxVelocityX = 6;
      this.mouseEnabled = true;
      this.canvas = a;
      this.context = this.canvas.getContext("2d");
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.preloadCount = this.particleSrc.length;
      this.preloaded = false;
      for (a = 0; a < this.particleSrc.length; a++) {
        b = new Image;
        b.onload = $.proxy(this, "imageLoaded");
        b.src = this.particleSrc[a]
      }
      this.setEnabled(true)
    },
    setEnabled: function() {
      this.enabled = true
    },
    setAlpha: function(a) {
      this.globalAlpha = a
    },
    imageLoaded: function(a) {
      this.particleImages.push({
        img: a.target
      });
      if (--this.preloadCount == 0) {
        this.preloaded = true;
        this.started && this.start(this.numParticles)
      }
    },
    start: function(a) {
      this.started = true;
      this.numParticles = a;
      if (this.preloaded != false) {
        a = this.numParticles;
        for (var b, d, g = 0; g < a; g++) {
          b = Math.random() * this.particleImages.length | 0;
          b = this.particleImages[b].img;
          b = {
            image: b
          };
          this.initParticle(b);
          b.y = -Math.random() * this.height - 100;
          if (d != null) {
            d.next = b
          } else {
            this.firstNode = b
          }
          d = b
        }
        this.canvas.onmousemove = $.proxy(this, "onMouseMove")
      }
    },
    stop: function(a) {
      this.started = false;
      this.canvas.onmousemove = null;
      a && this.context.clearRect(0, 0, this.width, this.height)
    },
    initParticle: function(a) {
      a.x = Math.random() * this.width;
      a.y = -100;
      var b = this.scaleMin + Math.random() * (this.scaleMax - this.scaleMin);
      a.width = a.image.width * b;
      a.height = a.image.height * b;
      a.registrationPoint = new Point(a.width / 2, a.height / 2);
      a.alpha = Math.min(1, b * 2.4 - 0.3);
      a.velocityX = (this.minVelocityX + Math.random() * this.maxVelocityX) * b;
      a.velocityY = this.minVelocityY + this.maxVelocityY * b + Math.random()
    },
    tick: function() {
      this.context.clearRect(0, 0, this.width, this.height);
      this.update(this.context, this.width, this.height, false)
    },
    update: function(a) {
      if (this.preloaded != false) {
        var b, d, g, m, q, s, y = this.radius;
        g = this.mouseX;
        q = this.mouseY;
        var A = [new Point(g, q)];
        if (this.mousePoints) {
          A = this.mousePoints.concat(A)
        }
        for (var H = A.length, M = this.firstNode; M != null;) {
          M.x += M.velocityX;
          M.y += M.velocityY;
          a.globalAlpha = M.alpha * this.globalAlpha;
          a.drawImage(M.image, M.x, M.y, M.width | 0, M.height | 0);
          if (this.scaleDown && M.y > 0) {
            M.width *= 0.92;
            M.height *= 0.92
          }
          if (M.y > this.height || M.height < 2) {
            this.initParticle(M)
          } else {
            if (this.mouseEnabled == true) {
              b = M.x + M.registrationPoint.x;
              d = M.y + M.registrationPoint.y;
              for (s = 0; s < H; s++) {
                g = A[s].x;
                q = A[s].y;
                g = g - b;
                m = q - d;
                q = (y - Math.sqrt(g * g + m * m)) / y;
                if (q > 0) {
                  g = Math.atan2(m, g);
                  M.x += Math.cos(g) * q * -12;
                  M.y += Math.min(0, Math.sin(g) * q * -8)
                }
              }
            }
          }
          M = M.next
        }
      }
    },
    onMouseMove: function(a) {
      if (this.preloaded != false) {
        if (a.offsetX) {
          this.mouseX = a.offsetX;
          this.mouseY = a.offsetY
        } else {
          if (a.layerX) {
            this.mouseX = a.layerX;
            this.mouseY = a.layerY
          }
        }
        if (this.siblings) {
          a = this.siblings.length;
          for (var b = 0; b < a; b++) {
            this.siblings[b].mouseX = this.mouseX;
            this.siblings[b].mouseY = this.mouseY
          }
        }
      }
    }
  };
  e.FallingParticles = c
})(window);
