function Tick() {}
window.Tick = Tick;
Tick.measurePerformance = false;
Tick.listeners = null;
Tick._pauseable = null;
Tick._paused = false;
Tick.startTime = getTimer();
Tick.pauseTimeOffset = 0;
Tick.pausedTime = 0;
Tick.inited = false;
Tick.ticks = 0;
Tick.pausedTicks = 0;
Tick.tickInterval = 50;
Tick.frameRate = 1 / Tick.tickInterval;
Tick.fps = 1E3 / Tick.tickInterval;
Tick.totalTime = Tick.startTime;
Tick.addListener = function(e, c) {
  if (!Tick.inited) {
    Tick.removeAll();
    Tick.inited = true;
    setInterval(Tick.tick, Tick.tickInterval)
  }
  if (Tick.listeners != 0) {
    if (Tick.listeners.indexOf(e) != -1) {
      return
    }
  }
  Tick._pauseable[Tick.listeners.length] = c == true;
  Tick.listeners.push(e)
};
Tick.removeListener = function(e) {
  if (Tick.listeners != null) {
    e = Tick.listeners.indexOf(e);
    if (e != -1) {
      Tick.listeners.splice(e, 1);
      Tick._pauseable.splice(e, 1)
    }
  }
};
Tick.removeAll = function() {
  Tick.listeners = [];
  Tick._pauseable = []
};
Tick.isPaused = function() {
  return Tick._paused
};
Tick.getTime = function(e) {
  return getTimer() - Tick.startTime - (e ? Tick.pausedTime : 0)
};
Tick.getTicks = function(e) {
  return e ? Tick.ticks - Tick.pausedTicks : Tick.ticks
};
Tick.pause = function() {
  if (!Tick._paused) {
    Tick._paused = true;
    Tick.pauseTimeOffset = getTimer()
  }
};
Tick.unpause = function() {
  if (Tick._paused) {
    Tick._paused = false;
    Tick.pausedTime += getTimer() - Tick.pauseTimeOffset
  }
};
Tick.tick = function() {
  Tick.totalTime += Tick.tickInterval;
  Tick.ticks += 1;
  var e = Tick.getTime,
    c = e(false),
    a = e(true),
    b = Tick._paused,
    d = Tick._pauseable,
    g = Tick.listeners;
  if (b) {
    Tick.pausedTicks += 1
  }
  for (var m = g.length, q = 0; q < m; q += 1) {
    var s = d[q],
      y = g[q];
    y == null || b && s || (y instanceof EventProxy ? y.handleEvent({
      time: s ? a : c,
      pausable: s != null
    }) : y.tick(s ? a : c, s != null))
  }
  if (Tick.measurePerformance) {
    if (!Tick.count) {
      Tick.count = 0;
      Tick.avgTickLength = 0
    }
    Tick.count++;
    Tick.avgTickLength += e(false) - c;
    if (Tick.count > 40 && Tick.avgTickLength > 0) {
      trace("Avg Tick Speed: ", Tick.avgTickLength / Tick.count, "ms");
      Tick.count = 0;
      Tick.avgTickLength = 0
    }
  }
};