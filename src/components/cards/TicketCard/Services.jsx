import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    serviceItemSelect,
    serviceItemUnSelect,
} from '../../../store/seatsSlice';

export default function Services({ coach, direction }) {
    const dispatch = useDispatch();
    const services = useSelector((state) => state.seats.selectedSeats[direction].services);
    const id = coach._id;

    const handleClick = (service) => {
        const isSelected = services[id]?.includes(service);
        if (isSelected) {
            dispatch(serviceItemUnSelect({ id, service, direction }));
        } else {
            dispatch(serviceItemSelect({ id, service, direction }));
        }
    };

    return (
        <div className="coach-services">
            {coach.have_air_conditioning && (
                <button
                    className={`service air__item ${
                        services[id]?.includes('air') ? 'service-active air__item-active' : ''
                    }`}
                    onClick={() => handleClick('air')}
                />
            )}
            {coach.have_wifi && (
                <button
                    className={`service wifi__item ${
                        services[id]?.includes('wifi') ? 'service-active wifi__item-active' : ''
                    }`}
                    onClick={() => handleClick('wifi')}
                />
            )}
            {coach.linens_price !== 0 && (
                <button
                    className={`service linens__item ${
                        services[id]?.includes('linens') ? 'service-active linens__item-active' : ''
                    }`}
                    onClick={() => handleClick('linens')}
                    disabled={coach.is_linens_included}
                />
            )}
            <button
                className={`service food__item ${
                    services[id]?.includes('food') ? 'service-active food__item-active' : ''
                }`}
                onClick={() => handleClick('food')}
            />
        </div>
    );
}
