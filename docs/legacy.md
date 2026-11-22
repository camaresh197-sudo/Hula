# Legacy HTTP build (reference)

> Copied from the `godot` branch of camaresh197-sudo/App---build (commit 5d3c7f7). Paths such as `scripts/` and `data/` refer to that Godot project, not this repo.

The original Hula Vaquero: Sky Ride was a single-file HTML5 canvas game. The Godot project
replaced it. This file records what the legacy build contains and where its pieces now live,
so the HTML version can be checked when porting or comparing behaviour.

The legacy source is **not in this repo**. Per `AGENTS.md` it was archived to a separate `legacy`
repo. The copy this doc was written from came from the debug APK
(`app-debug.apk`, package `com.hulavaquero.skyride`), at `assets/public/index.html`. The same APK was
re-checked on 2026-11-22: the feature names in the table below all match its `index.html`.

## What it is

- **Form:** one `index.html`, about 2.2 MB (measured 2026-11-22 in the debug APK), with the game in inline JavaScript. No build step, no
  external engine. Rendering uses 2D canvas (`getContext("2d")`) and one WebGL context.
- **Audio:** Web Audio (`AudioContext`).
- **Saves:** `localStorage`, under `SAVE_KEY`. Settings include `hv_eng2` and `hulaVaquero_nsong`.
- **Title:** "Hula Vaquero: Sky Ride".
- **Native wrapper (Android only):** Capacitor, app id `com.hulavaquero.skyride`, app name
  "Hula Vaquero", web dir `www`. Capacitor's updater plugin was set to `autoUpdate: false`,
  with `resetWhenUpdate: true`. The Godot build replaced this with its own `updater.gd`.
- **Platform details from the APK:** the Capacitor files are `assets/capacitor.config.json`,
  `assets/capacitor.plugins.json` and `assets/native-bridge.js`. Plugins: haptics, status bar,
  splash screen and the capacitor-updater.

## How to open it

Open `assets/public/index.html` in a browser. It needs no server. To reproduce it, unzip the APK
and read the file directly. Do not commit the APK or its extracted files to this repo.

## What's inside (by feature)

Search the file for these names. Line numbers are not stable across extracts, so use names.

| Feature | Legacy names to search for | Godot equivalent |
|---|---|---|
| Acts and story beats | `ACT_CUTS`, `ACT_SAY`, `END_CUTS`, `END_SAY`, `MUSICAL_SAY` | `data/data_cutscenes.json`, `scripts/cutscene.gd` |
| Act titles | "ACT 2 · THE PURSUIT", "ACT 3 · THE RECKONING", "ACT 4 · THE FINAL SHOWDOWN" | `data/data_cutscenes.json` |
| Card picker (level-up upgrades) | `CARDS`, `CARD_SETS`, `P(...)` entries | `data/data_upgrades.json`, `scripts/card_deck.gd` |
| Relics | `RELICS`, `R(...)` entries | `data/data_upgrades.json` (data only) |
| Shop | `SHOP_ITEMS` | `data/data_upgrades.json` (data only) |
| Weapon names per mode | `WALT`, `wName`, `activeName` | `data/data_upgrades.json` (`weapon_names`, `active_names`) |
| Weapons | `WEAPONS` | not yet ported |
| Active skills | `ACTIVES` (dash, cape, slow) | not yet ported |
| Ball types | `BTYPES` | enemies in `scripts/main.gd` (`ships`) |
| Voices and exclamations | `VOICES`, `MX_PHRASES` | `scripts/voice_manager.gd`, `mx_phrases` in data |
| Hero appearance | `HAT_STYLES`, `hvHat`, `hvHoop` | `scripts/hero3d.gd` |
| Options screen | option labels such as "Auto-pause when away", `blurPause` | `scripts/menu.gd` |
| Ambush event | `cvOcc`, `cvMake`, `cvIntent`, "AMBUSH!" | not yet ported |
| Map | world map and nodes | `scripts/map.gd`, `data/data_map.json` |

Story and dialogue text is largely present in the Godot data already. Gameplay systems are mostly
not.

## Gameplay in the Godot build vs legacy

- **Level-up cards:** the Godot build has 15 of the legacy cards working (see `scripts/card_deck.gd`
  `IMPLEMENTED`). The other cards need weapons, actives, gold, pickups, burn or grip.
- **Relics and shop:** data is ported, but nothing reads it yet.
- **Enemies and combat:** legacy ball types (`BTYPES`) and the ambush event are not ported.
  Godot's `main.gd` has one enemy type.

## Caveats

- The legacy build has not been run in this repo. Its behaviour is documented from the source
  only; test it in a browser before treating a number as authoritative.
- Names in the source use two naming styles: short internal ones (`hv*`, `cv*`) and readable ones
  for UI. Search the readable string first, then follow the function.
- The file is minified in places. Some strings are split across lines or concatenated.
