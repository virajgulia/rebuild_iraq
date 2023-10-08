import React, { Component } from 'react';
import Link from 'next/link';

class PricingStyleOne extends Component {

    openTabSection = (evt, tabNmae) => {
        let i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabs_item");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        tablinks = document.getElementsByTagName("li");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace("current", "");
        }

        document.getElementById(tabNmae).style.display = "block";
        evt.currentTarget.className += "current";
    }

    render() {
        return (
            <section className="pricing-area pt-100 pb-70">
                <div className="container">
                    <div className="section-title">
                        <h3>Rebuilding Iraq Subscription Plans for Any Budget</h3>
                        <span>_______</span>
                    </div>

                    <div className="tab quote-list-tab">
                        {/* Tabs */}
                        <ul className="tabs">
                            <li
                                className="current"
                                onClick={(e) => this.openTabSection(e, 'tab1')}
                            >
                                <span>Monthly</span>
                            </li>

                            <li
                                onClick={(e) => this.openTabSection(e, 'tab2')}
                            >
                                <span>Yearly</span>
                            </li>
                        </ul>

                        <div className="tab_content">
                            <div id="tab1" className="tabs_item">
                                <div className="row">
                                    <div className="col-lg-4 col-md-6">
                                        <div className="single-pricing">
                                            <div className="pricing-top-heading">
                                                <h3>Bronze</h3>
                                            </div>
                                            <span>$99<sub>/month</sub></span>
                                            <hr></hr>

                                            <ul>
                                                <li>
                                                    <i className='bx bx-check'></i>
                                                    One registered user
                                                </li>
                                                <li>
                                                    <i className='bx bx-check'></i>
                                                    Daily Alert Service to your inbox
                                                </li>
                                                <li>
                                                    <i className='bx bx-check'></i>
                                                    Access to all tenders
                                                </li>
                                                <li>
                                                    <i className='bx bx-check'></i>
                                                    Pay anually and save $438
                                                </li>
                                            </ul>
                                            <br /><br />

                                            <Link legacyBehavior href='/sign-up'>
                                                <a className="default-btn" style={{ marginBottom: -5 }}>
                                                    Get Started
                                                </a>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="col-lg-4 col-md-6">
                                        <div className="single-pricing">
                                            <div className="pricing-top-heading">
                                                <h3>Silver</h3>
                                            </div>
                                            <span>$199<sub>/month</sub></span>
                                            <hr></hr>

                                            <ul>
                                                <li>
                                                    <i className='bx bx-check'></i>
                                                    Two registered users
                                                </li>
                                                <li>
                                                    <i className='bx bx-check'></i>
                                                    One month advert on home page
                                                </li>
                                                <li>
                                                    <i className='bx bx-check'></i>
                                                    Publish your company catalogue
                                                </li>
                                                <li>
                                                    <i className='bx bx-check'></i>
                                                    Pay anually and save $888
                                                </li>
                                            </ul>

                                            <Link legacyBehavior href='/sign-up'>
                                                <a className="default-btn">
                                                    Get Started
                                                </a>
                                            </Link>

                                            <strong className="popular">Popular</strong>
                                        </div>
                                    </div>

                                    <div className="col-lg-4 col-md-6 offset-md-3 offset-lg-0">
                                        <div className="single-pricing">
                                            <div className="pricing-top-heading">
                                                <h3>Gold</h3>
                                            </div>
                                            <span>$399<sub>/month</sub></span>
                                            <hr></hr>

                                            <ul>
                                                <li>
                                                    <i className='bx bx-check'></i>
                                                    Multiple registered users
                                                </li>
                                                <li>
                                                    <i className='bx bx-check'></i>
                                                    Tendr Alert and Marketing Services
                                                </li>
                                                <li>
                                                    <i className='bx bx-check'></i>
                                                    Advertising and Business Development
                                                </li>
                                                <li>
                                                    <i className='bx bx-check'></i>
                                                    Pay anually and save $1038
                                                </li>
                                            </ul>

                                            <Link legacyBehavior href='/sign-up'>
                                                <a className="default-btn">
                                                    Get Started
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="tab2" className="tabs_item">
                                <div className="row">
                                    <div className="col-lg-4 col-md-6">
                                        <div className="single-pricing">
                                            <div className="pricing-top-heading">
                                                <h3>Basic</h3>
                                            </div>
                                            <span>$750<sub>/y</sub></span>
                                            <hr></hr>

                                            <ul>
                                                <li>
                                                    <i className='bx bx-check'></i>
                                                    One registered user
                                                </li>
                                                <li>
                                                    <i className='bx bx-check'></i>
                                                    Daily Alert Service to your inbox
                                                </li>
                                                <li>
                                                    <i className='bx bx-check'></i>
                                                    Access to all tenders
                                                </li>
                                                <li>
                                                    <i className='bx bx-check'></i>
                                                    Pay anually and save $438
                                                </li>
                                            </ul>
                                            <br /><br />
                                            <Link legacyBehavior href='/sign-up'>
                                                <a className="default-btn" style={{ marginBottom: -5 }}>
                                                    Get Started
                                                </a>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="col-lg-4 col-md-6">
                                        <div className="single-pricing">
                                            <div className="pricing-top-heading">
                                                <h3>Gold</h3>
                                            </div>
                                            <span>$1500<sub>/y</sub></span>
                                            <hr></hr>

                                            <ul>
                                                <li>
                                                    <i className='bx bx-check'></i>
                                                    Two registered users
                                                </li>
                                                <li>
                                                    <i className='bx bx-check'></i>
                                                    One month advert on home page
                                                </li>
                                                <li>
                                                    <i className='bx bx-check'></i>
                                                    Publish your company catalogue
                                                </li>
                                                <li>
                                                    <i className='bx bx-check'></i>
                                                    Pay anually and save $888
                                                </li>
                                            </ul>

                                            <Link legacyBehavior href='/sign-up'>
                                                <a className="default-btn">
                                                    Get Started
                                                </a>
                                            </Link>

                                            <strong className="popular">Popular</strong>
                                        </div>
                                    </div>

                                    <div className="col-lg-4 col-md-6 offset-md-3 offset-lg-0">
                                        <div className="single-pricing">
                                            <div className="pricing-top-heading">
                                                <h3>Gold</h3>
                                            </div>
                                            <span>$3750<sub>/y</sub></span>
                                            <hr></hr>

                                            <ul>
                                                <li>
                                                    <i className='bx bx-check'></i>
                                                    Multiple registered users
                                                </li>
                                                <li>
                                                    <i className='bx bx-check'></i>
                                                    Tendr Alert and Marketing Services
                                                </li>
                                                <li>
                                                    <i className='bx bx-check'></i>
                                                    Advertising and Business Development
                                                </li>
                                                <li>
                                                    <i className='bx bx-check'></i>
                                                    Pay anually and save $1038
                                                </li>
                                            </ul>

                                            <Link legacyBehavior href='/sign-up'>
                                                <a className="default-btn">
                                                    Get Started
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default PricingStyleOne;