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
  console.log("onSubmit running...");
  console.log(e);
  console.log("e.currentTarget:", e.currentTarget);
  e.preventDefault();
  const form = e.currentTarget;
  const { action } = form;
  const { itemId } = form.dataset;
  const formData = new FormData(form);
  // What if action is an invalid path?
  // The error middleware will set the status code to 404
  const { ok, content } = await cb(action, { body: formData, itemId });

  console.log("ok:", ok);
  console.log("content:", content);
  if (ok) {
    form.submit();
  } else {
    if (content.tagName !== "FORM") return form.replaceWith(content);
    form.replaceWith(content);
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

const uploadFiles = async (url, { body }) => {
  console.log("fetchFiles running...");
  console.log("url:", url);
  return fetch(url, { method: "POST", body })
    .then(async (res) => {
      if (!res.ok) {
        const rawHTML = await res.text();
        // return Promise.reject(rawHTML);
        throw new Error(rawHTML);
      }

      // Render new list of files?
      // Replace old list with new list of files
      // Where is window.location.reload in the call stack?
      setTimeout(() => {
        window.location.reload();
      }, 0);
      // window.location.reload();
      return { ok: true };
    })
    .catch((err) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(err, "text/html");
      const content = doc.body.firstElementChild;
      return { ok: false, content };
    });
};

const createFolder = async (url, { body }) => {
  console.log("fetchFolder running...");
  console.log("url:", url);
  return fetch(url, {
    method: "POST",
    body: new URLSearchParams(body),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then(async (res) => {
      if (!res.ok) {
        const rawHTML = await res.text();
        // return Promise.reject(rawHTML);
        throw new Error(rawHTML);
      }

      // Render new list of folders?
      // Replace old list with new list of folders
      setTimeout(() => {
        window.location.reload();
      }, 0);
      // window.location.reload();
      return { ok: true };
    })
    .catch((err) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(err, "text/html");
      console.log(doc.body);
      // If the status is a 404
      // Select the section
      const content = doc.querySelector("form");

      console.log(content);
      return { ok: false, content };
    });
};

const editItem = async (url, { body, itemId }) => {
  console.log("fetchPut running...");
  console.log("url:", url);
  return fetch(url, { method: "PUT", body: new URLSearchParams(body) })
    .then(async (res) => {
      console.log(res);
      const rawHTML = await res.text();
      if (!res.ok) {
        throw new Error(rawHTML);
      }

      return rawHTML;
    })
    .then(async (html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const newItem = doc.querySelector("li");
      const oldItem = document.querySelector(`li[data-item-id="${itemId}"]`);

      oldItem.replaceWith(newItem);
      return { ok: true };
    })
    .catch((err) => {
      console.log(err);
      const parser = new DOMParser();
      const doc = parser.parseFromString(err, "text/html");
      const content = doc.body.firstElementChild;
      return { ok: false, content };
    });
};

const deleteItem = async (url, { itemId }) => {
  console.log("fetchDelete running...");
  console.log("url:", url);
  console.log("itemId:", itemId);
  return fetch(url, { method: "DELETE" })
    .then(async (res) => {
      if (!res.ok) {
      }

      const item = document.querySelector(`li[data-item-id="${itemId}"]`);
      item.remove();
      return { ok: true };
    })
    .catch((err) => {});
  // Need item from DOM
  // If response.ok is true
  //    Refresh page
  //    OR
  //    Remove item from DOM
  //    Close dialog
};

const shareFolder = async (url, { body }) => {
  console.log(url);
  return fetch(url, { method: "PUT", body: new URLSearchParams(body) })
    .then(async (res) => {
      console.log(res);
      const rawHTML = await res.text();
      return rawHTML;
    })
    .then(async (html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const content = doc.body.firstElementChild;

      return { ok: true, content };
    });
};
