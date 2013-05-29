function DustStormEffect(e) {
  this.DustStormEffect(e)
}
DustStormEffect.imageSrc = "img/DustStorm.png";
DustStormEffect.scale = 2;
DustStormEffect.layers = 4;
DustStormEffect.preloaded = false;
DustStormEffect.preloading = false;
DustStormEffect.preload = function() {
  if (!(DustStormEffect.preloaded || DustStormEffect.preloading)) {
    DustStormEffect.preloading = true;
    DustStormEffect.image = new Image;
    DustStormEffect.image.src = DustStormEffect.imageSrc;
    DustStormEffect.image.onload = DustStormEffect.imageLoaded
  }
};
DustStormEffect.imageLoaded = function() {
  DustStormEffect.preloaded = true
};
DustStormEffect.prototype = {
  DustStormEffect: function(e) {
    this.count = 0;
    this.inited = false;
    this.velocity = -20;
    this.interval = 91;
    this.enabled = e;
    this.count = Math.PI / 2 * 3 * this.interval
  },
  toString: function() {
    return "[DustStormEffect]"
  },
  init: function(e, c) {
    this.tileCanvas = document.createElement("canvas");
    var a = this.tileCanvas.getContext("2d"),
      b = DustStormEffect.image.width,
      d = DustStormEffect.image.height;
    this.tileCanvas.width = Math.ceil(e / DustStormEffect.scale) + d;
    this.tileCanvas.height = Math.ceil(c / DustStormEffect.scale) + b;
    for (var g = 0; g < this.tileCanvas.height;) {
      for (var m = 0; m < this.tileCanvas.width;) {
        a.drawImage(DustStormEffect.image, m, g);
        m += b
      }
      g += d
    }
    this.inited = true
  },
  setEnabled: function(e) {
    this.enabled = e
  },
  update: function(e, c, a, b) {
    if (DustStormEffect.preloaded) {
      this.inited || this.init(c, a);
      b || this.count++;
      c = DustStormEffect.image.width * DustStormEffect.scale;
      a = DustStormEffect.image.height * DustStormEffect.scale;
      b = DustStormEffect.layers;
      var d = Math.sin(this.count / this.interval) * 0.5 + 0.5;
      d *= d;
      d *= 0.45;
      for (var g = 0; g < b; g++) {
        var m = this.count * (g / b * 0.7 + 0.3) * this.velocity,
          q = Math.sin(m / 750 + g) * a * 0.5;
        m = (m + c) % c;
        q = (q + a) % a - a;
        e.globalAlpha = 0.1 + d * (0.5 + g / b * 0.5);
        e.drawImage(this.tileCanvas, m, q, this.tileCanvas.width * DustStormEffect.scale, this.tileCanvas.height * DustStormEffect.scale)
      }
    }
  }
};
