# Modern Remove Adblock Enhancer

Modern Adblock Enhancer is a powerful and efficient Tampermonkey script designed to enhance your YouTube experience by removing ads, intrusive popups, and improving usability.

## Features

- **Adblocker**: Removes video ads, overlay ads, and banner ads from YouTube.
- **Popup Remover**: Gets rid of annoying popups and overlays.
- **Timestamp Fixer**: Ensures smooth navigation to video timestamps from comments and links.
- **Auto Update Check**: Automatically checks for new script updates.
- **Customizable Configurations**: Easily toggle features such as debugging, ad blocking, and more.

## Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) extension for your browser.
2. Click [here to install the script](https://github.com/mrtsntrk/Modern-Remove-Adblock-Enhancer/raw/main/ModernAdblockEnhancer.user.js) directly.
3. Enjoy an ad-free and seamless YouTube experience!

## Configuration

You can modify the script's configuration at the beginning of the code:

```javascript
const config = {
    enableAdblocker: true,    // Enable or disable the ad blocker
    removePopups: true,       // Remove intrusive popups
    enableDebug: true,        // Enable debug logging
    autoCheckUpdates: true,   // Automatically check for script updates
    fixTimestamps: true,      // Fix timestamp links in comments
};
```

## How It Works
- **Ad Removal:** Continuously scans for ads and removes them as soon as they appear.
- **Popup Removal:** Detects and removes intrusive popups, ensuring uninterrupted playback.
- **Timestamp Fix:** Allows direct navigation to video timestamps from comment links.
- **Update Check:** Compares the current script version with the latest one on GitHub.

## Contribution
Contributions are welcome! If you have any ideas, issues, or improvements, feel free to:

Fork the repository.
Make your changes.
Submit a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

Maintainer: Kasım Mert ŞENTÜRK
