const dialog = document.querySelector("dialog");

// Saves button if button does not have driveControls dataset
// The previous saved button is popped from array and used for positioning the dialog element
const btnDispatcher = {
  dispatchedBtn: [],
  recordDispatchedBtn(btn) {
    this.dispatchedBtn.push(btn);
  },
  getDispatchedBtn() {
    return this.dispatchedBtn.pop();
  },
};

// To encapsulate or to not encapsulate?
const openDialog = async (e) => {
  const prevBtn = btnDispatcher.getDispatchedBtn();
  const btn = e.currentTarget;
  const { url, formAction, itemControls, openControls, driveControls } =
    btn.dataset;
  const { htmlContent } = await fetchContent(url, formAction);

  if (itemControls === "true") {
    dialog.firstChild.replaceWith(htmlContent);
  } else {
    dialog.append(htmlContent);
  }

  dialog.showModal();

  // Control flow is gross
  if (!driveControls) {
    // left, top, right, bottom, x, y, width
    btnDispatcher.recordDispatchedBtn(btn);
    const btnRect = (itemControls ? prevBtn : btn).getBoundingClientRect();
    const dialogRect = dialog.getBoundingClientRect();
    const newLeft = btnRect.left - dialogRect.width;

    if (window.innerWidth >= 320) {
      dialog.style.left = `${
        newLeft > 0 ? newLeft : btnRect.right - dialogRect.width
      }px`;
    }

    // If dialog's position exceeds the window's height
    //  Position the dialog above the button
    // Else
    //  Position the dialog below the button
    if (dialogRect.height + btnRect.bottom > window.innerHeight) {
      dialog.style.top = "auto";
      dialog.style.bottom = `${
        window.innerHeight - btnRect.bottom + btnRect.height
      }px`;
    } else {
      dialog.style.top = `${btnRect.bottom}px`;
      dialog.style.bottom = "auto";
    }
  } else {
    dialog.className = "drive-controls";
  }

  // Temporary solution
  window.addEventListener(
    "resize",
    (e) => {
      dialog.style.left = "0px";
      dialog.style.top = "0px";
      dialog.style.bottom = "0px";
      dialog.close();
    },
    { once: true }
  );
};

const closeDialog = (e) => {
  // elementSource element is the element to which the event handler has been attached.
  // clickElement is the element the user clicked on the DOM

  // If the clicked element is the dialog
  // If the assigned element is a button
  //  Reset dialog left and top position only
  const { open } = e?.target?.dataset;
  // const clickedElement =
  //   e.target.tagName === "DIALOG" || (e.target.type === "submit" && !open);
  const clickedElement = e.target.tagName === "DIALOG";
  const elementSource = e.currentTarget.tagName === "BUTTON";
  if (clickedElement || elementSource) {
    // dialog.style.left = "0px";
    // dialog.style.top = "0px";
    dialog.close();
  }
};

const onCloseHandler = () => {
  dialog.removeAttribute("class");
  dialog.firstChild.remove();
  dialog.style.left = "0px";
  dialog.style.top = "0px";
  dialog.style.bottom = "0px";
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
      htmlContent.className = "fetch-error";
      htmlContent.textContent = err;
      return { htmlContent };
    });
};
