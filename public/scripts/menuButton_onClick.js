const menuButton_onClick = (e) => {
  const btn = e.currentTarget;
  const navRightWrapper = document.querySelector(".nav-right-wrapper");

  btn.ariaPressed = btn.ariaPressed === "false";
  navRightWrapper.classList.toggle("active");
};
