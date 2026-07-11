---
title: "RLHF Implementation Notes"
created: 2026-06-10
updated: 2026-07-05
maturity: budding
tags: ["rlhf", "alignment", "ppo", "dpo"]
related_notes: ["attention-mechanisms-reference"]
related_posts: []
---

Notes on implementing RLHF (Reinforcement Learning from Human Feedback), structured but still evolving.

## Three-Stage Pipeline

### Stage 1: Supervised Fine-Tuning (SFT)

Fine-tune base model on high-quality instruction-response pairs.

- Dataset: human-written or synthetically generated demos
- Objective: standard next-token prediction
- Output: $\pi_{\text{SFT}}$

### Stage 2: Reward Model Training

Train a model to predict human preferences.

- Take SFT model, replace LM head with scalar output
- Train on pairs $(x, y_w, y_l)$ where $y_w$ is preferred over $y_l$
- Bradley-Terry preference model:

$$
P(y_w \succ y_l \mid x) = \frac{\exp(r(x, y_w))}{\exp(r(x, y_w)) + \exp(r(x, y_l))}
$$

- Loss: $-\log \sigma(r(x, y_w) - r(x, y_l))$

### Stage 3: PPO Fine-Tuning

Optimize SFT model against reward model with KL penalty:

$$
\max_{\pi} \mathbb{E}_{x \sim D, y \sim \pi(\cdot \mid x)} [r(x, y) - \beta \cdot \text{KL}(\pi \mid\mid \pi_{\text{SFT}})]
$$

**Important detail**: KL penalty prevents reward hacking. Without it, the policy can produce gibberish that scores high on the (imperfect) reward model.

## DPO: A Simpler Alternative

Direct Preference Optimization (Rafailov et al., 2023) skips the reward model entirely:

$$
\mathcal{L}_{\text{DPO}} = -\log \sigma\left(\beta \log \frac{\pi_\theta(y_w \mid x)}{\pi_{\text{ref}}(y_w \mid x)} - \beta \log \frac{\pi_\theta(y_l \mid x)}{\pi_{\text{ref}}(y_l \mid x)}\right)
$$

**Tradeoffs**:

| | PPO-based RLHF | DPO |
|---|---|---|
| Requires reward model | Yes | No |
| Online data collection | Yes | No |
| Stability | Can be finicky | More stable |
| Performance ceiling | Higher (with tuning) | Lower ceiling |

## Notes for Implementation

- KL coefficient $\beta$ usually in [0.01, 0.1]
- Reward model should be comparable size to policy
- PPO needs 4 models loaded simultaneously: policy, reference, reward, value
- Low-Rank Adaptation (LoRA) greatly reduces memory in Stage 3

Need to add: concrete hyperparams from InstructGPT paper.
