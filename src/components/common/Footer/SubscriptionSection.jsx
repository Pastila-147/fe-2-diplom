import React from "react";
import "./Footer.css";

const SubscriptionSection = () => {
    return (
        <div className="footer__subscription">
            <h3 className="footer__section-title">Подписка</h3>
            <p className="footer__subscription__description">Будьте в курсе событий</p>
            <div className="footer__subscription__form">
                <input type="email" placeholder="email" />
                <button>Отправить</button>
            </div>

            <h3 className="footer__section-title">Подписывайтесь на нас</h3>
            <div className="socials">
                <img src="/img/youtube.png" alt="YouTube" className="social" />
                <img src="/img/linkedin.png" alt="LinkedIn" className="social" />
                <img src="/img/google.png" alt="Google" className="social" />
                <img src="/img/facebook.png" alt="Facebook" className="social" />
                <img src="/img/twitter.png" alt="Twitter" className="social" />
            </div>
        </div>
    );
};

export default SubscriptionSection;
