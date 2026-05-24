const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const planTabs = document.querySelectorAll("[data-plan]");
const planDisplay = document.querySelector("[data-plan-display]");
const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");
const modal = document.querySelector("[data-modal]");
const modalClose = document.querySelector("[data-modal-close]");
const modalPanel = modal?.querySelector(".modal-panel");

const plans = {
  starter: {
    label: "Starter",
    title: "AI MV 啟動版",
    body: "適合已有歌曲或產品素材，需要快速做出一支可發布的形象影片。",
    items: ["30-45 秒 AI MV 或形象短片", "1 套視覺方向與封面圖", "9:16 社群直式版本", "1 次修改回合"],
  },
  growth: {
    label: "Growth",
    title: "招商主推版",
    body: "適合要拿去提案、投放廣告或搭配活動招商的品牌企劃。",
    items: ["60-90 秒主片", "3 套關鍵視覺方向", "3 支短影音切版", "封面、社群貼文、招商文案", "2 次修改回合"],
  },
  custom: {
    label: "Custom",
    title: "整合客製版",
    body: "適合需要多角色、多場景、多平台素材，或要串接大型發布計畫的團隊。",
    items: ["完整 MV 世界觀規劃", "多支系列影片與廣告素材", "簡報視覺與活動頁素材", "專案製作時程控管", "依需求安排修改節點"],
  },
};

function refreshHeader() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 20);
}

function closeNav() {
  nav?.classList.remove("is-open");
  header?.classList.remove("is-open");
  navToggle?.setAttribute("aria-expanded", "false");
}

function renderPlan(key) {
  const plan = plans[key];
  if (!plan || !planDisplay) return;

  planDisplay.innerHTML = `
    <div class="plan-summary">
      <p class="plan-label">${plan.label}</p>
      <h3>${plan.title}</h3>
      <p>${plan.body}</p>
    </div>
    <ul class="plan-list">
      ${plan.items.map((item) => `<li>${item}</li>`).join("")}
    </ul>
    <a class="button button-primary" href="#contact">
      <i data-lucide="arrow-right"></i>
      詢問報價
    </a>
  `;

  window.lucide?.createIcons();
}

window.addEventListener("scroll", refreshHeader, { passive: true });
refreshHeader();

navToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open");
  header?.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) closeNav();
});

planTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const key = tab.dataset.plan;
    planTabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });
    renderPlan(key);
  });
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const submitButton = contactForm.querySelector("button[type='submit']");
  submitButton?.setAttribute("disabled", "true");
  if (formStatus) {
    formStatus.classList.remove("is-error");
    formStatus.textContent = "傳送中...";
  }

  const formData = new FormData(contactForm);
  const actionUrl = contactForm.getAttribute("action");

  fetch(actionUrl, {
    method: "POST",
    mode: "no-cors",
    body: new URLSearchParams(formData),
  })
    .then(() => {
      contactForm.reset();
      if (formStatus) formStatus.textContent = "";
      modal?.classList.add("is-visible");
      modal?.setAttribute("aria-hidden", "false");
      modalClose?.focus();
    })
    .catch(() => {
      if (formStatus) {
        formStatus.textContent = "送出失敗，請稍後再試或改用 Email 聯繫。";
        formStatus.classList.add("is-error");
      }
    })
    .finally(() => {
      submitButton?.removeAttribute("disabled");
    });
});

function closeModal() {
  if (!modal) return;
  modal.classList.remove("is-visible");
  modal.setAttribute("aria-hidden", "true");
}

modalClose?.addEventListener("click", closeModal);

modal?.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

window.addEventListener("load", () => {
  window.lucide?.createIcons();
});

// YouTube Player API - Hide poster image when video starts playing and ensure it loops infinitely
window.onYouTubeIframeAPIReady = function() {
  new YT.Player('bgVideo', {
    events: {
      'onStateChange': function(event) {
        if (event.data === YT.PlayerState.PLAYING) {
          const poster = document.querySelector('.video-poster');
          if (poster) {
            poster.classList.add('is-hidden');
          }
        } else if (event.data === YT.PlayerState.ENDED) {
          event.target.playVideo();
        }
      }
    }
  });
};

// Dynamically load the YouTube Iframe Player API script
(function() {
  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
})();
