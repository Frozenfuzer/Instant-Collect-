/* ==========================================================================
   INSTANT COLLECTÉ — comportement, v3 multi-pages
   ========================================================================== */

/* --------------------------------------------------------------------------
   1) POINT DE CONTACT DES COMMANDES — une seule ligne à changer
   -------------------------------------------------------------------------- */
const ORDER_LINK = "https://www.instagram.com/instant_collecte/";

/* --------------------------------------------------------------------------
   2) IMAGES — colle ici les URLs de tes images (Assets CodePen, postimages, etc.)
      Laisse "" pour afficher un cadre "image à venir" stylisé à la place.
      La clé correspond à l'attribut data-img="..." dans le HTML.

      Exemple : editionMeresHero: "https://i.postimg.cc/xxxx/fete-des-meres.png",

      boosterPackArt / boosterCard1-3 : visuel du pack fermé et des 3 photos
      révélées à l'ouverture (booster mystère, page d'accueil). Embarquées en
      base64 ci-dessous pour fonctionner directement sur CodePen sans
      hébergement externe — tu peux remplacer par une URL https://... à tout
      moment, le fonctionnement ne change pas.
   -------------------------------------------------------------------------- */
const IMAGES = {
  // Logo hero accueil
  heroLogo: "https://frozenfuzer.github.io/Instant-Collect-/assets/accueil/Photo%201%20modif.png",

  // Accueil — titre "Comment ça fonctionne ?" flanqué des 3 mini boosters
  titleBoostersArt: "https://frozenfuzer.github.io/Instant-Collect-/assets/icones/3%20mini%20booster.jpeg",

  // Accueil — icônes des 4 mini-étapes
  stepIconCamera:    "https://frozenfuzer.github.io/Instant-Collect-/assets/icones/Vignette%201%20appareil%20photo.jpeg",
  stepIconVignettes: "https://frozenfuzer.github.io/Instant-Collect-/assets/icones/Vignette%202%20carte%20en%20d%C3%A9sordre.jpeg",
  stepIconBoosters:  "https://frozenfuzer.github.io/Instant-Collect-/assets/icones/Vignette%203%203%20mini%20booster.jpeg",
  stepIconLivre:     "https://frozenfuzer.github.io/Instant-Collect-/assets/icones/Vignette%204%20livret.jpeg",

  // Accueil — booster mystère interactif
  boosterPackArt: "https://frozenfuzer.github.io/Instant-Collect-/assets/accueil/Booster%20Ete%202026%20sans%20Fond.png",
  boosterCard1:   "https://frozenfuzer.github.io/Instant-Collect-/assets/accueil/Mini%20image%20booster%20mystere%20Famille.jpeg",
  boosterCard2:   "https://frozenfuzer.github.io/Instant-Collect-/assets/accueil/Mini%20image%20booster%20mystere%20Julian%20et%20mami.jpeg",
  boosterCard3:   "https://frozenfuzer.github.io/Instant-Collect-/assets/accueil/Mini%20image%20booster%20mystere%20mariage.jpeg",

  // Accueil — grille éditions (à compléter)
  editionHistoireAmour: "",
  editionSouvenirs:     "",
  editionEte:           "",
  editionKing:          "",
  editionMariage:       "",
  editionPeres:         "",

  // Accueil — bandeau vedette
  editionMeresHero: "",

  // Accueil — ambiance (polaroids)
  ambiance1: "", ambiance2: "", ambiance3: "", ambiance4: "",

  // Accueil — preuve sociale (screenshots)
  screenshot1: "", screenshot2: "", screenshot3: "", screenshot4: "",

  // Concept — 4 étapes
  step1: "", step2: "", step3: "", step4: "",

  // King Jouet
  kingBooster: "", kingShop: "",

  // Fête des Mères
  meresHero: "", meresPoster: "", meresLivret: "",

  // Saint-Valentin
  valentinHero: "", valentinBooster: "", valentinLivret: "",
};

function applyImages(){
  // Conteneurs génériques (div, etc.) : image en background, cadre "à venir" sinon
  document.querySelectorAll("[data-img]:not(img)").forEach((el) => {
    const key = el.dataset.img;
    const url = IMAGES[key];
    if (url && url.trim() !== ""){
      el.style.backgroundImage = `url("${url}")`;
      el.classList.add("has-image");
    } else {
      el.style.backgroundImage = "";
      el.classList.remove("has-image");
    }
  });
  // Balises <img> (booster) : on fixe directement la source
  document.querySelectorAll("img[data-img]").forEach((el) => {
    const key = el.dataset.img;
    const url = IMAGES[key];
    if (url && url.trim() !== ""){
      el.src = url;
      el.classList.add("has-image");
    }
  });
}

