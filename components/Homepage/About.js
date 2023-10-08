import React, { Component } from 'react';
import Link from 'next/link';

class About extends Component {
    render() {
        return (
            <section className="about-area">
                
                    <div className="row" style={{ margin: 0}}>
                        <div className="col-md-7 left-template-latest-project">
                        <div className="about-content">
                                <h2>Latest Tender News</h2>
                                
                                <Link legacyBehavior href="/news">
                                    <a className="default-btn">
                                        Learn More
                                    </a>
                                </Link>
                            </div>
                        </div>

                        <div className="col-md-5 right-template-latest-news">
                            <div className="about-content">
                                <h2>Latest News</h2>
                                
                                <Link legacyBehavior href="/news">
                                    <a className="default-btn">
                                        Learn More
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="row" style={{margin: 0}}>
                        <div className="col-md-5 left-template-subscribe">
                        <div className="about-content">
                                <h2>Subscribe Now</h2>
                                <p>Receive Daily Tender Alerts in Your Inbox</p>
                                
                                <Link legacyBehavior href="/sign-up">
                                    <a className="default-btn">
                                        Sign Up
                                    </a>
                                </Link>
                            </div>
                        </div>

                        <div className="col-md-7 right-template-latest-tenders">
                            <div className="about-content">
                                <h2>Latest Tenders</h2>
                                
                                <Link legacyBehavior href="/tenders">
                                    <a className="default-btn">
                                        Learn More
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                

                {/* <div className="about-area-white-shape">
                    <Image width={0} height={0} src="/../../images/shape/2.png")} alt="Image" />
                </div> */}
            </section>
        );
    }
}

export default About;