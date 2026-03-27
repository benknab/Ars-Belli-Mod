# Starting Setup

## Problem Statement

The 1337 start date is severely unbalanced for multiplayer. The Mamluks can overrun any Middle Eastern neighbor, France snowballs beyond containment after the first session, and several other countries (Jalayirids, Castile, Bohemia, Hungary) dominate their regions so thoroughly that neighboring players have no viable path to independence or growth. This kills dynamism in MP lobbies -- games revolve around containing specific countries rather than emergent diplomacy and conflict.

## Design Doc Reference

`docs/03-starting-setup.md` -- the entire section.

## Mod Package

Starting Setup

## Solution

Release historically appropriate countries from overpowered tags at game start, add truces to prevent immediate reconquest, and adjust governments where necessary. These changes create breathing room for neighboring players to establish themselves diplomatically and militarily before the dominant power can reassert control.

All changes fire via a scripted effect on `on_game_start` and are always active when the mod is loaded (not toggleable via game rules). This is the baseline the mod assumes for balance.

## Detailed Changes

### 1. Middle East -- Mamluks

Release the following countries from the Mamluks as independent:
- **Hejaz** -- western Arabian Peninsula
- **Syria** -- Levantine interior
- **Quds** -- Palestine/southern Levant
- **All starting Mamluk vassals** -- released as fully independent

Add **5-year truces** between the Mamluks and each released country. Released countries do NOT get truces with each other -- they are free to interact immediately.

**Rationale (Balance):** The Mamluks' core in the Nile Delta remains extremely strong (dense population, malaria defense, strong content). These changes only strip their outlying territories, giving neighbors time to negotiate borders or contest them before Mamluks can project power outward.

### 2. Middle East -- Jalayirids

- **Change government** from Horde to Monarchy. The specific monarchy type is left to implementation (pick the most appropriate type available for the tag/culture/religion combination).
- **Release the Eretnids** in Anatolia as an independent country.

**Rationale (Balance + Dynamism):** Horse Archer strength combined with Horde government bugs makes Jalayirids disproportionately powerful. The government change removes the bugged mechanics while the Eretnid release opens Anatolia so that Ottomans, Byzantium, or other Anatolian/Balkan powers have room to emerge.

### 3. France and the Hundred Years' War

Release the following countries from France as independent:
- **Burgundy**
- **Flanders**

No corresponding changes to England at this time. England adjustments (Pale, Wales, Northumbria) are deferred to playtesting -- if France becomes too weak relative to England after these changes, England-side releases will be considered.

**Rationale (Balance + Dynamism):** France's farmland density, flat terrain, and river network give it enormous long-term scaling. Burgundy and Flanders already have some unique content and are historically appropriate. Burgundy specifically blocks France's eastward expansion into the HRE, improving dynamics in that region as well.

### 4. Iberia -- Castile

- **Release Galicia** as independent from Castile.
- **Release Leon** as independent from Castile.
- **Transfer Basque culture provinces** to Navarre.

**Rationale (Balance):** Castile is currently stronger than Aragon and Portugal combined. These changes leave Castile as the strongest Iberian power but bring the power level close enough that diplomacy between equals becomes viable rather than inevitable Castilian domination.

### 5. HRE -- Bohemia

- **Release a unified Silesia** tag (combining the Silesian minors into one country) along with the Upper Lusatia province.

**Rationale (Dynamism):** Bohemia can currently gobble up smaller HRE members (e.g., Meissen) on day one with no resistance. Silesia as a unified buffer state gives smaller HRE tags room to breathe and makes the region more dynamic. This is admittedly a stopgap until proper HRE content is implemented.

### 6. Balkans -- Hungary

- **Release Croatia** as independent from Hungary.
- **Release Bosnia** as independent from Hungary.
- **Release Albanian minors** from Naples as independent. The specific tags are left to implementation (research available vanilla Albanian tags in the Naples sphere).
- **Auto-grant the Golden Bull of 1222** noble privilege to Hungary at game start.

**Rationale (Balance + Dynamism):** Hungary currently dominates the Balkans despite historically being constrained by internal politics and entanglements in Naples and Poland. Croatia and Bosnia as independent states create room for Byzantium, Serbia, and Bulgaria. The Golden Bull privilege slows Hungary's economy, reflecting the historical noble concessions that limited royal power. The Albanian releases create additional small playable states and reduce Naples' Balkan footprint.

## Mod File Changes

| File Path (relative to `in_game/`) | Change Type | Description |
|---|---|---|
| `common/scripted_effects/starting_setup_effects.txt` | New file | Scripted effect containing all country releases, government changes, truce additions, privilege grants, and province transfers. One effect per region for clarity. |
| `common/on_action/mp_limits_on_actions.txt` | Modify (existing) | Add call to the starting setup scripted effect in the `on_game_start` on_action block, before the existing MP limits initialization. |

