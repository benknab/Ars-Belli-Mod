# Weaken Castile: Release Galicia, Leon, Expand Navarre

## Parent PRD

`prds/starting-setup.md`

## Mod Package

Starting Setup

## Type

HITL

## What to change

At game start, reduce Castile's dominance in Iberia by releasing two countries and expanding a third:

1. **Release Galicia** as an independent country from Castile.
2. **Release Leon** as an independent country from Castile.
3. **Transfer Basque culture provinces** from Castile to Navarre.

Implementation notes:
- Research vanilla tags for Galicia and Leon. Verify they exist as releasable tags from Castile in the 1337 start.
- For the Basque province transfer, identify all provinces with Basque culture in Castile's starting territory. This may require a culture-based scope or hardcoded province IDs.
- Verify that the expanded Navarre is not disproportionately strong for its intended role as a small buffer state.
- The goal is Castile remaining the strongest Iberian power, but close enough to Aragon + Portugal that diplomacy as equals is viable.

## Mod files involved

- `in_game/common/scripted_effects/starting_setup_effects.txt` -- **Modify**. Fill in the Iberia regional effect with release logic for Galicia and Leon, and province transfer logic for Basque provinces to Navarre.
- Possibly `in_game/common/scripted_triggers/` -- **New file** if a `is_basque_culture_province` trigger is needed for identifying provinces to transfer.

## Acceptance criteria

- [ ] Galicia exists as an independent country at game start
- [ ] Leon exists as an independent country at game start
- [ ] Navarre controls all Basque culture provinces that were previously Castilian
- [ ] Castile retains its core Castilian-culture territory
- [ ] Castile is still the strongest single Iberian power but not stronger than Aragon + Portugal combined
- [ ] Game loads without errors
- [ ] Released countries and expanded Navarre are correctly classified by the Diplomacy package tier system

## Blocked by

- `issues/01-hook-starting-setup-on-game-start.md`

## Changes addressed

- PRD Change 4: Iberia -- Castile (all sub-items)
