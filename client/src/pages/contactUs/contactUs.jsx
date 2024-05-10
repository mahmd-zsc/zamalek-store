import React from "react";

const ContactUs = () => {
  return (
    <div className="container h-screen pt-40 lg:px-80">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
      <div className="flex flex-col gap-4 text-sm lg:text-center ">
        <p>
          Thank you for your interest in Zamalek Club Store. If you have any
          questions, inquiries, or feedback, please don't hesitate to reach out
          to us. We are committed to providing exceptional customer service and
          are here to assist you in any way we can.
        </p>
        <p>
          You can contact us via email at{" "}
          <a href="mailto:info@zamalekclubstore.com" className="font-bold">
            info@zamalekclubstore.com
          </a>{" "}
          or by phone at{" "}
          <a href="tel:+1234567890" className="font-bold">
            +1234567890
          </a>
          . Our dedicated customer support team is available during business
          hours to address your queries and concerns promptly.
        </p>
        <p>
          Our office hours are Monday to Friday, from 9:00 AM to 5:00 PM. We
          understand that your time is valuable, and we strive to respond to all
          inquiries within 24 hours during business days. If you have an urgent
          matter, please don't hesitate to call us for immediate assistance.
        </p>
        <p>
          For partnership opportunities or wholesale inquiries, please reach out
          to our partnerships team at{" "}
          <a
            href="mailto:partnerships@zamalekclubstore.com"
            className="font-bold"
          >
            partnerships@zamalekclubstore.com
          </a>
          . We welcome collaboration proposals and are open to exploring
          mutually beneficial partnerships with like-minded businesses.
        </p>
        <p>
          Your feedback is invaluable to us as we continuously strive to improve
          our products and services. Feel free to share your thoughts, comments,
          and suggestions with us. We genuinely appreciate your input and take
          every comment into consideration as we work towards enhancing your
          shopping experience.
        </p>
        <p>
          Thank you once again for choosing Zamalek Club Store. We look forward
          to serving you and exceeding your expectations.
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