Additional files may be needed depending on EU5 modding API specifics:
- If releasing countries requires history overrides rather than runtime scripted effects, `history/` files for affected countries will need to be created or overridden.
- If the unified Silesia tag does not exist in vanilla, a new country definition may be needed under `common/country_tags/` and `history/countries/`.
- If the Golden Bull of 1222 privilege does not exist in vanilla or cannot be granted via script, a custom privilege or modifier may need to be created under `common/estates/`.
- If Basque culture province identification requires a scripted trigger, add it to `common/scripted_triggers/`.

## Balance Considerations

- **France vs. England:** The biggest risk. Releasing Burgundy and Flanders weakens France significantly while England is untouched. If playtesting shows England becoming the new dominant power, compensating England releases (Pale, Wales, Northumbria) should be implemented as a follow-up. This is explicitly flagged for playtesting.
- **Mamluk core remains strong:** Even after releases, the Nile Delta core gives Mamluks excellent scaling. The 5-year truce window may not be enough if released countries lack content or player interest. Monitor whether Mamluks reconquer everything within the first 10-15 years.
- **Cascading weakness:** Weakening multiple major powers simultaneously could create power vacuums that lead to unexpected dominators (e.g., a untouched Timurids filling the Middle Eastern vacuum). Monitor for unintended beneficiaries.
- **Silesia viability:** A unified Silesia needs enough starting development and military to survive initial aggression, not just from Bohemia but also from Poland or Brandenburg. Verify the combined Silesian minor development is sufficient.
- **Albanian minor viability:** Very small tags may be unplayable dead-ends. Verify they have enough development and content to be worth claiming in a lobby.
- **Interaction with Diplomacy package:** Released countries will be classified into the country tier system (likely Small or Minor Power). Verify their tier assignment doesn't create weird alliance point situations.
- **Navarre expansion:** Transferring Basque provinces to Navarre needs to ensure Navarre doesn't become disproportionately strong for its role as a small buffer state.

## Playtest Requirements

- **Minimum 2 full MP sessions** with the complete starting setup changes active alongside the Diplomacy package.
- **France vs. England balance:** Dedicated testing with competent players on both sides. Track: relative power score at years 10, 25, 50; territorial extent; alliance networks formed.
- **Mamluk reconquest speed:** Track how quickly Mamluks can reconquer released territories. If they consistently reconquer everything within 10 years, the truce length or release scope needs adjustment.
- **Jalayirid viability post-change:** Verify that Monarchy government + loss of Eretnid territory doesn't make Jalayirids unplayable -- they should be weaker but still a viable pick.
- **HRE dynamics:** Monitor whether smaller tags (Meissen, etc.) actually survive longer with Silesia acting as a buffer.
- **Balkan dynamics:** Check whether Croatia, Bosnia, and Albanian minors create the intended breathing room for Byzantium/Serbia/Bulgaria or just become easy conquests for other powers.
- **Overall lobby feel:** The goal is more viable country picks and more emergent diplomacy. Count the number of "unplayable" countries in each region before and after changes.

## Dependencies

- **Diplomacy package (implemented):** The country tier system and alliance points are already active. Starting setup changes will interact with tier classification -- newly released countries will be ranked. No conflicts expected but verify.
- **Fort limit rework (implemented):** Released countries will have their own fort limits. No conflicts expected.
- **PDX patches:** Horde government bug fixes from PDX could change the calculus on Jalayirids. If PDX fixes the bugs, the government change may be reconsidered. The Eretnid release would still stand.
- **Future DLC:** Per design doc principles, countries slated for DLC focus should not receive permanent content changes until after official content ships. Starting setup changes are explicitly temporary quick fixes.

## Out of Scope

- **Permanent country content:** This PRD covers quick-fix balance adjustments only. Unique content for released countries (missions, events, decisions) is future work.
- **England-side balance changes:** Deferred to playtesting results. If needed, a follow-up PRD will cover Pale, Wales, and/or Northumbria releases.
- **Economy/trade rebalancing:** The design doc acknowledges these are WIP and deferred until PDX stabilizes core systems.
- **HRE mechanics fixes:** The Silesia release is a stopgap. Proper HRE content (Imperial Authority, Diet mechanics, etc.) is separate future work.
- **Jalayirid unique content rework:** Changing their government is a quick fix. Proper Horde mechanics or Jalayirid-specific content is out of scope.
- **Game rule toggles:** These changes are always active. If demand arises for configurability, that's a separate enhancement.
