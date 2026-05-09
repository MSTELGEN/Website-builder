const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Remove CDN links and the Tailwind config script block
html = html.replace(/<link rel="preconnect"[^>]+>\n?/g, '');
html = html.replace(/<link[^>]+fonts\.googleapis[^>]+>\n?/g, '');
html = html.replace(/<link[^>]+font-awesome[^>]+>\n?/g, '');
html = html.replace(/<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>\n?/, '');
html = html.replace(/<script>\s*tailwind\.config[\s\S]*?<\/script>\n?/, '');

// Add local stylesheet after <meta> viewport tag
html = html.replace(
  '</title>\n    <meta name="description"',
  '</title>\n    <meta name="description"'
);
html = html.replace(
  '<meta name="description"',
  '<link rel="stylesheet" href="styles.css">\n    <meta name="description"'
);

// Add Google Fonts fallback in <style> block — inject at top of custom styles
html = html.replace(
  ':root {',
  `/* System font fallbacks since Google Fonts unavailable */
        .font-serif, h1, h2, h3, h4, .font-serif * { font-family: Georgia, "Times New Roman", serif !important; }
        body { font-family: system-ui, -apple-system, Arial, sans-serif !important; }
        :root {`
);

// Font Awesome icon replacements (icon -> emoji/text/SVG span)
const icons = {
  'fa-bars':          '☰',
  'fa-times':         '✕',
  'fa-chevron-down':  '⌄',
  'fa-arrow-right':   '→',
  'fa-heart':         '♥',
  'fa-shield-alt':    '🛡',
  'fa-home':          '⌂',
  'fa-certificate':   '✦',
  'fa-syringe':       '💉',
  'fa-microscope':    '🔬',
  'fa-comments':      '💬',
  'fa-map-marker-alt':'📍',
  'fa-phone':         '📞',
  'fa-envelope':      '✉',
  'fa-map':           '🗺',
  'fa-info':          'ℹ',
  'fa-paper-plane':   '✉',
  'fa-check-circle':  '✓',
  'fa-check':         '✓',
  'fa-star':          '★',
  'fa-external-link-alt': '↗',
  'fab fa-facebook':  'f',
  'fa-facebook':      'f',
};

// Replace <i class="fas fa-X ..."> with a styled span
html = html.replace(/<i class="([^"]+)"><\/i>/g, (match, cls) => {
  for (const [iconClass, emoji] of Object.entries(icons)) {
    if (cls.includes(iconClass)) {
      const isFb = iconClass.includes('facebook');
      return `<span style="font-style:normal;font-size:.9em;${isFb ? 'font-weight:bold;font-family:serif;' : ''}">${emoji}</span>`;
    }
  }
  return match;
});

// Handle the star rating icons (multiple)
html = html.replace(/<i id="menu-icon" class="([^"]+)"><\/i>/g, (match, cls) => {
  if (cls.includes('bars')) return `<span id="menu-icon" style="font-style:normal">☰</span>`;
  if (cls.includes('times')) return `<span id="menu-icon" style="font-style:normal">✕</span>`;
  return match;
});

// Fix menu icon toggle in JS
html = html.replace(
  "icon.className = isOpen ? 'fas fa-times text-xl' : 'fas fa-bars text-xl';",
  "icon.textContent = isOpen ? '✕' : '☰';"
);

fs.writeFileSync('preview.html', html, 'utf8');
console.log('preview.html created, size:', fs.statSync('preview.html').size);
