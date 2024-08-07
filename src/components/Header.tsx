import { forwardRef, useEffect, useRef, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, List, ListItem, ListItemText, Stack } from "@mui/material";
import { Cancel, Search } from "@mui/icons-material";
import { FaCaretUp, FaGlobeAmericas } from "react-icons/fa";
import { CustomInput } from "./styles";
import { FaCaretDown } from "react-icons/fa6";
import ContinentDropdown from "./ContinentDropdown";
import useDebounce from "../hooks/useDebounce";
import axios from "axios";

const Header = ({ country }: { country: string }) => {
  const { t } = useTranslation();
  // const [, setAnchorEl] = React.useState(null);

  const [openMenuDropdown, setOpenMenuDropdown] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [SearchResult, setSearchResult] = useState([]);
  const ref = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search, 300);

  useEffect(() => {
    if (search.length > 2) {
      getUserSuggestionLocation(debouncedSearchTerm);
    } else {
      setShowResult(false);
    }
  }, [debouncedSearchTerm]);

  const getUserSuggestionLocation = async (search: string) => {
    const format = "json";
    const addressDetails = 1;
    const limit = 10;
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=${format}&q=${search}&addressdetails=${addressDetails}&limit=${limit}`
      );
      console.log({ response });
      if (response.data) {
        setSearchResult(response.data);
        setShowResult(true);
      } else {
        setShowResult(false);
      }

      return response;
    } catch (error) {
      console.log("places auto complete error", error);
      return error;
    }
  };

  const handleResultCLick = (lat: string, long: string) => {
    console.log({ lat, long });
    navigate(`/country?lat=${lat}&long=${long}`);
    setShowResult(false);
    setSearch("");
  };

  const SearchResults = forwardRef<HTMLDivElement, { data: any[] }>(
    function SearchResults({ data }, ref) {
      return (
        <Box
          sx={{
            background: "#8A6552",
            borderRadius: "10px",
            color: "#fff",
            boxShadow: "0px 1px 2px black",
            padding: "10px",
            top: "40px",
            width: "90%",
            left: "4%",
            height: "auto",
            maxHeight: "300px",
            overflowY: "scroll",
          }}
          position="absolute"
          width="100%"
          className="places-search-result"
          aria-label="search results"
          ref={ref}
        >
          {data && (
            <List className="py-2">
              {data.map((data, index) => (
                <ListItem
                  key={index}
                  onClick={() => handleResultCLick(data.lat, data.lon)}
                  sx={{
                    ":hover": { background: "#6E5142" },
                    cursor: "pointer",
                  }}
                >
                  <ListItemText primary={data.display_name} />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      );
    }
  );

  const navigate = useNavigate();
  const toolBarStyle = {
    display: "flex",
    justifyContent: "space-between",
    // background: "rgb(2,0,36)",
    background: "#FFE0B5",
    boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25)`,
    height: "69px",
  };

  return (
    <Box>
      <AppBar>
        <Toolbar sx={toolBarStyle}>
          <Box onClick={() => navigate("/")} sx={{ cursor: "pointer" }}>
            {t("logo")}
          </Box>

          <Stack
            flexDirection="row"
            alignItems="center"
            gap="20px"
            width="50%"
            height="50px"
          >
            <div
              style={{
                display: "block",
                width: "100%",
                position: "relative",
                margin: "auto",
              }}
            >
              <div>
                <Search
                  sx={{
                    position: "absolute",
                    color: "rgba(0, 0, 0, 0.25)",
                    top: "15px",
                    left: "10px",
                  }}
                />
                <CustomInput
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Cancel
                  sx={{
                    position: "absolute",
                    color: "rgba(0, 0, 0, 0.25)",
                    top: "15px",
                    right: "10px",
                    cursor: "pointer",
                    display: search ? "block" : "none",
                  }}
                  onClick={() => setSearch("")}
                />
              </div>{" "}
              {showResult && <SearchResults data={SearchResult} ref={ref} />}
            </div>
          </Stack>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => setOpenMenuDropdown(!openMenuDropdown)}
          >
            <FaGlobeAmericas style={{ marginRight: "5px" }} fontSize="32px" />{" "}
            {country} | °C{" "}
            {openMenuDropdown ? (
              <FaCaretUp
                style={{ marginLeft: "15px", marginBottom: "5px" }}
                fontSize="32px"
              />
            ) : (
              <FaCaretDown
                style={{ marginLeft: "15px", marginBottom: "5px" }}
                fontSize="32px"
              />
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          bgcolor: "#CCB391",

          width: "100%",
          padding: "20px",
          boxSizing: "border-box",
          position: "fixed",
          top: "70px",
          display: openMenuDropdown ? "block" : "none",
          left: "0",
          borderRadius: "0 0 10px 10px",
          margin: "auto",
          overflowY: "scroll",
          height: "60vh",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          paddingBottom: "40px",
        }}
      >
        <ContinentDropdown setOpenMenuDropdown={setOpenMenuDropdown} />
      </Box>
    </Box>
  );
};

export default Header;
