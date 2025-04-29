import React, { useState } from "react";

function App() {
  
  // State for first dropdown (from unit) and second dropdown (to unit)
  const [fromUnit, setFromUnit] = useState("minPerKm"); // Default: min/km
  const [toUnit, setToUnit] = useState("kph"); // Default: kph

  // States for user input fields
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [speed, setSpeed] = useState("");
  const [result, setResult] = useState(""); // Output result

  // Function to handle the calculation when button is clicked
  const handleCalculate = () => {
    let res = "";

    if (fromUnit === "minPerKm" && toUnit === "kph") {

      // Convert min/km to kph
      const totalMinutes = parseFloat(minutes) + parseFloat(seconds || 0) / 60;
      res = (60 / totalMinutes).toFixed(2) + " kph";

    } else if (fromUnit === "minPerKm" && toUnit === "mph") {

      // Convert min/km to mph
      const totalMinutes = parseFloat(minutes) + parseFloat(seconds || 0) / 60;
      res = ((60 / totalMinutes) * 0.621371).toFixed(2) + " mph";

    } else if (fromUnit === "kph" && toUnit === "minPerKm") {

      // Convert kph to min/km
      const minutesPerKm = 60 / parseFloat(speed);
      const mins = Math.floor(minutesPerKm);
      const secs = Math.round((minutesPerKm - mins) * 60);
      res = `${mins}:${secs.toString().padStart(2, "0")} min/km`;

    } else if (fromUnit === "mph" && toUnit === "minPerKm") {

      // Convert mph to min/km
      const minutesPerKm = (60 / parseFloat(speed)) / 0.621371;
      const mins = Math.floor(minutesPerKm);
      const secs = Math.round((minutesPerKm - mins) * 60);
      res = `${mins}:${secs.toString().padStart(2, "0")} min/km`;

    }

    // Save the result to display
    setResult(res);
  };

  // Helper function to decide available options for second dropdown
  const getToUnitOptions = () => {
    if (fromUnit === "minPerKm") {
      return [
        { value: "kph", label: "kph" },
        { value: "mph", label: "mph" },
      ];
    } else {
      return [
        { value: "minPerKm", label: "min/km" },
      ];
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Pace Converter🏃‍♂️
        </h1>

        {/* First dropdown: select FROM unit */}
        <select
          value={fromUnit}
          onChange={(e) => {
            setFromUnit(e.target.value);
            // Reset TO unit when FROM unit changes
            setToUnit(e.target.value === "minPerKm" ? "kph" : "minPerKm");
          }}
          className="w-full mb-4 p-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="minPerKm">min/km</option>
          <option value="kph">kph</option>
          <option value="mph">mph</option>
        </select>

        {/* Second dropdown: select TO unit */}
        <select
          value={toUnit}
          onChange={(e) => setToUnit(e.target.value)}
          className="w-full mb-6 p-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {getToUnitOptions().map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Inputs for either pace or speed depending on FROM unit */}
        {fromUnit === "minPerKm" ? (
          <div className="flex gap-4 mb-6">
            {/* Input for minutes */}
            <input
              type="number"
              placeholder="Minutes"
              value={minutes}
              min="0"
              max="59"
              onChange={(e) => setMinutes(e.target.value)}
              className="w-1/2 p-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {/* Input for seconds */}
            <input
              type="number"
              placeholder="Seconds"
              value={seconds}
              min="0"
              max="59"
              onChange={(e) => setSeconds(e.target.value)}
              className="w-1/2 p-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        ) : (
          <div className="mb-6">
            {/* Input for speed */}
            <input
              type="number"
              placeholder="Speed"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              className="w-full p-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        )}

        {/* Calculate button */}
        <button
          onClick={handleCalculate}
          className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Calculate
        </button>

        {/* Display the result if available */}
        {result && (
          <div className="mt-6 text-center text-2xl font-bold text-purple-700 animate-bounce">
            {result}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
