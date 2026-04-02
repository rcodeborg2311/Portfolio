---
title: "Reinforcement Learning Market-Making Agent"
description: "PPO-trained market-making agent in PyTorch quoting BTC-USD bid/ask spreads from live Coinbase L2 WebSocket data, achieving 2.4× higher mean episode PnL and 8% lower inventory exposure than a TWAP baseline, featuring a Bloomberg-style live trading dashboard."
pubDate: 2026-03-10
heroImage: ../../assets/blog-placeholder-4.png
tags: ["Python", "Reinforcement Learning", "PyTorch", "Market Making", "Avellaneda-Stoikov", "Plotly Dash"]
liveUrl: "https://rlmarketmaker-7yho3khdjxpcsppuwappuas.streamlit.app/"
---

**Live App:** [rlmarketmaker-7yho3khdjxpcsppuwappuas.streamlit.app](https://rlmarketmaker-7yho3khdjxpcsppuwappuas.streamlit.app/) · **GitHub:** [github.com/rcodeborg2311/rl-market-maker](https://github.com/rcodeborg2311/rl-market-maker)

## Overview

A PPO-trained reinforcement learning agent that learns to quote bid/ask spreads on BTC-USD from live Coinbase Advanced Trade WebSocket L2 order book data, outperforming a TWAP baseline on PnL and inventory risk across 100 out-of-sample evaluation episodes.

## Technical Highlights

- **PPO Agent Performance:** Engineered a PPO-trained market-making agent in PyTorch achieving **2.4× higher mean episode PnL** ($0.031 vs $0.013) and **8% lower inventory exposure** than a TWAP baseline across 100 out-of-sample evaluation episodes.

- **Avellaneda-Stoikov Reward Function:** Implemented an AS-inspired reward function r = spread_pnl − γq²σ² with scaled inventory penalty and a 20-dimensional microstructure state vector including Kyle's lambda (price impact), realized volatility, order flow imbalance, spread z-score, and depth slope, utilizing signals modeled after those used by professional market makers at Citadel Securities and Virtu Financial.

- **Custom Gymnasium Environment:** Designed with a causal fill simulator (next-snapshot trade matching), GAE advantage estimation (λ=0.95), PPO clipping (ε=0.2), and LayerNorm Actor-Critic networks (256→128) with orthogonal weight initialization and tanh-squashed Gaussian action distribution for bounded continuous spread control.

- **First-Principles Inventory Skewing:** Derived dynamic inventory skewing from Kyle (1985) and Avellaneda-Stoikov (2008). The agent learns asymmetric bid/ask offsets conditioned on signed inventory and realized volatility, replicating the closed-form reservation price adjustment r* = m − qγσ²(T−t) without analytical assumptions.

- **Bloomberg-Style Trading Dashboard:** Delivered a Plotly Dash dashboard (500ms refresh) with real-time order book depth visualization, agent quote overlays, dual-axis PnL/inventory time series with drawdown fill, spread z-score history, and inventory risk bars. It falls back gracefully to a TWAP baseline when no trained model is present.

## Test Coverage

**26/26 pytest unit tests** with zero failures across 4 test modules covering OBI edge cases, fill simulator partial fills, GAE shape invariants, and end-to-end PPO update correctness. Seeded for full reproducibility (`torch.manual_seed(42)`, `np.random.seed(42)`).

## Key Results

| Metric | RL Agent | TWAP Baseline |
|---|---|---|
| Mean episode PnL | $0.031 | $0.013 |
| Inventory exposure | Baseline − 8% | Baseline |
| Eval episodes | 100 out-of-sample | 100 |
| Test suite | 26/26 passing | N/A |

## Architecture

| Component | Detail |
|---|---|
| Algorithm | PPO (clipped, ε=0.2) |
| Networks | LayerNorm Actor-Critic (256→128) |
| State space | 20-dim (OBI, Kyle-λ, vol, spread z-score, depth slope) |
| Advantage | GAE (λ=0.95) |
| Action space | Continuous bid/ask offset (tanh-squashed Gaussian) |
| Data feed | Coinbase Advanced Trade WebSocket L2 |
| Dashboard | Plotly Dash, 500ms refresh |
