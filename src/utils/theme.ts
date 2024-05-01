import { createTheme } from "@mui/material/styles";
import { colors } from "./colors";

const { mainPrimary, mainSecondary, white, lightGrey } = colors;

export const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    h5: {
      fontWeight: "600",
    },
    h4: {
      fontWeight: "700",
    },
  },

  palette: {
    primary: {
      main: mainPrimary,
    },
    secondary: {
      main: mainSecondary,
    },
  },

  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "contained" },
          style: {
            background: mainPrimary,
            border: `1px solid ${mainPrimary}`,
            boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
            borderRadius: "8px",
            fontWeight: "400",
            fontSize: "18px",
            color: white,
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            background: white,
            border: `1px solid ${mainPrimary}`,
            boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
            borderRadius: "8px",
            fontWeight: "400",
            fontSize: "18px",
            color: mainPrimary,
            "&:hover": {
              color: white,
              background: mainPrimary,
            },
          },
        },
      ],
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: lightGrey,
          borderRadius: "4px",
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: { minHeight: "80px" },
      },
    },
  },
});
