import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
import countries from "../constants/countries.json";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ContinentDropdown = ({
  setOpenMenuDropdown,
}: {
  setOpenMenuDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [continentDropdown, setContinentDropdown] = useState(false);
  const [continentCountry, setContinentCountry] = useState<any>([]);
  const [selectedContinent, setSelectedContinent] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const continents = [
    t("africa"),
    t("antarctica"),
    t("asia"),
    t("europe"),
    t("northAmerica"),
    t("oceania"),
    t("southAmerica"),
  ];

  const continentsMap = {
    africa: "Africa",
    antarctica: "Antarctica",
    asia: "Asia",
    europe: "Europe",
    "north america": "North America",
    oceania: "Oceania",
    "south america": "South America",
  };

  const openCountryData = async (country: string) => {
    const getCountryCoord = await axios.get(
      `https://api.geoapify.com/v1/geocode/search?text=${country}&format=json&apiKey=36a3631df8524b4d8071e22842115611`
    );
    setContinentDropdown(false);
    setOpenMenuDropdown(false);
    const response = await getCountryCoord.data.results;
    console.log({ response, getCountryCoord });
    if (response.length > 0) {
      const { lat, lon } = response[0];
      console.log({ lat, lon });
      navigate(`/country?lat=${lat}&long=${lon}`);
    }
  };

  const selectCountries = (continent: string) => {
    setSelectedContinent(continent);
    if (continent === selectedContinent) {
      setContinentDropdown(false);
      setSelectedContinent("");
    } else {
      setContinentDropdown(true);
    }

    const continentCountry =
      countries[
        continentsMap[
          continent.toLowerCase() as keyof typeof continentsMap
        ] as keyof typeof countries
      ];
    console.log(
      { continentCountry, continent },
      continentsMap[
        continent.toLowerCase() as keyof typeof continentsMap
      ] as keyof typeof countries
    );
    setContinentCountry(continentCountry);
  };
  return (
    <Box padding="20px">
      {continents.map((continent) => (
        <Box>
          <Stack
            color="#020202"
            justifyContent="space-between"
            alignItems="center"
            sx={{ cursor: "pointer" }}
            fontWeight="900"
            my="15px"
            flexDirection="row"
            borderBottom="1px solid black"
            onClick={() => selectCountries(continent)}
          >
            <Typography
              sx={{
                fontWeight: "900",
                fontSize: "20px",
                "&:hover": { color: "#1b4de4" },
              }}
            >
              {continent.toUpperCase()}
            </Typography>
            <RiArrowDropUpLine
              fontSize="29px"
              style={{
                display: selectedContinent === continent ? "block" : "none",
              }}
            />

            <RiArrowDropDownLine
              fontSize="29px"
              style={{
                display: selectedContinent !== continent ? "block" : "none",
              }}
            />
          </Stack>
          <Box>
            {continentDropdown && selectedContinent === continent && (
              <Box
                sx={{
                  cursor: "pointer",
                  display: "grid",
                  gridTemplateColumns: "repeat(3,1fr)",
                }}
              >
                {continentCountry.map((country: any) => (
                  <Box
                    color="#020202"
                    onClick={() => openCountryData(country.name)}
                  >
                    <Typography
                      my="10px"
                      sx={{
                        fontWeight: "500",
                        fontSize: "16px",

                        "&:hover": { color: "#1b4de4" },
                      }}
                    >
                      {country.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ContinentDropdown;
