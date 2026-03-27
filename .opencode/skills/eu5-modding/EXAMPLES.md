# EU5 Modding Examples

Real patterns extracted from top EU5 mod repositories.

## INJECT: adding fields to an existing vanilla object

Use `INJECT` when you only need to change a few fields. The vanilla object stays intact; your fields are merged in.

```txt
# in_game/common/auto_modifiers/ars_belli_country.txt
INJECT:country_base_values = {
    army_logistics_distance = 40       # vanilla: 50
    fort_limit = 2                     # vanilla: 1
}
```

## REPLACE: redefining an entire vanilla object

Use `REPLACE` when you need to change so many fields that it's cleaner to redefine the whole object. You must include ALL fields -- you own the entire definition now. Comment what you changed vs vanilla.

```txt
# in_game/common/auto_modifiers/ars_belli_country.txt
REPLACE:stability_impact = {
    scales_with = {
        value = stability
        multiply = 0.01
    }
    global_population_growth = 0.002   # ars_belli added
    pop_join_rebel_threshold = -0.1
    pop_leave_rebels_threshold = -0.05
}
```

## REPLACE: goods rebalancing

```txt
# in_game/common/goods/ars_belli_raw_materials.txt
REPLACE:horses = {
    method = farming
    category = raw_material
    color = goods_horses
    default_market_price = 1.5   # vanilla: 3
    transport_cost = 2
    demand_add = {
        nobles = 0.25
    }
    origin_in_old_world = yes
    custom_tags = { old_world_goods }
}
```

**Pattern**: One file per thematic group of changes, all using `REPLACE` with a comment on the vanilla value.

## on_action: starting setup

`on_action` files are always **additive** -- multiple files with the same key all contribute. Never use `INJECT`/`REPLACE` for on_actions.

```txt
# in_game/common/on_action/ars_belli_setup.txt

# Append to the vanilla on_game_start
on_game_start = {
    on_actions = {
        ars_belli_on_game_start
    }
}

# Define the actual logic separately
ars_belli_on_game_start = {
    effect = {
        c:MAM = {
            cancel_subject = c:SYR
            cancel_subject = c:HJZ
        }
        c:FRA = {
            trigger_event_non_silently = ars_belli_setup.1
        }
    }
}
```

## CMF integration: registering mod menu settings

```txt
# in_game/common/scripted_effects/ars_belli_cmm_effects.txt
ars_belli_register_settings = {
    # Register a boolean toggle for each package
    cmm_register_bool_setting = {
        mod_id = ars_belli
        setting_id = starting_setup_enabled
        tab_id = general
        group_id = packages
        default_value = 1
    }
    cmm_register_bool_setting = {
        mod_id = ars_belli
        setting_id = diplomacy_enabled
        tab_id = general
        group_id = packages
        default_value = 1
    }
    cmm_register_bool_setting = {
        mod_id = ars_belli
        setting_id = gameplay_enabled
        tab_id = general
        group_id = packages
        default_value = 1
    }
}
```

```txt
# in_game/common/on_action/ars_belli_cmm_on_actions.txt
cmm_on_mod_registration = {
    on_actions = {
        ars_belli_register_settings
    }
}
```

## Localization file structure

File: `main_menu/localization/english/ars_belli_diplomacy_l_english.yml`

```yaml
 l_english:
 ars_belli_alliance_points:0 "Alliance Points"
 ars_belli_alliance_points_desc:0 "The number of alliance slots available to this country."
 ars_belli_tier_great_power:0 "Great Power"
 ars_belli_tier_major_power:0 "Major Power"
```

**Rules**:
- File must be **UTF-8 with BOM**
- Filename must end with `_l_english.yml` (lowercase L, not numeral 1)
- First line is ` l_english:` (note the leading space)
- Indent with single space, not tabs

## Defines changes (loading_screen)

```txt
# loading_screen/common/defines/ars_belli_military_defines.txt
NDefines.NMilitary.FORT_LIMIT_BASE = 2
NDefines.NMilitary.REINFORCE_RATE = 0.20
```

Defines are in `loading_screen/common/defines/` (loaded first), NOT in `in_game/`. Multiple define files are additive -- just add new keys or override existing ones by key name.

## File naming patterns from top mods

| Mod | Prefix | Example |
|-----|--------|---------|
| MEIOU and Taxes | `MnT_` | `MnT_country.txt`, `MnT_03_diplomacy.txt` |
| TheRegime | `regime_` | `regime_gs_rework.txt` |
| CMF | `cmf_` / `cmm_` | `cmf_sgui_alert.txt`, `cmm_example_effects.txt` |
| Ars Belli | `ars_belli_` | `ars_belli_country.txt`, `ars_belli_diplomacy_defines.txt` |

## Useful vanilla file paths (EU5 1.1.x)

```
game/in_game/common/auto_modifiers/country.txt          # country_base_values, etc.
game/in_game/common/building_types/forts.txt            # fort definitions
game/in_game/common/subject_types/vassal.txt            # vassal subject type
game/in_game/common/international_organizations/coalition.txt
game/in_game/common/laws/01_common.txt
game/in_game/common/country_ranks/00_default.txt        # GP/Major/Normal/Small/Minor
game/in_game/common/scripted_relations/alliance.txt
game/in_game/common/scripted_relations/guarantee.txt
game/in_game/common/unit_types/                         # all unit types
game/in_game/setup/countries/                           # starting country data
game/loading_screen/common/defines/00_defines.txt       # global defines
game/main_menu/common/static_modifiers/                 # static modifiers
```
