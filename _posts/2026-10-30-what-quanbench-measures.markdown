---
layout: post
title: "What QuanBench measures beyond code that runs"
description: A short note on why quantum code generation needs both executable tests and semantic evaluation.
date: 2026-10-30 00:00:00 +0900
categories:
  - research
  - evaluation
---

Generating source code that executes is not the same as generating a correct quantum program. A program can import the right library, construct a circuit, and finish without an exception while still implementing the wrong operation.

[QuanBench](https://doi.org/10.1109/ASE63991.2025.00218) was designed around that gap. It contains 44 programming tasks spanning quantum algorithms, state preparation, gate decomposition, and quantum machine learning. Each task includes an executable canonical solution, which makes it possible to test generated programs rather than judge them only by surface similarity.

## Two views of correctness

The benchmark combines two complementary measurements:

- **Functional correctness**, reported with Pass@K, asks whether generated code passes the task tests.
- **Quantum semantic equivalence**, measured with process fidelity, asks whether the generated circuit represents the intended quantum operation.

The distinction matters because syntactically polished code can hide semantic mistakes. In the reported experiments, overall accuracy remained below 40%, with recurring failures involving outdated APIs, circuit construction, and incorrect algorithm logic.

## Why the benchmark is useful

The interesting question is not simply which model scores highest. A benchmark should reveal *how* systems fail and make those failures reproducible. For quantum code generation, that means checking behavior at more than one level: the surrounding program, the circuit, and the operation the circuit is supposed to express.

The formal ASE 2025 paper is available through the [DOI](https://doi.org/10.1109/ASE63991.2025.00218), and the open manuscript is on [arXiv](https://arxiv.org/abs/2510.16779).
