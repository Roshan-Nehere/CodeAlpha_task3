// script.js

// Songs List
const songs = [
    {
      title: "Song One",
      artist: "Artist One",
      src: "song1.mp3",
      cover: "cover1.jpg"
    },
    {
      title: "Song Two",
      artist: "Artist Two",
      src: "song2.mp3",
      cover: "cover2.jpg"
    },
    {
      title: "Song Three",
      artist: "Artist Three",
      src: "song3.mp3",
      cover: "cover3.jpg"
    }
  ];
  
  // DOM Elements
  const audio = document.getElementById("audio");
  const title = document.getElementById("title");
  const artist = document.getElementById("artist");
  const cover = document.getElementById("cover");
  const playBtn = document.getElementById("play");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const progress = document.getElementById("progress");
  const progressContainer = document.querySelector(".progress-container");
  
  let songIndex = 0;
  
  // Load Song
  function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = song.src;
    cover.src = song.cover;
  }
  
  // Play Song
  function playSong() {
    audio.play();
    playBtn.innerText = "⏸";
    playBtn.onclick = pauseSong;
  }
  
  // Pause Song
  function pauseSong() {
    audio.pause();
    playBtn.innerText = "▶";
    playBtn.onclick = playSong;
  }
  
  // Previous Song
  function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
  }
  
  // Next Song
  function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
  }
  
  // Update Progress Bar
  function updateProgress(e) {
    const { currentTime, duration } = e.target;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
  }
  
  // Set Progress Bar
  function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
  }
  
  // Event Listeners
  playBtn.addEventListener("click", playSong);
  prevBtn.addEventListener("click", prevSong);
  nextBtn.addEventListener("click", nextSong);
  audio.addEventListener("timeupdate", updateProgress);
  progressContainer.addEventListener("click", setProgress);
  audio.addEventListener("ended", nextSong);
  
  // Initial Load
  loadSong(songs[songIndex]);
  