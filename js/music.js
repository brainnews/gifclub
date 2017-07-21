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
var playlistTracks = [];
var currentTrackNum = 0;
var ended;

var scPlayer;

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
	  'http://api.soundcloud.com/resolve.json?url=' + q + '&client_id=' + clientId, function (result) {
	  		console.log(result);
	    	ParsePlaylist(result);
	    	visuals = t;
			PlayVisuals();
			PlayPlaylist();
	  	}
	);
}

function ResolvePlaylist(url) {
	SC.resolve(url).then(function(playlist){
		var trackCount = playlist.tracks.length;
		for (var i = 0; i < trackCount; i++) {
			playlistTracks.push(playlist.tracks[i].id);
		}
        PlayPlaylist();
    });
}

function PlayPlaylist(){

  SC.stream('/tracks/' + playlistTracks[currentTrackNum]).then(function(player){       
    //scPlayer = player;  
    //trackDuration = scPlayer.options.duration;
    ended = false;
    player.on('finish', function (){
        console.log("finished track");
        currentTrackNum++;
        if (currentTrackNum < playlistTracks.length) {
        	console.log("playing track: " + (currentTrackNum + 1));
        	PlayPlaylist();
        } else {
        	player.pause();
        	ended = true;
        	console.log("playlist ended");
        	currentTrackNum = 0;
        }
    });
    if (!ended) {
	    player.play();
	}
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