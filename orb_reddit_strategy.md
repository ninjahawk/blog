# Orb — Reddit launch strategy and post drafts

Working notes. Not part of the blog. Same category as `HN post.md`.

Repo: https://github.com/getorb/Orb-Backend (7 stars at time of writing)
App: https://apps.apple.com/us/app/orb-ai/id6776376035

---

## Why there's no traction yet

The pitch is a capability table. Reddit does not convert on capability tables.

The README leads with six rows: voice server, agent spine, multi-brain router, the
mind, sessions, push. That is the right structure for a README and the wrong
structure for a post. A reader scanning six capabilities feels nothing about any of
them. A reader shown one thing that happened to you on a Tuesday feels something.

Three specific problems:

**"Near unlimited potential" reads as "not yet good at anything."** To a technical
audience, breadth is the signature of a demo and depth is the signature of a tool.
Every additional capability in the pitch divides the reader's attention by one more.

**The unfinished work is a liability, not a hook.** Drones and the BB8 will get
"cool, post when it works" and nothing else. Unfinished integrations invite
skepticism about the finished ones. Hold them.

**The genuinely rare thing is buried in the Design stances section.** Everyone
shipping agents in 2026 has the same failure: the agent talks too much. Orb has a
notification choke point with dedup and hard pacing, approval gates, and an explicit
stance that "nothing worth saying" is a correct outcome. Nobody is shipping the
restraint. That is the post.

The second rare thing, also buried: the default brain is the user's own logged-in
`claude -p` CLI. No API key shipped, asked for, or stored. That is a hack the Claude
Code crowd will want to copy the moment they read it.

## The one change

Stop describing the system. Show one week of its output, including the boring
entries and the wrong ones.

The hero artifact is a screenshot of the actual notification list from a real week,
unedited, next to the count of wakes that produced nothing. Something like "41 wakes,
6 messages." The 35 silences are the credential. Anyone can build a thing that
messages you. Getting it to shut up is the hard part, and a technical audience knows
that immediately.

## Why posts get questions

People do not ask questions about polished pitches. There is no opening. They ask
questions when they see:

