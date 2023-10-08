import React, { Component } from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = ({ handleOpen }) => {
  let currentYear = new Date().getFullYear();
  return (
    <React.Fragment>
      <footer className="footer-top-area pt-100 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="single-widget">
                <a href="/" className="logo">
                  <Image width={1000} height={1000}
                    src="/finalLogoFoot.png"
                    alt="Image"
                  />
                </a>

                <p>
                  (Ri) is the most comprehensive news source for Iraq. Stay
                  informed and learn about the latest projects, tenders, and
                  industry news such as oil and gas, construction, security,
                  telecommunication and more.
                </p>

                <ul className="social-icon">
                  <li>
                    <Link legacyBehavior href="https://www.facebook.com/pages/Rebuilding-Iraq/558922857454107">
                      <a target="_blank">
                        <i className="fa fa-facebook fa-2x"></i>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="https://twitter.com/RebuildingIraq">
                      <a target="_blank">
                        <i className="fa fa-twitter fa-2x"></i>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="https://www.instagram.com/alastaircaithness/">
                      <a target="_blank">
                        <i className="fa fa-instagram fa-2x"></i>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="https://www.linkedin.com/groups/Rebuilding-Iraq-Iraq-Tenders-Projects-4826802">
                      <a target="_blank">
                        <i className="fa fa-linkedin fa-2x"></i>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="https://www.youtube.com/channel/UCqtsup2WJ3XiUtdu8cyHYcw">
                      <a target="_blank">
                        <i className="fa fa-youtube-play fa-2x"></i>
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* <div className="col-lg-3 col-md-6">
                                <div className="single-widget">
                                    <h3>Left Column</h3>
                                    
                                    <ul>
                                        <li>
                                            <Link legacyBehavior href="#">
                                                <a>
                                                    <i className="right-icon bx bx-chevrons-right"></i>
                                                    Link #1
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link legacyBehavior href="#">
                                                <a>
                                                    <i className="right-icon bx bx-chevrons-right"></i>
                                                    Link #2
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link legacyBehavior href="#">
                                                <a>
                                                    <i className="right-icon bx bx-chevrons-right"></i>
                                                    Link #3
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link legacyBehavior href="#">
                                                <a>
                                                    <i className="right-icon bx bx-chevrons-right"></i>
                                                    Link #4
                                                </a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div> */}

            <div className="col-lg-4 col-md-6">
              {/* <div className="single-widget">

                                    <a href="/" className="logo">
                                        <Image width={0} height={0} src="/../../images/zyen-coin-logo.png" alt="Image" />
                                    </a>
                                    <p>The equity of Ziyen Energy has been tokenized and issued as ZiyenCoin.  A Digital Security Token For the Global Oil & Energy Sector.  If you would like to invest and have ownership of the ZiyenCoin, visit <a href="https://www.ziyen.com/how-to-invest-in-ziyencoin/" target="blank">Ziyen Energy Investment Portal </a>.</p>
                                </div> */}
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="single-widget">
                <h3>About Rebuilding Iraq</h3>

                <ul className="information">
                  <li className="address">
                    <i className="flaticon-call"></i>
                    <span>Phone</span>
                    +1 (800) 801 - 4703
                  </li>

                  <li className="address">
                    <i className="flaticon-envelope"></i>
                    <span>Email</span>
                    hello@rebuildingiraq.io
                  </li>
                </ul>
              </div>

              <li className="address">
                <a href="/pricing">
                  <button
                    type="button"
                    onClick={handleOpen}
                    style={{ marginLeft: -30 }}
                    className="default-btn"
                  >
                    Subscribe
                  </button>
                </a>
              </li>

              <div className="footer-shape">
                <Image width={0} height={0}
                  src="/../../images/blockchain-net.png"
                  alt="Image"
                />
                {/* <Image width={0} height={0} src="/../../images/shape/footer-shape-two.png" alt="Image" /> */}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Footer Bottom Area   */}
      <footer className="footer-bottom-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4">
              <div className="copy-right">
                <p>
                  Copyright <i className="bx bx-copyright"></i> {currentYear}{" "}
                  Rebuilding Iraq | All Rights Reserved
                </p>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="privacy">
                <ul>
                  <li>
                    <Link legacyBehavior href="/terms-and-conditions">
                      <a>Terms & Conditions</a>
                    </Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="/privacy-policy">
                      <a>Privacy Policy</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3">
              <div className="designed">
                <p>
                  <Link legacyBehavior href="/disclaimers">
                    <a>Disclaimers</a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
