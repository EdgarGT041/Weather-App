'use client'
import Navbar from "@/components/Navbar";
import Image from "next/image";
import axios from "axios";

import { useQuery,QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { parseISO, format } from "date-fns";
import Container from "@/components/Container";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
import WeatherIcon from "@/components/WeatherIcon";
import { get } from "http";
import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";


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
      <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
        <Weather />
      </div>
    </QueryClientProvider>
  );
}

function Weather() {
  const { data, isLoading, error } = useQuery<WeatherData>({
    queryKey: ['weatherData'],
    queryFn: async () => {
      const { data } = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/forecast?q=London&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
      );
      return data;
    }
  });
  const firstData = data?.list[0];

  console.log('data', data);

  if (isLoading)
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce">Loading...</p>
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
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
          {/* today data */}
        <section className="space-y-4">
          <div className="space-y-2">
            <h2 className="flex gap-1 text-2xl items-end">
              <p>{format(parseISO(firstData?.dt_txt ?? ''),  "EEEE")}</p>
              <p className="text-lg">({format(parseISO(firstData?.dt_txt ?? ''),  "dd.MM.yyyy")})</p>
            </h2>
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
                  <div key={index} className=" flex flex-col justify-between gap-2 items-center text-xs font-semibold">
                    <p className="whitespace-nowrap">
                      {format(parseISO(d.dt_txt), "h:mm a")}</p>
                    <p>
                        <WeatherIcon
                          iconName={getDayOrNightIcon(
                            d.weather[0].icon,
                            d.dt_txt
                          )}
                        />
                         {convertKelvinToCelsius(d?.main.temp ?? 0)}°
                      </p>  
                  </div>
                  
                ))}
              </div>
            </Container>
          </div>
          </section>
      </main>
    </div>
  );
}
