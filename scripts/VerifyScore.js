(function(e) {
  function c() {
    this.VerifyScore()
  }
  c.allScores = [];
  c.prototype = {
    VerifyScore: function() {
      EventDispatcher.create(this)
    },
    getAllScores: function() {
      if (c.allScores.length == 0) {
        c.wave = new WaveManager;
        c.assetLoader = new AssetLoader;
        c.assetLoader.removeAllListeners();
        trace("<br />MAX SCORES:<br />")
      } else {
        trace(c.allScores[c.allScores.length - 1])
      }
      if (c.allScores.length <= 4) {
        if (c.allScores.length == 4) {
          trace("<br />")
        } else {
          var a = "maps/map{0}/".supplant(c.allScores.length + 1);
          c.assetLoader.addEventListener("complete", new EventProxy(this, "handleLoad"));
          c.assetLoader.load([new Asset("mapJSON", AssetLoader.JSON_TYPE, a + "map.json"), new Asset("waveJSON", AssetLoader.JSON_TYPE, a + "waves.json")])
        }
      }
    },
    handleLoad: function() {
      c.assetLoader.removeAllListeners();
      var a = LoadedAssets.getAsset("mapJSON"),
        b = LoadedAssets.getAsset("waveJSON"),
        d = c.allScores.length,
        g = 0,
        m = 0,
        q = 0,
        s = m = 0,
        y = MapInfo.getTitleByIndex(d + 1);
      c.wave.reset(b);
      g = this.getWavesScore(c.wave.waves, 1);
      m = this.getWavesCash(c.wave.waves, 1);
      q = b.waves;
      for (s = 0; s < q.length; s++) {
        var A = q[s].units;
        if (A) {
          for (var H = 0; H < A.length; H++) {
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
    },
    getWavesCash: function(a, b) {
      for (var d = 0, g = 0, m = a.length, q = 0; q < m; q++) {
        var s = a[q].totalCreeps * a[q].reward * b;
        d += GameInfo.CURRENT_GOLD_BONUS * s;
        d += GameInfo.CURRENT_GOLD_BONUS * g * 0.3;
        g += s
      }
      d += g * GameInfo.GOLD_BONUS * GameInfo.PIRATE_SALE_MULTIPLIER * 0.7;
      d += g * GameInfo.GOLD_BONUS * 1 * 0.3;
      return d
    },
    getWavesScore: function(a, b) {
      for (var d = 0, g = 0, m = 0, q = 0, s = null, y = null, A = 0, H = a.length, M = 0; M < H; M++) {
        s = a[M];
        A = s.units.length;
        for (var S = m = g = 0; S < A; S++) {
          y = s.units[S];
          d += y.count * BitmapModel.getScoreValue(y.type, y.level * b) * GameInfo.EARLY_KILL_MULTIPLIER;
          q = y.count * y.interval;
          if (q + m > g) {
            g = q + m
          }
          m = y.timing
        }
        d += Math.max(0, (s.nextWave - g) * GameInfo.EARLY_TICK_BONUS)
      }
      return d
    }
  };
  e.VerifyScore = c
})(window);