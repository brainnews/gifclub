var channelgifs;
var preHTML = '<img src="';
var postHTML = '" />';
var gifIndex = 0;
var searchLimit = 50;
var numResults;

var searchUrlPre = 'https://api.giphy.com/v1/gifs/search?q=';
var searchUrlPost = '&api_key=' + config + '&limit=';

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
		channelgifs = data;
		ShowGif();
		ToggleSearch();
	  }
	});
	}
});

function ShowGif() {
	numResults = Object.keys(channelgifs.data).length;

	var randomNum = Math.floor((Math.random() * (numResults-1)));
	

	setTimeout(function () {
		if(channelgifs.data[randomNum].images.original_mp4.mp4 != undefined) {
      		var channelgif = channelgifs.data[randomNum].images.original_mp4.mp4;
     	}
      	
      	videoBackground.innerHTML = '<video autoplay loop playsinline id="video-background" muted><source src="' + channelgif + '"></video>';

      	//litMode = $(litModeSwitch).is(':checked');

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