(function () {
  const STORAGE_KEY = 'dark-shadow-cloak-settings';
  const DEFAULTS = {
    cloakTitle: 'My Hidden Link',
    cloakFavicon: '',
    cloakUrl: 'https://example.com',
    panicKey: 'Escape',
    panicUrl: 'https://example.com'
  };

  function readSettings() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return { ...DEFAULTS };
      return { ...DEFAULTS, ...JSON.parse(saved) };
    } catch (error) {
      return { ...DEFAULTS };
    }
  }

  function saveSettings(settings) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    applySettings(settings);
  }

  function applySettings(settings) {
    const title = (settings.cloakTitle || DEFAULTS.cloakTitle).trim();
    document.title = title;

    const faviconLink = document.querySelector('link[rel="icon"]') || document.createElement('link');
    faviconLink.rel = 'icon';
    faviconLink.type = 'image/png';

    const faviconValue = (settings.cloakFavicon || '').trim();
    faviconLink.href = faviconValue || './branding/dark-shadow-logo.png';

    if (!document.querySelector('link[rel="icon"]')) {
      document.head.appendChild(faviconLink);
    }

    document.documentElement.dataset.cloakTitle = title;
    document.documentElement.dataset.cloakUrl = settings.cloakUrl || DEFAULTS.cloakUrl;
  }

  function normalizeKey(value) {
    const key = (value || '').trim();
    if (!key) return '';
    return key.toLowerCase();
  }

  function attachPanicKey(settings) {
    document.removeEventListener('keydown', handlePanicKey);
    document.addEventListener('keydown', handlePanicKey);

    function handlePanicKey(event) {
      const target = event.target;
      const isEditable = target && /INPUT|TEXTAREA|SELECT/.test(target.tagName);
      if (isEditable) return;

      const trigger = normalizeKey(settings.panicKey || DEFAULTS.panicKey);
      const targetKey = normalizeKey(event.key || '');
      const targetCode = normalizeKey(event.code || '');

      if (!trigger) return;
      if (trigger === 'escape' && (targetKey === 'escape' || targetCode === 'escape')) {
        event.preventDefault();
        window.location.href = settings.panicUrl || settings.cloakUrl || DEFAULTS.panicUrl;
        return;
      }

      if (targetKey === trigger || targetCode === trigger) {
        event.preventDefault();
        window.location.href = settings.panicUrl || settings.cloakUrl || DEFAULTS.panicUrl;
      }
    }
  }

  function createPanel() {
    const panel = document.createElement('div');
    panel.id = 'cloak-settings-panel';
    panel.style.cssText = [
      'position:fixed',
      'right:16px',
      'bottom:16px',
      'width:min(320px, calc(100vw - 32px))',
      'background:rgba(10,10,16,0.96)',
      'color:#fff',
      'border:1px solid rgba(255,255,255,0.15)',
      'border-radius:14px',
      'box-shadow:0 10px 30px rgba(0,0,0,0.35)',
      'padding:14px',
      'z-index:99999',
      'display:none',
      'font-family:Inter,Segoe UI,sans-serif',
      'backdrop-filter:blur(8px)'
    ].join(';');

    panel.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:10px;">
        <strong style="font-size:14px;">🔐 Cloak Settings</strong>
        <button id="cloak-settings-close" type="button" style="background:none;border:none;color:#fff;cursor:pointer;font-size:18px;">✕</button>
      </div>
      <label style="display:block;margin:8px 0 4px;font-size:12px;color:#cfd8e3;">Link name</label>
      <input id="cloak-title" type="text" style="width:100%;padding:8px;border-radius:8px;border:1px solid #444;background:#161826;color:#fff;box-sizing:border-box;" />
      <label style="display:block;margin:8px 0 4px;font-size:12px;color:#cfd8e3;">Logo URL</label>
      <input id="cloak-favicon" type="text" placeholder="https://example.com/logo.png" style="width:100%;padding:8px;border-radius:8px;border:1px solid #444;background:#161826;color:#fff;box-sizing:border-box;" />
      <label style="display:block;margin:8px 0 4px;font-size:12px;color:#cfd8e3;">Hidden destination URL</label>
      <input id="cloak-url" type="text" placeholder="https://your-hidden-link.com" style="width:100%;padding:8px;border-radius:8px;border:1px solid #444;background:#161826;color:#fff;box-sizing:border-box;" />
      <label style="display:block;margin:8px 0 4px;font-size:12px;color:#cfd8e3;">Panic key</label>
      <input id="cloak-panic-key" type="text" placeholder="Escape" style="width:100%;padding:8px;border-radius:8px;border:1px solid #444;background:#161826;color:#fff;box-sizing:border-box;" />
      <label style="display:block;margin:8px 0 4px;font-size:12px;color:#cfd8e3;">Panic redirect URL</label>
      <input id="cloak-panic-url" type="text" placeholder="https://real-target.com" style="width:100%;padding:8px;border-radius:8px;border:1px solid #444;background:#161826;color:#fff;box-sizing:border-box;" />
      <div style="display:flex;gap:8px;margin-top:10px;">
        <button id="cloak-save" type="button" style="flex:1;background:#4f7cff;border:none;color:#fff;padding:8px;border-radius:8px;cursor:pointer;">Save</button>
        <button id="cloak-reset" type="button" style="flex:1;background:#2f3447;border:none;color:#fff;padding:8px;border-radius:8px;cursor:pointer;">Reset</button>
      </div>
      <div id="cloak-status" style="margin-top:8px;font-size:12px;color:#8ed4ff;min-height:16px;"></div>
    `;

    document.body.appendChild(panel);

    const button = document.createElement('button');
    button.id = 'cloak-settings-toggle';
    button.type = 'button';
    button.textContent = '🔐 Cloak Settings';
    button.style.cssText = [
      'position:fixed',
      'right:16px',
      'bottom:16px',
      'background:#111827',
      'color:#fff',
      'border:1px solid rgba(255,255,255,0.15)',
      'border-radius:999px',
      'padding:10px 14px',
      'cursor:pointer',
      'z-index:99998',
      'box-shadow:0 8px 20px rgba(0,0,0,0.25)'
    ].join(';');
    document.body.appendChild(button);

    button.addEventListener('click', () => {
      panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
      button.style.display = panel.style.display === 'block' ? 'none' : 'block';
    });

    panel.querySelector('#cloak-settings-close').addEventListener('click', () => {
      panel.style.display = 'none';
      button.style.display = 'block';
    });

    const saveBtn = panel.querySelector('#cloak-save');
    const resetBtn = panel.querySelector('#cloak-reset');
    const status = panel.querySelector('#cloak-status');

    saveBtn.addEventListener('click', () => {
      const values = {
        cloakTitle: panel.querySelector('#cloak-title').value,
        cloakFavicon: panel.querySelector('#cloak-favicon').value,
        cloakUrl: panel.querySelector('#cloak-url').value,
        panicKey: panel.querySelector('#cloak-panic-key').value,
        panicUrl: panel.querySelector('#cloak-panic-url').value
      };
      saveSettings(values);
      status.textContent = 'Saved. Your cloak settings are now active.';
    });

    resetBtn.addEventListener('click', () => {
      saveSettings({ ...DEFAULTS });
      populateForm(panel, { ...DEFAULTS });
      status.textContent = 'Reset to defaults.';
    });

    return { panel, button, status };
  }

  function populateForm(panel, settings) {
    panel.querySelector('#cloak-title').value = settings.cloakTitle || DEFAULTS.cloakTitle;
    panel.querySelector('#cloak-favicon').value = settings.cloakFavicon || '';
    panel.querySelector('#cloak-url').value = settings.cloakUrl || DEFAULTS.cloakUrl;
    panel.querySelector('#cloak-panic-key').value = settings.panicKey || DEFAULTS.panicKey;
    panel.querySelector('#cloak-panic-url').value = settings.panicUrl || DEFAULTS.panicUrl;
  }

  function createTypingWidget() {
    const isHomePage = window.location.pathname === '/' || window.location.pathname === '/index.html' || window.location.pathname.endsWith('/index.html') || window.location.pathname.endsWith('/');
    if (!isHomePage || document.getElementById('dark-shadow-typing-widget')) return;

    const widget = document.createElement('div');
    widget.id = 'dark-shadow-typing-widget';
    widget.style.cssText = [
      'position:fixed',
      'right:18px',
      'bottom:18px',
      'z-index:99997',
      'font-family:Inter,Segoe UI,sans-serif',
      'font-size:16px',
      'font-weight:700',
      'color:#f8fafc',
      'background:rgba(15,23,42,0.7)',
      'padding:10px 12px',
      'border-radius:999px',
      'border:1px solid rgba(255,255,255,0.16)',
      'backdrop-filter:blur(8px)',
      'box-shadow:0 8px 22px rgba(0,0,0,0.25)',
      'pointer-events:none'
    ].join(';');

    document.body.appendChild(widget);

    const fullText = 'welcome';
    let index = 0;
    let deleting = false;

    const tick = () => {
      if (!deleting) {
        widget.textContent = fullText.slice(0, index + 1);
        index += 1;
        if (index >= fullText.length) {
          deleting = true;
          setTimeout(tick, 900);
          return;
        }
      } else {
        widget.textContent = fullText.slice(0, index);
        index -= 1;
        if (index <= 0) {
          deleting = false;
          setTimeout(tick, 450);
          return;
        }
      }
      setTimeout(tick, 110);
    };

    tick();
  }

  function maskLocation() {
    try {
      const currentPath = window.location.pathname || '/';
      const currentSearch = window.location.search || '';
      const currentHash = window.location.hash || '';
      if (!currentHash.includes('cloak')) {
        const maskedUrl = `${currentPath}${currentSearch}#cloak`;
        history.replaceState({}, document.title, maskedUrl);
      }
    } catch (error) {
      // Ignore browser restrictions
    }
  }

  function init() {
    if (!document.body) return;
    const settings = readSettings();
    const ui = createPanel();
    populateForm(ui.panel, settings);
    applySettings(settings);
    attachPanicKey(settings);
    createTypingWidget();
    setTimeout(maskLocation, 120);
    window.darkShadowCloakSettings = {
      get: readSettings,
      save: saveSettings,
      apply: applySettings
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