1. A number that implies a decision ("budget of 40 wakes/day" invites "how did you
   pick 40")
2. A tradeoff they would have made differently
3. An admitted weakness in the thing they care most about

So every draft below states a real number, names a real weakness, and ends on a
question that is genuinely open rather than rhetorical.

---

## Subreddit targeting

Post one at a time, one per week. Do not cross-post the same body.

| Sub | Fit | Angle | Risk |
|---|---|---|---|
| **r/selfhosted** | Strongest first post | Your machine, your keys, MIT backend, one week of real output | Required proprietary iOS client. Disclose in the first line. |
| **r/LocalLLaMA** | Strong, if honest | The between-conversations architecture; ask them to tear apart the brain tier | Will (correctly) attack "local-first" when the default brain is Claude cloud. Get ahead of it. |
| **r/ClaudeAI**, **r/ClaudeCode** | High conversion, smaller | `claude -p` as a resident daemon brain, no API key | Low. This is native content there. |
| **r/homeassistant** | Save for later | Proactive layer + land survey, once drones work | Wants HA integration specifically. Don't post until there is one. |
| **r/diydrones**, **r/drones** | Save for later | Autonomous survey pass reporting to phone | Post only when a flight has actually happened. |
| r/SideProject, r/IndieHackers | Skip | — | Upvotes without questions. Wrong audience for depth. |

Order: **r/selfhosted → r/ClaudeAI → r/LocalLLaMA**. If you already posted in one of
these, skip it and start at the next.

---

## Draft A — r/selfhosted (post this first)

Fill every `[ ]` with real data from your own logs. Do not round the numbers to
something tidy; ragged numbers read as measured, round numbers read as estimated.

**Title options** (pick one, all built on the same reversal):

- My self-hosted assistant woke up [41] times last week and messaged me [6] times.
  The [35] silences are the part I worked hardest on.
- I self-host an assistant that decides on its own when not to talk to me. One week
  of logs.
- Six months of building a proactive assistant, and the hardest feature was
  teaching it to say nothing

**Body:**

> I'm the developer, so flag this as self-promo if that's the rule here. Backend is
> MIT, runs on my own Windows box, no account and no cloud of mine in the path. The
> iPhone client is closed-source and free on the App Store, which I know is a
> demerit in this sub. Say so and I'll take it.
>
> The thing I want to show isn't a feature list. It's a week of output.
>
> Orb is an assistant that starts the conversation. A process runs between
> conversations, keeps a model of what's going on with my projects and my day,
> notices what changed, and decides whether any of it is worth interrupting me
> over. Last week it woke [41] times and sent [6] notifications.
>
> The [6] it sent:
>
> [PASTE THE REAL SIX. Verbatim, timestamps included. Leave in the mundane one.
> Leave in the one that was wrong. Example shape:
> - Tue 07:14 — "[actual text]"
> - Tue 16:02 — "[actual text]"
> ...]
>
> [One of these was wrong: [which, and why]. I'm leaving it in because a proactive
> assistant that never misfires is one that isn't trying.]
>
> The [35] it didn't send are the actual work. Early versions messaged me constantly
> and I stopped looking at my phone within two days. Everything since has been
> building reasons to stay quiet:
>
> - Collection ticks that use no model at all, so gathering state is cheap and
>   frequent while judgment is rare and expensive
> - A wake budget of [N] per [period], so it can't spiral
> - Dedup and hard pacing at a single choke point, so two subsystems can't
>   independently decide the same thing is urgent
> - Delivery receipts, because a notification that silently fails is worse than one
>   that never fires
> - "Nothing worth saying" treated as a correct outcome the loop is allowed to
>   return, not a failure to be retried
>
> Stack: Python 3.11, FastAPI, WebSocket voice loop with faster-whisper on my
> machine and neural TTS out. ~60 tools. Reachable from my phone over Tailscale.
> Brain is my own logged-in Claude Code CLI by default, which means no API key is
> shipped or stored, and I'm working on an Ollama tier so it can run with nothing
> outside the house.
>
> Anything autonomous physically cannot reach a destructive tool. Those tools are
> absent from that surface rather than discouraged in a prompt, because I don't
> trust prompts for that.
>
> Repo: https://github.com/getorb/Orb-Backend
>
> The part I'm least sure about: the wake budget is a fixed number I picked by
> feel, and it should probably be adaptive. But every adaptive version I tried
> either got chatty during busy weeks or went silent for days. If you've solved
> pacing for something that decides on its own when to interrupt you, I want to
> hear how.

Why this works: the reversal in the title (a proactive assistant whose achievement
is silence) is the hook. The unedited six, including a wrong one, is the proof. The
closing weakness is a real open problem, which is what pulls comments.

---

## Draft B — r/ClaudeAI or r/ClaudeCode (post second)

Narrower, and native to the sub. The whole post is one trick.

**Title options:**

- I turned `claude -p` into a resident daemon that decides when to text me. No API
  key, runs off the CLI login.
- Using the Claude Code CLI as the brain of a background agent instead of the API
- My Claude Code install has been running as a always-on assistant for [N] months.
  Here's the wiring.

**Body:**

> Most agent projects reach for the API. I wanted something that ran all day on my
> own box, and metered API calls made me watch a meter instead of using the thing.
> So the brain is `claude -p` against my own logged-in CLI. No API key is shipped,
> asked for, or stored anywhere in the project.
>
> What that buys: a resident process that wakes on its own, keeps a situation model
> of my projects, and pushes to my phone when something is worth saying. It sent me
> [6] messages last week out of [41] wakes.
>
> The wiring, roughly:
>
> - A thin agent loop where the model decides talk-vs-tool and the harness executes.
>   The loop does not classify intent. It asks and obeys.
> - The tool surface is exposed to the Claude brain as MCP over a resident loopback
>   `/mcp`, and over stdio for Codex/Grok. Same ~60 tools either way, one
>   registration.
> - A router in front, so Claude/Grok/Codex/local swap mid-conversation without the
>   persona changing.
> - Collection ticks that call no model at all. Judgment is the expensive part, so
>   it runs rarely; gathering is cheap, so it runs often.
> - A supervisor that keeps it alive and lets it restart itself after it changes its
>   own code.
>
> Two things I got wrong first:
>
> 1. [Real gotcha you hit with `claude -p` — session/context/timeout/exit-code
>    behavior. This is the highest-value paragraph in the post. Be specific.]
> 2. [Second real one.]
>
> Repo, MIT: https://github.com/getorb/Orb-Backend
>
> Open question for anyone doing similar: [the real thing you'd want a second
> opinion on — context handling across wakes, long-running session supervision,
> whatever is actually annoying you this week].

The two-gotchas section is what makes this post. Anyone who has tried to daemonize
the CLI hit those walls, and the comments will be people comparing notes.

---

## Draft C — r/LocalLLaMA (post third, and only in this shape)

This sub will notice within one comment that the default brain is cloud Claude.
Address it in the second paragraph or the thread becomes about your honesty rather
than your architecture. Frame the post as asking for help on the local tier — that
is both true and the single best comment generator available to you.

**Title options:**

- The between-conversations loop is the part nobody builds: situation model →
  budgeted wakes → approval-gated proposals. Architecture, and the local tier I
  want torn apart.
- I built an assistant that wakes itself [41] times a day to decide whether to
  interrupt me. The judgment layer is cloud and I want it local.

**Body:**

> Upfront so nobody has to dig for it: today the default brain is Claude through my
> own logged-in Claude Code CLI. That is cloud. The collection layer, the speech
> recognition (faster-whisper), the TTS, the state, and every tool run on my
> machine, but the judgment call is not local yet, and I'm not going to call the
> whole thing local-first while that's true.
>
> What I want to talk about is the loop, because I think it's the underbuilt part of
> agent work and it's mostly model-independent.
>
> Everything is a reaction to a prompt. Almost nothing runs when you aren't looking.
> The layer I built for that:
>
> - **Collection ticks, zero model.** Pure gathering into a situation model. Cheap
>   enough to run constantly.
> - **Synthesis, twice daily.** The expensive pass that turns state into an
>   understanding of what changed.
> - **Budgeted wakes.** [N] per [period], hard cap. The loop is allowed to return
>   "nothing worth saying" and that is a success, not a retry condition.
> - **Approval-gated proposals.** It can propose real work; it cannot execute
>   anything that touches the world without me. Destructive tools are absent from
>   autonomous surfaces rather than discouraged, because prompt-level restriction is
>   not a control.
> - **One notification choke point.** Dedup, pacing, delivery receipts. Two
>   subsystems cannot independently decide the same thing is urgent.
>
> Last week: [41] wakes, [6] notifications. [Include the real six if the sub
> tolerates length — it is the proof.]
>
> Where I need help. I want the judgment pass local, Ollama tier, first-class
> default. The problem isn't tool calling, it's that the synthesis step needs to
> hold [rough token count] of situation model and produce a calibrated "is this
> worth interrupting a human" decision. Small models I've tried are either
> trigger-happy or inert, and the failure isn't reasoning, it's calibration.
>
> - What would you run for a [N]k-context judgment pass on [your hardware]?
> - Has anyone gotten a local model to be reliably conservative about interrupting,
>   without it going silent entirely?
> - Is a small classifier in front of a bigger local pass the obvious answer I'm
>   missing?
>
> MIT backend: https://github.com/getorb/Orb-Backend

---

## Mechanics

**Timing.** Tuesday to Thursday, 9–11am US Eastern. Avoid Friday and weekends.

**Formatting.** Keep it lighter than this document. Reddit punishes dense markdown.
No bold-label bullets stacked ten deep. Short paragraphs, one list, one link.

**One link.** Repo only. Do not put the App Store link in the body of a
r/selfhosted or r/LocalLLaMA post; it flips the read from project to promotion.
Put it in a comment if someone asks, which they will.

**Screenshot.** One image: the notification list from a real week. Not a UI tour, not
a hero shot, not an architecture diagram. The list. If the sub allows an image post,
use it, because the list is more persuasive than any paragraph here.

**Disclose that you built it, in the first sentence.** Every one of these subs
tolerates a developer sharing their own work and none of them tolerate discovering it
in the comments.

**Stay in the thread for four hours.** Answer everything, including the dismissive
ones, briefly and without defensiveness. Post-level upvotes come from the hook;
comment volume comes from you being present. This is the part people skip and it is
most of the outcome.

**Do not mention drones or the BB8 unless asked.** If asked, one sentence: "in
progress, not flying yet, I'll post when it does." That reads as discipline. Leading
with it reads as vapor.

## Prepare answers for these

They will come up. Have a one-paragraph answer ready for each rather than
improvising.

1. *"Local-first but the brain is Claude cloud?"* — Concede immediately and
   precisely: collection, STT, TTS, state, tools are local; judgment is not yet.
   Ollama tier is in progress. Never argue this one.
2. *"Why is the client closed-source?"* — Straight answer, plus: the WebSocket and
   HTTP API are documented in API.md and nothing stops someone building a client.
3. *"iOS only?"* — Yes. Backend is Windows-first, macOS planned. Don't oversell the
   roadmap.
4. *"Isn't this just a cron job with an LLM?"* — Good faith answer, because it's a
   fair question: the difference is the situation model persisting across wakes and
   the budget/dedup layer deciding what surfaces. Cron fires on time; this fires on
   change, and mostly doesn't fire.
5. *"How is this different from [assistant]?"* — Name one concrete difference, not
   three. The proactive layer and the fact that it runs on hardware you own.
6. *"Windows-first?"* — Own it without apologizing. That's where your machine is.

## Follow-up series

Each of these is its own post, a month apart, only after the thing actually works.
This is how one project becomes four posts instead of one.

1. **Drone land survey** → r/diydrones, then r/selfhosted. Post after a real flight,
   with the assistant's actual summary of what it saw. The artifact is the report it
   sent you, not the drone.
2. **BB8 with a camera** → r/robotics, r/sphero. This is the fun one and will
   outperform the serious posts on raw upvotes. Video, no narration needed.
3. **Local judgment tier lands** → r/LocalLLaMA. This is the redemption post for
   Draft C and will do well specifically because you said you'd do it and then did.
4. **"What six months of a proactive assistant taught me about notification
   design"** → r/programming, or a blog post to submit to HN. This is the one with
   the longest tail.
