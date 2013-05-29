(function(e) {
  function c() {}

  function a(S, V, G) {
    if (G > 10) {
      return ""
    }
    if (S == undefined) {
      return ""
    }
    var k = "";
    if (G == undefined) {
      G = 0;
      k += H + "--- Dumping Object ---"
    }
    var W;
    W = H;
    for (var ia = 0; ia < G; ia++) {
      W += "----"
    }
    W = G == 0 ? W : W + "> ";
    ia = typeof S;
    switch (S.constructor) {
      case Array:
        ia = "array";
        break
    }
    var ga = {
      contructor: true,
      parentNode: true,
      childNodes: true,
      firstChild: true,
      lastChild: true,
      previousSibling: true,
      nextSibling: true,
      ownerDocument: true,
      ownerElement: true,
      selectionEnd: true
    };
    if (ga[V] == true) {
      return ""
    }
    switch (ia) {
      case "number":
        ;
      case "string":
        ;
      case "boolean":
        k += W + V + " (" + ia + "): " + S;
        break;
      case "array":
        k += W + V + " (Array[" + S.length + "]) ";
        for (V = 0; V < S.length; V++) {
          k += a(S[V], V.toString(), G + 1)
        }
        break;
      case "function":
        k += W + V + " (Function) ";
        break;
      case "object":
        k += W + (V || "") + " (Object) ";
        for (var ba in S) {
          ga[ba] || (k += a(S[ba], ba, G + 1))
        }
        break
    }
    if (G == 0) {
      k += H
    }
    return k
  }

  function b() {
    M && $("#trace", M.document).empty();
    if (document.getElementById("trace")) {
      document.getElementById("trace").innerHTML = ""
    }
  }

  function d(S, V) {
    for (var G = "", k = S.length, W = 0; W < k; W++) {
      G += S[W] + " "
    }
    if (V != null && V.length > 0) {
      k = V.substring(s.length, V.length - A.length).split(y);
      if (q != -1) {
        for (; k.length >= q;) {
          k.shift()
        }
      }
      k.push(G)
    } else {
      k = [G]
    }
    return s + k.join(y) + A
  }

  function b() {
    $("#trace").empty()
  }

  function g() {
    $("#trace").css("display", $("#hideTraceConsoleBtn").attr("checked") ? "block" : "none")
  }

  function m() {
    if (m.inited == null) {
      m.inited = true;
      $("body").append('<div id="traceWindow"><div id="trace" class="console">' + d(arguments) + '</div><input id="clearTraceBtn" type="button" class="clearButton" value="Clear" /><input id="hideTraceConsoleBtn" type="checkbox"' + (c.showDebugWindow ? ' checked="true" ' : "") + 'class="hideButton" value="true" /><label class="hideConsoleLabel" for="hideTraceConsoleBtn">show</label></div>');
      $("#clearTraceBtn").click(b);
      $("#hideTraceConsoleBtn").click(g);
      g()
    } else {
      var S = $("#trace").get(0);
      S.innerHTML = d(arguments, S.innerHTML)
    }
  }
  c.showDebugWindow = true;
  var q = 80,
    s = "<ul><li>",
    y = "</li><li>",
    A = "</li></ul>",
    H = "<br></br>",
    M;
  e.trace = m;
  e.dump = function(S, V, G) {
    m(a(S, V, G))
  };
  e.clearTrace = b;
  e.showTrace = function(S) {
    var V = $("#traceWindow");
    if (V.get(0) != null) {
      V.css("display", S ? "block" : "none")
    }
  }
})(window);