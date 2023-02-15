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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
