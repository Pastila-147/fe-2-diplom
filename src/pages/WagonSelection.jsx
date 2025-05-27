import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addSelectedSeat, removeSelectedSeat } from '../store/seatsSlice'
import TrainFilters from '../components/common/TrainFilters/TrainFilters'
import LastTickets from '../components/info/LastTickets/LastTickets'
import TicketCard from '../components/cards/TicketCard'
import '../App.css'

export default function WagonSelection() {
    const location = useLocation()
    const navigate = useNavigate()
    const selectedSeats = useSelector((state) => state.seats.selectedSeats) // 👈 добавь эту строку

    const handleNextClick = () => {
        navigate('/passenger-details')
    }

    const departure = location.state?.departure
    const arrival = location.state?.arrival

    if (!departure && !arrival) {
        return (
            <div className="wagon-selection-page">
                <div className="wagon-selection__container">
                    <aside className="wagon-selection__filters">
                        <TrainFilters />
                        <LastTickets />
                    </aside>
                    <section className="wagon-selection__results">
                        <p style={{ padding: '20px' }}>
                            Информация о маршруте не передана. Пожалуйста, выберите поезд на предыдущей странице.
                        </p>
                        <button onClick={() => navigate('/search')} className="train-card__btn">
                            Назад к поиску
                        </button>
                    </section>
                </div>
            </div>
        )
    }

    const handleSelectTrain = () => {
        navigate('/search')
    }

    return (
        <div className="wagon-selection-page">
            <div className="page-container">
                <aside className="sidebar">
                    <TrainFilters />
                    <LastTickets />
                </aside>

                <section className="main-section">
                    {departure && (
                        <TicketCard
                            route={departure}
                            type="departure"
                            onSelectTrain={handleSelectTrain}
                        />
                    )}
                    {arrival && (
                        <TicketCard
                            route={arrival}
                            type="arrival"
                            onSelectTrain={handleSelectTrain}
                        />
                    )}

                    {Array.isArray(selectedSeats) && selectedSeats.length > 0 && (
                        <button className="next-button" onClick={handleNextClick}>
                            Далее
                        </button>
                    )}
                </section>
            </div>
        </div>
    )
}
