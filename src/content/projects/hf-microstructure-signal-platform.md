---
title: "HF Market Microstructure Signal Platform"
description: "Research-grade real-time microstructure signal platform streaming live Coinbase BTC-USD L2 order book data, computing OFI, VPIN, Kyle's Lambda, and Hawkes process intensity, with a Hamilton-Jacobi-Bellman PDE optimal market-making solver — deployed on a React/FastAPI/Railway stack with a C++ high-performance engine."
pubDate: 2026-04-03
heroImage: ../../assets/SIG.png
tags: ["Python", "C++", "React", "TypeScript", "FastAPI", "WebSocket", "Market Microstructure", "HJB PDE", "Quantitative Finance"]
liveUrl: "https://high-frequency-microstructure-sig.vercel.app/"
---

**Live App:** [high-frequency-microstructure-sig.vercel.app](https://high-frequency-microstructure-sig.vercel.app/) · **GitHub:** [github.com/rcodeborg2311/high_frequency_microstructure_SIG](https://github.com/rcodeborg2311/high_frequency_microstructure_SIG)

## Overview

A research-grade implementation of the core market microstructure toolkit used in quantitative finance. Connects directly to Coinbase's BTC-USD Level 2 order book feed and computes four real-time microstructure signals derived from academic literature, while simultaneously solving and displaying the optimal market-making quoting policy from a Hamilton-Jacobi-Bellman PDE. Everything from the signal math to the WebSocket streaming to the React dashboard was built from scratch with direct reference to the original academic papers.

## Technical Highlights

- **Order Flow Imbalance (OFI):** Implemented Cont, Kukanov & Stoikov (2014) per-level OFI with O(1) incremental server-side computation using running deque sums. Normalized OFI ∈ [−1, +1] via rolling signed-volume ratio. Includes OLS price impact regression (ΔP = α + β·ŌFIP) with R², β, and p-value output. Validated with IC > 0.01, p < 0.01 against synthetic data where OFI → price causality is hardwired.

- **VPIN Toxicity Detection:** Implemented Easley, López de Prado & O'Hara (2012) volume-synchronized PIN using bulk volume classification (V_buy = V·Φ(ΔP/σ_ΔP)) across 20 trailing volume buckets. VPIN > 0.7 triggers adverse selection alerts. Demonstrated predictive power: Easley et al. recorded VPIN = 0.93 before the May 6, 2010 Flash Crash.

- **Kyle's Lambda:** Implemented the rolling O(1) OLS estimator λ̂ = Σ(q·ΔP)/Σ(q²) from Kyle (1985), using cumulative sum deques to avoid per-tick array allocation. Intraday U-shape binning method surfaces open/close liquidity asymmetry.

- **Hawkes Process (MLE + Simulation):** Fit self-exciting arrival intensity λ(t) = μ + α·Σexp(−β(t−tᵢ)) via L-BFGS-B on the O(N) recursive log-likelihood (Bacry et al. 2015). Ogata thinning simulation generates exact sample paths. KS test on compensated residuals validates goodness-of-fit. Stationarity enforced via branching ratio penalty α/β < 1.

- **HJB Optimal Market-Making PDE:** Solved the Avellaneda-Stoikov (2008) / Cartea-Jaimungal-Penalva (2015) Hamilton-Jacobi-Bellman PDE for optimal bid/ask spreads via backward Euler on an 80-step × 21-inventory grid. Optimal spreads δ*(q) are derived from the value function difference h(t,q±1) − h(t,q), validated against the closed-form approximation (max deviation < 0.0001). Interactive γ slider triggers live PDE recomputation via `/api/hjb`.

- **C++ High-Performance Engine:** Parallel C++ implementation of OFI, HJB solver, LOB parser, and Hawkes MLE using `std::deque` rolling windows and Catch2-verified at 1M snapshots/second. `QuotingPolicy::get_quotes(t, q)` is a pure array-lookup hot path — zero math at quote time.

- **Live WebSocket Architecture:** FastAPI backend streams 8KB state frames at 250ms intervals over WebSocket. Coinbase L2 feed parsed in a daemon thread; synthetic LOB fallback runs in parallel with automatic failover. Signal computation is O(1) per tick with no allocations in the hot path.

- **React/TypeScript Dashboard:** Custom SVG LOB depth chart (bid bars left, ask bars right, HJB quote overlays), dual-axis Recharts signal panel with Z-scored OFI/VPIN/Kyle λ, interactive HJB spread curves, and Hawkes intensity timeline with trade arrival events. Deployed on Vercel against a Railway-hosted FastAPI backend.

## Signal Summary

| Signal | Reference | Output |
|---|---|---|
| Order Flow Imbalance | Cont et al. (2014) | ŌFIP ∈ [−1, +1], price impact β |
| VPIN | Easley et al. (2012) | VPIN ∈ [0, 1], toxicity alert > 0.7 |
| Kyle's Lambda | Kyle (1985) | λ̂ $/share, intraday U-shape |
| Hawkes Process | Bacry et al. (2015) | λ(t), μ, α, β, branching ratio α/β |

## Architecture

| Layer | Technology | Role |
|---|---|---|
| Data feed | Coinbase Advanced Trade WSS | Live BTC-USD L2 order book |
| Backend | FastAPI + Python 3.12 | Signal computation, HJB PDE solver, WebSocket streaming |
| Performance | C++ (CMake, Catch2) | 1M snapshots/sec feature engine, HJB solver hot path |
| Frontend | React 18, TypeScript, Vite, Recharts | Live dashboard, interactive HJB controls |
| Deployment | Railway (backend) + Vercel (frontend) | Split deploy, CDN-delivered SPA |

## HJB Optimal Spread

```
δ*_total ≈ 2/k + γσ²(T−t)

γσ²(T−t) = inventory risk premium — extra spread for holding
            inventory risk to session end. Collapses to 2/k at T.
```

The interactive inventory slider (q ∈ [−10, +10]) and risk aversion slider (γ ∈ [0.001, 0.1]) trigger live PDE recomputation, showing how the optimal quoting policy shifts with inventory skew and risk preference.
