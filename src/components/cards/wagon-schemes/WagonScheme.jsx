import React from 'react';
import SchemeKupe from './SchemeKupe';
import SchemePlatzkart from './SchemePlatzkart';
import SchemeSitting from './SchemeSitting';
import SchemeLux from './SchemeLux';

const schemeComponents = {
    second: SchemeKupe,
    third: SchemePlatzkart,
    fourth: SchemeSitting,
    first: SchemeLux,
};

export default function WagonScheme({ type, item, selectedSeats, onSeatClick }) {
    if (!item?.coach || !item?.seats) {
        return <p>Нет данных для отображения схемы</p>;
    }

    const SchemeComponent = schemeComponents[type];

    if (!SchemeComponent) {
        return <p>Схема не найдена для типа вагона: {type}</p>;
    }

    return (
        <SchemeComponent
            coach={item.coach}
            seats={item.seats}
            selectedSeats={selectedSeats}
            handleClick={onSeatClick}
        />
    );
}
