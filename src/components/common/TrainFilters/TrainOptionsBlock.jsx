import React from 'react'
import coupeIcon from '../../../assets/img/Kupe.png'
import plazcartIcon from '../../../assets/img/Platscart.png'
import sittingIcon from '../../../assets/img/SittingPlace.png'
import luxIcon from '../../../assets/img/Lux.png'
import wifiIcon from '../../../assets/img/Wifi.png'
import expressIcon from '../../../assets/img/Express.png'

import './TrainFilters.css'

const options = [
    { label: 'Купе', key: 'have_second_class', icon: coupeIcon },
    { label: 'Плацкарт', key: 'have_third_class', icon: plazcartIcon },
    { label: 'Сидячий', key: 'have_fourth_class', icon: sittingIcon },
    { label: 'Люкс', key: 'have_first_class', icon: luxIcon },
    { label: 'Wi-Fi', key: 'have_wifi', icon: wifiIcon },
    { label: 'Кондиционер', key: 'have_air_conditioning', icon: expressIcon },
]

export default function TrainOptionsBlock({ values = {}, onChange }) {
    return (
        <div className="train-options">
            {options.map((opt) => (
                <label key={opt.key} className="train-options__item">
                    <div className="train-options__label">
                        <img
                            src={opt.icon}
                            alt={opt.label}
                            className="train-options__icon"
                        />
                        <span>{opt.label}</span>
                    </div>

                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={values[opt.key] || false}
                            onChange={(e) => onChange(opt.key, e.target.checked)}
                        />
                        <span className="slider"></span>
                    </label>
                </label>
            ))}
        </div>
    )
}
