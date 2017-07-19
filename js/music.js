var duration;
var visuals;
var millis = 0;
var counter = null;
var isPaused = true;
var trackArtistCon = document.getElementById('trackArtistCon');
var trackTitleCon = document.getElementById('trackTitleCon');
var trackUrlCon = document.getElementById('trackUrlCon');
var soundCloudSearch = document.getElementById('soundCloudSearch');
var waveformContainer = document.getElementById('waveformContainer');
var waveformCanvas = document.getElementById('waveformCanvas');
var clientId = 'ARX6YqJeUZYURsTksMBlqrzkPmdLqI3x';

var player;

SC.initialize({
	client_id: 'ARX6YqJeUZYURsTksMBlqrzkPmdLqI3x'
});

$(soundCloudSearch).keydown(function( event ) {
	if ( event.which == 13 ) {
	   LoadTrackForEditor(soundCloudSearch.value);
	}
});

function LoadTrackForEditor (q) {
	$.get(
	  'http://api.soundcloud.com/resolve.json?url=' + q + '&client_id=' + clientId, 
	  	function (result) {
	  		console.log(result);
	  		$(waveformContainer).html('<canvas id="waveformCanvas"></canvas>');
	  		var waveFormUrl = result.waveform_url;
	  		var canvasHeight = $(waveformCanvas).parent().height();
	  		var canvasWidth = $(waveformCanvas).parent().width();
	  		$(waveformCanvas).attr("height", canvasHeight);
	  		$(waveformCanvas).attr("width", canvasWidth);
	  		// $(waveformContainer).css("background-image", 'url(' + waveFormUrl + ')');
	  		// $(waveformContainer).html('');
	  	}
	);
}

function LoadPlaylist (q, t) {
	$.get(
	  'http://api.soundcloud.com/resolve.json?url=' + q + '&client_id=' + clientId, 
	  	function (result) {
	  		console.log(result);
	    	ParsePlaylist(result);
	    	visuals = t;
			PlayVisuals();
			PlayMusic();
	  	}
	);
}

function PlayMusic() {
	player.then(function(player){
  		player.play();
  	});
}

function PauseMusic() {
	if (player) {
		player.then(function(player){
	  		player.pause();
	  	});
	}
}

function ParsePlaylist(playlist) {
	var track = '/tracks/' + playlist.tracks[0].id;
    player = SC.stream(track, function(){
    	player.on('finish', function(){
			console.log("finished");
		});
    });
}

function PlayVisuals() {
	counter = setInterval(function(){
		for (x in visuals) {
	    	if (ConvertTimestamp(x) == millis) {
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
	PauseMusic();
	millis = 0;
}

if (duration == millis) {
	PauseMusic();
}