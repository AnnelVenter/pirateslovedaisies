(function(e) {
  function c(a, b) {
    this.TopNavigation(a, b)
  }
  c.prototype = {
    TopNavigation: function(a, b) {
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
    },
    toggleMute: function() {
      AudioManager.mute(this.muteButton.frame != 0);
      AudioManager.playSound(AudioManager.CLICK)
    },
    updateStatus: function() {
      this.changed = true;
      this.daisyLabel.text(this.gameInfo.daisies)
    },
    tick: function() {
      if (this.changed) {
        var a = false,
          b = 0;
        if (this.gameInfo.money != this.moneyValue) {
          b = this.gameInfo.money - this.moneyValue;
          if (Math.abs(b) < 2) {
            this.moneyValue = this.gameInfo.money
          } else {
            this.moneyValue = this.moneyValue + b * 0.5 | 0;
            a = true
          }
          this.moneyLabel.text(this.moneyValue.commaDelimit())
        }
        if (this.gameInfo.score != this.scoreValue) {
          b = this.gameInfo.score - this.scoreValue;
          if (Math.abs(b) < 2) {
            this.scoreValue = this.gameInfo.score
          } else {
            this.scoreValue = this.scoreValue + b * 0.8 | 0;
            a = true
          }
          this.scoreLabel.text("Score: " + this.scoreValue.commaDelimit())
        }
        this.changed = a
      }
    },
    cleanUp: function() {
      this.gameInfo = this.div = this.labels = this.daisyLabel = this.moneyLabel = this.scoreLabel = null;
      Tick.removeListener(this)
    }
  };
  e.TopNavigation = c
})(window);
