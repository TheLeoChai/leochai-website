// The visible link and refresh also work without JavaScript. Fragments retain
// their meaning because the destination keeps the original anchor IDs.
const link = document.getElementById('destination');
if (link) {
  const destination = new URL(link.href);
  destination.hash = location.hash;
  destination.search = location.search;
  link.href = destination.href;
  location.replace(destination.href);
}
