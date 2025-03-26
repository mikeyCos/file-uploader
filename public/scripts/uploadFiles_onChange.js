// Enables/disables create folder submit button
const uploadFiles_onChange = (e) => {
  const input = e.target;
  const { files } = input;
  const submitButton = document.querySelector(
    '.upload-files button[type="submit"]'
  );
  const list = document.querySelector(".upload-preview");
  const uploadCount = document.querySelector(".upload-count");

  while (list.firstChild) list.removeChild(list.firstChild);

  if (input.files.length === 0) {
    uploadCount.textContent = "No files selected";
    submitButton.setAttribute("disabled", "");
  } else {
    for (const file of files) {
      const listItem = document.createElement("li");
      listItem.className = "preview-item";
      listItem.textContent = `${file.name}`;
      list.appendChild(listItem);
    }
    uploadCount.textContent = `${files.length} file${
      files.length > 1 ? "s" : ""
    } selected`;
    submitButton.removeAttribute("disabled");
  }
};
