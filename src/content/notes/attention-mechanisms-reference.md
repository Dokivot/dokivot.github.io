---
title: "Attention Mechanisms — Reference Card"
created: 2026-04-15
updated: 2026-06-20
maturity: evergreen
tags: ["attention", "transformers", "reference"]
related_notes: []
related_posts: ["transformer-architecture"]
---

A quick reference for the major attention mechanisms used in modern LLMs. Each entry covers the core formula, complexity, and notable models that use it.

## Scaled Dot-Product Attention

The original. $n$ = sequence length, $d$ = head dimension.

$$
\text{Attention}(Q, K, V) = \text{softmax}\!\left(\tfrac{QK^T}{\sqrt{d}}\right) V
$$

| Property | Value |
|---|---|
| Time complexity | $O(n^2 d)$ |
| Memory complexity | $O(n^2)$ (stores attention matrix) |
| Used in | Original Transformer, BERT, early GPT |

## Multi-Query Attention (MQA)

All heads share a single Key/Value projection. Drastically reduces KV cache size for inference.

- KV cache size: $2 \times n_{\text{layers}} \times n \times d_{\text{head}}$ → **reduces by $h\times$**
- Slight quality degradation vs. MHA
- Used in: PaLM, Falcon

## Grouped-Query Attention (GQA)

Compromise between MHA and MQA. $g$ groups share K/V heads. GQA-1 = MQA, GQA-$h$ = MHA.

| Mechanism | KV heads | Quality | KV cache |
|---|---|---|---|
| MHA | $h$ | Best | Largest |
| GQA | $g$ ($1 < g < h$) | Good | Medium |
| MQA | 1 | Slightly worse | Smallest |

Used in: Llama 2 (70B uses GQA-8), Llama 3, Mistral

## Flash Attention

Not a new mechanism — an **IO-aware exact attention algorithm** that computes attention in blocks to avoid materializing the full $n \times n$ matrix.

- Time: same $O(n^2 d)$ asymptotic
- Memory: $O(n)$ instead of $O(n^2)$
- 2–4× speedup in practice
- Now the default in most training frameworks

## Sliding Window Attention

Each token attends only to a local window of $w$ tokens:

$$
\text{Attention}(Q_i, K, V) = \text{softmax}\!\left(\tfrac{Q_i K_{i-w:i+w}^T}{\sqrt{d}}\right) V_{i-w:i+w}
$$

Used in: Mistral (window = 4096), Longformer

## Rotary Position Embedding (RoPE)

Encodes position by rotating query and key vectors:

$$
\tilde{q}_m = q_m e^{i m \theta}, \quad \tilde{k}_n = k_n e^{i n \theta}
$$

Key property: $q_m^T k_n$ depends only on relative position $m - n$.

- Extrapolates to longer sequences
- Used in Llama, Mistral, Qwen, and most modern LLMs
- Theta base often set to 10000; some extend to 500000 for long context

## Summary Table

| Mechanism | Complexity | Best for |
|---|---|---|
| MHA | $O(n^2 d)$ | Training quality |
| GQA | $O(n^2 d)$ | Inference efficiency |
| Flash Attention | $O(n^2 d)$, $O(n)$ mem | All use cases |
| Sliding Window | $O(nwd)$ | Long documents |
| RoPE | — | Position encoding |
