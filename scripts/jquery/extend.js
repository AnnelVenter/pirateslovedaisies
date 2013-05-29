$.fn.center = function() {
  var e = $(this),
    c = $(window);
  e.css("position", "absolute");
  e.css("top", Math.max(0, (c.height() - this.height() >> 1) + c.scrollTop()));
  e.css("left", Math.max(0, (c.width() - this.width() >> 1) + c.scrollLeft()));
  return e
};
$.fn.horizontalCenter = function() {
  this.css("position", "absolute");
  this.css("left", (this.parent().width() - this.width() >> 1) + "px")
};
$.fn.hAlign = function(e, c) {
  var a = e == null ? 0 : e.width(),
    b = e == null ? 0 : e.position().left;
  this.css("left", a + b + c + "px")
};
$.fn.horizontalAlign = function(e, c) {
  for (var a = 0, b = e.length; a < b; a++) {
    e[a].hAlign(e[a - 1], c)
  }
};
$.fn.vAlignChildren = function(e) {
  if (e == null) {
    e = 5
  }
  for (var c = 0, a = 0, b = this.children(), d = 0, g = b.length; d < g; d++) {
    var m = $(b[d]);
    if (m.css("display") != "none") {
      m.css("position", "absolute");
      m.css("top", a);
      c = Math.max(c, m.width());
      a += m.height() + e
    }
  }
  this.css("height", Math.max(this.css("height"), a - e));
  this.css("width", Math.max(c, this.css("width")))
};
$.fn.hAlignChildren = function(e) {
  if (e == null) {
    e = 5
  }
  for (var c = 0, a = 0, b = this.children(), d = 0, g = b.length; d < g; d++) {
    var m = $(b[d]);
    if (m.css("display") != "none") {
      m.css("position", "absolute");
      m.css("left", a);
      c = Math.max(c, m.height());
      a += m.width() + e
    }
  }
  this.css("width", Math.max(a - e, this.css("width")));
  this.css("height", Math.max(c, this.css("height")))
};
$.extend($.expr[":"], {
  isHidden: function(e) {
    for (e = $(e); e.css("visibility") == "inherit" && e.css("display") != "none" && e.parent();) {
      e = e.parent()
    }
    return e.css("visibility") == "hidden" || e.css("display") == "none"
  }
});