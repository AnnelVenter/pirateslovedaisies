function DefeatView(div) {
	this.DefeatView(div);
}

DefeatView.prototype = {		
	DefeatView: function (div) {			
		this.div = div;
		this.score = currentGame.gameInfo.score;
		
		$("#mainMenuBtn").click(this.onMainMenuClick);
		
		$("#twitterLink").click($.proxy(this, 'onTwitterLink'));
		//$("#facebookLink").click($.proxy(this, 'onFacebookLink'));
		
		$("#winLiveLogin").click($.proxy(this, 'onWinLiveLogin'));	
		$("#facebookLogin").click($.proxy(this, 'onFacebookLogin'));
		
		$("#scoreText").html(this.score.commaDelimit());
		$("#defeatDiv").scale9Grid( {top:10, bottom:10, left:10, right:10} );
		$(".submitScorePanel").scale9Grid( {top:10, bottom:10, left:10, right:10} );
		
		//Try and save score, if returns true we've set a new highScore.
		var newScore = LocalStorage.setScore(currentGame.mapIndex, currentGame.mode, this.score);
		//alert(newScore);
		if (!newScore) {			
			$(".newHighScoreLabel").css("visibility", "hidden");
		}
		
		if (this.score > 0) {
			$(".submitScorePanel").css("visibility", "visible");
		} else {			
			$(".submitScorePanel").css("visibility", "hidden");
		}
		
		$("#defeatPanel").css("visibility", "visible");
		
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
	
	onMainMenuClick: function(evt) {
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
		
	onTwitterLink: function(evt) {
		window.open("http://twitter.com/share?text=" + this.getPlayText() + "&url=http://pirateslovedaisies.com");
	},
	
	onFacebookLink: function(evt) {		
		window.open("http://facebook.com/sharer.php?t=" + this.getPlayText() + "&u=http://pirateslovedaisies.com");
	},
	
	onFacebookLogin: function(evt) {
		openLogin("facebook");
	},
	
	onWinLiveLogin: function(evt) {
		openLogin("windows");
	}
}
	
	
	
				
		
		