/* --------------------------------------------------------------------------
   3) CTA commande
   -------------------------------------------------------------------------- */
document.querySelectorAll("[data-order-link]").forEach((el) => {
  el.addEventListener("click", () => window.open(ORDER_LINK, "_blank", "noopener"));
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* --------------------------------------------------------------------------
   4) ROUTEUR par hash — 7 "pages" dans un seul fichier
   -------------------------------------------------------------------------- */
const ROUTES = {
  "accueil":        { title: "Instant Collecté — Le souvenir qu'on déballe, qu'on offre", header: "full" },
  "concept":        { title: "Comment ça marche — Instant Collecté", header: "full" },
  "king-jouet":     { title: "Partenariat King Jouet — Instant Collecté", header: "minimal" },
  "fete-des-meres": { title: "Édition Fête des Mères — Instant Collecté", header: "full" },
  "saint-valentin": { title: "Édition Saint-Valentin — Instant Collecté", header: "full" },
  "mariage":        { title: "Mariage — Instant Collecté",                       header: "full" },
  "fete-des-peres": { title: "Édition Fête des Pères (bientôt) — Instant Collecté", header: "full" },
  "contact":        { title: "Nous contacter — Instant Collecté",                     header: "full" },
  "souvenir-ete":   { title: "Souvenir d'été (bientôt) — Instant Collecté",            header: "full" },
  "jour-de-fete":   { title: "Jour de Fête ! — Instant Collecté",                     header: "full" },
  "partenaires":    { title: "Nos Partenaires — Instant Collecté",                     header: "full" },
};
const DEFAULT_ROUTE = "accueil";

const siteHeader     = document.getElementById("siteHeader");
  const siteFooter     = document.getElementById("siteFooter") || document.querySelector(".footer");
const navLinksPanel  = document.getElementById("navLinks");
const navBurger      = document.getElementById("navBurger");
const navEditions    = document.getElementById("navEditions");
const navEditionsTrig = document.getElementById("navEditionsTrigger");
const pages          = document.querySelectorAll(".page");

function resolveRoute(rawHash){
  const clean = (rawHash || "").replace("#", "").trim();
  return ROUTES[clean] ? clean : DEFAULT_ROUTE;
}

function renderRoute(){
  const route = resolveRoute(window.location.hash);
  const config = ROUTES[route];

  pages.forEach((page) => page.classList.toggle("is-active", page.dataset.pageSection === route));

  document.body.setAttribute("data-page", route);
  document.title = config.title;

  siteHeader.classList.toggle("header-minimal", config.header === "minimal");
  if (siteFooter) siteFooter.classList.toggle("footer-minimal", route === "king-jouet");

  document.querySelectorAll("[data-route-link]").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.routeLink === route);
  });

  closeEditions();
  navLinksPanel.classList.remove("is-open");
  navBurger.setAttribute("aria-expanded", "false");

  // Scroll immédiat — triple méthode pour compatibilité navigateurs
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo(0, 0);

  // ré-arme les apparitions au scroll sur le contenu désormais visible
  setupReveal();
}

window.addEventListener("hashchange", renderRoute);

/* --------------------------------------------------------------------------
   4b) Scroll en haut sur TOUT clic de lien hash (nav, footer, cartes…)
       Couvre aussi le cas où le hash ne change pas (même page, relance manuelle)
   -------------------------------------------------------------------------- */
document.addEventListener("click", (e) => {
  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;
  const target = anchor.getAttribute("href").replace("#", "");
  if (!ROUTES[target]) return; // ignore les ancres non-routées

  // Si le hash est déjà le bon, hashchange ne se déclenche pas → on force manuellement
  if (resolveRoute(window.location.hash) === target) {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
  }
  // Dans tous les cas, on sécurise le scroll au prochain tick
  setTimeout(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
  }, 16);
});

/* --------------------------------------------------------------------------
   5) Dropdown "Éditions" — ouverture au clic + survol (desktop), accessible
   -------------------------------------------------------------------------- */
function openEditions(){
  if (!navEditions) return;
  navEditions.classList.add("is-open");
  navEditionsTrig.setAttribute("aria-expanded", "true");
}
function closeEditions(){
  if (!navEditions) return;
  navEditions.classList.remove("is-open");
  navEditionsTrig.setAttribute("aria-expanded", "false");
}
function toggleEditions(){
  if (!navEditions) return;
  navEditions.classList.contains("is-open") ? closeEditions() : openEditions();
}

