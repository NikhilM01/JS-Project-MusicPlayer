document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("audio");
  const playBtn = document.getElementById("playBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const muteBtn = document.getElementById("muteBtn");
  const coverImage = document.getElementById("coverImage");
  const songTitle = document.getElementById("songTitle");
  const artistName = document.getElementById("artistName");
  const playlist = document.querySelector(".playlist");

  let isPlaying = false;
  let currentSongIndex = 0;

  const songs = [
    {
      title: "Arjan Vailly Ne",
      artist: "Manan Bhardwaj",
      cover: "images/animal.jpg",
      src: "songs/Arjan Vailly Ne.mp3",
    },

    {
      title: "Phonk-01",
      artist: "Phonk Artist",
      cover: "images/Phonk.jpg",
      src: "songs/Phonk-01.mp3",
    },
    {
        title: "Tum Prem Ho Tum Preet Ho",
        artist: "Mohit Lalwani",
        cover: "images/krishna.webp",
        src: "songs/Tum Prem Ho Tum Preet Ho.mp3",
      },
    {
      title: "Khaike Paan Banaraswala",
      artist: "Shankar, Ehsaan & Loy",
      cover: "images/don.jpg",
      src: "songs/Khaike Paan Banaraswala.mp3",
    },
    {
      title: "Diya aur Baati",
      artist: "Javed Ali",
      cover: "images/diya-aur-bati.jpg",
      src: "songs/Diya aur Baati.mp3",
    },
    {
      title: "Pehle Bhi Main",
      artist: "Vishal Mishra",
      cover: "images/animal.jpg",
      src: "songs/Pehle Bhi Main.mp3",
    },
    {
      title: "Come Thru x Baarishon Mein",
      artist: "Darshan Raval, Jeremy Zucker, and MTVR",
      cover: "images/Come-thru.jpg",
      src: "songs/Come Thru x Baarishon Mein.mp3",
    },
    {
      title: "BE Intehaan",
      artist: "Atif Aslam, Pritam Chakraborty",
      cover: "images/be-intehaan.jpg",
      src: "songs/BE Intehaan.mp3",
    },

    // Add more songs as needed
  ];

  function updateSongInfo(index) {
    const currentSong = songs[index];
    coverImage.src = currentSong.cover;
    songTitle.textContent = currentSong.title;
    artistName.textContent = currentSong.artist;
    audio.src = currentSong.src;

    // Update playlist active state
    const playlistItems = document.querySelectorAll(".playlist li");
    playlistItems.forEach((item, i) => {
      item.classList.toggle("active", i === index);
    });
  }

  function togglePlay() {
    if (isPlaying) {
      audio.pause();
      playBtn.textContent = "Play";
    } else {
      audio.play();
      playBtn.textContent = "Pause";
    }
    isPlaying = !isPlaying;
    playBtn.textContent = isPlaying ? "Pause" : "Play";
  }

  playBtn.addEventListener("click", togglePlay);

  function playNext() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updateSongInfo(currentSongIndex);
    if (isPlaying) {
      audio.play();
    }
  }

  function playPrev() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    updateSongInfo(currentSongIndex);
    if (isPlaying) {
      audio.play();
    }
  }

  nextBtn.addEventListener("click", playNext);
  prevBtn.addEventListener("click", playPrev);

  // Update play/pause button when the song ends
  audio.addEventListener("ended", () => {
    isPlaying = false;
    playBtn.textContent = "Play";
  });

  muteBtn.addEventListener("click", () => {
    if (audio.volume === 0) {
      audio.volume = 1;
      muteBtn.textContent = "Mute";
      muteBtn.style = "background-color: none";
    } else {
      audio.volume = 0;
      muteBtn.textContent = "Unmute";
      muteBtn.style = "background-color: red";
    }
  });

  // Populate playlist dynamically
  songs.forEach((song, index) => {
    const listItem = document.createElement("li");
    listItem.classList.add("flex", "items-center", "p-2", "cursor-pointer");

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("mr-2");

    const image = document.createElement("img");
    image.src = song.cover;
    image.alt = "Song Cover";
    image.classList.add("rounded", "h-8", "w-8", "object-cover");

    imageContainer.appendChild(image);
    listItem.appendChild(imageContainer);

    const textContainer = document.createElement("div");
    textContainer.classList.add("flex", "flex-col");

    const title = document.createElement("span");
    title.textContent = song.title;
    title.classList.add("text-white");

    const artist = document.createElement("span");
    artist.textContent = song.artist;
    artist.classList.add("text-gray-500");

    textContainer.appendChild(title);
    textContainer.appendChild(artist);
    listItem.appendChild(textContainer);

    listItem.addEventListener("click", () => {
      currentSongIndex = index;
      updateSongInfo(currentSongIndex);
      isPlaying = false;
      playBtn.textContent = "Play";
    });

    playlist.appendChild(listItem);
  });

  // Initial song load
  updateSongInfo(currentSongIndex);
});
