const toggleItemControls = (e) => {
  const btn = e.currentTarget;
  const itemControls = btn.nextElementSibling;
  itemControls.classList.toggle("active");
  console.log(btn.getBoundingClientRect());
  const { bottom, height, left, right, top, width } =
    btn.getBoundingClientRect();
  itemControls.style.transform = `translate(-${width}px, ${height}px)`;
  console.log(btn);
  console.log(itemControls);
};
