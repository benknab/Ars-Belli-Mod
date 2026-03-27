# Release Hejaz, Syria, Quds from Mamluks

## Parent PRD

`prds/starting-setup.md`

## Mod Package

Starting Setup

## Type

HITL

## What to change

At game start, release Mamluk outlying territories as independent countries and add truces to prevent immediate reconquest:

1. **Release Hejaz** (western Arabian Peninsula) as independent from the Mamluks.
2. **Release Syria** (Levantine interior) as independent from the Mamluks.
3. **Release Quds** (Palestine/southern Levant) as independent from the Mamluks.
4. **Free all starting Mamluk vassals** as fully independent countries.
5. **Add 5-year truces** between the Mamluks and each released/freed country. Released countries do NOT get truces with each other.

Implementation notes:
- Research which vanilla tags correspond to Hejaz, Syria, and Quds. Verify they exist as releasable tags in the 1337 start.
- Identify all starting Mamluk vassals programmatically (iterate subjects) rather than hardcoding, in case PDX changes the vassal list.
- The truce mechanism needs research -- EU5 may use `add_truce` or a similar effect. Verify the correct syntax for setting a 5-year (60-month) truce.

## Mod files involved

- `in_game/common/scripted_effects/starting_setup_effects.txt` -- **Modify**. Fill in the Mamluk regional effect with release logic, vassal freeing, and truce additions.

## Acceptance criteria

- [ ] Hejaz, Syria, and Quds exist as independent countries at game start
- [ ] All former Mamluk vassals are independent at game start
- [ ] 5-year truces exist between Mamluks and each released/freed country
- [ ] No truces exist between the released countries themselves
- [ ] Mamluks retain their Nile Delta core territory
- [ ] Game loads without errors
- [ ] Released countries are correctly classified by the Diplomacy package tier system

## Blocked by

- `issues/01-hook-starting-setup-on-game-start.md`

## Changes addressed

- PRD Change 1: Middle East -- Mamluks (all sub-items)
