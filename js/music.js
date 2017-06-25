var trackTitle;
var trackArtist;
var trackInfoContainer = document.getElementById("trackTitle");
var musicSearch = document.getElementById("musicSearch");


var widgetIframe = document.getElementById('sc-widget'), 
widget = SC.Widget(widgetIframe); 

	widget.bind(SC.Widget.Events.READY, function() { 
		widget.bind(SC.Widget.Events.PLAY, function() { 
		// get information about currently playing sound 
		widget.getCurrentSound(function(currentSound) { 
		trackTitle = currentSound.title;
		trackArtist = currentSound.user.username;
		trackInfoContainer.innerHTML = '<strong>' + trackTitle + '</strong> by ' + trackArtist; 
		}); 
	}); 
}); 

$(popupGridWrapper).click(function(){
	$('.collapsible').collapsible('close', 0);
})

$(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
});

function LoadTrack () {
	var q = musicSearch.value;
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