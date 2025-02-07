"use strict";
const openMenu = document.getElementById("button-open-menu");
const closeMenu = document.getElementById("button-close-menu");
const menu = document.getElementById("menu");
const upButton = document.getElementById("up-button");
openMenu === null || openMenu === void 0 ? void 0 : openMenu.addEventListener("click", () => {
    menu === null || menu === void 0 ? void 0 : menu.style.setProperty("display", "block");
    closeMenu === null || closeMenu === void 0 ? void 0 : closeMenu.style.setProperty("display", "block");
    upButton === null || upButton === void 0 ? void 0 : upButton.style.setProperty("display", "none");
});
closeMenu === null || closeMenu === void 0 ? void 0 : closeMenu.addEventListener("click", () => {
    menu === null || menu === void 0 ? void 0 : menu.style.setProperty("display", "none");
    closeMenu.style.setProperty("display", "none");
    upButton === null || upButton === void 0 ? void 0 : upButton.style.setProperty("display", "block");
});
