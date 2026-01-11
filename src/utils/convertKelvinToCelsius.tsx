/** @format */

export function convertKelvinToCelsius(tempInKelvin: number): number {
  const tempInCelsius = tempInKelvin - 273.15;
  const result = Math.floor(tempInCelsius);
  return result; // Removes decimal part and keeps integer part
}