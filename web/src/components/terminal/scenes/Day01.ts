import type { AnimLine } from '../TerminalAnimator'

// ─────────────────────────────────────────────────────────────
//  DAY 1 — The Question Every IT Professional Should Be Asking
//  Visual Direction: network diagram, AI labels appearing on nodes
// ─────────────────────────────────────────────────────────────

const W = 52 // scene width

export const day01Boot = {
  postTitle: 'The Question Every IT Professional Should Be Asking',
  chapter: 'Chapter 1 — The World Has Changed',
  releaseDate: 'Monday, Apr 14',
  dayNumber: 1,
  hook: 'Every system you manage is generating data. The question isn\'t whether AI will touch your infrastructure — it already has. The question is whether you understand what\'s running on it.',
}

// ── Scene 1: The Shift That's Already Happened ────────────────
// Network diagram with AI labels appearing on known IT nodes

export const scene1: AnimLine[] = [
  { text: '┌' + '─'.repeat(W) + '┐', type: 'box',   delay: 30  },
  { text: '│  INFRASTRUCTURE SCAN · AI DETECTION'.padEnd(W + 1) + '│', type: 'label', delay: 30 },
  { text: '└' + '─'.repeat(W) + '┘', type: 'box',   delay: 30  },
  { text: '', type: 'blank', delay: 20 },
  { text: '  scanning your stack', type: 'dim', delay: 300 },
  { text: '  ........................................', type: 'dim', delay: 600 },
  { text: '', type: 'blank', delay: 20 },

  // Network nodes — the familiar IT landscape
  { text: '  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐', type: 'box', delay: 80 },
  { text: '  │  EMAIL SVR  │────▶│ TICKET QUEUE│────▶│ ANOMALY MON │', type: 'dim', delay: 60 },
  { text: '  └─────────────┘     └─────────────┘     └─────────────┘', type: 'box', delay: 60 },
  { text: '         │                                        │',        type: 'box', delay: 60 },
  { text: '         ▼                                        ▼',        type: 'dim', delay: 60 },
  { text: '  ┌─────────────┐                        ┌─────────────┐', type: 'box', delay: 60 },
  { text: '  │   PIPELINE  │                        │  FORECASTER │', type: 'dim', delay: 60 },
  { text: '  └─────────────┘                        └─────────────┘', type: 'box', delay: 60 },
  { text: '', type: 'blank', delay: 20 },

  // AI labels appearing — the reveal
  { text: '  [!] AI MODELS DETECTED ON YOUR INFRASTRUCTURE', type: 'amber', delay: 500 },
  { text: '', type: 'blank', delay: 30 },
  { text: '  SPAM_FILTER_V2    ', type: 'dim',   delay: 200 },
  { type: 'bar', text: '', barValue: 94, barLabel: 'ACTIVE · email server', delay: 0 },
  { text: '  TICKET_ROUTER_ML  ', type: 'dim',   delay: 300 },
  { type: 'bar', text: '', barValue: 81, barLabel: 'ACTIVE · support queue', delay: 0 },
  { text: '  ANOMALY_DETECT    ', type: 'dim',   delay: 300 },
  { type: 'bar', text: '', barValue: 63, barLabel: 'ACTIVE · anomaly monitor', delay: 0 },
  { text: '  USAGE_FORECAST    ', type: 'dim',   delay: 300 },
  { type: 'bar', text: '', barValue: 52, barLabel: 'ACTIVE · forecaster', delay: 0 },
  { text: '', type: 'blank', delay: 30 },
  { text: '  IT didn\'t always choose them. IT doesn\'t always know', type: 'green', delay: 400 },
  { text: '  what they\'re doing under the hood.', type: 'green', delay: 60 },
  { text: '', type: 'blank', delay: 20 },
]

// ── Scene 2: Why It Can't Be Ignored ─────────────────────────
// Failure cascade — AI fails in infrastructure

export const scene2: AnimLine[] = [
  { text: '┌' + '─'.repeat(W) + '┐', type: 'box',   delay: 30  },
  { text: '│  INCIDENT SIMULATION · AI SYSTEM FAILURE'.padEnd(W + 1) + '│', type: 'label', delay: 30 },
  { text: '└' + '─'.repeat(W) + '┘', type: 'box',   delay: 30  },
  { text: '', type: 'blank', delay: 20 },

  { text: '  simulating pipeline failure...', type: 'dim', delay: 400 },
  { text: '', type: 'blank', delay: 20 },

  // The cascade
  { text: '  [ML PIPELINE] ──────────────────────────────────▶ [CHOKE]', type: 'green', delay: 300 },
  { text: '                                                        │',    type: 'box',   delay: 200 },
  { text: '                                                        ▼',    type: 'box',   delay: 100 },
  { text: '                                               RESOURCE LIMIT', type: 'amber', delay: 300 },
  { text: '                                                        │',    type: 'box',   delay: 200 },
  { text: '                                                        ▼',    type: 'box',   delay: 100 },
  { text: '                                              UNCHECKED OUTPUT', type: 'amber', delay: 300 },
  { text: '                                                        │',    type: 'box',   delay: 200 },
  { text: '                                                        ▼',    type: 'box',   delay: 100 },
  { text: '                                             DOWNSTREAM FAILURE', type: 'amber', delay: 300 },
  { text: '', type: 'blank', delay: 20 },

  { text: '  ┌' + '─'.repeat(W - 2) + '┐', type: 'box', delay: 300 },
  { text: '  │  WHO IS CLOSEST TO THESE SYSTEMS?'.padEnd(W - 1) + '│', type: 'cyan', delay: 60 },
  { text: '  │'.padEnd(W - 1) + '  │', type: 'box', delay: 30 },
  { text: '  │  IT PROFESSIONALS — the ones who keep things running'.padEnd(W - 1) + '│', type: 'green', delay: 80 },
  { text: '  └' + '─'.repeat(W - 2) + '┘', type: 'box', delay: 60 },
  { text: '', type: 'blank', delay: 20 },
  { text: '  Understanding the mechanics isn\'t optional', type: 'green', delay: 300 },
  { text: '  when you\'re responsible for uptime.', type: 'green', delay: 60 },
  { text: '', type: 'blank', delay: 20 },
]

