const downloadFile = async (e) => {
  console.log("downloadFile running...");
  const btn = e.currentTarget;
  const { url } = btn.dataset;
  console.log("btn:", btn);
  console.log("url:", url);
  await fetch(url, { method: "GET" }).then(async (res) => {
    const blob = await res.blob();
    const href = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    console.log("res:", res);
    console.log("blob:", blob);
    /* anchor.href = url;
    anchor.download = "test.txt";
    document.body.appendChild(anchor);
    anchor.click();
    window.URL.revokeObjectURL(url);
    anchor.remove(); */
  });
};
