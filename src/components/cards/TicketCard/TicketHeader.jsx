import React from 'react';
import './TicketCard.css';
import subtractIcon from '../../../assets/img/subtract.png';
import subtractBackIcon from '../../../assets/img/subtract-back.png';


export default function TicketHeader({ type, onSelectAnotherTrain }) {
    // const iconUrl = type === 'departure'
    //     ? '/assets/img/subtract.png'
    //     : '/assets/img/subtract-back.png';
    //
    // return (
    //     <div className="ticket-card__header">
    //         <div
    //             className="ticket-card__icon"
    //             style={{ backgroundImage: `url(${iconUrl})` }}
    //         />
    //         <button className="ticket-card__button" onClick={onSelectTrain}>
    //             Выбрать другой поезд
    //         </button>
    //     </div>
    // );

    // const icon = type === 'departure' ? subtractIcon : train-arrow;
    const icon = type === 'departure' ? subtractIcon : subtractBackIcon;

    return (
        <div className="ticket-card__header">
            <img className="ticket-card__icon" src={icon} alt="иконка направления" />
            <button className="ticket-card__button" onClick={onSelectAnotherTrain}>
                Выбрать другой поезд
            </button>
        </div>
    );
}
