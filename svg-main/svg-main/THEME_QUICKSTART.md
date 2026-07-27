# 🎨 Dark Shadow Theme - Quick Start Guide

## What's New?

Your Dark Shadow app now features:
- ✅ Red background (default) with falling white snow animation
- ✅ 4 changeable theme colors (Red, Teal, Black, White)
- ✅ Japanese branding (暗影)
- ✅ Persistent theme settings (saves your preference)

---

## 🎯 Using Theme Colors

### Method 1: Browser Console
Open your browser's developer console (F12) and type:

```javascript
// Change to Red theme
window.changeThemeColor('red');

// Change to Teal theme
window.changeThemeColor('teal');

// Change to Black theme
window.changeThemeColor('black');

// Change to White theme
window.changeThemeColor('white');
```

### Method 2: Integrate into Settings UI
Add this HTML snippet to your settings panel:

```html
<div style="display: flex; gap: 10px; flex-wrap: wrap;">
  <button onclick="window.changeThemeColor('red')">🔴 Red (赤)</button>
  <button onclick="window.changeThemeColor('teal')">🔵 Teal (深緑青)</button>
  <button onclick="window.changeThemeColor('black')">⚫ Black (黒)</button>
  <button onclick="window.changeThemeColor('white')">⚪ White (白)</button>
</div>
```

### Method 3: JavaScript Code
```javascript
// Get current theme
const current = window.getCurrentTheme();
console.log('Current theme:', current);

// Get list of all themes
const themes = window.getAvailableThemes();
themes.forEach(t => console.log(`${t.id}: ${t.name}`));

// Apply theme
window.changeThemeColor('teal');
```

---

## 🌨️ Snow Effect

The falling snow animation is automatic and works with all themes:
- **15 snowflakes** visible at any time
- **Continuous fall** from top to bottom
- **Variable speeds** for natural motion
- **Works on all backgrounds** - white text for dark themes, dark text for white theme

---

## 💾 Theme Persistence

Your selected theme is automatically saved to browser localStorage:
- Theme name: `darkShadowTheme`
- Persists across page refreshes
- Can be cleared by clearing browser data

**Manually clear theme:**
```javascript
localStorage.removeItem('darkShadowTheme');
```

---

## 📁 Related Files

- `assets/dark-shadow-custom.css` - Snow animation & theme styles
- `assets/dark-shadow-theme.js` - Theme manager module
- `config.json` - App configuration with theme definitions
- `theme-settings.html` - Standalone settings UI example

---

## 🎨 Color Specifications

| Theme | Color Code | RGB | Visual |
|-------|-----------|-----|--------|
| Red (赤) | #8b0000 | 139, 0, 0 | Deep red with white snow |
| Teal (深緑青) | #008080 | 0, 128, 128 | Ocean teal |
| Black (黒) | #000000 | 0, 0, 0 | Pure black |
| White (白) | #ffffff | 255, 255, 255 | Clean white |

---

## ❓ Troubleshooting

**Theme not changing?**
1. Check browser console for errors (F12)
2. Verify theme name is exactly: `'red'`, `'teal'`, `'black'`, or `'white'`
3. Clear browser cache and reload

**Snow not showing?**
1. Ensure CSS file loaded: Check Network tab (F12)
2. Check if custom CSS is loaded: Look for `dark-shadow-custom.css` in Network tab
3. Verify JavaScript is enabled

**Settings not persisting?**
1. Check if localStorage is enabled
2. Try: `localStorage.getItem('darkShadowTheme')`
3. Check browser privacy/incognito mode restrictions

---

**Dark Shadow v1.0** - 暗影  
Enjoy the dark, snowy aesthetic! ❄️
