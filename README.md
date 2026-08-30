# BOURGEOIS

Static site for the Order of the Golden Serpents. Plain HTML, CSS, and JavaScript. No build step. No paid APIs. Email capture is interface only — names stay in `localStorage` on the visitor's machine and are never sent.

Masthead is **BOURGEOIS**. Gold is light, not paint. Blevins is antagonist, never chrome.

## Open locally

From this directory:

```bash
# Simplest: open the homepage in a browser
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

Some browsers restrict `@font-face` on the `file://` protocol. If Cinzel, Cormorant Garamond, or Source Sans 3 do not load, serve the folder:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

Any other static server in this directory will do the same (`npx serve`, Caddy, nginx).

## GitHub Pages (from `main`)

This folder is the site root. Put its contents at the root of a GitHub repository (or use this folder as the repository).

1. Commit the files to the `main` branch.
2. On GitHub: **Settings → Pages**.
3. Source: **Deploy from a branch**.
4. Branch: **`main`**. Folder: **`/ (root)`**.
5. Save. The site will publish at `https://<user>.github.io/<repo>/`.

A `.nojekyll` file is included so GitHub Pages will not run Jekyll over the files. `404.html` is served for unknown paths.

Do not enable a Jekyll theme. Custom domains are optional; add a `CNAME` file at the root if you use one.

## Pages

| File | Altar |
| --- | --- |
| `index.html` | Court. *The Father casts no shadow.* Terraces of Sandria, Sakura, Saffrika. |
| `world.html` | Creation: Bourgeois made the Nexus and humanity. The five offices. Allenbraze of the seasons, called Winter from the war. Blevins as Usurper. |
| `order.html` | Order of the Golden Serpents. Tenets, hierarchy, rites. Noah John: demigod, the Father's demigod son, and a vessel — a lesser altar. |
| `regions.html` | The three terraces. Gonduras ruins. Forgotten Relics are Noah's weapons, not Bourgeois's; only Habib's Twin Blades remain in those ruins. No treasure-hunt interface. |
| `war.html` | The Great War, the Deep, the Crimson Moon as jail. |
| `codex.html` | Codices of the Serpent's Light. Canon verses. Reading-list capture (UI only). |

## Type and mark

Fonts are self-hosted in `fonts/`:

- Cinzel — display, inscriptions, wordmark
- Cormorant Garamond — body, scripture
- Source Sans 3 — navigation and UI

The Serpent's Eye (`img/serpents-eye.svg`) is line only: three coils around the sun, horizontal slit pupil. Never a cartoon snake, never a caduceus.

## Color

Obsidian `#0B0A09`, Stone `#1C1814`, Nexus Gold `#C9A227`, Illumination `#E8C547`, Temple Gold `#8A6E1F`, Crimson `#8B1E2D`, Ember `#B42334`, Bone `#E8DCC8`, Ash `#9A9286`, Smoke `#6B6458`. Regional accents, never chrome: Sandria `#C4A574`, Sakura `#D4A5B0`, Saffrika `#2F4A38`.
