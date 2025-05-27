import { useState, useEffect } from "react";
import "./TrainFilters.css";

export default function PriceFilter({ min, max, onChange }) {
    const [range, setRange] = useState([min, max]);

    useEffect(() => {
        setRange([min, max]);
    }, [min, max]);

    const handleChange = (e, index) => {
        const newRange = [...range];
        newRange[index] = +e.target.value;
        setRange(newRange);
        onChange(newRange);
    };

    return (
        <div className="price-filter">
            <h4>Цена</h4>
            <div className="price-inputs">
                <input
                    type="number"
                    value={range[0]}
                    onChange={(e) => handleChange(e, 0)}
                    min={0}
                />
                <span>–</span>
                <input
                    type="number"
                    value={range[1]}
                    onChange={(e) => handleChange(e, 1)}
                    min={0}
                />
            </div>
        </div>
    );
}
