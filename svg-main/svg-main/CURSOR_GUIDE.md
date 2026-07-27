# 🎯 Cursor Circle Feature Guide

## Overview

Dark Shadow now includes a custom cursor circle effect that follows your mouse with a smooth animated circle. The cursor can be customized with 5 different colors.

---

## Available Cursor Colors

- **⚫ Black (黒)** - Classic dark circle
- **⚪ White (白)** - Bright white for contrast
- **🔴 Red (赤)** - Vibrant red with glow
- **⚪ Gray (灰色)** - Neutral gray
- **🔵 Teal (深緑青)** - Cool teal with glow

---

## How to Use

### Method 1: Browser Console

Open your browser console (F12) and run:

```javascript
// Change cursor to Black
window.setCursorColor('black');

// Change cursor to White
window.setCursorColor('white');

// Change cursor to Red
window.setCursorColor('red');

// Change cursor to Gray
window.setCursorColor('gray');

// Change cursor to Teal
window.setCursorColor('teal');
```

### Method 2: Settings Panel

Click the **⚙️ Settings** button in the bottom right corner of the page, then select your desired cursor color from the "🎯 Cursor Circle" section.

### Method 3: Programmatically

```javascript
// Get cursor color object
const CursorCircle = window.CursorCircle;

// Set color
CursorCircle.setColor('red');

// Get current color
const current = CursorCircle.getColor();

// Get all available colors
const colors = CursorCircle.getColors();
colors.forEach(c => console.log(c.name));

// Toggle cursor on/off
CursorCircle.toggle(true);  // Enable
CursorCircle.toggle(false); // Disable
```

---

## Features

✨ **Visual Effects**
- Smooth circular cursor with subtle glow
- Trail effect that fades as you move
- Click feedback (cursor scales down on click)
- Color-specific shadows for visibility

🎨 **Customization**
- 5 color options
- Persistent storage (remembers your choice)
- Smooth color transitions

💾 **Persistent Settings**
- Your cursor color preference is saved to localStorage
- Automatically loads on page refresh
- Key: `darkShadowCursor`

---

## Cursor Colors & Visibility

| Color | Best For | Shadow Effect |
|-------|----------|--------------|
| Black | Light/White backgrounds | Subtle white glow |
| White | Dark backgrounds | Inset dark shadow |
| Red | High contrast needs | Red glow effect |
| Gray | Neutral backgrounds | Subtle gray glow |
| Teal | Dark themes | Teal glow effect |

---

## CSS Customization

If you want to customize the cursor size or appearance, you can modify the CSS:

```css
:root {
  --cursor-size: 30px;  /* Default: 30px */
}
```

---

## Files Involved

- `assets/cursor-circle.css` - Cursor styling and animations
- `assets/cursor-circle.js` - Cursor logic and mouse tracking
- `SETTINGS_PANEL.html` - Example settings UI

---

## Tips & Tricks

💡 **Combine with Background Themes**
- Red cursor with Black background = high contrast
- White cursor with Teal background = elegant look
- Teal cursor with Red background = dramatic effect

💡 **Settings Panel**
- Press ⚙️ to toggle settings
- Click outside to close
- Combines theme and cursor settings in one place

---

## Troubleshooting

**Cursor not visible?**
- Check if cursor circle is enabled
- Try changing color in console: `window.setCursorColor('white')`
- Reload page

**Cursor not following mouse?**
- Verify `cursor-circle.js` is loaded (F12 > Network tab)
- Check browser console for errors
- Ensure JavaScript is enabled

**Settings not persisting?**
- Check if localStorage is enabled
- Try: `localStorage.getItem('darkShadowCursor')`
- Clear browser cache and reload

---

**Dark Shadow v1.0** - 暗影  
🎯 Follow the cursor into the shadows ❄️
