const striveUrl = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const key = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDYyM2M3ODc3NTgzYzAwMTRkMmNjYmMiLCJpYXQiOjE2ODQxNTk2MDksImV4cCI6MTY4NTM2OTIwOX0.RK6RE8424MDCQbvs8u0gvKiPo4MrR6-ww1HYYA6TexE";
let urlParams = new URLSearchParams(window.location.search);
let artistAlbum = urlParams.get("albumId");
  


const getAlbum = function () {
    fetch(striveUrl + artistAlbum, {
        headers: {
            authorization: key,
        },
        
    })

    .then((res) => {
        if (res.ok) {
           
            return res.json();
        } else {
            throw new Error('errore nel caricamento dell Album')
        }
    })

    .then((songs) => {
        console.log(songs)
        let colCove = document.getElementById("colCove");
        colCove.innerHTML = `
                <div class="row flex-grow-1">
                <div class="col">
                <div class="card mb-3 p-2 text-light bg-transparent border-0" id="central-card">
                    <div class="row g-0">
                    <div class="col-md-3 col">
                        <div id="container"><img src="${songs.cover_medium}" class="img-fluid rounded-start shadow-lg" alt="Album cover"></div>
                    </div>
                    <div class="col-md-8 text-white d-flex">
                        <div class="card-body align-self-end">
                        <h5 id="cardTitle" class="card-title fw-bold">${songs.type.toUpperCase()}</h5>
                        <p class="" id="introduction-title-card">${songs.title}
                        <p class="card-text text-sm text-gray-700">${songs.artist.name} . ${songs.release_date} . ${songs.nb_tracks} songs, ${songs.duration} mins</p>
                        
                        </div>
                    </div>
                    </div>
                </div>
                </div> 
            </div>`

            

            let colSong = document.querySelector(".tracks");

            songs.tracks.data.forEach((el, i) => {
              let sec=String((el.duration%60)*60)
              colSong.innerHTML += `
                      <div class="track">
    
                        <div class="track__number">${i+1}</div>
                          <div class="btnDiv">
                            <audio id="audio_${i}" src="${el.preview}" type="audio/mp3"></audio>
                            <button id="btnTrack" class="btn text-secondary" onclick="playSong(${i}, '${songs.cover}', this)">Play</button> 
                          </div>
                        <div class="track__title fw-bold">${el.title}</div>
    
                        <div class="track__explicit">
    
                          <span class="label">${Math.floor(Math.random()*100_000_000)+10_000_000}</span>
    
                        </div>
                        <div class="controls">
                        <div class="track__plays">${Math.trunc(el.duration/60)}:${sec.slice(0,2)}</div>
                          
                      
                      `
                
                  const playPauseButton = document.getElementById("play-pause-button");
                  const restartButton = document.getElementById("restart-button");
                  const audio = new Audio(`${el.preview}`);
          
                  let playAcceso = false;
          
                  playPauseButton.addEventListener("click", function () {
                      if (playAcceso) {
                          audio.pause();
                          playPauseButton.innerHTML = '<i class="fas fa-play-circle text-white fs-2"></i>';
                      } else {
                          audio.play();
                          playPauseButton.innerHTML = '<i class="fas fa-pause-circle text-white fs-2"></i>';
                      }
                      playAcceso = !playAcceso;
                  });
          
                  restartButton.addEventListener("click", function () {
                      audio.currentTime = 0;
                      if (!playAcceso) {
                          audio.play();
                          playPauseButton.innerHTML = '<i class="fas fa-pause-circle text-white fs-2"></i>';
                          playAcceso = true;
                      }
                  });
          
                  audio.addEventListener("timeupdate", function () {
                      const progress = (audio.currentTime / audio.duration) * 100;
                      const currentTime = formatTime(audio.currentTime);
                      const duration = formatTime(audio.duration);
          
                      document.getElementById("seek-slider").value = progress;
                      document.getElementById("progress-bar").value = progress;
                      document.getElementById("current-time").textContent = currentTime;
                      document.getElementById("duration").textContent = duration;
                  });
          
                  function formatTime(timeInSeconds) {
                      const minutes = Math.floor(timeInSeconds / 60);
                      const seconds = Math.floor(timeInSeconds % 60);
                      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
                  }
              });
          
                    // crea un canvas con l'immagine e ne ritorno il context 2d
                    const draw = function (img) {
                      let canvas = document.createElement('canvas')
                      let c = canvas.getContext('2d')
                      c.width = canvas.width = img.clientWidth
                      c.height = canvas.height = img.clientHeight
                      c.clearRect(0, 0, c.width, c.height)
                      c.drawImage(img, 0, 0, img.clientWidth, img.clientHeight)
                      return c
                    }

                    // scompone pixel per pixel e ritorna un oggetto con una mappa della loro frequenza nell'immagine
                    const getColors = function (c) {
                      let col,
                        colors = {}
                      let pixels, r, g, b, a
                      r = g = b = a = 0
                      pixels = c.getImageData(0, 0, c.width, c.height)
                      for (let i = 0, data = pixels.data; i < data.length; i += 4) {
                        r = data[i]
                        g = data[i + 1]
                        b = data[i + 2]
                        a = data[i + 3]
                        if (a < 255 / 2) continue
                        col = rgbToHex(r, g, b)
                        if (!colors[col]) colors[col] = 0
                        colors[col]++
                      }
                      return colors
                    }

                    // trova il colore più ricorrente data una mappa di frequenza dei colori
                    const findMostRecurrentColor = function (colorMap) {
                      let highestValue = 0
                      let mostRecurrent = null
                      for (const hexColor in colorMap) {
                        if (colorMap[hexColor] > highestValue) {
                          mostRecurrent = hexColor
                          highestValue = colorMap[hexColor]
                        }
                      }
                      return mostRecurrent
                    }

                    // converte un valore in rgb a un valore esadecimale
                    const rgbToHex = function (r, g, b) {
                      if (r > 255 || g > 255 || b > 255) {
                        throw 'Invalid color component'
                      } else {
                        return ((r << 16) | (g << 8) | b).toString(16)
                      }
                    }

                    // inserisce degli '0' se necessario davanti al colore in esadecimale per renderlo di 6 caratteri
                    const pad = function (hex) {
                      return ('000000' + hex).slice(-6)
                    }

                    const generateImage = function () {
                      let imageSrc = `${songs.cover}`
                        
                      let reference = document.getElementById('colCove')

                      reference.innerHTML = `
                        <img
                          src=${imageSrc}
                          id="img"
                          crossorigin="anonymous"
                          onload="start()"
                        />`
                        start()
                    }
                    const changeBackgroundColor = function (color) {
                      document.body.style.backgroundColor = color;
                    }

                    const start = function () {
                      // prendo il riferimento all'immagine del dom
                      let imgReference = document.querySelector('#img')

                      // creo il context 2d dell'immagine selezionata
                      let context = draw(imgReference)

                      // creo la mappa dei colori più ricorrenti nell'immagine
                      let allColors = getColors(context)

                      // trovo colore più ricorrente in esadecimale
                      let mostRecurrent = findMostRecurrentColor(allColors)

                      // se necessario, aggiunge degli '0' per rendere il risultato un valido colore esadecimale
                      let mostRecurrentHex = pad(mostRecurrent)

                      changeBackgroundColor(`#${mostRecurrentHex}`);
                      // console.log(mostRecurrentHex)
                    }

                    window.onload = function () {
                      generateImage()
                    }

                      })
                  .catch((err) => {
                    console.log(err);
                  })
              }


              getAlbum();

          