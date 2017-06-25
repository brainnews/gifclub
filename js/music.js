var trackTitle;
var trackArtist;
var trackUrl;
var paused = false;
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
			console.log(currentSound); 
			trackTitle = currentSound.title;
			trackArtist = currentSound.user.username;
			trackUrl = currentSound.permalink_url;
			trackInfoContainer.innerHTML = '<strong>' + trackTitle + '</strong> by ' + trackArtist;
			trackUrlContainer.innerHTML = '<a href="' + trackUrl + '" target="_blank">View track on SoundCloud</a>';
		}); 
	}); 
}); 

widget.bind(SC.Widget.Events.READY, function() { 
	widget.bind(SC.Widget.Events.FINISH, function() {
		console.log("Track finished.");
	});
});

$(popupGridWrapper).click(function(){
	$('.collapsible').collapsible('close', 0);
})

$(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
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
	widget.prev();
});

$(nextTrackButton).click(function(){
	widget.next();
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