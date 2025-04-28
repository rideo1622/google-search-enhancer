// Options page script: localization, loading, and saving settings.

/**
 * Simple translation function. Returns Turkish if browser language starts with 'tr', otherwise English.
 * @param {string} en English text.
 * @param {string} tr Turkish text.
 * @returns {string} Translated text.
 */
function t(en, tr) { return navigator.language.startsWith('tr') ? tr : en; }

// Run when the options page's DOM is fully loaded.
window.addEventListener('DOMContentLoaded', () => {
  // Translation map for elements with data-i18n attributes.
  const map = {
    hdrSettings:   ['Extension Settings','Uzantı Ayarları'],
    lblDomains:    ['Domains (space-separated)','Alan Adları (boşlukla ayır)'],
    // Note: HTML is included here for the link, so innerHTML will be used later.
    lblDomainInfo: [
        'To add all Google search domains, you can copy the list from <a href="https://www.google.com/supported_domains" target="_blank" rel="noopener noreferrer">google.com/supported_domains</a> and paste it here (space-separated), or select the ones you need. Please note: This list might change, so it\'s recommended to add domains manually.',
        'Tüm Google arama alan adlarını eklemek için <a href="https://www.google.com/supported_domains" target="_blank" rel="noopener noreferrer">google.com/supported_domains</a> adresindeki listeyi kopyalayıp buraya yapıştırabilir (boşlukla ayrılmış olarak) veya istediklerinizi seçebilirsiniz. Lütfen dikkat: Bu liste zamanla değişebilir, bu nedenle alan adlarını kendiniz eklemeniz önerilir.'
    ],
    lblResultsOpt: ['Results per page','Sayfa başına sonuç'],
    lblEnableOpt:  ['Enabled','Etkin'],
    btnSave:       ['Save','Kaydet']
  };

  // Apply translations to elements based on the map.
  Object.entries(map).forEach(([key, [enText, trText]]) => {
    const el = document.querySelector(`[data-i18n='${key}']`);
    if (el) {
      // Use innerHTML because lblDomainInfo contains an <a> tag.
      el.innerHTML = t(enText, trText);
    } else {
      console.warn(`Element with data-i18n='${key}' not found.`);
    }
  });

  // Get references to the interactive elements on the options page.
  const domainsInput = document.getElementById('domains');
  const resultInput  = document.getElementById('resultCount');
  const enabledInput = document.getElementById('enabled');
  const saveBtn      = document.getElementById('saveBtn');
  const saveStatusDiv = document.getElementById('saveStatus'); // Div to show save confirmation

  // Load existing settings from chrome.storage.sync when the options page loads.
  // Provide default values.
  chrome.storage.sync.get(
    { domains: ['google.com','google.com.tr'], resultCount: 100, enabled: true },
    prefs => {
      // Populate the form fields with the loaded settings.
      // Join the domains array with spaces for the input field.
      domainsInput.value   = prefs.domains.join(' ');
      resultInput.value    = prefs.resultCount;
      enabledInput.checked = prefs.enabled;
    }
  );

  // --- Event Listener for Saving Settings ---

  // Save all settings when the 'Save' button is clicked.
  saveBtn.addEventListener('click', () => {
    // Read values from the form fields.
    // Split the domains string by spaces, trim whitespace, and filter out empty strings.
    const domains = domainsInput.value.trim().split(/\s+/).filter(Boolean);
    // Parse the result count, defaulting to 100 if invalid.
    const count   = parseInt(resultInput.value, 10) || 100;
    const enabled = enabledInput.checked;

    // Save the settings object to chrome.storage.sync.
    chrome.storage.sync.set(
      { domains, resultCount: count, enabled },
      () => {
        // Callback function executed after saving is complete.
        // Display a temporary success message.
        const successMessage = t('Settings saved!', 'Ayarlar kaydedildi!');
        saveStatusDiv.textContent = successMessage;
        saveStatusDiv.style.display = 'block'; // Make the status div visible

        // Hide the message after 3 seconds.
        setTimeout(() => {
          saveStatusDiv.style.display = 'none';
        }, 3000);
      }
    );
  });
});
