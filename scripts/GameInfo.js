(function(e) {
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
  c.prototype = {
    GameInfo: function() {
      EventDispatcher.create(this);
      this.currentGame = null;
      this.startingDaisies = this.daisies = this.money = this.score = 0
    },
    reset: function(a, b) {
      this.score = 0;
      this.daisies = this.startingDaisies = a;
      this.money = b;
      this.change()
    },
    addScore: function(a) {
      if (a < 0) {
        throw "INCONCEIVABLE";
      }
      this.score += Math.round(a);
      this.formatScore();
      this.change()
    },
    formatScore: function() {
      for (; this.score % 5 != 0;) {
        this.score += 1
      }
    },
    addMoney: function(a) {
      this.money += Math.round(a);
      this.change()
    },
    loseDaisy: function() {
      this.daisies -= 1;
      this.change()
    },
    change: function() {
      this.dispatchEvent("change")
    },
    toString: function() {
      return "[GameInfo score=" + this.score + " money=" + this.money + " daisies=" + this.daisies + "]"
    }
  };
  e.GameInfo = c
})(window);