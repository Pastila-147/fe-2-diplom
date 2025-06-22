import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import {
    setFromCityId,
    setToCityId,
    setDateStart,
    setDateEnd,
} from '../../store/filtersSlice'
import { useNavigate } from 'react-router-dom'
import { CityApi } from '../../api/Api'
import './Header.css'

const Header = ({ isMainPage = true }) => {
    const [from, setFrom] = useState([ "санкт-петербург" ])
    const [to, setTo] = useState(["архангельск"])
    const [fromSuggestions, setFromSuggestions] = useState([])
    const [toSuggestions, setToSuggestions] = useState([])
    const [isFromOpen, setIsFromOpen] = useState(false)
    const [isToOpen, setIsToOpen] = useState(false)

    const fromRef = useRef(null)
    const toRef = useRef(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()



    // Поиск городов по названию
    const fetchCities = async (query, setSuggestions, setOpen) => {
        if (query.length > 1) {
            try {
                const cities = await CityApi.fetchCities(query)
                setSuggestions(cities)
                setOpen(true)
            } catch (error) {
                console.error(error)
                setSuggestions([])
                setOpen(false)
            }
        } else {
            setSuggestions([])
            setOpen(false)
        }
    }

    useEffect(() => {
        fetchCities(from, setFromSuggestions, setIsFromOpen)
    }, [from])

    useEffect(() => {
        fetchCities(to, setToSuggestions, setIsToOpen)
    }, [to])

    // Выбор городов
    const selectFromCity = (city) => {
        setFrom(city.name)
        dispatch(setFromCityId(city._id))
        setIsFromOpen(false)
    }

    const selectToCity = (city) => {
        setTo(city.name)
        dispatch(setToCityId(city._id))
        setIsToOpen(false)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (fromRef.current && !fromRef.current.contains(event.target)) {
                setIsFromOpen(false)
            }
            if (toRef.current && !toRef.current.contains(event.target)) {
                setIsToOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const depDate = e.target.departureDate.value
        const retDate = e.target.returnDate.value

        dispatch(setDateStart(depDate))
        dispatch(setDateEnd(retDate))

        navigate('/search')
    }

    const handleNavClick = (anchor) => {
        if (isMainPage) {
            const element = document.getElementById(anchor)
            if (element) element.scrollIntoView({ behavior: 'smooth' })
        } else {
            navigate('/', { state: { anchor } })
        }
    }

    return (
        <header className={`header ${isMainPage ? 'header--main' : 'header--secondary'}`}>
            <div className="header__top">
                <div className="header__logo">Лого</div>
            </div>

            {/*<div className="header__nav">*/}
            {/*    <nav>*/}
            {/*        <ul className="nav__list">*/}
            {/*            <li><a href="#about">О нас</a></li>*/}
            {/*            <li><a href="#how-it-works">Как это работает</a></li>*/}
            {/*            <li><a href="#reviews">Отзывы</a></li>*/}
            {/*            <li><a href="#contacts">Контакты</a></li>*/}
            {/*        </ul>*/}
            {/*    </nav>*/}
            {/*</div>*/}


            <div className="header__nav">
                <nav>
                    <ul className="nav__list">
                        <li>
                            <button type="button" onClick={() => handleNavClick('about')}>О нас</button>
                        </li>
                        <li>
                            <button type="button" onClick={() => handleNavClick('how-it-works')}>Как это работает
                            </button>
                        </li>
                        <li>
                            <button type="button" onClick={() => handleNavClick('reviews')}>Отзывы</button>
                        </li>
                        <li>
                            <button type="button" onClick={() => handleNavClick('contacts')}>Контакты</button>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className={`header__content ${isMainPage ? 'header__content--main' : 'header__content--secondary'}`}>
                {isMainPage && (
                    <div className="header__left-text">
                        <span className="header__left-text--light">Вся жизнь — </span>
                        <span className="header__left-text--bold">путешествие!</span>
                    </div>
                )}

                <form
                    className={`search-form ${!isMainPage ? 'search-form--compact' : ''}`}
                    onSubmit={handleSubmit}
                >
                    <div className={`${!isMainPage ? 'search-form--compact__row' : ''}`}>
                        <div className="search-form__group">
                            <label>Направление</label>
                            <div className="search-form__inputs">
                                <div className="input-with-suggestions" ref={fromRef}>
                                    <input
                                        type="text"
                                        placeholder="Откуда"
                                        value={from}
                                        onChange={(e) => setFrom(e.target.value)}
                                        onFocus={() => from.length > 1 && setIsFromOpen(true)}
                                        autoComplete="off"
                                    />
                                    {isFromOpen && (
                                        <ul className="suggestions-list">
                                            {fromSuggestions.length > 0 ? (
                                                fromSuggestions.map((city) => (
                                                    <li key={city._id} onClick={() => selectFromCity(city)}>
                                                        {city.name}
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="no-suggestions">Ничего не найдено</li>
                                            )}
                                        </ul>
                                    )}
                                </div>

                                <div className="input-with-suggestions" ref={toRef}>
                                    <input
                                        type="text"
                                        placeholder="Куда"
                                        value={to}
                                        onChange={(e) => setTo(e.target.value)}
                                        onFocus={() => to.length > 1 && setIsToOpen(true)}
                                        autoComplete="off"
                                    />
                                    {isToOpen && (
                                        <ul className="suggestions-list">
                                            {toSuggestions.length > 0 ? (
                                                toSuggestions.map((city) => (
                                                    <li key={city._id} onClick={() => selectToCity(city)}>
                                                        {city.name}
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="no-suggestions">Ничего не найдено</li>
                                            )}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="search-form__group">
                            <label>Дата</label>
                            <div className="search-form__inputs">
                                <input type="date" name="departureDate" defaultValue="2027-11-26"/>
                                <input type="date" name="returnDate" defaultValue="2027-11-30"/>
                            </div>
                        </div>
                    </div>

                    <div className="search-form__submit">
                        <button type="submit">Найти билеты</button>
                    </div>
                </form>

            </div>
        </header>
    )
}

export default Header
