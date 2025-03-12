const dialog = document.querySelector("dialog");

const openDialog = async (e) => {
  const { url, formAction } = e.currentTarget.dataset;
  console.log("e.currentTarget:", e.currentTarget);
  console.log("e.currentTarget.dataset:", e.currentTarget.dataset);
  console.log("url:", url);
  const content = await fetchContent(url, formAction);
  console.log(content);
  console.log("window.location:", window.location);
  // Need to set the form's action attribute
  // /drive/folder/:folderID/files/upload
  // /drive/files/upload
  // Issue
  //  Invalid form will render a new form on POST
  dialog.append(content);
  dialog.showModal();
};

const closeDialog = (e) => {
  console.log("closeDialog running...");
  dialog.close();
};

const onCloseHandler = () => {
  console.log("onCloseHandler running...");
  dialog.firstChild.remove();
};

// stopPropagation on the dialog element's child/children element(s)
const stopPropagation = (e) => {
  console.log("stopPropagation running...");
  e.stopPropagation();
};

const fetchContent = async (url, formAction) => {
  const fetchURL = `/components/${url}`;
  return await fetch(fetchURL, {
    method: "GET",
  })
    .then((res) => {
      return res.text();
    })
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      console.log("--------------------------------------------");
      console.log(doc);
      if (formAction) {
        const form = doc.querySelector("form");
        form.setAttribute("action", formAction);
        return form;
      }
      console.log("doc.body:", doc.body.firstElementChild);

      return doc.querySelector("article");
    })
    .catch((err) => {
      // Is there a proper way to handle errors when fetching components?
      console.log(err);
    });
};
