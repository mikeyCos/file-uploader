// Enables/disables create folder submit button
const folderName_onInput = (e) => {
  const input = e.target;
  const submitButton = document.querySelector(
    '.form-create-folder button[type="submit"]'
  );
  if (input.value.trim().length === 0) {
    submitButton.setAttribute("disabled", "");
  } else {
    submitButton.removeAttribute("disabled");
  }
};
