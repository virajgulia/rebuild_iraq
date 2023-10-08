import React, { Component } from 'react';
import Link from 'next/link';
import Image from 'next/image';

class InvestmentOpportunities extends Component {
    render() {
        return (
            <section className="choose-ue-area pb-100">
                <div className="container">
                    <div className="opportunity-section row align-items-center">
                        <div className="col-lg-6">
                            <div className="choose-title">
                                <h2>Invest in Oil and Energy Assets Using Blockchain Technology</h2>
                                <p>Traditionally asset-based investments have only been available to only a small subset of qualified investors, ET is making many of these opportunities available. Whether you reside in the U.S. or live abroad, sign up to explore new and diverse investment opportunities.</p>
                            </div>
                            <Link legacyBehavior href="/investment-opportunities">
                                <a className="default-btn opportunity-btn">Browse Investment Opportunities</a>
                            </Link>

                        </div>

                        <div className="col-lg-6">
                            <div className="opportunity-img">
                                <Image width={0} height={0} src="/../../images/magnifying-glass.png" alt="Image" />
                            </div>
                        </div>
                    </div>

                    {/* <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="choose-content">
                                <ul>
                                    <li>
                                        <span>
                                            01 <i className="flaticon-technical-support"></i>
                                        </span>
                                        <h3>Safe Security</h3>
                                        <p>Lorem ipsum dolor sit labore amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                    </li>

                                    <li className="ml">
                                        <span>
                                            02 <i className="flaticon-shield"></i>
                                        </span>
                                        <h3>Technical Support</h3>
                                        <p>Lorem ipsum dolor sit labore amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                    </li>

                                    <li className="ml-25">
                                        <span>
                                            03 <i className="flaticon-support"></i>
                                        </span>
                                        <h3>Live Support</h3>
                                        <p>Lorem ipsum dolor sit labore amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="choose-img">
                                <Image width={0} height={0} src="/../../images/choose-img.png" alt="Image" />
                            </div>
                        </div>
                    </div> */}
                </div>
            </section>
        );
    }
}

export default InvestmentOpportunities;