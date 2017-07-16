var widgetContainer = document.getElementById("soundcloudContainer");
var widgetIframe = document.getElementById('sc-widget'), 
widget = SC.Widget(widgetIframe);
var duration;
var visuals;
var millis = 0;
var counter = null;
var isPaused = true;

widget.bind(SC.Widget.Events.READY, function() { 
	widget.bind(SC.Widget.Events.PLAY, function() { 
		// get information about currently playing sound 
		widget.getCurrentSound(function(currentSound) {
			duration = currentSound.duration;
			// trackArtist = currentSound.user.username;
			// trackUrl = currentSound.permalink_url;
		});
	});
});
// $(musicSearch).keydown(function( event ) {
// 	if ( event.which == 13 ) {
// 	   LoadTrack(musicSearch.value);
// 	}
// });

function LoadPlaylist (q, t) {
	widget.load(q, {
		"auto_play": "true",
		"buying": "false",
		"liking": "false",
		"download": "false",
		"sharing": "false",
		"show_artwork": "false",
		"show_comments": "false",
		"show_playcount": "false",
		"show_user": "false"
	});
	visuals = t;
	PlayVisuals();
}

function PlayVisuals() {
	counter = setInterval(function(){
		for (x in visuals) {
	    	if (ConvertTimestamp(x) == millis) {
	    		console.log("timestamp matched!");
	    		GetGifs(visuals[x]);
	    	}
		}
		millis = millis + 1000;
	}, 1000);
}

function ConvertTimestamp(timestamp) {
	var a = timestamp.split(":");
	var timeInMs = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);;
	return timeInMs * 1000;
}

function ResetMusic() {
	clearInterval(counter);
	widget.pause();
	millis = 0;
}

if (duration == millis) {
	ResetMusic();
}