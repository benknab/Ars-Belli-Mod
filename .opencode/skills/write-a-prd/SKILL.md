---
name: write-a-prd
description: Create a PRD for an Ars Belli mod change through user interview, design doc review, and codebase exploration, then write it to prds/. Use when user wants to write a PRD, plan a mod feature, or design a gameplay change.
---

This skill creates a PRD for the Ars Belli EU5 multiplayer mod. You may skip steps if you don't consider them necessary.

## Context

This is a mod for Europa Universalis V focused on multiplayer balance. The design document lives in `docs/` (synced from a Google Doc). Read `AGENTS.md` for project overview.

The mod is split into three packages: Starting Setup, Diplomacy, and Gameplay Changes. All planned changes must align with the three core objectives: **Balance**, **Dynamism**, and **Playability**.

## Process

1. Ask the user for a detailed description of the gameplay problem they want to solve and any ideas for solutions. Encourage them to reference specific sections of the design doc in `docs/`.

2. Read the relevant `docs/` files to understand how this change fits into the overall mod plan. Cross-reference with `AGENTS.md` for the key change areas. Check the `in_game/` mod files to understand the current state of implementation.

3. Interview the user about every aspect of this change until you reach a shared understanding. For each decision, consider:
   - How does this affect **Balance** between countries/playstyles?
   - How does this affect **Dynamism** (does it prevent stagnation)?
   - How does this affect **Playability** (is it clear, readable, not too complex)?
   - Which mod package does this belong to (Starting Setup / Diplomacy / Gameplay Changes)?
   - Does this interact with or depend on other planned changes?

4. Sketch out the major mod file changes needed. For EU5 mods this typically means:
   - Which game files need to be modified or overridden (defines, events, decisions, modifiers, etc.)
   - What new content needs to be created (scripted effects, scripted triggers, on_actions, etc.)
   - What vanilla values are being changed and to what
   - Whether this requires new UI elements or tooltip changes

   Check with the user that these changes match their expectations. Identify which changes need playtesting.

5. Once you have a complete understanding, use the template below to write the PRD. Save it as a markdown file in `prds/` with a descriptive kebab-case filename (e.g. `prds/fort-limit-rework.md`). Create the `prds/` directory if it doesn't exist.

<prd-template>

## Problem Statement

The gameplay problem this change addresses, from the player's perspective. Reference the relevant section of the design doc.

## Design Doc Reference

Which section(s) of the design document this implements or relates to.

## Mod Package

Which package this belongs to: Starting Setup / Diplomacy / Gameplay Changes.

## Solution

The proposed solution, described in terms of gameplay effects the player will experience.

## Detailed Changes

A numbered list of specific changes. For each change include:
- The vanilla value or behavior being changed
- The new value or behavior
- The rationale (balance/dynamism/playability)

## Mod File Changes

A list of game files that need to be created or modified:
- File path relative to `in_game/`
- What type of change (override, inject, new file)
- Brief description of the change

Do NOT include full file contents. Reference vanilla file paths where relevant.

## Balance Considerations

- How this affects different country types (GP, Major, Normal, Small, Minor)
- Potential for unintended interactions with other systems
- Edge cases to watch for

## Playtest Requirements

- What to test and how to verify correctness
- What metrics or gameplay situations to monitor
- Minimum number of sessions or scenarios needed

## Dependencies

- Other mod changes this depends on or interacts with
- PDX patches or DLC that could affect this

## Out of Scope

Things explicitly not addressed by this change.

</prd-template>
