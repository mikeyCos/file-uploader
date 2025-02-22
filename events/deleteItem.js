const deleteItem = async (e) => {
  const btn = e.currentTarget;
  const { action } = btn.dataset;
  const parentElement = btn.parentElement;

  /* await fetch(action, {
    method: "DELETE",
  }).then((res) => {
    console.log("res:", res);
    if (res.redirected) window.location = res.url;
  }); */

  await fetch(action, {
    method: "DELETE",
  })
    .then(async (res) => {
      console.log("res:", res);
      if (res.ok) {
        parentElement.remove();
      }
    })
    .catch((err) => {
      console.log("err:", err);
    });
};

const deleteFolder = () => {};

const deleteFile = () => {};
