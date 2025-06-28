'use strict';
// Popup script: handles localization and settings.
// Popup betiği: yerelleştirme ve ayarları yönetir.

/**
 * Translation helper – returns Turkish if the browser language starts with 'tr', otherwise English.
 * Çeviri yardımcısı – Tarayıcı dili 'tr' ile başlıyorsa Türkçe, aksi takdirde İngilizce döndürür.
 */
function t(en, tr) {
  return navigator.language.startsWith('tr') ? tr : en;
}

// Runs when the DOM is fully loaded
// DOM yüklendiğinde çalışır
window.addEventListener('DOMContentLoaded', () => {
  // Translation map
  // Çeviri haritası
  const translations = {
    extName:    ['Google Custom Search Enhancer', 'Google Arama Özelleştirici'],
    lblEnable:  ['Enable Extension', 'Uzantıyı Etkinleştir'],
    lblResults: ['Results per page', 'Sayfa başına sonuç']
  };

  // Apply translations to all elements with data-i18n attribute
  // data-i18n özniteliğine sahip tüm öğelere çevirileri uygula
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const entry = translations[key];
    if (Array.isArray(entry)) {
      const [enText, trText] = entry;
      el.textContent = t(enText, trText);
    }
  });

  // Define interactive elements
  // Etkileşimli elementleri tanımla
  const toggle      = document.getElementById('toggleEnabled');
  const resultInput = document.getElementById('resultCount');

  // Load settings
  // Ayarları yükle
  chrome.storage.sync.get({ enabled: true, resultCount: 100 }, prefs => {
    toggle.checked    = prefs.enabled;
    resultInput.value = prefs.resultCount > 100 ? 100 : prefs.resultCount;
  });

  // Event listeners
  // Olay dinleyicileri
  toggle.addEventListener('change', () => {
    chrome.storage.sync.set({ enabled: toggle.checked });
  });

  resultInput.addEventListener('change', () => {
    const count = parseInt(resultInput.value, 10);
    // Prevent values greater than 100
    // 100'den büyük değerlerin önüne geç
    let validCount = isNaN(count) ? 100 : count;
    validCount = Math.min(validCount, 100);
    resultInput.value = validCount;
    chrome.storage.sync.set({ resultCount: validCount });
  });
});
