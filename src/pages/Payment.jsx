import React from 'react';
import RouteDetails from '../components/common/RouteDetails'
import '../App.css'
import PaymentForm from "../components/forms/PaymentForm";
import { useNavigate } from 'react-router-dom';
import {resetOrder} from "../store/orderSlice";
import {useDispatch} from "react-redux";



const Payment = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBuyClick = () => {
        dispatch(resetOrder());
        navigate('/confirmation');
    };

    return (
        <div>
            <main className="page-container">
                <aside className="sidebar">
                    <RouteDetails/>
                </aside>
                <section className="main-section">
                    <PaymentForm/>
                    <div className="payment-buy seats_buttons">
                        <button className="seats_button" onClick={handleBuyClick}>Купить билеты</button>
                    </div>
                </section>

            </main>
        </div>
    );
};

export default Payment;