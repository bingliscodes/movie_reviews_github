import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "@/components/ui/provider";

import { UserContextProvider } from "./store/UserContext";
import { ListContextProvider } from "./store/ListContext";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <ListContextProvider>
      <BrowserRouter>
        <Provider>
          <App />
        </Provider>
      </BrowserRouter>
    </ListContextProvider>
  </UserContextProvider>
);
