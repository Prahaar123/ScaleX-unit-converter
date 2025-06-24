import React, { useState } from "react";
import { categories, units } from "../constants";
import { convertUnit } from "../utils/conversionUtils";
import { ArrowsUpDownIcon } from "@heroicons/react/24/solid";
import FloatingBackground from "./FloatingBackground";

const UnitConverter: React.FC = () => {
  const [category, setCategory] = useState<string>("length");
  const [fromUnit, setFromUnit] = useState<string>(units["length"][0]);
  const [toUnit, setToUnit] = useState<string>(units["length"][1]);
  const [inputValue, setInputValue] = useState<string>("");
  const [convertedValue, setConvertedValue] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleConvert = () => {
    const parsedValue = parseFloat(inputValue);
    if (!inputValue || isNaN(parsedValue)) {
      alert("Please enter a valid number.");
      return;
    }
    if (parsedValue < 0) {
      alert("Please enter a non-negative number.");
      return;
    }
    setLoading(true);
    setConvertedValue(null);
    setTimeout(() => {
      const result = convertUnit(parsedValue, fromUnit, toUnit, category);
      setConvertedValue(result.toString());
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-slate-900 text-slate-100 flex items-center justify-center p-4">
      <FloatingBackground />
      <div className="bg-slate-800 p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4 relative z-10">
        <h1 className="text-4xl font-bold text-center mb-4 text-sky-500">
          Unit Converter
        </h1>

        {/* Category */}
        <div>
          <label className="block text-slate-300 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => {
              const newCategory = e.target.value;
              setCategory(newCategory);
              setFromUnit(units[newCategory as keyof typeof units][0]);
              setToUnit(units[newCategory as keyof typeof units][1]);
              setConvertedValue(null);
              setInputValue("");
            }}
            className="w-full p-2 rounded bg-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
            aria-label="Select unit category"
          >
            {categories.map((cat: string) => (
              <option key={cat} value={cat}>
                {cat[0].toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* From Unit */}
        <div>
          <label className="block text-slate-300 mb-1">From</label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full p-2 rounded bg-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
            aria-label="Select source unit"
          >
            {units[category as keyof typeof units].map((unit: string) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center my-2">
          <button
            onClick={() => {
              const temp = fromUnit;
              setFromUnit(toUnit);
              setToUnit(temp);
              setConvertedValue(null);
            }}
            className="bg-sky-700 hover:bg-sky-600 text-white p-3 rounded-full border-2 border-sky-400 flex items-center justify-center shadow-md transition focus:outline-none focus:ring-2 focus:ring-sky-300"
            aria-label="Swap units"
            title="Swap from and to units"
          >
            <ArrowsUpDownIcon className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* To Unit */}
        <div>
          <label className="block text-slate-300 mb-1">To</label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full p-2 rounded bg-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
            aria-label="Select target unit"
          >
            {units[category as keyof typeof units].map((unit: string) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

        {/* Input Field */}
        <div>
          <label className="block text-slate-300 mb-1">Value</label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleConvert();
            }}
            className="w-full p-2 rounded bg-slate-700 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="Enter value"
            aria-label="Enter input value"
          />
        </div>

        {/* Convert Button */}
        <button
          onClick={handleConvert}
          className="w-full px-8 py-3 rounded-full uppercase tracking-wider font-semibold text-[15px] transition-all duration-300 ease-in-out bg-sky-600 text-white shadow-md hover:bg-sky-500 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-sky-300"
          title="Click to convert"
          aria-label="Convert units"
        >
          Convert
        </button>

        {/* Reset Button */}
        <button
          onClick={() => {
            setInputValue("");
            setConvertedValue(null);
            setFromUnit(units[category as keyof typeof units][0]);
            setToUnit(units[category as keyof typeof units][1]);
          }}
          className="w-full mt-2 px-8 py-3 rounded-full uppercase tracking-wider font-semibold text-[15px] transition-all duration-300 ease-in-out bg-rose-600 text-white shadow-md hover:bg-rose-500 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-rose-300"
          title="Reset all fields"
          aria-label="Reset fields"
        >
          Reset
        </button>

        {/* Loader OR Result */}
        <div className="mt-4 text-center min-h-[40px]">
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="relative w-12 h-12">
                <div className="absolute border-4 border-sky-400 opacity-30 rounded-full inset-0 animate-ping"></div>
                <div className="absolute border-4 border-sky-500 rounded-full inset-0"></div>
              </div>
            </div>
          ) : (
            convertedValue !== null && (
              <div className="text-xl font-semibold text-green-400">
                {inputValue} {fromUnit} = {convertedValue} {toUnit}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;
