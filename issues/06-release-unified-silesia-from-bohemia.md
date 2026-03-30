# Release Unified Silesia from Bohemia

## Status

Todo

## Parent PRD

`prds/starting-setup.md`

## Mod Package

Starting Setup

## Type

HITL

## What to change

At bookmark start, release a unified Silesia from Bohemia to act as a buffer in the HRE:

1. **Release a unified Silesia** tag that combines all Silesian minor territories into one country, along with the **Upper Lusatia** province.

Implementation notes:
- Research whether a unified Silesia tag exists in vanilla EU5. If the Silesian minors exist as separate tags but no unified Silesia exists, this may require creating a new country tag (under `common/country_tags/` and `history/countries/`).
- If a unified tag does not exist, an alternative approach is to release one Silesian minor and then transfer the other Silesian provinces + Upper Lusatia to it.
- Verify the combined development of all Silesian provinces + Upper Lusatia is sufficient for the country to survive initial aggression from Bohemia, Poland, and Brandenburg.
- This is explicitly a stopgap measure until proper HRE content is implemented.
- Implement this in bookmark/start files so the changes are visible in the lobby and country picker from day 0.
- Use `main_menu/setup/start/10_countries.txt` for ownership and country setup changes.
- Use `main_menu/setup/start/12_diplomacy.txt` if Bohemia starts with subject or other diplomatic links that must be removed/adjusted.
- Preserve vanilla formatting/order and annotate changed spots with short explanatory comments.

## Mod files involved

- `main_menu/setup/start/10_countries.txt` -- **Modify**. Release or create unified Silesia in the bookmark state.
- `main_menu/setup/start/12_diplomacy.txt` -- **Modify if needed**. Remove or adjust starting diplomatic links.
- Possibly `in_game/setup/countries/` or other country-definition files -- **New file** if a unified Silesia tag must be created.

## Acceptance criteria

- [ ] A unified Silesia exists as an independent country at game start, controlling all Silesian minor territories and Upper Lusatia
- [ ] Bohemia loses Silesian territories but retains its Bohemian/Moravian core
- [ ] Silesia has enough combined development to be a viable buffer state (not immediately conquered)
- [ ] Game loads without errors
- [ ] Silesia is correctly classified by the Diplomacy package tier system

## Blocked by

None.

## Changes addressed

- PRD Change 5: HRE -- Bohemia (all sub-items)
