(function(e) {
  function c() {}
  if (c.assetHash == null) {
    c.assetHash = {}
  }
  c.getAsset = function(a) {
    return c.assetHash[a]
  };
  c.addAsset = function(a, b) {
    c.assetHash[a] = b
  };
  e.LoadedAssets = c
})(window);



(function(e) {
  e.Asset = function(c, a, b) {
    this.id = c;
    this.type = a;
    this.url = b
  }
})(window);



(function(e) {
  e.SoundAsset = function(c, a, b, d) {
    this.id = c;
    this.url = a;
    this.numChannels = b;
    this.loadPriority = d
  }
})(window);



(function(e) {
  function c() {
    this.AssetLoader()
  }
  c.IMAGE_TYPE = 0;
  c.AUDIO_TYPE = 1;
  c.JSON_TYPE = 2;
  c.HTML_TYPE = 3;
  c.JS_TYPE = 4;
  c.AUDIO_TIMEOUT = 8E3;
  c.prototype = {AssetLoader:function() {
    EventDispatcher.create(this);
    this.assetHash = {};
    this.queue = [];
    this.cachedAssets = {};
    this.numTotal = this.numLoaded = 0;
    this.currAsset = null;
    this.timeoutId = 0
  }, load:function(a) {
    this.numLoaded = 0;
    this.numTotal = a.length;
    this.queue = a;
    this.additionalChannels = [];
    for(var b = [], d = this.numTotal - 1;d >= 0;d--) {
      if(a[d].type == c.JSON_TYPE || a[d].type == c.HTML_TYPE || a[d].type == c.AUDIO_TYPE || a[d].type == c.JS_TYPE) {
        b.push(a.splice(d, 1)[0])
      }
    }
    this.loadBatch();
    this.queue = b;
    this.loadNext()
  }, loadBatch:function() {
    for(var a = this.queue.length, b = 0;b < a;b++) {
      this.loadNext()
    }
  }, loadNext:function() {
    if(this.queue.length) {
      var a = this.queue.shift();
      this.currAsset = a;
      switch(a.type) {
        case c.IMAGE_TYPE:
          var b = new Image;
          b.onload = $.proxy(this, "handleImageComplete");
          b.onerror = $.proxy(this, "handleImageError");
          b.id = a.id;
          b.src = a.url;
          this.cachedAssets[a.id] = b;
          break;
        case c.AUDIO_TYPE:
          if(a.id.split("_")[1] == "1") {
            this.addAudioChannel(a.url, a.id)
          }else {
            this.numTotal--;
            this.additionalChannels.push(a);
            this.loadNext()
          }
          break;
        case c.JSON_TYPE:
          b = new ServerRequest;
          b.addEventListener("complete", $.proxy(this, "handleJSONComplete"));
          b.load(a.url);
          break;
        case c.HTML_TYPE:
          $.ajax({url:a.url, success:$.proxy(this, "handleHTMLComplete")});
          break;
        case c.JS_TYPE:
          $.ajax({url:a.url, dataType:"script", success:$.proxy(this, "handleJSComplete")});
          break
      }
    }
  }, addAudioChannel:function(a, b, d) {
    var g = document.createElement("audio");
    if(d != true) {
      this.currAsset = g;
      this.timeoutId = setTimeout($.proxy(this, "handleAudioTimeout"), c.AUDIO_TIMEOUT);
      g.addEventListener("canplaythrough", $.proxy(this, "handleAudioComplete"), false);
      g.addEventListener("error", $.proxy(this, "handleAudioError"), false)
    }
    g.setAttribute("id", b);
    g.setAttribute("preload", "auto");
    $("<source>").attr("src", a).appendTo(g);
    $("<source>").attr("src", a.split(".mp3")[0] + ".ogg").appendTo(g);
    document.body.appendChild(g)
  }, handleAudioComplete:function(a) {
    if(LoadedAssets.getAsset(a.target.id) != true) {
      LoadedAssets.addAsset(a.target.id, true);
      clearTimeout(this.timeoutId);
      this.calculatePercentLoaded(true)
    }
  }, handleAudioError:function(a) {
    trace("Error Loading Audio:", a.target.id);
    LoadedAssets.addAsset(a.target.id, true);
    clearTimeout(this.timeoutId);
    this.calculatePercentLoaded(true)
  }, handleAudioTimeout:function() {
    trace("Audio Timed Out:", this.currAsset.id);
    LoadedAssets.addAsset(this.currAsset.id, true);
    this.calculatePercentLoaded(true)
  }, handleJSONComplete:function(a) {
    LoadedAssets.addAsset(this.currAsset.id, a.data);
    this.calculatePercentLoaded(true)
  }, handleHTMLComplete:function(a) {
    LoadedAssets.addAsset(this.currAsset.id, a);
    this.calculatePercentLoaded(true)
  }, handleJSComplete:function(a) {
    LoadedAssets.addAsset(this.currAsset.id, a);
    this.calculatePercentLoaded(true)
  }, handleImageComplete:function(a) {
    LoadedAssets.addAsset(a.target.id, true);
    this.calculatePercentLoaded()
  }, handleImageError:function(a) {
    trace("Error Loading Image:", a.target.id);
    this.calculatePercentLoaded()
  }, calculatePercentLoaded:function(a) {
    this.numLoaded++;
    var b = Math.min(100, Math.round(this.numLoaded / this.numTotal * 100));
    this.dispatchEvent("progress", {percent:b});
    if(b == 100) {
      for(;this.additionalChannels.length;) {
        a = this.additionalChannels.pop();
        this.addAudioChannel(a.url, a.id, true)
      }
      this.dispatchEvent("complete")
    }else {
      a == true && this.loadNext()
    }
  }};
  e.AssetLoader = c
})(window);