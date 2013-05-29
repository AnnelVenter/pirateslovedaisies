function VictoryView(div) {
	this.VictoryView(div);
}

VictoryView.prototype = {
    VictoryView: function (div) {
        this.div = div;
        $("#mainMenuBtn").click(this.onMainMenuClick);

        $("#victoryDiv").scale9Grid({ top: 10, bottom: 10, left: 10, right: 10 });

        $(".submitScorePanel").scale9Grid({ top: 10, bottom: 10, left: 10, right: 10 });

       $("#twitterLink").click($.proxy(this, 'onTwitterLink'));
       // $(".facebookLink").click($.proxy(this, 'onFacebookLink'));

        $("#facebookLogin").click($.proxy(this, 'onFacebookLogin'));
        $("#winLiveLogin").click($.proxy(this, 'onWinLiveLogin'));

        var numDaisies = currentGame.daisyList.length;
        var totalDaisies = currentGame.gameInfo.startingDaisies;
        var daisyBonus = GameInfo.DAISY_BONUS;
        if (numDaisies == totalDaisies) {
            daisyBonus *= GameInfo.ALL_DAISY_MULTIPLIER;
        }
        $("#daisyBonus").html(numDaisies + " <img src='img/daisy.png' style='vertical-align:middle'> x " + daisyBonus.commaDelimit());

        var gold = currentGame.gameInfo.money;
        var goldBonus = GameInfo.GOLD_BONUS;
        $("#goldBonus").html(gold.commaDelimit() + " <img src='img/coin.png' style='vertical-align:middle'> x " + goldBonus);

        currentGame.gameInfo.score += (daisyBonus * numDaisies) + (gold * goldBonus);

        var totalScore = currentGame.gameInfo.score;
        $("#totalScore").html(totalScore.commaDelimit());

        //Mark map as completed
        LocalStorage.setMapComplete(currentGame.mapIndex, currentGame.mode);
        //Set HighScore
        var newScore = LocalStorage.setScore(currentGame.mapIndex, currentGame.mode, totalScore);
        if (!newScore) {
            $(".newHighScoreLabel").css("visibility", "hidden");
        }

        $("#victoryPanel").css("visibility", "visible");

        this.score = totalScore;

        switch (currentGame.mode) {
            case GameInfo.NORMAL_MODE:
                this.mode = "Normal"; break;
            case GameInfo.SUDDEN_DEATH_MODE:
                this.mode = "Sudden Death"; break;
            case GameInfo.EPIC_MODE:
                this.mode = "Epic"; break;
        }
		
		this.map = MapInfo.maps[currentGame.mapIndex];
	
        previousScore = this.score;
		previousMapIndex = currentGame.mapIndex;
        previousMode = currentGame.mode;
		previousScreenshot = currentGame.screenshot;		
        cleanUpGame();
    },

    onMainMenuClick: function (evt) {
        AudioManager.stopAllSounds();
        AudioManager.playSound(AudioManager.CLICK);
        AudioManager.playSound(AudioManager.INTRO);
        ViewManager.show(ViewManager.START_SCREEN);
    },
	
	getPlayText: function() {
		var str = "I scored "+this.score.commaDelimit()+" points";
		if (this.mode != "Normal") { str += " in "+this.mode+" mode"; } 
		str += " on "+this.map+" in Pirates Love Daisies! %23PLD";
		return str;
	},

    onTwitterLink: function (evt) {
        window.open("http://twitter.com/share?text=" +this.getPlayText()+ "&url=http://pirateslovedaisies.com");
    },

    onFacebookLink: function (evt) {
        window.open("http://facebook.com/sharer.php?t=" + this.getPlayText() +"&u=http://pirateslovedaisies.com");
    },

    onFacebookLogin: function (evt) {		
		openLogin("facebook");
    },

    onWinLiveLogin: function (evt) {
        openLogin("windows");
    }
}
	
	
	
				
		
		