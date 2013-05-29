

if (!window.Microsoft) {
  window.Microsoft = {
    __namespace: true
  }
}
if (!window.Microsoft.Live) {
  window.Microsoft.Live = {
    __namespace: true
  }
}
if (!window.Microsoft.Live.Core) {
  window.Microsoft.Live.Core = {
    __namespace: true
  }
}
Microsoft.Live.Core.Loader = function() {
  this._detectBrowsers();
  this._detectFlash();
  this._detectSecureConnection();
  this._addDocumentReadyListener();
  this._resolveMarket();
  this._resolveDirection();
  this._runtimeCheck()
};
Microsoft.Live.Core.Loader.prototype = {
  _loadInitiated: false,
  _skippedScanner: false,
  _paused: false,
  _processing: false,
  _processScheduled: false,
  _loadRequests: [],
  _readyRequests: [],
  _errorRequests: [],
  _domRequests: [],
  _onLoad: null,
  _documentReady: false,
  _browser: {},
  _iframeResources: [],
  _settingRegEx: /(\{[^\}^\{]+\})/g,
  _startTime: (new Date).getTime(),
  _loadTime: null,
  _validRuntime: true,
  _resources: {
    Empty1: {
      filename: "{messenger.baseScriptUrl}/Empty.js?1",
      type: "script",
      browsers: function(e, c) {
        return e.ie && c.httpsApplication
      },
      dependencies: []
    },
    Empty2: {
      filename: "{messenger.baseScriptUrl}/Empty.js?2",
      type: "script",
      browsers: function(e, c) {
        return e.ie && c.httpsApplication
      },
      dependencies: []
    }
  },
  _settings: {
    environment: "production",
    direction: "ltr",
    configuration: "release",
    market: "en-us",
    resourceMarket: "en",
    customSettings: "",
    httpsApplication: false,
    httpsScope: "content",
    compatibility: {
      microsoftAjaxPropertyNames: true,
      version: "current"
    }
  },
  _supportedMarkets: ["ar", "ar-ploc-sa", "bg", "cs", "da", "de", "el", "en", "es", "et", "fi", "fr", "he", "hr", "hu", "it", "ja", "ja-ploc-jp", "ko", "lt", "lv", "nb-no", "nl", "pl", "pt-br", "pt-pt", "ro", "ru", "sk", "sl", "sr",
      "sv", "th", "tr", "uk", "zh-cn", "zh-hk", "zh-tw"
  ],
  addScript: function(e, c, a) {
    this._addFeature(e, "script", c, a)
  },
  addStyleSheet: function(e, c, a) {
    this._addFeature(e, "stylesheet", c, a)
  },
  isFlashInstalled: function(e) {
    return e <= this._browser.flashVersion
  },
  get_settings: function() {
    return this._settings
  },
  get_onLoad: function() {
    return this._onLoad
  },
  get_onLoadRegistered: function() {
    return this._onLoad != null
  },
  get_documentReady: function() {
    return this._documentReady
  },
  get_scriptsLoadTime: function() {
    return this._loadTime
  },
  getIframeContainer: function(e) {
    if ((e = this._resources[e]) && e.containerId) {
      for (var c = this._iframeResources.length - 1; c >= 0; c--) {
        if (this._iframeResources[c].containerId == e.containerId) {
          return this._iframeResources[c].frameContainer
        }
      }
    }
    return null
  },
  initialize: function(e) {
    if (e && this._validRuntime) {
      this._serializeSettings(e);
      if (e.environment && e.environment != "production") {
        for (var c in this._settings) {
          var a = this._settings[c];
          if (a) {
            var b = a[e.environment];
            if (b) {
              for (var d in b) {
                a[d] = b[d]
              }
            }
          }
        }
      }
      for (var g in e) {
        b = g.split(".");
        a = b.pop();
        b = this._getSubSetting(b);
        if (!b || typeof b[a] == "undefined") {
          throw Error("Invalid setting: " + g);
        }
        switch (g) {
          case "market":
            this._tryUpdateMarket(e[g]);
            break;
          case "direction":
            this._tryUpdateDirection(e[g]);
            break;
          default:
            b[a] = e[g]
        }
      }
      for (c in this._settings) {
        this._settings[c].updateSettings && this._settings[c].updateSettings(this._settings, this._resources)
      }
    }
  },
  load: function(e, c) {
    if (this._validRuntime) {
      if (typeof e == "string") {
        e = [e]
      }
      if (!e || e.length <= 0) {
        throw Error("No features provided");
      }
      for (var a = [], b = 0; b < e.length; b++) {
        if (e[b].indexOf("_") >= 0) {
          throw Error("Feature '%1' does not exist".replace("%1", e[b]));
        }
        var d = this._normalizeName(e[b]);
        if (!this._resources[d]) {
          throw Error("Feature '%1' does not exist".replace("%1", d));
        }
        if (this._resources[d].httpOnly && this._settings.httpsApplication) {
          throw Error("Feature '%1' is not supported in an HTTPS environment".replace("%1", d));
        }
        a.push(d)
      }
      this._loadInitiated = true;
      this._loadRequests.push({
        resources: a,
        callback: c
      });
      this._process()
    }
  },
  onReady: function(e) {
    if (!e) {
      throw Error("No callback provided");
    }
    this._loadInitiated && this._loadRequests.length == 0 ? this._invokeCallback(e) : this._readyRequests.push({
      callback: e
    })
  },
  onError: function(e) {
    if (!e) {
      throw Error("No callback provided");
    }
    this._errorRequests.push({
      callback: e
    })
  },
  onLoad: function(e) {
    if (!e) {
      throw Error("No callback provided");
    }
    this._onLoad = e;
    this._skippedScanner && this.fireOnLoad()
  },
  fireOnLoad: function() {
    this._onLoad && this._onLoad()
  },
  onDocumentReady: function(e) {
    if (!e) {
      throw Error("No callback provided");
    }
    this._documentReady ? this._invokeCallback(e) : this._domRequests.push({
      callback: e
    })
  },
  pause: function() {
    this._paused = true
  },
  resume: function() {
    this._paused = false;
    this._process()
  },
  onResourceAvailable: function(e, c) {
    var a = this._resources[e];
    if (a) {
      a.readyState = "available";
      a.onAvailableCallback = c || null
    }
  },
  _getResourceName: function(e) {
    for (var c in this._resources) {
      if (this._resources[c] === e) {
        return c.replace(/_/g, ".")
      }
    }
    return null
  },
  _addFeature: function(e, c, a, b) {
    if (!e || e.length == 0) {
      throw Error("featureName must not be empty");
    }
    if (e.indexOf("_") >= 0) {
      throw Error("featureName cannot contain '_'");
    }
    if (!a || a.length == 0) {
      throw Error("fileName must not be empty");
    }
    e = this._normalizeName(e);
    if (this._resources[e]) {
      throw Error("Feature already exists");
    }
    var d = [];
    if (b) {
      if (!this._isArray(b)) {
        throw Error("dependencies must be an array of strings");
      }
      for (var g = 0; g < b.length; g++) {
        d.push(this._normalizeName(b[g]))
      }
    }
    this._resources[e] = {
      url: a,
      type: c,
      dependencies: d
    }
  },
  _addManifest: function(e, c, a) {
    if (this._validRuntime) {
      if (c) {
        var b = ["Empty1", "Empty2"];
        for (var d in c) {
          if (this._resources[d]) {
            throw Error("Resource '%1' already exists".replace("%1", d));
          }
          var g = c[d],
            m = g.dependencies;
          m.push.apply(m, b);
          this._resources[d] = g
        }
      }
      if (a) {
        this._settings[e] = a;
        a.updateSettings && a.updateSettings(this._settings, this._resources, null)
      }
    }
  },
  _normalizeName: function(e) {
    return e.toLowerCase().replace(/\./g, "_")
  },
  _process: function() {
    if (!this._paused) {
      if (this._processing) {
        this._processScheduled = true
      } else {
        this._processing = true;
        for (var e = 0; e < this._loadRequests.length; e++) {
          for (var c = this._loadRequests[e], a = {
              async: 0,
              sync: 0
            }, b = 0; b < c.resources.length; b++) {
            this._loadResources(this._resources[c.resources[b]], a)
          }
          a = a.async + a.sync;
          if (a == 0 && !this._loadTime) {
            this._loadTime = (new Date).getTime() - this._startTime
          }
          if (a == 0 && this._documentReady) {
            c.callback && this._invokeCallback(c.callback);
            this._loadRequests.splice(e--, 1)
          }
        }
        if (this._loadRequests.length == 0) {
          for (; this._readyRequests.length > 0;) {
            this._invokeCallback(this._readyRequests.shift().callback)
          }
        }
        this._processing = false;
        if (this._processScheduled) {
          this._processScheduled = false;
          this._process()
        }
      }
    }
  },
  _loadResources: function(e, c) {
    switch (e.readyState) {
      case "loaded":
        break;
      case "loading":
        if (e.async) {
          c.async++
        } else {
          c.sync++
        }
        break;
      case "available":
        this._loadResourceDependencies(e, c);
        if (c.async == 0 && c.sync == 0) {
          if (e.onAvailableCallback && !e.onAvailableCallbackCalled) {
            e.onAvailableCallbackCalled = true;
            e.onAvailableCallback.call()
          }
          e.readyState = "loaded"
        } else {
          c.async++
        }
        break;
      default:
        this._loadResourceDependencies(e, c);
        if (e.async) {
          if (c.sync == 0) {
            this._loadResource(e);
            c.async++
          }
        } else {
          if (c.async == 0 && c.sync == 0) {
            this._loadResource(e);
            c.sync++
          }
        }
    }
  },
  _loadResourceDependencies: function(e, c) {
    for (var a = 0; a < e.dependencies.length; a++) {
      var b = {
        async: 0,
        sync: 0
      };
      this._loadResources(this._resources[e.dependencies[a]], b);
      c.async += b.async;
      c.sync += b.sync
    }
  },
  _loadResource: function(e) {
    e.readyState = "loading";
    if (!e.filename && !e.url) {
      this._onResourceLoaded(e)
    } else {
      if (this._browserRequires(e)) {
        switch (e.type) {
          case "script":
            this._loadScript(e);
            break;
          case "stylesheet":
            this._loadStyleSheet(e);
            break;
          case "channeliframe":
            ;
          case "storageiframe":
            this._loadIFrame(e)
        }
      } else {
        this._onResourceLoaded(e)
      }
    }
  },
  _shouldUseHttps: function(e) {
    if (this._settings.httpsApplication) {
      if (this._settings.httpsScope == "all") {
        return true
      }
      if (this._settings.httpsScope == "content") {
        switch (e) {
          case "content":
            ;
          case "script":
            ;
          case "stylesheet":
            return true
        }
      }
      if (e == "storageiframe") {
        if (this._shouldProxyLocalStorage()) {
          return true
        }
      }
    }
    return false
  },
  _shouldProxyLocalStorage: function() {
    var e = !! (window.localStorage || window.globalStorage || window.sessionStorage);
    return !!(this._settings.httpsApplication && window.postMessage && e && !this._browser.ie)
  },
  _browserRequires: function(e) {
    if (e.browsers) {
      return e.browsers(this._browser, this._settings)
    }
    return true
  },
  _loadScript: function(e) {
    if (!this._checkResourceLoaded(e)) {
      var c = this._createScriptElement();
      this._browser.ie ? this._attachScriptEventsIE(c, this, e) : this._attachScriptEvents(c, this, e);
      e.async && this._setElementAttribute(c, "async", "async");
      this._setScriptElementAttributes(c, e);
      this._appendScriptElement(c, e)
    }
  },
  _checkResourceLoaded: function(e) {
    if (e.isLoaded) {
      this._onResourceLoaded(e);
      return true
    }
    return false
  },
  _createScriptElement: function() {
    return document.createElement("SCRIPT")
  },
  _attachScriptEvents: function(e, c, a) {
    e.readyState = "complete";
    e.addEventListener("load", function(b) {
      c._onScriptLoad(b, a)
    }, false);
    e.addEventListener("error", function(b) {
      c._onScriptLoad(b, a)
    }, false)
  },
  _attachScriptEventsIE: function(e, c, a) {
    e.attachEvent("onreadystatechange", function(b) {
      c._onScriptLoad(b, a)
    })
  },
  _setElementAttribute: function(e, c, a) {
    e.setAttribute(c, a)
  },
  _setScriptElementAttributes: function(e, c) {
    e.type = "text/javascript";
    e.src = this._getResourceUrl(c)
  },
  _appendScriptElement: function(e) {
    document.getElementsByTagName("HEAD")[0].appendChild(e)
  },
  _canPreloadIframe: function(e) {
    switch (e.type) {
      case "channeliframe":
        ;
      case "storageiframe":
        if (window.postMessage) {
          return true
        }
        if (this.isFlashInstalled(8) && !this._settings.channel.flashDisabled) {
          return true
        }
        e = document.domain.toLowerCase();
        if (e == "live.com" || e == "live-int.com") {
          return true
        }
        return false;
      default:
        return true
    }
  },
  _loadIFrame: function(e) {
    if (!(!e.containerId || !e.filename || !this._canPreloadIframe(e))) {
      var c = this._getResourceUrl(e),
        a = document.getElementById(e.containerId);
      if (!a) {
        a = document.createElement("div");
        a.id = e.containerId;
        a.style.height = "1pt";
        a.style.width = "1pt";
        a.style.position = "absolute";
        a.style.top = "-100px";
        a = a
      }
      var b = document.createElement("iframe");
      b.frameBorder = "0";
      b.style.width = "100%";
      b.style.height = "100%";
      b.src = c;
      b.id = e.frameId;
      a.appendChild(b);
      e.frameContainer = a;
      this._iframeResources.push(e);
      this._appendIFrameResources()
    }
    this._onResourceLoaded(e)
  },
  _loadStyleSheet: function(e) {
    var c = document.createElement("LINK");
    c.type = "text/css";
    c.rel = "stylesheet";
    c.media = "screen";
    c.href = this._getResourceUrl(e);
    this._appendChild(document.getElementsByTagName("HEAD")[0], c);
    this._onResourceLoaded(e)
  },
  _lookupSettings: function(e, c, a) {
    var b = e.substring(1, e.length - 1).split(".");
    if (b[0] == "resource") {
      return e
    }
    e = b.pop();
    if (b = this._getSubSetting(b)) {
      var d = b[e];
      if (this._isArray(d)) {
        return this._hashSelect(d, c)
      }
      if (typeof d === "function") {
        return d.call(this, a)
      }
      if (d || typeof d == "boolean" || typeof d == "number") {
        return b[e]
      }
    }
    return ""
  },
  _isArray: function(e) {
    return e && Object.prototype.toString.apply(e) === "[object Array]"
  },
  _hashSelect: function(e, c) {
    var a = c.lastIndexOf("/");
    if (a < 0) {
      a = 0
    } else {
      a++
    }
    a = this._computeFastHash(c.substring(a));
    return e[a % e.length]
  },
  _computeFastHash: function(e) {
    if (!e || !e.length) {
      return 0
    }
    for (var c = 5381, a = 0, b = e.length; a < b; a++) {
      c = (c << 5) + c + e.charCodeAt(a)
    }
    if (c < 0) {
      c *= -1
    }
    return c
  },
  _getSubSetting: function(e) {
    var c = this._settings;
    if (!e.length) {
      return c
    }
    for (var a = 0; a < e.length; a++) {
      c = c[e[a]];
      if (!c) {
        return null
      }
    }
    return c
  },
  _getSecureUrl: function(e) {
    if (e.indexOf("http:") == 0) {
      return e.replace("http:", "https:")
    }
    return e
  },
  _getResourceUrl: function(e) {
    var c;
    c = e.url ? e.url : this._getUrlFromSettings(e.filename, e);
    if (this._shouldUseHttps(e.type)) {
      c = this._getSecureUrl(c)
    }
    return c
  },
  _getUrl: function(e, c) {
    var a = this._getUrlFromSettings(e, null);
    if (this._shouldUseHttps(c)) {
      a = this._getSecureUrl(a)
    }
    return a
  },
  _getUrlFromSettings: function(e, c) {
    var a = e,
      b = this;
    a = a.replace(this._settingRegEx, function(d) {
      return b._lookupSettings(d, e, c)
    });
    a = a.replace(this._settingRegEx, function(d) {
      return b._lookupSettings(d, e, c)
    });
    return a = a.replace(/\/\//g, "/").replace(/:\//g, "://")
  },
  _onScriptLoad: function(e, c) {
    if (c.readyState != "loaded") {
      var a = e.srcElement || e.currentTarget;
      if (!a.readyState) {
        a = e.currentTarget
      }
      if (!(a.readyState != "complete" && a.readyState != "loaded")) {
        if (e.type == "error" || c.async && c.readyState != "available") {
          if (this._retryLoadResource(c)) {
            e.stopPropagation && e.stopPropagation()
          } else {
            this._onResourceFailed(c)
          }
        } else {
          c.async ? this._onResourceAvailable(c) : this._onResourceLoaded(c)
        }
      }
    }
  },
  _onResourceLoaded: function(e) {
    e.readyState = "loaded";
    this._process()
  },
  _onResourceAvailable: function() {
    this._process()
  },
  _retryLoadResource: function(e) {
    if (e.loadFailCount === undefined) {
      e.loadFailCount = 0
    }
    e.loadFailCount++;
    if (e.loadFailCount < 3) {
      this._loadResource(e);
      return true
    } else {
      return false
    }
  },
  _onResourceFailed: function(e) {
    var c = this._getResourceName(e);
    for (e = 0; e < this._errorRequests.length; e++) {
      var a = this._errorRequests[e].callback;
      this._invokeCallback(function() {
        a(c)
      })
    }
  },
  _normalizeMarket: function(e) {
    e = e || "";
    e = e.toLowerCase();
    if (this._getResourceMarket(e)) {
      return e
    }
    return null
  },
  _getResourceMarket: function(e, c) {
    c = c || this._supportedMarkets;
    if (this._supportsMarket(e, c)) {
      return e
    }
    var a = e.lastIndexOf("-");
    if (a < 0) {
      return null
    }
    e = e.substr(0, a);
    if (this._supportsMarket(e, c)) {
      return e
    }
    return null
  },
  _supportsMarket: function(e, c) {
    for (var a = 0, b = c.length - 1; a <= b;) {
      var d = Math.floor((a + b) / 2),
        g = c[d];
      if (g < e) {
        a = d + 1
      } else {
        if (g > e) {
          b = d - 1
        } else {
          return true
        }
      }
    }
    return false
  },
  _resolveDirection: function() {
    var e = null,
      c = document.getElementsByTagName("html");
    if (c && c.length > 0) {
      e = c[0].getAttribute("dir")
    }
    e && this.initialize({
      direction: e
    })
  },
  _tryUpdateDirection: function(e) {
    e = e || "";
    e = e.toLowerCase();
    switch (e) {
      case "ltr":
        ;
      case "rtl":
        this._settings.direction = e;
        return true
    }
    return false
  },
  _resolveMarket: function() {
    var e = null;
    var c = (e = document.getElementsByTagName("html")) && e.length > 0 ? e[0] : null;
    if (c) {
      (e = c.getAttribute("lang")) && this.initialize({
        market: e
      });
      (e = c.getAttribute("xml:lang")) && this.initialize({
        market: e
      })
    }
  },
  _tryUpdateMarket: function(e) {
    if (e = this._normalizeMarket(e)) {
      this._settings.market = e;
      this._settings.resourceMarket = this._getResourceMarket(e);
      return true
    }
    return false
  },
  _detectBrowsers: function() {
    var e = navigator.userAgent.toLowerCase();
    this._browser = {
      firefox: /firefox/.test(e),
      "firefox1.5": /firefox\/1\.5/.test(e),
      firefox2: /firefox\/2/.test(e),
      firefox3: /firefox\/3/.test(e),
      ie: /msie/.test(e) && !/opera/.test(e),
      ie6: /msie 6/.test(e) && !/opera/.test(e),
      ie7: /msie 7/.test(e) && !/opera/.test(e),
      ie8: /trident\/4/.test(e) && document.documentMode == 8 && !/opera/.test(e),
      ie8compat: /trident\/4/.test(e) && document.documentMode <= 7 && !/opera/.test(e),
      ie9: /trident\/5/.test(e) && document.documentMode == 9 && !/opera/.test(e),
      opera: /opera/.test(e),
      webkit: /webkit/.test(e)
    }
  },
  _detectSecureConnection: function() {
    document.location.protocol.toLowerCase() == "https:" && this.initialize({
      httpsApplication: true,
      httpsScope: "all"
    })
  },
  _detectFlash: function() {
    var e = 0;
    try {
      if (this._browser.ie) {
        e = (new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")).GetVariable("$version").split(" ")[1].split(",")[0]
      } else {
        if (navigator.plugins && navigator.plugins.length > 0) {
          if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
            e = navigator.plugins["Shockwave Flash" + (navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "")].description.split(" ")[2].split(".")[0]
          }
        }
      }
    } catch (c) {}
    this._browser.flashVersion = e;
    this._browser.flash = e >= 8
  },
  _addDocumentReadyListener: function() {
    var e = this;
    if (document.body) {
      switch (document.readyState) {
        case "complete":
          this._onDocumentReady();
          return;
        case "loaded":
          if (this._browser.webkit) {
            this._onDocumentReady();
            return
          }
          break;
        case "interactive":
          ;
        case undefined:
          if (this._browser.firefox || this._browser.webkit) {
            this._onDocumentReady();
            return
          }
      }
    }
    if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", function() {
        e._onDocumentReady()
      }, false);
      document.addEventListener("load", function() {
        e._onDocumentReady()
      }, false)
    } else {
      window.attachEvent && window.attachEvent("onload", function() {
        e._onDocumentReady()
      })
    }
    if (this._browser.ie) {
      document.attachEvent("onreadystatechange", function() {
        if (document.readyState === "complete") {
          document.detachEvent("onreadystatechange", arguments.callee);
          e._onDocumentReady()
        }
      });
      var c = false;
      try {
        c = window.frameElement == null
      } catch (a) {}
      c && document.documentElement.doScroll && this._doScrollCheck()
    }
  },
  _doScrollCheck: function() {
    if (!this._documentReady) {
      try {
        document.documentElement.doScroll("left")
      } catch (e) {
        var c = this;
        setTimeout(function() {
          c._doScrollCheck()
        }, 1);
        return
      }
      this._onDocumentReady()
    }
  },
  _invokeCallback: function(e) {
    window.setTimeout(e, 1)
  },
  _onDocumentReady: function() {
    if (this._documentReady == false) {
      this._documentReady = true;
      for (this._appendIFrameResources(); this._domRequests.length > 0;) {
        this._invokeCallback(this._domRequests.shift().callback)
      }
      this._process()
    }
  },
  _appendChild: function(e, c) {
    var a = function() {
      e.appendChild(c)
    };
    this._browser.ie && !this._documentReady ? this._invokeCallback(a) : a()
  },
  _appendIFrameResources: function() {
    if (this._documentReady) {
      for (var e = this._iframeResources, c = e.length - 1; c >= 0; c--) {
        if (e[c].hasParent !== true) {
          e[c].hasParent = true;
          this._appendChild(document.body, e[c].frameContainer)
        }
      }
    }
  },
  _serializeSettings: function(e) {
    if (e) {
      var c = this._settings.customSettings;
      for (var a in e) {
        var b = c.length == 0 ? "" : "&",
          d, g = e[a];
        switch (typeof g) {
          case "boolean":
            d = "cb";
            break;
          case "number":
            d = "cn";
            break;
          default:
            d = "cs"
        }
        c += b + d + ":" + a + "=" + encodeURIComponent(g)
      }
      this._settings.customSettings = c
    }
  },
  _runtimeCheck: function() {
    for (var e in Object.prototype) {
      this._validRuntime = false;
      break
    }
  }
};
Microsoft.Live.Core.Loader = new Microsoft.Live.Core.Loader;
Microsoft.Live.Core.Loader._addManifest("microsoftAjax", {
  microsoft_ajax_core: {
    async: true,
    filename: "{microsoftAjax.baseScriptUrl}/MicrosoftAjaxCore.js",
    type: "script",
    isLoaded: !! (window.Type && window.Type.registerClass && window.Sys && window.Sys.Debug),
    dependencies: []
  },
  microsoft_ajax_compat: {
    async: true,
    filename: "{microsoftAjax.baseScriptUrl}/MicrosoftAjaxCompat.js",
    type: "script",
    browsers: function(e) {
      return !e.ie
    },
    dependencies: []
  },
  microsoft_ajax_extensions: {
    type: "script",
    dependencies: ["microsoft_ajax_core", "microsoft_ajax_compat"]
  },
  microsoft_ajax_base: {
    async: true,
    filename: "{microsoftAjax.baseScriptUrl}/MicrosoftAjaxBase.js",
    type: "script",
    isLoaded: !! (window.Sys && window.Sys.UI),
    dependencies: ["microsoft_ajax_core"]
  },
  microsoft_ajax_componentmodel: {
    type: "script",
    dependencies: ["microsoft_ajax_base"]
  },
  microsoft_ajax_serialization: {
    type: "script",
    dependencies: ["microsoft_ajax_base"]
  },
  microsoft_ajax_templates: {
    async: true,
    filename: "{microsoftAjax.baseScriptUrl}/MicrosoftAjaxTemplates.js",
    type: "script",
    isLoaded: !! (window.Sys && window.Sys.UI && window.Sys.UI.Template),
    dependencies: ["microsoft_ajax_base"]
  },
  microsoft_ajax_globalization: {
    async: true,
    filename: "{microsoftAjax.baseLocalizedScriptUrl}/MicrosoftAjaxGlobalization.js",
    type: "script",
    isLoaded: !! Number._parse,
    dependencies: ["microsoft_ajax_core"]
  },
  microsoft_ajax_history: {
    async: true,
    filename: "{microsoftAjax.baseScriptUrl}/MicrosoftAjaxHistory.js",
    type: "script",
    isLoaded: !! (window.Sys && window.Sys.Application && window.Sys.Application.get_stateString),
    dependencies: ["microsoft_ajax_componentmodel", "microsoft_ajax_serialization"]
  },
  json_parser: {
    async: true,
    filename: "{microsoftAjax.baseScriptUrl}/json2.js",
    type: "script",
    isLoaded: !! window.JSON,
    dependencies: []
  }
}, {
  version: "3.0.31119",
  market: "en",
  resourcePath: ["http://secure.wlxrs.com/_D/F$Live.SiteContent.MicrosoftAjax", "http://secure.shared.live.com/_D/F$Live.SiteContent.MicrosoftAjax"],
  baseScriptUrl: "{microsoftAjax.resourcePath}/{microsoftAjax.version}/{configuration}",
  baseLocalizedScriptUrl: "{microsoftAjax.resourcePath}/{microsoftAjax.version}/{configuration}/{microsoftAjax.market}",
  "int": {
    resourcePath: ["http://js.wlxrs-int.com/_D/F$Live.SiteContent.MicrosoftAjax", "http://js2.wlxrs-int.com/_D/F$Live.SiteContent.MicrosoftAjax"]
  },
  f1: {
    resourcePath: ["http://js.f1.wlxrs-int.com/_D/F$Live.SiteContent.MicrosoftAjax", "http://js2.f1.wlxrs-int.com/_D/F$Live.SiteContent.MicrosoftAjax"]
  },
  updateSettings: function(e) {
    var c = e.microsoftAjax;
    if (e = e.market) {
      c.market = Microsoft.Live.Core.Loader._getResourceMarket(e, ["ar", "ar-ae", "ar-bh", "ar-dz", "ar-eg", "ar-iq", "ar-jo", "ar-kw", "ar-lb", "ar-ly", "ar-ma", "ar-om", "ar-ploc-sa", "ar-qa", "ar-sy", "ar-tn", "ar-ye", "bg", "cs", "da", "de", "de-at", "de-ch", "el", "en", "en-au", "en-ca", "en-gb", "en-ie", "en-in", "en-my", "en-nz", "en-ph", "en-sg", "en-za", "es", "es-ar", "es-bo", "es-cl", "es-co", "es-cr", "es-do", "es-ec", "es-gt", "es-hn", "es-mx", "es-ni", "es-pa", "es-pe", "es-pr", "es-py",
          "es-sv", "es-us", "es-uy", "es-ve", "et", "fi", "fr", "fr-be", "fr-ca", "fr-ch", "he", "hr", "hu", "it", "ja", "ja-ploc-jp", "ko", "lt", "lv", "nb-no", "nl", "nl-be", "pl", "pt-br", "pt-pt", "ro", "ru", "sk", "sl", "sr", "sv", "th", "tr", "uk", "zh-cn", "zh-hk", "zh-tw"
      ]) || "en"
    }
  }
});
Microsoft.Live.Core.Loader._addManifest("liveconnect", null, {
  localizedMarket: "",
  resourcePath: "/_D/F$Live.SiteContent.PROD.Connect/15.0.5717/",
  version: "15.0.5717.0",
  shortversion: "15.0.5717",
  JssdkOfferNamespace: "",
  JssdkIsTestEnvironment: false,
  JssdkSecureDomain: "secure.wlxrs.com",
  JssdkDomainsJavaScript: ["js.wlxrs.com", "js2.wlxrs.com"],
  JssdkDomainsImage: ["img.wlxrs.com", "img2.wlxrs.com"],
  JssdkDomainsCss: ["css.wlxrs.com"],
  JssdkAuthChannelDomain: "xd.live.com",
  JssdkAuthChannelPath: "/4.1/",
  JssdkSrsResourceGroup: "Live.SiteContent.PROD.Connect",
  JssdkEdgeJs: "/_D/F$Live.SiteContent.PROD.Connect/15.0.5717/",
  JssdkEdgeImg: "/_D/F$Live.SiteContent.PROD.Connect/15.0.5717/images/",
  JssdkEdgeCss: "/_D/F$Live.SiteContent.PROD.Connect/15.0.5717/",
  JssdkImagePathForCss: "//secure.wlxrs.com/_D/F$Live.SiteContent.PROD.Connect/15.0.5717/images/",
  JssdkImagePathForHtml: "https://secure.wlxrs.com/_D/F$Live.SiteContent.PROD.Connect/15.0.5717/images/",
  JssdkCloudMoeBaseUri: "https://apis.live.net/",
  JssdkCloudMoeRootServiceDocPath: "v4.1/",
  JssdkCloudMoeChannelSourcesPath: "js/v1/",
  JssdkConsentUri: "https://consent.live.com/connect.aspx",
  JssdkLivePcTestBaseUri: "http://live.com/",
  getConfiguration: function() {
    return Microsoft.Live.Core.Loader._settings.configuration
  },
  getIsLiveUser: function(e) {
    var c = Microsoft.Live.Core.Loader._settings.liveconnect,
      a = c._isSecure();
    e = "http://" + c.JssdkAuthChannelDomain + c.JssdkAuthChannelPath + "livehost.html?isLiveUser=true&channel=" + escape(e);
    if (a) {
      return e.replace(/https?:/, "https:")
    }
    return c._makeFrame(e)
  },
  wlSignOut: function(e) {
    var c = Microsoft.Live.Core.Loader._settings.liveconnect;
    if (!c._isSecure()) {
      return c._makeFrame(e)
    }
  },
  getScriptBase: function(e) {
    return Microsoft.Live.Core.Loader._settings.liveconnect._getBaseUrl("JssdkEdgeJs", "JssdkDomainsJavaScript", e)
  },
  getCssBase: function(e) {
    return Microsoft.Live.Core.Loader._settings.liveconnect._getBaseUrl("JssdkEdgeCss", "JssdkDomainsCss", e)
  },
  getServiceUrl: function(e, c) {
    var a = Microsoft.Live.Core.Loader._settings;
    a[e]._isSecure();
    a = a[e][c];
    protocol = "https:";
    return a.replace(/https?:/, protocol)
  },
  _getRandomId: function() {
    return Math.floor(Math.random() * 99001) + 1E3
  },
  _makeFrame: function(e) {
    var c = Microsoft.Live.Core.Loader._settings.liveconnect,
      a = document.createElement("IFRAME");
    a.id = c._getRandomId();
    a.src = e;
    a.style.display = "none";
    e = document.getElementsByTagName("body")[0] || document.documentElement;
    e.insertBefore(a, e.firstChild);
    return a.id
  },
  _isSecure: function() {
    return this != undefined && this._secureConnection != undefined ? this._secureConnection : document.location.protocol.toLowerCase() == "https:"
  },
  updateSettings: function(e) {
    var c = ["ar", "ar-ploc-sa", "bg", "cs", "da", "de", "de-ploc-de", "el", "en", "es", "et", "fi", "fr", "he", "hr", "hu", "it", "ja", "ja-ploc-jp", "ko", "lt", "lv", "nb-no", "nl", "pl", "pt-br", "pt-pt", "ro", "ru", "sk", "sl", "sr", "sv", "te", "th", "tr", "uk", "zh-cn", "zh-hk", "zh-tw"];
    if (e.resourceMarket) {
      for (var a = 0; a < c.length; a++) {
        if (e.resourceMarket == c[a]) {
          this.localizedMarket = e.resourceMarket;
          break
        }
      }
    }
  },
  _getBaseUrl: function(e, c, a) {
    var b = Microsoft.Live.Core.Loader._settings.liveconnect;
    if (b._isSecure()) {
      return e = "https://" + b.JssdkSecureDomain + b[e]
    }
    c = b[c];
    var d = 0;
    d = a && a.domainIdx ? a.domainIdx : Microsoft.Live.Core.Loader._computeFastHash(a && a.filename ? b[e] + a.filename : b[e]) % c.length;
    return e = "http://" + c[d] + b[e]
  }
});
Microsoft.Live.Core.Loader._addManifest("channel", {
  microsoft_live_core_channel: {
    async: true,
    filename: "{messenger.baseScriptUrl}/Microsoft.Live.Core.Channel.js",
    type: "script",
    dependencies: ["microsoft_live_core_channel_downlevel", "json_parser", "microsoft_ajax_extensions"]
  },
  microsoft_live_core_channel_downlevel: {
    async: true,
    filename: "{messenger.baseScriptUrl}/channel.js",
    type: "script",
    browsers: function(e, c) {
      return !window.postMessage && (!e.flash || c.channel.flashDisabled)
    },
    dependencies: []
  }
}, {
  uniqueIdUrl: "http://{messenger.serviceHostName}/actions/getuniqueids",
  flashDisabled: false,
  getUniqueIdUrl: function() {
    return Microsoft.Live.Core.Loader._getUrl(this.uniqueIdUrl, "service")
  }
});
Microsoft.Live.Core.Loader._addManifest("liveconnect", {
  mscorlib: {
    type: "script",
    dependencies: ["microsoft_ajax_compat", "microsoft_ajax_extensions", "json_parser"]
  },
  microsoft_live: {
    async: true,
    filename: "{liveconnect.getScriptBase}/microsoft.live{liveconnect_debug.debug}.js",
    type: "script",
    dependencies: ["microsoft_ajax_base"]
  },
  microsoft_live_core_scanner_tags_registry: {
    type: "script",
    dependencies: ["microsoft_live_core_scanner_tags_registry_live", "microsoft_live_core_scanner_tags_registry_msgr"]
  },
  microsoft_live_core_scanner_tags_registry_live: {
    async: true,
    filename: "{liveconnect.getScriptBase}/scanner.tags.liveconnect{liveconnect_debug.debug}.js",
    type: "script",
    dependencies: ["microsoft_live_ui"]
  },
  microsoft_live_services: {
    filename: "{liveconnect.getScriptBase}/microsoft.live.services{liveconnect_debug.debug}.js",
    async: true,
    type: "script",
    dependencies: ["microsoft_live", "microsoft_ajax_core", "microsoft_ajax_base", "json_parser"]
  }
}, null);
Microsoft.Live.Core.Loader._addManifest("default", null, {
  getScriptBase: "{liveconnect.getScriptBase}"
});
Microsoft.Live.Core.Loader._addManifest("liveconnect", {
  microsoft_live_ui_primitives_styles: {
    async: true,
    filename: "{liveconnect.getCssBase}/microsoft.live.ui.primitives.css",
    type: "stylesheet",
    dependencies: []
  },
  microsoft_live_ui_styles: {
    async: true,
    filename: "{liveconnect.getCssBase}/microsoft.live.ui.css",
    type: "stylesheet",
    dependencies: []
  },
  microsoft_live_ui_primitives_res: {
    async: true,
    filename: "{liveconnect.getScriptBase}/microsoft.live.ui.primitives.res.{liveconnect.localizedMarket}{liveconnect_debug.debug}.js",
    type: "script",
    dependencies: ["mscorlib"]
  },
  microsoft_live_ui_primitives: {
    async: true,
    filename: "{liveconnect.getScriptBase}/microsoft.live.ui.primitives{liveconnect_debug.debug}.js",
    type: "script",
    dependencies: ["microsoft_live_ui_primitives_res", "microsoft_ajax_base", "microsoft_ajax_core", "microsoft_ajax_templates", "mscorlib"]
  },
  microsoft_live_ui: {
    async: true,
    filename: "{liveconnect.getScriptBase}/microsoft.live.ui{liveconnect_debug.debug}.js",
    type: "script",
    dependencies: ["microsoft_live", "microsoft_live_ui_primitives_res",
        "microsoft_ajax_base", "microsoft_ajax_core", "microsoft_ajax_templates"
    ]
  }
}, null);
Microsoft.Live.Core.Loader._addManifest("messenger", {
  scriptsharp_compat: {
    type: "script",
    dependencies: ["microsoft_ajax_core"]
  },
  scriptsharp: {
    type: "script",
    dependencies: ["scriptsharp_compat"]
  },
  messenger_iframe: {
    type: "channeliframe",
    dependencies: [],
    containerId: "MsgrContainer1",
    frameId: "ifm" + Math.floor(Math.random() * 1024 * 1024),
    filename: "{messenger.baseContentUrl}/Messenger.html#domain={messenger.domain}&loaderPath={messenger.loaderPath}{messenger.loaderName}&{customSettings}&{messenger.messengerChannelTypeQualifier}"
  },
  storage_iframe: {
    type: "storageiframe",
    dependencies: [],
    containerId: "MsgrStorageContainer1",
    frameId: "ifm" + Math.floor(Math.random() * 1024 * 1024),
    filename: "{messenger.baseContentUrl}/LocalStorage.html#domain={messenger.domain}&loaderPath={messenger.loaderPath}{messenger.loaderName}&channelNames={messenger.storageChannelNames}&{customSettings}&{messenger.storageChannelTypeQualifier}"
  },
  messenger_common: {
    async: true,
    filename: "{messenger.baseScriptUrl}/Microsoft.Live.Messenger.Common.js",
    type: "script",
    dependencies: ["microsoft_ajax_extensions", "json_parser", "microsoft_live_core_channel"]
  },
  messenger_core: {
    async: true,
    filename: "{messenger.baseLocalizedScriptUrl}/Microsoft.Live.Messenger.js",
    type: "script",
    dependencies: ["messenger_common", "messenger_services_loader", "messenger_iframe", "storage_iframe", "core_localstorage"]
  },
  messenger_connect: {
    async: true,
    filename: "{messenger.baseScriptUrl}/Microsoft.Live.Messenger.Connect.js",
    type: "script",
    dependencies: ["messenger_core"]
  },
  messenger_pubsub: {
    async: true,
    filename: "{messenger.baseScriptUrl}/Microsoft.Live.Messenger.PubSub.Client.js",
    type: "script",
    dependencies: ["messenger_core", "messenger_pubsub_common", "messenger_pubsub_service"]
  },
  messenger_pubsub_service: {
    async: true,
    filename: "{messenger.baseScriptUrl}/Microsoft.Live.Messenger.PubSub.Service.js",
    type: "script",
    dependencies: ["messenger_pubsub_common"]
  },
  messenger_pubsub_common: {
    async: true,
    filename: "{messenger.baseScriptUrl}/Microsoft.Live.Messenger.PubSub.Common.js",
    type: "script",
    dependencies: ["messenger_common"]
  },
  messenger_extended: {
    type: "script",
    dependencies: ["messenger_core", "messenger_services_core", "messenger_services_chat"]
  },
  messenger_services_loader: {
    async: true,
    filename: "{messenger.baseScriptUrl}/Microsoft.Live.Messenger.Services.Loader.js",
    type: "script",
    dependencies: ["messenger_common", "core_localstorage"]
  },
  messenger_services_core: {
    async: true,
    filename: "{messenger.baseScriptUrl}/Microsoft.Live.Messenger.Services.Core.js",
    type: "script",
    dependencies: ["messenger_common"]
  },
  messenger_services_addressbook: {
    async: true,
    filename: "{messenger.baseScriptUrl}/Microsoft.Live.Messenger.Services.AddressBook.js",
    type: "script",
    dependencies: ["messenger_common"]
  },
  messenger_services_chat: {
    async: true,
    filename: "{messenger.baseScriptUrl}/Microsoft.Live.Messenger.Services.Chat.js",
    type: "script",
    dependencies: ["messenger_common"]
  },
  messenger_services_configuration: {
    async: true,
    filename: "{messenger.baseScriptUrl}/Microsoft.Live.Messenger.Services.Configuration.js",
    type: "script",
    dependencies: ["messenger_common"]
  },
  messenger_services_expressionprofile: {
    async: true,
    filename: "{messenger.baseScriptUrl}/Microsoft.Live.Messenger.Services.ExpressionProfile.js",
    type: "script",
    dependencies: ["messenger_common"]
  },
  messenger_services_identity: {
    async: true,
    filename: "{messenger.baseScriptUrl}/Microsoft.Live.Messenger.Services.Identity.js",
    type: "script",
    dependencies: ["messenger_common"]
  },
  core_localstorage: {
    type: "script",
    dependencies: ["core_localstorage_ie", "core_localstorage_ff", "core_localstorage_plugins", "core_localstorage_userdata", "core_localstorage_webkit"]
  },
  core_localstorage_ie: {
    async: true,
    filename: "{messenger.baseScriptUrl}/Microsoft.Live.Core.LocalStorage.IE.js",
    type: "script",
    browsers: function(e) {
      return e.ie && window.sessionStorage
    },
    dependencies: ["messenger_common"]
  },
  core_localstorage_userdata: {
    async: true,
    filename: "{messenger.baseScriptUrl}/Microsoft.Live.Core.LocalStorage.UserData.js",
    type: "script",
    browsers: function(e, c) {
      return (!c.httpsApplication || !e.flash) && e.ie && !window.sessionStorage
    },
    dependencies: ["messenger_common"]
  },
  core_localstorage_ff: {
    async: true,
    filename: "{messenger.baseScriptUrl}/Microsoft.Live.Core.LocalStorage.FF.js",
    type: "script",
    browsers: function(e) {
      return e.firefox && window.globalStorage
    },
    dependencies: ["messenger_common"]
  },
  core_localstorage_plugins: {
    async: true,
    filename: "{messenger.baseScriptUrl}/Microsoft.Live.Core.LocalStorage.Plugins.js",
    type: "script",
    browsers: function(e, c) {
      return (c.httpsApplication && e.flash || !e.ie) && !window.localStorage && !window.globalStorage && !window.sessionStorage
    },
    dependencies: ["messenger_common"]
  },
  core_localstorage_webkit: {
    async: true,
    filename: "{messenger.baseScriptUrl}/Microsoft.Live.Core.LocalStorage.WebKit.js",
    type: "script",
    browsers: function(e) {
      return (e.webkit || e.opera) && window.localStorage
    },
    dependencies: ["messenger_common"]
  }
});
Microsoft.Live.Core.Loader._addManifest("messenger", {
  microsoft_live_core_scanner_tags_registry_msgr: {
    async: true,
    filename: "{messenger.baseScriptUrl}/Scanner.Tags.Messenger.js",
    type: "script",
    dependencies: ["microsoft_live_ui"]
  },
  mesh: {
    async: true,
    filename: "{messenger.baseScriptUrl}/Microsoft.Live.Mesh.Framework.js",
    type: "script",
    dependencies: ["microsoft_ajax_extensions"]
  },
  messenger_ui_core: {
    async: true,
    filename: "{messenger.baseScriptUrl}/Microsoft.Live.UI.Messenger.Core.js",
    type: "script",
    dependencies: ["microsoft_ajax_extensions",
        "messenger_core", "mesh"
    ]
  },
  messenger_ui_databinding: {
    async: true,
    filename: "{messenger.baseScriptUrl}/Microsoft.Live.UI.Messenger.DataBinding.js",
    type: "script",
    dependencies: ["microsoft_ajax_templates", "messenger_core"]
  },
  messenger_ui_primitives: {
    async: true,
    filename: "{messenger.baseLocalizedScriptUrl}/Microsoft.Live.UI.Messenger.Primitives.js",
    type: "script",
    dependencies: ["mesh"]
  },
  messenger_ui_controls: {
    async: true,
    filename: "{messenger.baseLocalizedScriptUrl}/Microsoft.Live.UI.Messenger.Controls.js",
    type: "script",
    dependencies: ["microsoft_ajax_globalization", "messenger_ui_primitives", "messenger_ui_core"]
  },
  messenger_ui_model: {
    async: true,
    filename: "{messenger.baseScriptUrl}/Microsoft.Live.UI.Messenger.js",
    type: "script",
    dependencies: ["messenger_ui_controls", "microsoft_ajax_componentmodel"]
  },
  messenger_ui: {
    async: true,
    filename: "{messenger.baseScriptUrl}/Microsoft.Live.UI.Messenger.Tags.js",
    type: "script",
    dependencies: ["microsoft_live_core_scanner_tags_registry", "messenger_ui_model", "microsoft_ajax_templates"]
  },
  messenger_ui_chat: {
    async: true,
    filename: "{messenger.baseLocalizedScriptUrl}/Microsoft.Live.UI.Messenger.Chat.js",
    type: "script",
    dependencies: ["messenger_pubsub", "messenger_ui_controls", "microsoft_ajax_componentmodel"]
  },
  messenger_ui_chatframe: {
    async: true,
    filename: "{messenger.baseScriptUrl}/Microsoft.Live.UI.Messenger.ChatFrameControl.js",
    type: "script",
    dependencies: ["microsoft_ajax_componentmodel"]
  },
  messenger_ui_styles_core: {
    type: "stylesheet",
    dependencies: ["messenger_ui_styles_core_ie6", "messenger_ui_styles_core_ie7",
        "messenger_ui_styles_core_ie8", "messenger_ui_styles_core_ie9", "messenger_ui_styles_core_webkit", "messenger_ui_styles_core_other"
    ]
  },
  messenger_ui_styles_core_ie6: {
    filename: "{messenger.baseStyleSheetUrl}/core.ie6.{messenger.localizedMarket}.css",
    type: "stylesheet",
    browsers: function(e) {
      return e.ie6
    },
    dependencies: []
  },
  messenger_ui_styles_core_ie7: {
    filename: "{messenger.baseStyleSheetUrl}/core.ie7.{messenger.localizedMarket}.css",
    type: "stylesheet",
    browsers: function(e) {
      return e.ie7 || e.ie8compat
    },
    dependencies: []
  },
  messenger_ui_styles_core_ie8: {
    filename: "{messenger.baseStyleSheetUrl}/core.ie8.{messenger.localizedMarket}.css",
    type: "stylesheet",
    browsers: function(e) {
      return e.ie8
    },
    dependencies: []
  },
  messenger_ui_styles_core_ie9: {
    filename: "{messenger.baseStyleSheetUrl}/core.other.{messenger.localizedMarket}.css",
    type: "stylesheet",
    browsers: function(e) {
      return e.ie9
    },
    dependencies: []
  },
  messenger_ui_styles_core_webkit: {
    filename: "{messenger.baseStyleSheetUrl}/core.webkit.{messenger.localizedMarket}.css",
    type: "stylesheet",
    browsers: function(e) {
      return e.webkit
    },
    dependencies: []
  },
  messenger_ui_styles_core_other: {
    filename: "{messenger.baseStyleSheetUrl}/core.other.{messenger.localizedMarket}.css",
    type: "stylesheet",
    browsers: function(e) {
      return !e.ie && !e.webkit
    },
    dependencies: []
  },
  messenger_ui_styles_chat_light: {
    type: "stylesheet",
    dependencies: ["messenger_ui_styles_core", "messenger_ui_styles_chat_light_ie6", "messenger_ui_styles_chat_light_ie7", "messenger_ui_styles_chat_light_ie8", "messenger_ui_styles_chat_light_other"]
  },
  messenger_ui_styles_chat_light_ie6: {
    filename: "{messenger.baseStyleSheetUrl}/chat.light.ie6.{messenger.localizedMarket}.css",
    type: "stylesheet",
    browsers: function(e) {
      return e.ie6
    },
    dependencies: []
  },
  messenger_ui_styles_chat_light_ie7: {
    filename: "{messenger.baseStyleSheetUrl}/chat.light.ie7.{messenger.localizedMarket}.css",
    type: "stylesheet",
    browsers: function(e) {
      return e.ie7 || e.ie8compat
    },
    dependencies: []
  },
  messenger_ui_styles_chat_light_ie8: {
    filename: "{messenger.baseStyleSheetUrl}/chat.light.ie8.{messenger.localizedMarket}.css",
    type: "stylesheet",
    browsers: function(e) {
      return e.ie8
    },
    dependencies: []
  },
  messenger_ui_styles_chat_light_other: {
    filename: "{messenger.baseStyleSheetUrl}/chat.light.other.{messenger.localizedMarket}.css",
    type: "stylesheet",
    browsers: function(e) {
      return !e.ie || e.ie9
    },
    dependencies: []
  },
  messenger_ui_styles_chat_dark: {
    type: "stylesheet",
    dependencies: ["messenger_ui_styles_core", "messenger_ui_styles_chat_dark_ie6", "messenger_ui_styles_chat_dark_ie7", "messenger_ui_styles_chat_dark_ie8", "messenger_ui_styles_chat_dark_other"]
  },
  messenger_ui_styles_chat_dark_ie6: {
    filename: "{messenger.baseStyleSheetUrl}/chat.dark.ie6.{messenger.localizedMarket}.css",
    type: "stylesheet",
    browsers: function(e) {
      return e.ie6
    },
    dependencies: []
  },
  messenger_ui_styles_chat_dark_ie7: {
    filename: "{messenger.baseStyleSheetUrl}/chat.dark.ie7.{messenger.localizedMarket}.css",
    type: "stylesheet",
    browsers: function(e) {
      return e.ie7 || e.ie8compat
    },
    dependencies: []
  },
  messenger_ui_styles_chat_dark_ie8: {
    filename: "{messenger.baseStyleSheetUrl}/chat.dark.ie8.{messenger.localizedMarket}.css",
    type: "stylesheet",
    browsers: function(e) {
      return e.ie8
    },
    dependencies: []
  },
  messenger_ui_styles_chat_dark_other: {
    filename: "{messenger.baseStyleSheetUrl}/chat.dark.other.{messenger.localizedMarket}.css",
    type: "stylesheet",
    browsers: function(e) {
      return !e.ie || e.ie9
    },
    dependencies: []
  }
});









