import ReactSlider from 'react-slider'
import './RangeSliderBlock.css'

export default function RangeSliderBlock({
                                             title,
                                             subtitleFrom = 'От',
                                             subtitleTo = 'До',
                                             value = [0, 24],
                                             min = 0,
                                             max = 24,
                                             step = 1,
                                             unit = '',
                                             onChange,
                                         }) {
    return (
        <div className="range-slider-block">
            <h4 className="range-slider-block__title">{title}</h4>

            <div className="range-slider-block__section">
                <div className="range-slider-block__labels">
                    <span>{subtitleFrom}: {value[0]}{unit}</span>
                    <span>{subtitleTo}: {value[1]}{unit}</span>
                </div>

                <ReactSlider
                    className="range-slider-block__track"
                    thumbClassName="range-slider-block__thumb"
                    trackClassName="range-slider-block__range"
                    value={value}
                    onChange={onChange}
                    min={min}
                    max={max}
                    step={step}
                    pearling
                    minDistance={1}
                />
            </div>
        </div>
    )
}
