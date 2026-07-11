---
title: "LLM Distributed Training: Strategies and Tradeoffs"
date: 2026-07-01
description: "A practical comparison of data parallelism, tensor parallelism, pipeline parallelism, and ZeRO — when to use each, and how to combine them."
tags: ["distributed-training", "llm", "deep-learning", "infrastructure"]
draft: false
---

Training large language models requires distributing computation across multiple GPUs. This post surveys the main strategies, their scaling behavior, and how they compose.

## The Memory Problem

A model with $P$ parameters requires roughly:

| Component | Memory (bytes) |
|---|---|
| Parameters (fp32) | $4P$ |
| Gradients | $4P$ |
| Optimizer states (Adam) | $8P$ |
| Activations | Depends on batch size and sequence length |

For a 7B model, that totals ~112 GB just for parameters + optimizer — far beyond a single A100's 80 GB.

## Data Parallelism (DP)

The simplest strategy: each GPU holds a full copy of the model, processes a different micro-batch, then averages gradients via all-reduce.

**Limitation**: Each GPU must fit the entire model + optimizer state. Useless alone for large models.

## Tensor Parallelism (TP)

Splits individual weight matrices across GPUs. For a linear layer $Y = XW$, we can split $W$ column-wise and recombine.

- Communication: all-reduce in forward, all-reduce in backward
- Best within a single node (NVLink bandwidth)
- Megatron-LM popularized column + row parallelism for attention and FFN blocks

## Pipeline Parallelism (PP)

Splits the model by layer. GPU 0 handles layers 0–7, GPU 1 handles layers 8–15, etc.

- Communication: point-to-point, lower than TP
- **Bubble overhead**: GPUs idle while waiting for neighboring stages
- Mitigated by micro-batching and interleaved schedules (GPipe, 1F1B)

## ZeRO (Zero Redundancy Optimizer)

DeepSpeed's ZeRO partitions optimizer states, gradients, and parameters across GPUs:

| Stage | Partitioned | Memory savings |
|---|---|---|
| ZeRO-1 | Optimizer states | 4× |
| ZeRO-2 | + Gradients | 8× |
| ZeRO-3 | + Parameters | Linear with $N$ GPUs |

ZeRO-3 enables training 100B+ models on commodity hardware — with the tradeoff of increased communication.

## The 3D Parallelism Recipe

For large-scale training, combine all three:

```
TP within node (NVLink)
PP across nodes (lower bandwidth)
DP across PP groups
+ ZeRO to reduce redundancy
```

## Practical Recommendations

| Model Size | Recommended Strategy |
|---|---|
| < 1B | DP only |
| 1B – 10B | DP + FSDP/ZeRO-2 |
| 10B – 100B | TP + PP + ZeRO-2 or FSDP |
| > 100B | TP + PP + ZeRO-3 (3D parallelism) |

Framework choice matters. For smaller clusters, FSDP (PyTorch native) works well. For larger setups, DeepSpeed or Megatron-LM offer more optimization.

## Further Reading

- [Efficient Large-Scale Language Model Training on GPU Clusters](https://arxiv.org/abs/2104.04473) (Narayanan et al.)
- [ZeRO: Memory Optimizations Toward Training Trillion Parameter Models](https://arxiv.org/abs/1910.02054)