if (navEditions && navEditionsTrig){
  navEditionsTrig.addEventListener("click", (e) => { e.stopPropagation(); toggleEditions(); });

  // survol sur desktop seulement
  const hoverCapable = window.matchMedia("(hover: hover) and (min-width: 761px)");
  navEditions.addEventListener("mouseenter", () => { if (hoverCapable.matches) openEditions(); });
  navEditions.addEventListener("mouseleave", () => { if (hoverCapable.matches) closeEditions(); });

  // clic en dehors ferme
  document.addEventListener("click", (e) => {
    if (navEditions.classList.contains("is-open") && !navEditions.contains(e.target)) closeEditions();
  });
  // Échap ferme
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeEditions(); });
}

/* --------------------------------------------------------------------------
   6) Menu mobile (burger)
   -------------------------------------------------------------------------- */
if (navBurger && navLinksPanel){
  navBurger.addEventListener("click", () => {
    const isOpen = navLinksPanel.classList.toggle("is-open");
    navBurger.setAttribute("aria-expanded", String(isOpen));
  });
  navLinksPanel.querySelectorAll("a, .nav-cta").forEach((el) => {
    el.addEventListener("click", () => {
      navLinksPanel.classList.remove("is-open");
      navBurger.setAttribute("aria-expanded", "false");
    });
  });
}

/* --------------------------------------------------------------------------
   7) Booster mystère — ouverture façon "booster TCG", au clic/tap uniquement
      Séquence complète, entièrement automatique une fois déclenchée :
        1. déchirure du pack (scale + fade)
        2. flash lumineux
        3. les 3 cartes s'envolent en éventail avec rebond, puis flottent
        4. freeze de 5 secondes, le temps de regarder les photos
        5. les cartes rentrent dans le pack (animation inverse)
        6. le pack se reforme, retour à l'état initial
      Pas de bouton dédié : on reclique sur le pack pour relancer le cycle.
   -------------------------------------------------------------------------- */
const boosterPack    = document.getElementById("boosterPack");
const boosterFlash   = document.getElementById("boosterFlash");
const boosterReveal  = document.getElementById("boosterReveal");

let boosterIsBusy = false; // verrouille les clics pendant tout le cycle
let boosterAnimTimers = [];

function clearBoosterTimers(){
  boosterAnimTimers.forEach((t) => clearTimeout(t));
  boosterAnimTimers = [];
}

function runBoosterCycle(){
  if (!boosterPack || !boosterReveal || boosterIsBusy) return;
  boosterIsBusy = true;

  boosterPack.setAttribute("aria-expanded", "true");
  boosterPack.setAttribute("aria-label", "Booster ouvert");

  if (prefersReducedMotion){
    // version simplifiée : affichage direct, freeze 5s, puis retour direct
    boosterPack.classList.add("is-open");
    boosterReveal.classList.add("is-visible", "is-settled");
    boosterAnimTimers.push(setTimeout(() => {
      boosterReveal.classList.remove("is-visible", "is-settled");
      boosterPack.classList.remove("is-open");
      boosterPack.setAttribute("aria-expanded", "false");
      boosterPack.setAttribute("aria-label", "Cliquer pour ouvrir le booster mystère");
      boosterIsBusy = false;
    }, 3500));
    return;
  }

  // 1) le pack se déchire
  boosterPack.classList.add("is-opening");

  // 2) flash lumineux, synchronisé avec la fin de la déchirure
  boosterAnimTimers.push(setTimeout(() => {
    boosterPack.classList.remove("is-opening");
    boosterPack.classList.add("is-open");
    if (boosterFlash) boosterFlash.classList.add("is-flashing");
  }, 280));

  // 3) les cartes s'envolent en éventail
  boosterAnimTimers.push(setTimeout(() => {
    boosterReveal.classList.add("is-visible");
  }, 340));

  // 4) une fois posées, petit flottement continu + démarrage du freeze de 5s
  boosterAnimTimers.push(setTimeout(() => {
    boosterReveal.classList.add("is-settled");
    if (boosterFlash) boosterFlash.classList.remove("is-flashing");
  }, 1100));

  // 5) après le freeze, les cartes rentrent dans le pack (animation inverse)
  boosterAnimTimers.push(setTimeout(() => {
    boosterReveal.classList.remove("is-settled");
    boosterReveal.classList.add("is-returning");
  }, 4600));

  // 6) le pack se reforme une fois les cartes rentrées
  boosterAnimTimers.push(setTimeout(() => {
    boosterReveal.classList.remove("is-visible", "is-returning");
    boosterPack.classList.remove("is-open");
    boosterPack.classList.add("is-reforming");
  }, 5060));

  // 7) retour complet à l'état initial, le clic redevient possible
  boosterAnimTimers.push(setTimeout(() => {
    boosterPack.classList.remove("is-reforming");
    boosterPack.setAttribute("aria-expanded", "false");
    boosterPack.setAttribute("aria-label", "Cliquer pour ouvrir le booster mystère");
    boosterIsBusy = false;
  }, 5560));
}

