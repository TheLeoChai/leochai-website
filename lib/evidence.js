const present = value => typeof value === 'string' && value.trim().length > 0;
// Require real UTC calendar instants, not Date.parse's normalized impossible dates.
const timestamp = value => {
  if (!present(value) || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/.test(value)) return NaN;
  const ms = Date.parse(value);
  if (!Number.isFinite(ms)) return NaN;
  const normalized = value.includes('.') ? value.replace(/\.(\d+)Z$/, (_, fraction) => `.${fraction.padEnd(3, '0')}Z`) : value.replace('Z', '.000Z');
  return new Date(ms).toISOString() === normalized ? ms : NaN;
};
const date = value => Number.isFinite(timestamp(value));

// No implicit wall clock: static template calls must never persist a LIVE badge.
export function proofState(proof = {}, locale = 'en', context = {}) {
  proof = proof && typeof proof === 'object' ? proof : {};
  const zh = locale === 'zh';
  const say = (en, cn) => zh ? cn : en;
  const unknown = reason => ({ state: 'UNKNOWN', detail: [
    reason,
    present(proof.reason) ? proof.reason : '',
    date(proof.lastEventAt) ? `${say('Last server event', '最后服务器事件')} ${proof.lastEventAt}` : ''
  ].filter(Boolean).join(' · ') });
  const recorded = proof.state === 'RECORDED' || ['replay', 'cache'].includes(proof.delivery) || proof.lifecycle === 'completed';
  if (recorded && proof.origin === 'capture' && proof.captureValid !== false && date(proof.capturedAt) && present(proof.revision)) {
    return { state: 'RECORDED', detail: `${say('Captured', '采集于')} ${proof.capturedAt} · ${say('Revision', '版本')} ${proof.revision}` };
  }
  if (proof.state === 'LIVE') {
    if (['failed', 'stale', 'completed'].includes(proof.lifecycle)) {
      return unknown(say('Run failed, stale, or completed; current live execution is not established.', '运行失败、过期或已完成；无法确认当前实时执行。'));
    }
    if (proof.origin !== 'live' || proof.committed !== true || proof.lifecycle !== 'active' || !present(proof.runId) || (proof.delivery !== undefined && proof.delivery !== 'live')) {
      return unknown(say('Missing active committed live execution or run ID; replay and cache are not live.', '缺少已提交的活动实时运行或运行 ID；回放与缓存不是实时执行。'));
    }
    const now = context?.now;
    const fresh = value => { const age = now - timestamp(value); return Number.isFinite(age) && age >= 0 && age < 20_000; };
    if (!Number.isFinite(now) || !fresh(proof.lastEventAt) || !fresh(proof.lastHeartbeatAt)) {
      return unknown(say('Missing current clock or fresh server event and heartbeat (under 20 seconds).', '缺少当前时钟或新近服务器事件及心跳（20 秒内）。'));
    }
    return { state: 'LIVE', detail: `${say('Run', '运行')} ${proof.runId} · ${say('Server event', '服务器事件')} ${proof.lastEventAt}` };
  }
  return unknown(recorded
    ? say('Missing valid capture evidence, capture time, or revision.', '缺少有效的采集证据、采集时间或版本。')
    : say('Execution evidence has not been supplied.', '尚未提供执行证据。'));
}
const fields = [
  ['repo', 'Repository', '代码仓库'], ['commit', 'Commit', '提交版本'],
  ['capturedAt', 'Capture date', '采集时间'], ['inputHash', 'Input / scenario hash', '输入／场景哈希'],
  ['provider', 'Provider', '服务提供方'], ['model', 'Model', '模型'],
  ['schema', 'Trace schema', '轨迹格式'], ['redaction', 'Redaction', '脱敏说明'],
  ['contribution', 'Leo’s contribution', 'Leo 的贡献']
];
export function evidenceRows(manifest = {}, locale = 'en') {
  const zh = locale === 'zh';
  return { caption: zh ? '执行证据' : 'Execution evidence', rows: fields.map(([key, en, cn]) => ({
    label: zh ? cn : en,
    value: present(manifest[key]) ? manifest[key] : (zh ? '未提供' : 'Not supplied'),
    href: key === 'repo' && /^https:\/\//.test(manifest[key] ?? '') ? manifest[key] : null
  })) };
}
