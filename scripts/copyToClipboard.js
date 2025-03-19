const copyToClipboard = () => {
  console.log("copyToClipboard running...");
  const input = document.querySelector("#sharedURL");
  navigator.clipboard.writeText(input.value);
};
