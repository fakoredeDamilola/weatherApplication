import { Box, Container } from "@mui/material";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { HomeTabs, Tab } from "./styles";
import TodayData from "./TodayData";
import HourlyData from "./HourlyData";
import WeeklyData from "./WeeklyData";
import MonthlyData from "./MonthlyData";
import {
  categorizeDataByTime,
  createArrayWithOneObjectPerDay,
  createArrayWithTimes,
  generateTimeZones,
  getFiveDayWeatherForecast,
  getUserLocation,
  getWeatherDetails,
} from "../functions/utilFunction";
import { languages } from "../utils/constants";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { WeatherData } from "../interface/IWeatherData";

const HomeCountry = () => {
  const tabs = {
    today: "Today",
    hourly: "Hourly",
    // "10 Days": "10 Days",
    weekly: "Weekly",
    monthly: "Monthly",
  };
  const [selectedTab, setSelectedTab] = useState(tabs.today);
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [weatherDetails, setWeatherDetails] = useState<null | any>(null);
  const [categorizedWeather, setCategorizedWeather] = useState<
    WeatherData[] | any
  >(null);
  const [fiveDaysWeather, setFiveDaysWeather] = useState<null | any>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const [fiveObjectsArray, setFiveObjectsArray] = useState<WeatherData[]>([]);
  const [fiveObjectsTimeArray, setFiveObjectsTimeArray] = useState<
    WeatherData[]
  >([]);
  const [timeZone, setTimeZone] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  // const { t, i18n } = useTranslation();

  const openSelectedTab = (tab: string) => {
    setSelectedTab(tabs[tab as keyof typeof tabs]);
  };

  useEffect(() => {
    console.log(searchParams.get("lat"), "lathekjekjk");
    getDataFromLocalStorage();
    getUserLocation()
      .then((location) => {
        setUserLocation(location);
        getWeatherInfo(location.latitude, location.longitude);
      })
      .catch((error) => {
        console.error("Failed to get user location:", error);
      });
  }, [searchParams]);

  const getDataFromLocalStorage = () => {
    const data = window.localStorage.getItem("weatherDetails");
    if (data) {
      console.log({ data: JSON.parse(data) });
      setWeatherDetails(JSON.parse(data).weatherDetails);
    }
  };

  function findKeyByValue(obj: any, value: string) {
    for (const key in obj) {
      if (obj[key].some((val: any) => val.endsWith(`${value}`))) {
        return key;
      }
    }
  }

  const getWeatherInfo = async (latitude: number, longitude: number) => {
    const weatherInfo = await getWeatherDetails(latitude, longitude);

    const allTimeZones = generateTimeZones();
    console.log({ weatherInfo });
    setTimeZone(allTimeZones[weatherInfo?.timezone]);
    const lng = weatherInfo?.sys?.country;
    const lngs = lng ? findKeyByValue(languages, lng) : "EN";

    const userLanguage = navigator.language.split("-")[0];
    const queryParams = new URLSearchParams(window.location.search);
    const language = lngs?.toLowerCase();
    queryParams.set("lng", lngs ?? "en");
    navigate({ search: queryParams.toString() });
    // i18n.changeLanguage(language);
    console.log({ weatherInfo });
    setWeatherDetails(weatherInfo);

    const fiveDaysWeatherInfo = await getFiveDayWeatherForecast(
      latitude,
      longitude
    );
    console.log({ fiveDaysWeatherInfo });
    const fiveDaysData = fiveDaysWeatherInfo.list;
    setFiveDaysWeather(fiveDaysData);
    if (fiveDaysData) {
      const categorizedWeather = categorizeDataByTime(fiveDaysData);
      const fiveObjectsArray = createArrayWithTimes(fiveDaysData);
      const fiveObjectsTimeArray = createArrayWithOneObjectPerDay(fiveDaysData);
      setFiveObjectsTimeArray(fiveObjectsTimeArray);
      setFiveObjectsArray(fiveObjectsArray);
      console.log({ fiveObjectsTimeArray });
      setCategorizedWeather(categorizedWeather);
    }
    if (fiveDaysWeatherInfo) {
      localStorage.setItem(
        "fiveDaysWeather",
        JSON.stringify(fiveDaysWeatherInfo)
      );
    }

    const ln = localStorage.getItem("language");
    if (!ln) {
      localStorage.setItem("language", userLanguage);
    }
  };

  return (
    <div>
      <Header country={weatherDetails?.sys?.country} />
      <Box mt="71px">
        <HomeTabs tabs={4}>
          {Object.keys(tabs).map((tab) => {
            return (
              <Tab
                key={tab}
                selected={selectedTab === tabs[tab as keyof typeof tabs]}
                onClick={() => openSelectedTab(tab)}
              >
                {tabs[tab as keyof typeof tabs]}
              </Tab>
            );
          })}
        </HomeTabs>
      </Box>
      <Container>
        {selectedTab === "Today" && (
          <Box my="30px">
            <TodayData
              weatherDetails={weatherDetails}
              timezone={timeZone}
              fiveDaysWeatherInfo={categorizedWeather}
              fiveObjectsArray={fiveObjectsArray}
              fiveObjectsTimeArray={fiveObjectsTimeArray}
            />
          </Box>
        )}
        {selectedTab === "Hourly" && <HourlyData />}
        {selectedTab === "Weekly" && <WeeklyData />}
        {selectedTab === "Monthly" && <MonthlyData />}
      </Container>
    </div>
  );
};

export default HomeCountry;