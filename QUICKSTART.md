# Blog Deployment Quickstart

Your minimalist blog is ready to go. Here's how to get it live on GitHub Pages in under 5 minutes.

## Prerequisites

- A GitHub account
- Git installed on your machine
- A terminal/command prompt

## Step 1: Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name the repository `blog` (or whatever you prefer)
3. Choose **Public** (so GitHub Pages can serve it)
4. **Don't** initialize with README, .gitignore, or license
5. Click "Create repository"

You'll see a page with instructions. Copy the HTTPS URL—you'll need it in the next step.

## Step 2: Run the Deploy Script

From your blog directory, run:

```bash
bash deploy.sh
```

The script will:
- Initialize git (if not already done)
- Commit your blog files
- Ask for your GitHub username and repository name
- Push everything to GitHub
- Show you your live blog URL

You'll be prompted to authenticate with GitHub. Use one of these options:

### Authentication Methods

**Option A: Personal Access Token (Recommended)**
1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name like "blog-deploy"
4. Check `repo` scope
5. Click "Generate token"
6. Copy the token
7. When prompted for a password, paste the token (not your GitHub password)

**Option B: SSH Key**
- If you have SSH keys set up, the script will use them automatically
- No password prompt needed

**Option C: HTTPS + GitHub CLI**
```bash
gh auth login
# Then run the deploy script again
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub (e.g., github.com/yourusername/blog)
2. Click **Settings** → **Pages**
3. Under "Source", select **Deploy from a branch**
4. Choose the branch (usually `main` or `master`)
5. Click **Save**

Wait 1-2 minutes for the site to build.

## Step 4: Visit Your Blog

Your blog is now live at:

```
https://yourusername.github.io/blog
```

(Or replace `blog` with your custom repository name)

## Making Changes

To add new posts or edit the homepage:

1. Edit the HTML files locally
2. Commit and push:
   ```bash
   git add .
   git commit -m "Update: add new post"
   git push origin main
   ```
3. GitHub Pages rebuilds automatically (usually within a minute)

## File Structure

```
blog/
├── index.html                          # Homepage (lists all posts)
├── posts/
│   ├── hello-world.html               # Example: intro post
│   ├── how-to-build-things.html       # Example: practical post
│   └── text-viewer-component.html     # Example: technical post
├── deploy.sh                           # Deployment automation script
└── QUICKSTART.md                       # This file
```

## Creating New Posts

Each post is a standalone HTML file with the same styling as the examples.

**Quick template for new posts:**

1. Copy `posts/hello-world.html` to `posts/your-post-title.html`
2. Update:
   - The `<title>` tag
   - The `<h1>` heading
   - The `<div class="post-meta">` date
   - The `<article>` content
3. Add a link in `index.html`:
   ```html
   <li class="post-item">
       <div class="post-title">
           <a href="posts/your-post-title.html">Your Post Title</a>
       </div>
       <div class="post-meta">April 16, 2026</div>
       <div class="post-excerpt">One-line summary of the post.</div>
   </li>
   ```
4. Push to GitHub:
   ```bash
   git add .
   git commit -m "Add post: Your Post Title"
   git push origin main
   ```

## Customization

All styling is inline CSS. To customize:

**Colors:**
- Change `background: #fff` for the background
- Change `color: #222` for text
- Change `color: #0066cc` for link color

**Layout:**
- Change `max-width: 680px` for container width
- Change `padding: 40px 20px` for spacing
- Change `font-size: 16px` for base font size

**Typography:**
- The font stack uses system fonts (no downloads)
- Change `line-height: 1.65` to adjust spacing

## Troubleshooting

**"fatal: destination path already exists"**
- You already have a `.git` directory. Run: `git status` and make sure everything is committed before re-running the script.

**GitHub Pages not showing after 5 minutes**
1. Check the Settings → Pages section for build errors
2. Make sure the repository is public
3. Make sure you're visiting `https://` (not `http://`)

**Remote already exists error**
- The script handles this, but if you run it twice, it will remove the old remote and add a new one.

**Can't authenticate**
- Make sure you're using a personal access token or SSH key, not your GitHub password
- Check that your GitHub account has permission to create repositories

## Tips

- Keep posts focused and atomic
- Use the example posts as templates
- No need to optimize images (there aren't any)
- The whole site is just plain HTML—it's fast and future-proof
- Share your blog! It's a great way to build an audience

## What's Next?

- Write your first real post
- Add an about page
- Link to your social profiles in the nav
- Share on social media

Happy blogging! 🚀
