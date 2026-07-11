---
title: "Transformer Architecture: A Deep Dive"
date: 2026-06-15
description: "A comprehensive walkthrough of the Transformer architecture, covering self-attention, multi-head attention, positional encoding, and the feed-forward network — with annotated PyTorch implementation."
tags: ["transformers", "attention", "deep-learning", "nlp"]
draft: false
---

The Transformer architecture, introduced in ["Attention Is All You Need"](https://arxiv.org/abs/1706.03762) (Vaswani et al., 2017), fundamentally changed how we build sequence models. Instead of recurrence or convolution, it relies entirely on attention mechanisms to model dependencies.

This post walks through each component with annotated code.

## Self-Attention: The Core Idea

At its heart, self-attention answers: for each token in a sequence, which other tokens should it pay attention to?

Given an input sequence $X \in \mathbb{R}^{n \times d_{\text{model}}}$, we compute three matrices:

$$
Q = XW^Q, \quad K = XW^K, \quad V = XW^V
$$

The attention output is:

$$
\text{Attention}(Q, K, V) = \text{softmax}\!\left(\frac{QK^T}{\sqrt{d_k}}\right) V
$$

The $\sqrt{d_k}$ scaling prevents the dot products from growing too large, which would push the softmax into regions of extremely small gradients.

```python
import torch
import torch.nn as nn
import torch.nn.functional as F

class SelfAttention(nn.Module):
    def __init__(self, d_model, d_k):
        super().__init__()
        self.W_q = nn.Linear(d_model, d_k, bias=False)
        self.W_k = nn.Linear(d_model, d_k, bias=False)
        self.W_v = nn.Linear(d_model, d_k, bias=False)
        self.d_k = d_k

    def forward(self, x):
        Q = self.W_q(x)
        K = self.W_k(x)
        V = self.W_v(x)

        scores = Q @ K.transpose(-2, -1) / (self.d_k ** 0.5)
        attn = F.softmax(scores, dim=-1)
        return attn @ V
```

## Multi-Head Attention

Instead of computing a single attention function, multi-head attention runs $h$ attention heads in parallel:

$$
\text{MultiHead}(Q, K, V) = \text{Concat}(\text{head}_1, \ldots, \text{head}_h)W^O
$$

Each head projects into a smaller subspace $d_k = d_{\text{model}} / h$, allowing the model to attend to different representation subspaces simultaneously.

```python
class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, n_heads):
        super().__init__()
        assert d_model % n_heads == 0
        self.d_k = d_model // n_heads
        self.n_heads = n_heads

        self.W_q = nn.Linear(d_model, d_model, bias=False)
        self.W_k = nn.Linear(d_model, d_model, bias=False)
        self.W_v = nn.Linear(d_model, d_model, bias=False)
        self.W_o = nn.Linear(d_model, d_model, bias=False)

    def forward(self, x):
        B, T, D = x.shape

        Q = self.W_q(x).view(B, T, self.n_heads, self.d_k).transpose(1, 2)
        K = self.W_k(x).view(B, T, self.n_heads, self.d_k).transpose(1, 2)
        V = self.W_v(x).view(B, T, self.n_heads, self.d_k).transpose(1, 2)

        scores = Q @ K.transpose(-2, -1) / (self.d_k ** 0.5)
        attn = F.softmax(scores, dim=-1)
        out = attn @ V

        out = out.transpose(1, 2).contiguous().view(B, T, D)
        return self.W_o(out)
```

## Positional Encoding

Since attention has no inherent notion of sequence order, we inject position information:

| Type | Pros | Cons |
|---|---|---|
| Sinusoidal | No parameters, extrapolates | Fixed pattern |
| Learned | Adaptable | Doesn't extrapolate |
| RoPE | Relative, extrapolates | More compute |

The original paper uses sinusoidal encoding:

```python
class SinusoidalPositionalEncoding(nn.Module):
    def __init__(self, d_model, max_len=5000):
        super().__init__()
        pe = torch.zeros(max_len, d_model)
        position = torch.arange(max_len).unsqueeze(1)
        div_term = torch.exp(
            torch.arange(0, d_model, 2) * -(math.log(10000.0) / d_model)
        )
        pe[:, 0::2] = torch.sin(position * div_term)
        pe[:, 1::2] = torch.cos(position * div_term)
        self.register_buffer('pe', pe)

    def forward(self, x):
        return x + self.pe[:x.size(1)]
```

## Feed-Forward Network

Each attention block is followed by a position-wise FFN:

$$
\text{FFN}(x) = \text{GELU}(xW_1 + b_1)W_2 + b_2
$$

Modern implementations (LLaMA, GPT) often use SwiGLU instead:

$$
\text{SwiGLU}(x) = (xW_1 \odot \text{SiLU}(xW_2))W_3
$$

## Putting It Together

A full Transformer encoder block stacks multi-head attention, add & norm, FFN, and another add & norm. The decoder adds cross-attention to the encoder output and causal masking.

For further reading, I recommend the [Annotated Transformer](http://nlp.seas.harvard.edu/annotated-transformer/) and Jay Alammar's [visual explanation](https://jalammar.github.io/illustrated-transformer/).
