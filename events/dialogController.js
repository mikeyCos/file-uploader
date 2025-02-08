const dialog = document.querySelector("dialog");

const openDialog = async (e) => {
  const { formType } = e.target.dataset;
  const form = await fetch(`/components/${formType}`, {
    method: "GET",
  })
    .then((response) => {
      console.log(response);
      return response.text();
    })
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      console.log(typeof html);
      console.log("html:", html);
      console.log("doc:", doc);
      return doc.querySelector("form");
    })
    .catch((err) => {
      console.log(err);
    });

  dialog.append(form);
  dialog.showModal();
};

const closeDialog = (e) => {
  dialog.close();
};

const onCloseHandler = () => {
  const form = dialog.querySelector("form");
  form.remove();
};

const renderForm = () => {
  const formElement = document.createElement("form");
};

const clearForm = () => {};
