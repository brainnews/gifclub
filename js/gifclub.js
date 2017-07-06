// GIFCLUB TM CHANNELS

var channel1 = {
    "name": "Channel 1",
    "playlist": ["https://soundcloud.com/miles-gilbert-2/sets/visuals-thegif-club"],
    "visuals":  ["dance", "soccer dance", "mom dance", "oprah"]
}
var channel2 = {
    "name": "HYPE THO",
    "songs": ["https://soundcloud.com/essential_music/baewolf-lost-boys-edm-com", "https://soundcloud.com/flosstradamus/flosstradamus-troyboi-soundclash", "https://soundcloud.com/splitbreed/splitbreed-walkers-free-dl-for-the-first-2000", "https://soundcloud.com/leaf-jones/meek-mill-im-a-boss-feat-rick"],
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
var litMode = true;
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
var isPlaylist;

var fullscreenSearchButton = document.getElementById("fullscreenSearchButton");
var fullscreenSearch = document.getElementById("fullscreenSearch");

var giphySearch = document.getElementById("giphySearch");


// PLATFORM CHECK

if (getOS() != "iOS") {
    window.onload = function() {
        GetGifs("dance");
    };
} else {
    videoBackground.innerHTML = '<h4 class="white-text" style="padding: 80px;">Sorry, iOS does not allow for autoplay of videos and gifclub is all about that. Please visit us on desktop or Android.';
    soundcloudContainer.innerHTML = '';
}

// CHANNEL FUNCTIONS


// SEARCH FUNCTIONS

function SetSearchLimit(limit, button) {
    searchLimit = limit;
    $(button).toggleClass("limit-button-active");
    $(button).siblings().removeClass("limit-button-active");
}

$(limitButton5).click(function() {
    SetSearchLimit(5, limitButton5);
});

$(limitButton50).click(function() {
    SetSearchLimit(50, limitButton50);
});

$(limitButton500).click(function() {
    SetSearchLimit(500, limitButton500);
});

function BlurSearch(){
    $(giphySearch).blur();
}

function HideSearch() {
    $(giphySearch).blur();
    $(giphySearch).hide();
}

function ShowSearch() {
    $(giphySearch).show();
}

function ToggleSearch() {
    $(giphySearch).toggle();
}

// MISC FUNCTIONS

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
    ToggleSearch();
})