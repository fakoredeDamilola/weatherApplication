import { Box, Stack } from "@mui/material";
import {
  convertUnixTimestampToReadableTime,
  getWeatherIconURL,
} from "../functions/utilFunction";
import { FaWind } from "react-icons/fa";

const HourlyData = ({
  weatherDetails,
  fiveObjectsTimeArray,
}: {
  weatherDetails: any;
  fiveObjectsTimeArray: any;
}) => {
  console.log({ fiveObjectsTimeArray });
  return (
    <Box>
      <Stack>
        <Box
          width="80%"
          sx={{
            backgroundColor: "white",
            borderRadius: "10px",
            boxSizing: "border-box",
            color: "black",
          }}
        >
          <Box sx={{ padding: "20px" }}>
            <div>
              <span style={{ fontSize: "27px", fontWeight: "800" }}>
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
                  {dataInfo[0]?.map((dataValue: any) => {
                    const singleItem = dataValue;
                    return (
                      <Stack
                        key={index}
                        direction="row"
                        justifyContent={"space-between"}
                        borderBottom="1px solid black"
                        padding=" 15px"
                      >
                        <Stack
                          direction="row"
                          justifyContent={"space-between"}
                          width="50%"
                          gap="10px"
                        >
                          <Stack
                            width="50%"
                            direction="row"
                            justifyContent={"space-between"}
                            sx={{ backgroundColor: "red" }}
                          >
                            <Box>{singleItem?.dt_txt?.split(" ")[1]}</Box>
                            <Box sx={{ fontWeight: "800" }}>
                              {singleItem?.main?.temp}&deg;
                            </Box>
                          </Stack>
                          <Stack
                            width="50%"
                            direction="row"
                            justifyContent={"space-between"}
                            sx={{ backgroundColor: "red" }}
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
                            <Box>{singleItem?.weather[0]?.description}</Box>
                          </Stack>
                        </Stack>
                        <Stack>
                          <Box>
                            <FaWind style={{ fontWeight: "30px" }} />
                          </Box>
                        </Stack>
                      </Stack>
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
