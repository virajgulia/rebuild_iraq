import React, { Component } from 'react';
import Link from 'next/link';

export default class SolutionSection extends Component {
    render() {
        return (

            <div className="about-us-bottom-section">

                <h1>Search. Find. Win Business with Rebuilding Iraq.</h1>

                <Link legacyBehavior href="/sign-up">
                    <a className="default-btn about-us-subscribe-btn">
                        Subscribe
                                    </a>
                </Link>

                <Link legacyBehavior href="/tenders">
                    <a className="default-btn about-us-browse-btn">
                        Browse Tenders
                                    </a>
                </Link>

            </div>

        )
    }
}
