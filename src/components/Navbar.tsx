/** @format */
"use client";

import React from "react";
import { MdOutlineLocationOn, MdWbSunny } from "react-icons/md";
import { MdMyLocation } from "react-icons/md";
import SearchBox from "./SearchBox";
import { useState } from "react";
import axios from "axios";
import { loadingCityAtom, placeAtom } from "@/app/atom";
import { useAtom } from "jotai";

type Props = { location?: string };

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

export default function Navbar({ location }: Props) {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  //
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [place, setPlace] = useAtom(placeAtom);
  const [_, setLoadingCity] = useAtom(loadingCityAtom);

  async function handleInputChange(value: string) {
    setCity(value);
    if (value.length >= 3) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${API_KEY}`
        );

        const suggestions = response.data.list.map((item: any) => item.name);
        setSuggestions(suggestions);
        setError("");
        setShowSuggestions(true);
      } catch (error) {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }

  function handleSuggestionClick(value: string) {
    setCity(value);
    setShowSuggestions(false);
  }

  function handleSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
    setLoadingCity(true);
    e.preventDefault();
    if (suggestions.length == 0) {
      setError("Location not found");
      setLoadingCity(false);
    } else {
      setError("");
      setTimeout(() => {
        setLoadingCity(false);
        setPlace(city);
        setShowSuggestions(false);
      }, 500);
    }
  }

  function handleCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (postiion) => {
        const { latitude, longitude } = postiion.coords;
        try {
          setLoadingCity(true);
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
          );
          setTimeout(() => {
            setLoadingCity(false);
            setPlace(response.data.name);
          }, 500);
        } catch (error) {
          setLoadingCity(false);
        }
      });
    }
  }
  return (
    <>
      <nav className="sticky top-0 left-0 z-50 bg-white/90 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="h-[85px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
          <div className="flex items-center justify-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
              <MdWbSunny className="relative text-4xl text-yellow-400 group-hover:text-yellow-300 transition-all duration-300 drop-shadow-lg group-hover:scale-110 group-hover:rotate-12" />
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:via-indigo-500 group-hover:to-purple-500 transition-all duration-300">
              Weather
            </h2>
          </div>
          {/*  */}
          <section className="flex gap-3 items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              <MdMyLocation
                title="Tu ubicación actual"
                onClick={handleCurrentLocation}
                className="relative text-3xl text-gray-500 hover:text-blue-600 hover:scale-110 cursor-pointer transition-all duration-300 drop-shadow-md"
              />
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50/50 to-purple-50/50 px-3 py-2 rounded-xl border border-blue-100/30 shadow-sm">
              <MdOutlineLocationOn className="text-2xl text-blue-600" />
              <p className="text-gray-700 text-sm font-semibold"> {location || "Loading..."} </p>
            </div>
            <div className="h-8 w-px bg-gradient-to-b from-blue-200 to-purple-200 mx-1 hidden md:block"></div>
            <div className="relative hidden md:flex">
              {/* SearchBox */}

              <SearchBox
                value={city}
                onSubmit={handleSubmitSearch}
                onChange={(e) => handleInputChange(e.target.value)}
              />
              <SuggestionBox
                {...{
                  showSuggestions,
                  suggestions,
                  handleSuggestionClick,
                  error
                }}
              />
            </div>
          </section>
        </div>
      </nav>
      <section className="flex   max-w-7xl px-3 md:hidden ">
        <div className="relative ">
          {/* SearchBox */}

          <SearchBox
            value={city}
            onSubmit={handleSubmitSearch}
            onChange={(e) => handleInputChange(e.target.value)}
          />
          <SuggestionBox
            {...{
              showSuggestions,
              suggestions,
              handleSuggestionClick,
              error
            }}
          />
        </div>
      </section>
    </>
  );
}

function SuggestionBox({
  showSuggestions,
  suggestions,
  handleSuggestionClick,
  error
}: {
  showSuggestions: boolean;
  suggestions: string[];
  handleSuggestionClick: (item: string) => void;
  error: string;
}) {
  return (
    <>
      {((showSuggestions && suggestions.length > 1) || error) && (
        <ul className="mb-4 bg-white/95 backdrop-blur-md absolute border top-[48px] left-0 border-blue-200/50 rounded-xl min-w-[200px] flex flex-col gap-0.5 py-2 px-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          {error && suggestions.length < 1 && (
            <li className="text-red-500 p-2.5 text-sm font-medium bg-red-50/50 rounded-lg"> 
              <span className="flex items-center gap-2">
                <span className="text-lg">⚠️</span>
                {error}
              </span>
            </li>
          )}
          {suggestions.map((item, i) => (
            <li
              key={i}
              onClick={() => handleSuggestionClick(item)}
              className="cursor-pointer px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 transition-all duration-200 font-medium text-sm flex items-center gap-2 group"
            >
              <span className="text-blue-400 group-hover:text-blue-600 transition-colors">📍</span>
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}