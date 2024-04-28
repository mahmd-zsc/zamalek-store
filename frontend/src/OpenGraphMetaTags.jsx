import React from "react";

const OpenGraphMetaTags = () => {
  // Define OpenGraph meta tag values
  const ogTitle = "Your OpenGraph Title";
  const ogDescription = "Your OpenGraph Description";
  const ogImage = "https://example.com/image.jpg";
  const ogUrl = "https://example.com/page";
  const ogType = "website"; // Specify the OpenGraph type

  return (
    <React.Fragment>
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content={ogType} /> {/* Include og:type */}
      {/* Add more OpenGraph meta tags as needed */}
    </React.Fragment>
  );
};

export default OpenGraphMetaTags;
