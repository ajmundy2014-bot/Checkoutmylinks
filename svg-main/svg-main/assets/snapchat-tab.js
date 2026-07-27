(function () {
  'use strict';

  const STORAGE_KEY = 'dark-shadow-snapchat';
  const DEFAULT_STATE = { accounts: {}, activeUser: null };
  let panel = null;
  let toggleButton = null;
  let state = DEFAULT_STATE;
  let selectedFriend = null;

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return { ...DEFAULT_STATE, accounts: {} };
      const parsed = JSON.parse(saved);
      return {
        accounts: parsed.accounts || {},
        activeUser: parsed.activeUser || null
      };
    } catch (error) {
      return { ...DEFAULT_STATE, accounts: {} };
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function getActiveAccount() {
    if (!state.activeUser) return null;
    return state.accounts[state.activeUser] || null;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function createAccount(username, password) {
    if (!username.trim()) return null;
    const cleanUsername = username.trim().toLowerCase();
    if (!state.accounts[cleanUsername]) {
      state.accounts[cleanUsername] = {
        username: cleanUsername,
        password,
        friends: [],
        chats: {}
      };
    }
    state.activeUser = cleanUsername;
    saveState();
    return state.accounts[cleanUsername];
  }

  function loginOrCreate(username, password) {
    const cleanUsername = username.trim().toLowerCase();
    const account = state.accounts[cleanUsername];
    if (account) {
      if (account.password !== password) {
        return { success: false, message: 'Password does not match this username.' };
      }
    } else {
      const created = createAccount(cleanUsername, password);
      return { success: true, account: created, message: 'Account created locally.' };
    }

    state.activeUser = cleanUsername;
    saveState();
    return { success: true, account, message: 'Welcome back!' };
  }

  function ensureFriendChat(account, friendName) {
    if (!account.chats[friendName]) {
      account.chats[friendName] = [];
    }
    if (!account.friends.includes(friendName)) {
      account.friends.push(friendName);
    }
  }

  function addFriend(friendName) {
    const account = getActiveAccount();
    if (!account) return { success: false, message: 'Sign in first.' };

    const cleanFriend = friendName.trim().toLowerCase();
    if (!cleanFriend) return { success: false, message: 'Enter a username.' };
    if (cleanFriend === account.username) {
      return { success: false, message: 'You already know yourself.' };
    }

    ensureFriendChat(account, cleanFriend);
    selectedFriend = cleanFriend;
    saveState();
    return { success: true, message: `Added ${cleanFriend} to your friends.` };
  }

  function sendChatMessage(text, type = 'text') {
    const account = getActiveAccount();
    if (!account) return { success: false, message: 'Sign in first.' };
    if (!selectedFriend) return { success: false, message: 'Choose a friend first.' };
    if (!text.trim()) return { success: false, message: 'Type something first.' };

    ensureFriendChat(account, selectedFriend);
    account.chats[selectedFriend].push({
      from: account.username,
      text: text.trim(),
      type,
      time: Date.now()
    });

    const replyPool = [
      'Haha that is funny 😄',
      'LOL, you are too much 😂',
      'That meme is fire 🔥',
      'I need that in my camera roll 📸',
      'You always know how to make me laugh 🤪'
    ];

    if (type === 'meme') {
      account.chats[selectedFriend].push({
        from: selectedFriend,
        text: replyPool[Math.floor(Math.random() * replyPool.length)],
        type: 'text',
        time: Date.now() + 1
      });
    }

    saveState();
    return { success: true };
  }

  function renderAuthView() {
    panel.innerHTML = `
      <div class="snapchat-shell">
        <div class="snapchat-header">
          <div>
            <h3>📸 Snapchat</h3>
            <p>Local-only chat with friends</p>
          </div>
          <button class="snapchat-close" id="snapchat-close">✕</button>
        </div>
        <div class="snapchat-auth">
          <h4>Create or sign in</h4>
          <p>Use any username and password. No Google account needed.</p>
          <form id="snapchat-login-form">
            <input id="snapchat-username" placeholder="Username" required />
            <input id="snapchat-password" type="password" placeholder="Password" required />
            <button type="submit">Enter</button>
          </form>
          <div id="snapchat-auth-message" class="snapchat-message"></div>
        </div>
      </div>
    `;

    const closeButton = panel.querySelector('#snapchat-close');
    closeButton.addEventListener('click', closePanel);

    panel.querySelector('#snapchat-login-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const username = panel.querySelector('#snapchat-username').value;
      const password = panel.querySelector('#snapchat-password').value;
      const result = loginOrCreate(username, password);
      const messageBox = panel.querySelector('#snapchat-auth-message');
      messageBox.textContent = result.message;
      if (result.success) {
        renderDashboardView();
      }
    });
  }

  function renderDashboardView() {
    const account = getActiveAccount();
    if (!account) {
      renderAuthView();
      return;
    }

    const friends = account.friends || [];
    const friendList = friends.length ? friends.map((friend) => `
      <button class="snapchat-friend-btn ${friend === selectedFriend ? 'active' : ''}" data-friend="${escapeHtml(friend)}">
        ${escapeHtml(friend)}
      </button>
    `).join('') : '<p class="snapchat-empty">No friends yet. Add someone below.</p>';

    const currentChat = selectedFriend && account.chats[selectedFriend] ? account.chats[selectedFriend] : [];
    const chatMessages = currentChat.length
      ? currentChat.map((message) => `
          <div class="snapchat-bubble ${message.from === account.username ? 'me' : 'them'}">
            <strong>${escapeHtml(message.from === account.username ? 'You' : message.from)}</strong>
            <div>${escapeHtml(message.text)}</div>
          </div>
        `).join('')
      : '<div class="snapchat-empty">Start the chat with a funny meme.</div>';

    panel.innerHTML = `
      <div class="snapchat-shell">
        <div class="snapchat-header">
          <div>
            <h3>📸 Snapchat</h3>
            <p>${escapeHtml(account.username)} · Local chat</p>
          </div>
          <button class="snapchat-close" id="snapchat-close">✕</button>
        </div>

        <div class="snapchat-body">
          <div class="snapchat-friends-panel">
            <div class="snapchat-inline-form">
              <input id="snapchat-friend-name" placeholder="Add friend" />
              <button id="snapchat-add-friend">Add</button>
            </div>
            <div class="snapchat-friends-list">${friendList}</div>
          </div>

          <div class="snapchat-chat-panel">
            <div class="snapchat-chat-header">
              <h4>${selectedFriend ? escapeHtml(selectedFriend) : 'Pick a friend'}</h4>
              <button id="snapchat-logout">Logout</button>
            </div>
            <div class="snapchat-messages">${chatMessages}</div>
            <div class="snapchat-meme-row">
              <button class="meme-btn" data-meme="😂">😂</button>
              <button class="meme-btn" data-meme="😹">😹</button>
              <button class="meme-btn" data-meme="🔥">🔥</button>
              <button class="meme-btn" data-meme="🫠">🫠</button>
              <button class="meme-btn" data-meme="🤖">🤖</button>
            </div>
            <div class="snapchat-inline-form">
              <input id="snapchat-message" placeholder="Send a funny message" />
              <button id="snapchat-send">Send</button>
            </div>
          </div>
        </div>
      </div>
    `;

    panel.querySelector('#snapchat-close').addEventListener('click', closePanel);
    panel.querySelector('#snapchat-logout').addEventListener('click', () => {
      state.activeUser = null;
      saveState();
      renderAuthView();
    });

    panel.querySelector('#snapchat-add-friend').addEventListener('click', () => {
      const friendName = panel.querySelector('#snapchat-friend-name').value;
      const result = addFriend(friendName);
      const messageBox = document.createElement('div');
      messageBox.className = 'snapchat-message';
      messageBox.textContent = result.message;
      panel.querySelector('.snapchat-friends-panel').appendChild(messageBox);
      renderDashboardView();
    });

    panel.querySelectorAll('.snapchat-friend-btn').forEach((button) => {
      button.addEventListener('click', () => {
        selectedFriend = button.getAttribute('data-friend');
        renderDashboardView();
      });
    });

    panel.querySelector('#snapchat-send').addEventListener('click', () => {
      const input = panel.querySelector('#snapchat-message');
      const result = sendChatMessage(input.value, 'text');
      if (result.success) {
        input.value = '';
        renderDashboardView();
      }
    });

    panel.querySelectorAll('.meme-btn').forEach((button) => {
      button.addEventListener('click', () => {
        const meme = button.getAttribute('data-meme');
        const result = sendChatMessage(`${meme} ${meme} ${meme}`, 'meme');
        if (result.success) {
          renderDashboardView();
        }
      });
    });
  }

  function openPanel() {
    panel.style.display = 'block';
    toggleButton.style.display = 'none';
    if (state.activeUser) {
      renderDashboardView();
    } else {
      renderAuthView();
    }
  }

  function closePanel() {
    panel.style.display = 'none';
    toggleButton.style.display = 'block';
  }

  function init() {
    state = loadState();
    if (!document.body) return;

    const style = document.createElement('style');
    style.textContent = `
      #dark-shadow-snapchat-toggle {
        position: fixed;
        left: 12px;
        bottom: 96px;
        z-index: 99998;
        background: linear-gradient(135deg, #ff5f6d, #ffc371);
        color: white;
        border: none;
        border-radius: 999px;
        padding: 10px 14px;
        cursor: pointer;
        box-shadow: 0 8px 20px rgba(0,0,0,0.25);
        font-weight: 700;
      }
      #dark-shadow-snapchat-panel {
        position: fixed;
        left: 12px;
        bottom: 140px;
        width: min(360px, calc(100vw - 24px));
        z-index: 99999;
        display: none;
      }
      .snapchat-shell {
        background: rgba(15, 23, 42, 0.97);
        color: white;
        border: 1px solid rgba(255,255,255,0.16);
        border-radius: 18px;
        overflow: hidden;
        box-shadow: 0 12px 35px rgba(0,0,0,0.35);
        backdrop-filter: blur(10px);
      }
      .snapchat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 14px;
        background: linear-gradient(135deg, #ff5f6d, #ff7b54);
      }
      .snapchat-header h3, .snapchat-header p, .snapchat-chat-header h4 { margin: 0; }
      .snapchat-close, .snapchat-chat-header button, .snapchat-inline-form button, .snapchat-auth button, .snapchat-meme-row button {
        border: none;
        border-radius: 10px;
        padding: 8px 10px;
        cursor: pointer;
      }
      .snapchat-close { background: rgba(255,255,255,0.2); color: white; }
      .snapchat-auth, .snapchat-body { padding: 14px; }
      .snapchat-auth input, .snapchat-inline-form input, .snapchat-friend-name {
        width: 100%;
        margin-bottom: 8px;
        padding: 8px;
        border-radius: 10px;
        border: 1px solid rgba(255,255,255,0.16);
        background: #111827;
        color: white;
        box-sizing: border-box;
      }
      .snapchat-auth button, .snapchat-inline-form button, .snapchat-chat-header button {
        background: #ff7b54;
        color: white;
        width: 100%;
      }
      .snapchat-body {
        display: grid;
        gap: 10px;
      }
      .snapchat-friends-panel, .snapchat-chat-panel {
        background: rgba(255,255,255,0.04);
        border-radius: 12px;
        padding: 10px;
      }
      .snapchat-friends-list { display: flex; flex-direction: column; gap: 6px; margin-top: 8px; }
      .snapchat-friend-btn {
        text-align: left;
        background: rgba(255,255,255,0.08);
        color: white;
        border: 1px solid transparent;
        padding: 8px;
        border-radius: 10px;
        cursor: pointer;
      }
      .snapchat-friend-btn.active { border-color: #ff7b54; background: rgba(255,123,84,0.2); }
      .snapchat-chat-header { display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-bottom: 8px; }
      .snapchat-messages { display: flex; flex-direction: column; gap: 8px; min-height: 180px; max-height: 280px; overflow: auto; margin-bottom: 8px; }
      .snapchat-bubble { padding: 8px 10px; border-radius: 10px; max-width: 85%; }
      .snapchat-bubble.me { background: #ff7b54; margin-left: auto; }
      .snapchat-bubble.them { background: rgba(255,255,255,0.12); margin-right: auto; }
      .snapchat-empty { color: #cbd5e1; font-size: 13px; }
      .snapchat-message { margin-top: 8px; font-size: 13px; color: #ffd6b3; }
      .snapchat-meme-row { display: flex; gap: 6px; margin-bottom: 8px; }
      .snapchat-meme-row button { background: rgba(255,255,255,0.12); color: white; flex: 1; }
      .snapchat-inline-form { display: flex; gap: 8px; }
      .snapchat-inline-form button { width: auto; }
    `;
    document.head.appendChild(style);

    toggleButton = document.createElement('button');
    toggleButton.id = 'dark-shadow-snapchat-toggle';
    toggleButton.textContent = '📸 Snapchat';
    toggleButton.addEventListener('click', openPanel);
    document.body.appendChild(toggleButton);

    panel = document.createElement('div');
    panel.id = 'dark-shadow-snapchat-panel';
    document.body.appendChild(panel);

    if (state.activeUser) {
      renderDashboardView();
    } else {
      renderAuthView();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
