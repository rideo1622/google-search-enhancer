// Content script: Modifies Google search result page URLs.

// Use an Immediately Invoked Function Expression (IIFE) to avoid polluting the global scope.
(() => {
  // Load extension settings from storage.
  chrome.storage.sync.get(
    // Provide default values in case settings haven't been saved yet.
    { domains: ["google.com", "google.com.tr"], resultCount: 100, enabled: true },
    // Callback function with the loaded settings.
    ({ domains, resultCount, enabled }) => {
      // Exit immediately if the extension is disabled in settings.
      if (!enabled) return;

      // Get the hostname of the current page (e.g., "www.google.com").
      const host = location.hostname;

      // Check if the current hostname matches any of the domains specified in settings.
      // It checks for exact match or if the host ends with ".<domain>" (e.g., www.google.com matches google.com).
      const matches = domains.some(d => host === d || host.endsWith(`.${d}`));

      // Exit if the current domain is not in the user's list.
      if (!matches) return;

      // Create a URL object to easily manipulate search parameters.
      const url = new URL(location.href);
      const params = url.searchParams;

      // Check if the 'num' parameter (results per page) is already set to the desired value.
      // Convert resultCount to string for comparison.
      if (params.get("num") !== String(resultCount)) {
        // If 'num' is different or not present, set it to the value from settings.
        params.set("num", resultCount);
        // Delete the 'start' parameter to ensure the first page of results is shown
        // when the number of results per page changes.
        params.delete("start");
        // Replace the current URL with the modified one without adding to browser history.
        window.location.replace(url.toString());
      }
      // If 'num' is already correct, do nothing.
    }
  );
})(); // End of IIFE
