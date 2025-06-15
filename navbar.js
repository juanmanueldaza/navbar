/**
 * Daza Navbar - Main JavaScript functionality
 * A reusable navbar component for daza.ar sites
 * 
 * @version 1.0.0
 * @author Juan Manuel Daza
 */

class DazaNavbar {
  constructor(options = {}) {
    // Merge default config with provided options
    this.config = this.mergeConfig(window.NavbarConfig || {}, options);
    this.container = null;
    this.navElement = null;
    this.initialized = false;
    
    // Bind methods to preserve context
    this.render = this.render.bind(this);
    this.destroy = this.destroy.bind(this);
    this.updateContacts = this.updateContacts.bind(this);
  }

  /**
   * Merge configuration objects deeply
   */
  mergeConfig(defaultConfig, customConfig) {
    const merged = { ...defaultConfig };
    
    // Merge contacts if provided
    if (customConfig.contacts) {
      merged.contacts = customConfig.contacts;
    }
    
    // Merge settings
    if (customConfig.settings) {
      merged.settings = { ...defaultConfig.settings, ...customConfig.settings };
    }
    
    // Handle direct options for backward compatibility
    if (customConfig.showPdfButton !== undefined) {
      merged.settings = merged.settings || {};
      merged.settings.showPdfButton = customConfig.showPdfButton;
    }
    
    // Store PDF callback
    if (customConfig.pdfCallback) {
      merged.pdfCallback = customConfig.pdfCallback;
    }
    
    return merged;
  }

  /**
   * Render the navbar into the specified container
   */
  render(containerId = 'navbar-container') {
    try {
      // Find container element
      this.container = typeof containerId === 'string' 
        ? document.getElementById(containerId) 
        : containerId;
        
      if (!this.container) {
        console.error(`DazaNavbar: Container with id '${containerId}' not found`);
        return false;
      }

      // Clear existing content
      this.container.innerHTML = '';

      // Create main nav element
      this.navElement = document.createElement('nav');
      this.navElement.className = 'header-nav';
      
      // Apply additional classes based on settings
      this.applyNavbarSettings();

      // Create contacts section
      this.createContactsSection();

      // Create PDF button if enabled
      if (this.config.settings?.showPdfButton) {
        this.createPdfButton();
      }

      // Append to container
      this.container.appendChild(this.navElement);
      
      // Add entrance animation if enabled
      if (this.config.settings?.animateEntrance) {
        this.navElement.style.animation = 'navbar-slide-in 0.3s ease-out';
      }

      this.initialized = true;
      this.fireEvent('navbar:rendered');
      
      return true;
    } catch (error) {
      console.error('DazaNavbar: Error rendering navbar:', error);
      return false;
    }
  }

  /**
   * Apply navbar settings as CSS classes
   */
  applyNavbarSettings() {
    const settings = this.config.settings || {};
    
    if (settings.transparentMode) {
      this.navElement.classList.add('navbar-transparent');
    }
    
    if (settings.fixedPosition) {
      this.navElement.classList.add('navbar-fixed');
    }
  }

  /**
   * Create the contacts section
   */
  createContactsSection() {
    const contactsDiv = document.createElement('div');
    contactsDiv.className = 'contacts';

    if (!this.config.contacts || !Array.isArray(this.config.contacts)) {
      console.warn('DazaNavbar: No contacts configuration found');
      return;
    }

    this.config.contacts.forEach(contact => {
      const link = this.createContactLink(contact);
      if (link) {
        contactsDiv.appendChild(link);
      }
    });

    this.navElement.appendChild(contactsDiv);
  }

  /**
   * Create a single contact link
   */
  createContactLink(contact) {
    if (!contact.href || !contact.icon) {
      console.warn('DazaNavbar: Invalid contact configuration:', contact);
      return null;
    }

    const link = document.createElement('a');
    link.href = contact.href;
    link.setAttribute('aria-label', contact.label || 'Contact');
    link.setAttribute('title', contact.title || contact.label || 'Contact');
    
    if (contact.target) {
      link.target = contact.target;
    }
    
    if (contact.rel) {
      link.rel = contact.rel;
    }

    // Create icon element
    const icon = document.createElement('i');
    icon.className = contact.icon;
    link.appendChild(icon);

    // Add click tracking if enabled
    if (this.config.tracking?.trackClicks) {
      link.addEventListener('click', () => {
        this.fireEvent('navbar:contact-clicked', { contact });
      });
    }

    // Add hover tracking if enabled
    if (this.config.tracking?.trackHovers) {
      link.addEventListener('mouseenter', () => {
        this.fireEvent('navbar:contact-hovered', { contact });
      });
    }

    return link;
  }

