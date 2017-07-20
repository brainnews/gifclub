var duration;
var visuals;
var millis = 0;
var counter = null;
var isPaused = true;
var trackArtistCon = document.getElementById('trackArtistCon');
var trackTitleCon = document.getElementById('trackTitleCon');
var trackUrlCon = document.getElementById('trackUrlCon');
var soundCloudSearch = document.getElementById('soundCloudSearch');
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
	var track = '/tracks/333741455'; //+ playlist.tracks[0].id;
	player = SC.stream(track, function(sound) {
		sound.on('play', function(){
			LogConsole();
		});
	});
}

function LogConsole() {
	console.log("playing");
}

if (player) {
	player.on(play, function() {
		console.log("playing");
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