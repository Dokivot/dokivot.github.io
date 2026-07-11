---
title: "Scaling Laws — Quick Notes"
created: 2026-05-20
updated: 2026-05-20
maturity: seedling
tags: ["scaling-laws", "llm", "kaplan"]
related_notes: []
related_posts: []
---

Just rough notes while reading Kaplan et al. (2020) and Hoffmann et al. (2022).

## Kaplan Scaling Laws (2020)

> "Scaling Laws for Neural Language Models"

Key finding: performance depends on model size, dataset size, and compute — following power laws.

- Loss $L(N, D) \propto N^{-\alpha_N} + D^{-\alpha_D}$
- $\alpha_N \approx 0.076$, $\alpha_D \approx 0.095$
- Model size matters more than dataset size (given fixed compute budget)

But this was later revised...

## Chinchilla Scaling Laws (2022)

> "Training Compute-Optimal Large Language Models"

Hoffmann et al. found Kaplan's results were off because they didn't train for long enough.

Chinchilla optimal: **tokens should scale roughly 20× model parameters**.

For a 70B model, you need ~1.4T tokens. Most open models (Llama, etc.) follow this.

```
Model params: 70B
Optimal tokens: 70B × 20 = 1.4T
```

## Open Questions

- Is Chinchilla optimal still holding at very large scales?
- What about data quality vs. quantity? (Gunasekar et al., Phi-1 paper)
- How do scaling laws change with mixture-of-experts models?

Need to read: DeepSeek's analysis on MoE scaling.

## References

- Kaplan et al. (2020) — Scaling Laws for Neural Language Models
- Hoffmann et al. (2022) — Training Compute-Optimal Large Language Models
- To find: Shen et al. — Phi-1 / Textbooks Are All You Need
