/**
 * Dark Shadow Theme Manager
 * Handles background colors and snow effect
 */

(function() {
  'use strict';

  const THEME_KEY = 'darkShadowTheme';
  const DEFAULT_THEME = 'red';
  
  const THEMES = {
    red: {
      name: '赤 - Red',
      background: '#8b0000',
      gradient: 'linear-gradient(135deg, #8b0000 0%, #dc143c 50%, #a50000 100%)',
      textColor: '#ffffff'
    },
    teal: {
      name: '深緑青 - Teal',
      background: '#008080',
      gradient: 'linear-gradient(135deg, #008080 0%, #20b2aa 50%, #00ced1 100%)',
      textColor: '#ffffff'
    },
    black: {
      name: '黒 - Black',
      background: '#000000',
      gradient: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #0d0d0d 100%)',
      textColor: '#ffffff'
    },
    white: {
      name: '白 - White',
      background: '#ffffff',
      gradient: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 50%, #e8e8e8 100%)',
      textColor: '#000000'
    }
  };

  // Initialize theme
  function initializeTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || DEFAULT_THEME;
    applyTheme(savedTheme);
  }

  // Apply theme
  function applyTheme(themeName) {
    if (!THEMES[themeName]) {
      themeName = DEFAULT_THEME;
    }
    
    const theme = THEMES[themeName];
    document.documentElement.setAttribute('data-bg-theme', themeName);
    document.documentElement.style.setProperty('--bg', theme.background);
    
    // Update text colors for white theme
    if (themeName === 'white') {
      document.documentElement.style.setProperty('--text', '#000000');
    } else {
      document.documentElement.style.setProperty('--text', '#f5f6f8');
    }
    
    localStorage.setItem(THEME_KEY, themeName);
  }

  // Create snowflakes
  function createSnowflakes() {
    const container = document.getElementById('root') || document.body;
    if (!container || container.querySelectorAll('.snowflake').length > 0) return;
    
    for (let i = 0; i < 15; i++) {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      snowflake.innerHTML = '❄';
      snowflake.style.left = Math.random() * 100 + '%';
      snowflake.style.animationDuration = (8 + Math.random() * 8) + 's';
      snowflake.style.animationDelay = Math.random() * 3 + 's';
      snowflake.style.fontSize = (8 + Math.random() * 12) + 'px';
      container.appendChild(snowflake);
    }
  }

  // Global theme changer function
  window.changeThemeColor = function(color) {
    applyTheme(color);
  };

  // Get current theme
  window.getCurrentTheme = function() {
    return localStorage.getItem(THEME_KEY) || DEFAULT_THEME;
  };

  // Get all available themes
  window.getAvailableThemes = function() {
    return Object.keys(THEMES).map(key => ({
      id: key,
      name: THEMES[key].name
    }));
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initializeTheme();
      setTimeout(createSnowflakes, 100);
    });
  } else {
    initializeTheme();
    createSnowflakes();
  }

  // Reinitialize on page visibility change
  document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
      initializeTheme();
    }
  });

  // Export for debugging
  window.DarkShadowTheme = {
    themes: THEMES,
    applyTheme,
    createSnowflakes,
    initialize: initializeTheme
  };
})();
