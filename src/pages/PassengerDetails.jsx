import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { nanoid } from 'nanoid'
import RouteDetails from '../components/common/RouteDetails'
import PassengerCard from '../components/cards/PassengerCard'
import { setInitialPassengers } from '../store/passengersSlice'
import '../App.css'

export default function PassengerDetails() {
    const dispatch = useDispatch()

    const count = useSelector((state) => state.passengers.passengersCount) // ← только departure
    const passengers = useSelector((state) => state.passengers.passengers)

    useEffect(() => {
        if (passengers.length === 0 && count) {
            const { adult = 0, child = 0 } = count
            const total = adult + child

            const initialPassengers = Array.from({ length: total }, (_, i) => ({
                id: nanoid(),
                ageType: i < adult ? 'adult' : 'child',
                surname: '',
                name: '',
                patronymic: '',
                gender: '',
                birthDate: '',
                isLimitedMobility: false,
                passportSeries: '',
                passportNumber: '',
                birthCertNumber: '',
            }))

            dispatch(setInitialPassengers(initialPassengers))
        }
    }, [dispatch, passengers.length, count])

    return (
        <div className="passenger-details-page">
            <aside className="passenger-details__aside">
                <RouteDetails />
            </aside>

            <section className="passenger-details__section">
                {passengers.map((passenger, i) => (
                    <PassengerCard key={passenger.id} data={passenger} number={i + 1} />
                ))}
                <button className="next-button">Далее</button>
            </section>
        </div>
    )
}
