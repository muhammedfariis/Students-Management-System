"use client";

import * as React from "react";
import { cn } from "../../../lib/utils/utils";

export const LogoSlider = ({
  logos = [],
  speed = 60,
  direction = "left",
  showBlur = true,
  blurLayers = 8,
  blurIntensity = 1,
  pauseOnHover = false,
}) => {
  return (
    <div
      className={cn("logo-slider w-full overflow-hidden")}
      style={
        {
          "--speed": `${speed}`,
          "--count": `${logos?.length ?? 0}`,
          "--blurs": `${blurLayers}`,
          "--blur": `${blurIntensity}`,
        } as React.CSSProperties
      }
    >
      <div
        className="logo-slider__container relative w-full min-h-[80px] grid"
        data-direction={direction}
        data-pause-on-hover={pauseOnHover}
      >
        {showBlur && (
          <div className="logo-slider__blur logo-slider__blur--left absolute inset-y-0 left-0 w-1/4 z-10 pointer-events-none rotate-180">
            {Array.from({ length: blurLayers }).map((_, i) => (
              <div
                key={i}
                className="absolute inset-0"
                style={{ "--blur-index": `${i}` } as React.CSSProperties}
              />
            ))}
          </div>
        )}

        <ul className="logo-slider__track flex items-center h-full w-fit m-0 p-0 list-none">
          {logos?.map((logo, index) => (
            <li
              key={index}
              className="logo-slider__item h-4/5 w-[120px] sm:w-[140px] lg:w-[160px] aspect-video grid place-items-center shrink-0"
              style={{ "--item-index": `${index}` } as React.CSSProperties}
            >
              <div className="w-full h-full flex items-center justify-center">
                {logo}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LogoSlider;
