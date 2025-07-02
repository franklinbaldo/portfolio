# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is Franklin Baldo's comprehensive portfolio repository containing 43 active projects across multiple domains:
- **34 active GitHub repositories** (fully synchronized)
- **9 unique local projects** (preserved for historical/development value)
- **Technology focus**: Legal Tech, AI/ML, Web Development, Data Processing, Automation

## Repository Management Commands

### GitHub Synchronization
```bash
# List all GitHub repositories
gh repo list franklinbaldo --limit 100

# Clone missing repositories
gh repo clone franklinbaldo/<repo-name>

# Sync all repositories (fetch latest changes)
for repo in */; do cd "$repo" && git fetch --all && git pull && cd ..; done

# Check repository status across all projects
for repo in */; do echo "=== $repo ===" && cd "$repo" && git status --porcelain && cd ..; done
```

### Repository Analysis and Management
```bash
# Count total projects
ls -1 | grep -v 'README.md' | wc -l

# Compare local vs GitHub repositories
gh repo list franklinbaldo --limit 100 | awk '{print $1}' | cut -d'/' -f2 | sort > /tmp/github_repos.txt
ls -1 | grep -v 'README.md' | sort > /tmp/local_repos.txt
comm -23 /tmp/github_repos.txt /tmp/local_repos.txt  # On GitHub but not local
comm -13 /tmp/github_repos.txt /tmp/local_repos.txt  # Local but not on GitHub

# Check for repositories that need attention
find . -name "requirements.txt" -o -name "package.json" -o -name "pyproject.toml" | head -20
```

## Architecture and Project Categories

### Legal Tech Projects (High Priority)
- **causaganha**: Distributed judicial analysis platform with AI (Python, Gemini AI, DuckDB)
- **gabinete-automatico**: PGE-RO automation with Google Apps Script and AI
- **pje-downloader**: TJRO court system automation (Python, Playwright)
- **download-pje**: Alternative PJe download system
- **pje_identificador**: Chrome extension for PJe system identification

### AI/ML and Data Processing
- **hronir**: Literary protocol inspired by Borges (Python, Pydantic, NetworkX, DuckDB)
- **perquire**: Query tool with Akinator-style investigation system
- **textura**: Text processing and strategy refinement
- **caixaaberta**: Real estate data pipeline (dbt, DuckDB, Internet Archive)

### Web Development and Templates
- **astrowind**: Astro website template (customized local version)
- **franklinbaldo**: Personal website (Astro, TypeScript)
- **tembiu**: PWA menu application
- **fillme**: Svelte form application

### Automation and Tools
- **manifold_football**: Sports betting market automation (Google Apps Script)
- **sites_prefeituras**: Brazilian municipality website analysis
- **tambaqui**: Monetary correction tables system
- **opencnpj**: CNPJ data ETL system

## Development Standards Across Projects

### Python Projects
Most Python projects use modern tooling:
- **uv** for dependency management (preferred)
- **pyproject.toml** for configuration
- **pytest** for testing
- **ruff** for linting and formatting

```bash
# Standard Python development workflow
uv sync                    # Install dependencies
uv run pytest            # Run tests
uv run ruff check .       # Lint code
uv run ruff format .      # Format code
```

### JavaScript/Node.js Projects
- **npm** or **bun** for package management
- **ESLint** for linting
- **Prettier** for formatting

### Project-Specific Important Files
- **CLAUDE.md**: Development guidance (especially in hronir, causaganha, leizilla)
- **AGENTS.md**: AI agent interaction patterns
- **TODO.md**: Development roadmaps and pending tasks
- **CONTRIBUTING.md**: Project-specific contribution guidelines

## Repository Maintenance Guidelines

### When Working on Multiple Projects
1. **Always check for existing CLAUDE.md** in the specific project before starting work
2. **Respect project-specific development patterns** found in individual repositories
3. **Use uv run for Python projects** that have uv.lock files
4. **Check for project-specific testing commands** in individual README files

### Common Project Structures
- **Python Legal Tech**: Usually have `src/` directory, CLI interfaces, and database integration
- **Web Projects**: Mix of static sites (Astro) and dynamic applications (React, Svelte)
- **Automation Scripts**: Often Google Apps Script with local development setup

### Repository Status Management
The main README.md serves as a comprehensive index of all projects with:
- GitHub links and activity status
- Technology stacks and project categories
- Development status indicators (Active, Experimental, Planning, etc.)

### Synchronization Notes
- All GitHub repositories are actively maintained and should be kept in sync
- Local-only projects are preserved for historical value or ongoing development
- The repository underwent major cleanup in 2025, reducing from ~62 to 43 projects while maintaining all valuable code

## Project Priority Levels
1. **High Priority**: Legal tech automation (causaganha, gabinete-automatico, pje-*)
2. **Medium Priority**: AI/ML research projects (hronir, perquire, textura)
3. **Low Priority**: Experimental and template projects

When working across multiple projects, prioritize legal tech and AI/ML projects as they represent the most active development areas.