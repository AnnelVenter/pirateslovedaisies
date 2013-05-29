(function(e) {
  function c(a) {
    this.EventDispatcher(a)
  }
  c.create = function(a) {
    new c(a)
  };
  c.prototype = {
    EventDispatcher: function(a) {
      a.addEventListener = this.addEventListener;
      a.removeEventListener = this.removeEventListener;
      a.dispatchEvent = this.dispatchEvent;
      a.hasEventListener = this.hasEventListener;
      a.removeAllListeners = this.removeAllListeners;
      a._indexOfListener = this._indexOfListener
    },
    addEventListener: function(a, b) {
      if (this.eventHash == null) {
        this.eventHash = {}
      }
      if (this.eventHash[a] == null) {
        this.eventHash[a] = []
      }
      this._indexOfListener(a, b) == -1 && this.eventHash[a].push(b)
    },
    removeEventListener: function(a, b) {
      var d = this._indexOfListener(a, b);
      d != -1 && this.eventHash[a].splice(d, 1)
    },
    removeAllListeners: function(a) {
      if (a == null) {
        this.eventHash = {}
      } else {
        delete this.eventHash[a]
      }
    },
    hasEventListener: function(a, b) {
      return this._indexOfListener(a, b) != -1
    },
    dispatchEvent: function(a, b) {
      if (this.eventHash != null) {
        var d = this.eventHash[a];
        if (!(d == null || d.length == 0)) {
          if (b == null) {
            b = {}
          }
          b.target = this;
          b.type = a;
          var g = {};
          b.preventDefault = function() {
            g.preventDefault = true
          };
          for (var m = 0, q = d.length; m < q; m++) {
            var s = d[m];
            if (s instanceof Function) {
              s(b)
            } else {
              s && s.handleEvent(b)
            }
          }
          return g.preventDefault == true
        }
      }
    },
    _indexOfListener: function(a, b) {
      var d = this.eventHash[a];
      if (d == null) {
        return -1
      }
      for (var g = d.length, m = 0; m < g; m++) {
        if (d[m] == b) {
          return m
        }
      }
      return -1
    }
  };
  e.EventDispatcher = c
})(window);
