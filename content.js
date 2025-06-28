'use strict';
// Content script: Modifies Google search result page URLs.
// İçerik betiği: Google arama sonuç sayfası URL'lerini değiştirir.

// Use an Immediately Invoked Function Expression (IIFE) to avoid polluting the global scope.
// Kapsam kirliliğini önlemek için Hemen Çağrılan Fonksiyon İfadesi (IIFE) kullanılır.
(() => {
  // Load extension settings from storage.
  // Depolamadan uzantı ayarlarını yükle.
  chrome.storage.sync.get(
    // Only resultCount and enabled are needed now; domain list removed.
    // Artık yalnızca resultCount ve enabled gerekiyor; alan adı listesi kaldırıldı.
    { resultCount: 100, enabled: true },
    // Callback with loaded settings
    // Yüklenen ayarlarla geri çağrım
    ({ resultCount, enabled }) => {
      // Exit immediately if the extension is disabled in settings.
      // Uzantı ayarlarda devre dışıysa hemen çık.
      if (!enabled) return;
      
      // Enforce maximum value of 100 for result count
      // Sonuç sayısı için maksimum 100 değerini zorunlu kıl.
      resultCount = Math.min(100, resultCount);

      // Get the hostname of the current page (e.g., "www.google.com").
      // Geçerli sayfanın ana bilgisayar adını al (ör. "www.google.com").
      const host = location.hostname;

      // Manifest already limits injection to Google Search pages; no extra domain filtering needed.
      // Manifest içerik betiğini zaten Google Arama sayfalarıyla sınırlar; ek alan adı filtresi gerekmiyor.

      // Create a URL object to easily manipulate search parameters.
      // Arama parametrelerini kolayca değiştirmek için bir URL nesnesi oluştur.
      const url = new URL(location.href);
      const params = url.searchParams;

      // Check if the 'num' parameter (results per page) is already set to the desired value.
      // 'num' parametresinin (sayfa başına sonuç) istenen değere ayarlanıp ayarlanmadığını kontrol et.
      // Convert resultCount to string for comparison.
      // Karşılaştırma için resultCount'u string'e dönüştür.
      if (params.get("num") !== String(resultCount)) {
        // If 'num' is different or not present, set it to the value from settings.
        // 'num' farklıysa veya mevcut değilse, ayarlardaki değere ayarla.
        params.set("num", resultCount);
        // Delete the 'start' parameter to ensure the first page of results is shown
        // when the number of results per page changes.
        // Sayfa başına sonuç sayısı değiştiğinde ilk sonuç sayfasını göstermek için 'start' parametresini sil.
        params.delete("start");
        // Replace the current URL with the modified one without adding to browser history.
        // Tarayıcı geçmişine eklemeden mevcut URL'yi değiştirilmiş olanla değiştir.
        window.location.replace(url.toString());
      }
      // If 'num' is already correct, do nothing.
      // 'num' zaten doğruysa, hiçbir şey yapma.
    }
  );
})(); // End of IIFE
//   IIFE Sonu
