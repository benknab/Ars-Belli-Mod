# Weaken Castile: Release Galicia, Leon, Expand Navarre

## Status

Todo

## Parent PRD

`prds/starting-setup.md`

## Mod Package

Starting Setup

## Type

HITL

## What to change

At bookmark start, reduce Castile's dominance in Iberia by releasing two countries and expanding a third:

1. **Release Galicia** as an independent country from Castile.
2. **Release Leon** as an independent country from Castile.
3. **Transfer Basque culture provinces** from Castile to Navarre.

Implementation notes:
- Research vanilla tags for Galicia and Leon. Verify they exist as releasable tags from Castile in the 1337 start.
- For the Basque province transfer, identify all provinces with Basque culture in Castile's starting territory. This may require a culture-based scope or hardcoded province IDs.
- Verify that the expanded Navarre is not disproportionately strong for its intended role as a small buffer state.
- The goal is Castile remaining the strongest Iberian power, but close enough to Aragon + Portugal that diplomacy as equals is viable.
- Implement this in bookmark/start files so the changes are visible in the lobby and country picker from day 0.
- Use `main_menu/setup/start/10_countries.txt` for ownership and country setup changes.
- Use `main_menu/setup/start/12_diplomacy.txt` if Castile starts with subject or other diplomatic links that must be removed/adjusted.
- Preserve vanilla formatting/order and annotate changed spots with short explanatory comments.

## Mod files involved

- `main_menu/setup/start/10_countries.txt` -- **Modify**. Release Galicia and Leon and transfer Basque provinces to Navarre in the bookmark state.
- `main_menu/setup/start/12_diplomacy.txt` -- **Modify if needed**. Remove or adjust starting diplomatic links.

## Acceptance criteria

- [ ] Galicia exists as an independent country at game start
- [ ] Leon exists as an independent country at game start
- [ ] Navarre controls all Basque culture provinces that were previously Castilian
- [ ] Castile retains its core Castilian-culture territory
- [ ] Castile is still the strongest single Iberian power but not stronger than Aragon + Portugal combined
- [ ] Game loads without errors
- [ ] Released countries and expanded Navarre are correctly classified by the Diplomacy package tier system

## Blocked by

None.

## Changes addressed

- PRD Change 4: Iberia -- Castile (all sub-items)
