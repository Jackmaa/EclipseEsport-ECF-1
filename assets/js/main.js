const menu = document.getElementById("menu");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");

openBtn.onclick = openNav;
closeBtn.onclick = closeNav;
document.getElementById("schedule-link").addEventListener("click", () => {
  closeNav();
});
document.getElementById("faq-link").addEventListener("click", () => {
  closeNav();
});

function openNav() {
  menu.classList.add("active");
}

function closeNav() {
  menu.classList.remove("active");
}
