---
title: "Distributed Training Quick Reference"
created: 2026-07-03
updated: 2026-07-03
maturity: budding
tags: ["distributed-training", "infrastructure", "llm"]
related_notes: []
related_posts: ["distributed-training-guide"]
---

Practical notes while setting up multi-node training. Companion to the [distributed training blog post](/blog/distributed-training-guide/).

## NCCL Environment Variables

```bash
# Essential for multi-node
export NCCL_DEBUG=INFO
export NCCL_IB_DISABLE=0           # Enable InfiniBand
export NCCL_SOCKET_IFNAME=eth0     # Network interface
export NCCL_IB_HCA=mlx5_0          # InfiniBand device

# Performance tuning
export NCCL_NSOCKS_PERTHREAD=4
export NCCL_SOCKET_NTHREADS=2
export NCCL_BUFFSIZE=2097152
```

## PyTorch Distributed Setup

```python
import torch.distributed as dist

def setup(rank, world_size):
    dist.init_process_group("nccl", rank=rank, world_size=world_size)
    torch.cuda.set_device(rank)

def cleanup():
    dist.destroy_process_group()
```

## Quick FSDP Config (for < 10B models)

```python
from torch.distributed.fsdp import (
    FullyShardedDataParallel,
    MixedPrecision,
    ShardingStrategy,
)

fsdp_config = {
    "sharding_strategy": ShardingStrategy.FULL_SHARD,
    "mixed_precision": MixedPrecision(
        param_dtype=torch.bfloat16,
        reduce_dtype=torch.float32,
        buffer_dtype=torch.bfloat16,
    ),
    "auto_wrap_policy": transformer_auto_wrap_policy,
}
```

## Common Issues & Fixes

| Issue | Likely Cause | Fix |
|---|---|---|
| NCCL timeout | Network congestion | Increase `NCCL_TIMEOUT` |
| OOM on rank 0 only | Extra memory from logging/checkpointing | Move checkpointing off rank 0 |
| Hanging on all-reduce | Mismatched tensor shapes | Check batch sizes across ranks |
| Slow inter-node | Wrong network interface | Set `NCCL_SOCKET_IFNAME` |

TODO: Add DeepSpeed config examples for ZeRO-3.
