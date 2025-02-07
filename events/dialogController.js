const dialog = document.querySelector("dialog");
console.log(dialog);

const openDialog = (e) => {
  console.log(e.target);
  console.log("dialog:", dialog);
  dialog.showModal();
};

const closeDialog = (e) => {
  console.log(e.target);
  dialog.close();
};
