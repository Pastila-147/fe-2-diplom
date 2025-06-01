import React from 'react'
import { useSelector } from 'react-redux'

export default function RouteDetails() {
    const { selectedSeats } = useSelector((state) => state.seats)
    const passengersCount = useSelector((state) => state.passengers.count)
    const departure = useSelector((state) => state.filters.departure)
    const arrival = useSelector((state) => state.filters.arrival)

    const formatDate = (timestamp) =>
        new Date(timestamp * 1000).toLocaleDateString('ru-RU')

    const formatTime = (timestamp) =>
        new Date(timestamp * 1000).toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
        })

    const priceAdult = 1940
    const priceChild = 970

    const countDep = passengersCount?.departure || {}
    const countArr = passengersCount?.arrival || {}

    const depAdults = countDep.adult || 0
    const depChildren = countDep.child || 0

    const arrAdults = countArr.adult || 0
    const arrChildren = countArr.child || 0

    const totalAdults = depAdults + arrAdults
    const totalChildren = depChildren + arrChildren

    const totalPriceDeparture = depAdults * priceAdult + depChildren * priceChild
    const totalPriceArrival = arrAdults * priceAdult + arrChildren * priceChild
    const totalPrice = totalPriceDeparture + totalPriceArrival

    return (
        <aside className="route-details">
            <h3 className="route-details__title">Детали поездки</h3>

            {departure && (
                <div className="route-block">
                    <strong>Туда</strong>
                    <p>{departure.train.name}</p>
                    <p>
                        {departure.from.city.name} → {departure.to.city.name}
                    </p>
                    <p>
                        {formatTime(departure.from.datetime)} — {formatTime(departure.to.datetime)}
                    </p>
                    <p>
                        {formatDate(departure.from.datetime)} — {formatDate(departure.to.datetime)}
                    </p>
                </div>
            )}

            {arrival && (
                <div className="route-block">
                    <strong>Обратно</strong>
                    <p>{arrival.train.name}</p>
                    <p>
                        {arrival.from.city.name} → {arrival.to.city.name}
                    </p>
                    <p>
                        {formatTime(arrival.from.datetime)} — {formatTime(arrival.to.datetime)}
                    </p>
                    <p>
                        {formatDate(arrival.from.datetime)} — {formatDate(arrival.to.datetime)}
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
