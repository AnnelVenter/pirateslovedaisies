var currentGame, assetQueue = [], spritesLoaded = false, gameAssetsLoaded = false, skipAudioLoad = false, progressBar, fallingDaisies1, fallingDaisies2, gMode = false, previousMode = "", previousMapIndex = "", previousScore = "", previousScreenshot = "";
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
