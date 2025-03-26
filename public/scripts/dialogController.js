const dialog = document.querySelector("dialog");

const openDialog = async (e) => {
  const btn = e.currentTarget;
  const { url, formAction, driveControls, openControls } = btn.dataset;
  const { htmlContent } = await fetchContent(url, formAction);

  dialog.append(htmlContent);
  dialog.showModal();

  if (openControls === "true") {
    // left, top, right, bottom, x, y, width
    const btnRect = btn.getBoundingClientRect();
    const dialogRect = dialog.getBoundingClientRect();
    const newLeft = btnRect.left - dialogRect.width;

    if (window.innerWidth >= 320) {
      dialog.style.left = `${
        newLeft > 0 ? newLeft : btnRect.right - dialogRect.width
      }px`;
    }

    dialog.style.top = `${btnRect.bottom}px`;
  }

  if (driveControls) {
    dialog.style.left = "0px";
    dialog.style.top = "0px";
  }

  // Temporary solution
  window.addEventListener("resize", (e) => dialog.close(), { once: true });
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
