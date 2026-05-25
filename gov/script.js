const imageModal = document.querySelector("[data-image-modal]");
const imageModalClose = document.querySelector("[data-image-modal-close]");
const imageModalContent = document.querySelector("[data-image-modal-content]");

function openImageModal(image) {
  if (!imageModal || !imageModalContent || !image) return;

  imageModalContent.src = image.currentSrc || image.src;
  imageModalContent.alt = image.alt || "放大的圖片";
  imageModal.hidden = false;
  imageModal.classList.add("is-open");
  imageModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeImageModal() {
  if (!imageModal || !imageModalContent) return;

  imageModal.classList.remove("is-open");
  imageModal.setAttribute("aria-hidden", "true");
  imageModal.hidden = true;
  document.body.classList.remove("modal-open");
  imageModalContent.removeAttribute("src");
  imageModalContent.alt = "";
}

document.addEventListener("click", (event) => {
  const image = event.target instanceof HTMLImageElement ? event.target : null;
  if (!image || image.closest("a")) return;

  openImageModal(image);
});

imageModalClose?.addEventListener("click", closeImageModal);

imageModal?.addEventListener("click", (event) => {
  if (event.target === imageModal || event.target === imageModalClose) {
    closeImageModal();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeImageModal();
});