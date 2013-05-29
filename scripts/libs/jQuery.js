(function(e, c) {
  function a() {
    return false
  }

  function b() {
    return true
  }

  function d(f, h, n) {
    n[0].type = f;
    return k.event.handle.apply(h, n)
  }

  function g(f) {
    var h, n, o = [],
      r = [],
      u, x, z, C, J, L, R, U;
    x = k.data(this, this.nodeType ? "events" : "__events__");
    if (typeof x === "function") {
      x = x.events
    }
    if (!(f.liveFired === this || !x || !x.live || f.button && f.type === "click")) {
      if (f.namespace) {
        U = RegExp("(^|\\.)" + f.namespace.split(".").join("\\.(?:.*\\.)?") + "(\\.|$)")
      }
      f.liveFired = this;
      var Z = x.live.slice(0);
      for (C = 0; C < Z.length; C++) {
        x = Z[C];
        x.origType.replace(la, "") === f.type ? r.push(x.selector) : Z.splice(C--, 1)
      }
      r = k(f.target).closest(r, f.currentTarget);
      J = 0;
      for (L = r.length; J < L; J++) {
        R = r[J];
        for (C = 0; C < Z.length; C++) {
          x = Z[C];
          if (R.selector === x.selector && (!U || U.test(x.namespace))) {
            z = R.elem;
            u = null;
            if (x.preType === "mouseenter" || x.preType === "mouseleave") {
              f.type = x.preType;
              u = k(f.relatedTarget).closest(x.selector)[0]
            }
            if (!u || u !== z) {
              o.push({
                elem: z,
                handleObj: x,
                level: R.level
              })
            }
          }
        }
      }
      J = 0;
      for (L = o.length; J < L; J++) {
        r = o[J];
        if (n && r.level > n) {
          break
        }
        f.currentTarget = r.elem;
        f.data = r.handleObj.data;
        f.handleObj = r.handleObj;
        U = r.handleObj.origHandler.apply(r.elem, arguments);
        if (U === false || f.isPropagationStopped()) {
          n = r.level;
          if (U === false) {
            h = false
          }
        }
      }
      return h
    }
  }

  function m(f, h) {
    return (f && f !== "*" ? f + "." : "") + h.replace(sa, "`").replace(va, "&")
  }

  function q(f, h, n) {
    if (k.isFunction(h)) {
      return k.grep(f, function(r, u) {
        return !!h.call(r, u, r) === n
      })
    } else {
      if (h.nodeType) {
        return k.grep(f, function(r) {
          return r === h === n
        })
      } else {
        if (typeof h === "string") {
          var o = k.grep(f, function(r) {
            return r.nodeType === 1
          });
          if (Va.test(h)) {
            return k.filter(h, o, !n)
          } else {
            h = k.filter(h, o)
          }
        }
      }
    }
    return k.grep(f, function(r) {
      return k.inArray(r, h) >= 0 === n
    })
  }

  function s(f, h) {
    var n = 0;
    h.each(function() {
      if (this.nodeName === (f[n] && f[n].nodeName)) {
        var o = k.data(f[n++]),
          r = k.data(this, o);
        if (o = o && o.events) {
          delete r.handle;
          r.events = {};
          for (var u in o) {
            for (var x in o[u]) {
              k.event.add(this, u, o[u][x], o[u][x].data)
            }
          }
        }
      }
    })
  }

  function y(f, h) {
    h.src ? k.ajax({
      url: h.src,
      async: false,
      dataType: "script"
    }) : k.globalEval(h.text || h.textContent || h.innerHTML || "");
    h.parentNode && h.parentNode.removeChild(h)
  }

  function A(f, h, n) {
    var o = h === "width" ? f.offsetWidth : f.offsetHeight;
    if (n === "border") {
      return o
    }
    k.each(h === "width" ? Wa : Xa, function() {
      n || (o -= parseFloat(k.css(f, "padding" + this)) || 0);
      if (n === "margin") {
        o += parseFloat(k.css(f, "margin" + this)) || 0
      } else {
        o -= parseFloat(k.css(f, "border" + this + "Width")) || 0
      }
    });
    return o
  }

  function H(f, h, n, o) {
    if (k.isArray(h) && h.length) {
      k.each(h, function(r, u) {
        n || Ya.test(f) ? o(f, u) : H(f + "[" + (typeof u === "object" || k.isArray(u) ? r : "") + "]", u, n, o)
      })
    } else {
      if (!n && h != null && typeof h === "object") {
        k.isEmptyObject(h) ? o(f, "") : k.each(h, function(r, u) {
          H(f + "[" + r + "]", u, n, o)
        })
      } else {
        o(f, h)
      }
    }
  }

  function M(f, h) {
    var n = {};
    k.each(Ga.concat.apply([], Ga.slice(0, h)), function() {
      n[this] = f
    });
    return n
  }

  function S(f) {
    if (!Da[f]) {
      var h = k("<" + f + ">").appendTo("body"),
        n = h.css("display");
      h.remove();
      if (n === "none" || n === "") {
        n = "block"
      }
      Da[f] = n
    }
    return Da[f]
  }

  function V(f) {
    return k.isWindow(f) ? f : f.nodeType === 9 ? f.defaultView || f.parentWindow : false
  }
  var G = e.document,
    k = function() {
      function f() {
        if (!h.isReady) {
          try {
            G.documentElement.doScroll("left")
          } catch (v) {
            setTimeout(f, 1);
            return
          }
          h.ready()
        }
      }
      var h = function(v, I) {
        return new h.fn.init(v, I)
      }, n = e.jQuery,
        o = e.$,
        r, u = /^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/,
        x = /\S/,
        z = /^\s+/,
        C = /\s+$/,
        J = /\W/,
        L = /\d/,
        R = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
        U = /^[\],:{}\s]*$/,
        Z = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
        N = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        Y = /(?:^|:|,)(?:\s*\[)+/g,
        fa = /(webkit)[ \/]([\w.]+)/,
        t = /(opera)(?:.*version)?[ \/]([\w.]+)/,
        w = /(msie) ([\w.]+)/,
        D = /(mozilla)(?:.*? rv:([\w.]+))?/,
        B = navigator.userAgent,
        E = false,
        F =
          [],
        K, O = Object.prototype.toString,
        T = Object.prototype.hasOwnProperty,
        ma = Array.prototype.push,
        ha = Array.prototype.slice,
        oa = String.prototype.trim,
        na = Array.prototype.indexOf,
        ea = {};
      h.fn = h.prototype = {
        init: function(v, I) {
          var P, Q, X;
          if (!v) {
            return this
          }
          if (v.nodeType) {
            this.context = this[0] = v;
            this.length = 1;
            return this
          }
          if (v === "body" && !I && G.body) {
            this.context = G;
            this[0] = G.body;
            this.selector = "body";
            this.length = 1;
            return this
          }
          if (typeof v === "string") {
            if ((P = u.exec(v)) && (P[1] || !I)) {
              if (P[1]) {
                X = I ? I.ownerDocument || I : G;
                if (Q = R.exec(v)) {
                  if (h.isPlainObject(I)) {
                    v = [G.createElement(Q[1])];
                    h.fn.attr.call(v, I, true)
                  } else {
                    v = [X.createElement(Q[1])]
                  }
                } else {
                  Q = h.buildFragment([P[1]], [X]);
                  v = (Q.cacheable ? Q.fragment.cloneNode(true) : Q.fragment).childNodes
                }
                return h.merge(this, v)
              } else {
                if ((Q = G.getElementById(P[2])) && Q.parentNode) {
                  if (Q.id !== P[2]) {
                    return r.find(v)
                  }
                  this.length = 1;
                  this[0] = Q
                }
                this.context = G;
                this.selector = v;
                return this
              }
            } else {
              if (!I && !J.test(v)) {
                this.selector = v;
                this.context = G;
                v = G.getElementsByTagName(v);
                return h.merge(this, v)
              } else {
                return !I || I.jquery ? (I || r).find(v) : h(I).find(v)
              }
            }
          } else {
            if (h.isFunction(v)) {
              return r.ready(v)
            }
          }
          if (v.selector !== c) {
            this.selector = v.selector;
            this.context = v.context
          }
          return h.makeArray(v, this)
        },
        selector: "",
        jquery: "1.4.3",
        length: 0,
        size: function() {
          return this.length
        },
        toArray: function() {
          return ha.call(this, 0)
        },
        get: function(v) {
          return v == null ? this.toArray() : v < 0 ? this.slice(v)[0] : this[v]
        },
        pushStack: function(v, I, P) {
          var Q = h();
          h.isArray(v) ? ma.apply(Q, v) : h.merge(Q, v);
          Q.prevObject = this;
          Q.context = this.context;
          if (I === "find") {
            Q.selector = this.selector + (this.selector ? " " : "") + P
          } else {
            if (I) {
              Q.selector = this.selector + "." + I + "(" + P + ")"
            }
          }
          return Q
        },
        each: function(v, I) {
          return h.each(this, v, I)
        },
        ready: function(v) {
          h.bindReady();
          if (h.isReady) {
            v.call(G, h)
          } else {
            F && F.push(v)
          }
          return this
        },
        eq: function(v) {
          return v === -1 ? this.slice(v) : this.slice(v, +v + 1)
        },
        first: function() {
          return this.eq(0)
        },
        last: function() {
          return this.eq(-1)
        },
        slice: function() {
          return this.pushStack(ha.apply(this, arguments), "slice", ha.call(arguments).join(","))
        },
        map: function(v) {
          return this.pushStack(h.map(this, function(I, P) {
            return v.call(I, P, I)
          }))
        },
        end: function() {
          return this.prevObject || h(null)
        },
        push: ma,
        sort: [].sort,
        splice: [].splice
      };
      h.fn.init.prototype = h.fn;
      h.extend = h.fn.extend = function() {
        var v = arguments[0] || {}, I = 1,
          P = arguments.length,
          Q = false,
          X, aa, da, ca, Ea;
        if (typeof v === "boolean") {
          Q = v;
          v = arguments[1] || {};
          I = 2
        }
        if (typeof v !== "object" && !h.isFunction(v)) {
          v = {}
        }
        if (P === I) {
          v = this;
          --I
        }
        for (; I < P; I++) {
          if ((X = arguments[I]) != null) {
            for (aa in X) {
              da = v[aa];
              ca = X[aa];
              if (v !== ca) {
                if (Q && ca && (h.isPlainObject(ca) || (Ea = h.isArray(ca)))) {
                  if (Ea) {
                    Ea = false;
                    clone = da && h.isArray(da) ? da : []
                  } else {
                    clone = da && h.isPlainObject(da) ? da : {}
                  }
                  v[aa] = h.extend(Q, clone, ca)
                } else {
                  if (ca !== c) {
                    v[aa] = ca
                  }
                }
              }
            }
          }
        }
        return v
      };
      h.extend({
        noConflict: function(v) {
          e.$ = o;
          if (v) {
            e.jQuery = n
          }
          return h
        },
        isReady: false,
        readyWait: 1,
        ready: function(v) {
          v === true && h.readyWait--;
          if (!h.readyWait || v !== true && !h.isReady) {
            if (!G.body) {
              return setTimeout(h.ready, 1)
            }
            h.isReady = true;
            if (!(v !== true && --h.readyWait > 0)) {
              if (F) {
                for (var I = 0; v = F[I++];) {
                  v.call(G, h)
                }
                F = null
              }
              h.fn.triggerHandler && h(G).triggerHandler("ready")
            }
          }
        },
        bindReady: function() {
          if (!E) {
            E = true;
            if (G.readyState === "complete") {
              return setTimeout(h.ready, 1)
            }
            if (G.addEventListener) {
              G.addEventListener("DOMContentLoaded", K, false);
              e.addEventListener("load", h.ready, false)
            } else {
              if (G.attachEvent) {
                G.attachEvent("onreadystatechange", K);
                e.attachEvent("onload", h.ready);
                var v = false;
                try {
                  v = e.frameElement == null
                } catch (I) {}
                G.documentElement.doScroll && v && f()
              }
            }
          }
        },
        isFunction: function(v) {
          return h.type(v) === "function"
        },
        isArray: Array.isArray || function(v) {
          return h.type(v) === "array"
        },
        isWindow: function(v) {
          return v && typeof v === "object" && "setInterval" in v
        },
        isNaN: function(v) {
          return v == null || !L.test(v) || isNaN(v)
        },
        type: function(v) {
          return v == null ? String(v) : ea[O.call(v)] || "object"
        },
        isPlainObject: function(v) {
          if (!v || h.type(v) !== "object" || v.nodeType || h.isWindow(v)) {
            return false
          }
          if (v.constructor && !T.call(v, "constructor") && !T.call(v.constructor.prototype, "isPrototypeOf")) {
            return false
          }
          for (var I in v) {}
          return I === c || T.call(v, I)
        },
        isEmptyObject: function(v) {
          for (var I in v) {
            return false
          }
          return true
        },
        error: function(v) {
          throw v;
        },
        parseJSON: function(v) {
          if (typeof v !== "string" || !v) {
            return null
          }
          v = h.trim(v);
          if (U.test(v.replace(Z, "@").replace(N, "]").replace(Y, ""))) {
            return e.JSON && e.JSON.parse ? e.JSON.parse(v) : (new Function("return " + v))()
          } else {
            h.error("Invalid JSON: " + v)
          }
        },
        noop: function() {},
        globalEval: function(v) {
          if (v && x.test(v)) {
            var I = G.getElementsByTagName("head")[0] || G.documentElement,
              P = G.createElement("script");
            P.type = "text/javascript";
            if (h.support.scriptEval) {
              P.appendChild(G.createTextNode(v))
            } else {
              P.text = v
            }
            I.insertBefore(P, I.firstChild);
            I.removeChild(P)
          }
        },
        nodeName: function(v, I) {
          return v.nodeName && v.nodeName.toUpperCase() === I.toUpperCase()
        },
        each: function(v, I, P) {
          var Q, X = 0,
            aa = v.length,
            da = aa === c || h.isFunction(v);
          if (P) {
            if (da) {
              for (Q in v) {
                if (I.apply(v[Q], P) === false) {
                  break
                }
              }
            } else {
              for (; X < aa;) {
                if (I.apply(v[X++], P) === false) {
                  break
                }
              }
            }
          } else {
            if (da) {
              for (Q in v) {
                if (I.call(v[Q], Q, v[Q]) === false) {
                  break
                }
              }
            } else {
              for (P = v[0]; X < aa && I.call(P, X, P) !== false; P = v[++X]) {}
            }
          }
          return v
        },
        trim: oa ? function(v) {
          return v == null ? "" : oa.call(v)
        } : function(v) {
          return v == null ? "" : v.toString().replace(z, "").replace(C, "")
        },
        makeArray: function(v, I) {
          var P = I || [];
          if (v != null) {
            var Q = h.type(v);
            v.length == null || Q === "string" || Q === "function" || Q === "regexp" || h.isWindow(v) ? ma.call(P, v) : h.merge(P, v)
          }
          return P
        },
        inArray: function(v, I) {
          if (I.indexOf) {
            return I.indexOf(v)
          }
          for (var P = 0, Q = I.length; P < Q; P++) {
            if (I[P] === v) {
              return P
            }
          }
          return -1
        },
        merge: function(v, I) {
          var P = v.length,
            Q = 0;
          if (typeof I.length === "number") {
            for (var X = I.length; Q < X; Q++) {
              v[P++] = I[Q]
            }
          } else {
            for (; I[Q] !== c;) {
              v[P++] = I[Q++]
            }
          }
          v.length = P;
          return v
        },
        grep: function(v, I, P) {
          var Q = [],
            X;
          P = !! P;
          for (var aa = 0, da = v.length; aa < da; aa++) {
            X = !! I(v[aa], aa);
            P !== X && Q.push(v[aa])
          }
          return Q
        },
        map: function(v, I, P) {
          for (var Q = [], X, aa = 0, da = v.length; aa < da; aa++) {
            X = I(v[aa], aa, P);
            if (X != null) {
              Q[Q.length] = X
            }
          }
          return Q.concat.apply([], Q)
        },
        guid: 1,
        proxy: function(v, I, P) {
          if (arguments.length === 2) {
            if (typeof I === "string") {
              P = v;
              v = P[I];
              I = c
            } else {
              if (I && !h.isFunction(I)) {
                P = I;
                I = c
              }
            }
          }
          if (!I && v) {
            I = function() {
              return v.apply(P || this, arguments)
            }
          }
          if (v) {
            I.guid = v.guid = v.guid || I.guid || h.guid++
          }
          return I
        },
        access: function(v, I, P, Q, X, aa) {
          var da = v.length;
          if (typeof I === "object") {
            for (var ca in I) {
              h.access(v, ca, I[ca], Q, X, P)
            }
            return v
          }
          if (P !== c) {
            Q = !aa && Q && h.isFunction(P);
            for (ca = 0; ca < da; ca++) {
              X(v[ca], I, Q ? P.call(v[ca], ca, X(v[ca], I)) : P, aa)
            }
            return v
          }
          return da ? X(v[0], I) : c
        },
        now: function() {
          return (new Date).getTime()
        },
        uaMatch: function(v) {
          v = v.toLowerCase();
          v = fa.exec(v) || t.exec(v) || w.exec(v) || v.indexOf("compatible") < 0 && D.exec(v) || [];
          return {
            browser: v[1] || "",
            version: v[2] || "0"
          }
        },
        browser: {}
      });
      h.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(v, I) {
        ea["[object " + I + "]"] = I.toLowerCase()
      });
      B = h.uaMatch(B);
      if (B.browser) {
        h.browser[B.browser] = true;
        h.browser.version = B.version
      }
      if (h.browser.webkit) {
        h.browser.safari = true
      }
      if (na) {
        h.inArray = function(v, I) {
          return na.call(I, v)
        }
      }
      if (!/\s/.test("\u00a0")) {
        z = /^[\s\xA0]+/;
        C = /[\s\xA0]+$/
      }
      r = h(G);
      if (G.addEventListener) {
        K = function() {
          G.removeEventListener("DOMContentLoaded", K, false);
          h.ready()
        }
      } else {
        if (G.attachEvent) {
          K = function() {
            if (G.readyState === "complete") {
              G.detachEvent("onreadystatechange", K);
              h.ready()
            }
          }
        }
      }
      return e.jQuery = e.$ = h
    }();




    
  (function() {
    k.support = {};
    var f = G.documentElement,
      h = G.createElement("script"),
      n = G.createElement("div"),
      o = "script" + k.now();
    n.style.display = "none";
    n.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
    var r = n.getElementsByTagName("*"),
      u = n.getElementsByTagName("a")[0],
      x = G.createElement("select"),
      z = x.appendChild(G.createElement("option"));
    if (!(!r || !r.length || !u)) {
      k.support = {
        leadingWhitespace: n.firstChild.nodeType === 3,
        tbody: !n.getElementsByTagName("tbody").length,
        htmlSerialize: !! n.getElementsByTagName("link").length,
        style: /red/.test(u.getAttribute("style")),
        hrefNormalized: u.getAttribute("href") === "/a",
        opacity: /^0.55$/.test(u.style.opacity),
        cssFloat: !! u.style.cssFloat,
        checkOn: n.getElementsByTagName("input")[0].value === "on",
        optSelected: z.selected,
        optDisabled: false,
        checkClone: false,
        scriptEval: false,
        noCloneEvent: true,
        boxModel: null,
        inlineBlockNeedsLayout: false,
        shrinkWrapBlocks: false,
        reliableHiddenOffsets: true
      };
      x.disabled = true;
      k.support.optDisabled = !z.disabled;
      h.type = "text/javascript";
      try {
        h.appendChild(G.createTextNode("window." + o + "=1;"))
      } catch (C) {}
      f.insertBefore(h, f.firstChild);
      if (e[o]) {
        k.support.scriptEval = true;
        delete e[o]
      }
      f.removeChild(h);
      if (n.attachEvent && n.fireEvent) {
        n.attachEvent("onclick", function J() {
          k.support.noCloneEvent = false;
          n.detachEvent("onclick", J)
        });
        n.cloneNode(true).fireEvent("onclick")
      }
      n = G.createElement("div");
      n.innerHTML = "<input type='radio' name='radiotest' checked='checked'/>";
      f = G.createDocumentFragment();
      f.appendChild(n.firstChild);
      k.support.checkClone = f.cloneNode(true).cloneNode(true).lastChild.checked;
      k(function() {
        var J = G.createElement("div");
        J.style.width = J.style.paddingLeft = "1px";
        G.body.appendChild(J);
        k.boxModel = k.support.boxModel = J.offsetWidth === 2;
        if ("zoom" in J.style) {
          J.style.display = "inline";
          J.style.zoom = 1;
          k.support.inlineBlockNeedsLayout = J.offsetWidth === 2;
          J.style.display = "";
          J.innerHTML = "<div style='width:4px;'></div>";
          k.support.shrinkWrapBlocks = J.offsetWidth !== 2
        }
        J.innerHTML = "<table><tr><td style='padding:0;display:none'></td><td>t</td></tr></table>";
        var L = J.getElementsByTagName("td");
        k.support.reliableHiddenOffsets = L[0].offsetHeight === 0;
        L[0].style.display = "";
        L[1].style.display = "none";
        k.support.reliableHiddenOffsets = k.support.reliableHiddenOffsets && L[0].offsetHeight === 0;
        J.innerHTML = "";
        G.body.removeChild(J).style.display = "none"
      });
      f = function(J) {
        var L = G.createElement("div");
        J = "on" + J;
        var R = J in L;
        if (!R) {
          L.setAttribute(J, "return;");
          R = typeof L[J] === "function"
        }
        return R
      };
      k.support.submitBubbles = f("submit");
      k.support.changeBubbles = f("change");
      f = h = n = r = u = null
    }
  })();
  k.props = {
    "for": "htmlFor",
    "class": "className",
    readonly: "readOnly",
    maxlength: "maxLength",
    cellspacing: "cellSpacing",
    rowspan: "rowSpan",
    colspan: "colSpan",
    tabindex: "tabIndex",
    usemap: "useMap",
    frameborder: "frameBorder"
  };
  var W = {}, ia = /^(?:\{.*\}|\[.*\])$/;
  k.extend({
    cache: {},
    uuid: 0,
    expando: "jQuery" + k.now(),
    noData: {
      embed: true,
      object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
      applet: true
    },
    data: function(f, h, n) {
      if (k.acceptData(f)) {
        f = f == e ? W : f;
        var o = f.nodeType,
          r = o ? f[k.expando] : null,
          u = k.cache;
        if (!(o && !r && typeof h === "string" && n === c)) {
          if (o) {
            r || (f[k.expando] = r = ++k.uuid)
          } else {
            u = f
          }
          if (typeof h === "object") {
            if (o) {
              u[r] = k.extend(u[r], h)
            } else {
              k.extend(u, h)
            }
          } else {
            if (o && !u[r]) {
              u[r] = {}
            }
          }
          f = o ? u[r] : u;
          if (n !== c) {
            f[h] = n
          }
          return typeof h === "string" ? f[h] : f
        }
      }
    },
    removeData: function(f, h) {
      if (k.acceptData(f)) {
        f = f == e ? W : f;
        var n = f.nodeType,
          o = n ? f[k.expando] : f,
          r = k.cache,
          u = n ? r[o] : o;
        if (h) {
          if (u) {
            delete u[h];
            n && k.isEmptyObject(u) && k.removeData(f)
          }
        } else {
          if (n && k.support.deleteExpando) {
            delete f[k.expando]
          } else {
            if (f.removeAttribute) {
              f.removeAttribute(k.expando)
            } else {
              if (n) {
                delete r[o]
              } else {
                for (var x in f) {
                  delete f[x]
                }
              }
            }
          }
        }
      }
    },
    acceptData: function(f) {
      if (f.nodeName) {
        var h = k.noData[f.nodeName.toLowerCase()];
        if (h) {
          return !(h === true || f.getAttribute("classid") !== h)
        }
      }
      return true
    }
  });
  k.fn.extend({
    data: function(f, h) {
      if (typeof f === "undefined") {
        return this.length ? k.data(this[0]) : null
      } else {
        if (typeof f === "object") {
          return this.each(function() {
            k.data(this, f)
          })
        }
      }
      var n = f.split(".");
      n[1] = n[1] ? "." + n[1] : "";
      if (h === c) {
        var o = this.triggerHandler("getData" + n[1] + "!", [n[0]]);
        if (o === c && this.length) {
          o = k.data(this[0], f);
          if (o === c && this[0].nodeType === 1) {
            o = this[0].getAttribute("data-" + f);
            if (typeof o === "string") {
              try {
                o = o === "true" ? true : o === "false" ? false : o === "null" ? null : !k.isNaN(o) ? parseFloat(o) : ia.test(o) ? k.parseJSON(o) : o
              } catch (r) {}
            } else {
              o = c
            }
          }
        }
        return o === c && n[1] ? this.data(n[0]) : o
      } else {
        return this.each(function() {
          var u = k(this),
            x = [n[0], h];
          u.triggerHandler("setData" + n[1] + "!", x);
          k.data(this, f, h);
          u.triggerHandler("changeData" + n[1] + "!", x)
        })
      }
    },
    removeData: function(f) {
      return this.each(function() {
        k.removeData(this, f)
      })
    }
  });
  k.extend({
    queue: function(f, h, n) {
      if (f) {
        h = (h || "fx") + "queue";
        var o = k.data(f, h);
        if (!n) {
          return o || []
        }
        if (!o || k.isArray(n)) {
          o = k.data(f, h, k.makeArray(n))
        } else {
          o.push(n)
        }
        return o
      }
    },
    dequeue: function(f, h) {
      h = h || "fx";
      var n = k.queue(f, h),
        o = n.shift();
      if (o === "inprogress") {
        o = n.shift()
      }
      if (o) {
        h === "fx" && n.unshift("inprogress");
        o.call(f, function() {
          k.dequeue(f, h)
        })
      }
    }
  });
  k.fn.extend({
    queue: function(f, h) {
      if (typeof f !== "string") {
        h = f;
        f = "fx"
      }
      if (h === c) {
        return k.queue(this[0], f)
      }
      return this.each(function() {
        var n = k.queue(this, f, h);
        f === "fx" && n[0] !== "inprogress" && k.dequeue(this, f)
      })
    },
    dequeue: function(f) {
      return this.each(function() {
        k.dequeue(this, f)
      })
    },
    delay: function(f, h) {
      f = k.fx ? k.fx.speeds[f] || f : f;
      h = h || "fx";
      return this.queue(h, function() {
        var n = this;
        setTimeout(function() {
          k.dequeue(n, h)
        }, f)
      })
    },
    clearQueue: function(f) {
      return this.queue(f || "fx", [])
    }
  });
  var ga = /[\n\t]/g,
    ba = /\s+/,
    ja = /\r/g,
    pa = /^(?:href|src|style)$/,
    za = /^(?:button|input)$/i,
    qa = /^(?:button|input|object|select|textarea)$/i,
    ta = /^a(?:rea)?$/i,
    ua = /^(?:radio|checkbox)$/i;
  k.fn.extend({
    attr: function(f, h) {
      return k.access(this, f, h, true, k.attr)
    },
    removeAttr: function(f) {
      return this.each(function() {
        k.attr(this, f, "");
        this.nodeType === 1 && this.removeAttribute(f)
      })
    },
    addClass: function(f) {
      if (k.isFunction(f)) {
        return this.each(function(J) {
          var L = k(this);
          L.addClass(f.call(this, J, L.attr("class")))
        })
      }
      if (f && typeof f === "string") {
        for (var h = (f || "").split(ba), n = 0, o = this.length; n < o; n++) {
          var r = this[n];
          if (r.nodeType === 1) {
            if (r.className) {
              for (var u = " " + r.className + " ", x = r.className, z = 0, C = h.length; z < C; z++) {
                if (u.indexOf(" " + h[z] + " ") < 0) {
                  x += " " + h[z]
                }
              }
              r.className = k.trim(x)
            } else {
              r.className = f
            }
          }
        }
      }
      return this
    },
    removeClass: function(f) {
      if (k.isFunction(f)) {
        return this.each(function(C) {
          var J = k(this);
          J.removeClass(f.call(this, C, J.attr("class")))
        })
      }
      if (f && typeof f === "string" || f === c) {
        for (var h = (f || "").split(ba), n = 0, o = this.length; n < o; n++) {
          var r = this[n];
          if (r.nodeType === 1 && r.className) {
            if (f) {
              for (var u = (" " + r.className + " ").replace(ga, " "), x = 0, z = h.length; x < z; x++) {
                u = u.replace(" " + h[x] + " ", " ")
              }
              r.className = k.trim(u)
            } else {
              r.className = ""
            }
          }
        }
      }
      return this
    },
    toggleClass: function(f, h) {
      var n = typeof f,
        o = typeof h === "boolean";
      if (k.isFunction(f)) {
        return this.each(function(r) {
          var u = k(this);
          u.toggleClass(f.call(this, r, u.attr("class"), h), h)
        })
      }
      return this.each(function() {
        if (n === "string") {
          for (var r, u = 0, x = k(this), z = h, C = f.split(ba); r = C[u++];) {
            z = o ? z : !x.hasClass(r);
            x[z ? "addClass" : "removeClass"](r)
          }
        } else {
          if (n === "undefined" || n === "boolean") {
            this.className && k.data(this, "__className__", this.className);
            this.className = this.className || f === false ? "" : k.data(this, "__className__") || ""
          }
        }
      })
    },
    hasClass: function(f) {
      f = " " + f + " ";
      for (var h = 0, n = this.length; h < n; h++) {
        if ((" " + this[h].className + " ").replace(ga, " ").indexOf(f) > -1) {
          return true
        }
      }
      return false
    },
    val: function(f) {
      if (!arguments.length) {
        var h = this[0];
        if (h) {
          if (k.nodeName(h, "option")) {
            var n = h.attributes.value;
            return !n || n.specified ? h.value : h.text
          }
          if (k.nodeName(h, "select")) {
            var o = h.selectedIndex;
            n = [];
            var r = h.options;
            h = h.type === "select-one";
            if (o < 0) {
              return null
            }
            var u = h ? o : 0;
            for (o = h ? o + 1 : r.length; u < o; u++) {
              var x = r[u];
              if (x.selected && (k.support.optDisabled ? !x.disabled : x.getAttribute("disabled") === null) && (!x.parentNode.disabled || !k.nodeName(x.parentNode, "optgroup"))) {
                f = k(x).val();
                if (h) {
                  return f
                }
                n.push(f)
              }
            }
            return n
          }
          if (ua.test(h.type) && !k.support.checkOn) {
            return h.getAttribute("value") === null ? "on" : h.value
          }
          return (h.value || "").replace(ja, "")
        }
        return c
      }
      var z = k.isFunction(f);
      return this.each(function(C) {
        var J = k(this),
          L = f;
        if (this.nodeType === 1) {
          if (z) {
            L = f.call(this, C, J.val())
          }
          if (L == null) {
            L = ""
          } else {
            if (typeof L === "number") {
              L += ""
            } else {
              if (k.isArray(L)) {
                L = k.map(L, function(U) {
                  return U == null ? "" : U + ""
                })
              }
            }
          }
          if (k.isArray(L) && ua.test(this.type)) {
            this.checked = k.inArray(J.val(), L) >= 0
          } else {
            if (k.nodeName(this, "select")) {
              var R = k.makeArray(L);
              k("option", this).each(function() {
                this.selected = k.inArray(k(this).val(), R) >= 0
              });
              if (!R.length) {
                this.selectedIndex = -1
              }
            } else {
              this.value = L
            }
          }
        }
      })
    }
  });
  k.extend({
    attrFn: {
      val: true,
      css: true,
      html: true,
      text: true,
      data: true,
      width: true,
      height: true,
      offset: true
    },
    attr: function(f, h, n, o) {
      if (!f || f.nodeType === 3 || f.nodeType === 8) {
        return c
      }
      if (o && h in k.attrFn) {
        return k(f)[h](n)
      }
      o = f.nodeType !== 1 || !k.isXMLDoc(f);
      var r = n !== c;
      h = o && k.props[h] || h;
      if (f.nodeType === 1) {
        var u = pa.test(h);
        if ((h in f || f[h] !== c) && o && !u) {
          if (r) {
            h === "type" && za.test(f.nodeName) && f.parentNode && k.error("type property can't be changed");
            if (n === null) {
              f.nodeType === 1 && f.removeAttribute(h)
            } else {
              f[h] = n
            }
          }
          if (k.nodeName(f, "form") && f.getAttributeNode(h)) {
            return f.getAttributeNode(h).nodeValue
          }
          if (h === "tabIndex") {
            return (h = f.getAttributeNode("tabIndex")) && h.specified ? h.value : qa.test(f.nodeName) || ta.test(f.nodeName) && f.href ? 0 : c
          }
          return f[h]
        }
        if (!k.support.style && o && h === "style") {
          if (r) {
            f.style.cssText = "" + n
          }
          return f.style.cssText
        }
        r && f.setAttribute(h, "" + n);
        if (!f.attributes[h] && f.hasAttribute && !f.hasAttribute(h)) {
          return c
        }
        f = !k.support.hrefNormalized && o && u ? f.getAttribute(h, 2) : f.getAttribute(h);
        return f === null ? c : f
      }
    }
  });
  var la = /\.(.*)$/,
    ra = /^(?:textarea|input|select)$/i,
    sa = /\./g,
    va = / /g,
    Za = /[^\w\s.|`]/g,
    $a = function(f) {
      return f.replace(Za, "\\$&")
    }, Ha = {
      focusin: 0,
      focusout: 0
    };
  k.event = {
    add: function(f, h, n, o) {
      if (!(f.nodeType === 3 || f.nodeType === 8)) {
        if (k.isWindow(f) && f !== e && !f.frameElement) {
          f = e
        }
        if (n === false) {
          n = a
        }
        var r, u;
        if (n.handler) {
          r = n;
          n = r.handler
        }
        if (!n.guid) {
          n.guid = k.guid++
        }
        if (u = k.data(f)) {
          var x = f.nodeType ? "events" : "__events__",
            z = u[x],
            C = u.handle;
          if (typeof z === "function") {
            C = z.handle;
            z = z.events
          } else {
            if (!z) {
              f.nodeType || (u[x] = u = function() {});
              u.events = z = {}
            }
          }
          if (!C) {
            u.handle = C = function() {
              return typeof k !== "undefined" && !k.event.triggered ? k.event.handle.apply(C.elem, arguments) : c
            }
          }
          C.elem = f;
          h = h.split(" ");
          for (var J = 0, L; x = h[J++];) {
            u = r ? k.extend({}, r) : {
              handler: n,
              data: o
            };
            if (x.indexOf(".") > -1) {
              L = x.split(".");
              x = L.shift();
              u.namespace = L.slice(0).sort().join(".")
            } else {
              L = [];
              u.namespace = ""
            }
            u.type = x;
            if (!u.guid) {
              u.guid = n.guid
            }
            var R = z[x],
              U = k.event.special[x] || {};
            if (!R) {
              R = z[x] = [];
              if (!U.setup || U.setup.call(f, o, L, C) === false) {
                if (f.addEventListener) {
                  f.addEventListener(x, C, false)
                } else {
                  f.attachEvent && f.attachEvent("on" + x, C)
                }
              }
            }
            if (U.add) {
              U.add.call(f, u);
              if (!u.handler.guid) {
                u.handler.guid = n.guid
              }
            }
            R.push(u);
            k.event.global[x] = true
          }
          f = null
        }
      }
    },
    global: {},
    remove: function(f, h, n, o) {
      if (!(f.nodeType === 3 || f.nodeType === 8)) {
        if (n === false) {
          n = a
        }
        var r, u, x = 0,
          z, C, J, L, R, U, Z = f.nodeType ? "events" : "__events__",
          N = k.data(f),
          Y = N && N[Z];
        if (N && Y) {
          if (typeof Y === "function") {
            N = Y;
            Y = Y.events
          }
          if (h && h.type) {
            n = h.handler;
            h = h.type
          }
          if (!h || typeof h === "string" && h.charAt(0) === ".") {
            h = h || "";
            for (r in Y) {
              k.event.remove(f, r + h)
            }
          } else {
            for (h = h.split(" "); r = h[x++];) {
              L = r;
              z = r.indexOf(".") < 0;
              C = [];
              if (!z) {
                C = r.split(".");
                r = C.shift();
                J = RegExp("(^|\\.)" + k.map(C.slice(0).sort(), $a).join("\\.(?:.*\\.)?") + "(\\.|$)")
              }
              if (R = Y[r]) {
                if (n) {
                  L = k.event.special[r] || {};
                  for (u = o || 0; u < R.length; u++) {
                    U = R[u];
                    if (n.guid === U.guid) {
                      if (z || J.test(U.namespace)) {
                        o == null && R.splice(u--, 1);
                        L.remove && L.remove.call(f, U)
                      }
                      if (o != null) {
                        break
                      }
                    }
                  }
                  if (R.length === 0 || o != null && R.length === 1) {
                    if (!L.teardown || L.teardown.call(f, C) === false) {
                      k.removeEvent(f, r, N.handle)
                    }
                    delete Y[r]
                  }
                } else {
                  for (u = 0; u < R.length; u++) {
                    U = R[u];
                    if (z || J.test(U.namespace)) {
                      k.event.remove(f, L, U.handler, u);
                      R.splice(u--, 1)
                    }
                  }
                }
              }
            }
            if (k.isEmptyObject(Y)) {
              if (h = N.handle) {
                h.elem = null
              }
              delete N.events;
              delete N.handle;
              if (typeof N === "function") {
                k.removeData(f, Z)
              } else {
                k.isEmptyObject(N) && k.removeData(f)
              }
            }
          }
        }
      }
    },
    trigger: function(f, h, n, o) {
      var r = f.type || f;
      if (!o) {
        f = typeof f === "object" ? f[k.expando] ? f : k.extend(k.Event(r), f) : k.Event(r);
        if (r.indexOf("!") >= 0) {
          f.type = r = r.slice(0, -1);
          f.exclusive = true
        }
        if (!n) {
          f.stopPropagation();
          k.event.global[r] && k.each(k.cache, function() {
            this.events && this.events[r] && k.event.trigger(f, h, this.handle.elem)
          })
        }
        if (!n || n.nodeType === 3 || n.nodeType === 8) {
          return c
        }
        f.result = c;
        f.target = n;
        h = k.makeArray(h);
        h.unshift(f)
      }
      f.currentTarget = n;
      (o = n.nodeType ? k.data(n, "handle") : (k.data(n, "__events__") || {}).handle) && o.apply(n, h);
      o = n.parentNode || n.ownerDocument;
      try {
        if (!(n && n.nodeName && k.noData[n.nodeName.toLowerCase()])) {
          if (n["on" + r] && n["on" + r].apply(n, h) === false) {
            f.result = false;
            f.preventDefault()
          }
        }
      } catch (u) {}
      if (!f.isPropagationStopped() && o) {
        k.event.trigger(f, h, o, true)
      } else {
        if (!f.isDefaultPrevented()) {
          o = f.target;
          var x, z = r.replace(la, ""),
            C = k.nodeName(o, "a") && z === "click",
            J = k.event.special[z] || {};
          if ((!J._default || J._default.call(n, f) === false) && !C && !(o && o.nodeName && k.noData[o.nodeName.toLowerCase()])) {
            try {
              if (o[z]) {
                if (x = o["on" + z]) {
                  o["on" + z] = null
                }
                k.event.triggered = true;
                o[z]()
              }
            } catch (L) {}
            if (x) {
              o["on" + z] = x
            }
            k.event.triggered = false
          }
        }
      }
    },
    handle: function(f) {
      var h, n, o;
      n = [];
      var r, u = k.makeArray(arguments);
      f = u[0] = k.event.fix(f || e.event);
      f.currentTarget = this;
      h = f.type.indexOf(".") < 0 && !f.exclusive;
      if (!h) {
        o = f.type.split(".");
        f.type = o.shift();
        n = o.slice(0).sort();
        o = RegExp("(^|\\.)" + n.join("\\.(?:.*\\.)?") + "(\\.|$)")
      }
      f.namespace = f.namespace || n.join(".");
      r = k.data(this, this.nodeType ? "events" : "__events__");
      if (typeof r === "function") {
        r = r.events
      }
      n = (r || {})[f.type];
      if (r && n) {
        n = n.slice(0);
        r = 0;
        for (var x = n.length; r < x; r++) {
          var z = n[r];
          if (h || o.test(z.namespace)) {
            f.handler = z.handler;
            f.data = z.data;
            f.handleObj = z;
            z = z.handler.apply(this, u);
            if (z !== c) {
              f.result = z;
              if (z === false) {
                f.preventDefault();
                f.stopPropagation()
              }
            }
            if (f.isImmediatePropagationStopped()) {
              break
            }
          }
        }
      }
      return f.result
    },
    props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
    fix: function(f) {
      if (f[k.expando]) {
        return f
      }
      var h = f;
      f = k.Event(h);
      for (var n = this.props.length, o; n;) {
        o = this.props[--n];
        f[o] = h[o]
      }
      if (!f.target) {
        f.target = f.srcElement || G
      }
      if (f.target.nodeType === 3) {
        f.target = f.target.parentNode
      }
      if (!f.relatedTarget && f.fromElement) {
        f.relatedTarget = f.fromElement === f.target ? f.toElement : f.fromElement
      }
      if (f.pageX == null && f.clientX != null) {
        h = G.documentElement;
        n = G.body;
        f.pageX = f.clientX + (h && h.scrollLeft || n && n.scrollLeft || 0) - (h && h.clientLeft || n && n.clientLeft || 0);
        f.pageY = f.clientY + (h && h.scrollTop || n && n.scrollTop || 0) - (h && h.clientTop || n && n.clientTop || 0)
      }
      if (f.which == null && (f.charCode != null || f.keyCode != null)) {
        f.which = f.charCode != null ? f.charCode : f.keyCode
      }
      if (!f.metaKey && f.ctrlKey) {
        f.metaKey = f.ctrlKey
      }
      if (!f.which && f.button !== c) {
        f.which = f.button & 1 ? 1 : f.button & 2 ? 3 : f.button & 4 ? 2 : 0
      }
      return f
    },
    guid: 1E8,
    proxy: k.proxy,
    special: {
      ready: {
        setup: k.bindReady,
        teardown: k.noop
      },
      live: {
        add: function(f) {
          k.event.add(this, m(f.origType, f.selector), k.extend({}, f, {
            handler: g,
            guid: f.handler.guid
          }))
        },
        remove: function(f) {
          k.event.remove(this, m(f.origType, f.selector), f)
        }
      },
      beforeunload: {
        setup: function(f, h, n) {
          if (k.isWindow(this)) {
            this.onbeforeunload = n
          }
        },
        teardown: function(f, h) {
          if (this.onbeforeunload === h) {
            this.onbeforeunload = null
          }
        }
      }
    }
  };
  k.removeEvent = G.removeEventListener ? function(f, h, n) {
    f.removeEventListener && f.removeEventListener(h, n, false)
  } : function(f, h, n) {
    f.detachEvent && f.detachEvent("on" + h, n)
  };
  k.Event = function(f) {
    if (!this.preventDefault) {
      return new k.Event(f)
    }
    if (f && f.type) {
      this.originalEvent = f;
      this.type = f.type
    } else {
      this.type = f
    }
    this.timeStamp = k.now();
    this[k.expando] = true
  };
  k.Event.prototype = {
    preventDefault: function() {
      this.isDefaultPrevented = b;
      var f = this.originalEvent;
      if (f) {
        if (f.preventDefault) {
          f.preventDefault()
        } else {
          f.returnValue = false
        }
      }
    },
    stopPropagation: function() {
      this.isPropagationStopped = b;
      var f = this.originalEvent;
      if (f) {
        f.stopPropagation && f.stopPropagation();
        f.cancelBubble = true
      }
    },
    stopImmediatePropagation: function() {
      this.isImmediatePropagationStopped = b;
      this.stopPropagation()
    },
    isDefaultPrevented: a,
    isPropagationStopped: a,
    isImmediatePropagationStopped: a
  };
  var Ia = function(f) {
    var h = f.relatedTarget;
    try {
      for (; h && h !== this;) {
        h = h.parentNode
      }
      if (h !== this) {
        f.type = f.data;
        k.event.handle.apply(this, arguments)
      }
    } catch (n) {}
  }, Ja = function(f) {
      f.type = f.data;
      k.event.handle.apply(this, arguments)
    };
  k.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout"
  }, function(f, h) {
    k.event.special[f] = {
      setup: function(n) {
        k.event.add(this, h, n && n.selector ? Ja : Ia, f)
      },
      teardown: function(n) {
        k.event.remove(this, h, n && n.selector ? Ja : Ia)
      }
    }
  });
  if (!k.support.submitBubbles) {
    k.event.special.submit = {
      setup: function() {
        if (this.nodeName.toLowerCase() !== "form") {
          k.event.add(this, "click.specialSubmit", function(f) {
            var h = f.target,
              n = h.type;
            if ((n === "submit" || n === "image") && k(h).closest("form").length) {
              f.liveFired = c;
              return d("submit", this, arguments)
            }
          });
          k.event.add(this, "keypress.specialSubmit", function(f) {
            var h = f.target,
              n = h.type;
            if ((n === "text" || n === "password") && k(h).closest("form").length && f.keyCode === 13) {
              f.liveFired = c;
              return d("submit", this, arguments)
            }
          })
        } else {
          return false
        }
      },
      teardown: function() {
        k.event.remove(this, ".specialSubmit")
      }
    }
  }
  if (!k.support.changeBubbles) {
    var xa, Ka = function(f) {
        var h = f.type,
          n = f.value;
        if (h === "radio" || h === "checkbox") {
          n = f.checked
        } else {
          if (h === "select-multiple") {
            n = f.selectedIndex > -1 ? k.map(f.options, function(o) {
              return o.selected
            }).join("-") : ""
          } else {
            if (f.nodeName.toLowerCase() === "select") {
              n = f.selectedIndex
            }
          }
        }
        return n
      }, Aa = function(f, h) {
        var n = f.target,
          o, r;
        if (!(!ra.test(n.nodeName) || n.readOnly)) {
          o = k.data(n, "_change_data");
          r = Ka(n);
          if (f.type !== "focusout" || n.type !== "radio") {
            k.data(n, "_change_data", r)
          }
          if (!(o === c || r === o)) {
            if (o != null || r) {
              f.type = "change";
              f.liveFired = c;
              return k.event.trigger(f, h, n)
            }
          }
        }
      };
    k.event.special.change = {
      filters: {
        focusout: Aa,
        beforedeactivate: Aa,
        click: function(f) {
          var h = f.target,
            n = h.type;
          if (n === "radio" || n === "checkbox" || h.nodeName.toLowerCase() === "select") {
            return Aa.call(this, f)
          }
        },
        keydown: function(f) {
          var h = f.target,
            n = h.type;
          if (f.keyCode === 13 && h.nodeName.toLowerCase() !== "textarea" || f.keyCode === 32 && (n === "checkbox" || n === "radio") || n === "select-multiple") {
            return Aa.call(this, f)
          }
        },
        beforeactivate: function(f) {
          f = f.target;
          k.data(f, "_change_data", Ka(f))
        }
      },
      setup: function() {
        if (this.type === "file") {
          return false
        }
        for (var f in xa) {
          k.event.add(this, f + ".specialChange", xa[f])
        }
        return ra.test(this.nodeName)
      },
      teardown: function() {
        k.event.remove(this, ".specialChange");
        return ra.test(this.nodeName)
      }
    };
    xa = k.event.special.change.filters;
    xa.focus = xa.beforeactivate
  }
  G.addEventListener && k.each({
    focus: "focusin",
    blur: "focusout"
  }, function(f, h) {
    function n(o) {
      o = k.event.fix(o);
      o.type = h;
      return k.event.trigger(o, null, o.target)
    }
    k.event.special[h] = {
      setup: function() {
        Ha[h]++ === 0 && G.addEventListener(f, n, true)
      },
      teardown: function() {
        --Ha[h] === 0 && G.removeEventListener(f, n, true)
      }
    }
  });
  k.each(["bind", "one"], function(f, h) {
    k.fn[h] = function(n, o, r) {
      if (typeof n === "object") {
        for (var u in n) {
          this[h](u, o, n[u], r)
        }
        return this
      }
      if (k.isFunction(o) || o === false) {
        r = o;
        o = c
      }
      var x = h === "one" ? k.proxy(r, function(C) {
        k(this).unbind(C, x);
        return r.apply(this, arguments)
      }) : r;
      if (n === "unload" && h !== "one") {
        this.one(n, o, r)
      } else {
        u = 0;
        for (var z = this.length; u < z; u++) {
          k.event.add(this[u], n, x, o)
        }
      }
      return this
    }
  });
  k.fn.extend({
    unbind: function(f, h) {
      if (typeof f === "object" && !f.preventDefault) {
        for (var n in f) {
          this.unbind(n, f[n])
        }
      } else {
        n = 0;
        for (var o = this.length; n < o; n++) {
          k.event.remove(this[n], f, h)
        }
      }
      return this
    },
    delegate: function(f, h, n, o) {
      return this.live(h, n, o, f)
    },
    undelegate: function(f, h, n) {
      return arguments.length === 0 ? this.unbind("live") : this.die(h, null, n, f)
    },
    trigger: function(f, h) {
      return this.each(function() {
        k.event.trigger(f, h, this)
      })
    },
    triggerHandler: function(f, h) {
      if (this[0]) {
        var n = k.Event(f);
        n.preventDefault();
        n.stopPropagation();
        k.event.trigger(n, h, this[0]);
        return n.result
      }
    },
    toggle: function(f) {
      for (var h = arguments, n = 1; n < h.length;) {
        k.proxy(f, h[n++])
      }
      return this.click(k.proxy(f, function(o) {
        var r = (k.data(this, "lastToggle" + f.guid) || 0) % n;
        k.data(this, "lastToggle" + f.guid, r + 1);
        o.preventDefault();
        return h[r].apply(this, arguments) || false
      }))
    },
    hover: function(f, h) {
      return this.mouseenter(f).mouseleave(h || f)
    }
  });
  var La = {
    focus: "focusin",
    blur: "focusout",
    mouseenter: "mouseover",
    mouseleave: "mouseout"
  };
  k.each(["live", "die"], function(f, h) {
    k.fn[h] = function(n, o, r, u) {
      var x, z = 0,
        C, J, L = u || this.selector;
      u = u ? this : k(this.context);
      if (typeof n === "object" && !n.preventDefault) {
        for (x in n) {
          u[h](x, o, n[x], L)
        }
        return this
      }
      if (k.isFunction(o)) {
        r = o;
        o = c
      }
      for (n = (n || "").split(" ");
      (x = n[z++]) != null;) {
        C = la.exec(x);
        J = "";
        if (C) {
          J = C[0];
          x = x.replace(la, "")
        }
        if (x === "hover") {
          n.push("mouseenter" + J, "mouseleave" + J)
        } else {
          C = x;
          if (x === "focus" || x === "blur") {
            n.push(La[x] + J);
            x += J
          } else {
            x = (La[x] || x) + J
          }
          if (h === "live") {
            J = 0;
            for (var R = u.length; J < R; J++) {
              k.event.add(u[J], "live." + m(x, L), {
                data: o,
                selector: L,
                handler: r,
                origType: x,
                origHandler: r,
                preType: C
              })
            }
          } else {
            u.unbind("live." + m(x, L), r)
          }
        }
      }
      return this
    }
  });
  k.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "), function(f, h) {
    k.fn[h] = function(n, o) {
      if (o == null) {
        o = n;
        n = null
      }
      return arguments.length > 0 ? this.bind(h, n, o) : this.trigger(h)
    };
    if (k.attrFn) {
      k.attrFn[h] = true
    }
  });
  e.attachEvent && !e.addEventListener && k(e).bind("unload", function() {
    for (var f in k.cache) {
      if (k.cache[f].handle) {
        try {
          k.event.remove(k.cache[f].handle.elem)
        } catch (h) {}
      }
    }
  });
  (function() {
    function f(t, w, D, B, E, F) {
      E = 0;
      for (var K = B.length; E < K; E++) {
        var O = B[E];
        if (O) {
          O = O[t];
          for (var T = false; O;) {
            if (O.sizcache === D) {
              T = B[O.sizset];
              break
            }
            if (O.nodeType === 1 && !F) {
              O.sizcache = D;
              O.sizset = E
            }
            if (O.nodeName.toLowerCase() === w) {
              T = O;
              break
            }
            O = O[t]
          }
          B[E] = T
        }
      }
    }

    function h(t, w, D, B, E, F) {
      E = 0;
      for (var K = B.length; E < K; E++) {
        var O = B[E];
        if (O) {
          O = O[t];
          for (var T = false; O;) {
            if (O.sizcache === D) {
              T = B[O.sizset];
              break
            }
            if (O.nodeType === 1) {
              if (!F) {
                O.sizcache = D;
                O.sizset = E
              }
              if (typeof w !== "string") {
                if (O === w) {
                  T = true;
                  break
                }
              } else {
                if (z.filter(w, [O]).length > 0) {
                  T = O;
                  break
                }
              }
            }
            O = O[t]
          }
          B[E] = T
        }
      }
    }
    var n = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
      o = 0,
      r = Object.prototype.toString,
      u = false,
      x = true;
    [0, 0].sort(function() {
      x = false;
      return 0
    });
    var z = function(t, w, D, B) {
      D = D || [];
      var E = w = w || G;
      if (w.nodeType !== 1 && w.nodeType !== 9) {
        return []
      }
      if (!t || typeof t !== "string") {
        return D
      }
      var F = [],
        K, O, T, ma, ha = true,
        oa = z.isXML(w),
        na = t,
        ea;
      do {
        n.exec("");
        if (K = n.exec(na)) {
          na = K[3];
          F.push(K[1]);
          if (K[2]) {
            ma = K[3];
            break
          }
        }
      } while (K);
      if (F.length > 1 && J.exec(t)) {
        if (F.length === 2 && C.relative[F[0]]) {
          O = fa(F[0] + F[1], w)
        } else {
          for (O = C.relative[F[0]] ? [w] : z(F.shift(), w); F.length;) {
            t = F.shift();
            if (C.relative[t]) {
              t += F.shift()
            }
            O = fa(t, O)
          }
        }
      } else {
        if (!B && F.length > 1 && w.nodeType === 9 && !oa && C.match.ID.test(F[0]) && !C.match.ID.test(F[F.length - 1])) {
          K = z.find(F.shift(), w, oa);
          w = K.expr ? z.filter(K.expr, K.set)[0] : K.set[0]
        }
        if (w) {
          K = B ? {
            expr: F.pop(),
            set: U(B)
          } : z.find(F.pop(), F.length === 1 && (F[0] === "~" || F[0] === "+") && w.parentNode ? w.parentNode : w, oa);
          O = K.expr ? z.filter(K.expr, K.set) : K.set;
          if (F.length > 0) {
            T = U(O)
          } else {
            ha = false
          }
          for (; F.length;) {
            K = ea = F.pop();
            if (C.relative[ea]) {
              K = F.pop()
            } else {
              ea = ""
            }
            if (K == null) {
              K = w
            }
            C.relative[ea](T, K, oa)
          }
        } else {
          T = []
        }
      }
      T || (T = O);
      T || z.error(ea || t);
      if (r.call(T) === "[object Array]") {
        if (ha) {
          if (w && w.nodeType === 1) {
            for (t = 0; T[t] != null; t++) {
              if (T[t] && (T[t] === true || T[t].nodeType === 1 && z.contains(w, T[t]))) {
                D.push(O[t])
              }
            }
          } else {
            for (t = 0; T[t] != null; t++) {
              T[t] && T[t].nodeType === 1 && D.push(O[t])
            }
          }
        } else {
          D.push.apply(D, T)
        }
      } else {
        U(T, D)
      }
      if (ma) {
        z(ma, E, D, B);
        z.uniqueSort(D)
      }
      return D
    };
    z.uniqueSort = function(t) {
      if (N) {
        u = x;
        t.sort(N);
        if (u) {
          for (var w = 1; w < t.length; w++) {
            t[w] === t[w - 1] && t.splice(w--, 1)
          }
        }
      }
      return t
    };
    z.matches = function(t, w) {
      return z(t, null, null, w)
    };
    z.matchesSelector = function(t, w) {
      return z(w, null, null, [t]).length > 0
    };
    z.find = function(t, w, D) {
      var B;
      if (!t) {
        return []
      }
      for (var E = 0, F = C.order.length; E < F; E++) {
        var K = C.order[E],
          O;
        if (O = C.leftMatch[K].exec(t)) {
          var T = O[1];
          O.splice(1, 1);
          if (T.substr(T.length - 1) !== "\\") {
            O[1] = (O[1] || "").replace(/\\/g, "");
            B = C.find[K](O, w, D);
            if (B != null) {
              t = t.replace(C.match[K], "");
              break
            }
          }
        }
      }
      B || (B = w.getElementsByTagName("*"));
      return {
        set: B,
        expr: t
      }
    };
    z.filter = function(t, w, D, B) {
      for (var E = t, F = [], K = w, O, T, ma = w && w[0] && z.isXML(w[0]); t && w.length;) {
        for (var ha in C.filter) {
          if ((O = C.leftMatch[ha].exec(t)) != null && O[2]) {
            var oa = C.filter[ha],
              na, ea;
            ea = O[1];
            T = false;
            O.splice(1, 1);
            if (ea.substr(ea.length - 1) !== "\\") {
              if (K === F) {
                F = []
              }
              if (C.preFilter[ha]) {
                if (O = C.preFilter[ha](O, K, D, F, B, ma)) {
                  if (O === true) {
                    continue
                  }
                } else {
                  T = na = true
                }
              }
              if (O) {
                for (var v = 0;
                (ea = K[v]) != null; v++) {
                  if (ea) {
                    na = oa(ea, O, v, K);
                    var I = B ^ !! na;
                    if (D && na != null) {
                      if (I) {
                        T = true
                      } else {
                        K[v] = false
                      }
                    } else {
                      if (I) {
                        F.push(ea);
                        T = true
                      }
                    }
                  }
                }
              }
              if (na !== c) {
                D || (K = F);
                t = t.replace(C.match[ha], "");
                if (!T) {
                  return []
                }
                break
              }
            }
          }
        }
        if (t === E) {
          if (T == null) {
            z.error(t)
          } else {
            break
          }
        }
        E = t
      }
      return K
    };
    z.error = function(t) {
      throw "Syntax error, unrecognized expression: " + t;
    };
    var C = z.selectors = {
      order: ["ID", "NAME", "TAG"],
      match: {
        ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
        CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
        NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
        ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
        TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
        CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/,
        POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
        PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
      },
      leftMatch: {},
      attrMap: {
        "class": "className",
        "for": "htmlFor"
      },
      attrHandle: {
        href: function(t) {
          return t.getAttribute("href")
        }
      },
      relative: {
        "+": function(t, w) {
          var D = typeof w === "string",
            B = D && !/\W/.test(w);
          D = D && !B;
          if (B) {
            w = w.toLowerCase()
          }
          B = 0;
          for (var E = t.length, F; B < E; B++) {
            if (F = t[B]) {
              for (;
              (F = F.previousSibling) && F.nodeType !== 1;) {}
              t[B] = D || F && F.nodeName.toLowerCase() === w ? F || false : F === w
            }
          }
          D && z.filter(w, t, true)
        },
        ">": function(t, w) {
          var D = typeof w === "string",
            B, E = 0,
            F = t.length;
          if (D && !/\W/.test(w)) {
            for (w = w.toLowerCase(); E < F; E++) {
              if (B = t[E]) {
                D = B.parentNode;
                t[E] = D.nodeName.toLowerCase() === w ? D : false
              }
            }
          } else {
            for (; E < F; E++) {
              if (B = t[E]) {
                t[E] = D ? B.parentNode : B.parentNode === w
              }
            }
            D && z.filter(w, t, true)
          }
        },
        "": function(t, w, D) {
          var B = o++,
            E = h,
            F;
          if (typeof w === "string" && !/\W/.test(w)) {
            F = w = w.toLowerCase();
            E = f
          }
          E("parentNode", w, B, t, F, D)
        },
        "~": function(t, w, D) {
          var B = o++,
            E = h,
            F;
          if (typeof w === "string" && !/\W/.test(w)) {
            F = w = w.toLowerCase();
            E = f
          }
          E("previousSibling", w, B, t, F, D)
        }
      },
      find: {
        ID: function(t, w, D) {
          if (typeof w.getElementById !== "undefined" && !D) {
            return (t = w.getElementById(t[1])) && t.parentNode ? [t] : []
          }
        },
        NAME: function(t, w) {
          if (typeof w.getElementsByName !== "undefined") {
            for (var D = [], B = w.getElementsByName(t[1]), E = 0, F = B.length; E < F; E++) {
              B[E].getAttribute("name") === t[1] && D.push(B[E])
            }
            return D.length === 0 ? null : D
          }
        },
        TAG: function(t, w) {
          return w.getElementsByTagName(t[1])
        }
      },
      preFilter: {
        CLASS: function(t, w, D, B, E, F) {
          t = " " + t[1].replace(/\\/g, "") + " ";
          if (F) {
            return t
          }
          F = 0;
          for (var K;
          (K = w[F]) != null; F++) {
            if (K) {
              if (E ^ (K.className && (" " + K.className + " ").replace(/[\t\n]/g, " ").indexOf(t) >= 0)) {
                D || B.push(K)
              } else {
                if (D) {
                  w[F] = false
                }
              }
            }
          }
          return false
        },
        ID: function(t) {
          return t[1].replace(/\\/g, "")
        },
        TAG: function(t) {
          return t[1].toLowerCase()
        },
        CHILD: function(t) {
          if (t[1] === "nth") {
            var w = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(t[2] === "even" && "2n" || t[2] === "odd" && "2n+1" || !/\D/.test(t[2]) && "0n+" + t[2] || t[2]);
            t[2] = w[1] + (w[2] || 1) - 0;
            t[3] = w[3] - 0
          }
          t[0] = o++;
          return t
        },
        ATTR: function(t, w, D, B, E, F) {
          w = t[1].replace(/\\/g, "");
          if (!F && C.attrMap[w]) {
            t[1] = C.attrMap[w]
          }
          if (t[2] === "~=") {
            t[4] = " " + t[4] + " "
          }
          return t
        },
        PSEUDO: function(t, w, D, B, E) {
          if (t[1] === "not") {
            if ((n.exec(t[3]) || "").length > 1 || /^\w/.test(t[3])) {
              t[3] = z(t[3], null, null, w)
            } else {
              t = z.filter(t[3], w, D, true ^ E);
              D || B.push.apply(B, t);
              return false
            }
          } else {
            if (C.match.POS.test(t[0]) || C.match.CHILD.test(t[0])) {
              return true
            }
          }
          return t
        },
        POS: function(t) {
          t.unshift(true);
          return t
        }
      },
      filters: {
        enabled: function(t) {
          return t.disabled === false && t.type !== "hidden"
        },
        disabled: function(t) {
          return t.disabled === true
        },
        checked: function(t) {
          return t.checked === true
        },
        selected: function(t) {
          return t.selected === true
        },
        parent: function(t) {
          return !!t.firstChild
        },
        empty: function(t) {
          return !t.firstChild
        },
        has: function(t, w, D) {
          return !!z(D[3], t).length
        },
        header: function(t) {
          return /h\d/i.test(t.nodeName)
        },
        text: function(t) {
          return "text" === t.type
        },
        radio: function(t) {
          return "radio" === t.type
        },
        checkbox: function(t) {
          return "checkbox" === t.type
        },
        file: function(t) {
          return "file" === t.type
        },
        password: function(t) {
          return "password" === t.type
        },
        submit: function(t) {
          return "submit" === t.type
        },
        image: function(t) {
          return "image" === t.type
        },
        reset: function(t) {
          return "reset" === t.type
        },
        button: function(t) {
          return "button" === t.type || t.nodeName.toLowerCase() === "button"
        },
        input: function(t) {
          return /input|select|textarea|button/i.test(t.nodeName)
        }
      },
      setFilters: {
        first: function(t, w) {
          return w === 0
        },
        last: function(t, w, D, B) {
          return w === B.length - 1
        },
        even: function(t, w) {
          return w % 2 === 0
        },
        odd: function(t, w) {
          return w % 2 === 1
        },
        lt: function(t, w, D) {
          return w < D[3] - 0
        },
        gt: function(t, w, D) {
          return w > D[3] - 0
        },
        nth: function(t, w, D) {
          return D[3] - 0 === w
        },
        eq: function(t, w, D) {
          return D[3] - 0 === w
        }
      },
      filter: {
        PSEUDO: function(t, w, D, B) {
          var E = w[1],
            F = C.filters[E];
          if (F) {
            return F(t, D, w, B)
          } else {
            if (E === "contains") {
              return (t.textContent || t.innerText || z.getText([t]) || "").indexOf(w[3]) >= 0
            } else {
              if (E === "not") {
                w = w[3];
                D = 0;
                for (B = w.length; D < B; D++) {
                  if (w[D] === t) {
                    return false
                  }
                }
                return true
              } else {
                z.error("Syntax error, unrecognized expression: " + E)
              }
            }
          }
        },
        CHILD: function(t, w) {
          var D = w[1],
            B = t;
          switch (D) {
            case "only":
              ;
            case "first":
              for (; B = B.previousSibling;) {
                if (B.nodeType === 1) {
                  return false
                }
              }
              if (D === "first") {
                return true
              }
              B = t;
            case "last":
              for (; B = B.nextSibling;) {
                if (B.nodeType === 1) {
                  return false
                }
              }
              return true;
            case "nth":
              D = w[2];
              var E = w[3];
              if (D === 1 && E === 0) {
                return true
              }
              var F = w[0],
                K = t.parentNode;
              if (K && (K.sizcache !== F || !t.nodeIndex)) {
                var O = 0;
                for (B = K.firstChild; B; B = B.nextSibling) {
                  if (B.nodeType === 1) {
                    B.nodeIndex = ++O
                  }
                }
                K.sizcache = F
              }
              B = t.nodeIndex - E;
              return D === 0 ? B === 0 : B % D === 0 && B / D >= 0
          }
        },
        ID: function(t, w) {
          return t.nodeType === 1 && t.getAttribute("id") === w
        },
        TAG: function(t, w) {
          return w === "*" && t.nodeType === 1 || t.nodeName.toLowerCase() === w
        },
        CLASS: function(t, w) {
          return (" " + (t.className || t.getAttribute("class")) + " ").indexOf(w) > -1
        },
        ATTR: function(t, w) {
          var D = w[1];
          D = C.attrHandle[D] ? C.attrHandle[D](t) : t[D] != null ? t[D] : t.getAttribute(D);
          var B = D + "",
            E = w[2],
            F = w[4];
          return D == null ? E === "!=" : E === "=" ? B === F : E === "*=" ? B.indexOf(F) >= 0 : E === "~=" ? (" " + B + " ").indexOf(F) >= 0 : !F ? B && D !== false : E === "!=" ? B !== F : E === "^=" ? B.indexOf(F) === 0 : E === "$=" ? B.substr(B.length - F.length) === F : E === "|=" ? B === F || B.substr(0, F.length + 1) === F + "-" : false
        },
        POS: function(t, w, D, B) {
          var E = C.setFilters[w[2]];
          if (E) {
            return E(t, D, w, B)
          }
        }
      }
    }, J = C.match.POS,
      L = function(t, w) {
        return "\\" + (w - 0 + 1)
      }, R;
    for (R in C.match) {
      C.match[R] = RegExp(C.match[R].source + /(?![^\[]*\])(?![^\(]*\))/.source);
      C.leftMatch[R] = RegExp(/(^(?:.|\r|\n)*?)/.source + C.match[R].source.replace(/\\(\d+)/g, L))
    }
    var U = function(t, w) {
      t = Array.prototype.slice.call(t, 0);
      if (w) {
        w.push.apply(w, t);
        return w
      }
      return t
    };
    try {
      Array.prototype.slice.call(G.documentElement.childNodes, 0)
    } catch (Z) {
      U = function(t, w) {
        var D = w || [],
          B = 0;
        if (r.call(t) === "[object Array]") {
          Array.prototype.push.apply(D, t)
        } else {
          if (typeof t.length === "number") {
            for (var E = t.length; B < E; B++) {
              D.push(t[B])
            }
          } else {
            for (; t[B]; B++) {
              D.push(t[B])
            }
          }
        }
        return D
      }
    }
    var N, Y;
    if (G.documentElement.compareDocumentPosition) {
      N = function(t, w) {
        if (t === w) {
          u = true;
          return 0
        }
        if (!t.compareDocumentPosition || !w.compareDocumentPosition) {
          return t.compareDocumentPosition ? -1 : 1
        }
        return t.compareDocumentPosition(w) & 4 ? -1 : 1
      }
    } else {
      N = function(t, w) {
        var D = [],
          B = [],
          E = t.parentNode,
          F = w.parentNode,
          K = E;
        if (t === w) {
          u = true;
          return 0
        } else {
          if (E === F) {
            return Y(t, w)
          } else {
            if (E) {
              if (!F) {
                return 1
              }
            } else {
              return -1
            }
          }
        }
        for (; K;) {
          D.unshift(K);
          K = K.parentNode
        }
        for (K = F; K;) {
          B.unshift(K);
          K = K.parentNode
        }
        E = D.length;
        F = B.length;
        for (K = 0; K < E && K < F; K++) {
          if (D[K] !== B[K]) {
            return Y(D[K], B[K])
          }
        }
        return K === E ? Y(t, B[K], -1) : Y(D[K], w, 1)
      };
      Y = function(t, w, D) {
        if (t === w) {
          return D
        }
        for (t = t.nextSibling; t;) {
          if (t === w) {
            return -1
          }
          t = t.nextSibling
        }
        return 1
      }
    }
    z.getText = function(t) {
      for (var w = "", D, B = 0; t[B]; B++) {
        D = t[B];
        if (D.nodeType === 3 || D.nodeType === 4) {
          w += D.nodeValue
        } else {
          if (D.nodeType !== 8) {
            w += z.getText(D.childNodes)
          }
        }
      }
      return w
    };
    (function() {
      var t = G.createElement("div"),
        w = "script" + (new Date).getTime();
      t.innerHTML = "<a name='" + w + "'/>";
      var D = G.documentElement;
      D.insertBefore(t, D.firstChild);
      if (G.getElementById(w)) {
        C.find.ID = function(B, E, F) {
          if (typeof E.getElementById !== "undefined" && !F) {
            return (E = E.getElementById(B[1])) ? E.id === B[1] || typeof E.getAttributeNode !== "undefined" && E.getAttributeNode("id").nodeValue === B[1] ? [E] : c : []
          }
        };
        C.filter.ID = function(B, E) {
          var F = typeof B.getAttributeNode !== "undefined" && B.getAttributeNode("id");
          return B.nodeType === 1 && F && F.nodeValue === E
        }
      }
      D.removeChild(t);
      D = t = null
    })();
    (function() {
      var t = G.createElement("div");
      t.appendChild(G.createComment(""));
      if (t.getElementsByTagName("*").length > 0) {
        C.find.TAG = function(w, D) {
          var B = D.getElementsByTagName(w[1]);
          if (w[1] === "*") {
            for (var E = [], F = 0; B[F]; F++) {
              B[F].nodeType === 1 && E.push(B[F])
            }
            B = E
          }
          return B
        }
      }
      t.innerHTML = "<a href='#'></a>";
      if (t.firstChild && typeof t.firstChild.getAttribute !== "undefined" && t.firstChild.getAttribute("href") !== "#") {
        C.attrHandle.href = function(w) {
          return w.getAttribute("href", 2)
        }
      }
      t = null
    })();
    G.querySelectorAll && function() {
      var t = z,
        w = G.createElement("div");
      w.innerHTML = "<p class='TEST'></p>";
      if (!(w.querySelectorAll && w.querySelectorAll(".TEST").length === 0)) {
        z = function(B, E, F, K) {
          E = E || G;
          if (!K && !z.isXML(E)) {
            if (E.nodeType === 9) {
              try {
                return U(E.querySelectorAll(B), F)
              } catch (O) {}
            } else {
              if (E.nodeType === 1 && E.nodeName.toLowerCase() !== "object") {
                var T = E.id,
                  ma = E.id = "__sizzle__";
                try {
                  return U(E.querySelectorAll("#" + ma + " " + B), F)
                } catch (ha) {} finally {
                  if (T) {
                    E.id = T
                  } else {
                    E.removeAttribute("id")
                  }
                }
              }
            }
          }
          return t(B, E, F, K)
        };
        for (var D in t) {
          z[D] = t[D]
        }
        w = null
      }
    }();
    (function() {
      var t = G.documentElement,
        w = t.matchesSelector || t.mozMatchesSelector || t.webkitMatchesSelector || t.msMatchesSelector,
        D = false;
      try {
        w.call(G.documentElement, ":sizzle")
      } catch (B) {
        D = true
      }
      if (w) {
        z.matchesSelector = function(E, F) {
          try {
            if (D || !C.match.PSEUDO.test(F)) {
              return w.call(E, F)
            }
          } catch (K) {}
          return z(F, null, null, [E]).length > 0
        }
      }
    })();
    (function() {
      var t = G.createElement("div");
      t.innerHTML = "<div class='test e'></div><div class='test'></div>";
      if (!(!t.getElementsByClassName || t.getElementsByClassName("e").length === 0)) {
        t.lastChild.className = "e";
        if (t.getElementsByClassName("e").length !== 1) {
          C.order.splice(1, 0, "CLASS");
          C.find.CLASS = function(w, D, B) {
            if (typeof D.getElementsByClassName !== "undefined" && !B) {
              return D.getElementsByClassName(w[1])
            }
          };
          t = null
        }
      }
    })();
    z.contains = G.documentElement.contains ? function(t, w) {
      return t !== w && (t.contains ? t.contains(w) : true)
    } : function(t, w) {
      return !!(t.compareDocumentPosition(w) & 16)
    };
    z.isXML = function(t) {
      return (t = (t ? t.ownerDocument || t : 0).documentElement) ? t.nodeName !== "HTML" : false
    };
    var fa = function(t, w) {
      for (var D = [], B = "", E, F = w.nodeType ? [w] : w; E = C.match.PSEUDO.exec(t);) {
        B += E[0];
        t = t.replace(C.match.PSEUDO, "")
      }
      t = C.relative[t] ? t + "*" : t;
      E = 0;
      for (var K = F.length; E < K; E++) {
        z(t, F[E], D)
      }
      return z.filter(B, D)
    };
    k.find = z;
    k.expr = z.selectors;
    k.expr[":"] = k.expr.filters;
    k.unique = z.uniqueSort;
    k.text = z.getText;
    k.isXMLDoc = z.isXML;
    k.contains = z.contains
  })();
  var ab = /Until$/,
    bb = /^(?:parents|prevUntil|prevAll)/,
    cb = /,/,
    Va = /^.[^:#\[\.,]*$/,
    db = Array.prototype.slice,
    eb = k.expr.match.POS;
  k.fn.extend({
    find: function(f) {
      for (var h = this.pushStack("", "find", f), n = 0, o = 0, r = this.length; o < r; o++) {
        n = h.length;
        k.find(f, this[o], h);
        if (o > 0) {
          for (var u = n; u < h.length; u++) {
            for (var x = 0; x < n; x++) {
              if (h[x] === h[u]) {
                h.splice(u--, 1);
                break
              }
            }
          }
        }
      }
      return h
    },
    has: function(f) {
      var h = k(f);
      return this.filter(function() {
        for (var n = 0, o = h.length; n < o; n++) {
          if (k.contains(this, h[n])) {
            return true
          }
        }
      })
    },
    not: function(f) {
      return this.pushStack(q(this, f, false), "not", f)
    },
    filter: function(f) {
      return this.pushStack(q(this, f, true), "filter", f)
    },
    is: function(f) {
      return !!f && k.filter(f, this).length > 0
    },
    closest: function(f, h) {
      var n = [],
        o, r, u = this[0];
      if (k.isArray(f)) {
        var x = {}, z, C = 1;
        if (u && f.length) {
          o = 0;
          for (r = f.length; o < r; o++) {
            z = f[o];
            x[z] || (x[z] = k.expr.match.POS.test(z) ? k(z, h || this.context) : z)
          }
          for (; u && u.ownerDocument && u !== h;) {
            for (z in x) {
              o = x[z];
              if (o.jquery ? o.index(u) > -1 : k(u).is(o)) {
                n.push({
                  selector: z,
                  elem: u,
                  level: C
                })
              }
            }
            u = u.parentNode;
            C++
          }
        }
        return n
      }
      x = eb.test(f) ? k(f, h || this.context) : null;
      o = 0;
      for (r = this.length; o < r; o++) {
        for (u = this[o]; u;) {
          if (x ? x.index(u) > -1 : k.find.matchesSelector(u, f)) {
            n.push(u);
            break
          } else {
            u = u.parentNode;
            if (!u || !u.ownerDocument || u === h) {
              break
            }
          }
        }
      }
      n = n.length > 1 ? k.unique(n) : n;
      return this.pushStack(n, "closest", f)
    },
    index: function(f) {
      if (!f || typeof f === "string") {
        return k.inArray(this[0], f ? k(f) : this.parent().children())
      }
      return k.inArray(f.jquery ? f[0] : f, this)
    },
    add: function(f, h) {
      var n = typeof f === "string" ? k(f, h || this.context) : k.makeArray(f),
        o = k.merge(this.get(), n);
      return this.pushStack(!n[0] || !n[0].parentNode || n[0].parentNode.nodeType === 11 || !o[0] || !o[0].parentNode || o[0].parentNode.nodeType === 11 ? o : k.unique(o))
    },
    andSelf: function() {
      return this.add(this.prevObject)
    }
  });
  k.each({
    parent: function(f) {
      return (f = f.parentNode) && f.nodeType !== 11 ? f : null
    },
    parents: function(f) {
      return k.dir(f, "parentNode")
    },
    parentsUntil: function(f, h, n) {
      return k.dir(f, "parentNode", n)
    },
    next: function(f) {
      return k.nth(f, 2, "nextSibling")
    },
    prev: function(f) {
      return k.nth(f, 2, "previousSibling")
    },
    nextAll: function(f) {
      return k.dir(f, "nextSibling")
    },
    prevAll: function(f) {
      return k.dir(f, "previousSibling")
    },
    nextUntil: function(f, h, n) {
      return k.dir(f, "nextSibling", n)
    },
    prevUntil: function(f, h, n) {
      return k.dir(f, "previousSibling", n)
    },
    siblings: function(f) {
      return k.sibling(f.parentNode.firstChild, f)
    },
    children: function(f) {
      return k.sibling(f.firstChild)
    },
    contents: function(f) {
      return k.nodeName(f, "iframe") ? f.contentDocument || f.contentWindow.document : k.makeArray(f.childNodes)
    }
  }, function(f, h) {
    k.fn[f] = function(n, o) {
      var r = k.map(this, h, n);
      ab.test(f) || (o = n);
      if (o && typeof o === "string") {
        r = k.filter(o, r)
      }
      r = this.length > 1 ? k.unique(r) : r;
      if ((this.length > 1 || cb.test(o)) && bb.test(f)) {
        r = r.reverse()
      }
      return this.pushStack(r, f, db.call(arguments).join(","))
    }
  });
  k.extend({
    filter: function(f, h, n) {
      if (n) {
        f = ":not(" + f + ")"
      }
      return h.length === 1 ? k.find.matchesSelector(h[0], f) ? [h[0]] : [] : k.find.matches(f, h)
    },
    dir: function(f, h, n) {
      var o = [];
      for (f = f[h]; f && f.nodeType !== 9 && (n === c || f.nodeType !== 1 || !k(f).is(n));) {
        f.nodeType === 1 && o.push(f);
        f = f[h]
      }
      return o
    },
    nth: function(f, h, n) {
      h = h || 1;
      for (var o = 0; f; f = f[n]) {
        if (f.nodeType === 1 && ++o === h) {
          break
        }
      }
      return f
    },
    sibling: function(f, h) {
      for (var n = []; f; f = f.nextSibling) {
        f.nodeType === 1 && f !== h && n.push(f)
      }
      return n
    }
  });
  var Ma = / jQuery\d+="(?:\d+|null)"/g,
    Ba = /^\s+/,
    Na = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
    Oa = /<([\w:]+)/,
    fb = /<tbody/i,
    gb = /<|&#?\w+;/,
    Pa = /<(?:script|object|embed|option|style)/i,
    Qa = /checked\s*(?:[^=]|=\s*.checked.)/i,
    hb = /\=([^="'>\s]+\/)>/g,
    ka = {
      option: [1, "<select multiple='multiple'>", "</select>"],
      legend: [1, "<fieldset>", "</fieldset>"],
      thead: [1, "<table>", "</table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      td: [3, "<table><tbody><tr>",
          "</tr></tbody></table>"
      ],
      col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
      area: [1, "<map>", "</map>"],
      _default: [0, "", ""]
    };
  ka.optgroup = ka.option;
  ka.tbody = ka.tfoot = ka.colgroup = ka.caption = ka.thead;
  ka.th = ka.td;
  if (!k.support.htmlSerialize) {
    ka._default = [1, "div<div>", "</div>"]
  }
  k.fn.extend({
    text: function(f) {
      if (k.isFunction(f)) {
        return this.each(function(h) {
          var n = k(this);
          n.text(f.call(this, h, n.text()))
        })
      }
      if (typeof f !== "object" && f !== c) {
        return this.empty().append((this[0] && this[0].ownerDocument || G).createTextNode(f))
      }
      return k.text(this)
    },
    wrapAll: function(f) {
      if (k.isFunction(f)) {
        return this.each(function(n) {
          k(this).wrapAll(f.call(this, n))
        })
      }
      if (this[0]) {
        var h = k(f, this[0].ownerDocument).eq(0).clone(true);
        this[0].parentNode && h.insertBefore(this[0]);
        h.map(function() {
          for (var n = this; n.firstChild && n.firstChild.nodeType === 1;) {
            n = n.firstChild
          }
          return n
        }).append(this)
      }
      return this
    },
    wrapInner: function(f) {
      if (k.isFunction(f)) {
        return this.each(function(h) {
          k(this).wrapInner(f.call(this, h))
        })
      }
      return this.each(function() {
        var h = k(this),
          n = h.contents();
        n.length ? n.wrapAll(f) : h.append(f)
      })
    },
    wrap: function(f) {
      return this.each(function() {
        k(this).wrapAll(f)
      })
    },
    unwrap: function() {
      return this.parent().each(function() {
        k.nodeName(this, "body") || k(this).replaceWith(this.childNodes)
      }).end()
    },
    append: function() {
      return this.domManip(arguments, true, function(f) {
        this.nodeType === 1 && this.appendChild(f)
      })
    },
    prepend: function() {
      return this.domManip(arguments, true, function(f) {
        this.nodeType === 1 && this.insertBefore(f, this.firstChild)
      })
    },
    before: function() {
      if (this[0] && this[0].parentNode) {
        return this.domManip(arguments, false, function(h) {
          this.parentNode.insertBefore(h, this)
        })
      } else {
        if (arguments.length) {
          var f = k(arguments[0]);
          f.push.apply(f, this.toArray());
          return this.pushStack(f, "before", arguments)
        }
      }
    },
    after: function() {
      if (this[0] && this[0].parentNode) {
        return this.domManip(arguments, false, function(h) {
          this.parentNode.insertBefore(h, this.nextSibling)
        })
      } else {
        if (arguments.length) {
          var f = this.pushStack(this, "after", arguments);
          f.push.apply(f, k(arguments[0]).toArray());
          return f
        }
      }
    },
    remove: function(f, h) {
      for (var n = 0, o;
      (o = this[n]) != null; n++) {
        if (!f || k.filter(f, [o]).length) {
          if (!h && o.nodeType === 1) {
            k.cleanData(o.getElementsByTagName("*"));
            k.cleanData([o])
          }
          o.parentNode && o.parentNode.removeChild(o)
        }
      }
      return this
    },
    empty: function() {
      for (var f = 0, h;
      (h = this[f]) != null; f++) {
        for (h.nodeType === 1 && k.cleanData(h.getElementsByTagName("*")); h.firstChild;) {
          h.removeChild(h.firstChild)
        }
      }
      return this
    },
    clone: function(f) {
      var h = this.map(function() {
        if (!k.support.noCloneEvent && !k.isXMLDoc(this)) {
          var n = this.outerHTML,
            o = this.ownerDocument;
          if (!n) {
            n = o.createElement("div");
            n.appendChild(this.cloneNode(true));
            n = n.innerHTML
          }
          return k.clean([n.replace(Ma, "").replace(hb, '="$1">').replace(Ba, "")], o)[0]
        } else {
          return this.cloneNode(true)
        }
      });
      if (f === true) {
        s(this, h);
        s(this.find("*"), h.find("*"))
      }
      return h
    },
    html: function(f) {
      if (f === c) {
        return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(Ma, "") : null
      } else {
        if (typeof f === "string" && !Pa.test(f) && (k.support.leadingWhitespace || !Ba.test(f)) && !ka[(Oa.exec(f) || ["", ""])[1].toLowerCase()]) {
          f = f.replace(Na, "<$1></$2>");
          try {
            for (var h = 0, n = this.length; h < n; h++) {
              if (this[h].nodeType === 1) {
                k.cleanData(this[h].getElementsByTagName("*"));
                this[h].innerHTML = f
              }
            }
          } catch (o) {
            this.empty().append(f)
          }
        } else {
          k.isFunction(f) ? this.each(function(r) {
            var u = k(this);
            u.html(f.call(this, r, u.html()))
          }) : this.empty().append(f)
        }
      }
      return this
    },
    replaceWith: function(f) {
      if (this[0] && this[0].parentNode) {
        if (k.isFunction(f)) {
          return this.each(function(h) {
            var n = k(this),
              o = n.html();
            n.replaceWith(f.call(this, h, o))
          })
        }
        if (typeof f !== "string") {
          f = k(f).detach()
        }
        return this.each(function() {
          var h = this.nextSibling,
            n = this.parentNode;
          k(this).remove();
          h ? k(h).before(f) : k(n).append(f)
        })
      } else {
        return this.pushStack(k(k.isFunction(f) ? f() : f), "replaceWith", f)
      }
    },
    detach: function(f) {
      return this.remove(f, true)
    },
    domManip: function(f, h, n) {
      var o, r, u = f[0],
        x = [],
        z;
      if (!k.support.checkClone && arguments.length === 3 && typeof u === "string" && Qa.test(u)) {
        return this.each(function() {
          k(this).domManip(f, h, n, true)
        })
      }
      if (k.isFunction(u)) {
        return this.each(function(J) {
          var L = k(this);
          f[0] = u.call(this, J, h ? L.html() : c);
          L.domManip(f, h, n)
        })
      }
      if (this[0]) {
        o = u && u.parentNode;
        o = k.support.parentNode && o && o.nodeType === 11 && o.childNodes.length === this.length ? {
          fragment: o
        } : k.buildFragment(f, this, x);
        z = o.fragment;
        if (r = z.childNodes.length === 1 ? z = z.firstChild : z.firstChild) {
          h = h && k.nodeName(r, "tr");
          r = 0;
          for (var C = this.length; r < C; r++) {
            n.call(h ? k.nodeName(this[r], "table") ? this[r].getElementsByTagName("tbody")[0] || this[r].appendChild(this[r].ownerDocument.createElement("tbody")) : this[r] : this[r], r > 0 || o.cacheable || this.length > 1 ? z.cloneNode(true) : z)
          }
        }
        x.length && k.each(x, y)
      }
      return this
    }
  });
  k.buildFragment = function(f, h, n) {
    var o, r, u;
    h = h && h[0] ? h[0].ownerDocument || h[0] : G;
    if (f.length === 1 && typeof f[0] === "string" && f[0].length < 512 && h === G && !Pa.test(f[0]) && (k.support.checkClone || !Qa.test(f[0]))) {
      r = true;
      if (u = k.fragments[f[0]]) {
        if (u !== 1) {
          o = u
        }
      }
    }
    if (!o) {
      o = h.createDocumentFragment();
      k.clean(f, h, o, n)
    }
    if (r) {
      k.fragments[f[0]] = u ? o : 1
    }
    return {
      fragment: o,
      cacheable: r
    }
  };
  k.fragments = {};
  k.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function(f, h) {
    k.fn[f] = function(n) {
      var o = [];
      n = k(n);
      var r = this.length === 1 && this[0].parentNode;
      if (r && r.nodeType === 11 && r.childNodes.length === 1 && n.length === 1) {
        n[h](this[0]);
        return this
      } else {
        r = 0;
        for (var u = n.length; r < u; r++) {
          var x = (r > 0 ? this.clone(true) : this).get();
          k(n[r])[h](x);
          o = o.concat(x)
        }
        return this.pushStack(o, f, n.selector)
      }
    }
  });
  k.extend({
    clean: function(f, h, n, o) {
      h = h || G;
      if (typeof h.createElement === "undefined") {
        h = h.ownerDocument || h[0] && h[0].ownerDocument || G
      }
      for (var r = [], u = 0, x;
      (x = f[u]) != null; u++) {
        if (typeof x === "number") {
          x += ""
        }
        if (x) {
          if (typeof x === "string" && !gb.test(x)) {
            x = h.createTextNode(x)
          } else {
            if (typeof x === "string") {
              x = x.replace(Na, "<$1></$2>");
              var z = (Oa.exec(x) || ["", ""])[1].toLowerCase(),
                C = ka[z] || ka._default,
                J = C[0],
                L = h.createElement("div");
              for (L.innerHTML = C[1] + x + C[2]; J--;) {
                L = L.lastChild
              }
              if (!k.support.tbody) {
                J = fb.test(x);
                z = z === "table" && !J ? L.firstChild && L.firstChild.childNodes : C[1] === "<table>" && !J ? L.childNodes : [];
                for (C = z.length - 1; C >= 0; --C) {
                  k.nodeName(z[C], "tbody") && !z[C].childNodes.length && z[C].parentNode.removeChild(z[C])
                }
              }!k.support.leadingWhitespace && Ba.test(x) && L.insertBefore(h.createTextNode(Ba.exec(x)[0]), L.firstChild);
              x = L.childNodes
            }
          }
          if (x.nodeType) {
            r.push(x)
          } else {
            r = k.merge(r, x)
          }
        }
      }
      if (n) {
        for (u = 0; r[u]; u++) {
          if (o && k.nodeName(r[u], "script") && (!r[u].type || r[u].type.toLowerCase() === "text/javascript")) {
            o.push(r[u].parentNode ? r[u].parentNode.removeChild(r[u]) : r[u])
          } else {
            r[u].nodeType === 1 && r.splice.apply(r, [u + 1, 0].concat(k.makeArray(r[u].getElementsByTagName("script"))));
            n.appendChild(r[u])
          }
        }
      }
      return r
    },
    cleanData: function(f) {
      for (var h, n, o = k.cache, r = k.event.special, u = k.support.deleteExpando, x = 0, z;
      (z = f[x]) != null; x++) {
        if (!(z.nodeName && k.noData[z.nodeName.toLowerCase()])) {
          if (n = z[k.expando]) {
            if ((h = o[n]) && h.events) {
              for (var C in h.events) {
                r[C] ? k.event.remove(z, C) : k.removeEvent(z, C, h.handle)
              }
            }
            if (u) {
              delete z[k.expando]
            } else {
              z.removeAttribute && z.removeAttribute(k.expando)
            }
            delete o[n]
          }
        }
      }
    }
  });
  var Ra = /alpha\([^)]*\)/i,
    ib = /opacity=([^)]*)/,
    jb = /-([a-z])/ig,
    kb = /([A-Z])/g,
    Sa = /^-?\d+(?:px)?$/i,
    lb = /^-?\d/,
    mb = {
      position: "absolute",
      visibility: "hidden",
      display: "block"
    }, Wa = ["Left", "Right"],
    Xa = ["Top", "Bottom"],
    ya, nb = G.defaultView && G.defaultView.getComputedStyle,
    ob = function(f, h) {
      return h.toUpperCase()
    };
  k.fn.css = function(f, h) {
    if (arguments.length === 2 && h === c) {
      return this
    }
    return k.access(this, f, h, true, function(n, o, r) {
      return r !== c ? k.style(n, o, r) : k.css(n, o)
    })
  };
  k.extend({
    cssHooks: {
      opacity: {
        get: function(f, h) {
          if (h) {
            var n = ya(f, "opacity", "opacity");
            return n === "" ? "1" : n
          } else {
            return f.style.opacity
          }
        }
      }
    },
    cssNumber: {
      zIndex: true,
      fontWeight: true,
      opacity: true,
      zoom: true,
      lineHeight: true
    },
    cssProps: {
      "float": k.support.cssFloat ? "cssFloat" : "styleFloat"
    },
    style: function(f, h, n, o) {
      if (!(!f || f.nodeType === 3 || f.nodeType === 8 || !f.style)) {
        var r, u = k.camelCase(h),
          x = f.style,
          z = k.cssHooks[u];
        h = k.cssProps[u] || u;
        if (n !== c) {
          if (!(typeof n === "number" && isNaN(n) || n == null)) {
            if (typeof n === "number" && !k.cssNumber[u]) {
              n += "px"
            }
            if (!z || !("set" in z) || (n = z.set(f, n)) !== c) {
              try {
                x[h] = n
              } catch (C) {}
            }
          }
        } else {
          if (z && "get" in z && (r = z.get(f, false, o)) !== c) {
            return r
          }
          return x[h]
        }
      }
    },
    css: function(f, h, n) {
      var o, r = k.camelCase(h),
        u = k.cssHooks[r];
      h = k.cssProps[r] || r;
      if (u && "get" in u && (o = u.get(f, true, n)) !== c) {
        return o
      } else {
        if (ya) {
          return ya(f, h, r)
        }
      }
    },
    swap: function(f, h, n) {
      var o = {}, r;
      for (r in h) {
        o[r] = f.style[r];
        f.style[r] = h[r]
      }
      n.call(f);
      for (r in h) {
        f.style[r] = o[r]
      }
    },
    camelCase: function(f) {
      return f.replace(jb, ob)
    }
  });
  k.curCSS = k.css;
  k.each(["height", "width"], function(f, h) {
    k.cssHooks[h] = {
      get: function(n, o, r) {
        var u;
        if (o) {
          if (n.offsetWidth !== 0) {
            u = A(n, h, r)
          } else {
            k.swap(n, mb, function() {
              u = A(n, h, r)
            })
          }
          return u + "px"
        }
      },
      set: function(n, o) {
        if (Sa.test(o)) {
          o = parseFloat(o);
          if (o >= 0) {
            return o + "px"
          }
        } else {
          return o
        }
      }
    }
  });
  if (!k.support.opacity) {
    k.cssHooks.opacity = {
      get: function(f, h) {
        return ib.test((h && f.currentStyle ? f.currentStyle.filter : f.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : h ? "1" : ""
      },
      set: function(f, h) {
        var n = f.style;
        n.zoom = 1;
        var o = k.isNaN(h) ? "" : "alpha(opacity=" + h * 100 + ")",
          r = n.filter || "";
        n.filter = Ra.test(r) ? r.replace(Ra, o) : n.filter + " " + o
      }
    }
  }
  if (nb) {
    ya = function(f, h, n) {
      var o;
      n = n.replace(kb, "-$1").toLowerCase();
      if (!(h = f.ownerDocument.defaultView)) {
        return c
      }
      if (h = h.getComputedStyle(f, null)) {
        o = h.getPropertyValue(n);
        if (o === "" && !k.contains(f.ownerDocument.documentElement, f)) {
          o = k.style(f, n)
        }
      }
      return o
    }
  } else {
    if (G.documentElement.currentStyle) {
      ya = function(f, h) {
        var n, o, r = f.currentStyle && f.currentStyle[h],
          u = f.style;
        if (!Sa.test(r) && lb.test(r)) {
          n = u.left;
          o = f.runtimeStyle.left;
          f.runtimeStyle.left = f.currentStyle.left;
          u.left = h === "fontSize" ? "1em" : r || 0;
          r = u.pixelLeft + "px";
          u.left = n;
          f.runtimeStyle.left = o
        }
        return r
      }
    }
  }
  if (k.expr && k.expr.filters) {
    k.expr.filters.hidden = function(f) {
      var h = f.offsetHeight;
      return f.offsetWidth === 0 && h === 0 || !k.support.reliableHiddenOffsets && (f.style.display || k.css(f, "display")) === "none"
    };
    k.expr.filters.visible = function(f) {
      return !k.expr.filters.hidden(f)
    }
  }
  var pb = k.now(),
    qb = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    rb = /^(?:select|textarea)/i,
    sb = /^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
    tb = /^(?:GET|HEAD|DELETE)$/,
    Ya = /\[\]$/,
    wa = /\=\?(&|$)/,
    Fa = /\?/,
    ub = /([?&])_=[^&]*/,
    vb = /^(\w+:)?\/\/([^\/?#]+)/,
    wb = /%20/g,
    xb = /#.*$/,
    Ta = k.fn.load;
  k.fn.extend({
    load: function(f, h, n) {
      if (typeof f !== "string" && Ta) {
        return Ta.apply(this, arguments)
      } else {
        if (!this.length) {
          return this
        }
      }
      var o = f.indexOf(" ");
      if (o >= 0) {
        var r = f.slice(o, f.length);
        f = f.slice(0, o)
      }
      o = "GET";
      if (h) {
        if (k.isFunction(h)) {
          n = h;
          h = null
        } else {
          if (typeof h === "object") {
            h = k.param(h, k.ajaxSettings.traditional);
            o = "POST"
          }
        }
      }
      var u = this;
      k.ajax({
        url: f,
        type: o,
        dataType: "html",
        data: h,
        complete: function(x, z) {
          if (z === "success" || z === "notmodified") {
            u.html(r ? k("<div>").append(x.responseText.replace(qb, "")).find(r) : x.responseText)
          }
          n && u.each(n, [x.responseText, z, x])
        }
      });
      return this
    },
    serialize: function() {
      return k.param(this.serializeArray())
    },
    serializeArray: function() {
      return this.map(function() {
        return this.elements ? k.makeArray(this.elements) : this
      }).filter(function() {
        return this.name && !this.disabled && (this.checked || rb.test(this.nodeName) || sb.test(this.type))
      }).map(function(f, h) {
        var n = k(this).val();
        return n == null ? null : k.isArray(n) ? k.map(n, function(o) {
          return {
            name: h.name,
            value: o
          }
        }) : {
          name: h.name,
          value: n
        }
      }).get()
    }
  });
  k.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(f, h) {
    k.fn[h] = function(n) {
      return this.bind(h, n)
    }
  });
  k.extend({
    get: function(f, h, n, o) {
      if (k.isFunction(h)) {
        o = o || n;
        n = h;
        h = null
      }
      return k.ajax({
        type: "GET",
        url: f,
        data: h,
        success: n,
        dataType: o
      })
    },
    getScript: function(f, h) {
      return k.get(f, null, h, "script")
    },
    getJSON: function(f, h, n) {
      return k.get(f, h, n, "json")
    },
    post: function(f, h, n, o) {
      if (k.isFunction(h)) {
        o = o || n;
        n = h;
        h = {}
      }
      return k.ajax({
        type: "POST",
        url: f,
        data: h,
        success: n,
        dataType: o
      })
    },
    ajaxSetup: function(f) {
      k.extend(k.ajaxSettings, f)
    },
    ajaxSettings: {
      url: location.href,
      global: true,
      type: "GET",
      contentType: "application/x-www-form-urlencoded",
      processData: true,
      async: true,
      xhr: function() {
        return new e.XMLHttpRequest
      },
      accepts: {
        xml: "application/xml, text/xml",
        html: "text/html",
        script: "text/javascript, application/javascript",
        json: "application/json, text/javascript",
        text: "text/plain",
        _default: "*/*"
      }
    },
    ajax: function(f) {
      var h = k.extend(true, {}, k.ajaxSettings, f),
        n, o, r, u = h.type.toUpperCase(),
        x = tb.test(u);
      h.url = h.url.replace(xb, "");
      h.context = f && f.context != null ? f.context : h;
      if (h.data && h.processData && typeof h.data !== "string") {
        h.data = k.param(h.data, h.traditional)
      }
      if (h.dataType === "jsonp") {
        if (u === "GET") {
          wa.test(h.url) || (h.url += (Fa.test(h.url) ? "&" : "?") + (h.jsonp || "callback") + "=?")
        } else {
          if (!h.data || !wa.test(h.data)) {
            h.data = (h.data ? h.data + "&" : "") + (h.jsonp || "callback") + "=?"
          }
        }
        h.dataType = "json"
      }
      if (h.dataType === "json" && (h.data && wa.test(h.data) || wa.test(h.url))) {
        n = h.jsonpCallback || "jsonp" + pb++;
        if (h.data) {
          h.data = (h.data + "").replace(wa, "=" + n + "$1")
        }
        h.url = h.url.replace(wa, "=" + n + "$1");
        h.dataType = "script";
        var z = e[n];
        e[n] = function(B) {
          r = B;
          k.handleSuccess(h, N, o, r);
          k.handleComplete(h, N, o, r);
          if (k.isFunction(z)) {
            z(B)
          } else {
            e[n] = c;
            try {
              delete e[n]
            } catch (E) {}
          }
          L && L.removeChild(R)
        }
      }
      if (h.dataType === "script" && h.cache === null) {
        h.cache = false
      }
      if (h.cache === false && u === "GET") {
        var C = k.now(),
          J = h.url.replace(ub, "$1_=" + C);
        h.url = J + (J === h.url ? (Fa.test(h.url) ? "&" : "?") + "_=" + C : "")
      }
      if (h.data && u === "GET") {
        h.url += (Fa.test(h.url) ? "&" : "?") + h.data
      }
      h.global && k.active++ === 0 && k.event.trigger("ajaxStart");
      C = (C = vb.exec(h.url)) && (C[1] && C[1] !== location.protocol || C[2] !== location.host);
      if (h.dataType === "script" && u === "GET" && C) {
        var L = G.getElementsByTagName("head")[0] || G.documentElement,
          R = G.createElement("script");
        if (h.scriptCharset) {
          R.charset = h.scriptCharset
        }
        R.src = h.url;
        if (!n) {
          var U = false;
          R.onload = R.onreadystatechange = function() {
            if (!U && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
              U = true;
              k.handleSuccess(h, N, o, r);
              k.handleComplete(h, N, o, r);
              R.onload = R.onreadystatechange = null;
              L && R.parentNode && L.removeChild(R)
            }
          }
        }
        L.insertBefore(R, L.firstChild);
        return c
      }
      var Z = false,
        N = h.xhr();
      if (N) {
        h.username ? N.open(u, h.url, h.async, h.username, h.password) : N.open(u, h.url, h.async);
        try {
          if (h.data != null && !x || f && f.contentType) {
            N.setRequestHeader("Content-Type", h.contentType)
          }
          if (h.ifModified) {
            k.lastModified[h.url] && N.setRequestHeader("If-Modified-Since", k.lastModified[h.url]);
            k.etag[h.url] && N.setRequestHeader("If-None-Match", k.etag[h.url])
          }
          C || N.setRequestHeader("X-Requested-With", "XMLHttpRequest");
          N.setRequestHeader("Accept", h.dataType && h.accepts[h.dataType] ? h.accepts[h.dataType] + ", */*; q=0.01" : h.accepts._default)
        } catch (Y) {}
        if (h.beforeSend && h.beforeSend.call(h.context, N, h) === false) {
          h.global && k.active-- === 1 && k.event.trigger("ajaxStop");
          N.abort();
          return false
        }
        h.global && k.triggerGlobal(h, "ajaxSend", [N, h]);
        var fa = N.onreadystatechange = function(B) {
          if (!N || N.readyState === 0 || B === "abort") {
            Z || k.handleComplete(h, N, o, r);
            Z = true;
            if (N) {
              N.onreadystatechange = k.noop
            }
          } else {
            if (!Z && N && (N.readyState === 4 || B === "timeout")) {
              Z = true;
              N.onreadystatechange = k.noop;
              o = B === "timeout" ? "timeout" : !k.httpSuccess(N) ? "error" : h.ifModified && k.httpNotModified(N, h.url) ? "notmodified" : "success";
              var E;
              if (o === "success") {
                try {
                  r = k.httpData(N, h.dataType, h)
                } catch (F) {
                  o = "parsererror";
                  E = F
                }
              }
              if (o === "success" || o === "notmodified") {
                n || k.handleSuccess(h, N, o, r)
              } else {
                k.handleError(h, N, o, E)
              }
              n || k.handleComplete(h, N, o, r);
              B === "timeout" && N.abort();
              if (h.async) {
                N = null
              }
            }
          }
        };
        try {
          var t = N.abort;
          N.abort = function() {
            N && t.call && t.call(N);
            fa("abort")
          }
        } catch (w) {}
        h.async && h.timeout > 0 && setTimeout(function() {
          N && !Z && fa("timeout")
        }, h.timeout);
        try {
          N.send(x || h.data == null ? null : h.data)
        } catch (D) {
          k.handleError(h, N, null, D);
          k.handleComplete(h, N, o, r)
        }
        h.async || fa();
        return N
      }
    },
    param: function(f, h) {
      var n = [],
        o = function(u, x) {
          x = k.isFunction(x) ? x() : x;
          n[n.length] = encodeURIComponent(u) + "=" + encodeURIComponent(x)
        };
      if (h === c) {
        h = k.ajaxSettings.traditional
      }
      if (k.isArray(f) || f.jquery) {
        k.each(f, function() {
          o(this.name, this.value)
        })
      } else {
        for (var r in f) {
          H(r, f[r], h, o)
        }
      }
      return n.join("&").replace(wb, "+")
    }
  });
  k.extend({
    active: 0,
    lastModified: {},
    etag: {},
    handleError: function(f, h, n, o) {
      f.error && f.error.call(f.context, h, n, o);
      f.global && k.triggerGlobal(f, "ajaxError", [h, f, o])
    },
    handleSuccess: function(f, h, n, o) {
      f.success && f.success.call(f.context, o, n, h);
      f.global && k.triggerGlobal(f, "ajaxSuccess", [h, f])
    },
    handleComplete: function(f, h, n) {
      f.complete && f.complete.call(f.context, h, n);
      f.global && k.triggerGlobal(f, "ajaxComplete", [h, f]);
      f.global && k.active-- === 1 && k.event.trigger("ajaxStop")
    },
    triggerGlobal: function(f, h, n) {
      (f.context && f.context.url == null ? k(f.context) : k.event).trigger(h, n)
    },
    httpSuccess: function(f) {
      try {
        return !f.status && location.protocol === "file:" || f.status >= 200 && f.status < 300 || f.status === 304 || f.status === 1223
      } catch (h) {}
      return false
    },
    httpNotModified: function(f, h) {
      var n = f.getResponseHeader("Last-Modified"),
        o = f.getResponseHeader("Etag");
      if (n) {
        k.lastModified[h] = n
      }
      if (o) {
        k.etag[h] = o
      }
      return f.status === 304
    },
    httpData: function(f, h, n) {
      var o = f.getResponseHeader("content-type") || "",
        r = h === "xml" || !h && o.indexOf("xml") >= 0;
      f = r ? f.responseXML : f.responseText;
      r && f.documentElement.nodeName === "parsererror" && k.error("parsererror");
      if (n && n.dataFilter) {
        f = n.dataFilter(f, h)
      }
      if (typeof f === "string") {
        if (h === "json" || !h && o.indexOf("json") >= 0) {
          f = k.parseJSON(f)
        } else {
          if (h === "script" || !h && o.indexOf("javascript") >= 0) {
            k.globalEval(f)
          }
        }
      }
      return f
    }
  });
  if (e.ActiveXObject) {
    k.ajaxSettings.xhr = function() {
      if (e.location.protocol !== "file:") {
        try {
          return new e.XMLHttpRequest
        } catch (f) {}
      }
      try {
        return new e.ActiveXObject("Microsoft.XMLHTTP")
      } catch (h) {}
    }
  }
  k.support.ajax = !! k.ajaxSettings.xhr();
  var Da = {}, yb = /^(?:toggle|show|hide)$/,
    zb = /^([+\-]=)?([\d+.\-]+)(.*)$/,
    Ca, Ga = [
      ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
      ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
      ["opacity"]
    ];
  k.fn.extend({
    show: function(f, h, n) {
      if (f || f === 0) {
        return this.animate(M("show", 3), f, h, n)
      } else {
        f = 0;
        for (h = this.length; f < h; f++) {
          if (!k.data(this[f], "olddisplay") && this[f].style.display === "none") {
            this[f].style.display = ""
          }
          this[f].style.display === "" && k.css(this[f], "display") === "none" && k.data(this[f], "olddisplay", S(this[f].nodeName))
        }
        for (f = 0; f < h; f++) {
          this[f].style.display = k.data(this[f], "olddisplay") || ""
        }
        return this
      }
    },
    hide: function(f, h, n) {
      if (f || f === 0) {
        return this.animate(M("hide", 3), f, h, n)
      } else {
        f = 0;
        for (h = this.length; f < h; f++) {
          n = k.css(this[f], "display");
          n !== "none" && k.data(this[f], "olddisplay", n)
        }
        for (f = 0; f < h; f++) {
          this[f].style.display = "none"
        }
        return this
      }
    },
    _toggle: k.fn.toggle,
    toggle: function(f, h, n) {
      var o = typeof f === "boolean";
      if (k.isFunction(f) && k.isFunction(h)) {
        this._toggle.apply(this, arguments)
      } else {
        f == null || o ? this.each(function() {
          var r = o ? f : k(this).is(":hidden");
          k(this)[r ? "show" : "hide"]()
        }) : this.animate(M("toggle", 3), f, h, n)
      }
      return this
    },
    fadeTo: function(f, h, n, o) {
      return this.filter(":hidden").css("opacity", 0).show().end().animate({
        opacity: h
      }, f, n, o)
    },
    animate: function(f, h, n, o) {
      var r = k.speed(h, n, o);
      if (k.isEmptyObject(f)) {
        return this.each(r.complete)
      }
      return this[r.queue === false ? "each" : "queue"](function() {
        var u = k.extend({}, r),
          x, z = this.nodeType === 1,
          C = z && k(this).is(":hidden"),
          J = this;
        for (x in f) {
          var L = k.camelCase(x);
          if (x !== L) {
            f[L] = f[x];
            delete f[x];
            x = L
          }
          if (f[x] === "hide" && C || f[x] === "show" && !C) {
            return u.complete.call(this)
          }
          if (z && (x === "height" || x === "width")) {
            u.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY];
            if (k.css(this, "display") === "inline" && k.css(this, "float") === "none") {
              if (k.support.inlineBlockNeedsLayout) {
                if (S(this.nodeName) === "inline") {
                  this.style.display = "inline-block"
                } else {
                  this.style.display = "inline";
                  this.style.zoom = 1
                }
              } else {
                this.style.display = "inline-block"
              }
            }
          }
          if (k.isArray(f[x])) {
            (u.specialEasing = u.specialEasing || {})[x] = f[x][1];
            f[x] = f[x][0]
          }
        }
        if (u.overflow != null) {
          this.style.overflow = "hidden"
        }
        u.curAnim = k.extend({}, f);
        k.each(f, function(R, U) {
          var Z = new k.fx(J, u, R);
          if (yb.test(U)) {
            Z[U === "toggle" ? C ? "show" : "hide" : U](f)
          } else {
            var N = zb.exec(U),
              Y = Z.cur(true) || 0;
            if (N) {
              var fa = parseFloat(N[2]),
                t = N[3] || "px";
              if (t !== "px") {
                k.style(J, R, (fa || 1) + t);
                Y = (fa || 1) / Z.cur(true) * Y;
                k.style(J, R, Y + t)
              }
              if (N[1]) {
                fa = (N[1] === "-=" ? -1 : 1) * fa + Y
              }
              Z.custom(Y, fa, t)
            } else {
              Z.custom(Y, U, "")
            }
          }
        });
        return true
      })
    },
    stop: function(f, h) {
      var n = k.timers;
      f && this.queue([]);
      this.each(function() {
        for (var o = n.length - 1; o >= 0; o--) {
          if (n[o].elem === this) {
            h && n[o](true);
            n.splice(o, 1)
          }
        }
      });
      h || this.dequeue();
      return this
    }
  });
  k.each({
    slideDown: M("show", 1),
    slideUp: M("hide", 1),
    slideToggle: M("toggle", 1),
    fadeIn: {
      opacity: "show"
    },
    fadeOut: {
      opacity: "hide"
    }
  }, function(f, h) {
    k.fn[f] = function(n, o, r) {
      return this.animate(h, n, o, r)
    }
  });
  k.extend({
    speed: function(f, h, n) {
      var o = f && typeof f === "object" ? k.extend({}, f) : {
        complete: n || !n && h || k.isFunction(f) && f,
        duration: f,
        easing: n && h || h && !k.isFunction(h) && h
      };
      o.duration = k.fx.off ? 0 : typeof o.duration === "number" ? o.duration : o.duration in k.fx.speeds ? k.fx.speeds[o.duration] : k.fx.speeds._default;
      o.old = o.complete;
      o.complete = function() {
        o.queue !== false && k(this).dequeue();
        k.isFunction(o.old) && o.old.call(this)
      };
      return o
    },
    easing: {
      linear: function(f, h, n, o) {
        return n + o * f
      },
      swing: function(f, h, n, o) {
        return (-Math.cos(f * Math.PI) / 2 + 0.5) * o + n
      }
    },
    timers: [],
    fx: function(f, h, n) {
      this.options = h;
      this.elem = f;
      this.prop = n;
      if (!h.orig) {
        h.orig = {}
      }
    }
  });
  k.fx.prototype = {
    update: function() {
      this.options.step && this.options.step.call(this.elem, this.now, this);
      (k.fx.step[this.prop] || k.fx.step._default)(this)
    },
    cur: function() {
      if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) {
        return this.elem[this.prop]
      }
      var f = parseFloat(k.css(this.elem, this.prop));
      return f && f > -10000 ? f : 0
    },
    custom: function(f, h, n) {
      function o(u) {
        return r.step(u)
      }
      this.startTime = k.now();
      this.start = f;
      this.end = h;
      this.unit = n || this.unit || "px";
      this.now = this.start;
      this.pos = this.state = 0;
      var r = this;
      f = k.fx;
      o.elem = this.elem;
      if (o() && k.timers.push(o) && !Ca) {
        Ca = setInterval(f.tick, f.interval)
      }
    },
    show: function() {
      this.options.orig[this.prop] = k.style(this.elem, this.prop);
      this.options.show = true;
      this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur());
      k(this.elem).show()
    },
    hide: function() {
      this.options.orig[this.prop] = k.style(this.elem, this.prop);
      this.options.hide = true;
      this.custom(this.cur(), 0)
    },
    step: function(f) {
      var h = k.now(),
        n = true;
      if (f || h >= this.options.duration + this.startTime) {
        this.now = this.end;
        this.pos = this.state = 1;
        this.update();
        this.options.curAnim[this.prop] = true;
        for (var o in this.options.curAnim) {
          if (this.options.curAnim[o] !== true) {
            n = false
          }
        }
        if (n) {
          if (this.options.overflow != null && !k.support.shrinkWrapBlocks) {
            var r = this.elem,
              u = this.options;
            k.each(["", "X", "Y"], function(z, C) {
              r.style["overflow" + C] = u.overflow[z]
            })
          }
          this.options.hide && k(this.elem).hide();
          if (this.options.hide || this.options.show) {
            for (var x in this.options.curAnim) {
              k.style(this.elem, x, this.options.orig[x])
            }
          }
          this.options.complete.call(this.elem)
        }
        return false
      } else {
        f = h - this.startTime;
        this.state = f / this.options.duration;
        h = this.options.easing || (k.easing.swing ? "swing" : "linear");
        this.pos = k.easing[this.options.specialEasing && this.options.specialEasing[this.prop] || h](this.state, f, 0, 1, this.options.duration);
        this.now = this.start + (this.end - this.start) * this.pos;
        this.update()
      }
      return true
    }
  };
  k.extend(k.fx, {
    tick: function() {
      for (var f = k.timers, h = 0; h < f.length; h++) {
        f[h]() || f.splice(h--, 1)
      }
      f.length || k.fx.stop()
    },
    interval: 13,
    stop: function() {
      clearInterval(Ca);
      Ca = null
    },
    speeds: {
      slow: 600,
      fast: 200,
      _default: 400
    },
    step: {
      opacity: function(f) {
        k.style(f.elem, "opacity", f.now)
      },
      _default: function(f) {
        if (f.elem.style && f.elem.style[f.prop] != null) {
          f.elem.style[f.prop] = (f.prop === "width" || f.prop === "height" ? Math.max(0, f.now) : f.now) + f.unit
        } else {
          f.elem[f.prop] = f.now
        }
      }
    }
  });
  if (k.expr && k.expr.filters) {
    k.expr.filters.animated = function(f) {
      return k.grep(k.timers, function(h) {
        return f === h.elem
      }).length
    }
  }
  var Ab = /^t(?:able|d|h)$/i,
    Ua = /^(?:body|html)$/i;
  k.fn.offset = "getBoundingClientRect" in G.documentElement ? function(f) {
    var h = this[0],
      n;
    if (f) {
      return this.each(function(x) {
        k.offset.setOffset(this, f, x)
      })
    }
    if (!h || !h.ownerDocument) {
      return null
    }
    if (h === h.ownerDocument.body) {
      return k.offset.bodyOffset(h)
    }
    try {
      n = h.getBoundingClientRect()
    } catch (o) {}
    var r = h.ownerDocument,
      u = r.documentElement;
    if (!n || !k.contains(u, h)) {
      return n || {
        top: 0,
        left: 0
      }
    }
    h = r.body;
    r = V(r);
    return {
      top: n.top + (r.pageYOffset || k.support.boxModel && u.scrollTop || h.scrollTop) - (u.clientTop || h.clientTop || 0),
      left: n.left + (r.pageXOffset || k.support.boxModel && u.scrollLeft || h.scrollLeft) - (u.clientLeft || h.clientLeft || 0)
    }
  } : function(f) {
    var h = this[0];
    if (f) {
      return this.each(function(J) {
        k.offset.setOffset(this, f, J)
      })
    }
    if (!h || !h.ownerDocument) {
      return null
    }
    if (h === h.ownerDocument.body) {
      return k.offset.bodyOffset(h)
    }
    k.offset.initialize();
    var n = h.offsetParent,
      o = h.ownerDocument,
      r, u = o.documentElement,
      x = o.body;
    r = (o = o.defaultView) ? o.getComputedStyle(h, null) : h.currentStyle;
    for (var z = h.offsetTop, C = h.offsetLeft;
    (h = h.parentNode) && h !== x && h !== u;) {
      if (k.offset.supportsFixedPosition && r.position === "fixed") {
        break
      }
      r = o ? o.getComputedStyle(h, null) : h.currentStyle;
      z -= h.scrollTop;
      C -= h.scrollLeft;
      if (h === n) {
        z += h.offsetTop;
        C += h.offsetLeft;
        if (k.offset.doesNotAddBorder && !(k.offset.doesAddBorderForTableAndCells && Ab.test(h.nodeName))) {
          z += parseFloat(r.borderTopWidth) || 0;
          C += parseFloat(r.borderLeftWidth) || 0
        }
        n = h.offsetParent
      }
      if (k.offset.subtractsBorderForOverflowNotVisible && r.overflow !== "visible") {
        z += parseFloat(r.borderTopWidth) || 0;
        C += parseFloat(r.borderLeftWidth) || 0
      }
      r = r
    }
    if (r.position === "relative" || r.position === "static") {
      z += x.offsetTop;
      C += x.offsetLeft
    }
    if (k.offset.supportsFixedPosition && r.position === "fixed") {
      z += Math.max(u.scrollTop, x.scrollTop);
      C += Math.max(u.scrollLeft, x.scrollLeft)
    }
    return {
      top: z,
      left: C
    }
  };
  k.offset = {
    initialize: function() {
      var f = G.body,
        h = G.createElement("div"),
        n, o, r, u = parseFloat(k.css(f, "marginTop")) || 0;
      k.extend(h.style, {
        position: "absolute",
        top: 0,
        left: 0,
        margin: 0,
        border: 0,
        width: "1px",
        height: "1px",
        visibility: "hidden"
      });
      h.innerHTML = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
      f.insertBefore(h, f.firstChild);
      n = h.firstChild;
      o = n.firstChild;
      r = n.nextSibling.firstChild.firstChild;
      this.doesNotAddBorder = o.offsetTop !== 5;
      this.doesAddBorderForTableAndCells = r.offsetTop === 5;
      o.style.position = "fixed";
      o.style.top = "20px";
      this.supportsFixedPosition = o.offsetTop === 20 || o.offsetTop === 15;
      o.style.position = o.style.top = "";
      n.style.overflow = "hidden";
      n.style.position = "relative";
      this.subtractsBorderForOverflowNotVisible = o.offsetTop === -5;
      this.doesNotIncludeMarginInBodyOffset = f.offsetTop !== u;
      f.removeChild(h);
      k.offset.initialize = k.noop
    },
    bodyOffset: function(f) {
      var h = f.offsetTop,
        n = f.offsetLeft;
      k.offset.initialize();
      if (k.offset.doesNotIncludeMarginInBodyOffset) {
        h += parseFloat(k.css(f, "marginTop")) || 0;
        n += parseFloat(k.css(f, "marginLeft")) || 0
      }
      return {
        top: h,
        left: n
      }
    },
    setOffset: function(f, h, n) {
      var o = k.css(f, "position");
      if (o === "static") {
        f.style.position = "relative"
      }
      var r = k(f),
        u = r.offset(),
        x = k.css(f, "top"),
        z = k.css(f, "left"),
        C = o === "absolute" && k.inArray("auto", [x, z]) > -1;
      o = {};
      var J = {};
      if (C) {
        J = r.position()
      }
      x = C ? J.top : parseInt(x, 10) || 0;
      z = C ? J.left : parseInt(z, 10) || 0;
      if (k.isFunction(h)) {
        h = h.call(f, n, u)
      }
      if (h.top != null) {
        o.top = h.top - u.top + x
      }
      if (h.left != null) {
        o.left = h.left - u.left + z
      }
      "using" in h ? h.using.call(f, o) : r.css(o)
    }
  };
  k.fn.extend({
    position: function() {
      if (!this[0]) {
        return null
      }
      var f = this[0],
        h = this.offsetParent(),
        n = this.offset(),
        o = Ua.test(h[0].nodeName) ? {
          top: 0,
          left: 0
        } : h.offset();
      n.top -= parseFloat(k.css(f, "marginTop")) || 0;
      n.left -= parseFloat(k.css(f, "marginLeft")) || 0;
      o.top += parseFloat(k.css(h[0], "borderTopWidth")) || 0;
      o.left += parseFloat(k.css(h[0], "borderLeftWidth")) || 0;
      return {
        top: n.top - o.top,
        left: n.left - o.left
      }
    },
    offsetParent: function() {
      return this.map(function() {
        for (var f = this.offsetParent || G.body; f && !Ua.test(f.nodeName) && k.css(f, "position") === "static";) {
          f = f.offsetParent
        }
        return f
      })
    }
  });
  k.each(["Left", "Top"], function(f, h) {
    var n = "scroll" + h;
    k.fn[n] = function(o) {
      var r = this[0],
        u;
      if (!r) {
        return null
      }
      return o !== c ? this.each(function() {
        if (u = V(this)) {
          u.scrollTo(!f ? o : k(u).scrollLeft(), f ? o : k(u).scrollTop())
        } else {
          this[n] = o
        }
      }) : (u = V(r)) ? "pageXOffset" in u ? u[f ? "pageYOffset" : "pageXOffset"] : k.support.boxModel && u.document.documentElement[n] || u.document.body[n] : r[n]
    }
  });
  k.each(["Height", "Width"], function(f, h) {
    var n = h.toLowerCase();
    k.fn["inner" + h] = function() {
      return this[0] ? parseFloat(k.css(this[0], n, "padding")) : null
    };
    k.fn["outer" + h] = function(o) {
      return this[0] ? parseFloat(k.css(this[0], n, o ? "margin" : "border")) : null
    };
    k.fn[n] = function(o) {
      var r = this[0];
      if (!r) {
        return o == null ? null : this
      }
      if (k.isFunction(o)) {
        return this.each(function(u) {
          var x = k(this);
          x[n](o.call(this, u, x[n]()))
        })
      }
      return k.isWindow(r) ? r.document.compatMode === "CSS1Compat" && r.document.documentElement["client" + h] || r.document.body["client" + h] : r.nodeType === 9 ? Math.max(r.documentElement["client" + h], r.body["scroll" + h], r.documentElement["scroll" + h], r.body["offset" + h], r.documentElement["offset" + h]) : o === c ? parseFloat(k.css(r, n)) : this.css(n, typeof o === "string" ? o : o + "px")
    }
  })
})(window);











