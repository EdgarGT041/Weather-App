import React from 'react'
import { LuEye, LuSunrise, LuSunset } from "react-icons/lu";
import { FiDroplet } from "react-icons/fi";
import { MdAir } from "react-icons/md";
import { ImMeter } from "react-icons/im";


export interface WeatherDetailProps {
  visability: string;
  humidity: string;
  windSpeed: string;
  airPressure: string;
  sunrise: string;
  sunset: string;
}
export default function WeatherDetails(props: WeatherDetailProps) {

    const {
    visability = "25km",
    humidity = "61%",
    windSpeed = "7 km/h",
    airPressure = "1012 hPa",
    sunrise = "6.20",
    sunset = "18:48"
  } = props;

    
  return (<>
  
    <SingleWeatherDetail
    icon={<LuEye />}
    information='Visibility'
    value={visability}
    iconColor="text-gray-600"
    bgGradient="bg-gradient-to-br from-gray-100 to-gray-200"
    />
    <SingleWeatherDetail
    icon={<FiDroplet />}
    information='Humidity'
    value={humidity}
    iconColor="text-blue-600"
    bgGradient="bg-gradient-to-br from-blue-50 to-blue-100"
    />
    <SingleWeatherDetail
    icon={<MdAir />}
    information='Wind Speed'
    value={windSpeed}
    iconColor="text-cyan-600"
    bgGradient="bg-gradient-to-br from-cyan-50 to-cyan-100"
    />
    <SingleWeatherDetail
    icon={<ImMeter />}
    information='Air Pressure'
    value={airPressure}
    iconColor="text-purple-600"
    bgGradient="bg-gradient-to-br from-purple-50 to-purple-100"
    />
    <SingleWeatherDetail
    icon={<LuSunrise className="animate-pulse" />}
    information='Sunrise'
    value={sunrise}
    iconColor="text-orange-600"
    bgGradient="bg-gradient-to-br from-orange-50 to-orange-100"
    />
    <SingleWeatherDetail
    icon={<LuSunset className="animate-pulse" />}
    information='Sunset'
    value={sunset}
    iconColor="text-pink-600"
    bgGradient="bg-gradient-to-br from-pink-50 to-pink-100"
    />
  </>
  );
  
}

export interface SingleWeatherDetailProps {

    information: string;
    icon: React.ReactNode;
    value: string;
    iconColor?: string;
    bgGradient?: string;
}
 
function SingleWeatherDetail(props: SingleWeatherDetailProps) {
    return (
        <div className="flex flex-col items-center justify-between gap-3 text-xs font-semibold text-black/80 transition-all duration-300 group">
            <p className="whitespace-nowrap group-hover:text-black transition-colors">{props.information}</p>
            <div className={`text-3xl ${props.iconColor || 'text-black'} ${props.bgGradient || 'bg-gray-100'} p-4 rounded-full shadow-md group-hover:shadow-xl transition-all`}>
                {props.icon}
            </div>
            <p className="font-bold text-base">{props.value}</p>
        </div>
    )   
}