Microsoft.Live.Core.Loader._addManifest("messenger", null, {
  version: "4.2.59120",
  versionOverride: "4.2.59120",
  loaderPath: "{messenger.resourcePath}/{messenger.version}/",
  loaderName: "loader.js",
  localizedMarket: "other",
  resourcePath: ["http://secure.wlxrs.com/_D/F$Live.SiteContent.Messenger", "http://js2.wlxrs.com/_D/F$Live.SiteContent.Messenger"],
  imageResourcePath: ["http://secure.wlxrs.com/_D/F$Live.SiteContent.Messenger", "http://js2.wlxrs.com/_D/F$Live.SiteContent.Messenger"],
  styleResourcePath: "http://secure.wlxrs.com/_D/F$Live.SiteContent.Messenger",
  audioResourcePath: "http://secure.wlxrs.com/_D/F$Live.SiteContent.Messenger",
  applicationPath: "http://secure.shared.live.com/_D/F$Live.SiteContent.Messenger",
  applicationHostName: "settings.messenger.live.com",
  consentHostName: "consent.messenger.services.live.com",
  baseScriptUrl: "{messenger.resourcePath}/{messenger.version}/{configuration}",
  baseLocalizedScriptUrl: "{messenger.resourcePath}/{messenger.version}/{configuration}/{resourceMarket}",
  baseStyleSheetUrl: "{messenger.styleResourcePath}/{messenger.version}/resources/styles/{direction}",
  baseContentUrl: "{messenger.applicationPath}/{messenger.versionOverride}",
  messengerChannelTypeQualifier: "",
  storageChannelTypeQualifier: "",
  storageChannelNames: "",
  serviceHostName: "geo.messenger.services.live.com",
  pubSubHostName: "beta.messenger.services.live.com",
  localStorageDisabled: false,
  sameDomainEndpointsAsLocalEnabled: false,
  testReportingEnabled: false,
  signInControlState: "",
  dogfood: {
    serviceHostName: "beta.messenger.services.live.com"
  },
  "int": {
    resourcePath: ["http://js.wlxrs-int.com/_D/F$Live.SiteContent.Messenger",
        "http://js2.wlxrs-int.com/_D/F$Live.SiteContent.Messenger"
    ],
    imageResourcePath: "http://img.wlxrs-int.com/_D/F$Live.SiteContent.Messenger",
    styleResourcePath: "http://css.wlxrs-int.com/_D/F$Live.SiteContent.Messenger",
    audioResourcePath: "http://msc.wlxrs-int.com/_D/F$Live.SiteContent.Messenger",
    applicationPath: "http://secure.shared.live-int.com/_D/F$Live.SiteContent.Messenger",
    consentHostName: "int-consent.messenger.services.live-int.com",
    serviceHostName: "applications.messenger.live-int.com",
    pubSubHostName: "applications.messenger.live-int.com",
    applicationHostName: "settings.messenger.live-int.com"
  },
  updateSettings: function(e, c) {
    var a = e.messenger,
      b = Microsoft.Live.Core.Loader,
      d = ["ar", "ar-ploc-sa", "ja", "ja-ploc-jp", "he", "ko", "th", "zh-hk", "zh-tw"];
    if (e.resourceMarket) {
      for (var g = 0; g < d.length; g++) {
        if (e.resourceMarket == d[g]) {
          this.localizedMarket = e.resourceMarket;
          break
        }
      }
    }
    a.domain = encodeURIComponent(document.location.hostname.toLowerCase());
    if (!window.postMessage) {
      a.messengerChannelTypeQualifier = "WLIFMi=" + c.messenger_iframe.frameId;
      a.storageChannelTypeQualifier = "WLIFMi=" + c.storage_iframe.frameId
    }
    a.storageChannelNames = "DefaultLocalStorageChannel";
    if (b._shouldProxyLocalStorage()) {
      a.storageChannelNames += ";MessengerStorageChannel"
    }
  },
  _join: function() {
    return Array.prototype.join.call(arguments, "/")
  },
  getLoaderUrl: function() {
    return Microsoft.Live.Core.Loader._getUrl(this.loaderPath + this.loaderName, "script")
  },
  getResourceUrl: function(e, c) {
    e || (e = "");
    var a = Microsoft.Live.Core.Loader,
      b = a._settings.messenger,
      d = a._settings.configuration,
      g = b.resourcePath;
    if (e.match(/(\.jpg|\.gif|\.png)$/gi)) {
      g = b.imageResourcePath
    } else {
      if (e.match(/(\.mp3|\.wav)$/gi)) {
        g = b.audioResourcePath
      } else {
        if (e.match(/(\.html)$/gi)) {
          g = b.applicationPath
        }
      }
    }
    if (a._isArray(g)) {
      var m = a._computeFastHash(e);
      g = g[m % g.length]
    } else {
      g = g
    }
    if (e.charAt(0) == "/") {
      e = e.substring(1)
    }
    g = (e.match(/(\.js)$/gi) || e.length == 0) && d ? this._join(g, b.version, d, e) : e.match(/(\.html)$/gi) ? this._join(g, b.versionOverride, e) : this._join(g, b.version, e);
    if (c == null) {
      c = g.match(/(\.html)$/gi) ? "service" : "content"
    }
    if (a._shouldUseHttps(c)) {
      g = a._getSecureUrl(g)
    }
    return g
  },
  getDistinctDomainResourcePaths: function(e) {
    var c = Microsoft.Live.Core.Loader,
      a = c._settings.messenger,
      b = [],
      d = [];
    d.push(a.resourcePath);
    d.push(a.imageResourcePath);
    d.push(a.audioResourcePath);
    d.push(a.styleResourcePath);
    for (var g = 0; g < d.length; g++) {
      var m = d[g];
      if (c._isArray(m)) {
        for (var q = 0; q < m.length; q++) {
          b.push(m[q])
        }
      } else {
        b.push(m)
      }
    }
    for (g = 0; g < b.length; g++) {
      d = this._join(b[g], a.version, e);
      if (c._settings.httpsApplication) {
        d = c._getSecureUrl(d)
      }
      b[g] = d
    }
    return b
  }
});




















