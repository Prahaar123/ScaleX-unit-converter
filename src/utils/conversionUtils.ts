import { conversionMap } from "../constants";


export const convertUnit = (
  value: number,
  from: string,
  to: string,
  category: string
): number => {
  if (isNaN(value)) return 0;

  if (category === "temperature") {
    if (from === to) return value;

    const toCelsius = (val: number, unit: string): number => {
      if (unit === "fahrenheit") return (val - 32) * (5 / 9);
      if (unit === "kelvin") return val - 273.15;
      return val;
    };

    const fromCelsius = (val: number, unit: string): number => {
      if (unit === "fahrenheit") return val * (9 / 5) + 32;
      if (unit === "kelvin") return val + 273.15;
      return val;
    };

    const celsiusValue = toCelsius(value, from);
    return fromCelsius(celsiusValue, to);
  }

  const rates = conversionMap[category as keyof typeof conversionMap];
  const baseValue = value / rates[from];
  return baseValue * rates[to];
};
