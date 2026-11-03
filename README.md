# claude-code-mods

Two Claude Code mods.

## thinking-pane

A pane beside the transcript that shows Claude's thinking as it streams, so you don't have to expand a turn and scroll past the tool calls to find it.

- Each turn gets a card with its thinking, one timestamp per thought.
- Each subagent gets its own card under the turn that spawned it, with a live timer while it runs. Subagents it spawns nest inside its card.
- A card collapses by itself when its agent finishes. Click its header (or Tab to it and press Enter) to open or close it.
- The pane follows the newest thinking. Scroll up to pause that; scroll back to the bottom, or send a new prompt, to resume.
- `/thinking` opens or closes the pane.

The pane docks on the right in the fullscreen layout (`/tui fullscreen`) with a wide enough terminal; otherwise it opens above the prompt.

## pane-backdrop

Gives every mod's pane a transparent background unless that mod picked a color itself, so your terminal's own background shows through the pane body.

## Install

At the prompt of a Claude Code terminal session:

```
/plugin install thinking-pane --marketplace Sallvainian/claude-code-mods
/plugin install pane-backdrop --marketplace Sallvainian/claude-code-mods
```

Answer `y` to add the marketplace, then pick a scope.

From a shell:

```
claude plugin install thinking-pane --marketplace Sallvainian/claude-code-mods
claude plugin install pane-backdrop --marketplace Sallvainian/claude-code-mods
```

In the desktop app, where `/plugin` does not run: click + next to the prompt box, then Plugins, Add marketplace with `Sallvainian/claude-code-mods`, then Add plugin.

Built on Claude Code 2.1.317. Mods need Claude Code 2.1.287 or later.
