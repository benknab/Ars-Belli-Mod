# Diplomacy

## Overview

The one aspect of the game where the gameplay between Single Player and Multi Player is the most fundamentally different is *Diplomacy.* A lot of mechanics that represent ‘soft’ factors in the relations between countries such as *Diplomatic Reputation*, *Trust*, to some extent even *Opinion* lose their meaning when applied to players. On the other hand some mechanics that are appropriate when used in SP against an AI country become completely overpowered and conceptually simply don’t belong when used against a Human in MP such as force-breaking an alliance with *Favors* or the restriction for *Guarantees* where the one receiving the Guarantee has to have a positive opinion of the Guarantor country.

The absolute greatest issue, however, is not necessarily inherent to the mechanics of the game itself. It is the fact that by default player alliances heavily favour the already strong, and diplomacy tends to revolve around the few strongest countries as it is the path of least resistance. The root cause of the problem is the greater **effort** and **trust** required for **coordinating** a larger number of weaker countries. This effect is even more pronounced the less players know each other and the less experienced they are. While we cannot change human nature and the coordination problem is simply inherent to dealing with a larger number of actors, we can tweak in-game mechanics to the point where allying with the weak becomes an **equally viable alternative** or situationally the best option.

To solve the above issues and facilitate a more dynamic game environment where countries *rise* and *fall* (as opposed to the winners winning ever more) **we need a comprehensive solution** that tweaks all aspects of diplomacy with this goal in mind.

## Problems with GP scoring, Hegemonies and War Termination

The game currently uses two things to differentiate countries by power level, the **Power Score** where the highest scoring countries are considered **Great Powers** and the **Hegemonies** system where the GPs strongest in a certain area gain the corresponding *Hegemony*. There are several issues with this that combine to make these systems barely functional in MP. First of all the fact that scoring is global leads to a situation where AI countries in Asia often take up most slots instead of Players in Europe (this could be mitigated by changing the scoring, or as a last resort simply disallowing AI from taking up slots). As for *Hegemonies,* in their current implementation they are basically a win-more mechanic and they are also a bit of a confused mess: what even is a *‘Diplomatic Hegemon’?* A hegemon is someone who dominates a field - how do you even *dominate* diplomacy? Some of the diplomatic actions granted, such as ‘Violate Sovereignty’ and ‘Influence Country’ also make a lot more sense to be usable by all GPs. One more problem area (that is also closely related to military mechanics) is how wars are incentivized to grow in scope and once started generally never end with a limited negotiated peace, but go until one side reaches 100% warscore or is about to reach it - this if fine to happen in certain cases, but not if the system creates this outcome in almost every war.

**Before we continue:** First, I am not going to explain Alliance Points, Defensive Points etc. I am assuming everyone reading this is familiar with our *old rules*. Second, the game uses the term **‘Country Rank’** to refer to County/Duchy - basically ‘de jure’ titles. I am going to use the term **‘Country Tier’** to refer to my proposed system for categorizing countries. I apologize if it’s a bit confusing but it’s what came to mind!

## Country Tiers

As the first step towards a solution we need to differentiate between countries by sorting them into a set of categories or **‘Country** **Tiers’** based on their power level. The strongest countries will have extended abilities to influence others, intervene in wars, and give guarantees while *costing more* for others to ally with and having less **‘Defensive Points’**. On the other hand smaller countries will lack these extended diplomatic options but instead an alliance with them will be *cheaper* and they will receive more *defensive points* to give them a better chance at survival. While more *granularity* in how the Tiers scale is generally good, it is important to keep the number of tiers limited and the boundaries between them clearly defined so that players can fully understand and play around them. So let’s begin with the basics:

**Great Powers >>> Major Powers >>> Normal Powers >>> Small Powers >>> Minor Powers**

- **Normal Powers:** Every country falls in this category unless it is eligible for another.
  - Has 6 ‘Alliance Points’
  - Has 3 ‘Defensive Points’
  - Costs 3 points to ally or be in a league with
  - Can ally with Great Powers
  - Cannot give ‘Guarantees’ to other countries
  - Can receive ‘Guarantees’

