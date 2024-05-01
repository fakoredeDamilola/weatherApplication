import React from "react";
import { WeatherData } from "../interface/IWeatherData";
import { useTranslation } from "react-i18next";
import { MdDewPoint } from "react-icons/md";
import { FaTemperatureHigh } from "react-icons/fa";
import { CgCompressV } from "react-icons/cg";
import { IoCloudSharp } from "react-icons/io5";
import { MdVisibility } from "react-icons/md";
import { FaWind } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { Box, Stack } from "@mui/material";

const WeatherToday = ({ weatherData }: { weatherData: WeatherData }) => {
  const {
    main: { temp, temp_min, temp_max, humidity, pressure, feels_like },
    wind: { speed },
    clouds: { all },
    visibility,
  } = weatherData;
  const { t } = useTranslation();
  return (
    <div className="p-3" style={{ boxSizing: "border-box", color: "#2b2b2b" }}>
      <p style={{ fontSize: "18px", fontWeight: "700" }}>
        Weather Today in {weatherData?.name}
      </p>
      <p style={{ fontSize: "18px" }}>{t("feels")}</p>
      <p style={{ fontSize: "34px", fontWeight: "800" }}>{feels_like}°</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr",
          padding: "13px 0",
          gap: "10px",
        }}
      >
        <KeyValue
          label={t("hl")}
          value={`${temp_max}°/${temp_min}°`}
          icon={
            <FaTemperatureHigh fontSize="32px" style={{ marginTop: "15px" }} />
          }
        />
        <KeyValue
          label={t("wind")}
          value={`${speed} ${t("speedUnit")}`}
          icon={<FaWind fontSize="32px" style={{ marginTop: "15px" }} />}
        />
        <KeyValue
          label={t("humidity")}
          value={`${humidity}%`}
          icon={<WiHumidity fontSize="32px" style={{ marginTop: "15px" }} />}
        />
        <KeyValue
          label={t("dPoint")}
          value={`${temp}°`}
          icon={<MdDewPoint fontSize="32px" style={{ marginTop: "15px" }} />}
        />
        <KeyValue
          label={t("pressure")}
          value={`${pressure} ${t("mb")}`}
          icon={<CgCompressV fontSize="32px" style={{ marginTop: "15px" }} />}
        />
        <KeyValue
          label={t("visibility")}
          value={`${visibility} ${t("km")}`}
          icon={<MdVisibility fontSize="32px" style={{ marginTop: "15px" }} />}
        />
        <KeyValue
          label={t("clouds")}
          value={`${all}%`}
          icon={<IoCloudSharp fontSize="32px" style={{ marginTop: "15px" }} />}
        />
      </div>
      {/* Add other key-value pairs as needed */}
    </div>
  );
};

const KeyValue = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: any;
}) => (
  <div
    style={{
      padding: "5px 0",
      borderBottom: "1px solid black",
      display: "flex",
      justifyContent: "space-between",
    }}
  >
    <Stack direction="row">
      {icon}
      <p style={{ fontWeight: "800", fontSize: "18px", marginLeft: "10px" }}>
        {label}
      </p>
    </Stack>

    <p style={{ fontSize: "15px", marginTop: "20px" }}>{value}</p>
  </div>
);

export default WeatherToday;
