const copyToClipboard = () => {
  const input = document.querySelector("#sharedURL");
  navigator.clipboard.writeText(input.value);
};
