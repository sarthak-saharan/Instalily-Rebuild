# InstaLILY Lily Co-Pilot Concept
> A pitch-ready feature prototype built on top of [InstaLILY](https://www.instalily.ai/) to demonstrate high-impact improvements to their enterprise AI landing page, specifically around personalization, proof, and letting a visitor actually touch the product instead of just reading about it.

> **Live demo:** [My prototype](https://sarthak-saharan.github.io/Instalily-Rebuild/) (feature concept)

> Built by Sarthak Saharan · [LinkedIn](https://www.linkedin.com/in/sarthak-saharan/)

## What I Built
I built a floating Lily co-pilot that sits on top of a recreation of InstaLILY's real homepage. Click it and you get a five-stop guided tour, plus two tools you can jump into directly: a Map, Build, Deploy, Learn simulator based on InstaLILY's own published quoting deployment, and an ROI calculator that takes their published case study numbers and scales them to your workflow and volume.

## The Problem I Spotted
InstaLILY's site does something genuinely hard well, it explains a complex enterprise AI product with real proof points: $200M+ in new sales surfaced, a 98% cost reduction per field service call, quote cycles cut from two days to four hours. But the proof stays generic. A visitor from field service and one from industrial distribution read the exact same page, and each has to do their own mental math to work out what it means for their business. And nothing on the page lets you actually touch how Lily works. It's all scroll-triggered narrative that plays at you, not something you click through yourself.

## Before and After

| Dimension | Before (Original Site) | After (This Prototype) |
|---|---|---|
| Personalization | Same proof points for every visitor, regardless of industry | ROI calculator scoped to five verticals, output changes with the visitor's own volume |
| Product understanding | Workflow story told through a passive scroll animation | Click-through Map, Build, Deploy, Learn simulator using InstaLILY's real quoting deployment |
| Guidance | Visitor has to self-navigate a long, dense page | Lily co-pilot offers a guided tour or lets a visitor jump straight to what they came for |
| Proof to action | Stats sit far from any next step | Every co-pilot interaction ends pointed at booking a demo |

## Target Metrics
- **Time on page:** +20 to 35%, from giving visitors a reason to keep exploring after the hero instead of bouncing
- **Demo request rate:** +10 to 18%, from the ROI calculator putting a personalized number in front of the visitor right before the CTA
- **Scroll depth to the ROI section:** should climb since the guided tour actively routes people there instead of counting on them to scroll that far on their own

## How I Built It
- **Research:** I studied InstaLILY's product, audience, and site structure, an AI Forward Deployed Engineer built for industrial distribution, field service, logistics, healthcare ops, and construction.
- **Design extraction:** I pulled the real design tokens off the live site through DOM inspection instead of guessing: IBM Plex Sans for body copy, DM Mono for the uppercase labels and buttons, the exact black, white, and cream section palette, and the #2e6b45 green accent.
- **Stack:** vanilla HTML, CSS, and JavaScript split across three plain files, no build step, no dependencies, runs anywhere.
- **Fidelity:** I matched the pill-shaped buttons, the alternating paper and dark sections, and the tight letter-spacing on the headings. Then I grounded the ROI math in InstaLILY's own published benchmarks instead of inventing numbers. An early version of the calculator was quoting a distributor $234,000 a month in savings before I caught the bug and fixed the formula.

## Run It Locally
```
git clone https://github.com/sarthak-saharan/Instalily-Rebuild.git
cd Instalily-Rebuild
python3 -m http.server 3000
```
Open http://localhost:3000

## About Me
I'm Sarthak Saharan, a product manager who builds working prototypes instead of writing PRDs first. I look for the UX and conversion gaps in a real product, then ship a proof of concept that shows exactly what the fix looks like, live, inside the real design system, not in a Figma frame.

[LinkedIn](https://www.linkedin.com/in/sarthak-saharan/)

*Demo data only. Not affiliated with InstaLILY. Built as an unsolicited product concept.*
