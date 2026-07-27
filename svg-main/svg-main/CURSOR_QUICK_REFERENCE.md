# 🎯 Dark Shadow - Cursor Circle Quick Reference

## What's New? 🎉

Your **Dark Shadow** app now has a **custom cursor circle** that follows your mouse!

---

## Quick Start

### 🎨 Change Cursor Color Instantly

Open browser console (**F12** → Console) and type:

```javascript
// Black cursor
window.setCursorColor('black');

// White cursor  
window.setCursorColor('white');

// Red cursor
window.setCursorColor('red');

// Gray cursor
window.setCursorColor('gray');

// Teal cursor
window.setCursorColor('teal');
```

---

## Features 🌟

| Feature | Details |
|---------|---------|
| **5 Colors** | Black, White, Red, Gray, Teal |
| **Smooth Animation** | Follows mouse perfectly |
| **Trail Effect** | Fading circles behind cursor |
| **Click Feedback** | Cursor scales when clicking |
| **Persistent** | Saves your preference |
| **Glow Effects** | Color-specific shadows |

---

## Usage Methods

### Method 1️⃣: Console (Instant)
```javascript
window.setCursorColor('red');
```

### Method 2️⃣: Settings Panel
- Click **⚙️ Settings** button
- Select cursor color from "🎯 Cursor Circle" section

### Method 3️⃣: Code
```javascript
const CursorCircle = window.CursorCircle;
CursorCircle.setColor('teal');
```

---

## Color Options

🎨 **Available Cursor Colors:**

| Color | Code | Best With | Command |
|-------|------|-----------|---------|
| ⚫ Black | `'black'` | Light backgrounds | `setCursorColor('black')` |
| ⚪ White | `'white'` | Dark backgrounds | `setCursorColor('white')` |
| 🔴 Red | `'red'` | High contrast | `setCursorColor('red')` |
| ⚪ Gray | `'gray'` | Neutral | `setCursorColor('gray')` |
| 🔵 Teal | `'teal'` | Dark themes | `setCursorColor('teal')` |

---

## Recommended Combinations 🎨

### With Background Themes:

| Background | Cursor | Effect |
|-----------|--------|--------|
| 🔴 Red | ⚪ White | High contrast, dramatic |
| 🔵 Teal | ⚪ White | Elegant, modern |
| ⚫ Black | 🔴 Red | Bold, striking |
| ⚪ White | 🔵 Teal | Cool, fresh |
| ⚪ White | ⚫ Black | Classic |

---

## Console Cheat Sheet 📋

```javascript
// Get current cursor color
window.CursorCircle.getColor();

// Get all available colors
window.CursorCircle.getColors();

// Toggle cursor on/off
window.CursorCircle.toggle(true);   // Enable
window.CursorCircle.toggle(false);  // Disable

// Access color info
window.CursorCircle.colors;
```

---

## Settings Panel

**Location:** Bottom right corner (⚙️ Settings button)

**Sections:**
- 🌈 Background Theme (Red, Teal, Black, White)
- 🎯 Cursor Circle (Black, White, Red, Gray, Teal)

**Tips:**
- Click outside to close
- Settings auto-save to browser
- Both persist across page refreshes

---

## File Structure

```
svg-main/
├── assets/
│   ├── cursor-circle.css       # Cursor styling & animations
│   ├── cursor-circle.js        # Cursor logic
│   ├── dark-shadow-theme.js    # Background themes
│   └── dark-shadow-custom.css  # Snow effect
├── index.html                   # Loads all features
├── CURSOR_GUIDE.md             # Detailed cursor guide
├── THEME_QUICKSTART.md         # Theme guide
└── SETTINGS_PANEL.html         # Settings example
```

---

## Tips & Tricks 💡

✨ **Cool Combinations:**
- Red cursor + Red background + Snow = Intense atmosphere
- White cursor + Black background + Snow = Classic noir
- Teal cursor + Teal background + Snow = Cyberpunk vibe

⚡ **Performance:**
- Cursor circle is optimized for smooth performance
- Trail effect creates visual feedback without lag
- Works on all modern browsers

🎯 **Customization:**
- Cursor color saves automatically
- Change at any time without page reload
- Works with all background themes

---

## Troubleshooting ❓

**Cursor not showing?**
```javascript
// Try resetting
window.setCursorColor('black');

// Check if enabled
window.CursorCircle.toggle(true);
```

**Not following mouse?**
- Reload page (Ctrl+R)
- Check browser console for errors (F12)
- Ensure JavaScript is enabled

**Settings not saving?**
- Clear browser cache
- Check localStorage: `localStorage.getItem('darkShadowCursor')`
- Try incognito mode

---

## Dark Shadow Features Summary 🎭

✅ Red background with falling white snow ❄️
✅ Changeable background colors (Red, Teal, Black, White)
✅ Custom cursor circle (5 colors)
✅ Settings panel with all options
✅ Japanese branding (暗影)
✅ Persistent settings storage
✅ Smooth animations throughout

---

**Dark Shadow v1.0** - 暗影

*Follow the cursor into the shadows* 🎯❄️
