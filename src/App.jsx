import React, { useState } from "react";

function App() {
  const [conversionType, setConversionType] = useState("minPerKmToKph");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [speed, setSpeed] = useState("");
  const [result, setResult] = useState("");

  const handleCalculate = () => {
    let res = "";

    if (conversionType === "minPerKmToKph") {
      const totalMinutes = parseFloat(minutes) + parseFloat(seconds || 0) / 60;
      res = (60 / totalMinutes).toFixed(2) + " km/h";
    } else if (conversionType === "kphToMinPerKm") {
      const minutesPerKm = 60 / parseFloat(speed);
      const mins = Math.floor(minutesPerKm);
      const secs = Math.round((minutesPerKm - mins) * 60);
      res = `${mins}:${secs.toString().padStart(2, "0")} min/km`;
    } else if (conversionType === "minPerKmToMph") {
      const totalMinutes = parseFloat(minutes) + parseFloat(seconds || 0) / 60;
      res = ((60 / totalMinutes) * 0.621371).toFixed(2) + " mph";
    } else if (conversionType === "mphToMinPerKm") {
      const minutesPerKm = (60 / parseFloat(speed)) / 0.621371;
      const mins = Math.floor(minutesPerKm);
      const secs = Math.round((minutesPerKm - mins) * 60);
      res = `${mins}:${secs.toString().padStart(2, "0")} min/km`;
    }

    setResult(res);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">🏃‍♂️ Pace Converter</h1>

        <select
          value={conversionType}
          onChange={(e) => setConversionType(e.target.value)}
          className="w-full mb-6 p-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="minPerKmToKph">min/km → km/h</option>
          <option value="minPerKmToMph">min/km → mph</option>
          <option value="kphToMinPerKm">km/h → min/km</option>
          <option value="mphToMinPerKm">mph → min/km</option>
        </select>

        {conversionType.includes("minPerKm") ? (
          <div className="flex gap-4 mb-6">
            <input
              type="number"
              placeholder="Minutes"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              className="w-1/2 p-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              placeholder="Seconds"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              className="w-1/2 p-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        ) : (
          <div className="mb-6">
            <input
              type="number"
              placeholder="Speed"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              className="w-full p-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        )}

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Calculate
        </button>

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
