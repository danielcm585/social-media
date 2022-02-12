import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BottomNavigationStyleConfig } from "chakra-ui-bottom-navigation";

const theme = extendTheme({
  components: {
    BottomNavigation: BottomNavigationStyleConfig
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);