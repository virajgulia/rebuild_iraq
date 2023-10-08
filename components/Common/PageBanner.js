import React, { Component } from 'react';
import Link from 'next/link';

class PageBanner extends Component {
    render() {

        let { pageTitle, homePageUrl, homePageText, activePageText, customPage } = this.props;

        return (
            <div className={`page-title-area item-bg1 ${customPage ? 'custom-banner-page page-title-area-detail' : ''}`}>
                <div className="container">
                    <div className="page-title-content">
                        <h2>{pageTitle}</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default PageBanner;