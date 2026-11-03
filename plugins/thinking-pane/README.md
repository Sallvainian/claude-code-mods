# thinking-pane

A pane beside the transcript that shows Claude's thinking as it streams, so you don't have to expand a turn and scroll past the tool calls to find it.

- Each turn starts with your prompt in its own box, under a "user" header and the time you sent it. The box shows the first three lines; click it to see the whole prompt, and click again to fold it.
- The main agent's thinking goes in a card below the prompt, with a timestamp over each thought. File paths are yellow, `code` is pink, and **bold** stays bold.
- Each subagent gets a card under the turn that spawned it, colored by agent type, with a live timer while it runs and its start time under the timer.
- Click a subagent's card to open its page: its own thinking, plus cards for any subagents it spawned. `← back` (or `b` with the pane focused) returns to the card you came from.
- When you open a subagent's transcript in Claude Code, the pane switches to that agent's page. Going back to the main transcript brings back the main view.
- The pane follows the newest thinking. Scroll up to pause that; scroll back to the bottom, or send a new prompt, to resume.
- `/thinking` opens or closes the pane.

The pane docks on the right in the fullscreen layout (`/tui fullscreen`) with a terminal at least 110 columns wide; otherwise it opens above the prompt.

The pane keeps the last 25 turns, and only for the current session. Nothing is written to disk.

## Install

```
/plugin install thinking-pane --marketplace Sallvainian/claude-code-mods
```

Needs Claude Code 2.1.287 or later.

## License

MIT
