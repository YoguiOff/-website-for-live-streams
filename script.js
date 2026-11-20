(() => {
  const config = window.YOGI_CONFIG || {};
  const player = document.getElementById("stream-player");
  const platformLabel = document.getElementById("player-platform");
  const channelLabel = document.getElementById("channel-platform");
  const channelLink = document.getElementById("channel-link");
  const tabs = document.querySelectorAll(".stream-tab");
  const valid = value => value && !String(value).startsWith("TU_");

  function showPlatform(platform) {
    const twitch = platform === "twitch";
    const username = twitch ? config.twitch : config.kick;
    platformLabel.textContent = platform.toUpperCase();
    channelLabel.textContent = platform.toUpperCase();
    tabs.forEach(tab => {
      const active = tab.dataset.platform === platform;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
    });
    channelLink.href = valid(username) ? (twitch ? `https://www.twitch.tv/${username}` : `https://kick.com/${username}`) : "#";
    if (!valid(username)) {
      player.innerHTML = `<div class="play">▶</div><h3>CONFIGURA TU CANAL DE ${platform.toUpperCase()}</h3><p>Edita config.js.</p>`;
      return;
    }
    const iframe = document.createElement("iframe");
    iframe.className = "embed-player";
    iframe.allowFullscreen = true;
    iframe.allow = "autoplay; fullscreen; picture-in-picture";
    iframe.title = `${platform} de ヨギ`;
    if (twitch) {
      const parent = window.location.hostname || "localhost";
      iframe.src = `https://player.twitch.tv/?channel=${encodeURIComponent(username)}&parent=${encodeURIComponent(parent)}&muted=true`;
    } else {
      iframe.src = `https://player.kick.com/${encodeURIComponent(username)}?muted=true`;
    }
    player.replaceChildren(iframe);
  }
  tabs.forEach(tab => tab.addEventListener("click", () => showPlatform(tab.dataset.platform)));
  showPlatform("twitch");
  window.addEventListener("yogi-language-changed", () => showPlatform(document.querySelector(".stream-tab.active")?.dataset.platform || "twitch"));

  const grid = document.getElementById("video-grid");
  const fallbackVideos = Array.isArray(config.youtubeVideos) ? config.youtubeVideos.filter(Boolean) : [];

  function renderVideos(videos) {
    if (!Array.isArray(videos) || !videos.length) return;
    grid.innerHTML = "";
    videos.slice(0, 3).forEach((video, index) => {
      const id = typeof video === "string" ? video : video.id;
      if (!id) return;
      const title = typeof video === "string" ? `Vídeo destacado ${String(index + 1).padStart(2, "0")}` : (video.title || "Vídeo de YouTube");
      const card = document.createElement("article");
      card.className = "video-card";
      const frame = document.createElement("iframe");
      frame.className = "video-embed";
      frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`;
      frame.title = title;
      frame.loading = "lazy";
      frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      frame.allowFullscreen = true;
      const info = document.createElement("div");
      info.className = "video-info";
      const label = document.createElement("small");
      label.textContent = "YOUTUBE / VIDEO HUB";
      const heading = document.createElement("h3");
      heading.textContent = title;
      const date = document.createElement("p");
      date.textContent = typeof video === "string" || !video.published ? "" : new Date(video.published).toLocaleDateString(document.documentElement.lang || "es");
      info.append(label, heading, date);
      card.append(frame, info);
      grid.append(card);
    });
    grid.dataset.autoLoaded = "true";
  }

  if (config.youtubeChannel) document.getElementById("youtube-link").href = config.youtubeChannel;
  renderVideos(fallbackVideos);
  if (config.youtubeChannelId) {
    fetch(`youtube-videos.json?v=${Date.now()}`, { cache: "no-store" })
      .then(response => { if (!response.ok) throw new Error("No se pudo cargar la lista de YouTube"); return response.json(); })
      .then(data => renderVideos(data.videos || []))
      .catch(error => console.warn("Vídeos automáticos de YouTube:", error));
  }

  document.querySelectorAll("[data-social]").forEach(link => {
    const key = link.dataset.social;
    const value = key === "twitch" && valid(config.twitch) ? `https://twitch.tv/${config.twitch}`
      : key === "kick" && valid(config.kick) ? `https://kick.com/${config.kick}`
      : key === "youtube" ? config.youtubeChannel : config.socials?.[key];
    if (value) link.href = value;
    else { link.href = "#"; link.addEventListener("click", e => e.preventDefault()); }
  });
  // Catálogo público de ヨギ SHOP. El token de Printful permanece en Cloudflare.
  const shopGrid = document.getElementById("shop-grid");
  let shopProducts = Array.isArray(config.shopProducts) ? config.shopProducts : [];
  const shopLabels = {
    es:{ropa:"ROPA",tazas:"TAZAS",llaveros:"LLAVEROS",accesorios:"ACCESORIOS"},
    en:{ropa:"APPAREL",tazas:"MUGS",llaveros:"KEYCHAINS",accesorios:"ACCESSORIES"},
    ja:{ropa:"ウェア",tazas:"マグカップ",llaveros:"キーホルダー",accesorios:"アクセサリー"}
  };
  const shopText = {
    es:{merch:"Merchandising oficial de ヨギ.",buy:"COMPRA PRÓXIMAMENTE",empty:"LA TIENDA SE ESTÁ PREPARANDO",emptyText:"Pronto encontrarás aquí el merchandising oficial de ヨギ.",noCategory:"NO HAY PRODUCTOS EN ESTA CATEGORÍA",tryOther:"Prueba otra categoría.",product:"Producto ヨギ",mug:"Taza ヨギ"},
    en:{merch:"Official ヨギ merchandise.",buy:"COMING SOON",empty:"THE SHOP IS COMING SOON",emptyText:"Official ヨギ merchandise will be available here soon.",noCategory:"NO PRODUCTS IN THIS CATEGORY",tryOther:"Try another category.",product:"ヨギ Product",mug:"ヨギ Mug"},
    ja:{merch:"ヨギの公式グッズです。",buy:"近日発売",empty:"ショップ準備中",emptyText:"ヨギの公式グッズを近日公開します。",noCategory:"このカテゴリーに商品はありません",tryOther:"ほかのカテゴリーをお試しください。",product:"ヨギの商品",mug:"ヨギマグカップ"}
  };
  const currentShopText = () => shopText[window.YOGI_LANG] || shopText.es;
  const currentShopLabels = () => shopLabels[window.YOGI_LANG] || shopLabels.es;
  function translatedProductName(product) {
    const name = product.name || "";
    if (/ヨギカップ|yogi mug|taza yogi/i.test(name)) return currentShopText().mug;
    return name || currentShopText().product;
  }
  function translatedProductDescription(product) {
    const description = product.description || "";
    if (!description || /merchandising oficial de ヨギ\.?|official ヨギ merchandise\.?/i.test(description)) return currentShopText().merch;
    return description;
  }
  let activeShopFilter = "all";
  function renderShop(filter = activeShopFilter) {
    if (!shopGrid) return;
    activeShopFilter = filter;
    const products = shopProducts.filter(p => filter === "all" || p.category === filter);
    if (!products.length) {
      shopGrid.innerHTML = '<div class="shop-empty"><span>✦</span><h3>' +
        (shopProducts.length ? currentShopText().noCategory : currentShopText().empty) +
        '</h3><p>' + (shopProducts.length ? currentShopText().tryOther : currentShopText().emptyText) + "</p></div>";
      return;
    }
    shopGrid.replaceChildren();
    products.forEach(product => {
      const card = document.createElement("article");
      card.className = "shop-card";
      if (product.image) {
        const img = document.createElement("img");
        img.className = "shop-product-image";
        img.src = product.image;
        img.alt = translatedProductName(product);
        img.loading = "lazy";
        card.append(img);
      } else {
        const visual = document.createElement("div");
        visual.className = "shop-product-placeholder";
        visual.textContent = "ヨギ";
        card.append(visual);
      }
      const info = document.createElement("div");
      info.className = "shop-product-info";
      const category = document.createElement("small");
      category.className = "shop-product-category";
      category.textContent = currentShopLabels()[product.category] || "MERCH";
      const name = document.createElement("h3");
      name.textContent = translatedProductName(product);
      const desc = document.createElement("p");
      desc.textContent = translatedProductDescription(product);
      const bottom = document.createElement("div");
      bottom.className = "shop-product-bottom";
      const price = document.createElement("span");
      price.className = "shop-price";
      price.textContent = product.price != null
        ? new Intl.NumberFormat("ja-JP", { style: "currency", currency: product.currency || "JPY", maximumFractionDigits: 0 }).format(Number(product.price))
        : "";
      bottom.append(price);
      const status = document.createElement("span");
      status.className = "shop-buy";
      status.textContent = currentShopText().buy;
      bottom.append(status);
      info.append(category, name, desc, bottom);
      card.append(info);
      shopGrid.append(card);
    });
  }
  renderShop();
  document.querySelectorAll(".shop-filter").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll(".shop-filter").forEach(b => b.classList.toggle("active", b === button));
    renderShop(button.dataset.shopFilter);
  }));

  window.addEventListener("yogi-language-changed", () => renderShop(activeShopFilter));

  // Recupera los productos publicados desde el Worker seguro de Cloudflare.
  fetch("https://yogi-shop-api.vyogui.workers.dev/products")
    .then(response => {
      if (!response.ok) throw new Error("No se pudo consultar Printful");
      return response.json();
    })
    .then(data => {
      if (!data.success || !Array.isArray(data.products)) throw new Error("Respuesta de catálogo no válida");
      shopProducts = data.products;
      renderShop(activeShopFilter);
    })
    .catch(error => console.warn("Catálogo de ヨギ SHOP:", error));
  document.getElementById("year").textContent = new Date().getFullYear();
  const menuButton = document.querySelector(".menu-toggle"), nav = document.querySelector(".nav");
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open"); menuButton.setAttribute("aria-expanded", "false");
  }));
})();