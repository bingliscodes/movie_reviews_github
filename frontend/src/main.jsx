import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "@/components/ui/provider";

import { UserContextProvider } from "@/store/UserContext.jsx";
import { ListContextProvider } from "@/store/ListContext.jsx";
import { MovieDetailsModalContextProvider } from "@/store/MovieDetailsModalContext.jsx";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <ListContextProvider>
      <MovieDetailsModalContextProvider>
        <BrowserRouter>
          <Provider>
            <App />
          </Provider>
        </BrowserRouter>
      </MovieDetailsModalContextProvider>
    </ListContextProvider>
  </UserContextProvider>
);
