import { expect, mock, test } from 'claude-code/testing'
import type { On } from 'claude-code'

const PANE = {
  plugin: 'thinking-pane',
  component: 'Pane',
  requestId: 'thinking',
  props: {
    title: 'Thinking',
    isFocused: false,
    bodyColumns: 56,
    placement: 'dock',
    scroll: { offset: 0, bodyRows: 40 },
    view: {},
  },
} as const

// Stands in for the engine beneath the plugin.
function engine(on: On, thinking: Record<string, string[]>) {
  on('command.register', () => ({ value: { command: 'thinking' } }))
  on('ui.open', () => ({ value: { isPlaced: true } }))
  on('session.start', (_, e) => ({ cwd: e.cwd }))
  on('turn.start', (_, e) => ({ turnId: e.turnId }))
  on('turn.complete', (_, e) => ({ text: e.answer }))
  on('agent.spawn', () => ({ model: 'claude-haiku-5-5', agentId: 'explore-1' }))
  on('turn.step', async function* (_, e) {
    for (const text of thinking[e.agentId ?? 'main'] ?? []) yield { kind: 'thinking', index: 0, text }
    return { turnId: e.turnId, index: e.index, answer: '', toolUses: [], stopReason: 'end_turn', usage: null }
  })
}

async function drain(stream: AsyncGenerator<unknown, unknown>) {
  for await (const _ of stream) {
    // read it to the end
  }
}

test('main and subagent thinking land in their own cards, and a finished agent collapses', async ($, on) => {
  const clock = mock.clock(on, { now: Date.UTC(2026, 10, 3, 14, 2, 7) })
  engine(on, {
    main: ['Users get logged out ', 'after an hour.'],
    'explore-1': ['Grep for refreshToken across src.'],
  })

  await $.session.start({ cwd: '/', surface: 'terminal', isInteractive: true })
  await $.turn.start({ turnId: 't1', text: 'users get logged out after an hour, fix it' })
  await drain($.turn.step({ turnId: 't1', index: 0, model: 'm', messageCount: 1 }))
  await $.agent.spawn({ prompt: 'find callers', description: 'find refresh callers', subagentType: 'Explore' })
  await $.turn.start({ turnId: 's1', text: 'find callers', agentId: 'explore-1' })
  await clock.advance(3000)
  await drain($.turn.step({ turnId: 's1', index: 0, model: 'm', messageCount: 1, agentId: 'explore-1' }))
  await clock.advance(200)

  let ui = await $.ui.mount({ ...PANE, surface: 'terminal' })
  expect((await ui.find({ type: 'Text', text: /Users get logged out after an hour\./ }))?.text).toBeDefined()
  expect(await ui.find({ type: 'Text', text: /Grep for refreshToken/ })).toBeDefined()
  expect(await ui.find({ type: 'Text', text: /● 0:0\d/ })).toBeDefined()
  await ui.unmount()

  await clock.advance(9000)
  await $.turn.complete({ turnId: 's1', agentId: 'explore-1', answer: '', durationMs: 12000, isAborted: false, reason: 'end_turn' })
  await clock.advance(200)

  ui = await $.ui.mount({ ...PANE, surface: 'terminal' })
  expect(await ui.find({ type: 'Text', text: /Grep for refreshToken/ })).toBeUndefined()
  expect(await ui.find({ type: 'Text', text: /✓ 12s/ })).toBeDefined()

  // Opening the finished card by hand shows its thinking again.
  await ui.press({ key: 'toggle-explore-1' })
  await clock.advance(200)
  expect(await ui.find({ type: 'Text', text: /Grep for refreshToken/ })).toBeDefined()
  await ui.unmount()
})
