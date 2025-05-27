import React from "react";

export default function FiltersDatePickers({
                                               dateStart,
                                               dateEnd,
                                               onChangeStart,
                                               onChangeEnd,
                                           }) {
    return (
        <div className="filters-date-pickers space-y-4">
            <div className="date-picker">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Дата отправления
                </label>
                <input
                    type="date"
                    value={dateStart}
                    onChange={(e) => onChangeStart(e.target.value)}
                    className="w-full border rounded-lg p-2 text-sm"
                />
            </div>

            <div className="date-picker">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Дата возвращения
                </label>
                <input
                    type="date"
                    value={dateEnd}
                    onChange={(e) => onChangeEnd(e.target.value)}
                    className="w-full border rounded-lg p-2 text-sm"
                />
            </div>
        </div>
    );
}
