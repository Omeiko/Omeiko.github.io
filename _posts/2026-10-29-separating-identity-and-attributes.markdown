---
layout: post
title: "Separating identity and attributes in zero-shot face editing"
description: Why controllable face editing needs to preserve identity while changing prompt-selected attributes.
date: 2026-10-29 12:00:00 +0900
categories:
  - research
  - computer-vision
---

Text-guided image editing makes complex changes easy to describe, but face editing has an unusually strict constraint: the result should follow the prompt without turning the subject into a different person.

Our ICME 2025 paper, [Zero-shot Face Editing via ID-Attribute Decoupled Inversion](https://doi.org/10.1109/ICME59968.2025.11209805), approaches that problem by separating identity features from editable attribute features. The two representations are then used together to guide inversion and the reverse diffusion process.

## Control without retraining for every edit

The method is zero-shot: it uses text prompts and does not require a region-specific input for each requested change. The goal is to support multi-attribute edits while retaining identity and structural consistency.

This separation is also an evaluation choice. It turns a vague question—“does the image look right?”—into several more useful questions:

- Did the requested attributes change?
- Was identity preserved?
- Did facial structure remain consistent?
- How much additional computation did the editing process require?

Treating these as separate concerns makes it easier to understand where an editing system succeeds and where it compromises one objective for another.

The formal paper is available through the [DOI](https://doi.org/10.1109/ICME59968.2025.11209805), with an open version on [arXiv](https://arxiv.org/abs/2510.11050).
