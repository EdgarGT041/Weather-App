/** @format */

import React from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";

type Props = {};

export default function WeatherIcon(
  props: React.HTMLProps<HTMLDivElement> & { iconName: string }
) {
  return (
    <div title={props.iconName} {...props} className={cn("relative h-20 w-20 transition-all duration-300")}>
      <Image
        width={100}
        height={100}
        alt="weather-icon"
        className="absolute h-full w-full drop-shadow-lg"
        src={`https://openweathermap.org/img/wn/${props.iconName}@4x.png`}
      />
    </div>
  );
}