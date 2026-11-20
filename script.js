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
  const videos = Array.isArray(config.youtubeVideos) ? config.youtubeVideos.filter(Boolean) : [];
  if (videos.length) {
    grid.innerHTML = "";
    videos.forEach((id, index) => {
      const card = document.createElement("article");
      card.className = "video-card";
      const frame = document.createElement("iframe");
      frame.className = "video-embed";
      frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`;
      frame.title = `Vídeo de YouTube ${index + 1}`;
      frame.loading = "lazy";
      frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      frame.allowFullscreen = true;
      const info = document.createElement("div");
      info.className = "video-info";
      info.innerHTML = `<small>YOUTUBE / VIDEO HUB</small><h3>VÍDEO DESTACADO ${String(index + 1).padStart(2, "0")}</h3>`;
      card.append(frame, info); grid.append(card);
    });
  }
  if (config.youtubeChannel) document.getElementById("youtube-link").href = config.youtubeChannel;
  document.querySelectorAll("[data-social]").forEach(link => {
    const key = link.dataset.social;
    const value = key === "twitch" && valid(config.twitch) ? `https://twitch.tv/${config.twitch}`
      : key === "kick" && valid(config.kick) ? `https://kick.com/${config.kick}`
      : key === "youtube" ? config.youtubeChannel : config.socials?.[key];
    if (value) link.href = value;
    else { link.href = "#"; link.addEventListener("click", e => e.preventDefault()); }
  });
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