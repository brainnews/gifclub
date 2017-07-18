var duration;
var visuals;
var millis = 0;
var counter = null;
var isPaused = true;

var player;

SC.initialize({
	client_id: 'ARX6YqJeUZYURsTksMBlqrzkPmdLqI3x'
});

// $(musicSearch).keydown(function( event ) {
// 	if ( event.which == 13 ) {
// 	   LoadTrack(musicSearch.value);
// 	}
// });

function LoadPlaylist (q, t) {
	$.get(
	  'http://api.soundcloud.com/resolve.json?url=' + q + '&client_id=ARX6YqJeUZYURsTksMBlqrzkPmdLqI3x', 
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
    player = SC.stream(track);
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