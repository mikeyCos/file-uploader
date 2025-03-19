const dialog = document.querySelector("dialog");

const openDialog = async (e) => {
  const { url, formAction } = e.currentTarget.dataset;
  const content = await fetchContent(url, formAction);

  // Need to set the form's action attribute
  // /drive/folder/:folderID/files/upload
  // /drive/files/upload
  // Issue
  //  Invalid form will render a new form on POST
  dialog.append(content);
  dialog.showModal();
};

const closeDialog = (e) => {
  dialog.close();
};

const onCloseHandler = () => {
  dialog.firstChild.remove();
};

// stopPropagation on the dialog element's child/children element(s)
const stopPropagation = (e) => {
  e.stopPropagation();
};

const fetchContent = async (url, formAction) => {
  const fetchURL = `/components/${url}`;
  return await fetch(fetchURL, {
    method: "GET",
  })
    .then((res) => {
      if (res.status === 404) throw new Error("Component does not exist");
      return res.text();
    })
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const htmlContent = doc.body.firstElementChild;
      if (formAction) {
        // What are the advantages and disadvantages using doc.body.firstChild vs querySelector()
        htmlContent.setAttribute("action", formAction);
      }

      return htmlContent;
    })
    .catch((err) => {
      // Is there a proper way to handle errors when fetching components?
      console.log(err);
    });
};
