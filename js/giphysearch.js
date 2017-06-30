var channelgifs;
var preHTML = '<img src="';
var postHTML = '" />';
var gifIndex = 0;
var searchLimit = 50;
var numResults;
var activeVisualsArray;

var channel1 = {
	"name": "Channel 1",
	"playlist": ["https://soundcloud.com/miles-gilbert-2/sets/visuals-thegif-club"],
	"visuals": 	["dance", "soccer dance", "mom dance"]
}
var channel2 = {
	"name": "HYPE THO",
	"playlist": ["https://soundcloud.com/miles-gilbert-2/sets/hype-tho-visuals-thegif-club"],
	"visuals": 	["explosions", "squad goals", "zombies", "like a boss"]
}
var channel3 = {
	"name": "Cute 💚",
	"playlist": ["https://soundcloud.com/miles-gilbert-2/sets/cute-visuals-thegif-club"],
	"visuals": 	["love cute", "cute", "rainbows", "space", "pizza love"]
}

var searchUrlPre = 'https://api.giphy.com/v1/gifs/search?q=';
var searchUrlPost = '&api_key=' + config + '&limit=';

var litModeSwitch = document.getElementById("modeSwitch");
var litMode;

var channel1Button = document.getElementById("channel1Button");
var channel2Button = document.getElementById("channel2Button");
var channel3Button = document.getElementById("channel3Button");
var customChannelButton = document.getElementById("customChannelButton");
var giphySearch = document.getElementById("giphySearch");
var limitButton5 = document.getElementById("limitButton5");
var limitButton50 = document.getElementById("limitButton50");
var limitButton500 = document.getElementById("limitButton500");
var videoBackground = document.getElementById("gif-container");
var popupGridWrapper = document.getElementById("popupGridWrapper");
var litModeContainer = document.getElementById("litModeContainer");
var soundcloudContainer = document.getElementById("soundcloudContainer");

var emptyPopupGrid = '<div id="popupGif-1" class="popup-gif"></div><div id="popupGif-2" class="popup-gif"></div><div id="popupGif-3" class="popup-gif"></div><div id="popupGif-4" class="popup-gif"></div><div id="popupGif-5" class="popup-gif"></div><div id="popupGif-6" class="popup-gif"></div><div id="popupGif-7" class="popup-gif"></div><div id="popupGif-8" class="popup-gif"></div><div id="popupGif-9" class="popup-gif"></div><div id="popupGif-10" class="popup-gif"></div><div id="popupGif-14" class="popup-gif"></div><div id="popupGif-15" class="popup-gif"></div><div id="popupGif-16" class="popup-gif"></div>';


if (getOS() != "iOS") {
	window.onload = function() {
		activeVisualsArray = channel1.visuals;
	  	GetGifs(activeVisualsArray[0]);
	  	LoadTrack(channel1.playlist);
	  	activeChannel = channel1;
	};
} else {
	videoBackground.innerHTML = '<h4 class="white-text" style="padding: 80px;">Sorry, iOS does not allow for autoplay of videos and gifclub is all about that. Please visit us on desktop or Android.';
	soundcloudContainer.innerHTML = '';
}

function GetGifs(q) {
	$.ajax({
	  url: searchUrlPre + q + searchUrlPost + searchLimit,
	  type: 'GET',
	  success: function(data) {
		channelgifs = data;
		ShowGif();
	  }
	});
}

$(giphySearch).keydown(function( event ) {
	if ( event.which == 13 ) {
		$.ajax({
	  	url: searchUrlPre + giphySearch.value + searchUrlPost + searchLimit,
	  	type: 'GET',
	  	success: function(data) {
	  	console.log(data);
		channelgifs = data;
		ShowGif();
		BlurSearch();
		$(channel1).removeClass("channel-button-active");
		$(channel2).removeClass("channel-button-active");
		$(channel3).removeClass("channel-button-active");
	  }
	});
	}
});

function ShowGif() {
	numResults = Object.keys(channelgifs.data).length;

	var randomNum = Math.floor((Math.random() * (numResults-1)));
	

	setTimeout(function () {
		if(channelgifs.data[randomNum].images.original_mp4.mp4 != 'undefined') {
      		var channelgif = channelgifs.data[randomNum].images.original_mp4.mp4;
     	}
      	
      	videoBackground.innerHTML = '<video autoplay loop playsinline id="video-background" muted><source src="' + channelgif + '"></video>';

      	litMode = $(litModeSwitch).is(':checked');

      	if (litMode) {
      		$(litModeContainer).addClass('lit-mode-bg');
      		var randomNum2 = Math.floor((Math.random() * (numResults-1)));
      		var randomCell = Math.floor((Math.random() * 16) + 1);
      		var randomPopup = document.getElementById('popupGif-' + randomCell);
      		var randomDepth = Math.floor((Math.random() * 5) + 1);
      		if (channelgifs.data[randomNum2].images.original_mp4.mp4 != 'undefined') {
      			var channelgifPopup = channelgifs.data[randomNum2].images.original_mp4.mp4;
      		}

      		var i = 0;

	      	if (randomPopup){
	      		randomPopup.innerHTML = '<video autoplay loop playsinline id="video-background" class="br-2 z-depth-' + randomDepth +'" muted><source src="' + channelgifPopup + '"></video>';
	      	}

      	} else if (popupGridWrapper.innerHTML != emptyPopupGrid) {
      		$(litModeContainer).removeClass('lit-mode-bg');
      		popupGridWrapper.innerHTML = emptyPopupGrid;
      	}
      	
      	ShowGif();

   	}, 1500)
}

function ClearGifsByInterval () {
	setTimeout(function () {
      	popupGridWrapper.innerHTML = emptyPopupGrid;    	
      	ClearGifsByInterval();

   	}, 10000)
}

ClearGifsByInterval();

function ShowGifMobile() {
	numResults = Object.keys(channelgifs.data).length;

	var randomNum = Math.floor((Math.random() * (numResults-1)) + 1);
	setTimeout(function () {
		videoBackground.innerHTML = "";
      	var channelgif = channelgifs.data[randomNum].images.downsized.url;
      	$(videoBackground).css({
			"background": "url(" + channelgif + ") no-repeat center center fixed",
			"background-size": "cover"
		});


      	ShowGif();

   	}, 1500)
}

function BlurSearch(){
	$(giphySearch).blur();
}

function ChangeChannel(channel, limit, button) {
	activeChannel = channel;
	trackCount = 0;
	activeVisualsArray = channel.visuals;
	searchLimit = limit;
	GetGifs(activeVisualsArray[trackCount]);
	LoadTrack(activeChannel.playlist[trackCount]);
	$(button).toggleClass("channel-button-active");
  	$(button).siblings().removeClass("channel-button-active");
}

function SetSearchLimit(limit, button) {
	searchLimit = limit;
  	$(button).toggleClass("limit-button-active");
  	$(button).siblings().removeClass("limit-button-active");
}

$(giphySearch).focus(function() {
	$(this).val("");
});

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

$(limitButton5).click(function() {
  	SetSearchLimit(5, limitButton5);
});

$(limitButton50).click(function() {
  	SetSearchLimit(50, limitButton50);
});

$(limitButton500).click(function() {
  	SetSearchLimit(500, limitButton500);
});