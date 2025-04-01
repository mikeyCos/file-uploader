/* Why can't I just pass formData to the body?
 * A raw string "foo=test" will return { foo: 'test' } in the req.body
 * https://stackoverflow.com/questions/46640024/how-do-i-post-form-data-with-fetch-api
 *
 * HTMLFormElement.submit() method does NOT trigger a submit event
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit
 *
 * Folder validation
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#getting_information_on_selected_files
 * https://blog.logrocket.com/multer-nodejs-express-upload-file/
 * If form is passed into FormData, the input's name attribute must be used when calling upload.array()
 * If files are being appended to formData, then the field name must be used when calling upload.array()
 * What if files is empty? Abort fetch?
 * Why does setting a content-type cause a range error?
 *  RangeError [ERR_HTTP_INVALID_STATUS_CODE]: Invalid status code: undefined
 */

const onSubmit = async (e, cb) => {
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  console.log("onSubmit running...");
  const form = e.currentTarget;
  const { action } = form;
  const { itemId } = form.dataset;
  const formData = new FormData(form);

  const { ok, htmlContent } = await cb(action, {
    body: formData,
    itemId,
  }).catch((err) => {
    const htmlContent = document.createElement("p");
    htmlContent.className = "fetch-error";
    htmlContent.textContent = err;
    return { ok: false, htmlContent };
  });

  if (ok) {
    if (htmlContent) return form.replaceWith(htmlContent);
    form.submit();
  } else {
    form.replaceWith(htmlContent);
  }

  // "POST" and "PUT" methods
  // Need to validate the form
  // If response.ok is true
  //    Do something...
  // If response.ok is false
  //    Return form with errors
  //    OR
  //    Return an array of errors

  // "DELETE" method
  // If response.ok is true
  //    Do something...
  // If response.ok is false
  //    Do something...

  // Refresh the current page or manipulate the DOM?
};

const formRejectHandler = async (rej) => {
  if (rej instanceof Error) throw rej;
  const rawHTML = await rej.text();
  const parser = new DOMParser();
  // Using DOMParser does not seem safe from XSS
  // https://stackoverflow.com/questions/64772302/is-parsing-html-with-domparser-safe-from-xss
  const doc = parser.parseFromString(rawHTML, "text/html");
  const htmlContent = doc.body.firstElementChild;
  return await Promise.resolve({ ok: false, htmlContent });
};

const responseStatusHandler = async (res) => {
  if (!res.ok) {
    console.log(res);
    if (res.status === 404) throw new Error("Resource not found");
    if (res.status === 401) throw new Error("Unauthorized access");
    // if (res.status === 422) throw new Error(res.statusText);
    // If !res.ok
    //  If res.status is a specific code, throw Error
    //  If needed, add additional control for other codes
    //  Reject the res
    //  If onRejected exists, it will handle the rejection
    await Promise.reject(res);
  }

  return res;
};

const uploadFiles = async (url, { body }) => {
  return fetch(url, { method: "POST", body })
    .then(responseStatusHandler)
    .then((res) => {
      // Render new list of files?
      // Replace old list with new list of files
      // Where is window.location.reload in the call stack?
      setTimeout(() => {
        window.location.reload();
      }, 0);

      return { ok: true };
    }, formRejectHandler)
    .then((res) => res);
};

const createFolder = async (url, { body }) => {
  return fetch(url, {
    method: "POST",
    body: new URLSearchParams(body),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then(responseStatusHandler)
    .then((res) => {
      // Render new list of folders?
      // Replace old list with new list of folders
      setTimeout(() => {
        window.location.reload();
      }, 0);
      return { ok: true };
    }, formRejectHandler)
    .then((res) => res);
};

const editItem = async (url, { body, itemId }) => {
  return fetch(url, { method: "PUT", body: new URLSearchParams(body) })
    .then(responseStatusHandler)
    .then(async (res) => {
      const rawHTML = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(rawHTML, "text/html");
      const newItem = doc.querySelector("li");
      const oldItem = document.querySelector(`li[data-item-id="${itemId}"]`);

      oldItem.replaceWith(newItem);
      return { ok: true };
    }, formRejectHandler)
    .then((res) => res);
};

const deleteItem = async (url, { itemId }) => {
  return fetch(url, { method: "DELETE" })
    .then(responseStatusHandler)
    .then(() => {
      const item = document.querySelector(`li[data-item-id="${itemId}"]`);
      item.remove();
      return { ok: true };
    });
};

const shareFolder = async (url, { body }) => {
  return fetch(url, { method: "PUT", body: new URLSearchParams(body) })
    .then(responseStatusHandler)
    .then(async (res) => {
      const rawHTML = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(rawHTML, "text/html");
      const htmlContent = doc.body.firstElementChild;

      return { ok: true, htmlContent };
    }, formRejectHandler)
    .then((res) => {
      return res;
    });
};