if (boosterPack && boosterReveal){
  boosterPack.addEventListener("click", runBoosterCycle);
}

/* --------------------------------------------------------------------------
   8) Apparitions au scroll (marquées) — ré-armées à chaque changement de page
   -------------------------------------------------------------------------- */
let revealObserver = null;
const REVEAL_SELECTOR = ".page.is-active .values .value, .page.is-active .step-mini, .page.is-active .produit-card, .page.is-active .concept-step-row, .page.is-active .feature-band, .page.is-active .polaroid, .page.is-active .faq-item, .page.is-active .section-header";

function setupReveal(){
  if (prefersReducedMotion) return;
  if (revealObserver) revealObserver.disconnect();

  const targets = document.querySelectorAll(REVEAL_SELECTOR);
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting){
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

  targets.forEach((el, i) => {
    el.classList.add("reveal");
    // petit décalage en cascade dans une même rangée
    const mod = i % 3;
    if (mod === 1) el.classList.add("reveal-delay-1");
    if (mod === 2) el.classList.add("reveal-delay-2");
    revealObserver.observe(el);
  });
}

/* --------------------------------------------------------------------------
   9) Init
   -------------------------------------------------------------------------- */
applyImages();
renderRoute();

/* --------------------------------------------------------------------------
   10) Formulaire de contact — Formspree + fallback mailto
   -------------------------------------------------------------------------- */
(function(){
  const form = document.getElementById("contactForm");
  if (!form) return;
  const submitBtn    = document.getElementById("cfSubmitBtn");
  const labelDefault = submitBtn ? submitBtn.querySelector(".form-submit-label") : null;
  const labelSending = submitBtn ? submitBtn.querySelector(".form-submit-sending") : null;
  const successBox   = document.getElementById("cfSuccess");
  const errorBox     = document.getElementById("cfError");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const requiredFields = form.querySelectorAll("[required]");
    let valid = true;
    requiredFields.forEach((f) => { f.classList.toggle("is-invalid", !f.value.trim()); if (!f.value.trim()) valid = false; });
    if (!valid) return;
    if (submitBtn) submitBtn.disabled = true;
    if (labelDefault) labelDefault.hidden = true;
    if (labelSending) labelSending.hidden = false;
    if (successBox) successBox.hidden = true;
    if (errorBox) errorBox.hidden = true;

    const action = form.getAttribute("action") || "";
    const isFormspree = action.includes("formspree.io") && !action.includes("YOUR_FORMSPREE_ID");

    if (isFormspree) {
      try {
        const res = await fetch(action, { method:"POST", body:new FormData(form), headers:{"Accept":"application/json"} });
        if (res.ok) { form.reset(); if (successBox) successBox.hidden = false; }
        else throw new Error();
      } catch { if (errorBox) errorBox.hidden = false; }
    } else {
      const n=(form.querySelector("#cf-name")||{value:""}).value, em=(form.querySelector("#cf-email")||{value:""}).value;
      const ph=(form.querySelector("#cf-phone")||{value:""}).value, tp=(form.querySelector("#cf-type")||{value:""}).value;
      const ms=(form.querySelector("#cf-message")||{value:""}).value;
      const body=`Nom : ${n}\nEmail : ${em}\nTéléphone : ${ph||"–"}\nType : ${tp}\n\nMessage :\n${ms}`;
      window.location.href=`mailto:[À REMPLACER]?subject=Nouvelle demande — Instant Collecté&body=${encodeURIComponent(body)}`;
      if (successBox) successBox.hidden = false;
    }
    if (submitBtn) submitBtn.disabled = false;
    if (labelDefault) labelDefault.hidden = false;
    if (labelSending) labelSending.hidden = true;
  });
  form.querySelectorAll(".form-input").forEach((i) => i.addEventListener("input", () => i.classList.remove("is-invalid")));
})();
if (typeof applyImages === "function") applyImages();
