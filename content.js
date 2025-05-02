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
      
      // Enforce maximum value of 100 for result count
      resultCount = Math.min(100, resultCount);

      // Get the hostname of the current page (e.g., "www.google.com").
      const host = location.hostname;
      
      // Get the pathname and search part of the URL
      const path = location.pathname;
      const searchParams = location.search;
      
      // Check if we're on a standard Google domain
      // First, extract the base domain (like google.com, google.co.uk)
      const domainMatch = host.match(/(?:www\.)?(google\.[^.]+(?:\.[^.]+)?)$/);
      if (!domainMatch) return;
      
      const baseDomain = domainMatch[1];
      
      // Check if the base domain is in the allowed list
      if (!domains.includes(baseDomain)) return;
      
      // Only proceed if we're on a Google search page (path is /search and has a query parameter)
      if (path !== '/search' || !searchParams.includes('?q=')) return;
      
      // Ensure we're not on a subdomain other than 'www'
      // We already know we're on a google.* domain from the domainMatch check
      // Make sure the hostname is either 'google.TLD' or 'www.google.TLD'
      if (host !== baseDomain && host !== `www.${baseDomain}`) return;

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
