# Release Unified Silesia from Bohemia

## Parent PRD

`prds/starting-setup.md`

## Mod Package

Starting Setup

## Type

HITL

## What to change

At game start, release a unified Silesia from Bohemia to act as a buffer in the HRE:

1. **Release a unified Silesia** tag that combines all Silesian minor territories into one country, along with the **Upper Lusatia** province.

Implementation notes:
- Research whether a unified Silesia tag exists in vanilla EU5. If the Silesian minors exist as separate tags but no unified Silesia exists, this may require creating a new country tag (under `common/country_tags/` and `history/countries/`).
- If a unified tag does not exist, an alternative approach is to release one Silesian minor and then transfer the other Silesian provinces + Upper Lusatia to it.
- Verify the combined development of all Silesian provinces + Upper Lusatia is sufficient for the country to survive initial aggression from Bohemia, Poland, and Brandenburg.
- This is explicitly a stopgap measure until proper HRE content is implemented.

## Mod files involved

- `in_game/common/scripted_effects/starting_setup_effects.txt` -- **Modify**. Fill in the HRE regional effect with Silesia release/creation logic.
- Possibly `in_game/common/country_tags/` -- **New file** if a unified Silesia tag needs to be defined.
- Possibly `in_game/history/countries/` -- **New file** if a unified Silesia needs history setup.

## Acceptance criteria

- [ ] A unified Silesia exists as an independent country at game start, controlling all Silesian minor territories and Upper Lusatia
- [ ] Bohemia loses Silesian territories but retains its Bohemian/Moravian core
- [ ] Silesia has enough combined development to be a viable buffer state (not immediately conquered)
- [ ] Game loads without errors
- [ ] Silesia is correctly classified by the Diplomacy package tier system

## Blocked by

- `issues/01-hook-starting-setup-on-game-start.md`

## Changes addressed

- PRD Change 5: HRE -- Bohemia (all sub-items)
