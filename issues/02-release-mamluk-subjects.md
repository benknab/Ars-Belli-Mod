# Release Hejaz, Syria, Quds from Mamluks

## Status

Done

## Parent PRD

`prds/starting-setup.md`

## Mod Package

Starting Setup

## Type

HITL

## What to change

At bookmark start, release Mamluk outlying territories as independent countries and add truces to prevent immediate reconquest:

1. **Release Hejaz** (western Arabian Peninsula) as independent from the Mamluks.
2. **Release Syria** (Levantine interior) as independent from the Mamluks.
3. **Release Quds** (Palestine/southern Levant) as independent from the Mamluks.
4. **Free all starting Mamluk vassals** as fully independent countries.
5. **Add 5-year truces** between the Mamluks and each released/freed country. Released countries do NOT get truces with each other.

Implementation notes:
- Implement this in bookmark/start files so the changes are visible in the lobby and country picker from day 0.
- Use `main_menu/setup/start/10_countries.txt` for ownership and country setup changes.
- Use `main_menu/setup/start/12_diplomacy.txt` for removing vanilla Mamluk subject links.
- Use `main_menu/setup/start/16_wars.txt` for adding 5-year truces at start.
- Preserve vanilla formatting/order and annotate changed spots with short explanatory comments.
- The current implementation uses the vanilla tags `MDA` (Hejaz stand-in), `FDL` (Syria stand-in), and `KOJ` (repurposed as Quds/Jerusalem).

## Mod files involved

- `main_menu/setup/start/10_countries.txt` -- **Modify**. Remove direct Mamluk ownership in the Levant/northern Hejaz and set up `FDL`, `MDA`, and `KOJ` territory.
- `main_menu/setup/start/12_diplomacy.txt` -- **Modify**. Remove vanilla Mamluk subject links for the released countries.
- `main_menu/setup/start/16_wars.txt` -- **Modify**. Add 5-year truces between `MAM` and each released/freed country.

## Acceptance criteria

- [x] Hejaz, Syria, and Quds exist as independent countries at game start
- [x] All former Mamluk vassals are independent at game start
- [x] 5-year truces exist between Mamluks and each released/freed country
- [x] No truces exist between the released countries themselves
- [x] Mamluks retain their Nile Delta core territory
- [x] Game loads without errors
- [x] Released countries are correctly classified by the Diplomacy package tier system

## Blocked by

None.

## Changes addressed

- PRD Change 1: Middle East -- Mamluks (all sub-items)
