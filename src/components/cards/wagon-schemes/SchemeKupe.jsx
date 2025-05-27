import React from 'react'
import { renderSeat } from './renderSeat'
import './WagonScheme.css'

export default function SchemeKupe({ coach, seats, selectedSeats, handleClick }) {
    if (!coach || !seats) return null

    return (
        <div className="seats-scheme cupe">
            <span className="scheme_wagon-number">
                {coach.name.slice(-2)}
            </span>

            <ul className="scheme_top-seats">
                {seats
                    .filter((seat) => seat.index % 2 === 0)
                    .map((seat) => renderSeat(seat, selectedSeats, handleClick))}
            </ul>

            <ul className="scheme_bottom-seats">
                {seats
                    .filter((seat) => seat.index % 2 !== 0)
                    .map((seat) => renderSeat(seat, selectedSeats, handleClick))}
            </ul>
        </div>
    )
}