  /**
   * Create the PDF download button
   */
  createPdfButton() {
    const pdfBtn = document.createElement('button');
    pdfBtn.id = 'download-pdf';
    pdfBtn.className = 'pdf-btn';
    
    const pdfConfig = this.config.pdfButton || {};
    pdfBtn.setAttribute('aria-label', pdfConfig.ariaLabel || 'Download PDF');
    pdfBtn.setAttribute('title', pdfConfig.title || 'Download PDF');

    // Create button content
    const span = document.createElement('span');
    span.style.fontWeight = '600';
    span.style.letterSpacing = '1px';
    span.style.marginRight = '8px';
    span.textContent = pdfConfig.text || 'PDF';

    const icon = document.createElement('i');
    icon.className = pdfConfig.icon || 'fa-solid fa-arrow-down';

    pdfBtn.appendChild(span);
    pdfBtn.appendChild(icon);

    // Add click handler
    if (this.config.pdfCallback && typeof this.config.pdfCallback === 'function') {
      pdfBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.config.pdfCallback();
        this.fireEvent('navbar:pdf-clicked');
      });
    } else {
      console.warn('DazaNavbar: PDF button enabled but no callback provided');
    }

    this.navElement.appendChild(pdfBtn);
  }

  /**
   * Update contacts dynamically
   */
  updateContacts(newContacts) {
    this.config.contacts = newContacts;
    if (this.initialized) {
      const contactsDiv = this.navElement.querySelector('.contacts');
      if (contactsDiv) {
        contactsDiv.innerHTML = '';
        newContacts.forEach(contact => {
          const link = this.createContactLink(contact);
          if (link) {
            contactsDiv.appendChild(link);
          }
        });
      }
    }
    this.fireEvent('navbar:contacts-updated');
  }

  /**
   * Toggle PDF button visibility
   */
  togglePdfButton(show) {
    this.config.settings = this.config.settings || {};
    this.config.settings.showPdfButton = show;
    
    if (this.initialized) {
      const existingBtn = this.navElement.querySelector('.pdf-btn');
      if (show && !existingBtn) {
        this.createPdfButton();
      } else if (!show && existingBtn) {
        existingBtn.remove();
      }
    }
    
    this.fireEvent('navbar:pdf-button-toggled', { visible: show });
  }

  /**
   * Destroy the navbar
   */
  destroy() {
    if (this.container && this.navElement) {
      this.container.removeChild(this.navElement);
    }
    this.container = null;
    this.navElement = null;
    this.initialized = false;
    this.fireEvent('navbar:destroyed');
  }

  /**
   * Fire custom events
   */
  fireEvent(eventName, detail = {}) {
    if (typeof window !== 'undefined' && window.CustomEvent) {
      const event = new CustomEvent(eventName, {
        detail: { navbar: this, ...detail }
      });
      document.dispatchEvent(event);
    }
  }

  /**
   * Get current configuration
   */
  getConfig() {
    return { ...this.config };
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig) {
    this.config = this.mergeConfig(this.config, newConfig);
    this.fireEvent('navbar:config-updated');
  }
}

/**
 * Auto-initialization when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  // Auto-initialize if navbar container exists and config is available
  if (window.NavbarConfig && document.getElementById('navbar-container')) {
    try {
      const navbar = new DazaNavbar();
      const success = navbar.render();
      
      if (success) {
        // Store reference globally for easy access
        window.DazaNavbarInstance = navbar;
        console.log('DazaNavbar: Auto-initialized successfully');
      }
    } catch (error) {
      console.error('DazaNavbar: Auto-initialization failed:', error);
    }
  }
});

/**
 * Utility function for quick initialization
 */
window.initDazaNavbar = function(options = {}) {
  const navbar = new DazaNavbar(options);
  const success = navbar.render(options.container || 'navbar-container');
  
  if (success) {
    window.DazaNavbarInstance = navbar;
    return navbar;
  }
  
  return null;
};

/**
 * Export for module systems
 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DazaNavbar;
}

// AMD support
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return DazaNavbar;
  });
}

// Expose to global scope
window.DazaNavbar = DazaNavbar;