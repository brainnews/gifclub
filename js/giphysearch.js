var channelgifs;
var preHTML = '<img src="';
var postHTML = '" />';
var gifIndex = 0;
var searchLimit = 500;
var numResults;
var onloadSearch = "dance";

var searchUrlPre = 'https://api.giphy.com/v1/gifs/search?q=';
var searchUrlPost = '&api_key=' + config + '&limit=';

var litModeSwitch = document.getElementById("modeSwitch");
var litMode;

var channel1 = document.getElementById("channel1");
var channel2 = document.getElementById("channel2");
var channel3 = document.getElementById("channel3");
var giphySearch = document.getElementById("giphySearch");
var videoBackground = document.getElementById("gif-container");
var popupGridWrapper = document.getElementById("popupGridWrapper");
var litModeContainer = document.getElementById("litModeContainer");

var emptyPopupGrid = '<div id="popupGif-1" class="popup-gif"></div><div id="popupGif-2" class="popup-gif"></div><div id="popupGif-3" class="popup-gif"></div><div id="popupGif-4" class="popup-gif"></div><div id="popupGif-5" class="popup-gif"></div><div id="popupGif-6" class="popup-gif"></div><div id="popupGif-7" class="popup-gif"></div><div id="popupGif-8" class="popup-gif"></div><div id="popupGif-9" class="popup-gif"></div><div id="popupGif-10" class="popup-gif"></div><div id="popupGif-14" class="popup-gif"></div><div id="popupGif-15" class="popup-gif"></div><div id="popupGif-16" class="popup-gif"></div>';

window.onload = function() {
  GetGifs(onloadSearch);
};

function GetGifs(q, limit) {
	$.ajax({
	  url: searchUrlPre + q + searchUrlPost + limit,
	  type: 'GET',
	  success: function(data) {
		channelgifs = data;
		ShowGif();
	  }
	});
}

function keywordSearch() {
	$.ajax({
	  url: searchUrlPre + giphySearch.value + searchUrlPost + 500,
	  type: 'GET',
	  success: function(data) {
	  	console.log(data);
		channelgifs = data;
		ShowGif();
		BlurSearch();
		$(channel1).removeClass("active-channel");
		$(channel2).removeClass("active-channel");
		$(channel3).removeClass("active-channel");
	  }
	});
}

function ShowGif() {
	numResults = Object.keys(channelgifs.data).length;

	var randomNum = Math.floor((Math.random() * (numResults-1)));
	

	setTimeout(function () {
		if(channelgifs.data[randomNum].images.original_mp4.mp4 != undefined) {
      		var channelgif = channelgifs.data[randomNum].images.original_mp4.mp4;
     	}
      	
      	videoBackground.innerHTML = '<video autoplay loop id="video-background" muted><source src="' + channelgif + '"></video>';

      	litMode = $(litModeSwitch).is(':checked');

      	if (litMode) {
      		$(litModeContainer).addClass('lit-mode-bg');
      		var randomNum2 = Math.floor((Math.random() * (numResults-1)));
      		var randomCell = Math.floor((Math.random() * 16) + 1);
      		var randomPopup = document.getElementById('popupGif-' + randomCell);
      		var randomDepth = Math.floor((Math.random() * 5) + 1);
      		if (channelgifs.data[randomNum2].images.original_mp4.mp4 != undefined) {
      			var channelgifPopup = channelgifs.data[randomNum2].images.original_mp4.mp4;
      		}

      		var i = 0;

	      	if (randomPopup){
	      		randomPopup.innerHTML = '<video autoplay loop id="video-background" class="br-2 z-depth-' + randomDepth +'" muted><source src="' + channelgifPopup + '"></video>';
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

$(giphySearch).focus(function() {
	$(this).val("");
});

$(channel1).click(function() {
  	GetGifs("dance", 500);
  	LoadTrack("https://soundcloud.com/miles-gilbert-2/sets/visuals-thegif-club");
  	$(this).toggleClass("active-channel");
  	$(this).siblings().removeClass("active-channel");
});

$(channel2).click(function() {
  	GetGifs("explosions", 50);
  	LoadTrack("https://soundcloud.com/miles-gilbert-2/sets/hype-tho-visuals-thegif-club");
  	$(this).toggleClass("active-channel");
  	$(this).siblings().removeClass("active-channel");
});

$(channel3).click(function() {
  	GetGifs("love cute", 50);
  	LoadTrack("https://soundcloud.com/miles-gilbert-2/sets/cute-visuals-thegif-club");
  	$(this).toggleClass("active-channel");
  	$(this).siblings().removeClass("active-channel");
});