# Release Burgundy and Flanders from France

## Parent PRD

`prds/starting-setup.md`

## Mod Package

Starting Setup

## Type

HITL

## What to change

At game start, release two countries from France to curb French snowballing:

1. **Release Burgundy** as an independent country from France.
2. **Release Flanders** as an independent country from France.

No truces are specified for these releases (unlike the Mamluk changes). No changes to England at this time -- England adjustments are deferred to playtesting.

Implementation notes:
- Research the vanilla tags for Burgundy and Flanders and verify they are releasable from France in the 1337 start.
- Verify which provinces constitute Burgundy vs. Flanders to ensure the split is historically appropriate.
- Both countries already have some unique content in vanilla, so they should be functional as independent tags.

## Mod files involved

- `in_game/common/scripted_effects/starting_setup_effects.txt` -- **Modify**. Fill in the France regional effect with release logic for Burgundy and Flanders.

## Acceptance criteria

- [ ] Burgundy exists as an independent country at game start with appropriate territory
- [ ] Flanders exists as an independent country at game start with appropriate territory
- [ ] France retains its core territory (Ile-de-France, etc.)
- [ ] France is weakened but still a viable major power pick
- [ ] Game loads without errors
- [ ] Released countries are correctly classified by the Diplomacy package tier system

## Blocked by

- `issues/01-hook-starting-setup-on-game-start.md`

## Changes addressed

- PRD Change 3: France and the Hundred Years' War (all sub-items)
