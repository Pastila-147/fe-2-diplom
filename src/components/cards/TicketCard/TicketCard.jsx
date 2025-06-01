import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    coachItemsSelect,
    coachItemsUnSelect,
    coachClassChange,
    seatsItemSelect,
    seatsItemUnSelect, coachSelect, resetSeats, resetTrain,
} from '../../../store/seatsSlice';
import { passengersCountChange } from '../../../store/passengersSlice';
// import WagonScheme from '../wagon-schemes/WagonScheme';
import Loading from '../../common/Loading';
import TicketHeader from './TicketHeader';
import TrainInfo from './TrainInfo';
import PassengerTabs from './PassengerTabs';
import { useNavigate } from 'react-router-dom';
import './TicketCard.css';
import CoachTypeSelector from "./CoachTypeSelector";
import CoachDetails from "./CoachDetails";

export default function TicketCard({train, coachesList, direction }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const train = useSelector((state) => state.seats.train[direction.type]);

    const seatState = useSelector((state) => state.seats.selectedSeats[direction]);

    const [activeTab, setActiveTab] = useState('adult');
    const [passengerCount, setPassengerCount] = useState({ adult: '', child:'', noPlace: ''});

    const coachClass = seatState?.selectedCoachClass;
    const coachesOfSelectedClass = seatState?.coachesOfSelectedClass;
    const selectedCoachId = seatState?.selectedCoachId;
    const selectedCoach = coachesList ? coachesList.find(c => c.coach._id === selectedCoachId) : null;
    const seats = seatState?.seats || {};

    useEffect(() => {
        if (!coachClass && coachesList.length > 0) {
            const classOfTheFirstCoach = coachesList[0].coach.class_type;
            handleCoachClassChange(classOfTheFirstCoach);
        }
    }, [coachClass, coachesList, direction, dispatch]);

    if (!coachesList || !train) {
        return <Loading />;
    }

    const availableClasses = {
        fourth: train.have_fourth_class,
        third: train.have_third_class,
        second: train.have_second_class,
        first: train.have_first_class,
    };

    const handleCoachClassChange = (type) => {
        const coachesOfSelectedClass = coachesList.filter((el) => el.coach.class_type === type);
        dispatch(coachClassChange({
            coachClass: type,
            coachesOfSelectedClass: coachesOfSelectedClass,
            type: direction }));
    };

    const handleCoachToggle = (id) => {
        dispatch(coachSelect({ id, type: direction }))
    };

    const handleSelectAnotherTrain = () => {
        dispatch(resetSeats())
        dispatch(resetTrain())
        navigate("/search");
    }

    // const handleSeatClick = ({ seat, coachId, price }) => {
    //     const isSelected = seats[coachId]?.includes(seat.index);
    //     if (isSelected) {
    //         dispatch(seatsItemUnSelect({ id: coachId, number: seat.index, type: direction }));
    //     } else {
    //         dispatch(seatsItemSelect({ id: coachId, number: seat.index, type: direction }));
    //     }
    // };

    return (
        <div className="ticket-card">
            <TicketHeader type={direction} onSelectAnotherTrain={handleSelectAnotherTrain}/>
            <TrainInfo route={train} type={direction}/>
            <PassengerTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                counts={passengerCount}
                onCountChange={(type, value) => {
                    setPassengerCount((prev) => ({...prev, [type]: value}));
                    if (value !== '') {
                        dispatch(passengersCountChange({type, count: value}));
                    }
                }}
            />

            <div className="seat-carriage-type">
                <h3 className="carriage-type-title">Тип вагона</h3>
                <CoachTypeSelector
                    selectedType={coachClass}
                    onSelect={handleCoachClassChange}
                    availability={availableClasses}
                />
            </div>


            {coachesOfSelectedClass.length > 0 && (
                <div className="ticket-card__wagon-placeholder">
                    <div className="ticket-card__wagon-numbers">
                        {coachesOfSelectedClass
                            .map((el) => (
                                <button
                                    key={el.coach._id}
                                    className={`carriage-button ${el.coach._id === selectedCoachId ? 'active' : ''}`}
                                    onClick={() => handleCoachToggle(el.coach._id)}
                                >
                                    <div className="number-current">{el.coach.name}</div>
                                </button>
                            ))}
                    </div>

                    {selectedCoach && (
                            <CoachDetails
                                key={selectedCoach.coach.name}
                                selectedCoach={selectedCoach}
                                direction={direction}
                                activeTab={activeTab}
                            />
                        )}
                </div>
            )}
        </div>
    );
}