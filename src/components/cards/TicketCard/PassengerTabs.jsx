import React from 'react'
import './TicketCard.css'
import {PassengerType} from "../../common/PassengerType";

const tabs = [
    { key: PassengerType.Adult, label: 'Взрослых' },
    { key: PassengerType.Child, label: 'Детских' },
    { key: PassengerType.Baby, label: 'Детских «без места»' },
]

const descriptions = {
    adult: 'Можно добавить еще 3 пассажиров',
    child: 'Можно добавить еще 3 детей до 10 лет.Свое место в вагоне, как у взрослых, но дешевле в среднем на 50-65%',
    baby: 'Без предоставления места',
};

export default function PassengerTabs({ activeTab, onTabChange, counts, onCountChange }) {
    return (
        <div className="ticket-ages-block">
            <h3 className="ticket-section-title">Количество билетов</h3>
            <div className="ticket-ages-tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        className={`age-tab ${activeTab === tab.key ? 'active' : ''}`}
                        onClick={() => onTabChange(tab.key)}
                    >
                        <input
                            type="number"
                            placeholder={tab.label}
                            value={counts[tab.key] ?? ''}
                            onChange={(e) => onCountChange(tab.key, Number(e.target.value))}
                            min={0}
                        />
                        <p className="input-desc">{descriptions[tab.key]}</p>
                    </button>
                ))}
            </div>
        </div>

        // <div className="ticket-ages-tabs">
        //     {tabs.map((tab) => (
        //         <button
        //             key={tab.key}
        //             className={`age-tab ${activeTab === tab.key ? 'active' : ''}`}
        //             onClick={() => onTabChange(tab.key)}
        //         >
        //             <input
        //                 type="number"
        //                 placeholder={tab.label}
        //                 value={counts[tab.key] ?? ''}
        //                 onChange={(e) => onCountChange(tab.key, Number(e.target.value))}
        //                 min={0}
        //             />
        //             <p className="input-desc">{descriptions[tab.key]}</p>
        //         </button>
        //     ))}
        // </div>
    )
}
