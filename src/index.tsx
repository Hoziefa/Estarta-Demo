import React from "react";
import {createRoot} from "react-dom/client";
import {QueryClient, QueryClientProvider} from "react-query";
import reportWebVitals from "./reportWebVitals";

import App from "./App";

import "./index.scss";

const queryClient = new QueryClient();

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);

reportWebVitals();
