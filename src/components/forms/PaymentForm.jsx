import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPersonalData, setPaymentMethod } from "../../store/paymentSlice";
import "./PaymentForm.css";

const PersonalDataBlock = () => {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState("online");
    const [formData, setFormData] = useState({
        surname: "",
        name: "",
        father: "",
        phone: "",
        mail: "",
    });

    const handleInput = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => {
            const updated = { ...prev, [id]: value };
            dispatch(setPersonalData(updated));
            return updated;
        });
    };

    const handleSelect = (e) => {
        const method = e.target.id;
        setSelected(method);
        dispatch(setPaymentMethod(method));
    };

    useEffect(() => {
        dispatch(setPaymentMethod("online"));
    }, [dispatch]);

    return (
        <div className="personal-data">
            <div className="personal-data-head">
                <h3>Персональные данные</h3>
            </div>

            <div className="personal-data-main">
                <div className="personal-data-info">
                    <div className="data-input">
                        <p className="surname">Фамилия</p>
                        <input
                            type="text"
                            id="surname"
                            className="surname-input"
                            placeholder="Фамилия"
                            value={formData.surname}
                            onChange={handleInput}
                        />
                    </div>
                    <div className="data-input">
                        <p className="name">Имя</p>
                        <input
                            type="text"
                            id="name"
                            className="name-input"
                            placeholder="Имя"
                            value={formData.name}
                            onChange={handleInput}
                        />
                    </div>
                    <div className="data-input">
                        <p className="father">Отчество</p>
                        <input
                            type="text"
                            id="father"
                            className="father-input"
                            placeholder="Отчество"
                            value={formData.father}
                            onChange={handleInput}
                        />
                    </div>
                </div>

                <div className="personal-data-phone">
                    <p className="phone">Контактный телефон</p>
                    <input
                        type="text"
                        id="phone"
                        className="phone-input"
                        placeholder="+7 ___ ___ __ __"
                        value={formData.phone}
                        onChange={handleInput}
                    />
                </div>

                <div className="personal-data-mail">
                    <p className="mail">Email</p>
                    <input
                        type="text"
                        id="mail"
                        className="mail-input"
                        placeholder="inbox@gmail.ru"
                        value={formData.mail}
                        onChange={handleInput}
                    />
                </div>
            </div>

            <div className="footer-title">
                <h3>Способ оплаты</h3>
            </div>

            <div className="methods">
                <div className="method-online">
                    <div className="online-checkbox">
                        <input
                            type="radio"
                            className="input-checkbox"
                            id="online"
                            checked={selected === "online"}
                            onChange={handleSelect}
                        />
                        <label htmlFor="online" className="checkbox-text">
                            Онлайн
                        </label>
                    </div>
                    <div className="online-variation">
                        <p className="variant card">Банковской картой</p>
                        <p className="variant">PayPal</p>
                        <p className="variant">Visa QIWI Wallet</p>
                    </div>
                </div>
                <div className="method-cash">
                    <div className="cash-checkbox">
                        <input
                            type="radio"
                            className="input-checkbox"
                            id="cash"
                            checked={selected === "cash"}
                            onChange={handleSelect}
                        />
                        <label htmlFor="cash" className="checkbox-text">
                            Наличными
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalDataBlock;
