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
  render(containerId = "navbar-container") {
    try {
      // Find container element
      this.container =
        typeof containerId === "string"
          ? document.getElementById(containerId)
          : containerId;

      if (!this.container) {
        console.error(
          `DazaNavbar: Container with id '${containerId}' not found`,
        );
        return false;
      }

      // Clear existing content
      this.container.innerHTML = "";

      // Create main nav element
      this.navElement = document.createElement("nav");
      this.navElement.className = "header-nav";

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
        this.navElement.style.animation = "navbar-slide-in 0.3s ease-out";
      }

      this.initialized = true;
      this.fireEvent("navbar:rendered");

      return true;
    } catch (error) {
      console.error("DazaNavbar: Error rendering navbar:", error);
      return false;
    }
  }

  /**
   * Apply navbar settings as CSS classes
   */
  applyNavbarSettings() {
    const settings = this.config.settings || {};

    if (settings.transparentMode) {
      this.navElement.classList.add("navbar-transparent");
    }

    if (settings.fixedPosition) {
      this.navElement.classList.add("navbar-fixed");
    }
  }

  /**
   * Create the contacts section
   */
  createContactsSection() {
    const contactsDiv = document.createElement("div");
    contactsDiv.className = "contacts";

    if (!this.config.contacts || !Array.isArray(this.config.contacts)) {
      console.warn("DazaNavbar: No contacts configuration found");
      return;
    }

    this.config.contacts.forEach((contact) => {
      const link = this.createContactLink(contact);
      if (link) {
        contactsDiv.appendChild(link);
      }
    });

    this.navElement.appendChild(contactsDiv);
  }

  /**
   * Create a single contact link or dropdown
   */
  createContactLink(contact) {
    if (!contact.icon) {
      console.warn("DazaNavbar: Invalid contact configuration:", contact);
      return null;
    }

    // Handle dropdown contacts
    if (contact.type === "dropdown" && contact.dropdown) {
      return this.createDropdownContact(contact);
    }

    // Handle regular contacts
    if (!contact.href) {
      console.warn("DazaNavbar: Invalid contact configuration:", contact);
      return null;
    }

    const link = document.createElement("a");
    link.href = contact.href;
    link.setAttribute("aria-label", contact.label || "Contact");
    link.setAttribute("title", contact.title || contact.label || "Contact");

    if (contact.target) {
      link.target = contact.target;
    }

    if (contact.rel) {
      link.rel = contact.rel;
    }

    // Create icon element
    const icon = document.createElement("i");
    icon.className = contact.icon;
    link.appendChild(icon);

    // Add click tracking if enabled
    if (this.config.tracking?.trackClicks) {
      link.addEventListener("click", () => {
        this.fireEvent("navbar:contact-clicked", { contact });
      });
    }

    // Add hover tracking if enabled
    if (this.config.tracking?.trackHovers) {
      link.addEventListener("mouseenter", () => {
        this.fireEvent("navbar:contact-hovered", { contact });
      });
    }

    return link;
  }

  /**
   * Create a dropdown contact element
   */
  createDropdownContact(contact) {
    const dropdownContainer = document.createElement("div");
    dropdownContainer.className = "dropdown-container";

    // Create the dropdown trigger
    const trigger = document.createElement("button");
    trigger.className = "dropdown-trigger";
    trigger.setAttribute("aria-label", contact.label || "Dropdown");
    trigger.setAttribute("title", contact.title || contact.label || "Dropdown");
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-haspopup", "true");

    // Create trigger icon
    const icon = document.createElement("i");
    icon.className = contact.icon;
    trigger.appendChild(icon);

    // Create dropdown arrow
    const arrow = document.createElement("i");
    arrow.className = "fa-solid fa-chevron-down dropdown-arrow";
    trigger.appendChild(arrow);

    // Create dropdown menu
    const dropdownMenu = document.createElement("div");
    dropdownMenu.className = "dropdown-menu";
    dropdownMenu.setAttribute("role", "menu");

    // Add dropdown items
    contact.dropdown.forEach((item) => {
      const dropdownItem = document.createElement("a");
      dropdownItem.href = item.href;
      dropdownItem.className = "dropdown-item";
      dropdownItem.textContent = item.label;
      dropdownItem.setAttribute("title", item.title || item.label);
      dropdownItem.setAttribute("role", "menuitem");

      if (item.target) {
        dropdownItem.target = item.target;
      }

      if (item.rel) {
        dropdownItem.rel = item.rel;
      }

      // Add click tracking for dropdown items
      if (this.config.tracking?.trackClicks) {
        dropdownItem.addEventListener("click", () => {
          this.fireEvent("navbar:dropdown-item-clicked", { contact, item });
        });
      }

      dropdownMenu.appendChild(dropdownItem);
    });

    // Add event listeners for dropdown functionality
    this.setupDropdownEvents(trigger, dropdownMenu, dropdownContainer);

    dropdownContainer.appendChild(trigger);
    dropdownContainer.appendChild(dropdownMenu);

    return dropdownContainer;
  }

  /**
   * Setup dropdown event listeners
   */
  setupDropdownEvents(trigger, dropdownMenu, container) {
    let isOpen = false;

    // Toggle dropdown on trigger click
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      isOpen = !isOpen;
      container.classList.toggle("dropdown-open", isOpen);
      trigger.setAttribute("aria-expanded", isOpen.toString());

      if (isOpen) {
        // Close other dropdowns
        document
          .querySelectorAll(".dropdown-container.dropdown-open")
          .forEach((other) => {
            if (other !== container) {
              other.classList.remove("dropdown-open");
              other
                .querySelector(".dropdown-trigger")
                .setAttribute("aria-expanded", "false");
            }
          });
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!container.contains(e.target) && isOpen) {
        isOpen = false;
        container.classList.remove("dropdown-open");
        trigger.setAttribute("aria-expanded", "false");
      }
    });

    // Close dropdown on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isOpen) {
        isOpen = false;
        container.classList.remove("dropdown-open");
        trigger.setAttribute("aria-expanded", "false");
        trigger.focus();
      }
    });

    // Handle keyboard navigation
    dropdownMenu.addEventListener("keydown", (e) => {
      const items = dropdownMenu.querySelectorAll(".dropdown-item");
      const currentIndex = Array.from(items).indexOf(document.activeElement);

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % items.length;
          items[nextIndex].focus();
          break;
        case "ArrowUp":
          e.preventDefault();
          const prevIndex =
            currentIndex > 0 ? currentIndex - 1 : items.length - 1;
          items[prevIndex].focus();
          break;
        case "Enter":
        case " ":
          if (document.activeElement.classList.contains("dropdown-item")) {
            document.activeElement.click();
          }
          break;
      }
    });
  }

  /**
   * Create the PDF download button
   */
  createPdfButton() {
    const pdfBtn = document.createElement("button");
    pdfBtn.id = "download-pdf";
    pdfBtn.className = "pdf-btn";

    const pdfConfig = this.config.pdfButton || {};
    pdfBtn.setAttribute("aria-label", pdfConfig.ariaLabel || "Download PDF");
    pdfBtn.setAttribute("title", pdfConfig.title || "Download PDF");

    // Create button content
    const span = document.createElement("span");
    span.style.fontWeight = "600";
    span.style.letterSpacing = "1px";
    span.style.marginRight = "8px";
    span.textContent = pdfConfig.text || "PDF";

    const icon = document.createElement("i");
    icon.className = pdfConfig.icon || "fa-solid fa-arrow-down";

    pdfBtn.appendChild(span);
    pdfBtn.appendChild(icon);

    // Add click handler
    if (
      this.config.pdfCallback &&
      typeof this.config.pdfCallback === "function"
    ) {
      pdfBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.config.pdfCallback();
        this.fireEvent("navbar:pdf-clicked");
      });
    } else {
      console.warn("DazaNavbar: PDF button enabled but no callback provided");
    }

    this.navElement.appendChild(pdfBtn);
  }

  /**
   * Update contacts dynamically
   */
  updateContacts(newContacts) {
    this.config.contacts = newContacts;
    if (this.initialized) {
      const contactsDiv = this.navElement.querySelector(".contacts");
      if (contactsDiv) {
        contactsDiv.innerHTML = "";
        newContacts.forEach((contact) => {
          const link = this.createContactLink(contact);
          if (link) {
            contactsDiv.appendChild(link);
          }
        });
      }
    }
    this.fireEvent("navbar:contacts-updated");
  }

  /**
   * Toggle PDF button visibility
   */
  togglePdfButton(show) {
    this.config.settings = this.config.settings || {};
    this.config.settings.showPdfButton = show;

    if (this.initialized) {
      const existingBtn = this.navElement.querySelector(".pdf-btn");
      if (show && !existingBtn) {
        this.createPdfButton();
      } else if (!show && existingBtn) {
        existingBtn.remove();
      }
    }

    this.fireEvent("navbar:pdf-button-toggled", { visible: show });
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
    this.fireEvent("navbar:destroyed");
  }

  /**
   * Fire custom events
   */
  fireEvent(eventName, detail = {}) {
    if (typeof window !== "undefined" && window.CustomEvent) {
      const event = new CustomEvent(eventName, {
        detail: { navbar: this, ...detail },
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
    this.fireEvent("navbar:config-updated");
  }
}

/**
 * Auto-initialization when DOM is ready
 */
document.addEventListener("DOMContentLoaded", () => {
  // Auto-initialize if navbar container exists and config is available
  if (window.NavbarConfig && document.getElementById("navbar-container")) {
    try {
      const navbar = new DazaNavbar();
      const success = navbar.render();

      if (success) {
        // Store reference globally for easy access
        window.DazaNavbarInstance = navbar;
        console.log("DazaNavbar: Auto-initialized successfully");
      }
    } catch (error) {
      console.error("DazaNavbar: Auto-initialization failed:", error);
    }
  }
});

/**
 * Utility function for quick initialization
 */
window.initDazaNavbar = function (options = {}) {
  const navbar = new DazaNavbar(options);
  const success = navbar.render(options.container || "navbar-container");

  if (success) {
    window.DazaNavbarInstance = navbar;
    return navbar;
  }

  return null;
};

/**
 * Export for module systems
 */
if (typeof module !== "undefined" && module.exports) {
  module.exports = DazaNavbar;
}

// AMD support
if (typeof define === "function" && define.amd) {
  define([], function () {
    return DazaNavbar;
  });
}

// Expose to global scope
window.DazaNavbar = DazaNavbar;
