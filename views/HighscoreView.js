function HighscoreView(div, data) {
	this.HighscoreView(div, data);
}

HighscoreView.prototype = {
    HighscoreView: function (div, data) {		
        this.REFRESH_INTERVAL = 1000 * 30;
        this.div = div;
        this.selectedMapId; //the selected map element id
        this.selectedModeId; //the selected mode element id
        this.cachedScores = {};        
		
        //this.stage = new Stage($('#screenshotCanvas').get(0));
		this.stage = new Stage($('#screenshotCanvas').get(0), false);
        this.tweenInterval;
				
        $("#mainMenuBtn").click($.proxy(this, "onMainMenuBtnClick"));
        $("#playNowBtn").click($.proxy(this, "onPlayNowBtnClick"));

        $(".highscorePanel").scale9Grid({ top: 10, bottom: 10, left: 10, right: 10 });
        $("#leaderboard").scale9Grid({ top: 10, bottom: 30, left: 10, right: 30 });

        var mapButtons = ["map1", "map2", "map3", "map4"];

        for (var i = 0, l = mapButtons.length; i < l; i++) {
            $("#" + mapButtons[i]).click($.proxy(this, "onMapSelect"));
            $("#" + mapButtons[i]).mouseover($.proxy(this, "onMapMouseOver"));
            $("#" + mapButtons[i]).mouseout($.proxy(this, "onMapMouseOut"));
            $("#" + mapButtons[i] + "Over").css("visibility", "hidden");
        }

        $("#scoreNormalBtn").click($.proxy(this, "onModeSelect"));
        $("#scoreDeathBtn").click($.proxy(this, "onModeSelect"));
        $("#scoreEpicBtn").click($.proxy(this, "onModeSelect"));

        (data != null && data.mapIndex != null) ? this.setSelectedMap(data.mapIndex) : this.setSelectedMap(2); //default to Rum Alley

        (data != null && data.mode != null) ? this.setSelectedMode(data.mode) : this.setSelectedMode(GameInfo.NORMAL_MODE); //default to Normal mode

        $("#scoreMainContainer").css("visibility", "visible");
        this.loadScores(this.mapIndex, this.mode);
    },

    loadScores: function (mapIndex, mode) {
        //Kill any active ajax call:
        if (this.currentRequest) { this.currentRequest.abort(); }

        //Init text areas
        var map = MapInfo.getTitleByIndex(mapIndex);
        $("#scoreDiv").html("");
        $("#usernameDiv").html("");
        $("#yourRanking").html("");
        $("#userMessage").html("Loading scores for " + map + ",<br /> please wait...");

        //The score for the current mode
        this.score = LocalStorage.getScore(mapIndex, mode);
        //The score this user has gotten on each mode for this map
        this.normalModeScore = LocalStorage.getScore(mapIndex, GameInfo.NORMAL_MODE);
        this.suddenDeathModeScore = LocalStorage.getScore(mapIndex, GameInfo.SUDDEN_DEATH_MODE);
        this.epicModeScore = LocalStorage.getScore(mapIndex, GameInfo.EPIC_MODE);

        //Try and get cache
        var scoreObj = this.cachedScores[this.mapIndex];
        if (scoreObj) { scoreObj = scoreObj[mode]; }

        //Check if cache exists, and whether it is still valid.
        if (scoreObj != null && new Date().getTime() - scoreObj.time < this.REFRESH_INTERVAL) {
            this.displayScores(scoreObj.scores, scoreObj.names, scoreObj.rank);			
        }
         //Cache is not valid, call database:
        else {
           //Construct query URL
            var url = 'http://php5.gskinner.com/pirateslovedaisies/db/queryScores.php?map=' + map + '&normalModeScore=' + this.normalModeScore + '&suddenDeathModeScore=' + this.suddenDeathModeScore + '&epicModeScore=' + this.epicModeScore;
            this.currentRequest = $.ajax({
                url: url,
                dataType: "jsonp",
                jsonp : "callback",
                jsonpCallback: "handleHighScore"
            });
            window.handleHighScore = $.proxy(this, "handleHighScore");
        }
    },

    handleHighScore: function (data) {

        $("#userMessage").html("");

        //Cache data with current time in ms
        var d = new Date();
        this.cachedScores[this.mapIndex] = {};
        this.cachedScores[this.mapIndex][GameInfo.NORMAL_MODE] = this.createCacheItem(d.getTime(), data[0]);
        this.cachedScores[this.mapIndex][GameInfo.SUDDEN_DEATH_MODE] = this.createCacheItem(d.getTime(), data[1]);
        this.cachedScores[this.mapIndex][GameInfo.EPIC_MODE] = this.createCacheItem(d.getTime(), data[2]);

        //Show scores
        var scoreObj = this.cachedScores[this.mapIndex][this.mode];
        this.displayScores(scoreObj.scores, scoreObj.names, scoreObj.rank);
    },
	
	loadThumb: function (evt) {

        var stageWidth = 980;
        var stageHeight = 700;
        var strokeThickness = 6;
        var pWidth = 624 + strokeThickness * 2; //624px + 12px for 6px border
        var pHeight = 446 + strokeThickness * 2;

        var bg = new Shape();
        bg.graphics.beginFill('#333');
        bg.graphics.drawRect(0, 0, stageWidth, stageHeight);
        bg.graphics.endFill();
        bg.alpha = 0.5;
        this.stage.addChild(bg);
        
        var popup = new Container();
        popup.regX = pWidth / 2; //half of popup width
        popup.regY = pHeight / 2;
        popup.x = popup.regX + (stageWidth - pWidth >> 1); //account for offset of regX, then add stage.width - popup.width >> 1;
        popup.y = popup.regY + (stageHeight - pHeight >> 1);

        var stroke = new Shape();
        stroke.graphics.beginFill('#865d41');
        stroke.graphics.drawRect(0, 0, pWidth, pHeight);
        stroke.graphics.endFill();
        stroke.x = -strokeThickness;
        stroke.y = -strokeThickness;
        popup.addChild(stroke);
        
        var bm = new Bitmap(evt.target);
        bm.x = 0;
        bm.y = 0;   
        bm.scaleX = bm.scaleY = 0.637; //resize the image to fit (980x700 -> 624x446)
        popup.addChild(bm);

        var closeBtn = new Shape();
        closeBtn.graphics.setStrokeStyle('5');        
        closeBtn.graphics.beginStroke('#865d41');
        closeBtn.graphics.beginFill('#432e20');
        closeBtn.graphics.arc(0, 0, 25, 0, Math.PI*2, false);
        closeBtn.graphics.moveTo(-10, -10);
        closeBtn.graphics.lineTo(10, 10);
        closeBtn.graphics.moveTo(10, -10);
        closeBtn.graphics.lineTo(-10, 10);
        closeBtn.graphics.endStroke();
        closeBtn.graphics.endFill();
        closeBtn.x = pWidth - strokeThickness / 2;
        closeBtn.y = 0 - strokeThickness / 2;
        popup.addChild(closeBtn);

        var shadow = new Shadow('#000', 4, 4, 4);
        popup.shadow = shadow;

        this.stage.addChild(popup);

        this.startTime = new Date().getTime();
        this.startScale = popup.scaleX = popup.scaleY = 0;
        this.endScale = 1;
        this.tweenDuration = 700;

        //this.tweenInterval = setInterval(this.tweenThumb, 33, this); //EC: doesn't work in IE
        var scope = this;
        this.tweenInterval = setInterval(function(){ scope.tweenThumb(scope); }, 33); 

        $('#screenshotContainer').css("z-index", "10000");
        $("#screenshotContainer").click($.proxy(this, "closeThumb"));
	},

    tweenThumb: function(scope) {
        var tweenCurrentTime = new Date().getTime();
        if (tweenCurrentTime - scope.startTime <= scope.tweenDuration) {
            var popup = scope.stage.children[1];
            if (tweenCurrentTime - scope.startTime <= scope.tweenDuration && scope.tweenDuration > 0){

                if (scope.endScale > scope.startScale){
                    popup.scaleX = popup.scaleY = scope.bounceIn(tweenCurrentTime - scope.startTime, scope.startScale, scope.endScale-scope.startScale, scope.tweenDuration);
                } else {
                    popup.scaleX = popup.scaleY = scope.bounceOut(tweenCurrentTime - scope.startTime, scope.startScale, scope.endScale-scope.startScale, scope.tweenDuration);                    
                }

                scope.stage.tick();
            }
        } else {
            clearInterval(scope.tweenInterval);

            if (scope.endScale == 0) {
                scope.stage.removeAllChildren();
                scope.stage.clear();
                scope.stage.tick();

                $('#screenshotContainer').css("z-index", "-10000");
                $("#screenshotContainer").unbind("click");
            }
        }
    },

    bounceIn: function(time, positionStart, positionDelta, duration) {
        return positionDelta*((time=time/duration-1)*time*((0.7 +1)*time + 0.7) + 1) + positionStart;
    },

    bounceOut: function(time, startPos, deltaPos, duration) {
        return deltaPos - this.bounceIn(duration-time, 0, deltaPos, duration) + startPos;
    }, 

	closeThumb: function (evt) {        
        clearInterval(this.tweenInterval);

        var popup = this.stage.children[1];

        this.startTime = new Date().getTime();
        this.startScale = popup.scaleX = popup.scaleY = 1;
        this.endScale = 0;
        this.tweenDuration = 700;

        var scope = this;
        this.tweenInterval = setInterval(function(){scope.tweenThumb(scope);}, 33);
	},

    createCacheItem: function (time, data) {
        var rank = data.shift();

        //Create output strings
        var scores = ""; var names = ""; var username = "";
        for (var i = 0; i < data.length; i++) {
            if(isNaN(data[i].score)){ continue; }
            scores += "<div style='height:38px;'>" + data[i].score.commaDelimit() + "</div>";
            username = data[i].username;
            if (username.length > 32) {
                username = username.substring(0, 24) + "...";
            }
			//insert screenshot thumb before name
            if (data[i].screenPath != null) {
                names += "<div style='height:38px;'><img class='thumbImg' style='vertical-align:middle; margin-right:15px; cursor:pointer; width:52px; height:30px;' src='"+data[i].screenPath+"'/>"+username+"</div>";
			} else {
                names += "<div style='height:38px;'>" + username + "</div>";
			}
        }
        return { time: time, scores: scores, names: names, rank: rank };
    },

    displayScores: function (scores, names, rank) {	
        if (scores == "") {
            $("#userMessage").html("There are no high scores yet for this mode.");
        } else {
            $("#userMessage").html("");
            $("#scoreDiv").html(scores);
            $("#usernameDiv").html(names);	
			
			$(".thumbImg").click($.proxy(this, "loadThumb")); //add listeners to img thumbs
        }
        $("#yourRanking").html("");
        var localScore = LocalStorage.getScore(this.mapIndex, this.mode);
        if (localScore > 0) {
            if(isNaN(localScore) == false){
                if (scores == "") { rank = 1; }
                var scoreText = localScore.commaDelimit();
                $("#yourRanking").html("Your score of " + scoreText + " ranks " + rank.getOrdinal(true) + " this week.");
            }
        }
    },

    onMapMouseOver: function (evt) {
        var id = evt.target.id + "Over";
        $("#" + id).css('visibility', 'visible');
    },

    onMapMouseOut: function (evt) {
        var id = evt.target.id + "Over";
        $("#" + id).css('visibility', 'hidden');
    },

    onMapSelect: function (evt) {
        var prevId = this.selectedMapId;

        //add listeners and reset the state for prev selected map 
        $("#" + prevId).click($.proxy(this, "onMapSelect"));
        $("#" + prevId).mouseover($.proxy(this, "onMapMouseOver"));
        $("#" + prevId).mouseout($.proxy(this, "onMapMouseOut"));
        $("#" + prevId + "Over").css("visibility", "hidden");
        $("#" + prevId + "Name").css("color", "#000000");

        var mapIndex = evt.target.id.substr(3, 1);
        this.setSelectedMap(mapIndex);

        this.loadScores(this.mapIndex, this.mode);
        AudioManager.playSound(AudioManager.CLICK);
    },

    onModeSelect: function (evt) {
        var prevId = this.selectedModeId;

        if (prevId == "scoreDeathBtn") { //EC: ugly hack; but couldn't get scale 9 to work nicely with button rollovers (http://code.google.com/p/scale9grid/issues/detail?id=8); had to create a separate button background just for this size
            //reset prev selected button state
            $("#" + prevId).css("background-image", "url(img/ui/suddenButtonFabric_up.png)");

            //reset the previous selected button's css rollover functionality; need to do this since we can't reset the css pseduo class for hover rollovers		
            $("#" + prevId).hover(
				function () { $("#" + prevId).css("background-image", "url(img/ui/suddenButtonFabric_over.png)"); },
				function () { $("#" + prevId).css("background-image", "url(img/ui/suddenButtonFabric_up.png)"); }
			)
        } else {
            //reset prev selected button state
            $("#" + prevId).css("background-image", "url(img/ui/medButtonFabric_up.png)");

            //reset the previous selected button's css rollover functionality; need to do this since we can't reset the css pseduo class for hover rollovers		
            $("#" + prevId).hover(
				function () { $("#" + prevId).css("background-image", "url(img/ui/medButtonFabric_over.png)"); },
				function () { $("#" + prevId).css("background-image", "url(img/ui/medButtonFabric_up.png)"); }
			)
        }

        var mode;
        switch (evt.target.id) {
            case "scoreNormalBtn":
                mode = GameInfo.NORMAL_MODE; break;
            case "scoreDeathBtn":
                mode = GameInfo.SUDDEN_DEATH_MODE; break;
            case "scoreEpicBtn":
                mode = GameInfo.EPIC_MODE; break;
        }

        this.setSelectedMode(mode);

        this.loadScores(this.mapIndex, this.mode);
        AudioManager.playSound(AudioManager.CLICK);
    },

    setSelectedMap: function (mapIndex) {
        var id = "map" + mapIndex;
        this.selectedMapId = id;
        this.mapIndex = mapIndex;

        //remove listeners and set the selected state for map button
        $("#" + id).unbind();
        $("#" + id + "Over").css("visibility", "visible");
        $("#" + id + "Name").css("color", "#F9E5BE");

        var canPlay = MapInfo.canPlayMap(this.mapIndex, this.mode);
        $("#playNowBtn").css("visibility", canPlay ? "visible" : "hidden");
    },

    setSelectedMode: function (mode) {
        var id;
        switch (mode) {
            case GameInfo.NORMAL_MODE:
                id = "scoreNormalBtn"; break;
            case GameInfo.SUDDEN_DEATH_MODE:
                id = "scoreDeathBtn"; break;
            case GameInfo.EPIC_MODE:
                id = "scoreEpicBtn"; break;
        }
        this.selectedModeId = id;
        this.mode = mode;

        //unbind if applicable (if previously bound by onModeSelect method)
        $("#" + id).unbind('mouseenter mouseleave');

        if (id == "scoreDeathBtn") {
            $("#" + id).css("background-image", "url(img/ui/suddenButtonFabric_over.png)");
        } else {
            //set the selected state for mode button
            $("#" + id).css("background-image", "url(img/ui/medButtonFabric_over.png)");
        }

        var canPlay = MapInfo.canPlayMap(this.mapIndex, this.mode);
        $("#playNowBtn").css("visibility", canPlay ? "visible" : "hidden");
    },

    onMainMenuBtnClick: function (evt) {
        AudioManager.playSound(AudioManager.CLICK);
        ViewManager.show(ViewManager.START_SCREEN);
    },

    onPlayNowBtnClick: function (evt) {
        AudioManager.playSound(AudioManager.CLICK);
        startNewGame(this.mapIndex, this.mode);
    }
}
	