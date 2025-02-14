const dialog = document.querySelector("dialog");

const openDialog = async (e) => {
  const { formType } = e.target.dataset;
  const form = await fetch(`/components/${formType}`, {
    method: "GET",
  })
    .then((res) => {
      console.log("res:", res);
      return res.text();
    })
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
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

// stopPropagation on the dialog element's child/children element(s)
const stopPropagation = (e) => {
  e.stopPropagation();
};
