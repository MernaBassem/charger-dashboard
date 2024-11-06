import { GlobalStyles } from "@chakra-ui/theme-tools";
import { primaryColor } from "./foundations/colors";

export const styles: GlobalStyles = {
  global: {
    html: {
      fontSize: "87.5%",
      scrollBehavior: "smooth",
    },
    ul: {
      listStyle: "none",
    },
    "#nprogress .bar": {
      zIndex: "2000",
      height: "3px",
      backgroundColor: primaryColor[500],
    },
  },
};