For the strongest countries using the default Power Score (GP score) system *with tweaks* is sufficient as **comparing relative strength** of countries feels appropriate on the top end. Whoever is strongest gets the actions and restrictions of being a *Great or Major Power* - **no absolute threshold** to hit.

- **Great Powers:** the top 6 (?) strongest eligible countries by Power Score.
  - Has 6 ‘Alliance Points’
  - *Has 2 less* ‘Defensive Points’ for 1 total
  - *Costs 2 more* points to ally or be in a league with for a total *cost of 5*
  - *Cannot* ally with other Great Powers
  - *Can* give ‘Guarantees’ to other countries
  - *Cannot* receive ‘Guarantees’
  - Can ‘Intervene’ and ‘Enforce Peace’ against non rivals as well
  - Can ‘Threaten War’ - **only once PDXs fixes related bugs**
  - Can ‘Influence Country’ - formerly DIP hegemon action
  - Can use ‘Diplomatic Corps’ cabinet action - formerly DIP hegemon action
  - Can ‘Violate Sovereignty’ - formerly MIL hegemon action
  - Can ‘Force Embargo’ - formerly NAV hegemon action
- **Major Powers:** the 7th to 12th (?) strongest eligible countries by Power Score.
  - Has 6 ‘Alliance Points’
  - *Has 1 less* ‘Defensive Points’ for 2 total
  - *Costs 1 more* point to ally or be in a league with for a total *cost of 4*
  - Can ally with Great Powers
  - *Can* give ‘Guarantees’ to other countries
  - *Cannot* receive ‘Guarantees’
  - Can ‘Intervene’ and ‘Enforce Peace’ against non rivals as well
  - Can ‘Threaten War’ - **only once PDXs fixes related bugs**
  - Can ‘Influence Country’ - formerly DIP hegemon action
  - Can use ‘Diplomatic Corps’ cabinet action - formerly DIP hegemon action

When it comes to weaker countries, **relative scaling makes no sense**. Using it could easily lead to a situation where countries could get categorized as minors where their strength does not justify it. Instead, we should **set absolute thresholds** that scale with Ages - where countries under it are categorized as *Small or Minor Powers.* If no countries end up being in these categories that is fine and a completely acceptable outcome. A combination of many different factors could be used to arrive at a score for these categories, for the sake of simplicity however, I will use country + vassal pop total for now. Because of possible lower player count games **being a GP/MP should make a country ineligible** for also being recognized as a minor!

- **Minor Powers:** The smallest land based countries and special country types - *One Province Minors* like *Wetzlar* (Gouk), or *Banks* like *Peruzzi* (Skorpins) from the *1st Sunday Campaign.*

Eligibility limit per **Age:** 500K **I.** / 600K **II.** / 700K **III.** / 800K **IV.** / 900K **V.** / 1000K **VI.**

  - Has 6 ‘Alliance Points’
  - Has *2 more* for a total of 5 ‘Defensive Points’
  - *Costs 2 less* points to ally or be in a league with for a total *cost of 1*
  - Can ally with Great Powers
  - Cannot give ‘Guarantees’ to other countries
  - Can receive ‘Guarantees’
  - **Consider** Mercenary Maintenance & Premium Cost bonuses (careful with stacking)
- **Small Powers:** What would normally be considered a ‘small’ country.

Eligibility limit per **Age:** 1000K **I.** / 1500K **II.** / 2000K **III.** / 2500K **IV.** / 3000K **V.** / 4000K **VI.**

  - Has 6 ‘Alliance Points’
  - Has *1 more* for a total of 4 ‘Defensive Points’
  - *Costs 1 less* points to ally or be in a league with for a total *cost of 2*
  - Can ally with Great Powers
  - Cannot give ‘Guarantees’ to other countries
  - Can receive ‘Guarantees’

