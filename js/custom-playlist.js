var addTrackButton = document.getElementById("addTrackButton");
var customPlaylistTable = document.getElementById("customPlaylistTable");
var clearCustomPlaylistButton = document.getElementById("clearCustomPlaylistButton");
var startCustomPlaylistButton = document.getElementById("startCustomPlaylistButton");
var customTrackCount;
var newTrackHTML;
var clearTracksHTML = '<tr><td><input placeholder="SoundCloud URL" id="customTrackUrl0" type="text"></td><td><input placeholder="GIPHY Search" id="customGiphySearch0" type="text"></td><td class="track-delete-btn"><i class="material-icons">delete</i></td></tr>';
var customTracksArray = [];
var customVisualsArray  = [];
var customChannel = false;

$(addTrackButton).click(function(){
	customTrackCount = $(customPlaylistTable).children().length;
	newTrackHTML = '<tr><td><input placeholder="SoundCloud URL" id="customTrackUrl' + customTrackCount + '" type="text"></td><td><input placeholder="GIPHY Search" id="customGiphySearch' + customTrackCount + '" type="text"></td><td class="track-delete-btn"><i class="material-icons">delete</i></td></tr>';
	$(customPlaylistTable).append(newTrackHTML);
});

$(document).on('click', '.track-delete-btn', function() {
    $(this).parent().remove();
});

$(clearCustomPlaylistButton).click(function(){
	ClearPlaylist();
});

$(startCustomPlaylistButton).click(function(){
	CreateCustomChannel();
});

function CreateCustomChannel(){
	customTrackCount = $(customPlaylistTable).children().length;
	for (var i = 0; i < customTrackCount; i++) {
		var track = document.getElementById('customTrackUrl' + i).value;
		var visual = document.getElementById('customGiphySearch' + i).value;
		if (track != '') {
			customTracksArray.push(track);
		}
		if (visual != '') {
			customVisualsArray.push(visual);
		}
	}
	console.log(customTracksArray);
	console.log(customVisualsArray);
	StartCustomChannel();
}

function ClearPlaylist () {
	$(customPlaylistTable).html(clearTracksHTML);
	var customTracksArray = [];
	var customVisualsArray  = [];
}

function StartCustomChannel () {
	customChannel = true;
	LoadTrack(customTracksArray[0]);
	activeVisualsArray = customVisualsArray;
	GetGifs(activeVisualsArray[0]);
}