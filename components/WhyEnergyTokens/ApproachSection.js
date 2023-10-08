import React, { Component } from 'react';
import Link from 'next/link';

export default class ApproachSection extends Component {
    render() {
        return (
            <section className="about-us-subscribe-section">
                <div className="container">
                    <div className="subscribe-section-content">
                        <div className="col-md-6 ">
                            <h1>Sign Up For Our Daily Tender Alert</h1>
                            <p>Never miss a tender and with our Daily Tender Alert Service, it's free!</p>
                        </div>

                        <div className="col-md-6">
                            <input type="text" placeholder="Name" name="name" />
                            <input type="text" placeholder="E-Mail" name="email" />

                            <Link legacyBehavior href="/#">
                                <a className="default-btn full-width-btn">
                                    Subscribe
                                    </a>
                            </Link>
                        </div>
                    </div>

                </div>
            </section>

        )
    }
}
