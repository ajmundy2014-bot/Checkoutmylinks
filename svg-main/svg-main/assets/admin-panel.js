/* Analytics Tracker and Admin Panel */

const AnalyticsTracker = (() => {
  const ADMIN_CODE = 'aidens';  // Admin code set to 'aidens'
  const STORAGE_KEY = 'darkShadowAnalytics';

  // Initialize analytics tracking on page load
  const initTracking = () => {
    if (!isAdminCodeSet()) {
      console.warn('⚠️ Using default admin code. Change it in admin-panel.js');
    }
    trackVisitor();
  };

  // Collect visitor data
  const trackVisitor = async () => {
    const visitorData = {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      device: getDeviceInfo(),
      location: await getLocationData(),
      referrer: document.referrer || 'Direct',
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    saveVisitorData(visitorData);
  };

  // Get device information
  const getDeviceInfo = () => {
    const ua = navigator.userAgent;
    let device = 'Unknown';
    let browser = 'Unknown';
    let os = 'Unknown';

    // Detect Device Type
    if (/Mobile|Android|iPhone|iPad|iPod/.test(ua)) {
      device = 'Mobile';
    } else if (/Tablet|iPad/.test(ua)) {
      device = 'Tablet';
    } else {
      device = 'Desktop';
    }

    // Detect Operating System
    if (/Windows/i.test(ua)) {
      os = 'Windows';
    } else if (/Macintosh/i.test(ua)) {
      os = 'macOS';
    } else if (/Linux/i.test(ua)) {
      os = 'Linux';
    } else if (/iPhone|iPad|iPod/i.test(ua)) {
      os = 'iOS';
    } else if (/Android/i.test(ua)) {
      os = 'Android';
    }

    // Detect Browser
    if (/Firefox/i.test(ua)) {
      browser = 'Firefox';
    } else if (/Chrome|Chromium|CriOS/i.test(ua)) {
      browser = 'Chrome';
    } else if (/Safari/i.test(ua)) {
      browser = 'Safari';
    } else if (/Edge|Edg/i.test(ua)) {
      browser = 'Edge';
    } else if (/MSIE|Trident/i.test(ua)) {
      browser = 'Internet Explorer';
    }

    return { device, os, browser };
  };

  // Get location data (IP-based geolocation)
  const getLocationData = async () => {
    try {
      // Try using free geolocation API
      const response = await fetch('https://ipapi.co/json/', { 
        mode: 'cors',
        signal: AbortSignal.timeout(3000)
      });
      const data = await response.json();
      return {
        country: data.country_name || 'Unknown',
        city: data.city || 'Unknown',
        region: data.region || 'Unknown',
        ip: data.ip || 'Unknown',
        isp: data.org || 'Unknown',
        latitude: data.latitude || null,
        longitude: data.longitude || null,
      };
    } catch (error) {
      console.log('Could not fetch geolocation data');
      return {
        country: 'Unknown',
        city: 'Unknown',
        region: 'Unknown',
        ip: 'Private',
        isp: 'Unknown',
        latitude: null,
        longitude: null,
      };
    }
  };

  // Save visitor data to localStorage
  const saveVisitorData = (visitorData) => {
    try {
      const existingData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"visitors":[]}');
      existingData.visitors = existingData.visitors || [];
      existingData.visitors.push(visitorData);
      
      // Keep only last 500 visitors to avoid storage issues
      if (existingData.visitors.length > 500) {
        existingData.visitors = existingData.visitors.slice(-500);
      }
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existingData));
      console.log('✅ Visitor tracked:', visitorData.device.device);
    } catch (error) {
      console.warn('Could not save analytics data:', error);
    }
  };

  // Get all visitor data
  const getAllVisitors = () => {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"visitors":[]}');
      return data.visitors || [];
    } catch {
      return [];
    }
  };

  // Admin code verification
  const isAdminCodeSet = () => {
    return ADMIN_CODE !== '1234';
  };

  // Public API
  return {
    init: initTracking,
    setAdminCode: (code) => {
      window.AnalyticsTracker.ADMIN_CODE_PRIVATE = code;
    },
    getVisitors: getAllVisitors,
    clearData: () => localStorage.removeItem(STORAGE_KEY),
    getAdminCode: () => ADMIN_CODE,
    verifyCode: (code) => code === ADMIN_CODE,
  };
})();

