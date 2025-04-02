const convertDateTime = (dateString) => {
  return () => {
    const date = new Date(dateString);
    const element = document.querySelector(".created-at");
    const convertedDate = new Date(date.toISOString()).toLocaleString();
    element.textContent = convertedDate;
  };
};