We have touched on issues with the **Hegemonies** before, but now let’s talk about what to do with them. At first they could be kept mostly the same just with some of their associated abilities being moved to GPs as seen above and some of the stat bonuses removed. Eventually it would be preferable to rework them fully into one unified Country Tier system and perhaps use their interface to display GPs MPs etc *Victoria 2 style*. As for the restriction that Hegemonies cannot ally with each other - **this should be removed** and **Major Powers made eligible** for Hegemon status as well. Here’s how I’d *temporarily keep* Hegemonies in their reduced capacity:

- **Economic Hegemon:** Based on monthly income from Trade & Tax
  - Grants ‘Reduced Paperwork’ cabinet action
  - Grants ‘Soldiers as Workforce’ cabinet action - formerly Military Hegemon
- **Naval Hegemon:** Based on number of Heavy Ships (maybe other types could count?)
  - Grants ‘Maritime Support’ *cabinet action*
  - Grants ‘Forced Divert Trade’ *diplomatic action* - formerly Economic Hegemon
- **Military Hegemon:** Based on the number of Regulars (maybe quality should matter?)
  - -10% War Score Cost as a *passive bonus*
  - -10% Unit Food Consumption as a *passive bonus* - formerly Economic Hegemon
- **Diplomatic Hegemon:** Just remove this. The concept itself does not make sense.
- **Cultural Hegemon:** Based on Cultural Influence
  - Grants ‘Assimilate Area’ *cabinet action*
  - Grants ‘Force Change Court Language’ *diplomatic action*

## Defensive Relations

On our server we place no restrictions on multiple countries declaring wars on the same target even though most groups either forbid this, or even handle this by direct GM decision (why that is a can of worms we should not open I will not discuss again here). Coordinated declarations have their own disadvantages that are mainly political and war score related, where they take the risk that either of the attackers takes or is forced to take a separate peace. *Overall though this still poses such an issue that some solution is required* to equalise the situation that isn’t just a separate war declaration on the aggressor. The inclusion of additional **‘Defensive Points’** for **Defensive Leagues** and **Personal Unions**, the one free **guarantee** per person and **Intervention / Enforce Peace** have been an improvement but have perhaps gone too far in the other direction. I believe the new mechanics detailed in the Country Ranks section are a step towards the right balance, but there remains a number of issues specific to the above relation types that need to be solved:

- Both *Defensive Leagues* and *Personal Unions* have laws that eventually allow them to be used for offensive declarations as well. This has to be either completely removed or changed in such a way that upon passing the law these organizations then take up ‘Alliance Points’ instead (I think the first solution is preferable as it’s simpler but either works).
- Players often **end up in Personal Unions unintentionally** but considering the fact that these take up valuable relations we need to introduce a way to break these. Since this relation type is deeply tied to *succession mechanics* and indirectly even the way for e.g. *fiefdoms* work it is very hard to come up with a solution that neither breaks other parts of the game nor is it abusable. One possible way to handle this could be the inclusion of an action where a country in an unwanted PU could get a **randomly generated noble character** as their new ruler (of primary culture and religion). The reason it should not be a pre existing character is to prevent this being used to ‘farm’ rulers with top tier stats. This would also need a limitation to how often it can be pressed (50 or 100 year cooldown) and all *fiefdom* and *dominion subjects* should receive the same ruler as well.
- **Intervention** and **Enforce Peace** are, if handled correctly, great mechanics to inject some dynamism and risk to diplomacy. The issue with these is that without restrictions they just become a way to keep alliances ‘hidden’ and keep the sphere of potential allies as wide as possible. To mitigate this the current rule is to allow only one person to join an ongoing war by the way of these mechanics. Ideally **the game should track if this was already** **used** by someone during the war and simply disallow pressing the button for the next person. Furthermore, just like there is an opportunity for the attacker to refuse white peace when a third party uses Enforce Peace on them, **the defender should also have the opportunity to refuse this peace** being forced as otherwise the mechanic can be used to save an attacker!
- **The HRE Emperor** is automatically called in on the defenders side when an outsider attacks the empire. Not only are they themselves called, but they can bring their own allies too. While the HRE members should enjoy some protection through their membership, this is obviously gamebreaking by allowing two separate sets of allies to be called in defensively. Instead the **Emperor’s participation should count as an Intervention** itself and disallow further players joining in such a way (or through Enforce Peace) and the **Emperor should not be able to call his own allies.**
- If it was possible to **accept or reject an offer of Guarantee** **as the receiver** and perhaps even cancel a guarantee that is already in place, then we could consider placing limits on how many guarantees each player can receive at the same time.

