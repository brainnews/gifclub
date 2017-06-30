var trackTitle;
var trackArtist;
var trackUrl;
var paused = false;
var trackCount = 0;
<<<<<<< HEAD
=======
var playlistLength;
>>>>>>> 0b137df49cb72e4874d0912094d4d44f3d182d58

var trackUrlContainer = document.getElementById("trackUrlContainer");
var trackInfoContainer = document.getElementById("trackTitle");
var musicSearch = document.getElementById("musicSearch");
var prevTrackButton = document.getElementById("prevTrackButton");
var nextTrackButton = document.getElementById("nextTrackButton");
var pauseTrackButton = document.getElementById("pauseTrackButton");

var widgetIframe = document.getElementById('sc-widget'), 
widget = SC.Widget(widgetIframe); 

widget.bind(SC.Widget.Events.READY, function() { 
	widget.bind(SC.Widget.Events.PLAY, function() { 
		// get information about currently playing sound 
		widget.getCurrentSound(function(currentSound) {
			trackTitle = currentSound.title;
			trackArtist = currentSound.user.username;
			trackUrl = currentSound.permalink_url;
			trackInfoContainer.innerHTML = '<strong>' + trackTitle + '</strong> by ' + trackArtist;
			trackUrlContainer.innerHTML = '<a href="' + trackUrl + '" target="_blank">View track on SoundCloud</a>';
		});
		widget.getSounds(function(sounds) {
			playlistLength = sounds.length;

			if (playlistLength > 1) {
				console.log("Playlist loaded.");
			} else {
				console.log("Single track loaded.");
			}
		});
	});
	widget.bind(SC.Widget.Events.FINISH, function() {
		trackCount++;
		if (customChannelActive) {
			LoadTrack(customChannel.playlist[trackCount]);
		}
		GetGifs(activeVisualsArray[trackCount]);
	}); 
});

$(musicSearch).keydown(function( event ) {
	if ( event.which == 13 ) {
	   LoadTrack(musicSearch.value);
	}
});

function LoadTrack (q) {
	// var q = musicSearch.value;
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
	$('.collapsible').collapsible('close', 0);
	$(musicSearch).val("");
}

$(prevTrackButton).click(function(){
	if (trackCount > 0) {
		trackCount--;
		if (customChannelActive) {
			LoadTrack(customChannel.playlist[trackCount]);
			} else {
			widget.next();
		}
		GetGifs(activeVisualsArray[trackCount]);
	}
});

$(nextTrackButton).click(function(){
	trackCount++;
	if (customChannelActive && trackCount < playlist.length) {
		LoadTrack(activeChannel.playlist[trackCount]);
		GetGifs(activeChannel.visuals[trackCount]);
	}
	if (trackCount == playlistLength) {
		trackCount = 0;
		GetGifs(activeChannel.visuals[trackCount]);
		LoadTrack(activeChannel.playlist[trackCount]);
	} else {
		widget.next();
	}
});

$(pauseTrackButton).click(function(){
	if (!paused) {
		widget.pause();
		$(this).html('<i class="fa fa-play" aria-hidden="true"></i>');
		paused = true;
	} else {
		widget.play();
		$(this).html('<i class="fa fa-pause" aria-hidden="true"></i>');
		paused = false;
	}
});