/**
 * Dark Shadow Music Page
 * Spotify-like music interface with genres and playlists
 */

(function() {
  'use strict';

  const MUSIC_DATA = {
    genres: [
      {
        id: 'pop',
        name: '🎤 Pop',
        description: 'Top pop hits',
        icon: '🎤',
        color: '#FF6B6B',
        tracks: [
          { title: 'Midnight Dreams', artist: 'Luna Echo', duration: '3:45' },
          { title: 'Electric Nights', artist: 'Neon Pulse', duration: '3:32' },
          { title: 'Summer Breeze', artist: 'Sunny Days', duration: '3:18' },
          { title: 'Dance With Me', artist: 'Rhythm Kings', duration: '3:52' },
          { title: 'Shining Stars', artist: 'Celestial Sounds', duration: '4:01' }
        ]
      },
      {
        id: 'hiphop',
        name: '🎧 Hip-Hop',
        description: 'Urban beats & flows',
        icon: '🎧',
        color: '#FFD93D',
        tracks: [
          { title: 'Street Wisdom', artist: 'Urban Prophet', duration: '3:45' },
          { title: 'Beat Drop', artist: 'Cipher Kings', duration: '3:28' },
          { title: 'Golden Chain', artist: 'Rap Masters', duration: '4:12' },
          { title: 'Midnight Cypher', artist: 'Night Riders', duration: '3:55' },
          { title: 'Rising Up', artist: 'Success Syndicate', duration: '3:38' }
        ]
      },
      {
        id: 'rock',
        name: '🎸 Rock',
        description: 'Electric energy',
        icon: '🎸',
        color: '#6BCB77',
        tracks: [
          { title: 'Thunder Road', artist: 'Stone Legends', duration: '4:32' },
          { title: 'Guitar Odyssey', artist: 'Electric Sons', duration: '5:12' },
          { title: 'Revolution', artist: 'Rebel Hearts', duration: '4:45' },
          { title: 'Amplified', artist: 'Voltage', duration: '3:58' },
          { title: 'Echoes of Yesterday', artist: 'Time Warp', duration: '4:28' }
        ]
      },
      {
        id: 'electronic',
        name: '🎹 Electronic',
        description: 'Synth & beats',
        icon: '🎹',
        color: '#4D96FF',
        tracks: [
          { title: 'Digital Dreams', artist: 'Cyber Nexus', duration: '4:18' },
          { title: 'Neon Pulse', artist: 'Synth Wave', duration: '3:45' },
          { title: 'Matrix Flow', artist: 'Tech Collective', duration: '4:02' },
          { title: 'Laser Light', artist: 'Future Sound', duration: '3:35' },
          { title: 'Synthetic Paradise', artist: 'Digital Eden', duration: '4:25' }
        ]
      },
      {
        id: 'jazz',
        name: '🎷 Jazz',
        description: 'Smooth & sophisticated',
        icon: '🎷',
        color: '#FF6BA8',
        tracks: [
          { title: 'Midnight in the City', artist: 'Jazz Legends', duration: '5:32' },
          { title: 'Blue Note', artist: 'Smooth Quartet', duration: '4:18' },
          { title: 'Improvisation', artist: 'Free Spirit', duration: '6:05' },
          { title: 'Late Night Groove', artist: 'Night Owls', duration: '4:52' },
          { title: 'Saxophonic Journey', artist: 'Golden Era', duration: '5:12' }
        ]
      },
      {
        id: 'ambient',
        name: '🌙 Ambient',
        description: 'Chill & relaxing',
        icon: '🌙',
        color: '#8B5CF6',
        tracks: [
          { title: 'Peaceful Meditation', artist: 'Zen Masters', duration: '5:45' },
          { title: 'Floating Through Space', artist: 'Cosmic Vibes', duration: '6:12' },
          { title: 'Ocean Waves', artist: 'Nature Sounds', duration: '7:30' },
          { title: 'Forest Whispers', artist: 'Earth Connection', duration: '5:48' },
          { title: 'Stellar Dreams', artist: 'Night Sky', duration: '6:15' }
        ]
      },
      {
        id: 'classical',
        name: '🎼 Classical',
        description: 'Timeless elegance',
        icon: '🎼',
        color: '#F59E0B',
        tracks: [
          { title: 'Moonlight Sonata', artist: 'Symphony Orchestra', duration: '5:12' },
          { title: 'Nocturne in E Minor', artist: 'Chamber Ensemble', duration: '4:38' },
          { title: 'Concerto No. 5', artist: 'Classical Masters', duration: '6:45' },
          { title: 'Pastoral Symphony', artist: 'Grand Orchestra', duration: '7:02' },
          { title: 'Waltz of the Flowers', artist: 'Ballet Orchestra', duration: '4:22' }
        ]
      },
      {
        id: 'lofi',
        name: '☕ Lo-Fi',
        description: 'Study & relax beats',
        icon: '☕',
        color: '#EC4899',
        tracks: [
          { title: 'Rainy Day Study', artist: 'Lo-Fi Beats', duration: '2:48' },
          { title: 'Coffee Shop Vibes', artist: 'Chill Beats Co', duration: '3:15' },
          { title: 'Sunset Hues', artist: 'Beat Creator', duration: '2:52' },
          { title: 'Late Night Coding', artist: 'Focus Flow', duration: '3:32' },
          { title: 'Retro Thoughts', artist: 'Vintage Vibes', duration: '3:01' }
        ]
      },
      {
        id: 'country',
        name: '🤠 Country',
        description: 'Warm stories & acoustic charm',
        icon: '🤠',
        color: '#A78BFA',
        tracks: [
          { title: 'Open Road', artist: 'Cedar Hills', duration: '3:24' },
          { title: 'Dusty Sunset', artist: 'River & Rain', duration: '3:41' },
          { title: 'Heartland', artist: 'Midnight Rodeo', duration: '3:58' },
          { title: 'Golden Fields', artist: 'Prairie Echo', duration: '4:06' },
          { title: 'Back Porch Lights', artist: 'Country Lantern', duration: '3:29' }
        ]
      },
      {
        id: 'rnb',
        name: '🎶 R&B',
        description: 'Smooth vocals & soulful grooves',
        icon: '🎶',
        color: '#FB923C',
        tracks: [
          { title: 'Velvet Night', artist: 'Soulline', duration: '3:37' },
          { title: 'Afterglow', artist: 'Mira Lane', duration: '3:52' },
          { title: 'Slow Motion', artist: 'Velvet Pulse', duration: '4:10' },
          { title: 'Golden Hour', artist: 'Luxe Crew', duration: '3:44' },
          { title: 'Sweet Misfire', artist: 'Nyla Rose', duration: '3:28' }
        ]
      },
      {
        id: 'indie',
        name: '🌿 Indie',
        description: 'Creative, intimate, and fresh',
        icon: '🌿',
        color: '#34D399',
        tracks: [
          { title: 'Paper Stars', artist: 'Tiny Atlas', duration: '3:11' },
          { title: 'Quiet Fire', artist: 'Northlight', duration: '3:48' },
          { title: 'Golden Thread', artist: 'Echo Harbor', duration: '4:02' },
          { title: 'Low Light', artist: 'Moss & Wire', duration: '3:34' },
          { title: 'Hidden Bloom', artist: 'Wild Orchard', duration: '3:56' }
        ]
      },
      {
        id: 'latin',
        name: '💃 Latin',
        description: 'Energetic rhythms and bright melodies',
        icon: '💃',
        color: '#F472B6',
        tracks: [
          { title: 'Salsa After Dark', artist: 'Cielo Azul', duration: '3:49' },
          { title: 'Sunset Fiesta', artist: 'Bossa Nova Beat', duration: '4:07' },
          { title: 'Calle de Luz', artist: 'Latina Glow', duration: '3:36' },
          { title: 'Tropical Pulse', artist: 'Mar de Sol', duration: '4:18' },
          { title: 'Rhythm of the Moon', artist: 'Estrella Viva', duration: '3:55' }
        ]
      },
      {
        id: 'metal',
        name: '🤘 Metal',
        description: 'Heavy riffs and roaring intensity',
        icon: '🤘',
        color: '#EF4444',
        tracks: [
          { title: 'Ashen Skyline', artist: 'Iron Vow', duration: '4:14' },
          { title: 'Blackout Pulse', artist: 'Ruin Theory', duration: '3:59' },
          { title: 'Stormbreaker', artist: 'Obsidian Crown', duration: '4:31' },
          { title: 'Chaos Circuit', artist: 'Voltage Grave', duration: '3:47' },
          { title: 'Final Echo', artist: 'Nightfall Reign', duration: '4:22' }
        ]
      }
    ]
  };

  let currentGenre = null;

  /**
   * Initialize music page
   */
  function initMusicPage() {
    const container = document.getElementById('music-page-container');
    if (!container) return;

    renderGenresGrid();
    setupEventListeners();
  }

  /**
   * Render genres grid
   */
  function renderGenresGrid() {
    const container = document.getElementById('music-page-container');
    const genresGrid = container.querySelector('.genres-grid');

    if (!genresGrid) return;

    genresGrid.innerHTML = MUSIC_DATA.genres.map(genre => `
      <div class="genre-card" onclick="window.MusicPlayer.selectGenre('${genre.id}')" style="background: linear-gradient(135deg, ${genre.color}, #0f0f0f);">
        <div class="genre-icon">${genre.icon}</div>
        <h2>${genre.name}</h2>
        <p>${genre.description}</p>
      </div>
    `).join('');
  }

  /**
   * Select and display genre
   */
  function selectGenre(genreId) {
    currentGenre = MUSIC_DATA.genres.find(g => g.id === genreId);
    if (!currentGenre) return;

    const container = document.getElementById('music-page-container');
    const genresView = container.querySelector('.genres-grid').parentElement;
    const playlistView = container.querySelector('.playlist-view');

    // Hide genres, show playlist
    genresView.style.display = 'none';
    playlistView.classList.add('active');

    renderPlaylist(currentGenre);
  }

  /**
   * Render playlist for selected genre
   */
  function renderPlaylist(genre) {
    const playlistView = document.getElementById('music-page-container').querySelector('.playlist-view');

    playlistView.innerHTML = `
      <div class="playlist-header">
        <button onclick="window.MusicPlayer.backToGenres()">← Back</button>
        <div>
          <h2 style="margin: 0;">${genre.name}</h2>
          <p style="margin: 5px 0 0 0; color: var(--music-muted);">${genre.tracks.length} tracks</p>
        </div>
      </div>
      <div class="tracks-list">
        ${genre.tracks.map((track, idx) => `
          <div class="track-item">
            <span class="track-index">${idx + 1}</span>
            <div class="track-info">
              <div class="track-title">${track.title}</div>
              <div class="track-artist">${track.artist}</div>
            </div>
            <span class="track-duration">${track.duration}</span>
            <button class="play-button" onclick="window.MusicPlayer.playTrack('${track.title}', '${track.artist}')">▶</button>
          </div>
        `).join('')}
      </div>
    `;
  }

  /**
   * Back to genres view
   */
  function backToGenres() {
    const container = document.getElementById('music-page-container');
    const genresView = container.querySelector('.genres-grid').parentElement;
    const playlistView = container.querySelector('.playlist-view');

    genresView.style.display = 'block';
    playlistView.classList.remove('active');
    currentGenre = null;
  }

  /**
   * Play track
   */
  function playTrack(title, artist) {
    console.log(`🎵 Now Playing: ${title} by ${artist}`);
    // Can be extended to actually play audio
  }

  /**
   * Setup event listeners
   */
  function setupEventListeners() {
    // Event handlers are inline in the HTML
  }

  // Export functions globally
  window.MusicPlayer = {
    init: initMusicPage,
    selectGenre,
    backToGenres,
    playTrack,
    getData: () => MUSIC_DATA
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMusicPage);
  } else {
    initMusicPage();
  }
})();
