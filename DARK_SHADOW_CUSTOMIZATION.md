# Dark Shadow - Customization Summary

## ✅ Changes Made

### 1. **App Branding**
- ✅ App name changed to "Dark Shadow" (英語: Dark Shadow / 日本語: 暗影)
- ✅ Title tag updated: `<title>Dark Shadow - 暗影</title>`
- ✅ Favicon/Logo set to custom dark-shadow-logo.png

### 2. **Background & Snow Effect**
- ✅ **Red background** with falling white snowflake animation (❄)
- ✅ Snowflakes continuously fall from top to bottom
- ✅ Smooth animation with varying speeds and delays
- ✅ 15 snowflakes visible at any time for immersive effect

### 3. **Theme Color Settings**
Available colors that can be changed via `changeThemeColor()`:
- 🔴 **Red (赤)** - Deep red with gradient (#8b0000)
- 🔵 **Teal (深緑青)** - Ocean teal (#008080)
- ⚫ **Black (黒)** - Pure black (#000000)
- ⚪ **White (白)** - Clean white (#ffffff)

### 4. **Configuration Files Created**

#### `dark-shadow-custom.css`
- Snow animation keyframes and styling
- Theme color CSS variables
- Snowflake appearance and animations

#### `dark-shadow-theme.js`
- Theme manager module
- Persistent storage (localStorage) for theme preference
- Snow generation and management
- Global functions:
  - `window.changeThemeColor(color)` - Change background color
  - `window.getCurrentTheme()` - Get current theme
  - `window.getAvailableThemes()` - List all themes

#### `config.json`
- App configuration with Japanese branding
- Theme definitions
- Feature flags

#### `theme-settings.html`
- Settings UI panel with color buttons
- Japanese labels for each theme
- Easily integrated into settings page

### 5. **File Updates**
- `index.html` - Updated with theme CSS and JavaScript
- `index.svg` - Updated with theme CSS and JavaScript  
- `logo.svg` - Updated with theme CSS and JavaScript

## 🎨 How to Use

### Change Theme Programmatically:
```javascript
window.changeThemeColor('red');      // Red theme
window.changeThemeColor('teal');     // Teal theme
window.changeThemeColor('black');    // Black theme
window.changeThemeColor('white');    // White theme
```

### Get Current Theme:
```javascript
const currentTheme = window.getCurrentTheme();
console.log(currentTheme); // 'red', 'teal', 'black', or 'white'
```

### List Available Themes:
```javascript
const themes = window.getAvailableThemes();
themes.forEach(theme => console.log(theme.id, theme.name));
```

## 📝 Japanese Text Integration

The app now uses Japanese characters for branding:
- **App Name**: 暗影 (An'ei / Dark Shadow)
- **Settings Labels**: 
  - 赤 (aka) - Red
  - 深緑青 (fukai-ryoku-ao) - Teal
  - 黒 (kuro) - Black
  - 白 (shiro) - White

## 🎯 Features

✨ **Immersive Visual Experience**
- Continuous falling snow animation
- Color themes persist across sessions (localStorage)
- Smooth transitions between colors

🎨 **Customizable Design**
- 4 distinct color themes
- Japanese branding throughout
- Settings accessible globally

💾 **Persistent State**
- Theme preference saved locally
- Auto-loads on page refresh

## 🚀 Integration Notes

The theme system works independently and doesn't require modifications to existing app code. Simply include the CSS and JavaScript files, and all functionality is available globally.

---

**Dark Shadow v1.0** - Created with ❄ and 暗影
