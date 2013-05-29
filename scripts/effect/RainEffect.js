(function(e) {
  function c(a, b, d, g, m) {
    this.RainEffect(a, b, d, g, m)
  }
  c.prototype = {
    RainEffect: function(a, b) {
      this.particleImages = [];
      this.particleList = [];
      this.particleSrc = b;
      this.enabled = true;
      this.canvas = a;
      this.context = this.canvas.getContext("2d");
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.preloadCount = this.particleSrc.length;
      this.preloaded = false;
      for (var d = 0; d < this.particleSrc.length; d++) {
        var g = new Image;
        g.onload = $.proxy(this, "imageLoaded");
        g.src = this.particleSrc[d]
      }
      this.enabled = false;
      this.raining = true
    },
    start: function() {
      this.raining = true
    },
    stop: function() {
      this.raining = false
    },
    setEnabled: function(a) {
      this.enabled = a
    },
    imageLoaded: function(a) {
      this.particleImages.push(a.target);
      this.preloaded = --this.preloadCount == 0
    },
    initParticle: function(a) {
      a.x = Math.random() * this.width;
      a.y = Math.random() * this.height - 200;
      a.image = this.particleImages[this.particleImages.length * Math.random() | 0];
      var b = Math.random() * 0.5 + 0.5;
      a.scale = b;
      a.width = a.image.width * b * (Math.random() * 0.3 + 0.3);
      a.height = a.image.height * b;
      a.alpha = b * 0.4;
      return a
    },
    tick: function() {
      this.context.clearRect(0, 0, this.width, this.height);
      this.update(this.context, this.width, this.height, false)
    },
    update: function() {
      if (!(this.preloaded == false || this.enabled == false)) {
        for (; this.raining && this.particleList.length < 240 && Math.random() < 0.4;) {
          this.particleList.push(this.initParticle({}))
        }
        for (var a = this.particleList.length - 1; a >= 0; a--) {
          particle = this.particleList[a];
          particle.y += particle.scale * 40;
          this.context.globalAlpha = particle.alpha;
          this.context.drawImage(particle.image, particle.x, particle.y, particle.width | 0, particle.height | 0);
          particle.alpha -= 0.02;
          particle.width *= 0.98;
          particle.height *= 0.98;
          if (particle.y > this.height || particle.alpha <= 0) {
            if (!this.raining && Math.random() < 0.5) {
              this.particleList.splice(a, 1);
              if (this.particleList.length == 0) {
                this.enabled = false
              }
            } else {
              this.initParticle(particle)
            }
          }
        }
      }
    }
  };
  e.RainEffect = c
})(window);