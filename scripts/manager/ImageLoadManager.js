function ImageLoadManager() {}
EventDispatcher.create(ImageLoadManager);
if (ImageLoadManager.initilized == null) {
  ImageLoadManager.imagesToLoad = 0;
  ImageLoadManager.images = [];
  ImageLoadManager.imageHash = {};
  ImageLoadManager.initilized = true
}
ImageLoadManager.load = function(e, c) {
  var a = new Image;
  a.onload = ImageLoadManager.handleImageLoad;
  a.onerror = ImageLoadManager.handleImageLoadError;
  a.name = c;
  a.src = e
};
ImageLoadManager.loadList = function(e) {
  for (var c = ImageLoadManager.imagesToLoad = e.length, a = 0; a < c; a++) {
    ImageLoadManager.load(e[a].src, e[a].name)
  }
};
ImageLoadManager.getImage = function(e) {
  return ImageLoadManager.imageHash[e]
};
ImageLoadManager.handleImageLoad = function() {
  ImageLoadManager.images.push(this);
  ImageLoadManager.imageHash[this.name] = this;
  ImageLoadManager.dispatchEvent("complete", {
    image: this
  });
  --ImageLoadManager.imagesToLoad == 0 && ImageLoadManager.dispatchEvent("loadComplete")
};
ImageLoadManager.handleImageLoadError = function(e) {
  trace("ERROR LOADING: ", this.name);
  ImageLoadManager.dispatchEvent("error", e)
};