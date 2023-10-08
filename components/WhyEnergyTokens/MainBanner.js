import React, { Component } from 'react';
import Link from 'next/link';

class MainBanner extends Component {
    render() {
        return (

            <section className="about-us-header">
                <div className="container">
                    <div className="align-items-center">

                        <h1>Rebuilding Iraq is a Premium Tender Alert Service</h1>

                        <p>Hundreds of tenders that will help you win business</p>

                    </div>

                    <div className="align-items-center">
                        <Link legacyBehavior href="/tenders">
                            <a className="default-btn">
                                Browse Tenders
                                    </a>
                        </Link>

                    </div>
                </div>
            </section>

        );
    }
}

export default MainBanner;