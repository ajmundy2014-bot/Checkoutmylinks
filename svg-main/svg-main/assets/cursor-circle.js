/**
 * Dark Shadow Custom Cursor Circle
 * Follows mouse with customizable colored circle
 */

(function() {
  'use strict';

  const CURSOR_KEY = 'darkShadowCursor';
  const DEFAULT_CURSOR_COLOR = 'black';

  const CURSOR_COLORS = {
    black: { name: '⚫ Black (黒)', hex: '#000000' },
    white: { name: '⚪ White (白)', hex: '#ffffff' },
    red: { name: '🔴 Red (赤)', hex: '#ff0000' },
    gray: { name: '⚪ Gray (灰色)', hex: '#808080' },
    teal: { name: '🔵 Teal (深緑青)', hex: '#008080' }
  };

  let cursorCircle = null;
  let mouseX = 0;
  let mouseY = 0;
  let cursorEnabled = true;
  let currentColor = DEFAULT_CURSOR_COLOR;

  /**
   * Initialize cursor circle element
   */
  function initCursor() {
    if (cursorCircle) return;

    cursorCircle = document.createElement('div');
    cursorCircle.className = 'cursor-circle';
    document.body.appendChild(cursorCircle);

    // Load saved cursor color
    const savedColor = localStorage.getItem(CURSOR_KEY) || DEFAULT_CURSOR_COLOR;
    applyCursorColor(savedColor);

    // Attach event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', showCursor);
    document.addEventListener('mouseleave', hideCursor);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
  }

  /**
   * Handle mouse movement
   */
  function handleMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (cursorCircle && cursorEnabled) {
      cursorCircle.style.left = mouseX + 'px';
      cursorCircle.style.top = mouseY + 'px';

      // Create trail effect occasionally
      if (Math.random() > 0.8) {
        createTrail(mouseX, mouseY);
      }
    }
  }

  /**
   * Create cursor trail effect
   */
  function createTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = x + 'px';
    trail.style.top = y + 'px';
    trail.style.width = getComputedStyle(cursorCircle).width;
    trail.style.height = getComputedStyle(cursorCircle).height;
    trail.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--cursor-color');

    document.body.appendChild(trail);

    // Remove trail after animation completes
    setTimeout(() => trail.remove(), 600);
  }

  /**
   * Show cursor when mouse enters
   */
  function showCursor() {
    if (cursorCircle) {
      cursorCircle.style.opacity = '1';
      cursorEnabled = true;
    }
  }

  /**
   * Hide cursor when mouse leaves
   */
  function hideCursor() {
    if (cursorCircle) {
      cursorCircle.style.opacity = '0';
      cursorEnabled = false;
    }
  }

  /**
   * Handle mouse down - add feedback
   */
  function handleMouseDown() {
    if (cursorCircle) {
      cursorCircle.style.transform = 'translate(-50%, -50%) scale(0.8)';
    }
  }

  /**
   * Handle mouse up - remove feedback
   */
  function handleMouseUp() {
    if (cursorCircle) {
      cursorCircle.style.transform = 'translate(-50%, -50%) scale(1)';
    }
  }

  /**
   * Apply cursor color
   */
  function applyCursorColor(color) {
    if (!CURSOR_COLORS[color]) {
      color = DEFAULT_CURSOR_COLOR;
    }

    currentColor = color;
    document.documentElement.setAttribute('data-cursor-color', color);
    document.body.classList.add('cursor-enabled');
    localStorage.setItem(CURSOR_KEY, color);
  }

  /**
   * Toggle cursor circle on/off
   */
  function toggleCursor(enabled) {
    if (enabled) {
      document.body.classList.add('cursor-enabled');
      if (cursorCircle) cursorCircle.style.opacity = '1';
      cursorEnabled = true;
    } else {
      document.body.classList.remove('cursor-enabled');
      if (cursorCircle) cursorCircle.style.opacity = '0';
      cursorEnabled = false;
    }
    localStorage.setItem(CURSOR_KEY + 'Enabled', enabled ? 'true' : 'false');
  }

  /**
   * Get cursor color
   */
  function getCursorColor() {
    return currentColor;
  }

  /**
   * Get available cursor colors
   */
  function getAvailableCursorColors() {
    return Object.keys(CURSOR_COLORS).map(key => ({
      id: key,
      name: CURSOR_COLORS[key].name,
      hex: CURSOR_COLORS[key].hex
    }));
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCursor);
  } else {
    initCursor();
  }

  // Export global functions
  window.CursorCircle = {
    setColor: applyCursorColor,
    getColor: getCursorColor,
    toggle: toggleCursor,
    getColors: getAvailableCursorColors,
    colors: CURSOR_COLORS
  };

  // Convenient shorthand
  window.setCursorColor = applyCursorColor;
})();
