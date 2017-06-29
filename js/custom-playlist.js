var addTrackButton = document.getElementById("addTrackButton");
var customPlaylistTable = document.getElementById("customPlaylistTable");
var clearCustomPlaylistButton = document.getElementById("clearCustomPlaylistButton");
var startCustomPlaylistButton = document.getElementById("startCustomPlaylistButton");
var customTrackCount;
var newTrackHTML = '<tr><td id="songInput"><input id="customTrackUrl" placeholder="SoundCloud URL" type="text"></td><td id="visualInput"><input id="customGiphySearch" placeholder="GIPHY Search" type="text"></td><td class="track-delete-btn"><i class="material-icons">delete</i></td></tr>';
var customChannel = {};
var customTracksArray = [];
var customVisualsArray  = [];
var customChannelActive = false;

$(addTrackButton).click(function(){
	var playlistLength = $(customPlaylistTable).children().length;
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
	var playlist = $(customPlaylistTable).children();
	var playlistLength = $(customPlaylistTable).children().length;
	var songArray = [];
	var gifArray = [];
	for (var i = 0; i < playlistLength; i++) {
		songArray.push(playlist[i].children.songInput.children.customTrackUrl.value);
		gifArray.push(playlist[i].children.visualInput.children.customGiphySearch.value);
	}
	customChannel["playlist"] = songArray;
	customChannel["visuals"] = gifArray;
	StartCustomChannel();
}

function ClearPlaylist () {
	$(customPlaylistTable).html(newTrackHTML);
}

function StartCustomChannel () {
	customChannelActive = true;
	LoadTrack(customChannel.playlist[0]);
	activeVisualsArray = customChannel.visuals;
	GetGifs(activeVisualsArray[0]);
}