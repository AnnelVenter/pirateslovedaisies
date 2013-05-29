(function(e) {
  function c() {}
  c.VISIT = "Visit";
  c.UNSUPPORTED_BROWSER = "Unsupported Browser";
  c.HELP = "Help";
  c.LOAD_COMPLETE = "Load Complete";
  c.GAME_START = "Game Start";
  c.GAME_WON = "Game Won";
  c.GAME_LOST = "Game Lost";
  c.submitAnalytics = function(a, b, d, g, m) {
    var q = "";
    if (b != null) {
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
    $.ajax({
      url: a,
      dataType: "json",
      async: false,
      success: function() {},
      error: function() {}
    })
  };
  c.submitScore = function(a, b, d) {
    var g = "";
    if (b != null) {
      g = MapInfo.getTitleByIndex(b)
    }
    b = "db/sendScore.php?";
    b += "&map=" + g;
    b += "&mode=" + d;
    b += "&score=" + a;
    $.ajax({
      url: b,
      dataType: "json",
      async: false,
      error: function(m, q, s) {
        trace(q + " - " + s)
      }
    })
  };
  c.logError = function(a, b) {
    $.ajax({
      url: "db/errorLog.php?errorType=" + a + "&errorMessage=" + b + "&userAgent=" + navigator.userAgent,
      dataType: "json",
      async: false
    })
  };
  e.DatabaseDelegate = c
})(window);