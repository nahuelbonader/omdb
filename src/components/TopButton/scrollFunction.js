function scrollFunction() {
  const btn = document.getElementById("topBtn");
  const topLimit = 100;

  if (
    document.body.scrollTop > topLimit ||
    document.documentElement.scrollTop > topLimit
  ) {
    btn.style.display = "flex";
  } else {
    btn.style.display = "none";
  }
}

export default scrollFunction;
