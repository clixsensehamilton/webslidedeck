---
week: 8
day: 39
weekday: Thursday
chapter: Chapter 3 — How Machines Learn
source_video: Video 8: Semi-supervised and Reinforcement Learning
post_title: "AlphaGo: How a Machine Mastered an Ancient Game"
series_tag: "#AIMLSeries #Module1"
---

## Hook
Go has more possible board positions than there are atoms in the observable universe. No database of moves could cover it. AlphaGo didn't memorise its way to a championship — it learned.

## Scene 1 — Why Go Was Considered Unsolvable by Brute Force
Chess engines conquered chess through exhaustive search — calculating possible moves faster than any human. Go defeated that approach. The branching factor is too high, the game too long, the number of positions too vast for any search tree to evaluate. For decades, strong Go play was considered a benchmark that AI could not reach. Expert intuition — the ability to evaluate a board position without calculating every branch — was thought to be beyond algorithmic reach.

## Scene 2 — What AlphaGo Actually Did
AlphaGo was built on reinforcement learning. It played millions of games against itself, starting from the principles of the game and no prescribed strategy. Each game produced a reward signal: win or lose. The agent — the policy governing move selection — was updated after every game based on which sequences of decisions led to victories. Over millions of iterations of self-play, AlphaGo developed strategies that no human had written, no rule had specified, and no opening database had catalogued. The policy it built was emergent — discovered through experience, not engineered by hand.

## Scene 3 — The Match, and What It Demonstrated
In 2016, AlphaGo defeated the world Go champion Lee Sedol in a five-game match, winning four games to one. The moves it made during the match weren't recognisable to professional players — some were evaluated as mistakes in the moment, only to prove decisive several moves later. AlphaGo had learned to optimise for cumulative outcome across the full arc of a game, not just immediate advantage. It was not a better calculator than a human. It was a better learner. That distinction — between systems that are programmed and systems that have learned — is what reinforcement learning puts on display at its most striking.

## Takeaway
**AlphaGo didn't win because it computed faster. It won because it learned better — and what it learned, no human had ever thought to teach it.**

## Visual Direction
Open with a Go board — clean, traditional, sparsely populated. Scene 2 shows a self-play loop: the board resets rapidly through game after game, a counter climbing from zero into the millions. Scene 3 freezes on a single, pivotal board position from the Lee Sedol match — one of AlphaGo's unconventional moves highlighted. End on the final score: AlphaGo 4, Lee Sedol 1. The visual tone is celebratory and precise — this is a milestone, not a cautionary tale.
