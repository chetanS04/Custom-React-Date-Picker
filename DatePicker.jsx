import React, { useState, useEffect, useRef } from "react";
import format from "date-fns/format";
import getDaysInMonth from "date-fns/getDaysInMonth";

const DatePicker = ({
  formatType = "yyyy-dd-mm",
  onChange,
  position = "bottom",
  maxYear = new Date().getFullYear() + 50,
  minYear = new Date().getFullYear() - 50,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(
    format(new Date(), formatType.replace("yyyy", "yyyy").replace("dd", "dd").replace("mm", "MM"))
  );
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const pickerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDateChange = (day) => {
    const newDate = new Date(year, month, day);
    setSelectedDate(newDate);
    setInputValue(format(newDate, formatType.replace("yyyy", "yyyy").replace("dd", "dd").replace("mm", "MM")));
    onChange && onChange(newDate.toString());
    setIsOpen(false);
  };

  const daysInMonth = getDaysInMonth(new Date(year, month));

  const positionClasses = {
    bottom: "top-full mt-2 left-0",
    top: "bottom-full mb-2 left-0",
    left: "right-full mr-2 top-0",
    right: "left-full ml-2 top-0"
  };

  const yearsRange = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);

  return (
    <div className="relative inline-block" ref={pickerRef}>
      <input
        type="text"
        className="border p-2 rounded w-40 focus:outline-none bg-white cursor-pointer shadow-md hover:shadow-lg transition-all"
        value={inputValue}
        onFocus={() => setIsOpen(true)}
        readOnly
      />
      {isOpen && (
        <div
          className={`absolute bg-white border border-gray-300 p-4 shadow-lg rounded-lg z-50 w-64 ${positionClasses[position] || positionClasses.bottom}`}
        >
          <div className="mt-2">
            <label className="block text-gray-700 font-medium mb-1">Select Year:</label>
            <select
              className="w-full p-2 border border-gray-300 rounded bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
            >
              {yearsRange.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-between items-center mb-2 text-gray-700 font-semibold">
            <button
              onClick={() => setMonth((prev) => (prev === 0 ? 11 : prev - 1))}
              className="p-1 text-gray-600 hover:bg-gray-200 rounded"
            >
              ◀
            </button>
            <span className="text-xl">{format(new Date(year, month), "MMMM yyyy")}</span>
            <button
              onClick={() => setMonth((prev) => (prev === 11 ? 0 : prev + 1))}
              className="p-1 text-gray-600 hover:bg-gray-200 rounded"
            >
              ▶
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-gray-800">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
              <div key={index} className="text-center font-medium text-gray-600">{day}</div>
            ))}
            {[...Array(daysInMonth).keys()].map((day) => (
              <button
                key={day + 1}
                onClick={() => handleDateChange(day + 1)}
                className={`w-10 h-10 flex items-center justify-center rounded transition-all ${
                  selectedDate.getDate() === day + 1 && selectedDate.getMonth() === month
                    ? "bg-blue-600 text-white font-semibold"
                    : selectedDate.getDate() === day + 1
                    ? "text-purple-600 underline"
                    : "hover:bg-blue-100"
                }`}
              >
                {day + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;



// you can import and use any where
<ReactDate formatType="yyyy/mm/dd" position="bottom" maxYear={2020} minYear={1975} />
