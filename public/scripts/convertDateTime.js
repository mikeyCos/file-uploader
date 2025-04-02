// Accepts dateString
//  Might need to validate the dateString parameter
//    dateString must be a string
//    a Date object must be created
//  Convert Date object to user's date/time
//  Select DOM element of class ".created-at"
//  Set element's textContent to the converted date/time
// Instead of accepting a parameter,
//  Select DOM element of class ".created-at"
//  Convert textContent to Date object
//  Convert Date object to user's date/time
//  Set element's textContent to the converted date/time
const convertDateTime = (dateString) => {
  return () => {
    const date = new Date(dateString);
    const convertedDate = new Date(date.toISOString()).toLocaleString();
    const element = document.querySelector(".created-at");
    element.textContent = convertedDate;
  };
};
