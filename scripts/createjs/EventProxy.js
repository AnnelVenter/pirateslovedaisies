(function(e) {
  function c(a, b) {
    this.EventProxy(a, b)
  }
  c.prototype = {
    EventProxy: function(a, b) {
      this.listener = a;
      this.functionName = b
    },
    handleEvent: function(a) {
      this.listener[this.functionName != undefined ? this.functionName : a.type](a)
    }
  };
  e.EventProxy = c
})(window);
