function AudioManager() {
}
EventDispatcher.create(AudioManager);
AudioManager.PRELOAD_SETTING = "auto";
AudioManager.INTRO = "intro";
AudioManager.MUSIC = "music";
AudioManager.DEFEAT = "defeat";
AudioManager.VICTORY = "victory";
AudioManager.CANNON_FIRE = "cannon";
AudioManager.CANNON_IMPACT = "cannonImpact";
AudioManager.CANNON_ADDED = "cannonAdded";
AudioManager.SHOOTER_FIRE = "shooter";
AudioManager.SHOOTER_ADDED = "shooterAdded";
AudioManager.SABRE_FIRE = "sabre";
AudioManager.SABRE_ADDED = "sabreAdded";
AudioManager.CABIN_BOY_FIRE = "cabinBoy";
AudioManager.CABIN_BOY_ADDED = "cabinBoyAdded";
AudioManager.CAPTAIN_ADDED = "captainAdded";
AudioManager.CAPTAIN_AHOY = "captainAhoy";
AudioManager.CAPTAIN_ARGH = "captainArgh";
AudioManager.RAT_HURT = "ratHurt";
AudioManager.CRAB_HURT = "crabHurt";
AudioManager.OCTOPUS_HURT = "octopusHurt";
AudioManager.GULL_HURT = "gullHurt";
AudioManager.KRAKEN_HURT = "krakenHurt";
AudioManager.KRAKEN_DEATH = "krakenDeath";
AudioManager.PLACE_TOWER = "placeTower";
AudioManager.UPGRADE = "upgrade";
AudioManager.RETIRE = "retire";
AudioManager.STEAL_DAISY = "stealDaisy";
AudioManager.CLICK = "click";
AudioManager.DAISY_LOST = "daisyLost";
AudioManager.KRAKEN_MUSIC = "krakenMusic";
AudioManager.THUNDER1 = "thunder1";
AudioManager.THUNDER2 = "thunder2";
AudioManager.playSoundDelayed = function(e, c) {
  if(c == null) {
    c = 0
  }
  setTimeout(function() {
    AudioManager.playSound(e)
  }, c)
};
AudioManager.mute = function(e) {
  AudioManager.muted = e;
  $("audio").each(function(c, a) {
    a.volume = e ? 0 : 1
  })
};
AudioManager.playSound = function(e, c) {
  for(var a, b = 1;b <= 10;b++) {
    var d = $("#" + (e + "_" + b)).get(0);
    if(d == null) {
      break
    }
    if(d.currentTime == 0 || d.duration - d.currentTime < 0.25) {
      a = d;
      break
    }
  }
  if(a == null) {
    a = $("#" + e + "_1").get(0)
  }
  if(a != null) {
    try {
      a.currentTime = 0
    }catch(g) {
    }
    a.loop = c;
    a.play()
  }
  return a
};
AudioManager.pauseSound = function(e) {
  for(var c = 1;c <= 10;c++) {
    var a = $("#" + (e + "_" + c));
    if(a != undefined) {
      a.get(0).pause()
    }else {
      break
    }
  }
};
AudioManager.stopAllSounds = function() {
  $.each($("audio"), function(e, c) {
    var a = $(c).get(0);
    try {
      a.pause();
      a.currentTime = 0
    }catch(b) {
    }
  })
};