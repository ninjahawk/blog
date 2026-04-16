#!/bin/bash

set -e

echo "🚀 Blog Deployment Script"
echo "========================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing git repository..."
    git init
    git config user.name "Blog Author"
    git config user.email "$(git config --global user.email || echo 'author@example.com')"
    echo "✓ Git initialized"
else
    echo "✓ Git repository already initialized"
fi

echo ""

# Add and commit files
echo "📝 Staging and committing files..."
git add index.html posts/ deploy.sh QUICKSTART.md 2>/dev/null || true
git add . 2>/dev/null || true

if git diff --cached --quiet; then
    echo "⚠ No changes to commit"
else
    git commit -m "Initial blog commit: Add posts and deployment files" || true
    echo "✓ Files committed"
fi

echo ""

# Ask for GitHub username
echo "🔐 GitHub Configuration"
read -p "Enter your GitHub username: " github_username

if [ -z "$github_username" ]; then
    echo "❌ GitHub username required"
    exit 1
fi

repo_name="blog"
read -p "Enter repository name (default: 'blog'): " custom_repo_name
repo_name="${custom_repo_name:-$repo_name}"

echo ""
echo "📤 Setting up remote..."

# Check if remote already exists
if git remote | grep -q origin; then
    git remote remove origin
fi

repo_url="https://github.com/$github_username/$repo_name.git"
git remote add origin "$repo_url"
echo "✓ Remote added: $repo_url"

echo ""
echo "⏳ Pushing to GitHub..."
echo ""
echo "Note: You may be prompted to authenticate with GitHub."
echo "Use a personal access token or SSH key."
echo ""

if git push -u origin main 2>/dev/null; then
    branch="main"
elif git push -u origin master 2>/dev/null; then
    branch="master"
else
    echo "⚠ Failed to push to default branch"
    echo "You may need to push manually with: git push -u origin HEAD"
    branch="<your-branch>"
fi

echo ""
echo "✅ Deployment Complete!"
echo "========================="
echo ""
echo "🌐 Your blog is now live at:"
echo "   https://$github_username.github.io/$repo_name"
echo ""
echo "📚 Next steps:"
echo "   1. Enable GitHub Pages in repository settings"
echo "   2. Set source to 'Deploy from a branch'"
echo "   3. Select 'main' (or '$branch') branch"
echo ""
echo "⚡ For instant updates:"
echo "   git push origin $(git rev-parse --abbrev-ref HEAD)"
echo ""
