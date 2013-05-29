(function(e) {
  function c(a, b, d, g, m) {
    this.Tween(a, b, d, g, m)
  }
  c.prototype = {
    Tween: function(a, b, d, g, m) {
      this.init(a, b, d, g, m)
    },
    init: function(a, b, d, g, m) {
      this.target = a;
      this.callback = m;
      this.duration = d * 1E3 * Tick.frameRate >> 0;
      this.pauseable = g;
      this.time = Tick.getTicks(g);
      this.end = {};
      this.start = {};
      for (var q in b) {
        if (!(a[q] == null || isNaN(a[q]))) {
          this.start[q] = a[q];
          this.end[q] = b[q]
        }
      }
      Tick.addListener(this, g)
    },
    tick: function() {
      var a = (Tick.ticks - this.time) / this.duration,
        b = false;
      if (a >= 1) {
        a = 1;
        b = true
      }
      if (this.tweenFunction != null) {
        a = this.tweenFunction(a)
      }
      for (var d in this.end) {
        if (this.target) {
          if (this.target.hasOwnProperty(d)) {
            this.target[d] = (this.end[d] - this.start[d]) * a + this.start[d]
          }
        }
      }
      if (b) {
        Tick.removeListener(this);
        this.callback.handleEvent(this)
      }
    },
    stop: function() {
      Tick.removeListener(this);
      this.tweenFunction = this.callback = null
    }
  };
  e.Tween = c
})(window);