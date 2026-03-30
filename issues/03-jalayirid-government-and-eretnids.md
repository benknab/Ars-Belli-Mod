# Change Jalayirid Government and Release Eretnids

## Status

Todo

## Parent PRD

`prds/starting-setup.md`

## Mod Package

Starting Setup

## Type

HITL

## What to change

At bookmark start, change the Jalayirid government type and release their Anatolian territory:

1. **Change Jalayirid government** from Horde to Monarchy. Pick the most appropriate monarchy type for their culture/religion combination. Research available government types in vanilla and select one that preserves flavor without the bugged Horde mechanics.
2. **Release the Eretnids** in Anatolia as an independent country. This opens up Anatolia so Ottomans, Byzantium, or other regional powers can emerge.

Implementation notes:
- Research the Jalayirid tag name in vanilla EU5 (likely `JAL` or similar).
- Research which government reform/type is appropriate for an Ilkhanid-successor Islamic monarchy.
- Research the Eretnid tag and their historical Anatolian territory to ensure the correct provinces are released.
- Prefer bookmark/start-file implementation if the government and Eretnid setup need to be visible from lobby/day 0.
- Use `main_menu/setup/start/10_countries.txt` for country ownership and government setup.
- Use `main_menu/setup/start/12_diplomacy.txt` only if subject links or other starting diplomacy must change.
- Preserve vanilla formatting/order and annotate changed spots with short explanatory comments.

## Mod files involved

- `main_menu/setup/start/10_countries.txt` -- **Modify**. Update the Jalayirid government setup and release Eretnid territory from the bookmark state.
- `main_menu/setup/start/12_diplomacy.txt` -- **Modify if needed**. Remove or adjust starting subject links.

## Acceptance criteria

- [ ] Jalayirids start with a Monarchy government type (not Horde)
- [ ] Eretnids exist as an independent country in Anatolia at game start
- [ ] Jalayirids retain their core Mesopotamian/Iranian territory
- [ ] Jalayirids are still a viable pick (weakened but playable)
- [ ] Game loads without errors
- [ ] No Horde-specific bugs affect the Jalayirids post-change

## Blocked by

None.

## Changes addressed

- PRD Change 2: Middle East -- Jalayirids (all sub-items)
