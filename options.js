// Options sayfası script

/**
 * Dil çevirisi - Tarayıcı dili 'tr' ise Türkçe, değilse İngilizce döndürür.
 */
function t(en, tr) { return navigator.language.startsWith('tr') ? tr : en; }

// DOM yüklendiğinde çalışır
window.addEventListener('DOMContentLoaded', () => {
  // Çeviri haritası
  const map = {
    hdrSettings:   ['Extension Settings','Uzantı Ayarları'],
    lblDomains:    ['Domains (space-separated)','Alan Adları (boşlukla ayır)'],
    // HTML içeren çeviri
    lblDomainInfo: [
        'To add all Google search domains, you can copy the list from <a href="https://www.google.com/supported_domains" target="_blank" rel="noopener noreferrer">google.com/supported_domains</a> and paste it here (space-separated), or select the ones you need. Please note: This list might change, so it\'s recommended to add domains manually.',
        'Tüm Google arama alan adlarını eklemek için <a href="https://www.google.com/supported_domains" target="_blank" rel="noopener noreferrer">google.com/supported_domains</a> adresindeki listeyi kopyalayıp buraya yapıştırabilir (boşlukla ayrılmış olarak) veya istediklerinizi seçebilirsiniz. Lütfen dikkat: Bu liste zamanla değişebilir, bu nedenle alan adlarını kendiniz eklemeniz önerilir.'
    ],
    lblResultsOpt: ['Results per page','Sayfa başına sonuç'],
    lblEnableOpt:  ['Enabled','Etkin'],
    btnSave:       ['Save','Kaydet']
  };

  // Çevirileri uygula
  Object.entries(map).forEach(([key, [enText, trText]]) => {
    const el = document.querySelector(`[data-i18n='${key}']`);
    if (el) {
      el.innerHTML = t(enText, trText);
    } else {
      console.warn(`Element with data-i18n='${key}' not found.`);
    }
  });

  // Etkileşimli elementleri tanımla
  const domainsInput = document.getElementById('domains');
  const resultInput  = document.getElementById('resultCount');
  const enabledInput = document.getElementById('enabled');
  const saveBtn      = document.getElementById('saveBtn');
  const saveStatusDiv = document.getElementById('saveStatus');

  // Ayarları yükle
  chrome.storage.sync.get(
    { domains: ['google.com','google.com.tr'], resultCount: 100, enabled: true },
    prefs => {
      domainsInput.value   = prefs.domains.join(' ');
      resultInput.value    = prefs.resultCount > 100 ? 100 : prefs.resultCount;
      enabledInput.checked = prefs.enabled;
    }
  );

  // Kaydet butonuna tıklandığında
  saveBtn.addEventListener('click', () => {
    // Form değerlerini oku
    const domains = domainsInput.value.trim().split(/\s+/).filter(Boolean);
    // Sonuç sayısını sınırla (maksimum 100)
    let count = parseInt(resultInput.value, 10) || 100;
    count = Math.min(count, 100);
    resultInput.value = count;
    const enabled = enabledInput.checked;

    // Ayarları kaydet
    chrome.storage.sync.set(
      { domains, resultCount: count, enabled },
      () => {
        // Başarı mesajı göster
        const successMessage = t('Settings saved!', 'Ayarlar kaydedildi!');
        saveStatusDiv.textContent = successMessage;
        saveStatusDiv.style.display = 'block';

        // 3 saniye sonra mesajı gizle
        setTimeout(() => {
          saveStatusDiv.style.display = 'none';
        }, 3000);
      }
    );
  });
});
