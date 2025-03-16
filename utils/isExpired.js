const isValidDate = (date) => {
  // A better way to check if value is a date object
  // https://stackoverflow.com/questions/643782/how-to-check-whether-an-object-is-a-date
  return (
    date &&
    Object.prototype.toString.call(date) === "[object Date]" &&
    !isNaN(date)
  );
};

const isExpired = (expiresAt) => {
  console.log("isExpired running...");
  // instanceof and multiple realms
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof#instanceof_and_multiple_realms
  // if (!(expiresAt instanceof Date))
  //   throw new Error("ExpiresAt is not instanceof Date object.");
  const validDate = isValidDate(expiresAt);
  if (!validDate) throw new Error("ExpiresAt is not a date object.");

  const today = new Date();
  console.log("today:", today);
  console.log("expiresAt:", expiresAt);
  return today >= expiresAt;
};

module.exports = isExpired;
