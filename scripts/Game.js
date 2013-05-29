(function(e) {
  function c(b) {
    this.Game(b)
  }

  function a() {}
  c.uniqueID = 0;
  c.effectsEnabled = false;
  c.prototype = {
    Game: function(b) {
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
    },
    generateScreenshot: function(b) {
      var d = document.createElement("canvas");
      d.width = b.gameCanvas.width;
      d.height = b.gameCanvas.height;
      var g = d.getContext("2d"),
        m = $("#backgroundImage").get(0);
      g.drawImage(m, 0, 0);
      g.drawImage(b.gameCanvas, 0, 0);
      g = new Image;
      d = d.toDataURL("image/png");
      g.src = d;
      d = d.split("base64,")[1];
      b.screenshot = d
    },
    blockShortcuts: function(b) {
      switch (b.keyCode) {
        case KeyShortcuts.UPGRADE:
          return false
      }
    },
    handleKeyUp: function(b) {
      if (!(this.gameStatus == a.PAUSED && this.demo.active == false)) {
        switch (b.keyCode) {
          case KeyShortcuts.NUM_1:
            ;
          case KeyShortcuts.NUM_2:
            ;
          case KeyShortcuts.NUM_3:
            ;
          case KeyShortcuts.NUM_4:
            ;
          case KeyShortcuts.NUM_5:
            if (this.demo.active && (this.demo.stepName != DemoController.HIRE || b.keyCode != KeyShortcuts.NUM_1)) {
              break
            }
            this.resetUI();
            this.bottomNavigation.simulateHire(b.keyCode - KeyShortcuts.NUM_1);
            this.mouseMove(true);
            break;
          case KeyShortcuts.ESCAPE:
            if (this.demo.active) {
              break
            }
            this.resetUI();
            break;
          case KeyShortcuts.RETIRE:
            if (this.demo.active) {
              break
            }
            this.selectedPirate != null && this.handleRetire(null);
            break;
          case KeyShortcuts.UPGRADE:
            if (this.demo.active && this.demo.stepName != DemoController.UPGRADE) {
              break
            }
            this.selectedPirate != null && this.bottomNavigation.simulateUpgrade();
            break;
          case KeyShortcuts.NEXT_WAVE:
            if (this.demo.active) {
              if (this.demo.stepName != DemoController.BEGIN) {
                break
              }
            } else {
              if (Tick.isPaused()) {
                break
              }
            }
            this.wave.getCurrentWave().wavesLeft <= 0 && this.totalActiveCreeps == 0 && this.wave.sendNextWave();
            break
        }
      }
    },
    resetUI: function() {
      if (this.selectedPirate != null) {
        this.clickSprite(true);
        this.bottomNavigation.setMode("hire")
      } else {
        this.currentDropType != null && this.showAvailableDropLocations(false)
      }
    },
    spriteSortFunction: function(b, d) {
      var g = b.y + b.x * 0.1,
        m = d.y + d.x * 0.1;
      return g > m ? 1 : g < m ? -1 : 0
    },
    handleGameClick: function() {
      if (Tick.isPaused() && !this.demo.active) {
        globalPause(false)
      } else {
        switch (this.gameClickMode) {
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
    },
    clickSprite: function(b) {
      var d = this.selectedPirate;
      if (d != null) {
        if (this.demo.active) {
          return
        }
        this.selectedPirate = d.bitmapSequence.shadow = null;
        this.drawRange(null)
      }
      if (b != true) {
        b = this.getGameTile(this.lastPosition.x, this.lastPosition.y);
        if (b != null) {
          d = this.selectedPirate = b.mapData.sprite;
          if (this.demo.active) {
            if (d != null && this.demo.stepName == DemoController.SELECT) {
              this.demo.next()
            } else {
              return
            }
          }
          if (d == null) {
            this.bottomNavigation.setMode("hire")
          } else {
            d.bitmapSequence.shadow = Pirate.SELECTED_DROPSHADOW;
            this.drawRange(d);
            this.bottomNavigation.setEditMode(d.data)
          }
        }
      }
    },
    handleGameMouseMove: function(b) {
      this.mousePositionChanged = true;
      this.lastPosition.x = b.pageX;
      this.lastPosition.y = b.pageY
    },
    mouseMove: function(b) {
      if (!Tick.isPaused()) {
        var d = this.getGameTile(this.lastPosition.x, this.lastPosition.y);
        if (!(d == null || b != true && d == this.lastTile)) {
          switch (this.gameClickMode) {
            case "default":
              if (this.lastTile != null) {
                b = this.lastTile.mapData.sprite;
                if (b != null && b != this.selectedPirate) {
                  b.bitmapSequence.shadow = null
                }
              }
              this.lastTile = d;
              this.highlightPirate(d, true);
              break;
            case "placeTower":
              this.lastTile != null && this.clearUI();
              b = false;
              if (this.demo.active) {
                if (this.demo.stepName == DemoController.PLACE && d.index == 222) {
                  b = true
                }
              } else {
                if (d.mapData.value == HexTile.TOWER && d.mapData.sprite == null) {
                  b = true
                }
              }
              if (b) {
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
    },
    highlightPirate: function(b, d) {
      var g = b.mapData.sprite;
      if (!(g == null || g == this.selectedPirate)) {
        g.bitmapSequence.shadow = d ? Pirate.ROLL_OVER_DROPSHADOW : null
      }
    },
    drawRange: function(b) {
      this.uiContext.save();
      this.clearUI();
      if (b != null) {
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
    },
    clearUI: function() {
      this.uiContext.clearRect(0, 0, this.uiCanvas.width, this.uiCanvas.height)
    },
    attackCreep: function(b, d) {
      var g = this.activeCreeps[b];
      g != null && g.applyDamage(d)
    },
    load: function(b) {
      this.mapIndex = b;
      this.mapTitle = MapInfo.getTitleByIndex(this.mapIndex);
      ViewManager.hide(ViewManager.START_SCREEN);
      if (this.gameAssetsLoaded == true) {
        b = "maps/map{0}/".supplant(b);
        waveFile = "waves.json";
        mapFile = "map.json";
        idleFile = "idles.json";
        this.assetLoader = new AssetLoader;
        this.assetLoader.addEventListener("complete", new EventProxy(this, "handleAssetsComplete"));
        this.assetLoader.load([new Asset("mapJSON", AssetLoader.JSON_TYPE, b + mapFile), new Asset("waveJSON", AssetLoader.JSON_TYPE, b + waveFile), new Asset("idleJSON", AssetLoader.JSON_TYPE, b + idleFile)])
      }
    },
    pause: function() {
      if (this.gameStatus == a.PLAYING) {
        this.resumeStatus = this.gameStatus;
        this.gameStatus = a.PAUSED;
        if (!this.demo.active) {
          var b = this.effectsContext,
            d = this.effectsCanvas;
          b.fillStyle = "rgba(0,0,0,0.5)";
          b.fillRect(0, 0, d.width, d.height);
          b.fillStyle = "#fff";
          b.font = "italic 30px freeBooterFont";
          b.textBaseline = "top";
          b.fillText("Paused. Click to resume.", (d.width >> 1) - 115, 200)
        }
      }
    },
    resume: function() {
      if (this.gameStatus == a.PAUSED) {
        this.gameStatus = this.resumeStatus
      }
    },
    stopGame: function() {
      this.pause()
    },
    resumeGame: function() {
      this.resume();
      ViewManager.show(ViewManager.GAME_SCREEN);
      AudioManager.stopAllSounds();
      this.music = AudioManager.playSound(AudioManager.MUSIC, true);
      globalPause(false);
      this.demo.active && this.demo.showNextStep();
      this.kraken != null && this.kraken.active && this.kraken.resume()
    },
    handleAssetsComplete: function() {
      this.initMap(LoadedAssets.getAsset("mapJSON"));
      this.assetLoader.removeAllListeners();
      ViewManager.show(ViewManager.GAME_SCREEN);
      AudioManager.stopAllSounds();
      this.music = AudioManager.playSound(AudioManager.MUSIC, true)
    },
    cleanUp: function() {
      Tick.removeListener(this, true);
      this.gameInfo.removeAllListeners();
      this.wave && this.wave.cleanUp();
      for (var b = 0, d = this.daisyList.length; b < d; b++) {
        this.daisyList[b].dispose()
      }
      this.daisyList = this.daisyHash = this.activeTargets = null;
      if (this.activeCreeps != null) {
        for (var g in this.activeCreeps) {
          this.activeCreeps.hasOwnProperty(g) && this.activeCreeps[g].dispose()
        }
        this.activeCreeps = null
      }
      b = 0;
      for (d = this.pirateList.length; b < d; b++) {
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
    },
    reset: function() {
      var b = this.mapJson.daisyData,
        d;
      d = this.mode == GameInfo.SUDDEN_DEATH_MODE ? b.slice(0, 2) : b.slice(0);
      b = 0;
      for (var g = d.length; b < g; b++) {
        var m = d[b],
          q = d[++b],
          s = BitmapModel.getBitmap("daisy"),
          y = this.hexMapModel.getTileAtPosition(m, q);
        s.x = m - this.xOffset;
        s.y = q;
        m = new Daisy(s, this.daisyContainer, y);
        this.addDaisy(m, y, Daisy.PLANTED);
        this.daisyList.push(m)
      }
      this.dispatchEvent("ready");
      if (this.wave == null) {
        this.wave = new WaveManager;
        this.wave.addEventListener("addSprite", new EventProxy(this, "handleWaveSendSprite"));
        this.wave.addEventListener("nextWave", new EventProxy(this, "handleNextWave"));
        this.wave.addEventListener("complete", new EventProxy(this, "handleWavesComplete"));
        this.wave.addEventListener("waveComplete", new EventProxy(this, "handleWaveComplete"))
      }
      d = $.extend(true, {}, LoadedAssets.getAsset("waveJSON"));
      if (this.mode == GameInfo.EPIC_MODE) {
        g = d.waves;
        for (b = 0; b < g.length; b++) {
          g[b].interval *= GameInfo.EPIC_INTERVAL_MULTIPLIER;
          if (y = g[b].units) {
            for (m = 0; m < y.length; m++) {
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
    },
    handleNextWave: function(b) {
      this.demo != null && this.demo.stepName == DemoController.BEGIN && this.demo.next();
      this.captain != null && this.captain.motivate();
      this.gameInfo.addScore(this.gameInfo.money * GameInfo.CURRENT_GOLD_BONUS);
      this.gameInfo.addScore(b.timeBonus * GameInfo.EARLY_TICK_BONUS);
      this.screenTimeout && clearTimeout(this.screenTimeout);
      var d = this;
      this.screenTimeout = setTimeout(function() {
        d.generateScreenshot(d)
      }, 2E4)
    },
    handleWavesComplete: function() {
      this.checkGameStatus()
    },
    addDaisy: function(b, d, g) {
      this.daisyHash.addItem(d.index, b);
      b.tile = d;
      b.setState(g)
    },
    handleHire: function(b) {
      if (this.demo.active && this.demo.stepName == DemoController.HIRE) {
        this.demo.next()
      } else {
        if (Tick.isPaused()) {
          return
        }
      }
      if (b.pirateData == this.currentDropType || this.currentDropType == null) {
        this.showAvailableDropLocations(true, b.pirateData)
      } else {
        this.currentDropType = b.pirateData;
        this.bottomNavigation.setSelected(b.pirateData)
      }
    },
    handleUpgrade: function() {
      if (this.demo.active) {
        if (this.demo.stepName == DemoController.UPGRADE) {
          this.demo.next()
        } else {
          return
        }
      }
      var b = this.selectedPirate;
      if (b != null) {
        b.upgrade();
        b == this.captain && this.updateMotivation(b);
        this.bottomNavigation.setEditMode(b.data);
        this.gameInfo.addMoney(-b.data.cost);
        this.drawRange(b);
        AudioManager.playSound(AudioManager.UPGRADE)
      }
    },
    handleRetire: function() {
      if (this.selectedPirate != null) {
        var b = this.selectedPirate;
        this.gameInfo.addMoney(b.data.resale);
        this.pirateList.removeItem(b);
        if (b == this.captain) {
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
    },
    handleWaveSendSprite: function(b) {
      if (this.availableDaisies != 0) {
        b = b.data;
        var d = BitmapModel.getBitmap(b.type),
          g, m = this.entryTiles.slice().randomSort();
        if (b.exits) {
          g = [];
          for (var q = 0, s = b.exits.length; q < s; q++) {
            var y = this.entryTiles[b.exits[q]];
            y != null && g.push(y)
          }
          g = g.randomSort().concat(m)
        } else {
          g = m
        }
        var A, H, M;
        q = 0;
        s = g.length;
        a: for (; q < s; q++) {
          A = this.hexMapModel.getTileAtIndex(g[q]);
          H = this.findClosestDaisyTile(A);
          if (H == null) {
            break
          }
          M = this.hexMapModel.findPath(A, H, null, d.data.ignoresImpassible);
          if (M != null) {
            break
          }
          m = 0;
          y = this.daisyList.length;
          for (; m < y; m++) {
            var S = this.daisyList[m];
            if (S.state != Daisy.PICKED) {
              H = S.tile;
              M = this.hexMapModel.findPath(A, H, null, d.data.imapassable);
              if (M != null) {
                break a
              }
            }
          }
        }
        if (H == null) {
          trace("** No daisy tiles found for new creep.")
        } else {
          if (M == null) {
            trace("** No path found to ANY daisy for new creep.")
          } else {
            M.unshift(A);
            M.push(H);
            d.x = A.x - this.xOffset;
            d.y = A.y;
            A = "shadow";
            if (b.type == "rat" || b.type == "gull") {
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
            if (b.type == "kraken") {
              if (this.kraken == null) {
                this.kraken = new KrakenController(this, true)
              }
              this.kraken.addKraken()
            }
            this.dispatchEvent("change")
          }
        }
      }
    },
    findAvailableDaisyTile: function() {
      var b, d = this.daisyList.length,
        g = 0;
      this.daisyList.randomSort();
      do {
        b = this.daisyList[g]
      } while (b != null && b.state == Daisy.PICKED && g++ < d);
      return b != null ? b.tile : null
    },
    findClosestDaisyTile: function(b) {
      for (var d, g = Number.MAX_VALUE, m, q = this.hexMapModel.calculateDistance, s = 0, y = this.daisyList.length; s < y; s++) {
        d = this.daisyList[s];
        if (d.state != Daisy.PICKED) {
          d = d.tile;
          var A = Math.min(g, q(d, b));
          if (A < g) {
            g = A;
            m = d
          }
        }
      }
      return m != null ? m : this.findAvailableDaisyTile()
    },
    findPickedDaisy: function() {
      for (var b, d = this.daisyList.length, g = 0;;) {
        b = this.daisyList[g];
        if (b != null && b.state != Daisy.PICKED && b.state != Daisy.DROPPED) {
          break
        }
        if (g++ >= d - 1) {
          break
        }
      }
      return b
    },
    handleCreepFoundDaisy: function(b) {
      b = b.target;
      if (b.daisy != null) {
        trace("Found Daisy, but I have one already.", b);
        throw Error("Already have daisy");
      }
      var d = b.targetTile;
      b.gettingDroppedDaisy = false;
      this.activeTargets.removeItemFrom(b, d.index);
      var g = this.daisyHash.removeRandom(d.index);
      if (g != null) {
        g.owner = b;
        g.setState(Daisy.PICKED);
        g.sprite.gotoAndStop("indicator");
        b.addDaisy(g);
        this.sendCreepHome(b);
        AudioManager.playSound(AudioManager.STEAL_DAISY);
        this.captain != null && AudioManager.playSoundDelayed(AudioManager.CAPTAIN_ARGH, 500)
      } else {
        this.sendCreepToDaisy(b)
      }
      b = this.daisyHash[d.index];
      if (!(b == null || b.length > 0)) {
        for (d = this.activeTargets.removeContainer(d.index); d.length;) {
          b = d.pop();
          if (b.daisy == null) {
            b.gettingDroppedDaisy = false;
            g = this.findAvailableDaisyTile();
            g == null ? this.sendCreepHomeLater(b) : this.sendCreepToDaisy(b, g)
          }
        }
      }
    },
    sendCreepHomeLater: function(b) {
      b.removeEventListener("end", this.handleCreepFoundDaisyProxy);
      b.addEventListener("end", this.handleCreepReadyForHomeProxy);
      b.sendHomeEarly()
    },
    handleCreepReadyForHome: function(b) {
      b = b.target;
      b.removeEventListener("end", this.handleCreepReadyForHomeProxy);
      this.sendCreepHome(b)
    },
    sendCreepToDaisy: function(b, d) {
      if (b.sprite != null) {
        b.removeEventListener("end", this.handleCreepHomeProxy);
        b.addEventListener("end", this.handleCreepFoundDaisyProxy);
        var g = d;
        if (g == null) {
          g = this.findClosestDaisyTile(this.hexMapModel.getTileAtPosition(b.sprite.x + this.xOffset, b.sprite.y));
          if (g == null) {
            this.sendCreepHome(b);
            return
          }
        }
        for (var m = null, q = this.daisyList.length, s = this.hexMapModel.getTileAtPosition(b.sprite.x + this.xOffset, b.sprite.y); q--;) {
          m = this.hexMapModel.findPath(s, g, null, b.data.ignoresImpassible, true);
          if (m != null) {
            break
          }
          g = this.findClosestDaisyTile(s)
        }
        if (m == null) {
          this.sendCreepHome(b)
        } else {
          this.activeTargets.removeItemFrom(b, b.targetTile.index);
          this.activeTargets.addItem(g.index, b);
          m.unshift(s);
          m.push(g);
          b.targetTile = g;
          b.setPath(m);
          b.goingHome = false
        }
      }
    },
    sendCreepHome: function(b) {
      b.removeEventListener("end", this.handleCreepFoundDaisyProxy);
      b.addEventListener("end", this.handleCreepHomeProxy);
      var d = b.data.exits,
        g = this.hexMapModel.getTileAtPosition(b.sprite.x + this.xOffset, b.sprite.y),
        m, q;
      if (d) {
        d.randomSort();
        for (var s = 0, y = d.length; s < y; s++) {
          m = this.hexMapModel.getTileAtIndex(this.findExitTile(d, s));
          q = this.hexMapModel.calculatePath(g, m, null, b.data.ignoresImpassible);
          if (q != null) {
            break
          }
        }
      } else {
        s = 0;
        for (y = this.entryTiles.length * 3; s < y; s++) {
          m = this.hexMapModel.getTileAtIndex(this.entryTiles.findRandom());
          q = this.hexMapModel.calculatePath(g, m, null, b.data.ignoresImpassible);
          if (q != null) {
            break
          }
        }
      }
      if (q == null) {
        trace("Unable to find path home for " + b);
        this.removeCreep(b)
      } else {
        q.unshift(g);
        q.push(m);
        b.targetTile = m;
        this.activeTargets.addItem(m.index, b);
        b.setPath(q);
        b.goingHome = true
      }
    },
    findExitTile: function(b, d) {
      d = isNaN(d) && b != null ? b.findRandom() : b != null && d < b.length ? b[d] : Math.random() * this.entryTiles.length | 0;
      return this.entryTiles[d]
    },
    handleCreepHome: function(b) {
      b = b.target;
      var d = b.removeDaisy();
      if (d != null) {
        this.daisyList.removeItem(d);
        d.owner = null;
        d.dispose();
        this.gameInfo.loseDaisy();
        AudioManager.playSound(AudioManager.DAISY_LOST)
      }
      if (this.daisyList.length == 0 || b.type != "kraken") {
        this.removeCreep(b)
      } else {
        d = this.findClosestDaisyTile(this.hexMapModel.getTileAtPosition(b.sprite.x, b.sprite.y));
        d == null ? this.removeCreep(b) : this.sendCreepToDaisy(b, d)
      }
    },
    handleCreepDeath: function(b) {
      b = b.target;
      var d = b.removeDaisy();
      if (d != null) {
        d.owner = null;
        var g = this.hexMapModel.getTileAtPosition(b.sprite.x + this.xOffset, b.sprite.y);
        if (g.mapData.impassable) {
          for (var m = g.neighbors, q = false, s = 0, y = m.length; s < y; s++) {
            if ((g = m[s]) && g.mapData.value == HexTile.CREEP) {
              this.addDaisy(d, g, Daisy.DROPPED);
              d.sprite.x = g.x - this.xOffset;
              d.sprite.y = g.y;
              q = true;
              break
            }
          }
          q || this.addDaisy(d, d.originalTile, Daisy.RETURNED)
        } else {
          d.sprite.x = b.sprite.x;
          d.sprite.y = b.sprite.y;
          this.addDaisy(d, g, Daisy.DROPPED)
        }
        this.sendCreepToDroppedDaisy(d.tile)
      } else {
        b.gettingDroppedDaisy && this.sendCreepToDroppedDaisy(b.targetTile)
      }
      this.removeCreep(b);
      d = BitmapModel.getScoreValue(b.sprite.name, b.waveValues.level);
      g = Tick.getTicks(true) - b.startTick;
      q = 1;
      s = GameInfo.EARLY_BONUS_START * Tick.fps;
      m = GameInfo.EARLY_BONUS_END * Tick.fps;
      if (g <= s) {
        q = GameInfo.EARLY_KILL_MULTIPLIER
      } else {
        if (g < m) {
          g -= s;
          m -= s;
          q = GameInfo.EARLY_KILL_MULTIPLIER - 1;
          q = 1 + (q - q * (g / m))
        }
      }
      this.gameInfo.addScore(d * q);
      b = this.wave.waveHash[b.waveValues.waveID].reward;
      if (currentGame.mode == GameInfo.EPIC_MODE) {
        b *= GameInfo.EPIC_GOLD_MULTIPLIER
      }
      this.gameInfo.addMoney(b)
    },
    sendCreepToDroppedDaisy: function(b) {
      var d, g, m = Number.MAX_VALUE,
        q = {}, s = 0;
      for (var y in this.activeCreeps) {
        if (this.activeCreeps.hasOwnProperty(y)) {
          var A = this.activeCreeps[y];
          if (A.daisy == null) {
            if (!A.gettingDroppedDaisy) {
              var H = this.hexMapModel.getTileAtPosition(A.sprite.x + this.xOffset, A.sprite.y);
              if (q[H.index] == null) {
                var M = Math.min(m, this.hexMapModel.calculateDistance(H, b));
                q[H.index] = M;
                if (A.goingHome && (A.type == "kraken" || M < 100 || Math.random() < 0.4)) {
                  A.gettingDroppedDaisy = true;
                  this.sendCreepToDaisy(A, H);
                  s++
                } else {
                  if (!(s > 0)) {
                    if (d == null) {
                      d = A;
                      g = H
                    } else {
                      if (M < m) {
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
      if (s == 0 && d != null) {
        d.gettingDroppedDaisy = true;
        this.sendCreepToDaisy(d, g)
      }
    },
    checkGameStatus: function() {
      if (this.daisyList.length == 0) {
        this.gameOver(a.LOST)
      } else {
        this.totalActiveCreeps == 0 && this.wave.complete && this.gameOver(a.WON)
      }
    },
    gameOver: function(b) {
      this.gameStatus = b;
      this.gameOverTimer = 1.5 * Tick.fps;
      this.wave.stop();
      for (var d in this.activeCreeps) {
        this.activeCreeps.hasOwnProperty(d) && this.activeCreeps[d].leaveGame()
      }
      this.activeCreeps = null;
      clearTimeout(this.screenTimeout);
      this.screenTimeout = null
    },
    tick: function() {
      if (this.mousePositionChanged) {
        this.mouseMove();
        this.mousePositionChanged = false
      }
      if (!(this.gameStatus == a.PAUSED && this.demo.active != true)) {
        switch (this.gameStatus) {
          case a.WON:
            ;
          case a.LOST:
            this.gameOverTimer--;
            if (this.gameOverTimer <= 0) {
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
        for (var g = 0, m = this.effectsList.length; g < m; g++) {
          b = this.effectsList[g];
          if (b.enabled) {
            d.save();
            b.update(d, this.effectsCanvas.width, this.effectsCanvas.height);
            d.globalAlpha = 1;
            d.restore()
          }
        }
      }
    },
    removeCreep: function(b) {
      this.totalActiveCreeps--;
      this.activeCreeps && delete this.activeCreeps[b.sprite.id];
      this.checkGameStatus();
      this.activeTargets.removeItemFrom(b, b.targetTile.index);
      this.totalActiveCreeps <= 0 && this.wave.getCurrentWave().ended && this.bottomNavigation.nextWave.removeLastCreep();
      b.type == "kraken" && this.kraken.removeKraken();
      b.leaveGame()
    },
    destroyCreep: function(b) {
      b = b.target;
      (b.isAir ? this.airShadowContainer : this.groundEffectsContainer).removeChild(b.shadowBitmap);
      BitmapModel.saveBitmap(b.shadowBitmap);
      b.dispose()
    },
    initMap: function(b) {
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
      for (var m = this.entryTiles.length; b < m; b++) {
        g[this.entryTiles[b]] = true
      }
      var q = [];
      b = 0;
      for (m = d.length; b < m; b++) {
        var s = d[b];
        q.push({
          impassable: s != 2,
          value: s,
          entry: g[b]
        })
      }
      this.hexMapModel = new HexMapModel(this.cols, this.rows, q, this.tileSize);
      this.xOffset = (this.rows - (this.rows % 2 == 0 ? 2 : 1)) / 2 * this.hexMapModel.getMetrics().getColumnWidth();
      this.reset();
      this.gameOverlay.click($.proxy(this.handleGameClick, this));
      this.gameOverlay.mousemove($.proxy(this.handleGameMouseMove, this));
      this.effectsList = [];
      d = this.mapJson.effects;
      if (d != null) {
        b = 0;
        for (m = d.length; b < m; b++) {
          switch (d[b]) {
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
      if (LocalStorage.getMapPlayed(2)) {
        LocalStorage.setMapPlayed(this.mapIndex, this.mode)
      } else {
        this.demo.addEventListener("change", new EventProxy(this, "handleNextDemo"));
        this.demo.addEventListener("complete", new EventProxy(this, "handleDemoComplete"));
        this.demo.start();
        globalPause(true, true)
      }
      this.toggleEffects(c.effectsEnabled)
    },
    toggleEffects: function(b) {
      for (var d, g = 0, m = this.effectsList.length; g < m; g++) {
        d = this.effectsList[g];
        if (d.name == "cloudEffect") {
          d.setVisible(b);
          d.setEnabled(true)
        } else {
          d.setEnabled(b)
        }
      }
      this.groundEffectsContainer.visible = b;
      this.airShadowContainer.visible = b;
      this.idleManager.setEnabled(b)
    },
    handleNextDemo: function() {
      this.demo.active && this.bottomNavigation.setDemoMode(this.demo.step)
    },
    handleDemoComplete: function() {
      LocalStorage.setMapPlayed(this.mapIndex, this.mode);
      this.dropMarkers = null;
      this.bottomNavigation.setDemoMode(-1);
      globalPause(false, false)
    },
    clearTiles: function() {
      this.tileContext.clearRect(0, 0, this.tileCanvas.width, this.tileCanvas.height)
    },
    showAvailableDropLocations: function(b, d) {
      if (this.dropMarkerContainer.visible = b) {
        if (!(d.pirateType == "captain" && this.captain != null)) {
          var g, m;
          m = this.demo.active && this.demo.stepName == DemoController.PLACE ? [this.hexMapModel.getTileAtIndex(222)] : this.hexMapModel.getTiles();
          if (!this.dropMarkers) {
            this.dropMarkers = {};
            this.dropMarkerContainer.removeAllChildren();
            var q = 0;
            for (g = m.length; q < g; q++) {
              var s = m[q];
              if (s.mapData.value == 4) {
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
          for (g = m.length; q < g; q++) {
            s = m[q];
            if (s.mapData.value == 4 && s.mapData.sprite == null) {
              this.validTiles[s.index] = true;
              this.dropMarkers[s.index].visible = true;
              if (this.demo.active) {
                y.shadow = Pirate.ROLL_OVER_DROPSHADOW
              }
            } else {
              if (this.dropMarkers[s.index]) {
                this.dropMarkers[s.index].visible = false
              }
            }
          }
          this.currentDropType = d;
          this.bottomNavigation.setSelected(d);
          this.gameClickMode = "placeTower"
        }
      } else {
        this.clearUI();
        this.gameClickMode = "default";
        this.bottomNavigation.setSelected(null);
        this.currentDropType = null
      }
    },
    getGameTile: function(b, d) {
      if (this.hexMapModel != null) {
        var g = $("#gameOverlay").offset();
        return this.hexMapModel.getTileAtPosition(b - g.left + this.xOffset, d - g.top)
      }
    },
    placeTower: function() {
      var b = this.currentDropType,
        d = this.getGameTile(this.lastPosition.x, this.lastPosition.y);
      if (this.demo.active) {
        if (this.demo.stepName != DemoController.PLACE) {
          return
        }
        if (d == null || d.index != 222) {
          return
        }
        this.demo.next()
      }
      this.currentDropType = null;
      if (d == null) {
        this.showAvailableDropLocations(false)
      } else {
        if (this.validTiles[d.index]) {
          var g = BitmapModel.getBitmap(b.pirateType),
            m = BitmapModel.getBitmap("shadowSmall");
          g.name = b.pirateType;
          g.x = m.x = d.x - this.xOffset;
          g.y = m.y = d.y;
          this.groundEffectsContainer.addChild(m);
          b = new Pirate(g, m, this.groundContainer, this.xOffset, b, d.index, this.activeCreeps);
          var q;
          switch (g.name) {
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
        } else {
          this.showAvailableDropLocations(false)
        }
      }
    },
    setCaptain: function(b) {
      this.captain = b;
      this.captain.addEventListener("faceShore", $.proxy(this, "handleFaceShore"));
      this.bottomNavigation.setCaptain(this.captain)
    },
    handleFaceShore: function() {
      for (var b = this.gameCanvas.width >> 1, d = this.gameCanvas.height >> 1, g = 0, m, q = 0, s = this.pirateList.length; q < s; q++) {
        m = this.pirateList[q];
        if (!m.targetCreep) {
          if (this.mapTitle == MapInfo.HIDDEN_HIDEAWAY) {
            g = m.sprite.y > d ? 4 : 1
          } else {
            if (this.mapTitle == MapInfo.TREASURE_ISLAND) {
              var y = m.sprite.x > b ? false : true,
                A = m.sprite.y > d ? true : false;
              g = 1;
              if (y && A) {
                g = 5
              } else {
                if (!y && A) {
                  g = 4
                } else {
                  if (!y && !A) {
                    g = 2
                  }
                }
              }
            }
          }
          m.targetDirection = g
        }
      }
    },
    updateMotivation: function(b) {
      if (this.captain != null) {
        var d = this.captain.data.range,
          g = this.captain.data.motivation,
          m = this.captain.sprite.x,
          q = this.captain.sprite.y
      }
      if (b != null && b != this.captain) {
        var s = Math.sqrt(Math.pow(b.sprite.x - m, 2) + Math.pow(b.sprite.y - q, 2));
        b.setMotivation(s <= d ? g : 1, this.captain == null ? null : this.captain.currentLevel)
      }
      for (var y = 0, A = this.pirateList.length; y < A; y++) {
        b = this.pirateList[y];
        if (this.captain == null || b == this.captain) {
          b.setMotivation(1)
        } else {
          s = Math.sqrt(Math.pow(b.sprite.x - m, 2) + Math.pow(b.sprite.y - q, 2));
          b.setMotivation(s <= d ? g : 1, this.captain.currentLevel)
        }
      }
    },
    handlePirateFire: function(b) {
      b = b.projectile;
      this.topContainer.addChild(b.sprite);
      b.addEventListener("projectileComplete", this.projectileCompleteProxy)
    },
    handleProjectileComplete: function(b) {
      var d = b.target;
      d.removeEventListener("projectileComplete", this.projectilCompleteProxy);
      this.topContainer.removeChild(d.sprite);
      BitmapModel.saveBitmap(d.sprite);
      b = b.explosion;
      if (b != null) {
        d.addEventListener("explosionComplete", this.explosionCompleteProxy);
        this.topContainer.addChild(b)
      } else {
        this.projectile.dispose()
      }
    },
    handleExplosionComplete: function(b) {
      b = b.target;
      b.removeEventListener("explosionComplete", this.explosionCompleteProxy);
      this.topContainer.removeChild(b.sprite);
      b.dispose()
    },
    proxyEvent: function(b) {
      b.data.handleEvent(b)
    },
    drawMap: function(b) {
      this.tileContext.globalAlpha = b || 0.75;
      if (b != 0) {
        this.tileContext.clearRect(this.tileCanvas.width, this.tileCanvas.height);
        b = 0;
        for (var d = this.tileCount; b < d; b++) {
          var g = this.hexMapModel.getTileAtIndex(b),
            m = "#ccffaa";
          if (g.mapData.impassable) {
            m = "#cccccc"
          } else {
            if (g.mapData.entry) {
              m = "#00ffcc"
            } else {
              if (g.mapData.value == 4) {
                m = "#336699"
              }
            }
          }
          this.drawHexTile(this.hexMapModel.getTilePoints(g), this.tileContext, m)
        }
      }
    },
    drawHexTile: function(b, d, g, m) {
      if (b != null) {
        if (m == null) {
          m = 1
        }
        d.lineWidth = 0.5;
        d.fillStyle = g;
        d.beginPath();
        g = 0;
        for (var q = b.length; g < q; g++) {
          p = b[g];
          d.lineTo((p.x - this.xOffset) * m, p.y * m)
        }
        d.closePath();
        d.stroke();
        d.fill()
      }
    },
    toString: function() {
      return "[Game " + this.id + "]"
    }
  };
  e.Game = c;
  a.STARTING = "starting";
  a.PLAYING = "playing";
  a.PAUSED = "paused";
  a.WON = "won";
  a.LOST = "lost";
  a.OVER = "over";
  e.GameStatus = a
})(window);