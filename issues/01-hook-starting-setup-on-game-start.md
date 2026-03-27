# Hook Starting Setup into on_game_start

## Parent PRD

`prds/starting-setup.md`

## Mod Package

Starting Setup

## Type

AFK

## What to change

Create the scaffolding for all Starting Setup changes. This means:

1. Create a new `starting_setup_effects.txt` file with empty placeholder scripted effects for each region (Mamluks, Jalayirids, France, Castile, Bohemia, Hungary). Each region gets its own named effect so they can be implemented independently.
2. Create a top-level `starting_setup_game_start_effect` that calls all regional effects.
3. Wire this top-level effect into the existing `on_game_start` on_action in `mp_limits_on_actions.txt`, running it **before** the MP limits initialization (so released countries exist before tier classification runs).

The empty effects should be no-ops that do nothing until the regional issues fill them in. This ensures the mod loads cleanly at every step.

## Mod files involved

- `in_game/common/scripted_effects/starting_setup_effects.txt` -- **New file**. Contains empty regional scripted effects and the top-level caller.
- `in_game/common/on_action/mp_limits_on_actions.txt` -- **Modify existing**. Add a new on_action for starting setup that calls the top-level effect, and reference it from `on_game_start`.

## Acceptance criteria

- [ ] `starting_setup_effects.txt` exists with named effects for each region (all no-ops)
- [ ] `on_game_start` calls the starting setup effect before MP limits initialization
- [ ] Game loads without errors with the mod active
- [ ] No gameplay changes -- this is pure scaffolding

## Blocked by

None - can start immediately.

## Changes addressed

This issue is infrastructure for all PRD changes (1-6). It does not implement any gameplay changes itself.
