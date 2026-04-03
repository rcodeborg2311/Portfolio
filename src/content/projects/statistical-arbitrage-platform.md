---
title: "Statistical Arbitrage Research Platform"
description: "Production-grade pairs trading backtester in Python using Engle-Granger & Johansen cointegration, Kalman filter dynamic hedge ratios, OU-MLE closed-form estimation, 20+ risk metrics including CVaR/HAC Sharpe, and a 6-tab Streamlit research platform with 163/163 pytest tests passing."
pubDate: 2026-01-15
updatedDate: 2026-02-20
heroImage: ../../assets/stat-arb.png
tags: ["Python", "Quantitative Finance", "Statistics", "Backtesting", "Streamlit", "Kalman Filter"]
liveUrl: "https://statistical-arbitrage-research-platform-dzkhyve2i625wwbzlrknbz.streamlit.app/"
---

**Live App:** [statistical-arbitrage-research-platform.streamlit.app](https://statistical-arbitrage-research-platform-dzkhyve2i625wwbzlrknbz.streamlit.app/) · **GitHub:** [github.com/rcodeborg2311/Statistical-Arbitrage-Research-Platform](https://github.com/rcodeborg2311/Statistical-Arbitrage-Research-Platform)

## Overview

A production-grade statistical arbitrage research platform implementing the full pairs trading pipeline. This encompasses the entire process from cointegration testing through signal generation, dynamic hedge ratio estimation, and comprehensive risk analytics, all deployed on Streamlit Cloud.

## Technical Highlights

- **Pairs Trading Backtester:** Engineered using Engle-Granger & Johansen cointegration, event-driven dollar-neutral simulation, and stateful Z-score signal generation verified look-ahead-free via hand-traced unit tests.

- **Kalman Filter Hedge Ratios:** Implemented a Kalman filter state-space model (predict-update recursion, configurable δ adaptation) for dynamic hedge ratio estimation, replacing static OLS and eliminating stale beta during regime changes (e.g., 2020 COVID volatility spike).

- **OU-MLE Closed-Form Estimation:** Derived closed-form OU-MLE via sufficient statistics (O(n), no numerical optimisation) to estimate mean-reversion speed κ, equilibrium μ, and theoretical Sharpe ceiling √(2κ × 252) per Avellaneda & Lee (2010).

- **20+ Risk Metrics:** Built metrics beyond Sharpe including CVaR/Expected Shortfall (Basel III), Omega Ratio, HAC Sharpe with Newey-West standard errors (Andrews 1991 bandwidth), Ulcer Index, and CAPM residual Sharpe decomposition for market-neutral alpha isolation.

- **Risk-Parity Portfolio Engine:** Constructed inverse-vol weights with volatility targeting via full covariance matrix, 2,000-path Monte Carlo simulation, and 6 historical stress scenarios (GFC, COVID crash, 2022 rate shock, 2018 VIX spike).

- **6-Tab Research Platform:** Delivered parameter sensitivity heatmaps, transaction cost sweep curves, and a full Knowledge Base. This includes theme-adaptive CSS using Streamlit CSS variables for seamless light and dark mode support.

## Test Coverage

**163/163 pytest unit tests** with zero failures across 9 test modules, covering cointegration recovery, look-ahead bias, commission edge cases, and Monte Carlo distribution invariants. Flake8 clean at `max-line-length=100`.

## Key Metrics

| Metric | Detail |
|---|---|
| Cointegration tests | Engle-Granger + Johansen |
| Hedge ratio model | Kalman Filter (dynamic) vs static OLS |
| OU parameter estimation | Closed-form MLE, O(n) |
| Risk metrics | 20+ (CVaR, HAC Sharpe, Omega, Ulcer, CAPM α) |
| Monte Carlo paths | 2,000 |
| Stress scenarios | 6 (GFC, COVID, 2022, 2018 VIX, ...) |
| Test suite | 163/163 passing, 9 modules |
