import { primaryColor } from "./foundations/colors";

export const semanticTokens = {
  colors: {
    bg: {
      body: {
        _light: "neutral.50",
        _dark: "blackAlpha.900",
      },
      clear: {
        _light: "white",
        _dark: "blackAlpha.900",
      },
      opaque: {
        _light: "whiteAlpha.900",
        _dark: "blackAlpha.900",
      },
      filled: {
        _light: primaryColor[950],
        _dark: primaryColor[950],
      },
    },
    border: {
      _light: "neutral.200",
      _dark: "whiteAlpha.300",
    },
    text: {
      primary: {
        _light: "neutral.800",
        _dark: "whiteAlpha.900",
      },
      secondary: {
        _light: "neutral.500",
        _dark: "neutral.300",
      },
    },
  },
  space: {
    "space-xs": "2",
    "space-sm": "4",
    "space-md": "6",
    "space-lg": "8",
    "space-xl": "10",
    "space-2xl": "14",
  },
};
