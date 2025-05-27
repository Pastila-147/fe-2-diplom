import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    setDateStart,
    setDateEnd,
    setOption,
    setPriceRange,
    setStartTimes,
    setEndTimes,
} from '../../../store/filtersSlice'
import { TicketApi } from '../../../api/Api'

import FiltersDatePickers from './FiltersDatePickers'
import TrainOptionsBlock from './TrainOptionsBlock'
import RangeSliderBlock from './RangeSliderBlock'

import './TrainFilters.css'
import './RangeSliderBlock.css'

export default function TrainFilters({ onRoutesChange, offset = 0, limit = 5 }) {
    const dispatch = useDispatch()
    const state = useSelector((state) => state.filters)

    const [error, setError] = useState(null)

    useEffect(() => {
        if (!state?.fromCityId || !state?.toCityId || !state?.dateStart) return

        const fetchRoutes = async () => {
            try {
                const params = {
                    from_city_id: state.fromCityId,
                    to_city_id: state.toCityId,
                    date_start: state.dateStart,
                    date_end: state.dateEnd,
                    price_from: state.priceFrom,
                    price_to: state.priceTo,
                    have_first_class: state.options?.have_first_class,
                    have_second_class: state.options?.have_second_class,
                    have_third_class: state.options?.have_third_class,
                    have_fourth_class: state.options?.have_fourth_class,
                    have_wifi: state.options?.have_wifi,
                    have_air_conditioning: state.options?.have_air_conditioning,
                    start_departure_hour_from: state.startTimes?.departure?.[0],
                    start_departure_hour_to: state.startTimes?.departure?.[1],
                    start_arrival_hour_from: state.startTimes?.arrival?.[0],
                    start_arrival_hour_to: state.startTimes?.arrival?.[1],
                    end_departure_hour_from: state.endTimes?.departure?.[0],
                    end_departure_hour_to: state.endTimes?.departure?.[1],
                    end_arrival_hour_from: state.endTimes?.arrival?.[0],
                    end_arrival_hour_to: state.endTimes?.arrival?.[1],
                    limit,
                    offset,
                }

                Object.keys(params).forEach((key) => {
                    if (
                        params[key] === false ||
                        params[key] === null ||
                        params[key] === ''
                    ) {
                        delete params[key]
                    }
                })

                console.log('👉 Отправляем параметры:', params)
                console.log('limit:', limit, 'offset:', offset)

                const data = await TicketApi.getRoutes(params)

                console.log('📦 Ответ от сервера:', data)

                if (onRoutesChange) {
                    onRoutesChange(data.items || [], data.total_count || 0)
                }
            } catch (err) {
                console.error('Ошибка при загрузке маршрутов:', err)
                setError('Не удалось загрузить маршруты')
            }
        }

        fetchRoutes()
    }, [
        state.fromCityId,
        state.toCityId,
        state.dateStart,
        state.dateEnd,
        state.priceFrom,
        state.priceTo,
        state.options,
        state.startTimes,
        state.endTimes,
        offset,
        limit,
    ])

    return (
        <div className="trains-filters">
            <div className="trains-filters__dates">
                <FiltersDatePickers
                    dateStart={state.dateStart}
                    dateEnd={state.dateEnd}
                    onChangeStart={(val) => dispatch(setDateStart(val))}
                    onChangeEnd={(val) => dispatch(setDateEnd(val))}
                />
            </div>

            <div className="trains-filters__options">
                <TrainOptionsBlock
                    values={state.options}
                    onChange={(name, value) => dispatch(setOption({ name, value }))}
                />
            </div>

            <div className="trains-filters__price">
                <h3 className="trains-filters__price-title">Стоимость</h3>
                <RangeSliderBlock
                    title=""
                    value={[state.priceFrom, state.priceTo]}
                    onChange={(val) => dispatch(setPriceRange(val))}
                    min={0}
                    max={10000}
                    step={100}
                    unit="₽"
                />
            </div>

            <div className="trains-filters__times">
                <h3 className="range-slider-block__title">Туда</h3>
                <RangeSliderBlock
                    subtitleFrom="Отправление"
                    value={state.startTimes.departure}
                    onChange={(val) =>
                        dispatch(setStartTimes({ ...state.startTimes, departure: val }))
                    }
                    min={0}
                    max={24}
                    step={1}
                    unit="ч"
                />
                <RangeSliderBlock
                    subtitleFrom="Прибытие"
                    value={state.startTimes.arrival}
                    onChange={(val) =>
                        dispatch(setStartTimes({ ...state.startTimes, arrival: val }))
                    }
                    min={0}
                    max={24}
                    step={1}
                    unit="ч"
                />

                <h3 className="range-slider-block__title" style={{ marginTop: '40px' }}>
                    Обратно
                </h3>
                <RangeSliderBlock
                    subtitleFrom="Отправление"
                    value={state.endTimes.departure}
                    onChange={(val) =>
                        dispatch(setEndTimes({ ...state.endTimes, departure: val }))
                    }
                    min={0}
                    max={24}
                    step={1}
                    unit="ч"
                />
                <RangeSliderBlock
                    subtitleFrom="Прибытие"
                    value={state.endTimes.arrival}
                    onChange={(val) =>
                        dispatch(setEndTimes({ ...state.endTimes, arrival: val }))
                    }
                    min={0}
                    max={24}
                    step={1}
                    unit="ч"
                />
            </div>

            {error && <div className="error">{error}</div>}
        </div>
    )
}
