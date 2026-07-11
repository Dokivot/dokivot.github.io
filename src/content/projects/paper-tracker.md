---
title: "PaperTracker — ArXiv Paper Manager"
description: "A CLI tool for tracking, tagging, and organizing research papers from ArXiv, with automatic BibTeX generation and a local knowledge graph."
tech_stack: ["Python", "SQLite", "ArXiv API", "Rich"]
repo_url: "https://github.com/Dokivot/paper-tracker"
status: "completed"
order: 2
---

## Motivation

I was drowning in open tabs of ArXiv papers. Existing tools were either too heavy (Zotero) or didn't support the tagging-and-linking workflow I wanted. PaperTracker is opinionated toward how I actually read papers: tag first, read later, link related work.

## Features

- **`pt add <arxiv-id>`**: Fetch metadata, download PDF, auto-extract BibTeX
- **`pt tag <id> <tags>`**: Hierarchical tagging (e.g., `attention`, `rlhf/alignment`)
- **`pt link <id1> <id2>`**: Create bidirectional links between papers
- **`pt ls --tag rlhf`**: List papers by tag, sorted by relevance
- **Local SQLite database** with full-text search on titles and abstracts

## Design

```
PaperTracker
├── pt                 # CLI entry point (Click)
├── core/
│   ├── fetcher.py     # ArXiv API + PDF download
│   ├── parser.py      # Metadata extraction, BibTeX generation
│   ├── db.py          # SQLite schema + queries
│   └── graph.py       # Paper relationship graph (networkx)
└── ui/
    └── display.py     # Rich tables and formatting
```

## Usage

```bash
# Add a paper
pt add 1706.03762

# Tag it
pt tag 1706.03762 transformers attention foundational

# Find related
pt ls --tag attention --limit 10

# Generate BibTeX for all tagged papers
pt export --bibtex --tag foundational > refs.bib
```
