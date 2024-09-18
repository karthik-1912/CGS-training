const clientId = 'cf1a45b2b213471a891e2408f1b91493';
const clientSecret = '6e1be56fa4464ecd808b487f75166f1c';

let accessToken;
let currentTrackIndex = 0;
let currentTracks = [];

const audioPlayer = document.getElementById('audio-player');
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

async function getAccessToken() {
  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
    },
    body: 'grant_type=client_credentials'
  });

  const data = await result.json();
  accessToken = data.access_token;
}

async function searchSongs(query) {
  const result = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=12`, {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + accessToken }
  });

  const data = await result.json();
  displaySearchResults(data.tracks.items);
}

function displaySearchResults(tracks) {
  let html = '<div class="row song-row">';
  tracks.forEach((track, index) => {
    if (track.preview_url) {
      html += `
        <div class="col-md-3 song-card">
          <div class="card">
            <img src="${track.album.images[0].url}" class="card-img-top" alt="${track.name}">
            <div class="card-body">
              <h5 class="card-title">${track.name}</h5>
              <p class="card-text">${track.artists[0].name}</p>
              <button class="btn btn-success play-button" data-preview="${track.preview_url}" data-title="${track.name}" data-image="${track.album.images[0].url}">Play</button>
              <div class="song-details">
                <p><strong>Album:</strong> ${track.album.name}</p>
                <p><strong>Duration:</strong> ${Math.floor(track.duration_ms / 60000)}:${('0' + Math.floor((track.duration_ms % 60000) / 1000)).slice(-2)}</p>
              </div>
            </div>
          </div>
        </div>
      `;
    }
    if ((index + 1) % 4 === 0) {
      html += '</div><div class="row song-row">';
    }
  });
  html += '</div>';
  document.getElementById('search-results').innerHTML = html;

  // Add event listeners to play buttons
  document.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', (e) => {
      const previewUrl = e.target.getAttribute('data-preview');
      const title = e.target.getAttribute('data-title');
      const imageUrl = e.target.getAttribute('data-image');
      playSong(previewUrl, title, imageUrl);
    });
  });
}

async function getAlbums() {
  const result = await fetch(`https://api.spotify.com/v1/browse/new-releases?limit=6`, {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + accessToken }
  });

  const data = await result.json();
  displayAlbums(data.albums.items);
}

function displayAlbums(albums) {
  let html = '';
  albums.forEach(album => {
    html += `
      <div class="col-md-3 album-item album-card" data-id="${album.id}">
        <img src="${album.images[0].url}" class="album-cover" alt="${album.name}">
        <h5>${album.name}</h5>
        <p>${album.artists[0].name}</p>
      </div>
    `;
  });
  document.getElementById('album-list').innerHTML = html;

  // Add event listeners to album cards
  document.querySelectorAll('.album-card').forEach(card => {
    card.addEventListener('click', async (e) => {
      const albumId = e.currentTarget.getAttribute('data-id');
      await displayAlbumTracks(albumId);
    });
  });
}

async function displayAlbumTracks(albumId) {
  const result = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + accessToken }
  });

  const data = await result.json();
  currentTracks = data.items; // Save tracks for navigation
  currentTrackIndex = 0; // Reset track index
  let html = '<h3>Tracks</h3><div class="row song-row">';
  data.items.forEach(track => {
    if (track.preview_url) {
      html += `
        <div class="col-md-3 song-card">
          <div class="card">
            <img src="${track.album.images[0].url}" class="card-img-top" alt="${track.name}">
            <div class="card-body">
              <h5 class="card-title">${track.name}</h5>
              <p class="card-text">${track.artists[0].name}</p>
              <button class="btn btn-success play-button" data-preview="${track.preview_url}" data-title="${track.name}" data-image="${track.album.images[0].url}">Play</button>
              <div class="song-details">
                <p><strong>Album:</strong> ${track.album.name}</p>
                <p><strong>Duration:</strong> ${Math.floor(track.duration_ms / 60000)}:${('0' + Math.floor((track.duration_ms % 60000) / 1000)).slice(-2)}</p>
              </div>
            </div>
          </div>
        </div>
      `;
    }
    if ((data.items.indexOf(track) + 1) % 4 === 0) {
      html += '</div><div class="row song-row">';
    }
  });
  html += '</div>';
  document.getElementById('search-results').innerHTML = html;

  // Add event listeners to play buttons
  document.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', (e) => {
      const previewUrl = e.target.getAttribute('data-preview');
      const title = e.target.getAttribute('data-title');
      const imageUrl = e.target.getAttribute('data-image');
      playSong(previewUrl, title, imageUrl);
    });
  });
}

function playSong(previewUrl, title, imageUrl) {
  audioPlayer.src = previewUrl;
  audioPlayer.play();
  document.getElementById('now-playing-title').textContent = title;
  document.getElementById('now-playing-img').src = imageUrl;
  playButton.style.display = 'none';
  pauseButton.style.display = 'inline';
}

function togglePlayPause() {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playButton.style.display = 'none';
    pauseButton.style.display = 'inline';
  } else {
    audioPlayer.pause();
    playButton.style.display = 'inline';
    pauseButton.style.display = 'none';
  }
}

function prevTrack() {
  if (currentTracks.length > 0) {
    currentTrackIndex = (currentTrackIndex - 1 + currentTracks.length) % currentTracks.length;
    playSong(currentTracks[currentTrackIndex].preview_url, currentTracks[currentTrackIndex].name, currentTracks[currentTrackIndex].album.images[0].url);
  }
}

function nextTrack() {
  if (currentTracks.length > 0) {
    currentTrackIndex = (currentTrackIndex + 1) % currentTracks.length;
    playSong(currentTracks[currentTrackIndex].preview_url, currentTracks[currentTrackIndex].name, currentTracks[currentTrackIndex].album.images[0].url);
  }
}

document.getElementById('search-button').addEventListener('click', () => {
  const query = document.getElementById('search-bar').value;
  searchSongs(query);
});

playButton.addEventListener('click', togglePlayPause);
pauseButton.addEventListener('click', togglePlayPause);
prevButton.addEventListener('click', prevTrack);
nextButton.addEventListener('click', nextTrack);

getAccessToken().then(() => {
  getAlbums();
});
