---
title: "Snap2Plan: AI-Powered Task Management"
description: "Full-stack SaaS application using Next.js, Supabase, and Claude/Gemini Vision APIs to extract structured tasks from handwritten notes, photos, and voice input, featuring real-time Kanban, Google Calendar sync, and automated email reminders."
pubDate: 2026-02-01
updatedDate: 2026-03-01
heroImage: ../../assets/snap2plan.png
tags: ["Next.js", "TypeScript", "Supabase", "AI/ML", "SaaS", "PostgreSQL"]
liveUrl: "https://snap-2-plan.vercel.app/"
---

**Live App:** [snap-2-plan.vercel.app](https://snap-2-plan.vercel.app/) · **GitHub:** [github.com/rcodeborg2311/SNAP2PLAN](https://github.com/rcodeborg2311/SNAP2PLAN)

## Overview

Snap2Plan is a production-deployed full-stack SaaS application that uses Claude (Anthropic) and Gemini Vision APIs to extract structured tasks from handwritten notes, photos, and voice input, thereby reducing manual task creation to under 10 seconds.

## Technical Highlights

- **Full-Stack Architecture:** Engineered using Next.js 16 App Router, Supabase (PostgreSQL + RLS), and TypeScript, deployed to production on Vercel with CI/CD via GitHub Actions.

- **AI Task Extraction:** Integrated Claude (Anthropic) and Gemini Vision APIs to extract structured tasks from handwritten notes, photos, and voice input, reducing manual task creation to **under 10 seconds**.

- **Real-Time Kanban:** Architected a real-time Kanban board with drag-and-drop (dnd-kit) and Supabase Realtime WebSocket subscriptions, enabling live cross-device sync without page refresh.

- **Google Calendar OAuth 2.0:** Implemented token refresh logic allowing users to sync tasks as calendar events with automatic expiry handling and reconnect flows.

- **Automated Email Reminders:** Built an automated email reminder pipeline using Brevo SMTP (nodemailer) and a Vercel cron job, delivering deadline notifications at 72h/24h/2h intervals to registered users.

- **Row-Level Security:** Designed RLS policies across 5 database tables and a public board-sharing system using tokenized URLs, ensuring zero cross-user data leakage.

- **Analytics Dashboard:** Delivered an end-to-end analytics dashboard tracking completion rates, priority breakdowns, and streaks using aggregated Supabase queries and Recharts visualizations.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, TypeScript, dnd-kit, Recharts |
| Backend/DB | Supabase (PostgreSQL + RLS + Realtime) |
| AI | Claude (Anthropic), Gemini Vision |
| Auth | Google OAuth 2.0 |
| Email | Brevo SMTP, nodemailer, Vercel Cron |
| Deployment | Vercel + GitHub CI/CD |
