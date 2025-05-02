// Popup script: safe localization and settings handling

/**
 * Dil çevirisi - Tarayıcı dili 'tr' ise Türkçe, değilse İngilizce döndürür.
 */
function t(en, tr) {
  return navigator.language.startsWith('tr') ? tr : en;
}

// DOM yüklendiğinde çalışır
window.addEventListener('DOMContentLoaded', () => {
  // Çeviri haritası
  const translations = {
    extName:    ['Google Custom Search Enhancer', 'Google Arama Özelleştirici'],
    lblEnable:  ['Enable Extension', 'Uzantıyı Etkinleştir'],
    lblResults: ['Results per page', 'Sayfa başına sonuç'],
    btnOptions: ['Settings', 'Ayarlar']
  };

  // Çevirileri uygula
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const entry = translations[key];
    if (Array.isArray(entry)) {
      const [enText, trText] = entry;
      el.textContent = t(enText, trText);
    } else {
      console.warn(`Missing translation for key: ${key}`);
    }
  });

  // Etkileşimli elementleri tanımla
  const toggle      = document.getElementById('toggleEnabled');
  const resultInput = document.getElementById('resultCount');
  const btnOptions  = document.getElementById('btnOptions');

  // Ayarları yükle
  chrome.storage.sync.get({ enabled: true, resultCount: 100 }, prefs => {
    toggle.checked    = prefs.enabled;
    resultInput.value = prefs.resultCount > 100 ? 100 : prefs.resultCount;
  });

  // Olay dinleyicileri
  toggle.addEventListener('change', () => {
    chrome.storage.sync.set({ enabled: toggle.checked });
  });

  resultInput.addEventListener('change', () => {
    const count = parseInt(resultInput.value, 10);
    // 100'den büyük değerlerin önüne geç
    let validCount = isNaN(count) ? 100 : count;
    validCount = Math.min(validCount, 100);
    resultInput.value = validCount;
    chrome.storage.sync.set({ resultCount: validCount });
  });

  btnOptions.addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });
});
