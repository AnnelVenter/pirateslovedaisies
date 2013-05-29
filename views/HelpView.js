function HelpView(div) {
	this.HelpView(div);
}

HelpView.prototype = {
    HelpView: function (div) {
        this.div = div;
        this.currentView = "help";

        $("#mainMenuBtn").click($.proxy(this, "onMainMenuClick"));
        $("#creditsToggleButton").click($.proxy(this, "onCreditsToggleClick"));

        $(".helpPanel").scale9Grid({ top: 10, bottom: 10, left: 10, right: 10 });
        $(".helpDiv").scale9Grid({ top: 27, bottom: 17, left: 31, right: 33 });
        $(".creditsDiv").scale9Grid({ top: 27, bottom: 17, left: 31, right: 33 });
        $(".helpCrewDiv").scale9Grid({ top: 27, bottom: 17, left: 31, right: 33 });
        //$(window).resize(function(){trace("resize");});
        this.init();
    },

    init: function () {
        this.creepStage = new Stage($("#creepCanvas").get(0));

        var creeps = ["rat", "crab", "gull", "octopus", "kraken"];
        var creepPos = [[33, 40], [109, 40], [188, 50], [262, 40], [346, 45]]; //array of x,y values for each creep, respectively		
        var l = creeps.length;
        var creep;
        for (var i = 0; i < l; i++) {
            creep = BitmapModel.getBitmap(creeps[i]);
            creep.x = creepPos[i][0];
            creep.y = creepPos[i][1];
            this.creepStage.addChild(creep);
            //[SB] Chrome /Safari have a slowDown bug related to scale9 jquery plugin
            if (isWebkit() != true || navigator.appVersion.indexOf("Win") == -1) {
                creep.gotoAndPlay("forward");
            } else {
                creep.gotoAndStop("forward");
            }
        }

        var pirateTypes = ["sabre", "cabinBoy", "cannon", "shooter", "captain"];
        this.stageList = [];
        this.pirateList = [];

        for (var i = 0, l = pirateTypes.length; i < l; i++) {
            var stage = new Stage($("#" + pirateTypes[i] + "Canvas").get(0));
            var pirate = BitmapModel.getBitmap(pirateTypes[i]);
            pirate.x = 40;
            pirate.y = 48;
            pirate.regX = pirate.spriteSheet.frameWidth - pirate.regX;
            pirate.callback = $.proxy(this, "playNextPirate");
            pirate.gotoAndStop("l1AttackDL");
            
            stage.addChild(pirate);
            this.pirateList.push(pirate);
            this.stageList.push(stage);
        }
        this.currentPirate = this.pirateList[0];
        $("#mainHelpDiv").css("visibility", "visible");

        //[SB] Chrome /Safari have a slowDown bug related to scale9 jquery plugin
        if (isWebkit() != true || navigator.appVersion.indexOf("Win") == -1) {
            this.currentPirate.gotoAndPlay("l1AttackDL");
        }
    },

    playNextPirate: function (event) {
        this.currentPirate.gotoAndStop("l1AttackDL");
        var pirate = this.pirateList.findRandom();
        pirate.gotoAndPlay("l1AttackDL");
        this.currentPirate = pirate;
    },

    startAnimation: function () {
        Tick.addListener(this);
    },

    stopAnimation: function () {
        Tick.removeListener(this);
    },

    tick: function (tick, pausable) {
        for (var i = 0, l = this.stageList.length; i < l; i++) {
            this.stageList[i].tick();
        }
        this.creepStage.tick();
    },

    onCreditsToggleClick: function (evt) {
        AudioManager.playSound(AudioManager.CLICK);
        this.currentView = (this.currentView == "help") ? "credits" : "help";
        var showHelp = (this.currentView == "help");
        (showHelp) ? this.startAnimation() : this.stopAnimation();

        var helpDisplay = (showHelp) ? "block" : "none";
        var creditsDisplay = (showHelp) ? "none" : "block";
        $("#creditsToggleButton").html((showHelp) ? "Credits" : "Help");

        $("#leftHelpContent").css("display", helpDisplay);
        $("#rightHelpContent").css("display", helpDisplay);
        $("#leftCreditsContent").css("display", creditsDisplay);
        $("#rightCreditsContent").css("display", creditsDisplay);

        if (!showHelp) {
            $(".creditsDiv").scale9Grid({ top: 27, bottom: 17, left: 31, right: 33 });
        }
    },

    onMainMenuClick: function (evt) {
        AudioManager.playSound(AudioManager.CLICK);
        ViewManager.show(ViewManager.START_SCREEN);
    }

}