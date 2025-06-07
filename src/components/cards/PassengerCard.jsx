import React from 'react'
import { useDispatch } from 'react-redux'
import { updatePassengerData } from '../../store/passengersSlice'
import './PassengerCard.css';
import { useEffect, useState } from 'react';
import ValidIcon from '../../assets/img/Valid.svg';
import NovalidIcon from '../../assets/img/Novalid.svg';

export default function PassengerCard({ type, number, data, updateValidation, validationResults }) {
    const dispatch = useDispatch()
    const [touched, setTouched] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = () => {
        const isChild = data.ageType === 'child';
        let isValid = true;
        let error = '';

        if (isChild) {
            const pattern = /^[IVXLCDM]+-[А-ЯЁ]{2}-\d{6}$/i;
            if (!pattern.test(data.birthCertNumber || '')) {
                isValid = false;
                error = 'Номер свидетельства о рождении указан некорректно. Пример: VIII-ЫП-123456';
            }
        } else {
            const passportSeriesPattern = /^\d{4}$/;
            const passportNumberPattern = /^\d{6}$/;

            if (
                !passportSeriesPattern.test(data.passportSeries || '') ||
                !passportNumberPattern.test(data.passportNumber || '')
            ) {
                isValid = false;
                error = 'Серия и номер паспорта должны содержать 4 и 6 цифр соответственно';
            }
        }

        setIsSubmitted(true);
        updateValidation(data.id, isValid, error);
    };

    if (!data) return null

    const handleChange = (updatedFields) => {
        setTouched(true);
        dispatch(updatePassengerData({ id: data.id, changes: updatedFields }))
    }
    const defaultDocType = data.ageType === 'adult' ? 'Паспорт' : 'Свидетельство о рождении';

    return (
        // <div className="passenger-card">
        <div
            className="passenger-card"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSubmit();
                }
            }}
        >
            <h4 className="passenger-card__title">Пассажир {number}</h4>
            <div className="personal-info">
                <div className="field-group">
                    <label>Тип билета</label>
                    <select
                        value={data.ageType}
                        onChange={(e) => handleChange({ageType: e.target.value})}
                    >
                        <option value="adult">Взрослый</option>
                        <option value="child">Детский</option>
                    </select>
                </div>

                    <div className="field-row fio">
                        <div className="field-group">
                            <label className="field-group__label">Фамилия</label>
                            <input className="field-group__input"
                                   type="text"
                                   value={data.surname || ''}
                                   onChange={(e) => handleChange({surname: e.target.value})}
                            />
                        </div>

                        <div className="field-group">
                            <label className="field-group__label">Имя</label>
                            <input className="field-group__input"
                                   type="text"
                                   value={data.name || ''}
                                   onChange={(e) => handleChange({name: e.target.value})}
                            />
                        </div>

                        <div className="field-group">
                            <label className="field-group__label">Отчество</label>
                            <input className="field-group__input"
                                   type="text"
                                   value={data.patronymic || ''}
                                   onChange={(e) => handleChange({patronymic: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="field-row birth-row">
                        <div className="field-group">
                            <label className="field-group__label">Пол</label>
                            <div className="gender-group">
                                <button
                                    type="button"
                                    className={`gender-button ${data.gender === 'male' ? 'active' : ''}`}
                                    onClick={() => handleChange({gender: 'male'})}
                                >
                                    м
                                </button>
                                <button
                                    type="button"
                                    className={`gender-button ${data.gender === 'female' ? 'active' : ''}`}
                                    onClick={() => handleChange({gender: 'female'})}
                                >
                                    ж
                                </button>
                            </div>
                        </div>

                        <div className="field-group">
                            <label className="field-group__label">Дата рождения</label>
                            <input className="field-group__input"
                                   type="date"
                                   value={data.birthDate || ''}
                                   onChange={(e) => handleChange({birthDate: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="mobility-checkbox">
                        <label className="mobility-label">
                            <input
                                type="checkbox"
                                checked={data.isLimitedMobility || false}
                                onChange={(e) => handleChange({isLimitedMobility: e.target.checked})}
                            />
                            Ограниченная подвижность
                        </label>
                    </div>


                {data.ageType === 'adult' ? (
                    <>
                        <div className="field-row docs-row">
                            <div className="field-group">
                                <label className="field-group__label">Тип документа</label>
                                <select
                                    className="field-group__input"
                                    value={data.DocumentType || defaultDocType}
                                    onChange={(e) => handleChange({DocumentType: e.target.value})}
                                >
                                    {data.ageType === 'adult' ? (
                                        <>
                                            <option value="Паспорт">Паспорт</option>
                                            <option value="Другое">Другое</option>
                                        </>
                                    ) : (
                                        <>
                                            <option value="Свидетельство о рождении">Свидетельство о рождении</option>
                                            <option value="Другое">Другое</option>
                                        </>
                                    )}
                                </select>
                            </div>
                            <div className="field-group">
                                <label className="field-group__label">Серия паспорта</label>
                                <input className="field-group__input"
                                       type="text"
                                       value={data.passportSeries || ''}
                                       onChange={(e) => handleChange({passportSeries: e.target.value})}
                                />
                            </div>
                            <div className="field-group">
                                <label className="field-group__label">Номер паспорта</label>
                                <input className="field-group__input"
                                       type="text"
                                       value={data.passportNumber || ''}
                                       onChange={(e) => handleChange({passportNumber: e.target.value})}
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="field-row docs-row">
                            <div className="field-group">
                                <label className="field-group__label">Тип документа</label>
                                <select
                                    className="field-group__input"
                                    value={data.DocumentType || defaultDocType}
                                    onChange={(e) => handleChange({DocumentType: e.target.value})}
                                >
                                    {data.ageType === 'adult' ? (
                                        <>
                                            <option value="Паспорт">Паспорт</option>
                                            <option value="Другое">Другое</option>
                                        </>
                                    ) : (
                                        <>
                                            <option value="Свидетельство о рождении">Свидетельство о рождении</option>
                                            <option value="Другое">Другое</option>
                                        </>
                                    )}
                                </select>
                            </div>
                            <div className="field-group">
                                <label className="field-group__label">Номер свидетельства о рождении</label>
                                <input className="field-group__input"
                                       type="text"
                                       value={data.birthCertNumber || ''}
                                       onChange={(e) => handleChange({birthCertNumber: e.target.value})}
                                />
                            </div>
                        </div>
                    </>
                )
                }
            </div>

            {isSubmitted && validationResults?.[data.id] && (
                <div className={`validation-message ${validationResults[data.id].isValid ? 'valid' : 'invalid'}`}>
                    <img
                        src={validationResults[data.id].isValid ? ValidIcon : NovalidIcon}
                        alt=""
                    />
                    {validationResults[data.id].isValid ? (
                        <>
                            <span>Готово</span>
                            <button
                                type="button"
                                className="next-passenger-button"
                                onClick={handleSubmit}
                            >
                                Следующий пассажир
                            </button>
                        </>
                    ) : (
                        <span>{validationResults[data.id].error}</span>
                    )}
                </div>
            )}

            {!isSubmitted && (
                <button
                    type="button"
                    className="next-passenger-button"
                    onClick={handleSubmit}
                >
                    Следующий пассажир
                </button>
            )}


        </div>
    )
}