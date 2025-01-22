// ==UserScript==
// @name         Modern Remove Adblock Enhancer @mrtsntrk
// @namespace    http://tampermonkey.net/
// @version      6.2
// @description  Modern remove adblocker for YouTube with popup and ad removal.
// @author       Updated by mrtsntrk
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @updateURL    https://github.com/mrtsntrk/Modern-Remove-Adblock-Enhancer/raw/main/ModernAdblockEnhancer.user.js
// @downloadURL  https://github.com/mrtsntrk/Modern-Remove-Adblock-Enhancer/raw/main/ModernAdblockEnhancer.user.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const config = {
        enableAdblocker: true,
        removePopups: true,
        enableDebug: true,
        autoCheckUpdates: true,
        fixTimestamps: true,
    };

    function log(message, type = 'info') {
        if (!config.enableDebug) return;
        const prefix = '[Modern Adblock Enhancer]';
        switch (type) {
            case 'error':
                console.error(`${prefix} ❌ ${message}`);
                break;
            case 'warning':
                console.warn(`${prefix} ⚠️ ${message}`);
                break;
            default:
                console.log(`${prefix} ✅ ${message}`);
        }
    }

    function removeAds() {
        log('Ad removal started.');

        setInterval(() => {
            const videoAd = document.querySelector('.ad-showing video, .ytp-ad-player-overlay');
            if (videoAd) {
                videoAd.pause();
                videoAd.remove();
                log('Removed video ad.');
                const skipButton = document.querySelector('.ytp-ad-skip-button');
                if (skipButton) skipButton.click();
            }

            const overlayAd = document.querySelector('.ytp-ad-overlay-container');
            if (overlayAd) {
                overlayAd.remove();
                log('Removed overlay ad.');
            }

            const adElements = document.querySelectorAll('#masthead-ad, .ytd-display-ad-renderer, .ytp-ad-module');
            adElements.forEach(ad => {
                ad.remove();
                log('Removed ad element.');
            });

            // Sağ üst bildirim ve profil simgelerini koruma
            const excludedElements = ['#avatar-btn', '#notification-button'];
            excludedElements.forEach(selector => {
                const element = document.querySelector(selector);
                if (element) {
                    element.style.display = ''; // Görünürlüğü koru
                }
            });
        }, 1000);
    }

    function removePopups() {
        log('Popup remover activated.');

        setInterval(() => {
            const popups = document.querySelectorAll("tp-yt-iron-overlay-backdrop, .style-scope.ytd-enforcement-message-view-model");
            popups.forEach(popup => {
                popup.remove();
                log('Removed a popup.');
            });

            const dismissButton = document.querySelector('#dismiss-button');
            if (dismissButton) {
                dismissButton.click();
                log('Dismissed a popup.');
            }

            const video = document.querySelector('video');
            if (video && video.paused) {
                video.play();
                log('Resumed video playback.');
            }
        }, 1000);
    }

    function init() {
        log('Script initialized.');
        if (config.enableAdblocker) removeAds();
        if (config.removePopups) removePopups();
        if (config.fixTimestamps) fixTimestamps();
        if (config.autoCheckUpdates) checkForUpdates();
    }

    init();
})();
