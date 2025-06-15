/**
 * Daza Navbar Configuration
 * Contains contact information and navbar settings
 */

window.NavbarConfig = {
  // Contact information
  contacts: [
    {
      href: "mailto:juanmanueldaza@gmail.com",
      icon: "fa-solid fa-envelope",
      label: "Email",
      title: "Email: juanmanueldaza@gmail.com",
      type: "email"
    },
    {
      href: "https://www.linkedin.com/in/juanmanueldaza",
      icon: "fa-brands fa-linkedin",
      label: "LinkedIn", 
      title: "LinkedIn Profile",
      target: "_blank",
      rel: "noopener",
      type: "social"
    },
    {
      href: "https://github.com/juanmanueldaza",
      icon: "fa-brands fa-github",
      label: "GitHub",
      title: "GitHub Profile",
      target: "_blank", 
      rel: "noopener",
      type: "social"
    },
    {
      href: "https://gitlab.com/juanmanueldaza",
      icon: "fa-brands fa-gitlab",
      label: "GitLab",
      title: "GitLab Profile", 
      target: "_blank",
      rel: "noopener",
      type: "social"
    },
    {
      href: "https://daza.ar/",
      icon: "fa-solid fa-globe",
      label: "Website",
      title: "Visit daza.ar",
      target: "_blank",
      rel: "noopener", 
      type: "website"
    }
  ],

  // Default navbar settings
  settings: {
    showPdfButton: false,
    stickyPosition: true,
    animateEntrance: true,
    transparentMode: false,
    fixedPosition: false
  },

  // PDF button configuration
  pdfButton: {
    text: "PDF",
    icon: "fa-solid fa-arrow-down",
    ariaLabel: "Download PDF",
    title: "Download PDF"
  },

  // Theme configuration
  theme: {
    respectSystemPreference: true,
    defaultTheme: "dark" // or "light"
  },

  // Analytics/tracking (optional)
  tracking: {
    enabled: false,
    trackClicks: false,
    trackHovers: false
  },

  // Version info
  version: "1.0.0",
  lastUpdated: "2024-12-19"
};

// Expose a method to update configuration
window.NavbarConfig.update = function(newConfig) {
  Object.assign(this, newConfig);
};

// Expose a method to get specific contact by type
window.NavbarConfig.getContactByType = function(type) {
  return this.contacts.filter(contact => contact.type === type);
};

// Expose a method to get contact by label
window.NavbarConfig.getContact = function(label) {
  return this.contacts.find(contact => contact.label.toLowerCase() === label.toLowerCase());
};