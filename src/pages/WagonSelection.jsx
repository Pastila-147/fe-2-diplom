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


    const departureAvailableSeats = useSelector((state) => state.seats.availableSeats.departure);
    const arrivalAvailableSeats = useSelector((state) => state.seats.availableSeats.arrival);

    // const train = useSelector((state) => state.seats.train);
    // const seatsDeparture = useSelector((state) =>{
    //     return state.seats.train.departure.seatsCount
    // });
    // const seatsArrival = useSelector((state) => state.seats.train.arrival.seatsCount);
    const { passengersCount } = useSelector((state) => state.passengers);

    const passengersCountAll =
        Number(passengersCount.adult) + Number(passengersCount.child);

    const [disabled, setDisabled] = useState(true);
    const [page, setPage] = useState(1);

    // useEffect(() => {
    //     dispatch(passengersPriceClear());
    //     dispatch(fetchSeats('departure'));
    //     if (train.arrival?._id) dispatch(fetchSeats('arrival'));
    // }, [dispatch, train.arrival]);

    // useEffect(() => {
    //     setDisabled(true);
    //     if (arrivalTrain?._id) {
    //         if (
    //             arrivalSeats. === 0 ||
    //             Number(seatsArrival) !== passengersCountAll
    //         )
    //             return;
    //     }
    //     if (seatsDeparture === 0 || Number(seatsDeparture) !== passengersCountAll)
    //         return;
    //     setDisabled(false);
    // }, [passengersCount, seatsArrival, seatsDeparture, passengersCountAll, train.arrival]);

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

                {departureAvailableSeats && <TicketCard train={departureTrain} coachesList={departureAvailableSeats.couchesList} direction="departure" />}
                {arrivalAvailableSeats && <TicketCard train={arrivalTrain} coachesList={arrivalAvailableSeats.couchesList} direction="arrival" />}

                <div className="seats_buttons">
                    <button
                        type="button"
                        className="button seats_button"
                        onClick={handleClick}
                        disabled={disabled}
                    >
                        Далее
                    </button>
                </div>
            </main>

            </div>
        </section>
    );
}
