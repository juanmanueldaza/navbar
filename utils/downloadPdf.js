import html2canvas from 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm';
import jspdf from 'https://cdn.jsdelivr.net/npm/jspdf@2.5.1/+esm';

/**
 * Download PDF Utility (ES Module)
 * Converts DOM elements to PDF using html2canvas and jsPDF
 */

export class DownloadPdfUtil {
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

      // Create PDF (use ESM constructor directly)
      const pdf = new jspdf({
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

// Named export for ES module consumers
export default { DownloadPdfUtil };
