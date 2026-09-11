// JSON remains JSON inside an HTML script element, even when a label contains
// markup. HTML escaping alone would alter the decoded model strings.
export const jsonScript = value => JSON.stringify(value)
  .replaceAll('<', '\\u003c').replaceAll('>', '\\u003e').replaceAll('&', '\\u0026');
