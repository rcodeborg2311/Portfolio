---
title: "Lock-Free Limit Order Book"
description: "C++20 price-time priority matching engine processing 2.6M+ orders/sec via lock-free MPSC queue and wait-free SPSC ring buffer, achieving sub-microsecond P99 matching latency with zero heap allocation on the hot path."
pubDate: 2026-03-01
updatedDate: 2026-03-15
heroImage: ../../assets/blog-placeholder-about.png
tags: ["C++20", "HFT", "Systems", "Lock-Free", "WebSocket", "React"]
---

**Live Demo:** [lob-engine-lock-free.vercel.app](https://lob-engine-lock-free.vercel.app/)

## Overview

A production-grade C++20 limit order book and matching engine built around lock-free data structures, targeting sub-microsecond P99 matching latency with zero heap allocation on the critical path.

## Technical Highlights

- **Matching Engine:** Engineered a C++20 price-time priority matching engine processing **2.6M+ orders/sec** via a lock-free MPSC queue (Vyukov exchange) and wait-free SPSC ring buffer (Lamport), achieving sub-microsecond P99 matching latency with zero heap allocation on the hot path.

- **Cache-Line Isolation:** Eliminated cross-core false sharing using `alignas(64)` cache-line isolation on all concurrent structs (Order pool, queue heads, EventLog slots), reducing thread contention across MPSC producer threads.

- **Pre-Trade Risk Engine:** Implemented atomic net-position tracking at ~5ns overhead per order, enforcing per-order notional, quantity, and max long/short limits without a single mutex on the critical path.

- **Zero-Allocation EventLog:** Architected a zero-allocation LMAX Disruptor-style EventLog (64K-slot ring buffer) enabling lock-free audit trail with single `atomic::store` writes and independent multi-reader cursors, decoupling the matching core from all downstream consumers.

- **NASDAQ ITCH 5.0 Parser:** Parsed NASDAQ TotalView-ITCH 5.0 binary protocol (big-endian, A/D/E/U/X message types) to replay real exchange data through the engine, validating IOC/FOK/GTC order semantics against production-grade market feeds.

- **Live Trading Dashboard:** Built a React/TypeScript trading dashboard streaming live order book depth, fill tape, VWAP, and book imbalance at 60Hz over a self-implemented RFC 6455 WebSocket server with zero external C++ dependencies.

## Key Results

| Metric | Value |
|---|---|
| Order throughput | 2.6M+ orders/sec |
| P99 matching latency | Sub-microsecond |
| Heap allocations (hot path) | Zero |
| Risk check overhead | ~5ns per order |
| EventLog capacity | 64K slots (ring buffer) |
