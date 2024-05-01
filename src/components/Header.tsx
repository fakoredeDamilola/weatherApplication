import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, Stack } from "@mui/material";
import { Cancel, Search } from "@mui/icons-material";
import { FaCaretUp, FaGlobeAmericas } from "react-icons/fa";
import { CustomInput } from "./styles";
import { FaCaretDown } from "react-icons/fa6";
import ContinentDropdown from "./ContinentDropdown";

const Header = ({ country }: { country: string }) => {
  const { t } = useTranslation();
  // const [, setAnchorEl] = React.useState(null);

  const [openMenuDropdown, setOpenMenuDropdown] = useState(false);

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const onChangeSearch = (e: any) => {
    setSearch(e.target.value);
  };

  // const selectLn = (lang: any) => {
  //   localStorage.setItem("language", lang);
  //   i18n.changeLanguage(lang);
  //   handleClose();
  // };
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const toolBarStyle = {
    display: "flex",
    justifyContent: "space-between",
    bgcolor: "#fff",
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
              style={{ display: "block", width: "100%", position: "relative" }}
            >
              <Search
                sx={{
                  position: "absolute",
                  color: "rgba(0, 0, 0, 0.25)",
                  top: "7px",
                  left: "10px",
                }}
              />
              <CustomInput
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => onChangeSearch(e)}
              />
              <Cancel
                sx={{
                  position: "absolute",
                  color: "rgba(0, 0, 0, 0.25)",
                  top: "7px",
                  right: "10px",
                  cursor: "pointer",
                  display: search ? "block" : "none",
                }}
                onClick={() => setSearch("")}
              />
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
          backgroundColor: "white",
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
