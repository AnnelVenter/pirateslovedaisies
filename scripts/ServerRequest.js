(function(e) {
  function c() {}

  function a(b) {
    this.ServerRequest(b)
  }
  c.CACHE = false;
  c.TIMEOUT = 8E3;
  e.ServerDelegate = c;
  a.prototype = {
    ServerRequest: function(b) {
      EventDispatcher.create(this);
      this.timeoutDelay = b == null ? c.TIMEOUT : b
    },
    load: function(b) {
      this.timeout = setTimeout($.proxy(this, "handleTimeout"), this.timeoutDelay);
      $.ajax({
        url: b,
        dataType: "json",
        context: this,
        cache: c.CACHE,
        success: this.handleRequestLoad,
        error: this.handleRequestError
      })
    },
    handleRequestLoad: function(b) {
      clearTimeout(this.timeout);
      this.dispatchEvent("complete", {
        data: b
      })
    },
    handleRequestError: function(b, d, g) {
      clearTimeout(this.timeout);
      trace("handleRequestError: ", d, b, g);
      this.dispatchEvent("error", {
        status: d,
        error: g
      })
    },
    handleTimeout: function() {
      trace("TIMEOUT");
      this.handleRequestError(null, -1, "Request Timed out")
    }
  };
  e.ServerRequest = a
})(window);