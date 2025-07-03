# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is Franklin Baldo's portfolio repository - a **professional showcase and development workspace**:
- **16 active public GitHub repositories** (fully synchronized)
- **2 private monorepos**: `pge-ro` (professional legal tech) and `sandbox` (personal experiments)
- **Focus areas**: Legal Tech, AI/ML, Web Development, Data Engineering, Blockchain
- **Organization**: Clean separation between public portfolio and private projects

## Current Repository Structure

### **Public Repositories (16)**
```
├── 📁 Legal Tech & Data Analysis (3)
│   ├── causaganha          # Legal AI platform (Python, Gemini, DuckDB)
│   ├── leizilla           # Legislation crawler (Python)
│   └── tambaqui           # Financial tools (Python, HTML)
├── 📁 AI & Machine Learning (3)  
│   ├── hronir             # Literary AI protocol (Python, NetworkX)
│   ├── textura            # Text processing (Python, NLP)
│   └── perquire           # Intelligent query tool (Python, AI)
├── 📁 Data Engineering & Analytics (2)
│   ├── caixaaberta        # Real estate data pipeline (Python, dbt, DuckDB)
│   └── sites_prefeituras  # Municipal web analysis (JavaScript, Node.js)
├── 📁 Web Development (3)
│   ├── franklinbaldo      # Personal website (Astro, TypeScript)
│   ├── tembiu             # PWA menu app (HTML, JavaScript, PWA)
│   └── letra_bonita       # Typography project (HTML, CSS)
├── 📁 Blockchain & Web3 (1)
│   └── Exploreon          # Web3 verification platform (Solidity, World ID)
├── 📁 Tools & Utilities (3)
│   ├── portfolio          # Portfolio management system (Node.js)
│   ├── pontifex           # Utility tool (Python)
│   └── intuit             # Rapid prototyping (HTML)
├── 📁 Social Impact (1)
│   └── heta               # Food donation management (Python, PWA)
└── 📁 Personal & Creative (2)
    ├── mind-fragments     # Idea fragments (Markdown, Notes)
    └── life-of-menard     # Personal experiments (Various)
```

### **Private Monorepos** 
- **`pge-ro/`**: Legal tech projects for Procuradoria Geral do Estado de Rondônia (PRIVATE)
- **`sandbox/`**: Personal experiments and hobby projects (PRIVATE)

### **Utility Directories**
- **`.scripts/`**: GitHub synchronization and management scripts (hidden)
- **`.git/`**: Portfolio repository git tracking
- **`.claude/`**: Claude Code configuration

## Repository Management Commands

### GitHub Synchronization
```bash
# Quick sync all repositories
./.scripts/sync-repos.sh

# Comprehensive sync with error handling
./.scripts/sync-github-mirror.py

# Manual commands
gh repo list franklinbaldo --limit 100
for repo in */; do cd "$repo" && git pull && cd ..; done
```

### Repository Analysis
```bash
# Count public repositories
gh repo list franklinbaldo --json name,visibility | grep "public" | wc -l

# Check repository status
for repo in */; do echo "=== $repo ===" && cd "$repo" && git status --porcelain && cd ..; done

# Find projects by technology
find . -name "requirements.txt" -o -name "package.json" -o -name "pyproject.toml" | head -20
```

## Project Categories and Priorities

### **🏆 Featured Projects (Portfolio Highlights)**
1. **Exploreon** - Blockchain/Web3 verification platform
2. **causaganha** - Legal AI analysis platform  
3. **hronir** - Literary AI protocol (Borges-inspired)
4. **caixaaberta** - Real estate data pipeline
5. **sites_prefeituras** - Municipal transparency analysis
6. **tambaqui** - Financial calculation tools

### **🚀 Active Development Areas**
- **Legal Tech**: AI-powered judicial analysis and automation
- **AI/ML**: NLP, document processing, RAG systems
- **Data Engineering**: Pipeline development, analytics
- **Blockchain**: Web3 identity verification, smart contracts

### **🛠 Technology Stack**
- **Languages**: Python, JavaScript/TypeScript, Solidity, HTML/CSS
- **AI/ML**: Google Gemini, RAG, NLP, vector databases
- **Data**: DuckDB, dbt, Pandas, web scraping
- **Web**: Astro, Svelte, PWA, Node.js
- **Blockchain**: Ethereum, World ID, smart contracts

## Development Standards

### **Python Projects** (Most common)
Modern Python tooling across projects:
```bash
# Preferred workflow with uv
uv sync                    # Install dependencies  
uv run pytest            # Run tests
uv run ruff check .       # Lint code
uv run ruff format .      # Format code

# Alternative with poetry/pip
poetry install && poetry run pytest
pip install -r requirements.txt && python -m pytest
```

### **JavaScript/Node.js Projects**
```bash
npm install               # Install dependencies
npm run dev              # Development server
npm run build            # Production build
npm run lint             # ESLint
```

### **Project-Specific Files to Check**
- **CLAUDE.md**: Project-specific development guidance
- **AGENTS.md**: AI agent interaction patterns  
- **README.md**: Setup and usage instructions
- **pyproject.toml/package.json**: Dependencies and scripts

## Portfolio Management Guidelines

### **When Working on This Portfolio**
1. **PUBLIC ONLY**: Only include/mention public repositories in README.md
2. **NO PRIVATE REFS**: Never reference `pge-ro` or `sandbox` in public documentation
3. **PROFESSIONAL FOCUS**: Maintain professional presentation in main README
4. **SYNC REGULARLY**: Use `.scripts/` to keep repositories synchronized

### **Repository Organization Rules**
- **Public repos**: Direct clones for development and showcase
- **Private monorepos**: Separate spaces for sensitive/personal projects  
- **`.scripts/`**: Hidden utility scripts for maintenance
- **Clean structure**: No utility clutter in main directory listing

### **When Adding New Projects**
1. **Public projects**: Clone directly to main directory
2. **Private/personal**: Add to `sandbox/` monorepo
3. **Professional/client**: Add to `pge-ro/` monorepo  
4. **Update documentation**: README.md for public, respective monorepo README for private

## Maintenance and Synchronization

### **Regular Tasks**
- Sync repositories weekly with `.scripts/sync-repos.sh`
- Update README.md when projects change status
- Maintain professional presentation for public portfolio
- Keep private projects properly segregated

### **GitHub Workflow**
- All public repositories are actively maintained
- Private repositories use separate GitHub repos (`pge-ro`, `sandbox`)
- Main portfolio repository tracks only portfolio management files
- Clean separation between professional showcase and development workspace

## Project Status Indicators
- ✅ **Ativo**: Maintained and actively developed
- 🚧 **Em desenvolvimento**: Currently being built
- 🅰️ **Alpha**: Early version with expected major changes
- 📋 **Planejamento**: In planning phase
- 🧪 **Experimental**: Testing and prototyping
- 📝 **Ativo**: Documentation/notes repository

---

**Last Updated**: July 2025  
**Repository Count**: 16 public + 2 private monorepos  
**Focus**: Professional portfolio with clean organization and private project separation