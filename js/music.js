var duration;
var visuals;
var playing = false;
var millis = 0;
var counter = null;
var isPaused = true;
var trackInfoContainer = document.getElementById('trackInfoContainer');
var soundCloudSearch = document.getElementById('soundCloudSearch');
var loadedTrackInfoContainer = document.getElementById('loadedTrackInfoContainer');
var loadTrackButton = document.getElementById('loadTrackButton');
var editLoadedTrackButton;
var clientId = 'ARX6YqJeUZYURsTksMBlqrzkPmdLqI3x';
var playlistTracks = [];
var currentTrackNum = 0;
var ended;
var editorLoaded = null;
var userStarted = false;
var loadedTrackUrl;
var trackScrubber = document.getElementById('trackScrubber');
var editorGifSearch = document.getElementById('editorGifSearch');
var msDuration;
var gifSearchTimecode;
var editorArray = [];
var editorPlayPauseButton = document.getElementById('editorPlayPauseButton');
var trackControls = document.getElementById('trackControls');
var soundCloudSearchContainer = document.getElementById('soundCloudSearchContainer');

var trackInputHtml = "<input id='soundCloudSearch' class='input-small' type='text' placeholder='Enter a SoundCloud URL (Track, Artist, or Playlist)' name='soundcloud-search'>";

// SC.initialize({
// 	client_id: 'ARX6YqJeUZYURsTksMBlqrzkPmdLqI3x'
// });

var widgetIframe = document.getElementById('sc-widget'), 
widget = SC.Widget(widgetIframe);

widget.bind(SC.Widget.Events.READY, function() { 
	widget.bind(SC.Widget.Events.PLAY, function() {
		// get information about currently playing sound 
		widget.getCurrentSound(function(currentSound) {
			var maxLength = 22;
			var title = currentSound.title;
			var artist = currentSound.user.username;
			var url = currentSound.permalink_url;

			if (editorLoaded) {
				$(loadedTrackInfoContainer).html("<p>" + title + " by " + artist + " <i onclick='ClearEditorTrack();' class='fa fa-pencil' aria-hidden='true' style='cursor: pointer; margin-left: 5px;'></i></p>");

			} else {
				$(trackInfoContainer).attr("href", url);
				if (title.length > maxLength) {
					var truncatedTitle = title.substring(0, maxLength);
					$(trackInfoContainer).html("Now playing: " + truncatedTitle + "... by " + artist);
				} else {
					$(trackInfoContainer).html("Now playing: " + title + " by " + artist);
				}
			}
		});
		widget.getDuration(function(duration) {
			msDuration = duration;
		});
		if (!userStarted) {
			widget.seekTo(0);
			widget.pause();
		}
	});
	widget.bind(SC.Widget.Events.FINISH, function() {
		console.log("Track finished");
		playing = false;
		$(editorPlayPauseButton).removeClass('fa-pause').addClass('fa-play');
	});
	widget.bind(SC.Widget.Events.PLAY_PROGRESS, function() {
		widget.getPosition(function(position) {
			gifSearchTimecode = msToTime(position);
			$('.active-time-code').html(gifSearchTimecode);
			var trackProgress = msToPercent(position, msDuration);
			$(trackScrubber).val(trackProgress);
		});
	});
});

$(soundCloudSearch).keydown(function( event ) {
	if ( event.which == 13 ) {
	   	FetchTrackForEditor();
	}
});


function FetchTrackForEditor(){
	editorLoaded = true;
	$(soundCloudSearchContainer).toggleClass("hide");
	$(loadedTrackInfoContainer).toggleClass("hide").html("<p>Loading</p>");
	LoadTrackForEditor(soundCloudSearch.value);
	$(trackControls).toggleClass("hide");
}

function LoadSoundToWidget (q, t, g) {
	// var q = musicSearch.value;
	editorLoaded = false;
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
	editorLoaded = true;
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

function msToTime(duration) {
    var seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
}

function msToPercent(milliseconds, duration) {
	return ((milliseconds/duration) * 100);
}

$(trackScrubber).on('input', function (){
	var seekPosition = msDuration * (trackScrubber.value / 100);
	console.log(trackScrubber.value);
    widget.seekTo(seekPosition);
});

$(editorGifSearch).focus(function(){
	console.log(gifSearchTimecode);
});

$(editorGifSearch).keydown(function( event ) {
	if ( event.which == 13 ) {
	   	PushVisualToArray(editorGifSearch.value, gifSearchTimecode);
	}
});

$(editorPlayPauseButton).click(function(){
	if(playing) {
		widget.pause();
		$(editorPlayPauseButton).removeClass('fa-pause').addClass('fa-play');
		playing = false;
	} else if (!playing) {
		widget.play();
		$(editorPlayPauseButton).removeClass('fa-play').addClass('fa-pause');
		playing = true;
		userStarted = true;
	}
});

function ClearEditorTrack(){
	editorLoaded = false;
	userStarted = false;
	playing = false;
	widget.pause();
	$(editorPlayPauseButton).removeClass('fa-pause').addClass('fa-play');
	$(loadedTrackInfoContainer).toggleClass("hide");
	$(soundCloudSearchContainer).toggleClass("hide");
	$(trackControls).toggleClass("hide");
	soundCloudSearch = document.getElementById('soundCloudSearch');
}