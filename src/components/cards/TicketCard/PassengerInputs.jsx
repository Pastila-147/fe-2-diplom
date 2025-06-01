import React from 'react';
import './TicketCard.css';

export default function PassengerInputs({ counts, onChange }) {
    return (
        <div className="ticket-ages-inputs">
            <div className="age-inputs">
                <label>Взрослых</label>
                <input
                    type="number"
                    min="0"
                    value={counts.adult}
                    onChange={(e) => onChange('adult', e.target.value)}
                />
            </div>
            <div className="age-inputs">
                <label>Детских</label>
                <input
                    type="number"
                    min="0"
                    value={counts.child}
                    onChange={(e) => onChange('child', e.target.value)}
                />
            </div>
            <div className="age-inputs">
                <label>Без места</label>
                <input
                    type="number"
                    min="0"
                    value={counts.baby}
                    onChange={(e) => onChange('baby', e.target.value)}
                />
            </div>
        </div>
    );
}
