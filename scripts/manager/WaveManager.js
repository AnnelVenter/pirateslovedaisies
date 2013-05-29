(function(e) {
  function c() {
    this.WaveManager()
  }

  function a(d, g, m) {
    this.Wave(d, g, m)
  }

  function b(d, g) {
    this.SubWave(d, g)
  }
  c.prototype = {
    WaveManager: function() {
      EventDispatcher.create(this);
      this.handleNewCreepProxy = new EventProxy(this, "handleNewCreep");
      this.handleNextWaveProxy = new EventProxy(this, "sendNextWave");
      this.handleWaveEndProxy = new EventProxy(this, "handleWaveEnd");
      this.complete = false;
      this.totalCreeps = this.totalWaves = 0;
      this.active = false
    },
    sendNextWave: function() {
      Tick.isPaused() && globalPause(false);
      var d = this.getCurrentWave();
      d != null && d.removeEventListener("nextWave", this.handleNextWaveProxy);
      d = 0;
      if (this.currentWave != -1) {
        d = this.getTimeTillNextWave()
      }
      var g = this.currentWave + 1;
      if (g != this.waves.length) {
        this.currentWave = g;
        g = this.getCurrentWave();
        g.start();
        this.dispatchEvent("nextWave", {
          wave: g,
          timeBonus: d
        })
      }
    },
    getCurrentWave: function() {
      return this.waves[this.currentWave]
    },
    getNextWave: function() {
      return this.waves[this.currentWave + 1]
    },
    getTimeTillNextWave: function() {
      return this.getCurrentWave().getTimeTillNextWave()
    },
    start: function() {
      this.active = true;
      Tick.addListener(this, true)
    },
    stop: function() {
      this.active = false;
      Tick.removeListener(this, true)
    },
    reset: function(d) {
      Tick.removeListener(this, true);
      this.cleanUp();
      this._data = d;
      this.startGold = d.startGold;
      this.totalCreeps = 0;
      d = d.waves;
      for (var g = 0, m = d.length; g < m; g++) {
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
    },
    cleanUp: function() {
      Tick.removeListener(this);
      if (this.waves != null) {
        for (var d = 0, g = this.waves.length; d < g; d++) {
          this.waves[d].cleanUp()
        }
      }
      this.waves = [];
      this.waveHash = {}
    },
    handleWaveEnd: function() {
      this.totalWaves--;
      if (this.totalWaves == 0) {
        this.stop();
        this.complete = true;
        this.dispatchEvent("complete")
      }
    },
    handleNewCreep: function(d) {
      this.dispatchEvent("addSprite", {
        data: d.creep
      })
    },
    tick: function(d) {
      for (var g = 0, m = this.waves.length; g < m; g++) {
        var q = this.waves[g];
        q.state == a.ACTIVE && q.tick(d)
      }
    },
    toString: function() {
      return "[WaveManager (" + this.waves.length + ")]"
    }
  };
  a.ACTIVE = "active";
  a.INACTIVE = "inactive";
  a.convertToMs = {
    timing: true,
    interval: true
  };
  a.prototype = {
    Wave: function(d, g, m) {
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
      this.defaults = {
        timing: this.timing,
        interval: this.interval,
        exits: this.exits,
        level: this.level
      };
      this.subWaves = [];
      this.subWaveHash = {};
      this.handleSubwaveCompleteProxy = new EventProxy(this, "handleSubwaveComplete");
      this._currentCreepSet = null;
      this._lastSubWaveTime = 0;
      this.nextWaveSent = this.started = this.ended = false;
      this.creepTypes = {};
      this.wavesLeft = this.units.length;
      for (d = this.totalCreeps = 0; d < this.wavesLeft; d++) {
        g = this.units[d];
        this.totalCreeps += g.count || 1;
        g.waveID = this.id;
        for (var q in this.defaults) {
          if (this.hasOwnProperty(q)) {
            if (g[q] == null) {
              g[q] = this.defaults[q]
            } else {
              if (a.convertToMs[q]) {
                g[q] *= Tick.fps
              }
            }
          }
        }
        if (this.creepTypes[g.type] == null) {
          this.creepTypes[g.type] = g.count || 1
        } else {
          this.creepTypes[g.type] += g.count || 1
        }
      }
    },
    getCreepTypes: function() {
      return this.creepTypes
    },
    handleSubwaveComplete: function(d) {
      d != null && this.subWaves.removeItem(d.target);
      this.wavesLeft--;
      this.wavesLeft <= 0 && this.dispatchEvent("complete")
    },
    start: function() {
      this._lastSubWaveTime = this._lastCreepTime = this._startTime = Tick.getTicks(true);
      this.state = a.ACTIVE
    },
    getTimeTillNextWave: function() {
      if (this._startTime == null) {
        return this.nextWave
      }
      return this.nextWave + this._startTime - Tick.getTicks(true)
    },
    tick: function() {
      var d = Tick.getTicks(true);
      if (!this.nextWaveSent && d >= this.nextWave + this._startTime) {
        this.nextWaveSent = true;
        this.dispatchEvent("nextWave")
      }
      if (!this.started || !this.ended && d >= this._lastSubWaveTime + this.timing) {
        this.started = true;
        this._lastSubWaveTime = d;
        this._currentCreepSet = this.units.shift();
        if (this.units.length == 0) {
          this.ended = true
        }
        if (this._currentCreepSet == null) {
          this.handleSubwaveComplete();
          return
        }
        var g = new b(this._currentCreepSet, d);
        g.addEventListener("complete", this.handleSubwaveCompleteProxy);
        g.addEventListener("newCreep", this.createCreeepProxy);
        this.subWaves.push(g);
        this.timing = g.timing
      }
      if (this.subWaves != null) {
        for (g = this.subWaves.length - 1; g >= 0; g--) {
          this.subWaves[g].tick(d)
        }
      }
    },
    cleanUp: function() {
      this.removeAllListeners();
      if (this.subWaves != null) {
        for (var d = this.subWaves.length - 1; d >= 0; d--) {
          this.subWaves[d].cleanUp()
        }
        this.subWaves = this.subWaveHash = null
      }
    },
    toString: function() {
      return "[Wave " + this.id + " (" + (this.subWaves != null ? this.subWaves.length : "0") + ")]"
    }
  };
  b.prototype = {
    SubWave: function(d) {
      EventDispatcher.create(this);
      this.creepSet = d;
      this.count = d.count || 1;
      this.timing = d.timing || 0.5;
      this._lastCreepTime = 0
    },
    tick: function(d) {
      if (d >= this._lastCreepTime + this.creepSet.interval) {
        this._lastCreepTime = d;
        this.count--;
        this.dispatchEvent("newCreep", {
          creep: this.creepSet
        })
      }
      this.count == 0 && this.dispatchEvent("complete")
    },
    cleanUp: function() {
      this.creepSet = null;
      this.removeAllListeners()
    },
    toString: function() {
      return "[SubWave (" + this.creepSet.type + ")]"
    }
  };
  e.WaveManager = c
})(window);