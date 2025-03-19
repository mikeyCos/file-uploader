const downloadFile = async (e) => {
  const btn = e.currentTarget;
  const { url } = btn.dataset;
  await fetch(url, { method: "GET" }).then(async (res) => {
    const blob = await res.blob();
    const href = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = href;
    document.body.appendChild(anchor);
    anchor.click();
    window.URL.revokeObjectURL(url);
    anchor.remove();
  });
};
