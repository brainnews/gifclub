// GIFCLUB TM CHANNELS

var channel1 = {
    "name": "Channel 1",
    "playlist": ["https://soundcloud.com/miles-gilbert-2/sets/visuals-thegif-club"],
    "visuals":  ["dance", "soccer dance", "mom dance", "oprah"]
}
var channel2 = {
    "name": "HYPE THO",
    "playlist": ["https://soundcloud.com/miles-gilbert-2/sets/hype-tho-visuals-thegif-club"],
    "visuals":  ["explosions", "squad goals", "zombies", "like a boss"]
}
var channel3 = {
    "name": "Cute 💚",
    "playlist": ["https://soundcloud.com/miles-gilbert-2/sets/cute-visuals-thegif-club"],
    "visuals":  ["love cute", "cute", "rainbows", "space"]
}

// VARS

var activeVisualsArray;
var activeChannel;
var litModeSwitch = document.getElementById("modeSwitch");
var litMode;
var channel1Button = document.getElementById("channel1Button");
var channel2Button = document.getElementById("channel2Button");
var channel3Button = document.getElementById("channel3Button");
var customChannelButton = document.getElementById("customChannelButton");
var limitButton5 = document.getElementById("limitButton5");
var limitButton50 = document.getElementById("limitButton50");
var limitButton500 = document.getElementById("limitButton500");
var videoBackground = document.getElementById("gif-container");
var popupGridWrapper = document.getElementById("popupGridWrapper");
var litModeContainer = document.getElementById("litModeContainer");
var soundcloudContainer = document.getElementById("soundcloudContainer");
var emptyPopupGrid = '<div id="popupGif-1" class="popup-gif"></div><div id="popupGif-2" class="popup-gif"></div><div id="popupGif-3" class="popup-gif"></div><div id="popupGif-4" class="popup-gif"></div><div id="popupGif-5" class="popup-gif"></div><div id="popupGif-6" class="popup-gif"></div><div id="popupGif-7" class="popup-gif"></div><div id="popupGif-8" class="popup-gif"></div><div id="popupGif-9" class="popup-gif"></div><div id="popupGif-10" class="popup-gif"></div><div id="popupGif-14" class="popup-gif"></div><div id="popupGif-15" class="popup-gif"></div><div id="popupGif-16" class="popup-gif"></div>';
var addTrackButton = document.getElementById("addTrackButton");
var customPlaylistTable = document.getElementById("customPlaylistTable");
var clearCustomPlaylistButton = document.getElementById("clearCustomPlaylistButton");
var startCustomPlaylistButton = document.getElementById("startCustomPlaylistButton");
var customTrackCount;
var newTrackHTML = '<tr><td id="songInput"><input id="customTrackUrl" placeholder="SoundCloud URL" type="text"></td><td id="visualInput"><input id="customGiphySearch" placeholder="GIPHY Search" type="text"></td><td class="track-delete-btn"><i class="material-icons">delete</i></td></tr>';
var customChannel = {};
var customChannelActive = false;

// PLATFORM CHECK

if (getOS() != "iOS") {
    window.onload = function() {
        activeChannel = channel1;
        GetGifs(activeChannel.visuals[0]);
        LoadTrack(activeChannel.playlist[0]);
    };
} else {
    videoBackground.innerHTML = '<h4 class="white-text" style="padding: 80px;">Sorry, iOS does not allow for autoplay of videos and gifclub is all about that. Please visit us on desktop or Android.';
    soundcloudContainer.innerHTML = '';
}

// CHANNEL FUNCTIONS

function ChangeChannel(channel, limit, button) {
    trackCount = 0;
    activeVisualsArray = channel.visuals;
    searchLimit = limit;
    GetGifs(activeVisualsArray[trackCount]);
    LoadTrack(channel.playlist[trackCount]);
    $(button).toggleClass("channel-button-active");
    $(button).siblings().removeClass("channel-button-active");
}

$(channel1Button).click(function() {
    ChangeChannel(channel1, 500, channel1Button);
});

$(channel2Button).click(function() {
    ChangeChannel(channel2, 50, channel2Button);
});

$(channel3Button).click(function() {
    ChangeChannel(channel3, 50, channel3Button);
});

$(customChannelButton).click(function() {
    $(this).toggleClass("channel-button-active");
    $(this).siblings().removeClass("channel-button-active");
});

// SEARCH FUNCTIONS

function SetSearchLimit(limit, button) {
    searchLimit = limit;
    $(button).toggleClass("limit-button-active");
    $(button).siblings().removeClass("limit-button-active");
}

$(giphySearch).focus(function() {
    $(this).val("");
});

$(limitButton5).click(function() {
    SetSearchLimit(5, limitButton5);
});

$(limitButton50).click(function() {
    SetSearchLimit(50, limitButton50);
});

$(limitButton500).click(function() {
    SetSearchLimit(500, limitButton500);
});

// MISC FUNCTIONS

function BlurSearch(){
    $(giphySearch).blur();
}

$('.modal').modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '4%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute
    // ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
    //   alert("Ready");
    //   console.log(modal, trigger);
    // },
    // complete: function() { alert('Closed'); } // Callback for Modal close
  }
);

$(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
});

$(popupGridWrapper).click(function(){
    $('.collapsible').collapsible('close', 0);
})

// CUSTOM CHANNEL FUNCTIONS

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
    activeChannel = customChannel;
    LoadTrack(activeChannel.playlist[0]);
    GetGifs(activeChannel.visuals[0]);
}