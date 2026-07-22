# NinjaHawk's Nest — Blog

Static blog at https://ninjahawk.github.io/blog. HTML/CSS, no build tools.

> **Stable UI: v1.0** — current stable UI baseline. News-style reading layout
> (system-sans body, blue links, no dark code panels), lined-up homepage feed,
> arrow-only back link, "© 2026 Nathan Langley" footer, Contact →
> nathanlangley.dev, and the pixel-raven pull-to-refresh (real in-flow page
> slide-down). Treat this as the known-good UI to return to.

## Structure

```
index.html                  Homepage (lined-up story feed — kicker + title + date rows)
style.css                   Shared stylesheet — drives homepage + every post
posts/*.html                Individual post pages (link ../style.css)
deploy.sh                   Interactive deploy script (don't use — push directly with git)
```

## Design

Light editorial / newsstand look, modeled on WIRED. All shared rules live in
`style.css`; pages link it (`style.css` from root, `../style.css` from posts).
Posts no longer carry an inline `<style>` block — the one exception is
`doors-are-inefficient.html`, which keeps a small private block for its bespoke
components (bar charts, math blocks, HN thread, verdict) plus a scroll-animation
script.

- Background `#ffffff`, headlines `#0f0f0f`, body `#26241f`, hairlines `#e6e2d8`
- Accent red `#e5091a`; brand orange `#ff6b35` (secondary)
- Fonts: **Oswald** (Google) for homepage display (masthead, brand, nav, feed
  titles, kickers); **Libre Franklin** (Google) for article headlines and the
  in-body section subheads; the **system UI sans** (`--sans`) for the article
  reading body — matching the mobile terrytao.wordpress.com view, rendering each
  reader's native font (18px / 1.7) for a free-flowing, easy read;
  **Source Serif 4** (Google) for deks and the masthead
  tagline; system monospace for code. Article body links are blue
  (`--art-accent`), plain, underlined on hover.
- Posts avoid dark `pre` code panels. Present data as prose, tables, or lists;
  inline `code` (a light chip) is fine for short identifiers, paths, and commands
- Widths: `--wrap` 1180px for site chrome/homepage, `--read` 720px for article text
- Colors are CSS variables in `style.css :root`. Cover-poster colors are the
  `.cv-*` classes; article kicker colors are the `.k-*` classes.

## Posts

| File | Title | Date |
|---|---|---|
| `posts/local-llm-psychological-states.html` | Give a 9B model persistent suffering states and leave it alone overnight | Apr 30, 2026 |
| `posts/22-hour-session.html` | Give a 9B model broken tools. By hour 20 it'll have the correct diagnosis. It won't matter. | May 1, 2026 |
| `posts/suffering-system.html` | How the suffering system works | May 3, 2026 |
| `posts/existence-loop.html` | Every six seconds a 9B model reads its own prior outputs and picks a goal. There is no other loop. | May 3, 2026 |
| `posts/synthesize-capability.html` | How synthesize_capability works | May 3, 2026 |
| `posts/invoke-claude.html` | The operator fulfilled the request. Cedar submitted it 31 more times. | May 3, 2026 |
| `posts/what-hollow-is.html` | AI: Apologies, I was only doing what was instructed. | May 10, 2026 |
| `posts/singleton-attractor.html` | Godlike Causal Eventuality | May 12, 2026 |
| `posts/doors-are-inefficient.html` | Doors Are Inefficient: A Mathematical Indictment | May 20, 2026 |
| `posts/api-paywalls.html` | They trained on your posts for free. Reading one back costs half a cent. | July 12, 2026 |
| `posts/poke500.html` | I built a stock index for Pokémon cards. The cheapest card in it is a common Psyduck at $226. | July 15, 2026 |
| `posts/subtext.html` | Watching a language model think before it speaks | July 22, 2026 |
| `posts/hn-hidden-score.html` | I went looking for my secret Hacker News score. There isn't one. Your karma is a public sum of numbers nobody can see. | July 22, 2026 |

Posts are ordered newest-first in `index.html`.

## Adding a post

1. Copy a standard post (e.g. `posts/suffering-system.html`). It links `../style.css` and the Google Fonts — leave the `<head>` links as-is.
2. Update `<title>`, and in the `.article-head` block: the `.kicker` (label + `k-*` color class), the `<h1>`, the `.dek` (subhead), and the `.by-date`. Keep `.by-author` as `NinjaHawk`.
3. Write the post body inside `<div class="article-body">…</div>`. Use plain `<p>`, `<h2>`, `<h3>`, `<pre><code>`, `<table>`, `<blockquote>`, `<figure>` — the shared stylesheet styles them all.
4. Add a `.feed-item` row to the `.feed` list in `index.html`, at the top (newest first): a `.kicker` with a `k-*` color class, a `.feed-title` link to the post, and a `.feed-date`. (The old magazine-grid classes — `.picks*`, `.card*`, `.cv-*`, `.more-grid` — still live in `style.css` but are no longer used on the homepage.)
5. Commit and push: `git add index.html posts/your-post.html && git commit -m "..." && git push origin master`

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
- Subheads (the `.dek`) are fragments: "Three agents. Twelve hours. No prompts after setup."
- Titles for technical explainer posts follow "How X works". Titles for experiment posts are punchy statements with a twist.
- "Honest assessment" or "What this means" section before Setup in every post.
- Every post ends with the standard Setup block (Windows one-click + Mac/Linux).

## Reference files (not committed)

Raw notes used to write posts. Not part of the blog.

- `suffering_system_reference.md`
- `existence_prompt_reference.md`
- `synthesize_capability_reference.md`
- `invoke_claude_reference.md`

## Authorship

Always attribute posts and commits to NinjaHawk only. Never include Claude as a co-author — not in commit messages, not in post footers, not in any published text. Git commits use "Blog Author" as the git user. That is correct and sufficient.

## Untracked files

- `HN Blog Post.md`, `HN post.md` — HN submission drafts for the suffering-states post
- `dragon.jpg` — purpose unclear
