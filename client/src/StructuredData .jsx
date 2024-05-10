import React from "react";

const StructuredData = () => {
  // Define your structured data object
  const structuredData = {
    "@context": "http://schema.org",
    "@type": "Organization",
    name: "Your Organization Name",
    url: "https://www.yourorganization.com",
    logo: "https://www.yourorganization.com/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-xxx-xxx-xxxx",
      contactType: "Customer service",
    },
    sameAs: [
      "https://www.facebook.com/yourorganization",
      "https://twitter.com/yourorganization",
      "https://www.linkedin.com/company/yourorganization",
      "https://www.instagram.com/yourorganization",
    ],
  };

  // Convert structured data object to JSON string
  const jsonString = JSON.stringify(structuredData);

  return <script type="application/ld+json">{jsonString}</script>;
};

export default StructuredData;
