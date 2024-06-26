// src/theme/index.ts
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        fontSize: "sm",
        color: "gray.600",
        lineHeight: "tall",
      },
      a: {
        color: "teal.500",
      },
    },
  },
});

export default theme;
