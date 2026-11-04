"""Figures for posts/fruit-fly-scaling.html.

Reads the committed results of the fruit-fly depth-scaling run
(github.com/ninjahawk/fruit-fly, results/continual/depth-scaling/) and writes
three SVGs next to this file. Every plotted number comes from those JSONs;
the asserts pin a few of them to the values printed in REPORT_DEPTH.md.

    python posts/fruit-fly-scaling-figures.py <path/to/results/continual/depth-scaling>
"""
import json
import os
import statistics
import sys

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt

SRC = sys.argv[1]
OUT = os.path.dirname(os.path.abspath(__file__))
LRS = [0.002, 0.01, 0.05, 0.25]

RED, SLATE, INK, HAIR, MUTED = "#e5091a", "#3a4d5c", "#0f0f0f", "#e6e2d8", "#77736a"
plt.rcParams.update({
    "font.family": "DejaVu Sans", "font.size": 11, "axes.edgecolor": HAIR,
    "axes.labelcolor": INK, "xtick.color": MUTED, "ytick.color": MUTED,
    "axes.spines.top": False, "axes.spines.right": False, "svg.fonttype": "none",
})


def load(arm, scen, d, w, lr):
    p = os.path.join(SRC, f"fly-{arm}-local_{scen}_d{d}_w{w}_lr{lr}.json")
    return json.load(open(p)) if os.path.exists(p) else None  # missing = diverged


def seeds_acc(run):
    return [s["ACC"] for s in run["per_seed"]]


def best(arm, scen, d, w):
    """The arm's best learning rate in a cell: highest seed-mean ACC among the runs that exist."""
    runs = [r for r in (load(arm, scen, d, w, lr) for lr in LRS) if r]
    return max(runs, key=lambda r: statistics.mean(seeds_acc(r)))


def paired(scen, d, w):
    s, n = seeds_acc(best("sparse", scen, d, w)), seeds_acc(best("dense", scen, d, w))
    diffs = [a - b for a, b in zip(s, n)]
    se = lambda xs: statistics.stdev(xs) / len(xs) ** 0.5
    return diffs, statistics.mean(diffs), 2 * (se(s) ** 2 + se(n) ** 2) ** 0.5


def save(fig, name):
    path = os.path.join(OUT, name)
    fig.savefig(path, format="svg", bbox_inches="tight", metadata={"Date": None})
    plt.close(fig)
    svg = open(path).read().replace("'DejaVu Sans'", "system-ui, -apple-system, 'Segoe UI', sans-serif")
    open(path, "w").write(svg)


# 1. Per-seed paired advantage vs depth, both scenarios, against the preregistered bar.
fig, axes = plt.subplots(1, 2, figsize=(9.6, 3.9), sharey=False)
for ax, scen, title in zip(axes, ["class", "domain"], ["Class-incremental (primary)", "Domain-incremental"]):
    for d in range(1, 5):
        diffs, m, bar = paired(scen, d, 2000)
        ax.plot([d - 0.18, d + 0.18], [bar, bar], color=MUTED, lw=1.2, ls="--")
        ax.scatter([d] * 5, diffs, s=22, color=RED, alpha=0.55, zorder=3, lw=0)
        ax.plot([d - 0.22, d + 0.22], [m, m], color=INK, lw=2.2, zorder=4)
    ax.axhline(0, color=HAIR, lw=1)
    ax.set_xticks([1, 2, 3, 4])
    ax.set_xlabel("plastic layers (depth)")
    ax.set_title(title, loc="left", fontsize=11.5, color=INK, fontweight="bold")
axes[0].set_ylabel("ACC, sparse minus dense")
axes[0].text(4.32, paired("class", 4, 2000)[2], "2 x pooled SE", color=MUTED, fontsize=8.5, va="center")
fig.text(0.01, -0.04, "Dots: the five seeds. Black bar: paired mean. Dashed: the preregistered separation bar. "
         "Width 2,000, each arm at its best learning rate.", fontsize=8.5, color=MUTED)
save(fig, "fruit-fly-depth-advantage.svg")

# Pin to REPORT_DEPTH.md §3.2 / §4.
assert [round(paired("class", d, 2000)[1], 4) for d in range(1, 5)] == [0.0372, 0.0077, 0.0103, 0.0146]
assert round(paired("domain", 3, 2000)[1], 4) == -0.0370

# 2. What ACC is made of: last task vs retained from tasks 1-4, class-incremental, width 2,000.
fig, ax = plt.subplots(figsize=(9.6, 3.9))
xs, labels = [], []
for d in range(1, 5):
    for k, arm in enumerate(["sparse", "dense"]):
        f = best(arm, "class", d, 2000)["aggregate"]["final_per_task_mean"]
        last, kept = f[4] / 5, sum(f[:4]) / 5
        x = d * 2.6 + k
        ax.bar(x, last, color=SLATE if arm == "dense" else "#8a96a0", width=0.8)
        ax.bar(x, kept, bottom=last, color=RED, width=0.8)
        ax.text(x, last + kept + 0.004, f"+{kept:.4f}", ha="center", fontsize=8.5,
                color=RED if kept >= 0.001 else MUTED)
        xs.append(x)
        labels.append(f"{arm}\nd={d}")
        if arm == "sparse" and d == 1:
            assert round(kept, 4) == 0.0366
ax.set_xticks(xs)
ax.set_xticklabels(labels, fontsize=9)
ax.set_ylabel("final average accuracy (ACC)")
ax.set_ylim(0, 0.26)
ax.set_title("Where the ACC comes from. Grey (sparse) / slate (dense): the task just learned. Red: anything kept from tasks 1-4.",
             loc="left", fontsize=11, color=INK)
save(fig, "fruit-fly-retained.svg")

# 3. Width and the capacity controls, class-incremental.
cells = [("d=1, W=500", 1, 500), ("d=1, W=2,000", 1, 2000), ("d=1, W=8,000", 1, 8000),
         ("d=4, W=500", 4, 500), ("d=4, W=2,000", 4, 2000), ("d=4, W=8,000", 4, 8000),
         ("d=1, W=75,650\n(params of d=4, W=500)", 1, 75650), ("d=1, W=402,200\n(params of d=2, W=2,000)", 1, 402200)]
fig, ax = plt.subplots(figsize=(9.6, 4.3))
for i, (lab, d, w) in enumerate(cells):
    diffs, m, bar = paired("class", d, w)
    y = len(cells) - 1 - i
    ax.barh(y, m, color=RED if m > bar else "#c9c4b8", height=0.6)
    ax.plot([bar, bar], [y - 0.36, y + 0.36], color=INK, lw=1.2, ls="--")
    ax.text(max(m, bar) + 0.0015, y, f"{m:+.4f}", va="center", fontsize=9, color=INK)
ax.set_yticks(range(len(cells)))
ax.set_yticklabels([c[0] for c in reversed(cells)], fontsize=9)
ax.axhline(1.5, color=HAIR, lw=1)
ax.set_xlabel("paired ACC advantage, sparse minus dense (dashed: 2 x pooled SE)")
ax.set_xlim(0, 0.068)
save(fig, "fruit-fly-width.svg")

assert [round(paired("class", d, w)[1], 4) for _, d, w in cells] == \
    [0.0467, 0.0372, 0.0495, 0.0146, 0.0146, 0.0063, 0.0505, 0.0543]
print("wrote 3 figures; all pinned numbers match REPORT_DEPTH.md")
