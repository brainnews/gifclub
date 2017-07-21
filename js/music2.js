SC.initialize({
    client_id: 'ARX6YqJeUZYURsTksMBlqrzkPmdLqI3x'
  });

var currentPlayer;

var streamTrack = function(track){
  return SC.stream('/tracks/' + track.id).then(function(player){
    if (currentPlayer) {
      currentPlayer.pause();
    }
    currentPlayer = player;
    player.play();
  }).catch(function(){
    console.log(arguments);
  });
};

function LoadPlaylist(q, t) {
  console.log(q);
  SC.resolve(q).then(streamTrack);
  visuals = t;
};