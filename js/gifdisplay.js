var animationFrequency = 10;
var animations = ['slideUpReturn', 'slideDownReturn','slideRightReturn','slideLeftReturn', 'puffIn'];
var hasStarted = false;
var isMobile = false;
var recording = false;
var playback = false;
var gpm = 1400;
var clearRate = 8000;
var numResults;

function StartGifStream() {
	var displayGifs = setInterval(function(){
		ShowGif();
	}, gpm);
	var clearGifs = setInterval(function(){
		ClearGifsByInterval();
	}, clearRate);
}

function CheckPlaybackStatus() {
    if (!hasStarted) {
        $(staticContainer).css('background-image', 'url(images/static.gif)');
    }
    if (playback) {
        playback = false;
        $(playTapeButton).children().html('play_arrow');
    }
}

function ClearGifsByInterval () {
    popupGridWrapper.innerHTML = emptyPopupGrid;    	
}

function ShowStatic() {
	var randomNum = Math.floor((Math.random() * staticSearchLimit) + 1);
	var staticGif = staticGifs.data[randomNum].images.original.url;
	$(staticContainer).css('background-image', 'url(' + staticGif + ')');
}

function ShowGif() {
	if (!hasStarted) {
		hasStarted = true;
	}

	var channelgif;
	var channelgifPopup;
	var randomCell = Math.floor((Math.random() * 16) + 1);
	var randomPopup = document.getElementById('popupGif-' + randomCell);
	var randomDepth = Math.floor((Math.random() * 5) + 1);

	if (!playback) {
		numResults = Object.keys(channelgifs.data).length;
		var randomNum = Math.floor((Math.random() * numResults));
		var randomNum2 = Math.floor((Math.random() * numResults));
		
		if (isMobile) {
			channelgif = channelgifs.data[randomNum].images.preview_webp.url;
			channelgifPopup = channelgifs.data[randomNum2].images.preview_webp.url;
			videoBackground.innerHTML = '<img id="video-background" src="' + channelgif + '" width="100%" />';
			randomPopup.innerHTML = '<img class="z-depth-' + randomDepth +'" src="' + channelgifPopup + '" width="100%" />';
		} else {
			channelgif = channelgifs.data[randomNum].images.original_mp4.mp4;
			channelgifPopup = channelgifs.data[randomNum2].images.preview.mp4;
			videoBackground.innerHTML = '<video autoplay loop playsinline id="video-background" muted><source src="' + channelgif + '"></video>';
			randomPopup.innerHTML = '<video autoplay loop playsinline id="video-background" class="z-depth-' + randomDepth +'" muted><source src="' + channelgifPopup + '"></video>';
		}

	} else {
		numResults = recordTapeArray.length;
		var randomNum = Math.floor((Math.random() * numResults));
		var randomNum2 = Math.floor((Math.random() * numResults));

		if (isMobile) {
			channelgif = recordTapeArray[randomNum];
			channelgifPopup = recordTapeArray[randomNum2];
			videoBackground.innerHTML = '<img id="video-background" src="' + channelgif + '" width="100%" />';
			randomPopup.innerHTML = '<img class="z-depth-' + randomDepth +'" src="' + channelgifPopup + '" width="100%" />';
		} else {
			channelgif = recordTapeArray[randomNum];
			channelgifPopup = recordTapeArray[randomNum2];
			videoBackground.innerHTML = '<video autoplay loop playsinline id="video-background" muted><source src="' + channelgif + '"></video>';
			randomPopup.innerHTML = '<video autoplay loop playsinline id="video-background" class="z-depth-' + randomDepth +'" muted><source src="' + channelgifPopup + '"></video>';
		}
	}

	if (Math.floor(Math.random() * 10) < animationFrequency) {
		var randomAnimation = animations[Math.floor((Math.random() * animations.length) + 1)];
		$(randomPopup).addClass(randomAnimation);
	}
}