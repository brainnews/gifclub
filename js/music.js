var trackTitle;
var trackArtist;
var trackInfoContainer = document.getElementById("trackTitle");

(function(){ 
	var widgetIframe = document.getElementById('sc-widget'), 
	widget = SC.Widget(widgetIframe); 

		widget.bind(SC.Widget.Events.READY, function() { 
			widget.bind(SC.Widget.Events.PLAY, function() { 
			// get information about currently playing sound 
			widget.getCurrentSound(function(currentSound) { 
			trackTitle = currentSound.title;
			trackArtist = currentSound.user.username;
			trackInfoContainer.innerHTML = 'Now playing: <strong>' + trackTitle + '</strong> by ' + trackArtist; 
			}); 
		}); 
	}); 
}());