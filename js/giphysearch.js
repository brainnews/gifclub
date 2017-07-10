var channelgifs;
var preHTML = '<img src="';
var postHTML = '" />';
var gifIndex = 0;
var searchLimit = 100;
var numResults;
var staticGifs;
var staticSearchLimit = 30;

var searchUrlPre = 'https://api.giphy.com/v1/gifs/search?q=';
var trendingUrl = 'https://api.giphy.com/v1/gifs/trending?api_key=' + config + '&limit=50';
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
	if (!hasStarted) {
        $(staticContainer).css('background-image', 'url(images/static.gif)');
    }
}

function GetTrending() {
	$.ajax({
	  url: trendingUrl,
	  type: 'GET',
	  success: function(data) {
		channelgifs = data;
		console.log(channelgifs);
		ShowGif();
	  }
	});
	if (!hasStarted) {
        $(staticContainer).css('background-image', 'url(images/static.gif)');
    }
}

$(giphySearch).keydown(function( event ) {
	if ( event.which == 13 ) {
		CustomSearch();
	}
});

$(searchButton).click(function(){
	if (giphySearch.value != '') {
		CustomSearch();
	} else {
		giphySearch.value = "Enter something";
	}
})

function CustomSearch() {
	$.ajax({
	  	url: searchUrlPre + giphySearch.value + searchUrlPost + searchLimit,
	  	type: 'GET',
	  	success: function(data) {
		channelgifs = data;
		ShowGif();
		ToggleUI();
	  }
	});
	if (!hasStarted) {
        $(staticContainer).css('background-image', 'url(images/static.gif)');
    }
}

function MoodSearch(q) {
	$.ajax({
	  	url: searchUrlPre + q + searchUrlPost + searchLimit,
	  	type: 'GET',
	  	success: function(data) {
		channelgifs = data;
		ShowGif();
		ToggleUI();
	  }
	});
	if (!hasStarted) {
        $(staticContainer).css('background-image', 'url(images/static.gif)');
    }
}

function GetStatic(){
	$.ajax({
	  url: searchUrlPre + 'static' + searchUrlPost + staticSearchLimit,
	  type: 'GET',
	  success: function(data) {
		staticGifs = data;
		ShowStatic();
	  }
	});
}

function ShowStatic() {
	var randomNum = Math.floor((Math.random() * (staticSearchLimit - 1)));
	var staticGif = staticGifs.data[randomNum].images.original.url;
	$(staticContainer).css('background-image', 'url(' + staticGif + ')');
}

function ShowGif() {
	numResults = Object.keys(channelgifs.data).length;

	var randomNum = Math.floor((Math.random() * (numResults-1)));
	

	setTimeout(function () {
		var channelgif;
		var channelgifPopup;

		if (isAndroid) {
			channelgif = channelgifs.data[randomNum].images.preview_webp.url;
			videoBackground.innerHTML = '<img id="video-background" src="' + channelgif + '" width="100%" />';
		} else if (isIOS) {
			//iPhone solution
		} else {
			channelgif = channelgifs.data[randomNum].images.original_mp4.mp4;
			videoBackground.innerHTML = '<video autoplay loop playsinline id="video-background" muted><source src="' + channelgif + '"></video>';
		}

  		$(litModeContainer).addClass('lit-mode-bg');

  		var randomNum2 = Math.floor((Math.random() * (numResults-1)));
  		var randomCell = Math.floor((Math.random() * 16) + 1);
  		var randomPopup = document.getElementById('popupGif-' + randomCell);
  		var randomDepth = Math.floor((Math.random() * 5) + 1);
  		if (Math.floor(Math.random() * 10) < animationFrequency) {
  			var randomAnimation = animations[Math.floor((Math.random() * animations.length) + 1)];
  			$(randomPopup).addClass(randomAnimation);
  		}

      	if (randomPopup){
      		if (isAndroid) {
      			channelgifPopup = channelgifs.data[randomNum2].images.preview_webp.url;
      			randomPopup.innerHTML = '<img class="recordable br-2 z-depth-' + randomDepth +'" src="' + channelgifPopup + '" width="100%" />';
      		} else if (isIOS) {
      			//iPhone solution
      		} else {
      			channelgifPopup = channelgifs.data[randomNum2].images.preview.mp4;
      			randomPopup.innerHTML = '<video autoplay loop playsinline id="video-background" class="recordable br-2 z-depth-' + randomDepth +'" muted><source src="' + channelgifPopup + '"></video>';
      		}
      	}
      	
      	ShowGif();

   	}, 1500)
}

function ClearGifsByInterval () {
	setTimeout(function () {
      	popupGridWrapper.innerHTML = emptyPopupGrid;    	
      	ClearGifsByInterval();

   	}, 5000)
}

ClearGifsByInterval();