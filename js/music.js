var duration;
var visuals;
var millis = 0;
var counter = null;
var isPaused = true;
var trackInfoContainer = document.getElementById('trackInfoContainer');
var soundCloudSearch = document.getElementById('soundCloudSearch');
var clientId = 'ARX6YqJeUZYURsTksMBlqrzkPmdLqI3x';
var playlistTracks = [];
var currentTrackNum = 0;
var ended;

// SC.initialize({
// 	client_id: 'ARX6YqJeUZYURsTksMBlqrzkPmdLqI3x'
// });

var widgetIframe = document.getElementById('sc-widget'), 
widget = SC.Widget(widgetIframe);

widget.bind(SC.Widget.Events.READY, function() { 
	widget.bind(SC.Widget.Events.PLAY, function() {
		// get information about currently playing sound 
		widget.getCurrentSound(function(currentSound) {
			console.log(currentSound);
			var maxLength = 22;
			var title = currentSound.title;
			var artist = currentSound.user.username;
			var url = currentSound.permalink_url;
			$(trackInfoContainer).attr("href", url);
			if (title.length > maxLength) {
				var truncatedTitle = title.substring(0, maxLength);
				$(trackInfoContainer).html("Now playing: " + truncatedTitle + "... by " + artist);
			} else {
				$(trackInfoContainer).html("Now playing: " + title + " by " + artist);
			}
		});
		widget.getDuration(function(duration) {
			console.log("Song duration: " + duration);
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
		console.log("Track finished");
	}); 
});

$(soundCloudSearch).keydown(function( event ) {
	if ( event.which == 13 ) {
	   LoadTrackForEditor(soundCloudSearch.value);
	}
});

function LoadSoundToWidget (q, t, g) {
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
	visuals = t;
	gpm = g;
	PlayVisuals();
}

function LoadTrackForEditor (q) {
	$.get(
	  'http://api.soundcloud.com/resolve.json?url=' + q + '&client_id=' + clientId, 
	  	function (result) {
	  		console.log(result);
	  	}
	);
}

function ResolvePlaylist(url) {
	SC.resolve(url).then(function(playlist){
		var trackCount = playlist.tracks.length;
		for (var i = 0; i < trackCount; i++) {
			playlistTracks.push(playlist.tracks[i].id);
		}
    });
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

function StopSelectsVisuals() {
	clearInterval(counter);
	millis = 0;
}

if (duration == millis) {
	widget.pause();
}