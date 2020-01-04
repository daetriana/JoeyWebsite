import React from 'react';
import { SocialIcon } from 'react-social-icons';
import './footer.css'
export class Footer extends React.Component {
    render(){
        return (
            <React.Fragment>
                    <section className = "footerNav">
                    <h1 >
                        FOLLOW ME ON SOCIAL MEDIA
                    </h1>

                    <div className = "socialButtonsContainer">
                        
                        <SocialIcon className ="socialMediaButton"  url="http://twitter.com" />
                        <SocialIcon className ="socialMediaButton" url ="http://facebook.com"/>
                        <SocialIcon className ="socialMediaButton" url ="http://instagram.com"/>
                        <SocialIcon className ="socialMediaButton" url ="http://youtube.com"/>
                        <SocialIcon className ="socialMediaButton" url ="http://soundcloud.com"/>
                        <SocialIcon className ="socialMediaButton" url ="http://spotify.com"/>
                    </div>
                    <h3 >
                        &#169; 2019 Joey Tre' . Built by ChicCode, LLC
                    </h3>

                </section> 
            </React.Fragment>
        );
        }
}


