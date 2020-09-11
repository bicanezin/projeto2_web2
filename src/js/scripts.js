const btnCopyOnClick = (hashId) => {
  newUrl = `https://rel.ink/${hashId}`;

  const link = document.getElementById(newUrl);
  const range = document.createRange();
  range.selectNode(link);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  document.execCommand("copy");
};
