// Download buttons: resolve the current installer from the release manifest at
// click time, so the site never needs editing when a new version ships.
//
// The manifest is Tauri's updater manifest. Its entries point at updater
// bundles, so the installer URL is derived from them:
//   windows-x86_64  -> the NSIS setup .exe, used as-is
//   darwin-*        -> "<name>.app.tar.gz", published beside "<name>.dmg"
(function () {
  'use strict';

  var MANIFEST_URL = 'https://update.inkapp.dev/latest.json';
  var TIMEOUT_MS = 10000;

  // Manifest keys to try for each button, in order of preference.
  var PLATFORM_KEYS = {
    macos: ['darwin-universal', 'darwin-aarch64', 'darwin-x86_64'],
    windows: ['windows-x86_64'],
  };

  function installerUrl(platform, url) {
    if (platform === 'macos') {
      return /\.app\.tar\.gz$/.test(url) ? url.replace(/\.app\.tar\.gz$/, '.dmg') : null;
    }
    return /\.(exe|msi)$/.test(url) ? url : null;
  }

  // Pure: manifest object + 'macos' | 'windows' -> { url, version } or null.
  function pickInstaller(manifest, platform) {
    var keys = PLATFORM_KEYS[platform];
    var platforms = manifest && manifest.platforms;
    if (!keys || !platforms) return null;
    for (var i = 0; i < keys.length; i++) {
      var entry = platforms[keys[i]];
      var url = entry && typeof entry.url === 'string' ? installerUrl(platform, entry.url) : null;
      if (url) return { url: url, version: manifest.version || null };
    }
    return null;
  }

  function fetchManifest() {
    var controller = typeof AbortController === 'function' ? new AbortController() : null;
    var timer = controller ? setTimeout(function () { controller.abort(); }, TIMEOUT_MS) : null;
    return fetch(MANIFEST_URL, { cache: 'no-store', signal: controller ? controller.signal : undefined })
      .then(function (res) {
        if (!res.ok) throw new Error('Manifest request failed: ' + res.status);
        return res.json();
      })
      .finally(function () { if (timer) clearTimeout(timer); });
  }

  function setStatus(message) {
    var els = document.querySelectorAll('[data-download-status]');
    for (var i = 0; i < els.length; i++) els[i].textContent = message;
  }

  function onClick(event) {
    var button = event.currentTarget;
    var platform = button.getAttribute('data-download');
    if (button.getAttribute('aria-busy') === 'true') {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    button.setAttribute('aria-busy', 'true');
    setStatus('Preparing your download…');

    fetchManifest()
      .then(function (manifest) {
        var installer = pickInstaller(manifest, platform);
        if (!installer) throw new Error('No ' + platform + ' installer in the manifest');
        setStatus(installer.version ? 'Downloading Ink ' + installer.version + '…' : 'Downloading Ink…');
        window.location.href = installer.url;
      })
      .catch(function () {
        setStatus('The download server could not be reached. Please try again in a moment.');
      })
      .finally(function () { button.removeAttribute('aria-busy'); });
  }

  window.InkDownload = { pickInstaller: pickInstaller, MANIFEST_URL: MANIFEST_URL };

  if (typeof document !== 'undefined') {
    var buttons = document.querySelectorAll('[data-download]');
    for (var i = 0; i < buttons.length; i++) buttons[i].addEventListener('click', onClick);
  }
})();
