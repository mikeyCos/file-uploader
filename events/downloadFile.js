const downloadFile = async (e) => {
  console.log("downloadFile running...");
  const btn = e.currentTarget;
  const { url } = btn.dataset;
  console.log("btn:", btn);
  console.log("url:", url);
  await fetch(url, { method: "GET" }).then(async (res) => {
    const blob = await res.blob();
    console.log("res:", res);
    console.log("url:", url);
    console.log("blob:", blob);
    const href = window.URL.createObjectURL(blob);
    console.log("href:", href);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "test.txt";
    document.body.appendChild(anchor);
    anchor.click();
    window.URL.revokeObjectURL(url);
    anchor.remove();
  });
};
