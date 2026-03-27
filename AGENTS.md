# AGENTS.md

## Project Overview

Ars Belli is a multiplayer-focused mod for Europa Universalis V (EU5). The vanilla game is balanced primarily for singleplayer; this mod aims to fix that for competitive MP lobbies by improving **Balance**, **Dynamism**, and **Playability**.

## Design Document

The source of truth for all planned changes is the Google Doc:
https://docs.google.com/document/d/1VPUVjGxkVeCmzmg8pG48wF0XbuIY_n3DjZziTgRjhWE

A markdown snapshot is synced to `docs/` via:

```sh
deno run --allow-net --allow-write --allow-read scripts/sync-doc.ts
```

## Mod Structure

The mod is split into three packages that can be used independently:

1. **Starting Setup** -- Temporary balance fixes (releasing vassals, adjusting borders) for countries like Mamluks, France, Castile, Bohemia, Hungary. Discarded once proper country content replaces them.
2. **Diplomacy** -- Turns MP lobby rules into game mechanics: Country Tiers (GP/Major/Normal/Small/Minor), Alliance Points, Defensive Points, Guarantees, Intervention limits, coalition tweaks, etc.
3. **Gameplay Changes** -- The main mod with reworks to military (forts, logistics, unit balance), navies/trade, technology (institutions, advancements, age focuses), and eventually economy/control.

## Repository Structure

- `in_game/` -- Mod files loaded by the game engine
- `main_menu/` -- Main menu mod assets
- `docs/` -- Auto-generated markdown from the design document (do not edit by hand)
- `scripts/sync-doc.ts` -- Deno script to sync Google Doc to `docs/`
- `deploy.ps1` / `release.ps1` / `watch.ps1` -- Build and deployment scripts

## Key Change Areas

### Starting Setup
- Mamluks: Release Hejaz, Syria, Quds; add truces with released countries
- France: Release Burgundy and Flanders as independent; balance against England
- Iberia: Weaken Castile by releasing Galicia, Leon; expand Navarre
- HRE: Possibly release unified Silesia from Bohemia
- Balkans: Release Croatia and Bosnia from Hungary

### Diplomacy
- 5-tier country system (Great/Major/Normal/Small/Minor Power) replacing Hegemonies
- Alliance Points (6 base), Defensive Points (1-5 based on tier), ally cost scaling
- GP/MP-exclusive actions: Guarantee, Intervene, Enforce Peace, Violate Sovereignty
- Disallow player vassalization (except Colonial Nations)
- Holy War cooldowns (100yr timer), coalition rebalancing
- Peace deal improvements: two-sided deals, extended truce option, war goal scoring changes

### Military
- Fort limit rework: forts cost Fort Level in limit; new limit calculation
- Logistics overhaul: 2x food consumption, nerfed logistics distance, buffed supply depots/units
- Reinforcement nerfs: 20% base (down from 25%), attackers reinforce at 25% in enemy territory
- Stackwipe ratio raised from 10x to 20x
- Unit category rebalance: levies cheap but political cost, regulars expensive but scalable, mercs short-term only

### Technology
- Institution spread nerfs (trade spread -25%, "could have spawned" modifier -50%)
- Advancement tree reorganization (group by gameplay area, remove illogical prereqs)
- Age Focuses reworked: 2 picks per age (1 Economic + 1 Military), 3 options each

### Navies and Trade (WIP)
- Trade Offices: 10x effect, 10x price, limited to cities, one per location
- Transport ships contribute Trade Capacity to markets
- Building rights disallowed by default, negotiation-based

### Control and Economy (WIP)
- Deferred until PDX stabilizes core economy systems
