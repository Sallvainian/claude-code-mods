# pane-backdrop

Gives every mod's pane a transparent background, so your terminal's own background shows through the pane body instead of a solid fill.

A mod that picks a background color for its pane keeps it. pane-backdrop only fills in `transparent` where the mod left the color unset.

It has no settings and no commands. It reads nothing and writes nothing; it changes one field when a pane opens.

## Install

The repo is its own plugin marketplace. Run this in the terminal:

```bash
claude plugin marketplace add Sallvainian/claude-code-mods
claude plugin install pane-backdrop@claude-code-mods
```

Or inside a Claude Code session:

```text
/plugin marketplace add Sallvainian/claude-code-mods
/plugin install pane-backdrop@claude-code-mods
```

Needs Claude Code 2.1.287 or later.

## License

MIT
