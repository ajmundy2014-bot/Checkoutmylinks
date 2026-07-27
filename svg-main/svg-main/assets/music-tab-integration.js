/**
 * Dark Shadow Music Tab Integration
 * Adds Music tab to app navigation alongside Games, Chat, etc.
 */

(function() {
  'use strict';

  /**
   * Create and inject music tab into the app
   */
  function injectMusicTab() {
    // Wait for the app to be ready
    const waitForApp = setInterval(() => {
      const root = document.getElementById('root');
      if (root && root.children.length > 0) {
        clearInterval(waitForApp);
        setupMusicTab();
      }
    }, 100);
  }

  /**
   * Setup music tab and navigation
   */
  function setupMusicTab() {
    // Create music tab button
    const musicTabBtn = document.createElement('button');
    musicTabBtn.id = 'music-tab-btn';
    musicTabBtn.className = 'dark-shadow-music-tab';
    musicTabBtn.innerHTML = '🎵 Music';
    musicTabBtn.style.cssText = `
      position: fixed;
      bottom: 100px;
      right: 20px;
      padding: 12px 20px;
      background: #1DB954;
      color: #191414;
      border: 2px solid #1ed760;
      border-radius: 8px;
      cursor: pointer;
      z-index: 9998;
      font-weight: bold;
      font-size: 14px;
      transition: all 0.3s ease;
      box-shadow: 0 0 15px rgba(29, 185, 84, 0.4);
    `;

    musicTabBtn.addEventListener('mouseover', function() {
      this.style.background = '#1ed760';
      this.style.transform = 'scale(1.1)';
      this.style.boxShadow = '0 0 25px rgba(30, 215, 96, 0.6)';
    });

    musicTabBtn.addEventListener('mouseout', function() {
      this.style.background = '#1DB954';
      this.style.transform = 'scale(1)';
      this.style.boxShadow = '0 0 15px rgba(29, 185, 84, 0.4)';
    });

    musicTabBtn.addEventListener('click', toggleMusicModal);

    // Create music modal
    const musicModal = document.createElement('div');
    musicModal.id = 'dark-shadow-music-modal';
    musicModal.className = 'dark-shadow-music-modal';
    musicModal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: none;
      z-index: 10001;
      overflow: auto;
    `;

    musicModal.innerHTML = `
      <div style="position: relative; width: 100%; height: 100%; display: flex; flex-direction: column;">
        <button onclick="document.getElementById('dark-shadow-music-modal').style.display='none'" style="position: absolute; top: 20px; right: 20px; background: #1DB954; color: #191414; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; z-index: 10002; font-weight: bold; font-size: 14px;">✕ Close</button>
        <div id="music-page-container" class="music-container">
          <div class="music-header">
            <h1>🎵 Music</h1>
          </div>
          <div class="music-content">
            <div class="genres-grid"></div>
            <div class="playlist-view"></div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(musicTabBtn);
    document.body.appendChild(musicModal);
  }

  /**
   * Toggle music modal visibility
   */
  function toggleMusicModal() {
    const modal = document.getElementById('dark-shadow-music-modal');
    if (modal.style.display === 'none') {
      modal.style.display = 'block';
      // Initialize music page when opened
      if (window.MusicPlayer && window.MusicPlayer.init) {
        window.MusicPlayer.init();
      }
    } else {
      modal.style.display = 'none';
    }
  }

  /**
   * Close modal when clicking outside
   */
  function setupModalClose() {
    document.addEventListener('click', function(event) {
      const modal = document.getElementById('dark-shadow-music-modal');
      const musicBtn = document.getElementById('music-tab-btn');
      
      if (modal && modal.style.display === 'block') {
        if (!modal.contains(event.target) && !musicBtn.contains(event.target)) {
          modal.style.display = 'none';
        }
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      injectMusicTab();
      setupModalClose();
    });
  } else {
    injectMusicTab();
    setupModalClose();
  }

  // Export global toggle
  window.toggleMusicModal = toggleMusicModal;
})();
