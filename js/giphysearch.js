var dancegifs;
var preHTML = '<img src="';
var postHTML = '" />';
var gifIndex = 0;
var searchLimit = 500;
var numResults;
var onloadSearch = "dance";

var searchUrlPre = 'https://api.giphy.com/v1/gifs/search?q=';
var searchUrlPost = '&api_key=79994bd6eeb14f4d8df417c81a1bd217&limit=' + searchLimit;

var bpmSlider = document.getElementById("bpmSlider");

var salsaButton = document.getElementById("salsaButton");
var tangoButton = document.getElementById("tangoButton");
var breakdanceButton = document.getElementById("breakdanceButton");
var danceSearch = document.getElementById("danceSearch");
var danceDisplay = document.getElementById("danceDisplay");
var videoBackground = document.getElementById("gif-container");

window.onload = function() {
  GetGifs(onloadSearch);
};

function GetGifs(q) {
	$.ajax({
	  url: searchUrlPre + q + searchUrlPost,
	  type: 'GET',
	  success: function(data) {
	  	console.log(data);
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

	var randomNum = Math.floor((Math.random() * (numResults-1)) + 1);
	setTimeout(function () {
      	var dancegif = dancegifs.data[randomNum].images.original_mp4.mp4;
      	videoBackground.innerHTML = '<video autoplay loop id="video-background" muted><source src="' + dancegif + '"></video>';

      	ShowGif();

   	}, 1500)
}

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

$(salsaButton).click(function() {
  	GetGifs("salsa dancing");
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