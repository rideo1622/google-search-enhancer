# Google Custom Search Enhancer / Google Arama Özelleştirici

Customize your Google search experience by setting the number of results per page and defining which Google domains the extension should be active on. Control the extension easily via its popup or options page.

Google arama deneyiminizi, sayfa başına sonuç sayısını ayarlayarak ve uzantının hangi Google alan adlarında etkin olacağını tanımlayarak özelleştirin. Uzantıyı açılır penceresi veya seçenekler sayfası aracılığıyla kolayca kontrol edin.

[Türkçe Açıklama Aşağıdadır](#türkçe)

---

## Features

* **Custom Result Count:** Set the number of search results displayed per page (up to 100).
* **Domain Whitelisting:** Specify which Google domains (e.g., `google.com`, `google.com.tr`, `google.co.uk`) the extension should modify.
* **Enable/Disable Toggle:** Easily enable or disable the extension's functionality from the popup.
* **Simple Popup:** Quick access to enable/disable toggle and result count setting.
* **Options Page:** Manage the list of domains and other settings.
* **Localization:** Supports English and Turkish based on browser language.
* **Theme Support:** Automatically adjusts to Chrome's light and dark themes.

## Installation

### Option 1: Install from Source (Developer Mode)

1.  **Download:** Download the project files as a ZIP from this GitHub repository (Click `Code` -> `Download ZIP`) and unzip it to a folder on your computer.
2.  **Open Chrome Extensions:** Open Google Chrome, type `chrome://extensions` in the address bar, and press Enter.
3.  **Enable Developer Mode:** Turn on the "Developer mode" toggle, usually found in the top-right corner.
4.  **Load Unpacked:** Click the "Load unpacked" button and select the folder where you unzipped the project files.
5.  The extension icon should now appear in your Chrome toolbar.

### Option 2: (If Published) Install from Chrome Web Store

* *[Link to Chrome Web Store page will be added here if the extension is published]*

## Usage

1.  **Click the Extension Icon:** Click the extension's icon in your Chrome toolbar to open the popup.
2.  **Popup Controls:**
    * Use the toggle switch to enable or disable the extension.
    * Set the desired number of results per page in the input field (maximum 100). Changes are saved automatically.
    * Click the "Settings" button to open the full options page.
3.  **Options Page:**
    * Access via the "Settings" button in the popup or by right-clicking the extension icon and selecting "Options".
    * **Domains:** Enter the Google domains you want the extension to work on, separated by spaces (e.g., `google.com google.com.tr google.de`). You can find a list of Google domains at [google.com/supported_domains](https://www.google.com/supported_domains).
    * **Results per page:** Set the desired number of results (maximum 100).
    * **Enabled:** Enable or disable the extension globally.
    * Click "Save" to apply changes made on the options page.
4.  **Browse Google:** When you perform a search on one of the enabled Google domains, the extension will automatically adjust the URL to request the number of results you specified.

---

## Türkçe

### Özellikler

* **Özel Sonuç Sayısı:** Sayfa başına gösterilecek arama sonucu sayısını ayarlayın (100'e kadar).
* **Alan Adı Beyaz Listesi:** Uzantının hangi Google alan adlarında (ör. `google.com`, `google.com.tr`, `google.co.uk`) değişiklik yapması gerektiğini belirtin.
* **Etkinleştirme/Devre Dışı Bırakma:** Açılır pencereden uzantının işlevselliğini kolayca etkinleştirin veya devre dışı bırakın.
* **Basit Açılır Pencere:** Etkinleştirme/devre dışı bırakma anahtarına ve sonuç sayısı ayarına hızlı erişim.
* **Seçenekler Sayfası:** Alan adı listesini ve diğer ayarları yönetin.
* **Yerelleştirme:** Tarayıcı diline göre İngilizce ve Türkçe destekler.
* **Tema Desteği:** Chrome'un açık ve koyu temalarına otomatik olarak uyum sağlar.

### Kurulum

#### Seçenek 1: Kaynaktan Yükleme (Geliştirici Modu)

1.  **İndirme:** Bu GitHub deposundan proje dosyalarını ZIP olarak indirin (`Code` -> `Download ZIP` tıklayın) ve bilgisayarınızdaki bir klasöre çıkartın.
2.  **Chrome Uzantılarını Açma:** Google Chrome'u açın, adres çubuğuna `chrome://extensions` yazın ve Enter'a basın.
3.  **Geliştirici Modunu Etkinleştirme:** Genellikle sağ üst köşede bulunan "Geliştirici modu" anahtarını açın.
4.  **Paketlenmemiş Öğeyi Yükle:** "Paketlenmemiş öğe yükle" düğmesine tıklayın ve proje dosyalarını çıkarttığınız klasörü seçin.
5.  Uzantı simgesi şimdi Chrome araç çubuğunuzda görünmelidir.

#### Seçenek 2: (Eğer Yayınlandıysa) Chrome Web Mağazası'ndan Yükleme

* *[Uzantı yayınlanırsa Chrome Web Mağazası sayfasının bağlantısı buraya eklenecektir]*

### Kullanım

1.  **Uzantı Simgesine Tıklayın:** Açılır pencereyi açmak için Chrome araç çubuğundaki uzantı simgesine tıklayın.
2.  **Açılır Pencere Kontrolleri:**
    * Uzantıyı etkinleştirmek veya devre dışı bırakmak için anahtarı kullanın.
    * Giriş alanına sayfa başına istediğiniz sonuç sayısını ayarlayın (maksimum 100). Değişiklikler otomatik olarak kaydedilir.
    * Tam seçenekler sayfasını açmak için "Ayarlar" düğmesine tıklayın.
3.  **Seçenekler Sayfası:**
    * Açılır penceredeki "Ayarlar" düğmesi aracılığıyla veya uzantı simgesine sağ tıklayıp "Seçenekler"i seçerek erişin.
    * **Alan Adları:** Uzantının çalışmasını istediğiniz Google alan adlarını boşluklarla ayırarak girin (ör. `google.com google.com.tr google.de`). Google alan adlarının bir listesini [google.com/supported_domains](https://www.google.com/supported_domains) adresinde bulabilirsiniz.
    * **Sayfa başına sonuç:** İstediğiniz sonuç sayısını ayarlayın (maksimum 100).
    * **Etkin:** Uzantıyı genel olarak etkinleştirin veya devre dışı bırakın.
    * Seçenekler sayfasında yapılan değişiklikleri uygulamak için "Kaydet"e tıklayın.
4.  **Google'da Gezinme:** Etkinleştirilmiş Google alan adlarından birinde arama yaptığınızda, uzantı belirttiğiniz sonuç sayısını isteyecek şekilde URL'yi otomatik olarak ayarlayacaktır.

