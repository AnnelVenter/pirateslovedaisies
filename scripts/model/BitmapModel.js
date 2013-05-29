(function(e) {
  function c() {}
  EventDispatcher.create(c);
  if (c.bitmapHash == null) {
    c.bitmapHash = {}
  }
  c.pool = {};
  c.saveBitmap = function(a) {
    if (a != null) {
      a.shadow = null;
      a.scaleX = a.scaleY = 1;
      a.x = a.y = 0;
      a.alpha = 1;
      a.visible = true;
      var b = a.name,
        d = c.pool[b];
      if (d == null) {
        c.pool[b] = [a]
      } else {
        d.push(a)
      }
    }
  };
  c.getBitmap = function(a) {
    var b = c.pool[a];
    if (b != null && b.length > 0) {
      a = b.pop()
    } else {
      b = c.bitmapHash[a];
      if (b == null) {
        throw Error("Bitmap " + a + " not found.");
      }
      a = b.clone();
      a.flipRegX = b.flipRegX;
      a.data = b.data;
      a.label = b.label;
      a.usesSpriteFlip = b.usesSpriteFlip;
      a.frameData = b.frameData
    }
    return a
  };
  c.load = function(a) {
    var b = new ServerRequest;
    b.addEventListener("complete", c.handleDataLoad);
    b.addEventListener("error", c.handleDataError);
    b.load(a)
  };
  c.getScoreValue = function(a, b) {
    var d = c.bitmapHash[a];
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
    var b = [],
      d = a.images.length;
    c.numLoaded = 0;
    c.imageHash = {};
    for (var g = 0; g < d; g++) {
      var m = a.images[g];
      c.bitmapHash[m.name] = m;
      b.push({
        name: m.name,
        src: a.basePath + m.src
      })
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
    c.imageHash[a.name] = a;
    c.numLoaded++;
    c.dispatchEvent("progress")
  };
  c.handleImagesComplete = function() {
    ImageLoadManager.removeEventListener("complete", c.handleImageLoad);
    ImageLoadManager.removeEventListener("loadComplete", c.handleImagesComplete);
    c.dispatchEvent("loadComplete")
  };
  c.createBitmap = function(a) {
    var b = c.imageHash[a];
    a = c.bitmapHash[a];
    var d = a.states,
      g = {}, m = null;
    for (var q in d) {
      g[q] = [d[q].start, d[q].end, a.loopAnimations == false ? false : q];
      if (d[q].flipState) {
        if (m == null) {
          m = {}
        }
        m[d[q].flipState] = [q, true, false, d[q].flipState]
      }
    }
    if (m) {
      b = SpriteSheetUtils.flip(b, a.w, a.h, g, m);
      g = b.frameData;
      b = b.image
    }
    if (a.type == "animation") {
      b.name = a.name;
      b = new SpriteSheet(b, a.w, a.h, g);
      b = new BitmapSequence(b);
      if (m) {
        b.usesSpriteFlip = true
      }
    } else {
      b = new Bitmap(b)
    }
    b.name = a.name;
    b.label = a.label;
    b.data = a.data || {};
    if (a.registrationPoint) {
      b.regX = a.registrationPoint[0];
      b.regY = a.registrationPoint[1]
    } else {
      b.regX = a.w / 2 + 0.5 | 0;
      b.regY = a.h / 2 + 0.5 | 0
    }
    c.bitmapHash[a.name] = b
  };
  c.createBitmaps = function() {
    for (var a in c.imageHash) {
      c.createBitmap(a)
    }
  };
  e.BitmapModel = c
})(window);
