import React from 'react'
import { renderSeat } from './renderSeat'
import './WagonScheme.css'

export default function SchemeSitting({ coach, selectedSeats, onSeatClick }) {
    if (!coach || !coach.seats) return null

    const topSeats = coach.seats.filter(seat => seat.index % 2 !== 0)
    const bottomSeats = coach.seats.filter(seat => seat.index % 2 === 0)

    return (
        <div className="seats-scheme sitting-wagon">
            <span className="scheme_wagon-number">
                {coach.name.slice(-2)}
            </span>

            <ul className="scheme_top-seats">
                {topSeats.map(seat => renderSeat(seat, selectedSeats, onSeatClick))}
            </ul>

            <ul className="scheme_bottom-seats">
                {bottomSeats.map(seat => renderSeat(seat, selectedSeats, onSeatClick))}
            </ul>
        </div>
    )
}
