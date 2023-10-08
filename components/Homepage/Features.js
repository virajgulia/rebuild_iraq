import React, { Component } from "react";
import Link from "next/link";
import Image from "next/image";

const Features = (props) => {
  return (
    <div className="features-area pb-70">
      <div className="text-divider">
        <p>
          Find the perfect plan for you or your business.{" "}
          <a onClick={props.scrollToPricing} className="link-button">
            View Plans & Pricing
          </a>
        </p>
      </div>
      <div className="adhome">
        {/* <input
          type="file" id="banner-ad"
           accept="image/*"
          style={{ display: "none" }}
        />
        <label for="banner-ad"><span>BANNER ADVERTIZING SPACE HERE</span></label> */}
        <Image width={730} height={0}
          className=""
          src="/al-hurea.jpeg"
          alt="Image"
        />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-sm-6 p-0">
            <div className="single-features">
              <Link legacyBehavior href="/tenders">
                <Image width={1000} height={1000}
                  className="featuresImageArea"
                  src="/tender-alerts.png"
                  alt="Image"
                />
              </Link>
              <h3>Tender Alerts</h3>
              <p>
                Subscribe to our award-winning tender alert service and never
                miss a tender. Set parameters for your chosen industries and
                stay on top of any new projects.{" "}
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-sm-6 p-0">
            <div className="single-features">
              <Link legacyBehavior href="/news">
                <Image width={1000} height={1000}
                  className="featuresImageArea"
                  src="/tender-news.png"
                  alt="Image"
                />
              </Link>
              <h3>News</h3>
              <p>
                Rebuilding Iraq is the most comprehensive news source for Iraq.
                Stay informed and learn about the latest projects, tenders, and
                industry news such as oil and gas, construction, security,
                telecommunications and more.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-sm-6 p-0">
            <div className="single-features">
              <Image width={1000} height={1000}
                className="featuresImageArea"
                src="/business-development.png"
                alt="image"
              />
              <h3>Business Development Services</h3>
              <p>
                Win more business in Iraq by utilizing our seasoned Business
                Development Specialists to help you make those important
                connections to win more business in the region.
              </p>

              {/* <Link legacyBehavior href="/service-details">
                                    <a className="read-more-icon">
                                        <span className="flaticon-right-arrow"></span>
                                    </a>
                                </Link> */}
            </div>
          </div>
        </div>

        <div className="row">
          <Link legacyBehavior href="/about-us">
            <a className="default-btn centered-item">Learn More</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Features;
