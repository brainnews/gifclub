SC.initialize({
	    	client_id: 'WdmgKDChQxn0MXrmogfO6l8QXAdcihnC',
	    	redirect_uri: 'http://example.com/callback'
	  	});

var trackUrl = 'https://soundcloud.com/miles-gilbert-2/sets/cute-visuals-thegif-club';
var testPlaylist;
var testTrack;

$.get(
  'http://api.soundcloud.com/resolve.json?url=' + trackUrl + '&client_id=WdmgKDChQxn0MXrmogfO6l8QXAdcihnC', 
  function (result) {
    console.log(result);
    testPlaylist = result;
    testTrack = '/tracks/' + testPlaylist.tracks[0].id;
    SC.stream(testTrack).then(function(player){
  		player.play();
	});
  }
);