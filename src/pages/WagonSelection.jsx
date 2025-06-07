import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import TicketCard from '../components/cards/TicketCard/TicketCard';
import TrainFilters from '../components/common/TrainFilters/TrainFilters';
import LastTickets from '../components/info/LastTickets/LastTickets';
import '../App.css';

const TRAINS_PER_PAGE = 5;

export default function WagonSelection() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const departureTrain = useSelector((state) => state.seats.train.departure);
    const arrivalTrain = useSelector((state) => state.seats.train.arrival);


    const departureAvailableCoaches = useSelector((state) => state.seats.availableCoaches.departure);
    const arrivalAvailableCoaches = useSelector((state) => state.seats.availableCoaches.arrival);


    const { passengersCount } = useSelector((state) => state.passengers);

    const passengersCountAll =
        Number(passengersCount.adult) + Number(passengersCount.child);

    const [disabled, setDisabled] = useState(true);
    const [page, setPage] = useState(1);

    const handleClick = () => {
        navigate('/passenger-details');
    };

    const handleRoutesChange = () => {};

    return (
        <section className="wagon-selection content__block page">
            <div className="page-container">
            <aside className="sidebar">
                <TrainFilters
                    onRoutesChange={handleRoutesChange}
                    offset={(page - 1) * TRAINS_PER_PAGE}
                    limit={TRAINS_PER_PAGE}
                />
                <LastTickets />
            </aside>

            <main className="main-section">
                <h3 className="title seats_title">Выбор мест</h3>

                {departureTrain && <TicketCard train={departureTrain} coachesList={departureAvailableCoaches.couchesList} direction="departure" />}
                {arrivalTrain   && <TicketCard train={arrivalTrain}   coachesList={arrivalAvailableCoaches.couchesList}   direction="arrival" />}

                <div className="seats_buttons">
                    <button
                        type="button"
                        className="button seats_button"
                        onClick={handleClick}
                    >
                        Далее
                    </button>
                </div>
            </main>

            </div>
        </section>
    );
}
