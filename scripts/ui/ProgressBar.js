(function(e) {
  function c(a) {
    this.ProgressBar(a)
  }
  c.prototype = {
    ProgressBar: function(a) {
      this.canvas = a.get(0);
      this.context = this.canvas.getContext("2d");
      this.repeat = 4;
      this.offset = this.progress = 0;
      a = this.image = new Image;
      a.onload = $.proxy(this, "handleImageLoad");
      a.src = "img/ui/preloader_bar.png"
    },
    handleImageLoad: function() {
      this.imageWidth = this.image.width - this.repeat;
      this.imageHeight = this.image.height;
      Tick.addListener(this)
    },
    setProgress: function(a) {
      this.progress = a
    },
    tick: function() {
      for (var a = this.canvas.width * this.progress, b = -this.offset; b < a;) {
        var d = Math.min(this.imageWidth, a - b);
        this.context.save();
        this.context.drawImage(this.image, this.offset, 0, d, this.imageHeight, b, 0, d, this.imageHeight);
        this.context.restore();
        b += this.imageWidth
      }
      this.offset = (this.offset + 1) % (this.repeat + 1)
    },
    clear: function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.progress = 0
    },
    cleanUp: function() {
      this.image = null;
      this.clear();
      Tick.removeListener(this)
    }
  };
  e.ProgressBar = c
})(window);