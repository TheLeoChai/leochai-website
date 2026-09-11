const toggle = document.querySelector('[data-specimen-toggle]');
const resolved = document.querySelector('#resolved-specimen');
const uncertain = document.querySelector('#uncertain-specimen');
if (toggle && resolved && uncertain) {
  // The complete pair remains visible when JavaScript is unavailable.
  uncertain.hidden = true;
  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    const showUncertain = toggle.getAttribute('aria-pressed') !== 'true';
    resolved.hidden = showUncertain;
    uncertain.hidden = !showUncertain;
    toggle.setAttribute('aria-pressed', String(showUncertain));
    toggle.querySelector('[data-show-uncertain]').hidden = showUncertain;
    toggle.querySelector('[data-show-resolved]').hidden = !showUncertain;
  });
}

// 01 — use the pinned accent instead of defining another color outside tokens.
console.log('%c01', `color:${getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()};font-size:2em`);
