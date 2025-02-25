// Enables/disables create folder submit button
const name_onInput = (e) => {
  const input = e.target;
  const form = input.form;
  const submitButton = form.querySelector('button[type="submit"]');

  if (input.value.trim().length === 0) {
    submitButton.setAttribute("disabled", "");
  } else {
    submitButton.removeAttribute("disabled");
  }
};
