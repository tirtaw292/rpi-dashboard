import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const initialData = [
  {
    country: "United States",
    code: "USD",
    rpi: 35,
    history: [
      { date: "Jan", value: 20 },
      { date: "Feb", value: 25 },
      { date: "Mar", value: 30 },
      { date: "Apr", value: 35 },
    ],
  },
  {
    country: "Eurozone",
    code: "EUR",
    rpi: -15,
    history: [
      { date: "Jan", value: -10 },
      { date: "Feb", value: -12 },
      { date: "Mar", value: -14 },
      { date: "Apr", value: -15 },
    ],
  },
  {
    country: "Japan",
    code: "JPY",
    rpi: 5,
    history: [
      { date: "Jan", value: 0 },
      { date: "Feb", value: 3 },
      { date: "Mar", value: 4 },
      { date: "Apr", value: 5 },
    ],
  },
  {
    country: "United Kingdom",
    code: "GBP",
    rpi: -25,
    history: [
      { date: "Jan", value: -15 },
      { date: "Feb", value: -20 },
      { date: "Mar", value: -23 },
      { date: "Apr", value: -25 },
    ],
  },
];

const getColor = (value) => {
  if (value > 10) return "text-green-600";
  if (value < -10) return "text-red-600";
  return "text-yellow-600";
};

export default function RpiDashboard() {
  const [rpiData, setRpiData] = useState(initialData);
  const [inputValues, setInputValues] = useState(
    initialData.reduce((acc, curr) => {
      acc[curr.code] = curr.rpi;
      return acc;
    }, {})
  );

  const handleInputChange = (code, value) => {
    setInputValues({ ...inputValues, [code]: value });
  };

  const handleUpdate = () => {
    const updated = rpiData.map((item) => {
      const newValue = parseFloat(inputValues[item.code]);
      return {
        ...item,
        rpi: newValue,
        history: [...item.history, { date: "Now", value: newValue }],
      };
    });
    setRpiData(updated);
  };

  return (
    <div className="p-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rpiData.map((item) => (
          <div key={item.code} className="shadow-xl rounded-2xl p-4 bg-white">
            <h2 className="text-xl font-semibold mb-2">{item.country} ({item.code})</h2>
            <p className={`text-lg font-bold ${getColor(item.rpi)}`}>Current RPI: {item.rpi}</p>
            <div className="h-40 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={item.history}>
                  <XAxis dataKey="date" />
                  <YAxis domain={[-100, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-gray-100 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">Update RPI Manually</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {rpiData.map((item) => (
            <div key={item.code} className="flex flex-col gap-2">
              <label>{item.code}</label>
              <input
                type="number"
                value={inputValues[item.code]}
                onChange={(e) => handleInputChange(item.code, e.target.value)}
                className="border p-2 rounded"
              />
            </div>
          ))}
        </div>
        <button onClick={handleUpdate} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          Update All
        </button>
      </div>
    </div>
  );
}
