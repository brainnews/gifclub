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
//var trackScrubber = document.getElementById('trackScrubber');
var msDuration;
var gifSearchTimecode;
var editorArray = [];
var editorPlayPauseButton = document.getElementById('editorPlayPauseButton');
var soundCloudSearchContainer = document.getElementById('soundCloudSearchContainer');
var trackDurationContainer = document.getElementById('trackDurationContainer');
var scrubberInputContainer = document.getElementById('scrubberInputContainer');
var scrubberButton = document.getElementById('scrubberButton');
var scrubberInput = document.getElementById('scrubberInput');
var scrubberInputOpen = false;
var trackProgress;
var trackMillis;
var previewTimelineButton = document.getElementById("previewTimelineButton");

var trackInputHtml = "<input id='soundCloudSearch' class='input-small' type='text' placeholder='Enter a SoundCloud URL (Track, Artist, or Playlist)' name='soundcloud-search'>";

var pipHtmlPre = '<div class="noUi-value noUi-value-horizontal noUi-value-large search-pip" style="left: ';

var slider = document.getElementById('trackScrubber');

var editorMenuHtml = 
				"<a class='dropdown-button' href='#' data-activates='dropdown1'><i class='material-icons'>more_vert</i></a><ul id='dropdown1' class='dropdown-content'><li><a href='#!'>Save track</a></li><li class='divider'></li><li><a href='#!''>Clear track</a></li></ul>";

noUiSlider.create(slider, {
	start: [0],
	connect: [true, false],
	range: {
	 'min': 0,
	 'max': 100
	},
	pips: {
		mode: 'positions',
		values: [],
		density: 4
	}
});

var pips = slider.querySelector('.noUi-pips');

var customTrack = {
	"name": "Test",
	"timeline": {

	}
};

var timeline = {};

// SC.initialize({
// 	client_id: 'ARX6YqJeUZYURsTksMBlqrzkPmdLqI3x'
// });

var widgetIframe = document.getElementById('sc-widget'), 
widget = SC.Widget(widgetIframe);

