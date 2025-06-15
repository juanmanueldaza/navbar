# Daza Navbar

A lightweight, responsive, and highly customizable navigation component for modern websites. Built with vanilla JavaScript and designed for the daza.ar ecosystem.

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/juanmanueldaza/navbar)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![CDN](https://img.shields.io/badge/CDN-Available-brightgreen.svg)](https://navbar.daza.ar)

## ✨ Features

- 🚀 **Zero Dependencies** - Pure vanilla JavaScript (except Font Awesome for icons)
- 📱 **Fully Responsive** - Adapts seamlessly to mobile, tablet, and desktop
- 🎨 **Highly Customizable** - CSS custom properties and flexible configuration
- ♿ **Accessible** - ARIA labels, keyboard navigation, and focus management
- 🌙 **Theme Support** - Built-in dark/light theme with system preference detection
- 📄 **PDF Integration** - Optional PDF generation capabilities
- 🔧 **Easy Integration** - Drop-in solution for any website or framework
- 🎯 **Event System** - Custom events for tracking and integration
- 💫 **Smooth Animations** - Subtle entrance animations and hover effects

## 🚀 Quick Start

### 1. Include Dependencies

```html
<!-- Font Awesome for icons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<!-- Daza Navbar -->
<link rel="stylesheet" href="https://navbar.daza.ar/navbar.css">
<script src="https://navbar.daza.ar/config/navbar-config.js"></script>
<script src="https://navbar.daza.ar/navbar.js"></script>
```

### 2. Add HTML Container

```html
<div id="navbar-container"></div>
```

### 3. Auto-Initialize (Recommended)

The navbar automatically initializes when the page loads. No additional JavaScript required!

### 4. Manual Initialization (Optional)

```javascript
const navbar = new DazaNavbar({
  showPdfButton: true,
  pdfCallback: () => console.log('PDF clicked!')
});
navbar.render();
```

## 📦 Installation

### CDN (Recommended)

```html
<link rel="stylesheet" href="https://navbar.daza.ar/navbar.css">
<script src="https://navbar.daza.ar/config/navbar-config.js"></script>
<script src="https://navbar.daza.ar/navbar.js"></script>
```

### Download Files

Download the files directly from this repository:

- `navbar.css` - Main stylesheet
- `navbar.js` - JavaScript functionality
- `config/navbar-config.js` - Configuration file

### Local Development

```bash
git clone https://github.com/juanmanueldaza/navbar.git
cd navbar
# Serve files locally or integrate into your project
```

## 🎯 Usage Examples

### Basic Usage

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="stylesheet" href="https://navbar.daza.ar/navbar.css">
</head>
<body>
  <div id="navbar-container"></div>
  
  <script src="https://navbar.daza.ar/config/navbar-config.js"></script>
  <script src="https://navbar.daza.ar/navbar.js"></script>
</body>
</html>
```

### With PDF Functionality

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="stylesheet" href="https://navbar.daza.ar/navbar.css">
  
  <!-- PDF generation libraries -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
</head>
<body>
  <div id="navbar-container"></div>
  
  <script src="https://navbar.daza.ar/config/navbar-config.js"></script>
  <script src="https://navbar.daza.ar/navbar.js"></script>
  
  <script>
    const navbar = new DazaNavbar({
      showPdfButton: true,
      pdfCallback: () => {
        // Your PDF generation logic
        generatePDF();
      }
    });
    navbar.render();
  </script>
</body>
</html>
```

### Custom Configuration

```javascript
const customNavbar = new DazaNavbar({
  contacts: [
    {
      href: "mailto:custom@email.com",
      icon: "fa-solid fa-envelope",
      label: "Email",
      title: "Send Email"
    },
    {
      href: "https://custom-website.com",
      icon: "fa-solid fa-globe",
      label: "Website",
      title: "Visit Website",
      target: "_blank"
    }
  ],
  settings: {
    showPdfButton: false,
    transparentMode: true,
    animateEntrance: true
  }
});

customNavbar.render('my-navbar-container');
```

## ⚙️ Configuration

### Default Configuration

The navbar comes with a default configuration in `config/navbar-config.js`:

```javascript
window.NavbarConfig = {
  contacts: [
    {
      href: "mailto:juanmanueldaza@gmail.com",
      icon: "fa-solid fa-envelope",
      label: "Email",
      title: "Email: juanmanueldaza@gmail.com",
      type: "email"
    },
    // ... more contacts
  ],
  settings: {
    showPdfButton: false,
    stickyPosition: true,
    animateEntrance: true,
    transparentMode: false,
    fixedPosition: false
  }
};
```

### Contact Object Properties

| Property | Type | Description |
|----------|------|-------------|
| `href` | string | Link URL or mailto |
| `icon` | string | Font Awesome icon class |
| `label` | string | Accessibility label |
| `title` | string | Tooltip text |
| `target` | string | Link target (optional) |
| `rel` | string | Link relationship (optional) |
| `type` | string | Contact type for filtering |

### Settings Options

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `showPdfButton` | boolean | `false` | Show PDF download button |
| `stickyPosition` | boolean | `true` | Sticky positioning |
| `animateEntrance` | boolean | `true` | Entrance animation |
| `transparentMode` | boolean | `false` | Transparent background |
| `fixedPosition` | boolean | `false` | Fixed positioning |

## 🎨 Customization

### CSS Custom Properties

Override these CSS variables to customize the appearance:

```css
:root {
  /* Background and borders */
  --navbar-window-bg: #1a1a1a;
  --navbar-window-border: #333;
  
  /* Links */
  --navbar-link: #4a9eff;
  --navbar-link-hover: #66b3ff;
  
  /* Buttons */
  --navbar-button-bg: #2d2d2d;
  --navbar-button-fg: #e0e0e0;
  --navbar-button-border: #555;
  --navbar-button-hover-bg: #3d3d3d;
  --navbar-button-hover-fg: #ffffff;
}
```

### Theme Integration

The navbar respects your existing CSS variables:

```css
:root {
  --window-bg: #1a1a1a;      /* Used by navbar */
  --window-border: #333;     /* Used by navbar */
  --link: #4a9eff;          /* Used by navbar */
  --link-hover: #66b3ff;    /* Used by navbar */
  /* ... your other variables */
}
```

## 📡 API Reference

### Class: DazaNavbar

#### Constructor

```javascript
new DazaNavbar(options = {})
```

#### Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `render()` | `containerId` | Render navbar to container |
| `destroy()` | - | Remove navbar from DOM |
| `updateContacts()` | `contacts[]` | Update contact links |
| `togglePdfButton()` | `show` | Show/hide PDF button |
| `updateConfig()` | `config` | Update configuration |
| `getConfig()` | - | Get current configuration |

#### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `navbar:rendered` | `{navbar}` | Navbar rendered |
| `navbar:destroyed` | `{navbar}` | Navbar destroyed |
| `navbar:contact-clicked` | `{navbar, contact}` | Contact link clicked |
| `navbar:pdf-clicked` | `{navbar}` | PDF button clicked |
| `navbar:config-updated` | `{navbar}` | Configuration updated |

### Event Handling

```javascript
document.addEventListener('navbar:rendered', (e) => {
  console.log('Navbar rendered:', e.detail.navbar);
});

document.addEventListener('navbar:contact-clicked', (e) => {
  console.log('Contact clicked:', e.detail.contact);
});
```

## 🌐 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| > 768px | Full horizontal layout |
| 600px - 768px | Tablet layout |
| < 600px | Mobile stacked layout |
| < 480px | Compact mobile layout |

## 🔧 Development

### Local Development

1. Clone the repository
2. Serve files with a local server
3. Open examples in your browser

### File Structure

```
navbar-repo/
├── navbar.css              # Main stylesheet
├── navbar.js               # JavaScript functionality
├── index.html              # Demo page
├── config/
│   └── navbar-config.js    # Configuration
├── examples/
│   ├── basic.html          # Basic usage example
│   └── with-pdf.html       # PDF functionality example
└── README.md              # This file
```

### Building for Production

The navbar is designed to work directly without a build step. Simply include the files in your project or reference them via CDN.

## 🚀 Deployment

### GitHub Pages Setup

This navbar is hosted on GitHub Pages at `https://navbar.daza.ar`. To deploy your own version:

1. Fork this repository
2. Enable GitHub Pages in Settings
3. Set up a custom domain (optional)
4. Add CNAME file with your domain

### Custom Domain Setup

1. Add CNAME file: `echo "navbar.yourdomain.com" > CNAME`
2. Configure DNS A records to point to GitHub Pages IPs
3. Enable HTTPS in repository settings

## 📋 Examples

- **[Basic Usage](examples/basic.html)** - Simple navbar implementation
- **[With PDF](examples/with-pdf.html)** - PDF generation functionality
- **[Live Demo](https://navbar.daza.ar)** - Interactive demo with all features

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Keep code simple and readable
- Maintain backward compatibility
- Update documentation for new features
- Test across different browsers
- Follow the existing code style

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Juan Manuel Daza**

- Website: [daza.ar](https://daza.ar)
- GitHub: [@juanmanueldaza](https://github.com/juanmanueldaza)
- LinkedIn: [juanmanueldaza](https://www.linkedin.com/in/juanmanueldaza)
- Email: juanmanueldaza@gmail.com

## 🙏 Acknowledgments

- Font Awesome for the icon library
- jsPDF and html2canvas for PDF generation capabilities
- The open-source community for inspiration and feedback

## 📊 Statistics

- **Size**: ~12KB minified (CSS + JS)
- **Dependencies**: Font Awesome (icons only)
- **Load Time**: < 50ms on modern connections
- **Performance**: Lighthouse score 100/100

---

<div align="center">
  <p>Made with ❤️ by <a href="https://daza.ar">Juan Manuel Daza</a></p>
  <p>
    <a href="https://navbar.daza.ar">Live Demo</a> •
    <a href="https://github.com/juanmanueldaza/navbar/issues">Report Bug</a> •
    <a href="https://github.com/juanmanueldaza/navbar/issues">Request Feature</a>
  </p>
</div>