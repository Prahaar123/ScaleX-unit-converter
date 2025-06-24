export const categories = ["length", "weight", "temperature", "time", "volume"] as const;

export const units: Record<(typeof categories)[number], string[]> = {
 length: ["millimeters", "centimeters", "meters", "kilometers", "inches", "feet", "miles"],
  weight: ["grams", "kilograms", "pounds", "ounces"],
  temperature: ["celsius", "fahrenheit", "kelvin"],
  time: ["seconds", "minutes", "hours", "days", "weeks", "months", "years"],
  volume: ["milliliters", "liters", "cups", "gallons"],
};

export const conversionMap: Record<string, Record<string, number>> = {
  length: {
    millimeters: 1000,
    centimeters: 100,
    meters: 1,
    kilometers: 0.001,
    inches: 39.3701,
    feet: 3.28084,
    miles: 0.000621371,
  },
  weight: {
    grams: 1,
    kilograms: 0.001,
    pounds: 0.00220462,
    ounces: 0.035274,
  },
  time: {
    seconds: 1,
    minutes: 1 / 60,
    hours: 1 / 3600,
    days: 1 / 86400,
    weeks: 1 / (86400 * 7),
    months: 1 / (86400 * 30.44),  // avg month
    years: 1 / (86400 * 365.25), // leap-year adjusted
  },
  volume: {
    milliliters: 1,
    liters: 0.001,
    cups: 0.00422675,
    gallons: 0.000264172,
  },
};

