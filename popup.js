// Popup script: safe localization and settings handling

/**
 * Simple translation function. Returns Turkish if browser language starts with 'tr', otherwise English.
 * @param {string} en English text.
 * @param {string} tr Turkish text.
 * @returns {string} Translated text.
 */
function t(en, tr) {
    return navigator.language.startsWith('tr') ? tr : en;
  }
  
  // Run when the popup's DOM is fully loaded.
  window.addEventListener('DOMContentLoaded', () => {
    // Translation map for elements with data-i18n attributes.
    const translations = {
      extName:    ['Google Custom Search Enhancer', 'Google Arama Özelleştirici'],
      lblEnable:  ['Enable Extension', 'Uzantıyı Etkinleştir'],
      lblResults: ['Results per page', 'Sayfa başına sonuç'],
      btnOptions: ['Settings', 'Ayarlar']
    };
  
    // Apply translations to elements based on the map.
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const entry = translations[key];
      if (Array.isArray(entry)) {
        const [enText, trText] = entry;
        el.textContent = t(enText, trText); // Use the t() function for translation
      } else {
        // Warn if a translation key is missing in the map.
        console.warn(`Missing translation for key: ${key}`);
      }
    });
  
    // Get references to the interactive elements in the popup.
    const toggle      = document.getElementById('toggleEnabled');
    const resultInput = document.getElementById('resultCount');
    const btnOptions  = document.getElementById('btnOptions');
  
    // Load current settings from chrome.storage.sync when the popup opens.
    // Provide default values if settings are not found.
    chrome.storage.sync.get({ enabled: true, resultCount: 100 }, prefs => {
      toggle.checked    = prefs.enabled;
      resultInput.value = prefs.resultCount;
    });
  
    // --- Event Listeners to Save Settings ---

    // Save the 'enabled' state whenever the toggle checkbox changes.
    toggle.addEventListener('change', () => {
      chrome.storage.sync.set({ enabled: toggle.checked });
    });
  
    // Save the 'resultCount' whenever the number input value changes.
    resultInput.addEventListener('change', () => {
      const count = parseInt(resultInput.value, 10);
      // Use 100 as default if parsing fails (e.g., empty input).
      chrome.storage.sync.set({ resultCount: isNaN(count) ? 100 : count });
    });
  
    // Open the extension's options page when the 'Settings' button is clicked.
    btnOptions.addEventListener('click', () => {
      chrome.runtime.openOptionsPage();
    });
  });
