(function(e) {
  function c() {}
  c.getMapPlayed = function(a, b) {
    return c.getData(a, b).played
  };
  c.setMapPlayed = function(a, b) {
    data = c.getData(a, b);
    data.played = true;
    c.ls.setItem(b + a, JSON.stringify(data))
  };
  c.getMapComplete = function(a, b) {
    return c.getData(a, b).complete
  };
  c.setMapComplete = function(a, b) {
    var d = c.getData(a, b);
    d.complete = true;
    c.ls.setItem(b + a, JSON.stringify(d))
  };
  c.getScore = function(a, b) {
    var d = c.getData(a, b);
    return Number(d.score)
  };
  c.setScore = function(a, b, d) {
    var g = c.getData(a, b);
    if (g.score > d || d == 0) {
      return false
    } else {
      g.score = d;
      c.ls.setItem(b + a, JSON.stringify(g));
      return true
    }
  };
  c.clear = function() {
    c.ls.clear()
  };
  c.getData = function(a, b) {
    if (b == null) {
      b = GameInfo.NORMAL_MODE
    }
    var d = JSON.parse(localStorage.getItem(b + a));
    if (d == null) {
      d = {
        played: false,
        completed: false,
        score: 0
      }
    }
    return d
  };
  if (c.ls == null) {
    c.ls = e.localStorage
  }
  e.LocalStorage = c
})(window);