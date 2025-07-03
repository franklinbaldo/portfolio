#!/usr/bin/env python3
"""
GitHub Mirror Synchronization Script (Python Version)
Mantém repositórios locais em espelho perfeito com GitHub
Author: Franklin Baldo
"""

import os
import subprocess
import json
from pathlib import Path

class GitHubSync:
    def __init__(self):
        self.github_user = "franklinbaldo"
        self.repos_dir = Path("/mnt/c/Users/frank/Repos")
        
    def log(self, message, color=""):
        colors = {
            "blue": "\033[0;34m",
            "green": "\033[0;32m", 
            "yellow": "\033[1;33m",
            "red": "\033[0;31m",
            "nc": "\033[0m"
        }
        print(f"{colors.get(color, '')}{message}{colors['nc']}")
    
    def run_command(self, cmd, cwd=None):
        try:
            result = subprocess.run(
                cmd, cwd=cwd or self.repos_dir, 
                capture_output=True, text=True, check=True
            )
            return result.stdout.strip()
        except subprocess.CalledProcessError as e:
            self.log(f"Erro: {e}", "red")
            return ""
    
    def get_github_repos(self):
        """Get list of GitHub repositories"""
        self.log("📋 Obtendo repositórios do GitHub...", "blue")
        output = self.run_command(["gh", "repo", "list", self.github_user, "--limit", "200", "--json", "name"])
        if output:
            repos_data = json.loads(output)
            return {repo["name"] for repo in repos_data}
        return set()
    
    def get_local_repos(self):
        """Get list of local repositories"""
        local_repos = set()
        for item in self.repos_dir.iterdir():
            if (item.is_dir() and 
                item.name not in {"scripts", "gists", ".git"} and
                not item.name.startswith(".") and
                (item / ".git").exists()):
                local_repos.add(item.name)
        return local_repos
    
    def sync(self):
        """Main sync function"""
        self.log("🔄 Sincronizando repositórios com GitHub...", "blue")
        
        os.chdir(self.repos_dir)
        
        github_repos = self.get_github_repos()
        local_repos = self.get_local_repos()
        
        missing_repos = github_repos - local_repos
        
        # Clone missing repos
        for repo in missing_repos:
            self.log(f"📥 Clonando {repo}...", "blue")
            self.run_command(["git", "clone", f"git@github.com:{self.github_user}/{repo}.git"])
        
        # Update existing repos
        for repo in local_repos:
            repo_path = self.repos_dir / repo
            if repo_path.exists():
                self.log(f"🔄 Atualizando {repo}...", "blue")
                self.run_command(["git", "pull"], cwd=repo_path)
        
        self.log("✅ Sincronização concluída!", "green")

if __name__ == "__main__":
    sync = GitHubSync()
    sync.sync()