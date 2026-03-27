# EU5 Modding Reference

## Mod folder load order

Three top-level folders, loaded in this order:

1. `loading_screen/` -- defines, early constants (before menu)
2. `main_menu/` -- country data, flags, scenarios (while menu loads)
3. `in_game/` -- everything else (while in main menu, before lobby)

Within each folder, the layout mirrors `Europa Universalis V/game/`.

## common/ subfolders (in_game)

Relevant to Ars Belli:

| Folder | Content |
|--------|---------|
| `advances/` | Technology tree advancements |
| `age/` | Age definitions (Age of Traditions, etc.) |
| `auto_modifiers/` | Modifiers applied automatically to countries/locations |
| `building_types/` | Building definitions including forts |
| `casus_belli/` | War justifications |
| `country_interactions/` | Diplomatic actions |
| `country_ranks/` | Country tier definitions (GP, Major, etc.) |
| `diplomatic_costs/` | Diplomatic action costs |
| `disasters/` | Disaster definitions |
| `estate_privileges/` | Estate privileges |
| `goods/` | Trade goods definitions |
| `international_organizations/` | IOs including coalitions, alliances |
| `laws/` | Government laws |
| `on_action/` | Event hooks (always additive, never use INJECT/REPLACE) |
| `peace_treaties/` | Peace deal terms |
| `prices/` | Unit/action prices |
| `script_values/` | Named script values |
| `scripted_effects/` | Named effect blocks (INJECT silently overwrites -- use separate names) |
| `scripted_guis/` | Scripted GUI definitions |
| `scripted_relations/` | Diplomatic relation types (alliances, guarantees, etc.) |
| `scripted_triggers/` | Named trigger blocks (INJECT silently overwrites -- use separate names) |
| `situations/` | Situation definitions |
| `subject_types/` | Vassal/subject type definitions |
| `unit_types/` | Military unit types |
| `wargoals/` | War goal definitions |

Note: `defines` are NOT in `in_game/` -- they live in `loading_screen/common/defines/`.

## on_action patterns

`on_action` files are always **additive** -- multiple files with the same on_action key all contribute. Never use `INJECT`/`REPLACE` for on_actions.

```txt
# Correct: append to on_game_start
on_game_start = {
    on_actions = { ars_belli_my_setup_action }
}

ars_belli_my_setup_action = {
    effect = {
        # your effects
    }
}
```

Key vanilla on_actions relevant to Ars Belli:
- `on_game_start` -- fires once when a new game starts (for starting setup changes)
- `on_yearly_pulse` / `on_monthly_pulse` -- recurring effects
- `cmm_on_mod_registration` -- CMF hook for registering mod menu settings

## scripted_effects and scripted_triggers

Cannot use `INJECT` -- it silently replaces instead of merging. To extend vanilla scripted effects:
- Create your own named effect that calls the vanilla one, then adds more
- Or create a completely new named effect and call it from on_actions

## Localization

- Location: `{top_folder}/localization/english/`
- Format: `.yml` files with UTF-8 BOM encoding
- Filename: must end with `_l_english.yml`

```yaml
 l_english:
 key:0 "Value"
 key_desc:0 "Description with [ScriptFunction] interpolation"
```

Common localization key patterns:
- `ars_belli_thing` -- display name
- `ars_belli_thing_desc` -- tooltip description
- `ars_belli_thing_effect` -- effect description

## Defines

Defines are key-value constants loaded very early. Location: `loading_screen/common/defines/`

Multiple define files are additive by key. To change a vanilla define, create a new file and re-declare the key:

```txt
# loading_screen/common/defines/ars_belli_military_defines.txt
NDefines.NMilitary.FORT_LIMIT_BASE = 2
NDefines.NMilitary.REINFORCE_RATE = 0.20
NDefines.NMilitary.STACKWIPE_RATIO = 20
```

Reference all define namespaces and keys by running `script_docs` in the console.

## replace_paths

To entirely suppress vanilla content in a folder (dangerous -- use sparingly):
```json
"game_custom_data": {
    "replace_paths": [
        "events/my_folder"
    ]
}
```

Only removes files at the specified level, not in subfolders.

## CMF features available to Ars Belli

| Feature | Use case |
|---------|----------|
| `cmm_register_bool_setting` | Toggle a mod package on/off |
| `cmm_register_numeric_setting` | Configurable numeric value |
| `cmm_register_dropdown_setting` | Choice between options |
| `is_host` trigger | Limit effects to the host player in MP |
| Custom alerts | Notify players of mod events |
| Action bar buttons | Quick access to mod actions |

Full CMF docs: [CMF GitHub Wiki](https://github.com/Europa-Universalis-5-Modding-Co-op/community-mod-framework/wiki)

## Key reference repos (GitHub)

| Repo | What to look at |
|------|----------------|
| [community-mod-framework](https://github.com/Europa-Universalis-5-Modding-Co-op/community-mod-framework) | CMF integration patterns, editorconfig, gitattributes |
| [community-mod-framework example mod](https://github.com/Europa-Universalis-5-Modding-Co-op/community-mod-framework/tree/main/submods/cmf-example-mod) | Complete CMF integration example |
| [MnT-EU5](https://github.com/MEIOU-and-Taxes/MnT-EU5) | REPLACE/INJECT usage at scale, file prefixing conventions |
| [TheRegime](https://github.com/PDXMP/TheRegime) | MP mod with on_game_start setup pattern, multiplayer_synchronized |
| [modding-digests](https://github.com/Europa-Universalis-5-Modding-Co-op/modding-digests) | Per-version file changes and type documentation |
| [community-mod-toolkit](https://github.com/Europa-Universalis-5-Modding-Co-op/community-mod-toolkit) | Mod template, upload tool, translation tool |
