var addTrackButton = document.getElementById("addTrackButton");
var customPlaylistTable = document.getElementById("customPlaylistTable");
var clearCustomPlaylistButton = document.getElementById("clearCustomPlaylistButton");
var startCustomPlaylistButton = document.getElementById("startCustomPlaylistButton");
var customTrackCount = 1;
var newTrackHTML;
var clearTracksHTML = '<tr><td><input placeholder="SoundCloud URL" id="customTrackUrl1" type="text"></td><td><input placeholder="GIPHY Search" id="customGiphySearch1" type="text"></td><td class="track-delete-btn"><i class="material-icons">delete</i></td></tr>';
var customTracksArray;
var customVisualsArray;

$(addTrackButton).click(function(){
	customTrackCount++;
	newTrackHTML = '<tr><td><input placeholder="SoundCloud URL" id="customTrackUrl' + trackCount + '" type="text"></td><td><input placeholder="GIPHY Search" id="customGiphySearch' + trackCount + '" type="text"></td><td class="track-delete-btn"><i class="material-icons">delete</i></td></tr>';
	$(customPlaylistTable).append(newTrackHTML);
});

$(document).on('click', '.track-delete-btn', function() {
    $(this).parent().remove();
    customTrackCount--;
});

$(clearCustomPlaylistButton).click(function(){
	$(customPlaylistTable).html(clearTracksHTML);
	customTrackCount = 1;
});

$(startCustomPlaylistButton).click(function(){
	CreateCustomChannel();
});

function CreateCustomChannel(){	
	for (var i = 1; i <= customTrackCount; i++) {
		var track = $('customTrackUrl' + i).val();
		var visual = $('customGiphySearch' + i).val();
		if (track != '') {
			console.log(track);
			customTracksArray.push(track);
		}
		if (visual != '') {
			console.log(visual);
			customVisualsArray.push(visual);
		}
	}
	console.log(customTracksArray);
	console.log(customVisualsArray);
}