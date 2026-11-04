# claude-code-mods

Two Claude Code mods.

## thinking-pane

A pane beside the transcript that shows Claude's thinking as it streams, so you don't have to expand a turn and scroll past the tool calls to find it.

- Each turn starts with your prompt in its own box, under a "user" header and the time you sent it. Click the box to see the whole prompt.
- The main agent's thinking goes in a card below it, one timestamp per thought, with file paths, `code` and **bold** highlighted.
- Each subagent gets a card under the turn that spawned it, colored by agent type, with a live timer while it runs.
- Click a subagent's card to open its page, with its own thinking and its own subagents. `← back` (or `b`) returns to the card you came from.
- Opening a subagent's transcript in Claude Code switches the pane to that agent's page.
- The pane follows the newest thinking. Scroll up to pause that; scroll back to the bottom, or send a new prompt, to resume.
- `/thinking` opens or closes the pane.

The pane docks on the right in the fullscreen layout (`/tui fullscreen`) with a terminal at least 110 columns wide; otherwise it opens above the prompt.

More in [plugins/thinking-pane/README.md](plugins/thinking-pane/README.md).

## pane-backdrop

Gives every mod's pane a transparent background unless that mod picked a color itself, so your terminal's own background shows through the pane body.

## Install

The repo is its own plugin marketplace. Run this in the terminal:

```bash
claude plugin marketplace add Sallvainian/claude-code-mods
claude plugin install thinking-pane@claude-code-mods
claude plugin install pane-backdrop@claude-code-mods
```

Or inside a Claude Code session:

```text
/plugin marketplace add Sallvainian/claude-code-mods
/plugin install thinking-pane@claude-code-mods
/plugin install pane-backdrop@claude-code-mods
```

Install either one alone by leaving out the other's line.

In the desktop app, where `/plugin` does not run: click + next to the prompt box, then Plugins, Add marketplace with `Sallvainian/claude-code-mods`, then Add plugin.

Built on Claude Code 2.1.317. Mods need Claude Code 2.1.287 or later.

## License

MIT. See [LICENSE](LICENSE).
