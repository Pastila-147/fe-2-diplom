import React from 'react'
import { renderSeat } from './renderSeat'
import './WagonScheme.css'

export default function SchemePlatzkart({ coach, seats, selectedSeats, onSeatClick }) {
    if (!coach || !seats) return null

    const topSeats = seats.filter(seat => seat.index % 2 === 0 && seat.index < 33)
    const bottomSeats = seats.filter(seat => seat.index % 2 !== 0 && seat.index < 33)
    const sideSeats = seats.filter(seat => seat.index >= 33)

    return (
        <div className="seats-scheme platzkart">
            <span className="scheme_wagon-number">{coach.name.slice(-2)}</span>

            <ul className="scheme_top-seats">
                {topSeats.map(seat => renderSeat(seat, selectedSeats, onSeatClick))}
            </ul>

            <ul className="scheme_bottom-seats">
                {bottomSeats.map(seat => renderSeat(seat, selectedSeats, onSeatClick))}
            </ul>

            <ul className="scheme_side-seats">
                {sideSeats.map(seat => renderSeat(seat, selectedSeats, onSeatClick))}
            </ul>
        </div>
    )
}