// ── Scene 3: What This Module Actually Covers ─────────────────
// Skill checklist loading one by one

export const scene3: AnimLine[] = [
  { text: '┌' + '─'.repeat(W) + '┐', type: 'box',   delay: 30  },
  { text: '│  MODULE 1 · OPERATIONAL LITERACY OBJECTIVES'.padEnd(W + 1) + '│', type: 'label', delay: 30 },
  { text: '└' + '─'.repeat(W) + '┘', type: 'box',   delay: 30  },
  { text: '', type: 'blank', delay: 20 },
  { text: '  loading curriculum...', type: 'dim', delay: 300 },
  { text: '', type: 'blank', delay: 30 },

  { text: '  [01] ◉  Understand what AI and ML actually are', type: 'green', delay: 300 },
  { text: '  [02] ◉  Ask the right questions when things go wrong', type: 'green', delay: 280 },
  { text: '  [03] ◉  Evaluate tools you\'re asked to support', type: 'green', delay: 280 },
  { text: '  [04] ◉  Recognise when models are failing', type: 'green', delay: 280 },
  { text: '  [05] ◉  Assess real-world AI deployments', type: 'green', delay: 280 },
  { text: '  [06] ◉  Understand the ethical weight you carry', type: 'green', delay: 280 },
  { text: '', type: 'blank', delay: 30 },

  { text: '  ─'.repeat(26), type: 'box', delay: 200 },
  { text: '', type: 'blank', delay: 20 },
  { text: '  DURATION   13 weeks · 65 posts', type: 'dim', delay: 200 },
  { text: '  PACE       1 post/weekday · ~5 min/day', type: 'dim', delay: 120 },
  { text: '  FORMAT     terminal · scroll-driven · no fluff', type: 'dim', delay: 120 },
  { text: '', type: 'blank', delay: 20 },
  { text: '  This isn\'t about becoming a data scientist.', type: 'green', delay: 300 },
  { text: '  It\'s about knowing enough to manage what you already run.', type: 'green', delay: 80 },
  { text: '', type: 'blank', delay: 20 },
]

// ── Scene 4: The Right Question ───────────────────────────────
// Binary comparison: flying blind vs managing deliberately

export const scene4: AnimLine[] = [
  { text: '┌' + '─'.repeat(W) + '┐', type: 'box',   delay: 30  },
  { text: '│  THE RIGHT QUESTION'.padEnd(W + 1) + '│', type: 'label', delay: 30 },
  { text: '└' + '─'.repeat(W) + '┘', type: 'box',   delay: 30  },
  { text: '', type: 'blank', delay: 20 },

  // Comparison table
  { text: '  ┌────────────────────────┬─────────────────────────┐', type: 'box',   delay: 80 },
  { text: '  │   FLYING BLIND         │   MANAGING DELIBERATELY  │', type: 'cyan',  delay: 60 },
  { text: '  ├────────────────────────┼─────────────────────────┤', type: 'box',   delay: 60 },
  { text: '  │                        │                          │', type: 'box',   delay: 40 },
  { text: '  │  Models you don\'t know │  You know what runs,     │', type: 'green', delay: 200 },
  { text: '  │  are running on your   │  why, and what breaks    │', type: 'green', delay: 80 },
  { text: '  │  infrastructure        │  when it fails           │', type: 'green', delay: 80 },
  { text: '  │                        │                          │', type: 'box',   delay: 40 },
  { text: '  │  Blame when things go  │  Act before things break │', type: 'green', delay: 200 },
  { text: '  │  wrong, no context     │  with full context       │', type: 'green', delay: 80 },
  { text: '  │                        │                          │', type: 'box',   delay: 40 },
  { text: '  │  [STATUS: ⚠ RISK   ]   │  [STATUS: ✓ INFORMED ]   │', type: 'amber', delay: 200 },
  { text: '  │                        │                          │', type: 'box',   delay: 40 },
  { text: '  └────────────────────────┴─────────────────────────┘', type: 'box',   delay: 60 },
  { text: '', type: 'blank', delay: 30 },

  { text: '  You\'re already supporting AI.', type: 'green', delay: 500 },
  { text: '  The only question is whether you\'re doing it blind.', type: 'green', delay: 100 },
  { text: '', type: 'blank', delay: 20 },
  { text: '  ▶  THIS SERIES IS THE ANSWER.', type: 'warn', delay: 600 },
  { text: '', type: 'blank', delay: 20 },
]

// ── Takeaway ──────────────────────────────────────────────────

export const day01Takeaway =
  "You're not on the outside of the AI conversation — you're in the middle of it, managing the systems it runs on."