## Player Vassals & Colonial Nations

It was my expectation based on previous experience coming into EU5 that **allowing players to be vassalized will be a constant source of drama** and balance issues. After our initial set of campaigns I conclude that **this has been in fact proven to be the case** and as such I’d simply fix this by **disallowing player vassalization entirely** once again. Asking someone to become a vassal or asking to become their vassal through diplomatic actions or through a peace deal should be disallowed if the country in question is a player country. Viable countries that start as vassals should not be allowed to be picked or the Starting Setup should be altered to make them independent.

The exception to this rule is **Colonial Nations** as they are really their own separate category. Playing as a Colonial Nation is a popular playstyle that a lot of players are interested in and this is also a great way to slot in people whose country might have died earlier on (or new joins). A number of things have to be done for the sake of gamebalance though:

- This vassal relationship should disallow having their own alliance, guarantees etc for the **Colonial Player**. And the relationship should be considered a **Player Alliance** **for the Overlord** with the same associated ‘Alliance Point’ costs.
- To prevent circumventing the above rules a player controlled Colonial Nation should not be allowed to start an independence movement or be freed through a peace deal. No third party should be able to use Transfer Subject or any equivalent mechanic on them. Even the Overlord should be prevented from freeing them.
- These rules apply specifically to countries that were created by the colonization mechanics and as such does not apply to natives or countries that moved to the colonies.

## Coalitions, Crusades and Jihads

All of these three serve to create large scale wars *outside of the confines of the alliance mechanics*. The issue at the moment is that **regular wars are too large scale anyways** and this takes away the niche that *Holy Wars* and *Coalitions* should serve. While it is a problem if each war escalates into an in-game equivalent of a *World War*, having memorable wars on which *the course of the campaign pivots* is a desired outcome. These however have to be an **exceptional event that happens rarely** and that is what should make it memorable and unique.

- *Crusades* in particular should have to depend on the Pope and any other country attempting to start one should ask the Pope for permission - a simple confirmation window would do for now.
- *Holy Wars* of any religion need to happen rarely, therefore a timer of at least a 100 years should be in place before a new one can be called (timer separate per religion), preferably counting after the war is over but counting from declaration is acceptable.
- The targeting requirement for *Crusades* should be loosened up from only targeting Jerusalem. Initially limiting it to the region of *Europe, North Africa* and the *Middle East* should be tested.
- While *Coalitions* can happen as often as they can be triggered there are some other issues to solve. First of all ideally the smaller AI countries should not be so trigger happy to fire the coalition war if player countries are also members. The reason we have to be very careful with this is so people can't join coalitions with the idea to neuter them - without solving this the lesser evil might be to keep it as is. Secondarily, **taking land should not be disallowed** for the *Coalition Target* as this makes winning against the coalition very unsatisfying, it should merely be made more expensive in both *war score* and *antagonism received*.

## International Organizations

In my personal opinion **International Organizations** are a great way (along with Situations) to structure content *in theory*. However, their current state goes from barebones to barely functional depending on the specific IO in question. While this means they could really use changes I would hold off for now as they are still getting reworks (think HRE) so work done here would likely end up being temporary - considering this I think of the following mainly as a collection of ideas *for the future.*

