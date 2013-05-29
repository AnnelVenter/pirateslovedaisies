(function(e) {
  function c(a, b, d, g) {
    this.UIButton(a, b, d, g)
  }
  c.prototype = {
    UIButton: function(a, b, d, g) {
      EventDispatcher.create(this);
      this.div = a;
      this.src = b;
      this.states = d;
      this.frames = g || ["default"];
      this.state = "up";
      this.frame = 0;
      this.loaded = false;
      this.enabled = true;
      a = new Image;
      $(a).load($.proxy(this, "handleBackgroundLoad"));
      a.src = b;
      this.div.css({
        background: "url('{0}') transparent no-repeat".supplant(b),
        cursor: "pointer"
      });
      this.div.mouseover($.proxy(this, "handleRollOver"));
      this.div.mouseout($.proxy(this, "handleRollOut"));
      this.div.click($.proxy(this, "handleClick"))
    },
    setEnabled: function(a) {
      this.enabled = a;
      this.setState(a ? "up" : "disabled");
      this.div.css("cursor", a ? "pointer" : "auto")
    },
    handleBackgroundLoad: function(a) {
      this.loaded = true;
      a = a.target;
      this.width = a.width / this.frames.length | 0;
      this.height = a.height / this.states.length | 0;
      this.div.css({
        width: this.width,
        height: this.height
      });
      this.setState(this.state)
    },
    handleRollOver: function() {
      this.enabled && this.setState("over")
    },
    handleRollOut: function() {
      this.enabled && this.setState("up")
    },
    setState: function(a) {
      if (this.loaded) {
        var b = this.states.indexOf(a);
        if (b != -1) {
          this.state = a;
          this.div.css("background-position", "{1}px {0}px".supplant(-this.height * b, -this.width * this.frame))
        }
      }
    },
    setFrame: function(a) {
      a = this.frames.indexOf(a);
      if (a != -1) {
        this.frame = a;
        this.setState(this.state)
      }
    },
    handleClick: function() {
      this.enabled && this.dispatchEvent("click")
    },
    cleanUp: function() {
      this.states = this.frames = null;
      this.div.unbind();
      this.div = null
    }
  };
  e.UIButton = c
})(window);