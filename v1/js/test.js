var trackUrl = 'https://soundcloud.com/miles-gilbert-2/sets/cute-visuals-thegif-club';
var testPlaylist;
var testTrack;
var trackArtistCon = document.getElementById('trackArtistCon');
var trackTitleCon = document.getElementById('trackTitleCon');
var playlistNameCon = document.getElementById('playlistNameCon');
var trackUrlCon = document.getElementById('trackUrlCon');
var pauseButton = document.getElementById('pauseButton');
var playButton = document.getElementById('playButton');

var player;

SC.initialize({
	client_id: 'WdmgKDChQxn0MXrmogfO6l8QXAdcihnC'
});

$.get(
  'http://api.soundcloud.com/resolve.json?url=' + trackUrl + '&client_id=WdmgKDChQxn0MXrmogfO6l8QXAdcihnC', 
  	function (result) {
  		console.log(result);
    	PlayPlaylist(result);
  	}
);

function PlayPlaylist(playlist) {
	$(playlistNameCon).html(playlist.title);
	$(trackTitleCon).html(playlist.tracks[0].title);
	$(trackArtistCon).html(playlist.tracks[0].user.username);
	$(trackUrlCon).html('<a href=' + playlist.tracks[0].permalink_url + ' target="_blank">View on SoundCloud</a>');
	testTrack = '/tracks/' + playlist.tracks[0].id;
    player = SC.stream(testTrack);
}

$(pauseButton).click(function(){
  	player.then(function(player){
  		player.pause();
  	});
});

$(playButton).click(function(){
  	player.then(function(player){
  		player.play();
  	});
});

$(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  });