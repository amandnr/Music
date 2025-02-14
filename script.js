// script.js
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');
const title = document.querySelector('.title');
const artist = document.querySelector('.artist');
const cover = document.querySelector('.cover img');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

const songs = [
    {
        name: 'song1',
        title: 'Song Title 1',
        artist: 'Artist 1',
        cover: 'cover1.jpg'
    },
    {
        name: 'song2',
        title: 'Song Title 2',
        artist: 'Artist 2',
        cover: 'cover2.jpg'
    },
    {
        name: 'song3',
        title: 'Song Title 3',
        artist: 'Artist 3',
        cover: 'cover3.jpg'
    }
];

let songIndex = 0;

function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = `${song.name}.mp3`;
    cover.src = song.cover;
}

function playSong() {
    playBtn.querySelector('i').classList.remove('fa-play');
    playBtn.querySelector('i').classList.add('fa-pause');
    audio.play();
}

function pauseSong() {
    playBtn.querySelector('i').classList.remove('fa-pause');
    playBtn.querySelector('i').classList.add('fa-play');
    audio.pause();
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function updateTime() {
    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60);
    const durationMinutes = Math.floor(audio.duration / 60);
    const durationSeconds = Math.floor(audio.duration % 60);

    currentTimeEl.innerText = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
    durationEl.innerText = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
}

playBtn.addEventListener('click', () => {
    const isPlaying = playBtn.querySelector('i').classList.contains('fa-pause');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);
audio.addEventListener('loadedmetadata', updateTime);
progressContainer.addEventListener('click', setProgress);

loadSong(songs[songIndex]);