- **Catholic Church:** In its current state this is just a set of stat bonuses you click to activate (or more likely let someone else do it for you) every once in a while and you only really interact with it for a very short while during the **Council of Trent.** To improve it first the Pope has to be made central to passing most things and *especially Crusades*. The temporary bonuses should be made stronger (maybe with downsides as well?) while at the same time the number of them active at the same time should be limited. The aim of this change would be to make **voting for or against them actually matter** - maybe you don’t care about the HRE receiving extra *Imperial Authority* enough to even click the voting interface as a non-member… unless it takes up a slot for something you’d want *instead of it*.
- **Holy Roman Empire:** A lot of potential here to enhance gameplay and history at the same time. I will keep it brief and just suggest one thing. Think of how *Federation Fleets* work in **Stellaris** - now what if we had laws for the *Imperial Army* that worked similarly? What if there were laws or votes regarding the legality of using it in certain situations? The IO is likely to keep getting updates though (I’d hope).
- **Horde IOs:** Currently very bland. I have no specific ideas for it, all I’ll state is they need work.
- **Mandate of Heaven:** Depending on how we end up going about Asia, that is reworks, simplification, or nuking it from orbit (queue social credit meme) this IO and associated content **needs straight up nerfs**, no two ways about it the bonuses are just insane. One minor but impactful thing could be giving a significant chunk of **negative Power Score** for the holder of the *Mandate of Heaven* (instead of +50 it could be -500 or whatever number works).
- **French Crown IO:** Creating an IO to tie together French content *similar to the HRE* would be a huge undertaking but it holds a lot of potential imo. Ideally it would not be stable like the HRE but rather be forced down either the path of **Centralisation** into one powerful *French or English* tag (Burgundy?), or the path of **Decentralisation** (potentially falling apart). In either case instead of leaving it as HRE 2.0 it should have its own flavour leading to one conclusion or the other.

## Espionage

The Espionage System as a whole probably **needs to be reworked** as it is currently both wildly powerful and significantly abusable at the same time. I would hold off on including this in the *Diplomacy Segment of the Mod* for now as ideally I would **keep Espionage powerful**, but lock its strongest aspects behind a Focus Pick (see the *Technology Section* for more detail).

- **Infiltrate Administration** very heavily distorts the game. It is not an option **but a requirement** to use it once it becomes available. This level of **actual map hacks** takes **Fog of War** out of the game completely and thus takes the skill of making informed guesses based on limited information out along with it. I am not advocating for its removal though, but rather limiting its current form to an *Espionage Focus* and replacing it with a *lesser version* in the tech tree (perhaps it could be Area based instead of country wide).
- **Sow Discontent, Corrupt Officials** and similar actions could be rebalanced to scale based on the *size of the target* and be *more expensive* in general (PDX at it again with going between extremes). It should have a similar cost (maybe slightly higher?) for the one doing it as the stability costs for the target. Making it cheaper would just make it a no-brainer in a lot of situations with no further thought about whether it’s worth doing. Limiting *by how many people* and *how often* certain actions can be done against the *same target* should be considered.
- **Tech Stealing** needs a rework. Currently not only could it be abused by spamming it against one target by multiple people significantly hurting their research, but it is also *basically* mandatory to use it as it is free research with no downside for the one doing it. I am not sure how to balance this as removing the negative effect would just make you use it against an ally who won’t do counterespionage then making it even more of a no brainer **- ideas welcome.**
- **Assassinations** should either be locked behind a focus or be limited in how often they can be used both **as a player doing them** and how often they can be used **against** a certain player. I believe they have **not been abused to their fullest potential yet** in our games and base my reservations about the mechanic upon that.

## Peace Deals

The current Peace Deal system is **very limited** *by design* as the AI cannot handle deals that contain demands from both sides. As long as we make reservations not to break the AI peace logic we could consider allowing **two-sided peace deals** where both sides exchange territories, money etc. This could be done by restricting the AI to never suggest or accept such deals while allowing the players to create such deals between themselves. Some other considerations:

