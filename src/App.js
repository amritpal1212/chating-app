import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import ChatProvider from "./context/ChatProvider";
import AllRoutes from "./AllRoutes";
import theme from "./theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChatProvider>
        <AllRoutes />
      </ChatProvider>
    </ChakraProvider>
  );
}

export default App;
