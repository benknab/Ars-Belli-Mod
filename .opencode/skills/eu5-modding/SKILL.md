---
name: eu5-modding
description: Provides EU5 mod architecture, file override rules, INJECT/REPLACE patterns, and CMF integration guidance for the Ars Belli mod. Use when implementing mod changes, creating new mod files, asking how to override a vanilla file, designing mod structure, or integrating with the Community Mod Framework.
---

# EU5 Modding

## Quick start

Mod files live in `in_game/`, `main_menu/`, and `loading_screen/` -- mirroring the structure under `Europa Universalis V/game/`. The game merges your files with vanilla at load time.

**To add fields into an existing vanilla object (preferred):**
```txt
# in_game/common/auto_modifiers/ars_belli_country.txt
INJECT:country_base_values = {
    army_logistics_distance = 40   # vanilla: 50
}
```

**To fully replace an existing vanilla object:**
```txt
REPLACE:country_base_values = {
    # must include ALL fields -- you own the whole object now
}
```

**Prefer `INJECT` when adding or changing a few fields. Use `REPLACE` only when you need to redefine the entire object.**

See [EXAMPLES.md](EXAMPLES.md) for real patterns from top EU5 mods.

## File structure

```
.metadata/
  metadata.json          # mod identity, version, game version, dependencies
in_game/
  common/                # game mechanics definitions
  events/                # event scripts (supports arbitrary subfolders)
  gui/                   # UI definitions
  localization/          # .yml string files
main_menu/
  common/                # country definitions, flag data, scenario data
  localization/          # localization loaded at menu time
  setup/                 # starting borders, vassals, truces
loading_screen/
  common/defines/        # early-loading constants
```

## Naming conventions

- **Prefix all files and objects** with `ars_belli_` (e.g. `ars_belli_diplomacy_defines.txt`, `ars_belli_alliance_points`)
- **Never reuse vanilla filenames** unless you intend to fully replace that file
- Subfolders inside `events/` are free-form -- use them for package organization:
  - `events/ars_belli_starting_setup/`, `events/ars_belli_diplomacy/`, `events/ars_belli_gameplay/`
- Localization files must end with `_l_english.yml` (lowercase L)

## Override rules

| Situation | What happens |
|-----------|-------------|
| Same filename as vanilla | Your file **fully replaces** vanilla |
| Different filename, same objects via `INJECT`/`REPLACE` | Surgical modification, vanilla file untouched |
| Multiple mods, same filename | Lowest in launcher mod list wins |
| Multiple mods, same object key | Last alphabetically by filename wins |

**Prefer `INJECT`/`REPLACE` over file replacement whenever possible.** Full file replacement breaks on every patch and causes incompatibility.

## Database entry modes

Available in most `common/` subfolders. Not available in `on_action` (use append instead) or `defines` (use define keys directly).

| Mode | Error if missing | Use when |
|------|-----------------|----------|
| `INJECT:key` | Yes | Adding/changing fields in an existing object |
| `REPLACE:key` | Yes | Redefining an entire existing object |
| `TRY_INJECT:key` | No | Optional injection (silent if object missing) |
| `TRY_REPLACE:key` | No | Optional replacement |
| `INJECT_OR_CREATE:key` | No | Add to existing or define new |
| `REPLACE_OR_CREATE:key` | No | Replace existing or define new |

Note: `INJECT` does **not** work for `scripted_effects` and `scripted_triggers` -- it silently overwrites them. Use separate named effects/triggers instead.

## Community Mod Framework (CMF)

CMF provides a shared in-game mod menu (toggle packages on/off), custom alerts, and the `is_host` trigger.

**Registering a toggle in the mod menu:**
```txt
# in_game/common/scripted_effects/ars_belli_cmm_registration.txt
ars_belli_register_in_cmm = {
    cmm_register_bool_setting = {
        mod_id = ars_belli
        setting_id = starting_setup_enabled
        tab_id = general
        group_id = packages
        default_value = 1
    }
}
```

**Hooking into CMF registration:**
```txt
# in_game/common/on_action/ars_belli_on_actions.txt
cmm_on_mod_registration = {
    on_actions = { ars_belli_register_in_cmm }
}
```

## Reference to vanilla files

Vanilla game files are at:
```
Steam/steamapps/common/Europa Universalis V/game/
```

The [modding-digests repo](https://github.com/Europa-Universalis-5-Modding-Co-op/modding-digests) contains extracted effects, triggers, scopes, and per-patch file change lists -- use it to check what changed between versions.

Use `script_docs` and `dump_data_types` console commands (with `-debug_mode` launch flag) to generate local reference docs in `Documents/Paradox Interactive/Europa Universalis V/docs`.

## Debugging

- Launch flag `-debug_mode`: enables console (`~`), hot-reload, error deer button
- `Documents/Paradox Interactive/Europa Universalis V/logs/error.log`: all script errors
- `--ignore-disable-mods-on-crash`: prevent the launcher disabling mods after a crash

## Key community resources

- [EU5 Mod Coop Discord](https://discord.gg/KeXMv4yM3a) -- primary modding community
- [EU5 Paradox Wiki Modding](https://eu5.paradoxwikis.com/Modding)
- [Mod Structure](https://eu5.paradoxwikis.com/Mod_structure)
- [Modding Digests](https://github.com/Europa-Universalis-5-Modding-Co-op/modding-digests) -- per-version file change tracking
- [CMF Wiki](https://github.com/Europa-Universalis-5-Modding-Co-op/community-mod-framework/wiki)
