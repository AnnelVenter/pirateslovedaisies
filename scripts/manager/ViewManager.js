function ViewManager() {
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
};