import { createTheme } from "@mui/material";
import { color } from "@mui/system";

const theme = createTheme({
    palette: {
        primary: {
            main: '#ED6A58'
        },
        secondary: {
          main: '#EEEDD6',
        },
    },
    typography: {
        fontFamily: "Raleway"
    }
})

export default theme