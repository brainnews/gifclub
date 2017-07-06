var dancegifs;
var preHTML = '<img src="';
var postHTML = '" />';
var gifIndex = 0;
var searchLimit = 500;
var numResults;
var onloadSearch = "dance";

var searchUrlPre = 'https://api.giphy.com/v1/gifs/search?q=';
var searchUrlPost = '&api_key=' + config + '&limit=' + searchLimit;

var litModeSwitch = document.getElementById("modeSwitch");
var litMode;

var salsaButton = document.getElementById("salsaButton");
var tangoButton = document.getElementById("tangoButton");
var breakdanceButton = document.getElementById("breakdanceButton");
var danceSearch = document.getElementById("danceSearch");
var danceDisplay = document.getElementById("danceDisplay");
var videoBackground = document.getElementById("gif-container");
var popupGridWrapper = document.getElementById("popupGridWrapper");
var litModeContainer = document.getElementById("litModeContainer");

var emptyPopupGrid = '<div id="popupGif-1" class="popup-gif"></div><div id="popupGif-2" class="popup-gif"></div><div id="popupGif-3" class="popup-gif"></div><div id="popupGif-4" class="popup-gif"></div><div id="popupGif-5" class="popup-gif"></div><div id="popupGif-6" class="popup-gif"></div><div id="popupGif-7" class="popup-gif"></div><div id="popupGif-8" class="popup-gif"></div><div id="popupGif-9" class="popup-gif"></div><div id="popupGif-10" class="popup-gif"></div><div id="popupGif-14" class="popup-gif"></div><div id="popupGif-15" class="popup-gif"></div><div id="popupGif-16" class="popup-gif"></div>';

window.onload = function() {
  GetGifs(onloadSearch);
};

function GetGifs(q) {
	$.ajax({
	  url: searchUrlPre + q + searchUrlPost,
	  type: 'GET',
	  success: function(data) {
		dancegifs = data;
		ShowGif();
	  }
	});
}

function keywordSearch() {
	$.ajax({
	  url: searchUrlPre + danceSearch.value + searchUrlPost,
	  type: 'GET',
	  success: function(data) {
	  	console.log(data);
		dancegifs = data;
		ShowGif();
		BlurSearch();
		$(salsaButton).removeClass("active-dance");
		$(danceButton).removeClass("active-dance");
		$(breakdanceButton).removeClass("active-dance");
	  }
	});
}

function ShowGif() {
	numResults = Object.keys(dancegifs.data).length;

	var randomNum = Math.floor((Math.random() * (numResults-1)));
	

	setTimeout(function () {
		if(dancegifs.data[randomNum].images.original_mp4.mp4 != undefined) {
      		var dancegif = dancegifs.data[randomNum].images.original_mp4.mp4;
     	}
      	
      	videoBackground.innerHTML = '<video autoplay loop id="video-background" muted><source src="' + dancegif + '"></video>';

      	litMode = $(litModeSwitch).is(':checked');

      	if (litMode) {
      		$(litModeContainer).addClass('lit-mode-bg');
      		var randomNum2 = Math.floor((Math.random() * (numResults-1)));
      		var randomCell = Math.floor((Math.random() * 16) + 1);
      		var randomPopup = document.getElementById('popupGif-' + randomCell);
      		var randomDepth = Math.floor((Math.random() * 5) + 1);
      		if (dancegifs.data[randomNum2].images.original_mp4.mp4 != undefined) {
      			var dancegifPopup = dancegifs.data[randomNum2].images.original_mp4.mp4;
      		}

      		var i = 0;

	      	if (randomPopup){
	      		randomPopup.innerHTML = '<video autoplay loop id="video-background" class="br-2 z-depth-' + randomDepth +'" muted><source src="' + dancegifPopup + '"></video>';
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
	numResults = Object.keys(dancegifs.data).length;

	var randomNum = Math.floor((Math.random() * (numResults-1)) + 1);
	setTimeout(function () {
		videoBackground.innerHTML = "";
      	var dancegif = dancegifs.data[randomNum].images.downsized.url;
      	$(videoBackground).css({
			"background": "url(" + dancegif + ") no-repeat center center fixed",
			"background-size": "cover"
		});


      	ShowGif();

   	}, 1500)
}

function BlurSearch(){
	$(danceSearch).blur();
}

// function DanceDisplay(danceType){
// 	$(danceDisplay).text(danceType);
//   	$(danceDisplay).toggleClass('animated zoomInDown');
//   	$(danceDisplay).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
//   	$(danceDisplay).text("");
//   });
// }

$(danceSearch).focus(function() {
	$(this).val("");
});

$(twerkButton).click(function() {
  	GetGifs("twerking");
  	$(this).toggleClass("active-dance");
  	$(this).siblings().removeClass("active-dance");
});

$(danceButton).click(function() {
  	GetGifs("dance");
  	$(this).toggleClass("active-dance");
  	$(this).siblings().removeClass("active-dance");
});

$(breakdanceButton).click(function() {
  	GetGifs("breakdancing");
  	$(this).toggleClass("active-dance");
  	$(this).siblings().removeClass("active-dance");
});