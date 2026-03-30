# Weaken Hungary: Release Croatia, Bosnia, Albanian Minors; Grant Golden Bull

## Status

Todo

## Parent PRD

`prds/starting-setup.md`

## Mod Package

Starting Setup

## Type

HITL

## What to change

At bookmark start, reduce Hungary's dominance in the Balkans through territorial releases and an economic constraint:

1. **Release Croatia** as an independent country from Hungary.
2. **Release Bosnia** as an independent country from Hungary.
3. **Release Albanian minors** from Naples as independent. The specific tags are left to implementation -- research which Albanian tags exist in vanilla under Naples' control or sphere.
4. **Auto-grant the Golden Bull of 1222** noble privilege to Hungary at game start. This slows Hungary's economy, reflecting the historical noble concessions that limited royal power.

Implementation notes:
- Research vanilla tags for Croatia and Bosnia. Verify they are releasable from Hungary in the 1337 start.
- Research which Albanian tags exist under Naples' control. These may be vassals, cores, or directly owned provinces. Identify the appropriate tags to release.
- Research the Golden Bull of 1222 privilege. Verify it exists in vanilla as a noble estate privilege. If it exists, use `add_estate_privilege` or equivalent to grant it. If it doesn't exist, a custom privilege or modifier may need to be created under `common/estates/`.
- The Golden Bull should have a significant economic penalty to meaningfully slow Hungary's scaling.
- Implement territorial releases in bookmark/start files so the changes are visible in the lobby and country picker from day 0.
- Use `main_menu/setup/start/10_countries.txt` for ownership and country setup changes.
- Use `main_menu/setup/start/12_diplomacy.txt` if Hungary or Naples start with subject or other diplomatic links that must be removed/adjusted.
- If the Golden Bull must be granted in a way the bookmark files cannot express cleanly, keep that specific piece as a runtime hook.
- Preserve vanilla formatting/order and annotate changed spots with short explanatory comments.

## Mod files involved

- `main_menu/setup/start/10_countries.txt` -- **Modify**. Release Croatia, Bosnia, and Albanian minors in the bookmark state.
- `main_menu/setup/start/12_diplomacy.txt` -- **Modify if needed**. Remove or adjust starting diplomatic links.
- Possibly `in_game/common/estates/` or a runtime hook -- **Modify if needed** for granting the Golden Bull of 1222 privilege.

## Acceptance criteria

- [ ] Croatia exists as an independent country at game start
- [ ] Bosnia exists as an independent country at game start
- [ ] Albanian minors exist as independent countries at game start (no longer under Naples)
- [ ] Hungary starts with the Golden Bull of 1222 noble privilege active
- [ ] Hungary retains its core Hungarian territory but is meaningfully weakened
- [ ] The Balkans have more breathing room for Byzantium, Serbia, and Bulgaria
- [ ] Game loads without errors
- [ ] Released countries are correctly classified by the Diplomacy package tier system

## Blocked by

None.

## Changes addressed

- PRD Change 6: Balkans -- Hungary (all sub-items)
