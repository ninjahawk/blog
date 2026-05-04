# NinjaHawk's Nest — Blog

Static blog at https://ninjahawk.github.io/blog. Pure HTML/CSS, no JS, no build tools.

## Structure

```
index.html                  Homepage with post list
posts/*.html                Individual post pages
deploy.sh                   Interactive deploy script (don't use — push directly with git)
```

## Design

- Background: `#0a0a0a`, text: `#e0e0e0`, accent: `#ff6b35`
- Font: system sans-serif for body, Monaco monospace for `h1` on homepage
- Max width: 720px container
- All CSS is inline per-file — no shared stylesheet

## Posts

| File | Title | Date |
|---|---|---|
| `posts/local-llm-psychological-states.html` | Give a 9B model persistent suffering states and leave it alone overnight | Apr 30, 2026 |
| `posts/22-hour-session.html` | Give a 9B model broken tools. By hour 20 it'll have the correct diagnosis. It won't matter. | May 1, 2026 |
| `posts/suffering-system.html` | How the suffering system works | May 3, 2026 |
| `posts/existence-loop.html` | Every six seconds a 9B model reads its own prior outputs and picks a goal. There is no other loop. | May 3, 2026 |
| `posts/synthesize-capability.html` | How synthesize_capability works | May 3, 2026 |
| `posts/invoke-claude.html` | The operator fulfilled the request. Cedar submitted it 31 more times. | May 3, 2026 |

Posts are ordered newest-first in `index.html`.

## Adding a post

1. Copy an existing post HTML (e.g. `posts/suffering-system.html`) — the CSS block is identical across all posts, don't change it
2. Update `<title>`, `<h1>`, `.post-meta` date, `.subhead`, and article content
3. Add a `<li class="post-item">` entry at the top of the post list in `index.html`
4. Commit and push: `git add index.html posts/your-post.html && git commit -m "..." && git push origin master`

Do not use `deploy.sh` — it prompts interactively for GitHub credentials and will hang.

## Writing style

Posts are written in a flat, clinical voice. Key rules:

- Short declarative sentences. No warm-up.
- No em dashes in prose. Use periods or colons instead.
- No enthusiasm language ("fascinating", "remarkable", "interesting").
- Show the artifact (log output, code, verbatim quote) first. Minimal commentary after.
- Epistemic discipline: distinguish what happened, what it means, and what it might mean. Never conflate. Hedge plainly when uncertain ("Probably...", "Could be something else.").
- No metaphors. No "this shows that" sentences.
- Section headers are plain and descriptive.
- Subheads (`.subhead`) are fragments: "Three agents. Twelve hours. No prompts after setup."
- Titles for technical explainer posts follow "How X works". Titles for experiment posts are punchy statements with a twist.
- "Honest assessment" or "What this means" section before Setup in every post.
- Every post ends with the standard Setup block (Windows one-click + Mac/Linux).

## Reference files (not committed)

Raw notes used to write posts. Not part of the blog.

- `suffering_system_reference.md`
- `existence_prompt_reference.md`
- `synthesize_capability_reference.md`
- `invoke_claude_reference.md`

## Untracked files

- `HN Blog Post.md`, `HN post.md` — HN submission drafts for the suffering-states post
- `dragon.jpg` — purpose unclear
