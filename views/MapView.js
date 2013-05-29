function MapView(div) {
	this.MapView(div);
}

MapView.prototype = {
	MapView: function (div) {
		
		this.mapID;		
		
		$(".mapPanel").scale9Grid( {top:10, bottom:10, left:10, right:10} );
		$('.modePanel').scale9Grid( {top:10, bottom:15, left:15, right:10} );
		
		//Hide the "change maps" button by default	
		$("#changeMapBtnHolder").css("visibility", "hidden");
				
		//Add handlers
		$("#mainMenuBtn").click(this.onMainMenuClick);
		$("#changeMapBtn").click(this.onChangeMapsClick);
		$("#normalPlayBtn").click($.proxy(this, "onPlayClick"));
		$("#suddenDeathPlayBtn").click($.proxy(this, "onPlayClick"));
		$("#epicPlayBtn").click($.proxy(this, "onPlayClick"));
			
		for (var i=1, l=MapInfo.maps.length; i <= l; i++){
			if(MapInfo.canPlayMap(i)) {
				$("#map" + i).click($.proxy(this, 'onMapSelect'));
				$("#map" + i).mouseover(this.onMapMouseOver);
				$("#map" + i).mouseout(this.onMapMouseOut);
				$("#highScore" + i).html("High Score: " + LocalStorage.getScore(i).commaDelimit());
			} else {
				$("#highScore" + i).css('font-size','22px');
				$("#map" + i).css('cursor', 'auto');
				$("#map" + i).css('opacity', '.7'); 
				$("#highScore" + i).html("Play "+ MapInfo.getTitleByIndex(MapInfo.requiredLevels[i])+" to Unlock");
			}
		}
	},
	
	onMapSelect: function (evt) {	
		//Hide main view elements
		
		$(".mapPanel img").css("visibility", "inherit");				
		$("#modeViewDiv").css("visibility", "visible");
		$("#mapViewDiv").css("visibility", "hidden");
		$("#changeMapBtnHolder").css("visibility", "visible");
		
		$("#mapTitleTxt").html("Choose a Mode");
		
		var headerText;
		var imgSrc;
		switch (evt.target.id) {
			case "map1":		
				//headerText = "Coconut Coast";
				imgSrc = "img/ui/mapButtonCoconutCove.png";
				this.mapID = 1; 				
				break;
			case "map2":
				//headerText = "Rum Alley";
				imgSrc = "img/ui/mapButtonRumAlley.png";		
				this.mapID = 2; 						
				break;
			case "map3":
				//headerText = "Treasure Island";
				imgSrc = "img/ui/mapButtonTreasureIsland.png";
				this.mapID = 3; 
				break;
			case "map4":
				//headerText = "Hidden Hideaway";
				imgSrc = "img/ui/mapButtonHiddenHideaway.png";
				this.mapID = 4; 
				break;
			default: return;
		}
		var headerText = MapInfo.maps[this.mapID];
		
		$("#modeMapHeader").html(headerText);
		$("#modeMapImg").get(0).src = imgSrc;
		AudioManager.playSound(AudioManager.CLICK);

		$("#normalScore").html("your best: " + LocalStorage.getScore(this.mapID, GameInfo.NORMAL_MODE).commaDelimit());
		
		//default view for each map 
		$("#suddenScore").css("visibility", "hidden");
		$("#epicScore").css("visibility", "hidden");
		$("#suddenDeathPlayBtn").css("visibility", "hidden");
		$("#epicPlayBtn").css("visibility", "hidden");
		$("#suddenLocked").css("visibility", "visible");
		$("#epicLocked").css("visibility", "visible");
		
		//Check the mode status for selected map, toggle mode play btn visible/hidden, and set score for modes
		if(LocalStorage.getMapComplete(this.mapID, GameInfo.NORMAL_MODE)){
			$("#suddenScore").css("visibility", "visible");
			$("#suddenDeathPlayBtn").css("visibility", "visible");
			$("#suddenLocked").css("visibility", "hidden");
			$("#suddenScore").html("your best: " + LocalStorage.getScore(this.mapID, GameInfo.SUDDEN_DEATH_MODE).commaDelimit());
		}
		
		if(LocalStorage.getMapComplete(this.mapID, GameInfo.SUDDEN_DEATH_MODE)){
			$("#epicScore").css("visibility", "visible");
			$("#epicPlayBtn").css("visibility", "visible");
			$("#epicLocked").css("visibility", "hidden");
			$("#epicScore").html("your best: " + LocalStorage.getScore(this.mapID, GameInfo.EPIC_MODE).commaDelimit());
		}
	},
	
	onPlayClick: function (evt) {
		var mode; 
		switch (evt.target.id) {
			case "normalPlayBtn":
				mode = GameInfo.NORMAL_MODE; break;
			case "suddenDeathPlayBtn":
				mode = GameInfo.SUDDEN_DEATH_MODE; break;
			case "epicPlayBtn":
				mode = GameInfo.EPIC_MODE; break;		
			default: return;
		}
		AudioManager.playSound(AudioManager.CLICK);
		
		startNewGame(this.mapID, mode);
	},
	
			
	onChangeMapsClick: function (evt) {
		//reset the visibility for each toggled element 
		$("#suddenDeathPlayBtn").css("visibility", "inherit");
		$("#epicPlayBtn").css("visibility", "inherit");
		$("#suddenScore").css("visibility", "inherit");
		$("#epicScore").css("visibility", "inherit");
		$("#suddenLocked").css("visibility", "inherit");
		$("#epicLocked").css("visibility", "inherit");
		
		$("#modeViewDiv").css("visibility", "hidden");
		$("#mapViewDiv").css("visibility", "visible");		
		$("#changeMapBtnHolder").css("visibility", "hidden");
		AudioManager.playSound(AudioManager.CLICK);
	},
	
	
	onMapMouseOver: function (evt) {
		var id = evt.target.id + "Over";
		$("#"+id).css('visibility', 'visible');
	},
	
	onMapMouseOut: function(evt) {
		var id = evt.target.id + "Over";
		$("#"+id).css('visibility', 'hidden');	
	},
	
	onMainMenuClick: function (evt) {
		AudioManager.playSound(AudioManager.CLICK);
		ViewManager.show(ViewManager.START_SCREEN);	
	}		
} 
	
	
	
				
		
		