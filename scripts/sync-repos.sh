#!/bin/bash
# GitHub Sync Script - Franklin Baldo

set -e
GITHUB_USER="franklinbaldo"
REPOS_DIR="/mnt/c/Users/frank/Repos"

echo "🔄 Sincronizando com GitHub..."
cd "$REPOS_DIR" || exit 1

# Get GitHub repos and clone missing ones
gh repo list "$GITHUB_USER" --limit 200 | while read -r repo _; do
    repo_name=$(basename "$repo")
    if [[ ! -d "$repo_name" ]]; then
        echo "📥 Clonando $repo_name..."
        git clone "git@github.com:$repo.git" 2>/dev/null || echo "❌ Erro em $repo_name"
    fi
done

# Update existing repos  
for dir in */; do
    if [[ -d "$dir/.git" ]]; then
        echo "🔄 Atualizando ${dir%/}..."
        (cd "$dir" && git pull 2>/dev/null) || echo "⚠️ Erro em ${dir%/}"
    fi
done

echo "✅ Sincronização concluída!"