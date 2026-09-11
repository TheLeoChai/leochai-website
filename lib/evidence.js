const present = value => typeof value === 'string' && value.trim().length > 0;
const date = value => present(value) && /^\d{4}-\d{2}-\d{2}T/.test(value) && Number.isFinite(Date.parse(value));
export function proofState(proof = {}, locale = 'en') {
  const zh = locale === 'zh';
  if (proof.state === 'LIVE' && proof.committed === true && proof.origin === 'live' && present(proof.runId) && date(proof.lastEventAt)) {
    return { state: 'LIVE', detail: `${zh ? '运行' : 'Run'} ${proof.runId} · ${zh ? '服务器事件' : 'Server event'} ${proof.lastEventAt}` };
  }
  if (proof.state === 'RECORDED' && proof.origin === 'capture' && date(proof.capturedAt) && present(proof.revision)) {
    return { state: 'RECORDED', detail: `${zh ? '采集于' : 'Captured'} ${proof.capturedAt} · ${zh ? '版本' : 'Revision'} ${proof.revision}` };
  }
  const missing = proof.state === 'LIVE' ? (zh ? '缺少已提交的实时运行、运行 ID 或服务器事件时间。' : 'Missing committed live execution, run ID, or server event time.') : proof.state === 'RECORDED' ? (zh ? '缺少真实采集、采集时间或版本。' : 'Missing capture evidence, capture time, or revision.') : (zh ? '尚未提供执行证据。' : 'Execution evidence has not been supplied.');
  return { state: 'UNKNOWN', detail: present(proof.reason) ? proof.reason : missing };
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
