
function StringUtils() {}
String.prototype.afterFirst = function(e) {
  var c = this.indexOf(e);
  if (c == -1) {
    return ""
  }
  c += e.length;
  return this.substr(c)
};
String.prototype.afterLast = function(e) {
  var c = this.lastIndexOf(e);
  if (c == -1) {
    return ""
  }
  c += e.length;
  return this.substr(c)
};
String.prototype.beginsWith = function(e) {
  return this.indexOf(e) == 0
};
String.prototype.beforeFirst = function(e) {
  e = this.indexOf(e);
  if (e == -1) {
    return ""
  }
  return this.substr(0, e)
};
String.prototype.beforeLast = function(e) {
  e = this.lastIndexOf(e);
  if (e == -1) {
    return ""
  }
  return this.substr(0, e)
};
String.prototype.between = function(e, c) {
  var a = "",
    b = this.indexOf(e);
  if (b != -1) {
    b += e.length;
    var d = this.indexOf(c, b);
    if (d != -1) {
      a = this.substr(b, d - b)
    }
  }
  return a
};
StringUtils.capitalize = function(e, c) {
  e = StringUtils.trimLeft(e);
  return c === true ? e.replace(/^.|\s+(.)/, StringUtils._upperCase) : e.replace(/(^\w)/, StringUtils._upperCase)
};
String.prototype.capitalize = function() {
  return StringUtils.capitalize(this)
};
String.prototype.ljust = function(e, c) {
  if (c == null) {
    c = " "
  }
  var a = c.substr(0, 1);
  return this.length < e ? this + this.repeat(e - this.length, a) : this
};
String.prototype.rjust = function(e, c) {
  if (c == null) {
    c = " "
  }
  var a = c.substr(0, 1);
  return this.length < e ? this.repeat(e - this.length, a) + this : this
};
String.prototype.center = function(e, c) {
  if (c == null) {
    c = " "
  }
  var a = c.substr(0, 1);
  if (this.length < e) {
    var b = e - this.length,
      d = b % 2 == 0 ? "" : a;
    a = this.repeat(Math.round(b / 2), a);
    return a + this + a + d
  } else {
    return this
  }
};
String.prototype.repeat = function(e, c) {
  if (isNaN(e)) {
    e = 1
  }
  for (var a = ""; e--;) {
    a += c || this
  }
  return a
};
String.prototype.base64Encode = function() {
  for (var e = "", c = 0, a = this.length; c < a;) {
    var b = this.charCodeAt(c++) & 255;
    if (c == a) {
      e += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(b >> 2) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((b & 3) << 4) + "==";
      break
    }
    var d = this.charCodeAt(c++);
    if (c == a) {
      e += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(b >> 2) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((b & 3) << 4 | (d & 240) >> 4) + "=";
      break
    }
    var g = this.charCodeAt(c++);
    e += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(b >> 2) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((b & 3) << 4 | (d & 240) >> 4) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((d & 15) << 2 | (g & 192) >> 6) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(g & 63)
  }
  return e
};
String.prototype.contains = function(e) {
  return this.indexOf(e) != -1
};
StringUtils.editDistance = function(e, c) {
  if (e == null) {
    e = ""
  }
  if (c == null) {
    c = ""
  }
  if (e == c) {
    return 0
  }
  var a = [],
    b, d = e.length,
    g = c.length;
  if (d == 0) {
    return g
  }
  if (g == 0) {
    return d
  }
  for (var m = 0; m <= d; m++) {
    a[m] = []
  }
  for (m = 0; m <= d; m++) {
    a[m][0] = m
  }
  for (m = 0; m <= g; m++) {
    a[0][m] = m
  }
  for (m = 1; m <= d; m++) {
    for (var q = e.charAt(m - 1), s = 1; s <= g; s++) {
      b = c.charAt(s - 1);
      b = q == b ? 0 : 1;
      a[m][s] = Math.min(a[m - 1][s] + 1, a[m][s - 1] + 1, a[m - 1][s - 1] + b)
    }
  }
  return a[d][g]
};
String.prototype.editDistance = function(e) {
  return StringUtils.editDistance(this, e)
};
String.prototype.endsWith = function(e) {
  return RegExp(e + "$").test(this)
};
String.prototype.hasText = function() {
  return !!this.removeExtraWhitespace().length
};
String.prototype.isEmpty = function() {
  return !this.length
};
String.prototype.isNumeric = function() {
  return /^[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?$/.test(this)
};
String.prototype.padLeft = function(e, c) {
  for (var a = this; a.length < c;) {
    a = e + a
  }
  return a
};
String.prototype.padRight = function(e, c) {
  for (var a = this; a.length < c;) {
    a += e
  }
  return a
};
String.prototype.properCase = function() {
  return this.toLowerCase().replace(/\b([^.?;!]+)/, StringUtils.capitalize).replace(/\b[i]\b/, "I")
};
String.prototype.quote = function() {
  return '"' + this.replace(/[\\"\r\n]/g, this._quote) + '"'
};
String.prototype.remove = function(e, c) {
  if (c === null) {
    c = true
  }
  var a = StringUtils.escapePattern(e);
  return this.replace(RegExp(a, !c ? "ig" : "g"), "")
};
String.prototype.removeExtraWhitespace = function() {
  return this.trim(this).replace(/\s+/g, " ")
};
String.prototype.reverse = function() {
  return this.split("").reverse().join("")
};
String.prototype.reverseWords = function() {
  return this.split(/\s+/).reverse().join(" ")
};
String.prototype.similarity = function(e) {
  var c = StringUtils.editDistance(this, e);
  e = Math.max(this.length, e.length);
  return e == 0 ? 1 : 1 - c / e
};
String.prototype.stripTags = function() {
  return this.replace(/<\/?[^>]+>/igm, "")
};
String.prototype.supplant = function() {
  var e = this;
  if (arguments[0] instanceof Object) {
    for (var c in arguments[0]) {
      e = e.replace(RegExp("\\{" + c + "\\}", "g"), arguments[0][c])
    }
  } else {
    c = arguments.length;
    for (var a = 0; a < c; a++) {
      e = e.replace(RegExp("\\{" + a + "\\}", "g"), arguments[a])
    }
  }
  return e
};
String.prototype.swapCase = function() {
  return this.replace(/(\w)/, StringUtils._swapCase)
};
String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g, "")
};
StringUtils.trimLeft = function(e) {
  return e.replace(/^\s+/, "")
};
String.prototype.trimLeft = function() {
  return StringUtils.trimLeft(this)
};
StringUtils.trimRight = function(e) {
  return e.replace(/\s+$/, "")
};
String.prototype.trimRight = function() {
  return StringUtils.trimLeft(this)
};
String.prototype.truncate = function(e, c) {
  if (c == null) {
    c = "..."
  }
  if (e == 0) {
    e = this.length
  }
  e -= c.length;
  var a = this;
  if (a.length > e) {
    a = a.substr(0, e);
    if (/[^\s]/.test(a.charAt(e))) {
      a = StringUtils.trimRight(a.replace(/\w+$|\s+$/, ""))
    }
    a += c
  }
  return a
};
String.prototype.wordCount = function() {
  return this.match(/\b\w+\b/g).length
};
StringUtils.escapePattern = function(e) {
  return e.replace(/(\]|\[|\{|\}|\(|\)|\*|\+|\?|\.|\\)/g, "\\$1")
};
StringUtils.prototype._quote = function() {
  switch (this) {
    case "\\":
      return "\\\\";
    case "\r":
      return "\\r";
    case "\n":
      return "\\n";
    case '"':
      return '\\"'
  }
  return null
};
StringUtils._upperCase = function(e) {
  return e.toUpperCase()
};
StringUtils._swapCase = function(e) {
  var c = e.toLowerCase(),
    a = e.toUpperCase();
  switch (e) {
    case c:
      return a;
    case a:
      return c;
    default:
      return e
  }
};

function Rnd() {
  throw Error("Rnd is static and cannot be instantiated.");
}
Rnd.randFloat = function(e, c) {
  if (isNaN(c)) {
    c = e;
    e = 0
  }
  return Math.random() * (c - e) + e
};
Rnd.randBoolean = function(e) {
  if (isNaN(e)) {
    e = 0.5
  }
  return Math.random() < e
};
Rnd.randSign = function(e) {
  if (isNaN(e)) {
    e = 0.5
  }
  return Math.random() < e ? 1 : -1
};
Rnd.randBit = function(e) {
  if (isNaN(e)) {
    e = 0.5
  }
  return Math.random() < e ? 1 : 0
};
Rnd.randInteger = function(e, c) {
  if (isNaN(c)) {
    c = e;
    e = 0
  }
  return Math.floor(Rnd.randFloat(e, c))
};




Number.prototype.floor = function() {
  return this | 0
};
Number.prototype.round = function() {
  return this + 0.5 | 0
};
Number.RADIANS = 180 / Math.PI;
Number.prototype.fromRadians = function() {
  return this * Number.RADIANS
};
Number.prototype.toRadians = function() {
  return this / Number.RADIANS
};
Array.prototype.randomSort = function() {
  var e = this.length;
  if (e == 0) {
    return false
  }
  for (; e--;) {
    var c = Math.random() * (e + 1) | 0,
      a = this[e];
    this[e] = this[c];
    this[c] = a
  }
  return this
};
Array.prototype.findRandom = function() {
  if (this.length == 1) {
    return this[0]
  }
  return this[Math.random() * this.length | 0]
};
Array.prototype.removeRandom = function() {
  return this.splice(Math.random() * this.length | 0, 1)[0]
};
Array.prototype.removeItem = function(e) {
  for (var c = 0, a = this.length; c < a; c++) {
    if (e == this[c]) {
      this.splice(c, 1);
      return true
    }
  }
  return false
};
Array.prototype.sum = function() {
  for (var e = 0, c = 0, a = this.length; c < a; c++) {
    e += this[c]
  }
  return e
};
Object.prototype.formatToString = function() {
  if (arguments == null) {
    return "[Object object]"
  }
  for (var e = [], c = 0, a = arguments.length; c < a; c++) {
    var b = arguments[c],
      d = this[b];
    if (!isNaN(d) && d << 0 != d) {
      d = d.toFixed(2)
    }
    e.push(b + ":" + d)
  }
  return "[" + e.join(", ") + "]"
};
Number.prototype.commaDelimit = function() {
  var e = String(this),
    c = e.length % 3,
    a = Math.floor(e.length / 3);
  if (a > 0) {
    for (var b = [], d = 0; d < a; d++) {
      var g = d * 3 + c;
      d == 0 && c > 0 && b.push(e.substr(0, c));
      b.push(e.substr(g, 3))
    }
    e = b.join(",")
  }
  return e
};
Number.prototype.getOrdinal = function(e) {
  e = e == true ? this.commaDelimit() : this;
  switch (this % 10) {
    case 1:
      return e + "st";
    case 2:
      return e + "nd";
    case 3:
      return e + "rd";
    default:
      return e + "th"
  }
};

function getTimer() {
  return (new Date).getTime()
}
Function.prototype.extend = function(e) {
  if (e.constructor == Function) {
    this.$ = this.prototype = new e;
    this.prototype.constructor = this;
    this.prototype.parent = e.prototype
  } else {
    this.prototype = e;
    this.prototype.constructor = this;
    this.prototype.parent = e
  }
  return this
};


