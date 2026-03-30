# Playtest Follow-up: England, Scotland, and Eastern France Starting Setup

## Status

Todo

## Parent PRD

`prds/starting-setup.md`

## Mod Package

Starting Setup

## Type

HITL

## What to change

At bookmark start, implement the playtest follow-up items that still fit the temporary `Starting Setup` package:

1. **Grant the surrounding Bar lands to Verdun.** Research which Bar-held provinces around Verdun should transfer so Verdun has a cleaner, more defensible shape.
2. **Release Valentinois** as an independent country instead of a French vassal.
3. **Release Wales** from English overlordship so it starts independent rather than as an English dominion.
4. **Extend the English northern beachhead** on the continent so England has a coastal landing point that is covered by fort Zone of Control.
5. **Add a new fort in Montendre** in Aquitaine.
6. **Extend the England-Scotland truce to 15 years** so Scotland has more time to stabilize after start.
7. **Adjust Scottish defensive setup** by moving forts around in Scotland and, if appropriate, moving the Dunbar province modifier to Selkirk.

Explicitly out of scope for this issue:
- **Do not add new Scottish country content** such as custom longbowmen bonuses, levy size bonuses, or infantry combat power bonuses. Those are country-content changes, not temporary start-state setup.

Implementation notes:
- Keep this issue limited to bookmark/start-state data changes that are visible from day 0 in the lobby and country picker.
- Research the exact province list for the Bar-to-Verdun transfer instead of hardcoding from the recommendation wording alone.
- Wales already exists in vanilla bookmark data; this change should be implemented by removing its English subject status and ensuring its start remains viable.
- Valentinois already exists in vanilla bookmark data; this change should be implemented by removing its French subject status.
- For the northern English beachhead, verify both the landing access and the fort ZoC interaction in-game so the position is actually usable in MP.
- For the Scottish fort and modifier changes, prefer the smallest set of edits that improves Scotland's early defensive posture without adding bespoke mechanics.
- Preserve vanilla formatting/order and annotate changed spots with short explanatory comments.

## Mod files involved

- `main_menu/setup/start/10_countries.txt` -- **Modify**. Transfer Bar-border provinces to Verdun, make Valentinois and Wales independent in the bookmark state, extend the English continental foothold, add the Montendre fort, and adjust Scottish forts/modifiers if those are represented here.
- `main_menu/setup/start/12_diplomacy.txt` -- **Modify**. Remove `ENG -> WLS` dominion status and `FRA -> VLN` vassal status; adjust any related diplomatic links if needed.
- `main_menu/setup/start/16_wars.txt` -- **Modify**. Extend the England-Scotland truce from 4 years to 15 years.

## Acceptance criteria

- [ ] Verdun starts with the researched Bar-border provinces needed for the intended border cleanup
- [ ] Valentinois exists as an independent country at game start
- [ ] Wales exists as an independent country at game start
- [ ] England's northern continental holdings include a valid coastal landing point protected by fort Zone of Control
- [ ] Montendre starts with a fort
- [ ] England and Scotland begin with a 15-year truce
- [ ] Scotland's fort layout is updated as intended, and the Dunbar modifier is moved to Selkirk if that change proves to be representable and desirable in start data
- [ ] No new custom Scottish country content is introduced as part of this issue
- [ ] Game loads without errors
- [ ] Affected countries are correctly classified by the Diplomacy package tier system

## Blocked by

None.

## Changes addressed

- PRD Change 3 follow-up: England-side balance changes deferred to playtesting
- Playtest follow-up: eastern France border cleanup and Scottish defensive setup adjustments
