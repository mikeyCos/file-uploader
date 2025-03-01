const dialog = document.querySelector("dialog");

const openDialog = async (e) => {
  const { url } = e.currentTarget.dataset;
  console.log("e.currentTarget:", e.currentTarget);
  console.log("e.currentTarget.dataset:", e.currentTarget.dataset);
  console.log("url:", url);
  const form = await fetchForm(url);
  console.log(form);
  console.log("window.location:", window.location);
  dialog.append(form);
  dialog.showModal();
};

const closeDialog = (e) => {
  console.log("closeDialog running...");
  dialog.close();
};

const onCloseHandler = () => {
  console.log("onCloseHandler running...");
  const form = dialog.querySelector("form");
  form.remove();
};

// stopPropagation on the dialog element's child/children element(s)
const stopPropagation = (e) => {
  console.log("stopPropagation running...");
  e.stopPropagation();
};

const fetchForm = async (url) => {
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
      return doc.querySelector("form");
    })
    .catch((err) => {
      // Is there a proper way to handle errors when fetching components?
      console.log(err);
    });
};
