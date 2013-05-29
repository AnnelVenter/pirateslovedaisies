(function(e) {
  function c() {
    this.IndexHash()
  }

  function a(b) {
    this.Delegate(b)
  }
  c.prototype = {
    IndexHash: function() {},
    addItem: function(b, d) {
      if (this[b] == null) {
        this[b] = [d]
      } else {
        this[b].indexOf(d) == -1 && this[b].push(d)
      }
    },
    moveItem: function() {},
    removeContainer: function(b) {
      var d = this[b];
      delete this[b];
      return d
    },
    removeRandom: function(b) {
      if (this[b] == null) {
        return null
      }
      if (this[b].length > 0) {
        return this[b].removeRandom()
      }
    },
    removeItem: function(b) {
      for (var d in this) {
        if (this.hasOwnProperty(d)) {
          var g = this[d].indexOf(b);
          if (g > -1) {
            this.removeItemFrom(b, d, g);
            return g
          }
        }
      }
      return -1
    },
    removeItemFrom: function(b, d, g) {
      if (this[d] != null) {
        if (g == null) {
          g = this[d].indexOf(b);
          if (g == -1) {
            return -1
          }
        }
        this[d].splice(g, 1)
      }
    },
    copy: function(b) {
      if (this[b] == null) {
        return null
      }
      return this[b].slice(0)
    },
    cleanUp: function() {
      for (var b in this) {
        this.hasOwnProperty(b) && this[b].length == 0 && delete this[b]
      }
    },
    toString: function() {
      var b = "[IndexHash]";
      for (var d in this) {
        if (this.hasOwnProperty(d)) {
          b += "\n [" + d + " (" + this[d] + ")]"
        }
      }
      return b
    }
  };
  e.IndexHash = c;
  a.create = function(b, d) {
    var g = function() {
      return arguments.callee.func.apply(arguments.callee.target, arguments)
    };
    g.target = b;
    g.func = d;
    return g
  };
  a.prototype = {
    Delegate: function(b) {
      this.func = b
    },
    createDelegate: function(b) {
      return a.create(b, func)
    }
  };
  e.Delegate = a
})(window);
