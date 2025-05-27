import React from "react";
import Contacts from "./Contacts";
import Subscription from "./Subscription";
import SocialMedia from "./SocialMedia";
import FooterBottom from "./FooterBottom";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__contacts">
                <div className="contacts__section">
                    <Contacts />
                </div>
                <div className="footer__subscribe">
                    <Subscription />
                    <SocialMedia />
                </div>
            </div>
            <div className="footer__footer">
                <FooterBottom />
            </div>
        </footer>
    );
};

export default Footer;
