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
	console.log(playlist);
	var playlistLength = $(customPlaylistTable).children().length;
	var songArray = [];
	var gifArray = [];
	for (var i = 0; i < playlistLength; i++) {
		songArray.push(playlist[i].children.songInput.children.customTrackUrl.value);
		gifArray.push(playlist[i].children.visualInput.children.customGiphySearch.value);
	}
	customChannel["name"] = "Custom playlist"
	customChannel["songs"] = songArray;
	customChannel["visuals"] = gifArray;
	StartCustomChannel(customChannel, 50);
}

function ClearPlaylist () {
	$(customPlaylistTable).html(newTrackHTML);
}

function StartCustomChannel (channel, limit) {
	customChannelActive = true;
	trackCount = 0;
    activeChannel = channel;
    searchLimit = limit;
    LoadSoundObject(channel);
}