- Creating an **extended truce** should be made **as a peace option** with 0 war score cost. If this proves possible to implement we should consider preventing this option from being used in stab-hit peace offers to make it a matter of negotiation between players and not something that can be forced.
- Change the amount of **war score** controlling the **war** **goal** province gives. This could be doubled as a first step from 25 to 50 (ticking by the same +1 per month). **We have to be careful** with seemingly simple changes like this as terminating an ongoing war where the participants are still *actively fighting* and there is still a *reasonable* (if small) chance for either side to win is very damaging to the game. I firmly believe being forced to peace out like this, by ultimately arbitrary mechanics (or god-forbid GM decision) **is worse** than having wars go on longer than ideal.
- In connection with the previous point the *White Peace Imminent* mechanic should only be able to be used by the war leader on the war leader of the other side. The intention of the mechanic is clearly to end a stalemated war and not to be used as an offensive tool to help win it.
- Make forcibly destroying buildings of *Building Based Countries* in Peace Deals cheaper and scaling with how many overall buildings said country has (e.g. a *Hanseatic Kontor* costs 20 war score to destroy and they can have *hundreds* of them). These countries are currently practically untouchable as if they exist in a different dimension. This change by itself is insufficient to fix this but it’s a necessary step as a part of a *comprehensive rework* (in some far off time in the future).

---

## Other Considerations

There is still a lot left to talk about, but to keep some of my (and the dear readers) sanity I will keep the following points to a few sentences per topic:

- **Building Rights** are granted by default. In my opinion this is completely backwards as especially considering how inconvenient it is to destroy foreign buildings in one’s country (and you aren’t even allowed to often) the player should have more control over this than reacting after the fact. If we make it an action to *Request Building Rights* it should have versions where you are *requesting with nothing offered*, *requesting for favours* (maybe a small diplo penalty for rejection by the host), and one *where you pay for it* - preferably with a slider setting the price instead of a flat predetermined sum.
- The **Send Economic Support** diplomatic action allows too much gold to be sent monthly. The possible amount can be several times higher than the sending countries’ monthly income. This should be reduced to a *reasonable amount* - how much that should be is up for interpretation. In my opinion we could start with a number that is at least lower than the nation's budget, perhaps **about half of monthly profit**.
- In close connection to the above point, we should rebalance how much gold can be paid when requesting **Fleet Basing Rights, Military Access etc.** the flat amounts really make no sense outside of the early game. Overdoing this could mean completely undermining the change to Send Economic Support so we have to keep in mind, when we are changing the actions we are tweaking the *total possible gold transferred* over time (diplomat availability limits actions from being spammed too much though). Keeping *Gift*s and *Ask for Money* time limited is probably a good idea, the amount transferred seems reasonable to me as is.
- Certain *Diplomatic Actions* have alternatives that use **Favors as a currency**. We could consider other actions where such an alternative could be implemented. One example is *‘Invite Artist’* which currently has a cost of 250 gold (of course the Art System as a whole is very undercooked at the moment but that is beside the point).
- **Scutaged** **Vassals** present a problem as they allow players to *artificially* limit the available *playspace*. We need to give a **consistent and free ability** to the opponent to bring scutaged vassals into the war. The idea of allowing a vassal to stay out of wars for an extra payment should be kept as an option unless this problem proves unfixable.
- We should **consider** adding **Non-Agression Pacts** as either a new type of *Diplomatic Relation*, or as a one time *Diplomatic Action* whereupon if the receiver accepts a truce of X years is created (this could be set with a slider from let’s say 1 year to 25 years). One important thing to consider though is how this could contribute to **diplomatic stagnation** if no limits are placed on usage. Non-aggression pacts exist outside of the game anyways (though those are not enforced by game rules to be fair) so adding them would *make them official* rather than being an entirely new thing.
- Currently most **Casus Belli** simply have the same or very similar penalties/bonuses for both Conquer Cost and Antagonism Received. This should be rebalanced where ‘unjustified’ CBs like ‘Hegemon Ultimatum’ (granted when a country refuses to grant forced military access from the ‘Violate Sovereignty’ diplomatic action) could have an Antagonism penalty while retaining current war score Costs.