const HOME_LAYOUT_STORAGE_KEY = 'darkShadowHomeLayout';
const DEFAULT_HOME_LAYOUT = {
  title: 'Dark Shadow',
  subtitle: 'Your hidden links, your way',
  buttonText: 'Open',
  buttonUrl: '#',
  accentColor: '#1DB954',
  backgroundColor: '#0b0f1a',
  backgroundImage: '',
  hideDefaultContent: false
};

const getHomeLayout = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(HOME_LAYOUT_STORAGE_KEY) || 'null');
    return saved ? { ...DEFAULT_HOME_LAYOUT, ...saved } : { ...DEFAULT_HOME_LAYOUT };
  } catch {
    return { ...DEFAULT_HOME_LAYOUT };
  }
};

const saveHomeLayout = (layout) => {
  localStorage.setItem(HOME_LAYOUT_STORAGE_KEY, JSON.stringify(layout));
  applyHomeLayout(layout);
};

const applyHomeLayout = (layout) => {
  const safeLayout = { ...DEFAULT_HOME_LAYOUT, ...layout };
  const root = document.getElementById('root');
  const overlayId = 'dark-shadow-home-layout-overlay';
  let overlay = document.getElementById(overlayId);

  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = overlayId;
    document.body.appendChild(overlay);
  }

  const shouldShowOverlay = safeLayout.hideDefaultContent && (window.location.pathname === '/' || window.location.pathname === '/index.html' || window.location.pathname.endsWith('/'));
  overlay.innerHTML = `
    <div style="
      min-height: 100vh;
      width: 100%;
      display: ${shouldShowOverlay ? 'flex' : 'none'};
      align-items: center;
      justify-content: center;
      padding: 24px;
      box-sizing: border-box;
      background: ${safeLayout.backgroundImage ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.6)), url(${safeLayout.backgroundImage}) center/cover` : safeLayout.backgroundColor};
      color: #ffffff;
      position: fixed;
      inset: 0;
      z-index: 99990;
      text-align: center;
      font-family: Inter, Segoe UI, sans-serif;
    ">
      <div style="max-width: 680px; background: rgba(10, 14, 24, 0.7); border: 1px solid rgba(255,255,255,0.16); border-radius: 24px; padding: 32px; box-shadow: 0 18px 40px rgba(0,0,0,0.35); backdrop-filter: blur(10px);">
        <div style="font-size: 48px; margin-bottom: 12px; color: ${safeLayout.accentColor};">✨</div>
        <h1 style="margin: 0 0 8px; font-size: 38px;">${safeLayout.title}</h1>
        <p style="margin: 0 0 16px; font-size: 18px; color: #e2e8f0;">${safeLayout.subtitle}</p>
        <a href="${safeLayout.buttonUrl || '#'}" style="display: inline-block; background: ${safeLayout.accentColor}; color: #fff; text-decoration: none; padding: 12px 18px; border-radius: 999px; font-weight: 700;">${safeLayout.buttonText}</a>
      </div>
    </div>
  `;

  if (root) {
    root.style.display = shouldShowOverlay ? 'none' : 'block';
  }

  document.title = safeLayout.title;
  document.documentElement.style.setProperty('--dark-shadow-accent', safeLayout.accentColor);
};

// Admin Panel UI
const AdminPanel = (() => {
  const createAdminPanel = () => {
    const modal = document.createElement('div');
    modal.className = 'admin-panel-modal';
    modal.id = 'admin-panel-modal';
    modal.innerHTML = `
      <div class="admin-container">
        <div class="admin-header">
          <h1>🔐 Admin Panel - Dark Shadow Analytics</h1>
          <button class="admin-close-btn">✕ Close</button>
        </div>

        <!-- Login Form -->
        <div class="admin-login-form" id="admin-login-form">
          <h2 style="color: #1ed760; margin-top: 0;">Enter Admin Code</h2>
          <p style="color: #999999; margin: 0 0 15px 0;">Please enter the admin code to view visitor analytics.</p>
          <input type="password" class="login-input" id="admin-code-input" placeholder="Enter admin code" />
          <div id="admin-error-message"></div>
          <button class="login-button" id="admin-login-btn">🔓 Login</button>
        </div>

        <!-- Dashboard (Hidden until login) -->
        <div class="analytics-dashboard" id="analytics-dashboard">
          <div class="analytics-stats">
            <div class="stat-card">
              <div class="stat-value" id="total-visitors">0</div>
              <div class="stat-label">Total Visitors</div>
            </div>
            <div class="stat-card">
              <div class="stat-value" id="unique-countries">0</div>
              <div class="stat-label">Countries</div>
            </div>
            <div class="stat-card">
              <div class="stat-value" id="popular-device">N/A</div>
              <div class="stat-label">Popular Device</div>
            </div>
            <div class="stat-card">
              <div class="stat-value" id="popular-browser">N/A</div>
              <div class="stat-label">Popular Browser</div>
            </div>
          </div>

          <div class="home-layout-section" style="margin-top: 24px; padding: 16px; border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; background: rgba(255,255,255,0.04);">
            <h2 style="margin-top: 0;">🏠 Home Page Layout</h2>
            <p style="color: #b6c2d1; margin-top: -6px;">Change the landing experience from this admin panel.</p>
            <div style="display: grid; gap: 10px;">
              <label style="display: flex; flex-direction: column; gap: 6px; font-size: 13px; color: #e5e7eb;">
                Title
                <input id="home-title-input" type="text" style="padding: 8px; border-radius: 8px; border: 1px solid #444; background: #111827; color: white;" />
              </label>
              <label style="display: flex; flex-direction: column; gap: 6px; font-size: 13px; color: #e5e7eb;">
                Subtitle
                <input id="home-subtitle-input" type="text" style="padding: 8px; border-radius: 8px; border: 1px solid #444; background: #111827; color: white;" />
              </label>
              <label style="display: flex; flex-direction: column; gap: 6px; font-size: 13px; color: #e5e7eb;">
                Button Text
                <input id="home-button-text-input" type="text" style="padding: 8px; border-radius: 8px; border: 1px solid #444; background: #111827; color: white;" />
              </label>
              <label style="display: flex; flex-direction: column; gap: 6px; font-size: 13px; color: #e5e7eb;">
                Button URL
                <input id="home-button-url-input" type="text" style="padding: 8px; border-radius: 8px; border: 1px solid #444; background: #111827; color: white;" />
              </label>
              <label style="display: flex; flex-direction: column; gap: 6px; font-size: 13px; color: #e5e7eb;">
                Accent Color
                <input id="home-accent-color-input" type="color" style="height: 38px; padding: 2px; border-radius: 8px; border: 1px solid #444; background: #111827;" />
              </label>
              <label style="display: flex; flex-direction: column; gap: 6px; font-size: 13px; color: #e5e7eb;">
                Background Color
                <input id="home-background-color-input" type="color" style="height: 38px; padding: 2px; border-radius: 8px; border: 1px solid #444; background: #111827;" />
              </label>
              <label style="display: flex; flex-direction: column; gap: 6px; font-size: 13px; color: #e5e7eb;">
                Background Image URL
                <input id="home-background-image-input" type="text" style="padding: 8px; border-radius: 8px; border: 1px solid #444; background: #111827; color: white;" />
              </label>
              <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: #e5e7eb;">
                <input id="home-hide-default-input" type="checkbox" />
                Replace the default home content with this custom landing screen
              </label>
            </div>
            <div style="display: flex; gap: 8px; margin-top: 12px;">
              <button class="login-button" id="home-apply-btn" style="flex: 1; background: #1DB954;">Apply Layout</button>
              <button class="login-button" id="home-reset-btn" style="flex: 1; background: #4B5563;">Reset</button>
            </div>
            <div id="home-layout-status" style="margin-top: 8px; color: #8ed4ff; font-size: 13px; min-height: 16px;"></div>
          </div>

          <div class="visitors-section">
            <h2>📊 Recent Visitors</h2>
            <button class="refresh-button" id="refresh-btn">🔄 Refresh Data</button>
            <table class="visitors-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Location</th>
                  <th>Device</th>
                  <th>Browser</th>
                  <th>OS</th>
                  <th>ISP</th>
                  <th>IP</th>
                </tr>
              </thead>
              <tbody id="visitors-tbody">
              </tbody>
            </table>
            <div id="empty-state" class="empty-state">
              <p>No visitors yet</p>
            </div>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #1DB954;">
            <button class="login-button" id="admin-logout-btn" style="background: #ff6b6b; width: 100%; margin-bottom: 10px;">🔒 Logout</button>
            <button class="login-button" id="admin-clear-btn" style="background: #FFB300; width: 100%;">🗑️ Clear Data</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    applyHomeLayout(getHomeLayout());
    setupEventListeners();
  };

  const setupEventListeners = () => {
    const modal = document.getElementById('admin-panel-modal');
    const closeBtn = modal.querySelector('.admin-close-btn');
    const loginBtn = document.getElementById('admin-login-btn');
    const logoutBtn = document.getElementById('admin-logout-btn');
    const clearBtn = document.getElementById('admin-clear-btn');
    const refreshBtn = document.getElementById('refresh-btn');
    const codeInput = document.getElementById('admin-code-input');
    const applyHomeBtn = document.getElementById('home-apply-btn');
    const resetHomeBtn = document.getElementById('home-reset-btn');

    // Close modal
    closeBtn.addEventListener('click', closePanel);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closePanel();
    });

    // Login
    loginBtn.addEventListener('click', handleLogin);
    codeInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleLogin();
    });

    // Logout
    logoutBtn.addEventListener('click', logout);

    // Refresh
    refreshBtn.addEventListener('click', updateDashboard);

    // Clear data
    clearBtn.addEventListener('click', () => {
      if (confirm('⚠️ Are you sure you want to delete all visitor data? This cannot be undone.')) {
        AnalyticsTracker.clearData();
        alert('✅ All analytics data has been cleared!');
        logout();
      }
    });

    const readHomeLayout = () => ({
      title: document.getElementById('home-title-input').value || DEFAULT_HOME_LAYOUT.title,
      subtitle: document.getElementById('home-subtitle-input').value || DEFAULT_HOME_LAYOUT.subtitle,
      buttonText: document.getElementById('home-button-text-input').value || DEFAULT_HOME_LAYOUT.buttonText,
      buttonUrl: document.getElementById('home-button-url-input').value || DEFAULT_HOME_LAYOUT.buttonUrl,
      accentColor: document.getElementById('home-accent-color-input').value || DEFAULT_HOME_LAYOUT.accentColor,
      backgroundColor: document.getElementById('home-background-color-input').value || DEFAULT_HOME_LAYOUT.backgroundColor,
      backgroundImage: document.getElementById('home-background-image-input').value || DEFAULT_HOME_LAYOUT.backgroundImage,
      hideDefaultContent: document.getElementById('home-hide-default-input').checked
    });

    const populateHomeLayoutForm = (layout) => {
      document.getElementById('home-title-input').value = layout.title || DEFAULT_HOME_LAYOUT.title;
      document.getElementById('home-subtitle-input').value = layout.subtitle || DEFAULT_HOME_LAYOUT.subtitle;
      document.getElementById('home-button-text-input').value = layout.buttonText || DEFAULT_HOME_LAYOUT.buttonText;
      document.getElementById('home-button-url-input').value = layout.buttonUrl || DEFAULT_HOME_LAYOUT.buttonUrl;
      document.getElementById('home-accent-color-input').value = layout.accentColor || DEFAULT_HOME_LAYOUT.accentColor;
      document.getElementById('home-background-color-input').value = layout.backgroundColor || DEFAULT_HOME_LAYOUT.backgroundColor;
      document.getElementById('home-background-image-input').value = layout.backgroundImage || DEFAULT_HOME_LAYOUT.backgroundImage;
      document.getElementById('home-hide-default-input').checked = !!layout.hideDefaultContent;
    };

    applyHomeBtn.addEventListener('click', () => {
      const layout = readHomeLayout();
      saveHomeLayout(layout);
      document.getElementById('home-layout-status').textContent = 'Home page layout applied.';
    });

    resetHomeBtn.addEventListener('click', () => {
      saveHomeLayout({ ...DEFAULT_HOME_LAYOUT });
      populateHomeLayoutForm({ ...DEFAULT_HOME_LAYOUT });
      document.getElementById('home-layout-status').textContent = 'Home page layout reset to defaults.';
    });

    populateHomeLayoutForm(getHomeLayout());
  };

  const handleLogin = () => {
    const codeInput = document.getElementById('admin-code-input');
    const code = codeInput.value.trim();
    const errorDiv = document.getElementById('admin-error-message');

    if (!code) {
      errorDiv.innerHTML = '<div class="error-message">❌ Please enter a code</div>';
      return;
    }

    if (AnalyticsTracker.verifyCode(code)) {
      errorDiv.innerHTML = '';
      sessionStorage.setItem('adminLoggedIn', 'true');
      showDashboard();
    } else {
      errorDiv.innerHTML = '<div class="error-message">❌ Invalid code. Please try again.</div>';
      codeInput.value = '';
    }
  };

  const showDashboard = () => {
    document.getElementById('admin-login-form').style.display = 'none';
    document.getElementById('analytics-dashboard').classList.add('active');
    updateDashboard();
  };

  const updateDashboard = () => {
    const visitors = AnalyticsTracker.getVisitors();
    const tbody = document.getElementById('visitors-tbody');
    const emptyState = document.getElementById('empty-state');

    // Update stats
    updateStats(visitors);

    // Update table
    if (visitors.length === 0) {
      emptyState.style.display = 'block';
      tbody.innerHTML = '';
    } else {
      emptyState.style.display = 'none';
      tbody.innerHTML = visitors
        .slice()
        .reverse()
        .map((v, i) => `
          <tr>
            <td>${formatTime(v.timestamp)}</td>
            <td>
              <span class="location-badge">
                ${v.location.city}, ${v.location.country}
              </span>
            </td>
            <td><span class="device-badge">${v.device.device}</span></td>
            <td>${v.device.browser}</td>
            <td>${v.device.os}</td>
            <td title="${v.location.isp}">${(v.location.isp || 'Unknown').substring(0, 20)}</td>
            <td title="${v.location.ip || 'Unknown'}">${(v.location.ip || 'Unknown').substring(0, 20)}</td>
          </tr>
        `)
        .join('');
    }
  };

  const updateStats = (visitors) => {
    // Total visitors
    document.getElementById('total-visitors').textContent = visitors.length;

    // Unique countries
    const countries = new Set(visitors.map(v => v.location.country));
    document.getElementById('unique-countries').textContent = countries.size;

    // Most popular device
    const deviceCounts = {};
    visitors.forEach(v => {
      deviceCounts[v.device.device] = (deviceCounts[v.device.device] || 0) + 1;
    });
    const mostDevice = Object.entries(deviceCounts).sort((a, b) => b[1] - a[1])[0];
    document.getElementById('popular-device').textContent = mostDevice ? mostDevice[0] : 'N/A';

    // Most popular browser
    const browserCounts = {};
    visitors.forEach(v => {
      browserCounts[v.device.browser] = (browserCounts[v.device.browser] || 0) + 1;
    });
    const mostBrowser = Object.entries(browserCounts).sort((a, b) => b[1] - a[1])[0];
    document.getElementById('popular-browser').textContent = mostBrowser ? mostBrowser[0] : 'N/A';
  };

  const logout = () => {
    sessionStorage.removeItem('adminLoggedIn');
    document.getElementById('admin-login-form').style.display = 'flex';
    document.getElementById('analytics-dashboard').classList.remove('active');
    document.getElementById('admin-code-input').value = '';
    document.getElementById('admin-error-message').innerHTML = '';
  };

  const closePanel = () => {
    document.getElementById('admin-panel-modal').classList.remove('active');
  };

  const openPanel = () => {
    document.getElementById('admin-panel-modal').classList.add('active');
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(navigator.language, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Public API
  return {
    init: createAdminPanel,
    open: openPanel,
    close: closePanel,
    setAdminCode: (code) => {
      window.AdminPanel.ADMIN_CODE_PRIVATE = code;
    }
  };
})();

// Global API
window.AnalyticsTracker = AnalyticsTracker;
window.AdminPanel = AdminPanel;
window.toggleAdminPanel = () => {
  const modal = document.getElementById('admin-panel-modal');
  if (modal.classList.contains('active')) {
    AdminPanel.close();
  } else {
    AdminPanel.open();
  }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  AdminPanel.init();
  AnalyticsTracker.init();
  console.log('✅ Analytics & Admin Panel initialized');
  console.log('📊 Admin commands: window.toggleAdminPanel() or window.AdminPanel.open()');
});
