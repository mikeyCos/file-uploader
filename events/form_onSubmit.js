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
const onSubmit = async (e) => {
  console.log("onSubmit running...");
  console.log(e);
  console.log(e.target);
  e.preventDefault();
  /* const form = e.target;
  const { formType } = form.dataset;
  const formData = new FormData(form);

  const fetchValidation = formType === "files" ? fetchFiles : fetchFolder;

  const validationPass = await fetchValidation({
    method: "POST",
    body: formData,
  })
    .then(async (res) => {
      if (!res.ok) {
        const rawHTML = await res.text();
        // return Promise.reject(rawHTML);
        throw new Error(rawHTML);
      }

      return true;
    })
    .catch((err) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(err, "text/html");
      form.replaceWith(doc.querySelector("form"));
      return false;
    });

  if (validationPass) form.submit(); */
};

const fetchFiles = ({ method, body }) => {
  return fetch(`/components/files/upload`, { method, body });
};

const fetchFolder = ({ method, body }) => {
  return fetch("/components/folder/create", {
    method,
    body: new URLSearchParams(body),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};
