import React, { useEffect, useState } from 'react'
import './TicketCard.css'
import WagonScheme from './wagon-schemes/WagonScheme'
import WagonInfo from './WagonInfo'

const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
}

const formatDuration = (sec) => {
    const hours = Math.floor(sec / 3600)
    const minutes = Math.floor((sec % 3600) / 60)
    return `${hours} ч ${minutes} мин`
}

export default function TicketCard({ route, type, onSelectTrain, onSelectSeat }) {
    const [selectedType, setSelectedType] = useState(null)
    const [selectedCoach, setSelectedCoach] = useState(null)
    const [allCoaches, setAllCoaches] = useState([])

    useEffect(() => {
        const routeId = route?._id || route?.[type]?._id
        if (!routeId) return

        fetch(`https://students.netoservices.ru/fe-diplom/routes/${routeId}/seats`)
            .then(res => res.json())
            .then(data => setAllCoaches(data))
            .catch(err => console.error('Ошибка загрузки вагонов:', err))
    }, [route, type])

    const handleCoachTypeClick = (coachType) => {
        setSelectedType(coachType)
        const coach = allCoaches.find(item => item.coach.class_type === coachType)
        setSelectedCoach(coach || null)
    }

    if (!route) return null

    const typeLabels = {
        fourth: 'Сидячий',
        third: 'Плацкарт',
        second: 'Купе',
        first: 'Люкс'
    }

    const typeIcons = {
        fourth: 'sed',
        third: 'res',
        second: 'coupe',
        first: 'lux'
    }

    const availableTypes = ['fourth', 'third', 'second', 'first']

    return (
        <div className="ticket-card">
            <div className="ticket-card__header">
                <div
                    className="ticket-card__icon"
                    style={{
                        backgroundImage: `url(${type === 'departure'
                            ? '/assets/img/subtract.png'
                            : '/assets/img/subtract-back.png'})`
                    }}
                />
                <button className="ticket-card__button" onClick={onSelectTrain}>
                    Выбрать другой поезд
                </button>
            </div>

            <div className="ticket-card__train-info">
                <div className="ticket-card__aside">
                    <div className="ticket-card__aside-icon" />
                    <div className="ticket-card__aside-title">
                        <div className="desc-name">{route.train.name}</div>
                        <div className="desc-city">{route.from.city.name} → {route.to.city.name}</div>
                    </div>
                </div>

                <div className="ticket-card__route">
                    <div className="route-info">
                        <div className="time">{formatTime(route.from.datetime)}</div>
                        <div className="desc-city">{route.from.city.name}</div>
                        <div className="station">{route.from.railway_station_name} вокзал</div>
                    </div>

                    <div
                        className="direction-arrow"
                        style={{
                            backgroundImage: `url(${type === 'departure'
                                ? '/assets/img/train-arrow.png'
                                : '/assets/img/train-arrow-back.png'})`
                        }}
                    />

                    <div className="route-info">
                        <div className="time">{formatTime(route.to.datetime)}</div>
                        <div className="desc-city">{route.to.city.name}</div>
                        <div className="station">{route.to.railway_station_name} вокзал</div>
                    </div>
                </div>

                <div className="ticket-card__duration">
                    <div className="duration-img" />
                    <div className="duration-text">{formatDuration(route.duration)}</div>
                </div>
            </div>

            <div className="seat-amount_ticket">
                <h4 className="ticket-title seat">Количество билетов</h4>
                <div className="ticket-ages">
                    <div className="age-inputs adult">
                        <label>Взрослых</label>
                        <input className="age-input" type="number" min="0" defaultValue="1" />
                    </div>
                    <div className="age-inputs children">
                        <label>Детских</label>
                        <input className="age-input" type="number" min="0" defaultValue="0" />
                        <p className="input-desc">Можно добавить еще 3 детей до 10 лет. Свое место в вагоне, но дешевле</p>
                    </div>
                    <div className="age-inputs children">
                        <label>Детских без места</label>
                        <input className="age-input" type="number" min="0" defaultValue="0" />
                    </div>
                </div>
            </div>

            <div className="seat-carriage-type">
                <h4 className="carriage-type-title">Тип вагона</h4>
                <div className="carriage-types">
                    {availableTypes.map(typeKey => (
                        <div className="carriage-type" key={typeKey}>
                            <button
                                className="carriage-type-button"
                                onClick={() => handleCoachTypeClick(typeKey)}
                                disabled={!route[`have_${typeKey}_class`]}
                            >
                                <div
                                    className={`carriage-type-img ${typeIcons[typeKey]} ${selectedType === typeKey ? 'active' : ''}`}
                                />

                            </button>
                            <p>{typeLabels[typeKey]}</p>
                        </div>
                    ))}
                </div>

                <div className="ticket-card__wagon-placeholder">
                    {selectedCoach ? (
                        <>
                            <WagonInfo coach={selectedCoach.coach}/>
                            <WagonScheme
                                type={selectedType}
                                item={selectedCoach}
                                selectedSeats={[]}
                                onSeatClick={onSelectSeat}
                            />
                        </>
                    ) : (
                        <p>Нет данных для отображения схемы</p>
                    )}
                </div>
            </div>
        </div>
    )
}
