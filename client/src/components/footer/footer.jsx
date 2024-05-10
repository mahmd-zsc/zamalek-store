import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
// import zsc from "../../images/zamalek-sports-club-seeklogo.png";
import zsc from "../../images/HD-wallpaper-zamalek-sc-logo-zamalek-removebg-preview (1).png";
import backgroundImage from "../../images/black-plain-concrete-textured.jpg";

import AOS from "aos";
import "aos/dist/aos.css";
import { Link, useNavigate } from "react-router-dom";
import { ScrollToTop } from "../../utils/ScrollToTop ";
import "./footer.css";
function Footer() {
  let navigate = useNavigate();
  useEffect(() => {
    AOS.init();
  }, []);

  const isSmallScreen = useMediaQuery({ query: "(max-width: 640px)" });

  return (
    <footer className=" relative bg-black text-white" data-aos="fade-up">
      <div className=" container py-10 flex flex-col gap-10 relative z-40" >
        <div className=" grid md:grid-cols-3 gap-10">
          <div className=" flex justify-center items-center     ">
            <img className=" w-28" src={zsc} alt="" />
          </div>
          <div className="text-center sm:text-start">
            <p>
              <span className=" font-bold block pb-2">ABOUT</span>
              Zamalek, a powerhouse in sports, embodies excellence and passion,
              with a rich legacy steeped in Egyptian athletic history. Their
              remarkable achievements and unwavering dedication have earned them
              a revered status in the world of sports
            </p>
          </div>
          <div className="lg:items-end flex flex-col gap-1 text-center sm:text-start">
            <div className=" ">
              <p
                className=" "
                onClick={() => {
                  navigate("aboutUs");
                  ScrollToTop();
                }}
              >
                About us
              </p>
              <p
                className=""
                onClick={() => {
                  navigate("contactUs");
                  ScrollToTop();
                }}
              >
                Contact us
              </p>
              <p
                className=""
                onClick={() => {
                  navigate("termsOfService");
                  ScrollToTop();
                }}
              >
                Terms of service
              </p>
            </div>
          </div>
        </div>

        <div className=" line h-px bg-white "></div>
        <div>
          <div class="card">
            <a
              class="socialContainer containerOne"
              href="https://github.com/mahmd-zsc"
            >
              <svg
                class="socialSvg twitterSvg"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  fill="white"
                />
              </svg>
            </a>

            <a class="socialContainer containerTwo" href="mailto:moma8607914@gmail.com">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.33em"
                height="1em"
                viewBox="0 0 256 193"
                class="socialSvg linkdinSvg"
              >
                <path
                  fill="white"
                  d="M58.182 192.05V93.14L27.507 65.077L0 49.504v125.091c0 9.658 7.825 17.455 17.455 17.455z"
                />
                <path
                  fill="white"
                  d="M197.818 192.05h40.727c9.659 0 17.455-7.826 17.455-17.455V49.505l-31.156 17.837l-27.026 25.798z"
                />
                <path
                  fill="white"
                  d="m58.182 93.14l-4.174-38.647l4.174-36.989L128 69.868l69.818-52.364l4.669 34.992l-4.669 40.644L128 145.504z"
                />
                <path
                  fill="white"
                  d="M197.818 17.504V93.14L256 49.504V26.231c0-21.585-24.64-33.89-41.89-20.945z"
                />
                <path
                  fill="white"
                  d="m0 49.504l26.759 20.07L58.182 93.14V17.504L41.89 5.286C24.61-7.66 0 4.646 0 26.23z"
                />
              </svg>
            </a>

            <a class="socialContainer containerThree"  href="https://www.linkedin.com/in/mohamed-mahmound-b160b2270/">
              <svg viewBox="0 0 448 512" class="socialSvg linkdinSvg">
                <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
              </svg>
            </a>

            <a class="socialContainer containerFour" href="https://wa.me/201092525227">
              <svg viewBox="0 0 16 16" class="socialSvg whatsappSvg">
                {" "}
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"></path>{" "}
              </svg>
            </a>
          </div>
          <p className="text-center text-xs text-white opacity-80 mt-8 capitalize ">
            © 2024, mohamed mahmound.
          </p>{" "}
        </div>
      </div>
      <img className="absolute w-full h-full left-0 top-0 opacity-20" src={backgroundImage} alt="" />
    </footer>
  );
}

export default Footer;
