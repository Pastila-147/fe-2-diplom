import React from 'react'
import { renderSeat } from './renderSeat'
import './WagonScheme.css'

export default function SchemeLux({ coach, seats, selectedSeats, handleClick }) {
    if (!coach || !seats) return null

    const topSeats = seats.filter(seat => seat.index % 2 === 0)
    const bottomSeats = seats.filter(seat => seat.index % 2 !== 0)

    return (
        <div className="seats-scheme luxury-wagon">
            <span className="scheme_wagon-number">{coach.name.slice(-2)}</span>
            <ul className="scheme_top-seats">
                {topSeats.map(seat => renderSeat(seat, selectedSeats, handleClick))}
            </ul>
            <ul className="scheme_bottom-seats">
                {bottomSeats.map(seat => renderSeat(seat, selectedSeats, handleClick))}
            </ul>
        </div>
    )
}
