(function(e) {
  function c(a, b, d) {
    this.PirateData(a, b, d)
  }
  c.prototype = {
    PirateData: function(a, b, d) {
      this.pirateType = a;
      this.level = b;
      for (var g in d) {
        this[g] = d[g]
      }
    },
    toString: function() {
      return "[PirateData " + this.pirateType + " " + this.level + "]"
    }
  };
  e.PirateData = c
})(window);
(function(e) {
  function c() {}
  c.RUM_ALLEY = "Rum Alley";
  c.COCONUT_COAST = "Coconut Coast";
  c.HIDDEN_HIDEAWAY = "Hidden Hideaway";
  c.TREASURE_ISLAND = "Treasure Island";
  c.maps = [null, c.COCONUT_COAST, c.RUM_ALLEY, c.TREASURE_ISLAND, c.HIDDEN_HIDEAWAY];
  c.getTitleByIndex = function(a) {
    return c.maps[a]
  };
  c.requiredLevels = {
    2: -1,
    1: 2,
    4: 1,
    3: 4
  };
  c.canPlayMap = function(a, b) {
    var d = c.requiredLevels[a];
    if ((d == -1 || LocalStorage.getMapPlayed(d)) != true) {
      return false
    }
    switch (b) {
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
})(window);