/* Admin Panel Button Integration */

const AdminButtonIntegration = (() => {
  const injectAdminButton = () => {
    // Wait for app to be ready
    const waitForApp = setInterval(() => {
      if (document.getElementById('root') && document.getElementById('root').children.length > 0) {
        clearInterval(waitForApp);
        setupAdminButton();
      }
    }, 100);

    // Timeout after 5 seconds
    setTimeout(() => clearInterval(waitForApp), 5000);
  };

  const setupAdminButton = () => {
    // Create admin button
    const adminBtn = document.createElement('button');
    adminBtn.id = 'admin-panel-btn';
    adminBtn.className = 'admin-panel-btn';
    adminBtn.innerHTML = '🔐 Admin';
    adminBtn.title = 'Open Admin Panel - Analytics & Visitor Tracking';
    adminBtn.style.cssText = `
      position: fixed;
      bottom: 180px;
      right: 20px;
      background: linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%);
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      font-weight: bold;
      z-index: 9998;
      box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
      transition: all 0.3s ease;
      font-family: inherit;
    `;

    // Hover effects
    adminBtn.addEventListener('mouseenter', () => {
      adminBtn.style.background = 'linear-gradient(135deg, #ff5252 0%, #ff3838 100%)';
      adminBtn.style.transform = 'scale(1.1)';
      adminBtn.style.boxShadow = '0 6px 25px rgba(255, 107, 107, 0.6)';
    });

    adminBtn.addEventListener('mouseleave', () => {
      adminBtn.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%)';
      adminBtn.style.transform = 'scale(1)';
      adminBtn.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.4)';
    });

    // Click to open admin panel
    adminBtn.addEventListener('click', () => {
      window.toggleAdminPanel();
    });

    document.body.appendChild(adminBtn);
  };

  return {
    init: injectAdminButton
  };
})();

// Initialize admin button
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    AdminButtonIntegration.init();
  });
} else {
  AdminButtonIntegration.init();
}
