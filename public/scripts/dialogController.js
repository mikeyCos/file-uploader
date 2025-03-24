const dialog = document.querySelector("dialog");

const openDialog = async (e) => {
  const btn = e.currentTarget;
  const { url, formAction } = btn.dataset;
  const { htmlContent } = await fetchContent(url, formAction);

  // Need to set the form's action attribute
  // /drive/folder/:folderID/files/upload
  // /drive/files/upload
  // Issue
  //  Invalid form will render a new form on POST
  dialog.append(htmlContent);
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
    .then(responseStatusHandler)
    .then(async (res) => {
      const rawHTML = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(rawHTML, "text/html");

      // What are the advantages and disadvantages using doc.body.firstChild vs querySelector()
      const htmlContent = doc.body.firstElementChild;
      if (formAction) {
        htmlContent.setAttribute("action", formAction);
      }

      return { htmlContent };
    })
    .catch((err) => {
      const htmlContent = document.createElement("p");
      htmlContent.textContent = err;
      return { htmlContent };
    });
};
