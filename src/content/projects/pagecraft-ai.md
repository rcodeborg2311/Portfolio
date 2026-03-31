---
title: "PageCraft AI: Prompt-to-App Generator"
description: "Developer tool that generates and deploys full-stack React/Node.js web applications directly in the browser from natural language prompts, powered by GPT-4/Claude, WebContainers, and Monaco Editor with zero local setup required."
pubDate: 2025-12-01
heroImage: ../../assets/blog-placeholder-5.png
tags: ["React", "TypeScript", "Node.js", "AI/ML", "WebContainers", "GPT-4", "Claude"]
---

**GitHub:** [github.com/rcodeborg2311/PageCraft_AI](https://github.com/rcodeborg2311/PageCraft_AI)

## Overview

PageCraft AI transforms natural-language prompts into deployable React/Node.js applications entirely in the browser. By integrating GPT-4/Claude with StackBlitz WebContainers, it enables instant full-stack development without any local setup, inspired by Bolt.new and Vercel's design philosophy.

## How It Works

1. **User enters a prompt**: e.g., *"Create a landing page with a navbar and contact form"*
2. **Backend enriches the prompt** and routes it to the GPT-4 or Claude API
3. **LLM returns structured XML-like output** describing files, folders, and shell commands
4. **Custom parser** converts the LLM response into a real file tree and command sequence
5. **WebContainer executes** `npm install` and starts a live dev server directly in the browser.
6. **Monaco Editor** allows real-time file edits; users can send follow-up prompts to iterate

## Key Features

- **Prompt-to-Code:** Generate complete React/Node.js projects from plain English, including file structure, dependencies, and boilerplate.
- **In-Browser Execution:** Powered by StackBlitz WebContainers, requiring no Docker, no terminal, and no local Node.js.
- **Live Preview:** `npm install` and `npm run dev` run instantly inside the browser sandbox
- **Real-Time Editing:** Modify generated files via Monaco Editor (same editor as VS Code)
- **Custom XML Parser:** Translates LLM responses into structured files, folder hierarchies, and shell command sequences
- **Iterative Development:** Send follow-up prompts ("add dark mode", "add auth") to extend the generated app without starting over

## Technical Highlights

- Designed a **custom parser** (`parser.ts`) that handles the LLM's XML-like output format, extracting file paths, content blocks, and shell commands as separate primitives, then replaying them sequentially into the WebContainer filesystem.
- Built **prompt enrichment middleware** (`prompts.ts`) on the Express backend that injects system context, file-tree constraints, and output format instructions before hitting the GPT/Claude API to improve output reliability and reduce malformed responses.
- Supports **dual LLM backends** (OpenAI GPT-4 and Anthropic Claude) switchable via environment config, with a unified prompt interface abstracted over both APIs
- Integrated **Monaco Editor** for live in-browser file editing with syntax highlighting, allowing users to make surgical edits to generated code without leaving the app

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, TailwindCSS, Monaco Editor |
| Backend | Node.js, Express.js |
| AI | OpenAI GPT-4, Anthropic Claude |
| Infra | StackBlitz WebContainers |
| Parsing | Custom XML-like LLM output parser |

## Project Structure

```
PageCraft_AI/
├── backend/
│   ├── prompts.ts      # Prompt enrichment & system context injection
│   └── parser.ts       # XML parser and shell command extractor
├── frontend/
│   ├── components/     # Editor, file explorer, preview pane
│   ├── containers/     # WebContainer lifecycle management
│   └── pages/          # Main views
└── package.json
```
