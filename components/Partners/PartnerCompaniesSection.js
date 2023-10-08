import React, { Component } from 'react';
import Link from 'next/link';
import Image from 'next/image';

class WhyChooseUs extends Component {
    render() {
        return (
            <section className="choose-ue-area pt-100">
                <div className="container">
                    <div className="partner-companies">

                        <div className="row align-items-center">
                            {/* Ziyen */}
                            <div className="col-lg-6">
                                <h2>Partner</h2>
                                <h1>Ziyen Energy</h1>
                                <span>______________</span>
                                <p>Ziyen Energy is a technology-driven energy company.  Originally formed as a software company providing information on the oil, gas, power and energy sectors, Ziyen specializes on business information, contracts, news and information by developing cutting edge procurement and supply chain software to provide clients with intelligence on industry specific government and private contracts. In addition, Ziyen Energy currently owns interests in oil assets based in Texas, Louisiana, Illinois, Indiana and Kentucky. The equity of Ziyen Energy has been tokenized and issued as ZiyenCoin which is offered for sale as a Security Token pursuant to SEC Rule 506(c) of Regulation D. </p>
                                <Link legacyBehavior href="/#">
                                    <a className="default-btn">
                                        Learn More About Ziyen Inc
                                    </a>
                                </Link>
                            </div>

                            <div className="col-lg-6">
                                <div className="partner-logo-img">
                                    <Image width={0} height={0} src="/../../images/Ziyen-inc-logo-stamp.png" alt="Ziyen Inc Logo" />
                                </div>
                            </div>
                        </div>
                        <br />
                        <br />
                        <br />
                        

                        <div className="divider">
                        </div>

                    </div>

                    {/* <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="choose-content">
                                <ul>
                                    <li>
                                        <span>01 <i className="flaticon-technical-support"></i></span>
                                        <h3>Safe Security</h3>
                                        <p>Lorem ipsum dolor sit labore amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                    </li>
                                    <li className="ml">
                                        <span>02 <i className="flaticon-shield"></i></span>
                                        <h3>Technical Support</h3>
                                        <p>Lorem ipsum dolor sit labore amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                    </li>
                                    <li className="ml-25">
                                        <span>03 <i className="flaticon-support"></i></span>
                                        <h3>Live Support</h3>
                                        <p>Lorem ipsum dolor sit labore amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="choose-content">
                                <ul>
                                    <li>
                                        <span>04 <i className="flaticon-technical-support"></i></span>
                                        <h3>Free Try </h3>
                                        <p>Lorem ipsum dolor sit labore amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                    </li>

                                    <li className="ml">
                                        <span>05 <i className="flaticon-shield"></i></span>
                                        <h3>Advanced Tchnology</h3>
                                        <p>Lorem ipsum dolor sit labore amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                    </li>

                                    <li className="ml-25">
                                        <span>06 <i className="flaticon-support"></i></span>
                                        <h3>Competitive Pricing</h3>
                                        <p>Lorem ipsum dolor sit labore amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div> */}
                </div>
            </section>
        )
    }
}

export default WhyChooseUs;
