(function(e) {
  e.toJSON = function(b) {
    if (typeof JSON == "object" && JSON.stringify) {
      return JSON.stringify(b)
    }
    var d = typeof b;
    if (b === null) {
      return "null"
    }
    if (d != "undefined") {
      if (d == "number" || d == "boolean") {
        return b + ""
      }
      if (d == "string") {
        return e.quoteString(b)
      }
      if (d == "object") {
        if (typeof b.toJSON == "function") {
          return e.toJSON(b.toJSON())
        }
        if (b.constructor === Date) {
          var g = b.getUTCMonth() + 1;
          if (g < 10) {
            g = "0" + g
          }
          var m = b.getUTCDate();
          if (m < 10) {
            m = "0" + m
          }
          d = b.getUTCFullYear();
          var q = b.getUTCHours();
          if (q < 10) {
            q = "0" + q
          }
          var s = b.getUTCMinutes();
          if (s < 10) {
            s = "0" + s
          }
          var y = b.getUTCSeconds();
          if (y < 10) {
            y = "0" + y
          }
          b = b.getUTCMilliseconds();
          if (b < 100) {
            b = "0" + b
          }
          if (b < 10) {
            b = "0" + b
          }
          return '"' + d + "-" + g + "-" + m + "T" + q + ":" + s + ":" + y + "." + b + 'Z"'
        }
        if (b.constructor === Array) {
          g = [];
          for (m = 0; m < b.length; m++) {
            g.push(e.toJSON(b[m]) || "null")
          }
          return "[" + g.join(",") + "]"
        }
        g = [];
        for (m in b) {
          d = typeof m;
          if (d == "number") {
            d = '"' + m + '"'
          } else {
            if (d == "string") {
              d = e.quoteString(m)
            } else {
              continue
            }
          }
          if (typeof b[m] != "function") {
            q = e.toJSON(b[m]);
            g.push(d + ":" + q)
          }
        }
        return "{" + g.join(", ") + "}"
      }
    }
  };
  e.evalJSON = function(b) {
    if (typeof JSON == "object" && JSON.parse) {
      return JSON.parse(b)
    }
    return eval("(" + b + ")")
  };
  e.secureEvalJSON = function(b) {
    if (typeof JSON == "object" && JSON.parse) {
      return JSON.parse(b)
    }
    var d = b;
    d = d.replace(/\\["\\\/bfnrtu]/g, "@");
    d = d.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]");
    d = d.replace(/(?:^|:|,)(?:\s*\[)+/g, "");
    if (/^[\],:{}\s]*$/.test(d)) {
      return eval("(" + b + ")")
    } else {
      throw new SyntaxError("Error parsing JSON, source is not valid.");
    }
  };
  e.quoteString = function(b) {
    if (b.match(c)) {
      return '"' + b.replace(c, function(d) {
        var g = a[d];
        if (typeof g === "string") {
          return g
        }
        g = d.charCodeAt();
        return "\\u00" + Math.floor(g / 16).toString(16) + (g % 16).toString(16)
      }) + '"'
    }
    return '"' + b + '"'
  };
  var c = /["\\\x00-\x1f\x7f-\x9f]/g,
    a = {
      "\u0008": "\\b",
      "\t": "\\t",
      "\n": "\\n",
      "\u000c": "\\f",
      "\r": "\\r",
      '"': '\\"',
      "\\": "\\\\"
    }
})(jQuery);
