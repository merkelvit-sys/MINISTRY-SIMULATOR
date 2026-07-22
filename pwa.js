"use strict";

/**
 * PWA Mobile Installation Prompt & Banner Handler (Android & iOS)
 */
class PWAInstaller {
  constructor() {
    this.deferredPrompt = null;
    this.init();
  }

  init() {
    // Don't show if already running in standalone app mode
    if (this.isStandalone()) return;

    // Don't show if user dismissed prompt recently
    if (localStorage.getItem("pwa_dismissed") === "true") return;

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.showAndroidBanner();
    });

    // Handle iOS Safari specific instruction prompt
    if (this.isIOS() && !this.isStandalone()) {
      setTimeout(() => this.showIOSBanner(), 1500);
    }
  }

  isStandalone() {
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true
    );
  }

  isIOS() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream;
  }

  showAndroidBanner() {
    if ($("#pwaInstallBanner")) return;
    const lang = window.i18n ? window.i18n.currentLang : "ru";

    const title = lang === "de" ? "📱 Dienst-Trainer als App installieren?" : "📱 Добавить «Тренажёр Служения» на экран?";
    const desc = lang === "de" ? "Schneller Zugriff & Offline-Nutzung ohne Browser-Leiste." : "Быстрый доступ и работа без интернета прямо с главного экрана.";
    const btnInstall = lang === "de" ? "Installieren" : "Установить";
    const btnClose = lang === "de" ? "Später" : "Позже";

    const banner = document.createElement("div");
    banner.id = "pwaInstallBanner";
    banner.className = "pwa-banner";
    banner.innerHTML = `
      <div class="pwa-content">
        <div style="font-weight:700; font-size:14px; margin-bottom:2px;">${title}</div>
        <div style="font-size:12px; opacity:0.9;">${desc}</div>
      </div>
      <div class="pwa-actions">
        <button id="pwaInstallBtn" class="btn" style="padding:6px 14px; font-size:12px; margin:0;">${btnInstall}</button>
        <button id="pwaCloseBtn" class="btn secondary" style="padding:6px 10px; font-size:12px; margin:0;">${btnClose}</button>
      </div>
    `;

    document.body.appendChild(banner);

    $("#pwaInstallBtn").addEventListener("click", () => {
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt();
        this.deferredPrompt.userChoice.then(() => {
          this.deferredPrompt = null;
          banner.remove();
        });
      }
    });

    $("#pwaCloseBtn").addEventListener("click", () => {
      localStorage.setItem("pwa_dismissed", "true");
      banner.remove();
    });
  }

  showIOSBanner() {
    if ($("#pwaInstallBanner")) return;
    const lang = window.i18n ? window.i18n.currentLang : "ru";

    const title = lang === "de" ? "📱 Zum Home-Bildschirm hinzufügen" : "📱 Добавить на главный экран iOS";
    const desc = lang === "de"
      ? "Tippe auf <b>Teilen</b> <span style='font-size:16px;'>⎋</span> unten im Safari-Menü und wähle <b>«Zum Home-Bildschirm»</b> ➕."
      : "Нажмите <b>«Поделиться»</b> <span style='font-size:16px;'>⎋</span> внизу экрана Safari и выберите <b>«На экран 'Домой'»</b> ➕.";
    const btnClose = lang === "de" ? "Verstanden" : "Понятно";

    const banner = document.createElement("div");
    banner.id = "pwaInstallBanner";
    banner.className = "pwa-banner ios";
    banner.innerHTML = `
      <div class="pwa-content">
        <div style="font-weight:700; font-size:14px; margin-bottom:4px;">${title}</div>
        <div style="font-size:12px; line-height:1.4;">${desc}</div>
      </div>
      <div class="pwa-actions">
        <button id="pwaCloseBtn" class="btn secondary" style="padding:6px 12px; font-size:12px; margin:0;">${btnClose}</button>
      </div>
    `;

    document.body.appendChild(banner);

    $("#pwaCloseBtn").addEventListener("click", () => {
      localStorage.setItem("pwa_dismissed", "true");
      banner.remove();
    });
  }
}

window.pwaInstaller = new PWAInstaller();
