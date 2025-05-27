import React from 'react'

export const renderSeat = (seat, selectedSeats, handleClick) => {
    const isSelected = selectedSeats.includes(seat.index)

    const className = [
        'seat-wagon_button_box',
        seat.available ? 'available-place' : 'occupied_seat',
        isSelected ? 'seat-wagon_button_selected' : ''
    ].join(' ')

    return (
        <li
            key={seat.index}
            className={className}
            onClick={() => seat.available && handleClick(seat.index)}
        >
            {seat.index}
        </li>
    )
}
