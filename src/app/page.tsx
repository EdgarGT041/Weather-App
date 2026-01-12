'use client'
import Navbar from "@/components/Navbar";
import Image from "next/image";
import axios from "axios";

import { useQuery,QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { parseISO, format, fromUnixTime } from "date-fns";
import Container from "@/components/Container";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
import WeatherIcon from "@/components/WeatherIcon";
import { get } from "http";
import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";
import { metersToKilometers } from "@/utils/metersToKilometers";
import WeatherDetails from "@/components/WeatherDetails";
import { convertWindSpeed } from "@/utils/convertWindSpeed";
import ForecastWeatherDetail from "@/components/ForecastWeatherDetail";
import { useAtom } from "jotai";
import { placeAtom } from "./atom";
import { useEffect } from "react";


// https://api.openweathermap.org/data/2.5/forecast?q=London&appid=49553306a753297d2bec932a77662cf6&cnt=56

interface WeatherDetail {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherDetail[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col gap-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen">
        <Weather />
      </div>
    </QueryClientProvider>
  );
}

function Weather() {
  const [place, setPlace] = useAtom(placeAtom);
  
  const { data, isLoading, error, refetch } = useQuery<WeatherData>({
    queryKey: ['weatherData', place],
    queryFn: async () => {
      const { data } = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
      );
      return data;
    }
  });
      useEffect(() => {
    refetch();
  }, [place, refetch]);
  const firstData = data?.list[0];

  console.log('data', data);

    const uniqueDates = [
    ...new Set(
      data?.list.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    )
  ];

    // Filtering data to get the first entry after 6 AM for each unique date
  const firstDataForEachDate = uniqueDates.map((date) => {
    return data?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });

  if (isLoading)
    return (
      <div className="flex items-center min-h-screen justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="flex flex-col items-center gap-6 p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="text-center space-y-2">
            <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Loading Weather</p>
            <p className="text-sm text-gray-600 animate-pulse">Fetching latest data...</p>
          </div>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center min-h-screen justify-center">
        {/* @ts-ignore */}
        <p className="text-red-400">{error.message}</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen">
      <Navbar location={data?.city.name} />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
          {/* today data */}
        <section className="space-y-4">
          <div className="space-y-2">
            <div className="flex gap-3 items-center flex-wrap">
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {format(parseISO(firstData?.dt_txt ?? ''),  "EEEE")}
                </h2>
                <span className="text-lg text-gray-500 font-medium">
                  {format(parseISO(firstData?.dt_txt ?? ''),  "MMM dd, yyyy")}
                </span>
              </div>
              {firstData && (
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-md ${
                  firstData.main.temp > 293 
                    ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white' 
                    : firstData.main.temp < 278 
                    ? 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white'
                    : 'bg-gradient-to-r from-green-400 to-emerald-500 text-white'
                }`}>
                  {firstData.main.temp > 293 ? '☀️ Hot Day' : firstData.main.temp < 278 ? '❄️ Cold Day' : '🌤️ Nice Day'}
                </span>
              )}
            </div>
            <Container className="gap-10 px-6 items-center"> 
              <div className="flex flex-col px-4 ">

                <span className="text-5xl">
                {convertKelvinToCelsius(firstData?.main.temp ?? 271.85  )}°
                </span>
                <p className="text-xs space-x-1 whitespace-nowrap">
                  <span>Feels like</span>
                  <span>{convertKelvinToCelsius(firstData?.main.feels_like ?? 271.85)}°C</span>
                </p>
                <p className="text-xs space-x-2">
                      <span>
                        {convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}
                        °↓{" "}
                      </span>
                      <span>
                        {" "}
                        {convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}
                        °↑
                      </span>
                
                </p>

              </div>
              {/* weather icon and description */}
              <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3"> 
                {data?.list.map((d, index) => (
                  <div key={index} className="flex flex-col justify-between gap-2 items-center text-xs font-semibold cursor-pointer group">
                    <p className="whitespace-nowrap group-hover:text-blue-600 transition-colors">
                      {format(parseISO(d.dt_txt), "h:mm a")}</p>
                    <div className="relative">
                        <WeatherIcon
                          iconName={getDayOrNightIcon(
                            d.weather[0].icon,
                            d.dt_txt
                          )}
                        />
                    </div>
                    <p className="font-bold group-hover:text-blue-600 transition-colors">{convertKelvinToCelsius(d?.main.temp ?? 0)}°</p>  
                  </div>
                  
                ))}
              </div>
            </Container>
          </div>
                        <div className="flex gap-4">

                {/* Left */}

                <Container className="w-fit justify-center flex-col px-4 items-center group">
                  <p className="capitalize text-center font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">{firstData?.weather[0].description}</p>
                        <WeatherIcon
                          iconName={getDayOrNightIcon(
                            firstData?.weather[0].icon ?? "",
                            firstData?.dt_txt ?? ""
                          )}
                        />

                </Container>
                <Container className="bg-gradient-to-br from-amber-200 to-yellow-300 px-6 gap-4 justify-between overflow-x-auto"> 
                <WeatherDetails visability={metersToKilometers(firstData?.visibility ?? 10000)} 
                airPressure={`${firstData?.main.pressure} hPa`} 
                humidity={`${firstData?.main.humidity}%`}
                  sunrise={format(
                    fromUnixTime(data?.city.sunrise ?? 1768118546),
                    "H:mm"
                  )}
                  sunset={format(
                    fromUnixTime(data?.city.sunset ?? 1768148030),
                    "H:mm"
                  )}
                  windSpeed={convertWindSpeed(firstData?.wind.speed ?? 6.19)}
                
                />
                </Container>
                {/* Right */}
              </div>
          </section>
          <section className="flex w-full flex-col gap-4">
            {/* 7 days forcast data */}
            <div className="flex items-center gap-3">
              <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">7-Day Forecast</p>
              <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent"></div>
            </div>
            
              {firstDataForEachDate.map((d, i) => (
                <ForecastWeatherDetail
                  key={i}
                  description={d?.weather[0].description ?? ""}
                  weatehrIcon={d?.weather[0].icon ?? "01d"}
                  date={d ? format(parseISO(d.dt_txt), "dd.MM") : ""}
                  day={d ? format(parseISO(d.dt_txt), "dd.MM") : "EEEE"}
                  feels_like={d?.main.feels_like ?? 0}
                  temp={d?.main.temp ?? 0}
                  temp_max={d?.main.temp_max ?? 0}
                  temp_min={d?.main.temp_min ?? 0}
                  airPressure={`${d?.main.pressure} hPa `}
                  humidity={`${d?.main.humidity}% `}
                  sunrise={format(
                    fromUnixTime(data?.city.sunrise ?? 1768118546),
                    "H:mm"
                  )}
                  sunset={format(
                    fromUnixTime(data?.city.sunset ?? 1768148030),
                    "H:mm"
                  )}
                  visability={`${metersToKilometers(d?.visibility ?? 10000)} `}
                  windSpeed={`${convertWindSpeed(d?.wind.speed ?? 6.19)} `}
                />
              ))}

          </section>
      </main>
    </div>
  );
}
