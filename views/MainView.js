function MainView(div) {
	this.MainView(div);
}

MainView.prototype = {		
	MainView: function (div) {			
		this.div = div;
				
		$("#startButton").click(this.onStartClick);
		$("#helpButton").click(this.onHelpClick);
		$("#highscoreButton").click(this.onHighscoreClick);
		
		$("#resumeButton").click(this.onResumeClick);
		$("#mainResumeButton").css("display", currentGame != null ? "block" : "none");
	},
	
	onStartClick: function (evt) {
		AudioManager.playSound(AudioManager.CLICK);
		ViewManager.show(ViewManager.MAP_SCREEN); 
	},
	
	onHighscoreClick: function (evt) {
		AudioManager.playSound(AudioManager.CLICK);
		ViewManager.show(ViewManager.HIGHSCORE_SCREEN);
	},
	
	onHelpClick: function(evt) {
		AudioManager.playSound(AudioManager.CLICK);
		ViewManager.show(ViewManager.HELP_SCREEN); 
	},
	
	onResumeClick: function(evt) {
		AudioManager.playSound(AudioManager.CLICK);
		currentGame.resumeGame();
		$("#togglePauseBtn").html("Pause");
	}
}
	
	
	
				
		
		