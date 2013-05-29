
(function(e) {
  var c = false,
    a;
  if (e.browser.safari) {
    c = true;
    a = "-webkit-border-image"
  } else {
    if (e.browser.mozilla && e.browser.version.substr(0, 3) == "1.9" && parseFloat(e.browser.version.substr(3)) > 1) {
      c = true;
      a = "-moz-border-image"
    }
  }
  e.fn.extend({
    scale9Grid: function(b) {
      var d = b.top || 0,
        g = b.bottom || 0,
        m = b.left || 0,
        q = b.right || 0;
      return e(this).each(function() {
        var s = e(this);
        s.data("layoutGrid") && s.remove9Grid();
        var y = s.css("background-image"),
          A = /url\("?([^\(\)"]+)"?\)/i.exec(y);
        if (!(!A || A.length < 2)) {
          A = A[1];
          e.browser.msie && e.browser.version < 7 && s.css("float") != "none" && s.css("position") == "static" && s.css("position", "relative");
          s.wrapInner('<div class="s9gwrapper"></div>');
          s.find(".s9gwrapper").css({
            "padding-left": s.css("padding-left"),
            "padding-right": s.css("padding-right"),
            "padding-top": s.css("padding-top"),
            "padding-bottom": s.css("padding-bottom"),
            "text-align": s.css("text-align"),
            position: "relative",
            "z-index": "2",
            display: "block",
            "background-color": "transparent",
            "background-image": "none"
          });
          s.css({
            "background-color": "transparent",
            "background-image": "none",
            "border-color": "transparent",
            padding: "0",
            "text-align": "left"
          });
          var H = document.createElement("div");
          s.prepend(H);
          var M = e(H);
          M.css({
            position: "relative",
            width: "0px",
            height: "0px",
            "z-index": "0",
            display: "block"
          });
          M.addClass("s9gbackground");
          if (c) {
            H = {
              "border-width": d + "px " + q + "px " + g + "px " + m + "px ",
              position: "absolute"
            };
            H[a] = y + " " + d + " " + q + " " + g + " " + m + " stretch stretch";
            M.css(H)
          }
          var S, V, G = 0,
            k = 0,
            W = [],
            ia = function() {
              var ba = s.innerWidth(),
                ja = s.innerHeight();
              if (!(ba < m + q || ja < d + g || ba == G && ja == k)) {
                if (c) {
                  M.css({
                    width: ba - m - q + "px",
                    height: ja - d - g + "px"
                  })
                } else {
                  G = ba;
                  k = ja;
                  for (var pa = 0, za = W.length, qa = 0; qa < ja;) {
                    var ta, ua;
                    if (qa == 0) {
                      ua = "top";
                      ta = Math.min(V - g, ja - g)
                    } else {
                      if (qa + V - d >= ja) {
                        ua = "bottom";
                        ta = ja - qa
                      } else {
                        ua = "center";
                        ta = Math.min(V - d - g, ja - qa - g)
                      }
                    }
                    for (var la = 0; la < ba; pa++) {
                      var ra;
                      if (pa < za) {
                        ra = W[pa]
                      } else {
                        cellElement = document.createElement("div");
                        M.append(cellElement);
                        ra = e(cellElement);
                        ra.css({
                          position: "absolute",
                          "background-image": y
                        });
                        W.push(ra)
                      }
                      var sa, va;
                      if (la == 0) {
                        va = "left";
                        sa = Math.min(S - q, ba - q)
                      } else {
                        if (la + S - g >= ba) {
                          va = "right";
                          sa = ba - la
                        } else {
                          va = "center";
                          sa = Math.min(S - m - q, ba - la - q)
                        }
                      }
                      ra.css({
                        left: la + "px",
                        top: qa + "px",
                        width: sa + "px",
                        height: ta + "px",
                        "background-position": ua + " " + va
                      });
                      la += sa
                    }
                    qa += ta
                  }
                  for (ba = pa; ba < za; ba++) {
                    W[ba].remove()
                  }
                  W.splice(pa, W.length - pa)
                }
              }
            }, ga = new Image;
          e(ga).load(function() {
            if (!(ga.width < m + q || ga.height < d + g)) {
              S = ga.width;
              V = ga.height;
              ia();
              e(window).resize(ia)
            }
          }).attr("src", A);
          s.data("layoutGrid", ia)
        }
      })
    },
    remove9Grid: function() {
      return e(this).each(function() {
        var b = e(this);
        if (b.data("layoutGrid")) {
          e(window).unbind("resize", b.data("layoutGrid"));
          b.removeAttr("style");
          var d = b.find(".s9gwrapper").contents();
          b.prepend(d);
          b.find(".s9gwrapper").remove();
          b.find(".s9gbackground").remove();
          b.removeData("layoutGrid")
        }
      })
    }
  })
})(jQuery);
