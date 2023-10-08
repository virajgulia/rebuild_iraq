import React, { Component } from 'react';
import Navbar from '../components/Layouts/Navbar';
import PageBanner from '../components/Common/PageBanner';
import Footer from '../components/Layouts/Footer';
import UserProfile from '../components/Profile/Profile';

class Profile extends Component {
    render() {
        return(
            <React.Fragment>
                <Navbar />
                <UserProfile />
                <Footer />
            </React.Fragment>
        );
    }
}

export default Profile;