Microsoft.Live.Core.Loader.initialize({
  environment: "production",
  "messenger.loaderName": "loader.js"
});
(function() {
  var e = window.Microsoft_Live_Core_Loader_onAvailable;
  e && typeof e == "function" && e(Microsoft.Live.Core.Loader)
})();
(function() {
  function e(q) {
    c = q == "http://apis.live.net/js/2010" || q == "http://asp.net/ajax" || q == "http://apis.live.net/js/2010" || q == "http://messenger.live.com/2009/ui-tags"
  }
  var c = false,
    a = document.namespaces;
  if (a != null) {
    for (var b = 0; b < a.length; b++) {
      var d = a[b].name,
        g = a[b].urn;
      if (!(d === null || d === undefined) && !(g === null || g === undefined)) {
        e(g);
        if (c) {
          break
        }
      }
    }
  }
  if (!c) {
    a = document.documentElement.attributes;
    d = a.length;
    for (b = 0; b < d; b++) {
      g = a[b];
      if (!(g === null || g === undefined)) {
        var m = g.specified;
        if (m === null || m === undefined) {
          !(g.name === null || g.name === undefined) && g.name.substr(0, 6) == "xmlns:" && e(g.value.toLowerCase())
        } else {
          m && g.name.substr(0, 6) == "xmlns:" && e(g.value.toLowerCase())
        }
        if (c) {
          break
        }
      }
    }
  }
  if (c) {
    Microsoft.Live.Core.Loader.load(["microsoft.live.core.scanner.tags.registry"], function() {
      Microsoft.Live.Core.Loader.onDocumentReady(function() {
        Microsoft.Live.Core.TagsFactory.initialScan()
      })
    })
  } else {
    Microsoft.Live.Core.Loader._skippedScanner = true
  }
})();






























