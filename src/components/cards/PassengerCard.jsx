import React from 'react'
import { useDispatch } from 'react-redux'
import { updatePassengerData } from '../../store/passengersSlice'

export default function PassengerCard({ type, number, data }) {
    const dispatch = useDispatch()

    if (!data) return null

    const handleChange = (updatedFields) => {
        dispatch(updatePassengerData({ id: data.id, changes: updatedFields }))
    }

    return (
        <div className="passenger-card">
            <h4>Пассажир {number}</h4>

            <div className="field-group">
                <label>Тип билета</label>
                <select
                    value={data.ageType}
                    onChange={(e) => handleChange({ ageType: e.target.value })}
                >
                    <option value="adult">Взрослый</option>
                    <option value="child">Детский</option>
                </select>
            </div>

            <div className="field-group">
                <label>Фамилия</label>
                <input
                    type="text"
                    value={data.surname || ''}
                    onChange={(e) => handleChange({ surname: e.target.value })}
                />
            </div>

            <div className="field-group">
                <label>Имя</label>
                <input
                    type="text"
                    value={data.name || ''}
                    onChange={(e) => handleChange({ name: e.target.value })}
                />
            </div>

            <div className="field-group">
                <label>Отчество</label>
                <input
                    type="text"
                    value={data.patronymic || ''}
                    onChange={(e) => handleChange({ patronymic: e.target.value })}
                />
            </div>

            <div className="field-group">
                <label>Пол</label>
                <div>
                    <button
                        type="button"
                        className={data.gender === 'male' ? 'active' : ''}
                        onClick={() => handleChange({ gender: 'male' })}
                    >
                        м
                    </button>
                    <button
                        type="button"
                        className={data.gender === 'female' ? 'active' : ''}
                        onClick={() => handleChange({ gender: 'female' })}
                    >
                        ж
                    </button>
                </div>
            </div>

            <div className="field-group">
                <label>Дата рождения</label>
                <input
                    type="date"
                    value={data.birthDate || ''}
                    onChange={(e) => handleChange({ birthDate: e.target.value })}
                />
            </div>

            <div className="field-group">
                <label>
                    <input
                        type="checkbox"
                        checked={data.isLimitedMobility || false}
                        onChange={(e) => handleChange({ isLimitedMobility: e.target.checked })}
                    />
                    Ограниченная подвижность
                </label>
            </div>

            {data.ageType === 'adult' ? (
                <>
                    <div className="field-group">
                        <label>Серия паспорта</label>
                        <input
                            type="text"
                            value={data.passportSeries || ''}
                            onChange={(e) => handleChange({ passportSeries: e.target.value })}
                        />
                    </div>
                    <div className="field-group">
                        <label>Номер паспорта</label>
                        <input
                            type="text"
                            value={data.passportNumber || ''}
                            onChange={(e) => handleChange({ passportNumber: e.target.value })}
                        />
                    </div>
                </>
            ) : (
                <div className="field-group">
                    <label>Номер свидетельства о рождении</label>
                    <input
                        type="text"
                        value={data.birthCertNumber || ''}
                        onChange={(e) => handleChange({ birthCertNumber: e.target.value })}
                    />
                </div>
            )}
        </div>
    )
}
