(function(e) {
  function c() {}
  EventDispatcher.create(c);
  if (c.spriteHash == null) {
    c.spriteHash = {}
  }
  c.pool = {};
  c.saveSprite = function(a) {
    if (a != null) {
      a.reset();
      var b = a.name,
        d = c.pool[b];
      if (d == null) {
        c.pool[b] = [a]
      } else {
        d.push(a)
      }
    }
  };
  c.getSprite = function(a) {
    var b = c.pool[a];
    if (b != null && b.length > 0) {
      b = b.pop()
    } else {
      b = c.spriteHash[a];
      if (b == null) {
        throw Error("Sprite " + a + " not found.");
      }
      b = b.clone()
    }
    return b
  };
  c.load = function(a) {
    var b = new ServerRequest;
    b.addEventListener("complete", c.handleDataLoad);
    b.addEventListener("error", c.handleDataError);
    b.load(a)
  };
  c.getScoreValue = function(a, b) {
    var d = c.spriteHash[a];
    if (d == null || d.data == null) {
      return 0
    }
    if (b == null) {
      b = 0
    }
    return d.data.scoreValue * (1 + b * 0.02)
  };
  c.handleDataLoad = function(a) {
    a = a.data;
    for (var b = [], d = a.images.length, g = c.numLoaded = 0; g < d; g++) {
      var m = a.images[g],
        q = null;
      switch (m.type) {
        case "animation":
          q = new AnimationSprite;
          q.setStates(m.states);
          q.width = m.w;
          q.height = m.h;
          break;
        default:
          q = new OldSprite
      }
      c.spriteHash[m.name] = q;
      q.src = a.basePath + m.src;
      q.name = m.name;
      q.label = m.label;
      q.data = m.data || {};
      if (m.registrationPoint != null) {
        q.registrationPoint = new Point(m.registrationPoint[0], m.registrationPoint[1])
      }
      b.push(q)
    }
    c.numTotal = d;
    ImageLoadManager.addEventListener("complete", c.handleImageLoad);
    ImageLoadManager.addEventListener("loadComplete", c.handleImagesComplete);
    ImageLoadManager.loadList(b)
  };
  c.handleDataError = function() {
    c.dispatchEvent("error")
  };
  c.handleImageLoad = function(a) {
    a = a.image;
    var b = c.spriteHash[a.name];
    c.numLoaded++;
    c.dispatchEvent("progress");
    if (b) {
      b.image = a;
      if (!(b instanceof AnimationSprite)) {
        b.width = a.width;
        b.height = a.height
      }
      if (b.registrationPoint == null) {
        b.registrationPoint = new Point(b.width * 0.5, b.height * 0.5)
      }
    }
  };
  c.handleImagesComplete = function() {
    c.dispatchEvent("loadComplete")
  };
  e.SpriteModel = c
})(window);
