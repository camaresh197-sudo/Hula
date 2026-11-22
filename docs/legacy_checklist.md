# Legacy version checklist

Features to reimplement in the Godot build from the archived HTML5 build. Background and where each
legacy name lives: `docs/legacy.md`.

All legacy code is gated by `Legacy.on()` (`godot/hula/scripts/legacy.gd`). The switch is
**Options → Legacy version** and defaults on. Keep new legacy code behind that check.

Status: `[x]` done and tested headless, `[~]` partly done, `[ ]` not started.

## Done

- [x] **Level-up card picker**: XP, levels, three-card picker, queued level-ups.
  Data: `data/data_upgrades.json`. Logic: `scripts/card_deck.gd`.
- [x] **15 of 36 cards** with effects (see `card_deck.gd` `IMPLEMENTED`).
- [x] **Legacy switch** in Options (`scripts/legacy.gd`, `scripts/menu.gd`).

## Cards still to do

- [ ] **Weapon cards** (9): Salsa Cannon Mk II (`r_cannon`), Six-Shooter Mastery (`p_gun`),
  Sharper Machete (`p_machete`), Wide Swing (`p_sweep`), and the new-weapon cards Salsa Mines,
  Chili Missiles, Spinning Hubcaps, Tortilla Scatter, Hoop Throw, Lasso Spin, Cactus Nova,
  Chili Fireballs, Storm Call, Orbiting Hoops. Needs the weapon system below.
- [ ] **Active-skill cards** (Nitro `r_nitro`, Dodge Roll `p_roll`). Needs the active-skill button.
- [ ] **Whirlwind** (`p_whirl`): spin every 5 s, slashing everything around.
- [ ] **Hot Sauce Rounds** (`r_hot`): burn on hit. Needs burn status.
- [ ] **Grippy Tires** (`r_tires`): needs ground / surface slow.
- [ ] **Magnet Hubcaps** (`r_hub`) and **Pot of Gold** (`c_gold`): need pickups and gold.
- [~] **Rabbit's Foot** (`r_luck`): card rarity done; power-up drop bonus waits on pickups.

## Weapons and actives

- [ ] **Weapon system.** The Godot build fires one shot type. Legacy weapons: `WEAPONS` in the source
  (revolver/Six-Shooter, machete, buckshot/Scatter, hoops/Hubcaps, lasso, chili, thunder, cactus,
  dynamite/mines, sunbeam, tumbleweed, trumpet, boomerang/Hoop Throw, skulls).
  Mode-specific names: `WALT` (`data_upgrades.json` `weapon_names`).
- [ ] **Active skills**: Dash / Nitro / Roll, Cape / Shockwave / Matador, Siesta (`ACTIVES`).
  Names per mode are in `data_upgrades.json` `active_names`.

## Enemies and events

- [ ] **Ball types** (`BTYPES`). The Godot build has one enemy type.
- [ ] **Ambush event** (`cvOcc`, `cvMake`, `cvIntent`): reinforcements arrive in lanes with the
  "AMBUSH! Reinforcements are closing in" toast. Strings are in `data_upgrades.json` `ui_strings`.

## Items and progression

- [ ] **Relics** (61 in `data_upgrades.json`): passive items. Most effects are simple stat changes once
  the stat hooks in `card_deck.gd` cover them.
- [ ] **Shop** (11 items in `data_upgrades.json`): buy with run gold. Needs gold.
- [ ] **Gold**: run coins, from pickups and kills.

## Audio, UI and options

- [ ] **Exclamation phrases** (`mx_phrases`, 18 lines). Needs a playback hook (Piper voice lines
  are a separate task; see CLAUDE.md "Audio generation").
- [ ] **Auto-pause when away** option (`blurPause`): pause when the app loses focus.
- [ ] **Opening cutscene option** (`intro`: first time / every time / never).

## Final review (before deletion)

When the items above that are useful are done:

- [ ] Review every remaining legacy item. Keep only the ones that help the Godot game.
- [ ] Check the legacy HTML build against the Godot build for anything missed (`docs/legacy.md`).
- [ ] Remove `scripts/legacy.gd`, every `Legacy.on()` check, the Options toggle, and the
  `legacy` key in `save.gd`. Keep the features that were kept, ungated.
- [ ] Delete `docs/legacy.md` and this checklist. Record the final decisions in `HANDOFF.md`.
