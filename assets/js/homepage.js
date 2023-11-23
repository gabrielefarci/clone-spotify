fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=queen", {
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDYyM2M3ODc3NTgzYzAwMTRkMmNjYmMiLCJpYXQiOjE2ODQxNTk2MDksImV4cCI6MTY4NTM2OTIwOX0.RK6RE8424MDCQbvs8u0gvKiPo4MrR6-ww1HYYA6TexE"
  }
})
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("errore fetch");
    }
  })
  .then(fetchObj => {
    console.log(fetchObj);
    let albumCards = document.querySelectorAll("#albumRow .colCentralPlaylistCard");
    albumCards.forEach((card, i) => {
      const album = fetchObj.data[i].album;
      card.querySelector("img").src = album.cover_medium;
      card.querySelector("h5 a").innerHTML = album.title;
      card.querySelector("h5 a").href = `album.html?albumId=${album.id}`;

      card.querySelector("p a").innerHTML = fetchObj.data[i].artist.name;
      card.querySelector("p a").href = `artist.html?artistId=${fetchObj.data[i].artist.id}`;

      const playButton = card.querySelector(".powerPlayer");
      playButton.addEventListener("click", () => {
        fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${album.id}`)
          .then(res => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error("Errore fetch");
            }
          })
          .then(albumObj => {
            if (albumObj.tracks && albumObj.tracks.data && albumObj.tracks.data.length > 0) {
              const firstSong = albumObj.tracks.data[0];
              console.log(firstSong);
              const audioPlayer = document.querySelector('#audioPlayer');
              const audioImg = document.getElementById('audioImg');
              const audioTitle = document.getElementById('audioTitle');
              const audioArtist = document.getElementById('audioArtist')
              audioArtist.innerHTML = firstSong.artist.name;
              audioTitle.innerHTML = firstSong.album.title;
              audioImg.src = firstSong.album.cover_medium;
              audioPlayer.src = firstSong.preview;
              console.log(firstSong.preview);
              
              audioPlayer.addEventListener('canplay', function() {
                audioPlayer.play();
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
  });
  
let date = new Date();
let hours = date.getHours();
console.log(hours);
let title = document.getElementById('buonaseraTitlePrincipale');

if(hours < 12) {
}else if(hours >= 12) {
    title.innerHTML = 'Buon pomeriggio';
}else if(hours >= 18) {
    title.innerHTML = 'Buonasera';
}