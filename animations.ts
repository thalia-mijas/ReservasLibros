const openMenu = document.getElementById("button-open-menu");
const closeMenu = document.getElementById("button-close-menu");
const menu = document.getElementById("menu");
const upButton = document.getElementById("up-button");

openMenu?.addEventListener("click", () => {
  menu?.style.setProperty("display", "block");
  closeMenu?.style.setProperty("display", "block");
  upButton?.style.setProperty("display", "none");
});

closeMenu?.addEventListener("click", () => {
  menu?.style.setProperty("display", "none");
  closeMenu.style.setProperty("display", "none");
  upButton?.style.setProperty("display", "block");
});
