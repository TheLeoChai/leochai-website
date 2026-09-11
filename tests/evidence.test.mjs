import test from 'node:test';
import assert from 'node:assert/strict';
import { proofState } from '../lib/evidence.js';
const at = '2026-09-11T12:00:00Z';
const now = Date.parse(at);
const live = { state: 'LIVE', origin: 'live', committed: true, lifecycle: 'active', runId: 'run-test', lastEventAt: at, lastHeartbeatAt: at };
const capture = { state: 'RECORDED', origin: 'capture', capturedAt: at, revision: 'test-only' };
const evaluate = (proof, clock = now) => proofState(proof, 'en', { now: clock });

test('static rendering and a connection alone cannot establish LIVE', () => {
  assert.equal(proofState(live).state, 'UNKNOWN');
  for (const proof of [null, {}, { state: 'LIVE', connected: true }, { ...live, committed: false }, { ...live, lifecycle: 'queued' }, { ...live, runId: ' ' }]) {
    assert.equal(evaluate(proof).state, 'UNKNOWN');
  }
  assert.equal(evaluate(live).state, 'LIVE');
  assert.equal(evaluate({ ...live, sourceLabel: 'Bundled fixture' }).state, 'LIVE', 'input provenance is independent of execution');
});

test('a fresh event and heartbeat both expire at 20 seconds with no implicit clock', () => {
  assert.equal(evaluate(live, now + 19_999).state, 'LIVE');
  assert.equal(evaluate(live, now + 20_000).state, 'UNKNOWN');
  for (const field of ['lastEventAt', 'lastHeartbeatAt']) {
    for (const value of [undefined, '2026-09-11T11:59:40Z', '2026-09-11T12:00:01Z', '2026-02-30T12:00:00Z', '2026-09-11', '2026-09-11T12:00:00']) {
      assert.equal(evaluate({ ...live, [field]: value }).state, 'UNKNOWN', `${field}: ${value}`);
    }
  }
  for (const clock of [NaN, Infinity, undefined, String(now)]) {
    assert.equal(proofState(live, 'en', { now: clock }).state, 'UNKNOWN');
  }
});

test('failed, stale and completed runs retain their last timestamp without inventing captures', () => {
  for (const lifecycle of ['failed', 'stale', 'completed']) {
    const result = evaluate({ ...live, lifecycle, reason: 'Test failure detail' });
    assert.equal(result.state, 'UNKNOWN');
    assert(result.detail.includes(at));
    assert(result.detail.includes('Test failure detail'));
  }
  assert.equal(evaluate({ ...capture, state: 'LIVE', lifecycle: 'completed' }).state, 'RECORDED');
});

test('cache and replay require genuine capture metadata even when an API is online', () => {
  for (const delivery of ['cache', 'replay']) {
    assert.equal(evaluate({ ...live, delivery, connected: true }).state, 'UNKNOWN');
    assert.equal(evaluate({ ...capture, state: 'LIVE', delivery, connected: true }).state, 'RECORDED');
    assert.equal(evaluate({ ...capture, delivery, capturedAt: undefined }).state, 'UNKNOWN');
  }
  for (const origin of ['synthetic', 'illustration', 'fixture', 'live', undefined]) {
    assert.equal(evaluate({ ...capture, origin }).state, 'UNKNOWN');
  }
  for (const change of [{ captureValid: false }, { capturedAt: '2026-02-30T12:00:00Z' }, { revision: ' ' }]) {
    assert.equal(evaluate({ ...capture, ...change }).state, 'UNKNOWN');
  }
  assert.equal(proofState(capture).state, 'RECORDED');
  assert.equal(proofState({ ...capture, capturedAt: '2024-02-29T12:00:00.1Z' }).state, 'RECORDED');
});

test('localized reasons and the static template cannot silently retain a LIVE label', async () => {
  const { default: nunjucks } = await import('nunjucks');
  const env = new nunjucks.Environment(new nunjucks.FileSystemLoader('content/_includes'), { autoescape: true });
  env.addFilter('proofState', proofState);
  const html = env.renderString('{% from "components/ui.njk" import state %}{{ state(proof, "zh") }}', { proof: live });
  assert.match(html, /UNKNOWN/);
  assert.doesNotMatch(html, />LIVE</);
  assert.match(html, /最后服务器事件/);
  assert.match(proofState(capture, 'zh').detail, /采集于/);
});
