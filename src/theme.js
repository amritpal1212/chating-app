import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: (props) => ({
      body: {
        bg: "white",
        color: "gray.800",
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        _hover: {
          bg: "gray.100",
        },
      },
    },
  },
});

export default theme; 