import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    seatsItemSelect,
    seatsItemUnSelect,
} from '../../../store/seatsSlice';

import Price from './Price';
import Services from './Services';
import Seat from './Seat';

export default function CoachDetails({ selectedCoach, direction, activeTab }) {
    const dispatch = useDispatch();
    const { coach, seats } = selectedCoach;
    //const { seats: selectedSeats, seatsCount } = useSelector((state) => state.seats[activeTab]);
    const { passengersCount } = useSelector((state) => state.passengers);

    const maxSeats = passengersCount.adult + passengersCount.child;
    //const selected = selectedSeats[coach._id] || [];

    const handleClick = (number, available) => {
        if (!available) return;

        // if (selected.includes(number)) {
        //     dispatch(seatsItemUnSelect({ id: coach._id, number, type: activeTab }));
        // } else if (seatsCount < maxSeats) {
        //     dispatch(seatsItemSelect({ id: coach._id, number, type: activeTab }));
        // }
    };

    const isLux = coach.class_type === 'first';
    const isPlatz = coach.class_type === 'third';
    const isKupe = coach.class_type === 'second';
    const isSeat = coach.class_type === 'fourth';

    return (
        <div className="coach">
            <div className="coach-info">
                <div className="coach-info-header">
                    <p className="coach-number">{coach.name.replace(/\D/g, '')}</p>
                    <p className="coach-title">вагон</p>
                </div>

                <div className="coach-info-card coach-info-card--seats">
                    <h5 className="coach-info-title">
                        Места <span className="coach-info-count">{coach.available_seats}</span>
                    </h5>
                    {!isLux && (
                        <>
                            <p className="coach-info-text">
                                Верхние{' '}
                                <span>
                  {seats.filter((el) => el.index % 2 === 0 && el.index < 33).length}
                </span>
                            </p>
                            <p className="coach-info-text">
                                Нижние{' '}
                                <span>
                  {seats.filter((el) => el.index % 2 !== 0 && el.index < 33).length}
                </span>
                            </p>
                        </>
                    )}
                    {isPlatz && (
                        <p className="coach-info-text">
                            Боковые{' '}
                            <span>{seats.filter((el) => el.index > 32).length}</span>
                        </p>
                    )}
                </div>

                <div className="coach-info-card coach-info-card--price">
                    <h5 className="coach-info-title">Стоимость</h5>
                    {!isLux && (
                        <p className="coach-info-text">
                            <Price title="coach-info" value={coach.top_price} /> ₽
                        </p>
                    )}
                    <p className="coach-info-text">
                        <Price title="coach-info" value={coach.bottom_price} /> ₽
                    </p>
                    {isPlatz && (
                        <p className="coach-info-text">
                            <Price title="coach-info" value={coach.side_price} /> ₽
                        </p>
                    )}
                </div>

                <div className="coach-info-card coach-info-card--services">
                    <h5 className="coach-info-title">Обслуживание ФПК</h5>
                    <Services coach={coach} direction={direction} />
                </div>
            </div>

            <div className="coach-inner">
                <div className="coach-demand">
                    {seats.filter((el) => !el.available).length} человек выбирают места в этом поезде
                </div>
                <div className="coach-seats-grid">
                    {seats.map((seat) => (
                        <Seat
                            key={seat.index}
                            id={coach._id}
                            number={seat.index}
                            type={seatType(seat, coach)}
                            available={seat.available}
                            direction={direction}
                            onClick={() => handleClick(seat.index, seat.available)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function seatType(seat, coach) {
    if (coach.class_type === 'first') return 'lux';
    if (coach.class_type === 'third' && seat.index > 32) return 'side';
    return seat.index % 2 === 0 ? 'top' : 'bottom';
}
