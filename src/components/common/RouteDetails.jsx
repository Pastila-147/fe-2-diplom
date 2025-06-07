import React from 'react'
import { useSelector } from 'react-redux'
import './RouteDetails.css';
import {GetSeatPrice} from "./PriceCalculator";
import {PassengerType} from "./PassengerType";

export default function RouteDetails() {

    const passengersCount = useSelector((state) => state.passengers.passengersCount)

    const departureTrain = useSelector((state) => state.seats.train.departure);
    const arrivalTrain = useSelector((state) => state.seats.train.arrival);

    const departureSeats = useSelector((state) => state.seats.selectedSeats.departure.seats)
    const arrivalSeats = useSelector((state) => state.seats.selectedSeats.arrival.seats)

    const formatDate = (timestamp) =>
        new Date(timestamp * 1000).toLocaleDateString('ru-RU')

    const formatTime = (timestamp) =>
        new Date(timestamp * 1000).toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
        })

    const departureAdults = departureSeats
        .filter(s => s.passenger_type === PassengerType.Adult)
        .map(s => GetSeatPrice(s))
        .reduce((acc, val) => acc + val, 0);

    const departureChildren = departureSeats
        .filter(s => s.passenger_type === PassengerType.Child)
        .map(s => GetSeatPrice(s))
        .reduce((acc, val) => acc + val, 0);

    const arrivalAdults = arrivalSeats
        .filter(s => s.passenger_type === PassengerType.Adult)
        .map(s => GetSeatPrice(s))
        .reduce((acc, val) => acc + val, 0);

    const arrivalChildren = arrivalSeats
        .filter(s => s.passenger_type === PassengerType.Child)
        .map(s => GetSeatPrice(s))
        .reduce((acc, val) => acc + val, 0);

    const totalPrice = departureAdults + departureChildren + arrivalAdults + arrivalChildren;

    const formatDuration = (sec) => {
        const hours = Math.floor(sec / 3600);
        const minutes = Math.floor((sec % 3600) / 60);
        return `${hours}:${minutes}`;
    };

    return (
        <aside className="route-details">
            <h3 className="route-details__title">Детали поездки</h3>

            {departureTrain && (
                <div className="route-block">
                    <div className="details-route-head">
                        <div className="details-route-icon departure"/>
                        <h4 className="head-title">Туда</h4>
                        <p className="head-date">{formatDate(departureTrain.from.datetime)}</p>
                        <button className="collapse-button" /> {/* Пока без логики */}
                    </div>

                    <div className="details-route-content">
                        <div className="number">
                            <h4>№ Поезда</h4>
                            <p>{departureTrain.train.name}</p>
                        </div>
                        <div className="name">
                            <h4>Название</h4>
                            <p>{departureTrain.from.city.name} {departureTrain.to.city.name}</p>
                        </div>
                        <div className="details-route-time">
                            <div className="duration-text">{formatDuration(departureTrain.duration)}</div>
                            <div className="time-box to">
                                <p className="itemTime">{formatTime(departureTrain.from.datetime)}</p>
                                <p className="itemTime">{formatTime(departureTrain.to.datetime)}</p>
                            </div>
                            <div className="direction-dates">
                                <p className="date">{formatDate(departureTrain.from.datetime)}</p>
                                <p className="date">{formatDate(departureTrain.to.datetime)}</p>
                            </div>
                            <div className="direction-names">
                                <h5 className="there-direction-from">{departureTrain.from.city.name}</h5>
                                <h5 className="there-direction-to">{departureTrain.to.city.name}</h5>
                            </div>
                            <div className="stations-names">
                                <h5 className="there-direction-from">{departureTrain.from.railway_station_name} вокзал</h5>
                                <h5 className="there-direction-to">{departureTrain.to.railway_station_name} вокзал</h5>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {arrivalTrain && (
                <div className="route-block">
                    <div className="details-route-head">
                        <div className="details-route-icon arrival"/>
                        <h4 className="head-title">Обратно</h4>
                        <p className="head-date">{formatDate(arrivalTrain.from.datetime)}</p>
                        <button className="collapse-button"/>
                        {/* Пока без логики */}
                    </div>

                    <div className="details-route-content">
                        <div className="number">
                            <h4>№ Поезда</h4>
                            <p>{arrivalTrain.train.name}</p>
                        </div>
                        <div className="name">
                            <h4>Название</h4>
                            <p>{arrivalTrain.from.city.name} {arrivalTrain.to.city.name}</p>
                        </div>
                        <div className="details-route-time">
                            <div className="durationText">{formatDuration(departureTrain.duration)}</div>
                            <div className="time-box back">
                                <p className="itemTimee">{formatTime(arrivalTrain.from.datetime)}</p>
                                <p className="itemTime">{formatTime(arrivalTrain.to.datetime)}</p>
                            </div>
                            <div className="direction-dates">
                                <p className="date">{formatDate(arrivalTrain.from.datetime)}</p>
                                <p className="date">{formatDate(arrivalTrain.to.datetime)}</p>
                            </div>
                            <div className="direction-names">
                                <h5 className="there-direction-from">{arrivalTrain.from.city.name}</h5>
                                <h5 className="there-direction-to">{arrivalTrain.to.city.name}</h5>
                            </div>
                            <div className="stations-names">
                                <h5 className="there-direction-from">{arrivalTrain.from.railway_station_name} вокзал</h5>
                                <h5 className="there-direction-to">{arrivalTrain.to.railway_station_name} вокзал</h5>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="widget-details-pass">
                <div className="pass-head">
                    <div className="head-img person"/>
                    <h4 className="head-title">Пассажиры</h4>
                    <button className="collapse-button"/>
                </div>
                {passengersCount.adult > 0 && (
                    <div className="pass-age-price">
                        <p className="age-count">{passengersCount.adult} взрослых</p>
                        <div className="price">
                            <p>{departureAdults + arrivalAdults}</p>
                            <div className="currency-icon small"/>
                        </div>
                    </div>
                )}
                {passengersCount.child > 0 && (
                    <div className="pass-age-price">
                        <p className="age-count">{passengersCount.child} детских</p>
                        <div className="price">
                            <p>{departureChildren + arrivalChildren}</p>
                            <div className="currency-icon small"/>
                        </div>
                    </div>
                )}
            </div>

            <div className="widget-details-total">
                <h4 className="total-title">ИТОГО</h4>
                <div className="total">
                    <p className="total-price">{totalPrice}</p>
                    <div className="currency-icon large"/>
                </div>
            </div>
        </aside>

    )
}