widget.bind(SC.Widget.Events.READY, function() { 
	widget.bind(SC.Widget.Events.PLAY, function() {
		// get information about currently playing sound 
		widget.getCurrentSound(function(currentSound) {
			var art = currentSound.artwork_url;
			var maxLength = 22;
			var title = currentSound.title;
			var artist = currentSound.user.username;
			var url = currentSound.permalink_url;

			if (editorLoaded) {
				$(loadedTrackInfoContainer).html(
					'<div class="row valign-wrapper mb-0"><div class="col s4 pl-0"><img onclick="ClearEditorTrack();" src="' + art + '" class="circle responsive-img ml-0 track-art"></div><div class="col s8"><a class="truncate" href="' + url + '" target="_blank">' + title + '</a>' + artist + '</div></div>'
					);
				
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
			$(trackDurationContainer).html(" / " + msToTime(msDuration));
		});
		if (!userStarted) {
			widget.seekTo(0);
			widget.pause();
		}
	});

	widget.bind(SC.Widget.Events.FINISH, function() {
		playing = false;
		$(editorPlayPauseButton).removeClass('fa-pause').addClass('fa-play');
	});

	widget.bind(SC.Widget.Events.PLAY_PROGRESS, function() {
		widget.getPosition(function(position) {
			gifSearchTimecode = msToTime(position);
			trackMillis = Math.round(position / 100) * 100;
			//trackMillis = Math.trunc(position);
			$('.active-time-code').html(gifSearchTimecode);
			trackProgress = msToPercent(position, msDuration);
			slider.noUiSlider.set(trackProgress);
			if (trackProgress >= 80 && scrubberInputOpen == true) {
				$(scrubberButtonContainer).css("margin-left", "-145px");
			} else {
				$(scrubberButtonContainer).css("margin-left", "-15px");
			}
			$(scrubberButtonContainer).css("left", trackProgress + "%");

			for (x in timeline) {
		    	if (x == trackMillis) {
		    		console.log("Search: " + timeline[x]);
		    		GetGifs(timeline[x]);
		    	}
			}

		});
	});

	widget.bind(SC.Widget.Events.PAUSE, function() {
		playing = false;
		$(editorPlayPauseButton).removeClass('fa-pause').addClass('fa-play');
	});

	widget.bind(SC.Widget.Events.PLAY, function() {
		playing = true;
		$(editorPlayPauseButton).removeClass('fa-play').addClass('fa-pause');
	});
});

$(soundCloudSearch).keydown(function( event ) {
	if ( event.which == 13 ) {
	   	FetchTrackForEditor();
	}
});

function TogglePlayerControls(){
	$(soundCloudSearchContainer).toggleClass("hide");
	$(loadedTrackInfoContainer).toggleClass("hide").html("<p class='center-align'><i class='fa fa-spinner fa-spin' aria-hidden='true'></i></p>");
	$('.track-controls').toggleClass("invisible");
	$('#editorPlayer').toggleClass("editor-player");
}

function FetchTrackForEditor(){
	editorLoaded = true;
	TogglePlayerControls();
	LoadTrackForEditor(soundCloudSearch.value);
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

// function PreviewTimeline() {
// 	counter = setInterval(function(){
// 		for (x in timeline) {
// 	    	if (x == millis) {
// 	    		console.log("Search: " + timeline[x]);
// 	    		GetGifs(timeline[x]);
// 	    	}
// 		}
// 		millis = millis + 1000;
// 	}, 1000);
// }

// $(previewTimelineButton).click(function(){
// 	PreviewTimeline();
// });

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

    if (hours > 0) {
    	return hours + ":" + minutes + ":" + seconds;
    } else {
    	return minutes + ":" + seconds;
    }
}

function msToPercent(milliseconds, duration) {
	return ((milliseconds/duration) * 100);
}

// $(trackScrubber).on('input', function (){
// 	var seekPosition = msDuration * (trackScrubber.value / 100);
// 	console.log(trackScrubber.value);
//     widget.seekTo(seekPosition);
// });

slider.noUiSlider.on('slide', function(){
	var seekPosition = slider.noUiSlider.get();
	var seekPercentage = msDuration * (seekPosition / 100);
    widget.seekTo(seekPercentage);
});


$(editorPlayPauseButton).click(function(){
	if(playing) {
		widget.pause();
	} else if (!playing) {
		widget.play();
		userStarted = true;
	}
});

function ClearEditorTrack(){
	editorLoaded = false;
	userStarted = false;
	playing = false;
	widget.pause();
	TogglePlayerControls();
	soundCloudSearch = document.getElementById('soundCloudSearch');
}

$(scrubberButton).click(function() {
	scrubberInputOpen = true;
	widget.pause();
	$(scrubberButton).addClass('hide');
	$(scrubberInputContainer).removeClass('hide');
});

$('.input-close').click(function() {
	CloseGifSearch();
});

$(scrubberInput).keydown(function( event ) {
	if ( event.which == 13 ) {
		//create and populate the key value pair in timeline
	   	timeline[trackMillis] = scrubberInput.value;
	   	GetGifs(scrubberInput.value);
	   	$(pips).append(pipHtmlPre + trackProgress + '%;" data-millis="' + trackMillis + '">' + scrubberInput.value + '</div>');
	  	createDraggable();
	   	CloseGifSearch();
	}
});

function createDraggable() {
	var recoupLeft, recoupTop;
	var positionInPercent;
	var currentMillis;
	var newMillis;
	var elHeight = $(this).height();
	$('search-pip').resizable({
		maxHeight: elHeight,
      	minHeight: elHeight
	});
	$('.search-pip').draggable({
		addClasses: false,
		axis: 'x',
		containment: pips,
		scroll: false,
		cursor: 'ew-resize',
		start: function (event, ui) {
            var left = parseInt($(this).css('left'),10);
            left = isNaN(left) ? 0 : left;
            var top = parseInt($(this).css('top'),10);
            top = isNaN(top) ? 0 : top;
            recoupLeft = left - ui.position.left;
            recoupTop = top - ui.position.top;
            //get current position of search in millis
            currentMillis = $(this).attr('data-millis');
        },
        drag: function (event, ui) {
            ui.position.left += recoupLeft;
            ui.position.top += recoupTop;
        },
        stop: function (event, ui) {
        	//update HTML position to be in percent rather than px (not entirely necessary, but I like it for cleanliness)
        	positionInPercent = (ui.position.left / pips.offsetWidth) * 100;
			$(this).css('left', Math.round(positionInPercent * 10) / 10 + '%');
        	//get new position of search in millis
        	newMillis = Math.round(Math.trunc(positionInPercent / 100 * msDuration) / 100) * 100;
        	//newMillis = Math.trunc(positionInPercent / 100 * msDuration);
        	//update data-millis with new position in millis
        	$(this).attr('data-millis', newMillis);
        	//push new millis to timeline and delete old one
        	timeline[newMillis] = timeline[currentMillis];
			delete timeline[currentMillis];
        }
	});
}

function CloseGifSearch(){
	scrubberInputOpen = false;
	widget.play();
	$(scrubberInput).val('');
	$(scrubberInputContainer).addClass('hide');
	$(scrubberButton).removeClass('hide');
}