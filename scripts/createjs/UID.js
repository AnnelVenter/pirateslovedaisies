(function(e) {
  MouseEvent = function(a, b, d) {
    this.initialize(a, b, d)
  };
  var c = MouseEvent.prototype;
  c.stageX = 0;
  c.stageY = 0;
  c.type = null;
  c.nativeEvent = null;
  c.onMouseMove = null;
  c.onMouseUp = null;
  c.initialize = function(a, b, d) {
    this.type = a;
    this.stageX = b;
    this.stageY = d
  };
  c.clone = function() {
    var a = new MouseEvent(this.type, this.stageX, this.stageY);
    a.nativeEvent = this.nativeEvent;
    return a
  };
  c.toString = function() {
    return "[MouseEvent (type=" + this.type + " stageX=" + this.stageX + " stageY=" + this.stageY + ")]"
  };
  e.MouseEvent = MouseEvent
})(window);
(function(e) {
  UID = function() {
    throw "UID cannot be instantiated";
  };
  UID._nextID = 0;
  UID.get = function() {
    return UID._nextID++
  };
  e.UID = UID
})(window);