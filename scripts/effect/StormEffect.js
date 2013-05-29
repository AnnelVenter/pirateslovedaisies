(function(e) {
  function c(a, b) {
    this.StormEffect(a, b)
  }
  c.prototype = {
    StormEffect: function(a) {
      this.setEnabled(a);
      this.starting = true;
      this.ending = false
    },
    toString: function() {
      return "[StormEffect]"
    },
    setEnabled: function() {
      this.enabled = true
    },
    start: function() {
      this.starting = true;
      this.ending = false;
      this.enabled = true;
      this.count = 0;
      this.fresh = true;
      this.lightningCount = 70
    },
    stop: function() {
      this.count = 0;
      this.ending = true;
      this.starting = false
    },
    update: function(a, b, d) {
      this.count++;
      if (!this.ending && --this.lightningCount == 0) {
        if (this.fresh) {
          Math.random() < 0.4 ? AudioManager.playSoundDelayed(AudioManager.THUNDER2, 30) : AudioManager.playSoundDelayed(AudioManager.THUNDER1, 30)
        }
        this.fresh = false;
        this.lightningLength = Math.random() * 8 + 4 | 0;
        this.lightningCount = -Math.random() * 0.5 * this.lightningLength | 0
      }
      var g = this.lightningCount > 0 ? 0 : (this.lightningCount + this.lightningLength) / this.lightningLength,
        m = 0.4;
      if (this.starting) {
        m = Math.min(this.count / 120, 1) * (1 - g) * 0.4;
        if (m == 1) {
          this.starting = false
        }
      } else {
        if (this.ending) {
          m = (1 - Math.max(this.count / 30, 0)) * (1 - g) * 0.4;
          if (m == 0) {
            this.greyAlpha = 0;
            this.enabled = false
          }
        }
      }
      a.fillStyle = "rgba(25, 30, 40, " + m + ")";
      a.fillRect(0, 0, b, d);
      if (g > 0) {
        a.fillStyle = "rgba(255, 255, 255, " + g + ")";
        a.fillRect(0, 0, b, d);
        if (Math.random() < 0.15) {
          this.lightningCount = 1
        }
      } else {
        if (this.lightningCount < 0) {
          this.lightningCount = Math.random() * 250 + 20 | 0;
          this.fresh = true
        }
      }
    }
  };
  e.StormEffect = c
})(window);