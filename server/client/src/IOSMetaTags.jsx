import React from "react";

const IOSMetaTags = () => {
  return (
    <React.Fragment>
      {/* Viewport settings */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Apple-specific meta tags */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />

      {/* Apple touch icon */}
      <link rel="apple-touch-icon" href="/path/to/apple-touch-icon.png" />

      {/* iOS splash screen images */}
      <link rel="apple-touch-startup-image" href="/path/to/splash-screen.png" />

      {/* Add more iOS meta tags as needed */}
    </React.Fragment>
  );
};

export default IOSMetaTags;
