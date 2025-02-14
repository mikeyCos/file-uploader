/* Why can't I just pass formData to the body?
 * A raw string "foo=test" will return { foo: 'test' } in the req.body
 * https://stackoverflow.com/questions/46640024/how-do-i-post-form-data-with-fetch-api
 *
 * HTMLFormElement.submit() method does NOT trigger a submit event
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit
 *
 * Does
 */
const onSubmit = async (e) => {
  console.log("onSubmit running...");
  console.log(e);
  console.log(e.target);
  e.preventDefault();
  const form = e.target;
  const { formType } = form.dataset;
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  console.log("formType:", formType);
  console.log("data:", data);

  const validationPass = await fetch("/components/folder/create", {
    method: "POST",
    redirect: "manual",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
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

  console.log("validationPass:", validationPass);
  if (validationPass) form.submit();

  /* const validationPass = await fetch("/components/files/upload", {
    method: "POST",
    redirect: "manual",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
  })
    .then(async (res) => {
      console.log(res);
      // if (!res.ok) {
      //   const rawHTML = await res.text();
      //   throw new Error(rawHTML);
      // }

      // return true;
    })
    .catch((err) => {
      // const parser = new DOMParser();
      // const doc = parser.parseFromString(err, "text/html");
      // form.replaceWith(doc.querySelector("form"));
      // return false;
    }); */
};
