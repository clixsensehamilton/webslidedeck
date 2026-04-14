---
week: 3
day: 12
weekday: Tuesday
chapter: Chapter 2 — What We Built
source_video: Video 4: Introduction to Machine Learning
post_title: Before ML: Why Writing Rules by Hand Doesn't Scale
series_tag: "#AIMLSeries #Module1"
---

## Hook
You've been there: a firewall ruleset that's grown to 3,000 lines, an ACL that nobody fully understands, a regex filter that breaks every time the input format shifts slightly. That's not a maintenance problem. That's a fundamental limit of how rule-based systems work.

## Scene 1 — The Architecture of Brittle Systems
Rule-based systems are deterministic by design. They do exactly what they're told. That's their strength in stable, well-defined environments — and their weakness everywhere else. Every exception to the pattern requires a new rule. Every new evasion technique requires a patch. The human maintaining the rules becomes the bottleneck.

## Scene 2 — The Escalation Problem
The failure mode isn't a single breaking point — it's slow erosion. A spam filter starts with twenty rules. Then fifty. Then two hundred, because spammers learn to avoid the previous ones. Firewall policies accumulate over years of "add this, never remove anything" change management. The rules themselves become the risk: nobody knows what they all do, conflicts appear, and removing anything feels dangerous. You're no longer governing a system — you're managing its history.

## Scene 3 — Why This Is an ML Problem, Not an IT Problem
The source of the pain isn't poor engineering. It's the nature of the problem. Some domains — spam, fraud, network intrusion, anomaly detection — produce adversaries who adapt. The moment you publish a rule, someone is working around it. A static rule set cannot win that game. The problem requires a system that can observe new patterns and update its own behaviour without waiting for a human to write the next rule.

## Scene 4 — What Changes When the Rules Write Themselves
Machine learning doesn't eliminate logic — it relocates it. Instead of logic living in explicit IF/THEN statements, it lives in the patterns extracted from data. The system can generalise across inputs it has never seen before, not because someone anticipated them, but because the underlying pattern was present in the training data. That's the operational difference between a rule-based filter and an ML-based one.

## Takeaway
Rule-based systems don't fail because engineers write bad rules — they fail because the problem outgrows what any human can maintain.

## Visual Direction
Animate a growing list of firewall rules stacking downward, each new rule added in response to a failed case. The list extends past the visible frame. Then cut to a clean alternative: a single ML pipeline that ingests data and updates continuously. Use visual contrast — chaos of accumulation vs. elegance of iteration. No code syntax needed; the visual weight of the growing rule list tells the story.
