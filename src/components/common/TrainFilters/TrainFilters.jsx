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
import PriceFilter from './PriceFilter';


import './TrainFilters.css'
import iconTo from '../../../assets/img/subtract.png'
import iconBack from '../../../assets/img/subtract-back.png'
import collapseIcon from '../../../assets/img/collapse.svg'
import collapseStartIcon from '../../../assets/img/collapse_start.svg'
import {setLoading} from "../../../store/loadingSlice";

export default function TrainFilters({ onRoutesChange, offset = 0, limit = 5}) {
    const dispatch = useDispatch()
    const state = useSelector((state) => state.filters)

    const [error, setError] = useState(null)

    const [collapsed, setCollapsed] = useState({ to: false, back: false })

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
                    onChange={(name, value) => dispatch(setOption({name, value}))}
                />
            </div>

            {/*<div className="trains-filters__price">*/}
            {/*    <h3 className="trains-filters__price-title">Стоимость</h3>*/}
            {/*    <RangeSliderBlock*/}
            {/*        title=""*/}
            {/*        value={[state.priceFrom, state.priceTo]}*/}
            {/*        onChange={(val) => dispatch(setPriceRange(val))}*/}
            {/*        min={0}*/}
            {/*        max={10000}*/}
            {/*        step={100}*/}
            {/*        unit="₽"*/}
            {/*    />*/}
            {/*</div>*/}

            <div className="trains-filters__price">
                <PriceFilter
                    min={0}
                    max={10000}
                    onChange={(val) => dispatch(setPriceRange(val))}
                />
            </div>

            {/*<div className="trains-filters__times">*/}
            {/*    <h3 className="range-slider-block__title">Туда</h3>*/}
            {/*    <RangeSliderBlock*/}
            {/*        subtitleFrom="Время отбытия"*/}
            {/*        value={state.startTimes.departure}*/}
            {/*        onChange={(val) =>*/}
            {/*            dispatch(setStartTimes({...state.startTimes, departure: val}))*/}
            {/*        }*/}
            {/*        min={0}*/}
            {/*        max={24}*/}
            {/*        step={1}*/}
            {/*        unit="ч"*/}
            {/*    />*/}
            {/*    <RangeSliderBlock*/}
            {/*        subtitleFrom="Время прибытия"*/}
            {/*        value={state.startTimes.arrival}*/}
            {/*        onChange={(val) =>*/}
            {/*            dispatch(setStartTimes({...state.startTimes, arrival: val}))*/}
            {/*        }*/}
            {/*        min={0}*/}
            {/*        max={24}*/}
            {/*        step={1}*/}
            {/*        unit="ч"*/}
            {/*    />*/}

            {/*    <h3 className="range-slider-block__title" style={{marginTop: '40px'}}>*/}
            {/*        Обратно*/}
            {/*    </h3>*/}
            {/*    <RangeSliderBlock*/}
            {/*        subtitleFrom="Время отбытия"*/}
            {/*        value={state.endTimes.departure}*/}
            {/*        onChange={(val) =>*/}
            {/*            dispatch(setEndTimes({...state.endTimes, departure: val}))*/}
            {/*        }*/}
            {/*        min={0}*/}
            {/*        max={24}*/}
            {/*        step={1}*/}
            {/*        unit="ч"*/}
            {/*    />*/}
            {/*    <RangeSliderBlock*/}
            {/*        subtitleFrom="Время прибытия"*/}
            {/*        value={state.endTimes.arrival}*/}
            {/*        onChange={(val) =>*/}
            {/*            dispatch(setEndTimes({...state.endTimes, arrival: val}))*/}
            {/*        }*/}
            {/*        min={0}*/}
            {/*        max={24}*/}
            {/*        step={1}*/}
            {/*        unit="ч"*/}
            {/*    />*/}
            {/*</div>*/}

            <div className="trains-filters__times-wrapper">
                <div className="trains-filters__times-block">
                    <div className="range-slider-block__header">
                        <img src={iconTo} alt="icon to" className="range-slider-block__icon"/>
                        <h3 className="range-slider-block__title">Туда</h3>
                        <img
                            src={collapsed.to ? collapseStartIcon : collapseIcon}
                            alt="collapse"
                            className="range-slider-block__collapse"
                            onClick={() => setCollapsed(prev => ({...prev, to: !prev.to}))}
                        />
                    </div>

                    {!collapsed.to && (
                        <>
                            <RangeSliderBlock
                                subtitleFrom="Время отбытия"
                                className="departure"
                                position="left"
                                value={state.startTimes.departure}
                                onChange={(val) =>
                                    dispatch(setStartTimes({...state.startTimes, departure: val}))
                                }
                                min={0}
                                max={24}
                                step={1}
                                isTime={true}
                            />
                            <RangeSliderBlock
                                subtitleFrom="Время прибытия"
                                position="right"
                                value={state.startTimes.arrival}
                                onChange={(val) =>
                                    dispatch(setStartTimes({...state.startTimes, arrival: val}))
                                }
                                min={0}
                                max={24}
                                step={1}
                                isTime={true}
                            />
                        </>
                    )}
                </div>

                <div className="trains-filters__times-block">
                    <div className="range-slider-block__header">
                        <img src={iconBack} alt="icon back" className="range-slider-block__icon"/>
                        <h3 className="range-slider-block__title">Обратно</h3>
                        <img
                            src={collapsed.back ? collapseStartIcon : collapseIcon}
                            alt="collapse"
                            className="range-slider-block__collapse"
                            onClick={() => setCollapsed(prev => ({...prev, back: !prev.back}))}
                        />
                    </div>

                    {!collapsed.back && (
                        <>
                            <RangeSliderBlock
                                subtitleFrom="Время отбытия"
                                className="departure"
                                position="left"
                                value={state.endTimes.departure}
                                onChange={(val) =>
                                    dispatch(setEndTimes({...state.endTimes, departure: val}))
                                }
                                min={0}
                                max={24}
                                step={1}
                                isTime={true}
                            />
                            <RangeSliderBlock
                                subtitleFrom="Время прибытия"
                                position="right"
                                value={state.endTimes.arrival}
                                onChange={(val) =>
                                    dispatch(setEndTimes({...state.endTimes, arrival: val}))
                                }
                                min={0}
                                max={24}
                                step={1}
                                isTime={true}
                            />
                        </>
                    )}
                </div>
            </div>


            {error && <div className="error">{error}</div>}
        </div>
    )
}
