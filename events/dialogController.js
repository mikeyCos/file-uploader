const dialog = document.querySelector("dialog");

const openDialog = async (e) => {
  const { formType, folderId, fileId } = e.target.dataset;
  const id = folderId || fileId;
  const form = await fetchForm(formType, id);

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

const fetchForm = async (formType, id) => {
  const url = `/components/${formType}${id ? `/${id}` : ""}`;

  return await fetch(url, {
    method: "GET",
  })
    .then((res) => {
      return res.text();
    })
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      return doc.querySelector("form");
    })
    .catch((err) => {
      // Is there a proper way to handle errors when fetching components?
      console.log(err);
    });
};
