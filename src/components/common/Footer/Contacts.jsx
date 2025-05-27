const Contacts = () => {
    return (
        <div className="footer__contacts">
            <h3 className="footer__contacts__title">Свяжитесь с нами</h3>
            <ul className="footer__contacts__list">
                <li className="footer__contacts__item">
                    <img className="footer__contacts__icon" src="/img/phone.png" alt="phone" />
                    <a className="footer__contacts__link" href="tel:+78000000000">8 (800) 000 00 00</a>
                </li>
                <li className="footer__contacts__item">
                    <img className="footer__contacts__icon" src="/img/mail.png" alt="mail" />
                    <a className="footer__contacts__link" href="mailto:inbox@mail.ru">inbox@mail.ru</a>
                </li>
                <li className="footer__contacts__item">
                    <img className="footer__contacts__icon" src="/img/skype.png" alt="skype" />
                    <a className="footer__contacts__link" href="skype:tu.train.tickets?call">tu.train.tickets</a>
                </li>
                <li className="footer__contacts__item">
                    <img className="footer__contacts__icon" src="/img/location.png" alt="geo" />
                    <a className="footer__contacts__link" href="https://yandex.ru/maps">
                        г. Москва, ул. Московская 27-35, 555 555
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Contacts