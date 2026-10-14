# inkapp.dev

The website for [Ink](https://inkapp.dev), a font editor for macOS and Windows: a homepage with a tour of the app, user manuals, reference pages and plugin API documentation.

It is a plain static site — hand-written HTML and CSS with no build step and no JavaScript. Fonts (Manrope, JetBrains Mono) load from Google Fonts.

## Pages

| Section    | Files |
| ---------- | ----- |
| Home       | `index.html` |
| Manuals    | `manual-time-machine.html`, `manual-kerning.html`, `manual-text-mode.html` |
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

- Download links on the homepage (`href="#"`) and the `[LICENSE / PRICE NOTE]` line.
- The footer's GitHub link.
