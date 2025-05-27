const Subscription = () => {
    return (
        <div className="footer__subscription">
            <h3 className="footer__subscription__title">Подписка</h3>
            <p className="footer__subscription__description">Будьте в курсе событий</p>
            <div className="footer__subscription__form">
                <input type="email" placeholder="Введите ваш email" />
                <button>Отправить</button>
            </div>
        </div>
    );
};

export default Subscription