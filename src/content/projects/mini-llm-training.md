---
title: "MiniLLM — Training Framework Experiment"
description: "A minimal, educational LLM training framework built from scratch to understand every component of modern LLM training pipelines."
tech_stack: ["PyTorch", "Flash Attention", "FSDP", "WandB"]
repo_url: "https://github.com/Dokivot/mini-llm"
status: "active"
order: 1
---

## Motivation

Most LLM training frameworks (Megatron-LM, DeepSpeed, etc.) are production-grade and complex. MiniLLM strips everything down to the essentials — a single-file training loop that you can read in one sitting — while still using modern techniques.

## Architecture

The framework implements:

- **GPT-style decoder-only architecture** with RoPE and SwiGLU
- **Flash Attention v2** for efficient training
- **FSDP** for multi-GPU data parallelism
- **Gradient accumulation** and mixed precision (bf16)
- **WandB integration** for loss/token tracking

## Key Design Decisions

| Decision | Rationale |
|---|---|
| Single-file design | Maximize readability for educational purposes |
| No custom CUDA kernels | Keep it pure PyTorch, rely on torch.compile |
| FSDP over DeepSpeed | Native PyTorch, simpler API |
| HF-compatible checkpoint | Easy to load for inference with transformers |

## Results

On 4× A100s, MiniLLM trains a 150M parameter model at ~40K tokens/second with 80% MFU — competitive with much more complex setups for models of this scale.

## What I Learned

Building from scratch forced me to understand every part of the pipeline: tokenizer integration, data loading with sequence packing, the interplay between gradient accumulation and FSDP, and how Flash Attention actually works under the hood.
