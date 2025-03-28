const dialog = document.querySelector("dialog");

const openDialog = async (e) => {
  const btn = e.currentTarget;
  const { url, formAction, itemControls, openControls, driveControls } =
    btn.dataset;
  const { htmlContent } = await fetchContent(url, formAction);

  dialog.append(htmlContent);
  dialog.showModal();

  // Control flow is gross
  if (openControls === "true") {
    // left, top, right, bottom, x, y, width
    const btnRect = btn.getBoundingClientRect();
    const dialogRect = dialog.getBoundingClientRect();
    const newLeft = btnRect.left - dialogRect.width;
    console.log("dialogRect:", dialogRect);
    console.log("btnRect:", btnRect);
    console.log(window.innerWidth);
    if (window.innerWidth >= 320) {
      dialog.style.left = `${
        newLeft > 0 ? newLeft : btnRect.right - dialogRect.width
      }px`;
    }

    dialog.style.top = `${btnRect.bottom}px`;
  }

  if (driveControls === "true") {
    dialog.style.left = "0px";
    dialog.style.top = "0px";
  }

  // Temporary solution
  window.addEventListener(
    "resize",
    (e) => {
      dialog.style.left = "0px";
      dialog.style.top = "0px";
      dialog.close();
    },
    { once: true }
  );
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

/* const dialogController = {
  getDialog: function () {
    return this.dialog;
  },
  setDialog: function () {
    this.dialog = document.querySelector("dialog");
  },
  openDialog: async function (e) {
    const btn = e.currentTarget;
    const { url, formAction, itemControls, openControls, driveControls } =
      btn.dataset;
    const { htmlContent } = await this.fetchContent(url, formAction);

    this.dialog.append(htmlContent);
    this.dialog.showModal();

    // Control flow is gross
    if (openControls === "true") {
      // left, top, right, bottom, x, y, width
      const btnRect = btn.getBoundingClientRect();
      const dialogRect = dialog.getBoundingClientRect();
      const newLeft = btnRect.left - dialogRect.width;
      console.log("dialogRect:", dialogRect);
      console.log("btnRect:", btnRect);
      console.log(window.innerWidth);
      if (window.innerWidth >= 320) {
        this.dialog.style.left = `${
          newLeft > 0 ? newLeft : btnRect.right - dialogRect.width
        }px`;
      }

      this.dialog.style.top = `${btnRect.bottom}px`;
    }

    if (driveControls === "true") {
      this.dialog.style.left = "0px";
      this.dialog.style.top = "0px";
    }

    // Temporary solution
    window.addEventListener(
      "resize",
      (e) => {
        this.dialog.style.left = "0px";
        this.dialog.style.top = "0px";
        this.dialog.close();
      },
      { once: true }
    );
  },
  closeDialog: function (e) {
    this.dialog.close();
  },
  onCloseHandler: function () {
    this.dialog.firstChild.remove();
  },
  fetchContent: async function (url, formAction) {
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
  },
};

dialogController.setDialog(); */
