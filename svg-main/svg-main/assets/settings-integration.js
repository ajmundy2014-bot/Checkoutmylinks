/**
 * Dark Shadow - Complete Settings Integration
 * Combines Background Theme + Cursor Circle settings
 */

(function() {
  'use strict';

  // Create complete settings panel
  function createSettingsPanel() {
    const panel = document.createElement('div');
    panel.id = 'dark-shadow-complete-settings';
    panel.innerHTML = `
      <div style="position: fixed; bottom: 20px; right: 20px; background: rgba(0,0,0,0.95); border: 3px solid #ffffff; border-radius: 12px; padding: 25px; z-index: 10000; min-width: 300px; max-width: 400px; max-height: 80vh; overflow-y: auto; box-shadow: 0 0 30px rgba(0,0,0,0.8);">
        
        <!-- Close Button -->
        <button onclick="document.getElementById('dark-shadow-settings-panel').style.display='none'" style="position: absolute; top: 10px; right: 10px; background: none; border: none; color: #ffffff; font-size: 20px; cursor: pointer; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;">✕</button>

        <!-- Header -->
        <div style="color: #ffffff; margin-bottom: 20px; font-weight: bold; font-size: 18px; text-align: center; border-bottom: 2px solid #666666; padding-bottom: 10px;">
          🎨 Dark Shadow Settings
        </div>
        
        <!-- Background Theme Section -->
        <div style="margin-bottom: 25px;">
          <div style="color: #cccccc; font-weight: bold; margin-bottom: 12px; font-size: 14px;">
            🌈 Background Theme
          </div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <button onclick="window.changeThemeColor('red')" style="padding: 10px; background: linear-gradient(135deg, #8b0000, #dc143c); color: white; border: 2px solid #ffffff; border-radius: 6px; cursor: pointer; font-weight: bold;">
              🔴 Red (赤)
            </button>
            <button onclick="window.changeThemeColor('teal')" style="padding: 10px; background: linear-gradient(135deg, #008080, #20b2aa); color: white; border: 2px solid #ffffff; border-radius: 6px; cursor: pointer; font-weight: bold;">
              🔵 Teal (深緑青)
            </button>
            <button onclick="window.changeThemeColor('black')" style="padding: 10px; background: linear-gradient(135deg, #000000, #1a1a1a); color: white; border: 2px solid #ffffff; border-radius: 6px; cursor: pointer; font-weight: bold;">
              ⚫ Black (黒)
            </button>
            <button onclick="window.changeThemeColor('white')" style="padding: 10px; background: linear-gradient(135deg, #ffffff, #f5f5f5); color: black; border: 2px solid #000000; border-radius: 6px; cursor: pointer; font-weight: bold;">
              ⚪ White (白)
            </button>
          </div>
        </div>

        <!-- Cursor Circle Section -->
        <div style="margin-bottom: 20px; border-top: 2px solid #666666; padding-top: 15px;">
          <div style="color: #cccccc; font-weight: bold; margin-bottom: 12px; font-size: 14px;">
            🎯 Cursor Circle
          </div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <button onclick="window.setCursorColor('black')" style="padding: 10px; background: #000000; color: white; border: 2px solid #ffffff; border-radius: 6px; cursor: pointer; font-weight: bold;">
              ⚫ Black (黒)
            </button>
            <button onclick="window.setCursorColor('white')" style="padding: 10px; background: #ffffff; color: black; border: 2px solid #000000; border-radius: 6px; cursor: pointer; font-weight: bold;">
              ⚪ White (白)
            </button>
            <button onclick="window.setCursorColor('red')" style="padding: 10px; background: #ff0000; color: white; border: 2px solid #ffffff; border-radius: 6px; cursor: pointer; font-weight: bold;">
              🔴 Red (赤)
            </button>
            <button onclick="window.setCursorColor('gray')" style="padding: 10px; background: #808080; color: white; border: 2px solid #ffffff; border-radius: 6px; cursor: pointer; font-weight: bold;">
              ⚪ Gray (灰色)
            </button>
            <button onclick="window.setCursorColor('teal')" style="padding: 10px; background: #008080; color: white; border: 2px solid #ffffff; border-radius: 6px; cursor: pointer; font-weight: bold;">
              🔵 Teal (深緑青)
            </button>
          </div>
        </div>

        <!-- Footer -->
        <div style="margin-top: 15px; font-size: 12px; color: #aaaaaa; border-top: 1px solid #555555; padding-top: 10px; text-align: center;">
          <div style="font-weight: bold; margin-bottom: 5px;">暗影</div>
          <div>Dark Shadow v1.0</div>
        </div>
      </div>
    `;
    
    return panel;
  }

  // Create settings button
  function createSettingsButton() {
    const btn = document.createElement('button');
    btn.id = 'dark-shadow-settings-btn';
    btn.innerHTML = '⚙️ Settings';
    btn.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 12px 16px;
      background: rgba(0,0,0,0.9);
      color: #ffffff;
      border: 2px solid #ffffff;
      border-radius: 8px;
      cursor: pointer;
      z-index: 9999;
      font-weight: bold;
      font-size: 14px;
      transition: all 0.3s ease;
      box-shadow: 0 0 10px rgba(0,0,0,0.5);
    `;

    btn.addEventListener('mouseover', function() {
      this.style.background = 'rgba(0,0,0,0.95)';
      this.style.transform = 'scale(1.1)';
      this.style.boxShadow = '0 0 15px rgba(255,255,255,0.3)';
    });

    btn.addEventListener('mouseout', function() {
      this.style.background = 'rgba(0,0,0,0.9)';
      this.style.transform = 'scale(1)';
      this.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
    });

    btn.addEventListener('click', function() {
      const panel = document.getElementById('dark-shadow-settings-panel');
      if (panel) {
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
      }
    });

    return btn;
  }

  // Initialize when DOM is ready
  function initialize() {
    const panel = createSettingsPanel();
    const btn = createSettingsButton();
    
    document.body.appendChild(panel);
    document.body.appendChild(btn);

    // Close panel when clicking outside
    document.addEventListener('click', function(e) {
      const settingsPanel = document.getElementById('dark-shadow-settings-panel');
      const settingsBtn = document.getElementById('dark-shadow-settings-btn');
      
      if (settingsPanel && settingsPanel.style.display === 'block') {
        if (!settingsPanel.contains(e.target) && !settingsBtn.contains(e.target)) {
          settingsPanel.style.display = 'none';
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
})();
