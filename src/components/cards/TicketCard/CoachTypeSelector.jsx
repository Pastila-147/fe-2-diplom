import React from 'react'
import './TicketCard.css'

const coachTypes = [
    { key: 'fourth', label: 'Сидячий', icon: 'sed' },
    { key: 'third', label: 'Плацкарт', icon: 'res' },
    { key: 'second', label: 'Купе', icon: 'coupe' },
    { key: 'first', label: 'Люкс', icon: 'lux' },
]

export default function CoachTypeSelector({ selectedType, onSelect, availability }) {
    console.log('🔥 CoachTypeSelector — availability:', availability)

    return (
        <div className="carriage-types">
            {coachTypes.map(({ key, label, icon }) => {
                const isAvailable = availability?.[key];
                const isActive = selectedType === key;

                return (
                    <div className="carriage-type" key={key}>
                        <button
                            className={`carriage-type-button ${isActive ? 'active' : ''}`}
                            onClick={() => {
                                console.log('✅ Клик по типу:', key);
                                onSelect(key);
                            }}
                            disabled={!isAvailable}
                        >
                            <div
                                className={`carriage-type-img ${icon} ${isActive ? 'active' : ''}`}
                            />
                        </button>
                        <p>{label}</p>
                    </div>
                );
            })}
        </div>
    );
}
