import React, { useEffect } from "react";
import "./app.scss";
import SidePanel from "./Components/SidePanel";
import { LocationProvider } from "./Context/LocationContext";
import { CurrentWeatherProvider } from "./Context/CurrentWeatherContext";
import { DailyWeatherProvider } from "./Context/DailyWeatherContext";
import { WmoProvider } from "./Context/WmoContext";
import LineChart from "./Components/LineChart";
import MainPanel from "./Components/MainPanel";
import { HourlyWeatherProvider } from "./Context/HourlyWeatherContext";

function Weatherdashboard() {
  return (
    <div className="wcontainer">
      <LocationProvider>
        <CurrentWeatherProvider>
          <DailyWeatherProvider>
            <HourlyWeatherProvider>
            <WmoProvider>
              <SidePanel/>
            <MainPanel />
          </WmoProvider>
          </HourlyWeatherProvider>
          </DailyWeatherProvider>
        </CurrentWeatherProvider>
      </LocationProvider>

    </div>
  );
}

export default Weatherdashboard;
