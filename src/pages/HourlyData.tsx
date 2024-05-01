import { Box, Stack, Typography } from "@mui/material";
import { convertUnixTimestampToReadableTime } from "../functions/utilFunction";

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
            padding: "20px",
          }}
        >
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
          <Box>
            {fiveObjectsTimeArray?.map((data: any, index: number) => (
              <Box>
                <Box sx={{ border: "1px solid black" }}></Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default HourlyData;
