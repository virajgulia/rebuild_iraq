import React, { Component } from 'react';
import Link from 'next/link';

export default class ProblemsSection extends Component {
    render() {
        return (

            <section className="problems-section">

                <div className="row">
                    <div className="col-md-6 about-us-sub-section-tl">
                        <div className="about-content">
                            {/* <h2>Latest Tender News</h2>

                            <Link legacyBehavior href="/#">
                                <a className="default-btn">
                                    Learn More
                                    </a>
                            </Link> */}
                        </div>
                    </div>

                    <div className="col-md-6 about-us-sub-section-tr">
                        <div className="about-content">
                            <h2>Dedicated Research Teams</h2>

                            <p>Our dedicated Business Development teams are working hard to source fresh tenders for our customers</p>

                            <Link legacyBehavior href="/sign-up">
                                <a className="default-btn">
                                    Subscribe
                                    </a>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 about-us-sub-section-bl">
                        <div className="about-content">
                            <h2>Providing you with the tools you need to win business</h2>

                            <p>Choose from our Bronze, Silver and Gold Premium Subscriptions to help you develop your presense in Iraq and be successful with your bids.
</p>

                            <Link legacyBehavior href="/sign-up">
                                <a className="default-btn">
                                    Learn More
                                    </a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-6 about-us-sub-section-br">
                        <div className="about-content">
                            {/* <h2>Latest News</h2>

                            <Link legacyBehavior href="/#">
                                <a className="default-btn">
                                    Learn More
                                    </a>
                            </Link> */}
                        </div>
                    </div>
                </div>

            </section>
        )
    }
}
