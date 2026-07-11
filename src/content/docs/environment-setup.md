---
title: "LLM Training Environment Setup"
order: 1
tags: ["setup", "infrastructure", "llm"]
---

A step-by-step guide to setting up a GPU training environment for LLM experimentation, from bare metal to running your first training loop.

## Prerequisites

| Component | Minimum | Recommended |
|---|---|---|
| GPU | 1× A100 40GB | 8× A100 80GB |
| RAM | 64 GB | 256 GB |
| Storage | 500 GB NVMe | 2 TB NVMe |
| OS | Ubuntu 22.04 LTS | Ubuntu 22.04 LTS |
| Network | 10 GbE | InfiniBand HDR |

## Step 1: NVIDIA Drivers

```bash
# Add NVIDIA package repository
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-keyring_1.1-1_all.deb
sudo dpkg -i cuda-keyring_1.1-1_all.deb
sudo apt update

# Install driver
sudo apt install -y nvidia-driver-545
sudo reboot
```

Verify:

```bash
nvidia-smi
```

## Step 2: CUDA Toolkit

```bash
sudo apt install -y cuda-toolkit-12-3
echo 'export PATH=/usr/local/cuda-12.3/bin:$PATH' >> ~/.bashrc
echo 'export LD_LIBRARY_PATH=/usr/local/cuda-12.3/lib64:$LD_LIBRARY_PATH' >> ~/.bashrc
source ~/.bashrc
```

## Step 3: Conda Environment

```bash
conda create -n llm python=3.11 -y
conda activate llm
```

## Step 4: PyTorch with CUDA

```bash
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
```

Verify CUDA is available:

```python
import torch
print(torch.cuda.is_available())  # True
print(torch.cuda.device_count())  # Number of GPUs
```

## Step 5: Flash Attention

```bash
pip install flash-attn --no-build-isolation
```

## Step 6: Training Libraries

```bash
pip install transformers datasets accelerate wandb
pip install deepspeed  # Optional, for ZeRO
```

## Step 7: NCCL for Multi-GPU

```bash
# Set environment variables
export NCCL_DEBUG=INFO
export NCCL_IB_DISABLE=0
export NCCL_NET_GDR_LEVEL=2  # GPU Direct RDMA

# Test multi-GPU communication
python -c "
import torch.distributed as dist
dist.init_process_group('nccl')
print('NCCL initialized successfully')
"
```

## Quick Validation Script

Save as `test_env.py`:

```python
import torch
from flash_attn import flash_attn_func

# Create random tensors
B, H, T, D = 2, 32, 2048, 64
q = torch.randn(B, T, H, D, device='cuda', dtype=torch.float16)
k = torch.randn(B, T, H, D, device='cuda', dtype=torch.float16)
v = torch.randn(B, T, H, D, device='cuda', dtype=torch.float16)

# Test flash attention
out = flash_attn_func(q, k, v)
print(f"Output shape: {out.shape}")

# Memory check
print(f"GPU memory: {torch.cuda.max_memory_allocated() / 1e9:.2f} GB")
```

## Common Issues

| Symptom | Fix |
|---|---|
| `libcuda.so not found` | `sudo ldconfig` after driver install |
| Flash Attn compile error | Ensure CUDA toolkit matches PyTorch CUDA version |
| NCCL timeout in multi-node | Check firewall, set `NCCL_SOCKET_IFNAME` |
| OOM on first run | Reduce batch size, enable gradient checkpointing |
