import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Header from '../components/common/Header';
import Footer from '../components/common/Footer/Footer';
import './SuccessOrder.css';

import rubIcon from '../assets/img/Rouble.svg';
import img1 from '../assets/img/success-icon1.svg';
import img2 from '../assets/img/success-icon2.svg';
import img3 from '../assets/img/success-icon3.svg';

const SuccessOrder = () => {
    const navigate = useNavigate();
    const passanger = useSelector((state) => state.passanger?.passanger) || [];
    const seats = useSelector((state) => state.seats); // предполагаем, seats = { departure, arrival }

    const [stars, setStars] = useState({ one: '', two: '', three: '', four: '', five: '' });

    const handleStarClick = (e) => {
        const id = e.target.id;
        setStars((prev) => ({ ...prev, [id]: prev[id] === 'active' ? '' : 'active' }));
    };

    const totalSum = (seats) =>
        Object.values(seats).reduce((sum, direction) =>
            sum +
            (direction?.adult || 0) +
            (direction?.child || 0) +
            (direction?.services || 0), 0
        );

    return (
        <>
            <main className="success-main">
                <h1 className="success-title">Благодарим вас за заказ!</h1>
                <section className="success-block">
                    <div className="success-header">
                        <p className="success-order-number">№ Заказа 285АА</p>
                        <div className="success-sum">
                            <span className="success-sum-text">Сумма</span>
                            <span className="success-sum-value">{totalSum(seats)}</span>
                            <img src={rubIcon} alt="₽" className="success-currency" />
                        </div>
                    </div>

                    <div className="success-instructions">
                        <div className="success-instruction">
                            <img src={img1} alt="email" />
                            <p>Билеты будут отправлены на ваш <strong>e-mail</strong></p>
                        </div>
                        <div className="success-instruction">
                            <img src={img2} alt="print" />
                            <p><strong>Распечатайте</strong> и сохраняйте билеты до поездки</p>
                        </div>
                        <div className="success-instruction">
                            <img src={img3} alt="present" />
                            <p><strong>Предъявите</strong> распечатанные билеты при посадке</p>
                        </div>
                    </div>

                    <div className="success-status">
                        <h3>{passanger[0]?.name} {passanger[0]?.surname}</h3>
                        <p>Ваш заказ успешно оформлен.</p>
                        <p>В ближайшее время с вами свяжется наш оператор для подтверждения.</p>
                        <p className="success-thanks">
                            Благодарим за доверие и желаем приятного путешествия!
                        </p>
                    </div>

                    <div className="success-footer">
                        <div className="success-rating">
                            <span>Оцените сервис</span>
                            <div className="success-stars">
                                {['one', 'two', 'three', 'four', 'five'].map((star) => (
                                    <button
                                        key={star}
                                        id={star}
                                        className={`star ${stars[star]}`}
                                        onClick={handleStarClick}
                                    />
                                ))}
                            </div>
                        </div>
                        <button className="success-button" onClick={() => navigate('/')}>
                            Вернуться на главную
                        </button>
                    </div>
                </section>
            </main>
        </>
    );
};

export default SuccessOrder;
