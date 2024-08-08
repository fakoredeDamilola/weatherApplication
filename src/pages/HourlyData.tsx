import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import {
  convertUnixTimestampToReadableTime,
  getWeatherIconURL,
} from "../functions/utilFunction";
import { FaTemperatureHigh, FaWind } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState } from "react";
import { WiHumidity } from "react-icons/wi";
import { IoIosCloud } from "react-icons/io";
import { FaWater } from "react-icons/fa";
import { theme } from "../utils/theme";

const HourlyData = ({
  weatherDetails,
  fiveObjectsTimeArray,
}: {
  weatherDetails: any;
  fiveObjectsTimeArray: any;
}) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openWeatherInfo, setOpenWeatherInfo] = useState("data");
  const openWeatherDetails = (tempKey: string) => {
    if (tempKey || openWeatherInfo !== tempKey) {
      setOpenWeatherInfo(tempKey);
    } else {
      setOpenWeatherInfo("data");
    }
  };
  return (
    <Box>
      <Stack>
        <Box
          width={isMobile ? "100%" : "80%"}
          sx={{
            backgroundColor: "white",
            borderRadius: "10px",
            boxSizing: "border-box",
            color: "black",
          }}
        >
          <Box sx={{ padding: "20px" }}>
            <div>
              <span
                style={{
                  fontSize: isMobile ? "20px" : "27px",
                  fontWeight: "800",
                }}
              >
                Hourly Weather
              </span>{" "}
              - <span>{weatherDetails?.name}</span>
            </div>
            <div style={{ fontSize: "16px", margin: "10px 0" }}>
              <span>As of</span>{" "}
              <span>
                {convertUnixTimestampToReadableTime(weatherDetails?.dt)}
              </span>
            </div>
          </Box>
          <Box sx={{ borderTop: "1px solid black" }}>
            {fiveObjectsTimeArray?.map((data: any, index: number) => {
              console.log({ data });
              const dataInfo = fiveObjectsTimeArray[index];
              return (
                <Box key={index}>
                  <Box
                    sx={{
                      borderBottom: "1px solid black",
                      padding: "15px",
                      fontWeight: "900",
                    }}
                  >
                    {fiveObjectsTimeArray[index][1]}
                  </Box>
                  {dataInfo[0]?.map((dataValue: any, key: number) => {
                    const singleItem = dataValue;
                    const tempKey = `temp-${index}${key}`;

                    return (
                      <Box>
                        <Stack
                          key={key}
                          direction="row"
                          justifyContent={"space-between"}
                          borderBottom="1px solid black"
                          padding=" 15px"
                        >
                          <Stack
                            direction="row"
                            justifyContent={"space-between"}
                            width={isMobile ? "65%" : "50%"}
                            gap="10px"
                          >
                            <Stack
                              width="50%"
                              direction="row"
                              justifyContent={"space-between"}
                            >
                              <Box>
                                {singleItem?.dt_txt?.split(" ")[1].slice(0, 5)}
                              </Box>
                              <Box sx={{ fontWeight: "800" }}>
                                {singleItem?.main?.temp}&deg;
                              </Box>
                            </Stack>
                            <Stack
                              width="50%"
                              direction="row"
                              justifyContent={"space-between"}
                            >
                              <Box marginTop="-10px" marginBottom="-15px">
                                <img
                                  src={getWeatherIconURL(
                                    singleItem?.weather[0]?.icon
                                  )}
                                  alt=""
                                  width={"40px"}
                                  height={"40px"}
                                  className="weather-img"
                                />
                              </Box>
                              <Box display={isMobile ? "none" : "block"}>
                                {singleItem?.weather[0]?.description}
                              </Box>
                            </Stack>
                          </Stack>
                          <Stack
                            direction="row"
                            width={isMobile ? "40%" : "20%"}
                            justifyContent="space-between"
                          >
                            <Box>
                              <FaWind
                                style={{ fontWeight: "30px", color: "#1b4de4" }}
                              />
                            </Box>
                            <Typography>
                              {singleItem?.wind?.speed} km/h
                            </Typography>
                            {openWeatherInfo === tempKey ? (
                              <IoIosArrowUp
                                style={{
                                  fontWeight: "30px",
                                  marginTop: "5px",
                                  color: "#1b4de4",
                                  cursor: "pointer",
                                }}
                                onClick={() => openWeatherDetails(tempKey)}
                              />
                            ) : (
                              <IoIosArrowDown
                                style={{
                                  fontWeight: "30px",
                                  marginTop: "5px",
                                  color: "#1b4de4",
                                  cursor: "pointer",
                                }}
                                onClick={() => openWeatherDetails(tempKey)}
                              />
                            )}
                          </Stack>
                        </Stack>
                        {openWeatherInfo === tempKey && (
                          <Box
                            border="1px solid #eee"
                            borderRadius="10px"
                            margin="8px auto"
                            width="95%"
                            padding={isMobile ? "10px" : "10px 14px"}
                            boxSizing="border-box"
                          >
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              paddingBottom="5px"
                              borderBottom="1px solid #eee"
                            >
                              <Stack direction="row" gap="10px">
                                <FaTemperatureHigh
                                  fontSize="27px"
                                  style={{
                                    color: "#1b4de4",
                                    marginTop: "12px",
                                  }}
                                />
                                <Box>
                                  <Typography
                                    sx={{ marginTop: "5px" }}
                                    fontSize="14px"
                                  >
                                    Feels Like
                                  </Typography>
                                  <Typography
                                    fontWeight="800"
                                    sx={{ marginTop: "2px", fontSize: "18px" }}
                                  >
                                    {singleItem?.main?.feels_like}
                                  </Typography>
                                </Box>
                              </Stack>
                              <Stack direction="row" gap="20px">
                                <FaWind
                                  style={{
                                    fontWeight: "36px",
                                    color: "#1b4de4",
                                    marginTop: "12px",
                                  }}
                                />
                                <Box>
                                  <Typography
                                    sx={{ marginTop: "5px" }}
                                    fontSize="14px"
                                  >
                                    Wind
                                  </Typography>
                                  <Typography fontWeight="800">
                                    {singleItem?.wind?.speed} km/h
                                  </Typography>
                                </Box>
                              </Stack>
                              <Stack direction="row" gap="20px">
                                <WiHumidity
                                  fontSize="32px"
                                  style={{ marginTop: "12px" }}
                                />
                                <Box>
                                  <Typography
                                    sx={{ marginTop: "5px" }}
                                    fontSize="14px"
                                  >
                                    Humidity
                                  </Typography>
                                  <Typography fontWeight="800">
                                    {singleItem?.main?.humidity} %
                                  </Typography>
                                </Box>
                              </Stack>
                            </Stack>
                            <Stack
                              direction="row"
                              justifyContent="space-around"
                              paddingBottom="5px"
                            >
                              <Stack direction="row" gap="10px">
                                <IoIosCloud
                                  fontSize="27px"
                                  style={{
                                    color: "#1b4de4",
                                    marginTop: "12px",
                                  }}
                                />
                                <Box>
                                  <Typography
                                    sx={{ marginTop: "5px" }}
                                    fontSize="14px"
                                  >
                                    Cloud Cover
                                  </Typography>
                                  <Typography
                                    fontWeight="800"
                                    sx={{ marginTop: "2px", fontSize: "18px" }}
                                  >
                                    {singleItem?.clouds?.all} %
                                  </Typography>
                                </Box>
                              </Stack>
                              <Stack direction="row" gap="20px">
                                <FaWater
                                  style={{
                                    fontWeight: "36px",
                                    color: "#1b4de4",
                                    marginTop: "12px",
                                  }}
                                />
                                <Box>
                                  <Typography
                                    sx={{ marginTop: "5px" }}
                                    fontSize="14px"
                                  >
                                    Sea Level
                                  </Typography>
                                  <Typography fontWeight="800">
                                    {singleItem?.main?.sea_level} m
                                  </Typography>
                                </Box>
                              </Stack>
                              {/* <Stack direction="row" gap="20px">
                                <WiHumidity
                                  fontSize="32px"
                                  style={{ marginTop: "12px" }}
                                />
                                <Box>
                                  <Typography
                                    sx={{ marginTop: "5px" }}
                                    fontSize="14px"
                                  >
                                    Humidity
                                  </Typography>
                                  <Typography fontWeight="800">
                                    {singleItem?.main?.humidity} %
                                  </Typography>
                                </Box>
                              </Stack> */}
                            </Stack>
                          </Box>
                        )}
                      </Box>
                    );
                  })}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default HourlyData;
