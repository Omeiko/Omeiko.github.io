---
layout: post
title: "Robustness is a system question"
description: A note on connecting semantic-segmentation errors to autonomous-driving behavior.
date: 2026-10-28 12:00:00 +0900
categories:
  - research
  - robustness
---

Robustness evaluation often stops at a model-level score. For an autonomous-driving perception system, that is only the beginning: the practical concern is whether a corrupted input changes a downstream decision in an unsafe way.

Our AITest 2026 paper, [Improving Robustness of Semantic Segmentation for Autonomous Driving: A Case Study](https://doi.org/10.1109/AITest70988.2026.00032), studies semantic segmentation from this testing perspective. The case study connects corruption-sensitive model outputs with the behavior expected from a larger driving system.

## From prediction differences to consequences

A useful robustness test should distinguish between a harmless pixel-level change and an error that affects an object or region important to driving. This suggests a layered evaluation:

1. Apply a controlled corruption to a clean input.
2. Compare segmentation behavior across the clean and corrupted cases.
3. Trace meaningful differences into downstream system decisions.
4. Evaluate whether a repair improves the failure case without erasing normal performance.

The broader lesson is that robustness is not a single model property. It depends on the input condition, the model, the surrounding system, and the consequence being measured.

The complete bibliographic record is available through the paper’s [DOI](https://doi.org/10.1109/AITest70988.2026.00032).
