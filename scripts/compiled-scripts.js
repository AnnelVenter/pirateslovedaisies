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
    var h, n, o = [], r = [], u, x, z, C, J, L, R, U;
    x = k.data(this, this.nodeType ? "events" : "__events__");
    if(typeof x === "function") {
      x = x.events
    }
    if(!(f.liveFired === this || !x || !x.live || f.button && f.type === "click")) {
      if(f.namespace) {
        U = RegExp("(^|\\.)" + f.namespace.split(".").join("\\.(?:.*\\.)?") + "(\\.|$)")
      }
      f.liveFired = this;
      var Z = x.live.slice(0);
      for(C = 0;C < Z.length;C++) {
        x = Z[C];
        x.origType.replace(la, "") === f.type ? r.push(x.selector) : Z.splice(C--, 1)
      }
      r = k(f.target).closest(r, f.currentTarget);
      J = 0;
      for(L = r.length;J < L;J++) {
        R = r[J];
        for(C = 0;C < Z.length;C++) {
          x = Z[C];
          if(R.selector === x.selector && (!U || U.test(x.namespace))) {
            z = R.elem;
            u = null;
            if(x.preType === "mouseenter" || x.preType === "mouseleave") {
              f.type = x.preType;
              u = k(f.relatedTarget).closest(x.selector)[0]
            }
            if(!u || u !== z) {
              o.push({elem:z, handleObj:x, level:R.level})
            }
          }
        }
      }
      J = 0;
      for(L = o.length;J < L;J++) {
        r = o[J];
        if(n && r.level > n) {
          break
        }
        f.currentTarget = r.elem;
        f.data = r.handleObj.data;
        f.handleObj = r.handleObj;
        U = r.handleObj.origHandler.apply(r.elem, arguments);
        if(U === false || f.isPropagationStopped()) {
          n = r.level;
          if(U === false) {
            h = false
          }
        }
      }
      return h
    }
  }
  function m(f, h) {
    return(f && f !== "*" ? f + "." : "") + h.replace(sa, "`").replace(va, "&")
  }
  function q(f, h, n) {
    if(k.isFunction(h)) {
      return k.grep(f, function(r, u) {
        return!!h.call(r, u, r) === n
      })
    }else {
      if(h.nodeType) {
        return k.grep(f, function(r) {
          return r === h === n
        })
      }else {
        if(typeof h === "string") {
          var o = k.grep(f, function(r) {
            return r.nodeType === 1
          });
          if(Va.test(h)) {
            return k.filter(h, o, !n)
          }else {
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
      if(this.nodeName === (f[n] && f[n].nodeName)) {
        var o = k.data(f[n++]), r = k.data(this, o);
        if(o = o && o.events) {
          delete r.handle;
          r.events = {};
          for(var u in o) {
            for(var x in o[u]) {
              k.event.add(this, u, o[u][x], o[u][x].data)
            }
          }
        }
      }
    })
  }
  function y(f, h) {
    h.src ? k.ajax({url:h.src, async:false, dataType:"script"}) : k.globalEval(h.text || h.textContent || h.innerHTML || "");
    h.parentNode && h.parentNode.removeChild(h)
  }
  function A(f, h, n) {
    var o = h === "width" ? f.offsetWidth : f.offsetHeight;
    if(n === "border") {
      return o
    }
    k.each(h === "width" ? Wa : Xa, function() {
      n || (o -= parseFloat(k.css(f, "padding" + this)) || 0);
      if(n === "margin") {
        o += parseFloat(k.css(f, "margin" + this)) || 0
      }else {
        o -= parseFloat(k.css(f, "border" + this + "Width")) || 0
      }
    });
    return o
  }
  function H(f, h, n, o) {
    if(k.isArray(h) && h.length) {
      k.each(h, function(r, u) {
        n || Ya.test(f) ? o(f, u) : H(f + "[" + (typeof u === "object" || k.isArray(u) ? r : "") + "]", u, n, o)
      })
    }else {
      if(!n && h != null && typeof h === "object") {
        k.isEmptyObject(h) ? o(f, "") : k.each(h, function(r, u) {
          H(f + "[" + r + "]", u, n, o)
        })
      }else {
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
    if(!Da[f]) {
      var h = k("<" + f + ">").appendTo("body"), n = h.css("display");
      h.remove();
      if(n === "none" || n === "") {
        n = "block"
      }
      Da[f] = n
    }
    return Da[f]
  }
  function V(f) {
    return k.isWindow(f) ? f : f.nodeType === 9 ? f.defaultView || f.parentWindow : false
  }
  var G = e.document, k = function() {
    function f() {
      if(!h.isReady) {
        try {
          G.documentElement.doScroll("left")
        }catch(v) {
          setTimeout(f, 1);
          return
        }
        h.ready()
      }
    }
    var h = function(v, I) {
      return new h.fn.init(v, I)
    }, n = e.jQuery, o = e.$, r, u = /^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/, x = /\S/, z = /^\s+/, C = /\s+$/, J = /\W/, L = /\d/, R = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, U = /^[\],:{}\s]*$/, Z = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, N = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, Y = /(?:^|:|,)(?:\s*\[)+/g, fa = /(webkit)[ \/]([\w.]+)/, t = /(opera)(?:.*version)?[ \/]([\w.]+)/, w = /(msie) ([\w.]+)/, D = /(mozilla)(?:.*? rv:([\w.]+))?/, B = navigator.userAgent, E = false, F = 
    [], K, O = Object.prototype.toString, T = Object.prototype.hasOwnProperty, ma = Array.prototype.push, ha = Array.prototype.slice, oa = String.prototype.trim, na = Array.prototype.indexOf, ea = {};
    h.fn = h.prototype = {init:function(v, I) {
      var P, Q, X;
      if(!v) {
        return this
      }
      if(v.nodeType) {
        this.context = this[0] = v;
        this.length = 1;
        return this
      }
      if(v === "body" && !I && G.body) {
        this.context = G;
        this[0] = G.body;
        this.selector = "body";
        this.length = 1;
        return this
      }
      if(typeof v === "string") {
        if((P = u.exec(v)) && (P[1] || !I)) {
          if(P[1]) {
            X = I ? I.ownerDocument || I : G;
            if(Q = R.exec(v)) {
              if(h.isPlainObject(I)) {
                v = [G.createElement(Q[1])];
                h.fn.attr.call(v, I, true)
              }else {
                v = [X.createElement(Q[1])]
              }
            }else {
              Q = h.buildFragment([P[1]], [X]);
              v = (Q.cacheable ? Q.fragment.cloneNode(true) : Q.fragment).childNodes
            }
            return h.merge(this, v)
          }else {
            if((Q = G.getElementById(P[2])) && Q.parentNode) {
              if(Q.id !== P[2]) {
                return r.find(v)
              }
              this.length = 1;
              this[0] = Q
            }
            this.context = G;
            this.selector = v;
            return this
          }
        }else {
          if(!I && !J.test(v)) {
            this.selector = v;
            this.context = G;
            v = G.getElementsByTagName(v);
            return h.merge(this, v)
          }else {
            return!I || I.jquery ? (I || r).find(v) : h(I).find(v)
          }
        }
      }else {
        if(h.isFunction(v)) {
          return r.ready(v)
        }
      }
      if(v.selector !== c) {
        this.selector = v.selector;
        this.context = v.context
      }
      return h.makeArray(v, this)
    }, selector:"", jquery:"1.4.3", length:0, size:function() {
      return this.length
    }, toArray:function() {
      return ha.call(this, 0)
    }, get:function(v) {
      return v == null ? this.toArray() : v < 0 ? this.slice(v)[0] : this[v]
    }, pushStack:function(v, I, P) {
      var Q = h();
      h.isArray(v) ? ma.apply(Q, v) : h.merge(Q, v);
      Q.prevObject = this;
      Q.context = this.context;
      if(I === "find") {
        Q.selector = this.selector + (this.selector ? " " : "") + P
      }else {
        if(I) {
          Q.selector = this.selector + "." + I + "(" + P + ")"
        }
      }
      return Q
    }, each:function(v, I) {
      return h.each(this, v, I)
    }, ready:function(v) {
      h.bindReady();
      if(h.isReady) {
        v.call(G, h)
      }else {
        F && F.push(v)
      }
      return this
    }, eq:function(v) {
      return v === -1 ? this.slice(v) : this.slice(v, +v + 1)
    }, first:function() {
      return this.eq(0)
    }, last:function() {
      return this.eq(-1)
    }, slice:function() {
      return this.pushStack(ha.apply(this, arguments), "slice", ha.call(arguments).join(","))
    }, map:function(v) {
      return this.pushStack(h.map(this, function(I, P) {
        return v.call(I, P, I)
      }))
    }, end:function() {
      return this.prevObject || h(null)
    }, push:ma, sort:[].sort, splice:[].splice};
    h.fn.init.prototype = h.fn;
    h.extend = h.fn.extend = function() {
      var v = arguments[0] || {}, I = 1, P = arguments.length, Q = false, X, aa, da, ca, Ea;
      if(typeof v === "boolean") {
        Q = v;
        v = arguments[1] || {};
        I = 2
      }
      if(typeof v !== "object" && !h.isFunction(v)) {
        v = {}
      }
      if(P === I) {
        v = this;
        --I
      }
      for(;I < P;I++) {
        if((X = arguments[I]) != null) {
          for(aa in X) {
            da = v[aa];
            ca = X[aa];
            if(v !== ca) {
              if(Q && ca && (h.isPlainObject(ca) || (Ea = h.isArray(ca)))) {
                if(Ea) {
                  Ea = false;
                  clone = da && h.isArray(da) ? da : []
                }else {
                  clone = da && h.isPlainObject(da) ? da : {}
                }
                v[aa] = h.extend(Q, clone, ca)
              }else {
                if(ca !== c) {
                  v[aa] = ca
                }
              }
            }
          }
        }
      }
      return v
    };
    h.extend({noConflict:function(v) {
      e.$ = o;
      if(v) {
        e.jQuery = n
      }
      return h
    }, isReady:false, readyWait:1, ready:function(v) {
      v === true && h.readyWait--;
      if(!h.readyWait || v !== true && !h.isReady) {
        if(!G.body) {
          return setTimeout(h.ready, 1)
        }
        h.isReady = true;
        if(!(v !== true && --h.readyWait > 0)) {
          if(F) {
            for(var I = 0;v = F[I++];) {
              v.call(G, h)
            }
            F = null
          }
          h.fn.triggerHandler && h(G).triggerHandler("ready")
        }
      }
    }, bindReady:function() {
      if(!E) {
        E = true;
        if(G.readyState === "complete") {
          return setTimeout(h.ready, 1)
        }
        if(G.addEventListener) {
          G.addEventListener("DOMContentLoaded", K, false);
          e.addEventListener("load", h.ready, false)
        }else {
          if(G.attachEvent) {
            G.attachEvent("onreadystatechange", K);
            e.attachEvent("onload", h.ready);
            var v = false;
            try {
              v = e.frameElement == null
            }catch(I) {
            }
            G.documentElement.doScroll && v && f()
          }
        }
      }
    }, isFunction:function(v) {
      return h.type(v) === "function"
    }, isArray:Array.isArray || function(v) {
      return h.type(v) === "array"
    }, isWindow:function(v) {
      return v && typeof v === "object" && "setInterval" in v
    }, isNaN:function(v) {
      return v == null || !L.test(v) || isNaN(v)
    }, type:function(v) {
      return v == null ? String(v) : ea[O.call(v)] || "object"
    }, isPlainObject:function(v) {
      if(!v || h.type(v) !== "object" || v.nodeType || h.isWindow(v)) {
        return false
      }
      if(v.constructor && !T.call(v, "constructor") && !T.call(v.constructor.prototype, "isPrototypeOf")) {
        return false
      }
      for(var I in v) {
      }
      return I === c || T.call(v, I)
    }, isEmptyObject:function(v) {
      for(var I in v) {
        return false
      }
      return true
    }, error:function(v) {
      throw v;
    }, parseJSON:function(v) {
      if(typeof v !== "string" || !v) {
        return null
      }
      v = h.trim(v);
      if(U.test(v.replace(Z, "@").replace(N, "]").replace(Y, ""))) {
        return e.JSON && e.JSON.parse ? e.JSON.parse(v) : (new Function("return " + v))()
      }else {
        h.error("Invalid JSON: " + v)
      }
    }, noop:function() {
    }, globalEval:function(v) {
      if(v && x.test(v)) {
        var I = G.getElementsByTagName("head")[0] || G.documentElement, P = G.createElement("script");
        P.type = "text/javascript";
        if(h.support.scriptEval) {
          P.appendChild(G.createTextNode(v))
        }else {
          P.text = v
        }
        I.insertBefore(P, I.firstChild);
        I.removeChild(P)
      }
    }, nodeName:function(v, I) {
      return v.nodeName && v.nodeName.toUpperCase() === I.toUpperCase()
    }, each:function(v, I, P) {
      var Q, X = 0, aa = v.length, da = aa === c || h.isFunction(v);
      if(P) {
        if(da) {
          for(Q in v) {
            if(I.apply(v[Q], P) === false) {
              break
            }
          }
        }else {
          for(;X < aa;) {
            if(I.apply(v[X++], P) === false) {
              break
            }
          }
        }
      }else {
        if(da) {
          for(Q in v) {
            if(I.call(v[Q], Q, v[Q]) === false) {
              break
            }
          }
        }else {
          for(P = v[0];X < aa && I.call(P, X, P) !== false;P = v[++X]) {
          }
        }
      }
      return v
    }, trim:oa ? function(v) {
      return v == null ? "" : oa.call(v)
    } : function(v) {
      return v == null ? "" : v.toString().replace(z, "").replace(C, "")
    }, makeArray:function(v, I) {
      var P = I || [];
      if(v != null) {
        var Q = h.type(v);
        v.length == null || Q === "string" || Q === "function" || Q === "regexp" || h.isWindow(v) ? ma.call(P, v) : h.merge(P, v)
      }
      return P
    }, inArray:function(v, I) {
      if(I.indexOf) {
        return I.indexOf(v)
      }
      for(var P = 0, Q = I.length;P < Q;P++) {
        if(I[P] === v) {
          return P
        }
      }
      return-1
    }, merge:function(v, I) {
      var P = v.length, Q = 0;
      if(typeof I.length === "number") {
        for(var X = I.length;Q < X;Q++) {
          v[P++] = I[Q]
        }
      }else {
        for(;I[Q] !== c;) {
          v[P++] = I[Q++]
        }
      }
      v.length = P;
      return v
    }, grep:function(v, I, P) {
      var Q = [], X;
      P = !!P;
      for(var aa = 0, da = v.length;aa < da;aa++) {
        X = !!I(v[aa], aa);
        P !== X && Q.push(v[aa])
      }
      return Q
    }, map:function(v, I, P) {
      for(var Q = [], X, aa = 0, da = v.length;aa < da;aa++) {
        X = I(v[aa], aa, P);
        if(X != null) {
          Q[Q.length] = X
        }
      }
      return Q.concat.apply([], Q)
    }, guid:1, proxy:function(v, I, P) {
      if(arguments.length === 2) {
        if(typeof I === "string") {
          P = v;
          v = P[I];
          I = c
        }else {
          if(I && !h.isFunction(I)) {
            P = I;
            I = c
          }
        }
      }
      if(!I && v) {
        I = function() {
          return v.apply(P || this, arguments)
        }
      }
      if(v) {
        I.guid = v.guid = v.guid || I.guid || h.guid++
      }
      return I
    }, access:function(v, I, P, Q, X, aa) {
      var da = v.length;
      if(typeof I === "object") {
        for(var ca in I) {
          h.access(v, ca, I[ca], Q, X, P)
        }
        return v
      }
      if(P !== c) {
        Q = !aa && Q && h.isFunction(P);
        for(ca = 0;ca < da;ca++) {
          X(v[ca], I, Q ? P.call(v[ca], ca, X(v[ca], I)) : P, aa)
        }
        return v
      }
      return da ? X(v[0], I) : c
    }, now:function() {
      return(new Date).getTime()
    }, uaMatch:function(v) {
      v = v.toLowerCase();
      v = fa.exec(v) || t.exec(v) || w.exec(v) || v.indexOf("compatible") < 0 && D.exec(v) || [];
      return{browser:v[1] || "", version:v[2] || "0"}
    }, browser:{}});
    h.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(v, I) {
      ea["[object " + I + "]"] = I.toLowerCase()
    });
    B = h.uaMatch(B);
    if(B.browser) {
      h.browser[B.browser] = true;
      h.browser.version = B.version
    }
    if(h.browser.webkit) {
      h.browser.safari = true
    }
    if(na) {
      h.inArray = function(v, I) {
        return na.call(I, v)
      }
    }
    if(!/\s/.test("\u00a0")) {
      z = /^[\s\xA0]+/;
      C = /[\s\xA0]+$/
    }
    r = h(G);
    if(G.addEventListener) {
      K = function() {
        G.removeEventListener("DOMContentLoaded", K, false);
        h.ready()
      }
    }else {
      if(G.attachEvent) {
        K = function() {
          if(G.readyState === "complete") {
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
    var f = G.documentElement, h = G.createElement("script"), n = G.createElement("div"), o = "script" + k.now();
    n.style.display = "none";
    n.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
    var r = n.getElementsByTagName("*"), u = n.getElementsByTagName("a")[0], x = G.createElement("select"), z = x.appendChild(G.createElement("option"));
    if(!(!r || !r.length || !u)) {
      k.support = {leadingWhitespace:n.firstChild.nodeType === 3, tbody:!n.getElementsByTagName("tbody").length, htmlSerialize:!!n.getElementsByTagName("link").length, style:/red/.test(u.getAttribute("style")), hrefNormalized:u.getAttribute("href") === "/a", opacity:/^0.55$/.test(u.style.opacity), cssFloat:!!u.style.cssFloat, checkOn:n.getElementsByTagName("input")[0].value === "on", optSelected:z.selected, optDisabled:false, checkClone:false, scriptEval:false, noCloneEvent:true, boxModel:null, inlineBlockNeedsLayout:false, 
      shrinkWrapBlocks:false, reliableHiddenOffsets:true};
      x.disabled = true;
      k.support.optDisabled = !z.disabled;
      h.type = "text/javascript";
      try {
        h.appendChild(G.createTextNode("window." + o + "=1;"))
      }catch(C) {
      }
      f.insertBefore(h, f.firstChild);
      if(e[o]) {
        k.support.scriptEval = true;
        delete e[o]
      }
      f.removeChild(h);
      if(n.attachEvent && n.fireEvent) {
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
        if("zoom" in J.style) {
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
        if(!R) {
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
  k.props = {"for":"htmlFor", "class":"className", readonly:"readOnly", maxlength:"maxLength", cellspacing:"cellSpacing", rowspan:"rowSpan", colspan:"colSpan", tabindex:"tabIndex", usemap:"useMap", frameborder:"frameBorder"};
  var W = {}, ia = /^(?:\{.*\}|\[.*\])$/;
  k.extend({cache:{}, uuid:0, expando:"jQuery" + k.now(), noData:{embed:true, object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", applet:true}, data:function(f, h, n) {
    if(k.acceptData(f)) {
      f = f == e ? W : f;
      var o = f.nodeType, r = o ? f[k.expando] : null, u = k.cache;
      if(!(o && !r && typeof h === "string" && n === c)) {
        if(o) {
          r || (f[k.expando] = r = ++k.uuid)
        }else {
          u = f
        }
        if(typeof h === "object") {
          if(o) {
            u[r] = k.extend(u[r], h)
          }else {
            k.extend(u, h)
          }
        }else {
          if(o && !u[r]) {
            u[r] = {}
          }
        }
        f = o ? u[r] : u;
        if(n !== c) {
          f[h] = n
        }
        return typeof h === "string" ? f[h] : f
      }
    }
  }, removeData:function(f, h) {
    if(k.acceptData(f)) {
      f = f == e ? W : f;
      var n = f.nodeType, o = n ? f[k.expando] : f, r = k.cache, u = n ? r[o] : o;
      if(h) {
        if(u) {
          delete u[h];
          n && k.isEmptyObject(u) && k.removeData(f)
        }
      }else {
        if(n && k.support.deleteExpando) {
          delete f[k.expando]
        }else {
          if(f.removeAttribute) {
            f.removeAttribute(k.expando)
          }else {
            if(n) {
              delete r[o]
            }else {
              for(var x in f) {
                delete f[x]
              }
            }
          }
        }
      }
    }
  }, acceptData:function(f) {
    if(f.nodeName) {
      var h = k.noData[f.nodeName.toLowerCase()];
      if(h) {
        return!(h === true || f.getAttribute("classid") !== h)
      }
    }
    return true
  }});
  k.fn.extend({data:function(f, h) {
    if(typeof f === "undefined") {
      return this.length ? k.data(this[0]) : null
    }else {
      if(typeof f === "object") {
        return this.each(function() {
          k.data(this, f)
        })
      }
    }
    var n = f.split(".");
    n[1] = n[1] ? "." + n[1] : "";
    if(h === c) {
      var o = this.triggerHandler("getData" + n[1] + "!", [n[0]]);
      if(o === c && this.length) {
        o = k.data(this[0], f);
        if(o === c && this[0].nodeType === 1) {
          o = this[0].getAttribute("data-" + f);
          if(typeof o === "string") {
            try {
              o = o === "true" ? true : o === "false" ? false : o === "null" ? null : !k.isNaN(o) ? parseFloat(o) : ia.test(o) ? k.parseJSON(o) : o
            }catch(r) {
            }
          }else {
            o = c
          }
        }
      }
      return o === c && n[1] ? this.data(n[0]) : o
    }else {
      return this.each(function() {
        var u = k(this), x = [n[0], h];
        u.triggerHandler("setData" + n[1] + "!", x);
        k.data(this, f, h);
        u.triggerHandler("changeData" + n[1] + "!", x)
      })
    }
  }, removeData:function(f) {
    return this.each(function() {
      k.removeData(this, f)
    })
  }});
  k.extend({queue:function(f, h, n) {
    if(f) {
      h = (h || "fx") + "queue";
      var o = k.data(f, h);
      if(!n) {
        return o || []
      }
      if(!o || k.isArray(n)) {
        o = k.data(f, h, k.makeArray(n))
      }else {
        o.push(n)
      }
      return o
    }
  }, dequeue:function(f, h) {
    h = h || "fx";
    var n = k.queue(f, h), o = n.shift();
    if(o === "inprogress") {
      o = n.shift()
    }
    if(o) {
      h === "fx" && n.unshift("inprogress");
      o.call(f, function() {
        k.dequeue(f, h)
      })
    }
  }});
  k.fn.extend({queue:function(f, h) {
    if(typeof f !== "string") {
      h = f;
      f = "fx"
    }
    if(h === c) {
      return k.queue(this[0], f)
    }
    return this.each(function() {
      var n = k.queue(this, f, h);
      f === "fx" && n[0] !== "inprogress" && k.dequeue(this, f)
    })
  }, dequeue:function(f) {
    return this.each(function() {
      k.dequeue(this, f)
    })
  }, delay:function(f, h) {
    f = k.fx ? k.fx.speeds[f] || f : f;
    h = h || "fx";
    return this.queue(h, function() {
      var n = this;
      setTimeout(function() {
        k.dequeue(n, h)
      }, f)
    })
  }, clearQueue:function(f) {
    return this.queue(f || "fx", [])
  }});
  var ga = /[\n\t]/g, ba = /\s+/, ja = /\r/g, pa = /^(?:href|src|style)$/, za = /^(?:button|input)$/i, qa = /^(?:button|input|object|select|textarea)$/i, ta = /^a(?:rea)?$/i, ua = /^(?:radio|checkbox)$/i;
  k.fn.extend({attr:function(f, h) {
    return k.access(this, f, h, true, k.attr)
  }, removeAttr:function(f) {
    return this.each(function() {
      k.attr(this, f, "");
      this.nodeType === 1 && this.removeAttribute(f)
    })
  }, addClass:function(f) {
    if(k.isFunction(f)) {
      return this.each(function(J) {
        var L = k(this);
        L.addClass(f.call(this, J, L.attr("class")))
      })
    }
    if(f && typeof f === "string") {
      for(var h = (f || "").split(ba), n = 0, o = this.length;n < o;n++) {
        var r = this[n];
        if(r.nodeType === 1) {
          if(r.className) {
            for(var u = " " + r.className + " ", x = r.className, z = 0, C = h.length;z < C;z++) {
              if(u.indexOf(" " + h[z] + " ") < 0) {
                x += " " + h[z]
              }
            }
            r.className = k.trim(x)
          }else {
            r.className = f
          }
        }
      }
    }
    return this
  }, removeClass:function(f) {
    if(k.isFunction(f)) {
      return this.each(function(C) {
        var J = k(this);
        J.removeClass(f.call(this, C, J.attr("class")))
      })
    }
    if(f && typeof f === "string" || f === c) {
      for(var h = (f || "").split(ba), n = 0, o = this.length;n < o;n++) {
        var r = this[n];
        if(r.nodeType === 1 && r.className) {
          if(f) {
            for(var u = (" " + r.className + " ").replace(ga, " "), x = 0, z = h.length;x < z;x++) {
              u = u.replace(" " + h[x] + " ", " ")
            }
            r.className = k.trim(u)
          }else {
            r.className = ""
          }
        }
      }
    }
    return this
  }, toggleClass:function(f, h) {
    var n = typeof f, o = typeof h === "boolean";
    if(k.isFunction(f)) {
      return this.each(function(r) {
        var u = k(this);
        u.toggleClass(f.call(this, r, u.attr("class"), h), h)
      })
    }
    return this.each(function() {
      if(n === "string") {
        for(var r, u = 0, x = k(this), z = h, C = f.split(ba);r = C[u++];) {
          z = o ? z : !x.hasClass(r);
          x[z ? "addClass" : "removeClass"](r)
        }
      }else {
        if(n === "undefined" || n === "boolean") {
          this.className && k.data(this, "__className__", this.className);
          this.className = this.className || f === false ? "" : k.data(this, "__className__") || ""
        }
      }
    })
  }, hasClass:function(f) {
    f = " " + f + " ";
    for(var h = 0, n = this.length;h < n;h++) {
      if((" " + this[h].className + " ").replace(ga, " ").indexOf(f) > -1) {
        return true
      }
    }
    return false
  }, val:function(f) {
    if(!arguments.length) {
      var h = this[0];
      if(h) {
        if(k.nodeName(h, "option")) {
          var n = h.attributes.value;
          return!n || n.specified ? h.value : h.text
        }
        if(k.nodeName(h, "select")) {
          var o = h.selectedIndex;
          n = [];
          var r = h.options;
          h = h.type === "select-one";
          if(o < 0) {
            return null
          }
          var u = h ? o : 0;
          for(o = h ? o + 1 : r.length;u < o;u++) {
            var x = r[u];
            if(x.selected && (k.support.optDisabled ? !x.disabled : x.getAttribute("disabled") === null) && (!x.parentNode.disabled || !k.nodeName(x.parentNode, "optgroup"))) {
              f = k(x).val();
              if(h) {
                return f
              }
              n.push(f)
            }
          }
          return n
        }
        if(ua.test(h.type) && !k.support.checkOn) {
          return h.getAttribute("value") === null ? "on" : h.value
        }
        return(h.value || "").replace(ja, "")
      }
      return c
    }
    var z = k.isFunction(f);
    return this.each(function(C) {
      var J = k(this), L = f;
      if(this.nodeType === 1) {
        if(z) {
          L = f.call(this, C, J.val())
        }
        if(L == null) {
          L = ""
        }else {
          if(typeof L === "number") {
            L += ""
          }else {
            if(k.isArray(L)) {
              L = k.map(L, function(U) {
                return U == null ? "" : U + ""
              })
            }
          }
        }
        if(k.isArray(L) && ua.test(this.type)) {
          this.checked = k.inArray(J.val(), L) >= 0
        }else {
          if(k.nodeName(this, "select")) {
            var R = k.makeArray(L);
            k("option", this).each(function() {
              this.selected = k.inArray(k(this).val(), R) >= 0
            });
            if(!R.length) {
              this.selectedIndex = -1
            }
          }else {
            this.value = L
          }
        }
      }
    })
  }});
  k.extend({attrFn:{val:true, css:true, html:true, text:true, data:true, width:true, height:true, offset:true}, attr:function(f, h, n, o) {
    if(!f || f.nodeType === 3 || f.nodeType === 8) {
      return c
    }
    if(o && h in k.attrFn) {
      return k(f)[h](n)
    }
    o = f.nodeType !== 1 || !k.isXMLDoc(f);
    var r = n !== c;
    h = o && k.props[h] || h;
    if(f.nodeType === 1) {
      var u = pa.test(h);
      if((h in f || f[h] !== c) && o && !u) {
        if(r) {
          h === "type" && za.test(f.nodeName) && f.parentNode && k.error("type property can't be changed");
          if(n === null) {
            f.nodeType === 1 && f.removeAttribute(h)
          }else {
            f[h] = n
          }
        }
        if(k.nodeName(f, "form") && f.getAttributeNode(h)) {
          return f.getAttributeNode(h).nodeValue
        }
        if(h === "tabIndex") {
          return(h = f.getAttributeNode("tabIndex")) && h.specified ? h.value : qa.test(f.nodeName) || ta.test(f.nodeName) && f.href ? 0 : c
        }
        return f[h]
      }
      if(!k.support.style && o && h === "style") {
        if(r) {
          f.style.cssText = "" + n
        }
        return f.style.cssText
      }
      r && f.setAttribute(h, "" + n);
      if(!f.attributes[h] && f.hasAttribute && !f.hasAttribute(h)) {
        return c
      }
      f = !k.support.hrefNormalized && o && u ? f.getAttribute(h, 2) : f.getAttribute(h);
      return f === null ? c : f
    }
  }});
  var la = /\.(.*)$/, ra = /^(?:textarea|input|select)$/i, sa = /\./g, va = / /g, Za = /[^\w\s.|`]/g, $a = function(f) {
    return f.replace(Za, "\\$&")
  }, Ha = {focusin:0, focusout:0};
  k.event = {add:function(f, h, n, o) {
    if(!(f.nodeType === 3 || f.nodeType === 8)) {
      if(k.isWindow(f) && f !== e && !f.frameElement) {
        f = e
      }
      if(n === false) {
        n = a
      }
      var r, u;
      if(n.handler) {
        r = n;
        n = r.handler
      }
      if(!n.guid) {
        n.guid = k.guid++
      }
      if(u = k.data(f)) {
        var x = f.nodeType ? "events" : "__events__", z = u[x], C = u.handle;
        if(typeof z === "function") {
          C = z.handle;
          z = z.events
        }else {
          if(!z) {
            f.nodeType || (u[x] = u = function() {
            });
            u.events = z = {}
          }
        }
        if(!C) {
          u.handle = C = function() {
            return typeof k !== "undefined" && !k.event.triggered ? k.event.handle.apply(C.elem, arguments) : c
          }
        }
        C.elem = f;
        h = h.split(" ");
        for(var J = 0, L;x = h[J++];) {
          u = r ? k.extend({}, r) : {handler:n, data:o};
          if(x.indexOf(".") > -1) {
            L = x.split(".");
            x = L.shift();
            u.namespace = L.slice(0).sort().join(".")
          }else {
            L = [];
            u.namespace = ""
          }
          u.type = x;
          if(!u.guid) {
            u.guid = n.guid
          }
          var R = z[x], U = k.event.special[x] || {};
          if(!R) {
            R = z[x] = [];
            if(!U.setup || U.setup.call(f, o, L, C) === false) {
              if(f.addEventListener) {
                f.addEventListener(x, C, false)
              }else {
                f.attachEvent && f.attachEvent("on" + x, C)
              }
            }
          }
          if(U.add) {
            U.add.call(f, u);
            if(!u.handler.guid) {
              u.handler.guid = n.guid
            }
          }
          R.push(u);
          k.event.global[x] = true
        }
        f = null
      }
    }
  }, global:{}, remove:function(f, h, n, o) {
    if(!(f.nodeType === 3 || f.nodeType === 8)) {
      if(n === false) {
        n = a
      }
      var r, u, x = 0, z, C, J, L, R, U, Z = f.nodeType ? "events" : "__events__", N = k.data(f), Y = N && N[Z];
      if(N && Y) {
        if(typeof Y === "function") {
          N = Y;
          Y = Y.events
        }
        if(h && h.type) {
          n = h.handler;
          h = h.type
        }
        if(!h || typeof h === "string" && h.charAt(0) === ".") {
          h = h || "";
          for(r in Y) {
            k.event.remove(f, r + h)
          }
        }else {
          for(h = h.split(" ");r = h[x++];) {
            L = r;
            z = r.indexOf(".") < 0;
            C = [];
            if(!z) {
              C = r.split(".");
              r = C.shift();
              J = RegExp("(^|\\.)" + k.map(C.slice(0).sort(), $a).join("\\.(?:.*\\.)?") + "(\\.|$)")
            }
            if(R = Y[r]) {
              if(n) {
                L = k.event.special[r] || {};
                for(u = o || 0;u < R.length;u++) {
                  U = R[u];
                  if(n.guid === U.guid) {
                    if(z || J.test(U.namespace)) {
                      o == null && R.splice(u--, 1);
                      L.remove && L.remove.call(f, U)
                    }
                    if(o != null) {
                      break
                    }
                  }
                }
                if(R.length === 0 || o != null && R.length === 1) {
                  if(!L.teardown || L.teardown.call(f, C) === false) {
                    k.removeEvent(f, r, N.handle)
                  }
                  delete Y[r]
                }
              }else {
                for(u = 0;u < R.length;u++) {
                  U = R[u];
                  if(z || J.test(U.namespace)) {
                    k.event.remove(f, L, U.handler, u);
                    R.splice(u--, 1)
                  }
                }
              }
            }
          }
          if(k.isEmptyObject(Y)) {
            if(h = N.handle) {
              h.elem = null
            }
            delete N.events;
            delete N.handle;
            if(typeof N === "function") {
              k.removeData(f, Z)
            }else {
              k.isEmptyObject(N) && k.removeData(f)
            }
          }
        }
      }
    }
  }, trigger:function(f, h, n, o) {
    var r = f.type || f;
    if(!o) {
      f = typeof f === "object" ? f[k.expando] ? f : k.extend(k.Event(r), f) : k.Event(r);
      if(r.indexOf("!") >= 0) {
        f.type = r = r.slice(0, -1);
        f.exclusive = true
      }
      if(!n) {
        f.stopPropagation();
        k.event.global[r] && k.each(k.cache, function() {
          this.events && this.events[r] && k.event.trigger(f, h, this.handle.elem)
        })
      }
      if(!n || n.nodeType === 3 || n.nodeType === 8) {
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
      if(!(n && n.nodeName && k.noData[n.nodeName.toLowerCase()])) {
        if(n["on" + r] && n["on" + r].apply(n, h) === false) {
          f.result = false;
          f.preventDefault()
        }
      }
    }catch(u) {
    }
    if(!f.isPropagationStopped() && o) {
      k.event.trigger(f, h, o, true)
    }else {
      if(!f.isDefaultPrevented()) {
        o = f.target;
        var x, z = r.replace(la, ""), C = k.nodeName(o, "a") && z === "click", J = k.event.special[z] || {};
        if((!J._default || J._default.call(n, f) === false) && !C && !(o && o.nodeName && k.noData[o.nodeName.toLowerCase()])) {
          try {
            if(o[z]) {
              if(x = o["on" + z]) {
                o["on" + z] = null
              }
              k.event.triggered = true;
              o[z]()
            }
          }catch(L) {
          }
          if(x) {
            o["on" + z] = x
          }
          k.event.triggered = false
        }
      }
    }
  }, handle:function(f) {
    var h, n, o;
    n = [];
    var r, u = k.makeArray(arguments);
    f = u[0] = k.event.fix(f || e.event);
    f.currentTarget = this;
    h = f.type.indexOf(".") < 0 && !f.exclusive;
    if(!h) {
      o = f.type.split(".");
      f.type = o.shift();
      n = o.slice(0).sort();
      o = RegExp("(^|\\.)" + n.join("\\.(?:.*\\.)?") + "(\\.|$)")
    }
    f.namespace = f.namespace || n.join(".");
    r = k.data(this, this.nodeType ? "events" : "__events__");
    if(typeof r === "function") {
      r = r.events
    }
    n = (r || {})[f.type];
    if(r && n) {
      n = n.slice(0);
      r = 0;
      for(var x = n.length;r < x;r++) {
        var z = n[r];
        if(h || o.test(z.namespace)) {
          f.handler = z.handler;
          f.data = z.data;
          f.handleObj = z;
          z = z.handler.apply(this, u);
          if(z !== c) {
            f.result = z;
            if(z === false) {
              f.preventDefault();
              f.stopPropagation()
            }
          }
          if(f.isImmediatePropagationStopped()) {
            break
          }
        }
      }
    }
    return f.result
  }, props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "), fix:function(f) {
    if(f[k.expando]) {
      return f
    }
    var h = f;
    f = k.Event(h);
    for(var n = this.props.length, o;n;) {
      o = this.props[--n];
      f[o] = h[o]
    }
    if(!f.target) {
      f.target = f.srcElement || G
    }
    if(f.target.nodeType === 3) {
      f.target = f.target.parentNode
    }
    if(!f.relatedTarget && f.fromElement) {
      f.relatedTarget = f.fromElement === f.target ? f.toElement : f.fromElement
    }
    if(f.pageX == null && f.clientX != null) {
      h = G.documentElement;
      n = G.body;
      f.pageX = f.clientX + (h && h.scrollLeft || n && n.scrollLeft || 0) - (h && h.clientLeft || n && n.clientLeft || 0);
      f.pageY = f.clientY + (h && h.scrollTop || n && n.scrollTop || 0) - (h && h.clientTop || n && n.clientTop || 0)
    }
    if(f.which == null && (f.charCode != null || f.keyCode != null)) {
      f.which = f.charCode != null ? f.charCode : f.keyCode
    }
    if(!f.metaKey && f.ctrlKey) {
      f.metaKey = f.ctrlKey
    }
    if(!f.which && f.button !== c) {
      f.which = f.button & 1 ? 1 : f.button & 2 ? 3 : f.button & 4 ? 2 : 0
    }
    return f
  }, guid:1E8, proxy:k.proxy, special:{ready:{setup:k.bindReady, teardown:k.noop}, live:{add:function(f) {
    k.event.add(this, m(f.origType, f.selector), k.extend({}, f, {handler:g, guid:f.handler.guid}))
  }, remove:function(f) {
    k.event.remove(this, m(f.origType, f.selector), f)
  }}, beforeunload:{setup:function(f, h, n) {
    if(k.isWindow(this)) {
      this.onbeforeunload = n
    }
  }, teardown:function(f, h) {
    if(this.onbeforeunload === h) {
      this.onbeforeunload = null
    }
  }}}};
  k.removeEvent = G.removeEventListener ? function(f, h, n) {
    f.removeEventListener && f.removeEventListener(h, n, false)
  } : function(f, h, n) {
    f.detachEvent && f.detachEvent("on" + h, n)
  };
  k.Event = function(f) {
    if(!this.preventDefault) {
      return new k.Event(f)
    }
    if(f && f.type) {
      this.originalEvent = f;
      this.type = f.type
    }else {
      this.type = f
    }
    this.timeStamp = k.now();
    this[k.expando] = true
  };
  k.Event.prototype = {preventDefault:function() {
    this.isDefaultPrevented = b;
    var f = this.originalEvent;
    if(f) {
      if(f.preventDefault) {
        f.preventDefault()
      }else {
        f.returnValue = false
      }
    }
  }, stopPropagation:function() {
    this.isPropagationStopped = b;
    var f = this.originalEvent;
    if(f) {
      f.stopPropagation && f.stopPropagation();
      f.cancelBubble = true
    }
  }, stopImmediatePropagation:function() {
    this.isImmediatePropagationStopped = b;
    this.stopPropagation()
  }, isDefaultPrevented:a, isPropagationStopped:a, isImmediatePropagationStopped:a};
  var Ia = function(f) {
    var h = f.relatedTarget;
    try {
      for(;h && h !== this;) {
        h = h.parentNode
      }
      if(h !== this) {
        f.type = f.data;
        k.event.handle.apply(this, arguments)
      }
    }catch(n) {
    }
  }, Ja = function(f) {
    f.type = f.data;
    k.event.handle.apply(this, arguments)
  };
  k.each({mouseenter:"mouseover", mouseleave:"mouseout"}, function(f, h) {
    k.event.special[f] = {setup:function(n) {
      k.event.add(this, h, n && n.selector ? Ja : Ia, f)
    }, teardown:function(n) {
      k.event.remove(this, h, n && n.selector ? Ja : Ia)
    }}
  });
  if(!k.support.submitBubbles) {
    k.event.special.submit = {setup:function() {
      if(this.nodeName.toLowerCase() !== "form") {
        k.event.add(this, "click.specialSubmit", function(f) {
          var h = f.target, n = h.type;
          if((n === "submit" || n === "image") && k(h).closest("form").length) {
            f.liveFired = c;
            return d("submit", this, arguments)
          }
        });
        k.event.add(this, "keypress.specialSubmit", function(f) {
          var h = f.target, n = h.type;
          if((n === "text" || n === "password") && k(h).closest("form").length && f.keyCode === 13) {
            f.liveFired = c;
            return d("submit", this, arguments)
          }
        })
      }else {
        return false
      }
    }, teardown:function() {
      k.event.remove(this, ".specialSubmit")
    }}
  }
  if(!k.support.changeBubbles) {
    var xa, Ka = function(f) {
      var h = f.type, n = f.value;
      if(h === "radio" || h === "checkbox") {
        n = f.checked
      }else {
        if(h === "select-multiple") {
          n = f.selectedIndex > -1 ? k.map(f.options, function(o) {
            return o.selected
          }).join("-") : ""
        }else {
          if(f.nodeName.toLowerCase() === "select") {
            n = f.selectedIndex
          }
        }
      }
      return n
    }, Aa = function(f, h) {
      var n = f.target, o, r;
      if(!(!ra.test(n.nodeName) || n.readOnly)) {
        o = k.data(n, "_change_data");
        r = Ka(n);
        if(f.type !== "focusout" || n.type !== "radio") {
          k.data(n, "_change_data", r)
        }
        if(!(o === c || r === o)) {
          if(o != null || r) {
            f.type = "change";
            f.liveFired = c;
            return k.event.trigger(f, h, n)
          }
        }
      }
    };
    k.event.special.change = {filters:{focusout:Aa, beforedeactivate:Aa, click:function(f) {
      var h = f.target, n = h.type;
      if(n === "radio" || n === "checkbox" || h.nodeName.toLowerCase() === "select") {
        return Aa.call(this, f)
      }
    }, keydown:function(f) {
      var h = f.target, n = h.type;
      if(f.keyCode === 13 && h.nodeName.toLowerCase() !== "textarea" || f.keyCode === 32 && (n === "checkbox" || n === "radio") || n === "select-multiple") {
        return Aa.call(this, f)
      }
    }, beforeactivate:function(f) {
      f = f.target;
      k.data(f, "_change_data", Ka(f))
    }}, setup:function() {
      if(this.type === "file") {
        return false
      }
      for(var f in xa) {
        k.event.add(this, f + ".specialChange", xa[f])
      }
      return ra.test(this.nodeName)
    }, teardown:function() {
      k.event.remove(this, ".specialChange");
      return ra.test(this.nodeName)
    }};
    xa = k.event.special.change.filters;
    xa.focus = xa.beforeactivate
  }
  G.addEventListener && k.each({focus:"focusin", blur:"focusout"}, function(f, h) {
    function n(o) {
      o = k.event.fix(o);
      o.type = h;
      return k.event.trigger(o, null, o.target)
    }
    k.event.special[h] = {setup:function() {
      Ha[h]++ === 0 && G.addEventListener(f, n, true)
    }, teardown:function() {
      --Ha[h] === 0 && G.removeEventListener(f, n, true)
    }}
  });
  k.each(["bind", "one"], function(f, h) {
    k.fn[h] = function(n, o, r) {
      if(typeof n === "object") {
        for(var u in n) {
          this[h](u, o, n[u], r)
        }
        return this
      }
      if(k.isFunction(o) || o === false) {
        r = o;
        o = c
      }
      var x = h === "one" ? k.proxy(r, function(C) {
        k(this).unbind(C, x);
        return r.apply(this, arguments)
      }) : r;
      if(n === "unload" && h !== "one") {
        this.one(n, o, r)
      }else {
        u = 0;
        for(var z = this.length;u < z;u++) {
          k.event.add(this[u], n, x, o)
        }
      }
      return this
    }
  });
  k.fn.extend({unbind:function(f, h) {
    if(typeof f === "object" && !f.preventDefault) {
      for(var n in f) {
        this.unbind(n, f[n])
      }
    }else {
      n = 0;
      for(var o = this.length;n < o;n++) {
        k.event.remove(this[n], f, h)
      }
    }
    return this
  }, delegate:function(f, h, n, o) {
    return this.live(h, n, o, f)
  }, undelegate:function(f, h, n) {
    return arguments.length === 0 ? this.unbind("live") : this.die(h, null, n, f)
  }, trigger:function(f, h) {
    return this.each(function() {
      k.event.trigger(f, h, this)
    })
  }, triggerHandler:function(f, h) {
    if(this[0]) {
      var n = k.Event(f);
      n.preventDefault();
      n.stopPropagation();
      k.event.trigger(n, h, this[0]);
      return n.result
    }
  }, toggle:function(f) {
    for(var h = arguments, n = 1;n < h.length;) {
      k.proxy(f, h[n++])
    }
    return this.click(k.proxy(f, function(o) {
      var r = (k.data(this, "lastToggle" + f.guid) || 0) % n;
      k.data(this, "lastToggle" + f.guid, r + 1);
      o.preventDefault();
      return h[r].apply(this, arguments) || false
    }))
  }, hover:function(f, h) {
    return this.mouseenter(f).mouseleave(h || f)
  }});
  var La = {focus:"focusin", blur:"focusout", mouseenter:"mouseover", mouseleave:"mouseout"};
  k.each(["live", "die"], function(f, h) {
    k.fn[h] = function(n, o, r, u) {
      var x, z = 0, C, J, L = u || this.selector;
      u = u ? this : k(this.context);
      if(typeof n === "object" && !n.preventDefault) {
        for(x in n) {
          u[h](x, o, n[x], L)
        }
        return this
      }
      if(k.isFunction(o)) {
        r = o;
        o = c
      }
      for(n = (n || "").split(" ");(x = n[z++]) != null;) {
        C = la.exec(x);
        J = "";
        if(C) {
          J = C[0];
          x = x.replace(la, "")
        }
        if(x === "hover") {
          n.push("mouseenter" + J, "mouseleave" + J)
        }else {
          C = x;
          if(x === "focus" || x === "blur") {
            n.push(La[x] + J);
            x += J
          }else {
            x = (La[x] || x) + J
          }
          if(h === "live") {
            J = 0;
            for(var R = u.length;J < R;J++) {
              k.event.add(u[J], "live." + m(x, L), {data:o, selector:L, handler:r, origType:x, origHandler:r, preType:C})
            }
          }else {
            u.unbind("live." + m(x, L), r)
          }
        }
      }
      return this
    }
  });
  k.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "), function(f, h) {
    k.fn[h] = function(n, o) {
      if(o == null) {
        o = n;
        n = null
      }
      return arguments.length > 0 ? this.bind(h, n, o) : this.trigger(h)
    };
    if(k.attrFn) {
      k.attrFn[h] = true
    }
  });
  e.attachEvent && !e.addEventListener && k(e).bind("unload", function() {
    for(var f in k.cache) {
      if(k.cache[f].handle) {
        try {
          k.event.remove(k.cache[f].handle.elem)
        }catch(h) {
        }
      }
    }
  });
  (function() {
    function f(t, w, D, B, E, F) {
      E = 0;
      for(var K = B.length;E < K;E++) {
        var O = B[E];
        if(O) {
          O = O[t];
          for(var T = false;O;) {
            if(O.sizcache === D) {
              T = B[O.sizset];
              break
            }
            if(O.nodeType === 1 && !F) {
              O.sizcache = D;
              O.sizset = E
            }
            if(O.nodeName.toLowerCase() === w) {
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
      for(var K = B.length;E < K;E++) {
        var O = B[E];
        if(O) {
          O = O[t];
          for(var T = false;O;) {
            if(O.sizcache === D) {
              T = B[O.sizset];
              break
            }
            if(O.nodeType === 1) {
              if(!F) {
                O.sizcache = D;
                O.sizset = E
              }
              if(typeof w !== "string") {
                if(O === w) {
                  T = true;
                  break
                }
              }else {
                if(z.filter(w, [O]).length > 0) {
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
    var n = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, o = 0, r = Object.prototype.toString, u = false, x = true;
    [0, 0].sort(function() {
      x = false;
      return 0
    });
    var z = function(t, w, D, B) {
      D = D || [];
      var E = w = w || G;
      if(w.nodeType !== 1 && w.nodeType !== 9) {
        return[]
      }
      if(!t || typeof t !== "string") {
        return D
      }
      var F = [], K, O, T, ma, ha = true, oa = z.isXML(w), na = t, ea;
      do {
        n.exec("");
        if(K = n.exec(na)) {
          na = K[3];
          F.push(K[1]);
          if(K[2]) {
            ma = K[3];
            break
          }
        }
      }while(K);
      if(F.length > 1 && J.exec(t)) {
        if(F.length === 2 && C.relative[F[0]]) {
          O = fa(F[0] + F[1], w)
        }else {
          for(O = C.relative[F[0]] ? [w] : z(F.shift(), w);F.length;) {
            t = F.shift();
            if(C.relative[t]) {
              t += F.shift()
            }
            O = fa(t, O)
          }
        }
      }else {
        if(!B && F.length > 1 && w.nodeType === 9 && !oa && C.match.ID.test(F[0]) && !C.match.ID.test(F[F.length - 1])) {
          K = z.find(F.shift(), w, oa);
          w = K.expr ? z.filter(K.expr, K.set)[0] : K.set[0]
        }
        if(w) {
          K = B ? {expr:F.pop(), set:U(B)} : z.find(F.pop(), F.length === 1 && (F[0] === "~" || F[0] === "+") && w.parentNode ? w.parentNode : w, oa);
          O = K.expr ? z.filter(K.expr, K.set) : K.set;
          if(F.length > 0) {
            T = U(O)
          }else {
            ha = false
          }
          for(;F.length;) {
            K = ea = F.pop();
            if(C.relative[ea]) {
              K = F.pop()
            }else {
              ea = ""
            }
            if(K == null) {
              K = w
            }
            C.relative[ea](T, K, oa)
          }
        }else {
          T = []
        }
      }
      T || (T = O);
      T || z.error(ea || t);
      if(r.call(T) === "[object Array]") {
        if(ha) {
          if(w && w.nodeType === 1) {
            for(t = 0;T[t] != null;t++) {
              if(T[t] && (T[t] === true || T[t].nodeType === 1 && z.contains(w, T[t]))) {
                D.push(O[t])
              }
            }
          }else {
            for(t = 0;T[t] != null;t++) {
              T[t] && T[t].nodeType === 1 && D.push(O[t])
            }
          }
        }else {
          D.push.apply(D, T)
        }
      }else {
        U(T, D)
      }
      if(ma) {
        z(ma, E, D, B);
        z.uniqueSort(D)
      }
      return D
    };
    z.uniqueSort = function(t) {
      if(N) {
        u = x;
        t.sort(N);
        if(u) {
          for(var w = 1;w < t.length;w++) {
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
      if(!t) {
        return[]
      }
      for(var E = 0, F = C.order.length;E < F;E++) {
        var K = C.order[E], O;
        if(O = C.leftMatch[K].exec(t)) {
          var T = O[1];
          O.splice(1, 1);
          if(T.substr(T.length - 1) !== "\\") {
            O[1] = (O[1] || "").replace(/\\/g, "");
            B = C.find[K](O, w, D);
            if(B != null) {
              t = t.replace(C.match[K], "");
              break
            }
          }
        }
      }
      B || (B = w.getElementsByTagName("*"));
      return{set:B, expr:t}
    };
    z.filter = function(t, w, D, B) {
      for(var E = t, F = [], K = w, O, T, ma = w && w[0] && z.isXML(w[0]);t && w.length;) {
        for(var ha in C.filter) {
          if((O = C.leftMatch[ha].exec(t)) != null && O[2]) {
            var oa = C.filter[ha], na, ea;
            ea = O[1];
            T = false;
            O.splice(1, 1);
            if(ea.substr(ea.length - 1) !== "\\") {
              if(K === F) {
                F = []
              }
              if(C.preFilter[ha]) {
                if(O = C.preFilter[ha](O, K, D, F, B, ma)) {
                  if(O === true) {
                    continue
                  }
                }else {
                  T = na = true
                }
              }
              if(O) {
                for(var v = 0;(ea = K[v]) != null;v++) {
                  if(ea) {
                    na = oa(ea, O, v, K);
                    var I = B ^ !!na;
                    if(D && na != null) {
                      if(I) {
                        T = true
                      }else {
                        K[v] = false
                      }
                    }else {
                      if(I) {
                        F.push(ea);
                        T = true
                      }
                    }
                  }
                }
              }
              if(na !== c) {
                D || (K = F);
                t = t.replace(C.match[ha], "");
                if(!T) {
                  return[]
                }
                break
              }
            }
          }
        }
        if(t === E) {
          if(T == null) {
            z.error(t)
          }else {
            break
          }
        }
        E = t
      }
      return K
    };
    z.error = function(t) {
      throw"Syntax error, unrecognized expression: " + t;
    };
    var C = z.selectors = {order:["ID", "NAME", "TAG"], match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/, CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/, NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/, ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/, TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/, CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/, POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/, PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/}, 
    leftMatch:{}, attrMap:{"class":"className", "for":"htmlFor"}, attrHandle:{href:function(t) {
      return t.getAttribute("href")
    }}, relative:{"+":function(t, w) {
      var D = typeof w === "string", B = D && !/\W/.test(w);
      D = D && !B;
      if(B) {
        w = w.toLowerCase()
      }
      B = 0;
      for(var E = t.length, F;B < E;B++) {
        if(F = t[B]) {
          for(;(F = F.previousSibling) && F.nodeType !== 1;) {
          }
          t[B] = D || F && F.nodeName.toLowerCase() === w ? F || false : F === w
        }
      }
      D && z.filter(w, t, true)
    }, ">":function(t, w) {
      var D = typeof w === "string", B, E = 0, F = t.length;
      if(D && !/\W/.test(w)) {
        for(w = w.toLowerCase();E < F;E++) {
          if(B = t[E]) {
            D = B.parentNode;
            t[E] = D.nodeName.toLowerCase() === w ? D : false
          }
        }
      }else {
        for(;E < F;E++) {
          if(B = t[E]) {
            t[E] = D ? B.parentNode : B.parentNode === w
          }
        }
        D && z.filter(w, t, true)
      }
    }, "":function(t, w, D) {
      var B = o++, E = h, F;
      if(typeof w === "string" && !/\W/.test(w)) {
        F = w = w.toLowerCase();
        E = f
      }
      E("parentNode", w, B, t, F, D)
    }, "~":function(t, w, D) {
      var B = o++, E = h, F;
      if(typeof w === "string" && !/\W/.test(w)) {
        F = w = w.toLowerCase();
        E = f
      }
      E("previousSibling", w, B, t, F, D)
    }}, find:{ID:function(t, w, D) {
      if(typeof w.getElementById !== "undefined" && !D) {
        return(t = w.getElementById(t[1])) && t.parentNode ? [t] : []
      }
    }, NAME:function(t, w) {
      if(typeof w.getElementsByName !== "undefined") {
        for(var D = [], B = w.getElementsByName(t[1]), E = 0, F = B.length;E < F;E++) {
          B[E].getAttribute("name") === t[1] && D.push(B[E])
        }
        return D.length === 0 ? null : D
      }
    }, TAG:function(t, w) {
      return w.getElementsByTagName(t[1])
    }}, preFilter:{CLASS:function(t, w, D, B, E, F) {
      t = " " + t[1].replace(/\\/g, "") + " ";
      if(F) {
        return t
      }
      F = 0;
      for(var K;(K = w[F]) != null;F++) {
        if(K) {
          if(E ^ (K.className && (" " + K.className + " ").replace(/[\t\n]/g, " ").indexOf(t) >= 0)) {
            D || B.push(K)
          }else {
            if(D) {
              w[F] = false
            }
          }
        }
      }
      return false
    }, ID:function(t) {
      return t[1].replace(/\\/g, "")
    }, TAG:function(t) {
      return t[1].toLowerCase()
    }, CHILD:function(t) {
      if(t[1] === "nth") {
        var w = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(t[2] === "even" && "2n" || t[2] === "odd" && "2n+1" || !/\D/.test(t[2]) && "0n+" + t[2] || t[2]);
        t[2] = w[1] + (w[2] || 1) - 0;
        t[3] = w[3] - 0
      }
      t[0] = o++;
      return t
    }, ATTR:function(t, w, D, B, E, F) {
      w = t[1].replace(/\\/g, "");
      if(!F && C.attrMap[w]) {
        t[1] = C.attrMap[w]
      }
      if(t[2] === "~=") {
        t[4] = " " + t[4] + " "
      }
      return t
    }, PSEUDO:function(t, w, D, B, E) {
      if(t[1] === "not") {
        if((n.exec(t[3]) || "").length > 1 || /^\w/.test(t[3])) {
          t[3] = z(t[3], null, null, w)
        }else {
          t = z.filter(t[3], w, D, true ^ E);
          D || B.push.apply(B, t);
          return false
        }
      }else {
        if(C.match.POS.test(t[0]) || C.match.CHILD.test(t[0])) {
          return true
        }
      }
      return t
    }, POS:function(t) {
      t.unshift(true);
      return t
    }}, filters:{enabled:function(t) {
      return t.disabled === false && t.type !== "hidden"
    }, disabled:function(t) {
      return t.disabled === true
    }, checked:function(t) {
      return t.checked === true
    }, selected:function(t) {
      return t.selected === true
    }, parent:function(t) {
      return!!t.firstChild
    }, empty:function(t) {
      return!t.firstChild
    }, has:function(t, w, D) {
      return!!z(D[3], t).length
    }, header:function(t) {
      return/h\d/i.test(t.nodeName)
    }, text:function(t) {
      return"text" === t.type
    }, radio:function(t) {
      return"radio" === t.type
    }, checkbox:function(t) {
      return"checkbox" === t.type
    }, file:function(t) {
      return"file" === t.type
    }, password:function(t) {
      return"password" === t.type
    }, submit:function(t) {
      return"submit" === t.type
    }, image:function(t) {
      return"image" === t.type
    }, reset:function(t) {
      return"reset" === t.type
    }, button:function(t) {
      return"button" === t.type || t.nodeName.toLowerCase() === "button"
    }, input:function(t) {
      return/input|select|textarea|button/i.test(t.nodeName)
    }}, setFilters:{first:function(t, w) {
      return w === 0
    }, last:function(t, w, D, B) {
      return w === B.length - 1
    }, even:function(t, w) {
      return w % 2 === 0
    }, odd:function(t, w) {
      return w % 2 === 1
    }, lt:function(t, w, D) {
      return w < D[3] - 0
    }, gt:function(t, w, D) {
      return w > D[3] - 0
    }, nth:function(t, w, D) {
      return D[3] - 0 === w
    }, eq:function(t, w, D) {
      return D[3] - 0 === w
    }}, filter:{PSEUDO:function(t, w, D, B) {
      var E = w[1], F = C.filters[E];
      if(F) {
        return F(t, D, w, B)
      }else {
        if(E === "contains") {
          return(t.textContent || t.innerText || z.getText([t]) || "").indexOf(w[3]) >= 0
        }else {
          if(E === "not") {
            w = w[3];
            D = 0;
            for(B = w.length;D < B;D++) {
              if(w[D] === t) {
                return false
              }
            }
            return true
          }else {
            z.error("Syntax error, unrecognized expression: " + E)
          }
        }
      }
    }, CHILD:function(t, w) {
      var D = w[1], B = t;
      switch(D) {
        case "only":
        ;
        case "first":
          for(;B = B.previousSibling;) {
            if(B.nodeType === 1) {
              return false
            }
          }
          if(D === "first") {
            return true
          }
          B = t;
        case "last":
          for(;B = B.nextSibling;) {
            if(B.nodeType === 1) {
              return false
            }
          }
          return true;
        case "nth":
          D = w[2];
          var E = w[3];
          if(D === 1 && E === 0) {
            return true
          }
          var F = w[0], K = t.parentNode;
          if(K && (K.sizcache !== F || !t.nodeIndex)) {
            var O = 0;
            for(B = K.firstChild;B;B = B.nextSibling) {
              if(B.nodeType === 1) {
                B.nodeIndex = ++O
              }
            }
            K.sizcache = F
          }
          B = t.nodeIndex - E;
          return D === 0 ? B === 0 : B % D === 0 && B / D >= 0
      }
    }, ID:function(t, w) {
      return t.nodeType === 1 && t.getAttribute("id") === w
    }, TAG:function(t, w) {
      return w === "*" && t.nodeType === 1 || t.nodeName.toLowerCase() === w
    }, CLASS:function(t, w) {
      return(" " + (t.className || t.getAttribute("class")) + " ").indexOf(w) > -1
    }, ATTR:function(t, w) {
      var D = w[1];
      D = C.attrHandle[D] ? C.attrHandle[D](t) : t[D] != null ? t[D] : t.getAttribute(D);
      var B = D + "", E = w[2], F = w[4];
      return D == null ? E === "!=" : E === "=" ? B === F : E === "*=" ? B.indexOf(F) >= 0 : E === "~=" ? (" " + B + " ").indexOf(F) >= 0 : !F ? B && D !== false : E === "!=" ? B !== F : E === "^=" ? B.indexOf(F) === 0 : E === "$=" ? B.substr(B.length - F.length) === F : E === "|=" ? B === F || B.substr(0, F.length + 1) === F + "-" : false
    }, POS:function(t, w, D, B) {
      var E = C.setFilters[w[2]];
      if(E) {
        return E(t, D, w, B)
      }
    }}}, J = C.match.POS, L = function(t, w) {
      return"\\" + (w - 0 + 1)
    }, R;
    for(R in C.match) {
      C.match[R] = RegExp(C.match[R].source + /(?![^\[]*\])(?![^\(]*\))/.source);
      C.leftMatch[R] = RegExp(/(^(?:.|\r|\n)*?)/.source + C.match[R].source.replace(/\\(\d+)/g, L))
    }
    var U = function(t, w) {
      t = Array.prototype.slice.call(t, 0);
      if(w) {
        w.push.apply(w, t);
        return w
      }
      return t
    };
    try {
      Array.prototype.slice.call(G.documentElement.childNodes, 0)
    }catch(Z) {
      U = function(t, w) {
        var D = w || [], B = 0;
        if(r.call(t) === "[object Array]") {
          Array.prototype.push.apply(D, t)
        }else {
          if(typeof t.length === "number") {
            for(var E = t.length;B < E;B++) {
              D.push(t[B])
            }
          }else {
            for(;t[B];B++) {
              D.push(t[B])
            }
          }
        }
        return D
      }
    }
    var N, Y;
    if(G.documentElement.compareDocumentPosition) {
      N = function(t, w) {
        if(t === w) {
          u = true;
          return 0
        }
        if(!t.compareDocumentPosition || !w.compareDocumentPosition) {
          return t.compareDocumentPosition ? -1 : 1
        }
        return t.compareDocumentPosition(w) & 4 ? -1 : 1
      }
    }else {
      N = function(t, w) {
        var D = [], B = [], E = t.parentNode, F = w.parentNode, K = E;
        if(t === w) {
          u = true;
          return 0
        }else {
          if(E === F) {
            return Y(t, w)
          }else {
            if(E) {
              if(!F) {
                return 1
              }
            }else {
              return-1
            }
          }
        }
        for(;K;) {
          D.unshift(K);
          K = K.parentNode
        }
        for(K = F;K;) {
          B.unshift(K);
          K = K.parentNode
        }
        E = D.length;
        F = B.length;
        for(K = 0;K < E && K < F;K++) {
          if(D[K] !== B[K]) {
            return Y(D[K], B[K])
          }
        }
        return K === E ? Y(t, B[K], -1) : Y(D[K], w, 1)
      };
      Y = function(t, w, D) {
        if(t === w) {
          return D
        }
        for(t = t.nextSibling;t;) {
          if(t === w) {
            return-1
          }
          t = t.nextSibling
        }
        return 1
      }
    }
    z.getText = function(t) {
      for(var w = "", D, B = 0;t[B];B++) {
        D = t[B];
        if(D.nodeType === 3 || D.nodeType === 4) {
          w += D.nodeValue
        }else {
          if(D.nodeType !== 8) {
            w += z.getText(D.childNodes)
          }
        }
      }
      return w
    };
    (function() {
      var t = G.createElement("div"), w = "script" + (new Date).getTime();
      t.innerHTML = "<a name='" + w + "'/>";
      var D = G.documentElement;
      D.insertBefore(t, D.firstChild);
      if(G.getElementById(w)) {
        C.find.ID = function(B, E, F) {
          if(typeof E.getElementById !== "undefined" && !F) {
            return(E = E.getElementById(B[1])) ? E.id === B[1] || typeof E.getAttributeNode !== "undefined" && E.getAttributeNode("id").nodeValue === B[1] ? [E] : c : []
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
      if(t.getElementsByTagName("*").length > 0) {
        C.find.TAG = function(w, D) {
          var B = D.getElementsByTagName(w[1]);
          if(w[1] === "*") {
            for(var E = [], F = 0;B[F];F++) {
              B[F].nodeType === 1 && E.push(B[F])
            }
            B = E
          }
          return B
        }
      }
      t.innerHTML = "<a href='#'></a>";
      if(t.firstChild && typeof t.firstChild.getAttribute !== "undefined" && t.firstChild.getAttribute("href") !== "#") {
        C.attrHandle.href = function(w) {
          return w.getAttribute("href", 2)
        }
      }
      t = null
    })();
    G.querySelectorAll && function() {
      var t = z, w = G.createElement("div");
      w.innerHTML = "<p class='TEST'></p>";
      if(!(w.querySelectorAll && w.querySelectorAll(".TEST").length === 0)) {
        z = function(B, E, F, K) {
          E = E || G;
          if(!K && !z.isXML(E)) {
            if(E.nodeType === 9) {
              try {
                return U(E.querySelectorAll(B), F)
              }catch(O) {
              }
            }else {
              if(E.nodeType === 1 && E.nodeName.toLowerCase() !== "object") {
                var T = E.id, ma = E.id = "__sizzle__";
                try {
                  return U(E.querySelectorAll("#" + ma + " " + B), F)
                }catch(ha) {
                }finally {
                  if(T) {
                    E.id = T
                  }else {
                    E.removeAttribute("id")
                  }
                }
              }
            }
          }
          return t(B, E, F, K)
        };
        for(var D in t) {
          z[D] = t[D]
        }
        w = null
      }
    }();
    (function() {
      var t = G.documentElement, w = t.matchesSelector || t.mozMatchesSelector || t.webkitMatchesSelector || t.msMatchesSelector, D = false;
      try {
        w.call(G.documentElement, ":sizzle")
      }catch(B) {
        D = true
      }
      if(w) {
        z.matchesSelector = function(E, F) {
          try {
            if(D || !C.match.PSEUDO.test(F)) {
              return w.call(E, F)
            }
          }catch(K) {
          }
          return z(F, null, null, [E]).length > 0
        }
      }
    })();
    (function() {
      var t = G.createElement("div");
      t.innerHTML = "<div class='test e'></div><div class='test'></div>";
      if(!(!t.getElementsByClassName || t.getElementsByClassName("e").length === 0)) {
        t.lastChild.className = "e";
        if(t.getElementsByClassName("e").length !== 1) {
          C.order.splice(1, 0, "CLASS");
          C.find.CLASS = function(w, D, B) {
            if(typeof D.getElementsByClassName !== "undefined" && !B) {
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
      return!!(t.compareDocumentPosition(w) & 16)
    };
    z.isXML = function(t) {
      return(t = (t ? t.ownerDocument || t : 0).documentElement) ? t.nodeName !== "HTML" : false
    };
    var fa = function(t, w) {
      for(var D = [], B = "", E, F = w.nodeType ? [w] : w;E = C.match.PSEUDO.exec(t);) {
        B += E[0];
        t = t.replace(C.match.PSEUDO, "")
      }
      t = C.relative[t] ? t + "*" : t;
      E = 0;
      for(var K = F.length;E < K;E++) {
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
  var ab = /Until$/, bb = /^(?:parents|prevUntil|prevAll)/, cb = /,/, Va = /^.[^:#\[\.,]*$/, db = Array.prototype.slice, eb = k.expr.match.POS;
  k.fn.extend({find:function(f) {
    for(var h = this.pushStack("", "find", f), n = 0, o = 0, r = this.length;o < r;o++) {
      n = h.length;
      k.find(f, this[o], h);
      if(o > 0) {
        for(var u = n;u < h.length;u++) {
          for(var x = 0;x < n;x++) {
            if(h[x] === h[u]) {
              h.splice(u--, 1);
              break
            }
          }
        }
      }
    }
    return h
  }, has:function(f) {
    var h = k(f);
    return this.filter(function() {
      for(var n = 0, o = h.length;n < o;n++) {
        if(k.contains(this, h[n])) {
          return true
        }
      }
    })
  }, not:function(f) {
    return this.pushStack(q(this, f, false), "not", f)
  }, filter:function(f) {
    return this.pushStack(q(this, f, true), "filter", f)
  }, is:function(f) {
    return!!f && k.filter(f, this).length > 0
  }, closest:function(f, h) {
    var n = [], o, r, u = this[0];
    if(k.isArray(f)) {
      var x = {}, z, C = 1;
      if(u && f.length) {
        o = 0;
        for(r = f.length;o < r;o++) {
          z = f[o];
          x[z] || (x[z] = k.expr.match.POS.test(z) ? k(z, h || this.context) : z)
        }
        for(;u && u.ownerDocument && u !== h;) {
          for(z in x) {
            o = x[z];
            if(o.jquery ? o.index(u) > -1 : k(u).is(o)) {
              n.push({selector:z, elem:u, level:C})
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
    for(r = this.length;o < r;o++) {
      for(u = this[o];u;) {
        if(x ? x.index(u) > -1 : k.find.matchesSelector(u, f)) {
          n.push(u);
          break
        }else {
          u = u.parentNode;
          if(!u || !u.ownerDocument || u === h) {
            break
          }
        }
      }
    }
    n = n.length > 1 ? k.unique(n) : n;
    return this.pushStack(n, "closest", f)
  }, index:function(f) {
    if(!f || typeof f === "string") {
      return k.inArray(this[0], f ? k(f) : this.parent().children())
    }
    return k.inArray(f.jquery ? f[0] : f, this)
  }, add:function(f, h) {
    var n = typeof f === "string" ? k(f, h || this.context) : k.makeArray(f), o = k.merge(this.get(), n);
    return this.pushStack(!n[0] || !n[0].parentNode || n[0].parentNode.nodeType === 11 || !o[0] || !o[0].parentNode || o[0].parentNode.nodeType === 11 ? o : k.unique(o))
  }, andSelf:function() {
    return this.add(this.prevObject)
  }});
  k.each({parent:function(f) {
    return(f = f.parentNode) && f.nodeType !== 11 ? f : null
  }, parents:function(f) {
    return k.dir(f, "parentNode")
  }, parentsUntil:function(f, h, n) {
    return k.dir(f, "parentNode", n)
  }, next:function(f) {
    return k.nth(f, 2, "nextSibling")
  }, prev:function(f) {
    return k.nth(f, 2, "previousSibling")
  }, nextAll:function(f) {
    return k.dir(f, "nextSibling")
  }, prevAll:function(f) {
    return k.dir(f, "previousSibling")
  }, nextUntil:function(f, h, n) {
    return k.dir(f, "nextSibling", n)
  }, prevUntil:function(f, h, n) {
    return k.dir(f, "previousSibling", n)
  }, siblings:function(f) {
    return k.sibling(f.parentNode.firstChild, f)
  }, children:function(f) {
    return k.sibling(f.firstChild)
  }, contents:function(f) {
    return k.nodeName(f, "iframe") ? f.contentDocument || f.contentWindow.document : k.makeArray(f.childNodes)
  }}, function(f, h) {
    k.fn[f] = function(n, o) {
      var r = k.map(this, h, n);
      ab.test(f) || (o = n);
      if(o && typeof o === "string") {
        r = k.filter(o, r)
      }
      r = this.length > 1 ? k.unique(r) : r;
      if((this.length > 1 || cb.test(o)) && bb.test(f)) {
        r = r.reverse()
      }
      return this.pushStack(r, f, db.call(arguments).join(","))
    }
  });
  k.extend({filter:function(f, h, n) {
    if(n) {
      f = ":not(" + f + ")"
    }
    return h.length === 1 ? k.find.matchesSelector(h[0], f) ? [h[0]] : [] : k.find.matches(f, h)
  }, dir:function(f, h, n) {
    var o = [];
    for(f = f[h];f && f.nodeType !== 9 && (n === c || f.nodeType !== 1 || !k(f).is(n));) {
      f.nodeType === 1 && o.push(f);
      f = f[h]
    }
    return o
  }, nth:function(f, h, n) {
    h = h || 1;
    for(var o = 0;f;f = f[n]) {
      if(f.nodeType === 1 && ++o === h) {
        break
      }
    }
    return f
  }, sibling:function(f, h) {
    for(var n = [];f;f = f.nextSibling) {
      f.nodeType === 1 && f !== h && n.push(f)
    }
    return n
  }});
  var Ma = / jQuery\d+="(?:\d+|null)"/g, Ba = /^\s+/, Na = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig, Oa = /<([\w:]+)/, fb = /<tbody/i, gb = /<|&#?\w+;/, Pa = /<(?:script|object|embed|option|style)/i, Qa = /checked\s*(?:[^=]|=\s*.checked.)/i, hb = /\=([^="'>\s]+\/)>/g, ka = {option:[1, "<select multiple='multiple'>", "</select>"], legend:[1, "<fieldset>", "</fieldset>"], thead:[1, "<table>", "</table>"], tr:[2, "<table><tbody>", "</tbody></table>"], td:[3, "<table><tbody><tr>", 
  "</tr></tbody></table>"], col:[2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], area:[1, "<map>", "</map>"], _default:[0, "", ""]};
  ka.optgroup = ka.option;
  ka.tbody = ka.tfoot = ka.colgroup = ka.caption = ka.thead;
  ka.th = ka.td;
  if(!k.support.htmlSerialize) {
    ka._default = [1, "div<div>", "</div>"]
  }
  k.fn.extend({text:function(f) {
    if(k.isFunction(f)) {
      return this.each(function(h) {
        var n = k(this);
        n.text(f.call(this, h, n.text()))
      })
    }
    if(typeof f !== "object" && f !== c) {
      return this.empty().append((this[0] && this[0].ownerDocument || G).createTextNode(f))
    }
    return k.text(this)
  }, wrapAll:function(f) {
    if(k.isFunction(f)) {
      return this.each(function(n) {
        k(this).wrapAll(f.call(this, n))
      })
    }
    if(this[0]) {
      var h = k(f, this[0].ownerDocument).eq(0).clone(true);
      this[0].parentNode && h.insertBefore(this[0]);
      h.map(function() {
        for(var n = this;n.firstChild && n.firstChild.nodeType === 1;) {
          n = n.firstChild
        }
        return n
      }).append(this)
    }
    return this
  }, wrapInner:function(f) {
    if(k.isFunction(f)) {
      return this.each(function(h) {
        k(this).wrapInner(f.call(this, h))
      })
    }
    return this.each(function() {
      var h = k(this), n = h.contents();
      n.length ? n.wrapAll(f) : h.append(f)
    })
  }, wrap:function(f) {
    return this.each(function() {
      k(this).wrapAll(f)
    })
  }, unwrap:function() {
    return this.parent().each(function() {
      k.nodeName(this, "body") || k(this).replaceWith(this.childNodes)
    }).end()
  }, append:function() {
    return this.domManip(arguments, true, function(f) {
      this.nodeType === 1 && this.appendChild(f)
    })
  }, prepend:function() {
    return this.domManip(arguments, true, function(f) {
      this.nodeType === 1 && this.insertBefore(f, this.firstChild)
    })
  }, before:function() {
    if(this[0] && this[0].parentNode) {
      return this.domManip(arguments, false, function(h) {
        this.parentNode.insertBefore(h, this)
      })
    }else {
      if(arguments.length) {
        var f = k(arguments[0]);
        f.push.apply(f, this.toArray());
        return this.pushStack(f, "before", arguments)
      }
    }
  }, after:function() {
    if(this[0] && this[0].parentNode) {
      return this.domManip(arguments, false, function(h) {
        this.parentNode.insertBefore(h, this.nextSibling)
      })
    }else {
      if(arguments.length) {
        var f = this.pushStack(this, "after", arguments);
        f.push.apply(f, k(arguments[0]).toArray());
        return f
      }
    }
  }, remove:function(f, h) {
    for(var n = 0, o;(o = this[n]) != null;n++) {
      if(!f || k.filter(f, [o]).length) {
        if(!h && o.nodeType === 1) {
          k.cleanData(o.getElementsByTagName("*"));
          k.cleanData([o])
        }
        o.parentNode && o.parentNode.removeChild(o)
      }
    }
    return this
  }, empty:function() {
    for(var f = 0, h;(h = this[f]) != null;f++) {
      for(h.nodeType === 1 && k.cleanData(h.getElementsByTagName("*"));h.firstChild;) {
        h.removeChild(h.firstChild)
      }
    }
    return this
  }, clone:function(f) {
    var h = this.map(function() {
      if(!k.support.noCloneEvent && !k.isXMLDoc(this)) {
        var n = this.outerHTML, o = this.ownerDocument;
        if(!n) {
          n = o.createElement("div");
          n.appendChild(this.cloneNode(true));
          n = n.innerHTML
        }
        return k.clean([n.replace(Ma, "").replace(hb, '="$1">').replace(Ba, "")], o)[0]
      }else {
        return this.cloneNode(true)
      }
    });
    if(f === true) {
      s(this, h);
      s(this.find("*"), h.find("*"))
    }
    return h
  }, html:function(f) {
    if(f === c) {
      return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(Ma, "") : null
    }else {
      if(typeof f === "string" && !Pa.test(f) && (k.support.leadingWhitespace || !Ba.test(f)) && !ka[(Oa.exec(f) || ["", ""])[1].toLowerCase()]) {
        f = f.replace(Na, "<$1></$2>");
        try {
          for(var h = 0, n = this.length;h < n;h++) {
            if(this[h].nodeType === 1) {
              k.cleanData(this[h].getElementsByTagName("*"));
              this[h].innerHTML = f
            }
          }
        }catch(o) {
          this.empty().append(f)
        }
      }else {
        k.isFunction(f) ? this.each(function(r) {
          var u = k(this);
          u.html(f.call(this, r, u.html()))
        }) : this.empty().append(f)
      }
    }
    return this
  }, replaceWith:function(f) {
    if(this[0] && this[0].parentNode) {
      if(k.isFunction(f)) {
        return this.each(function(h) {
          var n = k(this), o = n.html();
          n.replaceWith(f.call(this, h, o))
        })
      }
      if(typeof f !== "string") {
        f = k(f).detach()
      }
      return this.each(function() {
        var h = this.nextSibling, n = this.parentNode;
        k(this).remove();
        h ? k(h).before(f) : k(n).append(f)
      })
    }else {
      return this.pushStack(k(k.isFunction(f) ? f() : f), "replaceWith", f)
    }
  }, detach:function(f) {
    return this.remove(f, true)
  }, domManip:function(f, h, n) {
    var o, r, u = f[0], x = [], z;
    if(!k.support.checkClone && arguments.length === 3 && typeof u === "string" && Qa.test(u)) {
      return this.each(function() {
        k(this).domManip(f, h, n, true)
      })
    }
    if(k.isFunction(u)) {
      return this.each(function(J) {
        var L = k(this);
        f[0] = u.call(this, J, h ? L.html() : c);
        L.domManip(f, h, n)
      })
    }
    if(this[0]) {
      o = u && u.parentNode;
      o = k.support.parentNode && o && o.nodeType === 11 && o.childNodes.length === this.length ? {fragment:o} : k.buildFragment(f, this, x);
      z = o.fragment;
      if(r = z.childNodes.length === 1 ? z = z.firstChild : z.firstChild) {
        h = h && k.nodeName(r, "tr");
        r = 0;
        for(var C = this.length;r < C;r++) {
          n.call(h ? k.nodeName(this[r], "table") ? this[r].getElementsByTagName("tbody")[0] || this[r].appendChild(this[r].ownerDocument.createElement("tbody")) : this[r] : this[r], r > 0 || o.cacheable || this.length > 1 ? z.cloneNode(true) : z)
        }
      }
      x.length && k.each(x, y)
    }
    return this
  }});
  k.buildFragment = function(f, h, n) {
    var o, r, u;
    h = h && h[0] ? h[0].ownerDocument || h[0] : G;
    if(f.length === 1 && typeof f[0] === "string" && f[0].length < 512 && h === G && !Pa.test(f[0]) && (k.support.checkClone || !Qa.test(f[0]))) {
      r = true;
      if(u = k.fragments[f[0]]) {
        if(u !== 1) {
          o = u
        }
      }
    }
    if(!o) {
      o = h.createDocumentFragment();
      k.clean(f, h, o, n)
    }
    if(r) {
      k.fragments[f[0]] = u ? o : 1
    }
    return{fragment:o, cacheable:r}
  };
  k.fragments = {};
  k.each({appendTo:"append", prependTo:"prepend", insertBefore:"before", insertAfter:"after", replaceAll:"replaceWith"}, function(f, h) {
    k.fn[f] = function(n) {
      var o = [];
      n = k(n);
      var r = this.length === 1 && this[0].parentNode;
      if(r && r.nodeType === 11 && r.childNodes.length === 1 && n.length === 1) {
        n[h](this[0]);
        return this
      }else {
        r = 0;
        for(var u = n.length;r < u;r++) {
          var x = (r > 0 ? this.clone(true) : this).get();
          k(n[r])[h](x);
          o = o.concat(x)
        }
        return this.pushStack(o, f, n.selector)
      }
    }
  });
  k.extend({clean:function(f, h, n, o) {
    h = h || G;
    if(typeof h.createElement === "undefined") {
      h = h.ownerDocument || h[0] && h[0].ownerDocument || G
    }
    for(var r = [], u = 0, x;(x = f[u]) != null;u++) {
      if(typeof x === "number") {
        x += ""
      }
      if(x) {
        if(typeof x === "string" && !gb.test(x)) {
          x = h.createTextNode(x)
        }else {
          if(typeof x === "string") {
            x = x.replace(Na, "<$1></$2>");
            var z = (Oa.exec(x) || ["", ""])[1].toLowerCase(), C = ka[z] || ka._default, J = C[0], L = h.createElement("div");
            for(L.innerHTML = C[1] + x + C[2];J--;) {
              L = L.lastChild
            }
            if(!k.support.tbody) {
              J = fb.test(x);
              z = z === "table" && !J ? L.firstChild && L.firstChild.childNodes : C[1] === "<table>" && !J ? L.childNodes : [];
              for(C = z.length - 1;C >= 0;--C) {
                k.nodeName(z[C], "tbody") && !z[C].childNodes.length && z[C].parentNode.removeChild(z[C])
              }
            }
            !k.support.leadingWhitespace && Ba.test(x) && L.insertBefore(h.createTextNode(Ba.exec(x)[0]), L.firstChild);
            x = L.childNodes
          }
        }
        if(x.nodeType) {
          r.push(x)
        }else {
          r = k.merge(r, x)
        }
      }
    }
    if(n) {
      for(u = 0;r[u];u++) {
        if(o && k.nodeName(r[u], "script") && (!r[u].type || r[u].type.toLowerCase() === "text/javascript")) {
          o.push(r[u].parentNode ? r[u].parentNode.removeChild(r[u]) : r[u])
        }else {
          r[u].nodeType === 1 && r.splice.apply(r, [u + 1, 0].concat(k.makeArray(r[u].getElementsByTagName("script"))));
          n.appendChild(r[u])
        }
      }
    }
    return r
  }, cleanData:function(f) {
    for(var h, n, o = k.cache, r = k.event.special, u = k.support.deleteExpando, x = 0, z;(z = f[x]) != null;x++) {
      if(!(z.nodeName && k.noData[z.nodeName.toLowerCase()])) {
        if(n = z[k.expando]) {
          if((h = o[n]) && h.events) {
            for(var C in h.events) {
              r[C] ? k.event.remove(z, C) : k.removeEvent(z, C, h.handle)
            }
          }
          if(u) {
            delete z[k.expando]
          }else {
            z.removeAttribute && z.removeAttribute(k.expando)
          }
          delete o[n]
        }
      }
    }
  }});
  var Ra = /alpha\([^)]*\)/i, ib = /opacity=([^)]*)/, jb = /-([a-z])/ig, kb = /([A-Z])/g, Sa = /^-?\d+(?:px)?$/i, lb = /^-?\d/, mb = {position:"absolute", visibility:"hidden", display:"block"}, Wa = ["Left", "Right"], Xa = ["Top", "Bottom"], ya, nb = G.defaultView && G.defaultView.getComputedStyle, ob = function(f, h) {
    return h.toUpperCase()
  };
  k.fn.css = function(f, h) {
    if(arguments.length === 2 && h === c) {
      return this
    }
    return k.access(this, f, h, true, function(n, o, r) {
      return r !== c ? k.style(n, o, r) : k.css(n, o)
    })
  };
  k.extend({cssHooks:{opacity:{get:function(f, h) {
    if(h) {
      var n = ya(f, "opacity", "opacity");
      return n === "" ? "1" : n
    }else {
      return f.style.opacity
    }
  }}}, cssNumber:{zIndex:true, fontWeight:true, opacity:true, zoom:true, lineHeight:true}, cssProps:{"float":k.support.cssFloat ? "cssFloat" : "styleFloat"}, style:function(f, h, n, o) {
    if(!(!f || f.nodeType === 3 || f.nodeType === 8 || !f.style)) {
      var r, u = k.camelCase(h), x = f.style, z = k.cssHooks[u];
      h = k.cssProps[u] || u;
      if(n !== c) {
        if(!(typeof n === "number" && isNaN(n) || n == null)) {
          if(typeof n === "number" && !k.cssNumber[u]) {
            n += "px"
          }
          if(!z || !("set" in z) || (n = z.set(f, n)) !== c) {
            try {
              x[h] = n
            }catch(C) {
            }
          }
        }
      }else {
        if(z && "get" in z && (r = z.get(f, false, o)) !== c) {
          return r
        }
        return x[h]
      }
    }
  }, css:function(f, h, n) {
    var o, r = k.camelCase(h), u = k.cssHooks[r];
    h = k.cssProps[r] || r;
    if(u && "get" in u && (o = u.get(f, true, n)) !== c) {
      return o
    }else {
      if(ya) {
        return ya(f, h, r)
      }
    }
  }, swap:function(f, h, n) {
    var o = {}, r;
    for(r in h) {
      o[r] = f.style[r];
      f.style[r] = h[r]
    }
    n.call(f);
    for(r in h) {
      f.style[r] = o[r]
    }
  }, camelCase:function(f) {
    return f.replace(jb, ob)
  }});
  k.curCSS = k.css;
  k.each(["height", "width"], function(f, h) {
    k.cssHooks[h] = {get:function(n, o, r) {
      var u;
      if(o) {
        if(n.offsetWidth !== 0) {
          u = A(n, h, r)
        }else {
          k.swap(n, mb, function() {
            u = A(n, h, r)
          })
        }
        return u + "px"
      }
    }, set:function(n, o) {
      if(Sa.test(o)) {
        o = parseFloat(o);
        if(o >= 0) {
          return o + "px"
        }
      }else {
        return o
      }
    }}
  });
  if(!k.support.opacity) {
    k.cssHooks.opacity = {get:function(f, h) {
      return ib.test((h && f.currentStyle ? f.currentStyle.filter : f.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : h ? "1" : ""
    }, set:function(f, h) {
      var n = f.style;
      n.zoom = 1;
      var o = k.isNaN(h) ? "" : "alpha(opacity=" + h * 100 + ")", r = n.filter || "";
      n.filter = Ra.test(r) ? r.replace(Ra, o) : n.filter + " " + o
    }}
  }
  if(nb) {
    ya = function(f, h, n) {
      var o;
      n = n.replace(kb, "-$1").toLowerCase();
      if(!(h = f.ownerDocument.defaultView)) {
        return c
      }
      if(h = h.getComputedStyle(f, null)) {
        o = h.getPropertyValue(n);
        if(o === "" && !k.contains(f.ownerDocument.documentElement, f)) {
          o = k.style(f, n)
        }
      }
      return o
    }
  }else {
    if(G.documentElement.currentStyle) {
      ya = function(f, h) {
        var n, o, r = f.currentStyle && f.currentStyle[h], u = f.style;
        if(!Sa.test(r) && lb.test(r)) {
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
  if(k.expr && k.expr.filters) {
    k.expr.filters.hidden = function(f) {
      var h = f.offsetHeight;
      return f.offsetWidth === 0 && h === 0 || !k.support.reliableHiddenOffsets && (f.style.display || k.css(f, "display")) === "none"
    };
    k.expr.filters.visible = function(f) {
      return!k.expr.filters.hidden(f)
    }
  }
  var pb = k.now(), qb = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, rb = /^(?:select|textarea)/i, sb = /^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, tb = /^(?:GET|HEAD|DELETE)$/, Ya = /\[\]$/, wa = /\=\?(&|$)/, Fa = /\?/, ub = /([?&])_=[^&]*/, vb = /^(\w+:)?\/\/([^\/?#]+)/, wb = /%20/g, xb = /#.*$/, Ta = k.fn.load;
  k.fn.extend({load:function(f, h, n) {
    if(typeof f !== "string" && Ta) {
      return Ta.apply(this, arguments)
    }else {
      if(!this.length) {
        return this
      }
    }
    var o = f.indexOf(" ");
    if(o >= 0) {
      var r = f.slice(o, f.length);
      f = f.slice(0, o)
    }
    o = "GET";
    if(h) {
      if(k.isFunction(h)) {
        n = h;
        h = null
      }else {
        if(typeof h === "object") {
          h = k.param(h, k.ajaxSettings.traditional);
          o = "POST"
        }
      }
    }
    var u = this;
    k.ajax({url:f, type:o, dataType:"html", data:h, complete:function(x, z) {
      if(z === "success" || z === "notmodified") {
        u.html(r ? k("<div>").append(x.responseText.replace(qb, "")).find(r) : x.responseText)
      }
      n && u.each(n, [x.responseText, z, x])
    }});
    return this
  }, serialize:function() {
    return k.param(this.serializeArray())
  }, serializeArray:function() {
    return this.map(function() {
      return this.elements ? k.makeArray(this.elements) : this
    }).filter(function() {
      return this.name && !this.disabled && (this.checked || rb.test(this.nodeName) || sb.test(this.type))
    }).map(function(f, h) {
      var n = k(this).val();
      return n == null ? null : k.isArray(n) ? k.map(n, function(o) {
        return{name:h.name, value:o}
      }) : {name:h.name, value:n}
    }).get()
  }});
  k.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(f, h) {
    k.fn[h] = function(n) {
      return this.bind(h, n)
    }
  });
  k.extend({get:function(f, h, n, o) {
    if(k.isFunction(h)) {
      o = o || n;
      n = h;
      h = null
    }
    return k.ajax({type:"GET", url:f, data:h, success:n, dataType:o})
  }, getScript:function(f, h) {
    return k.get(f, null, h, "script")
  }, getJSON:function(f, h, n) {
    return k.get(f, h, n, "json")
  }, post:function(f, h, n, o) {
    if(k.isFunction(h)) {
      o = o || n;
      n = h;
      h = {}
    }
    return k.ajax({type:"POST", url:f, data:h, success:n, dataType:o})
  }, ajaxSetup:function(f) {
    k.extend(k.ajaxSettings, f)
  }, ajaxSettings:{url:location.href, global:true, type:"GET", contentType:"application/x-www-form-urlencoded", processData:true, async:true, xhr:function() {
    return new e.XMLHttpRequest
  }, accepts:{xml:"application/xml, text/xml", html:"text/html", script:"text/javascript, application/javascript", json:"application/json, text/javascript", text:"text/plain", _default:"*/*"}}, ajax:function(f) {
    var h = k.extend(true, {}, k.ajaxSettings, f), n, o, r, u = h.type.toUpperCase(), x = tb.test(u);
    h.url = h.url.replace(xb, "");
    h.context = f && f.context != null ? f.context : h;
    if(h.data && h.processData && typeof h.data !== "string") {
      h.data = k.param(h.data, h.traditional)
    }
    if(h.dataType === "jsonp") {
      if(u === "GET") {
        wa.test(h.url) || (h.url += (Fa.test(h.url) ? "&" : "?") + (h.jsonp || "callback") + "=?")
      }else {
        if(!h.data || !wa.test(h.data)) {
          h.data = (h.data ? h.data + "&" : "") + (h.jsonp || "callback") + "=?"
        }
      }
      h.dataType = "json"
    }
    if(h.dataType === "json" && (h.data && wa.test(h.data) || wa.test(h.url))) {
      n = h.jsonpCallback || "jsonp" + pb++;
      if(h.data) {
        h.data = (h.data + "").replace(wa, "=" + n + "$1")
      }
      h.url = h.url.replace(wa, "=" + n + "$1");
      h.dataType = "script";
      var z = e[n];
      e[n] = function(B) {
        r = B;
        k.handleSuccess(h, N, o, r);
        k.handleComplete(h, N, o, r);
        if(k.isFunction(z)) {
          z(B)
        }else {
          e[n] = c;
          try {
            delete e[n]
          }catch(E) {
          }
        }
        L && L.removeChild(R)
      }
    }
    if(h.dataType === "script" && h.cache === null) {
      h.cache = false
    }
    if(h.cache === false && u === "GET") {
      var C = k.now(), J = h.url.replace(ub, "$1_=" + C);
      h.url = J + (J === h.url ? (Fa.test(h.url) ? "&" : "?") + "_=" + C : "")
    }
    if(h.data && u === "GET") {
      h.url += (Fa.test(h.url) ? "&" : "?") + h.data
    }
    h.global && k.active++ === 0 && k.event.trigger("ajaxStart");
    C = (C = vb.exec(h.url)) && (C[1] && C[1] !== location.protocol || C[2] !== location.host);
    if(h.dataType === "script" && u === "GET" && C) {
      var L = G.getElementsByTagName("head")[0] || G.documentElement, R = G.createElement("script");
      if(h.scriptCharset) {
        R.charset = h.scriptCharset
      }
      R.src = h.url;
      if(!n) {
        var U = false;
        R.onload = R.onreadystatechange = function() {
          if(!U && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
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
    var Z = false, N = h.xhr();
    if(N) {
      h.username ? N.open(u, h.url, h.async, h.username, h.password) : N.open(u, h.url, h.async);
      try {
        if(h.data != null && !x || f && f.contentType) {
          N.setRequestHeader("Content-Type", h.contentType)
        }
        if(h.ifModified) {
          k.lastModified[h.url] && N.setRequestHeader("If-Modified-Since", k.lastModified[h.url]);
          k.etag[h.url] && N.setRequestHeader("If-None-Match", k.etag[h.url])
        }
        C || N.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        N.setRequestHeader("Accept", h.dataType && h.accepts[h.dataType] ? h.accepts[h.dataType] + ", */*; q=0.01" : h.accepts._default)
      }catch(Y) {
      }
      if(h.beforeSend && h.beforeSend.call(h.context, N, h) === false) {
        h.global && k.active-- === 1 && k.event.trigger("ajaxStop");
        N.abort();
        return false
      }
      h.global && k.triggerGlobal(h, "ajaxSend", [N, h]);
      var fa = N.onreadystatechange = function(B) {
        if(!N || N.readyState === 0 || B === "abort") {
          Z || k.handleComplete(h, N, o, r);
          Z = true;
          if(N) {
            N.onreadystatechange = k.noop
          }
        }else {
          if(!Z && N && (N.readyState === 4 || B === "timeout")) {
            Z = true;
            N.onreadystatechange = k.noop;
            o = B === "timeout" ? "timeout" : !k.httpSuccess(N) ? "error" : h.ifModified && k.httpNotModified(N, h.url) ? "notmodified" : "success";
            var E;
            if(o === "success") {
              try {
                r = k.httpData(N, h.dataType, h)
              }catch(F) {
                o = "parsererror";
                E = F
              }
            }
            if(o === "success" || o === "notmodified") {
              n || k.handleSuccess(h, N, o, r)
            }else {
              k.handleError(h, N, o, E)
            }
            n || k.handleComplete(h, N, o, r);
            B === "timeout" && N.abort();
            if(h.async) {
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
      }catch(w) {
      }
      h.async && h.timeout > 0 && setTimeout(function() {
        N && !Z && fa("timeout")
      }, h.timeout);
      try {
        N.send(x || h.data == null ? null : h.data)
      }catch(D) {
        k.handleError(h, N, null, D);
        k.handleComplete(h, N, o, r)
      }
      h.async || fa();
      return N
    }
  }, param:function(f, h) {
    var n = [], o = function(u, x) {
      x = k.isFunction(x) ? x() : x;
      n[n.length] = encodeURIComponent(u) + "=" + encodeURIComponent(x)
    };
    if(h === c) {
      h = k.ajaxSettings.traditional
    }
    if(k.isArray(f) || f.jquery) {
      k.each(f, function() {
        o(this.name, this.value)
      })
    }else {
      for(var r in f) {
        H(r, f[r], h, o)
      }
    }
    return n.join("&").replace(wb, "+")
  }});
  k.extend({active:0, lastModified:{}, etag:{}, handleError:function(f, h, n, o) {
    f.error && f.error.call(f.context, h, n, o);
    f.global && k.triggerGlobal(f, "ajaxError", [h, f, o])
  }, handleSuccess:function(f, h, n, o) {
    f.success && f.success.call(f.context, o, n, h);
    f.global && k.triggerGlobal(f, "ajaxSuccess", [h, f])
  }, handleComplete:function(f, h, n) {
    f.complete && f.complete.call(f.context, h, n);
    f.global && k.triggerGlobal(f, "ajaxComplete", [h, f]);
    f.global && k.active-- === 1 && k.event.trigger("ajaxStop")
  }, triggerGlobal:function(f, h, n) {
    (f.context && f.context.url == null ? k(f.context) : k.event).trigger(h, n)
  }, httpSuccess:function(f) {
    try {
      return!f.status && location.protocol === "file:" || f.status >= 200 && f.status < 300 || f.status === 304 || f.status === 1223
    }catch(h) {
    }
    return false
  }, httpNotModified:function(f, h) {
    var n = f.getResponseHeader("Last-Modified"), o = f.getResponseHeader("Etag");
    if(n) {
      k.lastModified[h] = n
    }
    if(o) {
      k.etag[h] = o
    }
    return f.status === 304
  }, httpData:function(f, h, n) {
    var o = f.getResponseHeader("content-type") || "", r = h === "xml" || !h && o.indexOf("xml") >= 0;
    f = r ? f.responseXML : f.responseText;
    r && f.documentElement.nodeName === "parsererror" && k.error("parsererror");
    if(n && n.dataFilter) {
      f = n.dataFilter(f, h)
    }
    if(typeof f === "string") {
      if(h === "json" || !h && o.indexOf("json") >= 0) {
        f = k.parseJSON(f)
      }else {
        if(h === "script" || !h && o.indexOf("javascript") >= 0) {
          k.globalEval(f)
        }
      }
    }
    return f
  }});
  if(e.ActiveXObject) {
    k.ajaxSettings.xhr = function() {
      if(e.location.protocol !== "file:") {
        try {
          return new e.XMLHttpRequest
        }catch(f) {
        }
      }
      try {
        return new e.ActiveXObject("Microsoft.XMLHTTP")
      }catch(h) {
      }
    }
  }
  k.support.ajax = !!k.ajaxSettings.xhr();
  var Da = {}, yb = /^(?:toggle|show|hide)$/, zb = /^([+\-]=)?([\d+.\-]+)(.*)$/, Ca, Ga = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]];
  k.fn.extend({show:function(f, h, n) {
    if(f || f === 0) {
      return this.animate(M("show", 3), f, h, n)
    }else {
      f = 0;
      for(h = this.length;f < h;f++) {
        if(!k.data(this[f], "olddisplay") && this[f].style.display === "none") {
          this[f].style.display = ""
        }
        this[f].style.display === "" && k.css(this[f], "display") === "none" && k.data(this[f], "olddisplay", S(this[f].nodeName))
      }
      for(f = 0;f < h;f++) {
        this[f].style.display = k.data(this[f], "olddisplay") || ""
      }
      return this
    }
  }, hide:function(f, h, n) {
    if(f || f === 0) {
      return this.animate(M("hide", 3), f, h, n)
    }else {
      f = 0;
      for(h = this.length;f < h;f++) {
        n = k.css(this[f], "display");
        n !== "none" && k.data(this[f], "olddisplay", n)
      }
      for(f = 0;f < h;f++) {
        this[f].style.display = "none"
      }
      return this
    }
  }, _toggle:k.fn.toggle, toggle:function(f, h, n) {
    var o = typeof f === "boolean";
    if(k.isFunction(f) && k.isFunction(h)) {
      this._toggle.apply(this, arguments)
    }else {
      f == null || o ? this.each(function() {
        var r = o ? f : k(this).is(":hidden");
        k(this)[r ? "show" : "hide"]()
      }) : this.animate(M("toggle", 3), f, h, n)
    }
    return this
  }, fadeTo:function(f, h, n, o) {
    return this.filter(":hidden").css("opacity", 0).show().end().animate({opacity:h}, f, n, o)
  }, animate:function(f, h, n, o) {
    var r = k.speed(h, n, o);
    if(k.isEmptyObject(f)) {
      return this.each(r.complete)
    }
    return this[r.queue === false ? "each" : "queue"](function() {
      var u = k.extend({}, r), x, z = this.nodeType === 1, C = z && k(this).is(":hidden"), J = this;
      for(x in f) {
        var L = k.camelCase(x);
        if(x !== L) {
          f[L] = f[x];
          delete f[x];
          x = L
        }
        if(f[x] === "hide" && C || f[x] === "show" && !C) {
          return u.complete.call(this)
        }
        if(z && (x === "height" || x === "width")) {
          u.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY];
          if(k.css(this, "display") === "inline" && k.css(this, "float") === "none") {
            if(k.support.inlineBlockNeedsLayout) {
              if(S(this.nodeName) === "inline") {
                this.style.display = "inline-block"
              }else {
                this.style.display = "inline";
                this.style.zoom = 1
              }
            }else {
              this.style.display = "inline-block"
            }
          }
        }
        if(k.isArray(f[x])) {
          (u.specialEasing = u.specialEasing || {})[x] = f[x][1];
          f[x] = f[x][0]
        }
      }
      if(u.overflow != null) {
        this.style.overflow = "hidden"
      }
      u.curAnim = k.extend({}, f);
      k.each(f, function(R, U) {
        var Z = new k.fx(J, u, R);
        if(yb.test(U)) {
          Z[U === "toggle" ? C ? "show" : "hide" : U](f)
        }else {
          var N = zb.exec(U), Y = Z.cur(true) || 0;
          if(N) {
            var fa = parseFloat(N[2]), t = N[3] || "px";
            if(t !== "px") {
              k.style(J, R, (fa || 1) + t);
              Y = (fa || 1) / Z.cur(true) * Y;
              k.style(J, R, Y + t)
            }
            if(N[1]) {
              fa = (N[1] === "-=" ? -1 : 1) * fa + Y
            }
            Z.custom(Y, fa, t)
          }else {
            Z.custom(Y, U, "")
          }
        }
      });
      return true
    })
  }, stop:function(f, h) {
    var n = k.timers;
    f && this.queue([]);
    this.each(function() {
      for(var o = n.length - 1;o >= 0;o--) {
        if(n[o].elem === this) {
          h && n[o](true);
          n.splice(o, 1)
        }
      }
    });
    h || this.dequeue();
    return this
  }});
  k.each({slideDown:M("show", 1), slideUp:M("hide", 1), slideToggle:M("toggle", 1), fadeIn:{opacity:"show"}, fadeOut:{opacity:"hide"}}, function(f, h) {
    k.fn[f] = function(n, o, r) {
      return this.animate(h, n, o, r)
    }
  });
  k.extend({speed:function(f, h, n) {
    var o = f && typeof f === "object" ? k.extend({}, f) : {complete:n || !n && h || k.isFunction(f) && f, duration:f, easing:n && h || h && !k.isFunction(h) && h};
    o.duration = k.fx.off ? 0 : typeof o.duration === "number" ? o.duration : o.duration in k.fx.speeds ? k.fx.speeds[o.duration] : k.fx.speeds._default;
    o.old = o.complete;
    o.complete = function() {
      o.queue !== false && k(this).dequeue();
      k.isFunction(o.old) && o.old.call(this)
    };
    return o
  }, easing:{linear:function(f, h, n, o) {
    return n + o * f
  }, swing:function(f, h, n, o) {
    return(-Math.cos(f * Math.PI) / 2 + 0.5) * o + n
  }}, timers:[], fx:function(f, h, n) {
    this.options = h;
    this.elem = f;
    this.prop = n;
    if(!h.orig) {
      h.orig = {}
    }
  }});
  k.fx.prototype = {update:function() {
    this.options.step && this.options.step.call(this.elem, this.now, this);
    (k.fx.step[this.prop] || k.fx.step._default)(this)
  }, cur:function() {
    if(this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) {
      return this.elem[this.prop]
    }
    var f = parseFloat(k.css(this.elem, this.prop));
    return f && f > -10000 ? f : 0
  }, custom:function(f, h, n) {
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
    if(o() && k.timers.push(o) && !Ca) {
      Ca = setInterval(f.tick, f.interval)
    }
  }, show:function() {
    this.options.orig[this.prop] = k.style(this.elem, this.prop);
    this.options.show = true;
    this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur());
    k(this.elem).show()
  }, hide:function() {
    this.options.orig[this.prop] = k.style(this.elem, this.prop);
    this.options.hide = true;
    this.custom(this.cur(), 0)
  }, step:function(f) {
    var h = k.now(), n = true;
    if(f || h >= this.options.duration + this.startTime) {
      this.now = this.end;
      this.pos = this.state = 1;
      this.update();
      this.options.curAnim[this.prop] = true;
      for(var o in this.options.curAnim) {
        if(this.options.curAnim[o] !== true) {
          n = false
        }
      }
      if(n) {
        if(this.options.overflow != null && !k.support.shrinkWrapBlocks) {
          var r = this.elem, u = this.options;
          k.each(["", "X", "Y"], function(z, C) {
            r.style["overflow" + C] = u.overflow[z]
          })
        }
        this.options.hide && k(this.elem).hide();
        if(this.options.hide || this.options.show) {
          for(var x in this.options.curAnim) {
            k.style(this.elem, x, this.options.orig[x])
          }
        }
        this.options.complete.call(this.elem)
      }
      return false
    }else {
      f = h - this.startTime;
      this.state = f / this.options.duration;
      h = this.options.easing || (k.easing.swing ? "swing" : "linear");
      this.pos = k.easing[this.options.specialEasing && this.options.specialEasing[this.prop] || h](this.state, f, 0, 1, this.options.duration);
      this.now = this.start + (this.end - this.start) * this.pos;
      this.update()
    }
    return true
  }};
  k.extend(k.fx, {tick:function() {
    for(var f = k.timers, h = 0;h < f.length;h++) {
      f[h]() || f.splice(h--, 1)
    }
    f.length || k.fx.stop()
  }, interval:13, stop:function() {
    clearInterval(Ca);
    Ca = null
  }, speeds:{slow:600, fast:200, _default:400}, step:{opacity:function(f) {
    k.style(f.elem, "opacity", f.now)
  }, _default:function(f) {
    if(f.elem.style && f.elem.style[f.prop] != null) {
      f.elem.style[f.prop] = (f.prop === "width" || f.prop === "height" ? Math.max(0, f.now) : f.now) + f.unit
    }else {
      f.elem[f.prop] = f.now
    }
  }}});
  if(k.expr && k.expr.filters) {
    k.expr.filters.animated = function(f) {
      return k.grep(k.timers, function(h) {
        return f === h.elem
      }).length
    }
  }
  var Ab = /^t(?:able|d|h)$/i, Ua = /^(?:body|html)$/i;
  k.fn.offset = "getBoundingClientRect" in G.documentElement ? function(f) {
    var h = this[0], n;
    if(f) {
      return this.each(function(x) {
        k.offset.setOffset(this, f, x)
      })
    }
    if(!h || !h.ownerDocument) {
      return null
    }
    if(h === h.ownerDocument.body) {
      return k.offset.bodyOffset(h)
    }
    try {
      n = h.getBoundingClientRect()
    }catch(o) {
    }
    var r = h.ownerDocument, u = r.documentElement;
    if(!n || !k.contains(u, h)) {
      return n || {top:0, left:0}
    }
    h = r.body;
    r = V(r);
    return{top:n.top + (r.pageYOffset || k.support.boxModel && u.scrollTop || h.scrollTop) - (u.clientTop || h.clientTop || 0), left:n.left + (r.pageXOffset || k.support.boxModel && u.scrollLeft || h.scrollLeft) - (u.clientLeft || h.clientLeft || 0)}
  } : function(f) {
    var h = this[0];
    if(f) {
      return this.each(function(J) {
        k.offset.setOffset(this, f, J)
      })
    }
    if(!h || !h.ownerDocument) {
      return null
    }
    if(h === h.ownerDocument.body) {
      return k.offset.bodyOffset(h)
    }
    k.offset.initialize();
    var n = h.offsetParent, o = h.ownerDocument, r, u = o.documentElement, x = o.body;
    r = (o = o.defaultView) ? o.getComputedStyle(h, null) : h.currentStyle;
    for(var z = h.offsetTop, C = h.offsetLeft;(h = h.parentNode) && h !== x && h !== u;) {
      if(k.offset.supportsFixedPosition && r.position === "fixed") {
        break
      }
      r = o ? o.getComputedStyle(h, null) : h.currentStyle;
      z -= h.scrollTop;
      C -= h.scrollLeft;
      if(h === n) {
        z += h.offsetTop;
        C += h.offsetLeft;
        if(k.offset.doesNotAddBorder && !(k.offset.doesAddBorderForTableAndCells && Ab.test(h.nodeName))) {
          z += parseFloat(r.borderTopWidth) || 0;
          C += parseFloat(r.borderLeftWidth) || 0
        }
        n = h.offsetParent
      }
      if(k.offset.subtractsBorderForOverflowNotVisible && r.overflow !== "visible") {
        z += parseFloat(r.borderTopWidth) || 0;
        C += parseFloat(r.borderLeftWidth) || 0
      }
      r = r
    }
    if(r.position === "relative" || r.position === "static") {
      z += x.offsetTop;
      C += x.offsetLeft
    }
    if(k.offset.supportsFixedPosition && r.position === "fixed") {
      z += Math.max(u.scrollTop, x.scrollTop);
      C += Math.max(u.scrollLeft, x.scrollLeft)
    }
    return{top:z, left:C}
  };
  k.offset = {initialize:function() {
    var f = G.body, h = G.createElement("div"), n, o, r, u = parseFloat(k.css(f, "marginTop")) || 0;
    k.extend(h.style, {position:"absolute", top:0, left:0, margin:0, border:0, width:"1px", height:"1px", visibility:"hidden"});
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
  }, bodyOffset:function(f) {
    var h = f.offsetTop, n = f.offsetLeft;
    k.offset.initialize();
    if(k.offset.doesNotIncludeMarginInBodyOffset) {
      h += parseFloat(k.css(f, "marginTop")) || 0;
      n += parseFloat(k.css(f, "marginLeft")) || 0
    }
    return{top:h, left:n}
  }, setOffset:function(f, h, n) {
    var o = k.css(f, "position");
    if(o === "static") {
      f.style.position = "relative"
    }
    var r = k(f), u = r.offset(), x = k.css(f, "top"), z = k.css(f, "left"), C = o === "absolute" && k.inArray("auto", [x, z]) > -1;
    o = {};
    var J = {};
    if(C) {
      J = r.position()
    }
    x = C ? J.top : parseInt(x, 10) || 0;
    z = C ? J.left : parseInt(z, 10) || 0;
    if(k.isFunction(h)) {
      h = h.call(f, n, u)
    }
    if(h.top != null) {
      o.top = h.top - u.top + x
    }
    if(h.left != null) {
      o.left = h.left - u.left + z
    }
    "using" in h ? h.using.call(f, o) : r.css(o)
  }};
  k.fn.extend({position:function() {
    if(!this[0]) {
      return null
    }
    var f = this[0], h = this.offsetParent(), n = this.offset(), o = Ua.test(h[0].nodeName) ? {top:0, left:0} : h.offset();
    n.top -= parseFloat(k.css(f, "marginTop")) || 0;
    n.left -= parseFloat(k.css(f, "marginLeft")) || 0;
    o.top += parseFloat(k.css(h[0], "borderTopWidth")) || 0;
    o.left += parseFloat(k.css(h[0], "borderLeftWidth")) || 0;
    return{top:n.top - o.top, left:n.left - o.left}
  }, offsetParent:function() {
    return this.map(function() {
      for(var f = this.offsetParent || G.body;f && !Ua.test(f.nodeName) && k.css(f, "position") === "static";) {
        f = f.offsetParent
      }
      return f
    })
  }});
  k.each(["Left", "Top"], function(f, h) {
    var n = "scroll" + h;
    k.fn[n] = function(o) {
      var r = this[0], u;
      if(!r) {
        return null
      }
      return o !== c ? this.each(function() {
        if(u = V(this)) {
          u.scrollTo(!f ? o : k(u).scrollLeft(), f ? o : k(u).scrollTop())
        }else {
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
      if(!r) {
        return o == null ? null : this
      }
      if(k.isFunction(o)) {
        return this.each(function(u) {
          var x = k(this);
          x[n](o.call(this, u, x[n]()))
        })
      }
      return k.isWindow(r) ? r.document.compatMode === "CSS1Compat" && r.document.documentElement["client" + h] || r.document.body["client" + h] : r.nodeType === 9 ? Math.max(r.documentElement["client" + h], r.body["scroll" + h], r.documentElement["scroll" + h], r.body["offset" + h], r.documentElement["offset" + h]) : o === c ? parseFloat(k.css(r, n)) : this.css(n, typeof o === "string" ? o : o + "px")
    }
  })
})(window);(function(e) {
  e.toJSON = function(b) {
    if(typeof JSON == "object" && JSON.stringify) {
      return JSON.stringify(b)
    }
    var d = typeof b;
    if(b === null) {
      return"null"
    }
    if(d != "undefined") {
      if(d == "number" || d == "boolean") {
        return b + ""
      }
      if(d == "string") {
        return e.quoteString(b)
      }
      if(d == "object") {
        if(typeof b.toJSON == "function") {
          return e.toJSON(b.toJSON())
        }
        if(b.constructor === Date) {
          var g = b.getUTCMonth() + 1;
          if(g < 10) {
            g = "0" + g
          }
          var m = b.getUTCDate();
          if(m < 10) {
            m = "0" + m
          }
          d = b.getUTCFullYear();
          var q = b.getUTCHours();
          if(q < 10) {
            q = "0" + q
          }
          var s = b.getUTCMinutes();
          if(s < 10) {
            s = "0" + s
          }
          var y = b.getUTCSeconds();
          if(y < 10) {
            y = "0" + y
          }
          b = b.getUTCMilliseconds();
          if(b < 100) {
            b = "0" + b
          }
          if(b < 10) {
            b = "0" + b
          }
          return'"' + d + "-" + g + "-" + m + "T" + q + ":" + s + ":" + y + "." + b + 'Z"'
        }
        if(b.constructor === Array) {
          g = [];
          for(m = 0;m < b.length;m++) {
            g.push(e.toJSON(b[m]) || "null")
          }
          return"[" + g.join(",") + "]"
        }
        g = [];
        for(m in b) {
          d = typeof m;
          if(d == "number") {
            d = '"' + m + '"'
          }else {
            if(d == "string") {
              d = e.quoteString(m)
            }else {
              continue
            }
          }
          if(typeof b[m] != "function") {
            q = e.toJSON(b[m]);
            g.push(d + ":" + q)
          }
        }
        return"{" + g.join(", ") + "}"
      }
    }
  };
  e.evalJSON = function(b) {
    if(typeof JSON == "object" && JSON.parse) {
      return JSON.parse(b)
    }
    return eval("(" + b + ")")
  };
  e.secureEvalJSON = function(b) {
    if(typeof JSON == "object" && JSON.parse) {
      return JSON.parse(b)
    }
    var d = b;
    d = d.replace(/\\["\\\/bfnrtu]/g, "@");
    d = d.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]");
    d = d.replace(/(?:^|:|,)(?:\s*\[)+/g, "");
    if(/^[\],:{}\s]*$/.test(d)) {
      return eval("(" + b + ")")
    }else {
      throw new SyntaxError("Error parsing JSON, source is not valid.");
    }
  };
  e.quoteString = function(b) {
    if(b.match(c)) {
      return'"' + b.replace(c, function(d) {
        var g = a[d];
        if(typeof g === "string") {
          return g
        }
        g = d.charCodeAt();
        return"\\u00" + Math.floor(g / 16).toString(16) + (g % 16).toString(16)
      }) + '"'
    }
    return'"' + b + '"'
  };
  var c = /["\\\x00-\x1f\x7f-\x9f]/g, a = {"\u0008":"\\b", "\t":"\\t", "\n":"\\n", "\u000c":"\\f", "\r":"\\r", '"':'\\"', "\\":"\\\\"}
})(jQuery);(function(e) {
  var c = false, a;
  if(e.browser.safari) {
    c = true;
    a = "-webkit-border-image"
  }else {
    if(e.browser.mozilla && e.browser.version.substr(0, 3) == "1.9" && parseFloat(e.browser.version.substr(3)) > 1) {
      c = true;
      a = "-moz-border-image"
    }
  }
  e.fn.extend({scale9Grid:function(b) {
    var d = b.top || 0, g = b.bottom || 0, m = b.left || 0, q = b.right || 0;
    return e(this).each(function() {
      var s = e(this);
      s.data("layoutGrid") && s.remove9Grid();
      var y = s.css("background-image"), A = /url\("?([^\(\)"]+)"?\)/i.exec(y);
      if(!(!A || A.length < 2)) {
        A = A[1];
        e.browser.msie && e.browser.version < 7 && s.css("float") != "none" && s.css("position") == "static" && s.css("position", "relative");
        s.wrapInner('<div class="s9gwrapper"></div>');
        s.find(".s9gwrapper").css({"padding-left":s.css("padding-left"), "padding-right":s.css("padding-right"), "padding-top":s.css("padding-top"), "padding-bottom":s.css("padding-bottom"), "text-align":s.css("text-align"), position:"relative", "z-index":"2", display:"block", "background-color":"transparent", "background-image":"none"});
        s.css({"background-color":"transparent", "background-image":"none", "border-color":"transparent", padding:"0", "text-align":"left"});
        var H = document.createElement("div");
        s.prepend(H);
        var M = e(H);
        M.css({position:"relative", width:"0px", height:"0px", "z-index":"0", display:"block"});
        M.addClass("s9gbackground");
        if(c) {
          H = {"border-width":d + "px " + q + "px " + g + "px " + m + "px ", position:"absolute"};
          H[a] = y + " " + d + " " + q + " " + g + " " + m + " stretch stretch";
          M.css(H)
        }
        var S, V, G = 0, k = 0, W = [], ia = function() {
          var ba = s.innerWidth(), ja = s.innerHeight();
          if(!(ba < m + q || ja < d + g || ba == G && ja == k)) {
            if(c) {
              M.css({width:ba - m - q + "px", height:ja - d - g + "px"})
            }else {
              G = ba;
              k = ja;
              for(var pa = 0, za = W.length, qa = 0;qa < ja;) {
                var ta, ua;
                if(qa == 0) {
                  ua = "top";
                  ta = Math.min(V - g, ja - g)
                }else {
                  if(qa + V - d >= ja) {
                    ua = "bottom";
                    ta = ja - qa
                  }else {
                    ua = "center";
                    ta = Math.min(V - d - g, ja - qa - g)
                  }
                }
                for(var la = 0;la < ba;pa++) {
                  var ra;
                  if(pa < za) {
                    ra = W[pa]
                  }else {
                    cellElement = document.createElement("div");
                    M.append(cellElement);
                    ra = e(cellElement);
                    ra.css({position:"absolute", "background-image":y});
                    W.push(ra)
                  }
                  var sa, va;
                  if(la == 0) {
                    va = "left";
                    sa = Math.min(S - q, ba - q)
                  }else {
                    if(la + S - g >= ba) {
                      va = "right";
                      sa = ba - la
                    }else {
                      va = "center";
                      sa = Math.min(S - m - q, ba - la - q)
                    }
                  }
                  ra.css({left:la + "px", top:qa + "px", width:sa + "px", height:ta + "px", "background-position":ua + " " + va});
                  la += sa
                }
                qa += ta
              }
              for(ba = pa;ba < za;ba++) {
                W[ba].remove()
              }
              W.splice(pa, W.length - pa)
            }
          }
        }, ga = new Image;
        e(ga).load(function() {
          if(!(ga.width < m + q || ga.height < d + g)) {
            S = ga.width;
            V = ga.height;
            ia();
            e(window).resize(ia)
          }
        }).attr("src", A);
        s.data("layoutGrid", ia)
      }
    })
  }, remove9Grid:function() {
    return e(this).each(function() {
      var b = e(this);
      if(b.data("layoutGrid")) {
        e(window).unbind("resize", b.data("layoutGrid"));
        b.removeAttr("style");
        var d = b.find(".s9gwrapper").contents();
        b.prepend(d);
        b.find(".s9gwrapper").remove();
        b.find(".s9gbackground").remove();
        b.removeData("layoutGrid")
      }
    })
  }})
})(jQuery);if(!window.Microsoft) {
  window.Microsoft = {__namespace:true}
}
if(!window.Microsoft.Live) {
  window.Microsoft.Live = {__namespace:true}
}
if(!window.Microsoft.Live.Core) {
  window.Microsoft.Live.Core = {__namespace:true}
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
Microsoft.Live.Core.Loader.prototype = {_loadInitiated:false, _skippedScanner:false, _paused:false, _processing:false, _processScheduled:false, _loadRequests:[], _readyRequests:[], _errorRequests:[], _domRequests:[], _onLoad:null, _documentReady:false, _browser:{}, _iframeResources:[], _settingRegEx:/(\{[^\}^\{]+\})/g, _startTime:(new Date).getTime(), _loadTime:null, _validRuntime:true, _resources:{Empty1:{filename:"{messenger.baseScriptUrl}/Empty.js?1", type:"script", browsers:function(e, c) {
  return e.ie && c.httpsApplication
}, dependencies:[]}, Empty2:{filename:"{messenger.baseScriptUrl}/Empty.js?2", type:"script", browsers:function(e, c) {
  return e.ie && c.httpsApplication
}, dependencies:[]}}, _settings:{environment:"production", direction:"ltr", configuration:"release", market:"en-us", resourceMarket:"en", customSettings:"", httpsApplication:false, httpsScope:"content", compatibility:{microsoftAjaxPropertyNames:true, version:"current"}}, _supportedMarkets:["ar", "ar-ploc-sa", "bg", "cs", "da", "de", "el", "en", "es", "et", "fi", "fr", "he", "hr", "hu", "it", "ja", "ja-ploc-jp", "ko", "lt", "lv", "nb-no", "nl", "pl", "pt-br", "pt-pt", "ro", "ru", "sk", "sl", "sr", 
"sv", "th", "tr", "uk", "zh-cn", "zh-hk", "zh-tw"], addScript:function(e, c, a) {
  this._addFeature(e, "script", c, a)
}, addStyleSheet:function(e, c, a) {
  this._addFeature(e, "stylesheet", c, a)
}, isFlashInstalled:function(e) {
  return e <= this._browser.flashVersion
}, get_settings:function() {
  return this._settings
}, get_onLoad:function() {
  return this._onLoad
}, get_onLoadRegistered:function() {
  return this._onLoad != null
}, get_documentReady:function() {
  return this._documentReady
}, get_scriptsLoadTime:function() {
  return this._loadTime
}, getIframeContainer:function(e) {
  if((e = this._resources[e]) && e.containerId) {
    for(var c = this._iframeResources.length - 1;c >= 0;c--) {
      if(this._iframeResources[c].containerId == e.containerId) {
        return this._iframeResources[c].frameContainer
      }
    }
  }
  return null
}, initialize:function(e) {
  if(e && this._validRuntime) {
    this._serializeSettings(e);
    if(e.environment && e.environment != "production") {
      for(var c in this._settings) {
        var a = this._settings[c];
        if(a) {
          var b = a[e.environment];
          if(b) {
            for(var d in b) {
              a[d] = b[d]
            }
          }
        }
      }
    }
    for(var g in e) {
      b = g.split(".");
      a = b.pop();
      b = this._getSubSetting(b);
      if(!b || typeof b[a] == "undefined") {
        throw Error("Invalid setting: " + g);
      }
      switch(g) {
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
    for(c in this._settings) {
      this._settings[c].updateSettings && this._settings[c].updateSettings(this._settings, this._resources)
    }
  }
}, load:function(e, c) {
  if(this._validRuntime) {
    if(typeof e == "string") {
      e = [e]
    }
    if(!e || e.length <= 0) {
      throw Error("No features provided");
    }
    for(var a = [], b = 0;b < e.length;b++) {
      if(e[b].indexOf("_") >= 0) {
        throw Error("Feature '%1' does not exist".replace("%1", e[b]));
      }
      var d = this._normalizeName(e[b]);
      if(!this._resources[d]) {
        throw Error("Feature '%1' does not exist".replace("%1", d));
      }
      if(this._resources[d].httpOnly && this._settings.httpsApplication) {
        throw Error("Feature '%1' is not supported in an HTTPS environment".replace("%1", d));
      }
      a.push(d)
    }
    this._loadInitiated = true;
    this._loadRequests.push({resources:a, callback:c});
    this._process()
  }
}, onReady:function(e) {
  if(!e) {
    throw Error("No callback provided");
  }
  this._loadInitiated && this._loadRequests.length == 0 ? this._invokeCallback(e) : this._readyRequests.push({callback:e})
}, onError:function(e) {
  if(!e) {
    throw Error("No callback provided");
  }
  this._errorRequests.push({callback:e})
}, onLoad:function(e) {
  if(!e) {
    throw Error("No callback provided");
  }
  this._onLoad = e;
  this._skippedScanner && this.fireOnLoad()
}, fireOnLoad:function() {
  this._onLoad && this._onLoad()
}, onDocumentReady:function(e) {
  if(!e) {
    throw Error("No callback provided");
  }
  this._documentReady ? this._invokeCallback(e) : this._domRequests.push({callback:e})
}, pause:function() {
  this._paused = true
}, resume:function() {
  this._paused = false;
  this._process()
}, onResourceAvailable:function(e, c) {
  var a = this._resources[e];
  if(a) {
    a.readyState = "available";
    a.onAvailableCallback = c || null
  }
}, _getResourceName:function(e) {
  for(var c in this._resources) {
    if(this._resources[c] === e) {
      return c.replace(/_/g, ".")
    }
  }
  return null
}, _addFeature:function(e, c, a, b) {
  if(!e || e.length == 0) {
    throw Error("featureName must not be empty");
  }
  if(e.indexOf("_") >= 0) {
    throw Error("featureName cannot contain '_'");
  }
  if(!a || a.length == 0) {
    throw Error("fileName must not be empty");
  }
  e = this._normalizeName(e);
  if(this._resources[e]) {
    throw Error("Feature already exists");
  }
  var d = [];
  if(b) {
    if(!this._isArray(b)) {
      throw Error("dependencies must be an array of strings");
    }
    for(var g = 0;g < b.length;g++) {
      d.push(this._normalizeName(b[g]))
    }
  }
  this._resources[e] = {url:a, type:c, dependencies:d}
}, _addManifest:function(e, c, a) {
  if(this._validRuntime) {
    if(c) {
      var b = ["Empty1", "Empty2"];
      for(var d in c) {
        if(this._resources[d]) {
          throw Error("Resource '%1' already exists".replace("%1", d));
        }
        var g = c[d], m = g.dependencies;
        m.push.apply(m, b);
        this._resources[d] = g
      }
    }
    if(a) {
      this._settings[e] = a;
      a.updateSettings && a.updateSettings(this._settings, this._resources, null)
    }
  }
}, _normalizeName:function(e) {
  return e.toLowerCase().replace(/\./g, "_")
}, _process:function() {
  if(!this._paused) {
    if(this._processing) {
      this._processScheduled = true
    }else {
      this._processing = true;
      for(var e = 0;e < this._loadRequests.length;e++) {
        for(var c = this._loadRequests[e], a = {async:0, sync:0}, b = 0;b < c.resources.length;b++) {
          this._loadResources(this._resources[c.resources[b]], a)
        }
        a = a.async + a.sync;
        if(a == 0 && !this._loadTime) {
          this._loadTime = (new Date).getTime() - this._startTime
        }
        if(a == 0 && this._documentReady) {
          c.callback && this._invokeCallback(c.callback);
          this._loadRequests.splice(e--, 1)
        }
      }
      if(this._loadRequests.length == 0) {
        for(;this._readyRequests.length > 0;) {
          this._invokeCallback(this._readyRequests.shift().callback)
        }
      }
      this._processing = false;
      if(this._processScheduled) {
        this._processScheduled = false;
        this._process()
      }
    }
  }
}, _loadResources:function(e, c) {
  switch(e.readyState) {
    case "loaded":
      break;
    case "loading":
      if(e.async) {
        c.async++
      }else {
        c.sync++
      }
      break;
    case "available":
      this._loadResourceDependencies(e, c);
      if(c.async == 0 && c.sync == 0) {
        if(e.onAvailableCallback && !e.onAvailableCallbackCalled) {
          e.onAvailableCallbackCalled = true;
          e.onAvailableCallback.call()
        }
        e.readyState = "loaded"
      }else {
        c.async++
      }
      break;
    default:
      this._loadResourceDependencies(e, c);
      if(e.async) {
        if(c.sync == 0) {
          this._loadResource(e);
          c.async++
        }
      }else {
        if(c.async == 0 && c.sync == 0) {
          this._loadResource(e);
          c.sync++
        }
      }
  }
}, _loadResourceDependencies:function(e, c) {
  for(var a = 0;a < e.dependencies.length;a++) {
    var b = {async:0, sync:0};
    this._loadResources(this._resources[e.dependencies[a]], b);
    c.async += b.async;
    c.sync += b.sync
  }
}, _loadResource:function(e) {
  e.readyState = "loading";
  if(!e.filename && !e.url) {
    this._onResourceLoaded(e)
  }else {
    if(this._browserRequires(e)) {
      switch(e.type) {
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
    }else {
      this._onResourceLoaded(e)
    }
  }
}, _shouldUseHttps:function(e) {
  if(this._settings.httpsApplication) {
    if(this._settings.httpsScope == "all") {
      return true
    }
    if(this._settings.httpsScope == "content") {
      switch(e) {
        case "content":
        ;
        case "script":
        ;
        case "stylesheet":
          return true
      }
    }
    if(e == "storageiframe") {
      if(this._shouldProxyLocalStorage()) {
        return true
      }
    }
  }
  return false
}, _shouldProxyLocalStorage:function() {
  var e = !!(window.localStorage || window.globalStorage || window.sessionStorage);
  return!!(this._settings.httpsApplication && window.postMessage && e && !this._browser.ie)
}, _browserRequires:function(e) {
  if(e.browsers) {
    return e.browsers(this._browser, this._settings)
  }
  return true
}, _loadScript:function(e) {
  if(!this._checkResourceLoaded(e)) {
    var c = this._createScriptElement();
    this._browser.ie ? this._attachScriptEventsIE(c, this, e) : this._attachScriptEvents(c, this, e);
    e.async && this._setElementAttribute(c, "async", "async");
    this._setScriptElementAttributes(c, e);
    this._appendScriptElement(c, e)
  }
}, _checkResourceLoaded:function(e) {
  if(e.isLoaded) {
    this._onResourceLoaded(e);
    return true
  }
  return false
}, _createScriptElement:function() {
  return document.createElement("SCRIPT")
}, _attachScriptEvents:function(e, c, a) {
  e.readyState = "complete";
  e.addEventListener("load", function(b) {
    c._onScriptLoad(b, a)
  }, false);
  e.addEventListener("error", function(b) {
    c._onScriptLoad(b, a)
  }, false)
}, _attachScriptEventsIE:function(e, c, a) {
  e.attachEvent("onreadystatechange", function(b) {
    c._onScriptLoad(b, a)
  })
}, _setElementAttribute:function(e, c, a) {
  e.setAttribute(c, a)
}, _setScriptElementAttributes:function(e, c) {
  e.type = "text/javascript";
  e.src = this._getResourceUrl(c)
}, _appendScriptElement:function(e) {
  document.getElementsByTagName("HEAD")[0].appendChild(e)
}, _canPreloadIframe:function(e) {
  switch(e.type) {
    case "channeliframe":
    ;
    case "storageiframe":
      if(window.postMessage) {
        return true
      }
      if(this.isFlashInstalled(8) && !this._settings.channel.flashDisabled) {
        return true
      }
      e = document.domain.toLowerCase();
      if(e == "live.com" || e == "live-int.com") {
        return true
      }
      return false;
    default:
      return true
  }
}, _loadIFrame:function(e) {
  if(!(!e.containerId || !e.filename || !this._canPreloadIframe(e))) {
    var c = this._getResourceUrl(e), a = document.getElementById(e.containerId);
    if(!a) {
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
}, _loadStyleSheet:function(e) {
  var c = document.createElement("LINK");
  c.type = "text/css";
  c.rel = "stylesheet";
  c.media = "screen";
  c.href = this._getResourceUrl(e);
  this._appendChild(document.getElementsByTagName("HEAD")[0], c);
  this._onResourceLoaded(e)
}, _lookupSettings:function(e, c, a) {
  var b = e.substring(1, e.length - 1).split(".");
  if(b[0] == "resource") {
    return e
  }
  e = b.pop();
  if(b = this._getSubSetting(b)) {
    var d = b[e];
    if(this._isArray(d)) {
      return this._hashSelect(d, c)
    }
    if(typeof d === "function") {
      return d.call(this, a)
    }
    if(d || typeof d == "boolean" || typeof d == "number") {
      return b[e]
    }
  }
  return""
}, _isArray:function(e) {
  return e && Object.prototype.toString.apply(e) === "[object Array]"
}, _hashSelect:function(e, c) {
  var a = c.lastIndexOf("/");
  if(a < 0) {
    a = 0
  }else {
    a++
  }
  a = this._computeFastHash(c.substring(a));
  return e[a % e.length]
}, _computeFastHash:function(e) {
  if(!e || !e.length) {
    return 0
  }
  for(var c = 5381, a = 0, b = e.length;a < b;a++) {
    c = (c << 5) + c + e.charCodeAt(a)
  }
  if(c < 0) {
    c *= -1
  }
  return c
}, _getSubSetting:function(e) {
  var c = this._settings;
  if(!e.length) {
    return c
  }
  for(var a = 0;a < e.length;a++) {
    c = c[e[a]];
    if(!c) {
      return null
    }
  }
  return c
}, _getSecureUrl:function(e) {
  if(e.indexOf("http:") == 0) {
    return e.replace("http:", "https:")
  }
  return e
}, _getResourceUrl:function(e) {
  var c;
  c = e.url ? e.url : this._getUrlFromSettings(e.filename, e);
  if(this._shouldUseHttps(e.type)) {
    c = this._getSecureUrl(c)
  }
  return c
}, _getUrl:function(e, c) {
  var a = this._getUrlFromSettings(e, null);
  if(this._shouldUseHttps(c)) {
    a = this._getSecureUrl(a)
  }
  return a
}, _getUrlFromSettings:function(e, c) {
  var a = e, b = this;
  a = a.replace(this._settingRegEx, function(d) {
    return b._lookupSettings(d, e, c)
  });
  a = a.replace(this._settingRegEx, function(d) {
    return b._lookupSettings(d, e, c)
  });
  return a = a.replace(/\/\//g, "/").replace(/:\//g, "://")
}, _onScriptLoad:function(e, c) {
  if(c.readyState != "loaded") {
    var a = e.srcElement || e.currentTarget;
    if(!a.readyState) {
      a = e.currentTarget
    }
    if(!(a.readyState != "complete" && a.readyState != "loaded")) {
      if(e.type == "error" || c.async && c.readyState != "available") {
        if(this._retryLoadResource(c)) {
          e.stopPropagation && e.stopPropagation()
        }else {
          this._onResourceFailed(c)
        }
      }else {
        c.async ? this._onResourceAvailable(c) : this._onResourceLoaded(c)
      }
    }
  }
}, _onResourceLoaded:function(e) {
  e.readyState = "loaded";
  this._process()
}, _onResourceAvailable:function() {
  this._process()
}, _retryLoadResource:function(e) {
  if(e.loadFailCount === undefined) {
    e.loadFailCount = 0
  }
  e.loadFailCount++;
  if(e.loadFailCount < 3) {
    this._loadResource(e);
    return true
  }else {
    return false
  }
}, _onResourceFailed:function(e) {
  var c = this._getResourceName(e);
  for(e = 0;e < this._errorRequests.length;e++) {
    var a = this._errorRequests[e].callback;
    this._invokeCallback(function() {
      a(c)
    })
  }
}, _normalizeMarket:function(e) {
  e = e || "";
  e = e.toLowerCase();
  if(this._getResourceMarket(e)) {
    return e
  }
  return null
}, _getResourceMarket:function(e, c) {
  c = c || this._supportedMarkets;
  if(this._supportsMarket(e, c)) {
    return e
  }
  var a = e.lastIndexOf("-");
  if(a < 0) {
    return null
  }
  e = e.substr(0, a);
  if(this._supportsMarket(e, c)) {
    return e
  }
  return null
}, _supportsMarket:function(e, c) {
  for(var a = 0, b = c.length - 1;a <= b;) {
    var d = Math.floor((a + b) / 2), g = c[d];
    if(g < e) {
      a = d + 1
    }else {
      if(g > e) {
        b = d - 1
      }else {
        return true
      }
    }
  }
  return false
}, _resolveDirection:function() {
  var e = null, c = document.getElementsByTagName("html");
  if(c && c.length > 0) {
    e = c[0].getAttribute("dir")
  }
  e && this.initialize({direction:e})
}, _tryUpdateDirection:function(e) {
  e = e || "";
  e = e.toLowerCase();
  switch(e) {
    case "ltr":
    ;
    case "rtl":
      this._settings.direction = e;
      return true
  }
  return false
}, _resolveMarket:function() {
  var e = null;
  var c = (e = document.getElementsByTagName("html")) && e.length > 0 ? e[0] : null;
  if(c) {
    (e = c.getAttribute("lang")) && this.initialize({market:e});
    (e = c.getAttribute("xml:lang")) && this.initialize({market:e})
  }
}, _tryUpdateMarket:function(e) {
  if(e = this._normalizeMarket(e)) {
    this._settings.market = e;
    this._settings.resourceMarket = this._getResourceMarket(e);
    return true
  }
  return false
}, _detectBrowsers:function() {
  var e = navigator.userAgent.toLowerCase();
  this._browser = {firefox:/firefox/.test(e), "firefox1.5":/firefox\/1\.5/.test(e), firefox2:/firefox\/2/.test(e), firefox3:/firefox\/3/.test(e), ie:/msie/.test(e) && !/opera/.test(e), ie6:/msie 6/.test(e) && !/opera/.test(e), ie7:/msie 7/.test(e) && !/opera/.test(e), ie8:/trident\/4/.test(e) && document.documentMode == 8 && !/opera/.test(e), ie8compat:/trident\/4/.test(e) && document.documentMode <= 7 && !/opera/.test(e), ie9:/trident\/5/.test(e) && document.documentMode == 9 && !/opera/.test(e), 
  opera:/opera/.test(e), webkit:/webkit/.test(e)}
}, _detectSecureConnection:function() {
  document.location.protocol.toLowerCase() == "https:" && this.initialize({httpsApplication:true, httpsScope:"all"})
}, _detectFlash:function() {
  var e = 0;
  try {
    if(this._browser.ie) {
      e = (new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")).GetVariable("$version").split(" ")[1].split(",")[0]
    }else {
      if(navigator.plugins && navigator.plugins.length > 0) {
        if(navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
          e = navigator.plugins["Shockwave Flash" + (navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "")].description.split(" ")[2].split(".")[0]
        }
      }
    }
  }catch(c) {
  }
  this._browser.flashVersion = e;
  this._browser.flash = e >= 8
}, _addDocumentReadyListener:function() {
  var e = this;
  if(document.body) {
    switch(document.readyState) {
      case "complete":
        this._onDocumentReady();
        return;
      case "loaded":
        if(this._browser.webkit) {
          this._onDocumentReady();
          return
        }
        break;
      case "interactive":
      ;
      case undefined:
        if(this._browser.firefox || this._browser.webkit) {
          this._onDocumentReady();
          return
        }
    }
  }
  if(document.addEventListener) {
    document.addEventListener("DOMContentLoaded", function() {
      e._onDocumentReady()
    }, false);
    document.addEventListener("load", function() {
      e._onDocumentReady()
    }, false)
  }else {
    window.attachEvent && window.attachEvent("onload", function() {
      e._onDocumentReady()
    })
  }
  if(this._browser.ie) {
    document.attachEvent("onreadystatechange", function() {
      if(document.readyState === "complete") {
        document.detachEvent("onreadystatechange", arguments.callee);
        e._onDocumentReady()
      }
    });
    var c = false;
    try {
      c = window.frameElement == null
    }catch(a) {
    }
    c && document.documentElement.doScroll && this._doScrollCheck()
  }
}, _doScrollCheck:function() {
  if(!this._documentReady) {
    try {
      document.documentElement.doScroll("left")
    }catch(e) {
      var c = this;
      setTimeout(function() {
        c._doScrollCheck()
      }, 1);
      return
    }
    this._onDocumentReady()
  }
}, _invokeCallback:function(e) {
  window.setTimeout(e, 1)
}, _onDocumentReady:function() {
  if(this._documentReady == false) {
    this._documentReady = true;
    for(this._appendIFrameResources();this._domRequests.length > 0;) {
      this._invokeCallback(this._domRequests.shift().callback)
    }
    this._process()
  }
}, _appendChild:function(e, c) {
  var a = function() {
    e.appendChild(c)
  };
  this._browser.ie && !this._documentReady ? this._invokeCallback(a) : a()
}, _appendIFrameResources:function() {
  if(this._documentReady) {
    for(var e = this._iframeResources, c = e.length - 1;c >= 0;c--) {
      if(e[c].hasParent !== true) {
        e[c].hasParent = true;
        this._appendChild(document.body, e[c].frameContainer)
      }
    }
  }
}, _serializeSettings:function(e) {
  if(e) {
    var c = this._settings.customSettings;
    for(var a in e) {
      var b = c.length == 0 ? "" : "&", d, g = e[a];
      switch(typeof g) {
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
}, _runtimeCheck:function() {
  for(var e in Object.prototype) {
    this._validRuntime = false;
    break
  }
}};
Microsoft.Live.Core.Loader = new Microsoft.Live.Core.Loader;
Microsoft.Live.Core.Loader._addManifest("microsoftAjax", {microsoft_ajax_core:{async:true, filename:"{microsoftAjax.baseScriptUrl}/MicrosoftAjaxCore.js", type:"script", isLoaded:!!(window.Type && window.Type.registerClass && window.Sys && window.Sys.Debug), dependencies:[]}, microsoft_ajax_compat:{async:true, filename:"{microsoftAjax.baseScriptUrl}/MicrosoftAjaxCompat.js", type:"script", browsers:function(e) {
  return!e.ie
}, dependencies:[]}, microsoft_ajax_extensions:{type:"script", dependencies:["microsoft_ajax_core", "microsoft_ajax_compat"]}, microsoft_ajax_base:{async:true, filename:"{microsoftAjax.baseScriptUrl}/MicrosoftAjaxBase.js", type:"script", isLoaded:!!(window.Sys && window.Sys.UI), dependencies:["microsoft_ajax_core"]}, microsoft_ajax_componentmodel:{type:"script", dependencies:["microsoft_ajax_base"]}, microsoft_ajax_serialization:{type:"script", dependencies:["microsoft_ajax_base"]}, microsoft_ajax_templates:{async:true, 
filename:"{microsoftAjax.baseScriptUrl}/MicrosoftAjaxTemplates.js", type:"script", isLoaded:!!(window.Sys && window.Sys.UI && window.Sys.UI.Template), dependencies:["microsoft_ajax_base"]}, microsoft_ajax_globalization:{async:true, filename:"{microsoftAjax.baseLocalizedScriptUrl}/MicrosoftAjaxGlobalization.js", type:"script", isLoaded:!!Number._parse, dependencies:["microsoft_ajax_core"]}, microsoft_ajax_history:{async:true, filename:"{microsoftAjax.baseScriptUrl}/MicrosoftAjaxHistory.js", type:"script", 
isLoaded:!!(window.Sys && window.Sys.Application && window.Sys.Application.get_stateString), dependencies:["microsoft_ajax_componentmodel", "microsoft_ajax_serialization"]}, json_parser:{async:true, filename:"{microsoftAjax.baseScriptUrl}/json2.js", type:"script", isLoaded:!!window.JSON, dependencies:[]}}, {version:"3.0.31119", market:"en", resourcePath:["http://secure.wlxrs.com/_D/F$Live.SiteContent.MicrosoftAjax", "http://secure.shared.live.com/_D/F$Live.SiteContent.MicrosoftAjax"], baseScriptUrl:"{microsoftAjax.resourcePath}/{microsoftAjax.version}/{configuration}", 
baseLocalizedScriptUrl:"{microsoftAjax.resourcePath}/{microsoftAjax.version}/{configuration}/{microsoftAjax.market}", "int":{resourcePath:["http://js.wlxrs-int.com/_D/F$Live.SiteContent.MicrosoftAjax", "http://js2.wlxrs-int.com/_D/F$Live.SiteContent.MicrosoftAjax"]}, f1:{resourcePath:["http://js.f1.wlxrs-int.com/_D/F$Live.SiteContent.MicrosoftAjax", "http://js2.f1.wlxrs-int.com/_D/F$Live.SiteContent.MicrosoftAjax"]}, updateSettings:function(e) {
  var c = e.microsoftAjax;
  if(e = e.market) {
    c.market = Microsoft.Live.Core.Loader._getResourceMarket(e, ["ar", "ar-ae", "ar-bh", "ar-dz", "ar-eg", "ar-iq", "ar-jo", "ar-kw", "ar-lb", "ar-ly", "ar-ma", "ar-om", "ar-ploc-sa", "ar-qa", "ar-sy", "ar-tn", "ar-ye", "bg", "cs", "da", "de", "de-at", "de-ch", "el", "en", "en-au", "en-ca", "en-gb", "en-ie", "en-in", "en-my", "en-nz", "en-ph", "en-sg", "en-za", "es", "es-ar", "es-bo", "es-cl", "es-co", "es-cr", "es-do", "es-ec", "es-gt", "es-hn", "es-mx", "es-ni", "es-pa", "es-pe", "es-pr", "es-py", 
    "es-sv", "es-us", "es-uy", "es-ve", "et", "fi", "fr", "fr-be", "fr-ca", "fr-ch", "he", "hr", "hu", "it", "ja", "ja-ploc-jp", "ko", "lt", "lv", "nb-no", "nl", "nl-be", "pl", "pt-br", "pt-pt", "ro", "ru", "sk", "sl", "sr", "sv", "th", "tr", "uk", "zh-cn", "zh-hk", "zh-tw"]) || "en"
  }
}});
Microsoft.Live.Core.Loader._addManifest("liveconnect", null, {localizedMarket:"", resourcePath:"/_D/F$Live.SiteContent.PROD.Connect/15.0.5717/", version:"15.0.5717.0", shortversion:"15.0.5717", JssdkOfferNamespace:"", JssdkIsTestEnvironment:false, JssdkSecureDomain:"secure.wlxrs.com", JssdkDomainsJavaScript:["js.wlxrs.com", "js2.wlxrs.com"], JssdkDomainsImage:["img.wlxrs.com", "img2.wlxrs.com"], JssdkDomainsCss:["css.wlxrs.com"], JssdkAuthChannelDomain:"xd.live.com", JssdkAuthChannelPath:"/4.1/", 
JssdkSrsResourceGroup:"Live.SiteContent.PROD.Connect", JssdkEdgeJs:"/_D/F$Live.SiteContent.PROD.Connect/15.0.5717/", JssdkEdgeImg:"/_D/F$Live.SiteContent.PROD.Connect/15.0.5717/images/", JssdkEdgeCss:"/_D/F$Live.SiteContent.PROD.Connect/15.0.5717/", JssdkImagePathForCss:"//secure.wlxrs.com/_D/F$Live.SiteContent.PROD.Connect/15.0.5717/images/", JssdkImagePathForHtml:"https://secure.wlxrs.com/_D/F$Live.SiteContent.PROD.Connect/15.0.5717/images/", JssdkCloudMoeBaseUri:"https://apis.live.net/", JssdkCloudMoeRootServiceDocPath:"v4.1/", 
JssdkCloudMoeChannelSourcesPath:"js/v1/", JssdkConsentUri:"https://consent.live.com/connect.aspx", JssdkLivePcTestBaseUri:"http://live.com/", getConfiguration:function() {
  return Microsoft.Live.Core.Loader._settings.configuration
}, getIsLiveUser:function(e) {
  var c = Microsoft.Live.Core.Loader._settings.liveconnect, a = c._isSecure();
  e = "http://" + c.JssdkAuthChannelDomain + c.JssdkAuthChannelPath + "livehost.html?isLiveUser=true&channel=" + escape(e);
  if(a) {
    return e.replace(/https?:/, "https:")
  }
  return c._makeFrame(e)
}, wlSignOut:function(e) {
  var c = Microsoft.Live.Core.Loader._settings.liveconnect;
  if(!c._isSecure()) {
    return c._makeFrame(e)
  }
}, getScriptBase:function(e) {
  return Microsoft.Live.Core.Loader._settings.liveconnect._getBaseUrl("JssdkEdgeJs", "JssdkDomainsJavaScript", e)
}, getCssBase:function(e) {
  return Microsoft.Live.Core.Loader._settings.liveconnect._getBaseUrl("JssdkEdgeCss", "JssdkDomainsCss", e)
}, getServiceUrl:function(e, c) {
  var a = Microsoft.Live.Core.Loader._settings;
  a[e]._isSecure();
  a = a[e][c];
  protocol = "https:";
  return a.replace(/https?:/, protocol)
}, _getRandomId:function() {
  return Math.floor(Math.random() * 99001) + 1E3
}, _makeFrame:function(e) {
  var c = Microsoft.Live.Core.Loader._settings.liveconnect, a = document.createElement("IFRAME");
  a.id = c._getRandomId();
  a.src = e;
  a.style.display = "none";
  e = document.getElementsByTagName("body")[0] || document.documentElement;
  e.insertBefore(a, e.firstChild);
  return a.id
}, _isSecure:function() {
  return this != undefined && this._secureConnection != undefined ? this._secureConnection : document.location.protocol.toLowerCase() == "https:"
}, updateSettings:function(e) {
  var c = ["ar", "ar-ploc-sa", "bg", "cs", "da", "de", "de-ploc-de", "el", "en", "es", "et", "fi", "fr", "he", "hr", "hu", "it", "ja", "ja-ploc-jp", "ko", "lt", "lv", "nb-no", "nl", "pl", "pt-br", "pt-pt", "ro", "ru", "sk", "sl", "sr", "sv", "te", "th", "tr", "uk", "zh-cn", "zh-hk", "zh-tw"];
  if(e.resourceMarket) {
    for(var a = 0;a < c.length;a++) {
      if(e.resourceMarket == c[a]) {
        this.localizedMarket = e.resourceMarket;
        break
      }
    }
  }
}, _getBaseUrl:function(e, c, a) {
  var b = Microsoft.Live.Core.Loader._settings.liveconnect;
  if(b._isSecure()) {
    return e = "https://" + b.JssdkSecureDomain + b[e]
  }
  c = b[c];
  var d = 0;
  d = a && a.domainIdx ? a.domainIdx : Microsoft.Live.Core.Loader._computeFastHash(a && a.filename ? b[e] + a.filename : b[e]) % c.length;
  return e = "http://" + c[d] + b[e]
}});
Microsoft.Live.Core.Loader._addManifest("channel", {microsoft_live_core_channel:{async:true, filename:"{messenger.baseScriptUrl}/Microsoft.Live.Core.Channel.js", type:"script", dependencies:["microsoft_live_core_channel_downlevel", "json_parser", "microsoft_ajax_extensions"]}, microsoft_live_core_channel_downlevel:{async:true, filename:"{messenger.baseScriptUrl}/channel.js", type:"script", browsers:function(e, c) {
  return!window.postMessage && (!e.flash || c.channel.flashDisabled)
}, dependencies:[]}}, {uniqueIdUrl:"http://{messenger.serviceHostName}/actions/getuniqueids", flashDisabled:false, getUniqueIdUrl:function() {
  return Microsoft.Live.Core.Loader._getUrl(this.uniqueIdUrl, "service")
}});
Microsoft.Live.Core.Loader._addManifest("liveconnect", {mscorlib:{type:"script", dependencies:["microsoft_ajax_compat", "microsoft_ajax_extensions", "json_parser"]}, microsoft_live:{async:true, filename:"{liveconnect.getScriptBase}/microsoft.live{liveconnect_debug.debug}.js", type:"script", dependencies:["microsoft_ajax_base"]}, microsoft_live_core_scanner_tags_registry:{type:"script", dependencies:["microsoft_live_core_scanner_tags_registry_live", "microsoft_live_core_scanner_tags_registry_msgr"]}, 
microsoft_live_core_scanner_tags_registry_live:{async:true, filename:"{liveconnect.getScriptBase}/scanner.tags.liveconnect{liveconnect_debug.debug}.js", type:"script", dependencies:["microsoft_live_ui"]}, microsoft_live_services:{filename:"{liveconnect.getScriptBase}/microsoft.live.services{liveconnect_debug.debug}.js", async:true, type:"script", dependencies:["microsoft_live", "microsoft_ajax_core", "microsoft_ajax_base", "json_parser"]}}, null);
Microsoft.Live.Core.Loader._addManifest("default", null, {getScriptBase:"{liveconnect.getScriptBase}"});
Microsoft.Live.Core.Loader._addManifest("liveconnect", {microsoft_live_ui_primitives_styles:{async:true, filename:"{liveconnect.getCssBase}/microsoft.live.ui.primitives.css", type:"stylesheet", dependencies:[]}, microsoft_live_ui_styles:{async:true, filename:"{liveconnect.getCssBase}/microsoft.live.ui.css", type:"stylesheet", dependencies:[]}, microsoft_live_ui_primitives_res:{async:true, filename:"{liveconnect.getScriptBase}/microsoft.live.ui.primitives.res.{liveconnect.localizedMarket}{liveconnect_debug.debug}.js", 
type:"script", dependencies:["mscorlib"]}, microsoft_live_ui_primitives:{async:true, filename:"{liveconnect.getScriptBase}/microsoft.live.ui.primitives{liveconnect_debug.debug}.js", type:"script", dependencies:["microsoft_live_ui_primitives_res", "microsoft_ajax_base", "microsoft_ajax_core", "microsoft_ajax_templates", "mscorlib"]}, microsoft_live_ui:{async:true, filename:"{liveconnect.getScriptBase}/microsoft.live.ui{liveconnect_debug.debug}.js", type:"script", dependencies:["microsoft_live", "microsoft_live_ui_primitives_res", 
"microsoft_ajax_base", "microsoft_ajax_core", "microsoft_ajax_templates"]}}, null);
Microsoft.Live.Core.Loader._addManifest("messenger", {scriptsharp_compat:{type:"script", dependencies:["microsoft_ajax_core"]}, scriptsharp:{type:"script", dependencies:["scriptsharp_compat"]}, messenger_iframe:{type:"channeliframe", dependencies:[], containerId:"MsgrContainer1", frameId:"ifm" + Math.floor(Math.random() * 1024 * 1024), filename:"{messenger.baseContentUrl}/Messenger.html#domain={messenger.domain}&loaderPath={messenger.loaderPath}{messenger.loaderName}&{customSettings}&{messenger.messengerChannelTypeQualifier}"}, 
storage_iframe:{type:"storageiframe", dependencies:[], containerId:"MsgrStorageContainer1", frameId:"ifm" + Math.floor(Math.random() * 1024 * 1024), filename:"{messenger.baseContentUrl}/LocalStorage.html#domain={messenger.domain}&loaderPath={messenger.loaderPath}{messenger.loaderName}&channelNames={messenger.storageChannelNames}&{customSettings}&{messenger.storageChannelTypeQualifier}"}, messenger_common:{async:true, filename:"{messenger.baseScriptUrl}/Microsoft.Live.Messenger.Common.js", type:"script", 
dependencies:["microsoft_ajax_extensions", "json_parser", "microsoft_live_core_channel"]}, messenger_core:{async:true, filename:"{messenger.baseLocalizedScriptUrl}/Microsoft.Live.Messenger.js", type:"script", dependencies:["messenger_common", "messenger_services_loader", "messenger_iframe", "storage_iframe", "core_localstorage"]}, messenger_connect:{async:true, filename:"{messenger.baseScriptUrl}/Microsoft.Live.Messenger.Connect.js", type:"script", dependencies:["messenger_core"]}, messenger_pubsub:{async:true, 
filename:"{messenger.baseScriptUrl}/Microsoft.Live.Messenger.PubSub.Client.js", type:"script", dependencies:["messenger_core", "messenger_pubsub_common", "messenger_pubsub_service"]}, messenger_pubsub_service:{async:true, filename:"{messenger.baseScriptUrl}/Microsoft.Live.Messenger.PubSub.Service.js", type:"script", dependencies:["messenger_pubsub_common"]}, messenger_pubsub_common:{async:true, filename:"{messenger.baseScriptUrl}/Microsoft.Live.Messenger.PubSub.Common.js", type:"script", dependencies:["messenger_common"]}, 
messenger_extended:{type:"script", dependencies:["messenger_core", "messenger_services_core", "messenger_services_chat"]}, messenger_services_loader:{async:true, filename:"{messenger.baseScriptUrl}/Microsoft.Live.Messenger.Services.Loader.js", type:"script", dependencies:["messenger_common", "core_localstorage"]}, messenger_services_core:{async:true, filename:"{messenger.baseScriptUrl}/Microsoft.Live.Messenger.Services.Core.js", type:"script", dependencies:["messenger_common"]}, messenger_services_addressbook:{async:true, 
filename:"{messenger.baseScriptUrl}/Microsoft.Live.Messenger.Services.AddressBook.js", type:"script", dependencies:["messenger_common"]}, messenger_services_chat:{async:true, filename:"{messenger.baseScriptUrl}/Microsoft.Live.Messenger.Services.Chat.js", type:"script", dependencies:["messenger_common"]}, messenger_services_configuration:{async:true, filename:"{messenger.baseScriptUrl}/Microsoft.Live.Messenger.Services.Configuration.js", type:"script", dependencies:["messenger_common"]}, messenger_services_expressionprofile:{async:true, 
filename:"{messenger.baseScriptUrl}/Microsoft.Live.Messenger.Services.ExpressionProfile.js", type:"script", dependencies:["messenger_common"]}, messenger_services_identity:{async:true, filename:"{messenger.baseScriptUrl}/Microsoft.Live.Messenger.Services.Identity.js", type:"script", dependencies:["messenger_common"]}, core_localstorage:{type:"script", dependencies:["core_localstorage_ie", "core_localstorage_ff", "core_localstorage_plugins", "core_localstorage_userdata", "core_localstorage_webkit"]}, 
core_localstorage_ie:{async:true, filename:"{messenger.baseScriptUrl}/Microsoft.Live.Core.LocalStorage.IE.js", type:"script", browsers:function(e) {
  return e.ie && window.sessionStorage
}, dependencies:["messenger_common"]}, core_localstorage_userdata:{async:true, filename:"{messenger.baseScriptUrl}/Microsoft.Live.Core.LocalStorage.UserData.js", type:"script", browsers:function(e, c) {
  return(!c.httpsApplication || !e.flash) && e.ie && !window.sessionStorage
}, dependencies:["messenger_common"]}, core_localstorage_ff:{async:true, filename:"{messenger.baseScriptUrl}/Microsoft.Live.Core.LocalStorage.FF.js", type:"script", browsers:function(e) {
  return e.firefox && window.globalStorage
}, dependencies:["messenger_common"]}, core_localstorage_plugins:{async:true, filename:"{messenger.baseScriptUrl}/Microsoft.Live.Core.LocalStorage.Plugins.js", type:"script", browsers:function(e, c) {
  return(c.httpsApplication && e.flash || !e.ie) && !window.localStorage && !window.globalStorage && !window.sessionStorage
}, dependencies:["messenger_common"]}, core_localstorage_webkit:{async:true, filename:"{messenger.baseScriptUrl}/Microsoft.Live.Core.LocalStorage.WebKit.js", type:"script", browsers:function(e) {
  return(e.webkit || e.opera) && window.localStorage
}, dependencies:["messenger_common"]}});
Microsoft.Live.Core.Loader._addManifest("messenger", {microsoft_live_core_scanner_tags_registry_msgr:{async:true, filename:"{messenger.baseScriptUrl}/Scanner.Tags.Messenger.js", type:"script", dependencies:["microsoft_live_ui"]}, mesh:{async:true, filename:"{messenger.baseScriptUrl}/Microsoft.Live.Mesh.Framework.js", type:"script", dependencies:["microsoft_ajax_extensions"]}, messenger_ui_core:{async:true, filename:"{messenger.baseScriptUrl}/Microsoft.Live.UI.Messenger.Core.js", type:"script", dependencies:["microsoft_ajax_extensions", 
"messenger_core", "mesh"]}, messenger_ui_databinding:{async:true, filename:"{messenger.baseScriptUrl}/Microsoft.Live.UI.Messenger.DataBinding.js", type:"script", dependencies:["microsoft_ajax_templates", "messenger_core"]}, messenger_ui_primitives:{async:true, filename:"{messenger.baseLocalizedScriptUrl}/Microsoft.Live.UI.Messenger.Primitives.js", type:"script", dependencies:["mesh"]}, messenger_ui_controls:{async:true, filename:"{messenger.baseLocalizedScriptUrl}/Microsoft.Live.UI.Messenger.Controls.js", 
type:"script", dependencies:["microsoft_ajax_globalization", "messenger_ui_primitives", "messenger_ui_core"]}, messenger_ui_model:{async:true, filename:"{messenger.baseScriptUrl}/Microsoft.Live.UI.Messenger.js", type:"script", dependencies:["messenger_ui_controls", "microsoft_ajax_componentmodel"]}, messenger_ui:{async:true, filename:"{messenger.baseScriptUrl}/Microsoft.Live.UI.Messenger.Tags.js", type:"script", dependencies:["microsoft_live_core_scanner_tags_registry", "messenger_ui_model", "microsoft_ajax_templates"]}, 
messenger_ui_chat:{async:true, filename:"{messenger.baseLocalizedScriptUrl}/Microsoft.Live.UI.Messenger.Chat.js", type:"script", dependencies:["messenger_pubsub", "messenger_ui_controls", "microsoft_ajax_componentmodel"]}, messenger_ui_chatframe:{async:true, filename:"{messenger.baseScriptUrl}/Microsoft.Live.UI.Messenger.ChatFrameControl.js", type:"script", dependencies:["microsoft_ajax_componentmodel"]}, messenger_ui_styles_core:{type:"stylesheet", dependencies:["messenger_ui_styles_core_ie6", "messenger_ui_styles_core_ie7", 
"messenger_ui_styles_core_ie8", "messenger_ui_styles_core_ie9", "messenger_ui_styles_core_webkit", "messenger_ui_styles_core_other"]}, messenger_ui_styles_core_ie6:{filename:"{messenger.baseStyleSheetUrl}/core.ie6.{messenger.localizedMarket}.css", type:"stylesheet", browsers:function(e) {
  return e.ie6
}, dependencies:[]}, messenger_ui_styles_core_ie7:{filename:"{messenger.baseStyleSheetUrl}/core.ie7.{messenger.localizedMarket}.css", type:"stylesheet", browsers:function(e) {
  return e.ie7 || e.ie8compat
}, dependencies:[]}, messenger_ui_styles_core_ie8:{filename:"{messenger.baseStyleSheetUrl}/core.ie8.{messenger.localizedMarket}.css", type:"stylesheet", browsers:function(e) {
  return e.ie8
}, dependencies:[]}, messenger_ui_styles_core_ie9:{filename:"{messenger.baseStyleSheetUrl}/core.other.{messenger.localizedMarket}.css", type:"stylesheet", browsers:function(e) {
  return e.ie9
}, dependencies:[]}, messenger_ui_styles_core_webkit:{filename:"{messenger.baseStyleSheetUrl}/core.webkit.{messenger.localizedMarket}.css", type:"stylesheet", browsers:function(e) {
  return e.webkit
}, dependencies:[]}, messenger_ui_styles_core_other:{filename:"{messenger.baseStyleSheetUrl}/core.other.{messenger.localizedMarket}.css", type:"stylesheet", browsers:function(e) {
  return!e.ie && !e.webkit
}, dependencies:[]}, messenger_ui_styles_chat_light:{type:"stylesheet", dependencies:["messenger_ui_styles_core", "messenger_ui_styles_chat_light_ie6", "messenger_ui_styles_chat_light_ie7", "messenger_ui_styles_chat_light_ie8", "messenger_ui_styles_chat_light_other"]}, messenger_ui_styles_chat_light_ie6:{filename:"{messenger.baseStyleSheetUrl}/chat.light.ie6.{messenger.localizedMarket}.css", type:"stylesheet", browsers:function(e) {
  return e.ie6
}, dependencies:[]}, messenger_ui_styles_chat_light_ie7:{filename:"{messenger.baseStyleSheetUrl}/chat.light.ie7.{messenger.localizedMarket}.css", type:"stylesheet", browsers:function(e) {
  return e.ie7 || e.ie8compat
}, dependencies:[]}, messenger_ui_styles_chat_light_ie8:{filename:"{messenger.baseStyleSheetUrl}/chat.light.ie8.{messenger.localizedMarket}.css", type:"stylesheet", browsers:function(e) {
  return e.ie8
}, dependencies:[]}, messenger_ui_styles_chat_light_other:{filename:"{messenger.baseStyleSheetUrl}/chat.light.other.{messenger.localizedMarket}.css", type:"stylesheet", browsers:function(e) {
  return!e.ie || e.ie9
}, dependencies:[]}, messenger_ui_styles_chat_dark:{type:"stylesheet", dependencies:["messenger_ui_styles_core", "messenger_ui_styles_chat_dark_ie6", "messenger_ui_styles_chat_dark_ie7", "messenger_ui_styles_chat_dark_ie8", "messenger_ui_styles_chat_dark_other"]}, messenger_ui_styles_chat_dark_ie6:{filename:"{messenger.baseStyleSheetUrl}/chat.dark.ie6.{messenger.localizedMarket}.css", type:"stylesheet", browsers:function(e) {
  return e.ie6
}, dependencies:[]}, messenger_ui_styles_chat_dark_ie7:{filename:"{messenger.baseStyleSheetUrl}/chat.dark.ie7.{messenger.localizedMarket}.css", type:"stylesheet", browsers:function(e) {
  return e.ie7 || e.ie8compat
}, dependencies:[]}, messenger_ui_styles_chat_dark_ie8:{filename:"{messenger.baseStyleSheetUrl}/chat.dark.ie8.{messenger.localizedMarket}.css", type:"stylesheet", browsers:function(e) {
  return e.ie8
}, dependencies:[]}, messenger_ui_styles_chat_dark_other:{filename:"{messenger.baseStyleSheetUrl}/chat.dark.other.{messenger.localizedMarket}.css", type:"stylesheet", browsers:function(e) {
  return!e.ie || e.ie9
}, dependencies:[]}});
Microsoft.Live.Core.Loader._addManifest("messenger", null, {version:"4.2.59120", versionOverride:"4.2.59120", loaderPath:"{messenger.resourcePath}/{messenger.version}/", loaderName:"loader.js", localizedMarket:"other", resourcePath:["http://secure.wlxrs.com/_D/F$Live.SiteContent.Messenger", "http://js2.wlxrs.com/_D/F$Live.SiteContent.Messenger"], imageResourcePath:["http://secure.wlxrs.com/_D/F$Live.SiteContent.Messenger", "http://js2.wlxrs.com/_D/F$Live.SiteContent.Messenger"], styleResourcePath:"http://secure.wlxrs.com/_D/F$Live.SiteContent.Messenger", 
audioResourcePath:"http://secure.wlxrs.com/_D/F$Live.SiteContent.Messenger", applicationPath:"http://secure.shared.live.com/_D/F$Live.SiteContent.Messenger", applicationHostName:"settings.messenger.live.com", consentHostName:"consent.messenger.services.live.com", baseScriptUrl:"{messenger.resourcePath}/{messenger.version}/{configuration}", baseLocalizedScriptUrl:"{messenger.resourcePath}/{messenger.version}/{configuration}/{resourceMarket}", baseStyleSheetUrl:"{messenger.styleResourcePath}/{messenger.version}/resources/styles/{direction}", 
baseContentUrl:"{messenger.applicationPath}/{messenger.versionOverride}", messengerChannelTypeQualifier:"", storageChannelTypeQualifier:"", storageChannelNames:"", serviceHostName:"geo.messenger.services.live.com", pubSubHostName:"beta.messenger.services.live.com", localStorageDisabled:false, sameDomainEndpointsAsLocalEnabled:false, testReportingEnabled:false, signInControlState:"", dogfood:{serviceHostName:"beta.messenger.services.live.com"}, "int":{resourcePath:["http://js.wlxrs-int.com/_D/F$Live.SiteContent.Messenger", 
"http://js2.wlxrs-int.com/_D/F$Live.SiteContent.Messenger"], imageResourcePath:"http://img.wlxrs-int.com/_D/F$Live.SiteContent.Messenger", styleResourcePath:"http://css.wlxrs-int.com/_D/F$Live.SiteContent.Messenger", audioResourcePath:"http://msc.wlxrs-int.com/_D/F$Live.SiteContent.Messenger", applicationPath:"http://secure.shared.live-int.com/_D/F$Live.SiteContent.Messenger", consentHostName:"int-consent.messenger.services.live-int.com", serviceHostName:"applications.messenger.live-int.com", pubSubHostName:"applications.messenger.live-int.com", 
applicationHostName:"settings.messenger.live-int.com"}, updateSettings:function(e, c) {
  var a = e.messenger, b = Microsoft.Live.Core.Loader, d = ["ar", "ar-ploc-sa", "ja", "ja-ploc-jp", "he", "ko", "th", "zh-hk", "zh-tw"];
  if(e.resourceMarket) {
    for(var g = 0;g < d.length;g++) {
      if(e.resourceMarket == d[g]) {
        this.localizedMarket = e.resourceMarket;
        break
      }
    }
  }
  a.domain = encodeURIComponent(document.location.hostname.toLowerCase());
  if(!window.postMessage) {
    a.messengerChannelTypeQualifier = "WLIFMi=" + c.messenger_iframe.frameId;
    a.storageChannelTypeQualifier = "WLIFMi=" + c.storage_iframe.frameId
  }
  a.storageChannelNames = "DefaultLocalStorageChannel";
  if(b._shouldProxyLocalStorage()) {
    a.storageChannelNames += ";MessengerStorageChannel"
  }
}, _join:function() {
  return Array.prototype.join.call(arguments, "/")
}, getLoaderUrl:function() {
  return Microsoft.Live.Core.Loader._getUrl(this.loaderPath + this.loaderName, "script")
}, getResourceUrl:function(e, c) {
  e || (e = "");
  var a = Microsoft.Live.Core.Loader, b = a._settings.messenger, d = a._settings.configuration, g = b.resourcePath;
  if(e.match(/(\.jpg|\.gif|\.png)$/gi)) {
    g = b.imageResourcePath
  }else {
    if(e.match(/(\.mp3|\.wav)$/gi)) {
      g = b.audioResourcePath
    }else {
      if(e.match(/(\.html)$/gi)) {
        g = b.applicationPath
      }
    }
  }
  if(a._isArray(g)) {
    var m = a._computeFastHash(e);
    g = g[m % g.length]
  }else {
    g = g
  }
  if(e.charAt(0) == "/") {
    e = e.substring(1)
  }
  g = (e.match(/(\.js)$/gi) || e.length == 0) && d ? this._join(g, b.version, d, e) : e.match(/(\.html)$/gi) ? this._join(g, b.versionOverride, e) : this._join(g, b.version, e);
  if(c == null) {
    c = g.match(/(\.html)$/gi) ? "service" : "content"
  }
  if(a._shouldUseHttps(c)) {
    g = a._getSecureUrl(g)
  }
  return g
}, getDistinctDomainResourcePaths:function(e) {
  var c = Microsoft.Live.Core.Loader, a = c._settings.messenger, b = [], d = [];
  d.push(a.resourcePath);
  d.push(a.imageResourcePath);
  d.push(a.audioResourcePath);
  d.push(a.styleResourcePath);
  for(var g = 0;g < d.length;g++) {
    var m = d[g];
    if(c._isArray(m)) {
      for(var q = 0;q < m.length;q++) {
        b.push(m[q])
      }
    }else {
      b.push(m)
    }
  }
  for(g = 0;g < b.length;g++) {
    d = this._join(b[g], a.version, e);
    if(c._settings.httpsApplication) {
      d = c._getSecureUrl(d)
    }
    b[g] = d
  }
  return b
}});
Microsoft.Live.Core.Loader.initialize({environment:"production", "messenger.loaderName":"loader.js"});
(function() {
  var e = window.Microsoft_Live_Core_Loader_onAvailable;
  e && typeof e == "function" && e(Microsoft.Live.Core.Loader)
})();
(function() {
  function e(q) {
    c = q == "http://apis.live.net/js/2010" || q == "http://asp.net/ajax" || q == "http://apis.live.net/js/2010" || q == "http://messenger.live.com/2009/ui-tags"
  }
  var c = false, a = document.namespaces;
  if(a != null) {
    for(var b = 0;b < a.length;b++) {
      var d = a[b].name, g = a[b].urn;
      if(!(d === null || d === undefined) && !(g === null || g === undefined)) {
        e(g);
        if(c) {
          break
        }
      }
    }
  }
  if(!c) {
    a = document.documentElement.attributes;
    d = a.length;
    for(b = 0;b < d;b++) {
      g = a[b];
      if(!(g === null || g === undefined)) {
        var m = g.specified;
        if(m === null || m === undefined) {
          !(g.name === null || g.name === undefined) && g.name.substr(0, 6) == "xmlns:" && e(g.value.toLowerCase())
        }else {
          m && g.name.substr(0, 6) == "xmlns:" && e(g.value.toLowerCase())
        }
        if(c) {
          break
        }
      }
    }
  }
  if(c) {
    Microsoft.Live.Core.Loader.load(["microsoft.live.core.scanner.tags.registry"], function() {
      Microsoft.Live.Core.Loader.onDocumentReady(function() {
        Microsoft.Live.Core.TagsFactory.initialScan()
      })
    })
  }else {
    Microsoft.Live.Core.Loader._skippedScanner = true
  }
})();function Tick() {
}
window.Tick = Tick;
Tick.measurePerformance = false;
Tick.listeners = null;
Tick._pauseable = null;
Tick._paused = false;
Tick.startTime = getTimer();
Tick.pauseTimeOffset = 0;
Tick.pausedTime = 0;
Tick.inited = false;
Tick.ticks = 0;
Tick.pausedTicks = 0;
Tick.tickInterval = 50;
Tick.frameRate = 1 / Tick.tickInterval;
Tick.fps = 1E3 / Tick.tickInterval;
Tick.totalTime = Tick.startTime;
Tick.addListener = function(e, c) {
  if(!Tick.inited) {
    Tick.removeAll();
    Tick.inited = true;
    setInterval(Tick.tick, Tick.tickInterval)
  }
  if(Tick.listeners != 0) {
    if(Tick.listeners.indexOf(e) != -1) {
      return
    }
  }
  Tick._pauseable[Tick.listeners.length] = c == true;
  Tick.listeners.push(e)
};
Tick.removeListener = function(e) {
  if(Tick.listeners != null) {
    e = Tick.listeners.indexOf(e);
    if(e != -1) {
      Tick.listeners.splice(e, 1);
      Tick._pauseable.splice(e, 1)
    }
  }
};
Tick.removeAll = function() {
  Tick.listeners = [];
  Tick._pauseable = []
};
Tick.isPaused = function() {
  return Tick._paused
};
Tick.getTime = function(e) {
  return getTimer() - Tick.startTime - (e ? Tick.pausedTime : 0)
};
Tick.getTicks = function(e) {
  return e ? Tick.ticks - Tick.pausedTicks : Tick.ticks
};
Tick.pause = function() {
  if(!Tick._paused) {
    Tick._paused = true;
    Tick.pauseTimeOffset = getTimer()
  }
};
Tick.unpause = function() {
  if(Tick._paused) {
    Tick._paused = false;
    Tick.pausedTime += getTimer() - Tick.pauseTimeOffset
  }
};
Tick.tick = function() {
  Tick.totalTime += Tick.tickInterval;
  Tick.ticks += 1;
  var e = Tick.getTime, c = e(false), a = e(true), b = Tick._paused, d = Tick._pauseable, g = Tick.listeners;
  if(b) {
    Tick.pausedTicks += 1
  }
  for(var m = g.length, q = 0;q < m;q += 1) {
    var s = d[q], y = g[q];
    y == null || b && s || (y instanceof EventProxy ? y.handleEvent({time:s ? a : c, pausable:s != null}) : y.tick(s ? a : c, s != null))
  }
  if(Tick.measurePerformance) {
    if(!Tick.count) {
      Tick.count = 0;
      Tick.avgTickLength = 0
    }
    Tick.count++;
    Tick.avgTickLength += e(false) - c;
    if(Tick.count > 40 && Tick.avgTickLength > 0) {
      trace("Avg Tick Speed: ", Tick.avgTickLength / Tick.count, "ms");
      Tick.count = 0;
      Tick.avgTickLength = 0
    }
  }
};Number.prototype.floor = function() {
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
  if(e == 0) {
    return false
  }
  for(;e--;) {
    var c = Math.random() * (e + 1) | 0, a = this[e];
    this[e] = this[c];
    this[c] = a
  }
  return this
};
Array.prototype.findRandom = function() {
  if(this.length == 1) {
    return this[0]
  }
  return this[Math.random() * this.length | 0]
};
Array.prototype.removeRandom = function() {
  return this.splice(Math.random() * this.length | 0, 1)[0]
};
Array.prototype.removeItem = function(e) {
  for(var c = 0, a = this.length;c < a;c++) {
    if(e == this[c]) {
      this.splice(c, 1);
      return true
    }
  }
  return false
};
Array.prototype.sum = function() {
  for(var e = 0, c = 0, a = this.length;c < a;c++) {
    e += this[c]
  }
  return e
};
Object.prototype.formatToString = function() {
  if(arguments == null) {
    return"[Object object]"
  }
  for(var e = [], c = 0, a = arguments.length;c < a;c++) {
    var b = arguments[c], d = this[b];
    if(!isNaN(d) && d << 0 != d) {
      d = d.toFixed(2)
    }
    e.push(b + ":" + d)
  }
  return"[" + e.join(", ") + "]"
};
Number.prototype.commaDelimit = function() {
  var e = String(this), c = e.length % 3, a = Math.floor(e.length / 3);
  if(a > 0) {
    for(var b = [], d = 0;d < a;d++) {
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
  switch(this % 10) {
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
  return(new Date).getTime()
}
Function.prototype.extend = function(e) {
  if(e.constructor == Function) {
    this.$ = this.prototype = new e;
    this.prototype.constructor = this;
    this.prototype.parent = e.prototype
  }else {
    this.prototype = e;
    this.prototype.constructor = this;
    this.prototype.parent = e
  }
  return this
};
$.fn.center = function() {
  var e = $(this), c = $(window);
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
  var a = e == null ? 0 : e.width(), b = e == null ? 0 : e.position().left;
  this.css("left", a + b + c + "px")
};
$.fn.horizontalAlign = function(e, c) {
  for(var a = 0, b = e.length;a < b;a++) {
    e[a].hAlign(e[a - 1], c)
  }
};
$.fn.vAlignChildren = function(e) {
  if(e == null) {
    e = 5
  }
  for(var c = 0, a = 0, b = this.children(), d = 0, g = b.length;d < g;d++) {
    var m = $(b[d]);
    if(m.css("display") != "none") {
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
  if(e == null) {
    e = 5
  }
  for(var c = 0, a = 0, b = this.children(), d = 0, g = b.length;d < g;d++) {
    var m = $(b[d]);
    if(m.css("display") != "none") {
      m.css("position", "absolute");
      m.css("left", a);
      c = Math.max(c, m.height());
      a += m.width() + e
    }
  }
  this.css("width", Math.max(a - e, this.css("width")));
  this.css("height", Math.max(c, this.css("height")))
};
$.extend($.expr[":"], {isHidden:function(e) {
  for(e = $(e);e.css("visibility") == "inherit" && e.css("display") != "none" && e.parent();) {
    e = e.parent()
  }
  return e.css("visibility") == "hidden" || e.css("display") == "none"
}});
(function(e) {
  function c() {
    this.IndexHash()
  }
  function a(b) {
    this.Delegate(b)
  }
  c.prototype = {IndexHash:function() {
  }, addItem:function(b, d) {
    if(this[b] == null) {
      this[b] = [d]
    }else {
      this[b].indexOf(d) == -1 && this[b].push(d)
    }
  }, moveItem:function() {
  }, removeContainer:function(b) {
    var d = this[b];
    delete this[b];
    return d
  }, removeRandom:function(b) {
    if(this[b] == null) {
      return null
    }
    if(this[b].length > 0) {
      return this[b].removeRandom()
    }
  }, removeItem:function(b) {
    for(var d in this) {
      if(this.hasOwnProperty(d)) {
        var g = this[d].indexOf(b);
        if(g > -1) {
          this.removeItemFrom(b, d, g);
          return g
        }
      }
    }
    return-1
  }, removeItemFrom:function(b, d, g) {
    if(this[d] != null) {
      if(g == null) {
        g = this[d].indexOf(b);
        if(g == -1) {
          return-1
        }
      }
      this[d].splice(g, 1)
    }
  }, copy:function(b) {
    if(this[b] == null) {
      return null
    }
    return this[b].slice(0)
  }, cleanUp:function() {
    for(var b in this) {
      this.hasOwnProperty(b) && this[b].length == 0 && delete this[b]
    }
  }, toString:function() {
    var b = "[IndexHash]";
    for(var d in this) {
      if(this.hasOwnProperty(d)) {
        b += "\n [" + d + " (" + this[d] + ")]"
      }
    }
    return b
  }};
  e.IndexHash = c;
  a.create = function(b, d) {
    var g = function() {
      return arguments.callee.func.apply(arguments.callee.target, arguments)
    };
    g.target = b;
    g.func = d;
    return g
  };
  a.prototype = {Delegate:function(b) {
    this.func = b
  }, createDelegate:function(b) {
    return a.create(b, func)
  }};
  e.Delegate = a
})(window);(function(e) {
  Matrix2D = function(a, b, d, g, m, q) {
    this.initialize(a, b, d, g, m, q)
  };
  var c = Matrix2D.prototype;
  Matrix2D.identity = null;
  Matrix2D.DEG_TO_RAD = Math.PI / 180;
  c.a = 1;
  c.b = 0;
  c.c = 0;
  c.d = 1;
  c.tx = 0;
  c.ty = 0;
  c.alpha = 1;
  c.shadow = null;
  c.compositeOperation = null;
  c.initialize = function(a, b, d, g, m, q) {
    if(a != null) {
      this.a = a
    }
    if(b != null) {
      this.b = b
    }
    if(d != null) {
      this.c = d
    }
    if(g != null) {
      this.d = g
    }
    if(m != null) {
      this.tx = m
    }
    if(q != null) {
      this.ty = q
    }
  };
  c.prepend = function(a, b, d, g, m, q) {
    var s = this.tx;
    if(a != 1 || b != 0 || d != 0 || g != 1) {
      var y = this.a, A = this.c;
      this.a = y * a + this.b * d;
      this.b = y * b + this.b * g;
      this.c = A * a + this.d * d;
      this.d = A * b + this.d * g
    }
    this.tx = s * a + this.ty * d + m;
    this.ty = s * b + this.ty * g + q
  };
  c.append = function(a, b, d, g, m, q) {
    var s = this.a, y = this.b, A = this.c, H = this.d;
    this.a = a * s + b * A;
    this.b = a * y + b * H;
    this.c = d * s + g * A;
    this.d = d * y + g * H;
    this.tx = m * s + q * A + this.tx;
    this.ty = m * y + q * H + this.ty
  };
  c.prependMatrix = function(a) {
    this.prepend(a.a, a.b, a.c, a.d, a.tx, a.ty);
    this.prependProperties(a.alpha, a.shadow, a.compositeOperation)
  };
  c.appendMatrix = function(a) {
    this.append(a.a, a.b, a.c, a.d, a.tx, a.ty);
    this.appendProperties(a.alpha, a.shadow, a.compositeOperation)
  };
  c.prependTransform = function(a, b, d, g, m, q, s, y, A) {
    if(m % 360) {
      var H = m * Matrix2D.DEG_TO_RAD;
      m = Math.cos(H);
      H = Math.sin(H)
    }else {
      m = 1;
      H = 0
    }
    if(y || A) {
      this.tx -= y;
      this.ty -= A
    }
    if(q || s) {
      q *= Matrix2D.DEG_TO_RAD;
      s *= Matrix2D.DEG_TO_RAD;
      this.prepend(m * d, H * d, -H * g, m * g, 0, 0);
      this.prepend(Math.cos(s), Math.sin(s), -Math.sin(q), Math.cos(q), a, b)
    }else {
      this.prepend(m * d, H * d, -H * g, m * g, a, b)
    }
  };
  c.appendTransform = function(a, b, d, g, m, q, s, y, A) {
    if(m % 360) {
      var H = m * Matrix2D.DEG_TO_RAD;
      m = Math.cos(H);
      H = Math.sin(H)
    }else {
      m = 1;
      H = 0
    }
    if(q || s) {
      q *= Matrix2D.DEG_TO_RAD;
      s *= Matrix2D.DEG_TO_RAD;
      this.append(Math.cos(s), Math.sin(s), -Math.sin(q), Math.cos(q), a, b);
      this.append(m * d, H * d, -H * g, m * g, 0, 0)
    }else {
      this.append(m * d, H * d, -H * g, m * g, a, b)
    }
    if(y || A) {
      this.tx -= y * this.a + A * this.c;
      this.ty -= y * this.b + A * this.d
    }
  };
  c.rotate = function(a) {
    var b = Math.cos(a);
    a = Math.sin(a);
    var d = this.a, g = this.c, m = this.tx;
    this.a = d * b - this.b * a;
    this.b = d * a + this.b * b;
    this.c = g * b - this.d * a;
    this.d = g * a + this.d * b;
    this.tx = m * b - this.ty * a;
    this.ty = m * a + this.ty * b
  };
  c.skew = function(a, b) {
    a *= Matrix2D.DEG_TO_RAD;
    b *= Matrix2D.DEG_TO_RAD;
    this.append(Math.cos(b), Math.sin(b), -Math.sin(a), Math.cos(a), 0, 0)
  };
  c.scale = function(a, b) {
    this.a *= a;
    this.d *= b;
    this.tx *= a;
    this.ty *= b
  };
  c.translate = function(a, b) {
    this.tx += a;
    this.ty += b
  };
  c.identity = function() {
    this.alpha = this.a = this.d = 1;
    this.b = this.c = this.tx = this.ty = 0;
    this.shadow = this.compositeOperation = null
  };
  c.invert = function() {
    var a = this.a, b = this.b, d = this.c, g = this.d, m = this.tx, q = a * g - b * d;
    this.a = g / q;
    this.b = -b / q;
    this.c = -d / q;
    this.d = a / q;
    this.tx = (d * this.ty - g * m) / q;
    this.ty = -(a * this.ty - b * m) / q
  };
  c.decompose = function(a) {
    if(a == null) {
      a = {}
    }
    a.x = this.tx;
    a.y = this.ty;
    a.scaleX = Math.sqrt(this.a * this.a + this.b * this.b);
    a.scaleY = Math.sqrt(this.c * this.c + this.d * this.d);
    var b = Math.atan2(-this.c, this.d), d = Math.atan2(this.b, this.a);
    if(b == d) {
      a.rotation = d / Matrix2D.DEG_TO_RAD;
      if(this.a < 0 && this.d >= 0) {
        a.rotation += a.rotation <= 0 ? 180 : -180
      }
      a.skewX = a.skewY = 0
    }else {
      a.skewX = b / Matrix2D.DEG_TO_RAD;
      a.skewY = d / Matrix2D.DEG_TO_RAD
    }
    return a
  };
  c.appendProperties = function(a, b, d) {
    this.alpha *= a;
    this.shadow = b || this.shadow;
    this.compositeOperation = d || this.compositeOperation
  };
  c.prependProperties = function(a, b, d) {
    this.alpha *= a;
    this.shadow = this.shadow || b;
    this.compositeOperation = this.compositeOperation || d
  };
  c.clone = function() {
    var a = new Matrix2D(this.a, this.b, this.c, this.d, this.tx, this.ty);
    a.shadow = this.shadow;
    a.alpha = this.alpha;
    a.compositeOperation = this.compositeOperation;
    return a
  };
  c.toString = function() {
    return"[Matrix2D (a=" + this.a + " b=" + this.b + " c=" + this.c + " d=" + this.d + " tx=" + this.tx + " ty=" + this.ty + ")]"
  };
  Matrix2D.identity = new Matrix2D(1, 0, 0, 1, 0, 0);
  e.Matrix2D = Matrix2D
})(window);(function(e) {
  Point = function(a, b) {
    this.initialize(a, b)
  };
  var c = Point.prototype;
  c.x = 0;
  c.y = 0;
  c.initialize = function(a, b) {
    this.x = a == null ? 0 : a;
    this.y = b == null ? 0 : b
  };
  c.clone = function() {
    return new Point(this.x, this.y)
  };
  c.toString = function() {
    return"[Point (x=" + this.x + " y=" + this.y + ")]"
  };
  e.Point = Point
})(window);(function(e) {
  Rectangle = function(a, b, d, g) {
    this.initialize(a, b, d, g)
  };
  var c = Rectangle.prototype;
  c.x = 0;
  c.y = 0;
  c.width = 0;
  c.height = 0;
  c.initialize = function(a, b, d, g) {
    this.x = a == null ? 0 : a;
    this.y = b == null ? 0 : b;
    this.width = d == null ? 0 : d;
    this.height = g == null ? 0 : g
  };
  c.clone = function() {
    return new Rectangle(this.x, this.y, this.width, this.height)
  };
  c.toString = function() {
    return"[Rectangle (x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + ")]"
  };
  e.Rectangle = Rectangle
})(window);(function(e) {
  function c() {
  }
  function a(S, V, G) {
    if(G > 10) {
      return""
    }
    if(S == undefined) {
      return""
    }
    var k = "";
    if(G == undefined) {
      G = 0;
      k += H + "--- Dumping Object ---"
    }
    var W;
    W = H;
    for(var ia = 0;ia < G;ia++) {
      W += "----"
    }
    W = G == 0 ? W : W + "> ";
    ia = typeof S;
    switch(S.constructor) {
      case Array:
        ia = "array";
        break
    }
    var ga = {contructor:true, parentNode:true, childNodes:true, firstChild:true, lastChild:true, previousSibling:true, nextSibling:true, ownerDocument:true, ownerElement:true, selectionEnd:true};
    if(ga[V] == true) {
      return""
    }
    switch(ia) {
      case "number":
      ;
      case "string":
      ;
      case "boolean":
        k += W + V + " (" + ia + "): " + S;
        break;
      case "array":
        k += W + V + " (Array[" + S.length + "]) ";
        for(V = 0;V < S.length;V++) {
          k += a(S[V], V.toString(), G + 1)
        }
        break;
      case "function":
        k += W + V + " (Function) ";
        break;
      case "object":
        k += W + (V || "") + " (Object) ";
        for(var ba in S) {
          ga[ba] || (k += a(S[ba], ba, G + 1))
        }
        break
    }
    if(G == 0) {
      k += H
    }
    return k
  }
  function b() {
    M && $("#trace", M.document).empty();
    if(document.getElementById("trace")) {
      document.getElementById("trace").innerHTML = ""
    }
  }
  function d(S, V) {
    for(var G = "", k = S.length, W = 0;W < k;W++) {
      G += S[W] + " "
    }
    if(V != null && V.length > 0) {
      k = V.substring(s.length, V.length - A.length).split(y);
      if(q != -1) {
        for(;k.length >= q;) {
          k.shift()
        }
      }
      k.push(G)
    }else {
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
    if(m.inited == null) {
      m.inited = true;
      $("body").append('<div id="traceWindow"><div id="trace" class="console">' + d(arguments) + '</div><input id="clearTraceBtn" type="button" class="clearButton" value="Clear" /><input id="hideTraceConsoleBtn" type="checkbox"' + (c.showDebugWindow ? ' checked="true" ' : "") + 'class="hideButton" value="true" /><label class="hideConsoleLabel" for="hideTraceConsoleBtn">show</label></div>');
      $("#clearTraceBtn").click(b);
      $("#hideTraceConsoleBtn").click(g);
      g()
    }else {
      var S = $("#trace").get(0);
      S.innerHTML = d(arguments, S.innerHTML)
    }
  }
  c.showDebugWindow = true;
  var q = 80, s = "<ul><li>", y = "</li><li>", A = "</li></ul>", H = "<br></br>", M;
  e.trace = m;
  e.dump = function(S, V, G) {
    m(a(S, V, G))
  };
  e.clearTrace = b;
  e.showTrace = function(S) {
    var V = $("#traceWindow");
    if(V.get(0) != null) {
      V.css("display", S ? "block" : "none")
    }
  }
})(window);function StringUtils() {
}
String.prototype.afterFirst = function(e) {
  var c = this.indexOf(e);
  if(c == -1) {
    return""
  }
  c += e.length;
  return this.substr(c)
};
String.prototype.afterLast = function(e) {
  var c = this.lastIndexOf(e);
  if(c == -1) {
    return""
  }
  c += e.length;
  return this.substr(c)
};
String.prototype.beginsWith = function(e) {
  return this.indexOf(e) == 0
};
String.prototype.beforeFirst = function(e) {
  e = this.indexOf(e);
  if(e == -1) {
    return""
  }
  return this.substr(0, e)
};
String.prototype.beforeLast = function(e) {
  e = this.lastIndexOf(e);
  if(e == -1) {
    return""
  }
  return this.substr(0, e)
};
String.prototype.between = function(e, c) {
  var a = "", b = this.indexOf(e);
  if(b != -1) {
    b += e.length;
    var d = this.indexOf(c, b);
    if(d != -1) {
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
  if(c == null) {
    c = " "
  }
  var a = c.substr(0, 1);
  return this.length < e ? this + this.repeat(e - this.length, a) : this
};
String.prototype.rjust = function(e, c) {
  if(c == null) {
    c = " "
  }
  var a = c.substr(0, 1);
  return this.length < e ? this.repeat(e - this.length, a) + this : this
};
String.prototype.center = function(e, c) {
  if(c == null) {
    c = " "
  }
  var a = c.substr(0, 1);
  if(this.length < e) {
    var b = e - this.length, d = b % 2 == 0 ? "" : a;
    a = this.repeat(Math.round(b / 2), a);
    return a + this + a + d
  }else {
    return this
  }
};
String.prototype.repeat = function(e, c) {
  if(isNaN(e)) {
    e = 1
  }
  for(var a = "";e--;) {
    a += c || this
  }
  return a
};
String.prototype.base64Encode = function() {
  for(var e = "", c = 0, a = this.length;c < a;) {
    var b = this.charCodeAt(c++) & 255;
    if(c == a) {
      e += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(b >> 2) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((b & 3) << 4) + "==";
      break
    }
    var d = this.charCodeAt(c++);
    if(c == a) {
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
  if(e == null) {
    e = ""
  }
  if(c == null) {
    c = ""
  }
  if(e == c) {
    return 0
  }
  var a = [], b, d = e.length, g = c.length;
  if(d == 0) {
    return g
  }
  if(g == 0) {
    return d
  }
  for(var m = 0;m <= d;m++) {
    a[m] = []
  }
  for(m = 0;m <= d;m++) {
    a[m][0] = m
  }
  for(m = 0;m <= g;m++) {
    a[0][m] = m
  }
  for(m = 1;m <= d;m++) {
    for(var q = e.charAt(m - 1), s = 1;s <= g;s++) {
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
  return!!this.removeExtraWhitespace().length
};
String.prototype.isEmpty = function() {
  return!this.length
};
String.prototype.isNumeric = function() {
  return/^[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?$/.test(this)
};
String.prototype.padLeft = function(e, c) {
  for(var a = this;a.length < c;) {
    a = e + a
  }
  return a
};
String.prototype.padRight = function(e, c) {
  for(var a = this;a.length < c;) {
    a += e
  }
  return a
};
String.prototype.properCase = function() {
  return this.toLowerCase().replace(/\b([^.?;!]+)/, StringUtils.capitalize).replace(/\b[i]\b/, "I")
};
String.prototype.quote = function() {
  return'"' + this.replace(/[\\"\r\n]/g, this._quote) + '"'
};
String.prototype.remove = function(e, c) {
  if(c === null) {
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
  if(arguments[0] instanceof Object) {
    for(var c in arguments[0]) {
      e = e.replace(RegExp("\\{" + c + "\\}", "g"), arguments[0][c])
    }
  }else {
    c = arguments.length;
    for(var a = 0;a < c;a++) {
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
  if(c == null) {
    c = "..."
  }
  if(e == 0) {
    e = this.length
  }
  e -= c.length;
  var a = this;
  if(a.length > e) {
    a = a.substr(0, e);
    if(/[^\s]/.test(a.charAt(e))) {
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
  switch(this) {
    case "\\":
      return"\\\\";
    case "\r":
      return"\\r";
    case "\n":
      return"\\n";
    case '"':
      return'\\"'
  }
  return null
};
StringUtils._upperCase = function(e) {
  return e.toUpperCase()
};
StringUtils._swapCase = function(e) {
  var c = e.toLowerCase(), a = e.toUpperCase();
  switch(e) {
    case c:
      return a;
    case a:
      return c;
    default:
      return e
  }
};function Rnd() {
  throw Error("Rnd is static and cannot be instantiated.");
}
Rnd.randFloat = function(e, c) {
  if(isNaN(c)) {
    c = e;
    e = 0
  }
  return Math.random() * (c - e) + e
};
Rnd.randBoolean = function(e) {
  if(isNaN(e)) {
    e = 0.5
  }
  return Math.random() < e
};
Rnd.randSign = function(e) {
  if(isNaN(e)) {
    e = 0.5
  }
  return Math.random() < e ? 1 : -1
};
Rnd.randBit = function(e) {
  if(isNaN(e)) {
    e = 0.5
  }
  return Math.random() < e ? 1 : 0
};
Rnd.randInteger = function(e, c) {
  if(isNaN(c)) {
    c = e;
    e = 0
  }
  return Math.floor(Rnd.randFloat(e, c))
};(function(e) {
  function c(a) {
    this.EventDispatcher(a)
  }
  c.create = function(a) {
    new c(a)
  };
  c.prototype = {EventDispatcher:function(a) {
    a.addEventListener = this.addEventListener;
    a.removeEventListener = this.removeEventListener;
    a.dispatchEvent = this.dispatchEvent;
    a.hasEventListener = this.hasEventListener;
    a.removeAllListeners = this.removeAllListeners;
    a._indexOfListener = this._indexOfListener
  }, addEventListener:function(a, b) {
    if(this.eventHash == null) {
      this.eventHash = {}
    }
    if(this.eventHash[a] == null) {
      this.eventHash[a] = []
    }
    this._indexOfListener(a, b) == -1 && this.eventHash[a].push(b)
  }, removeEventListener:function(a, b) {
    var d = this._indexOfListener(a, b);
    d != -1 && this.eventHash[a].splice(d, 1)
  }, removeAllListeners:function(a) {
    if(a == null) {
      this.eventHash = {}
    }else {
      delete this.eventHash[a]
    }
  }, hasEventListener:function(a, b) {
    return this._indexOfListener(a, b) != -1
  }, dispatchEvent:function(a, b) {
    if(this.eventHash != null) {
      var d = this.eventHash[a];
      if(!(d == null || d.length == 0)) {
        if(b == null) {
          b = {}
        }
        b.target = this;
        b.type = a;
        var g = {};
        b.preventDefault = function() {
          g.preventDefault = true
        };
        for(var m = 0, q = d.length;m < q;m++) {
          var s = d[m];
          if(s instanceof Function) {
            s(b)
          }else {
            s && s.handleEvent(b)
          }
        }
        return g.preventDefault == true
      }
    }
  }, _indexOfListener:function(a, b) {
    var d = this.eventHash[a];
    if(d == null) {
      return-1
    }
    for(var g = d.length, m = 0;m < g;m++) {
      if(d[m] == b) {
        return m
      }
    }
    return-1
  }};
  e.EventDispatcher = c
})(window);(function(e) {
  function c(a, b) {
    this.EventProxy(a, b)
  }
  c.prototype = {EventProxy:function(a, b) {
    this.listener = a;
    this.functionName = b
  }, handleEvent:function(a) {
    this.listener[this.functionName != undefined ? this.functionName : a.type](a)
  }};
  e.EventProxy = c
})(window);(function(e) {
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
    return"[MouseEvent (type=" + this.type + " stageX=" + this.stageX + " stageY=" + this.stageY + ")]"
  };
  e.MouseEvent = MouseEvent
})(window);(function(e) {
  UID = function() {
    throw"UID cannot be instantiated";
  };
  UID._nextID = 0;
  UID.get = function() {
    return UID._nextID++
  };
  e.UID = UID
})(window);(function(e) {
  function c(b, d) {
    this.f = b;
    this.params = d
  }
  c.prototype.exec = function(b) {
    this.f.apply(b, this.params)
  };
  Graphics = function(b) {
    this.initialize(b)
  };
  var a = Graphics.prototype;
  Graphics.getRGB = function(b, d, g, m) {
    if(b != null && g == null) {
      m = d;
      g = b & 255;
      d = b >> 8 & 255;
      b = b >> 16 & 255
    }
    return m == null ? "rgb(" + b + "," + d + "," + g + ")" : "rgba(" + b + "," + d + "," + g + "," + m + ")"
  };
  Graphics.getHSL = function(b, d, g, m) {
    return m == null ? "hsl(" + b % 360 + "," + d + "%," + g + "%)" : "hsla(" + b % 360 + "," + d + "%," + g + "%," + m + ")"
  };
  Graphics.STROKE_CAPS_MAP = ["butt", "round", "square"];
  Graphics.STROKE_JOINTS_MAP = ["miter", "round", "bevel"];
  Graphics._ctx = document.createElement("canvas").getContext("2d");
  Graphics.beginCmd = new c(Graphics._ctx.beginPath, []);
  Graphics.fillCmd = new c(Graphics._ctx.fill, []);
  Graphics.strokeCmd = new c(Graphics._ctx.stroke, []);
  a._strokeInstructions = null;
  a._strokeStyleInstructions = null;
  a._fillInstructions = null;
  a._instructions = null;
  a._oldInstructions = null;
  a._activeInstructions = null;
  a._active = false;
  a._dirty = false;
  a._minX = NaN;
  a._minY = NaN;
  a._maxX = NaN;
  a._maxY = NaN;
  a._boundsQueue = null;
  a._x = 0;
  a._y = 0;
  a.initialize = function(b) {
    this.clear();
    this._ctx = Graphics._ctx;
    with(this) {
      eval(b)
    }
  };
  a.draw = function(b) {
    this._dirty && this._updateInstructions();
    for(var d = this._instructions, g = 0, m = d.length;g < m;g++) {
      d[g].exec(b)
    }
  };
  a.getBounds = function() {
    this._boundsQueue.length && this._updateBounds();
    return isNaN(this._minX) ? null : new Rectangle(this._minX, this._minY, this._maxX - this._minX, this._maxY - this._minY)
  };
  a.moveTo = function(b, d) {
    this._activeInstructions.push(new c(this._ctx.moveTo, [b, d]));
    this._x = b;
    this._y = d;
    return this
  };
  a.lineTo = function(b, d) {
    this._dirty = this._active = true;
    this._activeInstructions.push(new c(this._ctx.lineTo, [b, d]));
    this._extendBounds(this._x, this._y);
    this._extendBounds(b, d);
    this._x = b;
    this._y = d;
    return this
  };
  a.arcTo = function(b, d, g, m, q) {
    this._dirty = this._active = true;
    this._activeInstructions.push(new c(this._ctx.arcTo, [b, d, g, m, q]));
    return this
  };
  a.arc = function(b, d, g, m, q, s) {
    this._dirty = this._active = true;
    if(s == null) {
      s = false
    }
    this._activeInstructions.push(new c(this._ctx.arc, [b, d, g, m, q, s]));
    return this
  };
  a.quadraticCurveTo = function(b, d, g, m) {
    this._dirty = this._active = true;
    this._activeInstructions.push(new c(this._ctx.quadraticCurveTo, [b, d, g, m]));
    return this
  };
  a.bezierCurveTo = function(b, d, g, m, q, s) {
    this._dirty = this._active = true;
    this._activeInstructions.push(new c(this._ctx.bezierCurveTo, [b, d, g, m, q, s]));
    this._x = q;
    thix._y = s;
    this._boundsQueue.push(new c(this._bezierCurveToBounds, [this._x, this._y, b, d, g, m, q, s]));
    return this
  };
  a.rect = function(b, d, g, m) {
    this._dirty = this._active = true;
    this._activeInstructions.push(new c(this._ctx.rect, [b, d, g - 1, m]));
    this._extendBounds(b, d);
    this._extendBounds(b + g, d + m);
    return this
  };
  a.closePath = function() {
    if(this._active) {
      this._dirty = true;
      this._activeInstructions.push(new c(this._ctx.closePath, []))
    }
    return this
  };
  a.clear = function() {
    this._instructions = [];
    this._oldInstructions = [];
    this._activeInstructions = [];
    this._strokeStyleInstructions = this._strokeInstructions = this._fillInstructions = null;
    this._active = this._dirty = false;
    this._boundsQueue = [];
    this._minX = this._minY = this._maxX = this._maxY = NaN;
    return this
  };
  a.beginFill = function(b) {
    this._active && this._newPath();
    this._fillInstructions = b ? [new c(this._setProp, ["fillStyle", b])] : null;
    return this
  };
  a.beginLinearGradientFill = function(b, d, g, m, q, s) {
    this._active && this._newPath();
    g = this._ctx.createLinearGradient(g, m, q, s);
    m = 0;
    for(q = b.length;m < q;m++) {
      g.addColorStop(d[m], b[m])
    }
    this._fillInstructions = [new c(this._setProp, ["fillStyle", g])];
    return this
  };
  a.beginRadialGradientFill = function(b, d, g, m, q, s, y, A) {
    this._active && this._newPath();
    g = this._ctx.createRadialGradient(g, m, q, s, y, A);
    m = 0;
    for(q = b.length;m < q;m++) {
      g.addColorStop(d[m], b[m])
    }
    this._fillInstructions = [new c(this._setProp, ["fillStyle", g])];
    return this
  };
  a.beginBitmapFill = function(b, d) {
    this._active && this._newPath();
    d = d || "";
    var g = this._ctx.createPattern(b, d);
    this._fillInstructions = [new c(this._setProp, ["fillStyle", g])];
    return this
  };
  a.endFill = function() {
    this.beginFill(null);
    return this
  };
  a.setStrokeStyle = function(b, d, g, m) {
    this._active && this._newPath();
    this._strokeStyleInstructions = [new c(this._setProp, ["lineWidth", b == null ? "1" : b]), new c(this._setProp, ["lineCap", d == null ? "butt" : isNaN(d) ? d : Graphics.STROKE_CAPS_MAP[d]]), new c(this._setProp, ["lineJoin", g == null ? "miter" : isNaN(g) ? g : Graphics.STROKE_JOINTS_MAP[g]]), new c(this._setProp, ["miterLimit", m == null ? "10" : m])];
    return this
  };
  a.beginStroke = function(b) {
    this._active && this._newPath();
    this._strokeInstructions = b ? [new c(this._setProp, ["strokeStyle", b])] : null;
    return this
  };
  a.beginLinearGradientStroke = function(b, d, g, m, q, s) {
    this._active && this._newPath();
    g = this._ctx.createLinearGradient(g, m, q, s);
    m = 0;
    for(q = b.length;m < q;m++) {
      g.addColorStop(d[m], b[m])
    }
    this._strokeInstructions = [new c(this._setProp, ["strokeStyle", g])];
    return this
  };
  a.beginRadialGradientStroke = function(b, d, g, m, q, s, y, A) {
    this._active && this._newPath();
    g = this._ctx.createRadialGradient(g, m, q, s, y, A);
    m = 0;
    for(q = b.length;m < q;m++) {
      g.addColorStop(d[m], b[m])
    }
    this._strokeInstructions = [new c(this._setProp, ["strokeStyle", g])];
    return this
  };
  a.beginBitmapStroke = function(b, d) {
    this._active && this._newPath();
    d = d || "";
    var g = this._ctx.createPattern(b, d);
    this._strokeInstructions = [new c(this._setProp, ["strokeStyle", g])];
    return this
  };
  a.endStroke = function() {
    this.beginStroke(null);
    return this
  };
  a.curveTo = a.quadraticCurveTo;
  a.drawRect = a.rect;
  a.drawRoundRect = function(b, d, g, m, q) {
    this.drawRoundRectComplex(b, d, g, m, q, q, q, q);
    return this
  };
  a.drawRoundRectComplex = function(b, d, g, m, q, s, y, A) {
    this._dirty = this._active = true;
    this._activeInstructions.push(new c(this._ctx.moveTo, [b + q, d]), new c(this._ctx.lineTo, [b + g - s, d]), new c(this._ctx.arc, [b + g - s, d + s, s, -Math.PI / 2, 0, false]), new c(this._ctx.lineTo, [b + g, d + m - y]), new c(this._ctx.arc, [b + g - y, d + m - y, y, 0, Math.PI / 2, false]), new c(this._ctx.lineTo, [b + A, d + m]), new c(this._ctx.arc, [b + A, d + m - A, A, Math.PI / 2, Math.PI, false]), new c(this._ctx.lineTo, [b, d + q]), new c(this._ctx.arc, [b + q, d + q, q, Math.PI, Math.PI * 
    3 / 2, false]));
    return this
  };
  a.drawCircle = function(b, d, g) {
    this.arc(b, d, g, 0, Math.PI * 2);
    return this
  };
  a.drawEllipse = function(b, d, g, m) {
    this._dirty = this._active = true;
    var q = g / 2 * 0.5522848, s = m / 2 * 0.5522848, y = b + g, A = d + m;
    g = b + g / 2;
    m = d + m / 2;
    this._activeInstructions.push(new c(this._ctx.moveTo, [b, m]), new c(this._ctx.bezierCurveTo, [b, m - s, g - q, d, g, d]), new c(this._ctx.bezierCurveTo, [g + q, d, y, m - s, y, m]), new c(this._ctx.bezierCurveTo, [y, m + s, g + q, A, g, A]), new c(this._ctx.bezierCurveTo, [g - q, A, b, m + s, b, m]));
    return this
  };
  a.drawPolyStar = function(b, d, g, m, q, s) {
    this._dirty = this._active = true;
    if(q == null) {
      q = 0
    }
    q = 1 - q;
    if(s == null) {
      s = 0
    }else {
      s /= 180 / Math.PI
    }
    var y = Math.PI / m;
    this._activeInstructions.push(new c(this._ctx.moveTo, [b + Math.cos(s) * g, d + Math.sin(s) * g]));
    for(var A = 0;A < m;A++) {
      s += y;
      q != 1 && this._activeInstructions.push(new c(this._ctx.lineTo, [b + Math.cos(s) * g * q, d + Math.sin(s) * g * q]));
      s += y;
      this._activeInstructions.push(new c(this._ctx.lineTo, [b + Math.cos(s) * g, d + Math.sin(s) * g]))
    }
    return this
  };
  a.clone = function() {
    var b = new Graphics;
    b._instructions = this._instructions.slice();
    b._activeInstructions = this._activeInstructions.slice();
    b._oldInstructions = this._oldInstructions.slice();
    if(this._fillInstructions) {
      b._fillInstructions = this._fillInstructions.slice()
    }
    if(this._strokeInstructions) {
      b._strokeInstructions = this._strokeInstructions.slice()
    }
    if(this._strokeStyleInstructions) {
      b._strokeStyleInstructions = this._strokeStyleInstructions.slice()
    }
    b._active = this._active;
    b._dirty = this._dirty;
    return b
  };
  a.toString = function() {
    return"[Graphics]"
  };
  a.mt = a.moveTo;
  a.lt = a.lineTo;
  a.at = a.arcTo;
  a.bt = a.bezierCurveTo;
  a.qt = a.quadraticCurveTo;
  a.a = a.arc;
  a.r = a.rect;
  a.cp = a.closePath;
  a.c = a.clear;
  a.f = a.beginFill;
  a.lf = a.beginLinearGradientFill;
  a.rf = a.beginRadialGradientFill;
  a.bf = a.beginBitmapFill;
  a.ef = a.endFill;
  a.ss = a.setStrokeStyle;
  a.s = a.beginStroke;
  a.ls = a.beginLinearGradientStroke;
  a.rs = a.beginRadialGradientStroke;
  a.bs = a.beginBitmapStroke;
  a.es = a.endStroke;
  a.dr = a.drawRect;
  a.rr = a.drawRoundRect;
  a.rc = a.drawRoundRectComplex;
  a.dc = a.drawCircle;
  a.de = a.drawEllipse;
  a.dp = a.drawPolyStar;
  a._updateInstructions = function() {
    this._instructions = this._oldInstructions.slice();
    this._instructions.push(Graphics.beginCmd);
    this._fillInstructions && this._instructions.push.apply(this._instructions, this._fillInstructions);
    if(this._strokeInstructions) {
      this._instructions.push.apply(this._instructions, this._strokeInstructions);
      this._strokeStyleInstructions && this._instructions.push.apply(this._instructions, this._strokeStyleInstructions)
    }
    this._instructions.push.apply(this._instructions, this._activeInstructions);
    this._fillInstructions && this._instructions.push(Graphics.fillCmd);
    this._strokeInstructions && this._instructions.push(Graphics.strokeCmd)
  };
  a._newPath = function() {
    this._dirty && this._updateInstructions();
    this._oldInstructions = this._instructions;
    this._activeInstructions = [];
    this._active = this._dirty = false
  };
  a._setProp = function(b, d) {
    this[b] = d
  };
  a._extendBounds = function(b, d) {
    if(isNaN(this._minX)) {
      this._minX = this._maxX = b;
      this._minY = this._maxY = d
    }else {
      if(b < this._minX) {
        this._minX = b
      }else {
        if(b > this._maxX) {
          this._maxX = b
        }
      }
      if(d < this._minY) {
        this._minY = d
      }else {
        if(d > this._maxY) {
          this._maxY = d
        }
      }
    }
  };
  a._updateBounds = function() {
    for(;boundsQueue.length;) {
      boundsQueue.pop().exec(this)
    }
  };
  a._bezierCurveToBounds = function(b, d, g, m, q, s, y, A) {
    this._extendBounds(b, d);
    this._extendBounds(y, A)
  };
  e.Graphics = Graphics
})(window);(function(e) {
  DisplayObject = function() {
    this.initialize()
  };
  var c = DisplayObject.prototype;
  DisplayObject.suppressCrossDomainErrors = false;
  DisplayObject._hitTestCanvas = document.createElement("canvas");
  DisplayObject._hitTestCanvas.width = DisplayObject._hitTestCanvas.height = 1;
  DisplayObject._hitTestContext = DisplayObject._hitTestCanvas.getContext("2d");
  DisplayObject._workingMatrix = new Matrix2D;
  c.alpha = 1;
  c.cacheCanvas = null;
  c.id = -1;
  c.mouseEnabled = true;
  c.name = null;
  c.parent = null;
  c.regX = 0;
  c.regY = 0;
  c.rotation = 0;
  c.scaleX = 1;
  c.scaleY = 1;
  c.skewX = 0;
  c.skewY = 0;
  c.shadow = null;
  c.visible = true;
  c.x = 0;
  c.y = 0;
  c.compositeOperation = null;
  c.snapToPixel = false;
  c.onPress = null;
  c.onClick = null;
  c.onDoubleClick = null;
  c.onMouseOver = null;
  c.onMouseOut = null;
  c.filters = null;
  c._cacheOffsetX = 0;
  c._cacheOffsetY = 0;
  c._cacheDraw = false;
  c._activeContext = null;
  c._restoreContext = false;
  c._revertShadow = false;
  c._revertX = 0;
  c._revertY = 0;
  c._revertAlpha = 1;
  c._minX = NaN;
  c._minY = NaN;
  c._maxX = NaN;
  c._maxY = NaN;
  c.initialize = function() {
    this.id = UID.get();
    this.children = []
  };
  c.isVisible = function() {
    return this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0
  };
  c.draw = function(a, b) {
    if(b || !this.cacheCanvas) {
      return false
    }
    a.drawImage(this.cacheCanvas, this._cacheOffsetX, this._cacheOffsetY);
    return true
  };
  c.cache = function(a, b, d, g) {
    if(this.cacheCanvas == null) {
      this.cacheCanvas = document.createElement("canvas")
    }
    var m = this.cacheCanvas.getContext("2d");
    this.cacheCanvas.width = d;
    this.cacheCanvas.height = g;
    m.setTransform(1, 0, 0, 1, -a, -b);
    m.clearRect(0, 0, d + 1, g + 1);
    this.draw(m, true, new Matrix2D(1, 0, 0, 1, -a, -b));
    this._cacheOffsetX = a;
    this._cacheOffsetY = b;
    this._applyFilters()
  };
  c.updateCache = function(a) {
    if(this.cacheCanvas == null) {
      throw"cache() must be called before updateCache()";
    }
    var b = this.cacheCanvas.getContext("2d");
    b.setTransform(1, 0, 0, 1, -this._cacheOffsetX, -this._cacheOffsetY);
    if(a) {
      b.globalCompositeOperation = a
    }else {
      b.clearRect(0, 0, this.cacheCanvas.width + 1, this.cacheCanvas.height + 1)
    }
    this.draw(b, true);
    if(a) {
      b.globalCompositeOperation = "source-over"
    }
    this._applyFilters()
  };
  c.uncache = function() {
    this.cacheCanvas = null;
    this._cacheOffsetX = this._cacheOffsetY = 0
  };
  c.getStage = function() {
    for(var a = this;a.parent;) {
      a = a.parent
    }
    if(a instanceof Stage) {
      return a
    }
    return null
  };
  c.localToGlobal = function(a, b) {
    var d = this.getConcatenatedMatrix();
    if(d == null) {
      return null
    }
    d.append(1, 0, 0, 1, a, b);
    return new Point(d.tx, d.ty)
  };
  c.globalToLocal = function(a, b) {
    var d = this.getConcatenatedMatrix();
    if(d == null) {
      return null
    }
    d.invert();
    d.append(1, 0, 0, 1, a, b);
    return new Point(d.tx, d.ty)
  };
  c.localToLocal = function(a, b, d) {
    a = this.localToGlobal(a, b);
    return d.globalToLocal(a.x, a.y)
  };
  c.setTransform = function(a, b, d, g, m, q, s, y, A) {
    this.x = a || 0;
    this.y = b || 0;
    this.scaleX = d == null ? 1 : d;
    this.scaleY = g == null ? 1 : g;
    this.rotation = m || 0;
    this.skewX = q || 0;
    this.skewY = s || 0;
    this.regX = y || 0;
    this.regY = A || 0
  };
  c.getConcatenatedMatrix = function(a) {
    if(a) {
      a.identity()
    }else {
      a = new Matrix2D
    }
    for(var b = this;b != null;) {
      a.prependTransform(b.x, b.y, b.scaleX, b.scaleY, b.rotation, b.skewX, b.skewY, b.regX, b.regY);
      a.prependProperties(b.alpha, b.shadow, b.compositeOperation);
      b = b.parent
    }
    return a
  };
  c.hitTest = function(a, b) {
    var d = DisplayObject._hitTestContext, g = DisplayObject._hitTestCanvas;
    d.setTransform(1, 0, 0, 1, -a, -b);
    this.draw(d);
    d = this._testHit(d);
    g.width = 0;
    g.width = 1;
    return d
  };
  c.getBounds = function() {
    return this._cacheCanvas ? new Rectangle(-this._cacheOffsetX, -this._cacheOffsetY, this.cacheCanvas.width, this.cacheCanvas.height) : this._calculateBounds()
  };
  c.clone = function() {
    var a = new DisplayObject;
    this.cloneProps(a);
    return a
  };
  c.toString = function() {
    return"[DisplayObject (name=" + this.name + ")]"
  };
  c.cloneProps = function(a) {
    a.alpha = this.alpha;
    a.name = this.name;
    a.regX = this.regX;
    a.regY = this.regY;
    a.rotation = this.rotation;
    a.scaleX = this.scaleX;
    a.scaleY = this.scaleY;
    a.shadow = this.shadow;
    a.skewX = this.skewX;
    a.skewY = this.skewY;
    a.visible = this.visible;
    a.x = this.x;
    a.y = this.y;
    a.mouseEnabled = this.mouseEnabled;
    a.compositeOperation = this.compositeOperation
  };
  c.applyShadow = function(a, b) {
    b = b || Shadow.identity;
    a.shadowColor = b.color;
    a.shadowOffsetX = b.offsetX;
    a.shadowOffsetY = b.offsetY;
    a.shadowBlur = b.blur
  };
  c._testHit = function(a) {
    try {
      var b = a.getImageData(0, 0, 1, 1).data[3] > 1
    }catch(d) {
      if(!DisplayObject.suppressCrossDomainErrors) {
        throw"An error has occured. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images.";
      }
    }
    return b
  };
  c._applyFilters = function() {
    if(!(!this.filters || this.filters.length == 0 || !this.cacheCanvas)) {
      for(var a = this.filters.length, b = this.cacheCanvas.getContext("2d"), d = this.cacheCanvas.width, g = this.cacheCanvas.height, m = 0;m < a;m++) {
        this.filters[m].applyFilter(b, 0, 0, d, g)
      }
    }
  };
  c._calculateBounds = function() {
    return new Rectangle(0, 0, 0, 0)
  };
  e.DisplayObject = DisplayObject
})(window);(function(e) {
  Container = function() {
    this.initialize()
  };
  var c = Container.prototype = new DisplayObject;
  c.children = null;
  c.DisplayObject_initialize = c.initialize;
  c.initialize = function() {
    this.DisplayObject_initialize();
    this.children = []
  };
  c.isVisible = function() {
    return this.visible && this.alpha > 0 && this.children.length && this.scaleX != 0 && this.scaleY != 0
  };
  c.DisplayObject_draw = c.draw;
  c.draw = function(a, b, d) {
    var g = Stage._snapToPixelEnabled;
    if(!d) {
      d = new Matrix2D;
      d.appendProperties(this.alpha, this.shadow, this.compositeOperation)
    }
    if(this.DisplayObject_draw(a, b)) {
      return true
    }
    b = this.children.length;
    for(var m = this.children.slice(0), q = 0;q < b;q++) {
      var s = m[q];
      s.tick && s.tick();
      if(s.isVisible()) {
        var y = false, A = d.clone();
        A.appendTransform(s.x, s.y, s.scaleX, s.scaleY, s.rotation, s.skewX, s.skewY, s.regX, s.regY);
        A.appendProperties(s.alpha, s.shadow, s.compositeOperation);
        if(!(s instanceof Container && s.cacheCanvas == null)) {
          g && s.snapToPixel && A.a == 1 && A.b == 0 && A.c == 0 && A.d == 1 ? a.setTransform(A.a, A.b, A.c, A.d, A.tx + 0.5 | 0, A.ty + 0.5 | 0) : a.setTransform(A.a, A.b, A.c, A.d, A.tx, A.ty);
          a.globalAlpha = A.alpha;
          a.globalCompositeOperation = A.compositeOperation || "source-over";
          if(y = A.shadow) {
            this.applyShadow(a, y)
          }
        }
        s.draw(a, false, A);
        y && this.applyShadow(a)
      }
    }
    return true
  };
  c.addChild = function(a) {
    var b = arguments.length;
    if(b > 1) {
      for(var d = 0;d < b;d++) {
        this.addChild(arguments[d])
      }
      return arguments[b - 1]
    }
    a.parent && a.parent.removeChild(a);
    a.parent = this;
    this.children.push(a);
    return a
  };
  c.addChildAt = function(a, b) {
    var d = arguments.length;
    if(d > 2) {
      b = arguments[g - 1];
      for(var g = 0;g < d - 1;g++) {
        this.addChildAt(arguments[g], b + g)
      }
      return arguments[d - 2]
    }
    a.parent && a.parent.removeChild(a);
    a.parent = this;
    this.children.splice(b, 0, a);
    return a
  };
  c.removeChild = function(a) {
    var b = arguments.length;
    if(b > 1) {
      for(var d = true, g = 0;g < b;g++) {
        d = d && this.removeChild(arguments[g])
      }
      return d
    }
    return this.removeChildAt(this.children.indexOf(a))
  };
  c.removeChildAt = function(a) {
    var b = arguments.length;
    if(b > 1) {
      for(var d = [], g = 0;g < b;g++) {
        d[g] = arguments[g]
      }
      d.sort(function(q, s) {
        return s - q
      });
      var m = true;
      for(g = 0;g < b;g++) {
        m = m && this.removeChildAt(d[g])
      }
      return m
    }
    if(a < 0 || a > this.children.length - 1) {
      return false
    }
    b = this.children[a];
    if(b != null) {
      b.parent = null
    }
    this.children.splice(a, 1);
    return true
  };
  c.removeAllChildren = function() {
    for(;this.children.length;) {
      this.removeChildAt(0)
    }
  };
  c.getChildAt = function(a) {
    return this.children[a]
  };
  c.sortChildren = function(a) {
    this.children.sort(a)
  };
  c.getChildIndex = function(a) {
    return this.children.indexOf(a)
  };
  c.getNumChildren = function() {
    return this.children.length
  };
  c.contains = function(a) {
    for(;a;) {
      if(a == this) {
        return true
      }
      a = a.parent
    }
    return false
  };
  c.hitTest = function(a, b) {
    return this.getObjectUnderPoint(a, b) != null
  };
  c.getObjectsUnderPoint = function(a, b) {
    var d = [], g = this.localToGlobal(a, b);
    this._getObjectsUnderPoint(g.x, g.y, d);
    return d
  };
  c.getObjectUnderPoint = function(a, b) {
    var d = this.localToGlobal(a, b);
    return this._getObjectsUnderPoint(d.x, d.y)
  };
  c.clone = function(a) {
    var b = new Container;
    this.cloneProps(b);
    if(a) {
      for(var d = b.children = [], g = 0, m = this.children.length;g < m;g++) {
        d.push(this.children[g].clone(a))
      }
    }
    return b
  };
  c.toString = function() {
    return"[Container (name=" + this.name + ")]"
  };
  c._getObjectsUnderPoint = function(a, b, d, g) {
    var m = DisplayObject._hitTestContext, q = DisplayObject._hitTestCanvas, s = DisplayObject._workingMatrix, y = g & 1 && (this.onPress || this.onClick || this.onDoubleClick) || g & 2 && (this.onMouseOver || this.onMouseOut);
    if(this.cacheCanvas) {
      this.getConcatenatedMatrix(s);
      m.setTransform(s.a, s.b, s.c, s.d, s.tx - a, s.ty - b);
      m.globalAlpha = s.alpha;
      this.draw(m);
      if(this._testHit(m)) {
        q.width = 0;
        q.width = 1;
        if(y) {
          return this
        }
      }else {
        return null
      }
    }
    for(var A = this.children.length - 1;A >= 0;A--) {
      var H = this.children[A];
      if(H.isVisible() && H.mouseEnabled) {
        if(H instanceof Container) {
          if(y) {
            if(H = H._getObjectsUnderPoint(a, b)) {
              return this
            }
          }else {
            H = H._getObjectsUnderPoint(a, b, d, g);
            if(!d && H) {
              return H
            }
          }
        }else {
          if(!g || y || g & 1 && (H.onPress || H.onClick || H.onDoubleClick) || g & 2 && (H.onMouseOver || H.onMouseOut)) {
            H.getConcatenatedMatrix(s);
            m.setTransform(s.a, s.b, s.c, s.d, s.tx - a, s.ty - b);
            m.globalAlpha = s.alpha;
            H.draw(m);
            if(this._testHit(m)) {
              q.width = 0;
              q.width = 1;
              if(y) {
                return this
              }else {
                if(d) {
                  d.push(H)
                }else {
                  return H
                }
              }
            }
          }
        }
      }
    }
    return null
  };
  c._calculateBounds = function() {
  };
  e.Container = Container
})(window);(function(e) {
  Stage = function(a, b) {
    this.initialize(a, b)
  };
  var c = Stage.prototype = new Container;
  Stage._snapToPixelEnabled = false;
  c.autoClear = true;
  c.canvas = null;
  c.mouseX = null;
  c.mouseY = null;
  c.onMouseMove = null;
  c.onMouseUp = null;
  c.onMouseDown = null;
  c.snapToPixelEnabled = false;
  c.mouseInBounds = false;
  c._tmpCanvas = null;
  c._activeMouseEvent = null;
  c._activeMouseTarget = null;
  c._mouseOverIntervalID = null;
  c._mouseOverX = 0;
  c._mouseOverY = 0;
  c._mouseOverTarget = null;
  c.Container_initialize = c.initialize;
  c.initialize = function(a, b) {
    this.Container_initialize();
    this.canvas = a;
    this.mouseChildren = true;
    var d = this;
    if(b) {
      a.addEventListener("touchstart", function(g) {
        d._handleTouchStart(g)
      }, false);
      document.addEventListener("touchend", function(g) {
        d._handleTouchEnd(g)
      }, false)
    }else {
      if(e.addEventListener) {
        e.addEventListener("mouseup", function(g) {
          d._handleMouseUp(g)
        }, false);
        e.addEventListener("mousemove", function(g) {
          d._handleMouseMove(g)
        }, false);
        e.addEventListener("dblclick", function(g) {
          d._handleDoubleClick(g)
        }, false)
      }else {
        if(document.addEventListener) {
          document.addEventListener("mouseup", function(g) {
            d._handleMouseUp(g)
          }, false);
          document.addEventListener("mousemove", function(g) {
            d._handleMouseMove(g)
          }, false);
          document.addEventListener("dblclick", function(g) {
            d._handleDoubleClick(g)
          }, false)
        }
      }
      a.addEventListener("mousedown", function(g) {
        d._handleMouseDown(g)
      }, false)
    }
  };
  c.update = function() {
    if(this.canvas) {
      this.autoClear && this.clear();
      Stage._snapToPixelEnabled = this.snapToPixelEnabled;
      this.draw(this.canvas.getContext("2d"), false, this.getConcatenatedMatrix(DisplayObject._workingMatrix))
    }
  };
  c.tick = c.update;
  c.clear = function() {
    if(this.canvas) {
      var a = this.canvas.getContext("2d");
      a.setTransform(1, 0, 0, 1, 0, 0);
      a.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
  };
  c.toDataURL = function(a, b) {
    b || (b = "image/png");
    var d = this.canvas.getContext("2d"), g = this.canvas.width, m = this.canvas.height, q;
    if(a) {
      q = d.getImageData(0, 0, g, m);
      var s = d.globalCompositeOperation;
      d.globalCompositeOperation = "destination-over";
      d.fillStyle = a;
      d.fillRect(0, 0, g, m)
    }
    var y = this.canvas.toDataURL(b);
    if(a) {
      d.clearRect(0, 0, g, m);
      d.putImageData(q, 0, 0);
      d.globalCompositeOperation = s
    }
    return y
  };
  c.enableMouseOver = function(a) {
    if(this._mouseOverIntervalID) {
      clearInterval(this._mouseOverIntervalID);
      this._mouseOverIntervalID = null
    }
    if(!(a <= 0)) {
      var b = this;
      this._mouseOverIntervalID = setInterval(function() {
        b._testMouseOver()
      }, 1E3 / Math.min(50, a));
      this._mouseOverX = NaN;
      this._mouseOverTarget = null
    }
  };
  c.clone = function() {
    var a = new Stage(null);
    this.cloneProps(a);
    return a
  };
  c.toString = function() {
    return"[Stage (name=" + this.name + ")]"
  };
  c._primaryTouchId = -1;
  c._handleTouchMoveListener = null;
  c._handleTouchStart = function(a) {
    a.preventDefault();
    a = a.changedTouches;
    if(this._primaryTouchId == -1) {
      if(!this._handleTouchMoveListener) {
        var b = this;
        this._handleTouchMoveListener = function(d) {
          b._handleTouchMove(d)
        }
      }
      document.addEventListener("touchmove", this._handleTouchMoveListener, false);
      a = a[0];
      this._primaryTouchId = a.identifier;
      this._updateMousePosition(a.pageX, a.pageY);
      this._handleMouseDown(a)
    }
  };
  c._handleTouchMove = function(a) {
    (a = this._findPrimaryTouch(a.changedTouches)) && this._handleMouseMove(a)
  };
  c._handleTouchEnd = function(a) {
    if(a = this._findPrimaryTouch(a.changedTouches)) {
      this._handleMouseUp(a);
      this._primaryTouchId = -1;
      document.removeEventListener("touchmove", this._handleTouchMoveListener)
    }
  };
  c._findPrimaryTouch = function(a) {
    for(var b = a.length, d, g = 0;g < b;g++) {
      d = a[g];
      if(d.identifier == this._primaryTouchId) {
        return d
      }
    }
    return null
  };
  c._handleMouseMove = function(a) {
    if(this.canvas) {
      if(!a) {
        a = e.event
      }
      var b = this.mouseInBounds;
      this._updateMousePosition(a.pageX, a.pageY);
      if(b || this.mouseInBounds) {
        b = new MouseEvent("onMouseMove", this.mouseX, this.mouseY);
        b.nativeEvent = a;
        this.onMouseMove && this.onMouseMove(b);
        this._activeMouseEvent && this._activeMouseEvent.onMouseMove && this._activeMouseEvent.onMouseMove(b)
      }
    }else {
      this.mouseX = this.mouseY = null
    }
  };
  c._updateMousePosition = function(a, b) {
    var d = this.canvas;
    do {
      a -= d.offsetLeft;
      b -= d.offsetTop
    }while(d = d.offsetParent);
    if(this.mouseInBounds = a >= 0 && b >= 0 && a < this.canvas.width && b < this.canvas.height) {
      this.mouseX = a;
      this.mouseY = b
    }
  };
  c._handleMouseUp = function(a) {
    var b = new MouseEvent("onMouseUp", this.mouseX, this.mouseY);
    b.nativeEvent = a;
    this.onMouseUp && this.onMouseUp(b);
    this._activeMouseEvent && this._activeMouseEvent.onMouseUp && this._activeMouseEvent.onMouseUp(b);
    if(this._activeMouseTarget && this._activeMouseTarget.onClick && this._getObjectsUnderPoint(this.mouseX, this.mouseY, null, true, this._mouseOverIntervalID ? 3 : 1) == this._activeMouseTarget) {
      b = new MouseEvent("onClick", this.mouseX, this.mouseY);
      b.nativeEvent = a;
      this._activeMouseTarget.onClick(b)
    }
    this._activeMouseEvent = this.activeMouseTarget = null
  };
  c._handleMouseDown = function(a) {
    var b;
    if(this.onMouseDown) {
      b = new MouseEvent("onMouseDown", this.mouseX, this.mouseY);
      b.nativeEvent = a;
      this.onMouseDown(b)
    }
    var d = this._getObjectsUnderPoint(this.mouseX, this.mouseY, null, this._mouseOverIntervalID ? 3 : 1);
    if(d) {
      if(d.onPress instanceof Function) {
        b = new MouseEvent("onPress", this.mouseX, this.mouseY);
        b.nativeEvent = a;
        d.onPress(b);
        if(b.onMouseMove || b.onMouseUp) {
          this._activeMouseEvent = b
        }
      }
      this._activeMouseTarget = d
    }
  };
  c._testMouseOver = function() {
    if(!(this.mouseX == this._mouseOverX && this.mouseY == this._mouseOverY && this.mouseInBounds)) {
      var a = null;
      if(this.mouseInBounds) {
        a = this._getObjectsUnderPoint(this.mouseX, this.mouseY, null, 3);
        this._mouseOverX = this.mouseX;
        this._mouseOverY = this.mouseY
      }
      if(this._mouseOverTarget != a) {
        this._mouseOverTarget && this._mouseOverTarget.onMouseOut && this._mouseOverTarget.onMouseOut(new MouseEvent("onMouseOver", this.mouseX, this.mouseY));
        a && a.onMouseOver && a.onMouseOver(new MouseEvent("onMouseOut", this.mouseX, this.mouseY));
        this._mouseOverTarget = a
      }
    }
  };
  c._handleDoubleClick = function(a) {
    var b;
    if(this.onDoubleClick) {
      b = new MouseEvent("onDoubleClick", this.mouseX, this.mouseY);
      b.nativeEvent = a;
      this.onDoubleClick(b)
    }
    var d = this._getObjectsUnderPoint(this.mouseX, this.mouseY, null, this._mouseOverIntervalID ? 3 : 1);
    if(d) {
      if(d.onDoubleClick instanceof Function) {
        b = new MouseEvent("onPress", this.mouseX, this.mouseY);
        b.nativeEvent = a;
        d.onDoubleClick(b)
      }
    }
  };
  e.Stage = Stage
})(window);(function(e) {
  Bitmap = function(a) {
    this.initialize(a)
  };
  var c = Bitmap.prototype = new DisplayObject;
  c.image = null;
  c.snapToPixel = true;
  c.DisplayObject_initialize = c.initialize;
  c.initialize = function(a) {
    this.DisplayObject_initialize();
    this.image = a
  };
  c.isVisible = function() {
    return this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && this.image && (this.image.complete || this.image.getContext)
  };
  c.DisplayObject_draw = c.draw;
  c.draw = function(a, b) {
    if(this.DisplayObject_draw(a, b)) {
      return true
    }
    a.drawImage(this.image, 0, 0);
    return true
  };
  c.clone = function() {
    var a = new Bitmap(this.image);
    this.cloneProps(a);
    return a
  };
  c.toString = function() {
    return"[Bitmap (name=" + this.name + ")]"
  };
  c._calculateBounds = function() {
    return this.image && (this.image.complete || this.image.getContext) ? new Rectangle(0, 0, this.image.width, this.image.height) : new Rectangle(0, 0, 0, 0)
  };
  e.Bitmap = Bitmap
})(window);(function(e) {
  BitmapSequence = function(a) {
    this.initialize(a)
  };
  var c = BitmapSequence.prototype = new DisplayObject;
  c.callback = null;
  c.currentFrame = -1;
  c.currentSequence = null;
  c.currentEndFrame = null;
  c.currentStartFrame = null;
  c.nextSequence = null;
  c.paused = false;
  c.spriteSheet = null;
  c.snapToPixel = true;
  c.DisplayObject_initialize = c.initialize;
  c.initialize = function(a) {
    this.DisplayObject_initialize();
    this.spriteSheet = a
  };
  c.isVisible = function() {
    var a = this.spriteSheet ? this.spriteSheet.image : null;
    return this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && a && this.currentFrame >= 0 && (a.complete || a.getContext)
  };
  c.DisplayObject_draw = c.draw;
  c.draw = function(a, b) {
    if(this.DisplayObject_draw(a, b)) {
      return true
    }
    var d = this.spriteSheet.image, g = this.spriteSheet.frameWidth, m = this.spriteSheet.frameHeight, q = d.width / g | 0, s = d.height / m | 0;
    if(this.currentEndFrame != null) {
      if(this.currentFrame > this.currentEndFrame) {
        if(this.nextSequence) {
          this._goto(this.nextSequence)
        }else {
          this.paused = true;
          this.currentFrame = this.currentEndFrame
        }
        this.callback && this.callback(this)
      }
    }else {
      s = this.spriteSheet.totalFrames || q * s;
      if(this.currentFrame >= s) {
        if(this.spriteSheet.loop) {
          this.currentFrame = 0
        }else {
          this.currentFrame = s - 1;
          this.paused = true
        }
        this.callback && this.callback(this)
      }
    }
    this.currentFrame >= 0 && a.drawImage(d, g * (this.currentFrame % q), m * (this.currentFrame / q | 0), g, m, 0, 0, g, m);
    return true
  };
  c.tick = function() {
    if(this.currentFrame == -1 && this.spriteSheet.frameData) {
      this.paused = true
    }
    this.paused || this.currentFrame++
  };
  c.gotoAndPlay = function(a) {
    this.paused = false;
    this._goto(a)
  };
  c.gotoAndStop = function(a) {
    this.paused = true;
    this._goto(a)
  };
  c.clone = function() {
    var a = new BitmapSequence(this.spriteSheet);
    this.cloneProps(a);
    return a
  };
  c.toString = function() {
    return"[BitmapSequence (name=" + this.name + ")]"
  };
  c.DisplayObject_cloneProps = c.cloneProps;
  c.cloneProps = function(a) {
    this.DisplayObject_cloneProps(a);
    a.callback = this.callback;
    a.currentFrame = this.currentFrame;
    a.currentStartFrame = this.currentStartFrame;
    a.currentEndFrame = this.currentEndFrame;
    a.currentSequence = this.currentSequence;
    a.nextSequence = this.nextSequence;
    a.paused = this.paused;
    a.frameData = this.frameData
  };
  c._goto = function(a) {
    if(isNaN(a)) {
      if(a == this.currentSequence) {
        this.currentFrame = this.currentStartFrame
      }else {
        var b = this.spriteSheet.frameData[a];
        if(b instanceof Array) {
          this.currentFrame = this.currentStartFrame = b[0];
          this.currentSequence = a;
          this.currentEndFrame = b[1];
          if(this.currentEndFrame == null) {
            this.currentEndFrame = this.currentStartFrame
          }
          if(this.currentEndFrame == null) {
            this.currentEndFrame = this.currentFrame
          }
          this.nextSequence = b[2];
          if(this.nextSequence == null) {
            this.nextSequence = this.currentSequence
          }else {
            if(this.nextSequence == false) {
              this.nextSequence = null
            }
          }
        }else {
          this.currentSequence = this.nextSequence = null;
          this.currentEndFrame = this.currentFrame = this.currentStartFrame = b
        }
      }
    }else {
      this.currentSequence = this.nextSequence = this.currentEndFrame = null;
      this.currentStartFrame = 0;
      this.currentFrame = a
    }
  };
  c._calculateBounds = function() {
    return this.spriteSheet ? new Rectangle(0, 0, this.spriteSheet.frameWidth, this.spriteSheet.frameHeight) : new Rectangle(0, 0, 0, 0)
  };
  e.BitmapSequence = BitmapSequence
})(window);(function(e) {
  Shadow = function(a, b, d, g) {
    this.initialize(a, b, d, g)
  };
  var c = Shadow.prototype;
  Shadow.identity = null;
  c.color = null;
  c.offsetX = 0;
  c.offsetY = 0;
  c.blur = 0;
  c.initialize = function(a, b, d, g) {
    this.color = a;
    this.offsetX = b;
    this.offsetY = d;
    this.blur = g
  };
  c.toString = function() {
    return"[Shadow]"
  };
  c.clone = function() {
    return new Shadow(this.color, this.offsetX, this.offsetY, this.blur)
  };
  Shadow.identity = new Shadow(null, 0, 0, 0);
  e.Shadow = Shadow
})(window);(function(e) {
  Shape = function(a) {
    this.initialize(a)
  };
  var c = Shape.prototype = new DisplayObject;
  c.graphics = null;
  c.DisplayObject_initialize = c.initialize;
  c.initialize = function(a) {
    this.DisplayObject_initialize();
    this.graphics = a ? a : new Graphics
  };
  c.isVisible = function() {
    return this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && this.graphics
  };
  c.DisplayObject_draw = c.draw;
  c.draw = function(a, b) {
    if(this.DisplayObject_draw(a, b)) {
      return true
    }
    this.graphics.draw(a);
    return true
  };
  c.clone = function(a) {
    a = new Shape(a && this.graphics ? this.graphics.clone() : this.graphics);
    this.cloneProps(a);
    return a
  };
  c.toString = function() {
    return"[Shape (name=" + this.name + ")]"
  };
  c._calculateBounds = function() {
    return this.graphics ? this.graphics.getBounds() : new Rectangle(0, 0, 0, 0)
  };
  e.Shape = Shape
})(window);(function(e) {
  SpriteSheet = function(a, b, d, g) {
    this.initialize(a, b, d, g)
  };
  var c = SpriteSheet.prototype;
  c.image = null;
  c.frameWidth = 0;
  c.frameHeight = 0;
  c.frameData = null;
  c.loop = true;
  c.totalFrames = 0;
  c.initialize = function(a, b, d, g) {
    this.image = a;
    this.frameWidth = b;
    this.frameHeight = d;
    this.frameData = g
  };
  c.toString = function() {
    return"[SpriteSheet]"
  };
  c.clone = function() {
    var a = new SpriteSheet(this.image, this.frameWidth, this.frameHeight, this.frameData);
    a.loop = this.loop;
    a.totalFrames = this.totalFrames;
    return a
  };
  e.SpriteSheet = SpriteSheet
})(window);(function(e) {
  Text = function(a, b, d) {
    this.initialize(a, b, d)
  };
  var c = Text.prototype = new DisplayObject;
  Text._workingContext = document.createElement("canvas").getContext("2d");
  c.text = "";
  c.font = null;
  c.color = null;
  c.textAlign = null;
  c.textBaseline = null;
  c.maxWidth = null;
  c.outline = false;
  c.lineHeight = null;
  c.lineWidth = null;
  c.DisplayObject_initialize = c.initialize;
  c.initialize = function(a, b, d) {
    this.DisplayObject_initialize();
    this.text = a;
    this.font = b;
    this.color = d ? d : "#000"
  };
  c.isVisible = function() {
    return Boolean(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && this.text != null && this.text != "")
  };
  c.DisplayObject_draw = c.draw;
  c.draw = function(a, b) {
    if(this.DisplayObject_draw(a, b)) {
      return true
    }
    if(this.outline) {
      a.strokeStyle = this.color
    }else {
      a.fillStyle = this.color
    }
    a.font = this.font;
    a.textAlign = this.textAlign ? this.textAlign : "start";
    a.textBaseline = this.textBaseline ? this.textBaseline : "alphabetic";
    for(var d = String(this.text).split(/(?:\r\n|\r|\n)/), g = this.lineHeight == null ? this.getMeasuredLineHeight() : this.lineHeight, m = 0, q = 0, s = d.length;q < s;q++) {
      var y = a.measureText(d[q]).width;
      if(this.lineWidth == null || y < this.lineWidth) {
        this._drawTextLine(a, d[q], m)
      }else {
        y = d[q].split(/(\s)/);
        for(var A = y[0], H = 1, M = y.length;H < M;H += 2) {
          if(a.measureText(A + y[H] + y[H + 1]).width > this.lineWidth) {
            this._drawTextLine(a, A, m);
            m += g;
            A = y[H + 1]
          }else {
            A += y[H] + y[H + 1]
          }
        }
        this._drawTextLine(a, A, m)
      }
      m += g
    }
    return true
  };
  c.getMeasuredWidth = function() {
    return this._getWorkingContext().measureText(this.text).width
  };
  c.getMeasuredLineHeight = function() {
    return this._getWorkingContext().measureText("M").width * 1.2
  };
  c.clone = function() {
    var a = new Text(this.text, this.font, this.color);
    this.cloneProps(a);
    return a
  };
  c.toString = function() {
    return"[Text (text=" + (this.text.length > 20 ? this.text.substr(0, 17) + "..." : this.text) + ")]"
  };
  c.DisplayObject_cloneProps = c.cloneProps;
  c.cloneProps = function(a) {
    this.DisplayObject_cloneProps(a);
    a.textAlign = this.textAlign;
    a.textBaseline = this.textBaseline;
    a.maxWidth = this.maxWidth;
    a.outline = this.outline;
    a.lineHeight = this.lineHeight;
    a.lineWidth = this.lineWidth
  };
  c._getWorkingContext = function() {
    var a = Text._workingContext;
    a.font = this.font;
    a.textAlign = this.textAlign ? this.textAlign : "start";
    a.textBaseline = this.textBaseline ? this.textBaseline : "alphabetic";
    return a
  };
  c._drawTextLine = function(a, b, d) {
    this.outline ? a.strokeText(b, 0, d, this.maxWidth) : a.fillText(b, 0, d, this.maxWidth)
  };
  c._calculateBounds = function() {
  };
  e.Text = Text
})(window);function ImageLoadManager() {
}
EventDispatcher.create(ImageLoadManager);
if(ImageLoadManager.initilized == null) {
  ImageLoadManager.imagesToLoad = 0;
  ImageLoadManager.images = [];
  ImageLoadManager.imageHash = {};
  ImageLoadManager.initilized = true
}
ImageLoadManager.load = function(e, c) {
  var a = new Image;
  a.onload = ImageLoadManager.handleImageLoad;
  a.onerror = ImageLoadManager.handleImageLoadError;
  a.name = c;
  a.src = e
};
ImageLoadManager.loadList = function(e) {
  for(var c = ImageLoadManager.imagesToLoad = e.length, a = 0;a < c;a++) {
    ImageLoadManager.load(e[a].src, e[a].name)
  }
};
ImageLoadManager.getImage = function(e) {
  return ImageLoadManager.imageHash[e]
};
ImageLoadManager.handleImageLoad = function() {
  ImageLoadManager.images.push(this);
  ImageLoadManager.imageHash[this.name] = this;
  ImageLoadManager.dispatchEvent("complete", {image:this});
  --ImageLoadManager.imagesToLoad == 0 && ImageLoadManager.dispatchEvent("loadComplete")
};
ImageLoadManager.handleImageLoadError = function(e) {
  trace("ERROR LOADING: ", this.name);
  ImageLoadManager.dispatchEvent("error", e)
};function CloudEffect(e, c) {
  this.CloudEffect(e, c)
}
CloudEffect.cloudSrc = ["img/Cloud1.png", "img/Cloud2.png", "img/Cloud3.png", "img/Cloud4.png", "img/Cloud5.png"];
CloudEffect.preloaded = false;
CloudEffect.preloadCount = 0;
CloudEffect.cloudImgs = [];
CloudEffect.preload = function() {
  if(!(CloudEffect.preloaded || CloudEffect.preloadCount != 0)) {
    CloudEffect.preloadCount = CloudEffect.cloudSrc.length;
    for(var e = 0;e < CloudEffect.preloadCount;e++) {
      var c = new Image;
      c.onload = CloudEffect.imageLoaded;
      c.src = CloudEffect.cloudSrc[e]
    }
  }
};
CloudEffect.imageLoaded = function(e) {
  var c = CloudEffect.generateShadow(e.target);
  CloudEffect.cloudImgs.push({img:e.target, shadow:c});
  if(--CloudEffect.preloadCount == 0) {
    CloudEffect.preloaded = true
  }
};
CloudEffect.generateShadow = function(e) {
  var c = document.createElement("canvas"), a = e.width, b = e.height;
  c.width = a;
  c.height = b;
  var d = c.getContext("2d");
  d.drawImage(e, 0, 0);
  e = d.getImageData(0, 0, a, b);
  for(var g = e.data, m = a * b * 4, q = 0;q < m;q += 4) {
    g[q] = g[q + 1] = g[q + 2] = 0;
    g[q + 3] *= 0.15
  }
  d.clearRect(0, 0, a, b);
  d.putImageData(e, 0, 0);
  return c
};
CloudEffect.prototype = {CloudEffect:function(e, c) {
  this.name = "cloudEffect";
  this.clouds = [];
  this.darkClouds = c;
  this.nextCloud = 0;
  this.enabled = e;
  this.nextY = Math.random() * 200
}, toString:function() {
  return"[CloudEffect]"
}, setEnabled:function(e) {
  this.enabled = e
}, setVisible:function(e) {
  this.visible = e
}, update:function(e, c, a, b) {
  if(CloudEffect.preloaded) {
    if(!b && this.clouds.length < 10) {
      if(this.nextCloud <= 0) {
        var d = Math.random() * CloudEffect.cloudImgs.length | 0, g = CloudEffect.cloudImgs[d].img, m = Math.random() * 2 + 2;
        d = {n:d, h:Math.random() * 60 + 30, sx:m, sy:Math.random() * 2 + 1, x:-g.width * m, y:this.nextY - g.height / 2, vx:Math.random() + 1, vy:Math.random() * 0.2 - 0.1};
        this.clouds.push(d);
        this.nextCloud = Math.random() * 200 + 150 | 0;
        this.nextY = (this.nextY + (0.2 + Math.random() * 0.3) * a) % a
      }
      this.nextCloud--
    }
    m = this.clouds.length;
    for(var q = m - 1;q >= 0;q--) {
      d = this.clouds[q];
      if(!b) {
        d.x += d.vx;
        d.y += d.vy;
        if(d.x > c) {
          this.clouds.splice(q, 1);
          m--;
          continue
        }
      }
      g = CloudEffect.cloudImgs[d.n].shadow;
      this.visible && e.drawImage(g, d.x + d.h * 0.6, d.y + d.h, g.width * d.sx, g.height * d.sy)
    }
    if(this.darkClouds) {
      e.fillStyle = "rgba(25, 30, 40, 0.15)";
      e.fillRect(0, 0, c, a)
    }
    if(this.visible) {
      for(q = 0;q < m;q++) {
        d = this.clouds[q];
        g = CloudEffect.cloudImgs[d.n].img;
        e.drawImage(g, d.x, d.y, g.width * d.sx, g.height * d.sy)
      }
    }
  }
}};function DustStormEffect(e) {
  this.DustStormEffect(e)
}
DustStormEffect.imageSrc = "img/DustStorm.png";
DustStormEffect.scale = 2;
DustStormEffect.layers = 4;
DustStormEffect.preloaded = false;
DustStormEffect.preloading = false;
DustStormEffect.preload = function() {
  if(!(DustStormEffect.preloaded || DustStormEffect.preloading)) {
    DustStormEffect.preloading = true;
    DustStormEffect.image = new Image;
    DustStormEffect.image.src = DustStormEffect.imageSrc;
    DustStormEffect.image.onload = DustStormEffect.imageLoaded
  }
};
DustStormEffect.imageLoaded = function() {
  DustStormEffect.preloaded = true
};
DustStormEffect.prototype = {DustStormEffect:function(e) {
  this.count = 0;
  this.inited = false;
  this.velocity = -20;
  this.interval = 91;
  this.enabled = e;
  this.count = Math.PI / 2 * 3 * this.interval
}, toString:function() {
  return"[DustStormEffect]"
}, init:function(e, c) {
  this.tileCanvas = document.createElement("canvas");
  var a = this.tileCanvas.getContext("2d"), b = DustStormEffect.image.width, d = DustStormEffect.image.height;
  this.tileCanvas.width = Math.ceil(e / DustStormEffect.scale) + d;
  this.tileCanvas.height = Math.ceil(c / DustStormEffect.scale) + b;
  for(var g = 0;g < this.tileCanvas.height;) {
    for(var m = 0;m < this.tileCanvas.width;) {
      a.drawImage(DustStormEffect.image, m, g);
      m += b
    }
    g += d
  }
  this.inited = true
}, setEnabled:function(e) {
  this.enabled = e
}, update:function(e, c, a, b) {
  if(DustStormEffect.preloaded) {
    this.inited || this.init(c, a);
    b || this.count++;
    c = DustStormEffect.image.width * DustStormEffect.scale;
    a = DustStormEffect.image.height * DustStormEffect.scale;
    b = DustStormEffect.layers;
    var d = Math.sin(this.count / this.interval) * 0.5 + 0.5;
    d *= d;
    d *= 0.45;
    for(var g = 0;g < b;g++) {
      var m = this.count * (g / b * 0.7 + 0.3) * this.velocity, q = Math.sin(m / 750 + g) * a * 0.5;
      m = (m + c) % c;
      q = (q + a) % a - a;
      e.globalAlpha = 0.1 + d * (0.5 + g / b * 0.5);
      e.drawImage(this.tileCanvas, m, q, this.tileCanvas.width * DustStormEffect.scale, this.tileCanvas.height * DustStormEffect.scale)
    }
  }
}};(function(e) {
  function c(a, b, d, g, m) {
    this.FallingParticles(a, b, d, g, m)
  }
  c.prototype = {FallingParticles:function(a, b, d, g, m) {
    this.particleImages = [];
    this.particleList = [];
    this.particleSrc = b;
    this.scaleDown = false;
    this.globalAlpha = m || 1;
    this.radius = 250;
    this.scaleMin = d || 0.25;
    this.scaleMax = g || 1;
    this.minVelocityY = 1.5;
    this.maxVelocityY = 5;
    this.minVelocityX = -3;
    this.maxVelocityX = 6;
    this.mouseEnabled = true;
    this.canvas = a;
    this.context = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.preloadCount = this.particleSrc.length;
    this.preloaded = false;
    for(a = 0;a < this.particleSrc.length;a++) {
      b = new Image;
      b.onload = $.proxy(this, "imageLoaded");
      b.src = this.particleSrc[a]
    }
    this.setEnabled(true)
  }, setEnabled:function() {
    this.enabled = true
  }, setAlpha:function(a) {
    this.globalAlpha = a
  }, imageLoaded:function(a) {
    this.particleImages.push({img:a.target});
    if(--this.preloadCount == 0) {
      this.preloaded = true;
      this.started && this.start(this.numParticles)
    }
  }, start:function(a) {
    this.started = true;
    this.numParticles = a;
    if(this.preloaded != false) {
      a = this.numParticles;
      for(var b, d, g = 0;g < a;g++) {
        b = Math.random() * this.particleImages.length | 0;
        b = this.particleImages[b].img;
        b = {image:b};
        this.initParticle(b);
        b.y = -Math.random() * this.height - 100;
        if(d != null) {
          d.next = b
        }else {
          this.firstNode = b
        }
        d = b
      }
      this.canvas.onmousemove = $.proxy(this, "onMouseMove")
    }
  }, stop:function(a) {
    this.started = false;
    this.canvas.onmousemove = null;
    a && this.context.clearRect(0, 0, this.width, this.height)
  }, initParticle:function(a) {
    a.x = Math.random() * this.width;
    a.y = -100;
    var b = this.scaleMin + Math.random() * (this.scaleMax - this.scaleMin);
    a.width = a.image.width * b;
    a.height = a.image.height * b;
    a.registrationPoint = new Point(a.width / 2, a.height / 2);
    a.alpha = Math.min(1, b * 2.4 - 0.3);
    a.velocityX = (this.minVelocityX + Math.random() * this.maxVelocityX) * b;
    a.velocityY = this.minVelocityY + this.maxVelocityY * b + Math.random()
  }, tick:function() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.update(this.context, this.width, this.height, false)
  }, update:function(a) {
    if(this.preloaded != false) {
      var b, d, g, m, q, s, y = this.radius;
      g = this.mouseX;
      q = this.mouseY;
      var A = [new Point(g, q)];
      if(this.mousePoints) {
        A = this.mousePoints.concat(A)
      }
      for(var H = A.length, M = this.firstNode;M != null;) {
        M.x += M.velocityX;
        M.y += M.velocityY;
        a.globalAlpha = M.alpha * this.globalAlpha;
        a.drawImage(M.image, M.x, M.y, M.width | 0, M.height | 0);
        if(this.scaleDown && M.y > 0) {
          M.width *= 0.92;
          M.height *= 0.92
        }
        if(M.y > this.height || M.height < 2) {
          this.initParticle(M)
        }else {
          if(this.mouseEnabled == true) {
            b = M.x + M.registrationPoint.x;
            d = M.y + M.registrationPoint.y;
            for(s = 0;s < H;s++) {
              g = A[s].x;
              q = A[s].y;
              g = g - b;
              m = q - d;
              q = (y - Math.sqrt(g * g + m * m)) / y;
              if(q > 0) {
                g = Math.atan2(m, g);
                M.x += Math.cos(g) * q * -12;
                M.y += Math.min(0, Math.sin(g) * q * -8)
              }
            }
          }
        }
        M = M.next
      }
    }
  }, onMouseMove:function(a) {
    if(this.preloaded != false) {
      if(a.offsetX) {
        this.mouseX = a.offsetX;
        this.mouseY = a.offsetY
      }else {
        if(a.layerX) {
          this.mouseX = a.layerX;
          this.mouseY = a.layerY
        }
      }
      if(this.siblings) {
        a = this.siblings.length;
        for(var b = 0;b < a;b++) {
          this.siblings[b].mouseX = this.mouseX;
          this.siblings[b].mouseY = this.mouseY
        }
      }
    }
  }};
  e.FallingParticles = c
})(window);(function(e) {
  function c(a, b, d, g, m) {
    this.RainEffect(a, b, d, g, m)
  }
  c.prototype = {RainEffect:function(a, b) {
    this.particleImages = [];
    this.particleList = [];
    this.particleSrc = b;
    this.enabled = true;
    this.canvas = a;
    this.context = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.preloadCount = this.particleSrc.length;
    this.preloaded = false;
    for(var d = 0;d < this.particleSrc.length;d++) {
      var g = new Image;
      g.onload = $.proxy(this, "imageLoaded");
      g.src = this.particleSrc[d]
    }
    this.enabled = false;
    this.raining = true
  }, start:function() {
    this.raining = true
  }, stop:function() {
    this.raining = false
  }, setEnabled:function(a) {
    this.enabled = a
  }, imageLoaded:function(a) {
    this.particleImages.push(a.target);
    this.preloaded = --this.preloadCount == 0
  }, initParticle:function(a) {
    a.x = Math.random() * this.width;
    a.y = Math.random() * this.height - 200;
    a.image = this.particleImages[this.particleImages.length * Math.random() | 0];
    var b = Math.random() * 0.5 + 0.5;
    a.scale = b;
    a.width = a.image.width * b * (Math.random() * 0.3 + 0.3);
    a.height = a.image.height * b;
    a.alpha = b * 0.4;
    return a
  }, tick:function() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.update(this.context, this.width, this.height, false)
  }, update:function() {
    if(!(this.preloaded == false || this.enabled == false)) {
      for(;this.raining && this.particleList.length < 240 && Math.random() < 0.4;) {
        this.particleList.push(this.initParticle({}))
      }
      for(var a = this.particleList.length - 1;a >= 0;a--) {
        particle = this.particleList[a];
        particle.y += particle.scale * 40;
        this.context.globalAlpha = particle.alpha;
        this.context.drawImage(particle.image, particle.x, particle.y, particle.width | 0, particle.height | 0);
        particle.alpha -= 0.02;
        particle.width *= 0.98;
        particle.height *= 0.98;
        if(particle.y > this.height || particle.alpha <= 0) {
          if(!this.raining && Math.random() < 0.5) {
            this.particleList.splice(a, 1);
            if(this.particleList.length == 0) {
              this.enabled = false
            }
          }else {
            this.initParticle(particle)
          }
        }
      }
    }
  }};
  e.RainEffect = c
})(window);(function(e) {
  function c(a, b) {
    this.StormEffect(a, b)
  }
  c.prototype = {StormEffect:function(a) {
    this.setEnabled(a);
    this.starting = true;
    this.ending = false
  }, toString:function() {
    return"[StormEffect]"
  }, setEnabled:function() {
    this.enabled = true
  }, start:function() {
    this.starting = true;
    this.ending = false;
    this.enabled = true;
    this.count = 0;
    this.fresh = true;
    this.lightningCount = 70
  }, stop:function() {
    this.count = 0;
    this.ending = true;
    this.starting = false
  }, update:function(a, b, d) {
    this.count++;
    if(!this.ending && --this.lightningCount == 0) {
      if(this.fresh) {
        Math.random() < 0.4 ? AudioManager.playSoundDelayed(AudioManager.THUNDER2, 30) : AudioManager.playSoundDelayed(AudioManager.THUNDER1, 30)
      }
      this.fresh = false;
      this.lightningLength = Math.random() * 8 + 4 | 0;
      this.lightningCount = -Math.random() * 0.5 * this.lightningLength | 0
    }
    var g = this.lightningCount > 0 ? 0 : (this.lightningCount + this.lightningLength) / this.lightningLength, m = 0.4;
    if(this.starting) {
      m = Math.min(this.count / 120, 1) * (1 - g) * 0.4;
      if(m == 1) {
        this.starting = false
      }
    }else {
      if(this.ending) {
        m = (1 - Math.max(this.count / 30, 0)) * (1 - g) * 0.4;
        if(m == 0) {
          this.greyAlpha = 0;
          this.enabled = false
        }
      }
    }
    a.fillStyle = "rgba(25, 30, 40, " + m + ")";
    a.fillRect(0, 0, b, d);
    if(g > 0) {
      a.fillStyle = "rgba(255, 255, 255, " + g + ")";
      a.fillRect(0, 0, b, d);
      if(Math.random() < 0.15) {
        this.lightningCount = 1
      }
    }else {
      if(this.lightningCount < 0) {
        this.lightningCount = Math.random() * 250 + 20 | 0;
        this.fresh = true
      }
    }
  }};
  e.StormEffect = c
})(window);(function(e) {
  function c() {
    throw"SpriteSheetUtils cannot be instantiated";
  }
  c.flip = function(a, b, d, g, m) {
    var q = a.width / b | 0, s = a.height / d | 0, y = q * s, A = {};
    for(var H in g) {
      G = g[H];
      if(G instanceof Array) {
        G = G.slice(0)
      }
      A[H] = G
    }
    var M = [], S = 0, V = 0;
    for(H in m) {
      G = m[H];
      var G = g[G[0]];
      if(G != null) {
        if(G instanceof Array) {
          var k = G[0], W = G[1];
          if(W == null) {
            W = k
          }
        }else {
          k = W = G
        }
        M[V] = H;
        M[V + 1] = k;
        M[V + 2] = W;
        S += W - k + 1;
        V += 4
      }
    }
    g = document.createElement("canvas");
    g.width = a.width;
    g.height = Math.ceil(s + S / q) * d;
    S = g.getContext("2d");
    for(H = q * b;H > 0;) {
      try {
        S.drawImage(a, 0, 0, H, s * d, 0, 0, H, s * d);
        break
      }catch(ia) {
        H--
      }
    }
    s = y - 1;
    for(V = 0;V < M.length;V += 4) {
      H = M[V];
      k = M[V + 1];
      W = M[V + 2];
      G = m[H];
      y = G[1] ? -1 : 1;
      var ga = G[2] ? -1 : 1, ba = y == -1 ? b : 0, ja = ga == -1 ? d : 0;
      for(j = k;j <= W;j++) {
        s++;
        S.save();
        S.translate(s % q * b + ba, (s / q | 0) * d + ja);
        S.scale(y, ga);
        try {
          S.drawImage(a, j % q * b, (j / q | 0) * d, b, d, 0, 0, b, d)
        }catch(pa) {
          DatabaseDelegate.logError("SpriteSheet.flip()", "Image: " + a.src);
          break
        }
        S.restore()
      }
      A[H] = [s - (W - k), s, G[3]]
    }
    a = new Image;
    a.src = g.toDataURL("image/png");
    return{image:a, frameData:A}
  };
  c.frameDataToString = function(a) {
    var b = "", d = 0, g = 0, m = 0;
    for(var q in a) {
      m++;
      data = a[q];
      if(data instanceof Array) {
        var s = data[0], y = data[1];
        if(y == null) {
          y = s
        }
        next = data[2];
        if(next == null) {
          next = q
        }
      }else {
        s = y = data;
        next = q
      }
      b += "\n\t" + q + ", start=" + s + ", end=" + y + ", next=" + next;
      if(next == false) {
        b += " (stop)"
      }else {
        if(next == q) {
          b += " (loop)"
        }
      }
      if(y > d) {
        d = y
      }
      if(s < g) {
        g = s
      }
    }
    return b = m + " sequences, min=" + g + ", max=" + d + b
  };
  e.SpriteSheetUtils = c
})(window);(function(e) {
  function c() {
  }
  c.NUM_1 = 49;
  c.NUM_2 = 50;
  c.NUM_3 = 51;
  c.NUM_4 = 52;
  c.NUM_5 = 53;
  c.RETIRE = 88;
  c.UPGRADE = 32;
  c.NEXT_WAVE = 87;
  c.ESCAPE = 27;
  c.DEBUG = 191;
  c.SPACE = 32;
  c.R = 82;
  c.G = 71;
  e.KeyShortcuts = c
})(window);(function(e) {
  function c() {
    this.VerifyScore()
  }
  c.allScores = [];
  c.prototype = {VerifyScore:function() {
    EventDispatcher.create(this)
  }, getAllScores:function() {
    if(c.allScores.length == 0) {
      c.wave = new WaveManager;
      c.assetLoader = new AssetLoader;
      c.assetLoader.removeAllListeners();
      trace("<br />MAX SCORES:<br />")
    }else {
      trace(c.allScores[c.allScores.length - 1])
    }
    if(c.allScores.length <= 4) {
      if(c.allScores.length == 4) {
        trace("<br />")
      }else {
        var a = "maps/map{0}/".supplant(c.allScores.length + 1);
        c.assetLoader.addEventListener("complete", new EventProxy(this, "handleLoad"));
        c.assetLoader.load([new Asset("mapJSON", AssetLoader.JSON_TYPE, a + "map.json"), new Asset("waveJSON", AssetLoader.JSON_TYPE, a + "waves.json")])
      }
    }
  }, handleLoad:function() {
    c.assetLoader.removeAllListeners();
    var a = LoadedAssets.getAsset("mapJSON"), b = LoadedAssets.getAsset("waveJSON"), d = c.allScores.length, g = 0, m = 0, q = 0, s = m = 0, y = MapInfo.getTitleByIndex(d + 1);
    c.wave.reset(b);
    g = this.getWavesScore(c.wave.waves, 1);
    m = this.getWavesCash(c.wave.waves, 1);
    q = b.waves;
    for(s = 0;s < q.length;s++) {
      var A = q[s].units;
      if(A) {
        for(var H = 0;H < A.length;H++) {
          A[H].count = A[H].type != "kraken" ? Math.ceil(A[H].count * GameInfo.EPIC_CREEP_INSTANCE_MULTIPLIER) : Math.floor(A[H].count * GameInfo.EPIC_CREEP_INSTANCE_MULTIPLIER)
        }
      }
    }
    c.wave.reset(b);
    q = this.getWavesScore(c.wave.waves, GameInfo.EPIC_CREEP_LEVEL_MULTIPLIER);
    s = this.getWavesCash(c.wave.waves, GameInfo.EPIC_GOLD_MULTIPLIER);
    b = b.startGold * GameInfo.GOLD_BONUS;
    g += m + b;
    q += s + b * GameInfo.EPIC_GOLD_MULTIPLIER;
    m = g;
    b = GameInfo.DAISY_BONUS * GameInfo.ALL_DAISY_MULTIPLIER;
    g += a.daisyData.length / 2 * b;
    m += b;
    q += a.daisyData.length / 2 * b;
    c.allScores[d] = y + "- Normal: " + (g | 0) + ", SuddenDeath: " + (m | 0) + ", Epic: " + (q | 0) + ");";
    this.getAllScores()
  }, getWavesCash:function(a, b) {
    for(var d = 0, g = 0, m = a.length, q = 0;q < m;q++) {
      var s = a[q].totalCreeps * a[q].reward * b;
      d += GameInfo.CURRENT_GOLD_BONUS * s;
      d += GameInfo.CURRENT_GOLD_BONUS * g * 0.3;
      g += s
    }
    d += g * GameInfo.GOLD_BONUS * GameInfo.PIRATE_SALE_MULTIPLIER * 0.7;
    d += g * GameInfo.GOLD_BONUS * 1 * 0.3;
    return d
  }, getWavesScore:function(a, b) {
    for(var d = 0, g = 0, m = 0, q = 0, s = null, y = null, A = 0, H = a.length, M = 0;M < H;M++) {
      s = a[M];
      A = s.units.length;
      for(var S = m = g = 0;S < A;S++) {
        y = s.units[S];
        d += y.count * BitmapModel.getScoreValue(y.type, y.level * b) * GameInfo.EARLY_KILL_MULTIPLIER;
        q = y.count * y.interval;
        if(q + m > g) {
          g = q + m
        }
        m = y.timing
      }
      d += Math.max(0, (s.nextWave - g) * GameInfo.EARLY_TICK_BONUS)
    }
    return d
  }};
  e.VerifyScore = c
})(window);(function(e) {
  function c() {
  }
  c.DAMAGE = 1;
  c.RANGE = 2;
  c.SPLASH_RANGE = 4;
  c.RATE_OF_FIRE = 8;
  c.SLOW = 16;
  c.pirates = {sabre:[{rateOfFire:1.4, projectileDelay:5, damage:70, range:60, splashRange:0, cost:75, motivate:c.RATE_OF_FIRE}, {rateOfFire:1.25, projectileDelay:5, damage:140, range:67, splashRange:0, cost:125, motivate:c.RATE_OF_FIRE}, {rateOfFire:1.05, projectileDelay:6, damage:210, range:85, splashRange:0, cost:150, motivate:c.RATE_OF_FIRE | c.DAMAGE}], cannon:[{projectile:"cannon", projectileDelay:2, projectileOffset:[28, 20, 23, 28, 23, 41], rateOfFire:1.8, damage:60, range:120, splashRange:50, 
  cost:150, motivate:c.SPLASH_RANGE}, {projectile:"cannon", projectileDelay:2, projectileOffset:[28, 20, 23, 28, 23, 41], rateOfFire:1.65, damage:85, range:135, splashRange:60, cost:200, motivate:c.SPLASH_RANGE}, {projectile:"cannon", projectileDelay:2, projectileOffset:[28, 20, 23, 28, 23, 41], rateOfFire:1.5, damage:140, range:150, splashRange:70, cost:250, motivate:c.SPLASH_RANGE | c.RATE_OF_FIRE}], cabinBoy:[{projectile:"sponge", projectileDelay:13, protectileDuration:16, projectileOffset:[12, 
  33, 24, 30, 24, 30], rateOfFire:1.4, damage:6, range:95, splashRange:0, slowAmount:0.55, slowDuration:50, cost:100, motivate:c.DAMAGE}, {projectile:"sponge", projectileDelay:13, protectileDuration:16, projectileOffset:[12, 43, 24, 30, 24, 30], rateOfFire:1.25, damage:12, range:100, splashRange:0, slowAmount:0.8, slowDuration:70, cost:125, motivate:c.DAMAGE}, {projectile:"sponge", projectileDelay:13, protectileDuration:16, projectileOffset:[12, 43, 24, 30, 24, 30], rateOfFire:1.35, damage:20, range:115, 
  splashRange:40, slowAmount:0.7, slowDuration:65, cost:150, motivate:c.DAMAGE | c.RANGE}], shooter:[{rateOfFire:1.2, projectileDelay:12, damage:9, range:128, splashRange:0, cost:50, motivate:c.RANGE}, {rateOfFire:1.15, projectileDelay:9, damage:14, range:145, splashRange:0, cost:100, motivate:c.RANGE}, {rateOfFire:1.1, projectileDelay:6, damage:40, range:160, splashRange:0, cost:175, motivate:c.RANGE | c.RATE_OF_FIRE}], captain:[{motivation:1.1, range:60, cost:300}, {motivation:1.22, range:60, cost:400}, 
  {motivation:1.35, range:100, cost:500}]};
  c.getPirate = function(a, b) {
    var d = c.pirates[a][b - 1];
    d.resale = d.cost * GameInfo.PIRATE_SALE_MULTIPLIER | 0;
    return new PirateData(a, b, d)
  };
  c.getUpgradeTotal = function(a) {
    return c.pirates[a].length
  };
  e.PirateManager = c
})(window);(function(e) {
  function c() {
    this.WaveManager()
  }
  function a(d, g, m) {
    this.Wave(d, g, m)
  }
  function b(d, g) {
    this.SubWave(d, g)
  }
  c.prototype = {WaveManager:function() {
    EventDispatcher.create(this);
    this.handleNewCreepProxy = new EventProxy(this, "handleNewCreep");
    this.handleNextWaveProxy = new EventProxy(this, "sendNextWave");
    this.handleWaveEndProxy = new EventProxy(this, "handleWaveEnd");
    this.complete = false;
    this.totalCreeps = this.totalWaves = 0;
    this.active = false
  }, sendNextWave:function() {
    Tick.isPaused() && globalPause(false);
    var d = this.getCurrentWave();
    d != null && d.removeEventListener("nextWave", this.handleNextWaveProxy);
    d = 0;
    if(this.currentWave != -1) {
      d = this.getTimeTillNextWave()
    }
    var g = this.currentWave + 1;
    if(g != this.waves.length) {
      this.currentWave = g;
      g = this.getCurrentWave();
      g.start();
      this.dispatchEvent("nextWave", {wave:g, timeBonus:d})
    }
  }, getCurrentWave:function() {
    return this.waves[this.currentWave]
  }, getNextWave:function() {
    return this.waves[this.currentWave + 1]
  }, getTimeTillNextWave:function() {
    return this.getCurrentWave().getTimeTillNextWave()
  }, start:function() {
    this.active = true;
    Tick.addListener(this, true)
  }, stop:function() {
    this.active = false;
    Tick.removeListener(this, true)
  }, reset:function(d) {
    Tick.removeListener(this, true);
    this.cleanUp();
    this._data = d;
    this.startGold = d.startGold;
    this.totalCreeps = 0;
    d = d.waves;
    for(var g = 0, m = d.length;g < m;g++) {
      var q = new a(g, d[g], this.createCreeepProxy);
      this.totalCreeps += q.totalCreeps;
      q.createCreeepProxy = this.handleNewCreepProxy;
      q.addEventListener("complete", this.handleWaveEndProxy);
      q.addEventListener("nextWave", this.handleNextWaveProxy);
      this.waveHash[q.id] = q;
      this.waves.push(q)
    }
    this.currentWave = -1;
    this.totalWaves = this.waves.length - this.currentWave - 1;
    this.sendNextWave()
  }, cleanUp:function() {
    Tick.removeListener(this);
    if(this.waves != null) {
      for(var d = 0, g = this.waves.length;d < g;d++) {
        this.waves[d].cleanUp()
      }
    }
    this.waves = [];
    this.waveHash = {}
  }, handleWaveEnd:function() {
    this.totalWaves--;
    if(this.totalWaves == 0) {
      this.stop();
      this.complete = true;
      this.dispatchEvent("complete")
    }
  }, handleNewCreep:function(d) {
    this.dispatchEvent("addSprite", {data:d.creep})
  }, tick:function(d) {
    for(var g = 0, m = this.waves.length;g < m;g++) {
      var q = this.waves[g];
      q.state == a.ACTIVE && q.tick(d)
    }
  }, toString:function() {
    return"[WaveManager (" + this.waves.length + ")]"
  }};
  a.ACTIVE = "active";
  a.INACTIVE = "inactive";
  a.convertToMs = {timing:true, interval:true};
  a.prototype = {Wave:function(d, g, m) {
    EventDispatcher.create(this);
    this.id = d;
    this.nextWave = g.nextWave * Tick.fps;
    this.timing = g.timing * Tick.fps;
    this.interval = g.interval * Tick.fps;
    this.exits = g.exits;
    this.units = g.units || [];
    this.level = g.level || 0;
    this.reward = g.reward || 1;
    this.createCreeepProxy = m;
    this.state = a.INACTIVE;
    this.defaults = {timing:this.timing, interval:this.interval, exits:this.exits, level:this.level};
    this.subWaves = [];
    this.subWaveHash = {};
    this.handleSubwaveCompleteProxy = new EventProxy(this, "handleSubwaveComplete");
    this._currentCreepSet = null;
    this._lastSubWaveTime = 0;
    this.nextWaveSent = this.started = this.ended = false;
    this.creepTypes = {};
    this.wavesLeft = this.units.length;
    for(d = this.totalCreeps = 0;d < this.wavesLeft;d++) {
      g = this.units[d];
      this.totalCreeps += g.count || 1;
      g.waveID = this.id;
      for(var q in this.defaults) {
        if(this.hasOwnProperty(q)) {
          if(g[q] == null) {
            g[q] = this.defaults[q]
          }else {
            if(a.convertToMs[q]) {
              g[q] *= Tick.fps
            }
          }
        }
      }
      if(this.creepTypes[g.type] == null) {
        this.creepTypes[g.type] = g.count || 1
      }else {
        this.creepTypes[g.type] += g.count || 1
      }
    }
  }, getCreepTypes:function() {
    return this.creepTypes
  }, handleSubwaveComplete:function(d) {
    d != null && this.subWaves.removeItem(d.target);
    this.wavesLeft--;
    this.wavesLeft <= 0 && this.dispatchEvent("complete")
  }, start:function() {
    this._lastSubWaveTime = this._lastCreepTime = this._startTime = Tick.getTicks(true);
    this.state = a.ACTIVE
  }, getTimeTillNextWave:function() {
    if(this._startTime == null) {
      return this.nextWave
    }
    return this.nextWave + this._startTime - Tick.getTicks(true)
  }, tick:function() {
    var d = Tick.getTicks(true);
    if(!this.nextWaveSent && d >= this.nextWave + this._startTime) {
      this.nextWaveSent = true;
      this.dispatchEvent("nextWave")
    }
    if(!this.started || !this.ended && d >= this._lastSubWaveTime + this.timing) {
      this.started = true;
      this._lastSubWaveTime = d;
      this._currentCreepSet = this.units.shift();
      if(this.units.length == 0) {
        this.ended = true
      }
      if(this._currentCreepSet == null) {
        this.handleSubwaveComplete();
        return
      }
      var g = new b(this._currentCreepSet, d);
      g.addEventListener("complete", this.handleSubwaveCompleteProxy);
      g.addEventListener("newCreep", this.createCreeepProxy);
      this.subWaves.push(g);
      this.timing = g.timing
    }
    if(this.subWaves != null) {
      for(g = this.subWaves.length - 1;g >= 0;g--) {
        this.subWaves[g].tick(d)
      }
    }
  }, cleanUp:function() {
    this.removeAllListeners();
    if(this.subWaves != null) {
      for(var d = this.subWaves.length - 1;d >= 0;d--) {
        this.subWaves[d].cleanUp()
      }
      this.subWaves = this.subWaveHash = null
    }
  }, toString:function() {
    return"[Wave " + this.id + " (" + (this.subWaves != null ? this.subWaves.length : "0") + ")]"
  }};
  b.prototype = {SubWave:function(d) {
    EventDispatcher.create(this);
    this.creepSet = d;
    this.count = d.count || 1;
    this.timing = d.timing || 0.5;
    this._lastCreepTime = 0
  }, tick:function(d) {
    if(d >= this._lastCreepTime + this.creepSet.interval) {
      this._lastCreepTime = d;
      this.count--;
      this.dispatchEvent("newCreep", {creep:this.creepSet})
    }
    this.count == 0 && this.dispatchEvent("complete")
  }, cleanUp:function() {
    this.creepSet = null;
    this.removeAllListeners()
  }, toString:function() {
    return"[SubWave (" + this.creepSet.type + ")]"
  }};
  e.WaveManager = c
})(window);(function(e) {
  function c(a, b, d) {
    this.PirateData(a, b, d)
  }
  c.prototype = {PirateData:function(a, b, d) {
    this.pirateType = a;
    this.level = b;
    for(var g in d) {
      this[g] = d[g]
    }
  }, toString:function() {
    return"[PirateData " + this.pirateType + " " + this.level + "]"
  }};
  e.PirateData = c
})(window);(function(e) {
  function c() {
  }
  c.RUM_ALLEY = "Rum Alley";
  c.COCONUT_COAST = "Coconut Coast";
  c.HIDDEN_HIDEAWAY = "Hidden Hideaway";
  c.TREASURE_ISLAND = "Treasure Island";
  c.maps = [null, c.COCONUT_COAST, c.RUM_ALLEY, c.TREASURE_ISLAND, c.HIDDEN_HIDEAWAY];
  c.getTitleByIndex = function(a) {
    return c.maps[a]
  };
  c.requiredLevels = {2:-1, 1:2, 4:1, 3:4};
  c.canPlayMap = function(a, b) {
    var d = c.requiredLevels[a];
    if((d == -1 || LocalStorage.getMapPlayed(d)) != true) {
      return false
    }
    switch(b) {
      case GameInfo.NORMAL_MODE:
        return true;
      case GameInfo.SUDDEN_DEATH_MODE:
        return LocalStorage.getMapComplete(a, GameInfo.NORMAL_MODE) == true;
      case GameInfo.EPIC_MODE:
        return LocalStorage.getMapComplete(a, GameInfo.SUDDEN_DEATH_MODE) == true;
      default:
        return true
    }
  };
  e.MapInfo = c
})(window);(function(e) {
  function c(a, b) {
    this.BottomNavigation(a, b)
  }
  c.SELECTED_DROPSHADOW = {color:"#000", offsetX:0, offsetY:0, blur:10};
  c.prototype = {BottomNavigation:function(a, b) {
    EventDispatcher.create(this);
    this.div = a;
    this.game = b;
    this.gameInfo = b.gameInfo;
    this.handleGameChangeEvent = new EventProxy(this, "handleMoneyChange");
    this.gameInfo.addEventListener("change", this.handleGameChangeEvent);
    this.currentMoney = 0;
    this.hireButtons = [];
    var d = [Pirate.SHOOTER, Pirate.SABRE, Pirate.CANNON, Pirate.CABIN_BOY, Pirate.CAPTAIN];
    this.handleHireProxy = new EventProxy(this, "handleHire");
    this.handleRollOverProxy = new EventProxy(this, "handleButtonOver");
    this.handleRollOutProxy = new EventProxy(this, "handleButtonOut");
    for(var g = a.children(".hireButton"), m = 0, q = g.length;m < q;m++) {
      var s = PirateManager.getPirate(d[m], 1), y = $(g.get(m));
      s = new MenuButton(y, s, "{1}");
      s.addEventListener("click", this.handleHireProxy);
      s.addEventListener("rollOver", this.handleRollOverProxy);
      s.addEventListener("rollOut", this.handleRollOutProxy);
      this.hireButtons.push(s);
      y.css("left", 10 + m * 140)
    }
    y = this.div.children("#upgradeButton");
    y.css("left", 10);
    this.upgradeButton = new MenuButton(y.get(0), PirateManager.getPirate(Pirate.CANNON, 1), "Upgrade {1}", "editOptions", "upgrade");
    this.upgradeButton.labelWidth = 270;
    this.upgradeButton.addEventListener("click", new EventProxy(this, "handleUpgrade"));
    this.upgradeButton.addEventListener("rollOver", new EventProxy(this, "handleButtonOver"));
    this.upgradeButton.addEventListener("rollOut", new EventProxy(this, "handleButtonOut"));
    y = this.div.children("#retireButton");
    y.css("left", 270);
    this.retireButton = new MenuButton(y.get(0), PirateManager.getPirate(Pirate.CANNON, 1), "Retire {1}", "editOptions", "retire");
    this.retireButton.labelWidth = 250;
    this.retireButton.costField = "resale";
    this.retireButton.addEventListener("click", new EventProxy(this, "handleRetire"));
    this.retireButton.addEventListener("rollOver", new EventProxy(this, "handleButtonOver"));
    this.retireButton.addEventListener("rollOut", new EventProxy(this, "handleButtonOut"));
    this.waveContainer = this.div.children("#nextWaveIndicator");
    this.waveContainer.mouseenter($.proxy(this, "handleWaveOver"));
    this.waveContainer.mouseleave($.proxy(this, "handleWaveOut"));
    this.waveContainer.css("display", "none");
    this.demoIndex = -1;
    this.setMode("hire")
  }, setWaveManager:function(a) {
    this.waveManager = a;
    this.nextWave = new NextWaveIndicator(this.waveContainer, a);
    this.waveContainer.css("display", "block");
    this.waveContainer.css("left", 740)
  }, setCaptain:function(a) {
    this.captain = a;
    var b = this.hireButtons[4];
    b.setEnabled(a == null && b.data.cost <= this.currentMoney)
  }, setSelected:function(a) {
    for(var b = 0;b < this.hireButtons.length;b++) {
      var d = this.hireButtons[b];
      a != null && d.data.pirateType == a.pirateType ? d.setSelected(true) : d.setSelected(false)
    }
  }, simulateHire:function(a) {
    a = this.hireButtons[a];
    a.enabled && this.handleHire({target:a})
  }, handleHire:function(a) {
    if(!(this.demoIndex > 0)) {
      if(!(this.demoIndex == 0 && this.hireButtons.indexOf(a.target) != 0)) {
        this.demoIndex < 0 && TooltipManager.hide(0);
        AudioManager.playSound(AudioManager.CLICK);
        this.dispatchEvent("hire", {pirateData:this.currentHire = a.target.data})
      }
    }
  }, handleButtonOver:function(a) {
    if(!(this.demoIndex > -1)) {
      var b = a.target.data, d = this.mode == "edit", g = new Rectangle(10, 550, 650, 60);
      a = a.target.iconState;
      var m, q;
      if(d && a == "retire") {
        m = TooltipManager.RETIRE;
        q = 218;
        g.width += 20
      }else {
        switch(b.pirateType) {
          case Pirate.SHOOTER:
            m = d ? TooltipManager.SHOOTER_UPGRADE : TooltipManager.SHOOTER;
            q = 5;
            break;
          case Pirate.SABRE:
            m = d ? TooltipManager.SABRE_UPGRADE : TooltipManager.SABRE;
            q = d ? 5 : 144;
            break;
          case Pirate.CANNON:
            m = d ? TooltipManager.CANNON_UPGRADE : TooltipManager.CANNON;
            q = d ? 5 : 288;
            break;
          case Pirate.CABIN_BOY:
            m = d ? TooltipManager.CABIN_BOY_UPGRADE : TooltipManager.CABIN_BOY;
            q = d ? 5 : 432;
            break;
          case Pirate.CAPTAIN:
            m = d ? TooltipManager.CAPTAIN_UPGRADE : TooltipManager.CAPTAIN;
            q = d ? 5 : 576;
            break
        }
        if(d) {
          g.width += 210
        }
      }
      TooltipManager.show(m, g, q)
    }
  }, handleButtonOut:function() {
    this.demoIndex > -1 || TooltipManager.hide()
  }, handleWaveOver:function() {
    if(!(this.demoIndex > -1)) {
      var a = new Rectangle(220, 565, 750, 45);
      TooltipManager.show(TooltipManager.NEXT_WAVE, a, 550)
    }
  }, handleWaveOut:function() {
    this.demoIndex > -1 || TooltipManager.hide()
  }, simulateUpgrade:function() {
    var a = this.upgradeButton;
    a.enabled && this.handleUpgrade({target:a})
  }, handleUpgrade:function(a) {
    this.demoIndex < 0 && TooltipManager.hide(0);
    AudioManager.playSound(AudioManager.CLICK);
    this.dispatchEvent("upgrade", a.target.data)
  }, handleRetire:function(a) {
    if(!(this.demoIndex > -1)) {
      TooltipManager.hide(0);
      AudioManager.playSound(AudioManager.CLICK);
      this.dispatchEvent("retire", a.target.data)
    }
  }, setMode:function(a) {
    if(this.mode != a) {
      this.mode = a;
      if(a == "hire") {
        this.div.children(".hireButton").css("display", "block");
        this.div.children(".editButton").css("display", "none")
      }else {
        if(a == "edit") {
          this.div.children(".hireButton").css("display", "none");
          this.div.children(".editButton").css("display", "block")
        }
      }
    }
  }, setEditMode:function(a) {
    this.pirateData = a;
    if(PirateManager.getUpgradeTotal(a.pirateType) == a.level) {
      this.upgradeButton.setData(a, "Fully Upgraded");
      this.upgradeButton.setEnabled(false);
      this.upgradeButton.costLabel.css("visibility", "hidden")
    }else {
      var b = this.gameInfo.money;
      this.upgradeButton.setData(PirateManager.getPirate(a.pirateType, a.level + 1), "Upgrade {1}");
      this.upgradeButton.setEnabled(this.upgradeButton.data.cost <= b);
      this.upgradeButton.costLabel.css("visibility", "visible")
    }
    this.retireButton.setData(a);
    this.setMode("edit")
  }, setDemoMode:function(a) {
    this.demoIndex = a;
    this.handleMoneyChange(null);
    this.nextWave.setDemoMode(a);
    if(a != -1) {
      a = 0;
      for(var b = this.hireButtons.length;a < b;a++) {
        a != 0 && this.hireButtons[a].setEnabled(false)
      }
    }
  }, handleMoneyChange:function() {
    var a = this.gameInfo.money;
    this.currentMoney = a;
    for(var b = 0, d = this.hireButtons.length;b < d;b++) {
      var g = this.hireButtons[b];
      b == 4 ? g.setEnabled(g.data.cost <= a && this.captain == null) : g.setEnabled(g.data.cost <= a)
    }
    this.mode == "edit" && this.upgradeButton.setEnabled(this.upgradeButton.data.cost <= a && this.pirateData.level < PirateManager.getUpgradeTotal(this.pirateData.pirateType))
  }, cleanUp:function() {
    for(var a = 0, b = this.hireButtons.length;a < b;a++) {
      this.hireButtons[a].cleanUp()
    }
    this.hireButtons = null;
    this.upgradeButton.cleanUp();
    this.retireButton.cleanUp();
    this.upgradeButton = this.retireButton = null;
    this.nextWave != null && this.nextWave.cleanUp();
    this.waveContainer = this.nextWave = this.waveManager = null
  }, toString:function() {
    return"[BottomNavigation]"
  }};
  e.BottomNavigation = c
})(window);(function(e) {
  function c(a, b) {
    this.TopNavigation(a, b)
  }
  c.prototype = {TopNavigation:function(a, b) {
    this.div = a;
    this.gameInfo = b;
    this.gameInfo.addEventListener("change", new EventProxy(this, "updateStatus"));
    this.labels = this.div.children("LABEL");
    this.daisyLabel = $(this.labels.get(0));
    this.moneyLabel = $(this.labels.get(1));
    this.scoreLabel = $(this.labels.get(2));
    this.scoreLabel.text("Score: 0");
    this.scoreValue = this.moneyValue = this.daisyValue = 0;
    this.muteButton = new UIButton(a.children("#muteButton"), "img/ui/audioButton.png", ["up", "over"], ["mute", "unmute"]);
    this.muteButton.addEventListener("click", new EventProxy(this, "toggleMute"));
    this.updateStatus(null);
    Tick.addListener(this)
  }, toggleMute:function() {
    AudioManager.mute(this.muteButton.frame != 0);
    AudioManager.playSound(AudioManager.CLICK)
  }, updateStatus:function() {
    this.changed = true;
    this.daisyLabel.text(this.gameInfo.daisies)
  }, tick:function() {
    if(this.changed) {
      var a = false, b = 0;
      if(this.gameInfo.money != this.moneyValue) {
        b = this.gameInfo.money - this.moneyValue;
        if(Math.abs(b) < 2) {
          this.moneyValue = this.gameInfo.money
        }else {
          this.moneyValue = this.moneyValue + b * 0.5 | 0;
          a = true
        }
        this.moneyLabel.text(this.moneyValue.commaDelimit())
      }
      if(this.gameInfo.score != this.scoreValue) {
        b = this.gameInfo.score - this.scoreValue;
        if(Math.abs(b) < 2) {
          this.scoreValue = this.gameInfo.score
        }else {
          this.scoreValue = this.scoreValue + b * 0.8 | 0;
          a = true
        }
        this.scoreLabel.text("Score: " + this.scoreValue.commaDelimit())
      }
      this.changed = a
    }
  }, cleanUp:function() {
    this.gameInfo = this.div = this.labels = this.daisyLabel = this.moneyLabel = this.scoreLabel = null;
    Tick.removeListener(this)
  }};
  e.TopNavigation = c
})(window);(function(e) {
  function c(a, b) {
    this.NextWaveIndicator(a, b)
  }
  c.prototype = {NextWaveIndicator:function(a, b) {
    this.div = a;
    this.canvas = this.div.children("canvas").get(0);
    this.canvas.width = 220;
    this.canvas.height = 75;
    this.stage = new Stage(this.canvas);
    this.creepContainer = this.stage.addChild(new Container);
    this.nextWaveButton = new UIButton(this.div.children("#nextWaveButton"), "img/nextWaveBtn.png", ["up", "over", "down", "disabled"]);
    this.wm = b;
    this.nextWaveEvent = new EventProxy(this, "handleNextWave");
    this.wm.addEventListener("nextWave", this.nextWaveEvent);
    this.label = this.div.children("label");
    this.label.text("Waiting...");
    this.div.append(this.label);
    this.div.click($.proxy(this, "handleClick"));
    this.div.mouseenter($.proxy(this, "handleRollOver"));
    this.div.mouseleave($.proxy(this, "handleRollOut"));
    this.sprites = [];
    Tick.addListener(this, false);
    this.handleNextWave(null);
    this.wm.getCurrentWave().totalCreeps == 0 && this.removeLastCreep()
  }, handleRollOver:function(a) {
    this.nextWaveButton.handleRollOver(a)
  }, handleRollOut:function(a) {
    this.nextWaveButton.handleRollOut(a)
  }, handleClick:function(a) {
    if(this.nextWaveButton.enabled) {
      this.demoIndex > -1 && this.demoIndex < 4 || this.triggerNextWave(a)
    }
  }, sortFunction:function(a, b) {
    return a.x > b.x ? -1 : a.x < b.x ? 1 : 0
  }, triggerNextWave:function() {
    this.wm.sendNextWave()
  }, setDemoMode:function(a) {
    this.demoIndex = a;
    switch(a) {
      case 4:
        this.nextWaveButton.setEnabled(true);
        this.div.css("cursor", "pointer");
        this.label.css("cursor", "pointer");
        break;
      case 0:
        this.nextWaveButton.setEnabled(false);
        this.div.css("cursor", "auto");
        this.label.css("cursor", "default");
        break
    }
  }, handleNextWave:function() {
    this.nextWave = this.wm.getNextWave();
    if(this.nextWave == null) {
      this.showLastWave()
    }else {
      this.updatePreview();
      this.totalTime = this.wm.getTimeTillNextWave();
      this.updateTime();
      this.div.css("cursor", "auto");
      this.label.css("cursor", "default");
      this.nextWaveButton.setEnabled(false)
    }
  }, updatePreview:function() {
    for(var a = 0, b = this.sprites.length;a < b;a++) {
    }
    this.creepContainer.children = [];
    b = this.nextWave.getCreepTypes();
    this.sprites = [];
    a = 0;
    for(var d in b) {
      if(b.hasOwnProperty(d)) {
        var g = BitmapModel.getBitmap(d);
        if(g != null) {
          g.gotoAndPlay(Creep.RIGHT);
          g.x = g.regX + 10 + a * 40;
          g.y = 55 - a * 3;
          if(g.name == "gull") {
            g.y += 10
          }else {
            if(g.name == "octopus") {
              g.y -= 10
            }
          }
          this.creepContainer.addChild(g);
          this.sprites.push(g);
          a++
        }
      }
    }
    this.wm.currentWave == 0 ? this.label.text("Next Wave...") : this.label.text("Next Wave (" + this.wm.currentWave + "/" + (this.wm.waves.length - 1) + ")")
  }, updateTime:function() {
    if(this.nextWave != null) {
      var a = 202 - this.wm.getTimeTillNextWave() / this.totalTime * 202;
      if(this.timebar == null) {
        this.timebar = new Shape;
        this.stage.addChild(this.timebar)
      }
      this.timebar.graphics.clear().beginFill("#96B4B5").drawRect(14, 64, a, 6).endFill()
    }
  }, showLastWave:function() {
    this.creepContainer.children = [];
    this.label.text("Almost There!");
    this.nextWaveButton.setEnabled(false)
  }, removeLastCreep:function() {
    this.div.css("cursor", "pointer");
    this.label.css("cursor", "pointer");
    this.nextWave != null && this.nextWaveButton.setEnabled(true)
  }, tick:function() {
    this.stage.tick();
    this.updateTime()
  }, cleanUp:function() {
    Tick.removeListener(this);
    this.label = this.nextWaveButton = null;
    this.wm != null && this.wm.removeEventListener("nextWave", this.nextWaveEvent);
    this.wm = null;
    for(var a = 0, b = this.sprites.length;a < b;a++) {
      BitmapModel.saveBitmap(this.sprites[a])
    }
    this.creepContainer.children = [];
    this.stage.children = [];
    this.timebar = this.sprites = null;
    this.div.unbind()
  }};
  e.NextWaveIndicator = c
})(window);(function(e) {
  function c(a, b, d, g, m) {
    this.MenuButton(a, b, d, g, m)
  }
  c.prototype = {MenuButton:function(a, b, d, g, m) {
    EventDispatcher.create(this);
    this.div = $(a);
    this.canvas = $("<canvas></canvas>");
    this.div.append(this.canvas);
    this.canvas.get(0).width = 100;
    this.canvas.get(0).height = 80;
    this.isSelected = false;
    this.label = $("<label class='title'></label>");
    this.div.append(this.label);
    this.labelWidth = 75;
    this.costLabel = $("<label class='money'></label>");
    this.div.append(this.costLabel);
    this.costField = "cost";
    this.stage = new Stage(this.canvas.get(0));
    a = BitmapModel.getBitmap("MenuButton_background");
    a.currentFrame = 0;
    this.stage.addChild(a);
    if(g != null) {
      this.iconState = m;
      this.iconSprite = BitmapModel.getBitmap(g);
      this.iconSprite.gotoAndStop(this.iconState + "Up");
      this.iconSprite.y = 5
    }
    this.enabled = true;
    this.div.click($.proxy(this, "handleClick"));
    this.div.mouseenter($.proxy(this, "handleRollOver"));
    this.div.mouseleave($.proxy(this, "handleRollOut"));
    this.setData(b, d);
    this.setEnabled(this.enabled, true);
    this.tick()
  }, getCost:function() {
    return this.data[this.costField]
  }, handleClick:function() {
    this.enabled && this.dispatchEvent("click")
  }, handleRollOver:function() {
    this.dispatchEvent("rollOver");
    if(this.enabled) {
      this.sprite.gotoAndPlay("l" + this.data.level + "Attack" + Pirate.DOWN_LEFT);
      this.setHighlight(true);
      Tick.addListener(this, false)
    }
  }, handleRollOut:function() {
    if(this.stage != null) {
      this.dispatchEvent("rollOut");
      if(this.enabled) {
        this.sprite.gotoAndStop("l" + this.data.level + "Static" + Pirate.DOWN_LEFT);
        this.isSelected != true && this.setHighlight(false);
        Tick.removeListener(this);
        this.stage.tick()
      }
    }
  }, setSelected:function(a) {
    this.isSelected = a;
    this.setHighlight(a);
    this.tick()
  }, setHighlight:function(a) {
    if(a == true) {
      this.label.css("color", "#006699");
      this.iconSprite != null && this.iconSprite.gotoAndStop(this.iconState + "Over")
    }else {
      this.label.css("color", "#000000");
      this.iconSprite != null && this.iconSprite.gotoAndStop(this.iconState + "Up")
    }
    this.sprite.shadow = a && this.enabled ? BottomNavigation.SELECTED_DROPSHADOW : null
  }, setData:function(a, b) {
    if(this.data == null || this.data.pirateType != a.pirateType) {
      if(this.sprite != null) {
        this.stage.removeChild(this.sprite);
        BitmapModel.saveBitmap(this.sprite)
      }
      this.sprite = BitmapModel.getBitmap(a.pirateType);
      this.sprite.y = 50;
      switch(a.pirateType) {
        case Pirate.CAPTAIN:
          this.sprite.x = 30;
          break;
        case Pirate.CABIN_BOY:
        ;
        case Pirate.SABRE:
          this.sprite.x = 20;
          break;
        case Pirate.SHOOTER:
          this.sprite.x = 10;
          break;
        case Pirate.CANNON:
          this.sprite.y -= 2;
          this.sprite.x = 30;
          break
      }
      this.stage.addChild(this.sprite);
      this.iconSprite != null && this.stage.addChild(this.iconSprite)
    }
    this.data = a;
    if(b != null) {
      this.labelFormat = b
    }
    this.sprite.gotoAndStop("l" + this.data.level + "Static" + Pirate.DOWN_LEFT);
    var d = 0;
    this.canvas.css("left", d);
    d += 58;
    this.label.css("left", d);
    this.label.html(this.labelFormat.supplant([this.data.level, this.sprite.label]));
    this.costLabel.css("left", d);
    this.costLabel.css("top", 35);
    this.costLabel.html(this.getCost());
    d += 2;
    this.width = d + this.labelWidth;
    this.height = 80;
    this.div.css("width", this.width);
    this.div.css("height", this.height);
    this.setEnabled(this.enabled, true)
  }, tick:function() {
    this.stage.tick()
  }, setEnabled:function(a, b) {
    if(!(this.enabled == a && b != true)) {
      (this.enabled = a) || this.setHighlight(false);
      this.sprite.alpha = this.enabled ? 1 : 0.3;
      var d = this.enabled ? "#000000" : "#C5DADB";
      this.label.css("color", d);
      this.costLabel.css("color", d);
      if(this.iconSprite != null) {
        this.iconSprite.alpha = this.enabled ? 1 : 0.3
      }
      this.div.css("cursor", a ? "pointer" : "auto");
      this.label.css("cursor", a ? "pointer" : "default");
      this.costLabel.css("cursor", a ? "pointer" : "default");
      Tick.removeListener(this);
      this.tick()
    }
  }, cleanUp:function() {
    BitmapModel.saveBitmap(this.sprite);
    BitmapModel.saveBitmap(this.iconSprite);
    this.stage = this.stage.canvas = null;
    this.label.remove();
    this.canvas.remove();
    this.costLabel.remove();
    $(this.div).unbind();
    Tick.removeListener(this)
  }, toString:function() {
    return"[MenuButton]"
  }};
  e.MenuButton = c
})(window);(function(e) {
  function c(a, b, d, g) {
    this.UIButton(a, b, d, g)
  }
  c.prototype = {UIButton:function(a, b, d, g) {
    EventDispatcher.create(this);
    this.div = a;
    this.src = b;
    this.states = d;
    this.frames = g || ["default"];
    this.state = "up";
    this.frame = 0;
    this.loaded = false;
    this.enabled = true;
    a = new Image;
    $(a).load($.proxy(this, "handleBackgroundLoad"));
    a.src = b;
    this.div.css({background:"url('{0}') transparent no-repeat".supplant(b), cursor:"pointer"});
    this.div.mouseover($.proxy(this, "handleRollOver"));
    this.div.mouseout($.proxy(this, "handleRollOut"));
    this.div.click($.proxy(this, "handleClick"))
  }, setEnabled:function(a) {
    this.enabled = a;
    this.setState(a ? "up" : "disabled");
    this.div.css("cursor", a ? "pointer" : "auto")
  }, handleBackgroundLoad:function(a) {
    this.loaded = true;
    a = a.target;
    this.width = a.width / this.frames.length | 0;
    this.height = a.height / this.states.length | 0;
    this.div.css({width:this.width, height:this.height});
    this.setState(this.state)
  }, handleRollOver:function() {
    this.enabled && this.setState("over")
  }, handleRollOut:function() {
    this.enabled && this.setState("up")
  }, setState:function(a) {
    if(this.loaded) {
      var b = this.states.indexOf(a);
      if(b != -1) {
        this.state = a;
        this.div.css("background-position", "{1}px {0}px".supplant(-this.height * b, -this.width * this.frame))
      }
    }
  }, setFrame:function(a) {
    a = this.frames.indexOf(a);
    if(a != -1) {
      this.frame = a;
      this.setState(this.state)
    }
  }, handleClick:function() {
    this.enabled && this.dispatchEvent("click")
  }, cleanUp:function() {
    this.states = this.frames = null;
    this.div.unbind();
    this.div = null
  }};
  e.UIButton = c
})(window);(function(e) {
  function c(a) {
    this.ProgressBar(a)
  }
  c.prototype = {ProgressBar:function(a) {
    this.canvas = a.get(0);
    this.context = this.canvas.getContext("2d");
    this.repeat = 4;
    this.offset = this.progress = 0;
    a = this.image = new Image;
    a.onload = $.proxy(this, "handleImageLoad");
    a.src = "img/ui/preloader_bar.png"
  }, handleImageLoad:function() {
    this.imageWidth = this.image.width - this.repeat;
    this.imageHeight = this.image.height;
    Tick.addListener(this)
  }, setProgress:function(a) {
    this.progress = a
  }, tick:function() {
    for(var a = this.canvas.width * this.progress, b = -this.offset;b < a;) {
      var d = Math.min(this.imageWidth, a - b);
      this.context.save();
      this.context.drawImage(this.image, this.offset, 0, d, this.imageHeight, b, 0, d, this.imageHeight);
      this.context.restore();
      b += this.imageWidth
    }
    this.offset = (this.offset + 1) % (this.repeat + 1)
  }, clear:function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.progress = 0
  }, cleanUp:function() {
    this.image = null;
    this.clear();
    Tick.removeListener(this)
  }};
  e.ProgressBar = c
})(window);(function(e) {
  function c(a, b, d, g, m) {
    this.Tween(a, b, d, g, m)
  }
  c.prototype = {Tween:function(a, b, d, g, m) {
    this.init(a, b, d, g, m)
  }, init:function(a, b, d, g, m) {
    this.target = a;
    this.callback = m;
    this.duration = d * 1E3 * Tick.frameRate >> 0;
    this.pauseable = g;
    this.time = Tick.getTicks(g);
    this.end = {};
    this.start = {};
    for(var q in b) {
      if(!(a[q] == null || isNaN(a[q]))) {
        this.start[q] = a[q];
        this.end[q] = b[q]
      }
    }
    Tick.addListener(this, g)
  }, tick:function() {
    var a = (Tick.ticks - this.time) / this.duration, b = false;
    if(a >= 1) {
      a = 1;
      b = true
    }
    if(this.tweenFunction != null) {
      a = this.tweenFunction(a)
    }
    for(var d in this.end) {
      if(this.target) {
        if(this.target.hasOwnProperty(d)) {
          this.target[d] = (this.end[d] - this.start[d]) * a + this.start[d]
        }
      }
    }
    if(b) {
      Tick.removeListener(this);
      this.callback.handleEvent(this)
    }
  }, stop:function() {
    Tick.removeListener(this);
    this.tweenFunction = this.callback = null
  }};
  e.Tween = c
})(window);(function(e) {
  function c() {
  }
  function a(b) {
    this.ServerRequest(b)
  }
  c.CACHE = false;
  c.TIMEOUT = 8E3;
  e.ServerDelegate = c;
  a.prototype = {ServerRequest:function(b) {
    EventDispatcher.create(this);
    this.timeoutDelay = b == null ? c.TIMEOUT : b
  }, load:function(b) {
    this.timeout = setTimeout($.proxy(this, "handleTimeout"), this.timeoutDelay);
    $.ajax({url:b, dataType:"json", context:this, cache:c.CACHE, success:this.handleRequestLoad, error:this.handleRequestError})
  }, handleRequestLoad:function(b) {
    clearTimeout(this.timeout);
    this.dispatchEvent("complete", {data:b})
  }, handleRequestError:function(b, d, g) {
    clearTimeout(this.timeout);
    trace("handleRequestError: ", d, b, g);
    this.dispatchEvent("error", {status:d, error:g})
  }, handleTimeout:function() {
    trace("TIMEOUT");
    this.handleRequestError(null, -1, "Request Timed out")
  }};
  e.ServerRequest = a
})(window);(function(e) {
  function c() {
  }
  c.VISIT = "Visit";
  c.UNSUPPORTED_BROWSER = "Unsupported Browser";
  c.HELP = "Help";
  c.LOAD_COMPLETE = "Load Complete";
  c.GAME_START = "Game Start";
  c.GAME_WON = "Game Won";
  c.GAME_LOST = "Game Lost";
  c.submitAnalytics = function(a, b, d, g, m) {
    var q = "";
    if(b != null) {
      q = MapInfo.getTitleByIndex(b)
    }
    d || (d = 0);
    g || (g = "");
    m || (m = "");
    a = "db/submitAnalytics.php?analyticsType=" + a;
    a += "&map=" + q;
    a += "&score=" + d;
    a += "&wave=" + g;
    a += "&mode=" + m;
    $.ajax({url:a, dataType:"json", async:false, success:function() {
    }, error:function() {
    }})
  };
  c.submitScore = function(a, b, d) {
    var g = "";
    if(b != null) {
      g = MapInfo.getTitleByIndex(b)
    }
    b = "db/sendScore.php?";
    b += "&map=" + g;
    b += "&mode=" + d;
    b += "&score=" + a;
    $.ajax({url:b, dataType:"json", async:false, error:function(m, q, s) {
      trace(q + " - " + s)
    }})
  };
  c.logError = function(a, b) {
    $.ajax({url:"db/errorLog.php?errorType=" + a + "&errorMessage=" + b + "&userAgent=" + navigator.userAgent, dataType:"json", async:false})
  };
  e.DatabaseDelegate = c
})(window);(function(e) {
  function c() {
  }
  EventDispatcher.create(c);
  if(c.bitmapHash == null) {
    c.bitmapHash = {}
  }
  c.pool = {};
  c.saveBitmap = function(a) {
    if(a != null) {
      a.shadow = null;
      a.scaleX = a.scaleY = 1;
      a.x = a.y = 0;
      a.alpha = 1;
      a.visible = true;
      var b = a.name, d = c.pool[b];
      if(d == null) {
        c.pool[b] = [a]
      }else {
        d.push(a)
      }
    }
  };
  c.getBitmap = function(a) {
    var b = c.pool[a];
    if(b != null && b.length > 0) {
      a = b.pop()
    }else {
      b = c.bitmapHash[a];
      if(b == null) {
        throw Error("Bitmap " + a + " not found.");
      }
      a = b.clone();
      a.flipRegX = b.flipRegX;
      a.data = b.data;
      a.label = b.label;
      a.usesSpriteFlip = b.usesSpriteFlip;
      a.frameData = b.frameData
    }
    return a
  };
  c.load = function(a) {
    var b = new ServerRequest;
    b.addEventListener("complete", c.handleDataLoad);
    b.addEventListener("error", c.handleDataError);
    b.load(a)
  };
  c.getScoreValue = function(a, b) {
    var d = c.bitmapHash[a];
    if(d == null || d.data == null) {
      return 0
    }
    if(b == null) {
      b = 0
    }
    return d.data.scoreValue * (1 + b * 0.02)
  };
  c.handleDataLoad = function(a) {
    a = a.data;
    var b = [], d = a.images.length;
    c.numLoaded = 0;
    c.imageHash = {};
    for(var g = 0;g < d;g++) {
      var m = a.images[g];
      c.bitmapHash[m.name] = m;
      b.push({name:m.name, src:a.basePath + m.src})
    }
    c.numTotal = d;
    ImageLoadManager.addEventListener("complete", c.handleImageLoad);
    ImageLoadManager.addEventListener("loadComplete", c.handleImagesComplete);
    ImageLoadManager.loadList(b)
  };
  c.handleDataError = function() {
    c.dispatchEvent("error")
  };
  c.handleImageLoad = function(a) {
    a = a.image;
    c.imageHash[a.name] = a;
    c.numLoaded++;
    c.dispatchEvent("progress")
  };
  c.handleImagesComplete = function() {
    ImageLoadManager.removeEventListener("complete", c.handleImageLoad);
    ImageLoadManager.removeEventListener("loadComplete", c.handleImagesComplete);
    c.dispatchEvent("loadComplete")
  };
  c.createBitmap = function(a) {
    var b = c.imageHash[a];
    a = c.bitmapHash[a];
    var d = a.states, g = {}, m = null;
    for(var q in d) {
      g[q] = [d[q].start, d[q].end, a.loopAnimations == false ? false : q];
      if(d[q].flipState) {
        if(m == null) {
          m = {}
        }
        m[d[q].flipState] = [q, true, false, d[q].flipState]
      }
    }
    if(m) {
      b = SpriteSheetUtils.flip(b, a.w, a.h, g, m);
      g = b.frameData;
      b = b.image
    }
    if(a.type == "animation") {
      b.name = a.name;
      b = new SpriteSheet(b, a.w, a.h, g);
      b = new BitmapSequence(b);
      if(m) {
        b.usesSpriteFlip = true
      }
    }else {
      b = new Bitmap(b)
    }
    b.name = a.name;
    b.label = a.label;
    b.data = a.data || {};
    if(a.registrationPoint) {
      b.regX = a.registrationPoint[0];
      b.regY = a.registrationPoint[1]
    }else {
      b.regX = a.w / 2 + 0.5 | 0;
      b.regY = a.h / 2 + 0.5 | 0
    }
    c.bitmapHash[a.name] = b
  };
  c.createBitmaps = function() {
    for(var a in c.imageHash) {
      c.createBitmap(a)
    }
  };
  e.BitmapModel = c
})(window);(function(e) {
  function c() {
  }
  EventDispatcher.create(c);
  if(c.spriteHash == null) {
    c.spriteHash = {}
  }
  c.pool = {};
  c.saveSprite = function(a) {
    if(a != null) {
      a.reset();
      var b = a.name, d = c.pool[b];
      if(d == null) {
        c.pool[b] = [a]
      }else {
        d.push(a)
      }
    }
  };
  c.getSprite = function(a) {
    var b = c.pool[a];
    if(b != null && b.length > 0) {
      b = b.pop()
    }else {
      b = c.spriteHash[a];
      if(b == null) {
        throw Error("Sprite " + a + " not found.");
      }
      b = b.clone()
    }
    return b
  };
  c.load = function(a) {
    var b = new ServerRequest;
    b.addEventListener("complete", c.handleDataLoad);
    b.addEventListener("error", c.handleDataError);
    b.load(a)
  };
  c.getScoreValue = function(a, b) {
    var d = c.spriteHash[a];
    if(d == null || d.data == null) {
      return 0
    }
    if(b == null) {
      b = 0
    }
    return d.data.scoreValue * (1 + b * 0.02)
  };
  c.handleDataLoad = function(a) {
    a = a.data;
    for(var b = [], d = a.images.length, g = c.numLoaded = 0;g < d;g++) {
      var m = a.images[g], q = null;
      switch(m.type) {
        case "animation":
          q = new AnimationSprite;
          q.setStates(m.states);
          q.width = m.w;
          q.height = m.h;
          break;
        default:
          q = new OldSprite
      }
      c.spriteHash[m.name] = q;
      q.src = a.basePath + m.src;
      q.name = m.name;
      q.label = m.label;
      q.data = m.data || {};
      if(m.registrationPoint != null) {
        q.registrationPoint = new Point(m.registrationPoint[0], m.registrationPoint[1])
      }
      b.push(q)
    }
    c.numTotal = d;
    ImageLoadManager.addEventListener("complete", c.handleImageLoad);
    ImageLoadManager.addEventListener("loadComplete", c.handleImagesComplete);
    ImageLoadManager.loadList(b)
  };
  c.handleDataError = function() {
    c.dispatchEvent("error")
  };
  c.handleImageLoad = function(a) {
    a = a.image;
    var b = c.spriteHash[a.name];
    c.numLoaded++;
    c.dispatchEvent("progress");
    if(b) {
      b.image = a;
      if(!(b instanceof AnimationSprite)) {
        b.width = a.width;
        b.height = a.height
      }
      if(b.registrationPoint == null) {
        b.registrationPoint = new Point(b.width * 0.5, b.height * 0.5)
      }
    }
  };
  c.handleImagesComplete = function() {
    c.dispatchEvent("loadComplete")
  };
  e.SpriteModel = c
})(window);(function(e) {
  function c() {
    this.GameInfo()
  }
  c.EPIC_INTERVAL_MULTIPLIER = 1.4;
  c.EPIC_CREEP_INSTANCE_MULTIPLIER = 2.4;
  c.EPIC_CREEP_LEVEL_MULTIPLIER = 1.6;
  c.EPIC_GOLD_MULTIPLIER = 0.7;
  c.GOLD_BONUS = 5;
  c.CURRENT_GOLD_BONUS = 0.5;
  c.DAISY_BONUS = 1E4;
  c.ALL_DAISY_MULTIPLIER = 2;
  c.EARLY_TICK_BONUS = 6;
  c.EARLY_BONUS_START = 3;
  c.EARLY_BONUS_END = 10;
  c.EARLY_KILL_MULTIPLIER = 1.5;
  c.PIRATE_SALE_MULTIPLIER = 0.75;
  c.NORMAL_MODE = "normalMode";
  c.SUDDEN_DEATH_MODE = "suddenDeathMode";
  c.EPIC_MODE = "epicMode";
  c.prototype = {GameInfo:function() {
    EventDispatcher.create(this);
    this.currentGame = null;
    this.startingDaisies = this.daisies = this.money = this.score = 0
  }, reset:function(a, b) {
    this.score = 0;
    this.daisies = this.startingDaisies = a;
    this.money = b;
    this.change()
  }, addScore:function(a) {
    if(a < 0) {
      throw"INCONCEIVABLE";
    }
    this.score += Math.round(a);
    this.formatScore();
    this.change()
  }, formatScore:function() {
    for(;this.score % 5 != 0;) {
      this.score += 1
    }
  }, addMoney:function(a) {
    this.money += Math.round(a);
    this.change()
  }, loseDaisy:function() {
    this.daisies -= 1;
    this.change()
  }, change:function() {
    this.dispatchEvent("change")
  }, toString:function() {
    return"[GameInfo score=" + this.score + " money=" + this.money + " daisies=" + this.daisies + "]"
  }};
  e.GameInfo = c
})(window);(function(e) {
  function c() {
  }
  if(c.assetHash == null) {
    c.assetHash = {}
  }
  c.getAsset = function(a) {
    return c.assetHash[a]
  };
  c.addAsset = function(a, b) {
    c.assetHash[a] = b
  };
  e.LoadedAssets = c
})(window);(function(e) {
  function c() {
  }
  c.getMapPlayed = function(a, b) {
    return c.getData(a, b).played
  };
  c.setMapPlayed = function(a, b) {
    data = c.getData(a, b);
    data.played = true;
    c.ls.setItem(b + a, JSON.stringify(data))
  };
  c.getMapComplete = function(a, b) {
    return c.getData(a, b).complete
  };
  c.setMapComplete = function(a, b) {
    var d = c.getData(a, b);
    d.complete = true;
    c.ls.setItem(b + a, JSON.stringify(d))
  };
  c.getScore = function(a, b) {
    var d = c.getData(a, b);
    return Number(d.score)
  };
  c.setScore = function(a, b, d) {
    var g = c.getData(a, b);
    if(g.score > d || d == 0) {
      return false
    }else {
      g.score = d;
      c.ls.setItem(b + a, JSON.stringify(g));
      return true
    }
  };
  c.clear = function() {
    c.ls.clear()
  };
  c.getData = function(a, b) {
    if(b == null) {
      b = GameInfo.NORMAL_MODE
    }
    var d = JSON.parse(localStorage.getItem(b + a));
    if(d == null) {
      d = {played:false, completed:false, score:0}
    }
    return d
  };
  if(c.ls == null) {
    c.ls = e.localStorage
  }
  e.LocalStorage = c
})(window);(function(e) {
  function c(b) {
    this.Game(b)
  }
  function a() {
  }
  c.uniqueID = 0;
  c.effectsEnabled = false;
  c.prototype = {Game:function(b) {
    this.id = c.uniqueID++;
    EventDispatcher.create(this);
    globalPause(false);
    this.gameStatus = a.STARTING;
    this.gameInfo = new GameInfo;
    this.div = b;
    this.tileCanvas = b.find("#tileCanvas").get(0);
    this.tileContext = this.tileCanvas.getContext("2d");
    this.gameAssetsLoaded = false;
    this.uiCanvas = b.find("#uiCanvas").get(0);
    this.uiContext = this.uiCanvas.getContext("2d");
    this.gameOverlay = this.div.find("#gameOverlay");
    this.backgroundImage = b.find("#backgroundImage").get(0);
    this.xOffset = 0;
    this.mapJson = null;
    this.entryTiles = [];
    this.activeCreeps = {};
    this.totalActiveCreeps = 0;
    this.activeTargets = new IndexHash;
    this.daisyList = [];
    this.daisyHash = new IndexHash;
    this.pirateList = [];
    this.selectedPirate = null;
    this.handleCreepFoundDaisyProxy = new EventProxy(this, "handleCreepFoundDaisy");
    this.handleCreepHomeProxy = new EventProxy(this, "handleCreepHome");
    this.handleCreepDeathProxy = new EventProxy(this, "handleCreepDeath");
    this.handleCreepRemoveCompleteProxy = new EventProxy(this, "destroyCreep");
    this.handleCreepReadyForHomeProxy = new EventProxy(this, "handleCreepReadyForHome");
    this.handlePirateFireProxy = new EventProxy(this, "handlePirateFire");
    this.projectileCompleteProxy = new EventProxy(this, "handleProjectileComplete");
    this.explosionCompleteProxy = new EventProxy(this, "handleExplosionComplete");
    this.gameCanvas = $("#gameCanvas").get(0);
    this.gameContext = this.gameCanvas.getContext("2d");
    this.effectsCanvas = $("#effectsCanvas").get(0);
    this.effectsContext = this.effectsCanvas.getContext("2d");
    this.stage = new Stage(this.gameCanvas);
    this.groundEffectsContainer = this.stage.addChild(new Container);
    this.groundEffectsContainer.name = "groundEffectsContainer";
    this.dropMarkerContainer = this.stage.addChild(new Container);
    this.dropMarkerContainer.name = "dropMarkerContainer";
    this.daisyContainer = this.stage.addChild(new Container);
    this.daisyContainer.name = "daisyContainer";
    this.groundContainer = this.stage.addChild(new Container);
    this.groundContainer.name = "groundContainer";
    this.airShadowContainer = this.stage.addChild(new Container);
    this.airShadowContainer.name = "airShadowContainer";
    this.airContainer = this.stage.addChild(new Container);
    this.airContainer.name = "airContainer";
    this.topContainer = this.stage.addChild(new Container);
    this.topContainer.name = "topContainer";
    this.effectsList = [];
    Tick.addListener(this);
    this.bottomNavigation = new BottomNavigation(this.div.children("#bottomNav"), this);
    this.topNavigation = new TopNavigation(this.div.children("#topNav"), this.gameInfo);
    this.bottomNavigation.addEventListener("hire", new EventProxy(this, "handleHire"));
    this.bottomNavigation.addEventListener("upgrade", new EventProxy(this, "handleUpgrade"));
    this.bottomNavigation.addEventListener("retire", new EventProxy(this, "handleRetire"));
    this.gameClickMode = "default";
    this.mousePositionChanged = true;
    this.lastPosition = new Point(0, 0);
    e.onkeypress = $.proxy(this, "blockShortcuts")
  }, generateScreenshot:function(b) {
    var d = document.createElement("canvas");
    d.width = b.gameCanvas.width;
    d.height = b.gameCanvas.height;
    var g = d.getContext("2d"), m = $("#backgroundImage").get(0);
    g.drawImage(m, 0, 0);
    g.drawImage(b.gameCanvas, 0, 0);
    g = new Image;
    d = d.toDataURL("image/png");
    g.src = d;
    d = d.split("base64,")[1];
    b.screenshot = d
  }, blockShortcuts:function(b) {
    switch(b.keyCode) {
      case KeyShortcuts.UPGRADE:
        return false
    }
  }, handleKeyUp:function(b) {
    if(!(this.gameStatus == a.PAUSED && this.demo.active == false)) {
      switch(b.keyCode) {
        case KeyShortcuts.NUM_1:
        ;
        case KeyShortcuts.NUM_2:
        ;
        case KeyShortcuts.NUM_3:
        ;
        case KeyShortcuts.NUM_4:
        ;
        case KeyShortcuts.NUM_5:
          if(this.demo.active && (this.demo.stepName != DemoController.HIRE || b.keyCode != KeyShortcuts.NUM_1)) {
            break
          }
          this.resetUI();
          this.bottomNavigation.simulateHire(b.keyCode - KeyShortcuts.NUM_1);
          this.mouseMove(true);
          break;
        case KeyShortcuts.ESCAPE:
          if(this.demo.active) {
            break
          }
          this.resetUI();
          break;
        case KeyShortcuts.RETIRE:
          if(this.demo.active) {
            break
          }
          this.selectedPirate != null && this.handleRetire(null);
          break;
        case KeyShortcuts.UPGRADE:
          if(this.demo.active && this.demo.stepName != DemoController.UPGRADE) {
            break
          }
          this.selectedPirate != null && this.bottomNavigation.simulateUpgrade();
          break;
        case KeyShortcuts.NEXT_WAVE:
          if(this.demo.active) {
            if(this.demo.stepName != DemoController.BEGIN) {
              break
            }
          }else {
            if(Tick.isPaused()) {
              break
            }
          }
          this.wave.getCurrentWave().wavesLeft <= 0 && this.totalActiveCreeps == 0 && this.wave.sendNextWave();
          break
      }
    }
  }, resetUI:function() {
    if(this.selectedPirate != null) {
      this.clickSprite(true);
      this.bottomNavigation.setMode("hire")
    }else {
      this.currentDropType != null && this.showAvailableDropLocations(false)
    }
  }, spriteSortFunction:function(b, d) {
    var g = b.y + b.x * 0.1, m = d.y + d.x * 0.1;
    return g > m ? 1 : g < m ? -1 : 0
  }, handleGameClick:function() {
    if(Tick.isPaused() && !this.demo.active) {
      globalPause(false)
    }else {
      switch(this.gameClickMode) {
        case "default":
          this.clickSprite();
          break;
        case "placeTower":
          this.placeTower();
          break;
        case "none":
          break;
        default:
          trace("*** No Game Click Handled");
          break
      }
    }
  }, clickSprite:function(b) {
    var d = this.selectedPirate;
    if(d != null) {
      if(this.demo.active) {
        return
      }
      this.selectedPirate = d.bitmapSequence.shadow = null;
      this.drawRange(null)
    }
    if(b != true) {
      b = this.getGameTile(this.lastPosition.x, this.lastPosition.y);
      if(b != null) {
        d = this.selectedPirate = b.mapData.sprite;
        if(this.demo.active) {
          if(d != null && this.demo.stepName == DemoController.SELECT) {
            this.demo.next()
          }else {
            return
          }
        }
        if(d == null) {
          this.bottomNavigation.setMode("hire")
        }else {
          d.bitmapSequence.shadow = Pirate.SELECTED_DROPSHADOW;
          this.drawRange(d);
          this.bottomNavigation.setEditMode(d.data)
        }
      }
    }
  }, handleGameMouseMove:function(b) {
    this.mousePositionChanged = true;
    this.lastPosition.x = b.pageX;
    this.lastPosition.y = b.pageY
  }, mouseMove:function(b) {
    if(!Tick.isPaused()) {
      var d = this.getGameTile(this.lastPosition.x, this.lastPosition.y);
      if(!(d == null || b != true && d == this.lastTile)) {
        switch(this.gameClickMode) {
          case "default":
            if(this.lastTile != null) {
              b = this.lastTile.mapData.sprite;
              if(b != null && b != this.selectedPirate) {
                b.bitmapSequence.shadow = null
              }
            }
            this.lastTile = d;
            this.highlightPirate(d, true);
            break;
          case "placeTower":
            this.lastTile != null && this.clearUI();
            b = false;
            if(this.demo.active) {
              if(this.demo.stepName == DemoController.PLACE && d.index == 222) {
                b = true
              }
            }else {
              if(d.mapData.value == HexTile.TOWER && d.mapData.sprite == null) {
                b = true
              }
            }
            if(b) {
              b = this.uiContext;
              b.fillStyle = "rgba(100,100,100,0.05)";
              b.strokeStyle = "rgba(0,0,0,0.15)";
              b.beginPath();
              b.arc(d.x - this.xOffset, d.y, this.currentDropType.range, 0, 360, false);
              b.fill();
              b.stroke();
              b.closePath()
            }
            break
        }
        this.lastTile = d
      }
    }
  }, highlightPirate:function(b, d) {
    var g = b.mapData.sprite;
    if(!(g == null || g == this.selectedPirate)) {
      g.bitmapSequence.shadow = d ? Pirate.ROLL_OVER_DROPSHADOW : null
    }
  }, drawRange:function(b) {
    this.uiContext.save();
    this.clearUI();
    if(b != null) {
      var d = this.uiContext;
      d.fillStyle = b != this.captain ? "rgba(0,255,0,0.05)" : "rgba(255,0,0,0.05)";
      d.strokeStyle = "rgba(0,0,0,0.15)";
      d.beginPath();
      d.arc(b.sprite.x, b.sprite.y, b.data.range * b.rangeMultiplier, 0, 360, false);
      d.fill();
      d.stroke();
      d.closePath();
      this.uiContext.restore()
    }
  }, clearUI:function() {
    this.uiContext.clearRect(0, 0, this.uiCanvas.width, this.uiCanvas.height)
  }, attackCreep:function(b, d) {
    var g = this.activeCreeps[b];
    g != null && g.applyDamage(d)
  }, load:function(b) {
    this.mapIndex = b;
    this.mapTitle = MapInfo.getTitleByIndex(this.mapIndex);
    ViewManager.hide(ViewManager.START_SCREEN);
    if(this.gameAssetsLoaded == true) {
      b = "maps/map{0}/".supplant(b);
      waveFile = "waves.json";
      mapFile = "map.json";
      idleFile = "idles.json";
      this.assetLoader = new AssetLoader;
      this.assetLoader.addEventListener("complete", new EventProxy(this, "handleAssetsComplete"));
      this.assetLoader.load([new Asset("mapJSON", AssetLoader.JSON_TYPE, b + mapFile), new Asset("waveJSON", AssetLoader.JSON_TYPE, b + waveFile), new Asset("idleJSON", AssetLoader.JSON_TYPE, b + idleFile)])
    }
  }, pause:function() {
    if(this.gameStatus == a.PLAYING) {
      this.resumeStatus = this.gameStatus;
      this.gameStatus = a.PAUSED;
      if(!this.demo.active) {
        var b = this.effectsContext, d = this.effectsCanvas;
        b.fillStyle = "rgba(0,0,0,0.5)";
        b.fillRect(0, 0, d.width, d.height);
        b.fillStyle = "#fff";
        b.font = "italic 30px freeBooterFont";
        b.textBaseline = "top";
        b.fillText("Paused. Click to resume.", (d.width >> 1) - 115, 200)
      }
    }
  }, resume:function() {
    if(this.gameStatus == a.PAUSED) {
      this.gameStatus = this.resumeStatus
    }
  }, stopGame:function() {
    this.pause()
  }, resumeGame:function() {
    this.resume();
    ViewManager.show(ViewManager.GAME_SCREEN);
    AudioManager.stopAllSounds();
    this.music = AudioManager.playSound(AudioManager.MUSIC, true);
    globalPause(false);
    this.demo.active && this.demo.showNextStep();
    this.kraken != null && this.kraken.active && this.kraken.resume()
  }, handleAssetsComplete:function() {
    this.initMap(LoadedAssets.getAsset("mapJSON"));
    this.assetLoader.removeAllListeners();
    ViewManager.show(ViewManager.GAME_SCREEN);
    AudioManager.stopAllSounds();
    this.music = AudioManager.playSound(AudioManager.MUSIC, true)
  }, cleanUp:function() {
    Tick.removeListener(this, true);
    this.gameInfo.removeAllListeners();
    this.wave && this.wave.cleanUp();
    for(var b = 0, d = this.daisyList.length;b < d;b++) {
      this.daisyList[b].dispose()
    }
    this.daisyList = this.daisyHash = this.activeTargets = null;
    if(this.activeCreeps != null) {
      for(var g in this.activeCreeps) {
        this.activeCreeps.hasOwnProperty(g) && this.activeCreeps[g].dispose()
      }
      this.activeCreeps = null
    }
    b = 0;
    for(d = this.pirateList.length;b < d;b++) {
      this.pirateList[b].dispose()
    }
    this.pirateList = this.pirateHash = null;
    this.clearTiles();
    this.bottomNavigation.cleanUp();
    this.topNavigation.cleanUp();
    this.stage.removeAllChildren();
    this.idleManager.cleanUp();
    this.gameOverlay.unbind();
    e.onkeypress = null
  }, reset:function() {
    var b = this.mapJson.daisyData, d;
    d = this.mode == GameInfo.SUDDEN_DEATH_MODE ? b.slice(0, 2) : b.slice(0);
    b = 0;
    for(var g = d.length;b < g;b++) {
      var m = d[b], q = d[++b], s = BitmapModel.getBitmap("daisy"), y = this.hexMapModel.getTileAtPosition(m, q);
      s.x = m - this.xOffset;
      s.y = q;
      m = new Daisy(s, this.daisyContainer, y);
      this.addDaisy(m, y, Daisy.PLANTED);
      this.daisyList.push(m)
    }
    this.dispatchEvent("ready");
    if(this.wave == null) {
      this.wave = new WaveManager;
      this.wave.addEventListener("addSprite", new EventProxy(this, "handleWaveSendSprite"));
      this.wave.addEventListener("nextWave", new EventProxy(this, "handleNextWave"));
      this.wave.addEventListener("complete", new EventProxy(this, "handleWavesComplete"));
      this.wave.addEventListener("waveComplete", new EventProxy(this, "handleWaveComplete"))
    }
    d = $.extend(true, {}, LoadedAssets.getAsset("waveJSON"));
    if(this.mode == GameInfo.EPIC_MODE) {
      g = d.waves;
      for(b = 0;b < g.length;b++) {
        g[b].interval *= GameInfo.EPIC_INTERVAL_MULTIPLIER;
        if(y = g[b].units) {
          for(m = 0;m < y.length;m++) {
            y[m].count = y[m].type != "kraken" ? Math.ceil(y[m].count * GameInfo.EPIC_CREEP_INSTANCE_MULTIPLIER) : Math.floor(y[m].count * GameInfo.EPIC_CREEP_INSTANCE_MULTIPLIER)
          }
        }
      }
    }
    this.wave.reset(d);
    this.wave.start();
    this.gameInfo != null && this.gameInfo.reset(this.daisyList.length, this.wave.startGold);
    this.bottomNavigation.setWaveManager(this.wave);
    this.drawRange(null);
    this.gameStatus = a.PLAYING
  }, handleNextWave:function(b) {
    this.demo != null && this.demo.stepName == DemoController.BEGIN && this.demo.next();
    this.captain != null && this.captain.motivate();
    this.gameInfo.addScore(this.gameInfo.money * GameInfo.CURRENT_GOLD_BONUS);
    this.gameInfo.addScore(b.timeBonus * GameInfo.EARLY_TICK_BONUS);
    this.screenTimeout && clearTimeout(this.screenTimeout);
    var d = this;
    this.screenTimeout = setTimeout(function() {
      d.generateScreenshot(d)
    }, 2E4)
  }, handleWavesComplete:function() {
    this.checkGameStatus()
  }, addDaisy:function(b, d, g) {
    this.daisyHash.addItem(d.index, b);
    b.tile = d;
    b.setState(g)
  }, handleHire:function(b) {
    if(this.demo.active && this.demo.stepName == DemoController.HIRE) {
      this.demo.next()
    }else {
      if(Tick.isPaused()) {
        return
      }
    }
    if(b.pirateData == this.currentDropType || this.currentDropType == null) {
      this.showAvailableDropLocations(true, b.pirateData)
    }else {
      this.currentDropType = b.pirateData;
      this.bottomNavigation.setSelected(b.pirateData)
    }
  }, handleUpgrade:function() {
    if(this.demo.active) {
      if(this.demo.stepName == DemoController.UPGRADE) {
        this.demo.next()
      }else {
        return
      }
    }
    var b = this.selectedPirate;
    if(b != null) {
      b.upgrade();
      b == this.captain && this.updateMotivation(b);
      this.bottomNavigation.setEditMode(b.data);
      this.gameInfo.addMoney(-b.data.cost);
      this.drawRange(b);
      AudioManager.playSound(AudioManager.UPGRADE)
    }
  }, handleRetire:function() {
    if(this.selectedPirate != null) {
      var b = this.selectedPirate;
      this.gameInfo.addMoney(b.data.resale);
      this.pirateList.removeItem(b);
      if(b == this.captain) {
        this.captain = null;
        this.updateMotivation(b);
        this.bottomNavigation.setCaptain(null)
      }
      this.clearUI();
      delete this.hexMapModel.getTileAtIndex(b.tileIndex).mapData.sprite;
      this.groundEffectsContainer.removeChild(b.shadowBitmap);
      BitmapModel.saveBitmap(b.shadowBitmap);
      b.dispose();
      this.selectedPirate = null;
      this.clickMode = "default";
      this.bottomNavigation.setMode("hire");
      this.drawRange(null);
      AudioManager.playSound(AudioManager.RETIRE)
    }
  }, handleWaveSendSprite:function(b) {
    if(this.availableDaisies != 0) {
      b = b.data;
      var d = BitmapModel.getBitmap(b.type), g, m = this.entryTiles.slice().randomSort();
      if(b.exits) {
        g = [];
        for(var q = 0, s = b.exits.length;q < s;q++) {
          var y = this.entryTiles[b.exits[q]];
          y != null && g.push(y)
        }
        g = g.randomSort().concat(m)
      }else {
        g = m
      }
      var A, H, M;
      q = 0;
      s = g.length;
      a:for(;q < s;q++) {
        A = this.hexMapModel.getTileAtIndex(g[q]);
        H = this.findClosestDaisyTile(A);
        if(H == null) {
          break
        }
        M = this.hexMapModel.findPath(A, H, null, d.data.ignoresImpassible);
        if(M != null) {
          break
        }
        m = 0;
        y = this.daisyList.length;
        for(;m < y;m++) {
          var S = this.daisyList[m];
          if(S.state != Daisy.PICKED) {
            H = S.tile;
            M = this.hexMapModel.findPath(A, H, null, d.data.imapassable);
            if(M != null) {
              break a
            }
          }
        }
      }
      if(H == null) {
        trace("** No daisy tiles found for new creep.")
      }else {
        if(M == null) {
          trace("** No path found to ANY daisy for new creep.")
        }else {
          M.unshift(A);
          M.push(H);
          d.x = A.x - this.xOffset;
          d.y = A.y;
          A = "shadow";
          if(b.type == "rat" || b.type == "gull") {
            A = "shadowSmall"
          }
          A = BitmapModel.getBitmap(A);
          (g = d.data.ignoresImpassible) ? this.airShadowContainer.addChild(A) : this.groundEffectsContainer.addChild(A);
          M = new Creep(d, A, g ? this.airContainer : this.groundContainer, M, this.xOffset, b);
          M.addEventListener("end", this.handleCreepFoundDaisyProxy);
          M.addEventListener("death", this.handleCreepDeathProxy);
          M.addEventListener("removeComplete", this.handleCreepRemoveCompleteProxy);
          M.targetTile = H;
          this.totalActiveCreeps++;
          this.activeCreeps[d.id] = M;
          this.activeTargets.addItem(H.index, M);
          if(b.type == "kraken") {
            if(this.kraken == null) {
              this.kraken = new KrakenController(this, true)
            }
            this.kraken.addKraken()
          }
          this.dispatchEvent("change")
        }
      }
    }
  }, findAvailableDaisyTile:function() {
    var b, d = this.daisyList.length, g = 0;
    this.daisyList.randomSort();
    do {
      b = this.daisyList[g]
    }while(b != null && b.state == Daisy.PICKED && g++ < d);
    return b != null ? b.tile : null
  }, findClosestDaisyTile:function(b) {
    for(var d, g = Number.MAX_VALUE, m, q = this.hexMapModel.calculateDistance, s = 0, y = this.daisyList.length;s < y;s++) {
      d = this.daisyList[s];
      if(d.state != Daisy.PICKED) {
        d = d.tile;
        var A = Math.min(g, q(d, b));
        if(A < g) {
          g = A;
          m = d
        }
      }
    }
    return m != null ? m : this.findAvailableDaisyTile()
  }, findPickedDaisy:function() {
    for(var b, d = this.daisyList.length, g = 0;;) {
      b = this.daisyList[g];
      if(b != null && b.state != Daisy.PICKED && b.state != Daisy.DROPPED) {
        break
      }
      if(g++ >= d - 1) {
        break
      }
    }
    return b
  }, handleCreepFoundDaisy:function(b) {
    b = b.target;
    if(b.daisy != null) {
      trace("Found Daisy, but I have one already.", b);
      throw Error("Already have daisy");
    }
    var d = b.targetTile;
    b.gettingDroppedDaisy = false;
    this.activeTargets.removeItemFrom(b, d.index);
    var g = this.daisyHash.removeRandom(d.index);
    if(g != null) {
      g.owner = b;
      g.setState(Daisy.PICKED);
      g.sprite.gotoAndStop("indicator");
      b.addDaisy(g);
      this.sendCreepHome(b);
      AudioManager.playSound(AudioManager.STEAL_DAISY);
      this.captain != null && AudioManager.playSoundDelayed(AudioManager.CAPTAIN_ARGH, 500)
    }else {
      this.sendCreepToDaisy(b)
    }
    b = this.daisyHash[d.index];
    if(!(b == null || b.length > 0)) {
      for(d = this.activeTargets.removeContainer(d.index);d.length;) {
        b = d.pop();
        if(b.daisy == null) {
          b.gettingDroppedDaisy = false;
          g = this.findAvailableDaisyTile();
          g == null ? this.sendCreepHomeLater(b) : this.sendCreepToDaisy(b, g)
        }
      }
    }
  }, sendCreepHomeLater:function(b) {
    b.removeEventListener("end", this.handleCreepFoundDaisyProxy);
    b.addEventListener("end", this.handleCreepReadyForHomeProxy);
    b.sendHomeEarly()
  }, handleCreepReadyForHome:function(b) {
    b = b.target;
    b.removeEventListener("end", this.handleCreepReadyForHomeProxy);
    this.sendCreepHome(b)
  }, sendCreepToDaisy:function(b, d) {
    if(b.sprite != null) {
      b.removeEventListener("end", this.handleCreepHomeProxy);
      b.addEventListener("end", this.handleCreepFoundDaisyProxy);
      var g = d;
      if(g == null) {
        g = this.findClosestDaisyTile(this.hexMapModel.getTileAtPosition(b.sprite.x + this.xOffset, b.sprite.y));
        if(g == null) {
          this.sendCreepHome(b);
          return
        }
      }
      for(var m = null, q = this.daisyList.length, s = this.hexMapModel.getTileAtPosition(b.sprite.x + this.xOffset, b.sprite.y);q--;) {
        m = this.hexMapModel.findPath(s, g, null, b.data.ignoresImpassible, true);
        if(m != null) {
          break
        }
        g = this.findClosestDaisyTile(s)
      }
      if(m == null) {
        this.sendCreepHome(b)
      }else {
        this.activeTargets.removeItemFrom(b, b.targetTile.index);
        this.activeTargets.addItem(g.index, b);
        m.unshift(s);
        m.push(g);
        b.targetTile = g;
        b.setPath(m);
        b.goingHome = false
      }
    }
  }, sendCreepHome:function(b) {
    b.removeEventListener("end", this.handleCreepFoundDaisyProxy);
    b.addEventListener("end", this.handleCreepHomeProxy);
    var d = b.data.exits, g = this.hexMapModel.getTileAtPosition(b.sprite.x + this.xOffset, b.sprite.y), m, q;
    if(d) {
      d.randomSort();
      for(var s = 0, y = d.length;s < y;s++) {
        m = this.hexMapModel.getTileAtIndex(this.findExitTile(d, s));
        q = this.hexMapModel.calculatePath(g, m, null, b.data.ignoresImpassible);
        if(q != null) {
          break
        }
      }
    }else {
      s = 0;
      for(y = this.entryTiles.length * 3;s < y;s++) {
        m = this.hexMapModel.getTileAtIndex(this.entryTiles.findRandom());
        q = this.hexMapModel.calculatePath(g, m, null, b.data.ignoresImpassible);
        if(q != null) {
          break
        }
      }
    }
    if(q == null) {
      trace("Unable to find path home for " + b);
      this.removeCreep(b)
    }else {
      q.unshift(g);
      q.push(m);
      b.targetTile = m;
      this.activeTargets.addItem(m.index, b);
      b.setPath(q);
      b.goingHome = true
    }
  }, findExitTile:function(b, d) {
    d = isNaN(d) && b != null ? b.findRandom() : b != null && d < b.length ? b[d] : Math.random() * this.entryTiles.length | 0;
    return this.entryTiles[d]
  }, handleCreepHome:function(b) {
    b = b.target;
    var d = b.removeDaisy();
    if(d != null) {
      this.daisyList.removeItem(d);
      d.owner = null;
      d.dispose();
      this.gameInfo.loseDaisy();
      AudioManager.playSound(AudioManager.DAISY_LOST)
    }
    if(this.daisyList.length == 0 || b.type != "kraken") {
      this.removeCreep(b)
    }else {
      d = this.findClosestDaisyTile(this.hexMapModel.getTileAtPosition(b.sprite.x, b.sprite.y));
      d == null ? this.removeCreep(b) : this.sendCreepToDaisy(b, d)
    }
  }, handleCreepDeath:function(b) {
    b = b.target;
    var d = b.removeDaisy();
    if(d != null) {
      d.owner = null;
      var g = this.hexMapModel.getTileAtPosition(b.sprite.x + this.xOffset, b.sprite.y);
      if(g.mapData.impassable) {
        for(var m = g.neighbors, q = false, s = 0, y = m.length;s < y;s++) {
          if((g = m[s]) && g.mapData.value == HexTile.CREEP) {
            this.addDaisy(d, g, Daisy.DROPPED);
            d.sprite.x = g.x - this.xOffset;
            d.sprite.y = g.y;
            q = true;
            break
          }
        }
        q || this.addDaisy(d, d.originalTile, Daisy.RETURNED)
      }else {
        d.sprite.x = b.sprite.x;
        d.sprite.y = b.sprite.y;
        this.addDaisy(d, g, Daisy.DROPPED)
      }
      this.sendCreepToDroppedDaisy(d.tile)
    }else {
      b.gettingDroppedDaisy && this.sendCreepToDroppedDaisy(b.targetTile)
    }
    this.removeCreep(b);
    d = BitmapModel.getScoreValue(b.sprite.name, b.waveValues.level);
    g = Tick.getTicks(true) - b.startTick;
    q = 1;
    s = GameInfo.EARLY_BONUS_START * Tick.fps;
    m = GameInfo.EARLY_BONUS_END * Tick.fps;
    if(g <= s) {
      q = GameInfo.EARLY_KILL_MULTIPLIER
    }else {
      if(g < m) {
        g -= s;
        m -= s;
        q = GameInfo.EARLY_KILL_MULTIPLIER - 1;
        q = 1 + (q - q * (g / m))
      }
    }
    this.gameInfo.addScore(d * q);
    b = this.wave.waveHash[b.waveValues.waveID].reward;
    if(currentGame.mode == GameInfo.EPIC_MODE) {
      b *= GameInfo.EPIC_GOLD_MULTIPLIER
    }
    this.gameInfo.addMoney(b)
  }, sendCreepToDroppedDaisy:function(b) {
    var d, g, m = Number.MAX_VALUE, q = {}, s = 0;
    for(var y in this.activeCreeps) {
      if(this.activeCreeps.hasOwnProperty(y)) {
        var A = this.activeCreeps[y];
        if(A.daisy == null) {
          if(!A.gettingDroppedDaisy) {
            var H = this.hexMapModel.getTileAtPosition(A.sprite.x + this.xOffset, A.sprite.y);
            if(q[H.index] == null) {
              var M = Math.min(m, this.hexMapModel.calculateDistance(H, b));
              q[H.index] = M;
              if(A.goingHome && (A.type == "kraken" || M < 100 || Math.random() < 0.4)) {
                A.gettingDroppedDaisy = true;
                this.sendCreepToDaisy(A, H);
                s++
              }else {
                if(!(s > 0)) {
                  if(d == null) {
                    d = A;
                    g = H
                  }else {
                    if(M < m) {
                      m = M;
                      d = A;
                      g = H
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    if(s == 0 && d != null) {
      d.gettingDroppedDaisy = true;
      this.sendCreepToDaisy(d, g)
    }
  }, checkGameStatus:function() {
    if(this.daisyList.length == 0) {
      this.gameOver(a.LOST)
    }else {
      this.totalActiveCreeps == 0 && this.wave.complete && this.gameOver(a.WON)
    }
  }, gameOver:function(b) {
    this.gameStatus = b;
    this.gameOverTimer = 1.5 * Tick.fps;
    this.wave.stop();
    for(var d in this.activeCreeps) {
      this.activeCreeps.hasOwnProperty(d) && this.activeCreeps[d].leaveGame()
    }
    this.activeCreeps = null;
    clearTimeout(this.screenTimeout);
    this.screenTimeout = null
  }, tick:function() {
    if(this.mousePositionChanged) {
      this.mouseMove();
      this.mousePositionChanged = false
    }
    if(!(this.gameStatus == a.PAUSED && this.demo.active != true)) {
      switch(this.gameStatus) {
        case a.WON:
        ;
        case a.LOST:
          this.gameOverTimer--;
          if(this.gameOverTimer <= 0) {
            globalPause(true);
            this.dispatchEvent(this.gameStatus == a.WON ? "won" : "lost");
            this.gameStatus = a.OVER
          }
          break
      }
      this.groundContainer.sortChildren(this.spriteSortFunction);
      this.airContainer.sortChildren(this.spriteSortFunction);
      this.stage.tick();
      var b, d = this.effectsContext;
      d.clearRect(0, 0, this.effectsCanvas.width, this.effectsCanvas.height);
      for(var g = 0, m = this.effectsList.length;g < m;g++) {
        b = this.effectsList[g];
        if(b.enabled) {
          d.save();
          b.update(d, this.effectsCanvas.width, this.effectsCanvas.height);
          d.globalAlpha = 1;
          d.restore()
        }
      }
    }
  }, removeCreep:function(b) {
    this.totalActiveCreeps--;
    this.activeCreeps && delete this.activeCreeps[b.sprite.id];
    this.checkGameStatus();
    this.activeTargets.removeItemFrom(b, b.targetTile.index);
    this.totalActiveCreeps <= 0 && this.wave.getCurrentWave().ended && this.bottomNavigation.nextWave.removeLastCreep();
    b.type == "kraken" && this.kraken.removeKraken();
    b.leaveGame()
  }, destroyCreep:function(b) {
    b = b.target;
    (b.isAir ? this.airShadowContainer : this.groundEffectsContainer).removeChild(b.shadowBitmap);
    BitmapModel.saveBitmap(b.shadowBitmap);
    b.dispose()
  }, initMap:function(b) {
    this.mapJson = b;
    this.cols = this.mapJson.cols;
    this.rows = this.mapJson.rows;
    this.tileCount = this.cols * this.rows;
    this.tileSize = this.mapJson.tileSize;
    this.backgroundImage.src = this.mapJson.background;
    var d = this.mapJson.mapData;
    this.entryTiles = this.mapJson.exitEnter;
    var g = {};
    b = 0;
    for(var m = this.entryTiles.length;b < m;b++) {
      g[this.entryTiles[b]] = true
    }
    var q = [];
    b = 0;
    for(m = d.length;b < m;b++) {
      var s = d[b];
      q.push({impassable:s != 2, value:s, entry:g[b]})
    }
    this.hexMapModel = new HexMapModel(this.cols, this.rows, q, this.tileSize);
    this.xOffset = (this.rows - (this.rows % 2 == 0 ? 2 : 1)) / 2 * this.hexMapModel.getMetrics().getColumnWidth();
    this.reset();
    this.gameOverlay.click($.proxy(this.handleGameClick, this));
    this.gameOverlay.mousemove($.proxy(this.handleGameMouseMove, this));
    this.effectsList = [];
    d = this.mapJson.effects;
    if(d != null) {
      b = 0;
      for(m = d.length;b < m;b++) {
        switch(d[b]) {
          case "dust":
            DustStormEffect.preload();
            g = new DustStormEffect(c.effectsEnabled);
            break;
          case "clouds":
            CloudEffect.preload();
            g = new CloudEffect(c.effectsEnabled);
            break;
          case "darkClouds":
            CloudEffect.preload();
            g = new CloudEffect(c.effectsEnabled, true);
            break;
          case "rain":
            g = new RainEffect(this.effectsCanvas, ["img/rainDrop.png"], 0.2, 1, 0.5);
            g.start();
            break;
          default:
            continue
        }
        this.effectsList.push(g)
      }
    }
    b = LoadedAssets.getAsset("idleJSON").idles;
    this.idleManager = new IdleManager(this.groundEffectsContainer, b);
    this.demo = new DemoController(this);
    if(LocalStorage.getMapPlayed(2)) {
      LocalStorage.setMapPlayed(this.mapIndex, this.mode)
    }else {
      this.demo.addEventListener("change", new EventProxy(this, "handleNextDemo"));
      this.demo.addEventListener("complete", new EventProxy(this, "handleDemoComplete"));
      this.demo.start();
      globalPause(true, true)
    }
    this.toggleEffects(c.effectsEnabled)
  }, toggleEffects:function(b) {
    for(var d, g = 0, m = this.effectsList.length;g < m;g++) {
      d = this.effectsList[g];
      if(d.name == "cloudEffect") {
        d.setVisible(b);
        d.setEnabled(true)
      }else {
        d.setEnabled(b)
      }
    }
    this.groundEffectsContainer.visible = b;
    this.airShadowContainer.visible = b;
    this.idleManager.setEnabled(b)
  }, handleNextDemo:function() {
    this.demo.active && this.bottomNavigation.setDemoMode(this.demo.step)
  }, handleDemoComplete:function() {
    LocalStorage.setMapPlayed(this.mapIndex, this.mode);
    this.dropMarkers = null;
    this.bottomNavigation.setDemoMode(-1);
    globalPause(false, false)
  }, clearTiles:function() {
    this.tileContext.clearRect(0, 0, this.tileCanvas.width, this.tileCanvas.height)
  }, showAvailableDropLocations:function(b, d) {
    if(this.dropMarkerContainer.visible = b) {
      if(!(d.pirateType == "captain" && this.captain != null)) {
        var g, m;
        m = this.demo.active && this.demo.stepName == DemoController.PLACE ? [this.hexMapModel.getTileAtIndex(222)] : this.hexMapModel.getTiles();
        if(!this.dropMarkers) {
          this.dropMarkers = {};
          this.dropMarkerContainer.removeAllChildren();
          var q = 0;
          for(g = m.length;q < g;q++) {
            var s = m[q];
            if(s.mapData.value == 4) {
              var y = BitmapModel.getBitmap("dropMarker");
              y.currentFrame = 0;
              y.x = s.x - this.xOffset - 2;
              y.y = s.y - 6;
              this.dropMarkers[s.index] = y;
              this.dropMarkerContainer.addChild(y)
            }
          }
        }
        this.validTiles = {};
        q = 0;
        for(g = m.length;q < g;q++) {
          s = m[q];
          if(s.mapData.value == 4 && s.mapData.sprite == null) {
            this.validTiles[s.index] = true;
            this.dropMarkers[s.index].visible = true;
            if(this.demo.active) {
              y.shadow = Pirate.ROLL_OVER_DROPSHADOW
            }
          }else {
            if(this.dropMarkers[s.index]) {
              this.dropMarkers[s.index].visible = false
            }
          }
        }
        this.currentDropType = d;
        this.bottomNavigation.setSelected(d);
        this.gameClickMode = "placeTower"
      }
    }else {
      this.clearUI();
      this.gameClickMode = "default";
      this.bottomNavigation.setSelected(null);
      this.currentDropType = null
    }
  }, getGameTile:function(b, d) {
    if(this.hexMapModel != null) {
      var g = $("#gameOverlay").offset();
      return this.hexMapModel.getTileAtPosition(b - g.left + this.xOffset, d - g.top)
    }
  }, placeTower:function() {
    var b = this.currentDropType, d = this.getGameTile(this.lastPosition.x, this.lastPosition.y);
    if(this.demo.active) {
      if(this.demo.stepName != DemoController.PLACE) {
        return
      }
      if(d == null || d.index != 222) {
        return
      }
      this.demo.next()
    }
    this.currentDropType = null;
    if(d == null) {
      this.showAvailableDropLocations(false)
    }else {
      if(this.validTiles[d.index]) {
        var g = BitmapModel.getBitmap(b.pirateType), m = BitmapModel.getBitmap("shadowSmall");
        g.name = b.pirateType;
        g.x = m.x = d.x - this.xOffset;
        g.y = m.y = d.y;
        this.groundEffectsContainer.addChild(m);
        b = new Pirate(g, m, this.groundContainer, this.xOffset, b, d.index, this.activeCreeps);
        var q;
        switch(g.name) {
          case Pirate.CAPTAIN:
            this.setCaptain(b);
            q = AudioManager.CAPTAIN_ADDED;
            break;
          case Pirate.CANNON:
            q = AudioManager.CANNON_ADDED;
            break;
          case Pirate.SHOOTER:
            q = AudioManager.SHOOTER_ADDED;
            break;
          case Pirate.SABRE:
            q = AudioManager.SABRE_ADDED;
            break;
          case Pirate.CABIN_BOY:
            q = AudioManager.CABIN_BOY_ADDED;
            break
        }
        AudioManager.playSoundDelayed(q, 400);
        b.addEventListener("fire", this.handlePirateFireProxy);
        this.pirateList.push(b);
        d.mapData.sprite = b;
        this.gameInfo.addMoney(-b.data.cost);
        this.showAvailableDropLocations(false);
        this.updateMotivation(b);
        this.clearUI();
        AudioManager.playSound(AudioManager.PLACE_TOWER)
      }else {
        this.showAvailableDropLocations(false)
      }
    }
  }, setCaptain:function(b) {
    this.captain = b;
    this.captain.addEventListener("faceShore", $.proxy(this, "handleFaceShore"));
    this.bottomNavigation.setCaptain(this.captain)
  }, handleFaceShore:function() {
    for(var b = this.gameCanvas.width >> 1, d = this.gameCanvas.height >> 1, g = 0, m, q = 0, s = this.pirateList.length;q < s;q++) {
      m = this.pirateList[q];
      if(!m.targetCreep) {
        if(this.mapTitle == MapInfo.HIDDEN_HIDEAWAY) {
          g = m.sprite.y > d ? 4 : 1
        }else {
          if(this.mapTitle == MapInfo.TREASURE_ISLAND) {
            var y = m.sprite.x > b ? false : true, A = m.sprite.y > d ? true : false;
            g = 1;
            if(y && A) {
              g = 5
            }else {
              if(!y && A) {
                g = 4
              }else {
                if(!y && !A) {
                  g = 2
                }
              }
            }
          }
        }
        m.targetDirection = g
      }
    }
  }, updateMotivation:function(b) {
    if(this.captain != null) {
      var d = this.captain.data.range, g = this.captain.data.motivation, m = this.captain.sprite.x, q = this.captain.sprite.y
    }
    if(b != null && b != this.captain) {
      var s = Math.sqrt(Math.pow(b.sprite.x - m, 2) + Math.pow(b.sprite.y - q, 2));
      b.setMotivation(s <= d ? g : 1, this.captain == null ? null : this.captain.currentLevel)
    }
    for(var y = 0, A = this.pirateList.length;y < A;y++) {
      b = this.pirateList[y];
      if(this.captain == null || b == this.captain) {
        b.setMotivation(1)
      }else {
        s = Math.sqrt(Math.pow(b.sprite.x - m, 2) + Math.pow(b.sprite.y - q, 2));
        b.setMotivation(s <= d ? g : 1, this.captain.currentLevel)
      }
    }
  }, handlePirateFire:function(b) {
    b = b.projectile;
    this.topContainer.addChild(b.sprite);
    b.addEventListener("projectileComplete", this.projectileCompleteProxy)
  }, handleProjectileComplete:function(b) {
    var d = b.target;
    d.removeEventListener("projectileComplete", this.projectilCompleteProxy);
    this.topContainer.removeChild(d.sprite);
    BitmapModel.saveBitmap(d.sprite);
    b = b.explosion;
    if(b != null) {
      d.addEventListener("explosionComplete", this.explosionCompleteProxy);
      this.topContainer.addChild(b)
    }else {
      this.projectile.dispose()
    }
  }, handleExplosionComplete:function(b) {
    b = b.target;
    b.removeEventListener("explosionComplete", this.explosionCompleteProxy);
    this.topContainer.removeChild(b.sprite);
    b.dispose()
  }, proxyEvent:function(b) {
    b.data.handleEvent(b)
  }, drawMap:function(b) {
    this.tileContext.globalAlpha = b || 0.75;
    if(b != 0) {
      this.tileContext.clearRect(this.tileCanvas.width, this.tileCanvas.height);
      b = 0;
      for(var d = this.tileCount;b < d;b++) {
        var g = this.hexMapModel.getTileAtIndex(b), m = "#ccffaa";
        if(g.mapData.impassable) {
          m = "#cccccc"
        }else {
          if(g.mapData.entry) {
            m = "#00ffcc"
          }else {
            if(g.mapData.value == 4) {
              m = "#336699"
            }
          }
        }
        this.drawHexTile(this.hexMapModel.getTilePoints(g), this.tileContext, m)
      }
    }
  }, drawHexTile:function(b, d, g, m) {
    if(b != null) {
      if(m == null) {
        m = 1
      }
      d.lineWidth = 0.5;
      d.fillStyle = g;
      d.beginPath();
      g = 0;
      for(var q = b.length;g < q;g++) {
        p = b[g];
        d.lineTo((p.x - this.xOffset) * m, p.y * m)
      }
      d.closePath();
      d.stroke();
      d.fill()
    }
  }, toString:function() {
    return"[Game " + this.id + "]"
  }};
  e.Game = c;
  a.STARTING = "starting";
  a.PLAYING = "playing";
  a.PAUSED = "paused";
  a.WON = "won";
  a.LOST = "lost";
  a.OVER = "over";
  e.GameStatus = a
})(window);(function(e) {
  function c(a) {
    this.DemoController(a)
  }
  c.steps = [{rect:new Rectangle(10, 507, 740, 105), arrowOffset:30}, {rect:new Rectangle(298, 145, 600, 105), arrowOffset:30}, {rect:new Rectangle(298, 145, 600, 80), arrowOffset:30}, {rect:new Rectangle(10, 507, 740, 105), arrowOffset:30}, {rect:new Rectangle(235, 507, 740, 105), arrowOffset:660}];
  c.HIRE = "hire";
  c.PLACE = "place";
  c.SELECT = "select";
  c.UPGRADE = "upgrade";
  c.BEGIN = "begin";
  c.STEP_NAMES = [c.HIRE, c.PLACE, c.SELECT, c.UPGRADE, c.BEGIN];
  c.prototype = {DemoController:function(a) {
    EventDispatcher.create(this);
    this.game = a;
    this.totalSteps = c.steps.length;
    this.step = -1;
    this.stepName = null;
    this.active = false
  }, start:function() {
    this.active = true;
    this.next()
  }, next:function() {
    this.step += 1;
    this.showNextStep()
  }, showNextStep:function() {
    if(this.step == this.totalSteps) {
      this.active = false;
      this.step = -1;
      this.stepName = null;
      this.dispatchEvent("complete");
      TooltipManager.hide()
    }else {
      this.stepName = c.STEP_NAMES[this.step];
      this.dispatchEvent("change");
      this.showTooltip()
    }
  }, showTooltip:function() {
    var a = this.getCurrentStep();
    TooltipManager.show(TooltipManager.DEMO_STEP, a.rect, a.arrowOffset || 0, false, this.step, 100)
  }, getCurrentStep:function() {
    return this.getStep(this.step)
  }, getStep:function(a) {
    return c.steps[a]
  }, toString:function() {
    return"[DemoController " + this.stepName + " (" + (this.active ? "active" : "inactive") + " " + this.step + "/" + this.totalSteps + ")]"
  }};
  e.DemoController = c
})(window);(function(e) {
  function c(a) {
    this.KrakenController(a)
  }
  c.prototype = {KrakenController:function(a) {
    this.game = a;
    this.active = false;
    this.volumeSpeed = 0.02;
    this.rain = new RainEffect(a.gameCanvas, ["img/rainDrop.png"], 0.2, 1, 0.5);
    this.rain.setEnabled(Game.effectsEnabled);
    this.storm = new StormEffect(a.gameCanvas, true);
    this.count = 0;
    this.transition = null
  }, addKraken:function() {
    this.count == 0 && this.start();
    this.count++
  }, removeKraken:function() {
    this.count--;
    this.count <= 0 && this.stop()
  }, tick:function() {
    switch(this.transition) {
      case "in":
        if(this.game.music) {
          this.game.music.volume = Math.max(0, this.game.music.volume - this.volumeSpeed);
          if(this.game.music.volume <= 0) {
            Tick.removeListener(this);
            try {
              this.game.music.pause()
            }catch(a) {
            }
            this.game.music.volume = 1;
            this.transition = null
          }
        }
        break;
      case "out":
        if(this.game.music && this.music) {
          this.game.music.volume = Math.min(1, this.game.music.volume + this.volumeSpeed);
          this.music.volume = 1 - this.game.music.volume;
          if(this.game.music.volume >= 1) {
            Tick.removeListener(this);
            try {
              this.music.pause()
            }catch(b) {
            }
            this.music.volume = 1;
            this.transition = null
          }
        }
        break;
      default:
    }
  }, start:function() {
    this.active = true;
    this.game.effectsList.push(this.rain);
    this.rain.start();
    this.game.effectsList.push(this.storm);
    this.storm.start();
    if(AudioManager.muted) {
      this.game.music.pause()
    }else {
      this.transition = "in";
      Tick.addListener(this)
    }
    this.music = AudioManager.playSound(AudioManager.KRAKEN_MUSIC, true)
  }, resume:function() {
    this.game.music.pause();
    this.music = AudioManager.playSound(AudioManager.KRAKEN_MUSIC, true)
  }, stop:function() {
    this.active = false;
    this.rain.stop();
    this.storm.stop();
    this.game.music.volume = 0;
    this.game.music.play();
    if(AudioManager.muted) {
      this.music.pause()
    }else {
      this.transition = "out";
      Tick.addListener(this)
    }
  }, cleanUp:function() {
    this.stop();
    this.game = this.storm = this.music = null
  }, toString:function() {
    return"[KrakenController]"
  }};
  e.KrakenController = c
})(window);(function(e) {
  function c(a, b, d) {
    this.HexTile(a, b, d)
  }
  c.CREEP = 2;
  c.TOWER = 4;
  c.IMPASSABLE = 6;
  c.prototype = {HexTile:function(a, b, d) {
    this.index = a;
    this.column = b;
    this.row = d;
    this.y = this.x = 0;
    this.mapData = {};
    this.neighbors = []
  }, toString:function() {
    return this.formatToString("index", "x", "y")
  }};
  e.HexTile = c
})(window);(function(e) {
  function c(a, b, d, g) {
    this.HexMapModel(a, b, d, g)
  }
  c.prototype = {HexMapModel:function(a, b, d, g) {
    if(b * a != d.length) {
      throw Error("The mapData count does not match the specified dimensions");
    }
    this._metrics = new HexMapMetrics(g);
    this._cols = a;
    this._rows = b;
    this.generateTileList(d)
  }, getRows:function() {
    return this._rows
  }, getColumns:function() {
    return this._cols
  }, getMetrics:function() {
    return this._metrics
  }, getTiles:function() {
    return this._tiles
  }, calculateDistance:function(a, b) {
    if(a == null || b == null) {
      return null
    }
    return Math.abs(a.column - b.column) + Math.abs(a.row - b.row)
  }, findPath:function(a, b, d, g, m) {
    if(a == null || b == null) {
      return null
    }
    if(m == null) {
      m = false
    }
    if((a.mapData.impassable || b.mapData.impassable) && !g) {
      return null
    }
    if(a == b) {
      return[]
    }
    d = this.calculatePath(a, b, d, g);
    if(m) {
      a = this.calculatePath(b, a, null, g);
      if(a != null && (d == null || d.length > a.length)) {
        d = a;
        d.reverse()
      }
    }
    return d
  }, calculatePath:function(a, b, d, g) {
    var m = [], q = {};
    for(q[a.index] = true;;) {
      var s = this.moveTowards(a, b, d, g);
      if(s == null || q[s.index]) {
        break
      }
      if(s == b) {
        return m
      }
      q[s.index] = true;
      m.push(s);
      d = a;
      a = s
    }
    return null
  }, moveTowards:function(a, b, d, g) {
    if(a == null || b == null || a == b) {
      return null
    }
    var m = Math.atan2(b.y - a.y, b.x - a.x) / (Math.PI / 3);
    b = Math.round(m);
    m = m - b > 0 ? 1 : -1;
    a = a.neighbors;
    for(var q = 0;q < 6;q++) {
      var s = a[(b + (q / 2 + 0.51 | 0) * m * (q % 2 * 2 - 1) + 6) % 6];
      if(!(s == null || s == d || s.mapData.impassable && !g)) {
        return s
      }
    }
    return null
  }, getTilePoints:function(a) {
    return this.getMetrics().getTilePoints(a.column, a.row)
  }, getPositionOfTile:function(a) {
    return this.getMetrics().getPositionOfTile(a.column, a.row)
  }, getTileAtPosition:function(a, b) {
    var d = this._cols, g = this._rows, m = this.getMetrics().getTileAtPosition(a, b);
    return m.x < 0 || m.y < 0 || m.x >= d || m.y >= g ? null : this._tiles[(m.y * d + m.x).floor()]
  }, getTileAt:function(a, b) {
    return this._tiles[a + b * void 0]
  }, getTileAtIndex:function(a) {
    return this._tiles[a]
  }, generateTileList:function(a) {
    for(var b = this._cols, d = this._rows, g = b * d, m = this._tiles = [], q = 0;q < g;q++) {
      var s = new HexTile(q, q % b, (q / b).floor());
      s.mapData = a[q];
      m.push(s)
    }
    for(q = 0;q < g;q++) {
      s = m[q];
      a = s.column;
      var y = s.row, A = this.getPositionOfTile(s);
      s.x = A.x;
      s.y = A.y;
      A = [];
      A.push(a + 1 < b ? m[q + 1] : null);
      A.push(a + 1 < b && y + 1 < d ? m[q + b] : null);
      A.push(a > 0 && y + 1 < d ? m[q + b - 1] : null);
      A.push(a > 0 ? m[q - 1] : null);
      A.push(a > 0 && y > 0 ? m[q - b] : null);
      A.push(a + 1 < b && y > 0 ? m[q - b + 1] : null);
      s.neighbors = A
    }
  }};
  e.HexMapModel = c
})(window);(function(e) {
  function c(a) {
    if(isNaN(a)) {
      a = 25
    }
    this.HexMapMetrics(a)
  }
  c.prototype = {HexMapMetrics:function(a) {
    this.sinVal = Math.sin(Math.PI / 6);
    this.cosVal = Math.cos(Math.PI / 6);
    this._rowH = this._colW = this._triH = this._triW = this._size = null;
    this.setSize(a)
  }, getSize:function() {
    return this._size
  }, setSize:function(a) {
    this._size = a;
    this.calculateMetrics()
  }, getColumnWidth:function() {
    return this._colW
  }, setColumnWidth:function(a) {
    this._colW = a / (this.cosVal * 2);
    this.calculateMetrics()
  }, getRowHeight:function() {
    return this._rowH
  }, setRowHeight:function(a) {
    this._rowH = a / (this.cosVal * 2);
    this.calculateMetrics()
  }, getTileAtPosition:function(a, b) {
    var d = this._rowH, g = this._colW, m = this._triH, q = this._triW, s = (b / d).floor(), y = ((a - s * g * 0.5) / g).floor();
    if(b % d < m) {
      g = y * g + g * 0.5 * s + q;
      if(Math.abs(g - a) * this.sinVal > b % d) {
        s--;
        a > g && y++
      }
    }
    return new Point(y, s)
  }, getPositionOfTile:function(a, b) {
    return new Point(a * this._colW + this._triW + b * this._colW * 0.5, b * this._rowH + this._triH + this._size / 2)
  }, getTilePoints:function(a, b) {
    var d = this._colW, g = this._rowH, m = this._triW, q = this._triH, s = d * a + b * d * 0.5, y = g * b;
    return[new Point(s, y + q), new Point(s + m, y), new Point(s + d, y + q), new Point(s + d, y + g), new Point(s + m, y + g + q), new Point(s, y + g)]
  }, calculateMetrics:function() {
    var a = this._size;
    this._triW = a * this.cosVal;
    this._triH = a * this.sinVal;
    this._rowH = a + this._triH;
    this._colW = this._triW * 2
  }};
  e.HexMapMetrics = c
})(window);(function(e) {
  function c(a, b, d, g, m, q, s) {
    this.Creep(a, b, d, g, m, q, s)
  }
  c.DOWN_LEFT = "downLeft";
  c.LEFT = "forwardLeft";
  c.UP_LEFT = "upLeft";
  c.UP_RIGHT = "up";
  c.RIGHT = "forward";
  c.DOWN_RIGHT = "down";
  c.SLOW_DROPSHADOW = {color:"#0066ff", offsetX:0, offsetY:0, blur:6};
  c.prototype = {Creep:function(a, b, d, g, m, q) {
    EventDispatcher.create(this);
    this.id = a.id;
    this.type = a.name;
    this.bitmapSequence = this.sprite = a;
    this.stage = d;
    this.stage.addChild(a);
    this.sprite.alpha = 0;
    this.shadowBitmap = b;
    this.shadowBitmap.alpha = this.sprite.alpha;
    this.shadowOffset = new Point(this.sprite.data.shadowOffset[0], this.sprite.data.shadowOffset[1]);
    this.shadowBitmap.x = this.sprite.x + this.shadowOffset.x;
    this.shadowBitmap.y = this.sprite.y + this.shadowOffset.y;
    this.daisy = this.deathAnimation = null;
    if(this.type == "kraken") {
      this.healthMeter = BitmapModel.getBitmap("HealthMeter");
      this.addChild(this.healthMeter)
    }
    this.baseValues = this.bitmapSequence.data;
    this.waveValues = q;
    this.hexRadius = currentGame.hexMapModel.getMetrics().getColumnWidth() / 2;
    this.hexDiameter = this.hexRadius * 2;
    this.nextTile = this.targetTile = this.currentTile = null;
    this.remainingDistance = 0;
    this.ratioX = 1;
    this.ratioY = 0;
    this.alive = true;
    this.leaving = false;
    this.isAir = a.data.ignoresImpassible;
    this.goingHome = this.gettingDroppedDaisy = false;
    this.xOffset = m;
    this.directions = [c.RIGHT, c.DOWN_RIGHT, c.DOWN_LEFT, c.LEFT, c.UP_LEFT, c.UP_RIGHT];
    this.lastDirection = -1;
    this.slowAmount = 0;
    a = q.level;
    if(currentGame && currentGame.mode == GameInfo.EPIC_MODE) {
      a *= Math.round(GameInfo.EPIC_CREEP_LEVEL_MULTIPLIER)
    }
    this.data = {type:null, minHP:null, maxHP:null, minSpeedMultiplier:null, isAir:null, armor:null, minSpeed:null, maxSpeed:null, moneyValue:null, scoreValue:null, ignoresImpassible:null, waveID:null, exits:null};
    for(var s in this.data) {
      if(this.data.hasOwnProperty(s)) {
        this.data[s] = this.waveValues[s] == null ? this.baseValues[s] : this.waveValues[s]
      }
    }
    this.speed = this.lerp(this.data.maxSpeed, this.data.minSpeed, a);
    this.armor = this.lerp(this.data.minArmor, this.data.maxArmor, a) | 0;
    this.hitPoints = this.totalHitPoints = this.lerp(this.data.minHP, this.data.maxHP, a);
    this.setPath(g);
    this.startTick = Tick.ticks;
    Tick.addListener(this, true)
  }, addChild:function(a) {
    if(this.sprite instanceof BitmapSequence) {
      this.sprite = new Container;
      this.sprite.name = this.bitmapSequence.name;
      this.sprite.data = this.bitmapSequence.data;
      this.sprite.id = this.bitmapSequence.id;
      this.sprite.x = this.bitmapSequence.x;
      this.sprite.y = this.bitmapSequence.y;
      this.bitmapSequence.x = this.bitmapSequence.y = 0;
      this.bitmapSequence.alpha = 1;
      this.stage.removeChild(this.bitmapSequence);
      this.stage.addChildAt(this.sprite, 0);
      this.sprite.addChildAt(this.bitmapSequence, 0)
    }
    this.sprite.addChild(a)
  }, removeChild:function(a) {
    if(!(this.sprite instanceof BitmapSequence)) {
      this.sprite.removeChild(a);
      if(this.sprite.getNumChildren() == 1) {
        this.bitmapSequence.x = this.sprite.x;
        this.bitmapSequence.y = this.sprite.y;
        this.bitmapSequence.alpha = this.sprite.alpha;
        this.stage.removeChild(this.sprite);
        this.sprite = this.bitmapSequence;
        this.stage.addChildAt(this.sprite, 0)
      }
    }
  }, addDaisy:function(a) {
    this.daisy = a;
    this.addChild(a.sprite)
  }, removeDaisy:function() {
    if(this.daisy == null) {
      return null
    }
    var a = this.daisy;
    this.removeChild(a.sprite);
    this.daisy = null;
    return a
  }, lerp:function(a, b, d) {
    return(b - a) * 0.01 * d + a
  }, dispose:function() {
    this.alive = this.leaving = false;
    this.removeAllListeners();
    Tick.removeListener(this);
    this.stage.removeChild(this.sprite);
    BitmapModel.saveBitmap(this.bitmapSequence);
    this.shadowBitmap = this.slowSprite = this.bitmapSequence = this.sprite = null
  }, resetChildren:function() {
    this.stage.removeChild(this.sprite);
    this.addChild(this.bitmapSequence);
    this.sprite = this.bitmapSequence;
    this.data.type == "kraken" && this.addChild(this.healthMeter)
  }, applyDamage:function(a, b, d) {
    a -= this.armor;
    if(!(a <= 0)) {
      this.hitPoints -= a;
      a = this.hitPoints;
      if(this.type == "kraken" && a > 0) {
        var g = this.healthMeter.data.totalFrames;
        g = Math.max(0, g - (a / this.totalHitPoints * g + 0.5 | 0));
        this.healthMeter.gotoAndStop(g);
        if(g != this.lastHealthFrame && g % 2 != 0) {
          AudioManager.playSound(AudioManager.KRAKEN_HURT);
          this.lastHealthFrame = g
        }
      }
      if(a <= 0 && this.deathAnimation == null) {
        this.deathAnimation = BitmapModel.getBitmap("deathAnimation");
        this.deathAnimation.callback = $.proxy(this, "handleDeathAnimationComplete");
        this.deathAnimation.x = this.sprite.x;
        this.deathAnimation.y = this.sprite.y;
        this.deathAnimation.gotoAndPlay("death");
        this.stage.addChild(this.deathAnimation);
        this.deathAnimation.data = this;
        this.mode = "dead";
        switch(this.data.type) {
          case "rat":
            AudioManager.playSound(AudioManager.RAT_HURT);
            break;
          case "crab":
            AudioManager.playSound(AudioManager.CRAB_HURT);
            break;
          case "gull":
            AudioManager.playSound(AudioManager.GULL_HURT);
            break;
          case "octopus":
            AudioManager.playSound(AudioManager.OCTOPUS_HURT);
            break;
          case "kraken":
            AudioManager.playSound(AudioManager.KRAKEN_DEATH);
            break
        }
        this.dispatchEvent("death")
      }
      if(this.sprite != null) {
        if(b >= this.slowAmount) {
          this.slowAmount = b;
          this.slowDuration = d;
          if(this.slowSprite == null) {
            this.slowSprite = BitmapModel.getBitmap("slowStars")
          }
          this.slowSprite.gotoAndPlay("slow");
          this.slowSprite.currentFrame += Math.random() * 6 + 0.5 | 0;
          this.slowSprite.parent == null && this.addChild(this.slowSprite)
        }
      }
    }
  }, handleDeathAnimationComplete:function() {
    this.stage.removeChild(this.deathAnimation);
    BitmapModel.saveBitmap(this.deathAnimation)
  }, setPath:function(a) {
    this.path = a;
    this.path[0] == this.currentTile && this.path.shift();
    if(this.path[0] == this.nextTile) {
      this.path.shift()
    }else {
      this.nextTile = null;
      this.remainingDistance = 0
    }
    this.pathLength = this.path.length
  }, leaveGame:function() {
    this.leaving = true
  }, extrapolate:function(a) {
    return new Point(this.sprite.x + this.ratioX * this.speed * a, this.sprite.y + this.ratioY * this.speed * a)
  }, sendHomeEarly:function() {
    this.path = null;
    this.pathLength = 0
  }, tick:function() {
    if(this.leaving) {
      this.sprite.alpha -= 0.2;
      this.shadowBitmap.alpha = this.sprite.alpha;
      this.sprite.alpha <= 0.2 && this.dispatchEvent("removeComplete")
    }else {
      var a = this.distancePerTick = this.speed * (1 - this.slowAmount * (1 - this.data.minSpeedMultiplier));
      if(this.slowAmount > 0) {
        this.slowDuration -= 1;
        if(this.slowDuration < 0) {
          this.slowDuration = this.slowAmount = 0;
          this.removeChild(this.slowSprite)
        }
      }
      if(this.sprite.alpha < 1) {
        this.sprite.alpha += 0.2;
        if(this.shadowBitmap != null) {
          this.shadowBitmap.alpha = this.sprite.alpha
        }
      }
      if(a >= this.remainingDistance) {
        if(this.nextTile != null) {
          this.sprite.x += this.remainingDistance * this.ratioX;
          this.sprite.y += this.remainingDistance * this.ratioY;
          a -= this.remainingDistance
        }
        if(this.path == null || this.path.length == 0) {
          this.remainingDistance = 0;
          this.dispatchEvent("end");
          return
        }
        this.nextTile = this.path.shift();
        this.pathLength = this.path.length;
        var b = this.nextTile.x - this.xOffset - this.sprite.x, d = this.nextTile.y - this.sprite.y;
        this.remainingDistance = Math.sqrt(b * b + d * d);
        b = Math.atan2(d, b);
        this.ratioX = Math.cos(b);
        this.ratioY = Math.sin(b);
        this.rotateTo(b * Number.RADIANS + 30 | 0)
      }
      this.sprite.x += a * this.ratioX;
      this.sprite.y += a * this.ratioY;
      this.remainingDistance -= a;
      this.shadowBitmap.x = this.sprite.x + this.shadowOffset.x;
      this.shadowBitmap.y = this.sprite.y + this.shadowOffset.y;
      if(this.remainingDistance < this.hexRadius && this.currentTile != this.nextTile) {
        this.currentTile = this.nextTile;
        this.dispatchEvent("changeTile")
      }
    }
  }, rotateTo:function(a) {
    if(a > 360) {
      a -= 360
    }else {
      if(a < 0) {
        a += 360
      }
    }
    a = a / 60 | 0;
    if(this.lastDirection != a) {
      this.bitmapSequence.gotoAndPlay(this.directions[a]);
      this.bitmapSequence.currentFrame += Math.random() * 6 | 0;
      this.lastDirection = a
    }
  }, lookAhead:function(a) {
    var b = this.distancePerTick;
    b = a * b - this.remainingDistance - this.hexRadius;
    a = b + this.hexDiameter < 0 ? this.currentTile : this.nextTile;
    if(a == null) {
      return new Point(this.sprite.x, this.sprite.y)
    }
    if(b > 0) {
      b = b / this.hexDiameter | 0;
      var d = this.path ? this.pathLength : 0;
      if(d > 0) {
        a = b < d ? this.path[b] : this.path[d - 1]
      }
    }
    return new Point(a.x - this.xOffset, a.y)
  }, lookAheadTile:function() {
    var a = this.speed * (1 - this.slowAmount * (1 - this.data.minSpeedMultiplier));
    a = this.speed * (1 - this.slowAmount * (1 - this.data.minSpeedMultiplier));
    var b = a + this.hexRadius * 2 < 0 ? this.currentTile : this.nextTile;
    if(a > 0) {
      a = a / (this.hexRadius * 2) | 0;
      var d = this.path ? this.pathLength : 0;
      if(d > 0) {
        b = a < d ? this.path[a] : this.path[d - 1]
      }
    }
    return b
  }, lookAhead2:function(a) {
    var b = this.speed * (1 - this.slowAmount * (1 - this.data.minSpeedMultiplier));
    b = a * b;
    if(b < this.remainingDistance) {
      return new Point(this.x + this.ratioX * b, this.y + this.ratioY * this.d)
    }
    b -= this.remainingDistance;
    var d;
    if(this.path == null || (d = this.pathLength) == 0) {
      return new Point(this.nextTile.x, this.nextTile.y)
    }
    var g = b / this.hexRadius / 2 | 0;
    if(g >= d) {
      a = this.path[d - 1];
      return new Point(a.x, a.y)
    }
    b -= g * this.hexRadius * 2;
    a = g == 0 ? this.nextTile : this.path[g - 1];
    var m = this.path[g];
    d = a.x;
    a = a.y;
    g = m.x - d;
    m = m.y - a;
    b = b / Math.sqrt(g * g + m * m);
    return new Point(d + g * b - this.xOffset, a + m * b)
  }, toString:function() {
    return"[Creep " + this.id + "]"
  }};
  e.Creep = c
})(window);(function(e) {
  function c(a, b, d, g) {
    this.Daisy(a, b, d, g)
  }
  c.PLANTED = 1;
  c.PICKED = 2;
  c.DROPPED = 3;
  c.RETURNED = 4;
  c.prototype = {Daisy:function(a, b, d, g) {
    this.daisyContainer = b;
    this.sprite = a;
    this.tile = this.originalTile = d;
    this.state = g;
    this.previousState = this.owner = null;
    this.startPosition = new Point(this.sprite.x, this.sprite.y);
    this.picked = null
  }, setState:function(a) {
    this.previousState = this.state;
    this.state = a;
    this.update()
  }, getState:function() {
    return this.state
  }, handleDaisyReturned:function() {
    if(this.poof != null) {
      this.daisyContainer.removeChild(this.poof);
      BitmapModel.saveBitmap(this.poof)
    }
  }, update:function() {
    switch(this.state) {
      case c.PLANTED:
        if(this.picked) {
          this.daisyContainer.removeChild(this.picked);
          BitmapModel.saveBitmap(this.picked);
          this.picked = null
        }
        this.sprite.x = this.startPosition.x;
        this.sprite.y = this.startPosition.y;
        this.sprite.gotoAndStop("up" + ((Math.random() * 4 | 0) + 1));
        this.daisyContainer.addChild(this.sprite);
        break;
      case c.PICKED:
        this.daisyContainer.removeChild(this.sprite);
        if(this.previousState != c.DROPPED) {
          this.picked = BitmapModel.getBitmap("daisy");
          this.picked.x = this.sprite.x;
          this.picked.y = this.sprite.y;
          this.picked.gotoAndStop("hole");
          this.daisyContainer.addChild(this.picked)
        }
        this.sprite.x = 0;
        this.sprite.y = 0;
        break;
      case c.RETURNED:
        var a = this.poof = BitmapModel.getBitmap("deathAnimation");
        a.callback = $.proxy(this, "handleDaisyReturned");
        a.x = this.startPosition.x;
        a.y = this.startPosition.y;
        a.gotoAndPlay("death");
        this.sprite.x = this.startPosition.x;
        this.sprite.y = this.startPosition.y;
        this.sprite.gotoAndStop("dropped" + ((Math.random() * 6 | 0) + 1));
        this.daisyContainer.addChild(this.sprite);
        this.daisyContainer.addChild(this.poof);
        this.state = c.DROPPED;
        break;
      case c.DROPPED:
        this.sprite.gotoAndStop("dropped" + ((Math.random() * 6 | 0) + 1));
        this.daisyContainer.addChild(this.sprite);
        break
    }
  }, dispose:function() {
    if(this.picked != null) {
      BitmapModel.saveBitmap(this.picked);
      this.picked = null
    }
    BitmapModel.saveBitmap(this.sprite);
    this.sprite = null
  }, toString:function() {
    return"[Daisy " + this.sprite.id + " (" + this.state + ")]"
  }};
  e.Daisy = c
})(window);(function(e) {
  function c(a, b, d, g, m, q, s) {
    this.Pirate(a, b, d, g, m, q, s)
  }
  c.DOWN_LEFT = "DL";
  c.LEFT = "L";
  c.UP_LEFT = "UL";
  c.UP_RIGHT = "UR";
  c.RIGHT = "R";
  c.DOWN_RIGHT = "DR";
  c.DIRECTIONS = [c.LEFT, c.UP_LEFT, c.UP_RIGHT, c.RIGHT, c.DOWN_RIGHT, c.DOWN_LEFT];
  c.ROLL_OVER_DROPSHADOW = {color:"#000", offsetX:0, offsetY:0, blur:2};
  c.SELECTED_DROPSHADOW = {color:"#000", offsetX:0, offsetY:0, blur:15};
  c.CABIN_BOY = "cabinBoy";
  c.SHOOTER = "shooter";
  c.CANNON = "cannon";
  c.SABRE = "sabre";
  c.CAPTAIN = "captain";
  c.prototype = {Pirate:function(a, b, d, g, m, q, s) {
    EventDispatcher.create(this);
    this.bitmapSequence = this.sprite = a;
    this.stage = d;
    this.stage.addChild(a);
    this.shadowBitmap = b;
    this.regX = a.regX;
    this.tickOffset = 4;
    this.tickCount = 0;
    this.isCaptain = m.pirateType == c.CAPTAIN;
    this.currentLevel = 1;
    this.offset = g;
    this.data = m;
    this.costSoFar = m.cost;
    this.tileIndex = q;
    this.creepHash = s;
    this.data = m;
    this.projectileDelay = m.projectileDelay || 0;
    this.directions = c.DIRECTIONS;
    this.direction = 0;
    a = this.getState("Static");
    this.fixOffset();
    this.bitmapSequence.gotoAndStop(a);
    this.targetDirection = 0;
    this.attacking = false;
    this.firing = -1;
    this.targetCreep = null;
    this.waiting = this.waitDelay = 0;
    this.motivating = false;
    this.blink = 0;
    this.blinkDelay = ((Math.random() * 50 | 0) + 25) * Tick.fps;
    this.tick();
    if(gMode == true) {
      this.addHead();
      this.updateHead()
    }
    Tick.addListener(this, true)
  }, addChild:function(a) {
    if(this.sprite instanceof BitmapSequence) {
      this.sprite = new Container;
      this.sprite.name = this.bitmapSequence.name;
      this.sprite.data = this.bitmapSequence.data;
      this.sprite.id = this.bitmapSequence.id;
      this.sprite.x = this.bitmapSequence.x;
      this.sprite.y = this.bitmapSequence.y;
      this.bitmapSequence.x = this.bitmapSequence.y = 0;
      this.bitmapSequence.alpha = 1;
      this.stage.removeChild(this.bitmapSequence);
      this.stage.addChildAt(this.sprite, 0);
      this.sprite.addChildAt(this.bitmapSequence, 0)
    }
    this.sprite.addChild(a)
  }, removeChild:function(a) {
    if(!(this.sprite instanceof BitmapSequence)) {
      this.sprite.removeChild(a);
      if(this.sprite.getNumChildren() == 1) {
        this.bitmapSequence.x = this.sprite.x;
        this.bitmapSequence.y = this.sprite.y;
        this.bitmapSequence.alpha = this.sprite.alpha;
        this.stage.removeChild(this.sprite);
        this.sprite = this.bitmapSequence;
        this.stage.addChild(this.sprite)
      }
    }
  }, fixOffset:function() {
    if(this.bitmapSequence.usesSpriteFlip) {
      this.bitmapSequence.regX = this.direction >= 2 && this.direction <= 4 ? this.regX : this.bitmapSequence.spriteSheet.frameWidth - this.regX
    }
  }, setMotivation:function(a, b) {
    this.motivated = a;
    var d = this.data.motivate;
    this.rangeMultiplier = (d & PirateManager.RANGE) > 0 ? a : 1;
    this.damageMultiplier = (d & PirateManager.DAMAGE) > 0 ? a : 1;
    this.rateOfFireMultiplier = (d & PirateManager.RATE_OF_FIRE) > 0 ? a : 1;
    this.splashMultiplier = (d & PirateManager.SPLASH) > 0 ? a : 1;
    if(this.motivated > 1) {
      if(this.motivateIcon == null) {
        this.motivateIcon = BitmapModel.getBitmap("motivationStar");
        this.addChild(this.motivateIcon);
        this.motivateIcon.x = 20;
        this.motivateIcon.y = -21
      }
      this.motivateIcon.gotoAndStop("level" + b)
    }else {
      if(this.motivateIcon != null) {
        this.removeChild(this.motivateIcon);
        BitmapModel.saveBitmap(this.motivateIcon);
        this.motivateIcon = null
      }
    }
  }, getState:function(a) {
    return"l" + this.data.level + a + (this.isCaptain ? c.DOWN_LEFT : this.directions[this.direction])
  }, tick:function() {
    if(this.attacking) {
      this.firing > 0 && --this.firing == 0 && this.fire()
    }else {
      if(!this.isCaptain) {
        if(this.waiting < this.waitDelay) {
          this.waiting += 1
        }else {
          this.attack()
        }
      }
    }
  }, upgrade:function() {
    if(this.currentLevel != 3) {
      this.currentLevel++;
      this.data = PirateManager.getPirate(this.data.pirateType, this.currentLevel);
      this.costSoFar += this.data.cost;
      this.data.resale = this.costSoFar * 0.75 | 0;
      this.attacking = false;
      this.bitmapSequence.gotoAndStop(this.getState(this.blink ? "Blink" : "Static"))
    }
  }, retire:function() {
    this.dispose()
  }, dispose:function() {
    this.data = this.creeps = this.creepHash = this.targetCreep = null;
    Tick.removeListener(this);
    this.removeAllListeners();
    if(this.motivateIcon != null) {
      BitmapModel.saveBitmap(this.motivateIcon);
      this.motivateIcon = null
    }
    this.bitmapSequence.regX = this.regX;
    BitmapModel.saveBitmap(this.bitmapSequence);
    this.stage.removeChild(this.sprite);
    this.sprite = this.shadowBitmap = null
  }, findCreepDistance:function(a) {
    if(a == null || a.sprite == null) {
      return Number.POSITIVE_INFINITY
    }
    return Math.sqrt(Math.pow(a.sprite.x - this.sprite.x, 2) + Math.pow(a.sprite.y - this.sprite.y, 2))
  }, attack:function(a) {
    this.tickCount++;
    if(!(this.tickCount % this.tickOffset > 0)) {
      a = this.targetCreep;
      if(a != null) {
        if(a.alive) {
          if(this.findCreepDistance(a) > this.data.range * this.rangeMultiplier) {
            this.targetCreep = null
          }
        }else {
          this.targetCreep = null
        }
      }else {
        var b = this.data.range * this.rangeMultiplier + 1;
        for(var d in this.creepHash) {
          if(this.creepHash.hasOwnProperty(d)) {
            a = this.creepHash[d];
            if(!(a.data.isAir == true && this.sprite.data.hitsAir == false)) {
              var g = this.findCreepDistance(a);
              if(g < b && a.currentTile != null) {
                b = g;
                this.targetCreep = a;
                if(a.daisy != null) {
                  break
                }
              }
            }
          }
        }
      }
      a = this.targetCreep;
      if(a == null) {
        this.moveToDirection(this.targetDirection)
      }else {
        if(b != null) {
          this.projectileSpeed = Math.max(10, Math.min(24, b / 12))
        }
        b = this.creepPosition = this.data.projectile == null ? new Point(a.sprite.x, a.sprite.y) : a.lookAhead(this.projectileSpeed + this.projectileDelay);
        b = Math.atan2(this.sprite.y - b.y, this.sprite.x - b.x) * Number.RADIANS + 30;
        if(b < 0) {
          b += 360
        }else {
          if(b > 360) {
            b -= 360
          }
        }
        this.targetDirection = b / 60 | 0;
        if(this.targetDirection == 6) {
          this.targetDirection = 0
        }
        a = this.targetDirection;
        b = this.direction;
        if(a != b) {
          this.moveToDirection(a)
        }else {
          if(a == b) {
            this.attacking = true;
            b = this.data.projectileDelay;
            if(b == null || b == 0) {
              this.fire()
            }else {
              this.firing = b
            }
            this.bitmapSequence.callback = $.proxy(this, "handleAttackComplete");
            b = this.bitmapSequence.gotoAndPlay(this.getState("Attack"));
            this.waitDelay = Math.max(0, this.data.rateOfFire / this.rateOfFireMultiplier * Tick.fps - b)
          }
          this.updateHead()
        }
      }
    }
  }, moveToDirection:function(a) {
    var b = this.direction;
    if(a != b) {
      var d = this.directions.length, g, m;
      if(a > b) {
        g = a - b;
        m = b + (d - a)
      }else {
        m = b - a;
        g = a + (d - b)
      }
      if(g < m) {
        b += 1;
        if(b >= d) {
          b = 0
        }
      }else {
        b -= 1;
        if(b < 0) {
          b = d - 1
        }
      }
      this.direction = b;
      this.fixOffset();
      this.bitmapSequence.gotoAndStop(this.getState("Static"));
      this.tickCount += 2
    }
  }, fire:function() {
    var a = this.targetCreep;
    switch(this.data.pirateType) {
      case c.SABRE:
        AudioManager.playSound(AudioManager.SABRE_FIRE);
        AudioManager.playSoundDelayed(AudioManager.SABRE_FIRE, this.currentLevel == 1 ? 350 : 500);
        break;
      case c.SHOOTER:
        AudioManager.playSound(AudioManager.SHOOTER_FIRE);
        this.currentLevel > 2 && AudioManager.playSoundDelayed(AudioManager.SHOOTER_FIRE, 400);
        break;
      case c.CANNON:
        AudioManager.playSound(AudioManager.CANNON_FIRE);
        break
    }
    if(this.data.projectile == null) {
      a.alive && a.applyDamage(this.data.damage * this.damageMultiplier, this.data.slowAmount, this.data.slowDuration)
    }else {
      this.dispatchEvent("fire", {projectile:new CannonBall(this, a, this.data.projectile, this.creepPosition, this.projectileSpeed)});
      this.firing = -1;
      if(!a.alive) {
        this.targetCreep = null
      }
    }
  }, handleAttackComplete:function() {
    this.data.pirateType == c.CAPTAIN && this.dispatchEvent("faceShore");
    this.bitmapSequence.callback = null;
    this.bitmapSequence.gotoAndStop(this.getState("Static"));
    this.attacking = this.motivating = false;
    this.waiting = 0
  }, motivate:function() {
    if(this.isCaptain) {
      if(!this.motivating) {
        this.motivating = true;
        this.bitmapSequence.callback = $.proxy(this, "handleAttackComplete");
        this.bitmapSequence.gotoAndPlay(this.getState("Attack"));
        AudioManager.playSound(AudioManager.CAPTAIN_AHOY)
      }
    }
  }, addHead:function() {
    switch(this.data.pirateType) {
      case c.SABRE:
        this.headIcon = BitmapModel.getBitmap("gHead");
        break;
      case c.CANNON:
        this.headIcon = BitmapModel.getBitmap("lHead");
        break;
      case c.CABIN_BOY:
        this.headIcon = BitmapModel.getBitmap("eHead");
        break;
      case c.SHOOTER:
        this.headIcon = BitmapModel.getBitmap("sHead");
        break
    }
    this.headIcon != null && this.addChild(this.headIcon)
  }, updateHead:function() {
    if(this.headIcon != null) {
      if(this.direction >= 2 && this.direction <= 4) {
        switch(this.data.pirateType) {
          case c.SABRE:
            break
        }
        this.headIcon.scaleX = -1
      }else {
        this.headIcon.scaleX = 1
      }
    }
  }, toString:function() {
    return"[Pirate " + this.sprite.id + "]"
  }};
  e.Pirate = c
})(window);(function(e) {
  function c(a, b, d, g, m) {
    this.CannonBall(a, b, d, g, m)
  }
  c.prototype = {CannonBall:function(a, b, d, g, m) {
    EventDispatcher.create(this);
    this.creep = b;
    this.creepHash = a.creepHash;
    this.level = a.data.level;
    this.damage = a.data.damage * a.damageMultiplier;
    this.splash = a.data.splashRange * a.splashMultiplier;
    this.hitsAir = a.sprite.data.hitsAir;
    this.creepHash = a.creepHash;
    this.slowAmount = a.data.slowAmount;
    this.slowDuration = a.data.slowDuration;
    this.projectileType = d;
    b = this.sprite = BitmapModel.getBitmap(d + "Projectile");
    b.gotoAndPlay("l" + this.level);
    b.x = a.sprite.x;
    b.y = a.sprite.y;
    d = a.data.projectileOffset;
    if(d != null) {
      switch(a.direction) {
        case 0:
          b.x -= d[4];
          b.y -= d[5];
          break;
        case 3:
          b.x += d[4];
          b.y -= d[5];
          break;
        case 1:
          b.x -= d[2];
          b.y -= d[3];
          break;
        case 2:
          b.x += d[2];
          b.y -= d[3];
          break;
        case 5:
          b.x -= d[0];
          b.y -= d[1];
          break;
        case 4:
          b.x += d[0];
          b.y -= d[1];
          break
      }
    }
    this.startPosition = new Point(b.x, b.y);
    this.speed = m;
    this.endPosition = g;
    this.xDelta = this.endPosition.x - b.x;
    this.yDelta = this.endPosition.y - b.y;
    this.apex = this.yDelta / 2 + b.y - 72 - Math.abs(this.yDelta * 0.2);
    this.mode = "projectile";
    this.increment = 0;
    Tick.addListener(this)
  }, shotComplete:function() {
    var a = BitmapModel.getBitmap(this.projectileType + "Explosion");
    if(a != null) {
      a.callback = $.proxy(this, "handleExplosionComplete");
      a.x = this.sprite.x;
      a.y = this.sprite.y;
      a.gotoAndPlay("l" + this.level);
      this.mode = "explosion"
    }
    var b = this.splash;
    if(b == 0 || b == null) {
      this.creep.applyDamage(this.damage, this.slowAmount, this.slowDuration)
    }else {
      for(var d in this.creepHash) {
        if(this.creepHash.hasOwnProperty(d)) {
          creep = this.creepHash[d];
          if(!(creep.data.isAir == true && this.hitsAir == false)) {
            var g = this.findCreepDistance(creep);
            if(g < b) {
              g = (b - g) / b;
              creep.applyDamage(this.damage * g, this.slowAmount * g, this.slowDuration)
            }
          }
        }
      }
    }
    this.dispatchEvent("projectileComplete", {explosion:a});
    this.sprite = a;
    switch(this.projectileType) {
      case "sponge":
        AudioManager.playSound(AudioManager.CABIN_BOY_FIRE);
        break;
      case "cannon":
        AudioManager.playSound(AudioManager.CANNON_IMPACT);
        break
    }
  }, handleExplosionComplete:function() {
    this.dispatchEvent("explosionComplete")
  }, dispose:function() {
    BitmapModel.saveBitmap(this.sprite);
    this.creep = this.sprite = null;
    this.removeAllListeners()
  }, findCreepDistance:function(a) {
    if(a == null || a.sprite == null) {
      return Number.POSITIVE_INFINITY
    }
    return Math.sqrt(Math.pow(a.sprite.x - this.sprite.x, 2) + Math.pow(a.sprite.y - this.sprite.y, 2))
  }, tick:function() {
    var a = ++this.increment / this.speed;
    this.sprite.x = a * this.xDelta + this.startPosition.x;
    this.sprite.y = Math.pow(1 - a, 2) * this.startPosition.y + 2 * (1 - a) * a * this.apex + Math.pow(a, 2) * this.endPosition.y;
    if(this.increment >= this.speed) {
      Tick.removeListener(this);
      this.shotComplete()
    }
  }, toString:function() {
    return"[CannonBall " + this.pirate + ", " + this.creep + "]"
  }};
  e.CannonBall = c
})(window);(function(e) {
  function c(b, d) {
    this.IdleManager(b, d)
  }
  function a(b, d, g, m, q) {
    this.IdleAnimation(b, d, g, m, q)
  }
  c.prototype = {IdleManager:function(b, d) {
    this.effectsContainer = b;
    this.idles = [];
    for(var g = 0, m = d.length;g < m;g++) {
      this.idles.push(new a(this.effectsContainer, d[g].sprites, Game.effectsEnabled, d[g].frequency * Tick.fps, d[g].count))
    }
  }, setEnabled:function(b) {
    for(var d = 0, g = this.idles.length;d < g;d++) {
      this.idles[d].setEnabled(b)
    }
  }, cleanUp:function() {
    for(var b = 0, d = this.idles.length;b < d;b++) {
      this.idles[b].cleanUp()
    }
    this.idles = null
  }};
  e.IdleManager = c;
  a.prototype = {IdleAnimation:function(b, d, g, m, q) {
    this.effectsContainer = b;
    this.activeSprites = [];
    this.sprites = [];
    this.handleAnimationCompleteProxy = new EventProxy(this, "handleAnimationComplete");
    b = 0;
    for(var s = d.length;b < s;b += 3) {
      var y = BitmapModel.getBitmap(d[b]);
      if(y != null) {
        y.x = d[b + 1];
        y.y = d[b + 2];
        y.callback = $.proxy(this, "handleAnimationComplete");
        this.sprites.push(y);
        if(y.data.persist == true) {
          this.effectsContainer.addChild(y);
          y.currentFrame = 0
        }
      }
    }
    this.repeatCount = this.freqCount = 0;
    this.frequency = m;
    this.count = q;
    this.setEnabled(g)
  }, setEnabled:function(b) {
    if(b) {
      Tick.addListener(this, true);
      b = 0;
      for(var d = this.activeSprites.length;b < d;b++) {
        this.activeSprites[b].gotoAndPlay("loop")
      }
    }else {
      Tick.removeListener(this);
      b = 0;
      for(d = this.activeSprites.length;b < d;b++) {
        this.activeSprites[b].gotoAndStop("stopped")
      }
    }
  }, tick:function() {
    l = this.sprites.length;
    if(this.repeatCount > 0 && Math.random() <= 0.4 && l > 0) {
      this.repeatCount--;
      i = Math.random() * l | 0;
      sprite = this.sprites[i];
      this.activeSprites.push(sprite);
      this.sprites.splice(i, 1);
      sprite.data.persist || this.effectsContainer.addChild(sprite);
      sprite.gotoAndPlay("loop");
      if(sprite.data.loop != true) {
        sprite.nextSequence = null
      }
    }
    if(this.freqCount <= 0) {
      this.repeatCount = 1 + Math.random() * this.count | 0;
      this.freqCount = this.frequency + Math.random() * this.frequency | 0
    }
    this.freqCount--
  }, handleAnimationComplete:function(b) {
    this.activeSprites.removeItem(b);
    this.sprites.push(b);
    b.data.persist != true && this.effectsContainer.removeChild(b);
    b.gotoAndStop("loop")
  }, cleanUp:function() {
    Tick.removeListener(this);
    this.sprites.concat(this.activeSprites);
    for(var b = 0, d = this.sprites.length;b < d;b++) {
      var g = this.sprites[b];
      this.effectsContainer.removeChild(g);
      BitmapModel.saveBitmap(g)
    }
    this.sprites = this.activeSprites = null
  }, toString:function() {
    return"[IdleAnimation " + this.sprites.length + "]"
  }};
  e.IdleAnimation = a
})(window);(function(e) {
  e.Asset = function(c, a, b) {
    this.id = c;
    this.type = a;
    this.url = b
  }
})(window);(function(e) {
  e.SoundAsset = function(c, a, b, d) {
    this.id = c;
    this.url = a;
    this.numChannels = b;
    this.loadPriority = d
  }
})(window);(function(e) {
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
})(window);function AudioManager() {
}
EventDispatcher.create(AudioManager);
AudioManager.PRELOAD_SETTING = "auto";
AudioManager.INTRO = "intro";
AudioManager.MUSIC = "music";
AudioManager.DEFEAT = "defeat";
AudioManager.VICTORY = "victory";
AudioManager.CANNON_FIRE = "cannon";
AudioManager.CANNON_IMPACT = "cannonImpact";
AudioManager.CANNON_ADDED = "cannonAdded";
AudioManager.SHOOTER_FIRE = "shooter";
AudioManager.SHOOTER_ADDED = "shooterAdded";
AudioManager.SABRE_FIRE = "sabre";
AudioManager.SABRE_ADDED = "sabreAdded";
AudioManager.CABIN_BOY_FIRE = "cabinBoy";
AudioManager.CABIN_BOY_ADDED = "cabinBoyAdded";
AudioManager.CAPTAIN_ADDED = "captainAdded";
AudioManager.CAPTAIN_AHOY = "captainAhoy";
AudioManager.CAPTAIN_ARGH = "captainArgh";
AudioManager.RAT_HURT = "ratHurt";
AudioManager.CRAB_HURT = "crabHurt";
AudioManager.OCTOPUS_HURT = "octopusHurt";
AudioManager.GULL_HURT = "gullHurt";
AudioManager.KRAKEN_HURT = "krakenHurt";
AudioManager.KRAKEN_DEATH = "krakenDeath";
AudioManager.PLACE_TOWER = "placeTower";
AudioManager.UPGRADE = "upgrade";
AudioManager.RETIRE = "retire";
AudioManager.STEAL_DAISY = "stealDaisy";
AudioManager.CLICK = "click";
AudioManager.DAISY_LOST = "daisyLost";
AudioManager.KRAKEN_MUSIC = "krakenMusic";
AudioManager.THUNDER1 = "thunder1";
AudioManager.THUNDER2 = "thunder2";
AudioManager.playSoundDelayed = function(e, c) {
  if(c == null) {
    c = 0
  }
  setTimeout(function() {
    AudioManager.playSound(e)
  }, c)
};
AudioManager.mute = function(e) {
  AudioManager.muted = e;
  $("audio").each(function(c, a) {
    a.volume = e ? 0 : 1
  })
};
AudioManager.playSound = function(e, c) {
  for(var a, b = 1;b <= 10;b++) {
    var d = $("#" + (e + "_" + b)).get(0);
    if(d == null) {
      break
    }
    if(d.currentTime == 0 || d.duration - d.currentTime < 0.25) {
      a = d;
      break
    }
  }
  if(a == null) {
    a = $("#" + e + "_1").get(0)
  }
  if(a != null) {
    try {
      a.currentTime = 0
    }catch(g) {
    }
    a.loop = c;
    a.play()
  }
  return a
};
AudioManager.pauseSound = function(e) {
  for(var c = 1;c <= 10;c++) {
    var a = $("#" + (e + "_" + c));
    if(a != undefined) {
      a.get(0).pause()
    }else {
      break
    }
  }
};
AudioManager.stopAllSounds = function() {
  $.each($("audio"), function(e, c) {
    var a = $(c).get(0);
    try {
      a.pause();
      a.currentTime = 0
    }catch(b) {
    }
  })
};function ViewManager() {
}
EventDispatcher.create(ViewManager);
ViewManager.START_SCREEN = 0;
ViewManager.MAP_SCREEN = 1;
ViewManager.HELP_SCREEN = 2;
ViewManager.WIN_SCREEN = 3;
ViewManager.GAMEOVER_SCREEN = 4;
ViewManager.HIGHSCORE_SCREEN = 5;
ViewManager.GAME_SCREEN = 6;
ViewManager.data = null;
ViewManager.activeScreen = -1;
ViewManager.viewHash = {};
ViewManager.show = function(e, c) {
  if(ViewManager.activeScreen != e) {
    switch(e) {
      case ViewManager.START_SCREEN:
        ViewManager.data = LoadedAssets.getAsset("startScreen");
        $.getScript("views/MainView.js", function() {
          ViewManager.viewHash[ViewManager.START_SCREEN] = new MainView(ViewManager.data)
        });
        break;
      case ViewManager.MAP_SCREEN:
        ViewManager.data = LoadedAssets.getAsset("mapScreen");
        $.getScript("views/MapView.js", function() {
          ViewManager.viewHash[ViewManager.MAP_SCREEN] = new MapView(ViewManager.data)
        });
        break;
      case ViewManager.HELP_SCREEN:
        ViewManager.data = LoadedAssets.getAsset("helpScreen");
        DatabaseDelegate.submitAnalytics(DatabaseDelegate.HELP);
        $.getScript("views/HelpView.js", function() {
          ViewManager.viewHash[ViewManager.HELP_SCREEN] = new HelpView(ViewManager.data);
          ViewManager.viewHash[ViewManager.HELP_SCREEN].startAnimation()
        });
        break;
      case ViewManager.WIN_SCREEN:
        ViewManager.data = LoadedAssets.getAsset("winScreen");
        $.getScript("views/VictoryView.js", function() {
          ViewManager.viewHash[ViewManager.WIN_SCREEN] = new VictoryView(ViewManager.data)
        });
        break;
      case ViewManager.GAMEOVER_SCREEN:
        ViewManager.data = LoadedAssets.getAsset("gameoverScreen");
        $.getScript("views/DefeatView.js", function() {
          ViewManager.viewHash[ViewManager.GAMEOVER_SCREEN] = new DefeatView(ViewManager.data)
        });
        break;
      case ViewManager.HIGHSCORE_SCREEN:
        ViewManager.data = LoadedAssets.getAsset("highscoreScreen");
        $.getScript("views/HighscoreView.js", function() {
          ViewManager.viewHash[ViewManager.HIGHSCORE_SCREEN] = new HighscoreView(ViewManager.data, c)
        });
        break;
      case ViewManager.GAME_SCREEN:
        ViewManager.data = null;
        break
    }
    ViewManager.hide(ViewManager.activeScreen);
    ViewManager.activeScreen = e;
    if(ViewManager.data != null) {
      $("#game").css("display", "none");
      $("#screens").css("display", "block");
      $("#screens").empty();
      $("#screens").html(ViewManager.data)
    }else {
      $("#game").css("display", "block");
      $("#screens").css("display", "none")
    }
  }
};
ViewManager.hide = function(e) {
  switch(e) {
    case ViewManager.START_SCREEN:
      $("#screens").css("display", "none");
      break;
    case ViewManager.MAP_SCREEN:
      break;
    case ViewManager.HELP_SCREEN:
      ViewManager.viewHash[ViewManager.HELP_SCREEN].stopAnimation();
      break;
    case ViewManager.WIN_SCREEN:
      break;
    case ViewManager.GAMEOVER_SCREEN:
      break
  }
  $("#screens").empty()
};function TooltipManager() {
}
EventDispatcher.create(TooltipManager);
TooltipManager.EFFECTS = "effects";
TooltipManager.RETIRE_UNIT = "retireUnit";
TooltipManager.NEXT_WAVE = "nextWave";
TooltipManager.SHOOTER = "shooter";
TooltipManager.SHOOTER_UPGRADE = "shooterUpgrade";
TooltipManager.CANNON = "cannon";
TooltipManager.CANNON_UPGRADE = "cannonUpgrade";
TooltipManager.SABRE = "sabre";
TooltipManager.SABRE_UPGRADE = "sabreUpgrade";
TooltipManager.CABIN_BOY = "cabinBoy";
TooltipManager.CABIN_BOY_UPGRADE = "cabinBoyUpgrade";
TooltipManager.CAPTAIN = "captainBoy";
TooltipManager.CAPTAIN_UPGRADE = "captainUpgrade";
TooltipManager.DEMO_STEP = "demoStep";
TooltipManager.locked = false;
TooltipManager.getContent = function(e, c) {
  switch(e) {
    case TooltipManager.EFFECTS:
      return'<p class="tooltipArial"><strong>Internet Explorer 9</strong> unlocks the processing power of your PC by tapping into both the CPU and GPU, enabling rich experiences online that feels like a native application on your computer. In Pirates Love Daisies, this allows us to display animated background scenery and environmental effects without slowing down the game. For more examples of content enhanced with IE9, please visit <a href="http://www.beautyoftheweb.com" target="_blank">www.beautyoftheweb.com</a>.</p>';
    case TooltipManager.RETIRE:
      return'Send em away on shore leave, but ye not be gettin all your coin back. (shortcut key: "x")';
    case TooltipManager.NEXT_WAVE:
      return'Bring the next wave of scurvy dogs callin, ye get bonus points for bein eager. (shortcut key: "w")';
    case TooltipManager.SHOOTER:
      return'She\'s got half the eyes but twice the aim, ye pistol toting pirate be the best shot at takin down the winged demons of Davy Jones. (shortcut key: "1")';
    case TooltipManager.SHOOTER_UPGRADE:
      return'Scarlett knows a port where ye can get ye better pistols with a little gold, yarr, she be hearin word o\' good hair salons too. Eventually she may get a matchin pair and some better powder. (shortcut key: "space")';
    case TooltipManager.SABRE:
      return"Inigo be mostly deadly of all ye crew, just get the lad up close to the land lubbers and swab the decks when he's done with 'em. (shortcut key: \"2\")";
    case TooltipManager.SABRE_UPGRADE:
      return'Inigo with a finer blade will be a terror to all land lubbers, the finest blade in all the land allows a thrust that is inconceivable. Be tryin to stop the lad from giving Scarlett fashion advice. (shortcut key: "space")';
    case TooltipManager.CANNON:
      return"Aye, he be a bit slow but Lenny's cannon hits all the landlubbers nearby when it lands. Nothin be clearin a deck like Lenny's cannon or Lenny's smell. (shortcut key: \"3\")";
    case TooltipManager.CANNON_UPGRADE:
      return"If ye can spare Lenny some gold he'll be finding ye a ship or two he'll be convincin to split with their large cannons. Enough time around Lenny and he may get ye the best just to make him leave. (shortcut key: \"space\")";
    case TooltipManager.CABIN_BOY:
      return"Soapy Bill's sponges don't hurt much, but they be slowing both landlubbers & the winged demons, gives ye pirates more time to damage them. (shortcut key: \"4\")";
    case TooltipManager.CABIN_BOY_UPGRADE:
      return'Spare ye lad some coin for a better bucket and some real soap and ye be convinced he be a real man one day. When ye get the lad enough supplies ye get it all over the place when the sponge be landin. (shortcut key: "space")';
    case TooltipManager.CAPTAIN:
      return'Ye Captain boosts the morale of units around him, raisin their stats. Ye can only hire one captain at a time so be using him wisely. (shortcut key: "5")';
    case TooltipManager.CAPTAIN_UPGRADE:
      return'Ye captain in a new fancy hat be striking more fear into ye men than ye enemies, yarr, pirates always be workin best with a little fear. With an imposing hat it be harder to escape the influence. (shortcut key: "space")';
    case TooltipManager.DEMO_STEP:
      switch(c) {
        case 0:
          return"Hire an available unit by clicking one of the hire buttons, or using the shortcut keys 1-5. They will only be available if you have enough coins.<br/><br/>Click to hire Scarlett (or press '1') to continue.";
        case 1:
          return"Place a unit anywhere an anchor symbol is displayed on a map. Move your mouse over the anchors to show the range for the selected pirate.<br/><br/>Click this anchor to add Scarlett to the map.";
        case 2:
          return"Click a unit on the map to select it. This will allow you to modify your pirates.<br/><br/>Select this pirate to continue.";
        case 3:
          return"Upgrade or retire the pirate by clicking the appropriate button or clicking 'space' or 'x' respectively. You can also click anywhere else on the map (or hit 'escape') to deselect the pirate.<br/><br/>Upgrade Scarlett to level 2 to continue.";
        case 4:
          return"If there are no more creeps left in the current wave, you can click the 'Next Wave' button here to trigger the next wave immediately, and get some bonus points.<br/><br/>Click 'Next Wave' to begin playing!"
      }
      return"Demo Step Tooltip not set for " + c;
    default:
      return"Tooltip not set for " + e
  }
};
TooltipManager.SCALE9GRID = {top:10, bottom:10, left:10, right:10};
TooltipManager.show = function(e, c, a, b, d, g) {
  if(g == null) {
    g = 1E3
  }
  clearTimeout(TooltipManager.activeTimeout);
  TooltipManager.container != null && TooltipManager.container.remove();
  TooltipManager.activeTimeout = setTimeout(function() {
    TooltipManager.showOnDelay(e, c, a, b, d)
  }, g);
  return true
};
TooltipManager.showOnDelay = function(e, c, a, b, d) {
  var g = TooltipManager.container = $('<div class="tooltipContainer"><div id="tooltipText" ></div><div id="tooltipArrow"><img src="img/ui/tooltipArrow.png"></div></div>').appendTo($("#piratesLoveDaisies").get(0));
  if(b != false) {
    g.mouseenter(function() {
      clearTimeout(TooltipManager.activeTimeout)
    });
    g.mouseleave(function() {
      TooltipManager.hide()
    });
    g.onselectstart = g.onmousedown = function() {
      return false
    }
  }else {
    TooltipManager.locked = true
  }
  TooltipManager.text = TooltipManager.getContent(e, d || 0);
  g.css({width:c.width, height:c.height, top:c.y, left:c.x});
  g.scale9Grid(TooltipManager.SCALE9GRID);
  g.fadeIn(100);
  $("#tooltipText").html(TooltipManager.text);
  $("#tooltipArrow").css("top", c.height - 5);
  $("#tooltipArrow").css("left", a)
};
TooltipManager.hide = function(e) {
  clearTimeout(TooltipManager.activeTimeout);
  TooltipManager.locked = false;
  if(TooltipManager.container != null) {
    if(e == null) {
      e = 350
    }
    TooltipManager.activeTimeout = setTimeout(TooltipManager.fadeOut, e)
  }
};
TooltipManager.fadeOut = function() {
  TooltipManager.container.fadeOut(350);
  TooltipManager.activeTimeout = null
};var currentGame, assetQueue = [], spritesLoaded = false, gameAssetsLoaded = false, skipAudioLoad = false, progressBar, fallingDaisies1, fallingDaisies2, gMode = false, previousMode = "", previousMapIndex = "", previousScore = "", previousScreenshot = "";
function init() {
  $(window).keyup(handleKeyUp);
  var e = $("#piratesLoveDaisies").get(0);
  e.onselectstart = function() {
    return false
  };
  e.onmousedown = function() {
    return false
  };
  $(window).bind("resize", handleResize);
  handleResize();
  DatabaseDelegate.submitAnalytics(DatabaseDelegate.VISIT);
  if(validateBrowser()) {
    $("#preloader").css("display", "block");
    $("#unsupportedBrowser").css("display", "none");
    $("#effectsToggleLink").mouseenter(showEffectsTooltip);
    setEffects(isIE9());
    progressBar = new ProgressBar($("#preloaderBar"), 304, 36);
    startFallingDaisies();
    setTimeout(loadSprites, 1500)
  }else {
    $("#preloader").css("display", "none");
    $("#effectsToggle").css("display", "none");
    $("#unsupportedBrowser").css("display", "block");
    $("#unsupportedBrowser").center();
    DatabaseDelegate.submitAnalytics(DatabaseDelegate.UNSUPPORTED_BROWSER)
  }
}
var pauseLocked = false;
function globalPause(e, c) {
  if(pauseLocked && c == null) {
    return false
  }
  pauseLocked = c;
  var a = $("#togglePauseBtn");
  if(Tick.isPaused()) {
    Tick.unpause();
    a.text("Pause");
    currentGame != null && currentGame.resume()
  }else {
    Tick.pause();
    a.text("Resume");
    currentGame != null && currentGame.pause()
  }
  return true
}
function startFallingDaisies() {
  var e = ["img/fallingDaisy1.png", "img/fallingDaisy2.png", "img/fallingDaisy3.png", "img/fallingDaisy4.png", "img/fallingDaisy5.png", "img/fallingDaisy6.png", "img/fallingDaisy7.png", "img/fallingDaisy8.png"];
  fallingDaisies1 = new FallingParticles($("#fallingDaisies1").get(0), e, 0.25, 0.45);
  fallingDaisies1.start(isFirefox3() ? 20 : 130);
  fallingDaisies1.mousePoints = [new Point(380, 320), new Point(470, 300), new Point(580, 320)];
  Tick.addListener(fallingDaisies1);
  fallingDaisies2 = new FallingParticles($("#fallingDaisies2").get(0), e, 0.5, 0.9);
  fallingDaisies2.start(20);
  fallingDaisies2.mousePoints = fallingDaisies1.mousePoints;
  fallingDaisies2.siblings = [fallingDaisies1];
  Tick.addListener(fallingDaisies2)
}
function stopFallingDaisies() {
  if(fallingDaisies1) {
    fallingDaisies1.stop(true);
    fallingDaisies2.stop(true);
    Tick.removeListener(fallingDaisies1);
    Tick.removeListener(fallingDaisies2)
  }
}
function showEffectsTooltip(e) {
  if(!(currentGame && currentGame.demo && currentGame.demo.active == true)) {
    $("#" + e.target.id).offset();
    e = new Rectangle(10, 606, 580, 95);
    TooltipManager.show(TooltipManager.EFFECTS, e, 205, true, 0, 0) && $("#effectsToggle").mouseleave(hideEffectsTooltip)
  }
}
function hideEffectsTooltip() {
  $("#effectsToggle").unbind("mouseleave", hideEffectsTooltip);
  TooltipManager.hide()
}
function handleKeyUp(e) {
  switch(e.keyCode) {
    case KeyShortcuts.DEBUG:
      if(e.shiftKey && initDebugging) {
        showTrace(true);
        initDebugging()
      }
      break;
    case KeyShortcuts.G:
      if(e.shiftKey && e.altKey && e.ctrlKey) {
        gMode = true
      }
      break;
    default:
      currentGame != null && currentGame.handleKeyUp(e)
  }
}
function validateBrowser() {
  var e = document.createElement("canvas").getContext;
  navigator.userAgent.toLowerCase();
  return e != null
}
function isWebkit() {
  return $.browser.webkit
}
function isIE9() {
  return navigator.appVersion.indexOf("MSIE 9") > -1
}
function isFirefox3() {
  return navigator.userAgent.indexOf("Firefox/3") > -1
}
function loadSprites() {
  BitmapModel.addEventListener("progress", handleAssetProgress);
  BitmapModel.addEventListener("error", handleSpritesLoadError);
  BitmapModel.addEventListener("loadComplete", handleSpritesLoadComplete);
  BitmapModel.load("data/images.json")
}
function handleSpritesLoadComplete() {
  spritesLoaded = true;
  loadAssets()
}
function handleSpritesLoadError() {
  alert("Image data failed to load. Please verify if it is well-formed")
}
function loadAssets() {
  var e = [new Asset("startScreen", AssetLoader.HTML_TYPE, "views/main.html"), new Asset("mapScreen", AssetLoader.HTML_TYPE, "views/maps.html"), new Asset("helpScreen", AssetLoader.HTML_TYPE, "views/help.html"), new Asset("highscoreScreen", AssetLoader.HTML_TYPE, "views/highscore.html"), new Asset("mainView", AssetLoader.JS_TYPE, "views/MainView.js"), new Asset("mapView", AssetLoader.JS_TYPE, "views/MapView.js"), new Asset("helpView", AssetLoader.JS_TYPE, "views/HelpView.js"), new Asset("highscoreView", 
  AssetLoader.JS_TYPE, "views/HighscoreView.js"), new Asset("startBG", AssetLoader.IMAGE_TYPE, "img/screens/titleScreen.jpg"), new Asset("mapBG", AssetLoader.IMAGE_TYPE, "img/screens/mapScreen.png"), new Asset("mapButtonOver", AssetLoader.IMAGE_TYPE, "img/ui/mapButtonOver.png"), new Asset("mapButtonCoconutCove", AssetLoader.IMAGE_TYPE, "img/ui/mapButtonCoconutCove.png"), new Asset("mapButtonHiddenHideaway", AssetLoader.IMAGE_TYPE, "img/ui/mapButtonHiddenHideaway.png"), new Asset("mapButtonRumAlley", 
  AssetLoader.IMAGE_TYPE, "img/ui/mapButtonRumAlley.png"), new Asset("mapButtonTreasureIsland", AssetLoader.IMAGE_TYPE, "img/ui/mapButtonTreasureIsland.png"), new Asset("BottomNav_background", AssetLoader.IMAGE_TYPE, "img/BottomNav_background.png"), new Asset("tooltipBG", AssetLoader.IMAGE_TYPE, "img/ui/tooltipBG.png"), new Asset("banner", AssetLoader.IMAGE_TYPE, "img/ui/banner.png"), new Asset("largeFabric", AssetLoader.IMAGE_TYPE, "img/ui/largeFabric.png"), new Asset("woodPanel", AssetLoader.IMAGE_TYPE, 
  "img/ui/woodPanel.png"), new Asset("largeButtonFabric_over", AssetLoader.IMAGE_TYPE, "img/ui/largeButtonFabric_over.png"), new Asset("largeButtonFabric_up", AssetLoader.IMAGE_TYPE, "img/ui/largeButtonFabric_up.png"), new Asset("suddenButtonFabric_over", AssetLoader.IMAGE_TYPE, "img/ui/suddenButtonFabric_over.png"), new Asset("suddenButtonFabric_up", AssetLoader.IMAGE_TYPE, "img/ui/suddenButtonFabric_up.png"), new Asset("medButtonFabric_up", AssetLoader.IMAGE_TYPE, "img/ui/medButtonFabric_up.png"), 
  new Asset("medButtonFabric_over", AssetLoader.IMAGE_TYPE, "img/ui/medButtonFabric_over.png"), new Asset("smallButtonFabric_over", AssetLoader.IMAGE_TYPE, "img/ui/smallButtonFabric_over.png"), new Asset("smallButtonFabric_up", AssetLoader.IMAGE_TYPE, "img/ui/smallButtonFabric_up.png"), new Asset("smallPanel", AssetLoader.IMAGE_TYPE, "img/ui/smallPanel.png")], c = [new Asset("map1", AssetLoader.IMAGE_TYPE, "maps/map1/map1-01.png"), new Asset("map2", AssetLoader.IMAGE_TYPE, "maps/map2/map2-01.png"), 
  new Asset("map3", AssetLoader.IMAGE_TYPE, "maps/map3/map3-01.png"), new Asset("map4", AssetLoader.IMAGE_TYPE, "maps/map4/map4-01.png")], a = [new Asset("winScreen", AssetLoader.HTML_TYPE, "views/victory.html"), new Asset("gameoverScreen", AssetLoader.HTML_TYPE, "views/defeat.html"), new Asset("winView", AssetLoader.JS_TYPE, "views/VictoryView.js"), new Asset("defeatView", AssetLoader.JS_TYPE, "views/DefeatView.js"), new Asset("victoryBG", AssetLoader.IMAGE_TYPE, "img/screens/victoryScreen.png"), 
  new Asset("defeatBG", AssetLoader.IMAGE_TYPE, "img/screens/defeatScreen.png"), new Asset("iconFacebook", AssetLoader.IMAGE_TYPE, "img/ui/iconFacebook.png"), new Asset("iconTwitter", AssetLoader.IMAGE_TYPE, "img/ui/iconTwitter.png"), new Asset("iconWinLive", AssetLoader.IMAGE_TYPE, "img/ui/iconWinLive.png"), new Asset("defeatPlank", AssetLoader.IMAGE_TYPE, "img/ui/defeatPlank.png"), new Asset("victoryPlank", AssetLoader.IMAGE_TYPE, "img/ui/victoryPlank.png")], b = [];
  loadPriority = 1;
  b.push(new SoundAsset(AudioManager.CAPTAIN_ADDED, "audio/units/U-Captain4.mp3", 1, loadPriority));
  b.push(new SoundAsset(AudioManager.CAPTAIN_AHOY, "audio/units/U-Captain2.mp3", 1, loadPriority));
  b.push(new SoundAsset(AudioManager.CAPTAIN_ARGH, "audio/units/U-Captain6.mp3", 1, loadPriority));
  b.push(new SoundAsset(AudioManager.CANNON_ADDED, "audio/units/U-Thug8.mp3", 1, loadPriority));
  b.push(new SoundAsset(AudioManager.SHOOTER_ADDED, "audio/units/U-CabinGirl4.mp3", 1, loadPriority));
  b.push(new SoundAsset(AudioManager.SABRE_ADDED, "audio/units/U-Ponce3.mp3", 1, loadPriority));
  b.push(new SoundAsset(AudioManager.CABIN_BOY_ADDED, "audio/units/U-CabinBoy3.mp3", 1, loadPriority));
  b.push(new SoundAsset(AudioManager.CLICK, "audio/ui/Ul-BttnClk.mp3", 1, loadPriority));
  b.push(new SoundAsset(AudioManager.DAISY_LOST, "audio/ui/UI-CreepwDaisyLifeLost.mp3", 1, loadPriority));
  b.push(new SoundAsset(AudioManager.MUSIC, "audio/music/M-GameBackground.mp3", 1, loadPriority));
  b.push(new SoundAsset(AudioManager.CANNON_IMPACT, "audio/weapons/SFX-CannonImpact.mp3", 1, loadPriority));
  b.push(new SoundAsset(AudioManager.CABIN_BOY_FIRE, "audio/weapons/SFX-MopHitL1.mp3", 1, loadPriority));
  b.push(new SoundAsset(AudioManager.INTRO, "audio/music/M-GameIntro3.mp3", 1, loadPriority));
  b.push(new SoundAsset(AudioManager.OCTOPUS_HURT, "audio/creeps/O-Damage.mp3", 1, loadPriority));
  b.push(new SoundAsset(AudioManager.GULL_HURT, "audio/creeps/S-Damage.mp3", 1, loadPriority));
  b.push(new SoundAsset(AudioManager.KRAKEN_HURT, "audio/creeps/K-Damage.mp3", 1, loadPriority));
  b.push(new SoundAsset(AudioManager.KRAKEN_DEATH, "audio/creeps/K-Death.mp3", 1, loadPriority));
  loadPriority = 1;
  b.push(new SoundAsset(AudioManager.RAT_HURT, "audio/creeps/R-Damage.mp3", 1, loadPriority));
  b.push(new SoundAsset(AudioManager.CRAB_HURT, "audio/creeps/C-Damage.mp3", 1, loadPriority));
  b.push(new SoundAsset(AudioManager.CANNON_FIRE, "audio/weapons/SFX-CannonL1.mp3", 2, loadPriority));
  b.push(new SoundAsset(AudioManager.SHOOTER_FIRE, "audio/weapons/SFX-RevL1.mp3", 5, loadPriority));
  b.push(new SoundAsset(AudioManager.SABRE_FIRE, "audio/weapons/SFX-SabreL2.mp3", 2, loadPriority));
  b.push(new SoundAsset(AudioManager.PLACE_TOWER, "audio/general/GU-Created.mp3", 1, loadPriority));
  b.push(new SoundAsset(AudioManager.UPGRADE, "audio/general/GU-MegaUpgrade.mp3", 1, loadPriority));
  b.push(new SoundAsset(AudioManager.RETIRE, "audio/general/GU-Upgrade.mp3", 1, loadPriority));
  b.push(new SoundAsset(AudioManager.STEAL_DAISY, "audio/general/GU-StealDaisy.mp3", 1, loadPriority));
  loadPriority = 3;
  b.push(new SoundAsset(AudioManager.DEFEAT, "audio/music/M-GameOver2.mp3", 1, loadPriority));
  b.push(new SoundAsset(AudioManager.VICTORY, "audio/music/M-GameIntro2.mp3", 1, loadPriority));
  b.push(new SoundAsset(AudioManager.THUNDER1, "audio/kraken/Thunder1.mp3", 1, loadPriority));
  b.push(new SoundAsset(AudioManager.THUNDER2, "audio/kraken/Thunder2.mp3", 1, loadPriority));
  b.push(new SoundAsset(AudioManager.KRAKEN_MUSIC, "audio/kraken/Kraken_music2.mp3", 1, loadPriority));
  if(skipAudioLoad) {
    b = [b[0]]
  }
  for(var d = 0, g = b.length;d < g;d++) {
    var m = b[d], q = m.numChannels, s = a;
    if(m.loadPriority == 1) {
      s = e
    }else {
      if(m.loadPriority == 2) {
        s = c
      }
    }
    for(var y = 1;y <= q;y++) {
      s.push(new Asset(m.id + "_" + y, AssetLoader.AUDIO_TYPE, m.url))
    }
  }
  assetQueue = [e, c, a];
  loadNextAssetSet()
}
function loadNextAssetSet() {
  if(assetQueue.length > 0) {
    this.assetLoader = new AssetLoader;
    this.assetLoader.addEventListener("progress", handleAssetProgress);
    this.assetLoader.addEventListener("complete", handleAssetsComplete);
    this.assetLoader.load(assetQueue.shift())
  }
}
function createGame() {
  cleanUpGame();
  currentGame = new Game($("#game"));
  currentGame.gameAssetsLoaded = this.gameAssetsLoaded;
  currentGame.addEventListener("lost", handleGameLost);
  currentGame.addEventListener("won", handleGameWon);
  $("#muteBtn").html(AudioManager.muted ? "Unmute" : "Mute");
  return currentGame
}
function cleanUpGame() {
  if(currentGame != null) {
    currentGame.cleanUp();
    currentGame.removeAllListeners();
    currentGame = null
  }
}
function handleAssetProgress(e) {
  e = e.percent;
  if(spritesLoaded) {
    if(assetQueue.length == 2) {
      e = 25 + e * 0.75
    }
  }else {
    e = 0.25 * BitmapModel.numLoaded / BitmapModel.numTotal * 100
  }
  progressBar.setProgress(e / 100)
}
function handleAssetsComplete() {
  if(!this.breakLoad) {
    if(assetQueue.length == 2) {
      BitmapModel.createBitmaps();
      ViewManager.show(ViewManager.START_SCREEN);
      stopFallingDaisies();
      AudioManager.playSoundDelayed(AudioManager.INTRO, 30);
      progressBar.clear();
      loadNextAssetSet()
    }else {
      if(assetQueue.length == 1) {
        if(this.currentGame != undefined && this.gameAssetsLoaded == false) {
          this.currentGame.gameAssetsLoaded = true;
          this.currentGame.load(this.currentGame.mapIndex)
        }
        this.gameAssetsLoaded = true;
        $("#preloader").css("display", "none");
        progressBar.cleanUp();
        this.assetLoader.removeAllListeners();
        loadNextAssetSet();
        DatabaseDelegate.submitAnalytics(DatabaseDelegate.LOAD_COMPLETE)
      }
    }
  }
}
function toggleMute() {
  var e = $("#muteBtn");
  e.html() == "Mute" ? e.html("Unmute") : e.html("Mute");
  AudioManager.mute(e.html() == "Unmute")
}
function togglePause() {
  globalPause(!Tick.isPaused());
  AudioManager.playSound(AudioManager.CLICK)
}
function startNewGame(e, c) {
  if(MapInfo.canPlayMap(e, c)) {
    var a = createGame();
    a.mode = c;
    a.load(e);
    DatabaseDelegate.submitAnalytics(DatabaseDelegate.GAME_START, e, 0, 0)
  }
}
function handleGameQuit() {
  currentGame != null && currentGame.stopGame();
  if(currentGame.demo.active == true) {
    globalPause(false, false);
    currentGame.cleanUp();
    currentGame = null
  }
  AudioManager.stopAllSounds();
  AudioManager.playSound(AudioManager.CLICK);
  AudioManager.playSoundDelayed(AudioManager.INTRO, 500);
  ViewManager.show(ViewManager.START_SCREEN);
  globalPause(true);
  TooltipManager.hide()
}
function handleGameLost() {
  AudioManager.stopAllSounds();
  AudioManager.playSound(AudioManager.DEFEAT);
  ViewManager.show(ViewManager.GAMEOVER_SCREEN);
  DatabaseDelegate.submitAnalytics(DatabaseDelegate.GAME_LOST, currentGame.mapIndex, currentGame.gameInfo.score, currentGame.wave.currentWave);
  TooltipManager.hide()
}
function handleGameWon() {
  AudioManager.stopAllSounds();
  AudioManager.playSound(AudioManager.VICTORY);
  ViewManager.show(ViewManager.WIN_SCREEN);
  DatabaseDelegate.submitAnalytics(DatabaseDelegate.GAME_WON, currentGame.mapIndex, currentGame.gameInfo.score, currentGame.wave.currentWave);
  TooltipManager.hide()
}
function attackSprite(e) {
  currentGame.attackCreep(e.target.id, 20)
}
function handleTickChange(e) {
  globalPause(e.target.checked)
}
function handleResize() {
  var e = $("#piratesLoveDaisies"), c = $("#content"), a = e.height() + 40, b = $(window);
  a = Math.max(5, b.height() - a >> 1);
  c.css("top", a - 35);
  e.css("top", a - 20);
  b = Math.max(5, b.width() - e.width() >> 1);
  e.css("left", b);
  c.css("left", b)
}
function toggleEffects() {
  setEffects(!Game.effectsEnabled)
}
function setEffects(e) {
  Game.effectsEnabled = e;
  currentGame != null && currentGame.toggleEffects(Game.effectsEnabled);
  $("#effects").attr("checked", e)
}
function openLogin(e) {
  var c = "height=370, width=475";
  if(e == "facebook") {
    c = "height=550, width=950"
  }else {
    if(e != "windows") {
      return
    }
  }
  this.loginWindow && this.loginWindow.close();
  this.loginWindow = window.open("http://www.php5.gskinner.com/pirateslovedaisies/db/login.php", "Login", c);
  c = "<form name='vals' id='vals' action='http://www.php5.gskinner.com/pirateslovedaisies/db/login.php' method='post'>";
  c = c + "<input type='hidden' name='type' value='" + e + "' />";
  c = c + "<input type='hidden' name='score' value='" + previousScore + "' />";
  c = c + "<input type='hidden' name='mode' value='" + previousMode + "' />";
  c = c + "<input type='hidden' name='map' value='" + MapInfo.getTitleByIndex(previousMapIndex) + "' />";
  c += "</form>";
  this.window.localStorage.setItem("screenshot", previousScreenshot);
  previousScreenshot.length == 0 && DatabaseDelegate.logError("openLogin()", "previousScreenshot length is 0");
  this.loginWindow.document.write(c);
  this.loginWindow.document.getElementById("vals").submit();
  this.loginWindow.focus()
}
function submitScoreComplete() {
  ViewManager.show(ViewManager.HIGHSCORE_SCREEN, {mapIndex:previousMapIndex, mode:previousMode})
}
$(window).init(init);
