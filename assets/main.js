function qs(selector, root = document) {
  return root.querySelector(selector);
}

function qsa(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

function setupMobileNav() {
  const toggle = qs("[data-nav-toggle]");
  const links = qs("[data-nav-links]");

  if (!toggle || !links) return;

  function setOpen(isOpen) {
    links.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  }

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.contains("is-open");
    setOpen(!isOpen);
  });

  // Ferme le menu quand on clique un lien
  qsa("[data-nav-link]").forEach((a) => {
    a.addEventListener("click", () => setOpen(false));
  });

  // Ferme le menu à l'échap
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
}

function setupActiveSectionHighlight() {
  const sectionById = new Map(
    qsa("[data-section]").filter((s) => s.id).map((s) => [s.id, s]),
  );
  const navLinks = qsa("[data-nav-link]")
    .filter((a) => a.getAttribute("href")?.startsWith("#"))
    .map((a) => ({
      el: a,
      id: a.getAttribute("href").slice(1),
    }))
    .filter((x) => sectionById.has(x.id));

  if (!navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      // On choisit l'entrée la plus "visible" parmi celles intersectées
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;

      const activeId = visible.target.id;
      navLinks.forEach(({ el, id }) => el.classList.toggle("is-active", id === activeId));
    },
    {
      root: null,
      // vise le haut de viewport, en tenant compte du header sticky
      rootMargin: "-35% 0px -55% 0px",
      threshold: [0.05, 0.15, 0.25, 0.4, 0.6],
    },
  );

  sectionById.forEach((section) => observer.observe(section));
}

function setupContactFormMailtoFallback() {
  const form = qs("[data-contact-form]");
  if (!form) return;

  const status = qs("[data-form-status]", form) || qs("[data-form-status]");

  function setStatus(text) {
    if (!status) return;
    status.textContent = text;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const need = String(formData.get("need") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !need || message.length < 10) {
      setStatus("Merci de compléter les champs (message ≥ 10 caractères).");
      return;
    }

    const subject = encodeURIComponent(`[Low Agency] Demande — ${need}`);
    const body = encodeURIComponent(
      `Nom: ${name}\nEmail: ${email}\nBesoin: ${need}\n\nMessage:\n${message}\n`,
    );

    // Remplace l'email ici si besoin (placeholder dans le HTML également)
    const to = "hello@lowagency.fr";
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    setStatus("Ouverture de votre messagerie…");
  });
}

function setupYear() {
  const el = qs("[data-year]");
  if (!el) return;
  el.textContent = String(new Date().getFullYear());
}

setupMobileNav();
setupActiveSectionHighlight();
setupContactFormMailtoFallback();
setupYear();


