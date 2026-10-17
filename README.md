# inkapp.dev

The website for [Ink](https://inkapp.dev), a font editor for macOS and Windows: a homepage with a tour of the app, user manuals, reference pages and plugin API documentation.

It is a plain static site — hand-written HTML and CSS with no build step. Fonts (Manrope, JetBrains Mono) load from Google Fonts. The only script is `assets/js/download.js`.

## Download buttons

Buttons marked `data-download="macos"` or `data-download="windows"` resolve the installer when clicked, from the release manifest at `https://update.inkapp.dev/latest.json` (Tauri's updater manifest), so a new release needs no change here:

- **Windows** — `platforms["windows-x86_64"].url`, the setup `.exe`, as-is.
- **macOS** — `platforms["darwin-aarch64"].url` (or `darwin-universal` / `darwin-x86_64` if published) with `.app.tar.gz` replaced by `.dmg`. The release must therefore upload the `.dmg` next to the updater bundle.

Progress and errors appear in the `[data-download-status]` line under the buttons.

**The manifest must be served with CORS** — `Access-Control-Allow-Origin: https://inkapp.dev` (or `*`) on `latest.json` — or browsers will refuse to read it from the website.

## Pages

| Section    | Files |
| ---------- | ----- |
| Home       | `index.html` |
| Manuals    | `manual-grid-view.html`, `manual-time-machine.html`, `manual-kerning.html`, `manual-text-mode.html` |
| Font Info  | `fontinfo-general.html`, `fontinfo-masters.html`, `fontinfo-designspace.html`, `fontinfo-names.html`, `fontinfo-features.html`, `fontinfo-advanced.html`, `fontinfo-compatibility.html` |
| Settings   | `settings-general.html`, `settings-editor.html`, `settings-export.html`, `settings-shortcuts.html`, `settings-python.html`, `settings-plugins.html` |
| Reference  | `reference-ink-format.html`, `reference-opentype.html` |
| Developers | `api-plugins.html`, `api-python.html` |

Screenshots live in `assets/screenshots/`.

Each page carries its own `<style>` block, and the header and sidebar navigation are repeated in every page — when you add or rename a page, update the sidebar in all of them.

## Preview locally

Open `index.html` in a browser, or serve the folder:

```sh
npx serve .
```

## Deploying

The site works as-is on any static host. For GitHub Pages, enable Pages for the `main` branch (root folder); `.nojekyll` makes Pages serve the files untouched. To use the `inkapp.dev` domain, add a `CNAME` file containing `inkapp.dev` and point the domain's DNS at GitHub Pages.

## Placeholders to fill in

- The footer's GitHub link.
