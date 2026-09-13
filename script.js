const audio = document.getElementById("audio");

const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const shuffleBtn = document.getElementById("shuffleBtn");
const repeatBtn = document.getElementById("repeatBtn");

const progressBar = document.getElementById("progressBar");
const volumeBar = document.getElementById("volumeBar");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const songTitle = document.getElementById("songTitle");
const artistName = document.getElementById("artistName");

const albumArt = document.getElementById("albumArt");
const playlistContainer = document.getElementById("playlistContainer");


/* Songs */

const songs = [
    {
        title: "Dreams",
        artist: "Artist One",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500"
    },

    {
        title: "Night Vibes",
        artist: "Artist Two",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500"
    },

    {
        title: "Summer",
        artist: "Artist Three",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500"
    }
];


let currentSongIndex = 0;

let isPlaying = false;

let isShuffle = false;

let isRepeat = false;


/* Load Song */

function loadSong(index) {

    const song = songs[index];

    songTitle.textContent = song.title;

    artistName.textContent = song.artist;

    albumArt.src = song.cover;

    audio.src = song.src;

    updatePlaylist();
}


/* Play Song */

function playSong() {

    audio.play();

    isPlaying = true;

    playBtn.innerHTML =
        '<i class="fa-solid fa-pause"></i>';
}


/* Pause Song */

function pauseSong() {

    audio.pause();

    isPlaying = false;

    playBtn.innerHTML =
        '<i class="fa-solid fa-play"></i>';
}


/* Play / Pause */

playBtn.addEventListener("click", () => {

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }

});


/* Next */

function nextSong() {

    if (isShuffle) {

        let randomIndex;

        do {
            randomIndex =
                Math.floor(Math.random() * songs.length);
        }

        while (randomIndex === currentSongIndex);

        currentSongIndex = randomIndex;

    } else {

        currentSongIndex++;

        if (currentSongIndex >= songs.length) {
            currentSongIndex = 0;
        }

    }

    loadSong(currentSongIndex);

    playSong();
}


/* Previous */

function previousSong() {

    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }

    loadSong(currentSongIndex);

    playSong();
}


nextBtn.addEventListener("click", nextSong);

prevBtn.addEventListener("click", previousSong);


/* Song End */

audio.addEventListener("ended", () => {

    if (isRepeat) {

        audio.currentTime = 0;

        playSong();

    } else {

        nextSong();

    }

});


/* Progress Update */

audio.addEventListener("timeupdate", () => {

    if (!audio.duration) return;

    const progress =
        (audio.currentTime / audio.duration) * 100;

    progressBar.value = progress;

    currentTime.textContent =
        formatTime(audio.currentTime);

    duration.textContent =
        formatTime(audio.duration);

});


/* Progress Seek */

progressBar.addEventListener("input", () => {

    if (!audio.duration) return;

    audio.currentTime =
        (progressBar.value / 100) *
        audio.duration;

});


/* Volume */

volumeBar.addEventListener("input", () => {

    audio.volume = volumeBar.value;

});


/* Shuffle */

shuffleBtn.addEventListener("click", () => {

    isShuffle = !isShuffle;

    shuffleBtn.classList.toggle(
        "active",
        isShuffle
    );

});


/* Repeat */

repeatBtn.addEventListener("click", () => {

    isRepeat = !isRepeat;

    repeatBtn.classList.toggle(
        "active",
        isRepeat
    );

});


/* Format Time */

function formatTime(time) {

    if (isNaN(time)) {
        return "0:00";
    }

    const minutes =
        Math.floor(time / 60);

    const seconds =
        Math.floor(time % 60)
            .toString()
            .padStart(2, "0");

    return `${minutes}:${seconds}`;
}


/* Playlist */

function createPlaylist() {

    playlistContainer.innerHTML = "";

    songs.forEach((song, index) => {

        const item =
            document.createElement("div");

        item.classList.add("playlist-item");

        item.innerHTML = `
            <span class="song-number">
                ${index + 1}
            </span>

            <div>
                <strong>${song.title}</strong>
                <small>${song.artist}</small>
            </div>
        `;

        item.addEventListener("click", () => {

            currentSongIndex = index;

            loadSong(currentSongIndex);

            playSong();

        });

        playlistContainer.appendChild(item);

    });

}


/* Update Active Playlist */

function updatePlaylist() {

    const items =
        document.querySelectorAll(".playlist-item");

    items.forEach((item, index) => {

        item.classList.toggle(
            "active",
            index === currentSongIndex
        );

    });

}


/* Initialize */

audio.volume = 0.7;

createPlaylist();

loadSong(currentSongIndex);
