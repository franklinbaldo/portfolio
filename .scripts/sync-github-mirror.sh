#!/bin/bash

# GitHub Mirror Synchronization Script
# Mantém repositórios locais em espelho perfeito com GitHub
# Author: Franklin Baldo

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
GITHUB_USER="franklinbaldo"
REPOS_DIR="/mnt/c/Users/frank/Repos"
TEMP_DIR="/tmp"

log() {
    echo -e "$1"
}

sync_repos() {
    log "${BLUE}🔄 Sincronizando repositórios com GitHub...${NC}"
    
    cd "$REPOS_DIR" || exit 1
    
    # Get GitHub repos
    gh repo list "$GITHUB_USER" --limit 200 --json name | grep -o '"name":"[^"]*"' | cut -d'"' -f4 > "$TEMP_DIR/github_repos.txt"
    
    # Get local repos
    find . -maxdepth 1 -type d -name ".*" -prune -o -type d -name "*" -print | grep -v "^\.$" | sed 's|^\./||' | grep -v "scripts\|gists" > "$TEMP_DIR/local_repos.txt"
    
    # Find differences
    comm -23 <(sort "$TEMP_DIR/github_repos.txt") <(sort "$TEMP_DIR/local_repos.txt") > "$TEMP_DIR/missing_local.txt"
    comm -13 <(sort "$TEMP_DIR/github_repos.txt") <(sort "$TEMP_DIR/local_repos.txt") > "$TEMP_DIR/extra_local.txt"
    
    # Clone missing
    while IFS= read -r repo; do
        if [[ -n "$repo" ]]; then
            log "${BLUE}📥 Clonando $repo...${NC}"
            git clone "git@github.com:$GITHUB_USER/$repo.git" 2>/dev/null || log "${RED}❌ Erro clonando $repo${NC}"
        fi
    done < "$TEMP_DIR/missing_local.txt"
    
    # Update existing
    for repo in */; do
        repo_name="${repo%/}"
        if [[ -d "$repo_name/.git" ]]; then
            log "${BLUE}🔄 Atualizando $repo_name...${NC}"
            cd "$repo_name" && git pull 2>/dev/null && cd .. || log "${YELLOW}⚠️ Erro atualizando $repo_name${NC}"
        fi
    done
    
    log "${GREEN}✅ Sincronização concluída!${NC}"
    
    # Cleanup
    rm -f "$TEMP_DIR/github_repos.txt" "$TEMP_DIR/local_repos.txt" "$TEMP_DIR/missing_local.txt" "$TEMP_DIR/extra_local.txt"
}

# Run sync
sync_repos