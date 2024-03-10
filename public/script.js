let title_img = document.querySelector(".title-img");
let song_title = document.querySelector(".song-title");
let prev_track = document.querySelector(".prev-track");
let next_track = document.querySelector(".next-track");
let playpause = document.querySelector(".playpause");
let curr_duration = document.querySelector(".current-duration");
let total_duration = document.querySelector(".total-duration");
let song_duration = document.querySelector(".song-time");
let curr_track = document.createElement("audio");
let playIcons = document.querySelectorAll(".playlist-1 .playlist-img .play-symbol .icons"
);

let track_index = 0;
let isplaying = false;
let updateTimer;

const music_list = [
  {
    sname: "song1",
    img: "../images/128Lutt.jpg",
    song: "../songs/ltro.mp3",
  },
  {
    sname: "song2",
    img: "../images/128Satranga.jpg",
    song: "../songs/Lutt Putt Gaya - Dunki 128 Kbps.mp3",
  },
  {
    sname: "song3",
    img: "../images/img4.jpeg",
    song: "../songs/MANIA.mp3",
  },
  {
    sname: "song4",
    img: "../images/img3.jpeg",
    song: "../songs/Satranga - Animal 128 Kbps.mp3",
  },
  {
    sname: "song5",
    img: "../images/img2.jpeg",
    song: "../songs/Unbreakable.mp3",
  },
  {
    sname: "song6",
    img: "../images/img1.jpeg",
    song: "../songs/Dreamer.mp3",
  },
];

loadTrack(track_index);

function loadTrack(track_index) {
  clearInterval(updateTimer);
  reset();

  curr_track.src = music_list[track_index].song;
  title_img.style.backgroundImage = "url(" + music_list[track_index].img + ")";
  song_title.textContent = music_list[track_index].sname;

  curr_track.load();

  updateTimer = setInterval(setUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
}

function reset() {
  curr_duration.textContent = "00:00";
  total_duration.textContent = "00:00";
  song_duration.value = 0;
}

function playpauseTrack() {
  isplaying ? pauseTrack() : playTrack();
}
playIcons.forEach(playIcon =>{
    playIcon.addEventListener("click",()=>{
        curr_track.play();
        playpause.classList.remove("fa-play");
      playpause.classList.add("fa-pause");
    })
})

// song_title.innerHTML = music_list[track_index].name;


function playTrack() {
  curr_track.play();
  isplaying = true;
  playpause.classList.remove("fa-play");
  playpause.classList.add("fa-pause");
  // Alternatively, you can use playpause.className = "fa-solid fa-pause";
}

function pauseTrack() {
  curr_track.pause();
  isplaying = false;
  playpause.classList.remove("fa-pause");
  playpause.classList.add("fa-play");
  // Alternatively, you can use playpause.className = "fa-solid fa-play";
}

function nextTrack() {
  if (track_index < music_list.length - 1) {
    track_index += 1;
  } else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0) {
    track_index -= 1;
  } else {
    track_index = music_list.length - 1;
  }
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekTo = curr_track.duration * (song_duration.value / 100);
  curr_track.currentTime = seekTo;
}

function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    song_duration.value = seekPosition;

    let currentMin = Math.floor(curr_track.currentTime / 60);
    let currentsec = Math.floor(curr_track.currentTime - currentMin * 60);
    let durationmin = Math.floor(curr_track.duration / 60);
    let durationsec = Math.floor(curr_track.duration - durationmin * 60);

    if (currentsec < 10) {
      currentsec = "0" + currentsec;
    }
    if (durationsec < 10) {
      durationsec = "0" + durationsec;
    }
    if (currentMin < 10) {
      currentMin = "0" + currentMin;
    }
    if (durationmin < 10) {
      durationmin = "0" + durationmin;
    }

    curr_duration.textContent = currentMin + ":" + currentsec;
    total_duration.textContent = durationmin + ":" + durationsec;
  }
}
