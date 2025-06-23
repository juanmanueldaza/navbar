/**
 * Download PDF Utility
 * A reusable utility function for converting DOM elements to PDF using html2canvas and jsPDF
 */

class DownloadPdfUtil {
  constructor(options = {}) {
    this.options = {
      selector: '.terminal-window',
      filename: 'document.pdf',
      scale: 2,
      useCORS: true,
      orientation: 'portrait',
      unit: 'px',
      delay: 100,
      ...options
    };
  }

  /**
   * Download PDF from DOM element
   * @param {Object} customOptions - Override default options for this specific download
   * @returns {Promise<void>}
   */
  async downloadPdf(customOptions = {}) {
    const config = { ...this.options, ...customOptions };

    try {
      // Get the target element
      const element = document.querySelector(config.selector);
      if (!element) {
        throw new Error(`Element with selector "${config.selector}" not found`);
      }

      // Add delay to ensure element is fully rendered
      if (config.delay > 0) {
        await new Promise(resolve => setTimeout(resolve, config.delay));
      }

      // Generate canvas from element
      const canvas = await html2canvas(element, {
        scale: config.scale,
        useCORS: config.useCORS,
        allowTaint: true,
        backgroundColor: null
      });

      // Convert canvas to image data
      const imgData = canvas.toDataURL('image/png');

      // Create PDF
      const pdf = new jspdf.jsPDF({
        orientation: config.orientation,
        unit: config.unit,
        format: [canvas.width, canvas.height]
      });

      // Add image to PDF and save
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(config.filename);

      console.log(`PDF "${config.filename}" downloaded successfully`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  }

  /**
   * Static method for quick PDF download without instantiation
   * @param {Object} options - Configuration options
   * @returns {Promise<void>}
   */
  static async download(options = {}) {
    const util = new DownloadPdfUtil(options);
    return util.downloadPdf();
  }
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
  // CommonJS
  module.exports = DownloadPdfUtil;
} else if (typeof define === 'function' && define.amd) {
  // AMD
  define([], function() {
    return DownloadPdfUtil;
  });
} else {
  // Browser global
  window.DownloadPdfUtil = DownloadPdfUtil;
}

// Convenience function for backward compatibility
window.downloadPdf = function(options = {}) {
  return DownloadPdfUtil.download(options);
};
