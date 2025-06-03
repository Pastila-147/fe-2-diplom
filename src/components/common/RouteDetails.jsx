import React from 'react'
import { useSelector } from 'react-redux'

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

    const priceAdult = 1940
    const priceChild = 970

    const depAdults = passengersCount.adult || 0
    const depChildren = passengersCount.child || 0

    const arrAdults = passengersCount.adult || 0
    const arrChildren = passengersCount.child || 0

    const totalAdults = depAdults + arrAdults
    const totalChildren = depChildren + arrChildren

    const totalPriceDeparture = depAdults * priceAdult + depChildren * priceChild
    const totalPriceArrival = arrAdults * priceAdult + arrChildren * priceChild
    const totalPrice = totalPriceDeparture + totalPriceArrival

    return (
        <aside className="route-details">
            <h3 className="route-details__title">Детали поездки</h3>

            {departureTrain && (
                <div className="route-block">
                    <strong>Туда</strong>
                    <p>{departureTrain.train.name}</p>
                    <p>
                        {departureTrain.from.city.name} → {departureTrain.to.city.name}
                    </p>
                    <p>
                        {formatTime(departureTrain.from.datetime)} — {formatTime(departureTrain.to.datetime)}
                    </p>
                    <p>
                        {formatDate(departureTrain.from.datetime)} — {formatDate(departureTrain.to.datetime)}
                    </p>
                </div>
            )}

            {arrivalTrain && (
                <div className="route-block">
                    <strong>Обратно</strong>
                    <p>{arrivalTrain.train.name}</p>
                    <p>
                        {arrivalTrain.from.city.name} → {arrivalTrain.to.city.name}
                    </p>
                    <p>
                        {formatTime(arrivalTrain.from.datetime)} — {formatTime(arrivalTrain.to.datetime)}
                    </p>
                    <p>
                        {formatDate(arrivalTrain.from.datetime)} — {formatDate(arrivalTrain.to.datetime)}
                    </p>
                </div>
            )}

            <div className="passenger-summary">
                <strong>Пассажиры</strong>
                {depAdults > 0 && (
                    <p>
                        {depAdults} взрослых — {depAdults * priceAdult + arrAdults*priceAdult} ₽
                    </p>
                )}
                {depChildren > 0 && (
                    <p>
                        {depChildren} детских — {depChildren * priceChild + arrAdults*priceAdult} ₽
                    </p>
                )}

            </div>

            <div className="total">
                <strong>Итого: {totalPrice} ₽</strong>
            </div>
        </aside>
    )
}
