import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { darkTheme } from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </>
);
