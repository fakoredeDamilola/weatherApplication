import { Box, Stack, Typography } from "@mui/material";
import {
  convertUnixTimestampToReadableDateTime,
  getWeatherIconURL,
} from "../functions/utilFunction";
import WeatherToday from "../components/WeatherToday";
import { WeatherData } from "../interface/IWeatherData";

const TodayData = ({
  weatherDetails,
  timezone,
  fiveDaysWeatherInfo,
  fiveObjectsArray,
  fiveObjectsTimeArray,
}: {
  weatherDetails: any;
  timezone: string;
  fiveDaysWeatherInfo: any;
  fiveObjectsArray: WeatherData[];
  fiveObjectsTimeArray: WeatherData[];
}) => {
  console.log({ fiveObjectsArray, fiveDaysWeatherInfo, fiveObjectsTimeArray });
  return (
    <Box>
      <Stack>
        <Box
          width="80%"
          sx={{
            backgroundImage: 'url("/thunder.jpeg")',
            borderRadius: "10px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              background: "rgba(0,0,0,0.4)",
              padding: "10px 14px",
              color: "#FFF2DC",
            }}
            className="px-2 py-2"
          >
            <div style={{ fontSize: "18px", color: "#FFF2DC" }}>
              {`${weatherDetails?.name} ${weatherDetails?.sys?.country}`} As Of{" "}
              <span style={{ fontWeight: "500", fontSize: "13px" }}>
                {convertUnixTimestampToReadableDateTime(weatherDetails?.dt)}{" "}
              </span>
              {timezone}
            </div>

            <div>
              <small style={{ fontSize: "12px", color: "#FFF2DC" }}>
                {new Date(weatherDetails?.dt * 1000).toTimeString()}{" "}
              </small>
            </div>
          </div>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ padding: "20px 15px" }}
          >
            <div>
              <div>
                <div
                  style={{
                    fontSize: "5rem",
                    fontWeight: "900",
                    color: "#FFF2DC",
                  }}
                >
                  {weatherDetails?.main?.temp}&deg;
                </div>
                <div
                  className=""
                  style={{
                    fontSize: "22px",
                    fontWeight: "700",
                    color: "#FFF2DC",
                  }}
                >
                  {weatherDetails?.weather[0]?.description}
                </div>
              </div>
            </div>
            <div>
              <img
                src={getWeatherIconURL(weatherDetails?.weather[0]?.icon)}
                alt=""
                width={"120px"}
                height={"120px"}
                className="weather-img"
              />
            </div>
          </Stack>
        </Box>
        <Box width="80%">
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "25px",
            }}
            my="20px"
            boxSizing={"border-box"}
          >
            <Typography fontSize="22px" fontWeight="500" color="black">
              Today's Forecast for {weatherDetails?.name}
            </Typography>
            {fiveDaysWeatherInfo?.morning && (
              <Stack
                sx={{ color: "#383838" }}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box
                  fontSize="24px"
                  fontWeight={
                    fiveDaysWeatherInfo?.morning?.currentSelected
                      ? "900"
                      : "500"
                  }
                >
                  {fiveDaysWeatherInfo?.morning.time}
                </Box>
                <Box color="#1b4de4" fontSize="2.25rem">
                  {fiveDaysWeatherInfo?.morning.main.temp}
                </Box>
                <Box>
                  <img
                    src={getWeatherIconURL(
                      fiveDaysWeatherInfo?.morning.weather[0].icon
                    )}
                  />
                </Box>
              </Stack>
            )}
            {fiveDaysWeatherInfo?.afternoon && (
              <Stack
                sx={{ color: "#383838" }}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box
                  fontSize="24px"
                  fontWeight={
                    fiveDaysWeatherInfo?.afternoon?.currentSelected
                      ? "900"
                      : "500"
                  }
                >
                  {fiveDaysWeatherInfo?.afternoon.time}
                </Box>
                <Box color="#1b4de4" fontSize="2.25rem">
                  {fiveDaysWeatherInfo?.afternoon.main.temp}
                </Box>
                <Box>
                  <img
                    src={getWeatherIconURL(
                      fiveDaysWeatherInfo?.afternoon.weather[0].icon
                    )}
                  />
                </Box>
              </Stack>
            )}
            {fiveDaysWeatherInfo?.evening && (
              <Stack
                sx={{ color: "#383838" }}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box
                  fontSize="24px"
                  fontWeight={
                    fiveDaysWeatherInfo?.evening?.currentSelected
                      ? "900"
                      : "500"
                  }
                >
                  {fiveDaysWeatherInfo?.evening.time}
                </Box>
                <Box color="#1b4de4" fontSize="2.25rem">
                  {fiveDaysWeatherInfo?.evening.main.temp}
                </Box>
                <Box>
                  <img
                    src={getWeatherIconURL(
                      fiveDaysWeatherInfo?.evening.weather[0].icon
                    )}
                  />
                </Box>
              </Stack>
            )}
            {fiveDaysWeatherInfo?.overnight && (
              <Stack
                sx={{ color: "#383838" }}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box
                  fontSize="24px"
                  fontWeight={
                    fiveDaysWeatherInfo?.overnight?.currentSelected
                      ? "900"
                      : "500"
                  }
                >
                  {fiveDaysWeatherInfo?.overnight.time}
                </Box>
                <Box color="#1b4de4" fontSize="2.25rem">
                  {fiveDaysWeatherInfo?.overnight.main.temp}
                </Box>
                <Box>
                  <img
                    src={getWeatherIconURL(
                      fiveDaysWeatherInfo?.overnight.weather[0].icon
                    )}
                  />
                </Box>
              </Stack>
            )}
          </Box>
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "25px",
            }}
            my="20px"
            boxSizing={"border-box"}
          >
            {weatherDetails && <WeatherToday weatherData={weatherDetails} />}
          </Box>
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "25px",
            }}
            my="20px"
            boxSizing={"border-box"}
          >
            <Typography fontSize="22px" fontWeight="500" color="#121212">
              Hourly Forecast
            </Typography>

            {fiveObjectsArray && (
              <Box padding="10px">
                {fiveObjectsArray?.map((item: any) => (
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    borderBottom="1px solid #e0e0e0"
                    padding="10px 20px"
                    color="#212121"
                  >
                    <Typography
                      fontSize="22px"
                      fontWeight={item.now === "now" ? "900" : "500"}
                    >
                      {item.now}
                    </Typography>
                    <Typography
                      fontWeight={item.now === "now" ? "900" : "500"}
                      color="#1b4de4"
                      fontSize="25px"
                    >
                      {item.main.temp}°
                    </Typography>
                    <Box marginTop="-20px">
                      <img src={getWeatherIconURL(item.weather[0].icon)} />
                    </Box>
                  </Stack>
                ))}
              </Box>
            )}
          </Box>
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "25px",
            }}
            my="20px"
            boxSizing={"border-box"}
          >
            <Typography fontSize="22px" fontWeight="500" color="#121212">
              Daily Forecast
            </Typography>

            {fiveObjectsTimeArray && (
              <Box padding="10px">
                {fiveObjectsTimeArray?.map((item: any) => (
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    borderBottom="1px solid #e0e0e0"
                    padding="10px 20px"
                    color="#212121"
                  >
                    <Typography
                      fontSize="22px"
                      fontWeight={item.now === "now" ? "900" : "500"}
                    >
                      {item.now}
                    </Typography>
                    <Typography
                      fontWeight={item.now === "now" ? "900" : "500"}
                      color="#1b4de4"
                      fontSize="25px"
                    >
                      <span style={{ fontWeight: "700", fontSize: "20px" }}>
                        {item.main.temp_max}°
                      </span>{" "}
                      /{" "}
                      <span style={{ fontWeight: "500", fontSize: "16px" }}>
                        {item.main.temp_min}°
                      </span>
                    </Typography>
                    <Box marginTop="-20px">
                      <img src={getWeatherIconURL(item.weather[0].icon)} />
                    </Box>
                  </Stack>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default TodayData;
