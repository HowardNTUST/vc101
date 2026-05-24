const header = document.getElementById("siteHeader");
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const tabButtons = document.querySelectorAll(".tab-btn");
const planPanels = document.querySelectorAll(".plan-panel");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const cursorGlow = document.querySelector(".cursor-glow");

if (window.lucide) {
  lucide.createIcons();
}

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    const headerHeight = header.offsetHeight;
    const targetPosition = target.offsetTop - headerHeight + 4;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });

    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
  });
});

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const plan = button.dataset.plan;

    tabButtons.forEach((btn) => btn.classList.remove("active"));
    planPanels.forEach((panel) => panel.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(plan).classList.add("active");

    if (window.lucide) {
      lucide.createIcons();
    }
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const submitButton = contactForm.querySelector("button[type='submit']");
  const originalText = submitButton.innerHTML;

  submitButton.disabled = true;
  submitButton.innerHTML = "送出中...";

  setTimeout(() => {
    formMessage.textContent = "已成功送出！AIFILM LAB 將盡快與你聯繫。";
    contactForm.reset();

    submitButton.disabled = false;
    submitButton.innerHTML = originalText;

    if (window.lucide) {
      lucide.createIcons();
    }
  }, 700);
});

window.addEventListener("mousemove", (event) => {
  if (!cursorGlow) return;

  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
  }
});