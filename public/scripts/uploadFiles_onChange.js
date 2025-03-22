// Enables/disables create folder submit button
const uploadFiles_onChange = (e) => {
  const input = e.target;
  const submitButton = document.querySelector(
    '.form-upload-files button[type="submit"]'
  );
  if (input.files.length === 0) {
    submitButton.setAttribute("disabled", "");
  } else {
    submitButton.removeAttribute("disabled");
  }
};
