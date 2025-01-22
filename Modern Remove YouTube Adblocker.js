// ==UserScript==
// @name         Modern Remove Adblock Enhancer @mrtsntrk
// @namespace    http://tampermonkey.net/
// @version      6.3
// @description  Modern remove adblocker for YouTube with popup and ad removal.
// @author       Updated by mrtsntrk
// @match        https://www.youtube.com/@mrtsntrk
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @updateURL    https://github.com/mrtsntrk/Modern-Remove-Adblock-Enhancer/raw/main/ModernAdblockEnhancer.user.js
// @downloadURL  https://github.com/mrtsntrk/Modern-Remove-Adblock-Enhancer/raw/main/ModernAdblockEnhancer.user.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Configurations
    const config = {
        enableAdblocker: true,
        removePopups: true,
        enableDebug: true,
        autoCheckUpdates: true,
        fixTimestamps: true,
    };

    // Logs messages if debugging is enabled
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

    // Remove ads from the page and video player
    function removeAds() {
        log('Ad removal started.');

        setInterval(() => {
            // Remove video ads
            const videoAd = document.querySelector('.ad-showing video, .ytp-ad-player-overlay');
            if (videoAd) {
                videoAd.pause();
                videoAd.remove();
                log('Removed video ad.');
                const skipButton = document.querySelector('.ytp-ad-skip-button');
                if (skipButton) skipButton.click();
            }

            // Remove overlay ads
            const overlayAd = document.querySelector('.ytp-ad-overlay-container');
            if (overlayAd) {
                overlayAd.remove();
                log('Removed overlay ad.');
            }

            // Remove other YouTube ads
            const adElements = document.querySelectorAll('#masthead-ad, .ytd-display-ad-renderer, .ytp-ad-module');
            adElements.forEach(ad => {
                ad.remove();
                log('Removed ad element.');
				
				
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

    // Remove intrusive popups
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

    // Fix timestamp links in comments
    function fixTimestamps() {
        document.addEventListener('click', event => {
            const target = event.target;
            if (target.tagName === 'A' && target.href.includes('&t=')) {
                event.preventDefault();
                const timestamp = target.href.match(/&t=(\d+)/)?.[1];
                if (timestamp) {
                    const video = document.querySelector('video');
                    if (video) {
                        video.currentTime = parseInt(timestamp, 10);
                        video.play();
                        log(`Jumped to timestamp: ${timestamp} seconds.`);
                    }
                }
            }
        });
    }

    // Check for updates
    function checkForUpdates() {
        const scriptUrl = 'https://github.com/mrtsntrk/Modern-Remove-Adblock-Enhancer/raw/main/ModernAdblockEnhancer.user.js';

        fetch(scriptUrl)
            .then(response => response.text())
            .then(data => {
                const match = data.match(/@version\s+(\d+\.\d+)/);
                if (match) {
                    const remoteVersion = parseFloat(match[1]);
                    const currentVersion = parseFloat(GM_info.script.version);

                    if (remoteVersion > currentVersion) {
                        log(`Update available: v${remoteVersion}. Please update your script.`);
                    } else {
                        log('You are using the latest version.');
                    }
                }
            })
            .catch(error => log(`Error checking for updates: ${error}`, 'error'));
    }

    // Initialize the script
    function init() {
        log('Script initialized.');

        if (config.enableAdblocker) removeAds();
        if (config.removePopups) removePopups();
        if (config.fixTimestamps) fixTimestamps();
        if (config.autoCheckUpdates) checkForUpdates();
    }

    // Run the script
    init();
})();
