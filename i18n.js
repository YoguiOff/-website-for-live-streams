(() => {
  const translations = {
    es: {
      nav: ["INICIO","DIRECTOS","VÍDEOS","COMUNIDAD","SHOP"], cta:"Watch Live",
      heroEyebrow:"GAMING · STREAMING · COMUNIDAD", heroTitle:"BIENVENIDO A<br><span>MI UNIVERSO</span>",
      heroText:"Directos, gameplays y momentos épicos. Sígueme en tus plataformas favoritas y forma parte de la comunidad ヨギ.",
      heroLive:"ENTRAR AL DIRECTO ↗", heroVideos:"VER VÍDEOS", strip:["PLAY","CONNECT","REPEAT","ヨギ GAMING"],
      sectionEyebrow:"NO TE PIERDAS LA ACCIÓN", liveTitle:"LIVE <span>ZONE</span>", choose:"Elige dónde quieres verme jugar.",
      player:"LIVE PLAYER", placeholderTitle:"EL PRÓXIMO DIRECTO TE ESPERA", placeholderText:"El reproductor de tu canal aparecerá aquí.",
      join:"JOIN THE SESSION", asideTitle:"¡NOS VEMOS<br><span>EN EL CHAT!</span>", asideText:"Entra al canal, activa las notificaciones y acompáñame en la próxima partida.",
      visit:"VISITAR CANAL ↗", channel:"CANAL", platform:"PLATAFORMA", videoEyebrow:"ÚLTIMOS GAMEPLAYS Y MOMENTOS",
      videoTitle:"VIDEO <span>HUB</span>", youtube:"IR A YOUTUBE ↗", soon:"PRÓXIMAMENTE", sampleTitle:"TUS VÍDEOS APARECERÁN AQUÍ", sampleText:"Añade los ID de tus vídeos en config.js.",
      gameplay:"GAMEPLAY", matches:"PARTIDAS Y AVENTURAS", allContent:"Todo el contenido en un solo lugar.", highlights:"HIGHLIGHTS", best:"LOS MEJORES MOMENTOS", relive:"Revive los momentos más épicos.",
      communityEyebrow:"THE GAME IS BETTER WHEN PLAYED WITH OTHERS", communityTitle:"¿JUGAMOS<br><span>もう１戦？</span>", communityText:"Sígueme en redes sociales y únete a la comunidad ヨギ.",
      back:"VOLVER ARRIBA ↑", menu:"Abrir menú", altBanner:"Banner ヨギ con estética gaming neón azul y rosa", altMascot:"Mascota ilustrada de ヨギ", altNani:"NANI, mascota de ヨギ",
      missing:"CONFIGURA TU CANAL DE", edit:"Edita config.js."
    },
    en: {
      nav:["HOME","LIVE","VIDEOS","COMMUNITY","SHOP"], cta:"Watch Live",
      heroEyebrow:"GAMING · STREAMING · COMMUNITY", heroTitle:"WELCOME TO<br><span>MY UNIVERSE</span>",
      heroText:"Live streams, gameplays, and epic moments. Follow me on your favorite platforms and become part of the ヨギ community.",
      heroLive:"JOIN THE LIVE ↗", heroVideos:"WATCH VIDEOS", strip:["PLAY","CONNECT","REPEAT","ヨギ GAMING"],
      sectionEyebrow:"DON'T MISS THE ACTION", liveTitle:"LIVE <span>ZONE</span>", choose:"Choose where you want to watch me play.",
      player:"LIVE PLAYER", placeholderTitle:"THE NEXT STREAM IS WAITING FOR YOU", placeholderText:"Your channel player will appear here.",
      join:"JOIN THE SESSION", asideTitle:"SEE YOU<br><span>IN THE CHAT!</span>", asideText:"Visit the channel, turn on notifications, and join me for the next game.",
      visit:"VISIT CHANNEL ↗", channel:"CHANNEL", platform:"PLATFORM", videoEyebrow:"LATEST GAMEPLAYS AND MOMENTS",
      videoTitle:"VIDEO <span>HUB</span>", youtube:"GO TO YOUTUBE ↗", soon:"COMING SOON", sampleTitle:"YOUR VIDEOS WILL APPEAR HERE", sampleText:"Add your video IDs in config.js.",
      gameplay:"GAMEPLAY", matches:"GAMES AND ADVENTURES", allContent:"All your content in one place.", highlights:"HIGHLIGHTS", best:"THE BEST MOMENTS", relive:"Relive the most epic moments.",
      communityEyebrow:"THE GAME IS BETTER WHEN PLAYED WITH OTHERS", communityTitle:"SHALL WE PLAY<br><span>ONE MORE?</span>", communityText:"Follow me on social media and join the ヨギ community.",
      back:"BACK TO TOP ↑", menu:"Open menu", altBanner:"ヨギ banner with blue and pink neon gaming aesthetic", altMascot:"ヨギ illustrated mascot", altNani:"NANI, ヨギ mascot",
      missing:"SET UP YOUR", edit:"Edit config.js."
    },
    ja: {
      nav:["ホーム","ライブ配信","動画","コミュニティ","ショップ"], cta:"ライブを見る",
      heroEyebrow:"ゲーム · 配信 · コミュニティ", heroTitle:"ヨギの<br><span>世界へようこそ</span>",
      heroText:"ライブ配信、ゲームプレイ、最高の瞬間。お気に入りのプラットフォームでフォローして、ヨギのコミュニティに参加しよう。",
      heroLive:"ライブを見る ↗", heroVideos:"動画を見る", strip:["PLAY","CONNECT","REPEAT","ヨギ GAMING"],
      sectionEyebrow:"最高の瞬間を見逃すな", liveTitle:"ライブ <span>ゾーン</span>", choose:"視聴するプラットフォームを選んでください。",
      player:"ライブプレイヤー", placeholderTitle:"次の配信で会いましょう", placeholderText:"ここにチャンネルのプレイヤーが表示されます。",
      join:"配信に参加", asideTitle:"チャットで<br><span>会いましょう！</span>", asideText:"チャンネルにアクセスして通知をオンにし、次のゲームに参加してください。",
      visit:"チャンネルを見る ↗", channel:"チャンネル", platform:"プラットフォーム", videoEyebrow:"最新のゲームプレイと名場面",
      videoTitle:"動画 <span>ハブ</span>", youtube:"YouTubeを見る ↗", soon:"近日公開", sampleTitle:"ここに動画が表示されます", sampleText:"config.js に動画 ID を追加してください。",
      gameplay:"ゲームプレイ", matches:"ゲームと冒険", allContent:"すべてのコンテンツをここに。", highlights:"ハイライト", best:"最高の瞬間", relive:"最高に熱い瞬間をもう一度。",
      communityEyebrow:"みんなで遊べば、もっと楽しい", communityTitle:"もう<br><span>１戦いこう？</span>", communityText:"SNSをフォローして、ヨギのコミュニティに参加しよう。",
      back:"トップへ戻る ↑", menu:"メニューを開く", altBanner:"青とピンクのネオンを使ったヨギのゲームバナー", altMascot:"ヨギのイラストマスコット", altNani:"ヨギのマスコット、ナニ",
      missing:"チャンネルを設定：", edit:"config.js を編集してください。"
    }
  };
  const $ = s => document.querySelector(s);
  function apply(lang) {
    const t = translations[lang] || translations.es;
    document.documentElement.lang = lang;
    const nav = document.querySelectorAll(".nav a");
    nav.forEach((el,i) => el.textContent = t.nav[i]);
    $(".header-cta").innerHTML = t.cta + " <b>↗</b>";
    $(".hero-copy .eyebrow").innerHTML = '<span class="live-dot"></span> ' + t.heroEyebrow;
    $(".hero-copy h1").innerHTML = t.heroTitle;
    $(".hero-copy>p:not(.eyebrow)").textContent = t.heroText;
    const actions = $(".hero-copy .actions").children;
    actions[0].textContent=t.heroLive; actions[1].textContent=t.heroVideos;
    $(".hero-strip").innerHTML=t.strip.map((x,i)=>i?'<i>✦</i><span>'+x+'</span>':'<span>'+x+'</span>').join("");
    $(".section-heading .eyebrow").textContent=t.sectionEyebrow;
    $("#directos .section-heading h2").innerHTML=t.liveTitle;
    $("#directos .section-heading>p").textContent=t.choose;
    $(".player-top span:first-child").innerHTML='<i class="live-dot"></i> '+t.player;
    $(".stream-aside .eyebrow").textContent=t.join;
    $(".stream-aside h3").innerHTML=t.asideTitle;
    $(".stream-aside>p:not(.eyebrow)").textContent=t.asideText;
    $("#channel-link").textContent=t.visit;
    $(".channel-status span:first-child").textContent=t.channel;
    $(".channel-status span:nth-of-type(2)").textContent=t.platform;
    $("#videos .section-heading .eyebrow").textContent=t.videoEyebrow;
    $("#videos .section-heading h2").innerHTML=t.videoTitle;
    $("#youtube-link").textContent=t.youtube;
    const cards=document.querySelectorAll("#video-grid .video-card");
    if(!document.querySelector("#video-grid")?.dataset.autoLoaded) {
      if(!window.YOGI_CONFIG?.youtubeVideos?.length) {
        const info=cards[0]?.querySelector(".video-info");
        if(info){info.querySelector("small").textContent=t.soon;info.querySelector("h3").textContent=t.sampleTitle;info.querySelector("p").textContent=t.sampleText;}
        const second=cards[1]?.querySelector(".video-info");if(second){second.querySelector("small").textContent=t.gameplay;second.querySelector("h3").textContent=t.matches;second.querySelector("p").textContent=t.allContent;}
        const third=cards[2]?.querySelector(".video-info");if(third){third.querySelector("small").textContent=t.highlights;third.querySelector("h3").textContent=t.best;third.querySelector("p").textContent=t.relive;}
      } else cards.forEach((card,i)=>{const h=card.querySelector("h3");if(h)h.textContent=(lang==="ja"?"おすすめ動画 ":"FEATURED VIDEO ")+String(i+1).padStart(2,"0");});
    }
    const shopHeading=document.querySelector("#shop .section-heading .eyebrow"); if(shopHeading) shopHeading.textContent=lang==="ja"?"ヨギ公式グッズ":lang==="en"?"OFFICIAL MERCHANDISE":"MERCHANDISING OFICIAL";
    const shopTitle=document.querySelector("#shop .section-heading h2"); if(shopTitle) shopTitle.innerHTML="ヨギ <span>SHOP</span>";
    const shopDescription=document.querySelector("#shop .section-heading>p"); if(shopDescription) shopDescription.textContent=lang==="ja"?"コミュニティ限定アイテム。":lang==="en"?"Exclusive items for the community.":"Artículos exclusivos para la comunidad.";
    const shopIntro=document.querySelector(".shop-intro h3"); if(shopIntro) shopIntro.textContent=lang==="ja"?"ヨギの世界をいつもそばに":"TAKE THE ヨギ UNIVERSE WITH YOU";
    const shopIntroText=document.querySelector(".shop-intro p"); if(shopIntroText) shopIntroText.textContent=lang==="ja"?"コミュニティデザインのマグカップ、キーホルダー、ウェア、アクセサリー。":lang==="en"?"Mugs, keychains, apparel and accessories featuring community designs.":"Tazas, llaveros, ropa y accesorios con diseños de la comunidad."; 
    const filterLabels=lang==="ja"?["すべて","ウェア","マグカップ","キーホルダー","アクセサリー"]:lang==="en"?["ALL","APPAREL","MUGS","KEYCHAINS","ACCESSORIES"]:["TODOS","ROPA","TAZAS","LLAVEROS","ACCESORIOS"];
    document.querySelectorAll(".shop-filter").forEach((b,i)=>{if(filterLabels[i])b.textContent=filterLabels[i];});
    const shopNote=document.querySelector(".shop-note"); if(shopNote) shopNote.textContent=lang==="ja"?"BOOTHでショップを見る ↗":lang==="en"?"VISIT THE BOOTH SHOP ↗":"VISITAR TIENDA EN BOOTH ↗";
    $(".community-copy .eyebrow").textContent=t.communityEyebrow;
    $(".community h2").innerHTML=t.communityTitle;
    $(".community-copy>p:not(.eyebrow)").textContent=t.communityText;
    $(".site-footer>a:last-child").textContent=t.back;
    $(".menu-toggle").setAttribute("aria-label",t.menu);
    $(".hero-banner img").alt=t.altBanner;$(".mascot-card img").alt=t.altMascot;$(".community-avatar").alt=t.altNani;
    document.title="ヨギ | "+(lang==="ja"?"ゲーム・配信":lang==="en"?"Gaming & Streaming":"Gaming y Streaming");
    localStorage.setItem("yogi-language",lang);
    window.YOGI_LANG=lang;
    window.dispatchEvent(new CustomEvent("yogi-language-changed"));
  }
  const select=$("#language-select");
  const saved=localStorage.getItem("yogi-language");
  const initial=translations[saved]?saved:"es";
  select.value=initial;select.addEventListener("change",()=>apply(select.value));apply(initial);
})();