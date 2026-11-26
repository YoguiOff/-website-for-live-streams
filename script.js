(() => {
  const paymentParams = new URLSearchParams(window.location.search);
  const paymentStatus = paymentParams.get("payment");
  const checkoutSessionId = paymentParams.get("session_id");

  async function handlePaymentReturn() {
    if (paymentStatus !== "success" && paymentStatus !== "cancelled") return;

    const notice = document.createElement("section");
    notice.className = "payment-return-notice";
    notice.setAttribute("role", "status");
    notice.setAttribute("aria-live", "polite");
    notice.style.cssText = "max-width:1100px;margin:24px auto;padding:20px 24px;border:1px solid rgba(0,234,255,.35);border-radius:14px;background:rgba(10,16,32,.96);color:#fff;box-shadow:0 8px 30px rgba(0,0,0,.22);";

    const heading = document.createElement("h2");
    heading.style.cssText = "margin:0 0 8px;font-size:1.25rem;";
    const message = document.createElement("p");
    message.style.cssText = "margin:0;line-height:1.6;";
    notice.append(heading, message);

    const main = document.querySelector("main");
    if (main) main.prepend(notice);
    else document.body.prepend(notice);

    const lang = () => window.YOGI_LANG || document.documentElement.lang || "es";
    const copy = {
      es: {
        cancelledTitle: "Compra cancelada",
        cancelledText: "No se ha realizado ningún cobro. Puedes volver a la tienda cuando quieras.",
        checkingTitle: "Verificando tu pago…",
        checkingText: "Estamos comprobando la confirmación directamente con Stripe.",
        successTitle: "¡Gracias por tu compra!",
        pendingTitle: "Pago pendiente de confirmación",
        pendingText: "Stripe todavía no confirma el pago. Si acabas de pagar, espera un momento y revisa el correo de confirmación.",
        errorTitle: "No pudimos verificar el pago",
        errorText: "No vuelvas a realizar el pago todavía. Comprueba el correo de Stripe o contacta con nosotros para revisar el pedido."
      },
      en: {
        cancelledTitle: "Checkout cancelled",
        cancelledText: "You have not been charged. You can return to the shop whenever you like.",
        checkingTitle: "Verifying your payment…",
        checkingText: "We are checking the payment directly with Stripe.",
        successTitle: "Thank you for your purchase!",
        pendingTitle: "Payment confirmation pending",
        pendingText: "Stripe has not confirmed the payment yet. If you just paid, please wait a moment and check your confirmation email.",
        errorTitle: "We couldn't verify the payment",
        errorText: "Please don't try to pay again yet. Check your Stripe email receipt or contact us so we can review the order."
      },
      ja: {
        cancelledTitle: "購入はキャンセルされました",
        cancelledText: "料金は請求されていません。いつでもショップに戻れます。",
        checkingTitle: "お支払いを確認しています…",
        checkingText: "Stripeに直接問い合わせてお支払い状況を確認しています。",
        successTitle: "ご購入ありがとうございます！",
        pendingTitle: "お支払いの確認待ちです",
        pendingText: "Stripeでまだお支払いが確認できていません。お支払い直後の場合は、少し待って確認メールをご確認ください。",
        errorTitle: "お支払いを確認できませんでした",
        errorText: "まだ再度お支払いをしないでください。Stripeのメール、またはお問い合わせから注文状況をご確認ください。"
      }
    };
    const getCopy = () => copy[lang()] || copy.es;

    if (paymentStatus === "cancelled") {
      heading.textContent = getCopy().cancelledTitle;
      message.textContent = getCopy().cancelledText;
      notice.style.borderColor = "rgba(255,255,255,.2)";
      window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
      return;
    }

    heading.textContent = getCopy().checkingTitle;
    message.textContent = getCopy().checkingText;

    if (!checkoutSessionId) {
      heading.textContent = getCopy().errorTitle;
      message.textContent = getCopy().errorText;
      window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
      return;
    }

    try {
      const verifyResponse = await fetch(
        "https://yogi-shop-api.vyogui.workers.dev/verify-checkout-session?session_id=" + encodeURIComponent(checkoutSessionId),
        { method: "GET", cache: "no-store" }
      );
      const result = await verifyResponse.json();

      if (!verifyResponse.ok || !result.success) {
        throw new Error(result.detail || result.error || "Payment verification failed");
      }

      if (result.verified) {
        heading.textContent = getCopy().successTitle;
        const amount = Number(result.amount);
        const currency = String(result.currency || "JPY").toUpperCase();
        const formattedAmount = Number.isFinite(amount)
          ? new Intl.NumberFormat(lang() === "ja" ? "ja-JP" : lang() === "en" ? "en-US" : "es-ES", {
              style: "currency",
              currency,
              maximumFractionDigits: 0
            }).format(amount)
          : "";
        const productText = result.product ? String(result.product) : "";
        message.textContent = [productText, formattedAmount].filter(Boolean).join(" — ");
        notice.style.borderColor = "rgba(46,204,113,.55)";
      } else {
        heading.textContent = getCopy().pendingTitle;
        message.textContent = getCopy().pendingText;
        notice.style.borderColor = "rgba(255,190,70,.55)";
      }
    } catch (error) {
      console.error("Error verificando el pago:", error);
      heading.textContent = getCopy().errorTitle;
      message.textContent = getCopy().errorText;
      notice.style.borderColor = "rgba(255,120,120,.55)";
    }

    window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
  }

  void handlePaymentReturn();

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
  // Catálogo y enlaces de compra de ヨギ SHOP mediante BOOTH.
  const shopGrid = document.getElementById("shop-grid");
  let shopProducts = Array.isArray(config.shopProducts) ? config.shopProducts : [];
  const shopLabels = {
    es:{ropa:"ROPA",tazas:"TAZAS",llaveros:"LLAVEROS",accesorios:"ACCESORIOS"},
    en:{ropa:"APPAREL",tazas:"MUGS",llaveros:"KEYCHAINS",accesorios:"ACCESSORIES"},
    ja:{ropa:"ウェア",tazas:"マグカップ",llaveros:"キーホルダー",accesorios:"アクセサリー"}
  };
  const shopText = {
    es:{merch:"Merchandising oficial de ヨギ.",buy:"COMPRAR",shippingIncluded:"Envío incluido en el precio",japanOnly:"🇯🇵 Solo Japón",empty:"LA TIENDA SE ESTÁ PREPARANDO",emptyText:"Pronto encontrarás aquí el merchandising oficial de ヨギ.",noCategory:"NO HAY PRODUCTOS EN ESTA CATEGORÍA",tryOther:"Prueba otra categoría.",product:"Producto ヨギ",mug:"Taza ヨギ"},
    en:{merch:"Official ヨギ merchandise.",buy:"BUY NOW",shippingIncluded:"Shipping included in the price",japanOnly:"🇯🇵 Japan only",empty:"THE SHOP IS COMING SOON",emptyText:"Official ヨギ merchandise will be available here soon.",noCategory:"NO PRODUCTS IN THIS CATEGORY",tryOther:"Try another category.",product:"ヨギ Product",mug:"ヨギ Mug"},
    ja:{merch:"ヨギの公式グッズです。",buy:"購入する",shippingIncluded:"送料込み",japanOnly:"🇯🇵 日本のみ",empty:"ショップ準備中",emptyText:"ヨギの公式グッズを近日公開します。",noCategory:"このカテゴリーに商品はありません",tryOther:"ほかのカテゴリーをお試しください。",product:"ヨギの商品",mug:"ヨギマグカップ"}
  };
  const currentShopText = () => shopText[window.YOGI_LANG] || shopText.es;
  const currentShopLabels = () => shopLabels[window.YOGI_LANG] || shopLabels.es;
  function translatedProductName(product) {
    const name = product.name || "";
    if (/ヨギ\s*カップ|yogi mug|taza yogi/i.test(name)) return currentShopText().mug;
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
      const variants = Array.isArray(product.variants)
        ? product.variants.filter(variant => variant && variant.id != null)
        : [];
      let selectedVariant = variants[0] || null;

      const variantSelect = document.createElement("select");
      variantSelect.className = "shop-variant-select";
      variantSelect.setAttribute("aria-label",
        window.YOGI_LANG === "en" ? "Choose an option" :
        window.YOGI_LANG === "ja" ? "オプションを選択" : "Elige una opción"
      );

      if (variants.length > 1) {
        variants.forEach((variant, index) => {
          const option = document.createElement("option");
          option.value = String(variant.id);
          option.textContent = variant.name || (window.YOGI_LANG === "en" ? `Option ${index + 1}` : window.YOGI_LANG === "ja" ? `オプション ${index + 1}` : `Opción ${index + 1}`);
          variantSelect.append(option);
        });
        info.append(variantSelect);
      }

      const bottom = document.createElement("div");
      bottom.className = "shop-product-bottom";
      const priceBlock = document.createElement("div");
      priceBlock.className = "shop-price-block";
      const price = document.createElement("span");
      price.className = "shop-price";
      const shippingNote = document.createElement("small");
      shippingNote.className = "shop-shipping-note";
      shippingNote.textContent = currentShopText().shippingIncluded;
      shippingNote.setAttribute("aria-label", currentShopText().shippingIncluded);
      priceBlock.append(price, shippingNote);

      if (/メリクリエディション/i.test(String(product.name || ""))) {
        const japanOnlyNote = document.createElement("small");
        japanOnlyNote.className = "shop-shipping-note";
        japanOnlyNote.textContent = currentShopText().japanOnly;
        japanOnlyNote.setAttribute("aria-label", currentShopText().japanOnly);
        priceBlock.append(japanOnlyNote);
      }

      const formatPrice = (amount, currency) => amount != null
        ? new Intl.NumberFormat(window.YOGI_LANG === "ja" ? "ja-JP" : window.YOGI_LANG === "en" ? "en-US" : "es-ES", {
            style: "currency",
            currency: currency || product.currency || "JPY",
            maximumFractionDigits: 0
          }).format(Number(amount))
        : "";

      const updateDisplayedPrice = () => {
        const amount = selectedVariant ? selectedVariant.price : product.price;
        const currency = selectedVariant ? selectedVariant.currency : product.currency;
        price.textContent = formatPrice(amount, currency);
      };
      updateDisplayedPrice();

      if (variants.length > 1) {
        variantSelect.addEventListener("change", () => {
          selectedVariant = variants.find(variant => String(variant.id) === variantSelect.value) || variants[0];
          updateDisplayedPrice();
        });
      }

      bottom.append(priceBlock);
      const buyButton = document.createElement("button");
      buyButton.type = "button";
      buyButton.className = "shop-buy";
      buyButton.textContent = currentShopText().buy;
      if (!variants.length) {
        buyButton.disabled = true;
        buyButton.textContent = window.YOGI_LANG === "en" ? "UPDATING..." : window.YOGI_LANG === "ja" ? "更新中..." : "ACTUALIZANDO...";
        buyButton.title = window.YOGI_LANG === "en"
          ? "Purchases will be enabled after the shop update."
          : window.YOGI_LANG === "ja" ? "ショップの更新後に購入できます。"
          : "Las compras estarán disponibles cuando termine la actualización de la tienda.";
      }
      buyButton.addEventListener("click", async () => {
        if (buyButton.disabled) return;
        buyButton.disabled = true;
        const originalText = buyButton.textContent;
        buyButton.textContent = window.YOGI_LANG === "en" ? "LOADING..." : window.YOGI_LANG === "ja" ? "読み込み中..." : "CARGANDO...";
        try {
          const requestBody = { productId: product.id };
          if (selectedVariant) requestBody.variantId = selectedVariant.id;

          const checkoutResponse = await fetch("https://yogi-shop-api.vyogui.workers.dev/create-checkout-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
          });
          const checkout = await checkoutResponse.json();
          if (!checkoutResponse.ok || !checkout.success || !checkout.url) {
            throw new Error(checkout.detail || checkout.error || "No se pudo iniciar el pago");
          }
          window.location.assign(checkout.url);
        } catch (error) {
          console.error("Error al iniciar Stripe Checkout:", error);
          alert(error.message || "No se pudo iniciar el pago. Inténtalo de nuevo más tarde.");
          buyButton.disabled = false;
          buyButton.textContent = originalText;
        }
      });
      bottom.append(buyButton);
      info.append(category, name, desc, bottom);
      card.append(info);
      shopGrid.append(card);
    });
  }
  renderShop();

  // Cargar automáticamente el catálogo publicado en Printful a través del Worker.
  const shopApiUrl = "https://yogi-shop-api.vyogui.workers.dev/products";
  fetch(shopApiUrl, { cache: "no-store" })
    .then(response => {
      if (!response.ok) throw new Error("No se pudo cargar el catálogo de Printful");
      return response.json();
    })
    .then(data => {
      if (!data.success || !Array.isArray(data.products)) throw new Error("Respuesta de catálogo no válida");
      shopProducts = data.products;
      renderShop(activeShopFilter);
    })
    .catch(error => console.warn("Catálogo de ヨギ SHOP:", error));

  document.querySelectorAll(".shop-filter").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll(".shop-filter").forEach(b => b.classList.toggle("active", b === button));
    renderShop(button.dataset.shopFilter);
  }));

  window.addEventListener("yogi-language-changed", () => renderShop(activeShopFilter));

  // BOOTH gestiona el catálogo, los pagos y los pedidos fuera de esta web.
  const boothLink = document.getElementById("booth-shop-link");
  if (boothLink && config.boothShopUrl) {
    boothLink.href = config.boothShopUrl;
    boothLink.hidden = false;
  }
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