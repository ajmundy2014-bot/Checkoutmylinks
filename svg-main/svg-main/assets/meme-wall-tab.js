(function () {
  'use strict';

  const STORAGE_KEY = 'dark-shadow-meme-wall';
  const MEME_POOL = [
    { title: 'Cute Cat Logic', text: 'When the alarm rings and your cat still expects breakfast.', emoji: '🐱' },
    { title: 'Coffee Mood', text: 'Me pretending I am a morning person.', emoji: '☕' },
    { title: 'Keyboard Athlete', text: 'Typing with confidence and zero plan.', emoji: '⌨️' },
    { title: 'Weekend Mode', text: 'My brain in vacation mode before the weekend even starts.', emoji: '🌞' },
    { title: 'Snack Time', text: 'When the snack is tiny but the excitement is huge.', emoji: '🍪' },
    { title: 'Study Glow-Up', text: 'Me with a notebook and confidence I do not actually have.', emoji: '📚' },
    { title: 'Pet Drama', text: 'The dog stared at me like I forgot the rules.', emoji: '🐶' },
    { title: 'Tiny Wins', text: 'Found my socks. I am officially thriving.', emoji: '🧦' },
    { title: 'Cloud Daydream', text: 'Thinking about naps and absolutely nothing else.', emoji: '☁️' },
    { title: 'Rainy Day', text: 'A hoodie, a blanket, and a very dramatic cup of tea.', emoji: '☔' },
    { title: 'Plant Parent', text: 'I say I am watering the plant, but really I am checking in.', emoji: '🌿' },
    { title: 'Sleepy Brain', text: 'My brain after one too many notifications.', emoji: '😴' },
    { title: 'Pizza Motivation', text: 'The only thing I can commit to today is pizza.', emoji: '🍕' },
    { title: 'Puzzle Mode', text: 'When I solve one tiny problem and call it a masterpiece.', emoji: '🧩' },
    { title: 'Bunny Energy', text: 'Small paws, huge attitude.', emoji: '🐰' }
  ];

  function getTodayIndex() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay) % MEME_POOL.length;
  }

  function getDailyMeme() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.date === new Date().toISOString().slice(0, 10)) {
          return parsed.meme;
        }
      }
    } catch (error) {
      // ignore
    }

    const meme = MEME_POOL[getTodayIndex()];
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      date: new Date().toISOString().slice(0, 10),
      meme
    }));
    return meme;
  }

  function init() {
    if (!document.body) return;

    const style = document.createElement('style');
    style.textContent = `
      #dark-shadow-meme-wall-toggle {
        position: fixed;
        left: 12px;
        bottom: 148px;
        z-index: 99998;
        background: linear-gradient(135deg, #8b5cf6, #ec4899);
        color: white;
        border: none;
        border-radius: 999px;
        padding: 10px 14px;
        cursor: pointer;
        box-shadow: 0 8px 20px rgba(0,0,0,0.25);
        font-weight: 700;
      }
      #dark-shadow-meme-wall-panel {
        position: fixed;
        left: 12px;
        bottom: 196px;
        width: min(320px, calc(100vw - 24px));
        z-index: 99999;
        display: none;
      }
      .meme-wall-shell {
        background: rgba(15, 23, 42, 0.97);
        color: white;
        border: 1px solid rgba(255,255,255,0.16);
        border-radius: 18px;
        overflow: hidden;
        box-shadow: 0 12px 35px rgba(0,0,0,0.35);
        backdrop-filter: blur(10px);
      }
      .meme-wall-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 14px;
        background: linear-gradient(135deg, #8b5cf6, #ec4899);
      }
      .meme-wall-header h3, .meme-wall-header p { margin: 0; }
      .meme-wall-close {
        background: rgba(255,255,255,0.2);
        border: none;
        color: white;
        border-radius: 10px;
        padding: 8px 10px;
        cursor: pointer;
      }
      .meme-wall-body { padding: 14px; }
      .meme-card {
        border-radius: 14px;
        padding: 14px;
        background: linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06));
        border: 1px solid rgba(255,255,255,0.1);
      }
      .meme-emoji { font-size: 36px; margin-bottom: 8px; display: block; }
      .meme-title { font-weight: 700; margin-bottom: 6px; }
      .meme-text { color: #e2e8f0; font-size: 14px; }
      .meme-date { margin-top: 8px; color: #cbd5e1; font-size: 12px; }
    `;
    document.head.appendChild(style);

    const toggleButton = document.createElement('button');
    toggleButton.id = 'dark-shadow-meme-wall-toggle';
    toggleButton.textContent = '🖼️ Meme Wall';
    document.body.appendChild(toggleButton);

    const panel = document.createElement('div');
    panel.id = 'dark-shadow-meme-wall-panel';
    document.body.appendChild(panel);

    const closePanel = () => {
      panel.style.display = 'none';
      toggleButton.style.display = 'block';
    };

    const openPanel = () => {
      panel.style.display = 'block';
      toggleButton.style.display = 'none';
      render();
    };

    const render = () => {
      const meme = getDailyMeme();
      const today = new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      panel.innerHTML = `
        <div class="meme-wall-shell">
          <div class="meme-wall-header">
            <div>
              <h3>🖼️ Meme Wall</h3>
              <p>Safe, cheerful, daily picks</p>
            </div>
            <button class="meme-wall-close" id="meme-wall-close">✕</button>
          </div>
          <div class="meme-wall-body">
            <div class="meme-card">
              <span class="meme-emoji">${meme.emoji}</span>
              <div class="meme-title">${meme.title}</div>
              <div class="meme-text">${meme.text}</div>
              <div class="meme-date">Today • ${today}</div>
            </div>
          </div>
        </div>
      `;
      panel.querySelector('#meme-wall-close').addEventListener('click', closePanel);
    };

    toggleButton.addEventListener('click', openPanel);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
