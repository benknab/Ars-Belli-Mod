---
name: prd-to-issues
description: Break a PRD into independently-grabbable implementation issues using vertical slices, written to issues/. Use when user wants to convert a PRD to issues, create implementation tickets, or break down a mod change into work items.
---

# PRD to Issues

Break a PRD into independently-grabbable implementation issues for the Ars Belli EU5 mod. Issues are written as markdown files in `issues/`.

## Context

This is a mod for Europa Universalis V. Read `AGENTS.md` for project overview. Mod files live in `in_game/`. The design document sections are in `docs/`.

EU5 modding work items typically involve modifying game script files (defines, events, decisions, modifiers, scripted effects/triggers). Changes are often tightly coupled within a system but independent across systems.

## Process

### 1. Locate the PRD

Ask the user which PRD to break down. PRDs live in the `prds/` directory as markdown files.

If the PRD is not already in your context window, read it from `prds/`.

### 2. Explore the codebase

If you have not already explored the codebase, check:
- `in_game/` for existing mod files and structure
- `docs/` for the relevant design doc sections
- `AGENTS.md` for project overview and change areas

### 3. Draft vertical slices

Break the PRD into **vertical slice** issues. Each issue should be a self-contained mod change that can be implemented, tested, and merged independently.

For EU5 modding, a good vertical slice is typically:
- A single game mechanic change (e.g. "Change fort limit calculation")
- A single country setup change (e.g. "Release Syria from Mamluks")
- A single value rebalance (e.g. "Nerf logistics distance values")
- A set of related file changes that must ship together to avoid breaking the game

Slices may be:
- **AFK**: Can be implemented and merged without human review (simple value changes, straightforward file overrides)
- **HITL**: Requires playtesting or design review (balance-sensitive changes, new mechanics, UI changes)

Prefer AFK over HITL where possible. Mod value tweaks are usually AFK; new mechanics are usually HITL.

<vertical-slice-rules>
- Each slice delivers a complete, testable mod change
- A completed slice should not break the game if other slices are not yet done
- Prefer many thin slices over few thick ones
- Group changes that MUST ship together (e.g. if changing a define requires updating an event that references it)
- Mark slices that need playtesting as HITL
</vertical-slice-rules>

### 4. Quiz the user

Present the proposed breakdown as a numbered list. For each slice, show:

- **Title**: short descriptive name
- **Type**: HITL / AFK
- **Mod Package**: Starting Setup / Diplomacy / Gameplay Changes
- **Blocked by**: which other slices (if any) must complete first
- **Changes covered**: which specific changes from the PRD this addresses

Ask the user:

- Does the granularity feel right?
- Are the dependency relationships correct?
- Should any slices be merged or split further?
- Are the correct slices marked as HITL vs AFK?

Iterate until the user approves the breakdown.

### 5. Create the issue files

For each approved slice, create a markdown file in `issues/`. Create the `issues/` directory if it doesn't exist.

Use kebab-case filenames with a numeric prefix for ordering (e.g. `issues/01-release-syria-from-mamluks.md`, `issues/02-release-hejaz-from-mamluks.md`). Create issues in dependency order (blockers first) so you can reference other issue filenames in the "Blocked by" field.

<issue-template>
## Parent PRD

`prds/<prd-filename>.md`

## Mod Package

Starting Setup / Diplomacy / Gameplay Changes

## What to change

A concise description of this mod change. Describe the gameplay effect and the specific values/mechanics being modified. Reference the parent PRD rather than duplicating content.

## Mod files involved

- List of files in `in_game/` to create or modify
- Whether each is an override, injection, or new file

## Acceptance criteria

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Game loads without errors with this change applied
- [ ] Change produces expected gameplay effect (describe how to verify)

## Blocked by

- Blocked by `issues/<issue-filename>.md` (if any)

Or "None - can start immediately" if no blockers.

## Changes addressed

Reference by number from the parent PRD:

- Change 1: description
- Change 3: description

</issue-template>

Do NOT modify the parent PRD file.
